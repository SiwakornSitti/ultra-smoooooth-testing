# 📊 Presentation Slides

Complete index of the **[Slidev](https://sli.dev)** deck for the **Ultra Smoooooth Testing Workshop** — Microservices Integration Testing, WireMock Stateful Stubs, Burp Suite MITM Proxy, and Testcontainers.

Source: [`slides/slides.md`](slides/slides.md) · cover + 34 numbered slides

## Run the deck

```bash
# Launch interactive Slidev presentation
make slides

# or directly
cd slides && bunx @slidev/cli slides.md
```

A PowerPoint export is also available at [`slides/slides-export.pptx`](slides/slides-export.pptx).

## Slide index & scopes

| # | Section | Title | Line | Brief Scope & Purpose |
|---|---------|-------|------|-----------------------|
| — | Intro | Ultra Smoooooth Testing (cover) | 22 | Workshop title card introducing core tech stack & philosophy. |
| 1 | Intro | 🎯 Testing Strategy & Core Pillars | 40 | 3 pillars: Mock the World (WireMock), Control the Chaos (Burp), Test Without Limits (Playwright + Testcontainers). |
| 2 | Intro | 🏗️ Ecosystem System Architecture | 85 | Isometric visual overview of multi-tier banking test architecture. |
| 3 | Intro | 🗺️ Detailed Service Topology & Flow | 95 | Mermaid flowchart detailing service routes, ports, DB, and proxy paths. |
| 4 | Intro | 🛠️ Technology Stack & Infrastructure | 158 | Monorepo setup: Go Workspaces (`go.work`), Next.js 19, PostgreSQL, Docker Compose. |
| 5 | Intro | 🧱 Core Microservices | 185 | Domain service graph (`bff`, `user`, `bank`, `ekyc`, `transfer`, `otp`, `sms`) with DB, WireMock, & 3rd-party providers. |
| 6 | WireMock | ⚡ WireMock — Request Matching Strategies | 234 | URL path/regex matching and header/query strategies (`equalTo`, `matches`, `absent`, `contains`). |
| 7 | WireMock | ⚖️ WireMock — Priority & Matching Precedence | 272 | Resolution order for overlapping stubs (Priority 1 error overrides vs Priority 10 default happy path). |
| 8 | WireMock | 📦 WireMock — Body & Semantic JSON Matching | 323 | Flexible request payload matching using `equalToJson` with `ignoreExtraElements` & `ignoreArrayOrder`. |
| 9 | WireMock | 🔍 WireMock — JSONPath Expression Matching | 358 | Advanced payload inspection using `matchesJsonPath` (conditional comparisons, value ranges, regex). |
| 10 | WireMock | 🪄 WireMock — Dynamic Response Templating | 392 | Handlebars dynamic templating overview with `response-template`. |
| 11 | WireMock | 🪄 WireMock — Handlebars Helper Reference | 431 | Request model extraction (`headers`, `query`, `pathSegments`), `randomValue`, `now`, and conditionals. |
| 12 | WireMock | ⏱️ WireMock — Fixed Latency & Timeout Testing | 480 | Deterministic delay injection via `fixedDelayMilliseconds` to verify client HTTP timeout thresholds. |
| 13 | WireMock | 🎲 WireMock — Random Jitter & Latency Distributions | 511 | Simulating real-world latency spikes via `delayDistribution` (`lognormal`, `uniform`, `normal`). |
| 14 | WireMock | 💥 WireMock — Network Fault Injection | 550 | Simulating hard network socket failures (`CONNECTION_RESET_BY_PEER`, `MALFORMED_RESPONSE_CHUNK`, `EMPTY_RESPONSE`). |
| 15 | WireMock | 🔄 WireMock Stateful Stubbing | 583 | Scenario state machine concepts, replay prevention, and `POST /__admin/scenarios/reset`. |
| 16 | WireMock | 🔄 WireMock Stateful — Example | 604 | Practical stateful mapping (`04-order-pay.json`) transitioning `Started → PAID`. |
| 17 | WireMock | 📑 WireMock External Provider Mappings | 625 | Real mapping catalog for SMS gateway stubs and Paotang OAuth scenarios (400/401/429/503/504). |
| 18 | Burp Suite | 🔀 Burp Suite — Proxy Intercept | 659 | MITM proxy concepts to inspect, pause, and modify HTTP requests in flight. |
| 19 | Burp Suite | 🔀 Proxy Intercept — Example | 673 | Before & after request payload tampering and mock header injection. |
| 20 | Burp Suite | 🔁 Burp Suite — Repeater | 715 | Manual request replay for edge cases, error contracts, and payload variations. |
| 21 | Burp Suite | 🔁 Repeater — Example | 729 | Contract error validation (`400 Bad Request`, `422 Unprocessable`) with diff comparison. |
| 22 | Burp Suite | 💣 Burp Suite — Intruder | 754 | Automated fuzzing & attack modes (Sniper, Cluster Bomb, rate limits, brute force). |
| 23 | Burp Suite | 💣 Intruder — Example | 768 | IDOR and horizontal privilege escalation fuzzing across sequential account IDs. |
| 24 | Burp Suite | 📋 Burp Suite — Logger / HTTP History | 788 | Complete HTTP traffic capture, filtering, search, and CI/CD audit exports. |
| 25 | Burp Suite | 📋 Logger — Example | 802 | Filtering logs and exporting JSON traffic evidence for test verification. |
| 26 | Automation | 🐳 Docker in Integration Testing — Why Containers? | 822 | Hermetic test isolation, eliminating "works on my machine", port conflicts, and DB pollution. |
| 27 | Automation | 🧪 Testcontainers — Programmable Test Infrastructure | 850 | Dynamic ports, code-driven container lifecycle, Compose comparison, and Ryuk auto-cleanup. |
| 28 | Automation | 🎭 Playwright — Unified UI & API Test Engine | 885 | Why Playwright for integration: unified testing, auto-waiting assertions, network route intercepts, and tracing. |
| 29 | Automation | 🎭 Playwright — Full-Stack Browser E2E Flow | 913 | Multi-step authentication flow testing with dynamic mock header injection (`mockScenario(page)`). |
| 30 | Automation | 🧪 Playwright & Testcontainers — Orchestration | 941 | Direct REST `APIRequestContext` integration testing against ephemeral containers with teardown reset. |
| 31 | Automation | 🛠️ Command Cheat Sheet | 968 | Essential developer commands (`make build`, `make test`, `make test-integration`, `make test-e2e`, `make sync`). |
| 32 | Workshop | 🎯 Workshop Thinking Cases (1–5) | 1002 | Challenges 1–5: Fund transfers, eKYC gating, atomic rollbacks, race conditions, outbound SMS failure. |
| 33 | Workshop | 🎯 Workshop Thinking Cases (6–11) | 1018 | Challenges 6–11: OAuth replay, BFF aggregation, REST schema contracts, timeout injection, idempotency, JSBridge. |
| 34 | Outro | 🎉 Thank You! | 1038 | Closing slide with links to GitHub repository and Workshop Guide. |
