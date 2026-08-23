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
| **25** | [📦 WireMock — Semantic JSON Matching](slides/slides.md#L802) | Robust Structural JSON Equivalence | `L802` |
| **26** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L832) | Strict Matchers vs. Resilient Microservice Contracts | `L832` |
| **27** | [📦 Body Matching — Example](slides/slides.md#L877) | Match Request Bodies with `equalToJson` | `L877` |
| **28** | [🔍 WireMock — JSONPath Expression Matching](slides/slides.md#L907) | Filter & Assert Payloads with `matchesJsonPath` | `L907` |
| **29** | [🎯 WireMock — URL & Path RegEx Matching](slides/slides.md#L934) | Regular Expressions for Dynamic Resource Identifiers | `L934` |
| **30** | [🎯 WireMock RegEx — Dynamic UUID Path Example](slides/slides.md#L962) | Matching UUID Paths in API Stubs | `L962` |
| **31** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L985) | Bearer Tokens & Scenario Enums | `L985` |
| **32** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L1013) | Strict Token & Scenario Routing | `L1013` |
| **33** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L1040) | Raw Text Matching vs. Semantic JSON Evaluation | `L1040` |
| **34** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1079) | 13-Digit National ID & Query Version Validation | `L1079` |
| **35** | [🎯 WireMock RegEx — JSONPath Phone Validation](slides/slides.md#L1106) | Thai Mobile Number Pattern Matching in Payload | `L1106` |
| **36** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1134) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` | `L1134` |
| **37** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1173) | Handlebars Response Templating (`response-template`) | `L1173` |
| **38** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1202) | Request Model Extraction & Data Encoders | `L1202` |
| **39** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1220) | Reading Path, Query, Header & Body Values into Responses | `L1220` |
| **40** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1257) | Timestamps, Random IDs & Token Generation | `L1257` |
| **41** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1274) | Conditionals, Dynamic Math & Response Configuration | `L1274` |
| **42** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1300) | String Manipulation & Substring Extractors | `L1300` |
| **43** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1318) | Array Looping, Sizing & Variable Lookups | `L1318` |
| **44** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1336) | Generating Dynamic Arrays with `{{#each}}` and Indexing | `L1336` |
| **45** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1365) | Deep Object Traversal & Array Indexing | `L1365` |
| **46** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1389) | Graceful Fallbacks & Array Counting | `L1389` |
| **47** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1413) | Echoing Nested Request Payloads & Handling Missing Fields | `L1413` |
| **48** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1437) | Deterministic Delay Injection (`fixedDelayMilliseconds`) | `L1437` |
| **49** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1461) | Real-World Latency Simulation (`delayDistribution`) | `L1461` |
| **50** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1514) | Simulating Hard Network Failures & Socket Errors | `L1514` |
| **51** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1536) | Transforming Stateless HTTP Mocks into Finite State Machines | `L1536` |
| **52** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1574) | State-Aware Request Evaluation & Transition Mechanics | `L1574` |
| **53** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1606) | OAuth Authorization Code & OTP Replay Attack Prevention | `L1606` |
| **54** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L1663) | Modeling Sequential Domain State Transitions | `L1663` |
| **55** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L1699) | Testing Client Exponential Backoff & Circuit Breakers | `L1699` |
| **56** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L1752) | At-Least-Once Delivery & Duplicate Message Detection | `L1752` |
| **57** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L1809) | Preventing State Bleed with the WireMock Admin API | `L1809` |
| **58** | [🛡️ Part 3](slides/slides.md#L1847) | Burp Suite — MITM Traffic Control & Interception | `L1847` |
| **59** | [🔀 Burp Suite — Request & Response Intercept](slides/slides.md#L1854) | Bi-Directional In-Flight Traffic Interception & Tampering | `L1854` |
| **60** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L1866) | Dual-Direction Traffic Control: Requests and Responses | `L1866` |
| **61** | [🔀 Proxy Intercept — Example](slides/slides.md#L1900) | Before & After Request Header Injection | `L1900` |
| **62** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L1922) | Real-Time Traffic Auditing & Inspection | `L1922` |
| **63** | [🐳 Part 4](slides/slides.md#L1954) | Testcontainers — Hermetic Infrastructure | `L1954` |
| **64** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L1959) | Programmable Docker Infrastructure Directly in Your Test Suite | `L1959` |
| **65** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L1988) | Docker Daemon Requirement & Supported Runtimes | `L1988` |
| **66** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2018) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure | `L2018` |
| **67** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2080) | Isolated, Disposable & Predictable Infrastructure On-Demand | `L2080` |
| **68** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2142) | Dynamic Ports & Code-Driven Orchestration | `L2142` |
| **69** | [🧪 Testcontainers — Ephemeral Suite Bootstrapping](slides/slides.md#L2160) | Code-Driven Container Lifecycle (`tests/specs/support/containers.ts`) | `L2160` |
| **70** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2186) | Best Practice Test Suite Initialization in `beforeAll()` Hook | `L2186` |
| **71** | [🎭 Part 5](slides/slides.md#L2230) | Playwright — Full-Stack E2E Automation | `L2230` |
| **72** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2235) | Modern Full-Stack Integration Testing Architecture | `L2235` |
| **73** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L2264) | Eliminating Flaky `sleep()` Calls with Actionability Checks | `L2264` |
| **74** | [🎭 Playwright — Network Route Interception](slides/slides.md#L2301) | Dynamic Mock Header Injection with `page.route()` | `L2301` |
| **75** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L2332) | Mocking Native Device APIs with `page.addInitScript()` | `L2332` |
| **76** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L2358) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) | `L2358` |
| **77** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L2389) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) | `L2389` |
| **78** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L2416) | Record Every Action, DOM Snapshot & Network Request for Post-Mortem Debugging | `L2416` |
| **79** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L2467) | Common Locators, Actions, Web-First Assertions & Network Steering | `L2467` |
| **80** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L2503) | Interactive UI, Debugging, Filtering & Code Generation | `L2503` |
| **81** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L2535) | Dynamic Stubs, State Resets & Verification Endpoints | `L2535` |
| **82** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L2567) | Everyday Monorepo, Build & Hermetic Test Commands | `L2567` |
| **83** | [🎉 Thank You!](slides/slides.md#L2604) | — | `L2604` |
