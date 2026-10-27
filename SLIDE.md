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
| **1** | [Ultra Smoooooth Testing Workshop](slides/slides.md#L0) | Cover & Workshop Overview |
| **2** | [📦 Workshop Materials &amp; Quick Access](slides/slides.md#L22) | Scan the QR Code or Clone the Repository to Follow Along Live |
| **3** | [⚠️ The Testing Crisis](slides/slides.md#L107) | Why Traditional Microservice Testing Fails in Practice |
| **4** | [📋 Workshop Agenda](slides/slides.md#L167) | What We'll Cover Today |
| **5** | [🎯 Testing Strategy & Core Pillars](slides/slides.md#L204) | Comprehensive Architectural Foundations for Integration Testing |
| **6** | [🌐 Pillar 1: External API Virtualization (WireMock)](slides/slides.md#L244) | Eliminating External API Dependencies & Sandbox Flakiness |
| **7** | [⚡ Pillar 2: In-Flight Traffic Interception (Burp Suite)](slides/slides.md#L297) | Live MITM Traffic Inspection, Fault Injection & Security Boundaries |
| **8** | [🐳 Pillar 3: Hermetic Infrastructure (Testcontainers)](slides/slides.md#L345) | Isolated Ephemeral Containers, Dynamic Ports & Automatic Teardown |
| **9** | [💻 Pillar 3: Container Bootstrap in Code](slides/slides.md#L409) | Dynamic Port Mapping & Ephemeral Bootstrap in TypeScript |
| **10** | [🎭 Pillar 4: Full-Stack E2E Automation (Playwright)](slides/slides.md#L452) | Unified Browser Automation, REST API Testing & Zero Flakiness |
| **11** | [🏗️ Part 1](slides/slides.md#L503) | Workshop Module |
| **12** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L514) | Interactive Microservices Ecosystem & Call Flow Diagram |
| **13** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L530) | Monorepo Workspaces, Modern Web &amp; Relational Persistence |
| **14** | [🧪 Technology Stack — Virtualization & Traffic Control](slides/slides.md#L598) | External API Simulation (WireMock) & In-Flight Traffic Interception (Burp Suite) |
| **15** | [🧪 Technology Stack — Infrastructure & E2E Automation](slides/slides.md#L654) | Ephemeral Containers (Testcontainers) & Unified Full-Stack Testing (Playwright) |
| **16** | [🪝 Part 2](slides/slides.md#L710) | Workshop Module |
| **17** | [🪝 What is WireMock & Why Use It in Testing?](slides/slides.md#L722) | Programmable HTTP Mock Server • Deterministic Isolation &amp; Zero Sandbox Flakiness |
| **18** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L795) | Exact Path Routing, Regex Patterns & Dynamic Resource Validation |
| **19** | [⚡ WireMock — Header Matching & Scenario Steering](slides/slides.md#L855) | Exact Matches, Substrings, Regex & Mock Scenario Steering |
| **20** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L919) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction |
| **21** | [⚖️ WireMock — Priority & 3-Tier Precedence Hierarchy](slides/slides.md#L983) | Specific Error Overrides vs. Default Happy Paths vs. Catch-All Proxies |
| **22** | [⚖️ Priority Precedence in Action](slides/slides.md#L1066) | Comparing Matched Stubs: Scenario Override vs. Default Route |
| **23** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L1111) | Steer Multiple Downstream Services from a Single Test Request |
| **24** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L1148) | Data & Structural Meaning vs. Raw Character Matching |
| **25** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L1193) | Strict Matchers vs. Resilient Microservice Contracts |
| **26** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L1259) | Advanced Payload Filtering with Jayway JsonPath |
| **27** | [🔍 JSONPath Expression — High-Value Payment Filter](slides/slides.md#L1322) | Declarative threshold routing in WireMock request body patterns |
| **28** | [🎯 WireMock RegEx — Path & Dynamic Routing](slides/slides.md#L1397) | Multi-Segment Hierarchy Matching with urlPathPattern |
| **29** | [🎯 WireMock RegEx — Header & Scenario Steering](slides/slides.md#L1473) | Strict Bearer Token & Scenario Enum Validation with matches |
| **30** | [🎯 WireMock RegEx — Body & Query Matching](slides/slides.md#L1551) | 13-Digit Thai National ID & Query Versioning with matches |
| **31** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1629) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath |
| **32** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1659) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` |
| **33** | [📥 WireMock — Request Data Extraction & Echoing](slides/slides.md#L1698) | Path Segments, Query Parameters, Headers &amp; JSONPath Payloads |
| **34** | [🪄 Handlebars Logic, Math & Dynamic Data](slides/slides.md#L1791) | Conditionals, Arithmetic Calculations &amp; Ephemeral Token Generators |
| **35** | [🔁 WireMock — Array Iteration & String Modifiers](slides/slides.md#L1869) | Loop Collections with each, Indexing, String Modifiers & Safe Defaults |
| **36** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1932) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs |
| **37** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1981) | Deterministic Delay &amp; Chunked Dribble Simulation for HTTP Deadlines |
| **38** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L2053) | Simulating Real-World Asymmetric Network Jitter &amp; Tail Spikes |
| **39** | [💥 WireMock — Network Fault Injection (Chaos)](slides/slides.md#L2124) | Simulating Hard Socket Failures, Packet Truncation &amp; Circuit Breaker Tripping |
| **40** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L2200) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) |
| **41** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L2265) | State-Aware Request Evaluation & Transition Mechanics |
| **42** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L2297) | OAuth Authorization Code &amp; OTP Replay Attack Prevention |
| **43** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L2360) | Modeling Sequential Domain State Transitions |
| **44** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2406) | Testing Client Exponential Backoff &amp; Circuit Breaker Recovery |
| **45** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2469) | At-Least-Once Delivery &amp; Duplicate Message Detection |
| **46** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2532) | Triggering Outbound HTTP Events with serveEventListeners |
| **47** | [⚠️ WireMock — The State Bleed Problem](slides/slides.md#L2599) | Why In-Memory Finite State Machines Cause Flaky CI Failures |
| **48** | [🧹 WireMock — Automated Scenario Reset Hook](slides/slides.md#L2678) | Hermetic Test Isolation with POST /__admin/scenarios/reset |
| **49** | [🎯 WireMock — Targeted Per-Scenario Teardown](slides/slides.md#L2750) | Avoiding Cross-Spec Collisions with PUT /__admin/scenarios/:name/state |
| **50** | [⚡ WireMock — Scenario Seeding & Inspection](slides/slides.md#L2823) | Fast-Forwarding Preconditions and Introspecting Live FSM States |
| **51** | [🎬 Live Demo](slides/slides.md#L2895) | Workshop Module |
| **52** | [🏆 Hands-On Workshops](slides/slides.md#L2906) | Workshop Module |
| **53** | [🧪 Practice Lab: Precision Matching — Baseline](slides/slides.md#L2917) | Step 1: Verify High-Value JSONPath Filter (&gt; 1000) in WireMock |
| **54** | [🧪 Practice Lab: Precision Matching — Challenge](slides/slides.md#L3003) | Step 2: Participant Challenge — Trigger Threshold Rejection (&lt;= 1000) |
| **55** | [🧪 Practice Lab: Dynamic Templating & Chaos Latency](slides/slides.md#L3089) | Validate Dynamic Math Calculations & Chaos Latency Timeout Handling |
| **56** | [🏆 Workshop: Biometric Face Scan Stub](slides/slides.md#L3151) | Author a self-service biometric verification stub with liveness confidence thresholding |
| **57** | [🏆 Workshop: Patient Medical Checkup Machine](slides/slides.md#L3224) | Author a stateful clinical workflow FSM from sample collection to sealed diagnosis |
| **58** | [🛡️ Part 3](slides/slides.md#L3308) | Workshop Module |
| **59** | [🛡️ What is Burp Suite? — MITM Security Proxy](slides/slides.md#L3320) | The Industry-Standard Cybersecurity Platform for Web &amp; API Traffic Inspection |
| **60** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L3386) | Client, MITM Proxy Engine & Backend Microservices Interaction |
| **61** | [🎯 Why Use Burp Suite in Integration Testing?](slides/slides.md#L3407) | Repurposing Cybersecurity Superpowers for Microservices QA &amp; Resilience |
| **62** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L3475) | Visualizing Request and Response Flow Through the MITM Engine |
| **63** | [⚡ Live Intercept in Action](slides/slides.md#L3494) | Pausing, Inspecting, Modifying &amp; Forwarding Packets Mid-Flight |
| **64** | [🔒 How HTTPS Works — Phase 1: TLS Handshake](slides/slides.md#L3520) | Asymmetric Authentication, SNI Routing &amp; Ephemeral Key Exchange (ECDHE) |
| **65** | [🔒 How HTTPS Works — Phase 2: Direct TLS vs. MITM Dual-Terminus](slides/slides.md#L3585) | Symmetric Payload Encryption (AES-GCM): Single Direct Tunnel vs. Two Terminated Handshakes |
| **66** | [🏛️ PKI Architecture — Core Trust Flow](slides/slides.md#L3660) | How Key Pairs, Digital Certificates &amp; Trusted CAs Establish Encrypted Identity |
| **67** | [🔐 Why We Need Custom Certificate Chaining](slides/slides.md#L3732) | How Dynamic TLS Interception &amp; Hierarchical Trust Chains Solve HTTPS Encryption |
| **68** | [⚙️ Why Certificate Chaining Works — Cryptographic Delegation](slides/slides.md#L3801) | Transitive Trust, RFC 5280 Path Validation &amp; Asymmetric Signature Verification |
| **69** | [🎯 Burp Suite — Target: Site Map & Scope Control](slides/slides.md#L3879) | Mapping Microservice Topology &amp; Isolating Test Traffic from External Noise |
| **70** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L3942) | Real-Time Traffic Auditing & Inspection |
| **71** | [🔁 Burp Suite — Repeater: Manual Request Workbench](slides/slides.md#L3972) | Zero-UI API Workbench for Ad-Hoc Modification, Edge-Case Probing &amp; Rapid Replay |
| **72** | [🔬 Burp Suite — Repeater: Advanced Triage &amp; QA Workflow](slides/slides.md#L4059) | Sidecar Inspector, Tab Organization, Iterative Mutation &amp; Tool Handoffs |
| **73** | [⚡ Burp Suite — Intruder: Automated Parameter Fuzzing](slides/slides.md#L4133) | High-Throughput Payload Fuzzing, Boundary Probes &amp; Race Condition Testing |
| **74** | [🎯 Intruder Modes — Sniper vs. Battering Ram](slides/slides.md#L4201) | Single Payload List: One Blank at a Time vs. Identical Twin Values Everywhere (ELI5) |
| **75** | [🔱 Intruder Modes — Pitchfork vs. Cluster Bomb](slides/slides.md#L4288) | Multiple Payload Lists: Lockstep Pairs vs. Trying Every Possible Combination (ELI5) |
| **76** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L4375) | Zero-Click Automated Header & Payload Manipulation |
| **77** | [🔤 Burp Suite — Decoder: Multi-Layer Payload Transformation](slides/slides.md#L4415) | Bi-Directional Encoding, Decoding, Hashing &amp; JWT Token Inspection |
| **78** | [⚖️ Burp Suite — Comparer: Visual Response Diffing](slides/slides.md#L4479) | Side-by-Side Word &amp; Byte Level Diffs to Isolate Subtle State Variations |
| **79** | [🎲 Burp Suite — Sequencer &amp; Extensibility (BApp)](slides/slides.md#L4545) | Token Entropy Analysis &amp; Custom Test Automation with Extensions |
| **80** | [🛡️ Burp CA Certificate Setup — macOS](slides/slides.md#L4600) | Keychain Access Trust, Terminal CLI One-Liner & Loopback Proxy Bypass |
| **81** | [🛡️ Burp CA Certificate Setup — Windows](slides/slides.md#L4673) | Certificate Import Wizard, PowerShell Automation & Enterprise Browser Stores |
| **82** | [🛡️ Burp CA Certificate Setup — iOS](slides/slides.md#L4741) | Trusting PortSwigger Root CA on iPhone, iPad & iOS Simulator |
| **83** | [🛡️ Burp CA Certificate Setup — Android](slides/slides.md#L4814) | User Certificate Store, Network Security Config & Emulator Root Injection |
| **84** | [📱 Mobile SSL Pinning — What It Is & Why It Breaks Proxies](slides/slides.md#L4895) | Hardcoded SPKI Public Key Hashes vs. Operating System Trust Store Delegation |
| **85** | [🤖 Mobile SSL Pinning — Android White-Box Setup](slides/slides.md#L4968) | res/xml/network_security_config.xml — Enabling Staging Proxying with Zero Production Risk |
| **86** | [🍎 Mobile SSL Pinning — iOS White-Box Setup](slides/slides.md#L5016) | Build Schemes &amp; URLSessionDelegate — Safe Staging Inspection Without Production Debt |
| **87** | [⚡ SSL Pinning — Dynamic Hooking & Black-Box Bypass](slides/slides.md#L5063) | Runtime Memory Instrumentation with Frida &amp; Objection for Penetration Testing |
| **88** | [🧪 Practice Lab: Proxy Setup & Verification](slides/slides.md#L5134) | Configure Proxy Listener, Local Hostname Aliasing &amp; End-to-End Pipeline Verification |
| **89** | [🧪 Practice Lab: Live MITM Packet Interception](slides/slides.md#L5208) | Tamper with live HTTP traffic mid-flight to steer downstream WireMock responses |
| **90** | [🎬 In-Flight Traffic Interception & Tampering](slides/slides.md#L5275) | Live instructor walkthrough: Intercepting payloads and steering downstream failure states |
| **91** | [🏆 Workshop: In-Flight Fraud Tampering](slides/slides.md#L5347) | Tamper with transfer payload mid-flight and inject downstream fraud steering headers |
| **92** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L5418) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **93** | [🐳 Part 4](slides/slides.md#L5466) | Workshop Module |
| **94** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L5478) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **95** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L5543) | Docker Daemon Requirement & Supported Runtimes |
| **96** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L5575) | Dynamic Ports & Code-Driven Orchestration |
| **97** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L5593) | Code-Driven Container Helper Architecture (tests/specs/support/containers.ts) |
| **98** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L5626) | Running Production DDL Scripts in Ephemeral Containers (tests/specs/support/containers.ts) |
| **99** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L5669) | Complete Test Hook Pipeline (beforeAll Setup &amp; afterAll Teardown) |
| **100** | [🎭 Part 5](slides/slides.md#L5711) | Workshop Module |
| **101** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L5723) | Modern Full-Stack Integration Testing Architecture |
| **102** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L5788) | Eliminating Flaky `sleep()` Calls with Actionability Checks |
| **103** | [🎭 Playwright — Network Route Interception](slides/slides.md#L5825) | Dynamic Mock Header Injection &amp; Multi-Scenario Steering as Code |
| **104** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L5891) | Mocking Native Device APIs with `page.addInitScript()` |
| **105** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L5919) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) |
| **106** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L5947) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) |
| **107** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L5977) | Record Every Action, DOM Snapshot &amp; Network Request for Post-Mortem Debugging |
| **108** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L6029) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **109** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L6065) | Interactive UI, Debugging, Filtering & Code Generation |
| **110** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L6097) | Dynamic Stubs, State Resets & Verification Endpoints |
| **111** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L6135) | Everyday Monorepo, Build & Hermetic Test Commands |
| **112** | [Live Walkthrough](slides/slides.md#L6169) | Workshop Module |
| **113** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L6191) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **114** | [🎉 Thank You!](slides/slides.md#L6232) | Workshop Module |
| **115** | [📚 Appendix](slides/slides.md#L6258) | Workshop Module |
| **116** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L6269) | Multi-Repo Service Discovery, Workspaces & Ecosystem Scale |
| **117** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L6283) | Visualizing Microservice Call Chains, External Dependencies & Datastores |
| **118** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L6297) | Developer-Centric High-Concurrency Performance Testing & SLA Verification |
| **119** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L6326) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing |
| **120** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L6408) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards |
