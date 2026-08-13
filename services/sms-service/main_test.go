package main

import (
	"bytes"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHandleSendSMS(t *testing.T) {
	originalURL := smsUpstreamURL
	originalTransport := http.DefaultClient.Transport
	defer func() {
		smsUpstreamURL = originalURL
		http.DefaultClient.Transport = originalTransport
	}()
	smsUpstreamURL = "http://sms-provider"
	http.DefaultClient.Transport = roundTripperFunc(func(r *http.Request) (*http.Response, error) {
		if r.URL.Path != "/sms/send" {
			t.Errorf("path = %q; want /sms/send", r.URL.Path)
		}
		if got := r.Header.Get("Mock-Scenario"); got != "SMS:SUCCESS" {
			t.Errorf("Mock-Scenario = %q; want SMS:SUCCESS", got)
		}
		return &http.Response{
			StatusCode: http.StatusOK,
			Header:     http.Header{"Content-Type": []string{"application/json"}},
			Body:       io.NopCloser(bytes.NewBufferString(`{"status":"sent"}`)),
		}, nil
	})

	req := httptest.NewRequest(http.MethodPost, "/sms/send", bytes.NewBufferString(`{"to":"+66800000000","message":"hello"}`))
	req.Header.Set("Mock-Scenario", "SMS:SUCCESS")
	rec := httptest.NewRecorder()
	handleSendSMS(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d; want 200", rec.Code)
	}
}

type roundTripperFunc func(*http.Request) (*http.Response, error)

func (f roundTripperFunc) RoundTrip(r *http.Request) (*http.Response, error) {
	return f(r)
}

func TestHandleSendSMSRejectsMissingFields(t *testing.T) {
	req := httptest.NewRequest(http.MethodPost, "/sms/send", bytes.NewBufferString(`{"to":""}`))
	rec := httptest.NewRecorder()
	handleSendSMS(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d; want 400", rec.Code)
	}
}

