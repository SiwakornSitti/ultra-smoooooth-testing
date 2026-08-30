# Ultra Smoooooth Testing

> **Mock the world. Control the chaos. Test without limits.**

<div align="center">

<a href="https://github.com/SiwakornSitti/ultra-smoooooth-testing">
  <img src="docs/qr-code.svg" width="260" height="260" alt="Repository QR Code" />
</a>

<p>📱 <em>Scan to access this repository: <a href="https://github.com/SiwakornSitti/ultra-smoooooth-testing">github.com/SiwakornSitti/ultra-smoooooth-testing</a></em></p>

</div>

A microservices ecosystem POC demonstrating **Go Workspaces (`go.work`)**, full-stack integration testing with **Docker Compose**, **WireMock**, and **Playwright**.

👉 **Check out the full [Integration Testing Workshop Guide](WORKSHOP.md) for 11 practical thinking cases and hands-on scenarios!**


---

## 🏗 System Architecture

See the detailed [system architecture document](SYSTEM-ARCHITECTURE.md) for
component responsibilities, request flows, WireMock modes, and testing
boundaries.

```mermaid
flowchart TD
    subgraph Clients["🌐 1. Client & Automation Layer (Playwright & Burp)"]
        Website["💻 Web Application<br/><code>Next.js :3000</code>"]
        Playwright["🎭 Playwright E2E<br/><code>Automation Runner</code>"]
        Burp["🛡️ Burp MITM Proxy<br/><code>:8080 (Traffic Control)</code>"]
    end

    subgraph API_Gateway["⚡ 2. Gateway & Orchestration Layer"]
        BFF["⚙️ bff-service<br/><code>Go :8080</code>"]
    end

    subgraph Core_Services["🏡 3. Microservices Domain Layer (Go Workspace)"]
        UserService["👤 user-service<br/><code>Go :8081</code>"]
        BankService["🏦 bank-account-service<br/><code>Go :8082</code>"]
        EKYCService["🪪 ekyc-service<br/><code>Go :8084</code>"]
        TransferService["💸 transfer-service<br/><code>Go :8085</code>"]
        UtilityService["🧰 utility-service<br/><code>Go :8086</code>"]
        OTPService["🔑 otp-service<br/><code>Go :8087</code>"]
    end

    subgraph Persistence["🗄️ 4. Persistence Layer"]
        DB[("🐘 PostgreSQL DB<br/><code>:5432</code>")]
    end

    subgraph External_Mocks["🤖 5. External Mocks (WireMock Virtualization)"]
        WireMock["🪝 WireMock Stubs<br/><code>:8088 / :8080</code>"]
        PaotangProvider["💳 Paotang Provider"]
        SMSProvider["📡 SMS Provider"]
    end

    Website -->|HTTP REST| BFF
    Playwright -->|Automated E2E + page.addInitScript| Website
    Website -.->|MITM Traffic Intercept| Burp
    Burp -.->|Proxied Traffic| BFF

    BFF -->|GET/POST /users| UserService
    BFF -->|GET/POST /accounts| BankService
    BFF -->|POST/GET /ekycs| EKYCService
    BFF -->|POST/GET /transfers| TransferService
    BFF -->|POST /reset| UtilityService
    BFF -->|POST /auth/otp/verify| OTPService

    UserService -->|SQL Queries| DB
    BankService -->|SQL Queries| DB
    TransferService -->|Atomic Balance Updates| DB
    UtilityService -->|Restore seeded workshop data| DB

    UserService -->|OAuth via WireMock| WireMock
    OTPService -->|Send SMS via WireMock| WireMock
    WireMock -.->|Proxy Unmatched| PaotangProvider
    WireMock -.->|Proxy Unmatched| SMSProvider
```

### Microservices

- **`bff-service`** (`:8080`): Backend-for-Frontend service exposing unified API endpoints.
- **`user-service`** (`:8081`): User profile management microservice backed by PostgreSQL.
- **`bank-account-service`** (`:8082`): Bank account management microservice backed by PostgreSQL.
- **`ekyc-service`** (`:8084`): Electronic Know Your Customer identity verification service (`POST /ekycs/verify`, `GET /ekycs/{id}`).
- **`transfer-service`** (`:8085`): Money movement and transfer history service; atomically updates source and target account balances.
- **`utility-service`** (`:8086`): Workshop utility service that restores the seeded database state.
- **`otp-service`** (`:8087`): OTP generation and verification microservice that delegates SMS message delivery to SMS Provider via WireMock.
- **`website`** (`:3000`): Next.js 16 web client interface.
- **`wiremock`** (`:8088`): WireMock GUI mocking third-party integrations (Paotang Pass, OTP, SMS).

---

## 📋 Prerequisites

Before setting up and running the microservices ecosystem, ensure the following prerequisite tools are installed:

| Tool | Recommended Version | Purpose |
| :--- | :--- | :--- |
| **Docker & Docker Compose** | Docker Desktop 4.x+ | Orchestrating containerized services (PostgreSQL, WireMock, microservices). |
| **Burp Suite** | Community / Professional | **MITM Proxy**: Intercepting, inspecting, and security testing HTTP API traffic between frontend, BFF, and microservices. |
| **Playwright** | v1.40+ | **Test Runner**: Executing end-to-end (E2E) browser automation tests and API integration test suites (`specs/e2e`, `specs/integration`). |
| **Go** | 1.25+ | Compiling Go binaries and running workspace-level unit & integration tests (`go.work`). |
| **Node.js / Bun** | Node v20+ / Bun v1.2+ | Building the Website and running Playwright test suites. |

---

## 🛠 Local Development & Go Workspace

This repository uses **Go Workspaces (`go.work`)** to manage multiple Go modules seamlessly:

```work
go 1.25.7

use (
 ./services/bank-account-service
 ./services/bff-service
 ./services/ekyc-service
 ./services/otp-service
 ./services/transfer-service
 ./services/utility-service
 ./services/user-service
)
```

### Build Commands (`Makefile`)

All compiled binaries output exclusively to the root `./bin/` folder:

```bash
# Build all Go services into ./bin/
make build

# Sync workspace dependencies & tidy all service go.mod files
make sync

# Run unit tests across all microservices
make test

# Run all test suites (Unit + Testcontainers + Playwright E2E)
make test-all

# Lint formatting and type-check TypeScript test suites
make lint

# Clean compiled binaries
make clean
```

---

## 🚀 Running with Docker Compose

### Apple Silicon (Rosetta 2)

On Apple Silicon Macs, enable x86/amd64 emulation in Docker Desktop before
starting the stack:

1. Open **Docker Desktop → Settings → General**.
2. Enable **Use Rosetta for x86/amd64 emulation on Apple Silicon**.
3. Click **Apply & Restart**.

This repository pins the WireMock container to `linux/amd64`, so Docker Desktop
uses Rosetta 2 to run it. Verify that the setting is active with:

```bash
docker info --format '{{.Architecture}}'
docker compose config
```

Then start the stack as usual:

Spin up the entire microservices environment (Postgres, WireMock, User Service, Bank Account Service, eKYC Service, Transfer Service, SMS Service, BFF Service, and Website):

```bash
# Start all services
docker compose up --build

# Stop all services
docker compose down
```

Open `http://localhost:3000`.

Or start Docker, apply migrations, and load seed data with one command:

```bash
make setup
```

`make seed` inserts the two demo users. The login page uses `Narin Chaiyasit` with
phone `+66800000001` by default, plus the sample accounts, eKYC record, and
transfer data.

Mocked BFF mappings require a `Mock-Scenario` header; requests without it fall back to the real `bff-service:8080` through WireMock.

---

## 🧪 Integration & E2E Testing

Separated testing suites using Playwright and Testcontainers:

```bash
# Run Integration Tests (specs/integration)
make test-integration

# Run End-to-End Browser Tests (specs/e2e)
make test-e2e

```

---

## 🔬 Practical Labs

- 🖥️ **[WireMock Web UI & GUI Management Guide](labs/wiremock-ui/README.md)**: Interactive guide for viewing, creating, searching, and inspecting WireMock stubs and request logs via the Web GUI (`http://localhost:8088/__admin/`).
- 🎓 **[WireMock Stateful Stubbing & Scenario State Machines](labs/wiremock-stateful/README.md)**: Hands-on guide and test suite for studying stateful stubs, state transitions, auth token replay prevention, order fulfillment state machines, and transient retry self-healing.
- 🎓 **[WireMock Stateless Stubbing & Pattern Matching](labs/wiremock-stateless/README.md)**: Hands-on guide and test suite for studying stateless request matching (query params, headers, JSONPath body patterns), priority overrides, Handlebars response templating, and delay latency injection.
- 🎓 **[Burp Suite MITM Proxy & API Security Inspection](labs/burp-suite/README.md)**: Hands-on guide for intercepting, inspecting, modifying, and security-testing HTTP/HTTPS microservice traffic, header injection, and Burp Repeater testing.

---

## 📊 Presentation Slides (Slidev)

A complete Markdown presentation built with **[Slidev](https://sli.dev)** is included in the `slides/` directory:

```bash
# Launch interactive Slidev presentation deck
make slides
# OR
cd slides && bunx @slidev/cli slides.md
```

---

## 🗺️ Interactive Architecture Diagram

An interactive, responsive vector architecture diagram with theme switching and guided views is available in `docs/`:

```bash
# Serve interactive architecture diagram on http://localhost:3031
make diagram
```

