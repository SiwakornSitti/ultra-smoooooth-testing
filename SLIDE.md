# 📊 Presentation Slides

Complete index of the **[Slidev](https://sli.dev)** deck for the **Ultra Smoooooth Testing Workshop** — Microservices Integration Testing, WireMock Stateful Stubs, Burp Suite MITM Proxy, and Testcontainers.

Source: [`slides/slides.md`](slides/slides.md) · cover + 51 numbered slides

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
| 4 | Intro | 🛠️ Technology Stack & Infrastructure | 176 | Monorepo setup: Go Workspaces (`go.work`), Next.js 19, PostgreSQL, Docker Compose. |
| 5 | Intro | 🧱 Core Microservices | 203 | Domain service graph (`bff`, `user`, `bank`, `ekyc`, `transfer`, `otp`) with DB, WireMock, & 3rd-party providers. |
| 6 | WireMock | 🪝 What is WireMock? — Core Capabilities | 250 | Programmable HTTP server capabilities: precision request matching, Handlebars templating, chaos engineering, state machines. |
| 7 | WireMock | 🎯 Why WireMock in Testing? | 276 | Hermetic isolation, zero 3rd-party sandbox flakiness, transparent proxying, and container-native velocity. |
| 8 | WireMock | ⚡ WireMock — URL & Path Matching | 303 | Path matchers (`url`, `urlPath`, `urlPathPattern`, `urlPattern`) and query string handling. |
| 9 | WireMock | ⚡ WireMock — Header Matching Operators | 332 | Header matchers (`equalTo`, `matches`, `contains`, `absent`) and auth/scenario steering. |
| 10 | WireMock | ⚡ WireMock — Query Parameter & Cookie Filters | 361 | Parameter flags, cookie assertions, and simultaneous multi-criteria conjunction rules. |
| 11 | WireMock | ⚡ Request Matching — URL & Header Example | 390 | Multi-criteria stub combining dynamic URL regex and Bearer JWT header validation. |
| 12 | WireMock | ⚡ Request Matching — Query Parameter Example | 443 | Query flag filtering (`?active=true`) and multi-parameter numeric matching (`?limit=10`). |
| 13 | WireMock | ⚖️ WireMock — Priority & Matching Precedence | 496 | Resolution order, priority tier hierarchy (1 = Faults, 5–10 = Happy Paths, 100 = Proxy), and evaluation rules. |
| 14 | WireMock | ⚖️ Priority & Precedence — Example | 531 | Practical comparison of specific error override (Priority 1) vs default catch-all happy path (Priority 10). |
| 15 | WireMock | 🎯 WireMock — URL & Header RegEx Matching | 593 | URL path regex (`urlPathPattern`/`urlPattern`) and header matching (`matches`/`doesNotMatch`). |
| 16 | WireMock | 🎯 WireMock — Body & JSONPath RegEx Matching | 625 | Raw body regex vs inline JSONPath evaluation (`$[?(@.field =~ /^regex$/)]`). |
| 17 | WireMock | 🎯 WireMock RegEx — URL & Header Examples | 657 | Practical examples for dynamic UUID paths, Bearer JWT token regex, and Scenario enum branches. |
| 18 | WireMock | 🎯 WireMock RegEx — Body & Parameter Matching | 715 | 13-digit National ID body regex and multi-version query parameter routing. |
| 19 | WireMock | 🎯 WireMock RegEx — JSONPath Phone Validation | 770 | Thai mobile phone number validation using inline JSONPath regex evaluation. |
| 20 | WireMock | 📦 WireMock — Body & Semantic JSON Matching | 821 | Semantic vs literal body comparison concepts, matching operators, and lenient matching flags. |
| 21 | WireMock | 📦 Body Matching — Example | 860 | Practical account opening stub using `equalToJson`, `ignoreExtraElements`, and `ignoreArrayOrder`. |
| 22 | WireMock | 🔍 WireMock — JSONPath Expression Matching | 895 | Advanced payload inspection using `matchesJsonPath` (conditional comparisons, value ranges, regex). |
| 23 | WireMock | 🪄 WireMock — Dynamic Response Templating | 935 | Handlebars dynamic templating overview with `response-template`. |
| 24 | WireMock | 🪄 WireMock — Handlebars Helper Reference | 975 | Request model extraction (`headers`, `query`, `pathSegments`), base64 encoding, and dynamic data generators. |
| 25 | WireMock | 🪄 Handlebars Logic & Math — Example | 1014 | Dynamic conditionals (`#if eq`), arithmetic calculations (`math '*' 0.01`), and transformer setup. |
| 26 | WireMock | 🪄 WireMock — Handlebars String & Iteration Helpers | 1063 | String manipulation (`upper`, `lower`, `trim`, `replace`), regex extractors, `#each` loops, and sizing. |
| 27 | WireMock | 🪄 Handlebars Array Iteration — Example | 1103 | Practical example generating dynamic arrays with `{{#each}}`, loop indices (`@index`), and trailing comma handling. |
| 28 | WireMock | 🔍 WireMock — Handlebars jsonPath Extraction | 1152 | Deep field traversal (`$.user.id`), default fallbacks (`default='GUEST'`), and array indexing inside Handlebars. |
| 29 | WireMock | 🔍 Handlebars jsonPath — Example | 1193 | Echoing nested request attributes, applying default tiers, and dynamic array size computation. |
| 30 | WireMock | ⏱️ WireMock — Fixed Latency & Timeout Testing | 1247 | Deterministic delay injection via `fixedDelayMilliseconds` to verify client HTTP timeout thresholds. |
| 31 | WireMock | 🎲 WireMock — Random Jitter & Latency Distributions | 1293 | Simulating real-world latency spikes via `delayDistribution` (`lognormal`, `uniform`, `normal`). |
| 32 | WireMock | 💥 WireMock — Network Fault Injection | 1332 | Simulating hard network socket failures (`CONNECTION_RESET_BY_PEER`, `MALFORMED_RESPONSE_CHUNK`, `EMPTY_RESPONSE`). |
| 33 | WireMock | 🔄 WireMock Stateful Stubbing | 1365 | Scenario state machine concepts, replay prevention, and `POST /__admin/scenarios/reset`. |
| 34 | WireMock | 🔄 WireMock Stateful — Example | 1406 | Practical stateful mapping (`04-order-pay.json`) transitioning `Started → PAID`. |
| 35 | Burp Suite | 🔀 Burp Suite — Proxy Intercept | 1454 | MITM proxy concepts to inspect, pause, and modify HTTP requests in flight. |
| 36 | Burp Suite | 🔀 Proxy Intercept — Example | 1468 | Before & after request payload tampering and mock header injection. |
| 37 | Burp Suite | 🔁 Burp Suite — Repeater | 1510 | Manual request replay for edge cases, error contracts, and payload variations. |
| 38 | Burp Suite | 🔁 Repeater — Example | 1538 | Contract error validation (`400 Bad Request`, `422 Unprocessable`) with diff comparison. |
| 39 | Burp Suite | 💣 Burp Suite — Intruder | 1590 | Automated fuzzing & attack modes (Sniper, Cluster Bomb, rate limits, brute force). |
| 40 | Burp Suite | 💣 Intruder — Example | 1618 | IDOR and horizontal privilege escalation fuzzing across sequential account IDs. |
| 41 | Burp Suite | 📋 Burp Suite — Logger / HTTP History | 1675 | Complete HTTP traffic capture, filtering, search, and CI/CD audit exports. |
| 42 | Burp Suite | 📋 Logger — Example | 1689 | Filtering logs and exporting JSON traffic evidence for test verification. |
| 43 | Automation | 🐳 Docker in Integration Testing — Why Containers? | 1709 | Hermetic test isolation, eliminating "works on my machine", port conflicts, and DB pollution. |
| 44 | Automation | 🧪 Testcontainers — Programmable Test Infrastructure | 1737 | Dynamic ports, code-driven container lifecycle, Compose comparison, and dynamic bridge networks. |
| 45 | Automation | 🧪 Moby Ryuk — Container Garbage Collector | 1779 | Heartbeat socket cleanup, zero-leak guarantees, and environment configuration flags. |
| 46 | Automation | 🎭 Playwright — Unified UI & API Test Engine | 1832 | Modern full-stack testing advantages, dual-layer UI/API automation, and zero-flake auto-waiting. |
| 47 | Automation | 🎭 Playwright — Core Test Primitives & API | 1860 | Resilient selectors (`getByTestId`), auto-retrying assertions, and dynamic `Mock-Scenario` header injection. |
| 48 | Automation | 🎭 Playwright — Full-Stack Browser E2E Flow | 1889 | Multi-step authentication flow testing with dynamic mock header injection (`mockScenario(page)`). |
| 49 | Automation | 🧪 Playwright & Testcontainers — Orchestration | 1941 | Direct REST `APIRequestContext` integration testing against ephemeral containers with teardown reset. |
| 50 | Automation | 🛠️ Command Cheat Sheet | 1967 | Essential developer commands (`make build`, `make test`, `make test-integration`, `make test-e2e`, `make sync`). |
| 51 | Outro | 🎉 Thank You! | 2004 | Closing slide with links to GitHub repository and Workshop Guide. |
