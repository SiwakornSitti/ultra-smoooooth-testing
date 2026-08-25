package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
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

func TestHandleWorkshopReset(t *testing.T) {
	originalTransport := http.DefaultClient.Transport
	originalURL := utilityServiceURL
	defer func() {
		http.DefaultClient.Transport = originalTransport
		utilityServiceURL = originalURL
	}()

	utilityServiceURL = "http://utility-service"
	http.DefaultClient.Transport = &mockRoundTripper{roundTrip: func(req *http.Request) (*http.Response, error) {
		if req.Method != http.MethodPost {
			t.Errorf("method = %s; want %s", req.Method, http.MethodPost)
		}
		if req.URL.Path != "/reset" {
			t.Errorf("path = %s; want /reset", req.URL.Path)
		}
		rec := httptest.NewRecorder()
		rec.WriteHeader(http.StatusOK)
		rec.Body.WriteString(`{"status":"reset"}`)
		return rec.Result(), nil
	}}

	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/v1/workshop/reset", nil)
	handleWorkshopReset(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d; want %d", rec.Code, http.StatusOK)
	}
	if got := strings.TrimSpace(rec.Body.String()); got != `{"status":"reset"}` {
		t.Fatalf("body = %s; want reset response", got)
	}
}

func TestProxyHandlers(t *testing.T) {
	origClient := http.DefaultClient.Transport
	defer func() { http.DefaultClient.Transport = origClient }()

	http.DefaultClient.Transport = &mockRoundTripper{
		roundTrip: func(req *http.Request) (*http.Response, error) {
			rec := httptest.NewRecorder()
			switch req.URL.Path {
			case "/accounts":
				rec.WriteHeader(http.StatusOK)
				rec.Body.WriteString(`[{"id":"source-account","user_id":"blocked-user","balance":1000}]`)
			case "/users/blocked-user":
				rec.WriteHeader(http.StatusOK)
				rec.Body.WriteString(`{"id":"blocked-user","status":"blocked"}`)
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

	// 6b. Blocked users cannot create transfers
	rec = httptest.NewRecorder()
	req = httptest.NewRequest("POST", "/api/v1/transfers", strings.NewReader(`{"source_account_id":"source-account","target_account_id":"target-account","amount":100}`))
	r.ServeHTTP(rec, req)
	if rec.Code != http.StatusForbidden {
		t.Errorf("blocked transfer status = %v, want 403", rec.Code)
	}

	var blockedBody map[string]string
	if err := json.NewDecoder(rec.Body).Decode(&blockedBody); err != nil {
		t.Fatalf("failed to decode blocked transfer response: %v", err)
	}
	if blockedBody["error"] != "blocked users cannot transfer" {
		t.Errorf("blocked transfer error = %q", blockedBody["error"])
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

func TestHandleCreateTransferBlocksTargetUser(t *testing.T) {
	originalTransport := http.DefaultClient.Transport
	originalUserServiceURL := userServiceURL
	originalBankAccountServiceURL := bankAccountServiceURL
	originalTransferServiceURL := transferServiceURL
	defer func() {
		http.DefaultClient.Transport = originalTransport
		userServiceURL = originalUserServiceURL
		bankAccountServiceURL = originalBankAccountServiceURL
		transferServiceURL = originalTransferServiceURL
	}()

	userServiceURL = "http://user-service"
	bankAccountServiceURL = "http://bank-account-service"
	transferServiceURL = "http://transfer-service"
	http.DefaultClient.Transport = &mockRoundTripper{roundTrip: func(req *http.Request) (*http.Response, error) {
		rec := httptest.NewRecorder()
		switch req.URL.Path {
		case "/accounts":
			rec.WriteHeader(http.StatusOK)
			rec.Body.WriteString(`[{"id":"source-account","user_id":"source-user"},{"id":"target-account","user_id":"target-user"}]`)
		case "/users/source-user":
			rec.WriteHeader(http.StatusOK)
			rec.Body.WriteString(`{"id":"source-user","status":"active"}`)
		case "/users/target-user":
			rec.WriteHeader(http.StatusOK)
			rec.Body.WriteString(`{"id":"target-user","status":"blocked"}`)
		default:
			rec.WriteHeader(http.StatusNotFound)
		}
		return rec.Result(), nil
	}}

	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/v1/transfers", strings.NewReader(`{"source_account_id":"source-account","target_account_id":"target-account","amount":100}`))
	handleCreateTransfer(rec, req)

	if rec.Code != http.StatusForbidden {
		t.Fatalf("blocked target transfer status = %d; want %d", rec.Code, http.StatusForbidden)
	}
}

func TestHandleCreateAccountDeliversSMSWithScenario(t *testing.T) {
	originalTransport := http.DefaultClient.Transport
	originalBankAccountServiceURL := bankAccountServiceURL
	originalOTPServiceURL := otpServiceURL
	defer func() {
		http.DefaultClient.Transport = originalTransport
		bankAccountServiceURL = originalBankAccountServiceURL
		otpServiceURL = originalOTPServiceURL
	}()

	bankAccountServiceURL = "http://bank-account-service"
	otpServiceURL = "http://otp-service"
	calledSMS := false
	http.DefaultClient.Transport = &mockRoundTripper{roundTrip: func(req *http.Request) (*http.Response, error) {
		if req.Header.Get("Mock-Scenario") != "SMS:SUCCESS" {
			t.Errorf("Mock-Scenario = %q; want SMS:SUCCESS", req.Header.Get("Mock-Scenario"))
		}

		rec := httptest.NewRecorder()
		switch req.URL.Path {
		case "/accounts":
			rec.WriteHeader(http.StatusCreated)
			rec.Body.WriteString(`{"id":"account-123","user_id":"user-123","balance":1000,"phone":"+66800000000"}`)
		case "/otp/send":
			calledSMS = true
			var body struct {
				Phone string `json:"phone"`
			}
			if err := json.NewDecoder(req.Body).Decode(&body); err != nil {
				t.Errorf("decode OTP request: %v", err)
			} else if body.Phone != "+66800000000" {
				t.Errorf("OTP phone = %q; want +66800000000", body.Phone)
			}
			rec.WriteHeader(http.StatusOK)
			rec.Body.WriteString(`{"status":"sent"}`)
		default:
			rec.WriteHeader(http.StatusNotFound)
		}
		return rec.Result(), nil
	}}

	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/api/v1/accounts", strings.NewReader(`{"user_id":"user-123","balance":1000,"phone":"+66800000000"}`))
	req.Header.Set("Mock-Scenario", "SMS:SUCCESS")
	handleCreateAccount(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("status = %d; want %d", rec.Code, http.StatusCreated)
	}
	if !calledSMS {
		t.Fatal("expected account creation to send SMS")
	}
}
