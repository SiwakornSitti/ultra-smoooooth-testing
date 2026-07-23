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

func TestBFFEKYCServicePact(t *testing.T) {
	pactDir, _ := filepath.Abs("../../../pacts")
	mockProvider, err := consumer.NewV2Pact(consumer.MockHTTPProviderConfig{
		Consumer: "bff-service",
		Provider: "ekyc-service",
		PactDir:  pactDir,
	})
	if err != nil {
		t.Fatalf("failed to create pact: %v", err)
	}

	mockProvider.AddInteraction().
		Given("customer cust-123 submits identity verification").
		UponReceiving("a POST request to verify eKYC").
		WithRequest(http.MethodPost, "/ekycs/verify", func(b *consumer.V2RequestBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.JSONBody(matchers.MapMatcher{
				"customer_id":   matchers.String("cust-123"),
				"national_id":   matchers.String("1100200300401"),
				"full_name":     matchers.String("Jane Doe"),
				"document_type": matchers.String("national_id"),
			})
		}).
		WillRespondWith(http.StatusCreated, func(b *consumer.V2ResponseBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.Header("Location", matchers.Like("/ekycs/ekyc-789"))
			b.JSONBody(matchers.MapMatcher{
				"id":               matchers.Like("ekyc-789"),
				"customer_id":      matchers.String("cust-123"),
				"national_id":      matchers.String("1100200300401"),
				"full_name":        matchers.String("Jane Doe"),
				"document_type":    matchers.String("national_id"),
				"status":           matchers.String("APPROVED"),
				"confidence_score": matchers.Like(0.98),
			})
		})

	err = mockProvider.ExecuteTest(t, func(cfg consumer.MockServerConfig) error {
		verifyURL := fmt.Sprintf("http://%s:%d/ekycs/verify", cfg.Host, cfg.Port)
		reqPayload := map[string]string{
			"customer_id":   "cust-123",
			"national_id":   "1100200300401",
			"full_name":     "Jane Doe",
			"document_type": "national_id",
		}
		body, _ := json.Marshal(reqPayload)
		resp, err := http.Post(verifyURL, "application/json", bytes.NewReader(body))
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
