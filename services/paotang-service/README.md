# Paotang Service

Internal HTTP core service used by `user-service` to exchange Paotang OAuth authorization codes for access tokens through the configured provider, such as WireMock in local development.

## Endpoints

- `POST /oauth/token`: Exchanges an auth code for an access token.
- `GET /health`: Health check.

## Configuration

| Variable | Description | Default |
|---|---|---|
| `PORT` | Listening port | `8080` |
| `PAOTANG_UPSTREAM_URL` | Paotang provider base URL | `http://wiremock:8080` |
| `PAOTANG_API_KEY` | Provider API key | unset |
