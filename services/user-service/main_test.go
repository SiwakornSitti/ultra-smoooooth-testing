package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

func TestGetEnvTableDriven(t *testing.T) {
	os.Setenv("PAOTANG_CLIENT_ID_TEST", "my-client-id")
	defer os.Unsetenv("PAOTANG_CLIENT_ID_TEST")

	tests := []struct {
		name     string
		key      string
		fallback string
		want     string
	}{
		{
			name:     "returns env value when variable is defined",
			key:      "PAOTANG_CLIENT_ID_TEST",
			fallback: "default-id",
			want:     "my-client-id",
		},
		{
			name:     "returns fallback value when variable is undefined",
			key:      "UNDEFINED_ENV_VAR",
			fallback: "default-id",
			want:     "default-id",
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
			message:        "phone is required",
			statusCode:     http.StatusBadRequest,
			wantStatusCode: http.StatusBadRequest,
			wantErrorMsg:   "phone is required",
		},
		{
			name:           "404 Not Found error response",
			message:        "User not found",
			statusCode:     http.StatusNotFound,
			wantStatusCode: http.StatusNotFound,
			wantErrorMsg:   "User not found",
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
