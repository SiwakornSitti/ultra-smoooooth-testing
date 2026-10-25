# SMS Gateway: Validating Thai Mobile Numbers

### Validate operator format conventions with Jayway JSONPath before dispatching SMS OTP tokens

---

### Specification & Rule Matrix

| Architectural Component | Rule / Operational Specification |
| :--- | :--- |
| **Mobile Prefix RegEx** | Pattern `^0[689]\d{8}$` covers all AIS, TrueMove H, and Dtac cellular prefixes. |
| **Landline Rejection** | Landline numbers (`02...`) or international codes are automatically unmatched (404). |
| **Recipient Echoing** | `{{jsonPath request.body '$.recipient'}}` echoes the dialed number back into response. |
| **Dynamic Nonce** | `{{randomValue type='UUID'}}` generates tracking reference without database sequences. |

---

### Architectural Rules
- **Mobile Prefix RegEx**: Pattern `^0[689]\d{8}$` covers all AIS, TrueMove H, and Dtac cellular prefixes.
- **Landline Rejection**: Landline numbers (`02...`) or international codes are automatically unmatched (404).
- **Recipient Echoing**: `{{jsonPath request.body '$.recipient'}}` echoes the dialed number back into response.
- **Dynamic Nonce**: `{{randomValue type='UUID'}}` generates tracking reference without database sequences.

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| Verification | `Asserted` | ✨ Pro Tip: Eliminates vendor SMS quota charges in automated suites |

> 💡 **Production Pattern:** Pro Tip: Eliminates vendor SMS quota charges in automated suites

### Presenter Notes

- Highlight the regex pattern `/^0[689]\d{8}$/`: covers TrueMove, AIS, and Dtac Thai prefixes.
- Mention `{{jsonPath request.body '$.recipient'}}`: echoes the dialed number back into response for client assertions.
