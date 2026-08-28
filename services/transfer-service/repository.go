package main

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/exaring/otelpgx"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
)

var (
	db             *sql.DB
	transfersStore = make(map[string]FundTransfer)
	storeMu        sync.RWMutex
)

func initDB() {
	dbHost := os.Getenv("DB_HOST")
	if dbHost == "" {
		slog.Info("DB_HOST not set, using in-memory store for transfer service")
		return
	}
	dbPort := os.Getenv("DB_PORT")
	if dbPort == "" {
		dbPort = "5432"
	}
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))

	config, err := pgx.ParseConfig(connStr)
	if err != nil {
		slog.Warn("Failed to parse DB config, falling back to in-memory store", "error", err)
		return
	}

	config.Tracer = otelpgx.NewTracer()
	conn := stdlib.OpenDB(*config)

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	if err := conn.PingContext(ctx); err != nil {
		slog.Warn("Failed to ping DB, falling back to in-memory store", "error", err)
		conn.Close()
		return
	}

	db = conn
	slog.Info("Successfully connected to database for transfer service")
}

func executeMoneyTransfer(ctx context.Context, transfer FundTransfer) error {
	if transfer.SourceAccountID == transfer.TargetAccountID {
		return &transferFailure{
			message: "source and target accounts must be different",
			code:    "VALIDATION_FAILED",
			status:  http.StatusBadRequest,
		}
	}

	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	// Acquire pessimistic row lock with ordered IDs to prevent deadlocks and race conditions
	rows, err := tx.QueryContext(ctx, `
		SELECT id, balance
		FROM accounts
		WHERE id = $1 OR id = $2
		ORDER BY id
		FOR UPDATE`, transfer.SourceAccountID, transfer.TargetAccountID)
	if err != nil {
		return err
	}

	accounts := make(map[string]accountBalance, 2)
	for rows.Next() {
		var account accountBalance
		if err := rows.Scan(&account.ID, &account.Balance); err != nil {
			rows.Close()
			return err
		}
		accounts[account.ID] = account
	}
	if err := rows.Err(); err != nil {
		rows.Close()
		return err
	}
	rows.Close()

	source, sourceOK := accounts[transfer.SourceAccountID]
	_, targetOK := accounts[transfer.TargetAccountID]
	if !sourceOK || !targetOK {
		return &transferFailure{
			message: "source or target account not found",
			code:    "ACCOUNT_NOT_FOUND",
			status:  http.StatusBadRequest,
		}
	}
	if source.Balance < transfer.Amount {
		return &transferFailure{
			message: "insufficient funds",
			code:    "INSUFFICIENT_FUNDS",
			status:  http.StatusBadRequest,
		}
	}

	if _, err := tx.ExecContext(ctx, "UPDATE accounts SET balance = balance - $1 WHERE id = $2", transfer.Amount, transfer.SourceAccountID); err != nil {
		return err
	}
	if _, err := tx.ExecContext(ctx, "UPDATE accounts SET balance = balance + $1 WHERE id = $2", transfer.Amount, transfer.TargetAccountID); err != nil {
		return err
	}
	if _, err := tx.ExecContext(ctx, `
		INSERT INTO transfers (id, source_account_id, target_account_id, amount, status, created_at)
		VALUES ($1, $2, $3, $4, $5, $6)`,
		transfer.ID, transfer.SourceAccountID, transfer.TargetAccountID, transfer.Amount,
		transfer.Status, transfer.CreatedAt,
	); err != nil {
		return err
	}

	return tx.Commit()
}

func fetchAllTransfers(ctx context.Context) ([]FundTransfer, error) {
	if db != nil {
		rows, err := db.QueryContext(ctx, `
			SELECT id, source_account_id, target_account_id, amount, status, created_at
			FROM transfers ORDER BY created_at DESC`)
		if err != nil {
			return nil, err
		}
		defer rows.Close()

		transfers := make([]FundTransfer, 0)
		for rows.Next() {
			var t FundTransfer
			if err := rows.Scan(&t.ID, &t.SourceAccountID, &t.TargetAccountID, &t.Amount, &t.Status, &t.CreatedAt); err != nil {
				return nil, err
			}
			transfers = append(transfers, t)
		}
		if err := rows.Err(); err != nil {
			return nil, err
		}
		return transfers, nil
	}

	storeMu.RLock()
	defer storeMu.RUnlock()
	transfers := make([]FundTransfer, 0, len(transfersStore))
	for _, t := range transfersStore {
		transfers = append(transfers, t)
	}
	return transfers, nil
}

func fetchTransferByID(ctx context.Context, id string) (*FundTransfer, error) {
	if db != nil {
		var transfer FundTransfer
		query := `SELECT id, source_account_id, target_account_id, amount, status, created_at
		          FROM transfers WHERE id = $1`
		err := db.QueryRowContext(ctx, query, id).Scan(
			&transfer.ID, &transfer.SourceAccountID, &transfer.TargetAccountID, &transfer.Amount,
			&transfer.Status, &transfer.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		return &transfer, nil
	}

	storeMu.RLock()
	defer storeMu.RUnlock()
	t, exists := transfersStore[id]
	if !exists {
		return nil, sql.ErrNoRows
	}
	return &t, nil
}
