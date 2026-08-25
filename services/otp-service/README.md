# OTP Service

Core microservice that generates and verifies One-Time Passwords (OTP), delegating message delivery to the configured SMS provider (normally WireMock in local Compose).

## Endpoints

- `POST /otp/send`: Generates an OTP code and sends an SMS notification.
- `POST /otp/verify`: Verifies an OTP code for a phone number.
- `GET /health`: Health check.

## Configuration

| Variable | Description | Default |
|---|---|---|
| `PORT` | Listening port | `8080` |
| `SMS_PROVIDER_URL` | SMS provider base URL | `http://wiremock:8080` |
