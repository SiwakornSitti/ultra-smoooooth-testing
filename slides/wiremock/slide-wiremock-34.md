# Flapping Services: Testing Exponential Backoff: JSON Stub Mapping

### Two-stage transient 503 outage stub transitioning to self-healing 200 OK


```json
{
  "scenarioName": "flapping-sms-service",
  "requiredScenarioState": "FAILED_TWICE",
  "newScenarioState": "RECOVERED",
  "request": {
    "method": "GET",
    "urlPath": "/lab/api/flaky"
  },
  "response": {
    "status": 200,
    "jsonBody": { "status": "RECOVERED" }
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🟢 Call 3: Client retry succeeds | `200 OK RECOVERED` | Contract expectation fulfilled |
| Verification | `200 OK` | Proves resilience middleware (retry-go, resilience4j) self-heals |

---

### Implementation Highlights
- **Declarative Contract**: Self-contained JSON stub mapping ready for Docker volume mount or Admin API registration.
- **Hermetic Boundary**: Exercises client HTTP serialization, headers, and status code parsers with zero network dependencies.
- **Deterministic Verification**: Strict contract matching guarantees identical test execution in local development and CI pipelines.

> 🔍 Declarative WireMock stub configuration enforced with zero external runtime dependencies.

### Presenter Notes

- Show how the scenario progresses: Started (503) ➔ FAILED_ONCE (503) ➔ FAILED_TWICE (200 OK).
- Verify client retry middleware exponential backoff without flaky thread sleep delays in test code.
