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
| **26** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L843) | Strict Matchers vs. Resilient Microservice Contracts | `L843` |
| **27** | [📦 Body Matching — Example](slides/slides.md#L888) | Match Request Bodies with `equalToJson` | `L888` |
| **28** | [🔍 WireMock — JSONPath Expression Matching](slides/slides.md#L918) | Filter & Assert Payloads with `matchesJsonPath` | `L918` |
| **29** | [🎯 WireMock — URL & Path RegEx Matching](slides/slides.md#L945) | Regular Expressions for Dynamic Resource Identifiers | `L945` |
| **30** | [🎯 WireMock RegEx — Dynamic UUID Path Example](slides/slides.md#L973) | Matching UUID Paths in API Stubs | `L973` |
| **31** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L996) | Bearer Tokens & Scenario Enums | `L996` |
| **32** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L1024) | Strict Token & Scenario Routing | `L1024` |
| **33** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L1051) | Raw Text Matching vs. Semantic JSON Evaluation | `L1051` |
| **34** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L1090) | 13-Digit National ID & Query Version Validation | `L1090` |
| **35** | [🎯 WireMock RegEx — JSONPath Phone Validation](slides/slides.md#L1117) | Thai Mobile Number Pattern Matching in Payload | `L1117` |
| **36** | [🔍 JSONPath RegEx Deep Dive — Expression Breakdown](slides/slides.md#L1145) | Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"` | `L1145` |
| **37** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L1184) | Handlebars Response Templating (`response-template`) | `L1184` |
| **38** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1213) | Request Model Extraction & Data Encoders | `L1213` |
| **39** | [📥 WireMock — Extracting Request Data & Echoing IDs](slides/slides.md#L1231) | Reading Path, Query, Header & Body Values into Responses | `L1231` |
| **40** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1268) | Timestamps, Random IDs & Token Generation | `L1268` |
| **41** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1285) | Conditionals, Dynamic Math & Response Configuration | `L1285` |
| **42** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1311) | String Manipulation & Substring Extractors | `L1311` |
| **43** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1329) | Array Looping, Sizing & Variable Lookups | `L1329` |
| **44** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1347) | Generating Dynamic Arrays with `{{#each}}` and Indexing | `L1347` |
| **45** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1376) | Deep Object Traversal & Array Indexing | `L1376` |
| **46** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1400) | Graceful Fallbacks & Array Counting | `L1400` |
| **47** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1424) | Echoing Nested Request Payloads & Handling Missing Fields | `L1424` |
| **48** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1448) | Deterministic Delay Injection (`fixedDelayMilliseconds`) | `L1448` |
| **49** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1472) | Real-World Latency Simulation (`delayDistribution`) | `L1472` |
| **50** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1525) | Simulating Hard Network Failures & Socket Errors | `L1525` |
| **51** | [🔄 WireMock — Stateful Scenario Primitives](slides/slides.md#L1547) | Transforming Stateless HTTP Mocks into Finite State Machines | `L1547` |
| **52** | [🔄 WireMock — Scenario Execution Flow](slides/slides.md#L1585) | State-Aware Request Evaluation & Transition Mechanics | `L1585` |
| **53** | [🔄 Stateful Pattern 1: Single-Use Tokens & Replays](slides/slides.md#L1617) | OAuth Authorization Code & OTP Replay Attack Prevention | `L1617` |
| **54** | [🔄 Stateful Pattern 2: Multi-Step Order Lifecycle](slides/slides.md#L1674) | Modeling Sequential Domain State Transitions | `L1674` |
| **55** | [🔄 Stateful Pattern 3: Transient Failure & Retries](slides/slides.md#L1710) | Testing Client Exponential Backoff & Circuit Breakers | `L1710` |
| **56** | [🔄 Stateful Pattern 4: Webhook Idempotency](slides/slides.md#L1763) | At-Least-Once Delivery & Duplicate Message Detection | `L1763` |
| **57** | [🧹 WireMock — State Management & Test Isolation](slides/slides.md#L1820) | Preventing State Bleed with the WireMock Admin API | `L1820` |
| **58** | [🛡️ Part 3](slides/slides.md#L1858) | Burp Suite — MITM Traffic Control & Interception | `L1858` |
| **59** | [🔀 Burp Suite — Request & Response Intercept](slides/slides.md#L1865) | Bi-Directional In-Flight Traffic Interception & Tampering | `L1865` |
| **60** | [🔀 Burp Suite — Proxy Intercept Capabilities](slides/slides.md#L1877) | Dual-Direction Traffic Control: Requests and Responses | `L1877` |
| **61** | [🔀 Proxy Intercept — Example](slides/slides.md#L1911) | Before & After Request Header Injection | `L1911` |
| **62** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L1933) | Real-Time Traffic Auditing & Inspection | `L1933` |
| **63** | [🐳 Part 4](slides/slides.md#L1965) | Testcontainers — Hermetic Infrastructure | `L1965` |
| **64** | [🐳 What is Testcontainers? — Core Concepts](slides/slides.md#L1970) | Programmable Docker Infrastructure Directly in Your Test Suite | `L1970` |
| **65** | [🐳 Do We Need Docker for Testcontainers?](slides/slides.md#L1999) | Docker Daemon Requirement & Supported Runtimes | `L1999` |
| **66** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L2029) | Flakiness, Collisions & State Bleed in Shared Test Infrastructure | `L2029` |
| **67** | [✅ The Hermetic Containerized Solution](slides/slides.md#L2091) | Isolated, Disposable & Predictable Infrastructure On-Demand | `L2091` |
| **68** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L2153) | Dynamic Ports & Code-Driven Orchestration | `L2153` |
| **69** | [🧪 Testcontainers — Ephemeral Suite Bootstrapping](slides/slides.md#L2171) | Code-Driven Container Lifecycle (`tests/specs/support/containers.ts`) | `L2171` |
| **70** | [🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle](slides/slides.md#L2197) | Best Practice Test Suite Initialization in `beforeAll()` Hook | `L2197` |
| **71** | [🎭 Part 5](slides/slides.md#L2241) | Playwright — Full-Stack E2E Automation | `L2241` |
| **72** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L2246) | Modern Full-Stack Integration Testing Architecture | `L2246` |
| **73** | [🎭 Playwright — Web-First Locators & Auto-Waiting](slides/slides.md#L2275) | Eliminating Flaky `sleep()` Calls with Actionability Checks | `L2275` |
| **74** | [🎭 Playwright — Network Route Interception](slides/slides.md#L2312) | Dynamic Mock Header Injection with `page.route()` | `L2312` |
| **75** | [🎭 Playwright — Hybrid Mobile WebView & JSBridge](slides/slides.md#L2343) | Mocking Native Device APIs with `page.addInitScript()` | `L2343` |
| **76** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L2369) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) | `L2369` |
| **77** | [🎭 Playwright — Direct API Integration Testing](slides/slides.md#L2400) | Headless REST Verification & Scenario Resets (`bff.spec.ts`) | `L2400` |
| **78** | [🎭 Playwright — Tracing & Diagnostics in CI](slides/slides.md#L2427) | Record Every Action, DOM Snapshot & Network Request for Post-Mortem Debugging | `L2427` |
| **79** | [🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet](slides/slides.md#L2478) | Common Locators, Actions, Web-First Assertions & Network Steering | `L2478` |
| **80** | [🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet](slides/slides.md#L2514) | Interactive UI, Debugging, Filtering & Code Generation | `L2514` |
| **81** | [🪝 WireMock — Admin API & Testing Cheat Sheet](slides/slides.md#L2546) | Dynamic Stubs, State Resets & Verification Endpoints | `L2546` |
| **82** | [🐳 Testcontainers & Local Dev — Command Cheat Sheet](slides/slides.md#L2578) | Everyday Monorepo, Build & Hermetic Test Commands | `L2578` |
| **83** | [🎉 Thank You!](slides/slides.md#L2615) | — | `L2615` |
