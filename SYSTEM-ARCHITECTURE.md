# System Architecture

## Purpose

Ultra Smoooooth Testing is a local microservices ecosystem used to demonstrate
integration testing, end-to-end testing, API inspection, and controlled external
service failures. Docker Compose runs the application, infrastructure, and
WireMock test doubles together.

## System overview topology (Logical Microservices Architecture)

In the logical system architecture, core microservices communicate directly with one another without any intermediary mocking layer:

```mermaid
flowchart LR
    Browser[Website\nNext.js :3000]
    BridgeWebsite[Website with mocked JSBridge\nNext.js :3000]
    Burp[Optional Burp Suite\nMITM proxy]
    BFF[BFF Service\nGo :8080]

    User[User Service\n:8081]
    Account[Bank Account Service\n:8082]
    EKYC[eKYC Service\n:8084]
    Transfer[Transfer Service\n:8085]
    SMS[SMS Service\n:8086]
    OTP[OTP Service\n:8087]
    PaotangSvc[Paotang Service\n:8083]

    DB[(PostgreSQL\n:5432)]
    WireMock[WireMock Service\n:8088]
    SMSProvider[SMS Provider]

    Browser -->|REST| BFF
    BridgeWebsite -.->|REST + mocked JSBridge| Burp
    BridgeWebsite -->|direct REST| BFF
    Burp -->|proxied REST| BFF
    Browser -.->|optional interception| Burp

    BFF -->|Profile / Auth| User
    BFF -->|Accounts| Account
    BFF -->|Verification| EKYC
    BFF -->|Transfers| Transfer
    BFF -->|Notifications| SMS

    User --> DB
    Account --> DB
    EKYC --> DB
    Transfer --> DB

    User -->|OAuth| PaotangSvc
    User -->|Verify OTP| OTP
    OTP -->|Send OTP SMS| SMS

    SMS -->|Send SMS| WireMock
    WireMock -.->|proxy unmatched| SMSProvider
```

## Runtime test topology (Local Compose & WireMock Setup)

For local development and automated testing, Docker Compose inserts WireMock in front of core services (`BFF → WireMock Core Mocks → core service`) to support deterministic scenario stubs and fault injection while proxying unmatched requests to the real core containers:

```mermaid
flowchart LR
    Browser[Website\nNext.js :3000]
    BridgeWebsite[Website with mocked JSBridge\nNext.js :3000]
    Burp[Optional Burp Suite\nMITM proxy]
    BFF[BFF Service\nGo :8080]

    User[User Service\n:8081]
    Account[Bank Account Service\n:8082]
    EKYC[eKYC Service\n:8084]
    Transfer[Transfer Service\n:8085]
    SMS[SMS Service\n:8086]
    OTP[OTP Service\n:8087]
    PaotangSvc[Paotang Service\n:8083]

    DB[(PostgreSQL\n:5432)]
    MockCore[WireMock Core Mocks\n:8088]
    MockExternal[WireMock External Mocks\n:8088]
    SMSProvider[SMS Provider]

    Browser -->|REST| BFF
    BridgeWebsite -.->|REST + mocked JSBridge| Burp
    BridgeWebsite -->|direct REST| BFF
    Burp -->|proxied REST| BFF
    Browser -.->|optional interception| Burp

    BFF -->|user/account/eKYC/transfer/sms/otp| MockCore

    MockCore -.->|unmatched request proxy| User
    MockCore -.->|unmatched request proxy| Account
    MockCore -.->|unmatched request proxy| EKYC
    MockCore -.->|unmatched request proxy| Transfer
    MockCore -.->|unmatched request proxy| SMS
    MockCore -.->|unmatched request proxy| OTP
    MockCore -.->|unmatched request proxy| PaotangSvc

    User --> DB
    Account --> DB
    EKYC --> DB
    Transfer --> DB
    User -->|Paotang request| MockCore
    User -->|OTP verify request| MockCore
    OTP -->|Send OTP SMS| MockCore
    SMS -->|SMS request| MockExternal
    MockExternal -.->|proxy unmatched| SMSProvider
```

All ports in the diagram are host-facing Compose ports. The website has only
one application API boundary: `bff-service`. Core services are internal and
must not be called directly by the browser. Cross-service coordination uses
the BFF and the shared database transaction used by transfers.

The two WireMock nodes are logical views of the same WireMock container: one
groups core-service mappings and the other groups external-provider mappings
for readability.

The BFF is explicitly allowed to connect to the core services. This is the
intended direction for synchronous application requests: `website → BFF → core
service`.

For user, bank-account, eKYC, transfer, SMS, OTP, and Paotang requests, the configured first hop is
WireMock: `website → BFF → WireMock Core Mocks → core service`. WireMock
returns a matching scenario response or proxies an unmatched request to the
real core service.

The core services are `user-service`, `bank-account-service`, `ekyc-service`,
`transfer-service`, `sms-service`, `otp-service`, and `paotang-service`. `paotang-service` is an internal HTTP
adapter used by `user-service` to exchange Paotang OAuth tokens through the configured provider.

## Tech lead awareness

- The BFF is the only synchronous application entry point for the website.
  Clients must not call any core service directly.
- Core services own their domain behavior. The BFF orchestrates the account
  creation and SMS delivery calls synchronously.
- `sms-service`, `otp-service`, and `paotang-service` are core adapters, not external providers. They own HTTP
  integrations with their configured external providers.
- WireMock represents external systems and test doubles only: Paotang, OTP,
  SMS, and optional BFF scenario/proxy behavior.
- `transfer-service` currently uses the shared PostgreSQL database transaction
  to lock and update account rows together with the transfer record. Any future
  database ownership split must preserve this atomicity or introduce an
  explicit distributed-transfer design.

## Components and responsibilities

| Component | Responsibility | Data or integration boundary |
| --- | --- | --- |
| `website` | Browser-facing QA application and scenario selector | Calls the configured BFF URL; defaults to `http://localhost:8080` |
| `bff-service` | Backend-for-Frontend and API orchestration layer | Routes requests, loads accounts for transfer-history filters, and filters transfer results |
| `user-service` | User profile, Paotang authentication, and OTP workflows | PostgreSQL; Paotang through WireMock / `paotang-service`; OTP through WireMock / `otp-service` |
| `bank-account-service` | Bank account operations | PostgreSQL |
| `ekyc-service` | eKYC verification requests and retrieval | PostgreSQL |
| `transfer-service` | Transfer validation, balance movement, and transfer records | PostgreSQL; updates both account balances and the transfer record in one transaction; history reads only query `transfers` |
| `sms-service` | Internal HTTP adapter that sends SMS | SMS provider through WireMock |
| `otp-service` | Core service for generating and verifying OTP codes | Uses sms-service / SMS Provider for SMS delivery |
| `paotang-service` | Internal HTTP adapter that exchanges Paotang OAuth tokens | Paotang provider through WireMock |
| PostgreSQL | Shared local database used by the persistence-backed services | Temporary container-local storage |
| WireMock | Deterministic external-provider and core-service mocks | Paotang, OTP, SMS, transfer-service, stateless labs, and stateful labs |

## Request flows

### Normal application flow

1. The website reads `/api/config` and sends API requests to the configured BFF
   endpoint.
2. The BFF translates the frontend contract into calls to the appropriate
   domain service.
3. Domain services validate and persist their own operation data in PostgreSQL.
4. The synchronous result travels back through the BFF to the browser.

The BFF is the browser integration boundary. The website must not call
`user-service`, `bank-account-service`, `ekyc-service`, `transfer-service`, or
`sms-service` directly.

### External authentication and OTP

`user-service` calls WireMock for Paotang and OTP integrations. This keeps
external behavior deterministic while allowing tests to select success,
failure, replay, and other response scenarios.

### SMS flow

The BFF creates the account through `bank-account-service`, then calls `sms-service` through WireMock (`http://wiremock:8080`) when a phone number is present. WireMock either returns a scenario-matched response (e.g. rate limit, timeout, invalid number) or proxies unmatched requests to `sms-service`. `sms-service` then calls the mocked external SMS provider through WireMock. SMS delivery failures are returned to the caller.

### Transfer flow

The BFF sends create-transfer requests to `transfer-service`. Transfer
validation and atomic balance movement remain in the transfer service, which
locks the source and target account rows and writes the transfer record in one
PostgreSQL transaction.

For Transfer History, the BFF owns filtering. It reads accounts from
`bank-account-service`, resolves the requested customer or eight-digit account
number, fetches transfer records from `transfer-service`, and filters the
response before returning it to the website. `transfer-service` only queries
the `transfers` table for history and does not use the bank-account service's
`accounts` table for that read path. A failed validation, currency mismatch, or
insufficient balance is returned as a domain error without completing the
transfer.

```mermaid
sequenceDiagram
    participant Website
    participant BFF
    participant Bank as bank-account-service
    participant Transfer as transfer-service

    Website->>BFF: GET /api/v1/transfers?account_no=00000011
    BFF->>Bank: GET /accounts
    Bank-->>BFF: Account records and ownership
    BFF->>Transfer: GET /transfers
    Transfer-->>BFF: Transfer records
    BFF->>BFF: Match account number and customer
    BFF-->>Website: Filtered transfer history
```

## WireMock modes

WireMock has two roles in this repository:

- External-provider mock: domain services call WireMock for Paotang, OTP, and
  SMS behavior.
- Core-service mocks: the BFF sends bank-account and transfer requests to
  WireMock; WireMock
  matches `TRANSFER:*` scenarios or proxies unmatched requests to the real
  core service.

The repository separates deterministic stateless mappings from scenario-based
stateful mappings:

- `wiremock/mappings/lab-stateless` contains independent request/response
  examples.
- `wiremock/mappings/transfer-service` contains transfer-service scenarios.
- `wiremock/mappings/bank-account-service` contains bank-account-service scenarios.
- `labs/wiremock-stateful` contains request sequences whose responses depend on
  WireMock scenario state.

WireMock's administrative API and GUI are protected by the Compose-configured
basic-auth credentials. Its host port is `8088`, while the container listens on
`8080`.

## Testing architecture

| Test surface | What it exercises |
| --- | --- |
| Go service tests | Individual service handlers, domain logic, and contracts |
| Playwright integration tests | Cross-service API behavior using the test environment |
| Playwright E2E tests | Browser flows through the website and BFF boundary |
| WireMock stateless labs | Matching, templating, delays, priorities, and proxying |
| WireMock stateful labs | Replay prevention, retries, webhooks, and lifecycle transitions |
| Burp Suite lab | Inspection and controlled modification of HTTP traffic |

Playwright/Testcontainers owns test-specific database setup and service
fixtures. Compose provides the long-running local environment; database seed
mounts are not part of the Compose startup path.

## Startup and configuration

Start the complete environment with:

```bash
docker compose up --build
```

The main configuration boundaries are:

- `BFF_URL`: website runtime BFF endpoint.
- `*_SERVICE_URL`: BFF-to-domain-service endpoints.
- `PAOTANG_SERVICE_URL` and `OTP_SERVICE_URL`: mocked external-provider endpoints.
- `SMS_SERVICE_URL`: BFF-to-sms-service endpoint.
- `SMS_UPSTREAM_URL` and `SMS_API_KEY`: sms-service provider settings.
- `WIREMOCK_ADMIN_USER` and `WIREMOCK_ADMIN_PASSWORD`: WireMock admin access.

See [`README.md`](README.md), [`docs/integration.md`](docs/integration.md), and
[`docs/e2e.md`](docs/e2e.md) for operating and testing procedures.
