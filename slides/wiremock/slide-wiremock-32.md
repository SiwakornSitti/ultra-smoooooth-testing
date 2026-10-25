# SMS Gateway: Validating Thai Mobile Numbers: JSON Stub Mapping

### Jayway JSONPath regular expression validating Thai mobile phone operator prefixes

**Mapping Configuration File:** `03-send-success.json`

```json
{
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/otp/sms/send",
    "bodyPatterns": [{
      "matchesJsonPath":
        "$[?(@.recipient =~ /^0[689]\\d{8}$/)]"
    }]
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "status": "DELIVERED",
      "referenceId":
        "{{randomValue type='UUID'}}",
      "sentTo":
        "{{jsonPath request.body '$.recipient'}}"
    },
    "transformers": ["response-template"]
  }
}
```

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| 🟢 POST ... + "recipient": "0812345678" | `200 OK` | Contract expectation fulfilled |
| 🔴 POST ... + "recipient": "02123456" | `404 Unmatched` | Contract expectation fulfilled |
| Verification | `200 OK` | Enforces format rules strictly before acknowledging OTP delivery |

---

### Implementation Highlights
- **Declarative Contract**: Self-contained JSON stub mapping ready for Docker volume mount or Admin API registration.
- **Hermetic Boundary**: Exercises client HTTP serialization, headers, and status code parsers with zero network dependencies.
- **Deterministic Verification**: Strict contract matching guarantees identical test execution in local development and CI pipelines.

> 🔍 Enforces format rules strictly before acknowledging OTP delivery

### Presenter Notes

- Explain JSONPath regex ^0[689]\d{8}$ strictly validating Thai mobile carriers (AIS, True, Dtac).
- Highlight {{jsonPath request.body '$.recipient'}} echoing target phone number for client assertions.
