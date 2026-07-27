# Notification Service

Internal delivery adapter for SMS notifications. It consumes notification commands from RabbitMQ and forwards them to the configured SMS provider, such as WireMock in local development.

## API endpoints

- `GET /health`: Health check.

### Queue command

```json
{
  "channel": "sms",
  "to": "+66800000000",
  "message": "Your account has been created.",
  "headers": {
    "Mock-Scenario": "SMS:SUCCESS",
    "Mock-ID": "mock-123"
  }
}
```

`channel` defaults to `sms`; `to` and `message` are required. Command headers, including `Mock-Scenario`, `Mock-ID`, and correlation headers, are forwarded to the SMS provider. Successfully delivered commands are acknowledged; invalid or failed commands are rejected.

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Listening port | `8086` |
| `RABBITMQ_URL` | RabbitMQ connection URL | unset |
| `NOTIFICATION_QUEUE` | Queue consumed by the service | `notification.commands` |
| `SMS_SERVICE_URL` | SMS provider base URL | unset |
| `SMS_API_KEY` | SMS provider API key | unset |

## Run locally

```bash
go run .
```
