package contracttesting

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

func TestBFFTransferServicePact(t *testing.T) {
	pactDir, _ := filepath.Abs("../../../pacts")
	mockProvider, err := consumer.NewV2Pact(consumer.MockHTTPProviderConfig{
		Consumer: "bff-service",
		Provider: "transfer-service",
		PactDir:  pactDir,
	})
	if err != nil {
		t.Fatalf("failed to create pact: %v", err)
	}

	mockProvider.AddInteraction().
		Given("accounts acc-123 and acc-456 exist").
		UponReceiving("a POST request to initiate a fund transfer").
		WithRequest(http.MethodPost, "/transfers", func(b *consumer.V2RequestBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.JSONBody(matchers.MapMatcher{
				"source_account_id": matchers.String("acc-123"),
				"target_account_id": matchers.String("acc-456"),
				"amount":            matchers.Like(500.0),
				"currency":          matchers.String("THB"),
			})
		}).
		WillRespondWith(http.StatusCreated, func(b *consumer.V2ResponseBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.Header("Location", matchers.Like("/transfers/txn-999"))
			b.JSONBody(matchers.MapMatcher{
				"id":                matchers.Like("txn-999"),
				"source_account_id": matchers.String("acc-123"),
				"target_account_id": matchers.String("acc-456"),
				"amount":            matchers.Like(500.0),
				"currency":          matchers.String("THB"),
				"status":           matchers.String("COMPLETED"),
			})
		})

	err = mockProvider.ExecuteTest(t, func(cfg consumer.MockServerConfig) error {
		transferURL := fmt.Sprintf("http://%s:%d/transfers", cfg.Host, cfg.Port)
		reqPayload := map[string]interface{}{
			"source_account_id": "acc-123",
			"target_account_id": "acc-456",
			"amount":            500.0,
			"currency":          "THB",
		}
		body, _ := json.Marshal(reqPayload)
		resp, err := http.Post(transferURL, "application/json", bytes.NewReader(body))
		if err != nil {
			return err
		}
		defer resp.Body.Close()
		if resp.StatusCode != http.StatusCreated {
			return fmt.Errorf("expected 201, got %d", resp.StatusCode)
		}
		return nil
	})
	if err != nil {
		t.Fatalf("pact verification failed: %v", err)
	}
}
