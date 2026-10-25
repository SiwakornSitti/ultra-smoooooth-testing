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
| **8** | [💻 Pillar 3: Container Bootstrap in Code](slides/slides.md#L328) | Dynamic Port Mapping & Ephemeral Bootstrap in TypeScript |
| **9** | [🎭 Pillar 4: Full-Stack E2E Automation (Playwright)](slides/slides.md#L369) | Unified Browser Automation, REST API Testing & Zero Flakiness |
| **10** | [🏗️ Part 1](slides/slides.md#L422) | Ecosystem Architecture |
| **11** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L433) | Interactive Microservices Ecosystem & Call Flow Diagram |
| **12** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L447) | Monorepo Workspaces, Modern Web & Relational Persistence |
| **13** | [🧪 Technology Stack — Virtualization & Traffic Control](slides/slides.md#L480) | External API Simulation (WireMock) & In-Flight Traffic Interception (Burp Suite) |
| **14** | [🧪 Technology Stack — Infrastructure & E2E Automation](slides/slides.md#L536) | Ephemeral Containers (Testcontainers) & Unified Full-Stack Testing (Playwright) |
| **15** | [🪝 Part 2](slides/slides.md#L592) | WireMock — External API Virtualization |
| **16** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L602) | Programmable HTTP Mock Server for External API Simulation |
| **17** | [🎯 Why WireMock in Testing?](slides/slides.md#L627) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution |
| **18** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L654) | Exact Path Routing, Regex Patterns & Dynamic Resource Validation |
| **19** | [⚡ WireMock — Header Matching & Scenario Steering](slides/slides.md#L714) | Exact Matches, Substrings, Regex & Mock Scenario Steering |
| **20** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L778) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction |
| **21** | [⚖️ WireMock — Priority & 3-Tier Precedence Hierarchy](slides/slides.md#L842) | Specific Error Overrides vs. Default Happy Paths vs. Catch-All Proxies |
| **22** | [⚖️ Priority Precedence in Action](slides/slides.md#L914) | Comparing Matched Stubs: Scenario Override vs. Default Route |
| **23** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L959) | Steer Multiple Downstream Services from a Single Test Request |
| **24** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L996) | Data & Structural Meaning vs. Raw Character Matching |
| **25** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L1043) | Strict Matchers vs. Resilient Microservice Contracts |
| **26** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L1107) | Advanced Payload Filtering with Jayway JsonPath |
| **27** | [🔍 JSONPath Expression — High-Value Payment Filter](slides/slides.md#L1172) | Declarative threshold routing in WireMock request body patterns |
| **28** | [🧪 Practice Lab 1: Web UI & Precision Matching](slides/slides.md#L1247) | Verify threshold routing and inspect unmatched diffs in WireMock Web UI |
| **29** | [🎯 WireMock RegEx — Path & Dynamic Resource Routing](slides/slides.md#L1315) | Multi-Segment Hierarchy Matching with `urlPathPattern` |
| **30** | [🎯 WireMock RegEx — Header & Scenario Steering](slides/slides.md#L1381) | Strict Bearer Token & Scenario Enum Validation |
| **31** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1447) | 13-Digit National ID & Query Version Validation |
| **32** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1513) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath |
| **33** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1541) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` |
| **34** | [📥 WireMock — Request Data Extraction & Echoing](slides/slides.md#L1582) | Path Segments, Query Parameters, Headers & JSONPath Payloads |
| **35** | [🪄 Handlebars Logic, Math & Dynamic Data](slides/slides.md#L1650) | Conditionals, Arithmetic Calculations & Ephemeral Token Generators |
| **36** | [🧪 Practice Lab 4: Dynamic Templating & Chaos Latency](slides/slides.md#L1717) | Validate Dynamic Math Calculations & Chaos Latency Timeout Handling |
| **37** | [🔁 WireMock — Array Iteration & String Modifiers](slides/slides.md#L1779) | Loop Collections with each, Indexing, String Modifiers & Safe Defaults |
| **38** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1842) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs |
| **39** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1889) | Deterministic Delay Injection (`fixedDelayMilliseconds`) |
| **40** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1913) | Real-World Latency Simulation (`delayDistribution`) |
| **41** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1966) | Simulating Hard Network Failures & Socket Errors |
| **42** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1988) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) |
| **43** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L2053) | State-Aware Request Evaluation & Transition Mechanics |
| **44** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L2087) | OAuth Authorization Code & OTP Replay Attack Prevention |
| **45** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L2150) | Modeling Sequential Domain State Transitions |
| **46** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2196) | Testing Client Exponential Backoff & Circuit Breaker Recovery |
| **47** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2259) | At-Least-Once Delivery & Duplicate Message Detection |
| **48** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2322) | Triggering Outbound HTTP Events with serveEventListeners |
| **49** | [⚠️ WireMock — The State Bleed Problem](slides/slides.md#L2389) | Why In-Memory Finite State Machines Cause Flaky CI Failures |
| **50** | [🧹 WireMock — Automated Scenario Reset Hook](slides/slides.md#L2468) | Hermetic Test Isolation with POST /__admin/scenarios/reset |
| **51** | [⚡ WireMock — Scenario Seeding & Inspection](slides/slides.md#L2548) | Fast-Forwarding Preconditions and Introspecting Live FSM States |
| **52** | [🎬 Stateful Order Lifecycle Transitions](slides/slides.md#L2620) | Live instructor walkthrough: Authoring, advancing, and introspecting scenario FSMs |
| **53** | [🏆 Workshop: Stateful Order Fulfillment Machine](slides/slides.md#L2687) | Author a multi-state WireMock scenario modeling sequential order domain transitions |
| **54** | [⚠️ Production Crisis: Biometric eKYC Dilemma](slides/slides.md#L2751) | Why External Vendor Sandboxes Threaten Mobile Banking Launches |
| **55** | [🎬 Biometric Face Scan Virtualization](slides/slides.md#L2820) | Live instructor walkthrough: Authoring stubs with confidence thresholds and dynamic templating |
| **56** | [🏆 Workshop: Biometric Face Scan Stub](slides/slides.md#L2887) | Author a self-service biometric verification stub with liveness confidence thresholding |
| **57** | [🛡️ Part 3](slides/slides.md#L2949) | Burp Suite — MITM Traffic Control & Interception |
| **58** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L2961) | Client, MITM Proxy Engine & Backend Microservices Interaction |
| **59** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2975) | Real-Time Traffic Auditing & Inspection |
| **60** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L3007) | Visualizing Request and Response Flow Through the MITM Engine |
| **61** | [⚡ Live Intercept in Action](slides/slides.md#L3026) | Pausing, Inspecting, Modifying & Forwarding Packets Mid-Flight |
| **62** | [🧪 Practice Lab 5: Live MITM Packet Interception](slides/slides.md#L3051) | Tamper with live HTTP traffic mid-flight to steer downstream WireMock responses |
| **63** | [🎬 In-Flight Traffic Interception & Tampering](slides/slides.md#L3119) | Live instructor walkthrough: Intercepting payloads and steering downstream failure states |
| **64** | [🏆 Workshop: In-Flight Fraud Tampering](slides/slides.md#L3185) | Tamper with transfer payload mid-flight and inject downstream fraud steering headers |
| **65** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L3249) | Zero-Click Automated Header & Payload Manipulation |
| **66** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L3289) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **67** | [🐳 Part 4](slides/slides.md#L3339) | Testcontainers — Hermetic Infrastructure |
| **68** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L3349) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **69** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L3414) | Docker Daemon Requirement & Supported Runtimes |
| **70** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L3446) | Dynamic Ports & Code-Driven Orchestration |
| **71** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L3466) | Code-Driven Container Helper Architecture (tests/specs/support/containers.ts) |
| **72** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L3499) | Running Production DDL Scripts in Ephemeral Containers (tests/specs/support/containers.ts) |
| **73** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L3542) | Complete Test Hook Pipeline (beforeAll Setup & afterAll Teardown) |
| **74** | [🎭 Part 5](slides/slides.md#L3584) | Playwright — Full-Stack E2E Automation |
| **75** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L3594) | Modern Full-Stack Integration Testing Architecture |
| **76** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L3659) | Eliminating Flaky `sleep()` Calls with Actionability Checks |
| **77** | [🎭 Playwright — Network Route Interception](slides/slides.md#L3698) | Dynamic Mock Header Injection & Multi-Scenario Steering as Code |
| **78** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L3764) | Mocking Native Device APIs with `page.addInitScript()` |
| **79** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L3792) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) |
| **80** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L3820) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) |
| **81** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L3850) | Record Every Action, DOM Snapshot & Network Request for Post-Mortem Debugging |
| **82** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L3900) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **83** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L3936) | Interactive UI, Debugging, Filtering & Code Generation |
| **84** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L3968) | Dynamic Stubs, State Resets & Verification Endpoints |
| **85** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L4006) | Everyday Monorepo, Build & Hermetic Test Commands |
| **86** | [Live Walkthrough](slides/slides.md#L4047) | Hands-On Walkthrough 🚀 |
| **87** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L4062) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **88** | [🎉 Thank You!](slides/slides.md#L4108) | Happy Ultra Smoooooth Testing 🚀 |
| **89** | [📚 Appendix](slides/slides.md#L4131) | Additional Tools — Trace Atlas & k6 Performance Testing |
| **90** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L4142) | Multi-Repo Service Discovery, Workspaces & Ecosystem Scale |
| **91** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L4156) | Visualizing Microservice Call Chains, External Dependencies & Datastores |
| **92** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L4168) | Developer-Centric High-Concurrency Performance Testing & SLA Verification |
| **93** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L4199) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing |
| **94** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L4279) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards |
