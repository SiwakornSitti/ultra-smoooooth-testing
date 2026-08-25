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
  startOTPService,
  startBffService,
  startWebsite,
  runSeedData,
  stopAll,
  wiremockMapping,
} from "../support/containers";
import { MOCK_SCENARIO, mockScenario } from "../support/mock-scenario";

// Full-stack browser e2e: real Postgres, real user-service, bank-account-service,
// ekyc-service, transfer-service, otp-service, bff-service, and the website UI,
// all real containers. External providers (Paotang Pass, SMS provider) are mocked via WireMock.

let network: StartedNetwork;
let dbContainer: StartedPostgreSqlContainer;
let wiremock: StartedTestContainer;
let userServiceContainer: StartedTestContainer;
let bankAccountServiceContainer: StartedTestContainer;
let transferServiceContainer: StartedTestContainer;
let ekycServiceContainer: StartedTestContainer;
let otpServiceContainer: StartedTestContainer;
let bffContainer: StartedTestContainer;
let websiteContainer: StartedTestContainer;
let websiteUrl: string;

test.beforeAll(async () => {
  test.setTimeout(240000);

  // 1. Set up infrastructure containers.
  network = await startNetwork();
  dbContainer = await startPostgres(network);

  console.log("Starting WireMock container for Paotang Pass + SMS provider...");
  wiremock = await startWiremock(network, "wiremock", [
    wiremockMapping("paotang"),
    wiremockMapping("sms"),
  ]);

  userServiceContainer = await startUserService(network, dbContainer, {
    PAOTANG_SERVICE_URL: "http://wiremock:8080",
    PAOTANG_CLIENT_ID: "dummy-client-id",
    PAOTANG_CLIENT_SECRET: "dummy-client-secret",
  });

  bankAccountServiceContainer = await startBankAccountService(network, dbContainer, {});

  transferServiceContainer = await startTransferService(network, dbContainer);
  ekycServiceContainer = await startEKYCService(network, dbContainer);
  otpServiceContainer = await startOTPService(network, {
    SMS_PROVIDER_URL: "http://wiremock:8080",
  });

  bffContainer = await startBffService(network, {
    USER_SERVICE_URL: "http://user-service:8080",
    BANK_ACCOUNT_SERVICE_URL: "http://bank-account-service:8080",
    EKYC_SERVICE_URL: "http://ekyc-service:8080",
    TRANSFER_SERVICE_URL: "http://transfer-service:8080",
    OTP_SERVICE_URL: "http://otp-service:8080",
  });

  websiteContainer = await startWebsite(network, bffContainer);

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
      otpServiceContainer,
      transferServiceContainer,
      ekycServiceContainer,
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
  setScenario(MOCK_SCENARIO.PAOTANG.SUCCESS, MOCK_SCENARIO.OTP.SUCCESS);
  await page.goto(`${websiteUrl}/login`);

  await page.getByTestId("btn-paotang-login").click();
  await expect(page.getByTestId("result-paotang")).toContainText("successfully");

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
    await expect(page.getByTestId("result-signup")).toContainText("User created successfully");
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

    await page.getByTestId("input-name").fill("Demo User");
    await page.getByTestId("input-email").fill("demo.user@example.com");
    await page.getByTestId("input-phone").fill("+66800000000");
    await page.getByTestId("btn-create-user").click();

    await expect(page.getByTestId("created-user-summary")).toBeVisible();
    const userText = await page.getByTestId("created-user-summary").textContent();
    const userId = userText?.match(/ID: ([0-9a-f-]+)/)?.[1] ?? "";
    expect(userId).toBeTruthy();

    await expect(page.getByTestId("input-user-id")).toHaveValue(userId);

    setScenario(MOCK_SCENARIO.SMS.SUCCESS);
    await page.getByTestId("btn-create-account").click();

    await page.getByTestId("select-profile-user-id").selectOption(userId);
    await page.getByTestId("btn-verify-profile").click();
    await expect(page.getByTestId("profile-status")).toHaveText("active");
  });

  test("newly created user starts active", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/account`);

    await page.getByTestId("input-name").fill("Active User");
    await page.getByTestId("input-email").fill("active@example.com");
    await page.getByTestId("input-phone").fill("+66800000099");
    await page.getByTestId("btn-create-user").click();
    await expect(page.getByTestId("created-user-summary")).toBeVisible();
    const userText = await page.getByTestId("created-user-summary").textContent();
    const userId = userText?.match(/ID: ([0-9a-f-]+)/)?.[1] ?? "";

    await page.getByTestId("select-profile-user-id").selectOption(userId);
    await page.getByTestId("btn-verify-profile").click();
    await expect(page.getByTestId("profile-status")).toHaveText("active");
  });

  test("create account reports an SMS delivery failure", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/account`);

    await page.getByTestId("input-name").fill("SMS Failure User");
    await page.getByTestId("input-email").fill(`sms-failure-${Date.now()}@example.com`);
    await page.getByTestId("input-phone").fill("+66800000098");
    await page.getByTestId("btn-create-user").click();
    await expect(page.getByTestId("created-user-summary")).toBeVisible();

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
    await expect(page.getByTestId("created-user-summary")).toBeVisible();

    await page.getByTestId("input-name").fill("Second Duplicate User");
    await page.getByTestId("input-phone").fill("+66800000011");
    await page.getByTestId("btn-create-user").click();
    await expect(page.getByTestId("result-create-user")).toContainText("User with email already exists");
  });

  test("get user profile shows a missing user error", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/account`);

    await page.getByTestId("input-name").fill("Missing User");
    await page.getByTestId("input-email").fill(`missing-user-${Date.now()}@example.com`);
    await page.getByTestId("input-phone").fill("+66800000097");
    await page.getByTestId("btn-create-user").click();
    await expect(page.getByTestId("created-user-summary")).toBeVisible();
    const userText = await page.getByTestId("created-user-summary").textContent();
    const userId = userText?.match(/ID: ([0-9a-f-]+)/)?.[1] ?? "";
    await page.getByTestId("select-profile-user-id").selectOption(userId);
    await page.getByTestId("select-profile-scenario").selectOption(MOCK_SCENARIO.USER.GET_USER_INVALID);
    await page.getByTestId("btn-verify-profile").click();

    await expect(page.getByTestId("result-verify-profile")).toContainText("User not found");
  });

  test("login: authcode exchange then OTP verify success", async ({ page }) => {
    const setScenario = mockScenario(page);
    await page.goto(`${websiteUrl}/login`);

    setScenario(MOCK_SCENARIO.PAOTANG.SUCCESS);
    await page.getByTestId("btn-paotang-login").click();
    await expect(page.getByTestId("result-paotang")).toContainText("successfully");

    setScenario(MOCK_SCENARIO.OTP.SUCCESS);
    await page.getByTestId("btn-verify-otp").click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("transfer rejects insufficient funds", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/transfer`);

    await page.getByTestId("input-transfer-amount").fill("2000");
    await page.getByTestId("btn-submit-transfer").click();

    await expect(page.getByTestId("result-transfer")).toContainText("insufficient funds");
  });

  test("transfer succeeds and appears in transfer history", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/transfer`);

    await page.getByTestId("input-transfer-amount").fill("100");
    await page.getByTestId("btn-submit-transfer").click();

    await expect(page.getByTestId("result-transfer")).toContainText("Transfer COMPLETED");
    await expect(page.getByTestId("source-account-balance")).toContainText("800.00");

    await page.getByTestId("btn-list-transfers").click();
    await expect(page.getByTestId("result-transfers")).toContainText("100");
    await expect(page.getByTestId("result-transfers")).toContainText("COMPLETED");
  });

  test("eKYC verification succeeds", async ({ page }) => {
    await login(page);
    await page.goto(`${websiteUrl}/ekyc`);

    await page.getByTestId("input-ekyc-customer-id").selectOption("00000000-0000-0000-0000-000000000001");
    await page.getByTestId("input-ekyc-national-id").fill("1234567890123");
    await page.getByTestId("btn-submit-ekyc").click();

    await expect(page.getByTestId("ekyc-status")).toHaveText("APPROVED");
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
    await expect(page.getByTestId("result-paotang")).toContainText("successfully");

    setScenario(MOCK_SCENARIO.OTP.INVALID);
    await page.getByTestId("btn-verify-otp").click();
    await expect(page.getByTestId("result-otp")).toContainText("invalid_otp");
  });

  test("OTP verify validates the phone pattern on the client", async ({ page }) => {
    const setScenario = mockScenario(page);
    await page.goto(`${websiteUrl}/login`);

    setScenario(MOCK_SCENARIO.PAOTANG.SUCCESS);
    await page.getByTestId("btn-paotang-login").click();
    await expect(page.getByTestId("result-paotang")).toContainText("successfully");

    await page.getByTestId("input-phone").fill("0800000000");

    await expect(page.getByTestId("phone-validation-error")).toBeVisible();
    await expect(page.getByTestId("btn-verify-otp")).toBeDisabled();
  });
});
