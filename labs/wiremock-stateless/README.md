# 🧪 Lab: Stateless Stubbing & Pattern Matching with WireMock

Welcome to the **WireMock Stateless Stubbing Lab**! This lab provides a hands-on guide and test suite for mastering stateless request matching, priority overrides, body/header filtering, and dynamic Handlebars response templating in **WireMock**.

---

## 🎯 Purpose & Objectives

Stateless stubs form the backbone of microservice test doubles. Unlike stateful scenarios, stateless stubs always return a pre-configured response whenever an incoming HTTP request satisfies specific matching criteria (path, query params, headers, or body patterns).

Key learning objectives:

1. **Request Matching Criteria**: Matching by exact URL path (`urlPath`), query parameters (`queryParameters`), headers (`equalTo`, `matches`), and JSONPath body attributes (`matchesJsonPath`).
2. **Priority Overrides**: Controlling stub precedence using the `priority` attribute (lower integer = higher priority).
3. **Dynamic Response Templating**: Interpolating request data (headers, query string, path parameters) into the response using Handlebars templates (`response-template`).
4. **Transformer Helpers**: Reading JSONPath values, generating random values, and adding timestamps with the built-in `response-template` transformer.
5. **Faker Data**: Generating realistic names, contact details, company names, and UUIDs with the WireMock Faker extension.
6. **Latency & Fault Simulation**: Injecting artificial delays (`fixedDelayMilliseconds`) and custom HTTP error status codes.

---

## 🧭 How to Learn with This Lab

1. Start WireMock with `docker compose up --build wiremock`.
2. Read the scenarios in order and inspect the matching JSON under `wiremock/mappings/lab-stateless/`.
3. Open the numbered `.http` file for the scenario you want to run with the VS Code REST Client extension.
4. Compare each response with the matcher, delay, proxy, webhook, and body-file behavior described in the scenario.

