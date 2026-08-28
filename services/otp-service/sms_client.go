package main

import (
	"net/http"
	"strings"
)

var (
	smsProviderURL = getEnv("SMS_PROVIDER_URL", "http://wiremock:8080")
)

func forwardHeaders(in *http.Request, out *http.Request) {
	for name, values := range in.Header {
		switch strings.ToLower(name) {
		case "accept-encoding", "connection", "content-length", "host", "transfer-encoding":
			continue
		}
		for _, value := range values {
			out.Header.Add(name, value)
		}
	}
}
