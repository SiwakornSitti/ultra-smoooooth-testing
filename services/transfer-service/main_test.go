package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"transfer-service/api"
)

func TestCreateTransferHandler(t *testing.T) {
	router := api.SetupRouter()

	t.Run("successful transfer creation", func(t *testing.T) {
		reqBody := api.CreateTransferRequest{
			SourceAccountID: "acc-123",
			TargetAccountID: "acc-456",
			Amount:          500.0,
			Currency:        "THB",
		}
		bodyBytes, _ := json.Marshal(reqBody)

		req, _ := http.NewRequest("POST", "/transfers", bytes.NewReader(bodyBytes))
		req.Header.Set("Content-Type", "application/json")
		rec := httptest.NewRecorder()

		router.ServeHTTP(rec, req)

		if rec.Code != http.StatusCreated {
			t.Fatalf("expected status 201, got %d", rec.Code)
		}

		if location := rec.Header().Get("Location"); location == "" {
			t.Errorf("expected Location header in 201 response")
		}

		var res api.FundTransfer
		if err := json.Unmarshal(rec.Body.Bytes(), &res); err != nil {
			t.Fatalf("failed to unmarshal response: %v", err)
		}

		if res.ID == "" {
			t.Errorf("expected non-empty transfer ID")
		}
		if res.Status != "COMPLETED" {
			t.Errorf("expected status COMPLETED, got %s", res.Status)
		}
	})

	t.Run("invalid transfer amount returns 400", func(t *testing.T) {
		reqBody := api.CreateTransferRequest{
			SourceAccountID: "acc-123",
			TargetAccountID: "acc-456",
			Amount:          -50.0,
		}
		bodyBytes, _ := json.Marshal(reqBody)

		req, _ := http.NewRequest("POST", "/transfers", bytes.NewReader(bodyBytes))
		req.Header.Set("Content-Type", "application/json")
		rec := httptest.NewRecorder()

		router.ServeHTTP(rec, req)

		if rec.Code != http.StatusBadRequest {
			t.Fatalf("expected status 400, got %d", rec.Code)
		}
	})
}

func TestGetAllTransfersHandler(t *testing.T) {
	router := api.SetupRouter()

	req, _ := http.NewRequest("GET", "/transfers", nil)
	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}

	var transfers []api.FundTransfer
	if err := json.Unmarshal(rec.Body.Bytes(), &transfers); err != nil {
		t.Fatalf("failed to unmarshal response: %v", err)
	}
}
