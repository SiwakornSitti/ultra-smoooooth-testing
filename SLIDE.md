# 📑 Presentation Slides Index (SLIDE.md)

Quick navigation reference for all slides in [`slides/slides.md`](slides/slides.md).

| # | Slide Title | Subtitle / Topic | Line Anchor |
| :---: | :--- | :--- | :---: |
| **1** | [Ultra Smoooooth Testing](slides/slides.md#L22) | — | `L22` |
| **2** | [⚠️ The Integration Testing Crisis](slides/slides.md#L40) | Why Traditional Microservice Testing Fails in Practice | `L40` |
| **3** | [📋 Workshop Agenda](slides/slides.md#L104) | What We'll Cover Today | `L104` |
| **4** | [🎯 Testing Strategy & Core Pillars](slides/slides.md#L145) | Comprehensive Architectural Foundations for Integration Testing | `L145` |
| **5** | [🌐 Pillar 1: External API Virtualization (WireMock)](slides/slides.md#L191) | Eliminating External API Dependencies & Sandbox Flakiness | `L191` |
| **6** | [⚡ Pillar 2: In-Flight Traffic Interception (Burp Suite)](slides/slides.md#L244) | Live MITM Traffic Inspection, Fault Injection & Security Boundaries | `L244` |
| **7** | [🐳 Pillar 3: Hermetic Infrastructure (Testcontainers)](slides/slides.md#L292) | Isolated Ephemeral Containers, Dynamic Ports & Automatic Teardown | `L292` |
| **8** | [🎭 Pillar 4: Full-Stack E2E Automation (Playwright)](slides/slides.md#L339) | Unified Browser Automation, REST API Testing & Zero Flakiness | `L339` |
| **9** | [🏗️ Part 1](slides/slides.md#L388) | Ecosystem Architecture | `L388` |
| **10** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L398) | — | `L398` |
| **11** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L476) | Monorepo Workspaces, Modern Web & Relational Persistence | `L476` |
| **12** | [🧪 Technology Stack — Testing & Security Infrastructure](slides/slides.md#L509) | Mocking, MITM Proxy, Ephemeral Containers & E2E Engine | `L509` |
| **13** | [🪝 Part 2](slides/slides.md#L549) | WireMock — External API Virtualization | `L549` |
| **14** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L559) | Programmable HTTP Mock Server for External API Simulation | `L559` |
| **15** | [🎯 Why WireMock in Testing?](slides/slides.md#L584) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution | `L584` |
| **16** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L609) | Exact Path Routing, Regex Patterns & Query Strings | `L609` |
| **17** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L639) | Exact Matches, Substrings, Regex & Absence Checks | `L639` |
| **18** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L669) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction | `L669` |
| **19** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L698) | Regex Path Routing & Bearer JWT Validation | `L698` |
| **20** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L725) | Query Flag Filtering & Multi-Criteria Evaluation | `L725` |
| **21** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L752) | Resolution Hierarchy for Overlapping Stub Mappings | `L752` |
| **22** | [🥇 Priority Tier 1: Specific Error Overrides](slides/slides.md#L784) | Fault Injection & Error Contracts | `L784` |
| **23** | [🥈 Priority Tier 5–10: Default Happy Paths](slides/slides.md#L809) | Standard Business Logic & Route Matchers | `L809` |
| **24** | [🛡️ Priority Tier 100: Catch-All Proxy](slides/slides.md#L833) | Transparent Fallback to Real Downstream Endpoints | `L833` |
| **25** | [⚖️ Priority Precedence in Action](slides/slides.md#L855) | Comparing Matched Stubs: Scenario Override vs. Default Route | `L855` |
| **26** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L900) | Steer Multiple Downstream Services from a Single Test Request | `L900` |
| **27** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L937) | Data & Structural Meaning vs. Raw Character Matching | `L937` |
| **28** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L982) | Strict Matchers vs. Resilient Microservice Contracts | `L982` |
| **29** | [📦 Body Matching — Example](slides/slides.md#L1027) | Match Request Bodies with `equalToJson` | `L1027` |
| **30** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L1057) | Advanced Payload Filtering with Jayway JsonPath | `L1057` |
| **31** | [🔍 JSONPath Expression — High-Value Payment Example](slides/slides.md#L1120) | Value Threshold Filtering & Dynamic Approval Routing | `L1120` |
| **32** | [🎯 WireMock — Multi-Segment Path RegEx Matching](slides/slides.md#L1147) | Regular Expressions for Nested Sub-Resources & Dynamic Route Patterns | `L1147` |
| **33** | [🎯 WireMock RegEx — Nested Resource Path Example](slides/slides.md#L1177) | Multi-Segment Nested Sub-Resource Routing in API Stubs | `L1177` |
| **34** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L1204) | Bearer Tokens & Scenario Enums | `L1204` |
| **35** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L1232) | Strict Token & Scenario Routing | `L1232` |
| **36** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L1259) | Raw Text Matching vs. Semantic JSON Evaluation | `L1259` |
| **37** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1298) | 13-Digit National ID & Query Version Validation | `L1298` |
| **38** | [🎯 WireMock RegEx — JSONPath Phone Validation](slides/slides.md#L1325) | Thai Mobile Number Pattern Matching in Payload | `L1325` |
| **39** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1353) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` | `L1353` |
| **40** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1392) | Handlebars Response Templating (`response-template`) | `L1392` |
| **41** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1421) | Reading Path, Query, Header & Body Values into Responses | `L1421` |
| **42** | [🪄 Dynamic Response Headers & Timezones](slides/slides.md#L1482) | Injecting In-Flight Tracking IDs, Cookies & Location Headers | `L1482` |
| **43** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1521) | Request Model Extraction & Data Encoders | `L1521` |
| **44** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1539) | Timestamps, Random IDs & Token Generation | `L1539` |
| **45** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1556) | Conditionals, Dynamic Math & Response Configuration | `L1556` |
| **46** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1582) | String Manipulation & Substring Extractors | `L1582` |
| **47** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1600) | Array Looping, Sizing & Variable Lookups | `L1600` |
| **48** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1618) | Generating Dynamic Arrays with `{{#each}}` and Indexing | `L1618` |
| **49** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1647) | Deep Object Traversal & Array Indexing | `L1647` |
| **50** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1671) | Graceful Fallbacks & Array Counting | `L1671` |
| **51** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1695) | Echoing Nested Request Payloads & Handling Missing Fields | `L1695` |
| **52** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1719) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs | `L1719` |
| **53** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1766) | Deterministic Delay Injection (`fixedDelayMilliseconds`) | `L1766` |
| **54** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1790) | Real-World Latency Simulation (`delayDistribution`) | `L1790` |
| **55** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1843) | Simulating Hard Network Failures & Socket Errors | `L1843` |
| **56** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1865) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) | `L1865` |
| **57** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1903) | State-Aware Request Evaluation & Transition Mechanics | `L1903` |
| **58** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1935) | OAuth Authorization Code & OTP Replay Attack Prevention | `L1935` |
| **59** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L1992) | Modeling Sequential Domain State Transitions | `L1992` |
| **60** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2028) | Testing Client Exponential Backoff & Circuit Breakers | `L2028` |
| **61** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2081) | At-Least-Once Delivery & Duplicate Message Detection | `L2081` |
| **62** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L2138) | Preventing State Bleed with the WireMock Admin API | `L2138` |
| **63** | [🛡️ Part 3](slides/slides.md#L2175) | Burp Suite — MITM Traffic Control & Interception | `L2175` |
| **64** | [🔀 Burp Suite — Request & Response Intercept](slides/slides.md#L2187) | Bi-Directional In-Flight Traffic Interception & Tampering | `L2187` |
| **65** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2199) | Dual-Direction Traffic Control: Requests and Responses | `L2199` |
| **66** | [🔀 Proxy Intercept — Example](slides/slides.md#L2233) | Before & After Request Header Injection | `L2233` |
| **67** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2283) | Real-Time Traffic Auditing & Inspection | `L2283` |
| **68** | [🐳 Part 4](slides/slides.md#L2315) | Testcontainers — Hermetic Infrastructure | `L2315` |
| **69** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L2325) | Programmable Docker Infrastructure Directly in Your Test Suite | `L2325` |
| **70** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L2354) | Docker Daemon Requirement & Supported Runtimes | `L2354` |
| **71** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2386) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure | `L2386` |
| **72** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2450) | Isolated, Disposable & Predictable Infrastructure On-Demand | `L2450` |
| **73** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2512) | Dynamic Ports & Code-Driven Orchestration | `L2512` |
| **74** | [🧪 Testcontainers — Network Isolation & Dynamic Ports](slides/slides.md#L2530) | Code-Driven Container Helper Architecture (`tests/specs/support/containers.ts`) | `L2530` |
| **75** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2560) | Complete Test Hook Pipeline (`beforeAll` Setup & `afterAll` Teardown) | `L2560` |
| **76** | [🎭 Part 5](slides/slides.md#L2602) | Playwright — Full-Stack E2E Automation | `L2602` |
| **77** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2612) | Modern Full-Stack Integration Testing Architecture | `L2612` |
| **78** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L2641) | Eliminating Flaky `sleep()` Calls with Actionability Checks | `L2641` |
| **79** | [🎭 Playwright — Network Route Interception](slides/slides.md#L2678) | Dynamic Mock Header Injection with `page.route()` | `L2678` |
| **80** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L2709) | Mocking Native Device APIs with `page.addInitScript()` | `L2709` |
| **81** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L2735) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) | `L2735` |
| **82** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L2766) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) | `L2766` |
| **83** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L2793) | Record Every Action, DOM Snapshot & Network Request for Post-Mortem Debugging | `L2793` |
| **84** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L2843) | Common Locators, Actions, Web-First Assertions & Network Steering | `L2843` |
| **85** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L2879) | Interactive UI, Debugging, Filtering & Code Generation | `L2879` |
| **86** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L2911) | Dynamic Stubs, State Resets & Verification Endpoints | `L2911` |
| **87** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L2943) | Everyday Monorepo, Build & Hermetic Test Commands | `L2943` |
| **88** | [Live Demo](slides/slides.md#L2984) | — | `L2984` |
| **89** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L2999) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing | `L2999` |
| **90** | [🎉 Thank You!](slides/slides.md#L3045) | — | `L3045` |
