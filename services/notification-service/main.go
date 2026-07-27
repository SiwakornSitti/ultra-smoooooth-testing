package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

type NotificationCommand struct {
	Channel string            `json:"channel"`
	To      string            `json:"to"`
	Message string            `json:"message"`
	Headers map[string]string `json:"headers,omitempty"`
}

type SMSRequest struct {
	To      string `json:"to"`
	Message string `json:"message"`
}

var (
	rabbitMQURL       = getEnv("RABBITMQ_URL", "")
	notificationQueue = getEnv("NOTIFICATION_QUEUE", "notification.commands")
	smsServiceURL     = getEnv("SMS_SERVICE_URL", "")
	smsAPIKey         = getEnv("SMS_API_KEY", "")
)

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func deliverNotification(ctx context.Context, command NotificationCommand) error {
	if command.Channel == "" {
		command.Channel = "sms"
	}
	if command.Channel != "sms" {
		return fmt.Errorf("unsupported notification channel %q", command.Channel)
	}
	if command.To == "" || command.Message == "" {
		return fmt.Errorf("notification to and message are required")
	}
	if smsServiceURL == "" {
		return fmt.Errorf("SMS_SERVICE_URL is not configured")
	}

	body, err := json.Marshal(SMSRequest{To: command.To, Message: command.Message})
	if err != nil {
		return fmt.Errorf("build SMS request: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, smsServiceURL+"/sms/send", bytes.NewReader(body))
	if err != nil {
		return fmt.Errorf("build SMS request: %w", err)
	}
	for name, value := range command.Headers {
		req.Header.Set(name, value)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Api-Key", smsAPIKey)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return fmt.Errorf("call SMS service: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusMultipleChoices {
		io.Copy(io.Discard, resp.Body)
		return fmt.Errorf("SMS service returned status %d", resp.StatusCode)
	}
	if _, err := io.Copy(io.Discard, resp.Body); err != nil {
		return fmt.Errorf("read SMS response: %w", err)
	}
	return nil
}

func consumeNotifications(ctx context.Context) error {
	if rabbitMQURL == "" {
		return fmt.Errorf("RABBITMQ_URL is not configured")
	}

	for {
		conn, err := amqp.Dial(rabbitMQURL)
		if err != nil {
			select {
			case <-ctx.Done():
				return nil
			case <-time.After(2 * time.Second):
				continue
			}
		}

		channel, err := conn.Channel()
		if err != nil {
			conn.Close()
			continue
		}
		if _, err := channel.QueueDeclare(notificationQueue, true, false, false, false, nil); err != nil {
			channel.Close()
			conn.Close()
			continue
		}

		messages, err := channel.Consume(notificationQueue, "", false, false, false, false, nil)
		if err != nil {
			channel.Close()
			conn.Close()
			continue
		}

		for message := range messages {
			var command NotificationCommand
			if err := json.Unmarshal(message.Body, &command); err != nil {
				slog.Error("Invalid notification command", "error", err)
				message.Nack(false, false)
				continue
			}
			if err := deliverNotification(ctx, command); err != nil {
				slog.Error("Failed to deliver notification", "error", err)
				message.Nack(false, false)
				continue
			}
			message.Ack(false)
		}

		channel.Close()
		conn.Close()
	}
}

func setupRouter() *http.ServeMux {
	r := http.NewServeMux()
	r.HandleFunc("/health", func(w http.ResponseWriter, req *http.Request) {
		if req.Method != http.MethodGet {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})
	return r
}

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	port := getEnv("PORT", "8086")
	slog.Info("Notification service starting", "port", port)
	go func() {
		if err := http.ListenAndServe(":"+port, setupRouter()); err != nil {
			slog.Error("Server failed to start", "error", err)
			os.Exit(1)
		}
	}()
	if err := consumeNotifications(context.Background()); err != nil {
		slog.Error("Notification consumer stopped", "error", err)
		os.Exit(1)
	}
}
