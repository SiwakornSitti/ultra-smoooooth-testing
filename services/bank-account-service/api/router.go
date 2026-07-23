package api

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type BankAccount struct {
	ID       string  `json:"id"`
	UserID   string  `json:"user_id"`
	Balance  float64 `json:"balance"`
	Currency string  `json:"currency"`
}

func WriteJSONError(w http.ResponseWriter, message string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

func SetupAccountRouter() http.Handler {
	r := mux.NewRouter()
	r.HandleFunc("/accounts", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode([]BankAccount{
			{
				ID:       "acc-123",
				UserID:   "test-user-123",
				Balance:  2500.75,
				Currency: "USD",
			},
		})
	}).Methods("GET")

	r.HandleFunc("/accounts", func(w http.ResponseWriter, r *http.Request) {
		var acc BankAccount
		if err := json.NewDecoder(r.Body).Decode(&acc); err != nil {
			WriteJSONError(w, err.Error(), http.StatusBadRequest)
			return
		}
		acc.ID = "generated-account-id"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(acc)
	}).Methods("POST")

	return r
}
