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

  console.log("Starting WireMock container with lab-stateful mappings...");
  wiremockContainer = await startWiremock(network, "wiremock-lab", [
    wiremockMapping("lab-stateful", { flat: true }),
  ]);

  const host = wiremockContainer.getHost();
  const port = wiremockContainer.getMappedPort(8080);
  wiremockUrl = `http://${host}:${port}`;
  console.log(`WireMock Lab instance ready at: ${wiremockUrl}`);
});

test.afterAll(async () => {
  await stopAll([wiremockContainer], network);
});

test.afterEach(async ({ request }: { request: APIRequestContext }) => {
  // Clear WireMock stateful scenario states back to 'Started' after each test
  if (wiremockUrl) {
    await request.post(`${wiremockUrl}/__admin/scenarios/reset`);
  }
});

test.describe("Lab: WireMock Stateful Stubs & Scenario State Machine", () => {
  test("Scenario 1: One-Time Token Exchange & Replay Prevention", async ({ request }: { request: APIRequestContext }) => {
    // Attempt 1: State is 'Started' -> Expected: 200 OK, transition state to 'TOKEN_ISSUED'
    const res1 = await request.post(`${wiremockUrl}/lab/api/oauth/token`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: "grant_type=authorization_code&code=lab-code-001",
    });
    expect(res1.status()).toBe(HttpStatusCode.Ok);
    const data1 = await res1.json();
    expect(data1.access_token).toBe("lab-mock-token-12345");

    // Attempt 2: Replay attempt, state is 'TOKEN_ISSUED' -> Expected: 400 Bad Request
    const res2 = await request.post(`${wiremockUrl}/lab/api/oauth/token`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: "grant_type=authorization_code&code=lab-code-001",
    });
    expect(res2.status()).toBe(HttpStatusCode.BadRequest);
    const data2 = await res2.json();
    expect(data2.error).toBe("invalid_grant");
  });

  test("Scenario 2: Order Fulfillment Lifecycle (State Machine)", async ({ request }: { request: APIRequestContext }) => {
    // 1. Initial State: 'Started' -> Get Order -> Status: PENDING
    const getPending = await request.get(`${wiremockUrl}/lab/api/orders/101`);
    expect(getPending.status()).toBe(HttpStatusCode.Ok);
    expect(await getPending.json()).toMatchObject({
      order_id: "101",
      status: "PENDING",
    });

    // 2. Action: Pay Order -> State transitions to 'PAID'
    const payRes = await request.post(`${wiremockUrl}/lab/api/orders/101/pay`);
    expect(payRes.status()).toBe(HttpStatusCode.Ok);
    expect(await payRes.json()).toMatchObject({
      order_id: "101",
      status: "PAID",
      message: "Payment successful",
    });

    // 3. Action: Ship Order -> State transitions to 'SHIPPED'
    const shipRes = await request.post(`${wiremockUrl}/lab/api/orders/101/ship`);
    expect(shipRes.status()).toBe(HttpStatusCode.Ok);
    expect(await shipRes.json()).toMatchObject({
      order_id: "101",
      status: "SHIPPED",
      tracking_number: "TRACK-TH-998877",
    });

    // 4. Invalid Action: Ship again while state is 'SHIPPED' -> Expected: 400 ALREADY_SHIPPED
    const shipInvalid = await request.post(`${wiremockUrl}/lab/api/orders/101/ship`);
    expect(shipInvalid.status()).toBe(HttpStatusCode.BadRequest);
    expect(await shipInvalid.json()).toMatchObject({
      error: "ALREADY_SHIPPED",
    });
  });

  test("Scenario 3: Transient Failure & Self-Healing Retry Flow", async ({ request }: { request: APIRequestContext }) => {
    // Attempt 1: State 'Started' -> Returns 503, transitions to 'FAIL_1'
    const attempt1 = await request.get(`${wiremockUrl}/lab/api/unstable-endpoint`);
    expect(attempt1.status()).toBe(HttpStatusCode.ServiceUnavailable);

    // Attempt 2: State 'FAIL_1' -> Returns 503, transitions to 'FAIL_2'
    const attempt2 = await request.get(`${wiremockUrl}/lab/api/unstable-endpoint`);
    expect(attempt2.status()).toBe(HttpStatusCode.ServiceUnavailable);

    // Attempt 3: State 'FAIL_2' -> Returns 200 OK (Recovered!)
    const attempt3 = await request.get(`${wiremockUrl}/lab/api/unstable-endpoint`);
    expect(attempt3.status()).toBe(HttpStatusCode.Ok);
    expect(await attempt3.json()).toMatchObject({
      status: "SUCCESS",
      message: "Service recovered on attempt 3",
    });
  });

  test("Scenario 4: Payment Webhook Idempotency", async ({ request }: { request: APIRequestContext }) => {
    const webhook = {
      event_id: "evt-payment-001",
      event_type: "payment.succeeded",
      amount: 1500,
      currency: "THB",
    };

    await request.delete(`${wiremockUrl}/__admin/requests`);
    const first = await request.post(`${wiremockUrl}/lab/api/payments/pay-101/webhook`, {
      data: webhook,
    });
    expect(first.status()).toBe(HttpStatusCode.Accepted);
    expect(await first.json()).toEqual({
      received: true,
      payment_id: "pay-101",
      event_id: "evt-payment-001",
      status: "PROCESSED",
    });

    const replay = await request.post(`${wiremockUrl}/lab/api/payments/pay-101/webhook`, {
      data: webhook,
    });
    expect(replay.status()).toBe(HttpStatusCode.Conflict);
    expect(await replay.json()).toEqual({
      error: "DUPLICATE_WEBHOOK",
      payment_id: "pay-101",
      event_id: "evt-payment-001",
    });
  });

  test("Scenario 5: WireMock Admin API Scenario Reset", async ({ request }: { request: APIRequestContext }) => {
    // 1. Advance 'order-fulfillment-lifecycle' state to 'PAID'
    const payRes = await request.post(`${wiremockUrl}/lab/api/orders/101/pay`);
    expect(payRes.status()).toBe(HttpStatusCode.Ok);

    // 2. Reset all scenarios via WireMock Admin API
    const resetRes = await request.post(`${wiremockUrl}/__admin/scenarios/reset`);
    expect(resetRes.status()).toBe(HttpStatusCode.Ok);

    // 3. Verify scenario state has been reset back to 'Started' (Status: PENDING)
    const checkReset = await request.get(`${wiremockUrl}/lab/api/orders/101`);
    expect((await checkReset.json()).status).toBe("PENDING");
  });
});