Each numbered stateless scenario has its own REST Client file, matching the mapping name: [`01-path-and-query.http`](./01-path-and-query.http), [`02-json-body-matching.http`](./02-json-body-matching.http), and so on.

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
- **Behavior**: Combines four JSONPath conditions in one mapping: amount greater than `1000`, customer email presence, required SKU equality, and case-insensitive customer-name regex. Matching requests return `201 Created` with `"flag": "HIGH_VALUE_TRANSACTION"`.
- **Fundamentals**: [Jayway JsonPath](https://github.com/json-path/JsonPath)

JSONPath expressions in this mapping:

| Request field | Expression | Demonstrates |
| :--- | :--- | :--- |
| `payment.amount` | `$.payment[?(@.amount > 1000)]` | Numeric filtering. |
| `customer.email` | `$.customer.email` | Presence matching. |
| `items[].sku` | `$.items[?(@.sku == 'SKU-001')]` | Equality filtering in an array. |
| `customer.name` | `$.customer[?(@.name =~ /^(alice|bob)$/i)]` | Case-insensitive regex matching. |

### Using Jayway JsonPath Directly

The same expressions can be evaluated in Java with the [Jayway JsonPath library](https://github.com/json-path/JsonPath):

```java
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;

String requestBody = """
    {
      "payment": { "amount": 2500 },
      "customer": {
        "email": "alice@example.com",
        "name": "Alice"
      },
      "items": [{ "sku": "SKU-001" }]
    }
    """;

DocumentContext json = JsonPath.parse(requestBody);

String email = json.read("$.customer.email", String.class);
Object highValuePayment = json.read("$.payment[?(@.amount > 1000)]");
Object matchingItem = json.read("$.items[?(@.sku == 'SKU-001')]");
Object matchingCustomer = json.read("$.customer[?(@.name =~ /^(alice|bob)$/i)]");
```

`JsonPath.parse(...).read(...)` parses the JSON and evaluates a JSONPath expression. WireMock uses the same style of expression in `matchesJsonPath`.

### Jayway JsonPath Functions

Jayway provides implementation-specific functions at the end of a path:

| Function | Effect |
| :--- | :--- |
| `min()` / `max()` | Find the minimum or maximum number. |
| `avg()` / `stddev()` | Calculate average or standard deviation. |
| `sum()` | Add numeric values. |
| `length()` | Return array length. |
| `first()` / `last()` / `index(X)` | Select array elements. |
| `keys()` | Return object keys. |
| `concat(X)` | Concatenate the path result with another value. |
| `append(X)` | Append a value to the path result array. |

Examples:

```java
String verifiedEmail = json.read(
    "$.concat($.customer.email, '#verified')",
    String.class
);

Object itemsWithExtraSku = json.read(
    "$.items.append('SKU-002')"
);

Double totalAmount = json.read("$.items[*].amount.sum()", Double.class);
```

These functions are Jayway JsonPath extensions; they are not guaranteed to be available in every JSONPath implementation. In this lab they are demonstrated for direct Java JsonPath usage; the current WireMock `matchesJsonPath` matcher should use the filter expressions shown above instead of relying on tail functions such as `sum()` or `append()`.

### Scenario 3: Header Regex Matching

- **Endpoint**: `POST /lab/api/stateless/secure`
- **Behavior**: Combines five header matchers: `Authorization` regex, `X-Client-ID` equality, `X-Request-ID` regex, `X-Client-Role` contains `admin`, and absent `X-Debug`. All conditions must pass.

### Scenario 4: Body File Response

- **Endpoint**: `GET /lab/api/stateless/body-file`
- **Behavior**: Loads the response body from `__files/lab-stateless/body-file-response.json` using `bodyFileName`.

`bodyFileName` is relative to WireMock’s `__files` directory. Docker Compose mounts `./wiremock/__files` to `/home/wiremock/__files`, and the Testcontainers runner copies the same directory into the container.

### Scenario 5: Priority-Based Overriding

- **Endpoint**: `GET /lab/api/stateless/products/vip`
- **Behavior**: A specific mapping with `"priority": 1` overrides a catch-all mapping with `"priority": 10`.

### Scenario 6: Response Template Echo and Helpers

- **Endpoints**: `GET /lab/api/stateless/echo/{id}?name={name}` and `POST /lab/api/stateless/template-helpers`
- **Behavior**: One mapping uses the `response-template` transformer to echo path/header/query values and demonstrate `jsonPath`, `randomValue`, and `now` helpers.

The lab uses the built-in transformer. Custom `ResponseDefinitionTransformer` and `ResponseTransformer` implementations require a WireMock extension JAR registered with `--extensions` before a mapping can reference its transformer name. A custom mapping can then pass values through `transformerParameters`:

```json
{
  "response": {
    "status": 200,
    "body": "transformed",
    "transformers": ["my-transformer"],
    "transformerParameters": {
      "mode": "compact"
    }
  }
}
```

`ServeEventListener` and webhooks are useful for post-request side effects, but they do not transform the response returned to the caller.

### Scenario 7: Faker Response Template

- **Endpoint**: `GET /lab/api/stateless/faker-user`
- **Behavior**: Uses the Faker extension's `random` helper through `response-template` to generate a realistic name, email, phone number, company, and UUID for every response.

The lab uses `wiremock-faker-extension-standalone-0.2.0.jar`, registered as `org.wiremock.RandomExtension`. The extension is mounted automatically by Docker Compose and the Testcontainers runner.

Common Faker types:

| Helper | Generates |
| :--- | :--- |
| `{{random 'Name.first_name'}}` | First name |
| `{{random 'Internet.email_address'}}` | Email address |
| `{{random 'PhoneNumber.phone_number'}}` | Phone number |
| `{{random 'Company.name'}}` | Company name |
| `{{random 'Internet.uuid'}}` | UUID |

See the [WireMock Faker Extension documentation](https://wiremock.org/docs/faker-extension/) for the complete data type list.

### Scenario 8: Latency & Delay Injection

- **Endpoint**: `GET /lab/api/stateless/slow-endpoint`
- **Behavior**: Specifies `"fixedDelayMilliseconds": 500` to simulate network latency or slow backend processing.

### Scenario 9: Random Delay Injection

- **Endpoint**: `GET /lab/api/stateless/random-delay`
- **Behavior**: Uses a uniform random delay between `100ms` and `500ms` for each response.

### Scenario 10: Lognormal Delay Injection

- **Endpoint**: `GET /lab/api/stateless/lognormal-delay`
- **Behavior**: Uses a lognormal delay with a `250ms` median, `0.4` sigma, and a `1000ms` maximum to simulate a long-tail latency distribution.

Lognormal delay properties:

| Property | Effect |
| :--- | :--- |
| `type: "lognormal"` | Produces latency with a long-tail distribution. |
| `median: 250` | Targets approximately `250ms` at the 50th percentile. |
| `sigma: 0.4` | Controls variation; higher values create a wider and longer tail. |
| `maxValue: 1000` | Caps the generated delay at `1000ms`. |

The `response.delayDistribution` object controls WireMock. The matching object inside `jsonBody` is only explanatory data returned by the mock.

### Scenario 11: Chunked Dribble Delay

- **Endpoint**: `GET /lab/api/stateless/chunked-delay`
- **Behavior**: Streams the response in `5` chunks over `1000ms`, simulating a slow connection that delivers data progressively.

Chunked dribble properties:

| Property | Effect |
| :--- | :--- |
| `numberOfChunks: 5` | Splits the response into five chunks. |
| `totalDuration: 1000` | Delivers all chunks over approximately `1000ms`. |

### Scenario 12: PokeAPI Mock or Proxy

- **Endpoint**: `GET /lab/api/stateless/pokemon/{name}/`
- **Behavior**: If `Mock-Scenario: POKEAPI:MOCK` matches, priority `1` returns a local mock. Without that header, priority `2` proxies to `https://pokeapi.co/api/v2/pokemon/{name}/` after removing the local `/lab/api/stateless` prefix.

Proxy mappings keep WireMock in front of the external API while forwarding the request path. This is useful for testing a real response shape through a local mock boundary. The route depends on outbound network access from the WireMock container.

### Scenario 13: Stateless Webhook Trigger

- **Trigger**: `POST /lab/api/stateless/webhook-orders`
- **Behavior**: Returns `202 Accepted` with the original `order_id`.

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

Try the response-template helpers:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-Request-ID: req-helper-001" \
  -d '{"customer":{"email":"alice@example.com"}}' \
  http://localhost:8088/lab/api/stateless/template-helpers
```

The `generated_token` and `received_at` fields are generated for each response.

Try the Faker response template:

```bash
curl http://localhost:8088/lab/api/stateless/faker-user
```

Try the PokeAPI proxy:

```bash
curl http://localhost:8088/lab/api/stateless/pokemon/ditto/
```

Try the stateless webhook:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-Correlation-ID: corr-webhook-001" \
  -d '{"order_id":"ord-webhook-001"}' \
  http://localhost:8088/lab/api/stateless/webhook-orders
```

The trigger returns `202 Accepted` with the submitted `order_id`.

Try the body-file response:

```bash
curl http://localhost:8088/lab/api/stateless/body-file
```

---

## 📂 File Structure

```
labs/wiremock-stateless/
├── README.md                         # This lab guide
├── 01-path-and-query.http             # Scenario 1: query parameter matching
├── 02-json-body-matching.http        # Scenario 2: JSONPath body matching
├── 03-header-matching.http           # Scenario 3: combined header matching
├── 04-body-file.http                  # Scenario 4: body-file response
├── 05-priority-override.http          # Scenario 5: priority override
├── 06-response-templating.http        # Scenario 6: response templating
├── 07-faker-response.http             # Scenario 7: Faker response
├── 08-delayed-response.http           # Scenario 8: fixed delay
├── 09-random-delay.http               # Scenario 9: random delay
├── 10-lognormal-delay.http            # Scenario 10: lognormal delay
├── 11-chunked-dribble-delay.http      # Scenario 11: chunked response delay
├── 12-pokeapi-mock.http               # Scenario 12: local PokeAPI mock
├── 13-proxy-pokeapi.http              # Scenario 13: PokeAPI proxy
└── 14-webhook-trigger.http            # Scenario 13: webhook trigger

wiremock/mappings/lab-stateless/
├── 01-path-and-query.json            # Query parameter matching
├── 02-json-body-matching.json        # Combined JSONPath matching
├── 03-header-matching.json           # Combined header matching
├── 04-body-file.json                 # Body file response mapping
├── 05-priority-override.json          # Priority overriding
├── 06-response-templating.json       # Combined echo and template helpers
├── 07-faker-response.json             # Faker-generated response data
├── 08-delayed-response.json           # Fixed delay latency injection
├── 09-random-delay.json               # Uniform random delay injection
├── 10-lognormal-delay.json            # Lognormal long-tail delay injection
├── 11-chunked-dribble-delay.json      # Chunked response delay injection
├── 12-pokeapi-mock.json               # Header-selected local PokeAPI mock
├── 13-proxy-pokeapi.json              # PokeAPI proxy mapping
└── 14-webhook-trigger.json            # Scenario 13: webhook trigger

wiremock/__files/lab-stateless/
└── body-file-response.json             # File-backed response body

tests/specs/labs/
├── wiremock-stateful.spec.ts         # Stateful stub lab tests
└── wiremock-stateless.spec.ts        # Stateless stub lab tests
```
