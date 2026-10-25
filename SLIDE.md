# 📑 Presentation Slides Index (SLIDE.md)

Quick navigation reference for presentations in `slides/`.

## 📚 Slide Decks Overview

| Deck | File | CLI Command | Topics Covered |
| :--- | :--- | :--- | :--- |
| **Master Workshop** | [slides.md](slides/slides.md) | `make slides` or `npm run dev` | Full 5-pillar workshop (Architecture, WireMock, Burp Suite, Testcontainers, Playwright) |

---

## 🧭 Master Workshop Slides ([slides/slides.md](slides/slides.md))

| # | Slide Title | Subtitle / Topic |
| :---: | :--- | :--- |
| **1** | [Ultra Smoooooth Testing Workshop](slides/slides.md#L1) | Cover & Workshop Overview |
| **2** | [⚠️ The Testing Crisis](slides/slides.md#L26) | Why Traditional Microservice Testing Fails in Practice |
| **3** | [📋 Workshop Agenda](slides/slides.md#L90) | What We'll Cover Today |
| **4** | [🎯 Testing Strategy & Core Pillars](slides/slides.md#L131) | Comprehensive Architectural Foundations for Integration Testing |
| **5** | [🌐 Pillar 1: External API Virtualization (WireMock)](slides/slides.md#L177) | Eliminating External API Dependencies & Sandbox Flakiness |
| **6** | [⚡ Pillar 2: In-Flight Traffic Interception (Burp Suite)](slides/slides.md#L230) | Live MITM Traffic Inspection, Fault Injection & Security Boundaries |
| **7** | [🐳 Pillar 3: Hermetic Infrastructure (Testcontainers)](slides/slides.md#L278) | Isolated Ephemeral Containers, Dynamic Ports & Automatic Teardown |
| **8** | [🎭 Pillar 4: Full-Stack E2E Automation (Playwright)](slides/slides.md#L331) | Unified Browser Automation, REST API Testing & Zero Flakiness |
| **9** | [🏗️ Part 1](slides/slides.md#L380) | Ecosystem Architecture |
| **10** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L391) | Interactive Microservices Ecosystem & Call Flow Diagram |
| **11** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L405) | Monorepo Workspaces, Modern Web & Relational Persistence |
| **12** | [🧪 Technology Stack — Virtualization & Traffic Control](slides/slides.md#L438) | External API Simulation (WireMock) & In-Flight Traffic Interception (Burp Suite) |
| **13** | [🧪 Technology Stack — Infrastructure & E2E Automation](slides/slides.md#L494) | Ephemeral Containers (Testcontainers) & Unified Full-Stack Testing (Playwright) |
| **14** | [🪝 Part 2](slides/slides.md#L550) | WireMock — External API Virtualization |
| **15** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L560) | Programmable HTTP Mock Server for External API Simulation |
| **16** | [🎯 Why WireMock in Testing?](slides/slides.md#L585) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution |
| **17** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L610) | Exact Path Routing, Regex Patterns & Query Strings |
| **18** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L640) | Exact Matches, Substrings, Regex & Absence Checks |
| **19** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L670) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction |
| **20** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L699) | Regex Path Routing & Bearer JWT Validation |
| **21** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L726) | Query Flag Filtering & Multi-Criteria Evaluation |
| **22** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L753) | Resolution Hierarchy for Overlapping Stub Mappings |
| **23** | [🥇 Priority Tier 1: Specific Error Overrides](slides/slides.md#L785) | Fault Injection & Error Contracts |
| **24** | [🥈 Priority Tier 5–10: Default Happy Paths](slides/slides.md#L810) | Standard Business Logic & Route Matchers |
| **25** | [🛡️ Priority Tier 100: Catch-All Proxy](slides/slides.md#L834) | Transparent Fallback to Real Downstream Endpoints |
| **26** | [⚖️ Priority Precedence in Action](slides/slides.md#L856) | Comparing Matched Stubs: Scenario Override vs. Default Route |
| **27** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L901) | Steer Multiple Downstream Services from a Single Test Request |
| **28** | [📦 WireMock — Semantic JSON Matching (equalToJson)](slides/slides.md#L938) | Data & Structural Meaning vs. Raw Character Matching |
| **29** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L983) | Strict Matchers vs. Resilient Microservice Contracts |
| **30** | [📦 Body Matching — Example](slides/slides.md#L1028) | Match Request Bodies with equalToJson |
| **31** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L1058) | Advanced Payload Filtering with Jayway JsonPath |
| **32** | [🔍 JSONPath Expression — High-Value Payment Example](slides/slides.md#L1121) | Value Threshold Filtering & Dynamic Approval Routing |
| **33** | [🎯 WireMock — Multi-Segment Path RegEx Matching](slides/slides.md#L1148) | Regular Expressions for Nested Sub-Resources & Dynamic Route Patterns |
| **34** | [🎯 WireMock RegEx — Nested Resource Path Example](slides/slides.md#L1178) | Multi-Segment Nested Sub-Resource Routing in API Stubs |
| **35** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L1205) | Bearer Tokens & Scenario Enums |
| **36** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L1233) | Strict Token & Scenario Routing |
| **37** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L1260) | Raw Text Matching vs. Semantic JSON Evaluation |
| **38** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1299) | 13-Digit National ID & Query Version Validation |
| **39** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1328) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath |
| **40** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1365) | Anatomy of matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]" |
| **41** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1406) | Handlebars Response Templating (response-template) |
| **42** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1442) | Reading Path, Query, Header & Body Values into Responses |
| **43** | [🪄 Dynamic Response Headers & Timezones](slides/slides.md#L1503) | Injecting In-Flight Tracking IDs, Cookies & Location Headers |
| **44** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1542) | Request Model Extraction & Data Encoders |
| **45** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1560) | Timestamps, Random IDs & Token Generation |
| **46** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1577) | Conditionals, Dynamic Math & Response Configuration |
| **47** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1603) | String Manipulation & Substring Extractors |
| **48** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1621) | Array Looping, Sizing & Variable Lookups |
| **49** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1641) |  |
| **50** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1701) | Deep Object Traversal & Array Indexing |
| **51** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1725) | Graceful Fallbacks & Array Counting |
| **52** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1749) | Echoing Nested Request Payloads & Handling Missing Fields |
| **53** | [📁 File-Based Response Templates (bodyFileName)](slides/slides.md#L1773) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs |
| **54** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1820) | Deterministic Delay Injection (fixedDelayMilliseconds) |
| **55** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1844) | Real-World Latency Simulation (delayDistribution) |
| **56** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1897) | Simulating Hard Network Failures & Socket Errors |
| **57** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1919) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) |
| **58** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1957) | State-Aware Request Evaluation & Transition Mechanics |
| **59** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1991) |  |
| **60** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L2054) |  |
| **61** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2100) | Testing Client Exponential Backoff & Circuit Breakers |
| **62** | [🔄 Stateful Pattern 3: Retry & Recovery Stubs](slides/slides.md#L2131) |  |
| **63** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2190) |  |
| **64** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2253) |  |
| **65** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L2318) | Preventing State Bleed with the WireMock Admin API |
| **66** | [⚠️ Production Crisis: The Biometric eKYC Dilemma](slides/slides.md#L2355) | Why External Vendor Sandboxes Threaten Mobile Banking Launches |
| **67** | [🏆 Capstone Challenge: WireMock Biometric Face Scan Stub](slides/slides.md#L2424) | Author a self-service biometric verification stub with liveness confidence thresholding |
| **68** | [🛡️ Part 3](slides/slides.md#L2494) | Burp Suite — MITM Traffic Control & Interception |
| **69** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L2506) |  |
| **70** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2518) |  |
| **71** | [🔀 Proxy Intercept — Example](slides/slides.md#L2552) | Before & After Request Header Injection |
| **72** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2602) | Real-Time Traffic Auditing & Inspection |
| **73** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L2634) |  |
| **74** | [⚡ Live Intercept in Action](slides/slides.md#L2653) |  |
| **75** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L2670) | Zero-Click Automated Header & Payload Manipulation |
| **76** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L2710) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **77** | [🐳 Part 4](slides/slides.md#L2760) | Testcontainers — Hermetic Infrastructure |
| **78** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L2770) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **79** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L2799) | Docker Daemon Requirement & Supported Runtimes |
| **80** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2831) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure |
| **81** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2895) | Isolated, Disposable & Predictable Infrastructure On-Demand |
| **82** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2957) | Dynamic Ports & Code-Driven Orchestration |
| **83** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L2977) |  |
| **84** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L3013) |  |
| **85** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L3062) |  |
| **86** | [🎭 Part 5](slides/slides.md#L3107) | Playwright — Full-Stack E2E Automation |
| **87** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L3117) | Modern Full-Stack Integration Testing Architecture |
| **88** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L3146) | Eliminating Flaky sleep() Calls with Actionability Checks |
| **89** | [🎭 Playwright — Network Route Interception](slides/slides.md#L3185) |  |
| **90** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L3249) | Mocking Native Device APIs with page.addInitScript() |
| **91** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L3275) | Testing Multi-Step Auth Flow with Mock Steer (website.spec.ts) |
| **92** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L3306) | Headless REST Verification & Scenario Resets (bff.spec.ts) |
| **93** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L3335) |  |
| **94** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L3385) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **95** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L3421) | Interactive UI, Debugging, Filtering & Code Generation |
| **96** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L3453) | Dynamic Stubs, State Resets & Verification Endpoints |
| **97** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L3491) | Everyday Monorepo, Build & Hermetic Test Commands |
| **98** | [Live Demo](slides/slides.md#L3532) |  |
| **99** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L3547) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **100** | [🎉 Thank You!](slides/slides.md#L3593) |  |
| **101** | [📚 Appendix](slides/slides.md#L3616) | Additional Tools — Trace Atlas & k6 Performance Testing |
| **102** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L3627) |  |
| **103** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L3641) |  |
| **104** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L3653) | Developer-Centric High-Concurrency Performance Testing & SLA Verification |
| **105** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L3682) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing |
| **106** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L3732) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards |
