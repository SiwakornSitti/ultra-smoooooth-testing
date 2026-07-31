# Integration Testing Cases

1. **Paotang authcode exchange**
   - Verify BFF-to-user-service forwarding.
   - Mock a successful token exchange and an invalid grant.
   - Assert the status code and access-token response.

2. **OTP verification**
   - Verify the success and invalid-OTP paths.
   - Confirm `Mock-Scenario` reaches the downstream WireMock mapping.
   - Assert that the frontend enables OTP verification only after authcode success.

3. **Create user through the BFF**
   - Send a valid user payload through the website or BFF.
   - Verify persistence in PostgreSQL.
   - Test missing fields and duplicate input handling.

4. **Account creation with asynchronous SMS**
   - Create an account with `SMS:SUCCESS`.
   - Repeat with `SMS:INVALID_NUMBER` and `SMS:UNAVAILABLE`.
   - Verify account creation remains successful while notification delivery fails.

5. **Notification header propagation**
   - Send `Mock-Scenario` and `Mock-ID` with the account request.
   - Verify headers are copied into the RabbitMQ command and SMS request.
   - Confirm the same mock ID appears in the provider response or logs.

6. **BFF aggregation**
   - Fetch user details and accounts through one BFF request.
   - Verify the combined response shape.
   - Test an empty account list and a downstream service failure.

7. **Transfer with sufficient funds**
   - Create a transfer between two accounts.
   - Verify the transfer record and both balance changes.
   - Confirm the response includes the created transfer identifier.

8. **Transfer with insufficient funds**
   - Submit a transfer larger than the source balance.
   - Assert a `400` response.
   - Verify no partial balance or transfer update occurred.

9. **Concurrent transfer requests**
   - Send two transfers simultaneously against the same balance.
   - Verify only one request succeeds.
   - Confirm the final balance is correct.

10. **Stateful token replay**
    - Run a successful authcode exchange once.
    - Replay the same scenario and request.
    - Verify the replay is rejected by the stateful WireMock mapping.

11. **Fallback routing**
    - Send a request with a matching `Mock-Scenario` header.
    - Send the same request without the header.
    - Verify the first request uses a mock and the second uses the real-service fallback.

12. **Downstream timeout and recovery**
    - Add a WireMock response delay.
    - Verify the caller returns a controlled timeout or gateway error.
    - Remove the delay and confirm the workflow recovers.
