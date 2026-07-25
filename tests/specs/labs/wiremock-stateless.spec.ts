import { test, expect, APIRequestContext } from "@playwright/test";
import { HttpStatusCode } from "axios";
import { StartedNetwork, StartedTestContainer } from "testcontainers";
import {
  startNetwork,
  startWiremock,
  stopAll,
  wiremockMapping,
} from "../support/containers";

let network: StartedNetwork;
let wiremockContainer: StartedTestContainer;
let wiremockUrl: string;

test.beforeAll(async () => {
  test.setTimeout(120000);

  network = await startNetwork();

  console.log("Starting WireMock container with lab-stateless mappings...");
  wiremockContainer = await startWiremock(network, "wiremock-stateless-lab", [
    wiremockMapping("lab-stateless", { flat: true }),
  ]);

  const host = wiremockContainer.getHost();
  const port = wiremockContainer.getMappedPort(8080);
  wiremockUrl = `http://${host}:${port}`;
  console.log(`WireMock Stateless Lab instance ready at: ${wiremockUrl}`);
});

test.afterAll(async () => {
  await stopAll([wiremockContainer], network);
});

test.describe("Lab: WireMock Stateless Stubs & Pattern Matching", () => {
  test("Scenario 1: Path & Query Parameter Matching", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/users?role=admin&status=active`);
    expect(res.status()).toBe(HttpStatusCode.Ok);
    const body = await res.json();
    expect(body.users).toHaveLength(1);
    expect(body.users[0]).toEqual({
      id: "usr-99",
      role: "admin",
      status: "active",
    });
  });

  test("Scenario 2: JSONPath Body Matching", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.post(`${wiremockUrl}/lab/api/stateless/payments`, {
      headers: { "Content-Type": "application/json" },
      data: {
        payment: {
          amount: 2500,
          currency: "THB",
        },
      },
    });
    expect(res.status()).toBe(HttpStatusCode.Created);
    const body = await res.json();
    expect(body).toEqual({
      status: "APPROVED",
      flag: "HIGH_VALUE_TRANSACTION",
    });
  });

  test("Scenario 3: Header Regex & Exact Matching", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.post(`${wiremockUrl}/lab/api/stateless/secure`, {
      headers: {
        "Authorization": "Bearer secret-token-4040",
        "X-Client-ID": "qa-client",
      },
    });
    expect(res.status()).toBe(HttpStatusCode.Ok);
    const body = await res.json();
    expect(body).toEqual({
      authenticated: true,
      scope: "read:write",
    });
  });

  test("Scenario 4: Priority-Based Overriding", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/products/vip`);
    expect(res.status()).toBe(HttpStatusCode.Ok);
    const body = await res.json();
    expect(body.product).toBe("VIP Gold Membership");
  });

  test("Scenario 5: Dynamic Handlebars Response Templating", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/echo/item-999?name=John`, {
      headers: {
        "X-Request-ID": "req-trace-abc-123",
      },
    });
    expect(res.status()).toBe(HttpStatusCode.Ok);
    const body = await res.json();
    expect(body.extracted_path_id).toBe("item-999");
    expect(body.echo_header).toBe("req-trace-abc-123");
    expect(body.query_name).toBe("John");
  });

  test("Scenario 6: Fixed Delay Simulation", async ({ request }: { request: APIRequestContext }) => {
    const startTime = Date.now();
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/slow-endpoint`);
    const duration = Date.now() - startTime;

    expect(res.status()).toBe(HttpStatusCode.Ok);
    expect(duration).toBeGreaterThanOrEqual(450);
  });

  test("Scenario 7: Catch-All Fallback Stub", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/non-existent-route`);
    expect(res.status()).toBe(HttpStatusCode.NotFound);
    const body = await res.json();
    expect(body.error).toBe("NOT_FOUND");
  });
});
