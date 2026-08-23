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
| **25** | [🎯 WireMock — URL & Path RegEx Matching](slides/slides.md#L802) | Regular Expressions for Dynamic Resource Identifiers | `L802` |
| **26** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L830) | Bearer Tokens & Scenario Enums | `L830` |
| **27** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L858) | Raw Text Matching vs. Semantic JSON Evaluation | `L858` |
| **28** | [🎯 WireMock RegEx — Dynamic UUID Path Example](slides/slides.md#L896) | Matching UUID Paths in API Stubs | `L896` |
| **29** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L919) | Strict Token & Scenario Routing | `L919` |
| **30** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L946) | 13-Digit National ID & Query Version Validation | `L946` |
| **31** | [🎯 WireMock RegEx — JSONPath Phone Validation](slides/slides.md#L973) | Thai Mobile Number Pattern Matching in Payload | `L973` |
| **32** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1001) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` | `L1001` |
| **33** | [📦 WireMock — Semantic JSON Matching](slides/slides.md#L1040) | Robust Structural JSON Equivalence | `L1040` |
| **34** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L1070) | Matching Operators & Lenient Contract Flags | `L1070` |
| **35** | [📦 Body Matching — Example](slides/slides.md#L1098) | Match Request Bodies with `equalToJson` | `L1098` |
| **36** | [🔍 WireMock — JSONPath Expression Matching](slides/slides.md#L1128) | Filter & Assert Payloads with `matchesJsonPath` | `L1128` |
| **37** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1155) | Handlebars Response Templating (`response-template`) | `L1155` |
| **38** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1184) | Request Model Extraction & Data Encoders | `L1184` |
| **39** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1202) | Timestamps, Random IDs & Token Generation | `L1202` |
| **40** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1219) | Conditionals, Dynamic Math & Response Configuration | `L1219` |
| **41** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1245) | String Manipulation & Substring Extractors | `L1245` |
| **42** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1263) | Array Looping, Sizing & Variable Lookups | `L1263` |
| **43** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1281) | Generating Dynamic Arrays with `{{#each}}` and Indexing | `L1281` |
| **44** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1310) | Deep Object Traversal & Array Indexing | `L1310` |
| **45** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1334) | Graceful Fallbacks & Array Counting | `L1334` |
| **46** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1358) | Echoing Nested Request Payloads & Handling Missing Fields | `L1358` |
| **47** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1382) | Deterministic Delay Injection (`fixedDelayMilliseconds`) | `L1382` |
| **48** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1406) | Real-World Latency Simulation (`delayDistribution`) | `L1406` |
| **49** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1459) | Simulating Hard Network Failures & Socket Errors | `L1459` |
| **50** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1481) | Transforming Stateless HTTP Mocks into Finite State Machines | `L1481` |
| **51** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1519) | State-Aware Request Evaluation & Transition Mechanics | `L1519` |
| **52** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1551) | OAuth Authorization Code & OTP Replay Attack Prevention | `L1551` |
| **53** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L1608) | Modeling Sequential Domain State Transitions | `L1608` |
| **54** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L1644) | Testing Client Exponential Backoff & Circuit Breakers | `L1644` |
| **55** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L1697) | At-Least-Once Delivery & Duplicate Message Detection | `L1697` |
| **56** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L1754) | Preventing State Bleed with the WireMock Admin API | `L1754` |
| **57** | [🛡️ Part 3](slides/slides.md#L1792) | Burp Suite — MITM Traffic Control & Interception | `L1792` |
| **58** | [🔀 Burp Suite — Request & Response Intercept](slides/slides.md#L1799) | Bi-Directional In-Flight Traffic Interception & Tampering | `L1799` |
| **59** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L1811) | Dual-Direction Traffic Control: Requests and Responses | `L1811` |
| **60** | [🔀 Proxy Intercept — Example](slides/slides.md#L1845) | Before & After Request Header Injection | `L1845` |
| **61** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L1867) | Real-Time Traffic Auditing & Inspection | `L1867` |
| **62** | [🐳 Part 4](slides/slides.md#L1899) | Testcontainers — Hermetic Infrastructure | `L1899` |
| **63** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L1904) | Programmable Docker Infrastructure Directly in Your Test Suite | `L1904` |
| **64** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L1933) | Docker Daemon Requirement & Supported Runtimes | `L1933` |
| **65** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L1963) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure | `L1963` |
| **66** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2025) | Isolated, Disposable & Predictable Infrastructure On-Demand | `L2025` |
| **67** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2087) | Dynamic Ports & Code-Driven Orchestration | `L2087` |
| **68** | [🧪 Testcontainers — Ephemeral Suite Bootstrapping](slides/slides.md#L2105) | Code-Driven Container Lifecycle (`tests/specs/support/containers.ts`) | `L2105` |
| **69** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2131) | Best Practice Test Suite Initialization in `beforeAll()` Hook | `L2131` |
| **70** | [🎭 Part 5](slides/slides.md#L2175) | Playwright — Full-Stack E2E Automation | `L2175` |
| **71** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2180) | Modern Full-Stack Integration Testing Architecture | `L2180` |
| **72** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L2209) | Eliminating Flaky `sleep()` Calls with Actionability Checks | `L2209` |
| **73** | [🎭 Playwright — Network Route Interception](slides/slides.md#L2246) | Dynamic Mock Header Injection with `page.route()` | `L2246` |
| **74** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L2277) | Mocking Native Device APIs with `page.addInitScript()` | `L2277` |
| **75** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L2303) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) | `L2303` |
| **76** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L2334) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) | `L2334` |
| **77** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L2361) | Record Every Action, DOM Snapshot & Network Request for Post-Mortem Debugging | `L2361` |
| **78** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L2412) | Common Locators, Actions, Web-First Assertions & Network Steering | `L2412` |
| **79** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L2448) | Interactive UI, Debugging, Filtering & Code Generation | `L2448` |
| **80** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L2480) | Dynamic Stubs, State Resets & Verification Endpoints | `L2480` |
| **81** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L2512) | Everyday Monorepo, Build & Hermetic Test Commands | `L2512` |
| **82** | [🎉 Thank You!](slides/slides.md#L2549) | — | `L2549` |
