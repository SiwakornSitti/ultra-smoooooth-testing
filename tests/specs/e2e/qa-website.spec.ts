import { test, expect } from "@playwright/test";
import { GenericContainer, StartedNetwork, StartedTestContainer, Wait } from "testcontainers";
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import {
  PORT,
  startNetwork,
  startPostgres,
  startWiremock,
  startUserService,
  startBankAccountService,
  startBffService,
  stopAll,
  wiremockMapping,
} from "../support/containers";
import { mockScenario } from "../support/mock-scenario";

// Full-stack browser e2e: real Postgres, real user-service, bank-account-service,
// bff-service, and the qa-website UI, all real containers. Paotang Pass and the
// SMS service (true external dependencies) are mocked via WireMock.

let network: StartedNetwork;
let dbContainer: StartedPostgreSqlContainer;
let wiremockContainer: StartedTestContainer;
let userServiceContainer: StartedTestContainer;
let bankAccountServiceContainer: StartedTestContainer;
let bffContainer: StartedTestContainer;
let websiteContainer: StartedTestContainer;
let websiteUrl: string;

test.beforeAll(async () => {
  test.setTimeout(240000);

  network = await startNetwork();
  dbContainer = await startPostgres(network);

  console.log("Starting WireMock container for Paotang Pass + SMS service...");
  wiremockContainer = await startWiremock(network, "wiremock", [
    wiremockMapping("paotang"),
    wiremockMapping("sms"),
    wiremockMapping("otp"),
  ]);

  userServiceContainer = await startUserService(network, {
    PAOTANG_SERVICE_URL: "http://wiremock:8080",
    PAOTANG_CLIENT_ID: "dummy-client-id",
    PAOTANG_CLIENT_SECRET: "dummy-client-secret",
    OTP_SERVICE_URL: "http://wiremock:8080",
  });

  bankAccountServiceContainer = await startBankAccountService(network, {
    SMS_SERVICE_URL: "http://wiremock:8080",
    SMS_API_KEY: "dummy-sms-api-key",
  });

  bffContainer = await startBffService(network, {
    USER_SERVICE_URL: "http://user-service:8080",
    BANK_ACCOUNT_SERVICE_URL: "http://bank-account-service:8080",
  });

  console.log("Starting qa-website container...");
  websiteContainer = await new GenericContainer("qa-website:test")
    .withNetwork(network)
    .withNetworkAliases("qa-website")
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
  console.log(`qa-website container is ready at: ${websiteUrl}`);
});

test.afterAll(async () => {
  await stopAll(
    [websiteContainer, bffContainer, bankAccountServiceContainer, userServiceContainer, wiremockContainer, dbContainer],
    network
  );
});

test.describe("QA website full e2e flow", () => {
  test("create user, create account (SMS success), verify profile not blocked", async ({ page }) => {
    const setScenario = mockScenario(page);
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

    setScenario("SMS:SUCCESS");
    await page.getByTestId("btn-create-account").click();
    await expect(page.getByTestId("result-create-account")).toContainText('"currency":"USD"');

    await page.getByTestId("btn-verify-profile").click();
    await expect(page.getByTestId("result-verify-profile")).toContainText('"status":"active"');
    await expect(page.getByText("Account is active")).toBeVisible();
  });

  test("verify profile shows blocked status", async ({ page }) => {
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

  test("login: authcode exchange then OTP verify success", async ({ page }) => {
    const setScenario = mockScenario(page);
    await page.goto(`${websiteUrl}/login`);

    setScenario("PT_PASS:SUCCESS");
    await page.getByTestId("btn-paotang-login").click();
    await expect(page.getByTestId("result-paotang")).toContainText("mock-access-token");

    setScenario("OTP:SUCCESS");
    await page.getByTestId("btn-verify-otp").click();
    await expect(page.getByTestId("result-otp")).toContainText('"verified":true');
  });

  test("Paotang login rejects invalid authcode", async ({ page }) => {
    const setScenario = mockScenario(page);
    await page.goto(`${websiteUrl}/login`);

    await page.getByTestId("input-authcode").fill("bad-authcode");
    setScenario("PT_PASS:INVALID_GRANT");
    await page.getByTestId("btn-paotang-login").click();
    await expect(page.getByTestId("result-paotang")).toContainText("invalid_grant");
  });

  test("OTP verify rejects invalid code", async ({ page }) => {
    const setScenario = mockScenario(page);
    await page.goto(`${websiteUrl}/login`);

    setScenario("PT_PASS:SUCCESS");
    await page.getByTestId("btn-paotang-login").click();
    await expect(page.getByTestId("result-paotang")).toContainText("mock-access-token");

    setScenario("OTP:INVALID");
    await page.getByTestId("btn-verify-otp").click();
    await expect(page.getByTestId("result-otp")).toContainText("invalid_otp");
  });
});
