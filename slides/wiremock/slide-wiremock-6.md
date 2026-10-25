# Tool Boundaries: WireMock Virtualization

### Full HTTP network socket fidelity without third-party sandboxes

---

### Comparison & Pillars Matrix

| Focus Area | Architecture Scope | Core Mechanism | Operational Benefit |
| :--- | :--- | :--- | :--- |
| **🪝 WireMock Service Virtualization** | Integration Scope | Real network stack validation 100% deterministic external boundaries | Real network stack validation 100% deterministic external boundaries |

---

### Detailed Architectural Breakdown

### 🪝 WireMock Service Virtualization (Integration Scope)

- **Real Socket Loopback:** Exercises your real HTTP client, connection pools, TLS negotiation, and status code parsers.
- **Full Transport Protocol:** Validates HTTP headers, connection keep-alive pools, timeouts, and JSON serialization.
- **Chaos & Statefulness:** Injects dropped connections, 504 timeouts, flapping 503s, and stateful multi-step FSMs.

> ✨ Real network stack validation 100% deterministic external boundaries




### Presenter Notes

- Point out why WireMock complements unit tests: It validates the entire transport boundary over real TCP sockets.
- Emphasize full network transport: Exercises status codes, headers, and connection pooling without external vendors.
