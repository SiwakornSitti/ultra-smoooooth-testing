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

func listEKYCHandler(w http.ResponseWriter, r *http.Request) {
	var records []EKYCVerification

	if db != nil {
		rows, err := db.QueryContext(r.Context(), `
			SELECT id, customer_id, national_id, full_name, document_type, status, confidence_score, created_at
			FROM ekyc_verifications ORDER BY created_at DESC`)
		if err != nil {
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		records = make([]EKYCVerification, 0)
		for rows.Next() {
			var record EKYCVerification
			if err := rows.Scan(
				&record.ID, &record.CustomerID, &record.NationalID, &record.FullName,
				&record.DocumentType, &record.Status, &record.ConfidenceScore, &record.CreatedAt,
			); err != nil {
				writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
				return
			}
			records = append(records, record)
		}
		if err := rows.Err(); err != nil {
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}
	} else {
		storeMu.RLock()
		records = make([]EKYCVerification, 0, len(verificationsStore))
		for _, record := range verificationsStore {
			records = append(records, record)
		}
		storeMu.RUnlock()
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

	if db != nil {
		result, err := db.ExecContext(r.Context(), `
			UPDATE ekyc_verifications
			SET customer_id = COALESCE($1, customer_id),
			    national_id = COALESCE($2, national_id),
			    full_name = COALESCE($3, full_name),
			    document_type = COALESCE($4, document_type),
			    status = COALESCE($5, status),
			    confidence_score = COALESCE($6, confidence_score)
			WHERE id = $7`,
			req.CustomerID, req.NationalID, req.FullName, req.DocumentType,
			req.Status, req.ConfidenceScore, id,
		)
		if err != nil {
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}

		rows, err := result.RowsAffected()
		if err != nil {
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}
		if rows == 0 {
			writeJSONError(w, "eKYC verification record not found", "NOT_FOUND", http.StatusNotFound)
			return
		}

		getEKYCHandler(w, r)
		return
	}

	storeMu.Lock()
	record, exists := verificationsStore[id]
	if !exists {
		storeMu.Unlock()
		writeJSONError(w, "eKYC verification record not found", "NOT_FOUND", http.StatusNotFound)
		return
	}

	if req.CustomerID != nil {
		record.CustomerID = *req.CustomerID
	}
	if req.NationalID != nil {
		record.NationalID = *req.NationalID
	}
	if req.FullName != nil {
		record.FullName = *req.FullName
	}
	if req.DocumentType != nil {
		record.DocumentType = *req.DocumentType
	}
	if req.Status != nil {
		record.Status = *req.Status
	}
	if req.ConfidenceScore != nil {
		record.ConfidenceScore = *req.ConfidenceScore
	}
	verificationsStore[id] = record
	storeMu.Unlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(record)
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

func deleteEKYCHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	if db != nil {
		result, err := db.ExecContext(r.Context(), "DELETE FROM ekyc_verifications WHERE id = $1", id)
		if err != nil {
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}
		rows, err := result.RowsAffected()
		if err != nil {
			writeJSONError(w, "Database error", "DB_ERROR", http.StatusInternalServerError)
			return
		}
		if rows == 0 {
			writeJSONError(w, "eKYC verification record not found", "NOT_FOUND", http.StatusNotFound)
			return
		}
	} else {
		storeMu.Lock()
		if _, exists := verificationsStore[id]; !exists {
			storeMu.Unlock()
			writeJSONError(w, "eKYC verification record not found", "NOT_FOUND", http.StatusNotFound)
			return
		}
		delete(verificationsStore, id)
		storeMu.Unlock()
	}

	w.WriteHeader(http.StatusNoContent)
}

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
