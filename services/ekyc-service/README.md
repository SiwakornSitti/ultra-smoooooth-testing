# eKYC Service

Domain service responsible for creating and retrieving electronic identity-verification records.

## Features

- Persists verification records in PostgreSQL when database configuration is available.
- Falls back to an in-memory store for local runs without PostgreSQL.
- Creates approved verification records with a confidence score for the workshop flow.

## API endpoints

- `POST /ekycs/verify`: Create an eKYC verification record.
- `GET /ekycs`: List all eKYC verification records.
- `GET /ekycs/{id}`: Get a verification record by ID.
- `PATCH /ekycs/{id}`: Partially update a verification record.
- `DELETE /ekycs/{id}`: Delete a verification record.
- `GET /health`: Health check.

### Create verification

```json
{
  "customer_id": "customer-1",
  "national_id": "1234567890123",
  "full_name": "Jane Doe",
  "document_type": "national_id"
}
```

`customer_id`, `national_id`, and `full_name` are required. `document_type` defaults to `national_id`.

PATCH requests may include any of `customer_id`, `national_id`, `full_name`, `document_type`, `status`, or `confidence_score`. Omitted fields remain unchanged.

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Listening port | `8084` |
| `DB_HOST` | PostgreSQL host; unset uses in-memory storage | unset |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | PostgreSQL user | unset |
| `DB_PASSWORD` | PostgreSQL password | unset |
| `DB_NAME` | PostgreSQL database | unset |

## Run locally

```bash
go run .
```
