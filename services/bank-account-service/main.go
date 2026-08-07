package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/exaring/otelpgx"
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib" //nolint:staticcheck
)

type BankAccount struct {
	ID       string  `json:"id"`
	UserID   string  `json:"user_id"`
	Balance  float64 `json:"balance"`
	Currency string  `json:"currency"`
	Phone    string  `json:"phone,omitempty"`
}

var db *sql.DB

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

// writeJSONError writes a JSON-shaped error body so responses stay
// consistent with success responses (avoids plain-text bodies that break
// callers doing res.json()).
func writeJSONError(w http.ResponseWriter, message string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

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
		slog.Error("Failed to parse connection string", "error", err)
		os.Exit(1)
	}

	config.Tracer = otelpgx.NewTracer()

	db = stdlib.OpenDB(*config)
	defer db.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err = db.PingContext(ctx); err != nil {
		slog.Error("Failed to ping database", "error", err)
		os.Exit(1)
	}
	slog.Info("Successfully connected to database")

	r := mux.NewRouter()
	r.HandleFunc("/accounts", handleGetAccounts).Methods("GET")
	r.HandleFunc("/accounts", handleCreateAccount).Methods("POST")
	r.HandleFunc("/accounts/{id}", handleGetAccount).Methods("GET")
	r.HandleFunc("/accounts/{id}", handleUpdateAccount).Methods("PATCH")
	r.HandleFunc("/accounts/{id}", handleDeleteAccount).Methods("DELETE")

	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	slog.Info("Bank account service starting", "port", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		slog.Error("Server failed to start", "error", err)
		os.Exit(1)
	}
}

func handleGetAccounts(w http.ResponseWriter, r *http.Request) {
	slog.Info("Fetching all accounts")
	rows, err := db.QueryContext(r.Context(), "SELECT id, user_id, balance, currency FROM accounts")
	if err != nil {
		slog.Error("Query failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var accountList []BankAccount
	for rows.Next() {
		var a BankAccount
		if err := rows.Scan(&a.ID, &a.UserID, &a.Balance, &a.Currency); err != nil {
			slog.Error("Scan failed", "error", err)
			writeJSONError(w, "Database error", http.StatusInternalServerError)
			return
		}
		accountList = append(accountList, a)
	}
	if err := rows.Err(); err != nil {
		slog.Error("Rows iteration failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(accountList)
}

func handleCreateAccount(w http.ResponseWriter, r *http.Request) {
	var a BankAccount
	if err := json.NewDecoder(r.Body).Decode(&a); err != nil {
		slog.Error("Invalid request body", "error", err)
		writeJSONError(w, err.Error(), http.StatusBadRequest)
		return
	}
	slog.Info("Creating account", "user_id", a.UserID)
	err := db.QueryRowContext(r.Context(), "INSERT INTO accounts (user_id, balance, currency) VALUES ($1, $2, $3) RETURNING id", a.UserID, a.Balance, a.Currency).Scan(&a.ID)
	if err != nil {
		slog.Error("Insert failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	if a.Phone != "" {
		slog.Info("SMS delivery is handled by bff-service", "phone", a.Phone)
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(a)
}

func handleGetAccount(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	slog.Info("Fetching account", "account_id", id)
	var a BankAccount
	err := db.QueryRowContext(r.Context(), "SELECT id, user_id, balance, currency FROM accounts WHERE id = $1", id).Scan(&a.ID, &a.UserID, &a.Balance, &a.Currency)
	if err == sql.ErrNoRows {
		slog.Warn("Account not found", "account_id", id)
		writeJSONError(w, "Account not found", http.StatusNotFound)
		return
	} else if err != nil {
		slog.Error("Query failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(a)
}

func handleUpdateAccount(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	var a BankAccount
	if err := json.NewDecoder(r.Body).Decode(&a); err != nil {
		slog.Error("Invalid request body", "error", err)
		writeJSONError(w, err.Error(), http.StatusBadRequest)
		return
	}
	slog.Info("Updating account", "account_id", id)
	_, err := db.ExecContext(r.Context(), "UPDATE accounts SET balance = $1, currency = $2 WHERE id = $3", a.Balance, a.Currency, id)
	if err != nil {
		slog.Error("Update failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	a.ID = id
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(a)
}

func handleDeleteAccount(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	slog.Info("Deleting account", "account_id", id)
	_, err := db.ExecContext(r.Context(), "DELETE FROM accounts WHERE id = $1", id)
	if err != nil {
		slog.Error("Delete failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
