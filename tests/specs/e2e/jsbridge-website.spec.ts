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
  startMockJsBridgeWebsite,
  runSeedData,
  stopAll,
  wiremockMapping,
} from "../support/containers";

// Full-stack E2E: Mobile WebView Hybrid App with Mocked JSBridge
// Testing hybrid native-to-web boundaries, biometric authorization,
// device hardware API injection, and graceful browser fallbacks.

let network: StartedNetwork;
let dbContainer: StartedPostgreSqlContainer;
let wiremock: StartedTestContainer;
let userServiceContainer: StartedTestContainer;
let bankAccountServiceContainer: StartedTestContainer;
let transferServiceContainer: StartedTestContainer;
let ekycServiceContainer: StartedTestContainer;
let otpServiceContainer: StartedTestContainer;
let bffContainer: StartedTestContainer;
let jsBridgeWebsiteContainer: StartedTestContainer;
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

  jsBridgeWebsiteContainer = await startMockJsBridgeWebsite(network, bffContainer);

  const host = jsBridgeWebsiteContainer.getHost();
  const port = jsBridgeWebsiteContainer.getMappedPort(3000);
  websiteUrl = `http://${host}:${port}`;
  console.log(`mock-jsbridge-website container is ready at: ${websiteUrl}`);

  // 2. Run migrations and baseline seed data.
  await runMigrations(dbContainer);
  await runSeedData(dbContainer);
});

test.afterAll(async () => {
  await stopAll(
    [
      jsBridgeWebsiteContainer,
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

// Helper function to inject mock JSBridge into browser context before page load
async function injectMockJSBridge(page: Page, options?: {
  platform?: "iOS" | "Android";
  appVersion?: string;
  deviceId?: string;
  biometricSuccess?: boolean;
  biometricToken?: string;
  qrPayload?: string;
}) {
  const opts = {
    platform: options?.platform ?? "iOS",
    appVersion: options?.appVersion ?? "2.4.0",
    deviceId: options?.deviceId ?? "DEV-IPHONE-15",
    biometricSuccess: options?.biometricSuccess ?? true,
    biometricToken: options?.biometricToken ?? "bio-token-secure-999",
    qrPayload: options?.qrPayload ?? "transfer://ACC-002?amount=750",
  };

  await page.addInitScript((bridgeConfig) => {
    (window as any).JSBridge = {
      getNativeDeviceInfo: async () => ({
        platform: bridgeConfig.platform,
        appVersion: bridgeConfig.appVersion,
        deviceId: bridgeConfig.deviceId,
        osVersion: "iOS 17.4",
      }),
      requestBiometricAuth: async (opt?: { prompt?: string }) => {
        if (!bridgeConfig.biometricSuccess) {
          return { success: false, error: "BIOMETRIC_USER_CANCELLED" };
        }
        return { success: true, token: bridgeConfig.biometricToken };
      },
      scanQRCode: async () => ({
        success: true,
        data: bridgeConfig.qrPayload,
      }),
      getGeolocation: async () => ({
        latitude: 13.7563,
        longitude: 100.5018,
        accuracy: 5.0,
      }),
      showToast: async () => ({ success: true }),
      triggerHaptic: async () => ({ success: true }),
      closeWebView: async () => ({ success: true }),
    };
  }, opts);
}

test.describe("Mobile WebView Mock JSBridge E2E Tests", () => {
  test("gracefully falls back when opened in standard web browser (JSBridge undefined)", async ({ page }) => {
    await page.goto(websiteUrl);

    // Verify fallback UI indicator
    await expect(page.getByTestId("bridge-status")).toContainText("Browser Fallback Mode");
    await expect(page.getByTestId("info-platform")).toHaveText("Web Browser");
    await expect(page.getByTestId("info-app-version")).toHaveText("1.0.0-web");

    // QR scanner shows graceful error
    await page.getByTestId("btn-scan-qr").click();
    await expect(page.getByTestId("result-scan-qr")).toContainText("JSBridge unavailable");

    // Geolocation shows fallback message
    await page.getByTestId("btn-get-geo").click();
    await expect(page.getByTestId("result-diagnostics")).toContainText("JSBridge geolocation requires mobile container");
  });

  test("injects native JSBridge and populates device metadata", async ({ page }) => {
    await injectMockJSBridge(page, {
      platform: "iOS",
      appVersion: "2.4.0",
      deviceId: "DEV-IPHONE-15",
    });

    await page.goto(websiteUrl);

    // Verify connected status pill
    await expect(page.getByTestId("bridge-status")).toContainText("JSBridge Connected");

    // Verify native device parameters received via bridge
    await expect(page.getByTestId("info-platform")).toHaveText("iOS");
    await expect(page.getByTestId("info-app-version")).toHaveText("2.4.0");
    await expect(page.getByTestId("info-device-id")).toHaveText("DEV-IPHONE-15");
  });

  test("scans QR code via native camera bridge and pre-populates transfer fields", async ({ page }) => {
    await injectMockJSBridge(page, {
      qrPayload: "transfer://ACC-002?amount=850",
    });

    await page.goto(websiteUrl);

    await page.getByTestId("btn-scan-qr").click();
    await expect(page.getByTestId("result-scan-qr")).toContainText("transfer://ACC-002?amount=850");

    // Verify form input automatically parsed and populated
    await expect(page.getByTestId("input-to-account")).toHaveValue("ACC-002");
    await expect(page.getByTestId("input-transfer-amount")).toHaveValue("850");
  });

  test("authorizes fund transfer via native biometric authentication (FaceID/TouchID)", async ({ page }) => {
    await injectMockJSBridge(page, {
      biometricSuccess: true,
      biometricToken: "bio-token-faceid-verified",
    });

    await page.goto(websiteUrl);

    await page.getByTestId("input-to-account").fill("ACC-002");
    await page.getByTestId("input-transfer-amount").fill("100");
    await page.getByTestId("btn-biometric-pay").click();

    // Verify successful transfer with biometrics
    await expect(page.getByTestId("result-biometric-pay")).toContainText("Transfer COMPLETED via Biometrics");
  });

  test("handles biometric authentication cancellation or failure gracefully", async ({ page }) => {
    await injectMockJSBridge(page, {
      biometricSuccess: false,
    });

    await page.goto(websiteUrl);

    await page.getByTestId("input-to-account").fill("ACC-002");
    await page.getByTestId("input-transfer-amount").fill("200");
    await page.getByTestId("btn-biometric-pay").click();

    // Verify cancellation report without making transfer
    await expect(page.getByTestId("result-biometric-pay")).toContainText("Biometric authentication failed");
  });

  test("retrieves native GPS geolocation through JSBridge", async ({ page }) => {
    await injectMockJSBridge(page);
    await page.goto(websiteUrl);

    await page.getByTestId("btn-get-geo").click();
    await expect(page.getByTestId("result-diagnostics")).toContainText("Lat: 13.7563, Lon: 100.5018");
  });
});
