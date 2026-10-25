# Computed Values & Date Offsets

### Calculate dynamic arithmetic totals and future ISO expiry dates directly in stubs

---

### Specification & Rule Matrix

| Architectural Component | Rule / Operational Specification |
| :--- | :--- |
| **Dynamic Thai VAT** | `{{math price '*' 0.07}}` computes 7% tax from incoming request price. |
| **Total Calculation** | `{{math price '*' 1.07}}` computes grand total without hardcoding fixtures. |
| **Future Expiry Offsets** | `{{now offset='2 hours'}}` generates guaranteed valid expiration windows. |
| **Immune to Clock Skew** | Midnight and month rollover tests never fail due to expired dates. |

---

### Architectural Rules
- **Dynamic Thai VAT**: `{{math price '*' 0.07}}` computes 7% tax from incoming request price.
- **Total Calculation**: `{{math price '*' 1.07}}` computes grand total without hardcoding fixtures.
- **Future Expiry Offsets**: `{{now offset='2 hours'}}` generates guaranteed valid expiration windows.
- **Immune to Clock Skew**: Midnight and month rollover tests never fail due to expired dates.

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| Verification | `Asserted` | ✨ Native Math: No test runner recalculation needed |

> 💡 **Production Pattern:** Native Math: No test runner recalculation needed

### Presenter Notes

- Explain math helper: extracts price from request body, calculates 7% Thai VAT, and computes final total on the fly.
- Mention `now offset='2 hours'`: test clients asserting token expiration receive valid future dates regardless of when test executes.
