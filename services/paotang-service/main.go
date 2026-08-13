package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"os"
	"strings"
)

type TokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	ExpiresIn   int    `json:"expires_in"`
}

var (
	paotangUpstreamURL = getEnv("PAOTANG_UPSTREAM_URL", "http://wiremock:8080")
	paotangAPIKey      = getEnv("PAOTANG_API_KEY", "")
)

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func writeJSONError(w http.ResponseWriter, message string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

func forwardHeaders(in *http.Request, out *http.Request) {
	for name, values := range in.Header {
		switch strings.ToLower(name) {
		case "accept-encoding", "connection", "content-length", "host", "transfer-encoding":
			continue
		}
		for _, value := range values {
			out.Header.Add(name, value)
		}
	}
}

func handleOAuthToken(w http.ResponseWriter, r *http.Request) {
	bodyBytes, err := io.ReadAll(r.Body)
	if err != nil {
		writeJSONError(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	req, err := http.NewRequestWithContext(r.Context(), http.MethodPost, paotangUpstreamURL+"/oauth/token", bytes.NewReader(bodyBytes))
	if err != nil {
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	forwardHeaders(r, req)
	if paotangAPIKey != "" {
		req.Header.Set("X-Api-Key", paotangAPIKey)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call Paotang provider", "error", err)
		writeJSONError(w, "Paotang provider unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	if contentType := resp.Header.Get("Content-Type"); contentType != "" {
		w.Header().Set("Content-Type", contentType)
	}
	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy Paotang provider response", "error", err)
	}
}

func main() {
	r := http.NewServeMux()
	r.HandleFunc("/oauth/token", handleOAuthToken)
	r.HandleFunc("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	port := getEnv("PORT", "8080")
	slog.Info("Paotang service starting", "port", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		slog.Error("Server failed to start", "error", err)
		os.Exit(1)
	}
}
