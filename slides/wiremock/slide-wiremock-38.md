# Dynamic Webhook Templating: JSON Stub Mapping

### Handlebars response templating echoing correlation headers and generating random nonces

**Mapping Configuration File:** `05-response-templating.json`

```json
{
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/payments"
  },
  "response": {
    "status": 200,
    "headers": {
      "X-Correlation-ID":
        "{{request.headers.X-Correlation-ID}}"
    },
    "jsonBody": {
      "paymentId":
        "{{randomValue type='UUID'}}",
      "sender":
        "{{jsonPath request.body '$.sender'}}",
      "processedAt": "{{now}}"
    },
    "transformers": ["response-template"]
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🟢 Header X-Correlation-ID: c-9901 | `Echoed in header` | Contract expectation fulfilled |
| Verification | `200 OK` | 🟢 paymentId: Unique UUID generated per request |
| Verification | `200 OK` | Guarantees unique transaction references across parallel CI runs |

---

### Implementation Highlights
- **Declarative Contract**: Self-contained JSON stub mapping ready for Docker volume mount or Admin API registration.
- **Hermetic Boundary**: Exercises client HTTP serialization, headers, and status code parsers with zero network dependencies.
- **Deterministic Verification**: Strict contract matching guarantees identical test execution in local development and CI pipelines.

> 🔍 Guarantees unique transaction references across parallel CI runs

### Presenter Notes

- Trace {{request.headers.X-Correlation-ID}} reflection to maintain unbroken OpenTelemetry spans.
- Highlight {{randomValue type='UUID'}} generating unique paymentId values across parallel test runs.
