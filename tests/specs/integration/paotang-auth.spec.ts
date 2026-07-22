import { test, expect } from "@playwright/test";
import { StartedNetwork, StartedTestContainer } from "testcontainers";
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import {
  startNetwork,
  startPostgres,
  startWiremock,
  startUserService,
  startBffService,
  stopAll,
  wiremockMapping,
} from "../support/containers";

// Real-service test: bff-service, user-service, and Postgres run for real
// (Testcontainers, built from Dockerfile). Only Paotang Pass, the true
// external dependency, is mocked via WireMock. Requests go through bff-service,
// which proxies to user-service.

let network: StartedNetwork;
let dbContainer: StartedPostgreSqlContainer;
let wiremockContainer: StartedTestContainer;
let userServiceContainer: StartedTestContainer;
let bffContainer: StartedTestContainer;
let bffUrl: string;

test.beforeAll(async () => {
  test.setTimeout(180000);

  network = await startNetwork();
  dbContainer = await startPostgres(network);

  console.log("Starting WireMock container to stand in for Paotang Pass...");
  wiremockContainer = await startWiremock(network, "paotang", [wiremockMapping("paotang", { flat: true })]);

  userServiceContainer = await startUserService(network, {
    PAOTANG_SERVICE_URL: "http://paotang:8080",
    PAOTANG_CLIENT_ID: "dummy-client-id",
    PAOTANG_CLIENT_SECRET: "dummy-client-secret",
  });

  bffContainer = await startBffService(network, {
    USER_SERVICE_URL: "http://user-service:8080",
  });

  const host = bffContainer.getHost();
  const port = bffContainer.getMappedPort(8080);
  bffUrl = `http://${host}:${port}`;
  console.log(`bff-service container is ready at: ${bffUrl}`);
});

test.afterAll(async () => {
  await stopAll([bffContainer, userServiceContainer, wiremockContainer, dbContainer], network);
});

test.describe("Paotang Pass integration (via bff-service)", () => {
  test("should exchange valid authcode for access token", async ({ request }) => {
    const response = await request.post(`${bffUrl}/auth/paotang/callback`, {
      headers: { "Mock-Scenario": "PT_PASS:SUCCESS" },
      data: { code: "test-authcode" },
    });
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toEqual({
      access_token: "mock-access-token",
      token_type: "Bearer",
      expires_in: 3600,
    });
  });

  test("should return invalid_grant for bad authcode", async ({ request }) => {
    const response = await request.post(`${bffUrl}/auth/paotang/callback`, {
      headers: { "Mock-Scenario": "PT_PASS:INVALID_GRANT" },
      data: { code: "bad-authcode" },
    });
    expect(response.status()).toBe(400);

    const data = await response.json();
    expect(data).toEqual({ error: "invalid_grant" });
  });

  test("should reject authcode replay (stateful scenario)", async ({ request }) => {
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
});
