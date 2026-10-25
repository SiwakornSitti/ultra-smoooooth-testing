# Practice Lab 1: Web UI & JSONPath Matching

### Inspect live stub mappings and verify JSONPath threshold evaluation

---

### Lab Configuration & Acceptance Criteria

> 🌐 **Dashboard:** `http://localhost:8088/__admin/webapp (admin / password)`

| Test Case / Condition | Expected Behavior & Status |
| :--- | :--- |
| **High-Value (> 1000)** | ** When payment amount is > 1000, WireMock matches `$[?(@.payment.amount > 1000)]` ➔ Returns `201 Created`. |
| **Low-Value (≤ 1000)** | ** When amount is 500, no stub matches ➔ Returns `404 Not Found`. |
| **Web UI Journal** | ** Inspect unmatched diffs in the live dashboard journal. |

---

### Hands-On Verification Commands

```bash
# Test Case 1: High-value (> 1000) ➔ 201 Created
curl -s -X POST http://localhost:8088/lab/api/stateless/payments \
-H "Content-Type: application/json" \
-d '{"payment":{"amount":2500},"customer":{"name":"Alice"}}'
# Test Case 2: Low-value (500) ➔ 404 Unmatched
curl -s -X POST http://localhost:8088/lab/api/stateless/payments \
-H "Content-Type: application/json" \
-d '{"payment":{"amount":500},"customer":{"name":"Bob"}}'
```

---

### Step-by-Step Lab Execution Checklist
- [ ] Open the WireMock Web UI dashboard and inspect current registered stub mappings.
- [ ] Execute the test commands from your terminal; confirm receipt of the expected HTTP status codes.
- [ ] Inspect the Request Journal to view real-time request diffs and assertion results.
- [ ] Reset WireMock scenarios via `POST /__admin/scenarios/reset` to verify state clean-up.



### Presenter Notes

- Guide attendees to open http://localhost:8088/__admin/webapp in browser.
- Run curl Case 1 (201 Created), then curl Case 2 (404 Not Found).
- In Web UI, click on unmatched request and show the JSONPath failure diff.
