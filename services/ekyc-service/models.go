package main

import (
	"encoding/json"
	"net/http"
	"time"
)

type EKYCVerification struct {
	ID              string    `json:"id"`
	CustomerID      string    `json:"customer_id"`
	NationalID      string    `json:"national_id"`
	FullName        string    `json:"full_name"`
	DocumentType    string    `json:"document_type"`
	Status          string    `json:"status"`
	ConfidenceScore float64   `json:"confidence_score"`
	CreatedAt       time.Time `json:"created_at"`
}

type VerificationRequest struct {
	CustomerID   string `json:"customer_id"`
	NationalID   string `json:"national_id"`
	FullName     string `json:"full_name"`
	DocumentType string `json:"document_type"`
}

type UpdateVerificationRequest struct {
	CustomerID      *string  `json:"customer_id"`
	NationalID      *string  `json:"national_id"`
	FullName        *string  `json:"full_name"`
	DocumentType    *string  `json:"document_type"`
	Status          *string  `json:"status"`
	ConfidenceScore *float64 `json:"confidence_score"`
}

type ErrorResponse struct {
	Error string `json:"error"`
	Code  string `json:"code,omitempty"`
}

func writeJSONError(w http.ResponseWriter, message string, code string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	_ = json.NewEncoder(w).Encode(ErrorResponse{
		Error: message,
		Code:  code,
	})
}
