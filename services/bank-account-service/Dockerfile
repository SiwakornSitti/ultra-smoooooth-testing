# Build stage
FROM golang:1.25 AS builder

WORKDIR /app
COPY go.mod go.sum* ./
RUN go mod download

COPY . .
# เพิ่ม gcflags เพื่อให้ eBPF อ่านง่ายขึ้น
RUN CGO_ENABLED=0 GOOS=linux go build \
    -gcflags="all=-N -l" \
    -o bank-account-service .

# Final image
FROM gcr.io/distroless/static:nonroot

WORKDIR /
COPY --from=builder /app/bank-account-service .

EXPOSE 8080
USER nonroot:nonroot
# ตรวจสอบว่าแอปไม่ได้รันด้วยการบีบอัด (Compressed) ใดๆ
CMD ["/bank-account-service"]