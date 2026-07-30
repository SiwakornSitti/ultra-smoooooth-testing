import { test, expect, APIRequestContext } from "@playwright/test";
import { HttpStatusCode } from "axios";
import { StartedNetwork, StartedTestContainer } from "testcontainers";
import {
  startNetwork,
  startWiremock,
  stopAll,
  wiremockMapping,
} from "../support/containers";
import { MOCK_SCENARIO } from "../support/mock-scenario";

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
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/users?role=ADMIN&status=active`, {
      headers: { "Mock-Scenario": MOCK_SCENARIO.OTP.INVALID },
    });
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
        customer: {
          email: "alice@example.com",
          name: "Alice",
        },
        items: [
          { sku: "SKU-001" },
        ],
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
        "X-Request-ID": "req-12345",
        "X-Client-Role": "system-admin",
      },
    });
    expect(res.status()).toBe(HttpStatusCode.Ok);
    const body = await res.json();
    expect(body).toEqual({
      authenticated: true,
      scope: "read:write",
    });
  });

  test("Scenario 4: Body File Response", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/body-file`);

    expect(res.status()).toBe(HttpStatusCode.Ok);
    expect(await res.json()).toEqual({
      source: "body-file",
      message: "This response is loaded from WireMock __files.",
      items: [
        {
          id: "item-001",
          name: "File-backed item",
          available: true,
        },
      ],
    });
  });

  test("Scenario 5: Priority-Based Overriding", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/products/vip`);
    expect(res.status()).toBe(HttpStatusCode.Ok);
    const body = await res.json();
    expect(body.product).toBe("VIP Gold Membership");
  });

  test("Scenario 6: Response Template Echo and Helpers", async ({ request }: { request: APIRequestContext }) => {
    const echoRes = await request.get(`${wiremockUrl}/lab/api/stateless/echo/item-999?name=John`, {
      headers: {
        "X-Request-ID": "req-trace-abc-123",
      },
    });
    expect(echoRes.status()).toBe(HttpStatusCode.Ok);
    const echoBody = await echoRes.json();
    expect(echoBody.extracted_path_id).toBe("item-999");
    expect(echoBody.echo_header).toBe("req-trace-abc-123");
    expect(echoBody.query_name).toBe("John");

    const helperRes = await request.post(`${wiremockUrl}/lab/api/stateless/template-helpers`, {
      headers: {
        "Content-Type": "application/json",
        "X-Request-ID": "req-helper-001",
      },
      data: {
        customer: {
          email: "alice@example.com",
        },
      },
    });

    expect(helperRes.status()).toBe(HttpStatusCode.Ok);
    const helperBody = await helperRes.json();
    expect(helperBody.request_id).toBe("req-helper-001");
    expect(helperBody.customer_email).toBe("alice@example.com");
    expect(helperBody.generated_token).toMatch(/^[A-Za-z0-9]{12}$/);
    expect(helperBody.received_at).toEqual(expect.any(String));
    expect(helperBody.received_at.length).toBeGreaterThan(0);
  });

  test("Scenario 7: Faker Response Template", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/faker-user`);

    expect(res.status()).toBe(HttpStatusCode.Ok);
    const body = await res.json();
    expect(body.first_name).toEqual(expect.any(String));
    expect(body.last_name).toEqual(expect.any(String));
    expect(body.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(body.phone).toEqual(expect.any(String));
    expect(body.company).toEqual(expect.any(String));
    expect(body.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  test("Scenario 8: Fixed Delay Simulation", async ({ request }: { request: APIRequestContext }) => {
    const startTime = Date.now();
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/slow-endpoint`);
    const duration = Date.now() - startTime;

    expect(res.status()).toBe(HttpStatusCode.Ok);
    expect(duration).toBeGreaterThanOrEqual(450);
  });

  test("Scenario 9: Random Delay Simulation", async ({ request }: { request: APIRequestContext }) => {
    const startTime = Date.now();
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/random-delay`);
    const duration = Date.now() - startTime;

    expect(res.status()).toBe(HttpStatusCode.Ok);
    expect(duration).toBeGreaterThanOrEqual(90);
    expect(duration).toBeLessThan(1000);
    const body = await res.json();
    expect(body.delayRangeMilliseconds).toEqual({ min: 100, max: 500 });
  });

  test("Scenario 10: Lognormal Delay Simulation", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/lognormal-delay`);

    expect(res.status()).toBe(HttpStatusCode.Ok);
    const body = await res.json();
    expect(body.delayDistribution).toEqual({
      type: "lognormal",
      median: 250,
      sigma: 0.4,
      maxValue: 1000,
    });
  });

  test("Scenario 11: Chunked Dribble Delay Simulation", async ({ request }: { request: APIRequestContext }) => {
    const startTime = Date.now();
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/chunked-delay`);
    const duration = Date.now() - startTime;

    expect(res.status()).toBe(HttpStatusCode.Ok);
    expect(duration).toBeGreaterThanOrEqual(850);
    expect(duration).toBeLessThan(2000);
    expect(res.headers()["content-type"]).toMatch(/application\/json/);
    const body = await res.json();
    expect(body).toEqual({
      message: "Response delivered in chunks",
      chunks: 5,
    });
  });

  test("Scenario 12: PokeAPI Mock or Proxy", async ({ request }: { request: APIRequestContext }) => {
    const mockRes = await request.get(`${wiremockUrl}/lab/api/stateless/pokemon/ditto/`, {
      headers: {
        "Mock-Scenario": "POKEAPI:MOCK",
      },
    });

    expect(mockRes.status()).toBe(HttpStatusCode.Ok);
    const mockBody = await mockRes.json();
    expect(mockBody).toEqual(expect.objectContaining({
      id: 132,
      name: "ditto",
      mocked: true,
    }));

    const proxyRes = await request.get(`${wiremockUrl}/lab/api/stateless/pokemon/ditto/`);

    expect(proxyRes.status()).toBe(HttpStatusCode.Ok);
    const proxyBody = await proxyRes.json();
    expect(proxyBody.name).toBe("ditto");
    expect(proxyBody.id).toBe(132);
    expect(proxyBody.types).toEqual(expect.arrayContaining([
      expect.objectContaining({
        type: expect.objectContaining({ name: "normal" }),
      }),
    ]));
  });

  test("Scenario 13: Stateless Webhook Callback", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.post(`${wiremockUrl}/lab/api/stateless/webhook-orders`, {
      headers: {
        "Content-Type": "application/json",
        "X-Correlation-ID": "corr-webhook-001",
      },
      data: {
        order_id: "ord-webhook-001",
      },
    });

    expect(res.status()).toBe(HttpStatusCode.Accepted);
    expect(await res.json()).toEqual({
      accepted: true,
      order_id: "ord-webhook-001",
    });

    type JournalRequest = {
      request: {
        method: string;
        url: string;
        body?: string;
      };
    };

    let callback: JournalRequest | undefined;
    for (let attempt = 0; attempt < 30 && !callback; attempt += 1) {
      const journalRes = await request.get(`${wiremockUrl}/__admin/requests`);
      const journal = await journalRes.json() as { requests: JournalRequest[] };
      callback = journal.requests.find(({ request: journalRequest }) =>
        journalRequest.method === "POST" &&
        journalRequest.url === "/lab/api/stateless/webhook-receiver" &&
        journalRequest.body?.includes("ord-webhook-001")
      );

      if (!callback) await new Promise((resolve) => setTimeout(resolve, 100));
    }

    expect(callback).toBeDefined();
    expect(JSON.parse(callback?.request.body ?? "{}")).toEqual({
      event_type: "order.created",
      order_id: "ord-webhook-001",
      correlation_id: "corr-webhook-001",
    });
  });

  test("Scenario 14: Catch-All Fallback Stub", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.get(`${wiremockUrl}/lab/api/stateless/non-existent-route`);
    expect(res.status()).toBe(HttpStatusCode.NotFound);
    const body = await res.json();
    expect(body.error).toBe("NOT_FOUND");
  });

  test("Headers: Combined Match Fails When One Condition Fails", async ({ request }: { request: APIRequestContext }) => {
    const res = await request.post(`${wiremockUrl}/lab/api/stateless/secure`, {
      headers: {
        "Authorization": "Bearer secret-token-4040",
        "X-Client-ID": "qa-client",
        "X-Request-ID": "invalid-request-id",
        "X-Client-Role": "system-admin",
      },
    });

    expect(res.status()).toBe(HttpStatusCode.NotFound);
  });

});
