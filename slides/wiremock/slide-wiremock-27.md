# Scenario Steering: Multi-Service Mocks

### Steer multiple downstream microservices independently across E2E tests from a single HTTP header

---

### Specification & Rule Matrix

| Architectural Component | Rule / Operational Specification |
| :--- | :--- |
| **The Challenge** | Test A needs expired token + valid payment; Test B needs valid token + failing OTP. Deploying separate mocks creates infrastructure sprawl. |
| **Comma-Separated Headers** | E2E test sends `Mock-Scenario: PAOTANG:EXPIRED,OTP:FLAKY` in a single request. |
| **contains Matching** | WireMock evaluates `contains: "PAOTANG:EXPIRED"`, ignoring other scenario flags. |
| **Zero Code Changes** | Microservices propagate standard tracing headers without mock coupling. |

---

### Architectural Rules
- **The Challenge**: Test A needs expired token + valid payment; Test B needs valid token + failing OTP. Deploying separate mocks creates infrastructure sprawl.
- **Comma-Separated Headers**: E2E test sends `Mock-Scenario: PAOTANG:EXPIRED,OTP:FLAKY` in a single request.
- **contains Matching**: WireMock evaluates `contains: "PAOTANG:EXPIRED"`, ignoring other scenario flags.
- **Zero Code Changes**: Microservices propagate standard tracing headers without mock coupling.

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| Verification | `Asserted` | ✨ Header Injection: Propagates through API gateways transparently |

> 💡 **Production Pattern:** Header Injection: Propagates through API gateways transparently

### Presenter Notes

- Explain the multi-service dilemma: In complex checkout flows, one test needs expired token but valid payment; another needs valid token but failing OTP.
- The solution: Comma-separated Mock-Scenario header with `contains` operator steers each mock independently.
