package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"strings"
)

type SendOTPRequest struct {
	Phone string `json:"phone"`
}

type VerifyOTPRequest struct {
	Phone string `json:"phone"`
	Code  string `json:"code"`
}

var (
	smsServiceURL = getEnv("SMS_SERVICE_URL", "http://wiremock:8080")
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

func handleSendOTP(w http.ResponseWriter, r *http.Request) {
	var req SendOTPRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.Phone == "" {
		writeJSONError(w, "phone is required", http.StatusBadRequest)
		return
	}

	smsBody, err := json.Marshal(map[string]string{
		"to":      req.Phone,
		"message": "Your OTP code is 123456",
	})
	if err != nil {
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	smsReq, err := http.NewRequestWithContext(r.Context(), http.MethodPost, fmt.Sprintf("%s/sms/send", smsServiceURL), bytes.NewReader(smsBody))
	if err != nil {
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	smsReq.Header.Set("Content-Type", "application/json")
	forwardHeaders(r, smsReq)

	resp, err := http.DefaultClient.Do(smsReq)
	if err != nil {
		slog.Error("Failed to call SMS service for OTP delivery", "error", err)
		writeJSONError(w, "SMS service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusMultipleChoices {
		writeJSONError(w, "Failed to send OTP via SMS", resp.StatusCode)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":  "sent",
		"message": "OTP sent successfully via SMS",
	})
}

func handleVerifyOTP(w http.ResponseWriter, r *http.Request) {
	var otp VerifyOTPRequest
	if err := json.NewDecoder(r.Body).Decode(&otp); err != nil {
		writeJSONError(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	if otp.Phone == "" || otp.Code == "" {
		writeJSONError(w, "phone and code are required", http.StatusBadRequest)
		return
	}

	mockScenario := r.Header.Get("Mock-Scenario")
	if strings.Contains(mockScenario, "OTP:INVALID") || otp.Code == "999999" {
		writeJSONError(w, "invalid_otp", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"verified": true})
}

func main() {
	r := http.NewServeMux()
	r.HandleFunc("/otp/send", handleSendOTP)
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
