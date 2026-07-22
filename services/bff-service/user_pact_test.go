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

func TestBFFUserServicePact(t *testing.T) {
	pactDir, _ := filepath.Abs("../../pacts")
	mockProvider, err := consumer.NewV2Pact(consumer.MockHTTPProviderConfig{
		Consumer: "bff-service",
		Provider: "user-service",
		PactDir:  pactDir,
	})
	if err != nil {
		t.Fatalf("failed to create pact: %v", err)
	}

	// Interaction 1: GET /users/test-user-123
	mockProvider.AddInteraction().
		Given("a user with ID test-user-123 exists").
		UponReceiving("a GET request to fetch user details").
		WithRequest(http.MethodGet, "/users/test-user-123", func(b *consumer.V2RequestBuilder) {}).
		WillRespondWith(http.StatusOK, func(b *consumer.V2ResponseBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.JSONBody(matchers.MapMatcher{
				"id":     matchers.String("test-user-123"),
				"name":   matchers.String("Jane Doe"),
				"email":  matchers.String("jane.doe@example.com"),
				"phone":  matchers.String("+66800000001"),
				"status": matchers.String("active"),
			})
		})

	// Interaction 2: POST /users
	mockProvider.AddInteraction().
		Given("a request to create a user").
		UponReceiving("a POST request to create a user").
		WithRequest(http.MethodPost, "/users", func(b *consumer.V2RequestBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.JSONBody(matchers.MapMatcher{
				"name":  matchers.String("John Smith"),
				"email": matchers.String("john.smith@example.com"),
				"phone": matchers.String("+66800000002"),
			})
		}).
		WillRespondWith(http.StatusCreated, func(b *consumer.V2ResponseBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.JSONBody(matchers.MapMatcher{
				"id":     matchers.Like("generated-user-id"),
				"name":   matchers.String("John Smith"),
				"email":  matchers.String("john.smith@example.com"),
				"phone":  matchers.String("+66800000002"),
				"status": matchers.String("active"),
			})
		})

	err = mockProvider.ExecuteTest(t, func(cfg consumer.MockServerConfig) error {
		// Test GET /users/test-user-123
		userURL := fmt.Sprintf("http://%s:%d/users/test-user-123", cfg.Host, cfg.Port)
		resp, err := http.Get(userURL)
		if err != nil {
			return err
		}
		defer resp.Body.Close()
		if resp.StatusCode != http.StatusOK {
			return fmt.Errorf("expected 200, got %d", resp.StatusCode)
		}

		// Test POST /users
		createURL := fmt.Sprintf("http://%s:%d/users", cfg.Host, cfg.Port)
		userReq := map[string]string{
			"name":  "John Smith",
			"email": "john.smith@example.com",
			"phone": "+66800000002",
		}
		body, _ := json.Marshal(userReq)
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
