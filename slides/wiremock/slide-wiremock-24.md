# Precision Routing: Thai National IDs & UUIDs: JSON Stub Mapping

### Dynamic UUID path routing & 13-digit Thai citizen ID regex matching

**Mapping Configuration File:** `01-core-verify-approved.json`

```json
{
  "request": {
    "method": "POST",
    "urlPathPattern":
      "/lab/api/ekyc/[0-9a-f-]{36}/verify",
    "bodyPatterns": [{
      "matchesJsonPath":
        "$[?(@.nationalId =~ /^[0-9]{13}$/)]"
    }]
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "verified": true,
      "tier": "STANDARD",
      "checkedAt": "{{now}}"
    },
    "transformers": ["response-template"]
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🟢 POST .../verify + valid 13-digit ID | `200 OK` | Contract expectation fulfilled |
| 🔴 POST .../verify + invalid ID | `404 Unmatched` | Contract expectation fulfilled |
| Verification | `200 OK` | Matches any dynamic UUID while strictly enforcing 13-digit format |

---

### Implementation Highlights
- **Declarative Contract**: Self-contained JSON stub mapping ready for Docker volume mount or Admin API registration.
- **Hermetic Boundary**: Exercises client HTTP serialization, headers, and status code parsers with zero network dependencies.
- **Deterministic Verification**: Strict contract matching guarantees identical test execution in local development and CI pipelines.

> 🔍 Matches any dynamic UUID while strictly enforcing 13-digit format

### Presenter Notes

- Point out urlPathPattern matching dynamic UUIDs and matchesJsonPath enforcing 13-digit ID regex.
- Highlight {{now}} dynamic timestamp eliminating client clock skew during automated assertions.
