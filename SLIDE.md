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
| **63** | [⚠️ Production Crisis: Biometric eKYC Dilemma](slides/slides.md#L2718) | Why External Vendor Sandboxes Threaten Mobile Banking Launches |
| **64** | [🏆 Capstone: Biometric Face Scan Stub](slides/slides.md#L2787) | Author a self-service biometric verification stub with liveness confidence thresholding |
| **65** | [🛡️ Part 3](slides/slides.md#L2849) |  |
| **66** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L2861) | Client, MITM Proxy Engine & Backend Microservices Interaction |
| **67** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2873) | Dual-Direction Traffic Control: Requests and Responses |
| **68** | [🔀 Proxy Intercept — Example](slides/slides.md#L2903) | Before & After Request Header Injection |
| **69** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2953) | Real-Time Traffic Auditing & Inspection |
| **70** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L2985) | Visualizing Request and Response Flow Through the MITM Engine |
| **71** | [⚡ Live Intercept in Action](slides/slides.md#L3004) | Pausing, Inspecting, Modifying & Forwarding Packets Mid-Flight |
| **72** | [🧪 Practice Lab 5: Live MITM Packet Interception](slides/slides.md#L3029) | Tamper with live HTTP traffic mid-flight to steer downstream WireMock responses |
| **73** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L3095) | Zero-Click Automated Header & Payload Manipulation |
| **74** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L3135) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **75** | [🐳 Part 4](slides/slides.md#L3185) |  |
| **76** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L3195) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **77** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L3260) | Docker Daemon Requirement & Supported Runtimes |
| **78** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L3292) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure |
| **79** | [✅ The Hermetic Containerized Solution](slides/slides.md#L3352) | Isolated, Disposable & Predictable Infrastructure On-Demand |
| **80** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L3410) | Dynamic Ports & Code-Driven Orchestration |
| **81** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L3430) |  |
| **82** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L3467) |  |
| **83** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L3519) |  |
| **84** | [🎭 Part 5](slides/slides.md#L3566) |  |
| **85** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L3576) | Modern Full-Stack Integration Testing Architecture |
| **86** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L3641) | Eliminating Flaky sleep() Calls with Actionability Checks |
| **87** | [🎭 Playwright — Network Route Interception](slides/slides.md#L3680) | Dynamic Mock Header Injection & Multi-Scenario Steering as Code |
| **88** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L3744) | Mocking Native Device APIs with page.addInitScript() |
| **89** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L3777) | Testing Multi-Step Auth Flow with Mock Steer (website.spec.ts) |
| **90** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L3813) | Headless REST Verification & Scenario Resets (bff.spec.ts) |
| **91** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L3848) | Record Every Action, DOM Snapshot & Network Request for Post-Mortem Debugging |
| **92** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L3898) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **93** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L3934) | Interactive UI, Debugging, Filtering & Code Generation |
| **94** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L3966) | Dynamic Stubs, State Resets & Verification Endpoints |
| **95** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L4004) | Everyday Monorepo, Build & Hermetic Test Commands |
| **96** | [Live Demo](slides/slides.md#L4045) |  |
| **97** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L4060) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **98** | [🎉 Thank You!](slides/slides.md#L4106) |  |
| **99** | [📚 Appendix](slides/slides.md#L4129) |  |
| **100** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L4140) | Multi-Repo Service Discovery, Workspaces & Ecosystem Scale |
| **101** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L4154) | Visualizing Microservice Call Chains, External Dependencies & Datastores |
| **102** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L4166) | Developer-Centric High-Concurrency Performance Testing & SLA Verification |
| **103** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L4195) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing |
| **104** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L4249) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards |
