# URL & Path Matching Mechanics

### Exact path routing, regex pattern evaluation, and HTTP verb assertion

---

### Operator Reference Matrix

| Operator / Key | Operational Matching Behavior & Recommendation |
| :--- | :--- |
| `urlPathPattern` | Evaluates regex on URI paths (e.g. `[0-9a-f-]{36}` UUIDs). The gold standard for dynamic REST resources. |
| `urlPath` | Matches exact path only, safely ignoring query parameter existence and serialization order. |
| `url` | Matches entire absolute URI including query strings (brittle if parameters reorder). |
| `method` | Enforces strict HTTP verb constraints (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`). |

---

### Key Capabilities & Mechanics
- `urlPathPattern`: Evaluates regex on URI paths (e.g. `[0-9a-f-]{36}` UUIDs). The gold standard for dynamic REST resources.
- `urlPath`: Matches exact path only, safely ignoring query parameter existence and serialization order.
- `url`: Matches entire absolute URI including query strings (brittle if parameters reorder).
- `method`: Enforces strict HTTP verb constraints (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`).

> 💡 **Pro Tip:** Pro Tip: Decouple Path Routing with urlPathPattern & queryParameters so key reordering never breaks builds.

### Presenter Notes

- Emphasize the difference between url and urlPath: url fails if query parameters reorder.
- Highlight urlPathPattern: essential for microservice architectures where UUIDs are generated dynamically.
- Point out the 404 diff: WireMock returns exact path mismatch info in the response body.
