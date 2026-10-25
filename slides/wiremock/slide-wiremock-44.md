# Webhook Idempotency & Outbound Callbacks: JSON Stub Mapping

### Asynchronous outbound HTTP event callbacks dispatched via serveEventListeners

**Mapping Configuration File:** `12-webhook-trigger.json`

```json
{
  "request": {
    "method": "POST",
    "url": "/lab/api/payments"
  },
  "response": {
    "status": 202,
    "jsonBody": { "status": "PENDING" }
  },
  "serveEventListeners": [{
    "name": "webhook",
    "parameters": {
      "method": "POST",
      "url":
        "{{jsonPath originalRequest.body '$.callback_url'}}",
      "headers": { "Content-Type": "application/json" },
      "body": "{"event": "paid", "status": "PAID"}",
      "delay": { "type": "fixed", "milliseconds": 500 }
    }
  }]
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🟢 1. POST /payments | `Receives 202 PENDING` | Contract expectation fulfilled |
| 🟢 2. WireMock 500ms delay | `POSTs event: paid` | Contract expectation fulfilled |
| Verification | `200 OK` | Verifies that client event listeners process asynchronous callbacks cleanly |

---

### Implementation Highlights
- **Declarative Contract**: Self-contained JSON stub mapping ready for Docker volume mount or Admin API registration.
- **Hermetic Boundary**: Exercises client HTTP serialization, headers, and status code parsers with zero network dependencies.
- **Deterministic Verification**: Strict contract matching guarantees identical test execution in local development and CI pipelines.

> 🔍 Verifies that client event listeners process asynchronous callbacks cleanly

### Presenter Notes

- Trace the lifecycle: client receives 202 PENDING, then WireMock asynchronously POSTs paid event.
- Explain testing webhook listeners and signature verification without public reverse tunnels.
