# Integration Testing & API Virtualization

Ubiquitous domain language for microservice integration testing, traffic interception, and external API virtualization in the Ultra Smoooooth Testing workshop.

## Language

**API Virtualization**:
Simulating external third-party HTTP endpoints with protocol fidelity using an independent local stand-in server.
_Avoid_: In-memory mocking, fake server, dummy API

**Stub Mapping**:
A declarative JSON configuration defining request matching predicates and the predetermined response payload.
_Avoid_: Mock file, endpoint route, test fake

**Scenario Steering**:
Directing downstream services or mock servers to execute specific scenario branches via HTTP request headers (e.g., `Mock-Scenario`).
_Avoid_: Test branching, mock toggling, query flags

**Scenario State (FSM)**:
An internal finite state machine maintained by WireMock to model stateful lifecycles (e.g., token consumption, multi-step payments) with automatic resets.
_Avoid_: Database state, test session context

**Hermetic Isolation**:
Executing integration tests against isolated, ephemeral mock instances so test runs never share state, clash on database rows, or produce flaky builds.
_Avoid_: Shared staging sandbox, multi-tenant test environment

**In-Flight Interception**:
Transparently inspecting and modifying HTTP packets in transit at the socket level using a proxy (Burp Suite) without modifying service source code.
_Avoid_: Code patching, debug builds, client mocks

**In-Memory Mock**:
A test double that replaces an internal application code interface or function in memory during unit tests, bypassing network I/O and protocol serialization completely.
_Avoid_: Fake server, stub service, WireMock

**Semantic Matching (`equalToJson`)**:
Validating JSON payloads by structural data content and keys, remaining resilient against insignificant formatting differences, whitespace, or property reordering.
_Avoid_: String matching, character comparison, brittle regex
