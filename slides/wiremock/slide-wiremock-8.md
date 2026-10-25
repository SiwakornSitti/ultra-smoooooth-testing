# Architectural Pillar: Polyglot Packaging

### Runs uniformly across local developer workstations, Docker Compose, and CI/CD pipelines

---

### Comparison & Pillars Matrix

| Focus Area | Architecture Scope | Core Mechanism | Operational Benefit |
| :--- | :--- | :--- | :--- |
| **📦 Universal Deployment Options** | Pillar Any Tech Stack | Uniform execution across local dev workstations and automated CI runners | Uniform execution across local dev workstations and automated CI runners |

---

### Detailed Architectural Breakdown

### 📦 Universal Deployment Options (Pillar Any Tech Stack)

- **Docker & Compose:** Run official `wiremock/wiremock` image with mounted JSON stubs—zero Java runtime required.
- **Language Agnostic:** Works identically for Go, Node.js, Python, Java, Rust, C#, or shell scripts.
- **Testcontainers Sidecars:** Spawns ephemeral WireMock instances programmatically per test suite run.

> 🚀 Uniform execution across local dev workstations and automated CI runners




### Presenter Notes

- Emphasize that WireMock is polyglot: developers do not need Java installed.
- Show Docker run command: one container mounts a local mappings directory and serves stubs instantly.
- Mention Testcontainers: Go tests can spin up WireMock dynamically using testcontainers-go.
