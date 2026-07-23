package main

import (
	"log/slog"
	"net/http"
	"os"

	"transfer-service/api"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8085"
	}

	router := api.SetupRouter()
	slog.Info("Transfer service starting", "port", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		slog.Error("Server failed to start", "error", err)
		os.Exit(1)
	}
}
