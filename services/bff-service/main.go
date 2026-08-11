package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
	"strings"

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
	Phone    string  `json:"phone,omitempty"`
}

type UserDetail struct {
	User     User          `json:"user"`
	Accounts []BankAccount `json:"accounts"`
}

type Transfer struct {
	ID              string  `json:"id"`
	SourceAccountID string  `json:"source_account_id"`
	TargetAccountID string  `json:"target_account_id"`
	Amount          float64 `json:"amount"`
	Currency        string  `json:"currency"`
	Status          string  `json:"status"`
}

var (
	userServiceURL        = getEnv("USER_SERVICE_URL", "http://user-service.app.svc.cluster.local")
	bankAccountServiceURL = getEnv("BANK_ACCOUNT_SERVICE_URL", "http://bank-account-service.app.svc.cluster.local")
	ekycServiceURL        = getEnv("EKYC_SERVICE_URL", "http://ekyc-service.app.svc.cluster.local")
	transferServiceURL    = getEnv("TRANSFER_SERVICE_URL", "http://transfer-service.app.svc.cluster.local")
	smsServiceURL         = getEnv("SMS_SERVICE_URL", "http://sms-service.app.svc.cluster.local")
)

func forwardHeaders(in *http.Request, out *http.Request) {
	for name, values := range in.Header {
		if isTransportHeader(name) {
			continue
		}
		for _, value := range values {
			out.Header.Add(name, value)
		}
	}
}

func isTransportHeader(name string) bool {
	switch http.CanonicalHeaderKey(name) {
	case "Accept-Encoding", "Connection", "Content-Length", "Host", "Keep-Alive", "TE", "Trailer", "Transfer-Encoding", "Upgrade":
		return true
	default:
		return false
	}
}

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

// corsMiddleware allows browser-based callers (e.g. the website, served
// from a different origin/port) to call this API directly.
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Mock-Scenario, Mock-ID, X-BFF-Target")
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
	r.HandleFunc("/api/v1/accounts", handleListAccounts).Methods("GET")
	r.HandleFunc("/api/v1/accounts/{id}", handleGetAccount).Methods("GET")
	r.HandleFunc("/api/v1/ekycs/verify", handleEKYCVerify).Methods("POST")
	r.HandleFunc("/api/v1/ekycs", handleListEKYC).Methods("GET")
	r.HandleFunc("/api/v1/ekycs/{id}", handleGetEKYC).Methods("GET")
	r.HandleFunc("/api/v1/ekycs/{id}", handleUpdateEKYC).Methods("PATCH")
	r.HandleFunc("/api/v1/ekycs/{id}", handleDeleteEKYC).Methods("DELETE")
	r.HandleFunc("/api/v1/transfers", handleCreateTransfer).Methods("POST")
	r.HandleFunc("/api/v1/transfers", handleGetAllTransfers).Methods("GET")
	r.HandleFunc("/api/v1/transfers/{id}", handleGetTransfer).Methods("GET")
	r.HandleFunc("/auth/paotang/callback", proxyPaotangCallback).Methods("POST")
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

func fetchAllAccounts(r *http.Request) ([]BankAccount, error) {
	req, err := http.NewRequestWithContext(r.Context(), http.MethodGet, fmt.Sprintf("%s/accounts", bankAccountServiceURL), nil)
	if err != nil {
		return nil, err
	}
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to fetch accounts, status: %d", resp.StatusCode)
	}

	var accounts []BankAccount
	if err := json.NewDecoder(resp.Body).Decode(&accounts); err != nil {
		return nil, err
	}
	return accounts, nil
}

