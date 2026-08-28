package main

import (
	"database/sql"
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/gorilla/mux"
)

func setupRouter() *mux.Router {
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
	return r
}

func handleGetAccounts(w http.ResponseWriter, r *http.Request) {
	slog.Info("Fetching all accounts")
	accountList, err := fetchAllAccounts(r.Context())
	if err != nil {
		slog.Error("Query failed", "error", err)
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
	if err := insertAccount(r.Context(), &a); err != nil {
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
	a, err := fetchAccountByID(r.Context(), id)
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
	if err := updateAccountBalance(r.Context(), id, a.Balance); err != nil {
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
	if err := deleteAccountByID(r.Context(), id); err != nil {
		slog.Error("Delete failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
