# 🧪 Lab: Stateless Stubbing & Pattern Matching with WireMock

Welcome to the **WireMock Stateless Stubbing Lab**! This lab provides a hands-on guide and test suite for mastering stateless request matching, priority overrides, body/header filtering, and dynamic Handlebars response templating in **WireMock**.

---

## 🎯 Purpose & Objectives

Stateless stubs form the backbone of microservice test doubles. Unlike stateful scenarios, stateless stubs always return a pre-configured response whenever an incoming HTTP request satisfies specific matching criteria (path, query params, headers, or body patterns).

Key learning objectives:
1. **Request Matching Criteria**: Matching by exact URL path (`urlPath`), query parameters (`queryParameters`), headers (`equalTo`, `matches`), and JSONPath body attributes (`matchesJsonPath`).
2. **Priority Overrides**: Controlling stub precedence using the `priority` attribute (lower integer = higher priority).
3. **Dynamic Response Templating**: Interpolating request data (headers, query string, path parameters) into the response using Handlebars templates (`response-template`).
4. **Latency & Fault Simulation**: Injecting artificial delays (`fixedDelayMilliseconds`) and custom HTTP error status codes.

---

## 🔑 Request Matching Techniques

WireMock supports multiple matching algorithms:

| Matching Technique | WireMock JSON Pattern | Description |
| :--- | :--- | :--- |
| **Exact Path** | `"urlPath": "/api/users"` | Matches exact HTTP URL path regardless of query parameters. |
| **Regex Path** | `"urlPathPattern": "/api/users/.*"` | Regular expression matching on the URL path. |
| **Query Parameters** | `"queryParameters": { "role": { "equalTo": "admin" } }` | Matches specific key-value query parameters. |
| **Header Matching** | `"headers": { "Authorization": { "matches": "Bearer .*" } }` | Validates HTTP headers via regex or exact value. |
| **JSONPath Body** | `"matchesJsonPath": "$.payment[?(@.amount > 1000)]"` | Evaluates JSONPath expressions against the request payload. |

---

## 📚 Lab Scenarios Overview

### Scenario 1: Path & Query Parameter Matching
- **Endpoint**: `GET /lab/api/stateless/users?role=admin&status=active`
- **Behavior**: Matches only when query parameters `role=admin` AND `status=active` are supplied. Returns `200 OK`.

### Scenario 2: JSONPath Body Matching
- **Endpoint**: `POST /lab/api/stateless/payments`
- **Behavior**: Evaluates JSON payload using JSONPath expression `$.payment[?(@.amount > 1000)]`. High-value payments (>1000) return `201 Created` with `"flag": "HIGH_VALUE_TRANSACTION"`.

### Scenario 3: Header Regex Matching
- **Endpoint**: `POST /lab/api/stateless/secure`
- **Behavior**: Matches `Authorization` header against regex `Bearer secret-token-[0-9]+` and `X-Client-ID: qa-client`. Returns `200 OK`.

### Scenario 4: Priority-Based Overriding
- **Endpoint**: `GET /lab/api/stateless/products/vip`
- **Behavior**: A specific mapping with `"priority": 1` overrides a catch-all mapping with `"priority": 10`.

### Scenario 5: Dynamic Handlebars Response Templating
- **Endpoint**: `GET /lab/api/stateless/echo/{id}?name={name}`
- **Behavior**: Uses the `response-template` transformer to echo back path parameters (`{{request.path.[4]}}`), headers (`{{request.headers.X-Request-ID}}`), and query params (`{{request.query.name}}`).

### Scenario 6: Latency & Delay Injection
- **Endpoint**: `GET /lab/api/stateless/slow-endpoint`
- **Behavior**: Specifies `"fixedDelayMilliseconds": 500` to simulate network latency or slow backend processing.

### Scenario 7: Catch-All Fallback Stub
- **Endpoint**: `GET /lab/api/stateless/.*`
- **Behavior**: Catch-all stub (`"priority": 10`) returning `404 Not Found` for any unmatched stateless lab routes.

---

## 🚀 Running the Lab

### 1. Automated Execution (Playwright & Testcontainers)

Execute the lab test suite via npm or Makefile:

```bash
# Using Makefile from workspace root
make test-lab

# Or using npm from tests directory
cd tests
npm run test:lab
```

### 2. Manual Testing via cURL

Start the WireMock service:
```bash
docker compose up --build wiremock
```

Try the dynamic Handlebars response templating:
```bash
curl -H "X-Request-ID: req-999" "http://localhost:8088/lab/api/stateless/echo/item-42?name=Alice"
```
**Output**:
```json
{
  "extracted_path_id": "item-42",
  "echo_header": "req-999",
  "query_name": "Alice"
}
```

---

## 📂 File Structure

```
labs/wiremock-stateless/
└── README.md                         # This lab guide

wiremock/mappings/lab-stateless/
├── 01-path-and-query.json            # Query parameter matching
├── 02-json-body-matching.json        # JSONPath body matching
├── 03-header-matching.json           # Header regex matching
├── 04-priority-override.json         # Priority overriding
├── 05-response-templating.json       # Handlebars response templating
├── 06-delayed-response.json          # Fixed delay latency injection
└── 07-fallback-catchall.json         # Priority 10 catch-all fallback

tests/specs/labs/
├── wiremock-stateful.spec.ts         # Stateful stub lab tests
└── wiremock-stateless.spec.ts        # Stateless stub lab tests
```
