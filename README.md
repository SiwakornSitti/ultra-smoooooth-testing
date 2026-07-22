# Ultra Smoooooth Testing

A microservices ecosystem POC demonstrating **Consumer-Driven Contract Testing (Pact)**, **Go Workspaces (`go.work`)**, and full-stack integration testing with **Docker Compose**, **WireMock**, and **Playwright**.

---

## 🏗 System Architecture

```mermaid
flowchart TD
    Website["QA Website (Next.js :3000)"]
    BFF["bff-service (Go :8080)"]
    UserService["user-service (Go :8081)"]
    BankService["bank-account-service (Go :8082)"]
    DB[(PostgreSQL :5432)]
    WireMock["WireMock GUI (:8088 / :8080)"]

    Website -->|HTTP| BFF
    BFF -->|GET/POST users| UserService
    BFF -->|GET/POST accounts| BankService
    UserService -->|SQL| DB
    BankService -->|SQL| DB
    UserService -->|OAuth / OTP| WireMock
    BankService -->|SMS Send| WireMock
```

### Microservices

- **`bff-service`** (`:8080`): Backend-for-Frontend service exposing unified endpoints for frontend clients.
- **`user-service`** (`:8081`): User management microservice backed by PostgreSQL and external auth stubs.
- **`bank-account-service`** (`:8082`): Bank account management microservice backed by PostgreSQL.
- **`website`** (`:3000`): Next.js web interface.
- **`wiremock`** (`:8088`): WireMock GUI mocking third-party integrations (Paotang Pass, OTP, SMS).

---

## 🛠 Local Development & Go Workspace

This repository uses **Go Workspaces (`go.work`)** to manage multiple Go modules seamlessly:

```work
go 1.25.7

use (
 ./services/bank-account-service
 ./services/bff-service
 ./services/user-service
)
```

### Build Commands (`Makefile`)

All compiled binaries output exclusively to the root `./bin/` folder:

```bash
# Build all Go services into ./bin/
make build

# Run unit tests across all services
make test

# Clean compiled binaries
make clean
```

---

## 🤝 Pact Contract Testing (Consumer-Driven)

We use **Pact Go (v2)** for consumer-driven contract testing between services:

```mermaid
flowchart LR
    bff["bff-service (Consumer)"]
    user["user-service (Provider)"]
    bank["bank-account-service (Provider)"]

    bff -->|Pact Contract: GET/POST /users| user
    bff -->|Pact Contract: GET/POST /accounts| bank
```

### Contract Specifications & Tests

- **`bff-service` (Consumer)**:
  - [`user_pact_test.go`](services/bff-service/user_pact_test.go): Defines contract expectations for `GET /users/{id}` & `POST /users`.
  - [`account_pact_test.go`](services/bff-service/account_pact_test.go): Defines contract expectations for `GET /accounts` & `POST /accounts`.
- **`user-service` (Provider)**:
  - [`user_provider_pact_test.go`](services/user-service/user_provider_pact_test.go): Verifies provider contract against HTTP handlers.
- **`bank-account-service` (Provider)**:
  - [`account_provider_pact_test.go`](services/bank-account-service/account_provider_pact_test.go): Verifies provider contract against HTTP handlers.

Generated JSON contracts are published into the root `./pacts/` directory.

---

## 🚀 Running with Docker Compose

Spin up the entire environment (Postgres, WireMock, User Service, Bank Account Service, BFF Service, and Website):

```bash
# Start all services
docker compose up --build

# Stop all services
docker compose down
```

---

## 🧪 Integration & E2E Testing

Separated testing suites using Playwright and Testcontainers:

```bash
# Run Integration Tests (specs/integration)
make test-integration

# Run End-to-End Browser Tests (specs/e2e)
make test-e2e
```


