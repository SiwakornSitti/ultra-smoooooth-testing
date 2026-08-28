package main

import (
	"encoding/json"
	"net/http"
)

type User struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	Phone  string `json:"phone,omitempty"`
	Status string `json:"status,omitempty"`
}

type BankAccount struct {
	ID      string  `json:"id"`
	UserID  string  `json:"user_id"`
	Balance float64 `json:"balance"`
	Phone   string  `json:"phone,omitempty"`
}

type UserDetail struct {
	User     User          `json:"user"`
	Accounts []BankAccount `json:"accounts"`
}

type Transfer struct {
	ID              string  `json:"id"`
	SourceAccountID string  `json:"source_account_id"`
	TargetAccountID string  `json:"target_account_id"`
	Amount          float64 `json:"amount"`
	Status          string  `json:"status"`
}

type CreateTransferRequest struct {
	SourceAccountID string  `json:"source_account_id"`
	TargetAccountID string  `json:"target_account_id"`
	Amount          float64 `json:"amount"`
}

type ErrorResponse struct {
	Error string `json:"error"`
	Code  string `json:"code,omitempty"`
}

// writeJSONError writes a JSON-shaped error body so responses stay
// consistent with success responses (avoids plain-text bodies that break
// callers doing res.json()).
func writeJSONError(w http.ResponseWriter, message string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(map[string]string{"error": message})
}
