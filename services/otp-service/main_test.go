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

func TestHandleVerifyOTP(t *testing.T) {
	originalURL := otpUpstreamURL
	originalTransport := http.DefaultClient.Transport
	defer func() {
		otpUpstreamURL = originalURL
		http.DefaultClient.Transport = originalTransport
	}()
	otpUpstreamURL = "http://otp-provider"
	http.DefaultClient.Transport = roundTripperFunc(func(r *http.Request) (*http.Response, error) {
		if r.URL.Path != "/otp/verify" {
			t.Errorf("path = %q; want /otp/verify", r.URL.Path)
		}
		return &http.Response{
			StatusCode: http.StatusOK,
			Header:     http.Header{"Content-Type": []string{"application/json"}},
			Body:       io.NopCloser(bytes.NewBufferString(`{"verified":true}`)),
		}, nil
	})

	req := httptest.NewRequest(http.MethodPost, "/otp/verify", bytes.NewBufferString(`{"phone":"+66800000000","code":"123456"}`))
	rec := httptest.NewRecorder()
	handleVerifyOTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d; want 200", rec.Code)
	}
}

func TestHandleVerifyOTPRejectsMissingFields(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/otp/verify", bytes.NewBufferString(`{"phone":""}`))
	rec := httptest.NewRecorder()
	handleVerifyOTP(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d; want 400", rec.Code)
	}
}
