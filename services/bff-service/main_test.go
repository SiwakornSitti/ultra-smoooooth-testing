package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gorilla/mux"
)

func TestGetEnvTableDriven(t *testing.T) {
	os.Setenv("TEST_EXISTING_VAR", "custom_value")
	defer os.Unsetenv("TEST_EXISTING_VAR")

	tests := []struct {
		name     string
		key      string
		fallback string
		want     string
	}{
		{
			name:     "returns environment variable value when key exists",
			key:      "TEST_EXISTING_VAR",
			fallback: "fallback_val",
			want:     "custom_value",
		},
		{
			name:     "returns fallback value when key does not exist",
			key:      "NON_EXISTENT_KEY",
			fallback: "fallback_val",
			want:     "fallback_val",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := getEnv(tt.key, tt.fallback)
			if got != tt.want {
				t.Errorf("getEnv(%q, %q) = %q; want %q", tt.key, tt.fallback, got, tt.want)
			}
		})
	}
}

func TestWriteJSONErrorTableDriven(t *testing.T) {
	tests := []struct {
		name           string
		message        string
		statusCode     int
		wantStatusCode int
		wantErrorMsg   string
	}{
		{
			name:           "400 Bad Request error response",
			message:        "Missing User ID",
			statusCode:     http.StatusBadRequest,
			wantStatusCode: http.StatusBadRequest,
			wantErrorMsg:   "Missing User ID",
		},
		{
			name:           "404 Not Found error response",
			message:        "User not found",
			statusCode:     http.StatusNotFound,
			wantStatusCode: http.StatusNotFound,
			wantErrorMsg:   "User not found",
		},
		{
			name:           "503 Service Unavailable error response",
			message:        "User service unavailable",
			statusCode:     http.StatusServiceUnavailable,
			wantStatusCode: http.StatusServiceUnavailable,
			wantErrorMsg:   "User service unavailable",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			rec := httptest.NewRecorder()
			writeJSONError(rec, tt.message, tt.statusCode)

			if rec.Code != tt.wantStatusCode {
				t.Errorf("status code = %d; want %d", rec.Code, tt.wantStatusCode)
			}

			if ct := rec.Header().Get("Content-Type"); ct != "application/json" {
				t.Errorf("Content-Type = %q; want application/json", ct)
			}

			var body map[string]string
			if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
				t.Fatalf("failed to decode response body: %v", err)
			}

			if body["error"] != tt.wantErrorMsg {
				t.Errorf("error message = %q; want %q", body["error"], tt.wantErrorMsg)
			}
		})
	}
}

type mockRoundTripper struct {
	roundTrip func(req *http.Request) (*http.Response, error)
}

func (m *mockRoundTripper) RoundTrip(req *http.Request) (*http.Response, error) {
	return m.roundTrip(req)
}

