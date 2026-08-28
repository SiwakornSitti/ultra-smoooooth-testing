package main

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
)

var db *sql.DB

func initDB() error {
	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		getEnv("DB_HOST", ""), getEnv("DB_PORT", "5432"), getEnv("DB_USER", ""), getEnv("DB_PASSWORD", ""), getEnv("DB_NAME", ""),
	)
	config, err := pgx.ParseConfig(connStr)
	if err != nil {
		return err
	}

	db = stdlib.OpenDB(*config)
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	if err := db.PingContext(ctx); err != nil {
		db.Close()
		return err
	}
	return nil
}

func resetWorkshopData(ctx context.Context) error {
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	queries := []string{
		`TRUNCATE TABLE transfers, ekyc_verifications, accounts, users`,
		`INSERT INTO users (id, name, email, phone, status) VALUES
			('00000000-0000-0000-0000-000000000001', 'Narin Chaiyasit', 'sender@example.com', '+66800000001', 'active'),
			('00000000-0000-0000-0000-000000000002', 'Pimchanok Rattanakul', 'receiver@example.com', '+66800000002', 'active')`,
		`INSERT INTO accounts (id, user_id, balance) VALUES
			('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', 900.00),
			('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000002', 600.00)`,
		`INSERT INTO ekyc_verifications (id, customer_id, national_id, full_name, document_type, status, confidence_score) VALUES
			('ekyc-001', '00000000-0000-0000-0000-000000000001', '1101700000001', 'Narin Chaiyasit', 'national_id', 'APPROVED', 0.98),
			('ekyc-002', '00000000-0000-0000-0000-000000000002', '1101700000002', 'Pimchanok Rattanakul', 'national_id', 'APPROVED', 0.97)`,
		`INSERT INTO transfers (id, source_account_id, target_account_id, amount, status) VALUES
			('transfer-001', '00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000012', 100.00, 'COMPLETED')`,
	}
	for _, query := range queries {
		if _, err := tx.ExecContext(ctx, query); err != nil {
			return err
		}
	}

	return tx.Commit()
}
