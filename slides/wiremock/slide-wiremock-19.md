# Stateful Scenarios & State Transitions

### Modeling stateful workflows, single-use token consumption, and state isolation

---

### Operator Reference Matrix

| Operator / Key | Operational Matching Behavior & Recommendation |
| :--- | :--- |
| `scenarioName` | Groups multiple stubs into an isolated state machine (e.g. `OTP_REPLAY_FLOW`). |
| `requiredScenarioState` | Precondition state required for stub to match (default: `Started`). |
| `newScenarioState` | Advances scenario state upon successful match execution. |
| `Zero DB State` | Simulates multi-step lifecycles entirely in-memory without persistent database writes. |

---

### Key Capabilities & Mechanics
- `scenarioName`: Groups multiple stubs into an isolated state machine (e.g. `OTP_REPLAY_FLOW`).
- `requiredScenarioState`: Precondition state required for stub to match (default: `Started`).
- `newScenarioState`: Advances scenario state upon successful match execution.
- `Zero DB State`: Simulates multi-step lifecycles entirely in-memory without persistent database writes.

> 💡 **Pro Tip:** Pro Tip: Model stateful lifecycles with sub-2ms resets via POST /__admin/scenarios/reset without database scripts.

### Presenter Notes

- Walk through the state transition: Initial call sees state "Started", returns 200, and transitions to "TOKEN_CONSUMED".
- Second call with same token matches the sibling stub (requiredScenarioState: "TOKEN_CONSUMED") returning 400.
- Point out the reset API: POST /__admin/scenarios/reset resets all scenarios back to "Started".
