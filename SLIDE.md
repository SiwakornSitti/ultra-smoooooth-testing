# 📑 Presentation Slides Index (SLIDE.md)

Quick navigation reference for all slides in [`slides/slides.md`](slides/slides.md).

| # | Slide Title | Subtitle / Topic | Line Anchor |
| :---: | :--- | :--- | :---: |
| **1** | [Ultra Smoooooth Testing](slides/slides.md#L15) | — | `L15` |
| **2** | [📋 Workshop Agenda](slides/slides.md#L39) | What We'll Cover Today | `L39` |
| **3** | [🎯 Testing Strategy & Core Pillars](slides/slides.md#L80) | Comprehensive Architectural Foundations for Integration Testing | `L80` |
| **4** | [🌐 Pillar 1: External API Virtualization (WireMock)](slides/slides.md#L126) | Eliminating External API Dependencies & Sandbox Flakiness | `L126` |
| **5** | [⚡ Pillar 2: In-Flight Traffic Interception (Burp Suite)](slides/slides.md#L179) | Live MITM Traffic Inspection, Fault Injection & Security Boundaries | `L179` |
| **6** | [🐳 Pillar 3: Hermetic Infrastructure (Testcontainers)](slides/slides.md#L227) | Isolated Ephemeral Containers, Dynamic Ports & Automatic Teardown | `L227` |
| **7** | [🎭 Pillar 4: Full-Stack E2E Automation (Playwright)](slides/slides.md#L274) | Unified Browser Automation, REST API Testing & Zero Flakiness | `L274` |
| **8** | [🏗️ Part 1](slides/slides.md#L323) | Ecosystem Architecture | `L323` |
| **9** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L328) | — | `L328` |
| **10** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L406) | Monorepo Workspaces, Modern Web & Relational Persistence | `L406` |
| **11** | [🧪 Technology Stack — Testing & Security Infrastructure](slides/slides.md#L439) | Mocking, MITM Proxy, Ephemeral Containers & E2E Engine | `L439` |
| **12** | [🪝 Part 2](slides/slides.md#L479) | WireMock — External API Virtualization | `L479` |
| **13** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L484) | Programmable HTTP Mock Server for External API Simulation | `L484` |
| **14** | [🎯 Why WireMock in Testing?](slides/slides.md#L509) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution | `L509` |
| **15** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L534) | Exact Path Routing, Regex Patterns & Query Strings | `L534` |
| **16** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L564) | Exact Matches, Substrings, Regex & Absence Checks | `L564` |
| **17** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L594) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction | `L594` |
| **18** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L623) | Regex Path Routing & Bearer JWT Validation | `L623` |
| **19** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L650) | Query Flag Filtering & Multi-Criteria Evaluation | `L650` |
| **20** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L677) | Resolution Hierarchy for Overlapping Stub Mappings | `L677` |
| **21** | [🥇 Priority Tier 1: Specific Error Overrides](slides/slides.md#L709) | Fault Injection & Error Contracts | `L709` |
| **22** | [🥈 Priority Tier 5–10: Default Happy Paths](slides/slides.md#L734) | Standard Business Logic & Route Matchers | `L734` |
| **23** | [🛡️ Priority Tier 100: Catch-All Proxy](slides/slides.md#L758) | Transparent Fallback to Real Downstream Endpoints | `L758` |
| **24** | [⚖️ Priority & Precedence — Example](slides/slides.md#L780) | Error Scenario Override vs Default Happy Path | `L780` |
| **25** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L802) | Steer Multiple Downstream Services from a Single Test Request | `L802` |
| **26** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L839) | Data & Structural Meaning vs. Raw Character Matching | `L839` |
| **27** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L884) | Strict Matchers vs. Resilient Microservice Contracts | `L884` |
| **28** | [📦 Body Matching — Example](slides/slides.md#L929) | Match Request Bodies with `equalToJson` | `L929` |
| **29** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L959) | Advanced Payload Filtering with Jayway JsonPath | `L959` |
| **30** | [🔍 JSONPath Expression — High-Value Payment Example](slides/slides.md#L1022) | Value Threshold Filtering & Dynamic Approval Routing | `L1022` |
| **31** | [🎯 WireMock — URL & Path RegEx Matching](slides/slides.md#L1049) | Regular Expressions for Dynamic Resource Identifiers | `L1049` |
| **32** | [🎯 WireMock RegEx — Dynamic UUID Path Example](slides/slides.md#L1077) | Matching UUID Paths in API Stubs | `L1077` |
| **33** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L1100) | Bearer Tokens & Scenario Enums | `L1100` |
| **34** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L1128) | Strict Token & Scenario Routing | `L1128` |
| **35** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L1155) | Raw Text Matching vs. Semantic JSON Evaluation | `L1155` |
| **36** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1194) | 13-Digit National ID & Query Version Validation | `L1194` |
| **37** | [🎯 WireMock RegEx — JSONPath Phone Validation](slides/slides.md#L1221) | Thai Mobile Number Pattern Matching in Payload | `L1221` |
| **38** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1249) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` | `L1249` |
| **39** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1288) | Handlebars Response Templating (`response-template`) | `L1288` |
| **40** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1317) | Reading Path, Query, Header & Body Values into Responses | `L1317` |
| **41** | [🪄 Dynamic Response Headers & Timezones](slides/slides.md#L1378) | Injecting In-Flight Tracking IDs, Cookies & Location Headers | `L1378` |
| **42** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1417) | Request Model Extraction & Data Encoders | `L1417` |
| **43** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1435) | Timestamps, Random IDs & Token Generation | `L1435` |
| **44** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1452) | Conditionals, Dynamic Math & Response Configuration | `L1452` |
| **45** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1478) | String Manipulation & Substring Extractors | `L1478` |
| **46** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1496) | Array Looping, Sizing & Variable Lookups | `L1496` |
| **47** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1514) | Generating Dynamic Arrays with `{{#each}}` and Indexing | `L1514` |
| **48** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1543) | Deep Object Traversal & Array Indexing | `L1543` |
| **49** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1567) | Graceful Fallbacks & Array Counting | `L1567` |
| **50** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1591) | Echoing Nested Request Payloads & Handling Missing Fields | `L1591` |
| **51** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1615) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs | `L1615` |
| **52** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1662) | Deterministic Delay Injection (`fixedDelayMilliseconds`) | `L1662` |
| **53** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1686) | Real-World Latency Simulation (`delayDistribution`) | `L1686` |
| **54** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1739) | Simulating Hard Network Failures & Socket Errors | `L1739` |
| **55** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1761) | Transforming Stateless HTTP Mocks into Finite State Machines | `L1761` |
| **56** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1799) | State-Aware Request Evaluation & Transition Mechanics | `L1799` |
| **57** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1831) | OAuth Authorization Code & OTP Replay Attack Prevention | `L1831` |
| **58** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L1888) | Modeling Sequential Domain State Transitions | `L1888` |
| **59** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L1924) | Testing Client Exponential Backoff & Circuit Breakers | `L1924` |
| **60** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L1977) | At-Least-Once Delivery & Duplicate Message Detection | `L1977` |
| **61** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L2034) | Preventing State Bleed with the WireMock Admin API | `L2034` |
| **62** | [🛡️ Part 3](slides/slides.md#L2072) | Burp Suite — MITM Traffic Control & Interception | `L2072` |
| **63** | [🔀 Burp Suite — Request & Response Intercept](slides/slides.md#L2079) | Bi-Directional In-Flight Traffic Interception & Tampering | `L2079` |
| **64** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2091) | Dual-Direction Traffic Control: Requests and Responses | `L2091` |
| **65** | [🔀 Proxy Intercept — Example](slides/slides.md#L2125) | Before & After Request Header Injection | `L2125` |
| **66** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2175) | Real-Time Traffic Auditing & Inspection | `L2175` |
| **67** | [🐳 Part 4](slides/slides.md#L2207) | Testcontainers — Hermetic Infrastructure | `L2207` |
| **68** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L2212) | Programmable Docker Infrastructure Directly in Your Test Suite | `L2212` |
| **69** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L2241) | Docker Daemon Requirement & Supported Runtimes | `L2241` |
| **70** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2271) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure | `L2271` |
| **71** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2333) | Isolated, Disposable & Predictable Infrastructure On-Demand | `L2333` |
| **72** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2395) | Dynamic Ports & Code-Driven Orchestration | `L2395` |
| **73** | [🧪 Testcontainers — Ephemeral Suite Bootstrapping](slides/slides.md#L2413) | Code-Driven Container Lifecycle (`tests/specs/support/containers.ts`) | `L2413` |
| **74** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2439) | Best Practice Test Suite Initialization in `beforeAll()` Hook | `L2439` |
| **75** | [🎭 Part 5](slides/slides.md#L2483) | Playwright — Full-Stack E2E Automation | `L2483` |
| **76** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2488) | Modern Full-Stack Integration Testing Architecture | `L2488` |
| **77** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L2517) | Eliminating Flaky `sleep()` Calls with Actionability Checks | `L2517` |
| **78** | [🎭 Playwright — Network Route Interception](slides/slides.md#L2554) | Dynamic Mock Header Injection with `page.route()` | `L2554` |
| **79** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L2585) | Mocking Native Device APIs with `page.addInitScript()` | `L2585` |
| **80** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L2611) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) | `L2611` |
| **81** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L2642) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) | `L2642` |
| **82** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L2669) | Record Every Action, DOM Snapshot & Network Request for Post-Mortem Debugging | `L2669` |
| **83** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L2720) | Common Locators, Actions, Web-First Assertions & Network Steering | `L2720` |
| **84** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L2756) | Interactive UI, Debugging, Filtering & Code Generation | `L2756` |
| **85** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L2788) | Dynamic Stubs, State Resets & Verification Endpoints | `L2788` |
| **86** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L2820) | Everyday Monorepo, Build & Hermetic Test Commands | `L2820` |
| **87** | [🎉 Thank You!](slides/slides.md#L2857) | — | `L2857` |
