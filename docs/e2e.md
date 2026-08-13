# E2E Testing Cases

1. **Successful login journey**
   - Open `/login`.
   - Exchange the Paotang auth code.
   - Verify a valid OTP.
   - Confirm the session allows access to `/account` and `/transfer`.

2. **Invalid authcode journey**
   - Select the invalid Paotang scenario.
   - Verify the error appears on the login page.
   - Confirm OTP verification remains disabled.

3. **Invalid OTP journey**
   - Complete the authcode exchange.
   - Select the invalid OTP scenario.
   - Verify the invalid OTP response and remain on the login page.

4. **User and account creation**
   - Create a user from `/account`.
   - Use the returned user ID to create an account.
   - Get the user profile and verify the account response and profile status.

5. **SMS failure journey**
   - Select `SMS:INVALID_NUMBER` or `SMS:UNAVAILABLE`.
   - Create an account.
   - Verify the expected synchronous mock response or asynchronous service-log failure.

6. **Blocked profile journey**
   - Create a blocked user.
   - Get the user profile and verify it displays `BLOCKED`.
   - Confirm the UI preserves the blocked status.

7. **Transfer journey**
   - Create or select source and target accounts.
   - Submit a valid transfer.
   - Verify the completed transfer and updated transfer history.

8. **Insufficient-funds journey**
   - Submit a transfer larger than the source balance.
   - Verify the error is displayed.
   - Confirm no successful transfer is shown in the UI.

9. **Unauthenticated access**
   - Open `/account` or `/transfer` without a login session.
   - Verify the browser redirects to `/login`.

10. **Browser refresh and session behavior**
    - Complete login and refresh the page.
    - Verify the session remains available in the same browser context.
    - Clear session storage and verify protected pages redirect to login.
