package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

var (
	userServiceURL        = getEnv("USER_SERVICE_URL", "http://user-service.app.svc.cluster.local")
	bankAccountServiceURL = getEnv("BANK_ACCOUNT_SERVICE_URL", "http://bank-account-service.app.svc.cluster.local")
	ekycServiceURL        = getEnv("EKYC_SERVICE_URL", "http://ekyc-service.app.svc.cluster.local")
	transferServiceURL    = getEnv("TRANSFER_SERVICE_URL", "http://transfer-service.app.svc.cluster.local")
	otpServiceURL         = getEnv("OTP_SERVICE_URL", "http://otp-service.app.svc.cluster.local")
	utilityServiceURL     = getEnv("UTILITY_SERVICE_URL", "http://utility-service.app.svc.cluster.local")
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

func fetchUser(r *http.Request, userID string) (*User, error) {
	req, err := http.NewRequestWithContext(r.Context(), "GET", fmt.Sprintf("%s/users/%s", userServiceURL, userID), nil)
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
	forwardHeaders(r, req)
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

func normalizePhone(phone string) string {
	var builder strings.Builder
	for _, ch := range phone {
		if ch >= '0' && ch <= '9' {
			builder.WriteRune(ch)
		}
	}
	normalized := builder.String()
	if len(normalized) < 8 {
		return normalized
	}
	return normalized[len(normalized)-8:]
}

func accountNumber(accountID string) string {
	normalized := strings.ReplaceAll(accountID, "-", "")
	if len(normalized) < 8 {
		return normalized
	}
	return normalized[len(normalized)-8:]
}

func accountUserStatus(r *http.Request, accountID string) (string, error) {
	accounts, err := fetchAllAccounts(r)
	if err != nil {
		return "", err
	}
	for _, account := range accounts {
		if account.ID == accountID {
			user, err := fetchUser(r, account.UserID)
			if err != nil {
				return "", err
			}
			return user.Status, nil
		}
	}
	return "", nil
}

func sendAccountSMS(r *http.Request, account BankAccount) error {
	body, err := json.Marshal(map[string]string{
		"phone": account.Phone,
	})
	if err != nil {
		return fmt.Errorf("failed to build SMS request")
	}
	req, err := http.NewRequestWithContext(r.Context(), http.MethodPost, fmt.Sprintf("%s/otp/send", otpServiceURL), bytes.NewReader(body))
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
