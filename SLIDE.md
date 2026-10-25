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
| **24** | [🥇 Priority Tier 1: Specific Error Overrides](slides/slides.md#L845) | Fault Injection & Error Contracts |
| **25** | [🥈 Priority Tier 5–10: Default Happy Paths](slides/slides.md#L870) | Standard Business Logic & Route Matchers |
| **26** | [🛡️ Priority Tier 100: Catch-All Proxy](slides/slides.md#L894) | Transparent Fallback to Real Downstream Endpoints |
| **27** | [⚖️ Priority Precedence in Action](slides/slides.md#L916) | Comparing Matched Stubs: Scenario Override vs. Default Route |
| **28** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L961) | Steer Multiple Downstream Services from a Single Test Request |
| **29** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L998) | Data & Structural Meaning vs. Raw Character Matching |
| **30** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L1043) | Strict Matchers vs. Resilient Microservice Contracts |
| **31** | [📦 Body Matching — Example](slides/slides.md#L1088) | Match Request Bodies with equalToJson |
| **32** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L1118) | Advanced Payload Filtering with Jayway JsonPath |
| **33** | [🔍 JSONPath Expression — High-Value Payment Example](slides/slides.md#L1181) | Value Threshold Filtering & Dynamic Approval Routing |
| **34** | [🎯 WireMock — Multi-Segment Path RegEx Matching](slides/slides.md#L1208) | Regular Expressions for Nested Sub-Resources & Dynamic Route Patterns |
| **35** | [🎯 WireMock RegEx — Nested Resource Path Example](slides/slides.md#L1238) | Multi-Segment Nested Sub-Resource Routing in API Stubs |
| **36** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L1265) | Bearer Tokens & Scenario Enums |
| **37** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L1293) | Strict Token & Scenario Routing |
| **38** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L1320) | Raw Text Matching vs. Semantic JSON Evaluation |
| **39** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1359) | 13-Digit National ID & Query Version Validation |
| **40** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1388) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath |
| **41** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1416) | Anatomy of matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]" |
| **42** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1457) | Handlebars Response Templating (response-template) |
| **43** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1493) | Reading Path, Query, Header & Body Values into Responses |
| **44** | [🪄 Dynamic Response Headers & Timezones](slides/slides.md#L1554) | Injecting In-Flight Tracking IDs, Cookies & Location Headers |
| **45** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1593) | Request Model Extraction & Data Encoders |
| **46** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1611) | Timestamps, Random IDs & Token Generation |
| **47** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1628) | Conditionals, Dynamic Math & Response Configuration |
| **48** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1654) | String Manipulation & Substring Extractors |
| **49** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1672) | Array Looping, Sizing & Variable Lookups |
| **50** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1692) |  |
| **51** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1752) | Deep Object Traversal & Array Indexing |
| **52** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1776) | Graceful Fallbacks & Array Counting |
| **53** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1800) | Echoing Nested Request Payloads & Handling Missing Fields |
| **54** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1824) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs |
| **55** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1871) | Deterministic Delay Injection (fixedDelayMilliseconds) |
| **56** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1895) | Real-World Latency Simulation (delayDistribution) |
| **57** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1948) | Simulating Hard Network Failures & Socket Errors |
| **58** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1970) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) |
| **59** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L2008) | State-Aware Request Evaluation & Transition Mechanics |
| **60** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L2042) |  |
| **61** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L2105) |  |
| **62** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2151) | Testing Client Exponential Backoff & Circuit Breakers |
| **63** | [🔄 Stateful Pattern 3: Retry & Recovery Stubs](slides/slides.md#L2182) |  |
| **64** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2241) |  |
| **65** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2304) |  |
| **66** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L2369) | Preventing State Bleed with the WireMock Admin API |
| **67** | [⚠️ Production Crisis: The Biometric eKYC Dilemma](slides/slides.md#L2406) | Why External Vendor Sandboxes Threaten Mobile Banking Launches |
| **68** | [🏆 Capstone Challenge: WireMock Biometric Face Scan Stub](slides/slides.md#L2475) | Author a self-service biometric verification stub with liveness confidence thresholding |
| **69** | [🛡️ Part 3](slides/slides.md#L2545) | Burp Suite — MITM Traffic Control & Interception |
| **70** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L2557) |  |
| **71** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2569) |  |
| **72** | [🔀 Proxy Intercept — Example](slides/slides.md#L2603) | Before & After Request Header Injection |
| **73** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2653) | Real-Time Traffic Auditing & Inspection |
| **74** | [🔀 Deep Dive: Bi-Directional Duplex Interception](slides/slides.md#L2685) |  |
| **75** | [⚡ Live Intercept in Action](slides/slides.md#L2704) |  |
| **76** | [⚙️ Match & Replace Rules: Automated Transformation](slides/slides.md#L2721) | Zero-Click Automated Header & Payload Manipulation |
| **77** | [⚡ Architectural Split: WireMock vs. Burp Suite](slides/slides.md#L2761) | Downstream Service Virtualization vs. In-Flight MITM Traffic Interception |
| **78** | [🐳 Part 4](slides/slides.md#L2811) | Testcontainers — Hermetic Infrastructure |
| **79** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L2821) | Programmable Docker Infrastructure Directly in Your Test Suite |
| **80** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L2850) | Docker Daemon Requirement & Supported Runtimes |
| **81** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2882) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure |
| **82** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2946) | Isolated, Disposable & Predictable Infrastructure On-Demand |
| **83** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L3008) | Dynamic Ports & Code-Driven Orchestration |
| **84** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L3028) |  |
| **85** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L3064) |  |
| **86** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L3113) |  |
| **87** | [🎭 Part 5](slides/slides.md#L3158) | Playwright — Full-Stack E2E Automation |
| **88** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L3168) | Modern Full-Stack Integration Testing Architecture |
| **89** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L3197) | Eliminating Flaky sleep() Calls with Actionability Checks |
| **90** | [🎭 Playwright — Network Route Interception](slides/slides.md#L3236) |  |
| **91** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L3300) | Mocking Native Device APIs with page.addInitScript() |
| **92** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L3326) | Testing Multi-Step Auth Flow with Mock Steer (website.spec.ts) |
| **93** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L3357) | Headless REST Verification & Scenario Resets (bff.spec.ts) |
| **94** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L3386) |  |
| **95** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L3436) | Common Locators, Actions, Web-First Assertions & Network Steering |
| **96** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L3472) | Interactive UI, Debugging, Filtering & Code Generation |
| **97** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L3504) | Dynamic Stubs, State Resets & Verification Endpoints |
| **98** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L3542) | Everyday Monorepo, Build & Hermetic Test Commands |
| **99** | [Live Demo](slides/slides.md#L3583) |  |
| **100** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L3598) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing |
| **101** | [🎉 Thank You!](slides/slides.md#L3644) |  |
| **102** | [📚 Appendix](slides/slides.md#L3667) | Additional Tools — Trace Atlas & k6 Performance Testing |
| **103** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L3678) |  |
| **104** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L3692) |  |
| **105** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L3704) | Developer-Centric High-Concurrency Performance Testing & SLA Verification |
| **106** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L3733) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing |
| **107** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L3783) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards |
