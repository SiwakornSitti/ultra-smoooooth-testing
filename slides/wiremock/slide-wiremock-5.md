# Tool Boundaries: In-Memory Unit Mocks

### Fast algorithmic unit logic vs network-level blindspots

---

### Comparison & Pillars Matrix

| Focus Area | Architecture Scope | Core Mechanism | Operational Benefit |
| :--- | :--- | :--- | :--- |
| **🧪 In-Memory Unit Doubles** | Unit Scope | Fast unit feedback Zero network validation | Fast unit feedback Zero network validation |

---

### Detailed Architectural Breakdown

### 🧪 In-Memory Unit Doubles (Unit Scope)

- **Memory Heap Execution:** Runs directly in application memory (Go interfaces, Mockery doubles), bypassing OS network sockets.
- **Pure Logic Target:** Highly effective for testing isolated domain algorithms, state mutations, and business calculations.
- **The Integration Blindspot:** Completely misses JSON serialization, header parsing, HTTP status mappings, and socket timeouts.

> ⚡ Fast unit feedback Zero network validation




### Presenter Notes

- Clarify unit testing boundaries: Unit tests verify isolated business algorithms without external dependencies.
- Explain why unit mocks fail for integration tests: They mock away the HTTP client entirely.
