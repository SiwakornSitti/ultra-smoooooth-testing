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
| **25** | [📦 WireMock — Semantic JSON Matching (`equalToJson`)](slides/slides.md#L802) | Data & Structural Meaning vs. Raw Character Matching | `L802` |
| **26** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L847) | Strict Matchers vs. Resilient Microservice Contracts | `L847` |
| **27** | [📦 Body Matching — Example](slides/slides.md#L892) | Match Request Bodies with `equalToJson` | `L892` |
| **28** | [🔍 WireMock — JSONPath Expression Capabilities](slides/slides.md#L922) | Comparisons, Logical Filters, Membership & Deep Traversal | `L922` |
| **29** | [🔍 JSONPath Expression — High-Value Payment Example](slides/slides.md#L963) | Value Threshold Filtering & Dynamic Approval Routing | `L963` |
| **30** | [🎯 WireMock — URL & Path RegEx Matching](slides/slides.md#L990) | Regular Expressions for Dynamic Resource Identifiers | `L990` |
| **31** | [🎯 WireMock RegEx — Dynamic UUID Path Example](slides/slides.md#L1018) | Matching UUID Paths in API Stubs | `L1018` |
| **32** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L1041) | Bearer Tokens & Scenario Enums | `L1041` |
| **33** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L1069) | Strict Token & Scenario Routing | `L1069` |
| **34** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L1096) | Raw Text Matching vs. Semantic JSON Evaluation | `L1096` |
| **35** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1135) | 13-Digit National ID & Query Version Validation | `L1135` |
| **36** | [🎯 WireMock RegEx — JSONPath Phone Validation](slides/slides.md#L1162) | Thai Mobile Number Pattern Matching in Payload | `L1162` |
| **37** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1190) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` | `L1190` |
| **38** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1229) | Handlebars Response Templating (`response-template`) | `L1229` |
| **39** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1258) | Request Model Extraction & Data Encoders | `L1258` |
| **40** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1276) | Reading Path, Query, Header & Body Values into Responses | `L1276` |
| **41** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1313) | Timestamps, Random IDs & Token Generation | `L1313` |
| **42** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1330) | Conditionals, Dynamic Math & Response Configuration | `L1330` |
| **43** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1356) | String Manipulation & Substring Extractors | `L1356` |
| **44** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1374) | Array Looping, Sizing & Variable Lookups | `L1374` |
| **45** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1392) | Generating Dynamic Arrays with `{{#each}}` and Indexing | `L1392` |
| **46** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1421) | Deep Object Traversal & Array Indexing | `L1421` |
| **47** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1445) | Graceful Fallbacks & Array Counting | `L1445` |
| **48** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1469) | Echoing Nested Request Payloads & Handling Missing Fields | `L1469` |
| **49** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1493) | Deterministic Delay Injection (`fixedDelayMilliseconds`) | `L1493` |
| **50** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1517) | Real-World Latency Simulation (`delayDistribution`) | `L1517` |
| **51** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1570) | Simulating Hard Network Failures & Socket Errors | `L1570` |
| **52** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1592) | Transforming Stateless HTTP Mocks into Finite State Machines | `L1592` |
| **53** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1630) | State-Aware Request Evaluation & Transition Mechanics | `L1630` |
| **54** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1662) | OAuth Authorization Code & OTP Replay Attack Prevention | `L1662` |
| **55** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L1719) | Modeling Sequential Domain State Transitions | `L1719` |
| **56** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L1755) | Testing Client Exponential Backoff & Circuit Breakers | `L1755` |
| **57** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L1808) | At-Least-Once Delivery & Duplicate Message Detection | `L1808` |
| **58** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L1865) | Preventing State Bleed with the WireMock Admin API | `L1865` |
| **59** | [🛡️ Part 3](slides/slides.md#L1903) | Burp Suite — MITM Traffic Control & Interception | `L1903` |
| **60** | [🔀 Burp Suite — Request & Response Intercept](slides/slides.md#L1910) | Bi-Directional In-Flight Traffic Interception & Tampering | `L1910` |
| **61** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L1922) | Dual-Direction Traffic Control: Requests and Responses | `L1922` |
| **62** | [🔀 Proxy Intercept — Example](slides/slides.md#L1956) | Before & After Request Header Injection | `L1956` |
| **63** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L1978) | Real-Time Traffic Auditing & Inspection | `L1978` |
| **64** | [🐳 Part 4](slides/slides.md#L2010) | Testcontainers — Hermetic Infrastructure | `L2010` |
| **65** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L2015) | Programmable Docker Infrastructure Directly in Your Test Suite | `L2015` |
| **66** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L2044) | Docker Daemon Requirement & Supported Runtimes | `L2044` |
| **67** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2074) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure | `L2074` |
| **68** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2136) | Isolated, Disposable & Predictable Infrastructure On-Demand | `L2136` |
| **69** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2198) | Dynamic Ports & Code-Driven Orchestration | `L2198` |
| **70** | [🧪 Testcontainers — Ephemeral Suite Bootstrapping](slides/slides.md#L2216) | Code-Driven Container Lifecycle (`tests/specs/support/containers.ts`) | `L2216` |
| **71** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2242) | Best Practice Test Suite Initialization in `beforeAll()` Hook | `L2242` |
| **72** | [🎭 Part 5](slides/slides.md#L2286) | Playwright — Full-Stack E2E Automation | `L2286` |
| **73** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2291) | Modern Full-Stack Integration Testing Architecture | `L2291` |
| **74** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L2320) | Eliminating Flaky `sleep()` Calls with Actionability Checks | `L2320` |
| **75** | [🎭 Playwright — Network Route Interception](slides/slides.md#L2357) | Dynamic Mock Header Injection with `page.route()` | `L2357` |
| **76** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L2388) | Mocking Native Device APIs with `page.addInitScript()` | `L2388` |
| **77** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L2414) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) | `L2414` |
| **78** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L2445) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) | `L2445` |
| **79** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L2472) | Record Every Action, DOM Snapshot & Network Request for Post-Mortem Debugging | `L2472` |
| **80** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L2523) | Common Locators, Actions, Web-First Assertions & Network Steering | `L2523` |
| **81** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L2559) | Interactive UI, Debugging, Filtering & Code Generation | `L2559` |
| **82** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L2591) | Dynamic Stubs, State Resets & Verification Endpoints | `L2591` |
| **83** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L2623) | Everyday Monorepo, Build & Hermetic Test Commands | `L2623` |
| **84** | [🎉 Thank You!](slides/slides.md#L2660) | — | `L2660` |
