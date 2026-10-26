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
| **16** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L639) | Programmable HTTP Mock Server for External API Simulation |
| **17** | [🎯 Why WireMock in Testing?](slides/slides.md#L664) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution |
| **18** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L691) | Exact Path Routing, Regex Patterns & Dynamic Resource Validation |
| **19** | [⚡ WireMock — Header Matching & Scenario Steering](slides/slides.md#L751) | Exact Matches, Substrings, Regex & Mock Scenario Steering |
| **20** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L815) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction |
| **21** | [⚖️ WireMock — Priority & 3-Tier Precedence Hierarchy](slides/slides.md#L879) | Specific Error Overrides vs. Default Happy Paths vs. Catch-All Proxies |
| **22** | [⚖️ Priority Precedence in Action](slides/slides.md#L951) | Comparing Matched Stubs: Scenario Override vs. Default Route |
| **23** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L996) | Steer Multiple Downstream Services from a Single Test Request |
| **24** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L1033) | Data & Structural Meaning vs. Raw Character Matching |
| **25** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L1080) | Strict Matchers vs. Resilient Microservice Contracts |
| **26** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L1144) | Advanced Payload Filtering with Jayway JsonPath |
| **27** | [🔍 JSONPath Expression — High-Value Payment Filter](slides/slides.md#L1209) | Declarative threshold routing in WireMock request body patterns |
| **28** | [🧪 Practice Lab: Web UI & Precision Matching](slides/slides.md#L1284) | Verify threshold routing and inspect unmatched diffs in WireMock Web UI |
| **29** | [🎯 WireMock RegEx — Path & Dynamic Resource Routing](slides/slides.md#L1352) | Multi-Segment Hierarchy Matching with `urlPathPattern` |
| **30** | [🎯 WireMock RegEx — Header & Scenario Steering](slides/slides.md#L1418) | Strict Bearer Token & Scenario Enum Validation |
| **31** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1484) | 13-Digit National ID & Query Version Validation |
| **32** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1550) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath |
| **33** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1578) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` |
| **34** | [📥 WireMock — Request Data Extraction & Echoing](slides/slides.md#L1619) | Path Segments, Query Parameters, Headers & JSONPath Payloads |
| **35** | [🪄 Handlebars Logic, Math & Dynamic Data](slides/slides.md#L1687) | Conditionals, Arithmetic Calculations & Ephemeral Token Generators |
| **36** | [🧪 Practice Lab: Dynamic Templating & Chaos Latency](slides/slides.md#L1754) | Validate Dynamic Math Calculations & Chaos Latency Timeout Handling |
| **37** | [🔁 WireMock — Array Iteration & String Modifiers](slides/slides.md#L1816) | Loop Collections with each, Indexing, String Modifiers & Safe Defaults |
| **38** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1879) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs |
| **39** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1928) | Deterministic Delay Injection (`fixedDelayMilliseconds`) |
| **40** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L2000) | Real-World Latency Simulation (`delayDistribution`) |
| **41** | [💥 WireMock — Network Fault Injection (Chaos)](slides/slides.md#L2071) | Simulating Hard Network Failures & Socket Errors |
| **42** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L2145) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) |
| **43** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L2210) | State-Aware Request Evaluation & Transition Mechanics |
| **44** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L2244) | OAuth Authorization Code &amp; OTP Replay Attack Prevention |
| **45** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L2307) | Modeling Sequential Domain State Transitions |
| **46** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2353) | Testing Client Exponential Backoff &amp; Circuit Breaker Recovery |
| **47** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2416) | At-Least-Once Delivery &amp; Duplicate Message Detection |
| **48** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2479) | Triggering Outbound HTTP Events with serveEventListeners |
| **49** | [⚠️ WireMock — The State Bleed Problem](slides/slides.md#L2546) | Why In-Memory Finite State Machines Cause Flaky CI Failures |
| **50** | [🧹 WireMock — Automated Scenario Reset Hook](slides/slides.md#L2625) | Hermetic Test Isolation with POST /__admin/scenarios/reset |
| **51** | [⚡ WireMock — Scenario Seeding & Inspection](slides/slides.md#L2705) | Fast-Forwarding Preconditions and Introspecting Live FSM States |
| **52** | [🏆 Hands-On Workshops](slides/slides.md#L2777) | Production Challenge Missions & Controlled Chaos |
| **53** | [🎬 Stateful Order Lifecycle Transitions](slides/slides.md#L2788) | Live instructor walkthrough: Authoring, advancing, and introspecting scenario FSMs |
| **54** | [🏆 Workshop: Stateful Order Fulfillment Machine](slides/slides.md#L2869) | Author a multi-state WireMock scenario modeling sequential order domain transitions |
| **55** | [⚠️ Production Crisis: Biometric eKYC Dilemma](slides/slides.md#L2945) | Why External Vendor Sandboxes Threaten Mobile Banking Launches |
| **56** | [🎬 Biometric Face Scan Virtualization](slides/slides.md#L3014) | Live instructor walkthrough: Authoring stubs with confidence thresholds and dynamic templating |
| **57** | [🏆 Workshop: Biometric Face Scan Stub](slides/slides.md#L3093) | Author a self-service biometric verification stub with liveness confidence thresholding |
| **58** | [🛡️ Part 3](slides/slides.md#L3166) | Burp Suite — MITM Traffic Control & Interception |
| **59** | [🛡️ What is Burp Suite? — MITM Security Proxy](slides/slides.md#L3178) | The Industry-Standard Cybersecurity Platform for Web &amp; API Traffic Inspection |
| **60** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L3244) | Client, MITM Proxy Engine & Backend Microservices Interaction |
| **61** | [🔒 How HTTPS Works — Phase 1: TLS Handshake](slides/slides.md#L3265) | Asymmetric Authentication, SNI Routing &amp; Ephemeral Key Exchange (ECDHE) |
| **62** | [🔒 How HTTPS Works — Phase 2: Direct TLS vs. MITM Dual-Terminus](slides/slides.md#L3330) | Symmetric Payload Encryption (AES-GCM): Single Direct Tunnel vs. Two Terminated Handshakes |
| **63** | [🏛️ PKI Architecture — Core Trust Flow](slides/slides.md#L3405) | How Key Pairs, Digital Certificates &amp; Trusted CAs Establish Encrypted Identity |
| **64** | [🔐 Why We Need Custom Certificate Chaining](slides/slides.md#L3477) | How Dynamic TLS Interception &amp; Hierarchical Trust Chains Solve HTTPS Encryption |
| **65** | [⚙️ Why Certificate Chaining Works — Cryptographic Delegation](slides/slides.md#L3546) | Transitive Trust, RFC 5280 Path Validation &amp; Asymmetric Signature Verification |
| **66** | [🎯 Why Use Burp Suite in Integration Testing?](slides/slides.md#L3623) | Repurposing Cybersecurity Superpowers for Microservices QA &amp; Resilience |
| **67** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L3693) | Visualizing Request and Response Flow Through the MITM Engine |
| **68** | [⚡ Live Intercept in Action](slides/slides.md#L3712) | Pausing, Inspecting, Modifying &amp; Forwarding Packets Mid-Flight |
| **69** | [🧪 Practice Lab: Proxy Setup & Verification](slides/slides.md#L3737) | Configure Proxy Listener, Local Hostname Aliasing &amp; End-to-End Pipeline Verification |
| **70** | [🧪 Practice Lab: Live MITM Packet Interception](slides/slides.md#L3811) | Tamper with live HTTP traffic mid-flight to steer downstream WireMock responses |
| **71** | [🎯 Burp Suite — Target: Site Map & Scope Control](slides/slides.md#L3878) | Mapping Microservice Topology &amp; Isolating Test Traffic from External Noise |
| **72** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L3939) | Real-Time Traffic Auditing & Inspection |
| **73** | [🔁 Burp Suite — Repeater: Manual Request Workbench](slides/slides.md#L3971) | Modify Headers, Tamper Payloads &amp; Re-Issue API Packets in Total Isolation |
| **74** | [⚡ Burp Suite — Intruder: Automated Parameter Fuzzing](slides/slides.md#L4036) | High-Throughput Payload Fuzzing, Boundary Probes &amp; Race Condition Testing |
| **75** | [🎯 Intruder Modes — Sniper vs. Battering Ram](slides/slides.md#L4104) | Single Payload List: One Blank at a Time vs. Identical Twin Values Everywhere (ELI5) |
| **76** | [🔱 Intruder Modes — Pitchfork vs. Cluster Bomb](slides/slides.md#L4191) | Multiple Payload Lists: Lockstep Pairs vs. Trying Every Possible Combination (ELI5) |
| **77** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L4276) | Zero-Click Automated Header & Payload Manipulation |
| **78** | [🔤 Burp Suite — Decoder: Multi-Layer Payload Transformation](slides/slides.md#L4318) | Bi-Directional Encoding, Decoding, Hashing &amp; JWT Token Inspection |
| **79** | [⚖️ Burp Suite — Comparer: Visual Response Diffing](slides/slides.md#L4382) | Side-by-Side Word &amp; Byte Level Diffs to Isolate Subtle State Variations |
| **80** | [🎲 Burp Suite — Sequencer &amp; Extensibility (BApp)](slides/slides.md#L4448) | Token Entropy Analysis &amp; Custom Test Automation with Extensions |
| **81** | [🎬 In-Flight Traffic Interception & Tampering](slides/slides.md#L4503) | Live instructor walkthrough: Intercepting payloads and steering downstream failure states |
| **82** | [🏆 Workshop: In-Flight Fraud Tampering](slides/slides.md#L4575) | Tamper with transfer payload mid-flight and inject downstream fraud steering headers |
| **83** | [🛡️ Burp CA Certificate Setup — macOS](slides/slides.md#L4646) | Keychain Access Trust, Terminal CLI One-Liner & Loopback Proxy Bypass |
| **84** | [🛡️ Burp CA Certificate Setup — Windows](slides/slides.md#L4719) | Certificate Import Wizard, PowerShell Automation & Enterprise Browser Stores |
| **85** | [🛡️ Burp CA Certificate Setup — iOS](slides/slides.md#L4787) | Trusting PortSwigger Root CA on iPhone, iPad & iOS Simulator |
| **86** | [🛡️ Burp CA Certificate Setup — Android](slides/slides.md#L4860) | User Certificate Store, Network Security Config & Emulator Root Injection |
| **87** | [📱 Mobile SSL Pinning — What It Is & Why It Breaks Proxies](slides/slides.md#L4941) | Hardcoded SPKI Public Key Hashes vs. Operating System Trust Store Delegation |
| **88** | [🤖 Mobile SSL Pinning — Android White-Box Setup](slides/slides.md#L5014) | res/xml/network_security_config.xml — Enabling Staging Proxying with Zero Production Risk |
| **89** | [🍎 Mobile SSL Pinning — iOS White-Box Setup](slides/slides.md#L5062) | Build Schemes &amp; URLSessionDelegate — Safe Staging Inspection Without Production Debt |
| **90** | [⚡ SSL Pinning — Dynamic Hooking & Black-Box Bypass](slides/slides.md#L5109) | Runtime Memory Instrumentation with Frida &amp; Objection for Penetration Testing |
| **91** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L5178) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **92** | [🐳 Part 4](slides/slides.md#L5228) | Testcontainers — Hermetic Infrastructure |
| **93** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L5238) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **94** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L5303) | Docker Daemon Requirement & Supported Runtimes |
| **95** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L5335) | Dynamic Ports & Code-Driven Orchestration |
| **96** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L5355) | Code-Driven Container Helper Architecture (tests/specs/support/containers.ts) |
| **97** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L5388) | Running Production DDL Scripts in Ephemeral Containers (tests/specs/support/containers.ts) |
| **98** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L5431) | Complete Test Hook Pipeline (beforeAll Setup &amp; afterAll Teardown) |
| **99** | [🎭 Part 5](slides/slides.md#L5473) | Playwright — Full-Stack E2E Automation |
| **100** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L5483) | Modern Full-Stack Integration Testing Architecture |
| **101** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L5548) | Eliminating Flaky `sleep()` Calls with Actionability Checks |
| **102** | [🎭 Playwright — Network Route Interception](slides/slides.md#L5587) | Dynamic Mock Header Injection &amp; Multi-Scenario Steering as Code |
| **103** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L5653) | Mocking Native Device APIs with `page.addInitScript()` |
| **104** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L5681) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) |
| **105** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L5709) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) |
| **106** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L5739) | Record Every Action, DOM Snapshot &amp; Network Request for Post-Mortem Debugging |
| **107** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L5789) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **108** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L5825) | Interactive UI, Debugging, Filtering & Code Generation |
| **109** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L5857) | Dynamic Stubs, State Resets & Verification Endpoints |
| **110** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L5895) | Everyday Monorepo, Build & Hermetic Test Commands |
| **111** | [Live Walkthrough](slides/slides.md#L5936) | Hands-On Walkthrough 🚀 |
| **112** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L5951) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **113** | [🎉 Thank You!](slides/slides.md#L5997) | Happy Ultra Smoooooth Testing 🚀 |
| **114** | [📚 Appendix](slides/slides.md#L6020) | Additional Tools — Trace Atlas & k6 Performance Testing |
| **115** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L6031) | Multi-Repo Service Discovery, Workspaces & Ecosystem Scale |
| **116** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L6045) | Visualizing Microservice Call Chains, External Dependencies & Datastores |
| **117** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L6057) | Developer-Centric High-Concurrency Performance Testing & SLA Verification |
| **118** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L6088) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing |
| **119** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L6168) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards |
