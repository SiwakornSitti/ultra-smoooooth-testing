# Rollout Playbook & Team Adoption

### How to integrate WireMock into your service pipeline today

---

### Comparison & Pillars Matrix

| Focus Area | Architecture Scope | Core Mechanism | Operational Benefit |
| :--- | :--- | :--- | :--- |
| **💻 Phase 1: Local Dev** | Day 1 | 🎯 Immediate zero-dependency local runs | 🎯 Immediate zero-dependency local runs |
| **🚀 Phase 2: CI PR Gate** | Sprint 1 | 🎯 Fast PR checks under 30 seconds | 🎯 Fast PR checks under 30 seconds |
| **🛡️ Phase 3: Chaos Drills** | Sprint 2 | 🎯 Bulletproof failure resilience | 🎯 Bulletproof failure resilience |

---

### Detailed Architectural Breakdown

### 💻 Phase 1: Local Dev (Day 1)

Run WireMock alongside your service with `docker compose up wiremock`. Explore and debug stubs interactively via the Web UI at `:8088/__admin/webapp`.

> 🎯 Immediate zero-dependency local runs


### 🚀 Phase 2: CI PR Gate (Sprint 1)

Embed WireMock into automated integration suites via Testcontainers or headless Docker. Enforce 100% deterministic builds with zero sandbox flakiness.

> 🎯 Fast PR checks under 30 seconds


### 🛡️ Phase 3: Chaos Drills (Sprint 2)

Add fault-injection stubs (503 flapping, socket disconnects, 2s latency) to verify that client retry loops and timeout cancellations handle real-world failures safely.

> 🎯 Bulletproof failure resilience


> 💡 **Architectural Takeaway:** 🏁 **Immediate Action:** Check out `wiremock/mappings/` and run `make test-integration` to verify against stubs.

### Presenter Notes

- Wrap up the session with a concrete Call to Action (The "Ask"):
- 1. Have engineers try `make test-integration` on their laptops today.
- 2. Propose adding WireMock container to the team's CI GitHub Actions workflow this sprint.
- 3. Thank the audience and open the floor for questions.
