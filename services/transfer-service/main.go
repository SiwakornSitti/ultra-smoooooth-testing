package main

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"encoding/json"
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
	Currency        string    `json:"currency"`
	Status          string    `json:"status"`
	CreatedAt       time.Time `json:"created_at"`
}

type CreateTransferRequest struct {
	SourceAccountID string  `json:"source_account_id"`
	TargetAccountID string  `json:"target_account_id"`
	Amount          float64 `json:"amount"`
	Currency        string  `json:"currency"`
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

	currency := req.Currency
	if currency == "" {
		currency = "THB"
	}

	transfer := FundTransfer{
		ID:              generateID("txn"),
		SourceAccountID: req.SourceAccountID,
		TargetAccountID: req.TargetAccountID,
		Amount:          req.Amount,
		Currency:        currency,
		Status:          "COMPLETED",
		CreatedAt:       time.Now().UTC(),
	}

	if db != nil {
		query := `INSERT INTO transfers (id, source_account_id, target_account_id, amount, currency, status, created_at)
		          VALUES ($1, $2, $3, $4, $5, $6, $7)`
		_, err := db.ExecContext(r.Context(), query, transfer.ID, transfer.SourceAccountID, transfer.TargetAccountID, transfer.Amount, transfer.Currency, transfer.Status, transfer.CreatedAt)
		if err != nil {
			slog.Error("Failed to insert transfer into DB", "error", err)
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

func getAllTransfersHandler(w http.ResponseWriter, r *http.Request) {
	var transfers []FundTransfer

	if db != nil {
		query := `SELECT id, source_account_id, target_account_id, amount, currency, status, created_at
		          FROM transfers ORDER BY created_at DESC`
		rows, err := db.QueryContext(r.Context(), query)
		if err != nil {
			slog.Error("Failed to query transfers from DB", "error", err)
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		transfers = make([]FundTransfer, 0)
		for rows.Next() {
			var t FundTransfer
			if err := rows.Scan(&t.ID, &t.SourceAccountID, &t.TargetAccountID, &t.Amount, &t.Currency, &t.Status, &t.CreatedAt); err != nil {
				slog.Error("Failed to scan transfer row", "error", err)
				writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
				return
			}
			transfers = append(transfers, t)
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
		query := `SELECT id, source_account_id, target_account_id, amount, currency, status, created_at
		          FROM transfers WHERE id = $1`
		err := db.QueryRowContext(r.Context(), query, id).Scan(
			&transfer.ID, &transfer.SourceAccountID, &transfer.TargetAccountID, &transfer.Amount,
			&transfer.Currency, &transfer.Status, &transfer.CreatedAt,
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

	port := os.Getenv("PORT")
	if port == "" {
		port = "8085"
	}

	router := setupRouter()
	slog.Info("Transfer service starting", "port", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		slog.Error("Server failed to start", "error", err)
		os.Exit(1)
	}
}
