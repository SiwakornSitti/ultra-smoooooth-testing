FROM golang:1.25 AS builder

WORKDIR /app
COPY go.mod go.sum* ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o utility-service .

FROM gcr.io/distroless/static:nonroot

WORKDIR /
COPY --from=builder /app/utility-service .

EXPOSE 8080
USER nonroot:nonroot
CMD ["/utility-service"]
