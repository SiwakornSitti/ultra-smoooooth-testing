package main

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"time"

	"github.com/exaring/otelpgx"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
)

var db *sql.DB

func initDB() (*sql.DB, error) {
	dbHost := os.Getenv("DB_HOST")
	if dbHost == "" {
		dbHost = "localhost"
	}
	dbPort := os.Getenv("DB_PORT")
	if dbPort == "" {
		dbPort = "5432"
	}
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))

	config, err := pgx.ParseConfig(connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to parse connection string: %w", err)
	}

	config.Tracer = otelpgx.NewTracer()
	conn := stdlib.OpenDB(*config)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := conn.PingContext(ctx); err != nil {
		conn.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return conn, nil
}

func fetchAllAccounts(ctx context.Context) ([]BankAccount, error) {
	rows, err := db.QueryContext(ctx, "SELECT id, user_id, balance FROM accounts")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var accountList []BankAccount
	for rows.Next() {
		var a BankAccount
		if err := rows.Scan(&a.ID, &a.UserID, &a.Balance); err != nil {
			return nil, err
		}
		accountList = append(accountList, a)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return accountList, nil
}

func insertAccount(ctx context.Context, a *BankAccount) error {
	return db.QueryRowContext(ctx, "INSERT INTO accounts (user_id, balance) VALUES ($1, $2) RETURNING id", a.UserID, a.Balance).Scan(&a.ID)
}

func fetchAccountByID(ctx context.Context, id string) (*BankAccount, error) {
	var a BankAccount
	err := db.QueryRowContext(ctx, "SELECT id, user_id, balance FROM accounts WHERE id = $1", id).Scan(&a.ID, &a.UserID, &a.Balance)
	if err != nil {
		return nil, err
	}
	return &a, nil
}

func updateAccountBalance(ctx context.Context, id string, balance float64) error {
	_, err := db.ExecContext(ctx, "UPDATE accounts SET balance = $1 WHERE id = $2", balance, id)
	return err
}

func deleteAccountByID(ctx context.Context, id string) error {
	_, err := db.ExecContext(ctx, "DELETE FROM accounts WHERE id = $1", id)
	return err
}
