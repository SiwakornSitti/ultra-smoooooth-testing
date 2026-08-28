package main

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"time"

	"github.com/exaring/otelpgx"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
)

var db *sql.DB

func initDB() (*sql.DB, error) {
	dbHost := os.Getenv("DB_HOST")
	if dbHost == "" {
		dbHost = "localhost"
	}
	dbPort := os.Getenv("DB_PORT")
	if dbPort == "" {
		dbPort = "5432"
	}
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"), os.Getenv("DB_NAME"))

	config, err := pgx.ParseConfig(connStr)
	if err != nil {
		return nil, fmt.Errorf("failed to parse connection string: %w", err)
	}

	config.Tracer = otelpgx.NewTracer()
	conn := stdlib.OpenDB(*config)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err = conn.PingContext(ctx); err != nil {
		conn.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}
	return conn, nil
}

func fetchAllUsers(ctx context.Context) ([]User, error) {
	rows, err := db.QueryContext(ctx, "SELECT id, name, email, phone, status FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var u User
		if err := rows.Scan(&u.ID, &u.Name, &u.Email, &u.Phone, &u.Status); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return users, nil
}

func checkEmailExists(ctx context.Context, email string) (bool, error) {
	var exists bool
	err := db.QueryRowContext(ctx, "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)", email).Scan(&exists)
	return exists, err
}

func insertUser(ctx context.Context, u *User) error {
	return db.QueryRowContext(ctx, "INSERT INTO users (name, email, phone, status) VALUES ($1, $2, $3, $4) RETURNING id", u.Name, u.Email, u.Phone, u.Status).Scan(&u.ID)
}

func fetchUserByID(ctx context.Context, id string) (*User, error) {
	var u User
	err := db.QueryRowContext(ctx, "SELECT id, name, email, phone, status FROM users WHERE id = $1", id).Scan(&u.ID, &u.Name, &u.Email, &u.Phone, &u.Status)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func updateUserFields(ctx context.Context, id string, u *User) error {
	_, err := db.ExecContext(ctx, "UPDATE users SET name = COALESCE(NULLIF($1, ''), name), email = COALESCE(NULLIF($2, ''), email), phone = COALESCE(NULLIF($3, ''), phone), status = COALESCE(NULLIF($4, ''), status) WHERE id = $5", u.Name, u.Email, u.Phone, u.Status, id)
	return err
}

func deleteUserByID(ctx context.Context, id string) error {
	_, err := db.ExecContext(ctx, "DELETE FROM users WHERE id = $1", id)
	return err
}
