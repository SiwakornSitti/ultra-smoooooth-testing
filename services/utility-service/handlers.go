package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"strings"
	"time"
)

var (
	wiremockURL           = getEnv("WIREMOCK_URL", "http://wiremock:8080")
	wiremockAdminUser     = getEnv("WIREMOCK_ADMIN_USER", "admin")
	wiremockAdminPassword = getEnv("WIREMOCK_ADMIN_PASSWORD", "password")
	wiremockHTTPClient    = &http.Client{Timeout: 5 * time.Second}
)

func setupRouter() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /reset", resetWorkshopHandler)
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})
	return mux
}

func resetWiremockScenarios(ctx context.Context) error {
	if wiremockURL == "" {
		return nil
	}
	resetURL := fmt.Sprintf("%s/__admin/scenarios/reset", strings.TrimRight(wiremockURL, "/"))
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, resetURL, nil)
	if err != nil {
		return err
	}
	if wiremockAdminUser != "" && wiremockAdminPassword != "" {
		req.SetBasicAuth(wiremockAdminUser, wiremockAdminPassword)
	}

	resp, err := wiremockHTTPClient.Do(req)
	if err != nil {
		slog.Warn("Failed to call WireMock scenario reset", "url", resetURL, "error", err)
		return nil
	}
	defer resp.Body.Close()

	if resp.StatusCode >= http.StatusBadRequest {
		slog.Warn("WireMock scenario reset returned non-OK status", "status", resp.StatusCode)
	} else {
		slog.Info("Successfully reset WireMock scenarios")
	}
	return nil
}

func resetWorkshopHandler(w http.ResponseWriter, r *http.Request) {
	if db == nil {
		writeJSONError(w, "Database is unavailable", "DB_UNAVAILABLE", http.StatusServiceUnavailable)
		return
	}
	if err := resetWorkshopData(r.Context()); err != nil {
		slog.Error("Failed to reset workshop data", "error", err)
		writeJSONError(w, "Failed to reset workshop data", "DB_ERROR", http.StatusInternalServerError)
		return
	}

	if err := resetWiremockScenarios(r.Context()); err != nil {
		slog.Warn("WireMock scenario reset encountered error", "error", err)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "reset"})
}
