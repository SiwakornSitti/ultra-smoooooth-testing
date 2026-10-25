# Practice Lab 4: Dynamic Templating & Chaos Latency

### Execute dynamic VAT calculations and verify client timeout cancellation handlers

---

### Lab Configuration & Acceptance Criteria

| Test Case / Condition | Expected Behavior & Status |
| :--- | :--- |
| **Dynamic Math** | ** Send order payload with `price: 4000` ➔ WireMock computes 7% VAT dynamically: `{{math price '*' 1.07}}` ➔ Returns total `4280.0`. |
| **Chaos Delay** | ** Call delayed route configured with `fixedDelayMilliseconds: 3500`. |
| **Timeout Assertion** | ** Verify client cancels after 2s (`context.WithTimeout`) without leaking worker goroutines. |

---

### Hands-On Verification Commands

```bash
# Test Case 1: Dynamic VAT calculation (4000 ➔ 4280)
curl -s -X POST http://localhost:8088/lab/api/stateless/orders \
-H "Content-Type: application/json" \
-d '{"userId":"U-100","price":4000}'
# Test Case 2: Assert client timeout aborts at 2s
time curl -s --max-time 2 \
http://localhost:8088/lab/api/stateless/slow-endpoint
```

---

### Step-by-Step Lab Execution Checklist
- [ ] Open the WireMock Web UI dashboard and inspect current registered stub mappings.
- [ ] Execute the test commands from your terminal; confirm receipt of the expected HTTP status codes.
- [ ] Inspect the Request Journal to view real-time request diffs and assertion results.
- [ ] Reset WireMock scenarios via `POST /__admin/scenarios/reset` to verify state clean-up.



### Presenter Notes

- Highlight the math helper: `math price '*' 1.07` eliminates hardcoded test values.
- Point out the `time curl --max-time 2` output: it terminates exactly at 2.0s rather than waiting 3.5s.
