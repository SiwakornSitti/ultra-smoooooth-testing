package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/exaring/otelpgx"
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
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

var db *sql.DB

var (
	paotangServiceURL   = getEnv("PAOTANG_SERVICE_URL", "")
	paotangClientID     = getEnv("PAOTANG_CLIENT_ID", "")
	paotangClientSecret = getEnv("PAOTANG_CLIENT_SECRET", "")
	otpServiceURL       = getEnv("OTP_SERVICE_URL", "")
)

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

// writeJSONError writes a JSON-shaped error body so responses stay
// consistent with success responses (avoids plain-text bodies that break
// callers doing res.json()).
func writeJSONError(w http.ResponseWriter, message string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

// forwardMockHeaders copies WireMock routing headers from the inbound
// request onto the outbound request, so callers don't repeat this per call site.
func forwardMockHeaders(in *http.Request, out *http.Request) {
	for _, h := range []string{"Use-Mock", "Mock-Scenario", "Mock-ID"} {
		if v := in.Header.Get(h); v != "" {
			out.Header.Set(h, v)
		}
	}
}

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	dbHost := os.Getenv("DB_HOST")
	if dbHost == "" {
		dbHost = "localhost"
	}
	dbPort := os.Getenv("DB_PORT")
	if dbPort == "" {
		dbPort = "5432"
	}
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))

	config, err := pgx.ParseConfig(connStr)
	if err != nil {
		slog.Error("Failed to parse connection string", "error", err)
		os.Exit(1)
	}

	config.Tracer = otelpgx.NewTracer()

	db = stdlib.OpenDB(*config)
	defer db.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err = db.PingContext(ctx); err != nil {
		slog.Error("Failed to ping database", "error", err)
		os.Exit(1)
	}
	slog.Info("Successfully connected to database")

	r := mux.NewRouter()
	r.HandleFunc("/users", handleGetUsers).Methods("GET")
	r.HandleFunc("/users", handleCreateUser).Methods("POST")
	r.HandleFunc("/users/{id}", handleGetUser).Methods("GET")
	r.HandleFunc("/users/{id}", handleUpdateUser).Methods("PUT")
	r.HandleFunc("/users/{id}", handleDeleteUser).Methods("DELETE")
	r.HandleFunc("/auth/paotang/callback", handlePaotangCallback).Methods("POST")
	r.HandleFunc("/auth/otp/verify", handleOTPVerify).Methods("POST")

	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	slog.Info("User service starting", "port", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		slog.Error("Server failed to start", "error", err)
		os.Exit(1)
	}
}

