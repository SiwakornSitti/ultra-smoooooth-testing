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
| **10** | [🏗️ Part 1](slides/slides.md#L429) |  |
| **11** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L440) | Interactive Microservices Ecosystem & Call Flow Diagram |
| **12** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L454) | Monorepo Workspaces, Modern Web & Relational Persistence |
| **13** | [🧪 Technology Stack — Virtualization & Traffic Control](slides/slides.md#L487) | External API Simulation (WireMock) & In-Flight Traffic Interception (Burp Suite) |
| **14** | [🧪 Technology Stack — Infrastructure & E2E Automation](slides/slides.md#L543) | Ephemeral Containers (Testcontainers) & Unified Full-Stack Testing (Playwright) |
| **15** | [🪝 Part 2](slides/slides.md#L599) |  |
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
| **31** | [🔍 JSONPath Expression — High-Value Payment Filter](slides/slides.md#L1178) | Declarative threshold routing in WireMock request body patterns |
| **32** | [🧪 Practice Lab 1: Web UI & Precision Matching](slides/slides.md#L1253) | Verify threshold routing and inspect unmatched diffs in WireMock Web UI |
| **33** | [🎯 WireMock RegEx — Path & Dynamic Resource Routing](slides/slides.md#L1321) | Multi-Segment Hierarchy Matching with urlPathPattern |
| **34** | [🎯 WireMock RegEx — Header & Scenario Steering](slides/slides.md#L1379) | Strict Bearer Token & Scenario Enum Validation |
| **35** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1437) | 13-Digit National ID & Query Version Validation |
| **36** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1495) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath |
| **37** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1523) | Anatomy of matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]" |
| **38** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1564) | Handlebars Response Templating (response-template) |
| **39** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1602) | Reading Path, Query, Header & Body Values into Responses |
| **40** | [🪄 Dynamic Response Headers & Timezones](slides/slides.md#L1663) | Injecting In-Flight Tracking IDs, Cookies & Location Headers |
| **41** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1702) | Request Model Extraction & Data Encoders |
| **42** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1720) | Timestamps, Random IDs & Token Generation |
| **43** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1737) | Conditionals, Dynamic Math & Response Configuration |
| **44** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1763) | String Manipulation & Substring Extractors |
| **45** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1781) | Array Looping, Sizing & Variable Lookups |
| **46** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1801) | 📝 1. WireMock Handlebars Template |
| **47** | [🔍 WireMock — Handlebars jsonPath & Safe Fallbacks](slides/slides.md#L1863) | Deep Traversal, Array Indexing, Safe Defaults & Dynamic Sizing |
| **48** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1916) | Echoing Nested Request Payloads & Handling Missing Fields |
| **49** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1940) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs |
| **50** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1987) | Deterministic Delay Injection (fixedDelayMilliseconds) |
| **51** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L2011) | Real-World Latency Simulation (delayDistribution) |
| **52** | [💥 WireMock — Network Fault Injection](slides/slides.md#L2064) | Simulating Hard Network Failures & Socket Errors |
| **53** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L2086) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) |
| **54** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L2151) | State-Aware Request Evaluation & Transition Mechanics |
| **55** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L2185) | OAuth Authorization Code & OTP Replay Attack Prevention |
| **56** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L2248) | Modeling Sequential Domain State Transitions |
| **57** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2294) | Testing Client Exponential Backoff & Circuit Breaker Recovery |
| **58** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2357) | At-Least-Once Delivery & Duplicate Message Detection |
| **59** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2420) | ⚡ Event-Driven Webhook Execution |
| **60** | [⚠️ WireMock — The State Bleed Problem](slides/slides.md#L2487) | Why In-Memory Finite State Machines Cause Flaky CI Failures |
| **61** | [🧹 WireMock — Automated Scenario Reset Hook](slides/slides.md#L2566) | Hermetic Test Isolation with POST /__admin/scenarios/reset |
| **62** | [⚡ WireMock — Scenario Seeding & Inspection](slides/slides.md#L2646) | Fast-Forwarding Preconditions and Introspecting Live FSM States |
| **63** | [🏆 Capstone: Stateful Order Fulfillment Machine](slides/slides.md#L2718) | Author a multi-state WireMock scenario modeling sequential order domain transitions |
| **64** | [⚠️ Production Crisis: Biometric eKYC Dilemma](slides/slides.md#L2782) | Why External Vendor Sandboxes Threaten Mobile Banking Launches |
| **65** | [🏆 Capstone: Biometric Face Scan Stub](slides/slides.md#L2851) | Author a self-service biometric verification stub with liveness confidence thresholding |
| **66** | [🛡️ Part 3](slides/slides.md#L2913) |  |
| **67** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L2925) | Client, MITM Proxy Engine & Backend Microservices Interaction |
| **68** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2937) | Dual-Direction Traffic Control: Requests and Responses |
| **69** | [🔀 Proxy Intercept — Example](slides/slides.md#L2967) | Before & After Request Header Injection |
| **70** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L3017) | Real-Time Traffic Auditing & Inspection |
| **71** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L3049) | Visualizing Request and Response Flow Through the MITM Engine |
| **72** | [⚡ Live Intercept in Action](slides/slides.md#L3068) | Pausing, Inspecting, Modifying & Forwarding Packets Mid-Flight |
| **73** | [🧪 Practice Lab 5: Live MITM Packet Interception](slides/slides.md#L3093) | Tamper with live HTTP traffic mid-flight to steer downstream WireMock responses |
| **74** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L3159) | Zero-Click Automated Header & Payload Manipulation |
| **75** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L3199) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **76** | [🐳 Part 4](slides/slides.md#L3249) |  |
| **77** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L3259) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **78** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L3324) | Docker Daemon Requirement & Supported Runtimes |
| **79** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L3356) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure |
| **80** | [✅ The Hermetic Containerized Solution](slides/slides.md#L3416) | Isolated, Disposable & Predictable Infrastructure On-Demand |
| **81** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L3474) | Dynamic Ports & Code-Driven Orchestration |
| **82** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L3494) |  |
| **83** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L3531) |  |
| **84** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L3583) |  |
| **85** | [🎭 Part 5](slides/slides.md#L3630) |  |
| **86** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L3640) | Modern Full-Stack Integration Testing Architecture |
| **87** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L3705) | Eliminating Flaky sleep() Calls with Actionability Checks |
| **88** | [🎭 Playwright — Network Route Interception](slides/slides.md#L3744) | Dynamic Mock Header Injection & Multi-Scenario Steering as Code |
| **89** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L3808) | Mocking Native Device APIs with page.addInitScript() |
| **90** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L3841) | Testing Multi-Step Auth Flow with Mock Steer (website.spec.ts) |
| **91** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L3877) | Headless REST Verification & Scenario Resets (bff.spec.ts) |
| **92** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L3912) | Record Every Action, DOM Snapshot & Network Request for Post-Mortem Debugging |
| **93** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L3962) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **94** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L3998) | Interactive UI, Debugging, Filtering & Code Generation |
| **95** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L4030) | Dynamic Stubs, State Resets & Verification Endpoints |
| **96** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L4068) | Everyday Monorepo, Build & Hermetic Test Commands |
| **97** | [Live Demo](slides/slides.md#L4109) |  |
| **98** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L4124) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **99** | [🎉 Thank You!](slides/slides.md#L4170) |  |
| **100** | [📚 Appendix](slides/slides.md#L4193) |  |
| **101** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L4204) | Multi-Repo Service Discovery, Workspaces & Ecosystem Scale |
| **102** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L4218) | Visualizing Microservice Call Chains, External Dependencies & Datastores |
| **103** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L4230) | Developer-Centric High-Concurrency Performance Testing & SLA Verification |
| **104** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L4259) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing |
| **105** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L4313) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards |
