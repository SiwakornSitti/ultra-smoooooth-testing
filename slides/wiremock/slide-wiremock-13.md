# Header Matching & Request Inspection

### Header assertions, JWT authentication tokens, and multi-service scenario steering

---

### Operator Reference Matrix

| Operator / Key | Operational Matching Behavior & Recommendation |
| :--- | :--- |
| `headers` | Map of HTTP header matchers evaluated against incoming request headers. |
| `contains` | Substring matching (e.g. `Mock-Scenario` header steering multiple mock behaviors). |
| `matches` | RegEx validation (e.g. `^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$` JWT assertion). |
| `absent` | Validates header is omitted (e.g. verifying unauthenticated request contracts). |

---

### Key Capabilities & Mechanics
- `headers`: Map of HTTP header matchers evaluated against incoming request headers.
- `contains`: Substring matching (e.g. `Mock-Scenario` header steering multiple mock behaviors).
- `matches`: RegEx validation (e.g. `^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$` JWT assertion).
- `absent`: Validates header is omitted (e.g. verifying unauthenticated request contracts).

> 💡 **Pro Tip:** Pro Tip: Steer Sub-Scenarios via Mock Headers (e.g. Mock-Scenario: INSUFFICIENT_FUNDS) without backend code changes.

### Presenter Notes

- Emphasize the Mock-Scenario pattern: it is our workshop convention for triggering specific behaviors.
- Walk through the JWT regex: header.payload.signature format.
