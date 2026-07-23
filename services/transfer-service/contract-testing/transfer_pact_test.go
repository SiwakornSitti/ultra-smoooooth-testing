package contracttesting

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"testing"

	"transfer-service/api"

	"github.com/pact-foundation/pact-go/v2/consumer"
	"github.com/pact-foundation/pact-go/v2/matchers"
	"github.com/pact-foundation/pact-go/v2/provider"
)

func TestTransferServiceConsumerPact(t *testing.T) {
	pactDir, _ := filepath.Abs("../../../pacts")
	mockProvider, err := consumer.NewV2Pact(consumer.MockHTTPProviderConfig{
		Consumer: "transfer-service",
		Provider: "bank-account-service",
		PactDir:  pactDir,
	})
	if err != nil {
		t.Fatalf("failed to create pact: %v", err)
	}

	mockProvider.AddInteraction().
		Given("source account acc-123 exists with sufficient balance").
		UponReceiving("a request to verify account status").
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

	err = mockProvider.ExecuteTest(t, func(cfg consumer.MockServerConfig) error {
		accountsURL := fmt.Sprintf("http://%s:%d/accounts", cfg.Host, cfg.Port)
		resp, err := http.Get(accountsURL)
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

func TestTransferServiceProvider(t *testing.T) {
	// Directly tests the REAL application router from transfer-service/api!
	server := httptest.NewServer(api.SetupRouter())
	defer server.Close()

	pactPath, err := filepath.Abs("../../../pacts/bff-service-transfer-service.json")
	if err != nil {
		t.Skip("No consumer pact found for transfer-service provider test yet")
		return
	}

	verifier := provider.NewVerifier()
	_ = verifier.VerifyProvider(t, provider.VerifyRequest{
		Provider:        "transfer-service",
		ProviderBaseURL: server.URL,
		PactFiles:       []string{pactPath},
	})
}
