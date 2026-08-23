# 📑 Slide Deck Index & Reference Guide (`SLIDE.md`)

> **Presentation File**: [`slides/slides.md`](slides/slides.md)
> **Total Slides**: **68** | **Layout**: **Single-Focus Full-Width per Slide**
> **Interactive Server**: `http://localhost:3030` (`make slides`)

| # | Slide Title | Subtitle / Focus | Line in `slides.md` |
| :--- | :--- | :--- | :--- |
| **1** | [Ultra Smoooooth Testing](slides/slides.md#L15) | — | `L15` |
| **2** | [🎯 Testing Strategy & Core Pillars](slides/slides.md#L37) | Mock the world. Control the chaos. Test without limits. | `L37` |
| **3** | [🌐 Pillar 1: Mock the World — WireMock](slides/slides.md#L68) | Eliminating External API Dependencies & Sandbox Flakiness | `L68` |
| **4** | [⚡ Pillar 2: Control the Chaos — Burp Suite](slides/slides.md#L99) | Live MITM Traffic Inspection, Fault Injection & Security Boundaries | `L99` |
| **5** | [🚀 Pillar 3: Test Without Limits — Playwright & Testcontainers](slides/slides.md#L130) | Hermetic Disposability & Full-Stack Test Automation | `L130` |
| **6** | [🏗️ Ecosystem System Architecture](slides/slides.md#L161) | — | `L161` |
| **7** | [🗺️ Detailed Service Topology & Flow](slides/slides.md#L169) | — | `L169` |
| **8** | [⚙️ Technology Stack — Core Runtime & Services](slides/slides.md#L250) | Monorepo Workspaces, Modern Web & Relational Persistence | `L250` |
| **9** | [🧪 Technology Stack — Testing & Security Infrastructure](slides/slides.md#L281) | Mocking, MITM Proxy & Container Orchestration | `L281` |
| **10** | [🧱 Core Microservices](slides/slides.md#L312) | — | `L312` |
| **11** | [🪝 What is WireMock? — Core Capabilities](slides/slides.md#L359) | Programmable HTTP Mock Server for External API Simulation | `L359` |
| **12** | [🎯 Why WireMock in Testing?](slides/slides.md#L390) | Deterministic Isolation, Zero Sandbox Flakiness & Fast Test Execution | `L390` |
| **13** | [⚡ WireMock — URL & Path Matching](slides/slides.md#L421) | Exact Path Routing, Regex Patterns & Query Strings | `L421` |
| **14** | [⚡ WireMock — Header Matching Operators](slides/slides.md#L448) | Exact Matches, Substrings, Regex & Absence Checks | `L448` |
| **15** | [⚡ WireMock — Query Parameter & Cookie Filters](slides/slides.md#L475) | Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction | `L475` |
| **16** | [⚡ Request Matching — URL & Header Example](slides/slides.md#L501) | Regex Path Routing & Bearer JWT Validation | `L501` |
| **17** | [⚡ Request Matching — Query Parameter Example](slides/slides.md#L528) | Query Flag Filtering & Multi-Criteria Evaluation | `L528` |
| **18** | [⚖️ WireMock — Priority & Matching Precedence](slides/slides.md#L555) | Resolution Hierarchy for Overlapping Stub Mappings | `L555` |
| **19** | [🥇 Priority Tier 1: Specific Error Overrides](slides/slides.md#L579) | Fault Injection & Error Contracts | `L579` |
| **20** | [🥈 Priority Tier 5–10: Default Happy Paths](slides/slides.md#L611) | Standard Business Logic & Route Matchers | `L611` |
| **21** | [🛡️ Priority Tier 100: Catch-All Proxy](slides/slides.md#L642) | Transparent Fallback to Real Downstream Endpoints | `L642` |
| **22** | [⚖️ Priority & Precedence — Example](slides/slides.md#L671) | Error Scenario Override vs Default Happy Path | `L671` |
| **23** | [🎯 WireMock — URL & Path RegEx Matching](slides/slides.md#L693) | Regular Expressions for Dynamic Resource Identifiers | `L693` |
| **24** | [🎯 WireMock — Header & Query RegEx Matching](slides/slides.md#L718) | Bearer Tokens & Scenario Enums | `L718` |
| **25** | [🎯 WireMock — Body & JSONPath RegEx Matching](slides/slides.md#L743) | Payload Validation & Pattern Filtering | `L743` |
| **26** | [🎯 WireMock RegEx — Dynamic UUID Path Example](slides/slides.md#L767) | Matching UUID Paths in API Stubs | `L767` |
| **27** | [🎯 WireMock RegEx — JWT Bearer & Scenario Enum](slides/slides.md#L790) | Strict Token & Scenario Routing | `L790` |
| **28** | [🎯 WireMock RegEx — Body & Parameter Matching](slides/slides.md#L817) | 13-Digit National ID & Query Version Validation | `L817` |
| **29** | [🎯 WireMock RegEx — JSONPath Phone Validation](slides/slides.md#L844) | Thai Mobile Number Pattern Matching in Payload | `L844` |
| **30** | [📦 WireMock — Semantic JSON Matching](slides/slides.md#L872) | Robust Structural JSON Equivalence | `L872` |
| **31** | [⚙️ WireMock — Body Match Operators & Lenient Flags](slides/slides.md#L896) | Matching Operators & Lenient Contract Flags | `L896` |
| **32** | [📦 Body Matching — Example](slides/slides.md#L924) | Match Request Bodies with `equalToJson` | `L924` |
| **33** | [🔍 WireMock — JSONPath Expression Matching](slides/slides.md#L954) | Filter & Assert Payloads with `matchesJsonPath` | `L954` |
| **34** | [🪄 WireMock — Dynamic Response Templating](slides/slides.md#L983) | Handlebars Response Templating (`response-template`) | `L983` |
| **35** | [🪄 WireMock — Handlebars Request & Encoding Helpers](slides/slides.md#L1008) | Request Model Extraction & Data Encoders | `L1008` |
| **36** | [🎲 WireMock — Handlebars Dynamic Data Generators](slides/slides.md#L1026) | Timestamps, Random IDs & Token Generation | `L1026` |
| **37** | [🪄 Handlebars Logic & Math — Example](slides/slides.md#L1043) | Conditionals, Dynamic Math & Response Configuration | `L1043` |
| **38** | [🔤 WireMock — Handlebars String Transformation Helpers](slides/slides.md#L1069) | String Manipulation & Substring Extractors | `L1069` |
| **39** | [🔁 WireMock — Handlebars Array & Iteration Helpers](slides/slides.md#L1087) | Array Looping, Sizing & Variable Lookups | `L1087` |
| **40** | [🪄 Handlebars Array Iteration — Example](slides/slides.md#L1105) | Generating Dynamic Arrays with `{{#each}}` and Indexing | `L1105` |
| **41** | [🔍 WireMock — Handlebars jsonPath Traversal & Indexing](slides/slides.md#L1136) | Deep Object Traversal & Array Indexing | `L1136` |
| **42** | [🛡️ WireMock — Safe Default Fallbacks & Dynamic Sizing](slides/slides.md#L1160) | Graceful Fallbacks & Array Counting | `L1160` |
| **43** | [🔍 Handlebars jsonPath — Example](slides/slides.md#L1184) | Echoing Nested Request Payloads & Handling Missing Fields | `L1184` |
| **44** | [⏱️ WireMock — Fixed Latency & Timeout Testing](slides/slides.md#L1208) | Deterministic Delay Injection (`fixedDelayMilliseconds`) | `L1208` |
| **45** | [🎲 WireMock — Random Jitter & Latency Distributions](slides/slides.md#L1232) | Real-World Latency Simulation (`delayDistribution`) | `L1232` |
| **46** | [💥 WireMock — Network Fault Injection](slides/slides.md#L1260) | Simulating Hard Network Failures & Socket Errors | `L1260` |
| **47** | [🔄 WireMock Stateful Stubbing](slides/slides.md#L1282) | Scenario State Machines & Replay Prevention | `L1282` |
| **48** | [🔄 WireMock Stateful — Example](slides/slides.md#L1308) | Scenario State Machine Stub: `04-order-pay.json` | `L1308` |
| **49** | [🔀 Burp Suite — Proxy Intercept](slides/slides.md#L1334) | Transparent MITM HTTP Traffic Interception | `L1334` |
| **50** | [🔀 Proxy Intercept — Example](slides/slides.md#L1358) | Before & After Request Header Injection | `L1358` |
| **51** | [🔁 Burp Suite — Repeater](slides/slides.md#L1380) | Manual Request Replay & Contract Validation | `L1380` |
| **52** | [🔁 Repeater — Example](slides/slides.md#L1404) | Boundary & Error Contract Testing (`transfers.spec.ts`) | `L1404` |
| **53** | [💣 Burp Suite — Intruder Attack Modes](slides/slides.md#L1428) | Automated Payload Fuzzing & Parameter Attacks | `L1428` |
| **54** | [💣 Burp Suite — Security & IDOR Discovery](slides/slides.md#L1447) | Horizontal Privilege Escalation & Rate Limits | `L1447` |
| **55** | [💣 Intruder — Example](slides/slides.md#L1466) | IDOR Detection Across Sequential Account IDs | `L1466` |
| **56** | [📋 Burp Suite — Logger / HTTP History](slides/slides.md#L1497) | Real-Time Traffic Auditing & HAR Exports | `L1497` |
| **57** | [📋 Logger — Example](slides/slides.md#L1521) | Filter & Export for CI Evidence | `L1521` |
| **58** | [❌ The Shared Environment Problem in Testing](slides/slides.md#L1540) | Flakiness, Collisions & State Bleed | `L1540` |
| **59** | [✅ The Hermetic Containerized Solution](slides/slides.md#L1560) | Isolated, Disposable & Predictable Infrastructure | `L1560` |
| **60** | [🧪 Testcontainers — Programmable Test Infrastructure](slides/slides.md#L1580) | Dynamic Ports & Code-Driven Orchestration | `L1580` |
| **61** | [🧪 Moby Ryuk — Container Garbage Collector](slides/slides.md#L1598) | Automatic Socket-Driven Teardown for Containers, Networks & Volumes | `L1598` |
| **62** | [🎭 Playwright — Unified UI & API Test Engine](slides/slides.md#L1624) | Modern Full-Stack Integration Testing Advantages | `L1624` |
| **63** | [🎭 Playwright — Core Test Primitives & API](slides/slides.md#L1648) | Selectors, Auto-Waiting Assertions & Mock Header Injection | `L1648` |
| **64** | [🎭 Playwright — Full-Stack Browser E2E Flow](slides/slides.md#L1674) | Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`) | `L1674` |
| **65** | [🧪 Playwright & Testcontainers — Orchestration](slides/slides.md#L1703) | API Testing with Dynamic Ephemeral Containers (`bff.spec.ts`) | `L1703` |
| **66** | [🏗 Local Development — Command Cheat Sheet](slides/slides.md#L1733) | Build, Unit Test & Monorepo Synchronization | `L1733` |
| **67** | [🧪 Automated Integration — Command Cheat Sheet](slides/slides.md#L1753) | Testcontainers & Playwright E2E Test Execution | `L1753` |
| **68** | [🎉 Thank You!](slides/slides.md#L1775) | Happy Ultra Smoooooth Testing | `L1775` |
