import { test, expect, APIRequestContext } from "@playwright/test";
import { HttpStatusCode } from "axios";
import { StartedNetwork, StartedTestContainer } from "testcontainers";
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import * as path from "path";
import * as dotenv from "dotenv";
import {
  startNetwork,
  startPostgres,
  runMigrations,
  startWiremock,
  startUserService,
  startBankAccountService,
  startTransferService,
  startSMSService,
  startBffService,
  stopAll,
  wiremockMapping,
} from "../support/containers";
import { MOCK_SCENARIO } from "../support/mock-scenario";
import { DirectSeedIds, SeedData, seedTestData, seedTestDataDirectly } from "../support/seed-data";

// Try loading multiple possible .env locations
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env.qa") });
dotenv.config({ path: path.resolve(__dirname, "../../../project.env") });

let network: StartedNetwork;
let dbContainer: StartedPostgreSqlContainer;
let wiremockContainer: StartedTestContainer;
let userServiceContainer: StartedTestContainer;
let bankAccountServiceContainer: StartedTestContainer;
let transferServiceContainer: StartedTestContainer;
let smsServiceContainer: StartedTestContainer;
let bffContainer: StartedTestContainer;
let bffUrl: string;

const mockUserName = process.env.MOCK_USER_NAME || "Jane Doe";
const mockUserEmail = process.env.MOCK_USER_EMAIL || "jane.doe@example.com";
const mockUserPhone = process.env.MOCK_USER_PHONE || "+66800000001";

const mockAcc1Balance = parseFloat(process.env.MOCK_ACC_1_BALANCE || "2500.75");
const mockAcc1Currency = process.env.MOCK_ACC_1_CURRENCY || "USD";

const mockAcc2Balance = parseFloat(process.env.MOCK_ACC_2_BALANCE || "120.5");
const mockAcc2Currency = process.env.MOCK_ACC_2_CURRENCY || "USD";

// Filled in after seeding, since Postgres generates the UUIDs.
let seededUserId: string;
let seededSourceAccountId: string;
let seededTargetAccountId: string;

const seedData: SeedData = {
  userName: mockUserName,
  userEmail: mockUserEmail,
  userPhone: mockUserPhone,
  sourceBalance: mockAcc1Balance,
  sourceCurrency: mockAcc1Currency,
  targetBalance: mockAcc2Balance,
  targetCurrency: mockAcc2Currency,
};

const directSeedIds: DirectSeedIds = {
  user: "00000000-0000-0000-0000-000000000021",
  sourceAccount: "00000000-0000-0000-0000-000000000022",
  targetAccount: "00000000-0000-0000-0000-000000000023",
};

test.beforeAll(async () => {
  // Real-stack integration test: no mocks. Testcontainers spins up a real
  // Postgres instance, the real user-service and bank-account-service images
  // (built from their Dockerfiles), and points bff-service at them.
  test.setTimeout(180000);

  if (process.env.BASE_URL) {
    bffUrl = process.env.BASE_URL;
    console.log(`Using external target BASE_URL: ${bffUrl}`);
    return;
  }

  // 1. Set up infrastructure containers.
  network = await startNetwork();
  dbContainer = await startPostgres(network);

  console.log("Starting WireMock container to stand in for Paotang Pass, OTP...");
  wiremockContainer = await startWiremock(network, "paotang", [
    wiremockMapping("paotang", { flat: true }),
    wiremockMapping("otp", { flat: true }),
    wiremockMapping("sms", { flat: true }),
  ]);

  userServiceContainer = await startUserService(network, dbContainer, {
    PAOTANG_SERVICE_URL: "http://paotang:8080",
    PAOTANG_CLIENT_ID: "dummy-client-id",
    PAOTANG_CLIENT_SECRET: "dummy-client-secret",
    OTP_SERVICE_URL: "http://paotang:8080",
  });

  bankAccountServiceContainer = await startBankAccountService(network, dbContainer, {});

  transferServiceContainer = await startTransferService(network, dbContainer);
  smsServiceContainer = await startSMSService(network, {
    SMS_UPSTREAM_URL: "http://paotang:8080",
    SMS_API_KEY: "dummy-sms-api-key",
  });

  bffContainer = await startBffService(network, {
    USER_SERVICE_URL: "http://user-service:8080",
    BANK_ACCOUNT_SERVICE_URL: "http://bank-account-service:8080",
    EKYC_SERVICE_URL: "http://ekyc-service:8080",
    TRANSFER_SERVICE_URL: "http://transfer-service:8080",
    SMS_SERVICE_URL: "http://sms-service:8080",
  });

  const host = bffContainer.getHost();
  const port = bffContainer.getMappedPort(8080);
  bffUrl = `http://${host}:${port}`;
  console.log(`BFF service container is ready at: ${bffUrl}`);

  // Run migrations and seed data last, after the full infrastructure is ready.
  await runMigrations(dbContainer);

  // Direct database seeding is optional; API seeding is the default.
  if (process.env.SEED_MODE === "direct") {
    ({ userId: seededUserId, sourceAccountId: seededSourceAccountId, targetAccountId: seededTargetAccountId } =
      await seedTestDataDirectly(dbContainer, seedData, directSeedIds));
  } else {
    const userServiceUrl = `http://${userServiceContainer.getHost()}:${userServiceContainer.getMappedPort(8080)}`;
    const bankAccountServiceUrl = `http://${bankAccountServiceContainer.getHost()}:${bankAccountServiceContainer.getMappedPort(8080)}`;
    ({ userId: seededUserId, sourceAccountId: seededSourceAccountId, targetAccountId: seededTargetAccountId } =
      await seedTestData(userServiceUrl, bankAccountServiceUrl, seedData));
  }
});

