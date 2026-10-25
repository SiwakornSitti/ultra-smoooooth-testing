# Practice Lab 2: Scenario Steering & Token Replay

### Execute multi-scenario steering and verify one-time authorization code replay defense

---

### Lab Configuration & Acceptance Criteria

| Test Case / Condition | Expected Behavior & Status |
| :--- | :--- |
| **First Call (Exchange)** | ** Code `auth_code_12345` exchanges successfully ➔ Returns `200 OK` with JWT and transitions state to `TOKEN_CONSUMED`. |
| **Second Call (Replay Attack)** | ** Re-sending the same code ➔ WireMock detects consumed state and returns `400 Bad Request` with `{"error": "invalid_grant"}`. |
| **Reset** | ** Single HTTP POST resets scenario back to clean state. |

---

### Hands-On Verification Commands

```bash
# Call 1: Consume code ➔ 200 OK (JWT)
curl -s -X POST http://localhost:8088/lab/api/oauth/token \
-d "grant_type=authorization_code&code=auth_code_12345"
# Call 2: Replay attack ➔ 400 Bad Request
curl -s -X POST http://localhost:8088/lab/api/oauth/token \
-d "grant_type=authorization_code&code=auth_code_12345"
# Reset scenario state for next test
curl -s -X POST http://localhost:8088/__admin/scenarios/reset
```

---

### Step-by-Step Lab Execution Checklist
- [ ] Open the WireMock Web UI dashboard and inspect current registered stub mappings.
- [ ] Execute the test commands from your terminal; confirm receipt of the expected HTTP status codes.
- [ ] Inspect the Request Journal to view real-time request diffs and assertion results.
- [ ] Reset WireMock scenarios via `POST /__admin/scenarios/reset` to verify state clean-up.



### Presenter Notes

- Emphasize the security vulnerability: Replay attacks are difficult to test against real staging OAuth providers because reset requires manual db wipes.
- Show how WireMock's FSM makes this deterministic: 1 call consumes, 2nd call blocks.
