package main

import (
	"bytes"
	"context"
	"io"
	"net/http"
	"testing"
)

type notificationRoundTripper struct {
	roundTrip func(req *http.Request) (*http.Response, error)
}

func (m *notificationRoundTripper) RoundTrip(req *http.Request) (*http.Response, error) {
	return m.roundTrip(req)
}

func TestDeliverNotification(t *testing.T) {
	originalTransport := http.DefaultClient.Transport
	originalURL := smsServiceURL
	originalAPIKey := smsAPIKey
	defer func() {
		http.DefaultClient.Transport = originalTransport
		smsServiceURL = originalURL
		smsAPIKey = originalAPIKey
	}()

	smsServiceURL = "http://wiremock"
	smsAPIKey = "test-api-key"
	http.DefaultClient.Transport = &notificationRoundTripper{
		roundTrip: func(req *http.Request) (*http.Response, error) {
			if req.URL.Path != "/sms/send" {
				t.Errorf("SMS path = %q; want /sms/send", req.URL.Path)
			}
			if got := req.Header.Get("Mock-Scenario"); got != "SMS:SUCCESS" {
				t.Errorf("Mock-Scenario = %q; want SMS:SUCCESS", got)
			}
			if got := req.Header.Get("Mock-ID"); got != "mock-123" {
				t.Errorf("Mock-ID = %q; want mock-123", got)
			}
			if got := req.Header.Get("X-Api-Key"); got != "test-api-key" {
				t.Errorf("X-Api-Key = %q; want test-api-key", got)
			}
			return &http.Response{
				StatusCode: http.StatusOK,
				Header:     http.Header{"Content-Type": []string{"application/json"}},
				Body:       io.NopCloser(bytes.NewReader(nil)),
			}, nil
		},
	}

	command := NotificationCommand{
		Channel: "sms",
		To:      "+66800000000",
		Message: "hello",
		Headers: map[string]string{
			"Mock-Scenario": "SMS:SUCCESS",
			"Mock-ID":       "mock-123",
		},
	}
	if err := deliverNotification(context.Background(), command); err != nil {
		t.Fatalf("deliverNotification() error = %v", err)
	}
}