test.afterAll(async () => {
  await stopAll(
    [bffContainer, smsServiceContainer, transferServiceContainer, bankAccountServiceContainer, userServiceContainer, wiremockContainer, dbContainer],
    network
  );
});

test.afterEach(async ({ request }: { request: APIRequestContext }) => {
  if (wiremockContainer) {
    const host = wiremockContainer.getHost();
    const port = wiremockContainer.getMappedPort(8080);
    await request.post(`http://${host}:${port}/__admin/scenarios/reset`);
  }
});

test.describe("BFF Service Integration Tests", () => {
  test.describe("/api/v1/users", () => {
    test("should fetch user details and their filtered bank accounts", async ({ request }) => {
      console.log(`Fetching user details from BFF: ${bffUrl}/api/v1/users/${seededUserId}`);
      const response = await request.get(`${bffUrl}/api/v1/users/${seededUserId}`);
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      console.log("Response data received:", JSON.stringify(data));

      expect(data.user).toEqual({
        id: seededUserId,
        name: mockUserName,
        email: mockUserEmail,
        phone: mockUserPhone,
        status: "active",
      });

      // Verify accounts are correctly filtered (only seededUserId's accounts)
      expect(data.accounts).toHaveLength(2);
      expect(data.accounts).toContainEqual(
        expect.objectContaining({
          user_id: seededUserId,
          balance: mockAcc1Balance,
          currency: mockAcc1Currency,
        })
      );
      expect(data.accounts).toContainEqual(
        expect.objectContaining({
          user_id: seededUserId,
          balance: mockAcc2Balance,
          currency: mockAcc2Currency,
        })
      );
    });

    test("should return 404 if user does not exist", async ({ request }) => {
      // Must be a well-formed UUID (real Postgres UUID column) that was never
      // inserted, otherwise the query fails on invalid syntax instead of a miss.
      const nonexistentId = "00000000-0000-0000-0000-000000000000";
      console.log(`Testing nonexistent user fetch: ${bffUrl}/api/v1/users/${nonexistentId}`);
      const response = await request.get(`${bffUrl}/api/v1/users/${nonexistentId}`);
      expect(response.status()).toBe(HttpStatusCode.NotFound);
    });

    test("should proxy user creation requests to user-service", async ({ request }) => {
      console.log(`Creating a user via BFF: ${bffUrl}/api/v1/users`);
      const response = await request.post(`${bffUrl}/api/v1/users`, {
        data: {
          name: "Alice Johnson",
          email: "alice@example.com",
          phone: "+66800000002",
        },
      });
      expect(response.status()).toBe(HttpStatusCode.Created);

      const data = await response.json();
      console.log("Created user response:", JSON.stringify(data));

      expect(data).toEqual({
        id: expect.any(String),
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "+66800000002",
        status: "active",
      });
    });

    test("should reject duplicate user email", async ({ request }) => {
      const user = {
        name: "Duplicate User",
        email: "duplicate@example.com",
        phone: "+66800000004",
      };

      const first = await request.post(`${bffUrl}/api/v1/users`, { data: user });
      expect(first.status()).toBe(HttpStatusCode.Created);

      const duplicate = await request.post(`${bffUrl}/api/v1/users`, { data: user });
      expect(duplicate.status()).toBe(HttpStatusCode.Conflict);
      expect(await duplicate.json()).toEqual({ error: "User with email already exists" });
    });

    test("should return 400 when phone is missing on user creation", async ({ request }) => {
      console.log(`Creating a user without phone via BFF: ${bffUrl}/api/v1/users`);
      const response = await request.post(`${bffUrl}/api/v1/users`, {
        data: {
          name: "Bob Missing Phone",
          email: "bob@example.com",
        },
      });
      expect(response.status()).toBe(HttpStatusCode.BadRequest);
    });

    test("should return empty accounts array for a user with no accounts", async ({ request }) => {
      console.log(`Creating a user with no accounts via BFF: ${bffUrl}/api/v1/users`);
      const createResponse = await request.post(`${bffUrl}/api/v1/users`, {
        data: {
          name: "No Accounts User",
          email: "no-accounts@example.com",
          phone: "+66800000003",
        },
      });
      expect(createResponse.status()).toBe(HttpStatusCode.Created);
      const { id: newUserId } = await createResponse.json();

      const response = await request.get(`${bffUrl}/api/v1/users/${newUserId}`);
      expect(response.ok()).toBeTruthy();

      const data = await response.json();
      // bff-service encodes an empty accounts slice as JSON null (Go nil-slice
      // marshaling), not [] -- assert the real wire behavior.
      expect(data.accounts).toBeNull();
    });

    test("should return 400 for malformed JSON body on user creation", async ({ request }) => {
      console.log(`Creating a user with malformed JSON via BFF: ${bffUrl}/api/v1/users`);
      const response = await request.post(`${bffUrl}/api/v1/users`, {
        headers: { "Content-Type": "application/json" },
        data: "{not valid json",
      });
      expect(response.status()).toBe(HttpStatusCode.BadRequest);
    });
  });

  test.describe("/auth", () => {
    test("should reject Paotang authcode replay (one-time use)", async ({ request }) => {
      console.log(`Exchanging one-time authcode via BFF: ${bffUrl}/auth/paotang/callback`);
      const first = await request.post(`${bffUrl}/auth/paotang/callback`, {
        headers: { "Mock-Scenario": MOCK_SCENARIO.PAOTANG.SUCCESS_ONCE },
        data: { code: "one-time-authcode" },
      });
      expect(first.status()).toBe(HttpStatusCode.Ok);
      expect(await first.json()).toEqual({
        access_token: "mock-access-token",
        token_type: "Bearer",
        expires_in: 3600,
      });

      const replay = await request.post(`${bffUrl}/auth/paotang/callback`, {
        headers: { "Mock-Scenario": MOCK_SCENARIO.PAOTANG.SUCCESS_ONCE },
        data: { code: "one-time-authcode" },
      });
      expect(replay.status()).toBe(HttpStatusCode.BadRequest);
      expect(await replay.json()).toEqual({ error: "invalid_grant" });
    });

    test("should verify OTP code successfully", async ({ request }) => {
      console.log(`Verifying OTP via BFF: ${bffUrl}/auth/otp/verify`);
      const response = await request.post(`${bffUrl}/auth/otp/verify`, {
        headers: { "Mock-Scenario": MOCK_SCENARIO.OTP.SUCCESS },
        data: { phone: mockUserPhone, code: "123456" },
      });
      expect(response.status()).toBe(HttpStatusCode.Ok);
      expect(await response.json()).toEqual({ verified: true });
    });

    test("should reject invalid OTP code", async ({ request }) => {
      console.log(`Verifying invalid OTP via BFF: ${bffUrl}/auth/otp/verify`);
      const response = await request.post(`${bffUrl}/auth/otp/verify`, {
        headers: { "Mock-Scenario": MOCK_SCENARIO.OTP.INVALID },
        data: { phone: mockUserPhone, code: "000000" },
      });
      expect(response.status()).toBe(HttpStatusCode.BadRequest);
      expect(await response.json()).toEqual({ error: "invalid_otp" });
    });
  });

  test.describe("/api/v1/ekycs", () => {
    test("should proxy eKYC verification request to ekyc-service", async ({ request }) => {
      console.log(`Proxying eKYC verify via BFF: ${bffUrl}/api/v1/ekycs/verify`);
      const response = await request.post(`${bffUrl}/api/v1/ekycs/verify`, {
        data: {
          customer_id: seededUserId,
          national_id: "1234567890123",
          full_name: mockUserName,
        },
      });
      expect(response.status()).toBe(HttpStatusCode.Created);
      const data = await response.json();
      expect(data.status).toBe("APPROVED");
      expect(data.customer_id).toBe(seededUserId);
    });
  });

  test.describe("/api/v1/transfers", () => {
    test("should proxy transfer request to transfer-service", async ({ request }) => {
      console.log(`Proxying transfer via BFF: ${bffUrl}/api/v1/transfers`);
      const response = await request.post(`${bffUrl}/api/v1/transfers`, {
        data: {
          source_account_id: seededSourceAccountId,
          target_account_id: seededTargetAccountId,
          amount: 500,
          currency: mockAcc1Currency,
        },
      });
      expect(response.status()).toBe(HttpStatusCode.Created);
      const data = await response.json();
      expect(data.status).toBe("COMPLETED");
      expect(data.amount).toBe(500);
    });

    test("should reject transfer with insufficient funds", async ({ request }) => {
      const response = await request.post(`${bffUrl}/api/v1/transfers`, {
        data: {
          source_account_id: seededSourceAccountId,
          target_account_id: seededTargetAccountId,
          amount: mockAcc1Balance + 1,
          currency: mockAcc1Currency,
        },
      });
      expect(response.status()).toBe(HttpStatusCode.BadRequest);
      expect(await response.json()).toEqual({
        error: "insufficient funds",
        code: "INSUFFICIENT_FUNDS",
      });
    });

    test("should retrieve a created transfer through the BFF", async ({ request }) => {
      const createResponse = await request.post(`${bffUrl}/api/v1/transfers`, {
        data: {
          source_account_id: seededSourceAccountId,
          target_account_id: seededTargetAccountId,
          amount: 125,
          currency: mockAcc1Currency,
        },
      });
      expect(createResponse.status()).toBe(HttpStatusCode.Created);

      const created = await createResponse.json();
      expect(createResponse.headers().location).toBe(`/transfers/${created.id}`);

      const response = await request.get(`${bffUrl}/api/v1/transfers/${created.id}`);
      expect(response.status()).toBe(HttpStatusCode.Ok);
      expect(await response.json()).toEqual(
        expect.objectContaining({
          id: created.id,
          source_account_id: seededSourceAccountId,
          target_account_id: seededTargetAccountId,
          amount: 125,
          currency: mockAcc1Currency,
          status: "COMPLETED",
        })
      );
    });

    test("should list transfers through the BFF", async ({ request }) => {
      const response = await request.get(`${bffUrl}/api/v1/transfers`);
      expect(response.status()).toBe(HttpStatusCode.Ok);

      const transfers = await response.json();
      expect(Array.isArray(transfers)).toBeTruthy();
      expect(transfers.length).toBeGreaterThan(0);
      expect(transfers).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            source_account_id: seededSourceAccountId,
            target_account_id: seededTargetAccountId,
            status: "COMPLETED",
          }),
        ])
      );
    });

    test("should reject a transfer between the same account", async ({ request }) => {
      const response = await request.post(`${bffUrl}/api/v1/transfers`, {
        data: {
          source_account_id: seededSourceAccountId,
          target_account_id: seededSourceAccountId,
          amount: 100,
          currency: mockAcc1Currency,
        },
      });
      expect(response.status()).toBe(HttpStatusCode.BadRequest);
      expect(await response.json()).toEqual({
        error: "source and target accounts must be different",
        code: "VALIDATION_FAILED",
      });
    });

    test("should reject a transfer with a currency mismatch", async ({ request }) => {
      const response = await request.post(`${bffUrl}/api/v1/transfers`, {
        data: {
          source_account_id: seededSourceAccountId,
          target_account_id: seededTargetAccountId,
          amount: 100,
          currency: "THB",
        },
      });
      expect(response.status()).toBe(HttpStatusCode.BadRequest);
      expect(await response.json()).toEqual({
        error: "source, target, and transfer currencies must match",
        code: "CURRENCY_MISMATCH",
      });
    });
  });
});
