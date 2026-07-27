# User Service

Domain service responsible for managing user profiles and metadata.

## 🚀 Features

- **PostgreSQL**: Persists user data when a database is configured.
- **Local fallback**: Supports local development with the configured database environment variables.

## 📡 API Endpoints

- `GET /users`: List all registered users.
- `GET /users/{id}`: Fetch a specific user.
- `POST /users`: Create a new user.
- `PATCH /users/{id}`: Update user information.
- `DELETE /users/{id}`: Remove a user.

## 🛠️ Configuration

| Variable | Description |
|----------|-------------|
| `DB_HOST` | PostgreSQL host |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `DB_NAME` | Database name |
| `PORT` | Listening port (default 8080) |
| `PAOTANG_SERVICE_URL` | Paotang endpoint (default `http://localhost:8088`) |
| `OTP_SERVICE_URL` | OTP endpoint (default `http://localhost:8088`) |
