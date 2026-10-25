# Practice Lab 3: Flapping Retry & Self-Healing

### Observe transient service outages and verify client exponential backoff recovery

---

### Lab Configuration & Acceptance Criteria

| Test Case / Condition | Expected Behavior & Status |
| :--- | :--- |
| **Attempt 1 & 2 (Flapping)** | ** Service is temporarily overloaded ➔ WireMock returns `HTTP 503 Service Unavailable` with `Retry-After: 1` header. |
| **Attempt 3 (Self-Healing)** | ** State transitions to `HEALTHY` ➔ WireMock returns `HTTP 200 OK {"status": "SUCCESS"}`. |
| **Client Assertion** | ** Validates that client retry middleware recovers gracefully without throwing unhandled exceptions. |

---

### Hands-On Verification Commands

```bash
# Attempt 1: Returns HTTP 503 Service Unavailable
curl -s -i http://localhost:8088/lab/api/unstable-endpoint
# Attempt 2: Returns HTTP 503 Service Unavailable
curl -s -i http://localhost:8088/lab/api/unstable-endpoint
# Attempt 3: Returns HTTP 200 OK {"status": "SUCCESS"}
curl -s -i http://localhost:8088/lab/api/unstable-endpoint
```

---

### Step-by-Step Lab Execution Checklist
- [ ] Open the WireMock Web UI dashboard and inspect current registered stub mappings.
- [ ] Execute the test commands from your terminal; confirm receipt of the expected HTTP status codes.
- [ ] Inspect the Request Journal to view real-time request diffs and assertion results.
- [ ] Reset WireMock scenarios via `POST /__admin/scenarios/reset` to verify state clean-up.



### Presenter Notes

- Run the 3 curl commands in rapid succession.
- Point out the Retry-After header and show how the scenario step automatically advances on each request.
