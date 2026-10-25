# Network Chaos: Cross-Border Link Stub Mapping

### Latency injection and abrupt CONNECTION_RESET_BY_PEER socket fault simulation

**Mapping Configuration File:** `07-delayed-response.json`

```json
{
  "request": {
    "method": "GET",
    "urlPath": "/lab/api/slow-endpoint"
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "message": "Delayed 3500ms"
    },
    "fixedDelayMilliseconds": 3500,
    "fault": "CONNECTION_RESET_BY_PEER"
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🟢 2s Timeout Client: Cancels at 2.0s | `504 Gateway Timeout` | Contract expectation fulfilled |
| Verification | `200 OK` | 🔴 Unbounded Client: Blocks thread and leaks socket! |
| Verification | `200 OK` | Proves that microservice connection pools fail fast and recover |

---

### Implementation Highlights
- **Declarative Contract**: Self-contained JSON stub mapping ready for Docker volume mount or Admin API registration.
- **Hermetic Boundary**: Exercises client HTTP serialization, headers, and status code parsers with zero network dependencies.
- **Deterministic Verification**: Strict contract matching guarantees identical test execution in local development and CI pipelines.

> 🔍 Proves that microservice connection pools fail fast and recover

### Presenter Notes

- Explain fixedDelayMilliseconds: 3500 verifying client context cancellation at 2.0s timeout.
- Contrast socket termination (CONNECTION_RESET_BY_PEER) with standard HTTP error status codes.
