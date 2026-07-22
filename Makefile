.PHONY: all build clean test test-integration test-e2e

all: build

build:
	@mkdir -p bin
	go build -o bin/bank-account-service ./services/bank-account-service
	go build -o bin/bff-service ./services/bff-service
	go build -o bin/user-service ./services/user-service
	@echo "All binaries successfully built in ./bin/"

clean:
	rm -rf bin/
	@echo "Cleaned up binaries."

test:
	cd services/bff-service && go test -v ./...
	cd services/user-service && go test -v ./...
	cd services/bank-account-service && go test -v ./...

test-integration:
	cd tests && npm install && npm run test:integration

test-e2e:
	cd tests && npm install && npm run test:e2e
