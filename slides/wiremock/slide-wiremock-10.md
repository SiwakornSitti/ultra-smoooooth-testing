# Section 02: Fundamentals & Tooling Reference

> **Deep-dive into the WireMock virtualization engine architecture, request matching operators, dynamic response templating, and Admin API contracts.**

---

### Section Modules

| # | Topic | Primary Operators & Tools | Key Capability |
| :---: | :--- | :--- | :--- |
| **01** | URL & Path Matching | `urlPathPattern`, `urlPath`, `method` | Exact routing vs regex matching on dynamic REST IDs |
| **02** | Query Parameter Matching | `queryParameters`, `hasExactly`, `absent` | Order-agnostic filtering and presence assertions |
| **03** | Header Matching | `equalTo`, `matches`, `Mock-Scenario` | Sub-scenario steering and Bearer token assertions |
| **04** | Semantic Body Matching | `equalToJson`, lenient JSON AST | Order-independent array and whitespace resilience |
| **05** | JSONPath Expressions | `matchesJsonPath`, Jayway syntax | Deep nested payload predicate filtering |
| **06** | Priority Precedence | `priority: 1` (high) vs `priority: 10` (default) | Specific exception overrides layered on default stubs |
| **07** | Response Templating | `{{now}}`, `{{randomValue}}`, `{{math}}` | Dynamic context echoing and mathematical calculations |
| **08** | Chaos & Latency | `fixedDelayMilliseconds`, `lognormal`, `fault` | Real transport delays, jitter, and dropped connections |
| **09** | Stateful Scenarios | `scenarioName`, `requiredScenarioState`, `newScenarioState` | Finite State Machines for token replay and state transitions |
| **10** | WireMock Admin API | `/__admin/mappings`, `/__admin/requests`, `/__admin/reset` | Unified REST control plane and test suite teardown |
| **11** | Test Pipeline Integration | Headless Docker vs Local Dev Web UI | Ephemeral CI automation and offline developer feedback |

---

### Core Learning Objectives
- **Master Request Matching**: Differentiate path, query, header, and body matching strategies for microservices.
- **Dynamic Context Generation**: Utilize Handlebars expressions for timestamp offsets, mathematical computations, and correlation IDs.
- **Lifecycle Control**: Programmatically manage in-memory stubs and scenario states via the WireMock Admin REST API.
