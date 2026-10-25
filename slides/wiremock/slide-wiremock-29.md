# Stateful Scenarios: One-Time Token Replays

### Modeling authorization code single-use lifecycles with Finite State Machines (FSM)

---

### Specification & Rule Matrix

| Architectural Parameter | Configuration Value | Operational Purpose |
| :--- | :--- | :--- |
| **Strategy** | 1️⃣ Step 1: First Call Consumes Code | Virtualizes specific edge condition or state transition |
| **Precedence / State** | Started ➔ CONSUMED | Evaluated deterministically in WireMock memory engine |
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
  "scenarioName": "oauth-code-exchange",
  "requiredScenarioState": "Started",
  "newScenarioState": "CODE_CONSUMED",
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/oauth/token",
    "bodyPatterns": [
      { "contains": "code=auth_code_12345" }
    ]
  },
  "response": {
    "status": 200,
    "jsonBody": { "access_token": "jwt_demo_token" }
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🟢 Call 1: Valid code exchanged | `200 OK (State` | Contract expectation fulfilled |
| Verification | `Asserted` | Advances scenario state in memory immediately upon response dispatch |

> 💡 **State Machine Advantage:** Model stateful authentication lifecycles without writing cleanup SQL scripts. Reset all via `POST /__admin/scenarios/reset`.
