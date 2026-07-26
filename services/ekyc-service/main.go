package main

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/exaring/otelpgx"
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
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
	db                 *sql.DB
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

func initDB() {
	dbHost := os.Getenv("DB_HOST")
	if dbHost == "" {
		slog.Info("DB_HOST not set, using in-memory store for eKYC service")
		return
	}
	dbPort := os.Getenv("DB_PORT")
	if dbPort == "" {
		dbPort = "5432"
	}
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))

	config, err := pgx.ParseConfig(connStr)
	if err != nil {
		slog.Warn("Failed to parse DB config, falling back to in-memory store", "error", err)
		return
	}

	config.Tracer = otelpgx.NewTracer()
	conn := stdlib.OpenDB(*config)

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	if err := conn.PingContext(ctx); err != nil {
		slog.Warn("Failed to ping DB, falling back to in-memory store", "error", err)
		conn.Close()
		return
	}

	db = conn
	slog.Info("Successfully connected to database for eKYC service")
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

	if db != nil {
		query := `INSERT INTO ekyc_verifications (id, customer_id, national_id, full_name, document_type, status, confidence_score, created_at)
		          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
		_, err := db.ExecContext(r.Context(), query, record.ID, record.CustomerID, record.NationalID, record.FullName, record.DocumentType, record.Status, record.ConfidenceScore, record.CreatedAt)
		if err != nil {
			slog.Error("Failed to insert eKYC verification into DB", "error", err)
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}
	} else {
		storeMu.Lock()
		verificationsStore[record.ID] = record
		storeMu.Unlock()
	}

	slog.Info("eKYC verification created", "id", record.ID, "customer_id", record.CustomerID)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Location", fmt.Sprintf("/ekycs/%s", record.ID))
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(record)
}

func getEKYCHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	var record EKYCVerification
	if db != nil {
		query := `SELECT id, customer_id, national_id, full_name, document_type, status, confidence_score, created_at
		          FROM ekyc_verifications WHERE id = $1`
		err := db.QueryRowContext(r.Context(), query, id).Scan(
			&record.ID, &record.CustomerID, &record.NationalID, &record.FullName,
			&record.DocumentType, &record.Status, &record.ConfidenceScore, &record.CreatedAt,
		)
		if err == sql.ErrNoRows {
			writeJSONError(w, "eKYC verification record not found", "NOT_FOUND", http.StatusNotFound)
			return
		} else if err != nil {
			slog.Error("Database query failed", "error", err)
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}
	} else {
		storeMu.RLock()
		rec, exists := verificationsStore[id]
		storeMu.RUnlock()
		if !exists {
			writeJSONError(w, "eKYC verification record not found", "NOT_FOUND", http.StatusNotFound)
			return
		}
		record = rec
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(record)
}

func setupRouter() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/ekycs/verify", createEKYCHandler).Methods("POST")
	r.HandleFunc("/ekycs/{id}", getEKYCHandler).Methods("GET")
	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	}).Methods("GET")
	return r
}

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	initDB()

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
