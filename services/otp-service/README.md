# OTP Service

Internal HTTP core service used by `user-service` to verify One-Time Passwords (OTP) through the configured provider, such as WireMock in local development.

## Endpoints

- `POST /otp/verify`: Verifies an OTP code for a phone number.
- `GET /health`: Health check.

## Configuration

| Variable | Description | Default |
|---|---|---|
| `PORT` | Listening port | `8080` |
| `OTP_UPSTREAM_URL` | OTP provider base URL | `http://wiremock:8080` |
| `OTP_API_KEY` | Provider API key | unset |
