# 📑 Presentation Slides Index (SLIDE.md)

Quick navigation reference for presentations in `slides/`.

## 📚 Slide Decks Overview

| Deck | File | CLI Command | Topics Covered |
| :--- | :--- | :--- | :--- |
| **Master Workshop** | [slides.md](slides/slides.md) | `make slides` or `npm run dev` | Full 5-pillar workshop (Architecture, WireMock, Burp Suite, Testcontainers, Playwright) |
| **WireMock Deep Dive** | [slides-wiremock.md](slides/slides-wiremock.md) | `make slides-wiremock` or `npm run dev:wiremock` | External API Virtualization, precision matching, priorities, dynamic templating, stateful scenarios, pipeline roles, cheat sheet |
| **Burp Suite Deep Dive** | [slides-burpsuite.md](slides/slides-burpsuite.md) | `make slides-burp` or `npm run dev:burp` | In-flight MITM proxy, duplex interception, live tampering, `Mock-Scenario` steering, match & replace, logger, repeater, split with WireMock |

---

## 🧭 Master Workshop Slides ([slides/slides.md](slides/slides.md))

| # | Slide Title | Subtitle / Topic |
| :---: | :--- | :--- |
| **1** | [Ultra Smoooooth Testing Workshop](slides/slides.md#L1) | Cover & Workshop Overview |
| **2** | [⚠️ The Testing Crisis](slides/slides.md#L26) | Why Traditional Microservice Testing Fails in Practice |
| **3** | [📋 Workshop Agenda](slides/slides.md#L90) | What We'll Cover Today |
| **4** | [🎯 Testing Strategy & Core Pillars](slides/slides.md#L131) | Architectural Foundations for Integration Testing |
| **5** | [🌐 Pillar 1: External API Virtualization (WireMock)](slides/slides.md#L179) | Eliminating External API Dependencies & Sandbox Flakiness |
| **6** | [⚡ Pillar 2: In-Flight Traffic Interception (Burp Suite)](slides/slides.md#L232) | Live MITM Traffic Inspection, Fault Injection & Security Boundaries |
| **7** | [🐳 Pillar 3: Hermetic Infrastructure (Testcontainers)](slides/slides.md#L280) | Isolated Ephemeral Containers, Dynamic Ports & Automatic Teardown |
| **8** | [🎭 Pillar 4: Full-Stack E2E Automation (Playwright)](slides/slides.md#L327) | Unified Browser Automation, REST API Testing & Zero Flakiness |
| **9** | [🏗️ Part 1](slides/slides.md#L374) | Ecosystem Architecture |
| **10** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L385) | Interactive Microservices Ecosystem & Call Flow Diagram |
| **11** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L401) | Monorepo Workspaces, Modern Web & Relational Persistence |
| **12** | [🧪 Technology Stack — Testing & Security Infrastructure](slides/slides.md#L432) | Mocking, MITM Proxy, Ephemeral Containers & E2E Engine |
| **13** | [🪝 Part 2](slides/slides.md#L472) | WireMock — External API Virtualization |
| **14** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L482) | Programmable HTTP Mock Server for External API Simulation |
| **15** | [🎯 Why WireMock in Testing?](slides/slides.md#L507) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution |
| **16** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L532) | Exact Path Routing, Regex Patterns & Query Strings |
| **17** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L562) | Exact Matches, Substrings, Regex & Absence Checks |
| **18** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L592) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction |
| **19** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L621) | Regex Path Routing & Bearer JWT Validation |
| **20** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L648) | Query Flag Filtering & Multi-Criteria Evaluation |
| **21** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L675) | Resolution Hierarchy for Overlapping Stub Mappings |
| **22** | [🥇 Priority Tier 1: Specific Error Overrides](slides/slides.md#L707) | Fault Injection & Error Contracts |
| **23** | [🥈 Priority Tier 5–10: Default Happy Paths](slides/slides.md#L732) | Standard Business Logic & Route Matchers |
| **24** | [🛡️ Priority Tier 100: Catch-All Proxy](slides/slides.md#L756) | Transparent Fallback to Real Downstream Endpoints |
| **25** | [⚖️ Priority Precedence in Action](slides/slides.md#L778) | Comparing Matched Stubs: Scenario Override vs. Default Route |
| **26** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L823) | Steer Multiple Downstream Services from a Single Test Request |
| **27** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L860) | Data & Structural Meaning vs. Raw Character Matching |
| **28** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L905) | Strict Matchers vs. Resilient Microservice Contracts |
| **29** | [📦 Body Matching — Example](slides/slides.md#L950) | Match Request Bodies with `equalToJson` |
| **30** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L980) | Advanced Payload Filtering with Jayway JsonPath |
| **31** | [🔍 JSONPath Expression — High-Value Payment Example](slides/slides.md#L1043) | Value Threshold Filtering & Dynamic Approval Routing |
| **32** | [🎯 WireMock — Multi-Segment Path RegEx Matching](slides/slides.md#L1070) | Regular Expressions for Nested Sub-Resources & Dynamic Route Patterns |
| **33** | [🎯 WireMock RegEx — Nested Resource Path Example](slides/slides.md#L1100) | Multi-Segment Nested Sub-Resource Routing in API Stubs |
| **34** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L1127) | Bearer Tokens & Scenario Enums |
| **35** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L1155) | Strict Token & Scenario Routing |
| **36** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L1182) | Raw Text Matching vs. Semantic JSON Evaluation |
| **37** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1221) | 13-Digit National ID & Query Version Validation |
| **38** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1250) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath |
| **39** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1287) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` |
| **40** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1328) | Handlebars Response Templating (`response-template`) |
| **41** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1364) | Reading Path, Query, Header & Body Values into Responses |
| **42** | [🪄 Dynamic Response Headers & Timezones](slides/slides.md#L1425) | Injecting In-Flight Tracking IDs, Cookies & Location Headers |
| **43** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1464) | Request Model Extraction & Data Encoders |
| **44** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1482) | Timestamps, Random IDs & Token Generation |
| **45** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1499) | Conditionals, Dynamic Math & Response Configuration |
| **46** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1525) | String Manipulation & Substring Extractors |
| **47** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1543) | Array Looping, Sizing & Variable Lookups |
| **48** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1563) | Generating Dynamic Arrays with `{{#each}}` and Indexing |
| **49** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1623) | Deep Object Traversal & Array Indexing |
| **50** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1647) | Graceful Fallbacks & Array Counting |
| **51** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1671) | Echoing Nested Request Payloads & Handling Missing Fields |
| **52** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1695) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs |
| **53** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1742) | Deterministic Delay Injection (`fixedDelayMilliseconds`) |
| **54** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1766) | Real-World Latency Simulation (`delayDistribution`) |
| **55** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1819) | Simulating Hard Network Failures & Socket Errors |
| **56** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1841) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) |
| **57** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1879) | State-Aware Request Evaluation & Transition Mechanics |
| **58** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1913) | OAuth Authorization Code & OTP Replay Attack Prevention |
| **59** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L1976) | Modeling Sequential Domain State Transitions |
| **60** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2022) | Testing Client Exponential Backoff & Circuit Breakers |
| **61** | [🔄 Stateful Pattern 3: Retry & Recovery Stubs](slides/slides.md#L2053) | Flapping Failures & Self-Healing Stubs |
| **62** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2112) | At-Least-Once Delivery & Duplicate Message Detection |
| **63** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2175) | Triggering Outbound HTTP Events with `serveEventListeners` |
| **64** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L2240) | Preventing State Bleed with the WireMock Admin API |
| **65** | [🛡️ Part 3](slides/slides.md#L2277) | Burp Suite — MITM Traffic Control & Interception |
| **66** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L2289) | Client, MITM Proxy Engine & Backend Microservices Interaction |
| **67** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2301) | Dual-Direction Traffic Control: Requests and Responses |
| **68** | [🔀 Proxy Intercept — Example](slides/slides.md#L2335) | Before & After Request Header Injection |
| **69** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2385) | Real-Time Traffic Auditing & Inspection |
| **70** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L2420) | Visualizing Request and Response Flow Through the MITM Engine |
| **71** | [⚡ Live Intercept in Action](slides/slides.md#L2439) | Pausing, Inspecting, Modifying & Forwarding Packets Mid-Flight |
| **72** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L2454) | Zero-Click Automated Header & Payload Manipulation |
| **73** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L2498) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **74** | [🐳 Part 4](slides/slides.md#L2540) | Testcontainers — Hermetic Infrastructure |
| **75** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L2552) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **76** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L2581) | Docker Daemon Requirement & Supported Runtimes |
| **77** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2611) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure |
| **78** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2675) | Isolated, Disposable & Predictable Infrastructure On-Demand |
| **79** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2739) | Dynamic Ports & Code-Driven Orchestration |
| **80** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L2757) | Code-Driven Container Helper Architecture (`tests/specs/support/containers.ts`) |
| **81** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L2787) | Running Production DDL Scripts in Ephemeral Containers |
| **82** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2832) | Lifecycle Management for Integration Tests |
| **83** | [🎭 Part 5](slides/slides.md#L2877) | Playwright — Full-Stack E2E Automation |
| **84** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2889) | Modern Full-Stack Integration Testing Architecture |
| **85** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L2918) | Eliminating Flaky `sleep()` Calls with Actionability Checks |
| **86** | [🎭 Playwright — Network Route Interception](slides/slides.md#L2955) | Browser Request Mocking & Scenario Steering |
| **87** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L3021) | Mocking Native Device APIs with `page.addInitScript()` |
| **88** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L3047) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) |
| **89** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L3078) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) |
| **90** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L3105) | Trace Viewer, Network Timings & DOM Snapshots |
| **91** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L3157) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **92** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L3193) | Interactive UI, Debugging, Filtering & Code Generation |
| **93** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L3225) | Dynamic Stubs, State Resets & Verification Endpoints |
| **94** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L3257) | Everyday Monorepo, Build & Hermetic Test Commands |
| **95** | [Live Demo](slides/slides.md#L3291) | Hands-On Failure Injection & Verification Walkthrough |
| **96** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L3313) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **97** | [🎉 Thank You!](slides/slides.md#L3354) | Wrap-Up & Workshop Resources |
| **98** | [📚 Appendix](slides/slides.md#L3380) | Additional Tools — Trace Atlas & k6 Performance Testing |
| **99** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L3391) | Monorepo Topology Visualization |
| **100** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L3405) | Cross-Service Dependencies & Boundary Analysis |
| **101** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L3419) | Developer-Centric High-Concurrency Performance Testing |
| **102** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L3448) | Simulating High-Throughput BFF & Core Service Traffic |

---

## 🪝 WireMock Deep Dive ([slides/slides-wiremock.md](slides/slides-wiremock.md))

| # | Slide Title | File | Section / Topic | Line Anchor |
| :---: | :--- | :---: | :--- | :---: |
| | **Section 01: Introduction & Boundaries [15 min]** | | | |
| **1** | [WireMock Deep Dive](slides/slides-wiremock.md#L1) | [`slide-wiremock-1.md`](slides/wiremock/slide-wiremock-1.md) | Cover & Workshop Overview | `L1` |
| **2** | [What is WireMock?](slides/slides-wiremock.md#L37) | [`slide-wiremock-2.md`](slides/wiremock/slide-wiremock-2.md) | Out-of-process HTTP stand-in server with mock stubbing and proxy capabilities | `L37` |
| **3** | [The Problem: Fragile Vendor Sandboxes](slides/slides-wiremock.md#L71) | [`slide-wiremock-3.md`](slides/wiremock/slide-wiremock-3.md) | Why remote staging environments degrade automated test reliability | `L71` |
| **4** | [The Solution: Hermetic Local Virtualization](slides/slides-wiremock.md#L108) | [`slide-wiremock-4.md`](slides/wiremock/slide-wiremock-4.md) | Deterministic loopback testing over real TCP sockets with sub-5ms latency | `L108` |
| **5** | [Tool Boundaries: In-Memory Unit Mocks](slides/slides-wiremock.md#L145) | [`slide-wiremock-5.md`](slides/wiremock/slide-wiremock-5.md) | Fast algorithmic unit logic vs network-level blindspots | `L145` |
| **6** | [Tool Boundaries: WireMock Virtualization](slides/slides-wiremock.md#L178) | [`slide-wiremock-6.md`](slides/wiremock/slide-wiremock-6.md) | Full HTTP network socket fidelity without third-party sandboxes | `L178` |
| **7** | [Architectural Pillar: Zero Code Mutation](slides/slides-wiremock.md#L211) | [`slide-wiremock-7.md`](slides/wiremock/slide-wiremock-7.md) | Production source code requires zero modifications or test-only mock abstractions | `L211` |
| **8** | [Architectural Pillar: Polyglot Packaging](slides/slides-wiremock.md#L245) | [`slide-wiremock-8.md`](slides/wiremock/slide-wiremock-8.md) | Runs uniformly across local developer workstations, Docker Compose, and CI/CD pipelines | `L245` |
| **9** | [4 Core Virtualization Superpowers](slides/slides-wiremock.md#L279) | [`slide-wiremock-9.md`](slides/wiremock/slide-wiremock-9.md) | Essential capabilities for testing distributed microservices with WireMock | `L279` |
| | **Section 02: Fundamentals & Tooling Reference [45 min]** | | | |
| **10** | [⚙️ Section 02](slides/slides-wiremock.md#L314) | [`slide-wiremock-10.md`](slides/wiremock/slide-wiremock-10.md) | Fundamentals & Tooling Reference | `L314` |
| **11** | [URL & Path Matching Mechanics](slides/slides-wiremock.md#L325) | [`slide-wiremock-11.md`](slides/wiremock/slide-wiremock-11.md) | Exact path routing, regex pattern evaluation, and HTTP verb assertion | `L325` |
| **12** | [Query Parameter Matching Mechanics](slides/slides-wiremock.md#L360) | [`slide-wiremock-12.md`](slides/wiremock/slide-wiremock-12.md) | Key-value routing, regex constraints, presence/absence, and conjunction logic | `L360` |
| **13** | [Header Matching & Request Inspection](slides/slides-wiremock.md#L394) | [`slide-wiremock-13.md`](slides/wiremock/slide-wiremock-13.md) | Header assertions, JWT authentication tokens, and multi-service scenario steering | `L394` |
| **14** | [Semantic JSON Body Matching](slides/slides-wiremock.md#L428) | [`slide-wiremock-14.md`](slides/wiremock/slide-wiremock-14.md) | Schema tolerance, whitespace insensitivity, and array-order-independent contracts | `L428` |
| **15** | [JSONPath Expressions & Predicates](slides/slides-wiremock.md#L462) | [`slide-wiremock-15.md`](slides/wiremock/slide-wiremock-15.md) | Deep attribute traversal, numeric comparisons, and regex payload filters | `L462` |
| **16** | [Priority & Matching Precedence](slides/slides-wiremock.md#L497) | [`slide-wiremock-16.md`](slides/wiremock/slide-wiremock-16.md) | Resolution hierarchy for overlapping stub mappings and specific error overrides | `L497` |
| **17** | [Dynamic Response Templating](slides/slides-wiremock.md#L532) | [`slide-wiremock-17.md`](slides/wiremock/slide-wiremock-17.md) | Handlebars evaluation, dynamic data generation, and request model echoing | `L532` |
| **18** | [Latency Injection & Network Chaos](slides/slides-wiremock.md#L567) | [`slide-wiremock-18.md`](slides/wiremock/slide-wiremock-18.md) | Delay simulation, log-normal jitter, and socket-level connection faults | `L567` |
| **19** | [Stateful Scenarios & State Transitions](slides/slides-wiremock.md#L602) | [`slide-wiremock-19.md`](slides/wiremock/slide-wiremock-19.md) | Modeling stateful workflows, single-use token consumption, and state isolation | `L602` |
| **20** | [WireMock Admin REST API Reference](slides/slides-wiremock.md#L637) | [`slide-wiremock-20.md`](slides/wiremock/slide-wiremock-20.md) | Declarative HTTP control plane for stubs, assertions, scenarios, and teardown | `L637` |
| **21** | [WireMock in the Test Pipeline](slides/slides-wiremock.md#L720) | [`slide-wiremock-21.md`](slides/wiremock/slide-wiremock-21.md) | Unified simulation serving high-velocity CI automation and developer-local exploration | `L720` |
| | **Section 03: Real-World Use Cases & Application [40 min]** | | | |
| **22** | [🚀 Section 03](slides/slides-wiremock.md#L801) | [`slide-wiremock-22.md`](slides/wiremock/slide-wiremock-22.md) | Real-World Use Cases & Application | `L801` |
| **23** | [Precision Routing: Thai National IDs & UUIDs](slides/slides-wiremock.md#L812) | [`slide-wiremock-23.md`](slides/wiremock/slide-wiremock-23.md) | Route requests by URL regex patterns and validate payload structure without hardcoding test accounts | `L812` |
| **24** | [Precision Routing: Thai National IDs & UUIDs: JSON Stub Mapping](slides/slides-wiremock.md#L853) | [`slide-wiremock-24.md`](slides/wiremock/slide-wiremock-24.md) | Declarative WireMock stub configuration and contract verification | `L853` |
| **25** | [Priority Precedence: Error Overrides vs Defaults](slides/slides-wiremock.md#L909) | [`slide-wiremock-25.md`](slides/wiremock/slide-wiremock-25.md) | Higher specific matching rules override lower generic catch-all default stubs | `L909` |
| **26** | [Priority Precedence: Error Overrides vs Defaults: JSON Stub Mapping](slides/slides-wiremock.md#L967) | [`slide-wiremock-26.md`](slides/wiremock/slide-wiremock-26.md) | Declarative WireMock stub configuration and contract verification | `L967` |
| **27** | [Scenario Steering: Multi-Service Mocks](slides/slides-wiremock.md#L1016) | [`slide-wiremock-27.md`](slides/wiremock/slide-wiremock-27.md) | Steer multiple downstream microservices independently using comma-separated scenario headers | `L1016` |
| **28** | [Scenario Steering: Multi-Service Mocks: JSON Stub Mapping](slides/slides-wiremock.md#L1056) | [`slide-wiremock-28.md`](slides/wiremock/slide-wiremock-28.md) | Declarative WireMock stub configuration and contract verification | `L1056` |
| **29** | [Stateful Scenarios: One-Time Token Replays](slides/slides-wiremock.md#L1111) | [`slide-wiremock-29.md`](slides/wiremock/slide-wiremock-29.md) | Modeling authorization code single-use lifecycles with state transitions and 401 replay rejection | `L1111` |
| **30** | [Stateful Scenarios: One-Time Token Replays: JSON Stub Mapping](slides/slides-wiremock.md#L1166) | [`slide-wiremock-30.md`](slides/wiremock/slide-wiremock-30.md) | Declarative WireMock stub configuration and contract verification | `L1166` |
| **31** | [SMS Gateway: Validating Thai Mobile Numbers](slides/slides-wiremock.md#L1216) | [`slide-wiremock-31.md`](slides/wiremock/slide-wiremock-31.md) | Validate operator format conventions with Jayway JSONPath regular expressions | `L1216` |
| **32** | [SMS Gateway: Validating Thai Mobile Numbers: JSON Stub Mapping](slides/slides-wiremock.md#L1256) | [`slide-wiremock-32.md`](slides/wiremock/slide-wiremock-32.md) | Declarative WireMock stub configuration and contract verification | `L1256` |
| **33** | [Flapping Services: Testing Exponential Backoff](slides/slides-wiremock.md#L1313) | [`slide-wiremock-33.md`](slides/wiremock/slide-wiremock-33.md) | Simulate transient outages (HTTP 503 ➔ 503 ➔ 200) to verify client retry and circuit breaker logic | `L1313` |
| **34** | [Flapping Services: Testing Exponential Backoff: JSON Stub Mapping](slides/slides-wiremock.md#L1366) | [`slide-wiremock-34.md`](slides/wiremock/slide-wiremock-34.md) | Declarative WireMock stub configuration and contract verification | `L1366` |
| **35** | [Semantic Body Matching: Lenient Contract Verification](slides/slides-wiremock.md#L1414) | [`slide-wiremock-35.md`](slides/wiremock/slide-wiremock-35.md) | Reordered keys and extra metadata pass reliably without breaking assertions | `L1414` |
| **36** | [Semantic Body Matching: Lenient Contract Verification: JSON Stub Mapping](slides/slides-wiremock.md#L1472) | [`slide-wiremock-36.md`](slides/wiremock/slide-wiremock-36.md) | Declarative WireMock stub configuration and contract verification | `L1472` |
| **37** | [Dynamic Webhook Templating: Reconciliation](slides/slides-wiremock.md#L1516) | [`slide-wiremock-37.md`](slides/wiremock/slide-wiremock-37.md) | Echo request correlation IDs and generate dynamic nonces on the fly with Handlebars | `L1516` |
| **38** | [Dynamic Webhook Templating: JSON Stub Mapping](slides/slides-wiremock.md#L1556) | [`slide-wiremock-38.md`](slides/wiremock/slide-wiremock-38.md) | Declarative WireMock stub configuration and contract verification | `L1556` |
| **39** | [Computed Values & Date Offsets](slides/slides-wiremock.md#L1613) | [`slide-wiremock-39.md`](slides/wiremock/slide-wiremock-39.md) | Calculate dynamic arithmetic totals and future ISO expiry dates directly in stubs | `L1613` |
| **40** | [Computed Values & Date Offsets: JSON Stub Mapping](slides/slides-wiremock.md#L1653) | [`slide-wiremock-40.md`](slides/wiremock/slide-wiremock-40.md) | Declarative WireMock stub configuration and contract verification | `L1653` |
| **41** | [Large Payloads with External Files](slides/slides-wiremock.md#L1708) | [`slide-wiremock-41.md`](slides/wiremock/slide-wiremock-41.md) | Decouple multi-megabyte JSON responses from stubs using the __files repository | `L1708` |
| **42** | [Large Payloads with External Files: JSON Stub Mapping](slides/slides-wiremock.md#L1748) | [`slide-wiremock-42.md`](slides/wiremock/slide-wiremock-42.md) | Declarative WireMock stub configuration and contract verification | `L1748` |
| **43** | [Webhook Idempotency & Outbound Callbacks](slides/slides-wiremock.md#L1798) | [`slide-wiremock-43.md`](slides/wiremock/slide-wiremock-43.md) | Test asynchronous event listeners and signature verification via outbound mock HTTP callbacks | `L1798` |
| **44** | [Webhook Idempotency & Outbound Callbacks: JSON Stub Mapping](slides/slides-wiremock.md#L1838) | [`slide-wiremock-44.md`](slides/wiremock/slide-wiremock-44.md) | Declarative WireMock stub configuration and contract verification | `L1838` |
| **45** | [Network Chaos: Cross-Border Link Simulation](slides/slides-wiremock.md#L1895) | [`slide-wiremock-45.md`](slides/wiremock/slide-wiremock-45.md) | Verify client timeouts and socket drops using log-normal latency jitter and connection faults | `L1895` |
| **46** | [Network Chaos: Cross-Border Link Stub Mapping](slides/slides-wiremock.md#L1935) | [`slide-wiremock-46.md`](slides/wiremock/slide-wiremock-46.md) | Declarative WireMock stub configuration and contract verification | `L1935` |
| **47** | [Production-Ready Virtualization](slides/slides-wiremock.md#L1985) | [`slide-wiremock-47.md`](slides/wiremock/slide-wiremock-47.md) | Summary of core virtualization architectural patterns for enterprise test reliability | `L1985` |
| | **Section 04: Lab Challenges [60 min]** | | | |
| **48** | [🛠️ Section 04](slides/slides-wiremock.md#L2070) | [`slide-wiremock-48.md`](slides/wiremock/slide-wiremock-48.md) | Lab Challenges | `L2070` |
| **49** | [Practice Lab 1: Web UI & JSONPath Matching](slides/slides-wiremock.md#L2081) | [`slide-wiremock-49.md`](slides/wiremock/slide-wiremock-49.md) | Inspect live stub mappings and verify JSONPath threshold evaluation | `L2081` |
| **50** | [Practice Lab 2: Scenario Steering & Token Replay](slides/slides-wiremock.md#L2152) | [`slide-wiremock-50.md`](slides/wiremock/slide-wiremock-50.md) | Execute multi-scenario steering and verify one-time authorization code replay defense | `L2152` |
| **51** | [Practice Lab 3: Flapping Retry & Self-Healing](slides/slides-wiremock.md#L2222) | [`slide-wiremock-51.md`](slides/wiremock/slide-wiremock-51.md) | Observe transient service outages and verify client exponential backoff recovery | `L2222` |
| **52** | [Practice Lab 4: Dynamic Templating & Chaos Latency](slides/slides-wiremock.md#L2290) | [`slide-wiremock-52.md`](slides/wiremock/slide-wiremock-52.md) | Execute dynamic VAT calculations and verify client timeout cancellation handlers | `L2290` |
| **53** | [Challenge: Face Biometrics Stub](slides/slides-wiremock.md#L2359) | [`slide-wiremock-53.md`](slides/wiremock/slide-wiremock-53.md) | Author a self-service biometric verification stub with liveness confidence thresholding | `L2359` |
| **54** | [Rollout Playbook & Team Adoption](slides/slides-wiremock.md#L2429) | [`slide-wiremock-54.md`](slides/wiremock/slide-wiremock-54.md) | How to integrate WireMock into your service pipeline today | `L2429` |

---

## 🛡️ Burp Suite Deep Dive ([slides/slides-burpsuite.md](slides/slides-burpsuite.md))

| # | Slide Title | Section / Topic | Line Anchor |
| :---: | :--- | :--- | :---: |
| | **Section 01: Introduction** | | |
| **1** | [Burp Suite Deep Dive](slides/slides-burpsuite.md#L1) | Cover & Workshop Overview | `L1` |
| **2** | [The In-Flight Testing Gap](slides/slides-burpsuite.md#L35) | Why Modern Microservices Demand MITM Proxying | `L35` |
| **3** | [Burp Suite Overview](slides/slides-burpsuite.md#L73) | In-Flight Traffic Interception Curriculum | `L73` |
| | **Section 02: Fundamentals & Tooling Reference** | | |
| **4** | [Section 02 Divider](slides/slides-burpsuite.md#L119) | Section 02 Transition | `L119` |
| **5** | [Burp Suite Architecture](slides/slides-burpsuite.md#L135) | Transparent Socket Interception Topology | `L135` |
| **6** | [Burp Suite Operational Reference](slides/slides-burpsuite.md#L162) | Listeners, CA Cert Trust & Keyboard Shortcuts | `L162` |
| **7** | [Burp Suite vs. WireMock](slides/slides-burpsuite.md#L218) | In-Flight MITM Proxy vs Downstream Virtualization | `L218` |
| | **Section 03: Real-World Use Cases & Application** | | |
| **8** | [Section 03 Divider](slides/slides-burpsuite.md#L268) | Section 03 Transition | `L268` |
| **9** | [Proxy Intercept Capabilities](slides/slides-burpsuite.md#L284) | Dual-Direction Traffic Control (Requests vs Responses) | `L284` |
| **10** | [Bi-Directional Interception Flow](slides/slides-burpsuite.md#L328) | Duplex Interception Visual Flow | `L328` |
| **11** | [Live Intercept Workflow](slides/slides-burpsuite.md#L355) | Pausing, Modifying & Forwarding Packets Mid-Flight | `L355` |
| **12** | [Header Injection in Practice](slides/slides-burpsuite.md#L382) | Before & After Request Header Tampering | `L382` |
| **13** | [Automated Match & Replace Rules](slides/slides-burpsuite.md#L435) | Zero-Click Automated Header & Payload Manipulation | `L435` |
| **14** | [Traffic Auditing & HTTP History](slides/slides-burpsuite.md#L482) | Real-Time Traffic Auditing & Diagnostics | `L482` |
| **15** | [Replay & Parameter Fuzzing](slides/slides-burpsuite.md#L526) | Burp Repeater & Intruder Workflows | `L526` |
| **16** | [In-Flight Testing in Practice](slides/slides-burpsuite.md#L570) | Clean Traffic Control Summary & Patterns | `L570` |
| | **Section 04: Lab Challenges** | | |
| **17** | [Section 04 Divider](slides/slides-burpsuite.md#L615) | Section 04 Transition | `L615` |
| **18** | [Lab 1: Live Traffic Interception](slides/slides-burpsuite.md#L631) | Hands-On: Intercept & Inject `Mock-Scenario` | `L631` |
| **19** | [Lab 2: Match & Replace Automation](slides/slides-burpsuite.md#L672) | Hands-On: Unattended CI Header Injection | `L672` |
| **20** | [Challenge: Security Tampering](slides/slides-burpsuite.md#L711) | DIY Hands-On: Transfer Tampering & Fraud Alert | `L711` |
