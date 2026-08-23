# 📑 Slide Deck Index & Navigator

Total Slides: **82**

> **Slide Deck Overview:**
> - **Part 1: Ecosystem Architecture** (slides 8–11)
> - **Part 2: WireMock Deep Dive** (slides 12–56)
> - **Part 3: Burp Suite MITM Proxy** (slides 57–61)
> - **Part 4: Testcontainers Ephemeral Infrastructure** (slides 62–69)
> - **Part 5: Playwright UI & API Engine** (slides 70–77)
> - **Reference & Cheat Sheets** (slides 78–81)
> - **Wrap-up & Resources** (slide 82)

| # | Slide Title | Subtitle / Focus | Source Link |
| :---: | :--- | :--- | :---: |
| **1** | [Cover](slides/slides.md#L1) | Ultra Smoooooth Testing | `L1` |
| **2** | [📋 Workshop Agenda](slides/slides.md#L40) | What We'll Cover Today | `L40` |
| **3** | [🎯 Testing Strategy & Core Pillars](slides/slides.md#L81) | Comprehensive Architectural Foundations for Integration Testing | `L81` |
| **4** | [🌐 Pillar 1: External API Virtualization (WireMock)](slides/slides.md#L127) | Eliminating External API Dependencies & Sandbox Flakiness | `L127` |
| **5** | [⚡ Pillar 2: In-Flight Traffic Interception (Burp Suite)](slides/slides.md#L156) | Live MITM Traffic Inspection, Fault Injection & Security Boundaries | `L156` |
| **6** | [🐳 Pillar 3: Hermetic Infrastructure (Testcontainers)](slides/slides.md#L185) | Isolated Ephemeral Containers, Dynamic Ports & Automatic Teardown | `L185` |
| **7** | [🎭 Pillar 4: Full-Stack E2E Automation (Playwright)](slides/slides.md#L214) | Unified Browser Automation, REST API Testing & Zero Flakiness | `L214` |
| **8** | [🏗️ Part 1 — Ecosystem Architecture](slides/slides.md#L340) | *(Section Divider)* | `L340` |
| **9** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L345) | Microservices, BFF, WireMock, and External Providers | `L345` |
| **10** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L423) | Monorepo Workspaces, Modern Web & Relational Persistence | `L423` |
| **11** | [🧪 Technology Stack — Testing & Security Infrastructure](slides/slides.md#L456) | Mocking, MITM Proxy, Ephemeral Containers & E2E Engine | `L456` |
| **12** | [🪝 Part 2 — WireMock](slides/slides.md#L477) | WireMock — External API Virtualization *(Section Divider)* | `L477` |
| **13** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L482) | Programmable HTTP Mock Server for External API Simulation | `L482` |
| **14** | [🎯 Why WireMock in Testing?](slides/slides.md#L507) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution | `L507` |
| **15** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L532) | Exact Path Routing, Regex Patterns & Query Strings | `L532` |
| **16** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L562) | Exact Matches, Substrings, Regex & Absence Checks | `L562` |
| **17** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L592) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction | `L592` |
| **18** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L622) | Regex Path Routing & Bearer JWT Validation | `L622` |
| **19** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L649) | Query Flag Filtering & Multi-Criteria Evaluation | `L649` |
| **20** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L676) | Resolution Hierarchy for Overlapping Stub Mappings | `L676` |
| **21** | [🥇 Priority Tier 1: Specific Error Overrides](slides/slides.md#L708) | Fault Injection & Error Contracts | `L708` |
| **22** | [🥈 Priority Tier 5–10: Default Happy Paths](slides/slides.md#L732) | Standard Business Logic & Route Matchers | `L732` |
| **23** | [🛡️ Priority Tier 100: Catch-All Proxy](slides/slides.md#L756) | Transparent Fallback to Real Downstream Endpoints | `L756` |
| **24** | [⚖️ Priority & Precedence — Example](slides/slides.md#L778) | Error Scenario Override vs Default Happy Path | `L778` |
| **25** | [🎯 WireMock — URL & Path RegEx Matching](slides/slides.md#L800) | Regular Expressions for Dynamic Resource Identifiers | `L800` |
| **26** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L829) | Bearer Tokens & Scenario Enums | `L829` |
| **27** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L858) | Payload Validation & Pattern Filtering | `L858` |
| **28** | [🎯 WireMock RegEx — Dynamic UUID Path Example](slides/slides.md#L888) | Matching UUID Paths in API Stubs | `L888` |
| **29** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L911) | Strict Token & Scenario Routing | `L911` |
| **30** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L938) | 13-Digit National ID & Query Version Validation | `L938` |
| **31** | [🎯 WireMock RegEx — JSONPath Phone Validation](slides/slides.md#L965) | Thai Mobile Number Pattern Matching in Payload | `L965` |
| **32** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L993) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` | `L993` |
| **33** | [📦 WireMock — Semantic JSON Matching](slides/slides.md#L1032) | Robust Structural JSON Equivalence | `L1032` |
| **34** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L1062) | Matching Operators & Lenient Contract Flags | `L1062` |
| **35** | [📦 Body Matching — Example](slides/slides.md#L1090) | Match Request Bodies with `equalToJson` | `L1090` |
| **36** | [🔍 WireMock — JSONPath Expression Matching](slides/slides.md#L1120) | Filter & Assert Payloads with `matchesJsonPath` | `L1120` |
| **37** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1147) | Handlebars Response Templating (`response-template`) | `L1147` |
| **38** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1176) | Request Model Extraction & Data Encoders | `L1176` |
| **39** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1194) | Timestamps, Random IDs & Token Generation | `L1194` |
| **40** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1211) | Conditionals, Dynamic Math & Response Configuration | `L1211` |
| **41** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1237) | String Manipulation & Substring Extractors | `L1237` |
| **42** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1255) | Array Looping, Sizing & Variable Lookups | `L1255` |
| **43** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1273) | Generating Dynamic Arrays with `{{#each}}` and Indexing | `L1273` |
| **44** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1302) | Deep Object Traversal & Array Indexing | `L1302` |
| **45** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1326) | Graceful Fallbacks & Array Counting | `L1326` |
| **46** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1350) | Echoing Nested Request Payloads & Handling Missing Fields | `L1350` |
| **47** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1374) | Deterministic Delay Injection (`fixedDelayMilliseconds`) | `L1374` |
| **48** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1398) | Real-World Latency Simulation (`delayDistribution`) | `L1398` |
| **49** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1451) | Simulating Hard Network Failures & Socket Errors | `L1451` |
| **50** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1473) | Transforming Stateless HTTP Mocks into Finite State Machines | `L1473` |
| **51** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1511) | State-Aware Request Evaluation & Transition Mechanics | `L1511` |
| **52** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1543) | OAuth Authorization Code & OTP Replay Attack Prevention | `L1543` |
| **53** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L1600) | Modeling Sequential Domain State Transitions | `L1600` |
| **54** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L1636) | Testing Client Exponential Backoff & Circuit Breakers | `L1636` |
| **55** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L1689) | At-Least-Once Delivery & Duplicate Message Detection | `L1689` |
| **56** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L1746) | Preventing State Bleed with the WireMock Admin API | `L1746` |
| **57** | [🛡️ Part 3 — Burp Suite](slides/slides.md#L1784) | Burp Suite — MITM Traffic Control & Interception *(Section Divider)* | `L1784` |
| **58** | [🔀 Burp Suite — Request & Response Intercept](slides/slides.md#L1791) | Bi-Directional In-Flight Traffic Interception & Tampering | `L1791` |
| **59** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L1803) | Dual-Direction Traffic Control: Requests and Responses | `L1803` |
| **60** | [🔀 Proxy Intercept — Example](slides/slides.md#L1837) | Before & After Request Header Injection | `L1837` |
| **61** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L1859) | Real-Time Traffic Auditing & Inspection | `L1859` |
| **62** | [🐳 Part 4 — Testcontainers](slides/slides.md#L1891) | Testcontainers — Hermetic Infrastructure *(Section Divider)* | `L1891` |
| **63** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L1896) | Programmable Docker Infrastructure Directly in Your Test Suite | `L1896` |
| **64** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L1925) | Docker Daemon Requirement & Supported Runtimes | `L1925` |
| **65** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L1955) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure | `L1955` |
| **66** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2017) | Isolated, Disposable & Predictable Infrastructure On-Demand | `L2017` |
| **67** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2079) | Dynamic Ports & Code-Driven Orchestration | `L2079` |
| **68** | [🧪 Testcontainers — Ephemeral Suite Bootstrapping](slides/slides.md#L2097) | Code-Driven Container Lifecycle (`tests/specs/support/containers.ts`) | `L2097` |
| **69** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2123) | Best Practice Test Suite Initialization in `beforeAll()` Hook | `L2123` |
| **70** | [🎭 Part 5 — Playwright](slides/slides.md#L2167) | Playwright — Full-Stack E2E Automation *(Section Divider)* | `L2167` |
| **71** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2172) | Modern Full-Stack Integration Testing Architecture | `L2172` |
| **72** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L2201) | Eliminating Flaky `sleep()` Calls with Actionability Checks | `L2201` |
| **73** | [🎭 Playwright — Network Route Interception](slides/slides.md#L2238) | Dynamic Mock Header Injection with `page.route()` | `L2238` |
| **74** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L2269) | Mocking Native Device APIs with `page.addInitScript()` | `L2269` |
| **75** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L2295) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) | `L2295` |
| **76** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L2326) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) | `L2326` |
| **77** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L2353) | Record Every Action, DOM Snapshot & Network Request for Post-Mortem Debugging | `L2353` |
| **78** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L2404) | Common Locators, Actions, Web-First Assertions & Network Steering | `L2404` |
| **79** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L2440) | Interactive UI, Debugging, Filtering & Code Generation | `L2440` |
| **80** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L2472) | Dynamic Stubs, State Resets & Verification Endpoints | `L2472` |
| **81** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L2504) | Everyday Monorepo, Build & Hermetic Test Commands | `L2504` |
| **82** | [🎉 Thank You!](slides/slides.md#L2541) | Happy Ultra Smoooooth Testing 🚀 | `L2541` |