func TestProxyHandlers(t *testing.T) {
	origClient := http.DefaultClient.Transport
	defer func() { http.DefaultClient.Transport = origClient }()

	http.DefaultClient.Transport = &mockRoundTripper{
		roundTrip: func(req *http.Request) (*http.Response, error) {
			rec := httptest.NewRecorder()
			switch req.URL.Path {
			case "/ekycs/verify":
				rec.Header().Set("Location", "/ekycs/ekyc-123")
				rec.WriteHeader(http.StatusCreated)
				rec.Body.WriteString(`{"id":"ekyc-123","status":"APPROVED"}`)
			case "/ekycs":
				rec.WriteHeader(http.StatusOK)
				rec.Body.WriteString(`[{"id":"ekyc-123","status":"APPROVED"}]`)
			case "/ekycs/ekyc-123":
				if req.Method == http.MethodDelete {
					rec.WriteHeader(http.StatusNoContent)
				} else {
					rec.WriteHeader(http.StatusOK)
					rec.Body.WriteString(`{"id":"ekyc-123","status":"APPROVED"}`)
				}
			case "/transfers":
				if req.Method == http.MethodPost {
					rec.Header().Set("Location", "/transfers/txn-123")
					rec.WriteHeader(http.StatusCreated)
					rec.Body.WriteString(`{"id":"txn-123","amount":100}`)
				} else {
					rec.WriteHeader(http.StatusOK)
					rec.Body.WriteString(`[{"id":"txn-123","amount":100}]`)
				}
			case "/transfers/txn-123":
				rec.WriteHeader(http.StatusOK)
				rec.Body.WriteString(`{"id":"txn-123","amount":100}`)
			default:
				rec.WriteHeader(http.StatusNotFound)
			}
			return rec.Result(), nil
		},
	}

	r := mux.NewRouter()
	r.HandleFunc("/api/v1/ekycs/verify", handleEKYCVerify).Methods("POST")
	r.HandleFunc("/api/v1/ekycs", handleListEKYC).Methods("GET")
	r.HandleFunc("/api/v1/ekycs/{id}", handleGetEKYC).Methods("GET")
	r.HandleFunc("/api/v1/ekycs/{id}", handleUpdateEKYC).Methods("PATCH")
	r.HandleFunc("/api/v1/ekycs/{id}", handleDeleteEKYC).Methods("DELETE")
	r.HandleFunc("/api/v1/transfers", handleCreateTransfer).Methods("POST")
	r.HandleFunc("/api/v1/transfers", handleGetAllTransfers).Methods("GET")
	r.HandleFunc("/api/v1/transfers/{id}", handleGetTransfer).Methods("GET")

	// 1. Test eKYC verify
	rec := httptest.NewRecorder()
	req := httptest.NewRequest("POST", "/api/v1/ekycs/verify", nil)
	r.ServeHTTP(rec, req)
	if rec.Code != http.StatusCreated {
		t.Errorf("eKYC verify status = %v, want 201", rec.Code)
	}
	if loc := rec.Header().Get("Location"); loc != "/ekycs/ekyc-123" {
		t.Errorf("eKYC verify Location = %v, want /ekycs/ekyc-123", loc)
	}

	// 2. Test eKYC list
	rec = httptest.NewRecorder()
	req = httptest.NewRequest("GET", "/api/v1/ekycs", nil)
	r.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("eKYC list status = %v, want 200", rec.Code)
	}

	// 3. Test eKYC get
	rec = httptest.NewRecorder()
	req = httptest.NewRequest("GET", "/api/v1/ekycs/ekyc-123", nil)
	r.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("eKYC get status = %v, want 200", rec.Code)
	}

	// 4. Test eKYC update
	rec = httptest.NewRecorder()
	req = httptest.NewRequest("PATCH", "/api/v1/ekycs/ekyc-123", nil)
	r.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("eKYC update status = %v, want 200", rec.Code)
	}

	// 5. Test eKYC delete
	rec = httptest.NewRecorder()
	req = httptest.NewRequest("DELETE", "/api/v1/ekycs/ekyc-123", nil)
	r.ServeHTTP(rec, req)
	if rec.Code != http.StatusNoContent {
		t.Errorf("eKYC delete status = %v, want 204", rec.Code)
	}

	// 6. Test Transfer create
	rec = httptest.NewRecorder()
	req = httptest.NewRequest("POST", "/api/v1/transfers", nil)
	r.ServeHTTP(rec, req)
	if rec.Code != http.StatusCreated {
		t.Errorf("Transfer create status = %v, want 201", rec.Code)
	}
	if loc := rec.Header().Get("Location"); loc != "/transfers/txn-123" {
		t.Errorf("Transfer create Location = %v, want /transfers/txn-123", loc)
	}

	// 7. Test Transfer get all
	rec = httptest.NewRecorder()
	req = httptest.NewRequest("GET", "/api/v1/transfers", nil)
	r.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("Transfer get all status = %v, want 200", rec.Code)
	}

	// 8. Test Transfer get by ID
	rec = httptest.NewRecorder()
	req = httptest.NewRequest("GET", "/api/v1/transfers/txn-123", nil)
	r.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Errorf("Transfer get by ID status = %v, want 200", rec.Code)
	}

}
