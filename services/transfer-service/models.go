package main

import (
	"encoding/json"
	"net/http"
	"time"
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
	Code  string `json:"code,omitempty"`
}

func writeJSONError(w http.ResponseWriter, message string, code string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	_ = json.NewEncoder(w).Encode(ErrorResponse{
		Error: message,
		Code:  code,
	})
}
