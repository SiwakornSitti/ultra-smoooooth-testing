# SMS Service

Internal HTTP adapter used by the BFF to deliver SMS messages through the configured provider, such as WireMock in local development.

## Endpoints

- `POST /sms/send`: Sends an SMS request to the configured provider.
- `GET /health`: Health check.

## Configuration

| Variable | Description | Default |
|---|---|---|
| `PORT` | Listening port | `8080` |
| `SMS_UPSTREAM_URL` | SMS provider base URL | `http://wiremock:8080` |
| `SMS_API_KEY` | Provider API key | unset |
