package contracttesting

// Consumer-driven contract test for user-service's call to Paotang Pass
// (external service, no provider verification possible since we don't
// control their API). This documents the expected contract and generates
// a pact file under ./pacts for reference; it is not run against a real
// provider.

import (
	"fmt"
	"net/http"
	"net/url"
	"path/filepath"
	"strings"
	"testing"

	"github.com/pact-foundation/pact-go/v2/consumer"
	"github.com/pact-foundation/pact-go/v2/matchers"
)

func TestPaotangTokenExchangePact(t *testing.T) {
	pactDir, _ := filepath.Abs("../../../pacts")
	mockProvider, err := consumer.NewV2Pact(consumer.MockHTTPProviderConfig{
		Consumer: "user-service",
		Provider: "paotang-pass",
		PactDir:  pactDir,
	})
	if err != nil {
		t.Fatalf("failed to create pact: %v", err)
	}

	mockProvider.AddInteraction().
		Given("a valid authorization code").
		UponReceiving("a token exchange request").
		WithRequest(http.MethodPost, "/oauth/token", func(b *consumer.V2RequestBuilder) {
			b.Header("Content-Type", matchers.String("application/x-www-form-urlencoded"))
			b.Body("application/x-www-form-urlencoded", []byte("grant_type=authorization_code&code=test-authcode&client_id=dummy-client-id&client_secret=dummy-client-secret"))
		}).
		WillRespondWith(http.StatusOK, func(b *consumer.V2ResponseBuilder) {
			b.Header("Content-Type", matchers.String("application/json"))
			b.JSONBody(matchers.MapMatcher{
				"access_token": matchers.String("mock-access-token"),
				"token_type":   matchers.String("Bearer"),
				"expires_in":   matchers.Integer(3600),
			})
		})

	err = mockProvider.ExecuteTest(t, func(cfg consumer.MockServerConfig) error {
		form := url.Values{}
		form.Set("grant_type", "authorization_code")
		form.Set("code", "test-authcode")
		form.Set("client_id", "dummy-client-id")
		form.Set("client_secret", "dummy-client-secret")

		req, err := http.NewRequest("POST", fmt.Sprintf("http://%s:%d/oauth/token", cfg.Host, cfg.Port), strings.NewReader(form.Encode()))
		if err != nil {
			return err
		}
		req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

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
