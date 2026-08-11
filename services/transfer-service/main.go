package main

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/exaring/otelpgx"
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
)

type FundTransfer struct {
	ID              string    `json:"id"`
	SourceAccountID string    `json:"source_account_id"`
	TargetAccountID string    `json:"target_account_id"`
	Amount          float64   `json:"amount"`
	Status          string    `json:"status"`
	CreatedAt       time.Time `json:"created_at"`
}

type CreateTransferRequest struct {
	SourceAccountID string  `json:"source_account_id"`
	TargetAccountID string  `json:"target_account_id"`
	Amount          float64 `json:"amount"`
}

type transferFailure struct {
	message string
	code    string
	status  int
}

func (e *transferFailure) Error() string {
	return e.message
}

type accountBalance struct {
	ID      string
	Balance float64
}

type ErrorResponse struct {
	Error string `json:"error"`
	Code  string `json:"code"`
}

var (
	db             *sql.DB
	transfersStore = make(map[string]FundTransfer)
	storeMu        sync.RWMutex
)

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func writeJSONError(w http.ResponseWriter, message string, code string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(ErrorResponse{
		Error: message,
		Code:  code,
	})
}

func generateID(prefix string) string {
	b := make([]byte, 4)
	rand.Read(b)
	return fmt.Sprintf("%s-%s", prefix, hex.EncodeToString(b))
}

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

func createTransferHandler(w http.ResponseWriter, r *http.Request) {
	var req CreateTransferRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, "Invalid request payload", "INVALID_INPUT", http.StatusBadRequest)
		return
	}

	if req.SourceAccountID == "" || req.TargetAccountID == "" || req.Amount <= 0 {
		writeJSONError(w, "source_account_id, target_account_id, and positive amount are required", "VALIDATION_FAILED", http.StatusBadRequest)
		return
	}
	if req.SourceAccountID == req.TargetAccountID {
		writeJSONError(w, "source and target accounts must be different", "VALIDATION_FAILED", http.StatusBadRequest)
		return
	}

	transfer := FundTransfer{
		ID:              generateID("txn"),
		SourceAccountID: req.SourceAccountID,
		TargetAccountID: req.TargetAccountID,
		Amount:          req.Amount,
		Status:          "COMPLETED",
		CreatedAt:       time.Now().UTC(),
	}

	if db != nil {
		if err := executeMoneyTransfer(r.Context(), transfer); err != nil {
			var failure *transferFailure
			if errors.As(err, &failure) {
				writeJSONError(w, failure.message, failure.code, failure.status)
				return
			}
			slog.Error("Failed to execute money transfer", "error", err)
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}
	} else {
		storeMu.Lock()
		transfersStore[transfer.ID] = transfer
		storeMu.Unlock()
	}

	slog.Info("Transfer created", "id", transfer.ID, "amount", transfer.Amount)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Location", fmt.Sprintf("/transfers/%s", transfer.ID))
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(transfer)
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

func getAllTransfersHandler(w http.ResponseWriter, r *http.Request) {
	var transfers []FundTransfer

	if db != nil {
		rows, err := db.QueryContext(r.Context(), `
			SELECT id, source_account_id, target_account_id, amount, status, created_at
			FROM transfers ORDER BY created_at DESC`)
		if err != nil {
			slog.Error("Failed to query transfers from DB", "error", err)
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		transfers = make([]FundTransfer, 0)
		for rows.Next() {
			var t FundTransfer
			if err := rows.Scan(&t.ID, &t.SourceAccountID, &t.TargetAccountID, &t.Amount, &t.Status, &t.CreatedAt); err != nil {
				slog.Error("Failed to scan transfer row", "error", err)
				writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
				return
			}
			transfers = append(transfers, t)
		}
		if err := rows.Err(); err != nil {
			slog.Error("Failed to iterate transfer rows", "error", err)
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}
	} else {
		storeMu.RLock()
		transfers = make([]FundTransfer, 0, len(transfersStore))
		for _, t := range transfersStore {
			transfers = append(transfers, t)
		}
		storeMu.RUnlock()
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(transfers)
}

func getTransferHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	var transfer FundTransfer
	if db != nil {
		query := `SELECT id, source_account_id, target_account_id, amount, status, created_at
		          FROM transfers WHERE id = $1`
		err := db.QueryRowContext(r.Context(), query, id).Scan(
			&transfer.ID, &transfer.SourceAccountID, &transfer.TargetAccountID, &transfer.Amount,
			&transfer.Status, &transfer.CreatedAt,
		)
		if err == sql.ErrNoRows {
			writeJSONError(w, "Transfer record not found", "NOT_FOUND", http.StatusNotFound)
			return
		} else if err != nil {
			slog.Error("Database query failed", "error", err)
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}
	} else {
		storeMu.RLock()
		t, exists := transfersStore[id]
		storeMu.RUnlock()
		if !exists {
			writeJSONError(w, "Transfer record not found", "NOT_FOUND", http.StatusNotFound)
			return
		}
		transfer = t
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(transfer)
}

func setupRouter() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/transfers", createTransferHandler).Methods("POST")
	r.HandleFunc("/transfers", getAllTransfersHandler).Methods("GET")
	r.HandleFunc("/transfers/{id}", getTransferHandler).Methods("GET")
	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	}).Methods("GET")
	return r
}

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	initDB()

	port := getEnv("PORT", "8085")

	router := setupRouter()
	slog.Info("Transfer service starting", "port", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		slog.Error("Server failed to start", "error", err)
		os.Exit(1)
	}
}
