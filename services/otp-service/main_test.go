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

func TestHandleSendOTP(t *testing.T) {
	originalURL := smsServiceURL
	originalTransport := http.DefaultClient.Transport
	defer func() {
		smsServiceURL = originalURL
		http.DefaultClient.Transport = originalTransport
	}()
	smsServiceURL = "http://sms-service"
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
