package main

import (
	"context"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestResetWorkshopHandlerRequiresDatabase(t *testing.T) {
	originalDB := db
	db = nil
	defer func() { db = originalDB }()

	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/reset", nil)
	setupRouter().ServeHTTP(rec, req)

	if rec.Code != http.StatusServiceUnavailable {
		t.Fatalf("status = %d; want %d", rec.Code, http.StatusServiceUnavailable)
	}
}

type mockRoundTripper struct {
	roundTrip func(req *http.Request) (*http.Response, error)
}

func (m *mockRoundTripper) RoundTrip(req *http.Request) (*http.Response, error) {
	return m.roundTrip(req)
}

func TestResetWiremockScenarios(t *testing.T) {
	called := false
	origTransport := wiremockHTTPClient.Transport
	origURL := wiremockURL
	origUser := wiremockAdminUser
	origPass := wiremockAdminPassword
	defer func() {
		wiremockHTTPClient.Transport = origTransport
		wiremockURL = origURL
		wiremockAdminUser = origUser
		wiremockAdminPassword = origPass
	}()

	wiremockURL = "http://wiremock:8080"
	wiremockAdminUser = "admin"
	wiremockAdminPassword = "password"
	wiremockHTTPClient.Transport = &mockRoundTripper{
		roundTrip: func(req *http.Request) (*http.Response, error) {
			if req.Method != http.MethodPost {
				t.Errorf("method = %s; want POST", req.Method)
			}
			if req.URL.Path != "/__admin/scenarios/reset" {
				t.Errorf("path = %s; want /__admin/scenarios/reset", req.URL.Path)
			}
			user, pass, ok := rBasicAuth(req)
			if !ok || user != "admin" || pass != "password" {
				t.Errorf("basic auth = (%s, %s, %v); want (admin, password, true)", user, pass, ok)
			}
			called = true
			rec := httptest.NewRecorder()
			rec.WriteHeader(http.StatusOK)
			return rec.Result(), nil
		},
	}

	err := resetWiremockScenarios(context.Background())
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !called {
		t.Fatal("expected WireMock reset endpoint to be called")
	}
}

func rBasicAuth(r *http.Request) (username, password string, ok bool) {
	return r.BasicAuth()
}
