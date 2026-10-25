# Query Parameter Matching Mechanics

### Key-value routing, regex constraints, presence/absence, and conjunction logic

---

### Operator Reference Matrix

| Operator / Key | Operational Matching Behavior & Recommendation |
| :--- | :--- |
| `queryParameters` | Key-value map for query filters. WireMock evaluates this as an order-agnostic semantic map. |
| `equalTo` | Exact parameter match (e.g. `channel=MOBILE` or `status=ACTIVE`). |
| `matches` | RegEx constraint on parameter values (e.g. `limit=[0-9]+` pagination guards). |
| `absent` | Validates parameter is omitted (e.g. asserting internal debug flags are stripped). |

---

### Key Capabilities & Mechanics
- `queryParameters`: Key-value map for query filters. WireMock evaluates this as an order-agnostic semantic map.
- `equalTo`: Exact parameter match (e.g. `channel=MOBILE` or `status=ACTIVE`).
- `matches`: RegEx constraint on parameter values (e.g. `limit=[0-9]+` pagination guards).
- `absent`: Validates parameter is omitted (e.g. asserting internal debug flags are stripped).

> 💡 **Pro Tip:** Pro Tip: Treat Query Parameters as Semantic Maps. Use absent: true to assert internal debug flags are cleanly stripped.

### Presenter Notes

- Point out equalTo vs matches: equalTo is literal string, matches is regex.
- Absent matcher is critical for security tests: verify debug flags are not sent in production calls.
