package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCreateEKYCHandler(t *testing.T) {
	router := setupRouter()

	t.Run("successful eKYC verification creation", func(t *testing.T) {
		reqBody := VerificationRequest{
			CustomerID:   "cust-100",
			NationalID:   "1100200300401",
			FullName:     "Jane Doe",
			DocumentType: "national_id",
		}
		bodyBytes, _ := json.Marshal(reqBody)

		req, _ := http.NewRequest("POST", "/ekycs/verify", bytes.NewReader(bodyBytes))
		req.Header.Set("Content-Type", "application/json")
		rec := httptest.NewRecorder()

		router.ServeHTTP(rec, req)

		if rec.Code != http.StatusCreated {
			t.Fatalf("expected status 201, got %d", rec.Code)
		}

		if location := rec.Header().Get("Location"); location == "" {
			t.Errorf("expected Location header in 201 response")
		}

		var res EKYCVerification
		if err := json.Unmarshal(rec.Body.Bytes(), &res); err != nil {
			t.Fatalf("failed to unmarshal response: %v", err)
		}

		if res.ID == "" {
			t.Errorf("expected non-empty verification ID")
		}
		if res.Status != "APPROVED" {
			t.Errorf("expected status APPROVED, got %s", res.Status)
		}
	})

	t.Run("missing required fields returns 400", func(t *testing.T) {
		reqBody := VerificationRequest{
			CustomerID: "cust-100",
		}
		bodyBytes, _ := json.Marshal(reqBody)

		req, _ := http.NewRequest("POST", "/ekycs/verify", bytes.NewReader(bodyBytes))
		req.Header.Set("Content-Type", "application/json")
		rec := httptest.NewRecorder()

		router.ServeHTTP(rec, req)

		if rec.Code != http.StatusBadRequest {
			t.Fatalf("expected status 400, got %d", rec.Code)
		}
	})
}
