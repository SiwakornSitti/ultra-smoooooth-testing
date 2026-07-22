package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

func TestGetEnvTableDriven(t *testing.T) {
	os.Setenv("SMS_API_KEY_TEST", "my-api-key")
	defer os.Unsetenv("SMS_API_KEY_TEST")

	tests := []struct {
		name     string
		key      string
		fallback string
		want     string
	}{
		{
			name:     "returns env value when variable is defined",
			key:      "SMS_API_KEY_TEST",
			fallback: "fallback-key",
			want:     "my-api-key",
		},
		{
			name:     "returns fallback value when variable is undefined",
			key:      "UNDEFINED_ENV_VAR",
			fallback: "fallback-key",
			want:     "fallback-key",
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
			message:        "user_id is required",
			statusCode:     http.StatusBadRequest,
			wantStatusCode: http.StatusBadRequest,
			wantErrorMsg:   "user_id is required",
		},
		{
			name:           "404 Not Found error response",
			message:        "Account not found",
			statusCode:     http.StatusNotFound,
			wantStatusCode: http.StatusNotFound,
			wantErrorMsg:   "Account not found",
		},
		{
			name:           "500 Internal Server error response",
			message:        "Database error",
			statusCode:     http.StatusInternalServerError,
			wantStatusCode: http.StatusInternalServerError,
			wantErrorMsg:   "Database error",
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
