package main

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"
	"os"
	"sync"
	"time"

	"github.com/exaring/otelpgx"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
)

var (
	db                 *sql.DB
	verificationsStore = make(map[string]EKYCVerification)
	storeMu            sync.RWMutex
)

func initDB() {
	dbHost := os.Getenv("DB_HOST")
	if dbHost == "" {
		slog.Info("DB_HOST not set, using in-memory store for eKYC service")
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
	slog.Info("Successfully connected to database for eKYC service")
}

func insertEKYC(ctx context.Context, record EKYCVerification) error {
	if db != nil {
		query := `INSERT INTO ekyc_verifications (id, customer_id, national_id, full_name, document_type, status, confidence_score, created_at)
		          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
		_, err := db.ExecContext(ctx, query, record.ID, record.CustomerID, record.NationalID, record.FullName, record.DocumentType, record.Status, record.ConfidenceScore, record.CreatedAt)
		return err
	}

	storeMu.Lock()
	verificationsStore[record.ID] = record
	storeMu.Unlock()
	return nil
}

func fetchEKYCByID(ctx context.Context, id string) (*EKYCVerification, error) {
	if db != nil {
		var record EKYCVerification
		query := `SELECT id, customer_id, national_id, full_name, document_type, status, confidence_score, created_at
		          FROM ekyc_verifications WHERE id = $1`
		err := db.QueryRowContext(ctx, query, id).Scan(
			&record.ID, &record.CustomerID, &record.NationalID, &record.FullName,
			&record.DocumentType, &record.Status, &record.ConfidenceScore, &record.CreatedAt,
		)
		if err != nil {
			return nil, err
		}
		return &record, nil
	}

	storeMu.RLock()
	defer storeMu.RUnlock()
	rec, exists := verificationsStore[id]
	if !exists {
		return nil, sql.ErrNoRows
	}
	return &rec, nil
}

func fetchAllEKYC(ctx context.Context) ([]EKYCVerification, error) {
	if db != nil {
		rows, err := db.QueryContext(ctx, `
			SELECT id, customer_id, national_id, full_name, document_type, status, confidence_score, created_at
			FROM ekyc_verifications ORDER BY created_at DESC`)
		if err != nil {
			return nil, err
		}
		defer rows.Close()

		records := make([]EKYCVerification, 0)
		for rows.Next() {
			var record EKYCVerification
			if err := rows.Scan(
				&record.ID, &record.CustomerID, &record.NationalID, &record.FullName,
				&record.DocumentType, &record.Status, &record.ConfidenceScore, &record.CreatedAt,
			); err != nil {
				return nil, err
			}
			records = append(records, record)
		}
		if err := rows.Err(); err != nil {
			return nil, err
		}
		return records, nil
	}

	storeMu.RLock()
	defer storeMu.RUnlock()
	records := make([]EKYCVerification, 0, len(verificationsStore))
	for _, record := range verificationsStore {
		records = append(records, record)
	}
	return records, nil
}

func updateEKYC(ctx context.Context, id string, req UpdateVerificationRequest) (*EKYCVerification, error) {
	if db != nil {
		result, err := db.ExecContext(ctx, `
			UPDATE ekyc_verifications
			SET customer_id = COALESCE($1, customer_id),
			    national_id = COALESCE($2, national_id),
			    full_name = COALESCE($3, full_name),
			    document_type = COALESCE($4, document_type),
			    status = COALESCE($5, status),
			    confidence_score = COALESCE($6, confidence_score)
			WHERE id = $7`,
			req.CustomerID, req.NationalID, req.FullName, req.DocumentType,
			req.Status, req.ConfidenceScore, id,
		)
		if err != nil {
			return nil, err
		}
		rows, err := result.RowsAffected()
		if err != nil {
			return nil, err
		}
		if rows == 0 {
			return nil, sql.ErrNoRows
		}
		return fetchEKYCByID(ctx, id)
	}

	storeMu.Lock()
	defer storeMu.Unlock()
	record, exists := verificationsStore[id]
	if !exists {
		return nil, sql.ErrNoRows
	}

	if req.CustomerID != nil {
		record.CustomerID = *req.CustomerID
	}
	if req.NationalID != nil {
		record.NationalID = *req.NationalID
	}
	if req.FullName != nil {
		record.FullName = *req.FullName
	}
	if req.DocumentType != nil {
		record.DocumentType = *req.DocumentType
	}
	if req.Status != nil {
		record.Status = *req.Status
	}
	if req.ConfidenceScore != nil {
		record.ConfidenceScore = *req.ConfidenceScore
	}
	verificationsStore[id] = record
	return &record, nil
}

func deleteEKYC(ctx context.Context, id string) error {
	if db != nil {
		result, err := db.ExecContext(ctx, "DELETE FROM ekyc_verifications WHERE id = $1", id)
		if err != nil {
			return err
		}
		rows, err := result.RowsAffected()
		if err != nil {
			return err
		}
		if rows == 0 {
			return sql.ErrNoRows
		}
		return nil
	}

	storeMu.Lock()
	defer storeMu.Unlock()
	if _, exists := verificationsStore[id]; !exists {
		return sql.ErrNoRows
	}
	delete(verificationsStore, id)
	return nil
}
