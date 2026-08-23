# 📊 Presentation Slides

Complete index of the **[Slidev](https://sli.dev)** deck for the **Ultra Smoooooth Testing Workshop** — Microservices Integration Testing, WireMock Stateful Stubs, Burp Suite MITM Proxy, and Testcontainers.

Source: [`slides/slides.md`](slides/slides.md) · cover + 50 numbered slides

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
| 6 | WireMock | 🪝 What is WireMock? | 250 | Programmable HTTP server overview: request matching, templating, chaos injection, and isolation. |
| 7 | WireMock | ⚡ WireMock — URL & Path Matching | 280 | Path matchers (`url`, `urlPath`, `urlPathPattern`, `urlPattern`) and query string handling. |
| 8 | WireMock | ⚡ WireMock — Header Matching Operators | 309 | Header matchers (`equalTo`, `matches`, `contains`, `absent`) and auth/scenario steering. |
| 9 | WireMock | ⚡ WireMock — Query Parameter & Cookie Filters | 338 | Parameter flags, cookie assertions, and simultaneous multi-criteria conjunction rules. |
| 10 | WireMock | ⚡ Request Matching — URL & Header Example | 367 | Multi-criteria stub combining dynamic URL regex and Bearer JWT header validation. |
| 11 | WireMock | ⚡ Request Matching — Query Parameter Example | 420 | Query flag filtering (`?active=true`) and multi-parameter numeric matching (`?limit=10`). |
| 12 | WireMock | ⚖️ WireMock — Priority & Matching Precedence | 473 | Resolution order, priority tier hierarchy (1 = Faults, 5–10 = Happy Paths, 100 = Proxy), and evaluation rules. |
| 13 | WireMock | ⚖️ Priority & Precedence — Example | 508 | Practical comparison of specific error override (Priority 1) vs default catch-all happy path (Priority 10). |
| 14 | WireMock | 🎯 WireMock — URL & Header RegEx Matching | 570 | URL path regex (`urlPathPattern`/`urlPattern`) and header matching (`matches`/`doesNotMatch`). |
| 15 | WireMock | 🎯 WireMock — Body & JSONPath RegEx Matching | 602 | Raw body regex vs inline JSONPath evaluation (`$[?(@.field =~ /^regex$/)]`). |
| 16 | WireMock | 🎯 WireMock RegEx — URL & Header Examples | 634 | Practical examples for dynamic UUID paths, Bearer JWT token regex, and Scenario enum branches. |
| 17 | WireMock | 🎯 WireMock RegEx — Body & Parameter Matching | 692 | 13-digit National ID body regex and multi-version query parameter routing. |
| 18 | WireMock | 🎯 WireMock RegEx — JSONPath Phone Validation | 747 | Thai mobile phone number validation using inline JSONPath regex evaluation. |
| 19 | WireMock | 📦 WireMock — Body & Semantic JSON Matching | 798 | Semantic vs literal body comparison concepts, matching operators, and lenient matching flags. |
| 20 | WireMock | 📦 Body Matching — Example | 837 | Practical account opening stub using `equalToJson`, `ignoreExtraElements`, and `ignoreArrayOrder`. |
| 21 | WireMock | 🔍 WireMock — JSONPath Expression Matching | 872 | Advanced payload inspection using `matchesJsonPath` (conditional comparisons, value ranges, regex). |
| 22 | WireMock | 🪄 WireMock — Dynamic Response Templating | 912 | Handlebars dynamic templating overview with `response-template`. |
| 23 | WireMock | 🪄 WireMock — Handlebars Helper Reference | 952 | Request model extraction (`headers`, `query`, `pathSegments`), base64 encoding, and dynamic data generators. |
| 24 | WireMock | 🪄 Handlebars Logic & Math — Example | 991 | Dynamic conditionals (`#if eq`), arithmetic calculations (`math '*' 0.01`), and transformer setup. |
| 25 | WireMock | 🪄 WireMock — Handlebars String & Iteration Helpers | 1040 | String manipulation (`upper`, `lower`, `trim`, `replace`), regex extractors, `#each` loops, and sizing. |
| 26 | WireMock | 🪄 Handlebars Array Iteration — Example | 1080 | Practical example generating dynamic arrays with `{{#each}}`, loop indices (`@index`), and trailing comma handling. |
| 27 | WireMock | 🔍 WireMock — Handlebars jsonPath Extraction | 1129 | Deep field traversal (`$.user.id`), default fallbacks (`default='GUEST'`), and array indexing inside Handlebars. |
| 28 | WireMock | 🔍 Handlebars jsonPath — Example | 1170 | Echoing nested request attributes, applying default tiers, and dynamic array size computation. |
| 29 | WireMock | ⏱️ WireMock — Fixed Latency & Timeout Testing | 1224 | Deterministic delay injection via `fixedDelayMilliseconds` to verify client HTTP timeout thresholds. |
| 30 | WireMock | 🎲 WireMock — Random Jitter & Latency Distributions | 1270 | Simulating real-world latency spikes via `delayDistribution` (`lognormal`, `uniform`, `normal`). |
| 31 | WireMock | 💥 WireMock — Network Fault Injection | 1309 | Simulating hard network socket failures (`CONNECTION_RESET_BY_PEER`, `MALFORMED_RESPONSE_CHUNK`, `EMPTY_RESPONSE`). |
| 32 | WireMock | 🔄 WireMock Stateful Stubbing | 1342 | Scenario state machine concepts, replay prevention, and `POST /__admin/scenarios/reset`. |
| 33 | WireMock | 🔄 WireMock Stateful — Example | 1383 | Practical stateful mapping (`04-order-pay.json`) transitioning `Started → PAID`. |
| 34 | Burp Suite | 🔀 Burp Suite — Proxy Intercept | 1431 | MITM proxy concepts to inspect, pause, and modify HTTP requests in flight. |
| 35 | Burp Suite | 🔀 Proxy Intercept — Example | 1445 | Before & after request payload tampering and mock header injection. |
| 36 | Burp Suite | 🔁 Burp Suite — Repeater | 1487 | Manual request replay for edge cases, error contracts, and payload variations. |
| 37 | Burp Suite | 🔁 Repeater — Example | 1515 | Contract error validation (`400 Bad Request`, `422 Unprocessable`) with diff comparison. |
| 38 | Burp Suite | 💣 Burp Suite — Intruder | 1567 | Automated fuzzing & attack modes (Sniper, Cluster Bomb, rate limits, brute force). |
| 39 | Burp Suite | 💣 Intruder — Example | 1595 | IDOR and horizontal privilege escalation fuzzing across sequential account IDs. |
| 40 | Burp Suite | 📋 Burp Suite — Logger / HTTP History | 1652 | Complete HTTP traffic capture, filtering, search, and CI/CD audit exports. |
| 41 | Burp Suite | 📋 Logger — Example | 1666 | Filtering logs and exporting JSON traffic evidence for test verification. |
| 42 | Automation | 🐳 Docker in Integration Testing — Why Containers? | 1686 | Hermetic test isolation, eliminating "works on my machine", port conflicts, and DB pollution. |
| 43 | Automation | 🧪 Testcontainers — Programmable Test Infrastructure | 1714 | Dynamic ports, code-driven container lifecycle, Compose comparison, and dynamic bridge networks. |
| 44 | Automation | 🧪 Moby Ryuk — Container Garbage Collector | 1756 | Heartbeat socket cleanup, zero-leak guarantees, and environment configuration flags. |
| 45 | Automation | 🎭 Playwright — Unified UI & API Test Engine | 1809 | Modern full-stack testing advantages, dual-layer UI/API automation, and zero-flake auto-waiting. |
| 46 | Automation | 🎭 Playwright — Core Test Primitives & API | 1837 | Resilient selectors (`getByTestId`), auto-retrying assertions, and dynamic `Mock-Scenario` header injection. |
| 47 | Automation | 🎭 Playwright — Full-Stack Browser E2E Flow | 1866 | Multi-step authentication flow testing with dynamic mock header injection (`mockScenario(page)`). |
| 48 | Automation | 🧪 Playwright & Testcontainers — Orchestration | 1918 | Direct REST `APIRequestContext` integration testing against ephemeral containers with teardown reset. |
| 49 | Automation | 🛠️ Command Cheat Sheet | 1944 | Essential developer commands (`make build`, `make test`, `make test-integration`, `make test-e2e`, `make sync`). |
| 50 | Outro | 🎉 Thank You! | 1981 | Closing slide with links to GitHub repository and Workshop Guide. |
