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
| **28** | [🧪 Practice Lab: Web UI & Precision Matching](slides/slides.md#L1247) | Verify threshold routing and inspect unmatched diffs in WireMock Web UI |
| **29** | [🎯 WireMock RegEx — Path & Dynamic Resource Routing](slides/slides.md#L1315) | Multi-Segment Hierarchy Matching with `urlPathPattern` |
| **30** | [🎯 WireMock RegEx — Header & Scenario Steering](slides/slides.md#L1381) | Strict Bearer Token & Scenario Enum Validation |
| **31** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1447) | 13-Digit National ID & Query Version Validation |
| **32** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1513) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath |
| **33** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1541) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` |
| **34** | [📥 WireMock — Request Data Extraction & Echoing](slides/slides.md#L1582) | Path Segments, Query Parameters, Headers & JSONPath Payloads |
| **35** | [🪄 Handlebars Logic, Math & Dynamic Data](slides/slides.md#L1650) | Conditionals, Arithmetic Calculations & Ephemeral Token Generators |
| **36** | [🧪 Practice Lab: Dynamic Templating & Chaos Latency](slides/slides.md#L1717) | Validate Dynamic Math Calculations & Chaos Latency Timeout Handling |
| **37** | [🔁 WireMock — Array Iteration & String Modifiers](slides/slides.md#L1779) | Loop Collections with each, Indexing, String Modifiers & Safe Defaults |
| **38** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1842) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs |
| **39** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1891) | Deterministic Delay Injection (`fixedDelayMilliseconds`) |
| **40** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1963) | Real-World Latency Simulation (`delayDistribution`) |
| **41** | [💥 WireMock — Network Fault Injection](slides/slides.md#L2034) | Simulating Hard Network Failures & Socket Errors |
| **42** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L2108) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) |
| **43** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L2173) | State-Aware Request Evaluation & Transition Mechanics |
| **44** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L2207) | OAuth Authorization Code &amp; OTP Replay Attack Prevention |
| **45** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L2270) | Modeling Sequential Domain State Transitions |
| **46** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2316) | Testing Client Exponential Backoff &amp; Circuit Breaker Recovery |
| **47** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2379) | At-Least-Once Delivery &amp; Duplicate Message Detection |
| **48** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2442) | Triggering Outbound HTTP Events with serveEventListeners |
| **49** | [⚠️ WireMock — The State Bleed Problem](slides/slides.md#L2509) | Why In-Memory Finite State Machines Cause Flaky CI Failures |
| **50** | [🧹 WireMock — Automated Scenario Reset Hook](slides/slides.md#L2588) | Hermetic Test Isolation with POST /__admin/scenarios/reset |
| **51** | [⚡ WireMock — Scenario Seeding & Inspection](slides/slides.md#L2668) | Fast-Forwarding Preconditions and Introspecting Live FSM States |
| **52** | [🏆 Hands-On Workshops](slides/slides.md#L2740) | Production Challenge Missions & Controlled Chaos |
| **53** | [🎬 Stateful Order Lifecycle Transitions](slides/slides.md#L2751) | Live instructor walkthrough: Authoring, advancing, and introspecting scenario FSMs |
| **54** | [🏆 Workshop: Stateful Order Fulfillment Machine](slides/slides.md#L2818) | Author a multi-state WireMock scenario modeling sequential order domain transitions |
| **55** | [⚠️ Production Crisis: Biometric eKYC Dilemma](slides/slides.md#L2882) | Why External Vendor Sandboxes Threaten Mobile Banking Launches |
| **56** | [🎬 Biometric Face Scan Virtualization](slides/slides.md#L2951) | Live instructor walkthrough: Authoring stubs with confidence thresholds and dynamic templating |
| **57** | [🏆 Workshop: Biometric Face Scan Stub](slides/slides.md#L3018) | Author a self-service biometric verification stub with liveness confidence thresholding |
| **58** | [🛡️ Part 3](slides/slides.md#L3080) | Burp Suite — MITM Traffic Control & Interception |
| **59** | [🛡️ What is Burp Suite? — MITM Security Proxy](slides/slides.md#L3092) | The Industry-Standard Cybersecurity Platform for Web &amp; API Traffic Inspection |
| **60** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L3158) | Client, MITM Proxy Engine & Backend Microservices Interaction |
| **61** | [🔒 How HTTPS Works — TLS Handshake & Tunnel](slides/slides.md#L3179) | Dual-Phase Cryptography: Asymmetric Authentication &amp; Symmetric Payload Encryption |
| **62** | [🏛️ PKI Architecture — Core Trust Flow](slides/slides.md#L3267) | How Key Pairs, Digital Certificates &amp; Trusted CAs Establish Encrypted Identity |
| **63** | [🔐 Why We Need Custom Certificate Chaining](slides/slides.md#L3339) | How Dynamic TLS Interception &amp; Hierarchical Trust Chains Solve HTTPS Encryption |
| **64** | [⚙️ Why Certificate Chaining Works — Cryptographic Delegation](slides/slides.md#L3408) | Transitive Trust, RFC 5280 Path Validation &amp; Asymmetric Signature Verification |
| **65** | [🎯 Why Use Burp Suite in Integration Testing?](slides/slides.md#L3485) | Repurposing Cybersecurity Superpowers for Microservices QA &amp; Resilience |
| **66** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L3555) | Visualizing Request and Response Flow Through the MITM Engine |
| **67** | [⚡ Live Intercept in Action](slides/slides.md#L3574) | Pausing, Inspecting, Modifying &amp; Forwarding Packets Mid-Flight |
| **68** | [🧪 Practice Lab: Live MITM Packet Interception](slides/slides.md#L3599) | Tamper with live HTTP traffic mid-flight to steer downstream WireMock responses |
| **69** | [🎯 Burp Suite — Target: Site Map & Scope Control](slides/slides.md#L3666) | Mapping Microservice Topology &amp; Isolating Test Traffic from External Noise |
| **70** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L3727) | Real-Time Traffic Auditing & Inspection |
| **71** | [🔁 Burp Suite — Repeater: Manual Request Workbench](slides/slides.md#L3759) | Modify Headers, Tamper Payloads &amp; Re-Issue API Packets in Total Isolation |
| **72** | [⚡ Burp Suite — Intruder: Automated Parameter Fuzzing](slides/slides.md#L3824) | High-Throughput Payload Fuzzing, Boundary Probes &amp; Race Condition Testing |
| **73** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L3890) | Zero-Click Automated Header & Payload Manipulation |
| **74** | [🔤 Burp Suite — Decoder: Multi-Layer Payload Transformation](slides/slides.md#L3932) | Bi-Directional Encoding, Decoding, Hashing &amp; JWT Token Inspection |
| **75** | [⚖️ Burp Suite — Comparer: Visual Response Diffing](slides/slides.md#L3996) | Side-by-Side Word &amp; Byte Level Diffs to Isolate Subtle State Variations |
| **76** | [🎲 Burp Suite — Sequencer &amp; Extensibility (BApp)](slides/slides.md#L4062) | Token Entropy Analysis &amp; Custom Test Automation with Extensions |
| **77** | [🎬 In-Flight Traffic Interception & Tampering](slides/slides.md#L4117) | Live instructor walkthrough: Intercepting payloads and steering downstream failure states |
| **78** | [🏆 Workshop: In-Flight Fraud Tampering](slides/slides.md#L4189) | Tamper with transfer payload mid-flight and inject downstream fraud steering headers |
| **79** | [🛡️ Burp CA Certificate Setup — macOS](slides/slides.md#L4260) | Keychain Access Trust, Terminal CLI One-Liner & Loopback Proxy Bypass |
| **80** | [🛡️ Burp CA Certificate Setup — Windows](slides/slides.md#L4333) | Certificate Import Wizard, PowerShell Automation & Enterprise Browser Stores |
| **81** | [🛡️ Burp CA Certificate Setup — iOS](slides/slides.md#L4401) | Trusting PortSwigger Root CA on iPhone, iPad & iOS Simulator |
| **82** | [🛡️ Burp CA Certificate Setup — Android](slides/slides.md#L4474) | User Certificate Store, Network Security Config & Emulator Root Injection |
| **83** | [📱 Mobile SSL Pinning — Why It Breaks Proxies](slides/slides.md#L4555) | Hardcoded SPKI Public Key Hashes vs. Operating System Trust Store Delegation |
| **84** | [🤖 Mobile SSL Pinning — Android White-Box Setup](slides/slides.md#L4620) | res/xml/network_security_config.xml — Enabling Staging Proxying with Zero Production Risk |
| **85** | [🍎 Mobile SSL Pinning — iOS White-Box Setup](slides/slides.md#L4668) | Build Schemes &amp; URLSessionDelegate — Safe Staging Inspection Without Production Debt |
| **86** | [⚡ SSL Pinning — Dynamic Hooking & Black-Box Bypass](slides/slides.md#L4715) | Runtime Memory Instrumentation with Frida &amp; Objection for Penetration Testing |
| **87** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L4784) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **88** | [🐳 Part 4](slides/slides.md#L4834) | Testcontainers — Hermetic Infrastructure |
| **89** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L4844) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **90** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L4909) | Docker Daemon Requirement & Supported Runtimes |
| **91** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L4941) | Dynamic Ports & Code-Driven Orchestration |
| **92** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L4961) | Code-Driven Container Helper Architecture (tests/specs/support/containers.ts) |
| **93** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L4994) | Running Production DDL Scripts in Ephemeral Containers (tests/specs/support/containers.ts) |
| **94** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L5037) | Complete Test Hook Pipeline (beforeAll Setup &amp; afterAll Teardown) |
| **95** | [🎭 Part 5](slides/slides.md#L5079) | Playwright — Full-Stack E2E Automation |
| **96** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L5089) | Modern Full-Stack Integration Testing Architecture |
| **97** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L5154) | Eliminating Flaky `sleep()` Calls with Actionability Checks |
| **98** | [🎭 Playwright — Network Route Interception](slides/slides.md#L5193) | Dynamic Mock Header Injection &amp; Multi-Scenario Steering as Code |
| **99** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L5259) | Mocking Native Device APIs with `page.addInitScript()` |
| **100** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L5287) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) |
| **101** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L5315) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) |
| **102** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L5345) | Record Every Action, DOM Snapshot &amp; Network Request for Post-Mortem Debugging |
| **103** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L5395) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **104** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L5431) | Interactive UI, Debugging, Filtering & Code Generation |
| **105** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L5463) | Dynamic Stubs, State Resets & Verification Endpoints |
| **106** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L5501) | Everyday Monorepo, Build & Hermetic Test Commands |
| **107** | [Live Walkthrough](slides/slides.md#L5542) | Hands-On Walkthrough 🚀 |
| **108** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L5557) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **109** | [🎉 Thank You!](slides/slides.md#L5603) | Happy Ultra Smoooooth Testing 🚀 |
| **110** | [📚 Appendix](slides/slides.md#L5626) | Additional Tools — Trace Atlas & k6 Performance Testing |
| **111** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L5637) | Multi-Repo Service Discovery, Workspaces & Ecosystem Scale |
| **112** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L5651) | Visualizing Microservice Call Chains, External Dependencies & Datastores |
| **113** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L5663) | Developer-Centric High-Concurrency Performance Testing & SLA Verification |
| **114** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L5694) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing |
| **115** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L5774) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards |
