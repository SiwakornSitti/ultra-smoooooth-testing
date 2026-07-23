package main

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/gorilla/mux"
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

type ErrorResponse struct {
	Error string `json:"error"`
	Code  string `json:"code"`
}

var (
	verificationsStore = make(map[string]EKYCVerification)
	storeMu            sync.RWMutex
)

func writeJSONError(w http.ResponseWriter, message string, code string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(ErrorResponse{
		Error: message,
		Code:  code,
	})
}

func generateID(prefix string) string {
	b := make([]byte, 4)
	rand.Read(b)
	return fmt.Sprintf("%s-%s", prefix, hex.EncodeToString(b))
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

	storeMu.Lock()
	verificationsStore[record.ID] = record
	storeMu.Unlock()

	slog.Info("eKYC verification created", "id", record.ID, "customer_id", record.CustomerID)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Location", fmt.Sprintf("/ekycs/%s", record.ID))
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(record)
}

func getEKYCHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	storeMu.RLock()
	record, exists := verificationsStore[id]
	storeMu.RUnlock()

	if !exists {
		writeJSONError(w, "eKYC verification record not found", "NOT_FOUND", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(record)
}

func setupRouter() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/ekycs/verify", createEKYCHandler).Methods("POST")
	r.HandleFunc("/ekycs/{id}", getEKYCHandler).Methods("GET")
	return r
}

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8084"
	}

	router := setupRouter()
	slog.Info("eKYC service starting", "port", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		slog.Error("Server failed to start", "error", err)
		os.Exit(1)
	}
}
