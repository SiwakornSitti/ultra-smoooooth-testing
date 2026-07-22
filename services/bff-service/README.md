# BFF Service (Backend-for-Frontend)

The BFF service acts as the orchestration layer for the application, aggregating data from downstream services to provide a unified API.

## 🚀 Features
- **Data Aggregation**: Combines user info and bank account details into a single `UserDetail` response.
- **Go 1.25+**: Uses the standard library `net/http` for high performance.
- **eBPF Instrumented**: Automatically observed by Grafana Beyla.

## 📡 API Endpoints
- `GET /api/users/{id}`: Returns user profile and all associated bank accounts.
- `POST /api/users`: Proxy to create a new user.
- `GET /health`: Standard health check.

## 🛠️ Configuration
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Listening port | `8080` |
| `USER_SERVICE_URL` | Internal URL for user-service | `http://user-service` |
| `ACCOUNT_SERVICE_URL` | Internal URL for bank-account-service | `http://bank-account-service` |
