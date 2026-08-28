package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func setupRouter() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/ekycs/verify", createEKYCHandler).Methods("POST")
	r.HandleFunc("/ekycs", listEKYCHandler).Methods("GET")
	r.HandleFunc("/ekycs/{id}", getEKYCHandler).Methods("GET")
	r.HandleFunc("/ekycs/{id}", updateEKYCHandler).Methods("PATCH")
	r.HandleFunc("/ekycs/{id}", deleteEKYCHandler).Methods("DELETE")
	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	}).Methods("GET")
	return r
}

func validateUpdateVerificationRequest(req UpdateVerificationRequest) error {
	for name, value := range map[string]*string{
		"customer_id":   req.CustomerID,
		"national_id":   req.NationalID,
		"full_name":     req.FullName,
		"document_type": req.DocumentType,
		"status":        req.Status,
	} {
		if value != nil && *value == "" {
			return fmt.Errorf("%s cannot be empty", name)
		}
	}
	return nil
}

func createEKYCHandler(w http.ResponseWriter, r *http.Request) {
	var req VerificationRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, "Invalid request payload", "INVALID_INPUT", http.StatusBadRequest)
		return
	}

	if req.CustomerID == "" || req.NationalID == "" || req.FullName == "" {
		writeJSONError(w, "customer_id, national_id, and full_name are required", "VALIDATION_FAILED", http.StatusBadRequest)
		return
	}

	docType := req.DocumentType
	if docType == "" {
		docType = "national_id"
	}

	record := EKYCVerification{
		ID:              generateID("ekyc"),
		CustomerID:      req.CustomerID,
		NationalID:      req.NationalID,
		FullName:        req.FullName,
		DocumentType:    docType,
		Status:          "APPROVED",
		ConfidenceScore: 0.98,
		CreatedAt:       time.Now().UTC(),
	}

	if err := insertEKYC(r.Context(), record); err != nil {
		slog.Error("Failed to insert eKYC verification", "error", err)
		writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
		return
	}

	slog.Info("eKYC verification created", "id", record.ID, "customer_id", record.CustomerID)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Location", fmt.Sprintf("/ekycs/%s", record.ID))
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(record)
}

func getEKYCHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	record, err := fetchEKYCByID(r.Context(), id)
	if errors.Is(err, sql.ErrNoRows) {
		writeJSONError(w, "eKYC verification record not found", "NOT_FOUND", http.StatusNotFound)
		return
	} else if err != nil {
		slog.Error("Database query failed", "error", err)
		writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(record)
}

func listEKYCHandler(w http.ResponseWriter, r *http.Request) {
	records, err := fetchAllEKYC(r.Context())
	if err != nil {
		slog.Error("Failed to list eKYC verifications", "error", err)
		writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(records)
}

func updateEKYCHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	var req UpdateVerificationRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, "Invalid request payload", "INVALID_INPUT", http.StatusBadRequest)
		return
	}

	if err := validateUpdateVerificationRequest(req); err != nil {
		writeJSONError(w, err.Error(), "VALIDATION_FAILED", http.StatusBadRequest)
		return
	}

	record, err := updateEKYC(r.Context(), id, req)
	if errors.Is(err, sql.ErrNoRows) {
		writeJSONError(w, "eKYC verification record not found", "NOT_FOUND", http.StatusNotFound)
		return
	} else if err != nil {
		slog.Error("Failed to update eKYC verification", "error", err)
		writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(record)
}

func deleteEKYCHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	err := deleteEKYC(r.Context(), id)
	if errors.Is(err, sql.ErrNoRows) {
		writeJSONError(w, "eKYC verification record not found", "NOT_FOUND", http.StatusNotFound)
		return
	} else if err != nil {
		slog.Error("Failed to delete eKYC verification", "error", err)
		writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
