package contracttesting

import (
	"net/http/httptest"
	"path/filepath"
	"testing"

	"ekyc-service/api"

	"github.com/pact-foundation/pact-go/v2/provider"
)

func TestEKYCServiceProvider(t *testing.T) {
	// Directly tests the REAL application router from ekyc-service/api!
	server := httptest.NewServer(api.SetupRouter())
	defer server.Close()

	pactPath, err := filepath.Abs("../../../pacts/bff-service-ekyc-service.json")
	if err != nil {
		t.Fatalf("failed to resolve pact path: %v", err)
	}

	verifier := provider.NewVerifier()
	err = verifier.VerifyProvider(t, provider.VerifyRequest{
		Provider:        "ekyc-service",
		ProviderBaseURL: server.URL,
		PactFiles:       []string{pactPath},
	})
	if err != nil {
		t.Fatalf("ekyc-service provider verification failed: %v", err)
	}
}
