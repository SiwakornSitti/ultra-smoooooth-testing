package main

import (
	"bytes"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

type roundTripperFunc func(*http.Request) (*http.Response, error)

func (f roundTripperFunc) RoundTrip(r *http.Request) (*http.Response, error) {
	return f(r)
}

func TestHandleOAuthToken(t *testing.T) {
	originalURL := paotangUpstreamURL
	originalTransport := http.DefaultClient.Transport
	defer func() {
		paotangUpstreamURL = originalURL
		http.DefaultClient.Transport = originalTransport
	}()
	paotangUpstreamURL = "http://paotang-provider"
	http.DefaultClient.Transport = roundTripperFunc(func(r *http.Request) (*http.Response, error) {
		if r.URL.Path != "/oauth/token" {
			t.Errorf("path = %q; want /oauth/token", r.URL.Path)
		}
		return &http.Response{
			StatusCode: http.StatusOK,
			Header:     http.Header{"Content-Type": []string{"application/json"}},
			Body:       io.NopCloser(bytes.NewBufferString(`{"access_token":"mock-token","token_type":"Bearer","expires_in":3600}`)),
		}, nil
	})

	req := httptest.NewRequest(http.MethodPost, "/oauth/token", bytes.NewBufferString(`grant_type=authorization_code&code=test-code`))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	rec := httptest.NewRecorder()
	handleOAuthToken(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d; want 200", rec.Code)
	}
}
