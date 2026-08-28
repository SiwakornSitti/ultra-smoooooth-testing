package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

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

func getAllTransfersHandler(w http.ResponseWriter, r *http.Request) {
	transfers, err := fetchAllTransfers(r.Context())
	if err != nil {
		slog.Error("Failed to query transfers", "error", err)
		writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(transfers)
}

func getTransferHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	transfer, err := fetchTransferByID(r.Context(), id)
	if err == sql.ErrNoRows {
		writeJSONError(w, "Transfer record not found", "NOT_FOUND", http.StatusNotFound)
		return
	} else if err != nil {
		slog.Error("Database query failed", "error", err)
		writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(transfer)
}