func accountNumber(accountID string) string {
	normalized := strings.ReplaceAll(accountID, "-", "")
	if len(normalized) < 8 {
		return normalized
	}
	return normalized[len(normalized)-8:]
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

	body, err := io.ReadAll(r.Body)
	if err != nil {
		writeJSONError(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	req, err := http.NewRequestWithContext(r.Context(), "POST", fmt.Sprintf("%s/accounts", bankAccountServiceURL), bytes.NewReader(body))
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call bank-account-service", "error", err)
		writeJSONError(w, "Bank account service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	accountBody, err := io.ReadAll(resp.Body)
	if err != nil {
		writeJSONError(w, "Failed to read bank account response", http.StatusBadGateway)
		return
	}
	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusMultipleChoices {
		w.WriteHeader(resp.StatusCode)
		_, _ = w.Write(accountBody)
		return
	}

	var account BankAccount
	if err := json.Unmarshal(accountBody, &account); err != nil {
		writeJSONError(w, "Invalid bank account response", http.StatusBadGateway)
		return
	}
	if account.Phone != "" {
		if err := sendAccountSMS(r, account); err != nil {
			slog.Error("Failed to deliver account creation SMS", "error", err)
			writeJSONError(w, err.Error(), http.StatusBadGateway)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.StatusCode)
	_, _ = w.Write(accountBody)
}

func handleListAccounts(w http.ResponseWriter, r *http.Request) {
	slog.Info("Proxying list accounts request to bank-account-service")

	req, err := http.NewRequestWithContext(r.Context(), http.MethodGet, fmt.Sprintf("%s/accounts", bankAccountServiceURL), nil)
	if err != nil {
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		writeJSONError(w, "Bank account service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.StatusCode)
	_, _ = io.Copy(w, resp.Body)
}

func handleGetAccount(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	slog.Info("Proxying account lookup request to bank-account-service", "account_id", id)

	req, err := http.NewRequestWithContext(r.Context(), http.MethodGet, fmt.Sprintf("%s/accounts/%s", bankAccountServiceURL, id), nil)
	if err != nil {
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		writeJSONError(w, "Bank account service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(resp.StatusCode)
	_, _ = io.Copy(w, resp.Body)
}

func sendAccountSMS(r *http.Request, account BankAccount) error {
	body, err := json.Marshal(map[string]string{
		"to":      account.Phone,
		"message": fmt.Sprintf("Your new %s account has been created.", account.Currency),
	})
	if err != nil {
		return fmt.Errorf("failed to build SMS request")
	}
	req, err := http.NewRequestWithContext(r.Context(), http.MethodPost, fmt.Sprintf("%s/sms/send", smsServiceURL), bytes.NewReader(body))
	if err != nil {
		return fmt.Errorf("failed to create SMS request")
	}
	req.Header.Set("Content-Type", "application/json")
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return fmt.Errorf("SMS service unavailable")
	}
	defer resp.Body.Close()
	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusMultipleChoices {
		var providerError struct {
			Error string `json:"error"`
		}
		if json.NewDecoder(resp.Body).Decode(&providerError) == nil && providerError.Error != "" {
			return fmt.Errorf("SMS delivery failed: %s", providerError.Error)
		}
		return fmt.Errorf("SMS delivery failed")
	}
	return nil
}

func proxyPaotangCallback(w http.ResponseWriter, r *http.Request) {
	slog.Info("Proxying Paotang callback request to user-service")

	req, err := http.NewRequestWithContext(r.Context(), "POST", fmt.Sprintf("%s/auth/paotang/callback", userServiceURL), r.Body)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	forwardHeaders(r, req)

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
	forwardHeaders(r, req)

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

func handleEKYCVerify(w http.ResponseWriter, r *http.Request) {
	slog.Info("Proxying eKYC verify request to ekyc-service")

	req, err := http.NewRequestWithContext(r.Context(), "POST", fmt.Sprintf("%s/ekycs/verify", ekycServiceURL), r.Body)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call ekyc-service", "error", err)
		writeJSONError(w, "eKYC service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	if loc := resp.Header.Get("Location"); loc != "" {
		w.Header().Set("Location", loc)
	}
	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy response body", "error", err)
	}
}

func handleGetEKYC(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	slog.Info("Proxying get eKYC request to ekyc-service", "id", id)

	req, err := http.NewRequestWithContext(r.Context(), "GET", fmt.Sprintf("%s/ekycs/%s", ekycServiceURL, id), nil)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call ekyc-service", "error", err)
		writeJSONError(w, "eKYC service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy response body", "error", err)
	}
}

func handleListEKYC(w http.ResponseWriter, r *http.Request) {
	slog.Info("Proxying list eKYC request to ekyc-service")

	req, err := http.NewRequestWithContext(r.Context(), http.MethodGet, fmt.Sprintf("%s/ekycs", ekycServiceURL), nil)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call ekyc-service", "error", err)
		writeJSONError(w, "eKYC service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy response body", "error", err)
	}
}

func handleUpdateEKYC(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	slog.Info("Proxying update eKYC request to ekyc-service", "id", id)

	req, err := http.NewRequestWithContext(r.Context(), http.MethodPatch, fmt.Sprintf("%s/ekycs/%s", ekycServiceURL, id), r.Body)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call ekyc-service", "error", err)
		writeJSONError(w, "eKYC service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy response body", "error", err)
	}
}

func handleDeleteEKYC(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	slog.Info("Proxying delete eKYC request to ekyc-service", "id", id)

	req, err := http.NewRequestWithContext(r.Context(), http.MethodDelete, fmt.Sprintf("%s/ekycs/%s", ekycServiceURL, id), nil)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call ekyc-service", "error", err)
		writeJSONError(w, "eKYC service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy response body", "error", err)
	}
}

func handleCreateTransfer(w http.ResponseWriter, r *http.Request) {
	slog.Info("Proxying create transfer request to transfer-service")

	req, err := http.NewRequestWithContext(r.Context(), "POST", fmt.Sprintf("%s/transfers", transferServiceURL), r.Body)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Content-Type", "application/json")
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call transfer-service", "error", err)
		writeJSONError(w, "Transfer service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	if loc := resp.Header.Get("Location"); loc != "" {
		w.Header().Set("Location", loc)
	}
	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy response body", "error", err)
	}
}

func handleGetAllTransfers(w http.ResponseWriter, r *http.Request) {
	slog.Info("Proxying get all transfers request to transfer-service")

	target := fmt.Sprintf("%s/transfers", transferServiceURL)
	req, err := http.NewRequestWithContext(r.Context(), "GET", target, nil)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call transfer-service", "error", err)
		writeJSONError(w, "Transfer service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		writeJSONError(w, "Failed to read transfer response", http.StatusBadGateway)
		return
	}
	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusMultipleChoices {
		w.WriteHeader(resp.StatusCode)
		_, _ = w.Write(body)
		return
	}

	var transfers []Transfer
	if err := json.Unmarshal(body, &transfers); err != nil {
		writeJSONError(w, "Invalid transfer response", http.StatusBadGateway)
		return
	}

	customerID := r.URL.Query().Get("customer_id")
	accountNo := r.URL.Query().Get("account_no")
	if customerID != "" || accountNo != "" {
		accounts, err := fetchAllAccounts(r)
		if err != nil {
			slog.Error("Failed to fetch accounts for transfer history", "error", err)
			writeJSONError(w, "Bank account service unavailable", http.StatusBadGateway)
			return
		}

		allowedAccounts := make(map[string]struct{})
		for _, account := range accounts {
			if customerID != "" && account.UserID != customerID {
				continue
			}
			if accountNo != "" && accountNumber(account.ID) != accountNo {
				continue
			}
			allowedAccounts[account.ID] = struct{}{}
		}

		filtered := make([]Transfer, 0, len(transfers))
		for _, transfer := range transfers {
			_, sourceAllowed := allowedAccounts[transfer.SourceAccountID]
			_, targetAllowed := allowedAccounts[transfer.TargetAccountID]
			if sourceAllowed || targetAllowed {
				filtered = append(filtered, transfer)
			}
		}
		transfers = filtered
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(transfers)
}

func handleGetTransfer(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	slog.Info("Proxying get transfer request to transfer-service", "id", id)

	req, err := http.NewRequestWithContext(r.Context(), "GET", fmt.Sprintf("%s/transfers/%s", transferServiceURL, id), nil)
	if err != nil {
		slog.Error("Failed to create request", "error", err)
		writeJSONError(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	forwardHeaders(r, req)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		slog.Error("Failed to call transfer-service", "error", err)
		writeJSONError(w, "Transfer service unavailable", http.StatusServiceUnavailable)
		return
	}
	defer resp.Body.Close()

	w.WriteHeader(resp.StatusCode)
	if _, err := io.Copy(w, resp.Body); err != nil {
		slog.Error("Failed to copy response body", "error", err)
	}
}
