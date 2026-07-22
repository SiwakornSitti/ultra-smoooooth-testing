# User Service

Domain service responsible for managing user profiles and metadata.

## 🚀 Features
- **Direct Cloud SQL Connection**: Uses the **Cloud SQL Go Connector** (no proxy sidecar).
- **Workload Identity**: Authenticates to GCP via the `app-sa` Kubernetes Service Account.
- **PostgreSQL**: Persists data to a Cloud SQL PostgreSQL instance.

## 📡 API Endpoints
- `GET /users`: List all registered users.
- `GET /users/{id}`: Fetch a specific user.
- `POST /users`: Create a new user.
- `PUT /users/{id}`: Update user information.
- `DELETE /users/{id}`: Remove a user.

## 🛠️ Configuration
| Variable | Description |
|----------|-------------|
| `DB_HOST` | Cloud SQL Instance Connection Name |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `DB_NAME` | Database name |
| `PORT` | Listening port (default 8080) |
