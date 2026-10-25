# Section 03: Real-World Use Cases & Application

> **Practical patterns for virtualizing downstream vendor APIs, legacy monoliths, and third-party gateways in high-throughput microservices.**

---

### Production Virtualization Catalog

| # | Use Case Topic | Downstream Service Pattern | Target Test Scenario |
| :---: | :--- | :--- | :--- |
| **01** | Precision Routing | Thai National ID & Paotang eKYC | Match dynamic UUIDs & regex 13-digit citizen IDs |
| **02** | Priority Precedence | Banking Core Ledger System | High-priority error overrides over default success stubs |
| **03** | Scenario Steering | Microservices Test Routing | Multi-tenant test routing via `Mock-Scenario` header |
| **04** | Stateful Scenarios | OAuth2 / OTP One-Time Tokens | Single-use code consumption and 401 replay rejection |
| **05** | SMS Gateway | Telecom Provider (AIS / True) | Validate Thai mobile prefixes and echo reference codes |
| **06** | Flapping Services | Payment Gateway Transient Failure | 503 Service Unavailable followed by automatic 200 recovery |
| **07** | Semantic Body Matching | Merchant Settlement API | Whitespace-agnostic and array-order lenient AST matching |
| **08** | Dynamic Templating | Payment Reconciliation Webhook | Correlation ID echoing and cryptographic nonce generation |
| **09** | Computed Values | Tax Invoice Calculation | Real-time 7% Thai VAT computation and date offsets |
| **10** | Large Payloads | Core Banking Account Statements | Multi-megabyte JSON payload decoupling via body files |
| **11** | Outbound Callbacks | Async Payment Notification | WireMock webhook callbacks to client endpoint |
| **12** | Network Chaos | Unreliable Cross-Border Link | Log-normal latency jitter and dropped TCP socket connections |

---

### Key Enterprise Takeaways
- **Hermetic Isolation**: Replace fragile external sandbox dependencies with local, deterministic, offline stubs.
- **Failure Branch Verification**: Safely simulate 503 service flapping, timeouts, and token replay attacks.
- **Contract Resilience**: Write lenient JSONPath and body assertions that withstand non-breaking API evolution.
