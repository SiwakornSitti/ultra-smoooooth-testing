# Challenge: Face Biometrics Stub

### Author a self-service biometric verification stub with liveness confidence thresholding

---

### Lab Configuration & Acceptance Criteria

| Test Case / Condition | Expected Behavior & Status |
| :--- | :--- |
| **Low Confidence (Below 85.0)** | ** Return `422 Unprocessable Entity` with JSON error `{"error": "LIVENESS_FAILED", "code": "ERR_LOW_CONFIDENCE"}`. |
| **High Confidence (≥ 85.0)** | ** Return `200 OK` with dynamic UUID `scanId`, echoed `nationalId`, and timestamp. |
| **Chaos Latency** | ** Inject `2500ms` latency to verify client timeout cancellation handlers. |

---

### Hands-On Verification Commands

```bash
# Test Case 1: Low confidence (71.2) ➔ Expect HTTP 422
curl -s -i -X POST http://localhost:8088/lab/api/ekyc/biometrics \
-H "Content-Type: application/json" \
-d '{"nationalId":"1100500123456", "confidence":71.2}'
# Test Case 2: High confidence (92.4) ➔ Expect HTTP 200 + UUID
curl -s -i -X POST http://localhost:8088/lab/api/ekyc/biometrics \
-H "Content-Type: application/json" \
-d '{"nationalId":"1100500123456", "confidence":92.4}'
```

---

### Step-by-Step Lab Execution Checklist
- [ ] Open the WireMock Web UI dashboard and inspect current registered stub mappings.
- [ ] Execute the test commands from your terminal; confirm receipt of the expected HTTP status codes.
- [ ] Inspect the Request Journal to view real-time request diffs and assertion results.
- [ ] Reset WireMock scenarios via `POST /__admin/scenarios/reset` to verify state clean-up.



### Presenter Notes

- Give attendees 15 minutes to implement the stub in wiremock/mappings/diy-biometrics.json.
- Solution reference is available in labs/wiremock-stateless/diy-biometrics.http.
