# Semantic Body Matching: Lenient Contract Verification: JSON Stub Mapping

### Lenient equalToJson AST comparison ignoring key ordering and extra client trace metadata

**Mapping Configuration File:** `🌐`

```json
{
  "target": "ACC-002",
  "source": "ACC-001",
  "amount": 1500.00,
  "clientTraceId": "tr-9988",
  "timestamp": 1729785600
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| Verification | `200 OK` | 🟢 Reordered Keys: target before source matches |
| Verification | `200 OK` | 🟢 Extra Fields: clientTraceId is safely tolerated |
| Verification | `200 OK` | 🔴 Raw String Matcher would have failed with 404! |
| Verification | `200 OK` | Microservices can evolve schemas without breaking stub assertions |

---

### Implementation Highlights
- **Declarative Contract**: Self-contained JSON stub mapping ready for Docker volume mount or Admin API registration.
- **Hermetic Boundary**: Exercises client HTTP serialization, headers, and status code parsers with zero network dependencies.
- **Deterministic Verification**: Strict contract matching guarantees identical test execution in local development and CI pipelines.

> 🔍 Declarative WireMock stub configuration enforced with zero external runtime dependencies.

### Presenter Notes

- Demonstrate how ignoreExtraElements and ignoreArrayOrder tolerate reordered JSON properties.
- Contrast AST evaluation with brittle byte-string comparison that breaks on schema evolution.
