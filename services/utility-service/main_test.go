package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestResetWorkshopHandlerRequiresDatabase(t *testing.T) {
	originalDB := db
	db = nil
	defer func() { db = originalDB }()

	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/reset", nil)
	setupRouter().ServeHTTP(rec, req)

	if rec.Code != http.StatusServiceUnavailable {
		t.Fatalf("status = %d; want %d", rec.Code, http.StatusServiceUnavailable)
	}
}
