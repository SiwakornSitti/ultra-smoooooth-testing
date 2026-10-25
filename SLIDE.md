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
| **8** | [🎭 Pillar 4: Full-Stack E2E Automation (Playwright)](slides/slides.md#L325) | Unified Browser Automation, REST API Testing & Zero Flakiness |
| **9** | [🏗️ Part 1](slides/slides.md#L374) | Ecosystem Architecture |
| **10** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L385) | Interactive Microservices Ecosystem & Call Flow Diagram |
| **11** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L399) | Monorepo Workspaces, Modern Web & Relational Persistence |
| **12** | [🧪 Technology Stack — Virtualization & Traffic Control](slides/slides.md#L432) | External API Simulation (WireMock) & In-Flight Traffic Interception (Burp Suite) |
| **13** | [🧪 Technology Stack — Infrastructure & E2E Automation](slides/slides.md#L488) | Ephemeral Containers (Testcontainers) & Unified Full-Stack Testing (Playwright) |
| **14** | [🪝 Part 2](slides/slides.md#L544) | WireMock — External API Virtualization |
| **15** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L554) | Programmable HTTP Mock Server for External API Simulation |
| **16** | [🎯 Why WireMock in Testing?](slides/slides.md#L579) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution |
| **17** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L604) | Exact Path Routing, Regex Patterns & Query Strings |
| **18** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L634) | Exact Matches, Substrings, Regex & Absence Checks |
| **19** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L664) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction |
| **20** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L693) | Regex Path Routing & Bearer JWT Validation |
| **21** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L720) | Query Flag Filtering & Multi-Criteria Evaluation |
| **22** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L747) | Resolution Hierarchy for Overlapping Stub Mappings |
| **23** | [🥇 Priority Tier 1: Specific Error Overrides](slides/slides.md#L779) | Fault Injection & Error Contracts |
| **24** | [🥈 Priority Tier 5–10: Default Happy Paths](slides/slides.md#L804) | Standard Business Logic & Route Matchers |
| **25** | [🛡️ Priority Tier 100: Catch-All Proxy](slides/slides.md#L828) | Transparent Fallback to Real Downstream Endpoints |
| **26** | [⚖️ Priority Precedence in Action](slides/slides.md#L850) | Comparing Matched Stubs: Scenario Override vs. Default Route |
| **27** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L895) | Steer Multiple Downstream Services from a Single Test Request |
| **28** | [📦 WireMock — Semantic JSON Matching (equalToJson)](slides/slides.md#L932) | Data & Structural Meaning vs. Raw Character Matching |
| **29** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L977) | Strict Matchers vs. Resilient Microservice Contracts |
| **30** | [📦 Body Matching — Example](slides/slides.md#L1022) | Match Request Bodies with equalToJson |
| **31** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L1052) | Advanced Payload Filtering with Jayway JsonPath |
| **32** | [🔍 JSONPath Expression — High-Value Payment Example](slides/slides.md#L1115) | Value Threshold Filtering & Dynamic Approval Routing |
| **33** | [🎯 WireMock — Multi-Segment Path RegEx Matching](slides/slides.md#L1142) | Regular Expressions for Nested Sub-Resources & Dynamic Route Patterns |
| **34** | [🎯 WireMock RegEx — Nested Resource Path Example](slides/slides.md#L1172) | Multi-Segment Nested Sub-Resource Routing in API Stubs |
| **35** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L1199) | Bearer Tokens & Scenario Enums |
| **36** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L1227) | Strict Token & Scenario Routing |
| **37** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L1254) | Raw Text Matching vs. Semantic JSON Evaluation |
| **38** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1293) | 13-Digit National ID & Query Version Validation |
| **39** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1322) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath |
| **40** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1359) | Anatomy of matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]" |
| **41** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1400) | Handlebars Response Templating (response-template) |
| **42** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1436) | Reading Path, Query, Header & Body Values into Responses |
| **43** | [🪄 Dynamic Response Headers & Timezones](slides/slides.md#L1497) | Injecting In-Flight Tracking IDs, Cookies & Location Headers |
| **44** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1536) | Request Model Extraction & Data Encoders |
| **45** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1554) | Timestamps, Random IDs & Token Generation |
| **46** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1571) | Conditionals, Dynamic Math & Response Configuration |
| **47** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1597) | String Manipulation & Substring Extractors |
| **48** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1615) | Array Looping, Sizing & Variable Lookups |
| **49** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1635) |  |
| **50** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1695) | Deep Object Traversal & Array Indexing |
| **51** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1719) | Graceful Fallbacks & Array Counting |
| **52** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1743) | Echoing Nested Request Payloads & Handling Missing Fields |
| **53** | [📁 File-Based Response Templates (bodyFileName)](slides/slides.md#L1767) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs |
| **54** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1814) | Deterministic Delay Injection (fixedDelayMilliseconds) |
| **55** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1838) | Real-World Latency Simulation (delayDistribution) |
| **56** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1891) | Simulating Hard Network Failures & Socket Errors |
| **57** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1913) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) |
| **58** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1951) | State-Aware Request Evaluation & Transition Mechanics |
| **59** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1985) |  |
| **60** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L2048) |  |
| **61** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2094) | Testing Client Exponential Backoff & Circuit Breakers |
| **62** | [🔄 Stateful Pattern 3: Retry & Recovery Stubs](slides/slides.md#L2125) |  |
| **63** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2184) |  |
| **64** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2247) |  |
| **65** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L2312) | Preventing State Bleed with the WireMock Admin API |
| **66** | [🛡️ Part 3](slides/slides.md#L2349) | Burp Suite — MITM Traffic Control & Interception |
| **67** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L2361) |  |
| **68** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2373) |  |
| **69** | [🔀 Proxy Intercept — Example](slides/slides.md#L2407) | Before & After Request Header Injection |
| **70** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2457) | Real-Time Traffic Auditing & Inspection |
| **71** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L2489) |  |
| **72** | [⚡ Live Intercept in Action](slides/slides.md#L2508) |  |
| **73** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L2525) | Zero-Click Automated Header & Payload Manipulation |
| **74** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L2565) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **75** | [🐳 Part 4](slides/slides.md#L2615) | Testcontainers — Hermetic Infrastructure |
| **76** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L2625) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **77** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L2654) | Docker Daemon Requirement & Supported Runtimes |
| **78** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2686) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure |
| **79** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2750) | Isolated, Disposable & Predictable Infrastructure On-Demand |
| **80** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2812) | Dynamic Ports & Code-Driven Orchestration |
| **81** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L2832) |  |
| **82** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L2868) |  |
| **83** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2917) |  |
| **84** | [🎭 Part 5](slides/slides.md#L2962) | Playwright — Full-Stack E2E Automation |
| **85** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2972) | Modern Full-Stack Integration Testing Architecture |
| **86** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L3001) | Eliminating Flaky sleep() Calls with Actionability Checks |
| **87** | [🎭 Playwright — Network Route Interception](slides/slides.md#L3040) |  |
| **88** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L3104) | Mocking Native Device APIs with page.addInitScript() |
| **89** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L3130) | Testing Multi-Step Auth Flow with Mock Steer (website.spec.ts) |
| **90** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L3161) | Headless REST Verification & Scenario Resets (bff.spec.ts) |
| **91** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L3190) |  |
| **92** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L3240) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **93** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L3276) | Interactive UI, Debugging, Filtering & Code Generation |
| **94** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L3308) | Dynamic Stubs, State Resets & Verification Endpoints |
| **95** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L3346) | Everyday Monorepo, Build & Hermetic Test Commands |
| **96** | [Live Demo](slides/slides.md#L3387) |  |
| **97** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L3402) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **98** | [🎉 Thank You!](slides/slides.md#L3448) |  |
| **99** | [📚 Appendix](slides/slides.md#L3471) | Additional Tools — Trace Atlas & k6 Performance Testing |
| **100** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L3482) |  |
| **101** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L3496) |  |
| **102** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L3508) | Developer-Centric High-Concurrency Performance Testing & SLA Verification |
| **103** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L3537) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing |
| **104** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L3587) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards |
