# Build stage
FROM golang:1.25 AS builder

WORKDIR /app
COPY go.mod go.sum* ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build \
    -gcflags="all=-N -l" \
    -o transfer-service .

# Final image
FROM gcr.io/distroless/static:nonroot

WORKDIR /
COPY --from=builder /app/transfer-service .

EXPOSE 8080
USER nonroot:nonroot
CMD ["/transfer-service"]
