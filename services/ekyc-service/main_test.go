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

func TestEKYCCRUD(t *testing.T) {
	router := setupRouter()

	createBody, _ := json.Marshal(VerificationRequest{
		CustomerID:   "crud-customer",
		NationalID:   "crud-national-id",
		FullName:     "CRUD User",
		DocumentType: "national_id",
	})
	createReq := httptest.NewRequest(http.MethodPost, "/ekycs/verify", bytes.NewReader(createBody))
	createReq.Header.Set("Content-Type", "application/json")
	createRec := httptest.NewRecorder()
	router.ServeHTTP(createRec, createReq)
	if createRec.Code != http.StatusCreated {
		t.Fatalf("create status = %d; want %d", createRec.Code, http.StatusCreated)
	}

	var created EKYCVerification
	if err := json.Unmarshal(createRec.Body.Bytes(), &created); err != nil {
		t.Fatalf("failed to decode create response: %v", err)
	}

	listReq := httptest.NewRequest(http.MethodGet, "/ekycs", nil)
	listRec := httptest.NewRecorder()
	router.ServeHTTP(listRec, listReq)
	if listRec.Code != http.StatusOK {
		t.Fatalf("list status = %d; want %d", listRec.Code, http.StatusOK)
	}
	var listed []EKYCVerification
	if err := json.Unmarshal(listRec.Body.Bytes(), &listed); err != nil {
		t.Fatalf("failed to decode list response: %v", err)
	}
	if len(listed) == 0 {
		t.Fatal("expected created verification in list response")
	}

	getReq := httptest.NewRequest(http.MethodGet, "/ekycs/"+created.ID, nil)
	getRec := httptest.NewRecorder()
	router.ServeHTTP(getRec, getReq)
	if getRec.Code != http.StatusOK {
		t.Fatalf("get status = %d; want %d", getRec.Code, http.StatusOK)
	}

	updatedName := "Updated CRUD User"
	patchBody, _ := json.Marshal(UpdateVerificationRequest{FullName: &updatedName})
	patchReq := httptest.NewRequest(http.MethodPatch, "/ekycs/"+created.ID, bytes.NewReader(patchBody))
	patchReq.Header.Set("Content-Type", "application/json")
	patchRec := httptest.NewRecorder()
	router.ServeHTTP(patchRec, patchReq)
	if patchRec.Code != http.StatusOK {
		t.Fatalf("patch status = %d; want %d", patchRec.Code, http.StatusOK)
	}

	var updated EKYCVerification
	if err := json.Unmarshal(patchRec.Body.Bytes(), &updated); err != nil {
		t.Fatalf("failed to decode patch response: %v", err)
	}
	if updated.FullName != updatedName {
		t.Errorf("updated full name = %q; want %q", updated.FullName, updatedName)
	}
	if updated.CustomerID != created.CustomerID {
		t.Errorf("omitted customer_id changed from %q to %q", created.CustomerID, updated.CustomerID)
	}

	deleteReq := httptest.NewRequest(http.MethodDelete, "/ekycs/"+created.ID, nil)
	deleteRec := httptest.NewRecorder()
	router.ServeHTTP(deleteRec, deleteReq)
	if deleteRec.Code != http.StatusNoContent {
		t.Fatalf("delete status = %d; want %d", deleteRec.Code, http.StatusNoContent)
	}

	missingReq := httptest.NewRequest(http.MethodGet, "/ekycs/"+created.ID, nil)
	missingRec := httptest.NewRecorder()
	router.ServeHTTP(missingRec, missingReq)
	if missingRec.Code != http.StatusNotFound {
		t.Errorf("get after delete status = %d; want %d", missingRec.Code, http.StatusNotFound)
	}
}
