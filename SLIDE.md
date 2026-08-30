# 📑 Presentation Slides Index (SLIDE.md)

Quick navigation reference for all slides in [`slides/slides.md`](slides/slides.md).

| # | Slide Title | Subtitle / Topic | Line Anchor |
| :---: | :--- | :--- | :---: |
| **1** | [Ultra Smoooooth Testing Workshop](slides/slides.md#L1) | — | `L1` |
| **2** | [⚠️ The Testing Crisis](slides/slides.md#L22) | Why Traditional Microservice Testing Fails in Practice | `L22` |
| **3** | [📋 Workshop Agenda](slides/slides.md#L86) | What We'll Cover Today | `L86` |
| **4** | [🎯 Testing Strategy & Core Pillars](slides/slides.md#L127) | Comprehensive Architectural Foundations for Integration Testing | `L127` |
| **5** | [🌐 Pillar 1: External API Virtualization (WireMock)](slides/slides.md#L176) | Eliminating External API Dependencies & Sandbox Flakiness | `L176` |
| **6** | [⚡ Pillar 2: In-Flight Traffic Interception (Burp Suite)](slides/slides.md#L229) | Live MITM Traffic Inspection, Fault Injection & Security Boundaries | `L229` |
| **7** | [🐳 Pillar 3: Hermetic Infrastructure (Testcontainers)](slides/slides.md#L277) | Isolated Ephemeral Containers, Dynamic Ports & Automatic Teardown | `L277` |
| **8** | [🎭 Pillar 4: Full-Stack E2E Automation (Playwright)](slides/slides.md#L324) | Unified Browser Automation, REST API Testing & Zero Flakiness | `L324` |
| **9** | [🏗️ Part 1](slides/slides.md#L370) | — | `L370` |
| **10** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L381) | Interactive Microservices Ecosystem & Call Flow Diagram | `L381` |
| **11** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L398) | Monorepo Workspaces, Modern Web & Relational Persistence | `L398` |
| **12** | [🧪 Technology Stack — Testing & Security Infrastructure](slides/slides.md#L428) | Mocking, MITM Proxy, Ephemeral Containers & E2E Engine | `L428` |
| **13** | [🪝 Part 2](slides/slides.md#L468) | — | `L468` |
| **14** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L481) | Programmable HTTP Mock Server for External API Simulation | `L481` |
| **15** | [🎯 Why WireMock in Testing?](slides/slides.md#L506) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution | `L506` |
| **16** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L531) | Exact Path Routing, Regex Patterns & Query Strings | `L531` |
| **17** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L561) | Exact Matches, Substrings, Regex & Absence Checks | `L561` |
| **18** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L591) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction | `L591` |
| **19** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L620) | Regex Path Routing & Bearer JWT Validation | `L620` |
| **20** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L647) | Query Flag Filtering & Multi-Criteria Evaluation | `L647` |
| **21** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L674) | Resolution Hierarchy for Overlapping Stub Mappings | `L674` |
| **22** | [🥇 Priority Tier 1: Specific Error Overrides](slides/slides.md#L706) | Fault Injection & Error Contracts | `L706` |
| **23** | [🥈 Priority Tier 5–10: Default Happy Paths](slides/slides.md#L731) | Standard Business Logic & Route Matchers | `L731` |
| **24** | [🛡️ Priority Tier 100: Catch-All Proxy](slides/slides.md#L755) | Transparent Fallback to Real Downstream Endpoints | `L755` |
| **25** | [⚖️ Priority Precedence in Action](slides/slides.md#L777) | Comparing Matched Stubs: Scenario Override vs. Default Route | `L777` |
| **26** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L822) | Steer Multiple Downstream Services from a Single Test Request | `L822` |
| **27** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L859) | Data & Structural Meaning vs. Raw Character Matching | `L859` |
| **28** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L904) | Strict Matchers vs. Resilient Microservice Contracts | `L904` |
| **29** | [📦 Body Matching — Example](slides/slides.md#L949) | Match Request Bodies with `equalToJson` | `L949` |
| **30** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L979) | Advanced Payload Filtering with Jayway JsonPath | `L979` |
| **31** | [🔍 JSONPath Expression — High-Value Payment Example](slides/slides.md#L1042) | Value Threshold Filtering & Dynamic Approval Routing | `L1042` |
| **32** | [🎯 WireMock — Multi-Segment Path RegEx Matching](slides/slides.md#L1069) | Regular Expressions for Nested Sub-Resources & Dynamic Route Patterns | `L1069` |
| **33** | [🎯 WireMock RegEx — Nested Resource Path Example](slides/slides.md#L1099) | Multi-Segment Nested Sub-Resource Routing in API Stubs | `L1099` |
| **34** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L1126) | Bearer Tokens & Scenario Enums | `L1126` |
| **35** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L1154) | Strict Token & Scenario Routing | `L1154` |
| **36** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L1181) | Raw Text Matching vs. Semantic JSON Evaluation | `L1181` |
| **37** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1220) | 13-Digit National ID & Query Version Validation | `L1220` |
| **38** | [🎯 WireMock RegEx — Multiple JSONPath Matchers](slides/slides.md#L1246) | Conjunctive (AND) Multi-Field Payload Validation with JSONPath | `L1246` |
| **39** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1286) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` | `L1286` |
| **40** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1324) | Handlebars Response Templating (`response-template`) | `L1324` |
| **41** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1363) | Reading Path, Query, Header & Body Values into Responses | `L1363` |
| **42** | [🪄 Dynamic Response Headers & Timezones](slides/slides.md#L1424) | Injecting In-Flight Tracking IDs, Cookies & Location Headers | `L1424` |
| **43** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1463) | Request Model Extraction & Data Encoders | `L1463` |
| **44** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1481) | Timestamps, Random IDs & Token Generation | `L1481` |
| **45** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1498) | Conditionals, Dynamic Math & Response Configuration | `L1498` |
| **46** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1524) | String Manipulation & Substring Extractors | `L1524` |
| **47** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1542) | Array Looping, Sizing & Variable Lookups | `L1542` |
| **48** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1559) | Generating Dynamic Arrays with {{#each}} and Indexing | `L1559` |
| **49** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1622) | Deep Object Traversal & Array Indexing | `L1622` |
| **50** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1646) | Graceful Fallbacks & Array Counting | `L1646` |
| **51** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1670) | Echoing Nested Request Payloads & Handling Missing Fields | `L1670` |
| **52** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1694) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs | `L1694` |
| **53** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1741) | Deterministic Delay Injection (`fixedDelayMilliseconds`) | `L1741` |
| **54** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1765) | Real-World Latency Simulation (`delayDistribution`) | `L1765` |
| **55** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1818) | Simulating Hard Network Failures & Socket Errors | `L1818` |
| **56** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1840) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) | `L1840` |
| **57** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1878) | State-Aware Request Evaluation & Transition Mechanics | `L1878` |
| **58** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1909) | OAuth Authorization Code & OTP Replay Attack Prevention | `L1909` |
| **59** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L1972) | Modeling Sequential Domain State Transitions | `L1972` |
| **60** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2018) | Testing Client Exponential Backoff & Circuit Breakers | `L2018` |
| **61** | [🔄 Stateful Pattern 3: Retry & Recovery Stubs](slides/slides.md#L2049) | WireMock Mapping Definitions for Flapping Failures & Self-Healing | `L2049` |
| **62** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2108) | At-Least-Once Delivery & Duplicate Message Detection | `L2108` |
| **63** | [🪝 WireMock — Asynchronous Webhooks & Callbacks](slides/slides.md#L2171) | Triggering Outbound HTTP Events with serveEventListeners | `L2171` |
| **64** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L2239) | Preventing State Bleed with the WireMock Admin API | `L2239` |
| **65** | [🛡️ Part 3](slides/slides.md#L2273) | — | `L2273` |
| **66** | [🛡️ Burp Suite — MITM Proxy Architecture](slides/slides.md#L2285) | Client, MITM Proxy Engine & Backend Microservices Interaction | `L2285` |
| **67** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2300) | Dual-Direction Traffic Control: Requests and Responses | `L2300` |
| **68** | [🔀 Proxy Intercept — Example](slides/slides.md#L2334) | Before & After Request Header Injection | `L2334` |
| **69** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2384) | Real-Time Traffic Auditing & Inspection | `L2384` |
| **70** | [🐳 Part 4](slides/slides.md#L2413) | — | `L2413` |
| **71** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L2426) | Programmable Docker Infrastructure Directly in Your Test Suite | `L2426` |
| **72** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L2455) | Docker Daemon Requirement & Supported Runtimes | `L2455` |
| **73** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2484) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure | `L2484` |
| **74** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2548) | Isolated, Disposable & Predictable Infrastructure On-Demand | `L2548` |
| **75** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2613) | Dynamic Ports & Code-Driven Orchestration | `L2613` |
| **76** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L2631) | Code-Driven Container Helper Architecture (`tests/specs/support/containers.ts`) | `L2631` |
| **77** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2660) | Complete Test Hook Pipeline (beforeAll Setup & afterAll Teardown) | `L2660` |
| **78** | [🎭 Part 5](slides/slides.md#L2705) | — | `L2705` |
| **79** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2718) | Modern Full-Stack Integration Testing Architecture | `L2718` |
| **80** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L2747) | Eliminating Flaky `sleep()` Calls with Actionability Checks | `L2747` |
| **81** | [🎭 Playwright — Network Route Interception](slides/slides.md#L2783) | Dynamic Mock Header Injection & Multi-Scenario Steering as Code | `L2783` |
| **82** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L2850) | Mocking Native Device APIs with `page.addInitScript()` | `L2850` |
| **83** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L2876) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) | `L2876` |
| **84** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L2907) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) | `L2907` |
| **85** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L2934) | Record Every Action, DOM Snapshot & Network Request for Post-Mortem Debugging | `L2934` |
| **86** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L2984) | Common Locators, Actions, Web-First Assertions & Network Steering | `L2984` |
| **87** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L3020) | Interactive UI, Debugging, Filtering & Code Generation | `L3020` |
| **88** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L3052) | Dynamic Stubs, State Resets & Verification Endpoints | `L3052` |
| **89** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L3084) | Everyday Monorepo, Build & Hermetic Test Commands | `L3084` |
| **90** | [Live Demo](slides/slides.md#L3117) | — | `L3117` |
| **91** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L3140) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing | `L3140` |
| **92** | [🎉 Thank You!](slides/slides.md#L3180) | — | `L3180` |
| **93** | [📚 Appendix](slides/slides.md#L3206) | — | `L3206` |
| **94** | [🗺️ Internal Tools — Trace Workspaces Catalog](slides/slides.md#L3217) | Multi-Repo Service Discovery, Workspaces & Ecosystem Scale | `L3217` |
| **95** | [🕸️ Internal Tools — Multi-Tier Dependency Graph](slides/slides.md#L3231) | Visualizing Microservice Call Chains, External Dependencies & Datastores | `L3231` |
| **96** | [⚡ k6 — Modern Load & Performance Testing](slides/slides.md#L3246) | Developer-Centric High-Concurrency Performance Testing & SLA Verification | `L3246` |
| **97** | [⚡ k6 Load Scripting — Microservices Example](slides/slides.md#L3275) | Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing | `L3275` |
| **98** | [⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet](slides/slides.md#L3325) | Everyday Execution Commands, Dynamic Overrides & Live Dashboards | `L3325` |
