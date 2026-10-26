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
| **12** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L449) | Monorepo Workspaces, Modern Web & Relational Persistence |
| **13** | [🧪 Technology Stack — Virtualization & Traffic Control](slides/slides.md#L517) | External API Simulation (WireMock) & In-Flight Traffic Interception (Burp Suite) |
| **14** | [🧪 Technology Stack — Infrastructure & E2E Automation](slides/slides.md#L573) | Ephemeral Containers (Testcontainers) & Unified Full-Stack Testing (Playwright) |
| **15** | [🪝 Part 2](slides/slides.md#L629) | WireMock — External API Virtualization |
| **16** | [🪝 What is WireMock & Why Use It in Testing?](slides/slides.md#L641) | Programmable HTTP Mock Server • Deterministic Isolation & Zero Sandbox Flakiness |
| **17** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L714) | Exact Path Routing, Regex Patterns & Dynamic Resource Validation |
| **18** | [⚡ WireMock — Header Matching & Scenario Steering](slides/slides.md#L774) | Exact Matches, Substrings, Regex & Mock Scenario Steering |
| **19** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L838) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction |
| **20** | [⚖️ WireMock — Priority & 3-Tier Precedence Hierarchy](slides/slides.md#L902) | Specific Error Overrides vs. Default Happy Paths vs. Catch-All Proxies |
| **21** | [⚖️ Priority Precedence in Action](slides/slides.md#L983) | Comparing Matched Stubs: Scenario Override vs. Default Route |
| **22** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L1028) | Steer Multiple Downstream Services from a Single Test Request |
| **23** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L1065) | Data & Structural Meaning vs. Raw Character Matching |
| **24** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L1112) | Strict Matchers vs. Resilient Microservice Contracts |
| **25** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L1176) | Advanced Payload Filtering with Jayway JsonPath |
| **26** | [🔍 JSONPath Expression — High-Value Payment Filter](slides/slides.md#L1241) | Declarative threshold routing in WireMock request body patterns |
| **27** | [🎯 WireMock RegEx — Path & Dynamic Routing](slides/slides.md#L1316) | Multi-Segment Hierarchy Matching with `urlPathPattern` |
| **28** | [🎯 WireMock RegEx — Header & Scenario Steering](slides/slides.md#L1392) | Strict Bearer Token & Scenario Enum Validation |
| **29** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1470) | 13-Digit National ID & Query Version Validation |
| **30** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1536) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath |
| **31** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1564) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` |
| **32** | [📥 WireMock — Request Data Extraction & Echoing](slides/slides.md#L1605) | Path Segments, Query Parameters, Headers & JSONPath Payloads |
| **33** | [🪄 Handlebars Logic, Math & Dynamic Data](slides/slides.md#L1673) | Conditionals, Arithmetic Calculations & Ephemeral Token Generators |
| **34** | [🔁 WireMock — Array Iteration & String Modifiers](slides/slides.md#L1740) | Loop Collections with each, Indexing, String Modifiers & Safe Defaults |
| **35** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1803) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs |
| **36** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1852) | Deterministic Delay Injection (`fixedDelayMilliseconds`) |
| **37** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1924) | Real-World Latency Simulation (`delayDistribution`) |
| **38** | [💥 WireMock — Network Fault Injection (Chaos)](slides/slides.md#L1995) | Simulating Hard Network Failures & Socket Errors |
| **39** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L2069) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) |
| **40** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L2134) | State-Aware Request Evaluation & Transition Mechanics |
| **41** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L2168) | OAuth Authorization Code &amp; OTP Replay Attack Prevention |
| **42** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L2231) | Modeling Sequential Domain State Transitions |
| **43** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2277) | Testing Client Exponential Backoff &amp; Circuit Breaker Recovery |
| **44** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2340) | At-Least-Once Delivery &amp; Duplicate Message Detection |
| **45** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2403) | Triggering Outbound HTTP Events with serveEventListeners |
| **46** | [⚠️ WireMock — The State Bleed Problem](slides/slides.md#L2470) | Why In-Memory Finite State Machines Cause Flaky CI Failures |
| **47** | [🧹 WireMock — Automated Scenario Reset Hook](slides/slides.md#L2549) | Hermetic Test Isolation with POST /__admin/scenarios/reset |
| **48** | [⚡ WireMock — Scenario Seeding & Inspection](slides/slides.md#L2629) | Fast-Forwarding Preconditions and Introspecting Live FSM States |
| **49** | [🏆 Hands-On Workshops](slides/slides.md#L2701) | Production Challenge Missions & Controlled Chaos |
| **50** | [🧪 Practice Lab: Web UI & Precision Matching](slides/slides.md#L2712) | Verify threshold routing and inspect unmatched diffs in WireMock Web UI |
| **51** | [🧪 Practice Lab: Dynamic Templating & Chaos Latency](slides/slides.md#L2780) | Validate Dynamic Math Calculations & Chaos Latency Timeout Handling |
| **52** | [🎬 Stateful Order Lifecycle Transitions](slides/slides.md#L2842) | Live instructor walkthrough: Authoring, advancing, and introspecting scenario FSMs |
| **53** | [🏆 Workshop: Stateful Order Fulfillment Machine](slides/slides.md#L2923) | Author a multi-state WireMock scenario modeling sequential order domain transitions |
| **54** | [⚠️ Production Crisis: Biometric eKYC Dilemma](slides/slides.md#L2999) | Why External Vendor Sandboxes Threaten Mobile Banking Launches |
| **55** | [🎬 Biometric Face Scan Virtualization](slides/slides.md#L3068) | Live instructor walkthrough: Authoring stubs with confidence thresholds and dynamic templating |
| **56** | [🏆 Workshop: Biometric Face Scan Stub](slides/slides.md#L3147) | Author a self-service biometric verification stub with liveness confidence thresholding |
| **57** | [🛡️ Part 3](slides/slides.md#L3220) | Burp Suite — MITM Traffic Control & Interception |
| **58** | [🛡️ What is Burp Suite? — MITM Security Proxy](slides/slides.md#L3232) | The Industry-Standard Cybersecurity Platform for Web &amp; API Traffic Inspection |
| **59** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L3298) | Client, MITM Proxy Engine & Backend Microservices Interaction |
| **60** | [🔒 How HTTPS Works — Phase 1: TLS Handshake](slides/slides.md#L3319) | Asymmetric Authentication, SNI Routing &amp; Ephemeral Key Exchange (ECDHE) |
| **61** | [🔒 How HTTPS Works — Phase 2: Direct TLS vs. MITM Dual-Terminus](slides/slides.md#L3384) | Symmetric Payload Encryption (AES-GCM): Single Direct Tunnel vs. Two Terminated Handshakes |
| **62** | [🏛️ PKI Architecture — Core Trust Flow](slides/slides.md#L3459) | How Key Pairs, Digital Certificates &amp; Trusted CAs Establish Encrypted Identity |
| **63** | [🔐 Why We Need Custom Certificate Chaining](slides/slides.md#L3531) | How Dynamic TLS Interception &amp; Hierarchical Trust Chains Solve HTTPS Encryption |
| **64** | [⚙️ Why Certificate Chaining Works — Cryptographic Delegation](slides/slides.md#L3600) | Transitive Trust, RFC 5280 Path Validation &amp; Asymmetric Signature Verification |
| **65** | [🎯 Why Use Burp Suite in Integration Testing?](slides/slides.md#L3677) | Repurposing Cybersecurity Superpowers for Microservices QA &amp; Resilience |
| **66** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L3747) | Visualizing Request and Response Flow Through the MITM Engine |
| **67** | [⚡ Live Intercept in Action](slides/slides.md#L3766) | Pausing, Inspecting, Modifying &amp; Forwarding Packets Mid-Flight |
| **68** | [🎯 Burp Suite — Target: Site Map & Scope Control](slides/slides.md#L3791) | Mapping Microservice Topology &amp; Isolating Test Traffic from External Noise |
| **69** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L3852) | Real-Time Traffic Auditing & Inspection |
| **70** | [🔁 Burp Suite — Repeater: Manual Request Workbench](slides/slides.md#L3884) | Modify Headers, Tamper Payloads &amp; Re-Issue API Packets in Total Isolation |
| **71** | [⚡ Burp Suite — Intruder: Automated Parameter Fuzzing](slides/slides.md#L3949) | High-Throughput Payload Fuzzing, Boundary Probes &amp; Race Condition Testing |
| **72** | [🎯 Intruder Modes — Sniper vs. Battering Ram](slides/slides.md#L4017) | Single Payload List: One Blank at a Time vs. Identical Twin Values Everywhere (ELI5) |
| **73** | [🔱 Intruder Modes — Pitchfork vs. Cluster Bomb](slides/slides.md#L4104) | Multiple Payload Lists: Lockstep Pairs vs. Trying Every Possible Combination (ELI5) |
| **74** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L4189) | Zero-Click Automated Header & Payload Manipulation |
| **75** | [🔤 Burp Suite — Decoder: Multi-Layer Payload Transformation](slides/slides.md#L4231) | Bi-Directional Encoding, Decoding, Hashing &amp; JWT Token Inspection |
| **76** | [⚖️ Burp Suite — Comparer: Visual Response Diffing](slides/slides.md#L4295) | Side-by-Side Word &amp; Byte Level Diffs to Isolate Subtle State Variations |
| **77** | [🎲 Burp Suite — Sequencer &amp; Extensibility (BApp)](slides/slides.md#L4361) | Token Entropy Analysis &amp; Custom Test Automation with Extensions |
| **78** | [🛡️ Burp CA Certificate Setup — macOS](slides/slides.md#L4416) | Keychain Access Trust, Terminal CLI One-Liner & Loopback Proxy Bypass |
| **79** | [🛡️ Burp CA Certificate Setup — Windows](slides/slides.md#L4489) | Certificate Import Wizard, PowerShell Automation & Enterprise Browser Stores |
| **80** | [🛡️ Burp CA Certificate Setup — iOS](slides/slides.md#L4557) | Trusting PortSwigger Root CA on iPhone, iPad & iOS Simulator |
| **81** | [🛡️ Burp CA Certificate Setup — Android](slides/slides.md#L4630) | User Certificate Store, Network Security Config & Emulator Root Injection |
| **82** | [📱 Mobile SSL Pinning — What It Is & Why It Breaks Proxies](slides/slides.md#L4711) | Hardcoded SPKI Public Key Hashes vs. Operating System Trust Store Delegation |
| **83** | [🤖 Mobile SSL Pinning — Android White-Box Setup](slides/slides.md#L4784) | res/xml/network_security_config.xml — Enabling Staging Proxying with Zero Production Risk |
| **84** | [🍎 Mobile SSL Pinning — iOS White-Box Setup](slides/slides.md#L4832) | Build Schemes &amp; URLSessionDelegate — Safe Staging Inspection Without Production Debt |
| **85** | [⚡ SSL Pinning — Dynamic Hooking & Black-Box Bypass](slides/slides.md#L4879) | Runtime Memory Instrumentation with Frida &amp; Objection for Penetration Testing |
| **86** | [🧪 Practice Lab: Proxy Setup & Verification](slides/slides.md#L4950) | Configure Proxy Listener, Local Hostname Aliasing &amp; End-to-End Pipeline Verification |
| **87** | [🧪 Practice Lab: Live MITM Packet Interception](slides/slides.md#L5024) | Tamper with live HTTP traffic mid-flight to steer downstream WireMock responses |
| **88** | [🎬 In-Flight Traffic Interception & Tampering](slides/slides.md#L5091) | Live instructor walkthrough: Intercepting payloads and steering downstream failure states |
| **89** | [🏆 Workshop: In-Flight Fraud Tampering](slides/slides.md#L5163) | Tamper with transfer payload mid-flight and inject downstream fraud steering headers |
| **90** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L5232) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **91** | [🐳 Part 4](slides/slides.md#L5282) | Testcontainers — Hermetic Infrastructure |
| **92** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L5292) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **93** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L5357) | Docker Daemon Requirement & Supported Runtimes |
| **94** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L5389) | Dynamic Ports & Code-Driven Orchestration |
| **95** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L5409) | Code-Driven Container Helper Architecture (tests/specs/support/containers.ts) |
| **96** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L5442) | Running Production DDL Scripts in Ephemeral Containers (tests/specs/support/containers.ts) |
| **97** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L5485) | Complete Test Hook Pipeline (beforeAll Setup &amp; afterAll Teardown) |
| **98** | [🎭 Part 5](slides/slides.md#L5527) | Playwright — Full-Stack E2E Automation |
| **99** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L5537) | Modern Full-Stack Integration Testing Architecture |
| **100** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L5602) | Eliminating Flaky `sleep()` Calls with Actionability Checks |
| **101** | [🎭 Playwright — Network Route Interception](slides/slides.md#L5641) | Dynamic Mock Header Injection &amp; Multi-Scenario Steering as Code |
| **102** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L5707) | Mocking Native Device APIs with `page.addInitScript()` |
| **103** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L5735) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) |
| **104** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L5763) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) |
| **105** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L5793) | Record Every Action, DOM Snapshot &amp; Network Request for Post-Mortem Debugging |
| **106** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L5843) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **107** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L5879) | Interactive UI, Debugging, Filtering & Code Generation |
| **108** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L5911) | Dynamic Stubs, State Resets & Verification Endpoints |
| **109** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L5949) | Everyday Monorepo, Build & Hermetic Test Commands |
| **110** | [Live Walkthrough](slides/slides.md#L5990) | Hands-On Walkthrough 🚀 |
| **111** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L6005) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **112** | [🎉 Thank You!](slides/slides.md#L6051) | Happy Ultra Smoooooth Testing 🚀 |
| **113** | [📚 Appendix](slides/slides.md#L6074) | Additional Tools — Trace Atlas & k6 Performance Testing |
| **114** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L6085) | Multi-Repo Service Discovery, Workspaces & Ecosystem Scale |
| **115** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L6099) | Visualizing Microservice Call Chains, External Dependencies & Datastores |
| **116** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L6111) | Developer-Centric High-Concurrency Performance Testing & SLA Verification |
| **117** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L6142) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing |
| **118** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L6222) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards |
