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

func createTestUserRouter() http.Handler {
	r := mux.NewRouter()
	r.HandleFunc("/users/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(User{
			ID:     id,
			Name:   "Jane Doe",
			Email:  "jane.doe@example.com",
			Phone:  "+66800000001",
			Status: "active",
		})
	}).Methods("GET")

	r.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		var u User
		if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
			writeJSONError(w, err.Error(), http.StatusBadRequest)
			return
		}
		u.ID = "generated-user-id"
		if u.Status == "" {
			u.Status = "active"
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(u)
	}).Methods("POST")

	return r
}

func TestUserServicePactProvider(t *testing.T) {
	server := httptest.NewServer(createTestUserRouter())
	defer server.Close()

	pactPath, err := filepath.Abs("../../pacts/bff-service-user-service.json")
	if err != nil {
		t.Fatalf("failed to resolve pact path: %v", err)
	}

	verifier := provider.NewVerifier()
	err = verifier.VerifyProvider(t, provider.VerifyRequest{
		Provider:        "user-service",
		ProviderBaseURL: server.URL,
		PactFiles:       []string{pactPath},
	})
	if err != nil {
		t.Fatalf("user-service provider verification failed: %v", err)
	}
}
