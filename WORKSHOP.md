# 🧪 Microservices Integration Testing Workshop Guide

> **Mock the world. Control the chaos. Test without limits.**

Welcome to the **Microservices Integration Testing Workshop**! This guide provides a comprehensive framework, architecture overview, setup instructions, and **11 practical thinking cases** for testing microservices in a real-world enterprise banking ecosystem.

## Workshop Overview

This is a hands-on workshop for QA engineers, developers, SDETs, automation engineers, and tech leads to design, build, test, and debug reliable microservices through realistic banking workflows and controlled failure scenarios. Using Go, Docker Compose, WireMock, Playwright, and Burp Suite, participants connect shared requirements and risk discovery with API testing, integration testing, browser automation, service mocking, fault injection, security inspection, service-contract validation, downstream-failure testing, data-integrity checks, and end-to-end verification before production.

---

## 🏗️ Ecosystem Architecture

```mermaid
flowchart TD
    subgraph Clients["🌐 1. Client & Automation Layer (Test Without Limits)"]
        Website["💻 Website<br/><code>Next.js :3000</code>"]
        BridgeWebsite["📱 Mobile WebView<br/><code>Mocked JSBridge</code>"]
        Playwright["🐦 Playwright E2E<br/><code>Automation Runner</code>"]
        Burp["🛡️ Burp MITM Proxy<br/><code>:8080 (Control Chaos)</code>"]
    end

    subgraph API_Gateway["⚡ 2. Gateway & Orchestration Layer"]
        BFF["⚙️ bff-service<br/><code>Go :8080</code>"]
    end

    subgraph Core_Services["🏡 3. Microservices Domain Layer (Go Workspace)"]
        UserService["👤 user-service<br/><code>Go :8081</code>"]
        BankService["🏦 bank-account-service<br/><code>Go :8082</code>"]
        EKYCService["🪪 ekyc-service<br/><code>Go :8084</code>"]
        TransferService["💸 transfer-service<br/><code>Go :8085</code>"]
        OTPService["🔑 otp-service<br/><code>Go :8087</code>"]
    end

    subgraph Persistence["🗄️ 4. Persistence Layer"]
        DB[("🐘 PostgreSQL DB<br/><code>:5432</code>")]
    end

    subgraph External_Mocks["🤖 5. External Mocks (Mock The World)"]
        WireMock["🪝 WireMock Stubs<br/><code>:8088 / :8080</code>"]
    end

    Website -->|HTTP REST| BFF
    BridgeWebsite -->|REST + JSBridge Native Bridge| BFF
    Playwright -->|Automated E2E| Website
    Playwright -->|Automated E2E| BridgeWebsite
    Website -.->|MITM Traffic Intercept| Burp
    BridgeWebsite -.->|MITM Traffic Intercept| Burp
    Burp -.->|Proxied Traffic| BFF

    BFF -->|GET/POST /users| UserService
    BFF -->|GET/POST /accounts| BankService
    BFF -->|POST/GET /ekycs| EKYCService
    BFF -->|POST/GET /transfers| TransferService
    BFF -->|POST /auth/otp/verify| OTPService

    UserService -->|SQL Queries| DB
    BankService -->|SQL Queries| DB
    TransferService -->|Atomic Balance Updates| DB

    UserService -->|OAuth & OTP Stubs| WireMock
    OTPService -->|SMS Delivery Stubs| WireMock
    EKYCService -->|Paotang eKYC Stubs| WireMock
```

---

## 📋 Prerequisites & Tools

| Tool | Purpose in Workshop |
| :--- | :--- |
| **Docker & Docker Compose** | Orchestrating PostgreSQL, WireMock, and microservice containers. |
| **Playwright** | Running End-to-End (E2E) browser tests and API integration test suites. |
| **Burp Suite** | **MITM Proxy**: Intercepting, inspecting, and security testing HTTP API traffic. |
| **Go (v1.25+)** | Workspace development (`go.work`) and executing unit/integration test suites. |
| **WireMock GUI** | Stubbing 3rd-party external APIs (Paotang Pass OAuth, SMS Gateway, OTP). |

---

## 🎯 11 Workshop Thinking Cases & Test Scenarios

### 📍 Category 1: Service-to-Service Workflow Integration

#### **Case 1: End-to-End Fund Transfer Execution**

- **Flow**: `Client` ➔ `BFF Service` ➔ `Transfer Service` ➔ `Bank Account Service` ➔ `PostgreSQL`
- **Challenge**: Verify that when `POST /transfers` is called, the transfer record is created, and the source account balance decreases while the target account balance increases.
- **Key Assertions**:
  - Response status: `201 Created` with `Location: /transfers/{id}` header.
  - Query `bank-account-service` before and after transfer to verify exact balance delta.

#### **Case 2: eKYC-Gated Account Opening**

- **Flow**: `Client` ➔ `BFF Service` ➔ `eKYC Service` & `User Service`
- **Challenge**: A user requests a new bank account. The system must verify eKYC status (`APPROVED`) before creating the account in `bank-account-service`.
- **Key Assertions**:
  - If eKYC is `APPROVED`: Account created successfully (`201 Created`).
  - If eKYC is `REJECTED` or missing: Account creation blocked with `400 Bad Request` or `422 Unprocessable Entity`.

---

### 📍 Category 2: Data Integrity & Database Persistence

#### **Case 3: Atomic Transaction & Rollback Validation**

- **Scenario**: Source account has 500 THB. User attempts to transfer 1,000 THB to Target account.
- **Challenge**: Ensure the database operation fails atomically. Source account balance must remain 500 THB, Target account balance must remain unchanged, and no partial transfer record is committed.
- **Key Assertions**:
  - Transfer service returns `400 Bad Request` (`INSUFFICIENT_FUNDS`).
  - Both account balances in PostgreSQL remain untouched.

