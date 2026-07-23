package api

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type User struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Email  string `json:"email"`
	Phone  string `json:"phone,omitempty"`
	Status string `json:"status,omitempty"`
}

func WriteJSONError(w http.ResponseWriter, message string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

func SetupUserRouter() http.Handler {
	r := mux.NewRouter()
	r.HandleFunc("/users/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(User{
			ID:     id,
			Name:   "Jane Doe",
			Email:  "jane.doe@example.com",
			Phone:  "+66800000001",
			Status: "active",
		})
	}).Methods("GET")

	r.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		var u User
		if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
			WriteJSONError(w, err.Error(), http.StatusBadRequest)
			return
		}
		u.ID = "generated-user-id"
		if u.Status == "" {
			u.Status = "active"
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(u)
	}).Methods("POST")

	return r
}
