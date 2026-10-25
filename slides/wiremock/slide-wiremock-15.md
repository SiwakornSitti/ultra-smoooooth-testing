# JSONPath Expressions & Predicates

### Deep attribute traversal, numeric comparisons, and regex payload filters

---

### Operator Reference Matrix

| Operator / Key | Operational Matching Behavior & Recommendation |
| :--- | :--- |
| `matchesJsonPath` | Evaluates Jayway JSONPath queries against JSON request bodies with Boolean AND conjunction. |
| `Numeric Predicates` | `$[?(@.amount >= 50000)]` routes high-value transactions to manager approval stubs. |
| `RegEx Predicates` | `$[?(@.recipient =~ /^0[689]\d{8}$/)]` validates Thai phone format without database fixtures. |
| `Sub-Property Traversal` | Deep nested object navigation (e.g. `$.payment.sender.account.id`). |

---

### Key Capabilities & Mechanics
- `matchesJsonPath`: Evaluates Jayway JSONPath queries against JSON request bodies with Boolean AND conjunction.
- `Numeric Predicates`: `$[?(@.amount >= 50000)]` routes high-value transactions to manager approval stubs.
- `RegEx Predicates`: `$[?(@.recipient =~ /^0[689]\d{8}$/)]` validates Thai phone format without database fixtures.
- `Sub-Property Traversal`: Deep nested object navigation (e.g. `$.payment.sender.account.id`).

> 💡 **Pro Tip:** ⚡ Jayway JSONPath Operators & Evaluation `Deep Traversal`

### Presenter Notes

- Walk through the JSONPath syntax: $ is root, ?() is filter predicate, @ is current item.
- Point out conjunctive behavior: multiple matchesJsonPath objects are evaluated with AND logic.
- Highlight the Thai phone regex: starts with 06, 08, 09 and followed by 8 digits.
