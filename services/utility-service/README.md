# Utility Service

Local workshop utility service for destructive data maintenance tasks.

## API endpoints

- `POST /reset`: Restore the workshop database to its seeded users, accounts, eKYC records, and transfer.
- `GET /health`: Health check.

## Configuration

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Listening port | `8086` |
| `DB_HOST` | PostgreSQL host | unset |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | PostgreSQL user | unset |
| `DB_PASSWORD` | PostgreSQL password | unset |
| `DB_NAME` | PostgreSQL database | unset |
