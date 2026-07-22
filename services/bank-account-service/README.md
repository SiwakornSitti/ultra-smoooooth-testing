# Bank Account Service

Domain service responsible for managing financial accounts and balances.

## 🚀 Features
- **Direct Cloud SQL Connection**: Uses the **Cloud SQL Go Connector** (no proxy sidecar).
- **Workload Identity**: Authenticates to GCP via IAM-based database connection.
- **eBPF Instrumented**: Metrics and traces collected via Grafana Beyla.

## 📡 API Endpoints
- `GET /accounts`: List all bank accounts.
- `GET /accounts/{id}`: Get details for a specific account.
- `POST /accounts`: Create a new account.
- `PUT /accounts/{id}`: Update balance/details.
- `DELETE /accounts/{id}`: Close an account.

## 🛠️ Configuration
| Variable | Description |
|----------|-------------|
| `DB_HOST` | Cloud SQL Instance Connection Name |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `DB_NAME` | Database name |
| `PORT` | Listening port (default 8080) |
