package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"testing"

	"github.com/gorilla/mux"
	"github.com/pact-foundation/pact-go/v2/provider"
)

func createTestAccountRouter() http.Handler {
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
			writeJSONError(w, err.Error(), http.StatusBadRequest)
			return
		}
		acc.ID = "generated-account-id"
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(acc)
	}).Methods("POST")

	return r
}

func TestBankAccountServicePactProvider(t *testing.T) {
	server := httptest.NewServer(createTestAccountRouter())
	defer server.Close()

	pactPath, err := filepath.Abs("../../pacts/bff-service-bank-account-service.json")
	if err != nil {
		t.Fatalf("failed to resolve pact path: %v", err)
	}

	err = provider.VerifyProvider(t, provider.VerifyRequest{
		Provider:        "bank-account-service",
		ProviderBaseURL: server.URL,
		PactFiles:       []string{pactPath},
	})
	if err != nil {
		t.Fatalf("bank-account-service provider verification failed: %v", err)
	}
}
