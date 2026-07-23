package api

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/mux"
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

func CreateTransferHandler(w http.ResponseWriter, r *http.Request) {
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

	storeMu.Lock()
	transfersStore[transfer.ID] = transfer
	storeMu.Unlock()

	slog.Info("Transfer created", "id", transfer.ID, "amount", transfer.Amount)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Location", fmt.Sprintf("/transfers/%s", transfer.ID))
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(transfer)
}

func GetAllTransfersHandler(w http.ResponseWriter, r *http.Request) {
	storeMu.RLock()
	transfers := make([]FundTransfer, 0, len(transfersStore))
	for _, t := range transfersStore {
		transfers = append(transfers, t)
	}
	storeMu.RUnlock()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(transfers)
}

func GetTransferHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	storeMu.RLock()
	transfer, exists := transfersStore[id]
	storeMu.RUnlock()

	if !exists {
		writeJSONError(w, "Transfer record not found", "NOT_FOUND", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(transfer)
}

func SetupRouter() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/transfers", CreateTransferHandler).Methods("POST")
	r.HandleFunc("/transfers", GetAllTransfersHandler).Methods("GET")
	r.HandleFunc("/transfers/{id}", GetTransferHandler).Methods("GET")
	return r
}
