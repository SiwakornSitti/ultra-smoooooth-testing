# Scenario Steering: Multi-Service Mocks: JSON Stub Mapping

### Substring header matching with Mock-Scenario for multi-service test routing

**Mapping Configuration File:** `03-header-matching.json`

```json
{
  "priority": 2,
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/oauth/token",
    "headers": {
      "Mock-Scenario": {
        "contains": "PAOTANG:EXPIRED"
      }
    }
  },
  "response": {
    "status": 401,
    "jsonBody": {
      "error": "token_expired",
      "error_description": "Pass code expired"
    }
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🟢 Mock-Scenario: PAOTANG:EXPIRED,OTP:OK | `401 Expired` | Contract expectation fulfilled |
| 🟢 Downstream OTP service reads OTP:OK | `200 OK` | Contract expectation fulfilled |
| Verification | `200 OK` | Each downstream service reads only its relevant scenario slice |

---

### Implementation Highlights
- **Declarative Contract**: Self-contained JSON stub mapping ready for Docker volume mount or Admin API registration.
- **Hermetic Boundary**: Exercises client HTTP serialization, headers, and status code parsers with zero network dependencies.
- **Deterministic Verification**: Strict contract matching guarantees identical test execution in local development and CI pipelines.

> 🔍 Each downstream service reads only its relevant scenario slice

### Presenter Notes

- Explain comma-separated token search using `contains: "PAOTANG:EXPIRED"` inside Mock-Scenario header.
- Show how one test request steers OAuth to fail while allowing downstream OTP to succeed.
