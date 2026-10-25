# Computed Values & Date Offsets: JSON Stub Mapping

### Inline Handlebars arithmetic calculating 7% Thai VAT and +2-hour expiry dates

**Mapping Configuration File:** `05-response-templating.json`

```json
{
  "request": {
    "method": "POST",
    "url": "/lab/api/orders"
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "orderId": "{{randomValue type='UUID'}}",
      "vat":
        "{{math (jsonPath request.body '$.price') '*' 0.07}}",
      "total":
        "{{math (jsonPath request.body '$.price') '*' 1.07}}",
      "expiresAt":
        "{{now offset='2 hours' format='yyyy-MM-dd HH:mm'}}"
    },
    "transformers": ["response-template"]
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🟢 POST /orders {"price": 1000} | `vat: 70.0, total: 1070.0` | Contract expectation fulfilled |
| Verification | `200 OK` | 🟢 expiresAt computed exactly 2 hours into the future |
| Verification | `200 OK` | Enables assertions on dynamic cart totals and expiration policies |

---

### Implementation Highlights
- **Declarative Contract**: Self-contained JSON stub mapping ready for Docker volume mount or Admin API registration.
- **Hermetic Boundary**: Exercises client HTTP serialization, headers, and status code parsers with zero network dependencies.
- **Deterministic Verification**: Strict contract matching guarantees identical test execution in local development and CI pipelines.

> 🔍 Enables assertions on dynamic cart totals and expiration policies

### Presenter Notes

- Walk through the math helper computing 7% VAT (price * 0.07) and total amount (price * 1.07).
- Point out {{now offset='2 hours'}} generating predictable future timestamps for expiry assertions.
