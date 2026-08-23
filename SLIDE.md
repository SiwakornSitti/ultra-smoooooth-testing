# 📑 Slide Deck Index & Navigator

Total Slides: **81**

> **Improvements from review pass (71 → 81):**
> - ✅ Added **Agenda** slide (slide 2) with `v-click` animated 5 parts
> - ✅ Added **Part 1: Architecture** section divider (slide 8)
> - ✅ Added **Part 2: WireMock** section divider (slide 12)
> - ✅ Expanded **WireMock Stateful** into a 7-slide deep dive (slides 49–55)
> - ✅ Added **Part 3: Burp Suite** section divider (slide 56)
> - ✅ Streamlined **Burp Suite** section focusing on **Request & Response Intercept** and **Traffic Logging** (slides 57–60)
> - ✅ Added **Part 4: Testcontainers** section divider (slide 61)
> - ✅ Added **What is Testcontainers?** core concepts slide (slide 62)
> - ✅ Added **Do We Need Docker for Testcontainers?** daemon & runtime slide (slide 63)
> - ✅ Added **Recommended Test Setup (3-Step Hermetic Lifecycle)** slide (slide 68)
> - ✅ Added **Part 5: Playwright** section divider (slide 69)
> - ✅ Expanded **Playwright** section with Web-First Locators, Network Routing, Hybrid JSBridge, and Tracing (slides 70–76)
> - ✅ Enhanced **Thank You** slide with recap pills + styled links
> - ✅ Added **`v-click` animations** on Strategy, Pillar 1–3, Agenda slides
> - ✅ Added **table row hover** and **section slide gradient** CSS styles

