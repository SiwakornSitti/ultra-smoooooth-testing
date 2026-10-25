# Large Payloads with External Files: JSON Stub Mapping

### Decoupling multi-megabyte JSON responses into the __files storage repository

**Mapping Configuration File:** `04-body-file.json`

```json
{
  "request": {
    "method": "GET",
    "urlPath": "/lab/api/stateless/body-file"
  },
  "response": {
    "status": 200,
    "headers": {
      "Content-Type": "application/json"
    },
    "bodyFileName":
      "lab-stateless/body-file-response.json"
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🟢 GET /lab/api/stateless/body-file | `200 OK` | Contract expectation fulfilled |
| Verification | `200 OK` | 🟢 Serves wiremock/__files/lab-stateless/body-file-response.json |
| Verification | `200 OK` | External payload streams with zero performance overhead |

---

### Implementation Highlights
- **Declarative Contract**: Self-contained JSON stub mapping ready for Docker volume mount or Admin API registration.
- **Hermetic Boundary**: Exercises client HTTP serialization, headers, and status code parsers with zero network dependencies.
- **Deterministic Verification**: Strict contract matching guarantees identical test execution in local development and CI pipelines.

> 🔍 External payload streams with zero performance overhead

### Presenter Notes

- Explain bodyFileName routing to wiremock/__files/lab-stateless/body-file-response.json.
- Highlight how decoupling large payloads keeps git commits clean and PR diffs easy to review.
