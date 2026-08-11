import { test, expect, Page } from "@playwright/test";
import { GenericContainer, StartedNetwork, StartedTestContainer, Wait } from "testcontainers";
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import {
  PORT,
  startNetwork,
  startPostgres,
  runMigrations,
  startWiremock,
  startUserService,
  startBankAccountService,
  startTransferService,
  startEKYCService,
  startSMSService,
  startBffService,
  runSeedData,
  stopAll,
  wiremockMapping,
} from "../support/containers";
import { MOCK_SCENARIO, mockScenario } from "../support/mock-scenario";

// Full-stack browser e2e: real Postgres, real user-service, bank-account-service,
// bff-service, and the website UI, all real containers. Paotang Pass and the
// SMS service (true external dependencies) are mocked via WireMock.

let network: StartedNetwork;
let dbContainer: StartedPostgreSqlContainer;
let wiremock: StartedTestContainer;
let userServiceContainer: StartedTestContainer;
let bankAccountServiceContainer: StartedTestContainer;
let transferServiceContainer: StartedTestContainer;
let ekycServiceContainer: StartedTestContainer;
let smsServiceContainer: StartedTestContainer;
let bffContainer: StartedTestContainer;
let websiteContainer: StartedTestContainer;
let websiteUrl: string;

test.beforeAll(async () => {
  test.setTimeout(240000);

  // 1. Set up infrastructure containers.
  network = await startNetwork();
  dbContainer = await startPostgres(network);

  console.log("Starting WireMock container for Paotang Pass + SMS service...");
  wiremock = await startWiremock(network, "wiremock", [
    wiremockMapping("paotang"),
    wiremockMapping("sms"),
    wiremockMapping("otp"),
    wiremockMapping("transfer-service"),
    wiremockMapping("bank-account-service"),
    wiremockMapping("ekyc-service"),
  ]);

  userServiceContainer = await startUserService(network, dbContainer, {
    PAOTANG_SERVICE_URL: "http://wiremock:8080",
    PAOTANG_CLIENT_ID: "dummy-client-id",
    PAOTANG_CLIENT_SECRET: "dummy-client-secret",
    OTP_SERVICE_URL: "http://wiremock:8080",
  });

  bankAccountServiceContainer = await startBankAccountService(network, dbContainer, {
  });

  transferServiceContainer = await startTransferService(network, dbContainer);
  ekycServiceContainer = await startEKYCService(network, dbContainer);
  smsServiceContainer = await startSMSService(network, {
    SMS_UPSTREAM_URL: "http://wiremock:8080",
    SMS_API_KEY: "dummy-sms-api-key",
  });

  bffContainer = await startBffService(network, {
    USER_SERVICE_URL: "http://wiremock:8080",
    BANK_ACCOUNT_SERVICE_URL: "http://wiremock:8080",
    EKYC_SERVICE_URL: "http://wiremock:8080",
    TRANSFER_SERVICE_URL: "http://wiremock:8080",
    SMS_SERVICE_URL: "http://sms-service:8080",
  });

  console.log("Starting website container...");
  websiteContainer = await new GenericContainer("website:test")
    .withNetwork(network)
    .withNetworkAliases("website")
    .withExposedPorts(3000)
    .withEnvironment({
      // Browser JS runs on the test host (Playwright), not inside the Docker
      // network, so it needs the host-mapped bff-service address, not the
      // container network alias.
      BFF_URL: `http://${bffContainer.getHost()}:${bffContainer.getMappedPort(PORT)}`,
      // Docker auto-sets HOSTNAME to the container ID; Next.js standalone
      // server.js binds to $HOSTNAME instead of all interfaces, so without
      // this override the app binds to an unreachable address and the wait
      // strategy (and host port mapping) can't reach it.
      HOSTNAME: "0.0.0.0",
    })
    .withWaitStrategy(Wait.forHttp("/", 3000))
    .start();

  const host = websiteContainer.getHost();
  const port = websiteContainer.getMappedPort(3000);
  websiteUrl = `http://${host}:${port}`;
  console.log(`website container is ready at: ${websiteUrl}`);

  // 2. Run migrations and baseline account seed data as the last infrastructure steps.
  await runMigrations(dbContainer);
  await runSeedData(dbContainer);
});

test.afterAll(async () => {
  await stopAll(
    [
      websiteContainer,
      bffContainer,
      transferServiceContainer,
      ekycServiceContainer,
      smsServiceContainer,
      bankAccountServiceContainer,
      userServiceContainer,
      wiremock,
      dbContainer,
    ],
    network
  );
});

async function login(page: Page) {
  const setScenario = mockScenario(page);
  await page.goto(`${websiteUrl}/login`);

  setScenario(MOCK_SCENARIO.PAOTANG.SUCCESS);
  await page.getByTestId("btn-paotang-login").click();
  await expect(page.getByTestId("result-paotang")).toContainText("mock-access-token");

  setScenario(MOCK_SCENARIO.OTP.SUCCESS);
  await page.getByTestId("btn-verify-otp").click();
  await expect(page).toHaveURL(/\/$/);
}

test.describe("QA website full e2e flow", () => {
  test("redirects unauthenticated visitors to sign in", async ({ page }) => {
    await page.goto(websiteUrl);
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByTestId("btn-paotang-login")).toBeVisible();
  });

  test("logs out and requires login again", async ({ page }) => {
    await login(page);
    await page.goto(websiteUrl);

    await page.getByTestId("btn-logout").click();
    await expect(page).toHaveURL(/\/login$/);

    await page.goto(websiteUrl);
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByTestId("signup-button")).toBeVisible();
  });

  test("signup verifies OTP before redirecting to sign in", async ({ page }) => {
    const setScenario = mockScenario(page);
    await page.goto(`${websiteUrl}/signup`);

    await page.getByTestId("input-signup-email").fill(`signup-${Date.now()}@example.com`);
    await page.getByTestId("btn-signup").click();
    await expect(page.getByTestId("result-signup")).toContainText('"id"');
    await expect(page.getByTestId("section-signup-otp")).toBeVisible();

    setScenario(MOCK_SCENARIO.OTP.INVALID);
    await page.getByTestId("btn-signup-verify-otp").click();
    await expect(page.getByTestId("result-signup-otp")).toContainText("invalid_otp");
    await expect(page).toHaveURL(/\/signup$/);

    setScenario(MOCK_SCENARIO.OTP.SUCCESS);
    await page.getByTestId("btn-signup-verify-otp").click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test("create user, create account (SMS success), get user profile not blocked", async ({ page }) => {
    const setScenario = mockScenario(page);

    await login(page);
    await page.goto(`${websiteUrl}/account`);

    await page.getByTestId("input-name").fill("Jane Doe");
    await page.getByTestId("input-email").fill("jane.doe@example.com");
    await page.getByTestId("input-phone").fill("+66800000000");
    await page.getByTestId("btn-create-user").click();

    const userResult = page.getByTestId("result-create-user");
    await expect(userResult).toContainText('"id"');
    const userText = await userResult.textContent();
    const userId = JSON.parse(userText || "{}").id;
    expect(userId).toBeTruthy();

    await expect(page.getByTestId("input-user-id")).toHaveValue(userId);

    setScenario(MOCK_SCENARIO.SMS.SUCCESS);
    await page.getByTestId("btn-create-account").click();

    await page.getByTestId("btn-verify-profile").click();
    await expect(page.getByTestId("result-verify-profile")).toContainText('"status":"active"');
    await expect(page.getByText("Account is Active")).toBeVisible();
  });

  test("get user profile shows blocked status", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/account`);

    await page.getByTestId("input-name").fill("Blocked User");
    await page.getByTestId("input-email").fill("blocked@example.com");
    await page.getByTestId("input-phone").fill("+66800000099");
    await page.getByTestId("select-user-status").selectOption("blocked");
    await page.getByTestId("btn-create-user").click();
    await expect(page.getByTestId("result-create-user")).toContainText('"id"');

    await page.getByTestId("btn-verify-profile").click();
    await expect(page.getByTestId("result-verify-profile")).toContainText('"status":"blocked"');
    await expect(page.getByText("Account is Blocked")).toBeVisible();
  });

  test("create account reports an SMS delivery failure", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/account`);

    await page.getByTestId("input-name").fill("SMS Failure User");
    await page.getByTestId("input-email").fill(`sms-failure-${Date.now()}@example.com`);
    await page.getByTestId("input-phone").fill("+66800000098");
    await page.getByTestId("btn-create-user").click();
    await expect(page.getByTestId("result-create-user")).toContainText('"id"');

    await page.getByTestId("select-sms-scenario").selectOption(MOCK_SCENARIO.SMS.INVALID_NUMBER);
    await page.getByTestId("btn-create-account").click();
    await expect(page.getByTestId("result-create-account")).toContainText("SMS delivery failed: invalid_number");
  });

  test("create user rejects a missing phone number", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/account`);

    await page.getByTestId("input-name").fill("Missing Phone User");
    await page.getByTestId("input-email").fill(`missing-phone-${Date.now()}@example.com`);
    await page.getByTestId("input-phone").fill("");
    await page.getByTestId("btn-create-user").click();

    await expect(page.getByTestId("result-create-user")).toContainText("phone is required");
  });

  test("create user rejects a duplicate email", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/account`);

    const email = `duplicate-${Date.now()}@example.com`;
    await page.getByTestId("input-name").fill("First Duplicate User");
    await page.getByTestId("input-email").fill(email);
    await page.getByTestId("input-phone").fill("+66800000010");
    await page.getByTestId("btn-create-user").click();
    await expect(page.getByTestId("result-create-user")).toContainText('"id"');

    await page.getByTestId("input-name").fill("Second Duplicate User");
    await page.getByTestId("input-phone").fill("+66800000011");
    await page.getByTestId("btn-create-user").click();
    await expect(page.getByTestId("result-create-user")).toContainText("User with email already exists");
  });

  test("get user profile shows a missing user error", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/account`);

    await page.getByTestId("input-user-id").fill("00000000-0000-0000-0000-000000000000");
    await page.getByTestId("btn-verify-profile").click();

    await expect(page.getByTestId("result-verify-profile")).toContainText("User not found");
  });

  test("login: authcode exchange then OTP verify success", async ({ page }) => {
    const setScenario = mockScenario(page);
    await page.goto(`${websiteUrl}/login`);

    setScenario(MOCK_SCENARIO.PAOTANG.SUCCESS);
    await page.getByTestId("btn-paotang-login").click();
    await expect(page.getByTestId("result-paotang")).toContainText("mock-access-token");

    setScenario(MOCK_SCENARIO.OTP.SUCCESS);
    await page.getByTestId("btn-verify-otp").click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("transfer rejects insufficient funds", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/transfer`);

    await page.getByTestId("input-transfer-amount").fill("2000");
    await page.getByTestId("btn-submit-transfer").click();

    await expect(page.getByTestId("result-transfer")).toContainText('"error":"insufficient funds"');
  });

  test("transfer succeeds and appears in transfer history", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/transfer`);

    await page.getByTestId("input-transfer-amount").fill("100");
    await page.getByTestId("btn-submit-transfer").click();

    await expect(page.getByTestId("result-transfer")).toContainText('"status":"COMPLETED"');

    await page.getByTestId("btn-list-transfers").click();
    await expect(page.getByTestId("result-transfers")).toContainText('"amount":100');
    await expect(page.getByTestId("result-transfers")).toContainText('"status":"COMPLETED"');
  });

  test("eKYC verification succeeds", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/ekyc`);

    await page.getByTestId("input-ekyc-customer-id").selectOption("00000000-0000-0000-0000-000000000001");
    await page.getByTestId("input-ekyc-national-id").fill("1234567890123");
    await page.getByTestId("btn-submit-ekyc").click();

    await expect(page.getByTestId("result-ekyc")).toContainText('"status":"APPROVED"');
  });

  test("Paotang login rejects invalid authcode", async ({ page }) => {
    const setScenario = mockScenario(page);
    await page.goto(`${websiteUrl}/login`);

    await page.getByTestId("input-authcode").fill("bad-authcode");
    setScenario(MOCK_SCENARIO.PAOTANG.INVALID_GRANT);
    await page.getByTestId("btn-paotang-login").click();
    await expect(page.getByTestId("result-paotang")).toContainText("invalid_grant");
  });

  test("OTP verify rejects invalid code", async ({ page }) => {
    const setScenario = mockScenario(page);
    await page.goto(`${websiteUrl}/login`);

    setScenario(MOCK_SCENARIO.PAOTANG.SUCCESS);
    await page.getByTestId("btn-paotang-login").click();
    await expect(page.getByTestId("result-paotang")).toContainText("mock-access-token");

    setScenario(MOCK_SCENARIO.OTP.INVALID);
    await page.getByTestId("btn-verify-otp").click();
    await expect(page.getByTestId("result-otp")).toContainText("invalid_otp");
  });

  test("OTP verify validates the phone pattern on the client", async ({ page }) => {
    const setScenario = mockScenario(page);
    await page.goto(`${websiteUrl}/login`);

    setScenario(MOCK_SCENARIO.PAOTANG.SUCCESS);
    await page.getByTestId("btn-paotang-login").click();
    await expect(page.getByTestId("result-paotang")).toContainText("mock-access-token");

    await page.getByTestId("input-phone").fill("0800000000");

    await expect(page.getByTestId("phone-validation-error")).toBeVisible();
    await expect(page.getByTestId("btn-verify-otp")).toBeDisabled();
  });
});
