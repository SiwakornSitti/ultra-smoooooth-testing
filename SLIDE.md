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
| **3** | [📋 Workshop Agenda](slides/slides.md#L86) | What We'll Cover Today |
| **4** | [🎯 Testing Strategy & Core Pillars](slides/slides.md#L123) | Comprehensive Architectural Foundations for Integration Testing |
| **5** | [🌐 Pillar 1: External API Virtualization (WireMock)](slides/slides.md#L161) | Eliminating External API Dependencies & Sandbox Flakiness |
| **6** | [⚡ Pillar 2: In-Flight Traffic Interception (Burp Suite)](slides/slides.md#L214) | Live MITM Traffic Inspection, Fault Injection & Security Boundaries |
| **7** | [🐳 Pillar 3: Hermetic Infrastructure (Testcontainers)](slides/slides.md#L262) | Isolated Ephemeral Containers, Dynamic Ports & Automatic Teardown |
| **8** | [💻 Pillar 3: Container Bootstrap in Code](slides/slides.md#L326) | Dynamic Port Mapping & Ephemeral Bootstrap in TypeScript |
| **9** | [🎭 Pillar 4: Full-Stack E2E Automation (Playwright)](slides/slides.md#L376) | Unified Browser Automation, REST API Testing & Zero Flakiness |
| **10** | [🏗️ Part 1](slides/slides.md#L429) | Ecosystem Architecture |
| **11** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L440) | Interactive Microservices Ecosystem & Call Flow Diagram |
| **12** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L454) | Monorepo Workspaces, Modern Web & Relational Persistence |
| **13** | [🧪 Technology Stack — Virtualization & Traffic Control](slides/slides.md#L487) | External API Simulation (WireMock) & In-Flight Traffic Interception (Burp Suite) |
| **14** | [🧪 Technology Stack — Infrastructure & E2E Automation](slides/slides.md#L543) | Ephemeral Containers (Testcontainers) & Unified Full-Stack Testing (Playwright) |
| **15** | [🪝 Part 2](slides/slides.md#L599) | WireMock — External API Virtualization |
| **16** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L609) | Programmable HTTP Mock Server for External API Simulation |
| **17** | [🎯 Why WireMock in Testing?](slides/slides.md#L634) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution |
| **18** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L659) | Exact Path Routing, Regex Patterns & Query Strings |
| **19** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L689) | Exact Matches, Substrings, Regex & Absence Checks |
| **20** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L719) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction |
| **21** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L748) | Regex Path Routing & Bearer JWT Validation |
| **22** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L775) | Query Flag Filtering & Multi-Criteria Evaluation |
| **23** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L802) | Resolution Hierarchy for Overlapping Stub Mappings |
| **24** | [⚖️ Priority in Practice: 3-Tier Hierarchy](slides/slides.md#L836) | Specific Error Overrides vs. Default Happy Paths vs. Catch-All Proxies |
| **25** | [⚖️ Priority Precedence in Action](slides/slides.md#L908) | Comparing Matched Stubs: Scenario Override vs. Default Route |
| **26** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L953) | Steer Multiple Downstream Services from a Single Test Request |
| **27** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L990) | Data & Structural Meaning vs. Raw Character Matching |
| **28** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L1035) | Strict Matchers vs. Resilient Microservice Contracts |
| **29** | [📦 Body Matching — Example](slides/slides.md#L1080) | Match Request Bodies with equalToJson |
| **30** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L1113) | Advanced Payload Filtering with Jayway JsonPath |
| **31** | [🔍 JSONPath Expression — High-Value Payment Example](slides/slides.md#L1176) | Value Threshold Filtering & Dynamic Approval Routing |
| **32** | [🎯 WireMock RegEx — Path & Dynamic Resource Routing](slides/slides.md#L1208) | Multi-Segment Hierarchy Matching with urlPathPattern |
| **33** | [🎯 WireMock RegEx — Header & Scenario Steering](slides/slides.md#L1266) | Strict Bearer Token & Scenario Enum Validation |
| **34** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1324) | 13-Digit National ID & Query Version Validation |
| **35** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1382) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath |
| **36** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1410) | Anatomy of matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]" |
| **37** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1451) | Handlebars Response Templating (response-template) |
| **38** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1489) | Reading Path, Query, Header & Body Values into Responses |
| **39** | [🪄 Dynamic Response Headers & Timezones](slides/slides.md#L1550) | Injecting In-Flight Tracking IDs, Cookies & Location Headers |
| **40** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1589) | Request Model Extraction & Data Encoders |
| **41** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1607) | Timestamps, Random IDs & Token Generation |
| **42** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1624) | Conditionals, Dynamic Math & Response Configuration |
| **43** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1650) | String Manipulation & Substring Extractors |
| **44** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1668) | Array Looping, Sizing & Variable Lookups |
| **45** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1688) |  |
| **46** | [🔍 WireMock — Handlebars jsonPath & Safe Fallbacks](slides/slides.md#L1750) | Deep Traversal, Array Indexing, Safe Defaults & Dynamic Sizing |
| **47** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1803) | Echoing Nested Request Payloads & Handling Missing Fields |
| **48** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1827) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs |
| **49** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1874) | Deterministic Delay Injection (fixedDelayMilliseconds) |
| **50** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1898) | Real-World Latency Simulation (delayDistribution) |
| **51** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1951) | Simulating Hard Network Failures & Socket Errors |
| **52** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1973) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) |
| **53** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L2038) | State-Aware Request Evaluation & Transition Mechanics |
| **54** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L2072) |  |
| **55** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L2135) |  |
| **56** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2181) |  |
| **57** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2244) |  |
| **58** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2307) |  |
| **59** | [🧹 WireMock — Test Isolation & Reset Lifecycle](slides/slides.md#L2374) | Eliminating State Bleed with Automated Scenario Teardown |
| **60** | [⚡ WireMock — Scenario Seeding & Inspection](slides/slides.md#L2445) | Fast-Forwarding Preconditions and Introspecting Live FSM States |
| **61** | [⚠️ Production Crisis: The Biometric eKYC Dilemma](slides/slides.md#L2517) | Why External Vendor Sandboxes Threaten Mobile Banking Launches |
| **62** | [🏆 Capstone Challenge: WireMock Biometric Face Scan Stub](slides/slides.md#L2586) | Author a self-service biometric verification stub with liveness confidence thresholding |
| **63** | [🛡️ Part 3](slides/slides.md#L2656) | Burp Suite — MITM Traffic Control & Interception |
| **64** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L2668) |  |
| **65** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2680) |  |
| **66** | [🔀 Proxy Intercept — Example](slides/slides.md#L2710) | Before & After Request Header Injection |
| **67** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2760) | Real-Time Traffic Auditing & Inspection |
| **68** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L2792) |  |
| **69** | [⚡ Live Intercept in Action](slides/slides.md#L2811) |  |
| **70** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L2828) | Zero-Click Automated Header & Payload Manipulation |
| **71** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L2868) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **72** | [🐳 Part 4](slides/slides.md#L2918) | Testcontainers — Hermetic Infrastructure |
| **73** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L2928) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **74** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L2993) | Docker Daemon Requirement & Supported Runtimes |
| **75** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L3025) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure |
| **76** | [✅ The Hermetic Containerized Solution](slides/slides.md#L3085) | Isolated, Disposable & Predictable Infrastructure On-Demand |
| **77** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L3143) | Dynamic Ports & Code-Driven Orchestration |
| **78** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L3163) |  |
| **79** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L3200) |  |
| **80** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L3252) |  |
| **81** | [🎭 Part 5](slides/slides.md#L3299) | Playwright — Full-Stack E2E Automation |
| **82** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L3309) | Modern Full-Stack Integration Testing Architecture |
| **83** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L3374) | Eliminating Flaky sleep() Calls with Actionability Checks |
| **84** | [🎭 Playwright — Network Route Interception](slides/slides.md#L3413) |  |
| **85** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L3477) | Mocking Native Device APIs with page.addInitScript() |
| **86** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L3510) | Testing Multi-Step Auth Flow with Mock Steer (website.spec.ts) |
| **87** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L3546) | Headless REST Verification & Scenario Resets (bff.spec.ts) |
| **88** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L3581) |  |
| **89** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L3631) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **90** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L3667) | Interactive UI, Debugging, Filtering & Code Generation |
| **91** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L3699) | Dynamic Stubs, State Resets & Verification Endpoints |
| **92** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L3737) | Everyday Monorepo, Build & Hermetic Test Commands |
| **93** | [Live Demo](slides/slides.md#L3778) |  |
| **94** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L3793) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **95** | [🎉 Thank You!](slides/slides.md#L3839) |  |
| **96** | [📚 Appendix](slides/slides.md#L3862) | Additional Tools — Trace Atlas & k6 Performance Testing |
| **97** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L3873) |  |
| **98** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L3887) |  |
| **99** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L3899) | Developer-Centric High-Concurrency Performance Testing & SLA Verification |
| **100** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L3928) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing |
| **101** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L3982) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards |
