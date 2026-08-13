# Bank Account Service

Domain service responsible for managing financial accounts and balances.

## 🚀 Features

- **PostgreSQL**: Persists account data when a database is configured.
- **Local fallback**: Supports local development with the configured database environment variables.
- **eBPF Instrumented**: Metrics and traces collected via Grafana Beyla.

## 📡 API Endpoints

- `GET /accounts`: List all bank accounts.
- `GET /accounts/{id}`: Get details for a specific account.
- `POST /accounts`: Create a new account.
- `PATCH /accounts/{id}`: Update balance/details.
- `DELETE /accounts/{id}`: Close an account.

## 🛠️ Configuration

| Variable | Description |
|----------|-------------|
| `DB_HOST` | PostgreSQL host |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `DB_NAME` | Database name |
| `PORT` | Listening port (default 8080) |
