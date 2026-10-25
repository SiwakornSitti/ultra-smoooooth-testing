# Stateful Scenarios: One-Time Token Replays: JSON Stub Mapping

### Step 2 replay rejection enforcing OAuth 400 Bad Request on CODE_CONSUMED state


```json
{
  "scenarioName": "oauth-code-exchange",
  "requiredScenarioState": "CODE_CONSUMED",
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/oauth/token",
    "bodyPatterns": [
      { "contains": "code=auth_code_12345" }
    ]
  },
  "response": {
    "status": 400,
    "jsonBody": { "error": "invalid_grant" }
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🔴 Call 2: Replay attack blocked | `400 Bad Request` | Contract expectation fulfilled |
| Verification | `200 OK` | Verifies OAuth single-use security invariants deterministically |

---

### Implementation Highlights
- **Declarative Contract**: Self-contained JSON stub mapping ready for Docker volume mount or Admin API registration.
- **Hermetic Boundary**: Exercises client HTTP serialization, headers, and status code parsers with zero network dependencies.
- **Deterministic Verification**: Strict contract matching guarantees identical test execution in local development and CI pipelines.

> 🔍 Declarative WireMock stub configuration enforced with zero external runtime dependencies.

### Presenter Notes

- Walk through the state transition: Call 1 consumed code, so Call 2 matches CODE_CONSUMED state.
- Emphasize how WireMock rejects authorization code replays deterministically without database rollbacks.
