# BFF Service (Backend-for-Frontend)

The BFF service acts as the orchestration layer for the application, aggregating data from downstream services to provide a unified API.

## 🚀 Features
- **Data Aggregation**: Combines user info and bank account details into a single `UserDetail` response.
- **Go 1.25+**: Uses the standard library `net/http` for high performance.
- **eBPF Instrumented**: Automatically observed by Grafana Beyla.

## 📡 API Endpoints
- `GET /api/v1/users/{id}`: Returns user profile and all associated bank accounts.
- `POST /api/v1/users`: Proxy to create a new user.
- `POST /api/v1/accounts`: Proxy to create a new bank account.
- `POST /api/v1/ekycs/verify`: Proxy to perform eKYC verification.
- `GET /api/v1/ekycs/{id}`: Proxy to fetch eKYC verification status.
- `POST /api/v1/transfers`: Proxy to execute fund transfers.
- `GET /api/v1/transfers`: Proxy to list all fund transfers.
- `GET /api/v1/transfers/{id}`: Proxy to fetch fund transfer details.
- `POST /auth/paotang/callback`: Proxy for Paotang Pass OAuth callback.
- `POST /auth/otp/verify`: Proxy for OTP code verification.
- `GET /health`: Standard health check.

## 🛠️ Configuration
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Listening port | `8080` |
| `USER_SERVICE_URL` | Internal URL for user-service | `http://user-service.app.svc.cluster.local` |
| `BANK_ACCOUNT_SERVICE_URL` | Internal URL for bank-account-service | `http://bank-account-service.app.svc.cluster.local` |
| `EKYC_SERVICE_URL` | Internal URL for ekyc-service | `http://ekyc-service.app.svc.cluster.local` |
| `TRANSFER_SERVICE_URL` | Internal URL for transfer-service | `http://transfer-service.app.svc.cluster.local` |
