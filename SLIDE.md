# 📑 Presentation Slides Index (SLIDE.md)

Quick navigation reference for all slides in [](slides/slides.md).

| # | Slide Title | Subtitle / Topic | Line Anchor |
| :---: | :--- | :--- | :---: |
| **1** | [Ultra Smoooooth Testing Workshop](slides/slides.md#L1) | — | `L1` |
| **2** | [](slides/slides.md#L14) | — | `L14` |
| **3** | [⚠️ The Testing Crisis](slides/slides.md#L22) | Why Traditional Microservice Testing Fails in Practice | `L22` |
| **4** | [📋 Workshop Agenda](slides/slides.md#L86) | What We'll Cover Today | `L86` |
| **5** | [🎯 Testing Strategy & Core Pillars](slides/slides.md#L127) | Comprehensive Architectural Foundations for Integration Testing | `L127` |
| **6** | [🌐 Pillar 1: External API Virtualization (WireMock)](slides/slides.md#L175) | Eliminating External API Dependencies & Sandbox Flakiness | `L175` |
| **7** | [⚡ Pillar 2: In-Flight Traffic Interception (Burp Suite)](slides/slides.md#L228) | Live MITM Traffic Inspection, Fault Injection & Security Boundaries | `L228` |
| **8** | [🐳 Pillar 3: Hermetic Infrastructure (Testcontainers)](slides/slides.md#L276) | Isolated Ephemeral Containers, Dynamic Ports & Automatic Teardown | `L276` |
| **9** | [🎭 Pillar 4: Full-Stack E2E Automation (Playwright)](slides/slides.md#L323) | Unified Browser Automation, REST API Testing & Zero Flakiness | `L323` |
| **10** | [🏗️ Part 1](slides/slides.md#L370) | Ecosystem Architecture | `L370` |
| **11** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L381) | Interactive Microservices Ecosystem & Call Flow Diagram | `L381` |
| **12** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L397) | Monorepo Workspaces, Modern Web & Relational Persistence | `L397` |
| **13** | [🧪 Technology Stack — Testing & Security Infrastructure](slides/slides.md#L428) | Mocking, MITM Proxy, Ephemeral Containers & E2E Engine | `L428` |
| **14** | [🪝 Part 2](slides/slides.md#L468) | WireMock — External API Virtualization | `L468` |
| **15** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L480) | Programmable HTTP Mock Server for External API Simulation | `L480` |
| **16** | [🎯 Why WireMock in Testing?](slides/slides.md#L505) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution | `L505` |
| **17** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L530) | Exact Path Routing, Regex Patterns & Query Strings | `L530` |
| **18** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L560) | Exact Matches, Substrings, Regex & Absence Checks | `L560` |
| **19** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L590) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction | `L590` |
| **20** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L619) | Regex Path Routing & Bearer JWT Validation | `L619` |
| **21** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L646) | Query Flag Filtering & Multi-Criteria Evaluation | `L646` |
| **22** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L673) | Resolution Hierarchy for Overlapping Stub Mappings | `L673` |
| **23** | [🥇 Priority Tier 1: Specific Error Overrides](slides/slides.md#L705) | Fault Injection & Error Contracts | `L705` |
| **24** | [🥈 Priority Tier 5–10: Default Happy Paths](slides/slides.md#L730) | Standard Business Logic & Route Matchers | `L730` |
| **25** | [🛡️ Priority Tier 100: Catch-All Proxy](slides/slides.md#L754) | Transparent Fallback to Real Downstream Endpoints | `L754` |
| **26** | [⚖️ Priority Precedence in Action](slides/slides.md#L776) | Comparing Matched Stubs: Scenario Override vs. Default Route | `L776` |
| **27** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L821) | Steer Multiple Downstream Services from a Single Test Request | `L821` |
| **28** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L858) | Data & Structural Meaning vs. Raw Character Matching | `L858` |
| **29** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L903) | Strict Matchers vs. Resilient Microservice Contracts | `L903` |
| **30** | [📦 Body Matching — Example](slides/slides.md#L948) | Match Request Bodies with `equalToJson` | `L948` |
| **31** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L978) | Advanced Payload Filtering with Jayway JsonPath | `L978` |
| **32** | [🔍 JSONPath Expression — High-Value Payment Example](slides/slides.md#L1041) | Value Threshold Filtering & Dynamic Approval Routing | `L1041` |
| **33** | [🎯 WireMock — Multi-Segment Path RegEx Matching](slides/slides.md#L1068) | Regular Expressions for Nested Sub-Resources & Dynamic Route Patterns | `L1068` |
| **34** | [🎯 WireMock RegEx — Nested Resource Path Example](slides/slides.md#L1098) | Multi-Segment Nested Sub-Resource Routing in API Stubs | `L1098` |
| **35** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L1125) | Bearer Tokens & Scenario Enums | `L1125` |
| **36** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L1153) | Strict Token & Scenario Routing | `L1153` |
| **37** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L1180) | Raw Text Matching vs. Semantic JSON Evaluation | `L1180` |
| **38** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1219) | 13-Digit National ID & Query Version Validation | `L1219` |
| **39** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1246) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath | `L1246` |
| **40** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1285) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` | `L1285` |
| **41** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1324) | Handlebars Response Templating (`response-template`) | `L1324` |
| **42** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1362) | Reading Path, Query, Header & Body Values into Responses | `L1362` |
| **43** | [🪄 Dynamic Response Headers & Timezones](slides/slides.md#L1423) | Injecting In-Flight Tracking IDs, Cookies & Location Headers | `L1423` |
| **44** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1462) | Request Model Extraction & Data Encoders | `L1462` |
| **45** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1480) | Timestamps, Random IDs & Token Generation | `L1480` |
| **46** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1497) | Conditionals, Dynamic Math & Response Configuration | `L1497` |
| **47** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1523) | String Manipulation & Substring Extractors | `L1523` |
| **48** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1541) | Array Looping, Sizing & Variable Lookups | `L1541` |
| **49** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1559) | — | `L1559` |
| **50** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1621) | Deep Object Traversal & Array Indexing | `L1621` |
| **51** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1645) | Graceful Fallbacks & Array Counting | `L1645` |
| **52** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1669) | Echoing Nested Request Payloads & Handling Missing Fields | `L1669` |
| **53** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1693) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs | `L1693` |
| **54** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1740) | Deterministic Delay Injection (`fixedDelayMilliseconds`) | `L1740` |
| **55** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1764) | Real-World Latency Simulation (`delayDistribution`) | `L1764` |
| **56** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1817) | Simulating Hard Network Failures & Socket Errors | `L1817` |
| **57** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1839) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) | `L1839` |
| **58** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1877) | State-Aware Request Evaluation & Transition Mechanics | `L1877` |
| **59** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1909) | — | `L1909` |
| **60** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L1972) | — | `L1972` |
| **61** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2018) | Testing Client Exponential Backoff & Circuit Breakers | `L2018` |
| **62** | [🔄 Stateful Pattern 3: Retry & Recovery Stubs](slides/slides.md#L2049) | — | `L2049` |
| **63** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2108) | — | `L2108` |
| **64** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2171) | — | `L2171` |
| **65** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L2238) | Preventing State Bleed with the WireMock Admin API | `L2238` |
| **66** | [🛡️ Part 3](slides/slides.md#L2273) | Burp Suite — MITM Traffic Control & Interception | `L2273` |
| **67** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L2285) | — | `L2285` |
| **68** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2299) | — | `L2299` |
| **69** | [🔀 Proxy Intercept — Example](slides/slides.md#L2333) | Before & After Request Header Injection | `L2333` |
| **70** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2383) | Real-Time Traffic Auditing & Inspection | `L2383` |
| **71** | [🐳 Part 4](slides/slides.md#L2413) | Testcontainers — Hermetic Infrastructure | `L2413` |
| **72** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L2425) | Programmable Docker Infrastructure Directly in Your Test Suite | `L2425` |
| **73** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L2454) | Docker Daemon Requirement & Supported Runtimes | `L2454` |
| **74** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2484) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure | `L2484` |
| **75** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2548) | Isolated, Disposable & Predictable Infrastructure On-Demand | `L2548` |
| **76** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2612) | Dynamic Ports & Code-Driven Orchestration | `L2612` |
| **77** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L2630) | Code-Driven Container Helper Architecture (`tests/specs/support/containers.ts`) | `L2630` |
| **78** | [🗄️ Testcontainers — Database Migration Schema & Seeds](slides/slides.md#L2660) | Running Production DDL Scripts in Ephemeral Containers (`tests/specs/support/containers.ts`) | `L2660` |
| **79** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2705) | — | `L2705` |
| **80** | [🎭 Part 5](slides/slides.md#L2750) | Playwright — Full-Stack E2E Automation | `L2750` |
| **81** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2762) | Modern Full-Stack Integration Testing Architecture | `L2762` |
| **82** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L2791) | Eliminating Flaky `sleep()` Calls with Actionability Checks | `L2791` |
| **83** | [🎭 Playwright — Network Route Interception](slides/slides.md#L2828) | — | `L2828` |
| **84** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L2894) | Mocking Native Device APIs with `page.addInitScript()` | `L2894` |
| **85** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L2920) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) | `L2920` |
| **86** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L2951) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) | `L2951` |
| **87** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L2978) | — | `L2978` |
| **88** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L3030) | Common Locators, Actions, Web-First Assertions & Network Steering | `L3030` |
| **89** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L3066) | Interactive UI, Debugging, Filtering & Code Generation | `L3066` |
| **90** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L3098) | Dynamic Stubs, State Resets & Verification Endpoints | `L3098` |
| **91** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L3130) | Everyday Monorepo, Build & Hermetic Test Commands | `L3130` |
| **92** | [Live Demo](slides/slides.md#L3164) | — | `L3164` |
| **93** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L3186) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing | `L3186` |
| **94** | [🎉 Thank You!](slides/slides.md#L3227) | — | `L3227` |
| **95** | [📚 Appendix](slides/slides.md#L3253) | Additional Tools — Trace Atlas & k6 Performance Testing | `L3253` |
| **96** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L3264) | — | `L3264` |
| **97** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L3278) | — | `L3278` |
| **98** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L3292) | Developer-Centric High-Concurrency Performance Testing & SLA Verification | `L3292` |
| **99** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L3321) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing | `L3321` |