#### **Case 4: Concurrent Transfers (Race Condition / Double Spend)**

- **Scenario**: User has 100 THB balance. Two transfer requests of 80 THB each arrive simultaneously.
- **Challenge**: Test database locking / optimistic concurrency control. Exactly ONE transfer must succeed (`201 Created`); the second MUST fail with insufficient balance (`400 Bad Request`).
- **Key Assertions**:
  - Total debited amount across both requests must not exceed initial balance (100 THB).
  - Remaining balance must be exactly 20 THB.

---

### 📍 Category 3: External Integrations & Stubbing (WireMock)

#### **Case 5: OTP SMS Delivery Failure**

- **Flow**: `BFF Service` ➔ `OTP Service` ➔ `WireMock (SMS Provider)`
- **Challenge**: Configure the SMS provider stub to return `503 Service Unavailable`. Verify that OTP delivery fails cleanly and the response does not report a successful OTP request.
- **Key Assertions**:
  - OTP delivery returns a typed failure when the SMS provider is unavailable.
  - `Mock-Scenario` and `Mock-ID` reach the WireMock provider mapping.

#### **Case 6: OAuth Token Exchange (Paotang Pass)**

- **Flow**: `User Service` ➔ `WireMock (Paotang Pass OAuth)`
- **Challenge**: Test OAuth callback integration (`POST /auth/paotang/callback`) using a WireMock stub returning a mock Bearer access token.
- **Key Assertions**:
  - User Service exchanges auth code for token and logs user in successfully (`200 OK`).
  - Invalid auth code stubbed in WireMock returns `401 Unauthorized`.

#### **Case 6B: Payment Webhook Idempotency**

- **Flow**: `Payment Provider` ➔ `WireMock payment webhook stub`
- **Challenge**: Deliver a successful payment webhook, then replay the same event and verify duplicate delivery is rejected.
- **Key Assertions**:
  - First `POST /lab/api/payments/{payment_id}/webhook` returns `202 Accepted`.
  - Replay with the same event returns `409 Conflict` (`DUPLICATE_WEBHOOK`).

---

### 📍 Category 4: Frontend & API Aggregation (BFF)

#### **Case 7: BFF Data Aggregation (User Dashboard View)**

- **Flow**: `Next.js Web Frontend` ➔ `BFF Service` ➔ (`User Service` + `Bank Account Service`)
- **Challenge**: `BFF Service` fetches user details from `user-service` and account list from `bank-account-service` sequentially, combining them into a single `UserDashboard` JSON payload.
- **Key Assertions**:
  - BFF returns aggregated response with user profile and accounts array.
  - If `bank-account-service` returns empty list `[]`, BFF still returns user profile with empty accounts list.

#### **Case 8: Strict REST Schema & Header Contract Validation**

- **Challenge**: Test that all endpoints strictly follow REST standards:
  - Resource creation returns `201 Created` with `Location` header.
  - Invalid JSON payload returns `400 Bad Request` with standard error schema: `{"error": "...", "code": "..."}`.
  - Non-existent resource returns `404 Not Found`.

---

### 📍 Category 5: Resilience, Timeouts & Fault Injection

#### **Case 9: Downstream Service Timeout (Latency Fault Injection)**

- **Challenge**: Configure WireMock or proxy delay (e.g. 10-second delay) on external dependencies. Verify that the calling microservice enforces a HTTP client timeout (e.g. 3-second timeout) and returns a clean gateway timeout response (`504 Gateway Timeout`).

#### **Case 10: Idempotent Payment Request Retries**

- **Scenario**: Client submits a transfer, but network drops before receiving HTTP response. Client retries the identical request with the same `Idempotency-Key` or transaction reference.
- **Challenge**: Verify that duplicate requests with the same idempotency key do not execute a second debit, but return the original transaction result.

---

### 📍 Category 6: Mobile Web Hybrid & Native Bridge Testing

#### **Case 11: Mobile WebView JSBridge Native Feature Mocking**

- **Flow**: `Playwright / E2E Runner` ➔ `Mobile WebView Website (Mocked JSBridge)` ➔ `window.JSBridge` ➔ `BFF Service`
- **Challenge**: Simulate a hybrid mobile app container in web browsers. Inject mock `window.JSBridge` native objects (e.g. `getNativeDeviceInfo()`, `requestBiometricAuth()`, `openNativeCamera()`) to verify mobile WebApp behavior without requiring physical iOS/Android builds.
- **Key Assertions**:
  - `window.JSBridge.getNativeDeviceInfo()` resolves with mock device metadata (`{ platform: "iOS", appVersion: "2.4.0" }`).
  - Biometric trigger sends verified payload to `BFF Service`.
  - Application handles fallback gracefully when `window.JSBridge` is undefined.

---

## 🛠️ Practical Hands-on Workshop Matrix

| Exercise | Practical Activity | Primary Commands / Tools |
| :--- | :--- | :--- |
| **Ex 1** | **Build & Sync Microservices** | `make sync && make build` |
| **Ex 2** | **Run Service Unit Tests** | `make test` |
| **Ex 3** | **Spin Up Docker Ecosystem** | `make setup` |
| **Ex 4** | **Run Integration Tests** | `make test-integration` |
| **Ex 5** | **Run Playwright E2E Tests** | `make test-e2e` |
| **Ex 6** | **WireMock Fault Injection** | Open WireMock GUI at `http://localhost:8088/__admin/` |
| **Ex 7** | **MITM Traffic Inspection** | Configure Burp Suite Proxy at `http://127.0.0.1:8080` |
