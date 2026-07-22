package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
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
