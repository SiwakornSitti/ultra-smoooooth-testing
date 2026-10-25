# WireMock Deep Dive

### Virtualizing External APIs, Stateful Sequences, and Chaos Testing for Microservices

> **Pillar 1 • API Virtualization Workshop** | Duration: ~4 hours

---

### Core Curriculum Matrix

| Section | Focus Area | Duration | Key Learning Outcomes |
| :--- | :--- | :---: | :--- |
| **Section 01** | Introduction & Boundaries | 25 min | Out-of-process HTTP stand-in model, hermetic vs staging topologies, and core virtualization superpowers. |
| **Section 02** | Fundamentals & Tooling Reference | 45 min | Request matching (URL, query, headers, body, JSONPath), dynamic templating, stateful FSM, and Admin API. |
| **Section 03** | Real-World Use Cases & Application | 40 min | 12 end-to-end production patterns: eKYC verification, token replay protection, flapping retries, and network faults. |
| **Section 04** | Hands-On Lab Challenges | 60 min | 4 progressive labs and 1 DIY capstone challenge testing real-world client resilience. |

---

### Key Capabilities
- **WireMock 3.x Stand-in Process**: Real TCP loopback fidelity with zero production code changes.
- **Precision Request Routing**: Match dynamic REST resources via Regex, JSONPath predicates, and header steering.
- **Stateful Finite State Machine (FSM)**: Simulate multi-step transactions and token replay attacks in memory.
- **Transport Chaos Injection**: Induce realistic latency jitter, 503 flapping sequences, and dropped sockets.
