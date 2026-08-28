package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"io"
	"log/slog"
	"net/http"
	"net/url"
	"strings"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgconn"
)

var (
	paotangServiceURL   = getEnv("PAOTANG_SERVICE_URL", "http://localhost:8088")
	paotangClientID     = getEnv("PAOTANG_CLIENT_ID", "")
	paotangClientSecret = getEnv("PAOTANG_CLIENT_SECRET", "")
)

func setupRouter() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/users", handleGetUsers).Methods("GET")
	r.HandleFunc("/users", handleCreateUser).Methods("POST")
	r.HandleFunc("/users/{id}", handleGetUser).Methods("GET")
	r.HandleFunc("/users/{id}", handleUpdateUser).Methods("PATCH")
	r.HandleFunc("/users/{id}", handleDeleteUser).Methods("DELETE")
	r.HandleFunc("/auth/paotang/callback", handlePaotangCallback).Methods("POST")

	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})
	return r
}

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

func handleGetUsers(w http.ResponseWriter, r *http.Request) {
	slog.Info("Fetching all users")
	users, err := fetchAllUsers(r.Context())
	if err != nil {
		slog.Error("Query failed", "error", err)
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
	u.Status = "active"
	emailExists, err := checkEmailExists(r.Context(), u.Email)
	if err != nil {
		slog.Error("Duplicate user check failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	if emailExists {
		writeJSONError(w, "User with email already exists", http.StatusConflict)
		return
	}
	slog.Info("Creating user")
	if err := insertUser(r.Context(), &u); err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			writeJSONError(w, "User with email already exists", http.StatusConflict)
			return
		}
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
	u, err := fetchUserByID(r.Context(), id)
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
	if err := updateUserFields(r.Context(), id, &u); err != nil {
		slog.Error("Update failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	updated, err := fetchUserByID(r.Context(), id)
	if err == nil {
		u = *updated
	} else {
		u.ID = id
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(u)
}

func handleDeleteUser(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	slog.Info("Deleting user", "user_id", id)
	if err := deleteUserByID(r.Context(), id); err != nil {
		slog.Error("Delete failed", "error", err)
		writeJSONError(w, "Database error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

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
	forwardHeaders(r, tokenReq)

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
