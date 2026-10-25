# Dynamic Response Templating

### Handlebars evaluation, dynamic data generation, and request model echoing

---

### Operator Reference Matrix

| Operator / Key | Operational Matching Behavior & Recommendation |
| :--- | :--- |
| `response-template` | Transformer enabling dynamic Handlebars variable evaluation in response payloads. |
| `request.headers` | Echoes correlation IDs (e.g. `{{request.headers.X-Correlation-ID}}`) for end-to-end tracing. |
| `randomValue` | Generates unique runtime data: `{{randomValue type='UUID'}}`. |
| `now & math` | Dynamic arithmetic and timestamps: `{{now offset='1 days' format='yyyy-MM-dd'}}`. |

---

### Key Capabilities & Mechanics
- `response-template`: Transformer enabling dynamic Handlebars variable evaluation in response payloads.
- `request.headers`: Echoes correlation IDs (e.g. `{{request.headers.X-Correlation-ID}}`) for end-to-end tracing.
- `randomValue`: Generates unique runtime data: `{{randomValue type='UUID'}}`.
- `now & math`: Dynamic arithmetic and timestamps: `{{now offset='1 days' format='yyyy-MM-dd'}}`.

> 💡 **Pro Tip:** Pro Tip: Echo incoming traceparent and correlation IDs back into responses via Handlebars for unbroken distributed tracing.

### Presenter Notes

- Point out response-template transformer: stubs must have transformers: ["response-template"] to parse Handlebars.
- Note JSON escaping helper: {{jsonPath request.body '$.field'}} escapes JSON characters automatically.
- Explain date offset syntax: {{now offset='3 days' format='yyyy-MM-dd'}}.
