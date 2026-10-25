# Priority & Matching Precedence

### Resolution hierarchy for overlapping stub mappings and specific error overrides

---

### Operator Reference Matrix

| Operator / Key | Operational Matching Behavior & Recommendation |
| :--- | :--- |
| `Integer Scale` | Lower integer = higher priority (`1 > 5 > 10 > 100`). Evaluated strictly in order of precedence. |
| `Priority 1 (Specific Error Overrides)` | High-precedence fault stubs triggered via headers or error flags. |
| `Priority 5–10 (Default Happy Path)` | Standard business logic and default approvals (default priority is 5). |
| `Priority 100 (Catch-All Proxy)` | Fallback route forwarding unmatched traffic or logging actionable 404 diffs. |

---

### Key Capabilities & Mechanics
- `Integer Scale`: Lower integer = higher priority (`1 > 5 > 10 > 100`). Evaluated strictly in order of precedence.
- `Priority 1 (Specific Error Overrides)`: High-precedence fault stubs triggered via headers or error flags.
- `Priority 5–10 (Default Happy Path)`: Standard business logic and default approvals (default priority is 5).
- `Priority 100 (Catch-All Proxy)`: Fallback route forwarding unmatched traffic or logging actionable 404 diffs.

> 💡 **Pro Tip:** Pro Tip: Layer Specific Outliers over Default Stubs. Keep happy paths at priority: 10 and edge overrides at priority: 1.

### Presenter Notes

- Explain what happens when two mappings match the same URL: WireMock evaluates priority integer.
- The lowest number wins. If priorities are equal, WireMock evaluates the more specific matcher.
- Best practice: Always set explicit priorities on scenario override stubs.
