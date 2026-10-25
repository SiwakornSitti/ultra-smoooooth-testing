# Priority Precedence: Error Overrides vs Defaults

### Higher specific matching rules override lower generic default routes

---

### Specification & Rule Matrix

| Architectural Parameter | Configuration Value | Operational Purpose |
| :--- | :--- | :--- |
| **Strategy** | 🥇 Priority 1 Explicit Error Override | Virtualizes specific edge condition or state transition |
| **Precedence / State** | High Precedence | Evaluated deterministically in WireMock memory engine |
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
  "priority": 1,
  "request": {
    "method": "POST",
    "urlPathPattern": "/lab/api/ekyc/.*/verify",
    "headers": {
      "Mock-Scenario": {
        "contains": "EKYC:BLACKLISTED"
      }
    }
  },
  "response": {
    "status": 403,
    "jsonBody": {
      "code": "ERR_CITIZEN_BLACKLISTED",
      "reason": "AML watchlist match"
    }
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🔴 Header Mock-Scenario: EKYC:BLACKLISTED | `403 Forbidden` | Contract expectation fulfilled |
| Verification | `Asserted` | Priority 1 cleanly intercepts matching calls before default routes evaluate |

> 💡 **Precedence Rule:** Lower integer = higher priority (`1 > 5 > 10 > 100`). Specific overrides at Priority 1 allow testing rare errors without altering default stubs.
