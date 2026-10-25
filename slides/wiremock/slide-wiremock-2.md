# What is WireMock?

### Out-of-process HTTP stand-in server with mock stubbing and proxy capabilities

---

### Comparison & Pillars Matrix

| Focus Area | Architecture Scope | Core Mechanism | Operational Benefit |
| :--- | :--- | :--- | :--- |
| **🪝 Mock Server & Transparent Proxy** | Foundation Mock & Proxy | Ephemeral lifecycle In-memory stubs Transparent live proxying & recording | Ephemeral lifecycle In-memory stubs Transparent live proxying & recording |

---

### Detailed Architectural Breakdown

### 🪝 Mock Server & Transparent Proxy (Foundation Mock & Proxy)

- **Socket Stand-in:** Runs out-of-process on genuine TCP ports (`:8088`), validating connection pools, timeouts, and status parsers.
- **Mock Server Mode:** Answers requests directly from in-memory stubs with deterministic JSON, dynamic templates, or fault injection.
- **Proxy & Record Mode:** Forwards unmatched traffic to live APIs (`proxyBaseUrl`), capturing real payloads into reusable stubs.

> ⚡ Ephemeral lifecycle In-memory stubs Transparent live proxying & recording




### Presenter Notes

- Emphasize WireMock's dual nature: In-memory mock server and transparent reverse proxy.
- Mock vs Proxy: Stub isolated responses in memory, or forward to live APIs (proxyBaseUrl) and record.
- Socket Fidelity: Validates real network calls over TCP loopback instead of mocking language interfaces.
