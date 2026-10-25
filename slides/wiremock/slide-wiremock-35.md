# Semantic Body Matching: Lenient Contract Verification

### Reordered keys and extra metadata pass reliably without breaking assertions

---

### Specification & Rule Matrix

| Architectural Parameter | Configuration Value | Operational Purpose |
| :--- | :--- | :--- |
| **Strategy** | 📄 1. WireMock Stub Contract | Virtualizes specific edge condition or state transition |
| **Precedence / State** | 02-json-body-matching.json | Evaluated deterministically in WireMock memory engine |
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
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/transfers",
    "bodyPatterns": [{
      "equalToJson": {
        "source": "ACC-001",
        "target": "ACC-002",
        "amount": 1500.00
      },
      "ignoreArrayOrder": true,
      "ignoreExtraElements": true
    }]
  },
  "response": {
    "status": 201,
    "jsonBody": { "status": "APPROVED" }
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| Verification | `Asserted` | Checks JSON AST semantics rather than character byte equality |
| Verification | `Asserted` | ✨ Immune to whitespace, indentation, and key sequence |

> 💡 **Contract Resilience:** Lenient semantic body matching prevents test breakage when upstream serializers reorder keys or append diagnostic headers.
