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
| 6 | WireMock | ⚡ WireMock — URL & Path Matching | 250 | Path matchers (`url`, `urlPath`, `urlPathPattern`, `urlPattern`) and query string handling. |
| 7 | WireMock | ⚡ WireMock — Header Matching Operators | 279 | Header matchers (`equalTo`, `matches`, `contains`, `absent`) and auth/scenario steering. |
| 8 | WireMock | ⚡ WireMock — Query Parameter & Cookie Filters | 308 | Parameter flags, cookie assertions, and simultaneous multi-criteria conjunction rules. |
| 9 | WireMock | ⚡ Request Matching — URL & Header Example | 337 | Multi-criteria stub combining dynamic URL regex and Bearer JWT header validation. |
| 10 | WireMock | ⚡ Request Matching — Query Parameter Example | 390 | Query flag filtering (`?active=true`) and multi-parameter numeric matching (`?limit=10`). |
| 11 | WireMock | ⚖️ WireMock — Priority & Matching Precedence | 443 | Resolution order, priority tier hierarchy (1 = Faults, 5–10 = Happy Paths, 100 = Proxy), and evaluation rules. |
| 12 | WireMock | ⚖️ Priority & Precedence — Example | 478 | Practical comparison of specific error override (Priority 1) vs default catch-all happy path (Priority 10). |
| 13 | WireMock | 🎯 WireMock — URL & Header RegEx Matching | 540 | URL path regex (`urlPathPattern`/`urlPattern`) and header matching (`matches`/`doesNotMatch`). |
| 14 | WireMock | 🎯 WireMock — Body & JSONPath RegEx Matching | 572 | Raw body regex vs inline JSONPath evaluation (`$[?(@.field =~ /^regex$/)]`). |
| 15 | WireMock | 🎯 WireMock RegEx — URL & Header Examples | 604 | Practical examples for dynamic UUID paths, Bearer JWT token regex, and Scenario enum branches. |
| 16 | WireMock | 🎯 WireMock RegEx — Body & Parameter Matching | 662 | 13-digit National ID body regex and multi-version query parameter routing. |
| 17 | WireMock | 🎯 WireMock RegEx — JSONPath Phone Validation | 717 | Thai mobile phone number validation using inline JSONPath regex evaluation. |
| 18 | WireMock | 📦 WireMock — Body & Semantic JSON Matching | 768 | Semantic vs literal body comparison concepts, matching operators, and lenient matching flags. |
| 19 | WireMock | 📦 Body Matching — Example | 807 | Practical account opening stub using `equalToJson`, `ignoreExtraElements`, and `ignoreArrayOrder`. |
| 20 | WireMock | 🔍 WireMock — JSONPath Expression Matching | 842 | Advanced payload inspection using `matchesJsonPath` (conditional comparisons, value ranges, regex). |
| 21 | WireMock | 🪄 WireMock — Dynamic Response Templating | 882 | Handlebars dynamic templating overview with `response-template`. |
| 22 | WireMock | 🪄 WireMock — Handlebars Helper Reference | 922 | Request model extraction (`headers`, `query`, `pathSegments`), base64 encoding, and dynamic data generators. |
| 23 | WireMock | 🪄 Handlebars Logic & Math — Example | 961 | Dynamic conditionals (`#if eq`), arithmetic calculations (`math '*' 0.01`), and transformer setup. |
| 24 | WireMock | 🪄 WireMock — Handlebars String & Iteration Helpers | 1010 | String manipulation (`upper`, `lower`, `trim`, `replace`), regex extractors, `#each` loops, and sizing. |
| 25 | WireMock | 🪄 Handlebars Array Iteration — Example | 1050 | Practical example generating dynamic arrays with `{{#each}}`, loop indices (`@index`), and trailing comma handling. |
| 26 | WireMock | 🔍 WireMock — Handlebars jsonPath Extraction | 1099 | Deep field traversal (`$.user.id`), default fallbacks (`default='GUEST'`), and array indexing inside Handlebars. |
| 27 | WireMock | 🔍 Handlebars jsonPath — Example | 1140 | Echoing nested request attributes, applying default tiers, and dynamic array size computation. |
| 28 | WireMock | ⏱️ WireMock — Fixed Latency & Timeout Testing | 1194 | Deterministic delay injection via `fixedDelayMilliseconds` to verify client HTTP timeout thresholds. |
| 29 | WireMock | 🎲 WireMock — Random Jitter & Latency Distributions | 1240 | Simulating real-world latency spikes via `delayDistribution` (`lognormal`, `uniform`, `normal`). |
| 30 | WireMock | 💥 WireMock — Network Fault Injection | 1279 | Simulating hard network socket failures (`CONNECTION_RESET_BY_PEER`, `MALFORMED_RESPONSE_CHUNK`, `EMPTY_RESPONSE`). |
| 31 | WireMock | 🔄 WireMock Stateful Stubbing | 1312 | Scenario state machine concepts, replay prevention, and `POST /__admin/scenarios/reset`. |
| 32 | WireMock | 🔄 WireMock Stateful — Example | 1353 | Practical stateful mapping (`04-order-pay.json`) transitioning `Started → PAID`. |
| 33 | Burp Suite | 🔀 Burp Suite — Proxy Intercept | 1401 | MITM proxy concepts to inspect, pause, and modify HTTP requests in flight. |
| 34 | Burp Suite | 🔀 Proxy Intercept — Example | 1415 | Before & after request payload tampering and mock header injection. |
| 35 | Burp Suite | 🔁 Burp Suite — Repeater | 1457 | Manual request replay for edge cases, error contracts, and payload variations. |
| 36 | Burp Suite | 🔁 Repeater — Example | 1485 | Contract error validation (`400 Bad Request`, `422 Unprocessable`) with diff comparison. |
| 37 | Burp Suite | 💣 Burp Suite — Intruder | 1537 | Automated fuzzing & attack modes (Sniper, Cluster Bomb, rate limits, brute force). |
| 38 | Burp Suite | 💣 Intruder — Example | 1565 | IDOR and horizontal privilege escalation fuzzing across sequential account IDs. |
| 39 | Burp Suite | 📋 Burp Suite — Logger / HTTP History | 1622 | Complete HTTP traffic capture, filtering, search, and CI/CD audit exports. |
| 40 | Burp Suite | 📋 Logger — Example | 1636 | Filtering logs and exporting JSON traffic evidence for test verification. |
| 41 | Automation | 🐳 Docker in Integration Testing — Why Containers? | 1656 | Hermetic test isolation, eliminating "works on my machine", port conflicts, and DB pollution. |
| 42 | Automation | 🧪 Testcontainers — Programmable Test Infrastructure | 1684 | Dynamic ports, code-driven container lifecycle, Compose comparison, and dynamic bridge networks. |
| 43 | Automation | 🧪 Moby Ryuk — Container Garbage Collector | 1726 | Heartbeat socket cleanup, zero-leak guarantees, and environment configuration flags. |
| 44 | Automation | 🎭 Playwright — Unified UI & API Test Engine | 1779 | Modern full-stack testing advantages, dual-layer UI/API automation, and zero-flake auto-waiting. |
| 45 | Automation | 🎭 Playwright — Core Test Primitives & API | 1807 | Resilient selectors (`getByTestId`), auto-retrying assertions, and dynamic `Mock-Scenario` header injection. |
| 46 | Automation | 🎭 Playwright — Full-Stack Browser E2E Flow | 1836 | Multi-step authentication flow testing with dynamic mock header injection (`mockScenario(page)`). |
| 47 | Automation | 🧪 Playwright & Testcontainers — Orchestration | 1888 | Direct REST `APIRequestContext` integration testing against ephemeral containers with teardown reset. |
| 48 | Automation | 🛠️ Command Cheat Sheet | 1914 | Essential developer commands (`make build`, `make test`, `make test-integration`, `make test-e2e`, `make sync`). |
| 49 | Workshop | 🎯 Workshop Thinking Cases (1–5) | 1948 | Challenges 1–5: Fund transfers, eKYC gating, atomic rollbacks, race conditions, outbound SMS failure. |
| 50 | Workshop | 🎯 Workshop Thinking Cases (6–11) | 1964 | Challenges 6–11: OAuth replay, BFF aggregation, REST schema contracts, timeout injection, idempotency, JSBridge. |
| 51 | Outro | 🎉 Thank You! | 1984 | Closing slide with links to GitHub repository and Workshop Guide. |
