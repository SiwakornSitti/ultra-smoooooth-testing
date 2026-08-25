package main

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

type roundTripperFunc func(*http.Request) (*http.Response, error)

func (f roundTripperFunc) RoundTrip(r *http.Request) (*http.Response, error) {
	return f(r)
}

func TestHandleSendOTP(t *testing.T) {
	originalURL := smsProviderURL
	originalTransport := http.DefaultClient.Transport
	defer func() {
		smsProviderURL = originalURL
		http.DefaultClient.Transport = originalTransport
	}()
	smsProviderURL = "http://wiremock"
	http.DefaultClient.Transport = roundTripperFunc(func(r *http.Request) (*http.Response, error) {
		if r.URL.Path != "/sms/send" {
			t.Errorf("path = %q; want /sms/send", r.URL.Path)
		}
		return &http.Response{
			StatusCode: http.StatusOK,
			Header:     http.Header{"Content-Type": []string{"application/json"}},
			Body:       io.NopCloser(bytes.NewBufferString(`{"status":"sent"}`)),
		}, nil
	})

	req := httptest.NewRequest(http.MethodPost, "/otp/send", bytes.NewBufferString(`{"phone":"+66800000000"}`))
	rec := httptest.NewRecorder()
	handleSendOTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d; want 200", rec.Code)
	}
}

func TestHandleSendOTPReturnsProviderError(t *testing.T) {
	originalURL := smsProviderURL
	originalTransport := http.DefaultClient.Transport
	defer func() {
		smsProviderURL = originalURL
		http.DefaultClient.Transport = originalTransport
	}()
	smsProviderURL = "http://wiremock"
	http.DefaultClient.Transport = roundTripperFunc(func(*http.Request) (*http.Response, error) {
		return &http.Response{
			StatusCode: http.StatusBadRequest,
			Header:     http.Header{"Content-Type": []string{"application/json"}},
			Body:       io.NopCloser(bytes.NewBufferString(`{"error":"invalid_number"}`)),
		}, nil
	})

	req := httptest.NewRequest(http.MethodPost, "/otp/send", bytes.NewBufferString(`{"phone":"+66800000000"}`))
	rec := httptest.NewRecorder()
	handleSendOTP(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d; want 400", rec.Code)
	}
	var response map[string]string
	if err := json.NewDecoder(rec.Body).Decode(&response); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if response["error"] != "invalid_number" {
		t.Errorf("error = %q; want invalid_number", response["error"])
	}
}

func TestHandleVerifyOTPSuccess(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/otp/verify", bytes.NewBufferString(`{"phone":"+66800000000","code":"123456"}`))
	rec := httptest.NewRecorder()
	handleVerifyOTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d; want 200", rec.Code)
	}
}

func TestHandleVerifyOTPInvalidScenario(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/otp/verify", bytes.NewBufferString(`{"phone":"+66800000000","code":"123456"}`))
	req.Header.Set("Mock-Scenario", "OTP:INVALID")
	rec := httptest.NewRecorder()
	handleVerifyOTP(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d; want 400", rec.Code)
	}
}
