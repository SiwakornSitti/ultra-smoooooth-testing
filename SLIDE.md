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
| **8** | [💻 Pillar 3: Container Bootstrap in Code](slides/slides.md#L342) | Dynamic Port Mapping & Ephemeral Bootstrap in TypeScript |
| **9** | [🎭 Pillar 4: Full-Stack E2E Automation (Playwright)](slides/slides.md#L387) | Unified Browser Automation, REST API Testing & Zero Flakiness |
| **10** | [🏗️ Part 1](slides/slides.md#L440) | Ecosystem Architecture |
| **11** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L451) | Interactive Microservices Ecosystem & Call Flow Diagram |
| **12** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L465) | Monorepo Workspaces, Modern Web & Relational Persistence |
| **13** | [🧪 Technology Stack — Virtualization & Traffic Control](slides/slides.md#L498) | External API Simulation (WireMock) & In-Flight Traffic Interception (Burp Suite) |
| **14** | [🧪 Technology Stack — Infrastructure & E2E Automation](slides/slides.md#L554) | Ephemeral Containers (Testcontainers) & Unified Full-Stack Testing (Playwright) |
| **15** | [🪝 Part 2](slides/slides.md#L610) | WireMock — External API Virtualization |
| **16** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L620) | Programmable HTTP Mock Server for External API Simulation |
| **17** | [🎯 Why WireMock in Testing?](slides/slides.md#L645) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution |
| **18** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L670) | Exact Path Routing, Regex Patterns & Query Strings |
| **19** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L700) | Exact Matches, Substrings, Regex & Absence Checks |
| **20** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L730) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction |
| **21** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L759) | Regex Path Routing & Bearer JWT Validation |
| **22** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L786) | Query Flag Filtering & Multi-Criteria Evaluation |
| **23** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L813) | Resolution Hierarchy for Overlapping Stub Mappings |
| **24** | [⚖️ Priority in Practice: 3-Tier Hierarchy](slides/slides.md#L847) | Specific Error Overrides vs. Default Happy Paths vs. Catch-All Proxies |
| **25** | [⚖️ Priority Precedence in Action](slides/slides.md#L919) | Comparing Matched Stubs: Scenario Override vs. Default Route |
| **26** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L964) | Steer Multiple Downstream Services from a Single Test Request |
| **27** | [📦 WireMock — Semantic JSON Matching (equalToJson)](slides/slides.md#L1001) | Data & Structural Meaning vs. Raw Character Matching |
| **28** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L1046) | Strict Matchers vs. Resilient Microservice Contracts |
| **29** | [📦 Body Matching — Example](slides/slides.md#L1091) | Match Request Bodies with equalToJson |
| **30** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L1121) | Advanced Payload Filtering with Jayway JsonPath |
| **31** | [🔍 JSONPath Expression — High-Value Payment Example](slides/slides.md#L1184) | Value Threshold Filtering & Dynamic Approval Routing |
| **32** | [🎯 WireMock RegEx — Path & Dynamic Resource Routing](slides/slides.md#L1213) | Multi-Segment Hierarchy Matching with urlPathPattern |
| **33** | [🎯 WireMock RegEx — Header & Scenario Steering](slides/slides.md#L1271) | Strict Bearer Token & Scenario Enum Validation |
| **34** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1329) | 13-Digit National ID & Query Version Validation |
| **35** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1387) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath |
| **36** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1415) | Anatomy of matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]" |
| **37** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1456) | Handlebars Response Templating (response-template) |
| **38** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1494) | Reading Path, Query, Header & Body Values into Responses |
| **39** | [🪄 Dynamic Response Headers & Timezones](slides/slides.md#L1555) | Injecting In-Flight Tracking IDs, Cookies & Location Headers |
| **40** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1594) | Request Model Extraction & Data Encoders |
| **41** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1612) | Timestamps, Random IDs & Token Generation |
| **42** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1629) | Conditionals, Dynamic Math & Response Configuration |
| **43** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1655) | String Manipulation & Substring Extractors |
| **44** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1673) | Array Looping, Sizing & Variable Lookups |
| **45** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1693) |  |
| **46** | [🔍 WireMock — Handlebars jsonPath & Safe Fallbacks](slides/slides.md#L1755) | Deep Traversal, Array Indexing, Safe Defaults & Dynamic Sizing |
| **47** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1808) | Echoing Nested Request Payloads & Handling Missing Fields |
| **48** | [📁 File-Based Response Templates (bodyFileName)](slides/slides.md#L1832) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs |
| **49** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1879) | Deterministic Delay Injection (fixedDelayMilliseconds) |
| **50** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1903) | Real-World Latency Simulation (delayDistribution) |
| **51** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1956) | Simulating Hard Network Failures & Socket Errors |
| **52** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1978) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) |
| **53** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L2016) | State-Aware Request Evaluation & Transition Mechanics |
| **54** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L2050) |  |
| **55** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L2113) |  |
| **56** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2159) |  |
| **57** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2222) |  |
| **58** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2285) |  |
| **59** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L2350) | Preventing State Bleed with the WireMock Admin API |
| **60** | [⚠️ Production Crisis: The Biometric eKYC Dilemma](slides/slides.md#L2387) | Why External Vendor Sandboxes Threaten Mobile Banking Launches |
| **61** | [🏆 Capstone Challenge: WireMock Biometric Face Scan Stub](slides/slides.md#L2456) | Author a self-service biometric verification stub with liveness confidence thresholding |
| **62** | [🛡️ Part 3](slides/slides.md#L2526) | Burp Suite — MITM Traffic Control & Interception |
| **63** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L2538) |  |
| **64** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2550) |  |
| **65** | [🔀 Proxy Intercept — Example](slides/slides.md#L2584) | Before & After Request Header Injection |
| **66** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2634) | Real-Time Traffic Auditing & Inspection |
| **67** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L2666) |  |
| **68** | [⚡ Live Intercept in Action](slides/slides.md#L2685) |  |
| **69** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L2702) | Zero-Click Automated Header & Payload Manipulation |
| **70** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L2742) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **71** | [🐳 Part 4](slides/slides.md#L2792) | Testcontainers — Hermetic Infrastructure |
| **72** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L2802) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **73** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L2831) | Docker Daemon Requirement & Supported Runtimes |
| **74** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2863) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure |
| **75** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2927) | Isolated, Disposable & Predictable Infrastructure On-Demand |
| **76** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2989) | Dynamic Ports & Code-Driven Orchestration |
| **77** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L3009) |  |
| **78** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L3045) |  |
| **79** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L3094) |  |
| **80** | [🎭 Part 5](slides/slides.md#L3139) | Playwright — Full-Stack E2E Automation |
| **81** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L3149) | Modern Full-Stack Integration Testing Architecture |
| **82** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L3178) | Eliminating Flaky sleep() Calls with Actionability Checks |
| **83** | [🎭 Playwright — Network Route Interception](slides/slides.md#L3217) |  |
| **84** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L3281) | Mocking Native Device APIs with page.addInitScript() |
| **85** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L3307) | Testing Multi-Step Auth Flow with Mock Steer (website.spec.ts) |
| **86** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L3338) | Headless REST Verification & Scenario Resets (bff.spec.ts) |
| **87** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L3367) |  |
| **88** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L3417) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **89** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L3453) | Interactive UI, Debugging, Filtering & Code Generation |
| **90** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L3485) | Dynamic Stubs, State Resets & Verification Endpoints |
| **91** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L3523) | Everyday Monorepo, Build & Hermetic Test Commands |
| **92** | [Live Demo](slides/slides.md#L3564) |  |
| **93** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L3579) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **94** | [🎉 Thank You!](slides/slides.md#L3625) |  |
| **95** | [📚 Appendix](slides/slides.md#L3648) | Additional Tools — Trace Atlas & k6 Performance Testing |
| **96** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L3659) |  |
| **97** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L3673) |  |
| **98** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L3685) | Developer-Centric High-Concurrency Performance Testing & SLA Verification |
| **99** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L3714) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing |
| **100** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L3764) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards |
