package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

type User struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	Phone  string `json:"phone,omitempty"`
	Status string `json:"status,omitempty"`
}

type BankAccount struct {
	ID       string  `json:"id"`
	UserID   string  `json:"user_id"`
	Balance  float64 `json:"balance"`
	Currency string  `json:"currency"`
}

type UserDetail struct {
	User     User          `json:"user"`
	Accounts []BankAccount `json:"accounts"`
}

var (
	userServiceURL        = getEnv("USER_SERVICE_URL", "http://user-service.app.svc.cluster.local")
	bankAccountServiceURL = getEnv("BANK_ACCOUNT_SERVICE_URL", "http://bank-account-service.app.svc.cluster.local")
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

// Request logging middleware
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		slog.Info("Incoming request", "method", r.Method, "url", r.URL.String(), "path", r.URL.Path)
		next.ServeHTTP(w, r)
	})
}

// corsMiddleware allows browser-based callers (e.g. the qa-website, served
// from a different origin/port) to call this API directly.
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Use-Mock, Mock-Scenario, Mock-ID")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	r := mux.NewRouter()
	r.HandleFunc("/api/v1/users/{id}", handleUserDetails).Methods("GET")
	r.HandleFunc("/api/v1/users/{id}/", handleUserDetails).Methods("GET")
	r.HandleFunc("/api/v1/users", handleCreateUser).Methods("POST")
	r.HandleFunc("/api/v1/accounts", handleCreateAccount).Methods("POST")
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

	slog.Info("BFF service starting", "port", port)
	if err := http.ListenAndServe(":"+port, loggingMiddleware(corsMiddleware(r))); err != nil {
		slog.Error("Server failed to start", "error", err)
		os.Exit(1)
	}
}

func handleUserDetails(w http.ResponseWriter, r *http.Request) {
	userID := mux.Vars(r)["id"]
	if userID == "" {
		slog.Warn("Missing User ID in request")
		writeJSONError(w, "Missing User ID", http.StatusBadRequest)
		return
	}

	slog.Info("Fetching user details", "user_id", userID)

	user, err := fetchUser(r, userID)
	if err != nil {
		slog.Error("Failed to fetch user", "user_id", userID, "error", err)
		writeJSONError(w, "User not found", http.StatusNotFound)
		return
	}

	accounts, err := fetchAccounts(r, userID)
	if err != nil {
		slog.Error("Failed to fetch accounts", "user_id", userID, "error", err)
		writeJSONError(w, "Error fetching accounts", http.StatusInternalServerError)
		return
	}

	userDetail := UserDetail{
		User:     *user,
		Accounts: accounts,
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(userDetail); err != nil {
		slog.Error("Failed to encode response", "user_id", userID, "error", err)
	} else {
		slog.Info("Successfully served user details", "user_id", userID)
	}
}

func fetchUser(r *http.Request, userID string) (*User, error) {
	req, err := http.NewRequestWithContext(r.Context(), "GET", fmt.Sprintf("%s/users/%s", userServiceURL, userID), nil)
	if err != nil {
		return nil, err
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("user not found, status: %d", resp.StatusCode)
	}
	var u User
	if err := json.NewDecoder(resp.Body).Decode(&u); err != nil {
		return nil, err
	}
	return &u, nil
}

func fetchAccounts(r *http.Request, userID string) ([]BankAccount, error) {
	req, err := http.NewRequestWithContext(r.Context(), "GET", fmt.Sprintf("%s/accounts", bankAccountServiceURL), nil)
	if err != nil {
		return nil, err
	}
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch accounts, status: %d", resp.StatusCode)
	}
	var allAccounts []BankAccount
	if err := json.NewDecoder(resp.Body).Decode(&allAccounts); err != nil {
		return nil, err
	}
	var userAccounts []BankAccount
	for _, a := range allAccounts {
		if a.UserID == userID {
			userAccounts = append(userAccounts, a)
		}
	}
	return userAccounts, nil
}

func handleCreateUser(w http.ResponseWriter, r *http.Request) {
	slog.Info("Proxying create user request to user-service")

	req, err := http.NewRequestWithContext(r.Context(), "POST", fmt.Sprintf("%s/users", userServiceURL), r.Body)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call user-service", "error", err)
		writeJSONError(w, "User service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	w.WriteHeader(resp.StatusCode)
	// Properly copy the response body
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy response body", "error", err)
	}
}

func handleCreateAccount(w http.ResponseWriter, r *http.Request) {
	slog.Info("Proxying create account request to bank-account-service")

	req, err := http.NewRequestWithContext(r.Context(), "POST", fmt.Sprintf("%s/accounts", bankAccountServiceURL), r.Body)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	for _, h := range []string{"Use-Mock", "Mock-Scenario", "Mock-ID"} {
		if v := r.Header.Get(h); v != "" {
			req.Header.Set(h, v)
		}
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call bank-account-service", "error", err)
		writeJSONError(w, "Bank account service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy response body", "error", err)
	}
}

func handlePaotangCallback(w http.ResponseWriter, r *http.Request) {
	slog.Info("Proxying Paotang callback request to user-service")

	req, err := http.NewRequestWithContext(r.Context(), "POST", fmt.Sprintf("%s/auth/paotang/callback", userServiceURL), r.Body)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	for _, h := range []string{"Use-Mock", "Mock-Scenario", "Mock-ID"} {
		if v := r.Header.Get(h); v != "" {
			req.Header.Set(h, v)
		}
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call user-service", "error", err)
		writeJSONError(w, "User service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy response body", "error", err)
	}
}

func handleOTPVerify(w http.ResponseWriter, r *http.Request) {
	slog.Info("Proxying OTP verify request to user-service")

	req, err := http.NewRequestWithContext(r.Context(), "POST", fmt.Sprintf("%s/auth/otp/verify", userServiceURL), r.Body)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	for _, h := range []string{"Use-Mock", "Mock-Scenario", "Mock-ID"} {
		if v := r.Header.Get(h); v != "" {
			req.Header.Set(h, v)
		}
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call user-service", "error", err)
		writeJSONError(w, "User service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy response body", "error", err)
	}
}
