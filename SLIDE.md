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
| **13** | [💬 Part 1 Q&A — Ecosystem Architecture](slides/slides.md#L547) | Open Floor, Domain Boundaries & Monorepo Questions | `L547` |
| **14** | [🪝 Part 2](slides/slides.md#L592) | WireMock — External API Virtualization | `L592` |
| **15** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L602) | Programmable HTTP Mock Server for External API Simulation | `L602` |
| **16** | [🎯 Why WireMock in Testing?](slides/slides.md#L627) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution | `L627` |
| **17** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L652) | Exact Path Routing, Regex Patterns & Query Strings | `L652` |
| **18** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L682) | Exact Matches, Substrings, Regex & Absence Checks | `L682` |
| **19** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L712) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction | `L712` |
| **20** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L741) | Regex Path Routing & Bearer JWT Validation | `L741` |
| **21** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L768) | Query Flag Filtering & Multi-Criteria Evaluation | `L768` |
| **22** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L795) | Resolution Hierarchy for Overlapping Stub Mappings | `L795` |
| **23** | [🥇 Priority Tier 1: Specific Error Overrides](slides/slides.md#L827) | Fault Injection & Error Contracts | `L827` |
| **24** | [🥈 Priority Tier 5–10: Default Happy Paths](slides/slides.md#L852) | Standard Business Logic & Route Matchers | `L852` |
| **25** | [🛡️ Priority Tier 100: Catch-All Proxy](slides/slides.md#L876) | Transparent Fallback to Real Downstream Endpoints | `L876` |
| **26** | [⚖️ Priority & Precedence — Example](slides/slides.md#L898) | Error Scenario Override vs Default Happy Path | `L898` |
| **27** | [🔀 Multi-Scenario Steering — Comma-Separated Headers](slides/slides.md#L920) | Steer Multiple Downstream Services from a Single Test Request | `L920` |
| **28** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L957) | Data & Structural Meaning vs. Raw Character Matching | `L957` |
| **29** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L1002) | Strict Matchers vs. Resilient Microservice Contracts | `L1002` |
| **30** | [📦 Body Matching — Example](slides/slides.md#L1047) | Match Request Bodies with `equalToJson` | `L1047` |
| **31** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L1077) | Advanced Payload Filtering with Jayway JsonPath | `L1077` |
| **32** | [🔍 JSONPath Expression — High-Value Payment Example](slides/slides.md#L1140) | Value Threshold Filtering & Dynamic Approval Routing | `L1140` |
| **33** | [🎯 WireMock — URL & Path RegEx Matching](slides/slides.md#L1167) | Regular Expressions for Dynamic Resource Identifiers | `L1167` |
| **34** | [🎯 WireMock RegEx — Dynamic UUID Path Example](slides/slides.md#L1195) | Matching UUID Paths in API Stubs | `L1195` |
| **35** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L1218) | Bearer Tokens & Scenario Enums | `L1218` |
| **36** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L1246) | Strict Token & Scenario Routing | `L1246` |
| **37** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L1273) | Raw Text Matching vs. Semantic JSON Evaluation | `L1273` |
| **38** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1312) | 13-Digit National ID & Query Version Validation | `L1312` |
| **39** | [🎯 WireMock RegEx — JSONPath Phone Validation](slides/slides.md#L1339) | Thai Mobile Number Pattern Matching in Payload | `L1339` |
| **40** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1367) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` | `L1367` |
| **41** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1406) | Handlebars Response Templating (`response-template`) | `L1406` |
| **42** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1435) | Reading Path, Query, Header & Body Values into Responses | `L1435` |
| **43** | [🪄 Dynamic Response Headers & Timezones](slides/slides.md#L1496) | Injecting In-Flight Tracking IDs, Cookies & Location Headers | `L1496` |
| **44** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1535) | Request Model Extraction & Data Encoders | `L1535` |
| **45** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1553) | Timestamps, Random IDs & Token Generation | `L1553` |
| **46** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1570) | Conditionals, Dynamic Math & Response Configuration | `L1570` |
| **47** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1596) | String Manipulation & Substring Extractors | `L1596` |
| **48** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1614) | Array Looping, Sizing & Variable Lookups | `L1614` |
| **49** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1632) | Generating Dynamic Arrays with `{{#each}}` and Indexing | `L1632` |
| **50** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1661) | Deep Object Traversal & Array Indexing | `L1661` |
| **51** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1685) | Graceful Fallbacks & Array Counting | `L1685` |
| **52** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1709) | Echoing Nested Request Payloads & Handling Missing Fields | `L1709` |
| **53** | [📁 File-Based Response Templates (`bodyFileName`)](slides/slides.md#L1733) | Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs | `L1733` |
| **54** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1780) | Deterministic Delay Injection (`fixedDelayMilliseconds`) | `L1780` |
| **55** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1804) | Real-World Latency Simulation (`delayDistribution`) | `L1804` |
| **56** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1857) | Simulating Hard Network Failures & Socket Errors | `L1857` |
| **57** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1879) | Transforming Stateless HTTP Mocks into Finite State Machines (FSM) | `L1879` |
| **58** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1917) | State-Aware Request Evaluation & Transition Mechanics | `L1917` |
| **59** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1949) | OAuth Authorization Code & OTP Replay Attack Prevention | `L1949` |
| **60** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L2006) | Modeling Sequential Domain State Transitions | `L2006` |
| **61** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L2042) | Testing Client Exponential Backoff & Circuit Breakers | `L2042` |
| **62** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L2095) | At-Least-Once Delivery & Duplicate Message Detection | `L2095` |
| **63** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L2152) | Preventing State Bleed with the WireMock Admin API | `L2152` |
| **64** | [💬 Part 2 Q&A — WireMock & API Virtualization](slides/slides.md#L2187) | Open Floor, Dynamic Stubs & Stateful Scenarios | `L2187` |
| **65** | [🛡️ Part 3](slides/slides.md#L2232) | Burp Suite — MITM Traffic Control & Interception | `L2232` |
| **66** | [🔀 Burp Suite — Request & Response Intercept](slides/slides.md#L2244) | Bi-Directional In-Flight Traffic Interception & Tampering | `L2244` |
| **67** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L2256) | Dual-Direction Traffic Control: Requests and Responses | `L2256` |
| **68** | [🔀 Proxy Intercept — Example](slides/slides.md#L2290) | Before & After Request Header Injection | `L2290` |
| **69** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L2340) | Real-Time Traffic Auditing & Inspection | `L2340` |
| **70** | [💬 Part 3 Q&A — Traffic Interception & Security](slides/slides.md#L2370) | Open Floor, In-Flight Tampering & Fault Injection | `L2370` |
| **71** | [🐳 Part 4](slides/slides.md#L2415) | Testcontainers — Hermetic Infrastructure | `L2415` |
| **72** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L2425) | Programmable Docker Infrastructure Directly in Your Test Suite | `L2425` |
| **73** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L2454) | Docker Daemon Requirement & Supported Runtimes | `L2454` |
| **74** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2486) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure | `L2486` |
| **75** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2550) | Isolated, Disposable & Predictable Infrastructure On-Demand | `L2550` |
| **76** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2612) | Dynamic Ports & Code-Driven Orchestration | `L2612` |
| **77** | [🧪 Testcontainers — Ephemeral Suite Bootstrapping](slides/slides.md#L2630) | Code-Driven Container Lifecycle (`tests/specs/support/containers.ts`) | `L2630` |
| **78** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2656) | Best Practice Test Suite Initialization in `beforeAll()` Hook | `L2656` |
| **79** | [💬 Part 4 Q&A — Hermetic Testcontainers](slides/slides.md#L2698) | Open Floor, Ephemeral Lifecycles & Dynamic Ports | `L2698` |
| **80** | [🎭 Part 5](slides/slides.md#L2743) | Playwright — Full-Stack E2E Automation | `L2743` |
| **81** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2753) | Modern Full-Stack Integration Testing Architecture | `L2753` |
| **82** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L2782) | Eliminating Flaky `sleep()` Calls with Actionability Checks | `L2782` |
| **83** | [🎭 Playwright — Network Route Interception](slides/slides.md#L2819) | Dynamic Mock Header Injection with `page.route()` | `L2819` |
| **84** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L2850) | Mocking Native Device APIs with `page.addInitScript()` | `L2850` |
| **85** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L2876) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) | `L2876` |
| **86** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L2907) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) | `L2907` |
| **87** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L2934) | Record Every Action, DOM Snapshot & Network Request for Post-Mortem Debugging | `L2934` |
| **88** | [💬 Part 5 Q&A — Playwright & E2E Automation](slides/slides.md#L2984) | Open Floor, Locators, Network Steering & Diagnostics | `L2984` |
| **89** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L3027) | Common Locators, Actions, Web-First Assertions & Network Steering | `L3027` |
| **90** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L3063) | Interactive UI, Debugging, Filtering & Code Generation | `L3063` |
| **91** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L3095) | Dynamic Stubs, State Resets & Verification Endpoints | `L3095` |
| **92** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L3127) | Everyday Monorepo, Build & Hermetic Test Commands | `L3127` |
| **93** | [💬 Open Q&A & Key Takeaways](slides/slides.md#L3161) | Bringing All 4 Pillars Together for Ultra Smoooooth Testing | `L3161` |
| **94** | [🎉 Thank You!](slides/slides.md#L3207) | — | `L3207` |
