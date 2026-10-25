# Semantic JSON Body Matching

### Schema tolerance, whitespace insensitivity, and array-order-independent contracts

---

### Operator Reference Matrix

| Operator / Key | Operational Matching Behavior & Recommendation |
| :--- | :--- |
| `equalToJson` | Parses actual and expected bodies as JSON ASTs, ignoring harmless whitespace differences. |
| `ignoreArrayOrder` | Compares array elements set-wise (e.g. `["a", "b"]` matches `["b", "a"]`). |
| `ignoreExtraElements` | Lenient contract matching — ignores new or unmapped fields added upstream. |
| `matchesJsonPath` | Deep attribute traversal and conditional predicate filtering on nested payload fields. |

---

### Key Capabilities & Mechanics
- `equalToJson`: Parses actual and expected bodies as JSON ASTs, ignoring harmless whitespace differences.
- `ignoreArrayOrder`: Compares array elements set-wise (e.g. `["a", "b"]` matches `["b", "a"]`).
- `ignoreExtraElements`: Lenient contract matching — ignores new or unmapped fields added upstream.
- `matchesJsonPath`: Deep attribute traversal and conditional predicate filtering on nested payload fields.

> 💡 **Pro Tip:** Pro Tip: Protect tests with lenient AST comparison. Always pair equalToJson with ignoreExtraElements: true.

### Presenter Notes

- Emphasize why equalToJson is superior to exact string matching: whitespace and key order do not cause test failures.
- ignoreExtraElements is key for consumer-driven contracts: allows provider to add new fields safely.