| # | Slide Title | Subtitle / Focus | Source Link |
| :---: | :--- | :--- | :---: |
| **1** | [Cover](slides/slides.md#L1) | Ultra Smoooooth Testing | `L1` |
| **2** | [📋 Workshop Agenda](slides/slides.md#L40) | What We'll Cover Today | `L40` |
| **3** | [🎯 Testing Strategy & Core Pillars](slides/slides.md#L91) | Mock the world. Control the chaos. Test without limits. | `L91` |
| **4** | [🌐 Pillar 1: Mock the World — WireMock](slides/slides.md#L137) | Eliminating External API Dependencies & Sandbox Flakiness | `L137` |
| **5** | [⚡ Pillar 2: Control the Chaos — Burp Suite](slides/slides.md#L172) | Live MITM Traffic Inspection, Header Injection & Response Tampering | `L172` |
| **6** | [🐳 Pillar 3: Hermetic Infrastructure — Testcontainers](slides/slides.md#L207) | Isolated Ephemeral Containers, Dynamic Ports & Automatic Teardown | `L207` |
| **7** | [🎭 Pillar 4: Test Without Limits — Playwright](slides/slides.md#L242) | Unified Browser Automation, REST API Testing & Zero Flakiness | `L242` |
| **8** | [🏗️ Part 1 — Ecosystem Architecture](slides/slides.md#L275) | *(Section Divider)* | `L275` |
| **9** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L280) | — | `L280` |
| **10** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L362) | Monorepo Workspaces, Modern Web & Relational Persistence | `L362` |
| **11** | [🧪 Technology Stack — Testing & Security Infrastructure](slides/slides.md#L395) | Mocking, MITM Proxy, Ephemeral Containers & E2E Engine | `L395` |
| **12** | [🪝 Part 2 — WireMock](slides/slides.md#L435) | *(Section Divider)* | `L435` |
| **13** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L440) | Programmable HTTP Mock Server for External API Simulation | `L440` |
| **14** | [🎯 Why WireMock in Testing?](slides/slides.md#L472) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution | `L472` |
| **15** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L503) | Exact Path Routing, Regex Patterns & Query Strings | `L503` |
| **16** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L530) | Exact Matches, Substrings, Regex & Absence Checks | `L530` |
| **17** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L557) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction | `L557` |
| **18** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L583) | Regex Path Routing & Bearer JWT Validation | `L583` |
| **19** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L610) | Query Flag Filtering & Multi-Criteria Evaluation | `L610` |
| **20** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L637) | Resolution Hierarchy for Overlapping Stub Mappings | `L637` |
| **21** | [🥇 Priority Tier 1: Specific Error Overrides](slides/slides.md#L661) | Fault Injection & Error Contracts | `L661` |
| **22** | [🥈 Priority Tier 5–10: Default Happy Paths](slides/slides.md#L693) | Standard Business Logic & Route Matchers | `L693` |
| **23** | [🛡️ Priority Tier 100: Catch-All Proxy](slides/slides.md#L724) | Transparent Fallback to Real Downstream Endpoints | `L724` |
| **24** | [⚖️ Priority & Precedence — Example](slides/slides.md#L753) | Error Scenario Override vs Default Happy Path | `L753` |
| **25** | [🎯 WireMock — URL & Path RegEx Matching](slides/slides.md#L775) | Regular Expressions for Dynamic Resource Identifiers | `L775` |
| **26** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L800) | Bearer Tokens & Scenario Enums | `L800` |
| **27** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L825) | Payload Validation & Pattern Filtering | `L825` |
| **28** | [🎯 WireMock RegEx — Dynamic UUID Path Example](slides/slides.md#L849) | Matching UUID Paths in API Stubs | `L849` |
| **29** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L872) | Strict Token & Scenario Routing | `L872` |
| **30** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L899) | 13-Digit National ID & Query Version Validation | `L899` |
| **31** | [🎯 WireMock RegEx — JSONPath Phone Validation](slides/slides.md#L926) | Thai Mobile Number Pattern Matching in Payload | `L926` |
| **32** | [📦 WireMock — Semantic JSON Matching](slides/slides.md#L954) | Robust Structural JSON Equivalence | `L954` |
| **33** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L978) | Matching Operators & Lenient Contract Flags | `L978` |
| **34** | [📦 Body Matching — Example](slides/slides.md#L1006) | Match Request Bodies with `equalToJson` | `L1006` |
| **35** | [🔍 WireMock — JSONPath Expression Matching](slides/slides.md#L1036) | Filter & Assert Payloads with `matchesJsonPath` | `L1036` |
| **36** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1063) | Handlebars Response Templating (`response-template`) | `L1063` |
| **37** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1092) | Request Model Extraction & Data Encoders | `L1092` |
| **38** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1110) | Timestamps, Random IDs & Token Generation | `L1110` |
| **39** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1127) | Conditionals, Dynamic Math & Response Configuration | `L1127` |
| **40** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1153) | String Manipulation & Substring Extractors | `L1153` |
| **41** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1171) | Array Looping, Sizing & Variable Lookups | `L1171` |
| **42** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1189) | Generating Dynamic Arrays with `{{#each}}` and Indexing | `L1189` |
| **43** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1218) | Deep Object Traversal & Array Indexing | `L1218` |
| **44** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1242) | Graceful Fallbacks & Array Counting | `L1242` |
| **45** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1266) | Echoing Nested Request Payloads & Handling Missing Fields | `L1266` |
| **46** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1290) | Deterministic Delay Injection (`fixedDelayMilliseconds`) | `L1290` |
| **47** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1314) | Real-World Latency Simulation (`delayDistribution`) | `L1314` |
| **48** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1367) | Simulating Hard Network Failures & Socket Errors | `L1367` |
| **49** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1389) | Transforming Stateless HTTP Mocks into Finite State Machines | `L1389` |
| **50** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1424) | State-Aware Request Evaluation & Transition Mechanics | `L1424` |
| **51** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1456) | OAuth Authorization Code & OTP Replay Attack Prevention | `L1456` |
| **52** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L1513) | Modeling Sequential Domain State Transitions | `L1513` |
| **53** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L1549) | Testing Client Exponential Backoff & Circuit Breakers | `L1549` |
| **54** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L1602) | At-Least-Once Delivery & Duplicate Message Detection | `L1602` |
| **55** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L1659) | Preventing State Bleed with the WireMock Admin API | `L1659` |
| **56** | [🛡️ Part 3 — Burp Suite](slides/slides.md#L1697) | *(Section Divider)* | `L1697` |
| **57** | [🔀 Burp Suite — Request & Response Intercept](slides/slides.md#L1704) | Bi-Directional In-Flight Traffic Interception & Tampering | `L1704` |
| **58** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L1716) | Dual-Direction Traffic Control: Requests and Responses | `L1716` |
| **59** | [🔀 Proxy Intercept — Example](slides/slides.md#L1745) | Before & After Request Header Injection | `L1745` |
| **60** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L1767) | Real-Time Traffic Auditing & Inspection | `L1767` |
| **61** | [🐳 Part 4 — Testcontainers](slides/slides.md#L1794) | *(Section Divider)* | `L1794` |
| **62** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L1799) | Programmable Docker Infrastructure Directly in Your Test Suite | `L1799` |
| **63** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L1834) | Docker Daemon Requirement & Supported Runtimes | `L1834` |
| **64** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L1865) | Flakiness, Collisions & State Bleed | `L1865` |
| **65** | [✅ The Hermetic Containerized Solution](slides/slides.md#L1927) | Isolated, Disposable & Predictable Infrastructure | `L1927` |
| **66** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L1989) | Dynamic Ports & Code-Driven Orchestration | `L1989` |
| **67** | [🧪 Testcontainers — Ephemeral Suite Bootstrapping](slides/slides.md#L2007) | Code-Driven Container Lifecycle (`tests/specs/support/containers.ts`) | `L2007` |
| **68** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2033) | Ephemeral Containers, Schema Migrations & Baseline Fixtures | `L2033` |
| **69** | [🎭 Part 5 — Playwright](slides/slides.md#L2077) | *(Section Divider)* | `L2077` |
| **70** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2082) | Modern Full-Stack Integration Testing Architecture | `L2082` |
| **71** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L2118) | Eliminating Flaky `sleep()` Calls with Actionability Checks | `L2118` |
| **72** | [🎭 Playwright — Network Route Interception](slides/slides.md#L2156) | Dynamic Mock Header Injection with `page.route()` | `L2156` |
| **73** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L2187) | Mocking Native Device APIs with `page.addInitScript()` | `L2187` |
| **74** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L2213) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) | `L2213` |
| **75** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L2244) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) | `L2244` |
| **76** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L2269) | Deep Root-Cause Inspection with Trace Viewer | `L2269` |
| **77** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L2322) | Common Locators, Actions, Web-First Assertions & Routing | `L2322` |
| **78** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L2358) | Interactive UI, Debugging, Filtering & Code Generation | `L2358` |
| **79** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L2390) | Dynamic Stubs, State Resets & Verification Endpoints | `L2390` |
| **80** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L2422) | Everyday Monorepo, Build & Hermetic Test Commands | `L2422` |
| **81** | [🎉 Thank You!](slides/slides.md#L2461) | Happy Ultra Smoooooth Testing 🚀 | `L2461` |

