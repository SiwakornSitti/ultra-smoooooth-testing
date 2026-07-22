import { test, expect } from "@playwright/test";
import { StartedNetwork, StartedTestContainer } from "testcontainers";
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import * as path from "path";
import * as dotenv from "dotenv";
import {
  startNetwork,
  startPostgres,
  startWiremock,
  startUserService,
  startBankAccountService,
  startBffService,
  stopAll,
  wiremockMapping,
} from "../support/containers";

// Try loading multiple possible .env locations
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env.qa") });
dotenv.config({ path: path.resolve(__dirname, "../../../project.env") });

let network: StartedNetwork;
let dbContainer: StartedPostgreSqlContainer;
let wiremockContainer: StartedTestContainer;
let userServiceContainer: StartedTestContainer;
let bankAccountServiceContainer: StartedTestContainer;
let bffContainer: StartedTestContainer;
let bffUrl: string;

const mockUserName = process.env.MOCK_USER_NAME || "Jane Doe";
const mockUserEmail = process.env.MOCK_USER_EMAIL || "jane.doe@example.com";
const mockUserPhone = process.env.MOCK_USER_PHONE || "+66800000001";

const mockAcc1Balance = parseFloat(process.env.MOCK_ACC_1_BALANCE || "2500.75");
const mockAcc1Currency = process.env.MOCK_ACC_1_CURRENCY || "USD";

const mockAcc2Balance = parseFloat(process.env.MOCK_ACC_2_BALANCE || "120.5");
const mockAcc2Currency = process.env.MOCK_ACC_2_CURRENCY || "EUR";

// Filled in after seeding, since Postgres generates the UUIDs.
let seededUserId: string;

async function seedTestData(userServiceUrl: string, bankAccountServiceUrl: string) {
  console.log("Seeding test data...");

  const createUserRes = await fetch(`${userServiceUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: mockUserName, email: mockUserEmail, phone: mockUserPhone }),
  });
  const createdUser = await createUserRes.json();
  seededUserId = createdUser.id;

  await fetch(`${bankAccountServiceUrl}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: seededUserId,
      balance: mockAcc1Balance,
      currency: mockAcc1Currency,
    }),
  });

  await fetch(`${bankAccountServiceUrl}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: seededUserId,
      balance: mockAcc2Balance,
      currency: mockAcc2Currency,
    }),
  });
}

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

  network = await startNetwork();
  dbContainer = await startPostgres(network);

  console.log("Starting WireMock container to stand in for Paotang Pass, OTP...");
  wiremockContainer = await startWiremock(network, "paotang", [
    wiremockMapping("paotang", { flat: true }),
    wiremockMapping("otp", { flat: true }),
  ]);

  userServiceContainer = await startUserService(network, {
    PAOTANG_SERVICE_URL: "http://paotang:8080",
    PAOTANG_CLIENT_ID: "dummy-client-id",
    PAOTANG_CLIENT_SECRET: "dummy-client-secret",
    OTP_SERVICE_URL: "http://paotang:8080",
  });

  bankAccountServiceContainer = await startBankAccountService(network, {});

  const userServiceUrl = `http://${userServiceContainer.getHost()}:${userServiceContainer.getMappedPort(8080)}`;
  const bankAccountServiceUrl = `http://${bankAccountServiceContainer.getHost()}:${bankAccountServiceContainer.getMappedPort(8080)}`;
  await seedTestData(userServiceUrl, bankAccountServiceUrl);

  bffContainer = await startBffService(network, {
    USER_SERVICE_URL: "http://user-service:8080",
    BANK_ACCOUNT_SERVICE_URL: "http://bank-account-service:8080",
  });

  const host = bffContainer.getHost();
  const port = bffContainer.getMappedPort(8080);
  bffUrl = `http://${host}:${port}`;
  console.log(`BFF service container is ready at: ${bffUrl}`);
});

test.afterAll(async () => {
  await stopAll(
    [bffContainer, bankAccountServiceContainer, userServiceContainer, wiremockContainer, dbContainer],
    network
  );
});

test.describe("BFF Service Integration Tests", () => {
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
    expect(response.status()).toBe(404);
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
    expect(response.status()).toBe(201);

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

  test("should return 400 when phone is missing on user creation", async ({ request }) => {
    console.log(`Creating a user without phone via BFF: ${bffUrl}/api/v1/users`);
    const response = await request.post(`${bffUrl}/api/v1/users`, {
      data: {
        name: "Bob Missing Phone",
        email: "bob@example.com",
      },
    });
    expect(response.status()).toBe(400);
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
    expect(createResponse.status()).toBe(201);
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
    expect(response.status()).toBe(400);
  });

  test("should reject Paotang authcode replay (one-time use)", async ({ request }) => {
    console.log(`Exchanging one-time authcode via BFF: ${bffUrl}/auth/paotang/callback`);
    const first = await request.post(`${bffUrl}/auth/paotang/callback`, {
      headers: { "Mock-Scenario": "PT_PASS:SUCCESS_ONCE" },
      data: { code: "one-time-authcode" },
    });
    expect(first.status()).toBe(200);
    expect(await first.json()).toEqual({
      access_token: "mock-access-token",
      token_type: "Bearer",
      expires_in: 3600,
    });

    const replay = await request.post(`${bffUrl}/auth/paotang/callback`, {
      headers: { "Mock-Scenario": "PT_PASS:SUCCESS_ONCE" },
      data: { code: "one-time-authcode" },
    });
    expect(replay.status()).toBe(400);
    expect(await replay.json()).toEqual({ error: "invalid_grant" });
  });

  test("should verify OTP code successfully", async ({ request }) => {
    console.log(`Verifying OTP via BFF: ${bffUrl}/auth/otp/verify`);
    const response = await request.post(`${bffUrl}/auth/otp/verify`, {
      headers: { "Mock-Scenario": "OTP:SUCCESS" },
      data: { phone: mockUserPhone, code: "123456" },
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ verified: true });
  });

  test("should reject invalid OTP code", async ({ request }) => {
    console.log(`Verifying invalid OTP via BFF: ${bffUrl}/auth/otp/verify`);
    const response = await request.post(`${bffUrl}/auth/otp/verify`, {
      headers: { "Mock-Scenario": "OTP:INVALID" },
      data: { phone: mockUserPhone, code: "000000" },
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({ error: "invalid_otp" });
  });
});
