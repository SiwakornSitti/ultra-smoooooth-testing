package main

import (
	"encoding/json"
	"net/http"
)

type User struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	Phone  string `json:"phone,omitempty"`
	Status string `json:"status,omitempty"`
}

type PaotangCallbackRequest struct {
	Code string `json:"code"`
}

type PaotangTokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	ExpiresIn   int    `json:"expires_in"`
}

type OTPVerifyRequest struct {
	Phone string `json:"phone"`
	Code  string `json:"code"`
}

type OTPVerifyResponse struct {
	Verified bool `json:"verified"`
}

type ErrorResponse struct {
	Error string `json:"error"`
	Code  string `json:"code,omitempty"`
}

func writeJSONError(w http.ResponseWriter, message string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(ErrorResponse{Error: message})
}
