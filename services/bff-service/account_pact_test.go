package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"
	"testing"

	"github.com/pact-foundation/pact-go/v2/consumer"
	"github.com/pact-foundation/pact-go/v2/matchers"
)

func TestBFFAccountServicePact(t *testing.T) {
	pactDir, _ := filepath.Abs("../../pacts")
	mockProvider, err := consumer.NewV2Pact(consumer.MockHTTPProviderConfig{
		Consumer: "bff-service",
		Provider: "bank-account-service",
		PactDir:  pactDir,
	})
	if err != nil {
		t.Fatalf("failed to create pact: %v", err)
	}

	// Interaction 1: GET /accounts
	mockProvider.AddInteraction().
		Given("bank accounts exist").
		UponReceiving("a GET request to fetch all accounts").
		WithRequest(http.MethodGet, "/accounts", func(b *consumer.V2RequestBuilder) {}).
		WillRespondWith(http.StatusOK, func(b *consumer.V2ResponseBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.JSONBody(matchers.EachLike(matchers.MapMatcher{
				"id":       matchers.String("acc-123"),
				"user_id":  matchers.String("test-user-123"),
				"balance":  matchers.Decimal(2500.75),
				"currency": matchers.String("USD"),
			}, 1))
		})

	// Interaction 2: POST /accounts
	mockProvider.AddInteraction().
		Given("a request to create a bank account").
		UponReceiving("a POST request to create an account").
		WithRequest(http.MethodPost, "/accounts", func(b *consumer.V2RequestBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.JSONBody(matchers.MapMatcher{
				"user_id":  matchers.String("test-user-123"),
				"balance":  matchers.Like(100.0),
				"currency": matchers.String("THB"),
			})
		}).
		WillRespondWith(http.StatusCreated, func(b *consumer.V2ResponseBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.JSONBody(matchers.MapMatcher{
				"id":       matchers.Like("generated-account-id"),
				"user_id":  matchers.String("test-user-123"),
				"balance":  matchers.Like(100.0),
				"currency": matchers.String("THB"),
			})
		})

	err = mockProvider.ExecuteTest(t, func(cfg consumer.MockServerConfig) error {
		// Test GET /accounts
		accountsURL := fmt.Sprintf("http://%s:%d/accounts", cfg.Host, cfg.Port)
		resp, err := http.Get(accountsURL)
		if err != nil {
			return err
		}
		defer resp.Body.Close()
		if resp.StatusCode != http.StatusOK {
			return fmt.Errorf("expected 200, got %d", resp.StatusCode)
		}

		// Test POST /accounts
		createURL := fmt.Sprintf("http://%s:%d/accounts", cfg.Host, cfg.Port)
		accReq := map[string]interface{}{
			"user_id":  "test-user-123",
			"balance":  100.0,
			"currency": "THB",
		}
		body, _ := json.Marshal(accReq)
		postResp, err := http.Post(createURL, "application/json", bytes.NewReader(body))
		if err != nil {
			return err
		}
		defer postResp.Body.Close()
		if postResp.StatusCode != http.StatusCreated {
			return fmt.Errorf("expected 201, got %d", postResp.StatusCode)
		}

		return nil
	})
	if err != nil {
		t.Fatalf("pact verification failed: %v", err)
	}
}
