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

type OTPRequest struct {
	Phone string `json:"phone"`
	Code  string `json:"code"`
}

var (
	otpUpstreamURL = getEnv("OTP_UPSTREAM_URL", "http://wiremock:8080")
	otpAPIKey      = getEnv("OTP_API_KEY", "")
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

func handleVerifyOTP(w http.ResponseWriter, r *http.Request) {
	var otp OTPRequest
	if err := json.NewDecoder(r.Body).Decode(&otp); err != nil {
		writeJSONError(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	if otp.Phone == "" || otp.Code == "" {
		writeJSONError(w, "phone and code are required", http.StatusBadRequest)
		return
	}

	body, err := json.Marshal(otp)
	if err != nil {
		writeJSONError(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	req, err := http.NewRequestWithContext(r.Context(), http.MethodPost, otpUpstreamURL+"/otp/verify", bytes.NewReader(body))
	if err != nil {
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	forwardHeaders(r, req)
	req.Header.Set("Content-Type", "application/json")
	if otpAPIKey != "" {
		req.Header.Set("X-Api-Key", otpAPIKey)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call OTP provider", "error", err)
		writeJSONError(w, "OTP provider unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	if contentType := resp.Header.Get("Content-Type"); contentType != "" {
		w.Header().Set("Content-Type", contentType)
	}
	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy OTP provider response", "error", err)
	}
}

func main() {
	r := http.NewServeMux()
	r.HandleFunc("/otp/verify", handleVerifyOTP)
	r.HandleFunc("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	port := getEnv("PORT", "8080")
	slog.Info("OTP service starting", "port", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		slog.Error("Server failed to start", "error", err)
		os.Exit(1)
	}
}
