# Flapping Services: Testing Exponential Backoff

### Simulate transient outages (HTTP 503 ➔ 503 ➔ 200) to verify client self-healing

---

### Specification & Rule Matrix

| Architectural Parameter | Configuration Value | Operational Purpose |
| :--- | :--- | :--- |
| **Strategy** | ⚠️ Attempts 1 & 2: Service Unavailable | Virtualizes specific edge condition or state transition |
| **Precedence / State** | HTTP 503 Flap | Evaluated deterministically in WireMock memory engine |
| **Verification** | Hermetic Assertions | Eliminates external dependency and database mutations |

---

### Architectural Rules
- **Deterministic Interception**: Evaluates matching rules in memory with zero external network hops.
- **Contract Boundary Fidelity**: Validates headers, payloads, and response status codes over real TCP sockets.
- **Isolation Guarantee**: Prevents test cross-talk and database contamination across parallel CI pipelines.
---

### Declarative Stub Mapping

```json
{
  "scenarioName": "flapping-sms-service",
  "requiredScenarioState": "Started",
  "newScenarioState": "FAILED_ONCE",
  "request": {
    "method": "GET",
    "urlPath": "/lab/api/flaky"
  },
  "response": {
    "status": 503,
    "headers": { "Retry-After": "1" },
    "jsonBody": { "error": "RATE_LIMITED" }
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| Verification | `Asserted` | 🔴 Calls 1 & 2 return 503 with Retry-After: 1 header |
| Verification | `Asserted` | Triggers client exponential backoff retry loop without human intervention |

> 💡 **Resilience Verification:** WireMock state transitions model transient 503 throttling sequences deterministically to test retry middleware and circuit breakers.
