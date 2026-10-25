# Priority Precedence: Error Overrides vs Defaults: JSON Stub Mapping

### Priority 1 error fault stub overriding Priority 10 default happy path


```json
{
  "priority": 10,
  "request": {
    "method": "POST",
    "urlPathPattern": "/lab/api/ekyc/.*/verify"
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "verified": true,
      "status": "APPROVED"
    }
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🟢 Standard request without override header | `200 OK Approved` | Contract expectation fulfilled |
| Verification | `200 OK` | Cascades down to Priority 10 default when no scenario header is present |

---

### Implementation Highlights
- **Declarative Contract**: Self-contained JSON stub mapping ready for Docker volume mount or Admin API registration.
- **Hermetic Boundary**: Exercises client HTTP serialization, headers, and status code parsers with zero network dependencies.
- **Deterministic Verification**: Strict contract matching guarantees identical test execution in local development and CI pipelines.

> 🔍 Declarative WireMock stub configuration enforced with zero external runtime dependencies.

### Presenter Notes

- Compare priority: 1 on specific error stub against priority: 10 on default catch-all route.
- Show how WireMock evaluates lower integer numbers with higher precedence during request matching.
