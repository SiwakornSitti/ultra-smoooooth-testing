package contracttesting

import (
	"net/http/httptest"
	"path/filepath"
	"testing"

	"bank-account-service/api"

	"github.com/pact-foundation/pact-go/v2/provider"
)

func TestBankAccountServicePactProvider(t *testing.T) {
	// Directly tests the REAL application router exported from bank-account-service/api!
	server := httptest.NewServer(api.SetupAccountRouter())
	defer server.Close()

	pactPath, err := filepath.Abs("../../../pacts/bff-service-bank-account-service.json")
	if err != nil {
		t.Fatalf("failed to resolve pact path: %v", err)
	}

	verifier := provider.NewVerifier()
	err = verifier.VerifyProvider(t, provider.VerifyRequest{
		Provider:        "bank-account-service",
		ProviderBaseURL: server.URL,
		PactFiles:       []string{pactPath},
	})
	if err != nil {
		t.Fatalf("bank-account-service provider verification failed: %v", err)
	}
}
