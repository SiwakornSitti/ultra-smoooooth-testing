package contracttesting

import (
	"net/http/httptest"
	"path/filepath"
	"testing"

	"user-service/api"

	"github.com/pact-foundation/pact-go/v2/provider"
)

func TestUserServicePactProvider(t *testing.T) {
	// Directly tests the REAL application router exported from user-service/api!
	server := httptest.NewServer(api.SetupUserRouter())
	defer server.Close()

	pactPath, err := filepath.Abs("../../../pacts/bff-service-user-service.json")
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
