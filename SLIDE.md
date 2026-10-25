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
