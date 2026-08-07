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
  startBffService,
  runSeedData,
  stopAll,
  wiremockMapping,
} from "../support/containers";
import { MOCK_SCENARIO, mockScenario } from "../support/mock-scenario";

// Full-stack browser e2e: real Postgres, real user-service, bank-account-service,
// bff-service, and the qa-website UI, all real containers. Paotang Pass and the
// SMS service (true external dependencies) are mocked via WireMock.

let network: StartedNetwork;
let dbContainer: StartedPostgreSqlContainer;
let wiremockContainer: StartedTestContainer;
let userServiceContainer: StartedTestContainer;
let bankAccountServiceContainer: StartedTestContainer;
let transferServiceContainer: StartedTestContainer;
let ekycServiceContainer: StartedTestContainer;
let bffContainer: StartedTestContainer;
let websiteContainer: StartedTestContainer;
let websiteUrl: string;

test.beforeAll(async () => {
  test.setTimeout(240000);

  // 1. Set up infrastructure containers.
  network = await startNetwork();
  dbContainer = await startPostgres(network);

  console.log("Starting WireMock container for Paotang Pass + SMS service...");
  wiremockContainer = await startWiremock(network, "wiremock", [
    wiremockMapping("paotang"),
    wiremockMapping("sms"),
    wiremockMapping("otp"),
  ]);

  userServiceContainer = await startUserService(network, dbContainer, {
    PAOTANG_SERVICE_URL: "http://wiremock:8080",
    PAOTANG_CLIENT_ID: "dummy-client-id",
    PAOTANG_CLIENT_SECRET: "dummy-client-secret",
    OTP_SERVICE_URL: "http://wiremock:8080",
  });

  bankAccountServiceContainer = await startBankAccountService(network, dbContainer, {
    SMS_SERVICE_URL: "http://wiremock:8080",
    SMS_API_KEY: "dummy-sms-api-key",
  });

  transferServiceContainer = await startTransferService(network, dbContainer);
  ekycServiceContainer = await startEKYCService(network, dbContainer);

  bffContainer = await startBffService(network, {
    USER_SERVICE_URL: "http://user-service:8080",
    BANK_ACCOUNT_SERVICE_URL: "http://bank-account-service:8080",
    EKYC_SERVICE_URL: "http://ekyc-service:8080",
    TRANSFER_SERVICE_URL: "http://transfer-service:8080",
  });

  console.log("Starting website container...");
  websiteContainer = await new GenericContainer("qa-website:test")
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
      bankAccountServiceContainer,
      userServiceContainer,
      wiremockContainer,
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
  await expect(page.getByTestId("result-otp")).toContainText('"verified":true');
}

test.describe("QA website full e2e flow", () => {
  test("create user, create account (SMS success), verify profile not blocked", async ({ page }) => {
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
    await expect(page.getByTestId("result-create-account")).toContainText('"currency":"USD"');

    await page.getByTestId("btn-verify-profile").click();
    await expect(page.getByTestId("result-verify-profile")).toContainText('"status":"active"');
    await expect(page.getByText("Account is active")).toBeVisible();
  });

  test("verify profile shows blocked status", async ({ page }) => {
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
    await expect(page.getByText("Account is BLOCKED")).toBeVisible();
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

  test("verify profile shows a missing user error", async ({ page }) => {
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
    await expect(page.getByTestId("result-otp")).toContainText('"verified":true');
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
    await page.getByTestId("input-transfer-currency").fill("THB");
    await page.getByTestId("btn-submit-transfer").click();

    await expect(page.getByTestId("result-transfer")).toContainText('"status":"COMPLETED"');

    await page.getByTestId("btn-list-transfers").click();
    await expect(page.getByTestId("result-transfers")).toContainText('"amount":100');
    await expect(page.getByTestId("result-transfers")).toContainText('"status":"COMPLETED"');
  });

  test("eKYC verification succeeds", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/ekyc`);

    await page.getByTestId("input-ekyc-customer-id").fill("00000000-0000-0000-0000-000000000001");
    await page.getByTestId("input-ekyc-national-id").fill("1234567890123");
    await page.getByTestId("input-ekyc-full-name").fill("Seed Sender");
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
});
