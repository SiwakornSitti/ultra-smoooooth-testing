package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"strings"
)

func setupRouter() *http.ServeMux {
	r := http.NewServeMux()
	r.HandleFunc("/otp/send", handleSendOTP)
	r.HandleFunc("/otp/verify", handleVerifyOTP)
	r.HandleFunc("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})
	return r
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

	smsReq, err := http.NewRequestWithContext(r.Context(), http.MethodPost, fmt.Sprintf("%s/sms/send", smsProviderURL), bytes.NewReader(smsBody))
	if err != nil {
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	smsReq.Header.Set("Content-Type", "application/json")
	forwardHeaders(r, smsReq)

	resp, err := http.DefaultClient.Do(smsReq)
	if err != nil {
		slog.Error("Failed to call SMS Provider for OTP delivery", "error", err)
		writeJSONError(w, "SMS provider unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusMultipleChoices {
		var providerError struct {
			Error string `json:"error"`
		}
		if json.NewDecoder(resp.Body).Decode(&providerError) == nil && providerError.Error != "" {
			writeJSONError(w, providerError.Error, resp.StatusCode)
			return
		}
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
