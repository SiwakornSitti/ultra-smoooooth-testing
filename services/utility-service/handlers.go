package main

import (
	"encoding/json"
	"log/slog"
	"net/http"
)

func setupRouter() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /reset", resetWorkshopHandler)
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})
	return mux
}

func resetWorkshopHandler(w http.ResponseWriter, r *http.Request) {
	if db == nil {
		writeJSONError(w, "Database is unavailable", "DB_UNAVAILABLE", http.StatusServiceUnavailable)
		return
	}
	if err := resetWorkshopData(r.Context()); err != nil {
		slog.Error("Failed to reset workshop data", "error", err)
		writeJSONError(w, "Failed to reset workshop data", "DB_ERROR", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "reset"})
}
