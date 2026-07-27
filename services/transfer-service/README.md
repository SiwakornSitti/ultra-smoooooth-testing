# Transfer Service

Domain service responsible for moving money between bank accounts and recording fund transfers.

## Features

- Persists transfers in PostgreSQL when database configuration is available.
- Falls back to an in-memory store for local runs without PostgreSQL.
- Debits the source account and credits the target account in the same database transaction as the transfer record.
- Rejects missing accounts, currency mismatches, and insufficient funds without changing balances.
- Returns a `Location` header when a transfer is created.

## API endpoints

- `POST /transfers`: Create a completed fund transfer.
- `GET /transfers`: List transfers.
- `GET /transfers/{id}`: Get a transfer by ID.
- `GET /health`: Health check.

### Create transfer

```json
{
  "source_account_id": "account-1",
  "target_account_id": "account-2",
  "amount": 100,
  "currency": "THB"
}
```

`source_account_id`, `target_account_id`, and a positive `amount` are required. `currency` defaults to `THB`. Source, target, and transfer currencies must match. Transfers are immutable after creation.

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Listening port | `8085` |
| `DB_HOST` | PostgreSQL host; unset uses in-memory storage | unset |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | PostgreSQL user | unset |
| `DB_PASSWORD` | PostgreSQL password | unset |
| `DB_NAME` | PostgreSQL database | unset |

## Run locally

```bash
go run .
```
