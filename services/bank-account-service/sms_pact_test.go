package main

// Consumer-driven contract test for bank-account-service's call to the SMS
// notification service (external service, no provider verification possible
// since we don't control their API). This documents the expected contract
// and generates a pact file under ./pacts for reference; it is not run
// against a real provider.

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

func TestSMSSendPact(t *testing.T) {
	pactDir, _ := filepath.Abs("../../pacts")
	mockProvider, err := consumer.NewV2Pact(consumer.MockHTTPProviderConfig{
		Consumer: "bank-account-service",
		Provider: "sms-service",
		PactDir:  pactDir,
	})
	if err != nil {
		t.Fatalf("failed to create pact: %v", err)
	}

	mockProvider.AddInteraction().
		Given("a valid phone number").
		UponReceiving("an SMS send request").
		WithRequest(http.MethodPost, "/sms/send", func(b *consumer.V2RequestBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.Header("X-Api-Key", matchers.String("dummy-sms-api-key"))
			b.JSONBody(matchers.MapMatcher{
				"to":      matchers.String("+66800000000"),
				"message": matchers.String("Your new USD account has been created."),
			})
		}).
		WillRespondWith(http.StatusOK, func(b *consumer.V2ResponseBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.JSONBody(matchers.MapMatcher{
				"status": matchers.String("sent"),
				"id":     matchers.String("mock-sms-id"),
			})
		})

	err = mockProvider.ExecuteTest(t, func(cfg consumer.MockServerConfig) error {
		body, err := json.Marshal(SMSRequest{To: "+66800000000", Message: "Your new USD account has been created."})
		if err != nil {
			return err
		}

		req, err := http.NewRequest("POST", fmt.Sprintf("http://%s:%d/sms/send", cfg.Host, cfg.Port), bytes.NewReader(body))
		if err != nil {
			return err
		}
		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("X-Api-Key", "dummy-sms-api-key")

		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			return err
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			return fmt.Errorf("expected 200, got %d", resp.StatusCode)
		}
		return nil
	})
	if err != nil {
		t.Fatalf("pact verification failed: %v", err)
	}
}