func handleGetUsers(w http.ResponseWriter, r *http.Request) {
	slog.Info("Fetching all users")
	rows, err := db.QueryContext(r.Context(), "SELECT id, name, email, phone, status FROM users")
	if err != nil {
		slog.Error("Query failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var u User
		if err := rows.Scan(&u.ID, &u.Name, &u.Email, &u.Phone, &u.Status); err != nil {
			slog.Error("Scan failed", "error", err)
			writeJSONError(w, "Database error", http.StatusInternalServerError)
			return
		}
		users = append(users, u)
	}
	if err := rows.Err(); err != nil {
		slog.Error("Rows iteration failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func handleCreateUser(w http.ResponseWriter, r *http.Request) {
	var u User
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		slog.Error("Invalid request body", "error", err)
		writeJSONError(w, err.Error(), http.StatusBadRequest)
		return
	}
	if u.Phone == "" {
		slog.Error("Missing phone in request")
		writeJSONError(w, "phone is required", http.StatusBadRequest)
		return
	}
	if u.Status == "" {
		u.Status = "active"
	}
	slog.Info("Creating user")
	err := db.QueryRowContext(r.Context(), "INSERT INTO users (name, email, phone, status) VALUES ($1, $2, $3, $4) RETURNING id", u.Name, u.Email, u.Phone, u.Status).Scan(&u.ID)
	if err != nil {
		slog.Error("Insert failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(u)
}

func handleGetUser(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	slog.Info("Fetching user", "user_id", id)
	var u User
	err := db.QueryRowContext(r.Context(), "SELECT id, name, email, phone, status FROM users WHERE id = $1", id).Scan(&u.ID, &u.Name, &u.Email, &u.Phone, &u.Status)
	if err == sql.ErrNoRows {
		slog.Warn("User not found", "user_id", id)
		writeJSONError(w, "User not found", http.StatusNotFound)
		return
	} else if err != nil {
		slog.Error("Query failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(u)
}

func handleUpdateUser(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	var u User
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		slog.Error("Invalid request body", "error", err)
		writeJSONError(w, err.Error(), http.StatusBadRequest)
		return
	}
	slog.Info("Updating user", "user_id", id)
	_, err := db.ExecContext(r.Context(), "UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4", u.Name, u.Email, u.Phone, id)
	if err != nil {
		slog.Error("Update failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	u.ID = id
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(u)
}

func handleDeleteUser(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	slog.Info("Deleting user", "user_id", id)
	_, err := db.ExecContext(r.Context(), "DELETE FROM users WHERE id = $1", id)
	if err != nil {
		slog.Error("Delete failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// handlePaotangCallback exchanges an authcode for an access token via Paotang Pass.
func handlePaotangCallback(w http.ResponseWriter, r *http.Request) {
	var req PaotangCallbackRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		slog.Error("Invalid request body", "error", err)
		writeJSONError(w, err.Error(), http.StatusBadRequest)
		return
	}

	slog.Info("Exchanging Paotang authcode for access token")

	form := url.Values{}
	form.Set("grant_type", "authorization_code")
	form.Set("code", req.Code)
	form.Set("client_id", paotangClientID)
	form.Set("client_secret", paotangClientSecret)

	tokenReq, err := http.NewRequestWithContext(r.Context(), "POST", paotangServiceURL+"/oauth/token", strings.NewReader(form.Encode()))
	if err != nil {
		slog.Error("Failed to build Paotang token request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	tokenReq.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	if useMock := r.Header.Get("Use-Mock"); useMock != "" {
		tokenReq.Header.Set("Use-Mock", useMock)
	}
	if scenario := r.Header.Get("Mock-Scenario"); scenario != "" {
		tokenReq.Header.Set("Mock-Scenario", scenario)
	}

	resp, err := http.DefaultClient.Do(tokenReq)
	if err != nil {
		slog.Error("Failed to call Paotang", "error", err)
		writeJSONError(w, "Paotang service unavailable", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")

	if resp.StatusCode == http.StatusBadRequest {
		slog.Warn("Paotang rejected authcode")
		w.WriteHeader(http.StatusBadRequest)
		io.Copy(w, resp.Body)
		return
	}

	if resp.StatusCode != http.StatusOK {
		slog.Error("Unexpected Paotang response", "status", resp.StatusCode)
		writeJSONError(w, "Paotang service error", http.StatusBadGateway)
		return
	}

	var tokenResp PaotangTokenResponse
	if err := json.NewDecoder(resp.Body).Decode(&tokenResp); err != nil {
		slog.Error("Failed to decode Paotang response", "error", err)
		writeJSONError(w, "Paotang service error", http.StatusBadGateway)
		return
	}

	json.NewEncoder(w).Encode(tokenResp)
}

// handleOTPVerify verifies an OTP code sent via SMS, second factor after
// the Paotang authcode exchange.
func handleOTPVerify(w http.ResponseWriter, r *http.Request) {
	var req OTPVerifyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		slog.Error("Invalid request body", "error", err)
		writeJSONError(w, err.Error(), http.StatusBadRequest)
		return
	}

	slog.Info("Verifying OTP code")

	body, err := json.Marshal(req)
	if err != nil {
		slog.Error("Failed to build OTP verify request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	otpReq, err := http.NewRequestWithContext(r.Context(), "POST", otpServiceURL+"/otp/verify", strings.NewReader(string(body)))
	if err != nil {
		slog.Error("Failed to build OTP verify request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	otpReq.Header.Set("Content-Type", "application/json")
	if useMock := r.Header.Get("Use-Mock"); useMock != "" {
		otpReq.Header.Set("Use-Mock", useMock)
	}
	if scenario := r.Header.Get("Mock-Scenario"); scenario != "" {
		otpReq.Header.Set("Mock-Scenario", scenario)
	}

	resp, err := http.DefaultClient.Do(otpReq)
	if err != nil {
		slog.Error("Failed to call OTP service", "error", err)
		writeJSONError(w, "OTP service unavailable", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")

	if resp.StatusCode == http.StatusBadRequest {
		slog.Warn("OTP service rejected code")
		w.WriteHeader(http.StatusBadRequest)
		io.Copy(w, resp.Body)
		return
	}

	if resp.StatusCode != http.StatusOK {
		slog.Error("Unexpected OTP service response", "status", resp.StatusCode)
		writeJSONError(w, "OTP service error", http.StatusBadGateway)
		return
	}

	var verifyResp OTPVerifyResponse
	if err := json.NewDecoder(resp.Body).Decode(&verifyResp); err != nil {
		slog.Error("Failed to decode OTP response", "error", err)
		writeJSONError(w, "OTP service error", http.StatusBadGateway)
		return
	}

	json.NewEncoder(w).Encode(verifyResp)
}
