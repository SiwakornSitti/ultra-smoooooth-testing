.PHONY: all build clean sync tidy setup setup-dev docker-start destroy migrate seed test test-unit test-integration test-e2e test-all build-slides fmt vet lint check slides

all: build

build:
	@mkdir -p bin
	@for d in services/*; do \
		if [ -d "$$d" ] && [ -f "$$d/go.mod" ]; then \
			name=$$(basename "$$d"); \
			echo "Building $$name..."; \
			go build -o "bin/$$name" "./$$d"; \
		fi; \
	done
	@echo "All binaries successfully built in ./bin/"

clean:
	rm -rf bin/
	@echo "Cleaned up binaries."

sync:
	go work sync
	@for d in services/*; do \
		if [ -d "$$d" ] && [ -f "$$d/go.mod" ]; then \
			echo "Running go mod tidy in $$d..."; \
			(cd "$$d" && go mod tidy); \
		fi; \
	done
	@echo "Workspace and module dependencies synced successfully."

tidy: sync

setup: docker-start migrate seed
	@echo "Docker services, migrations, and seed data are ready."

setup-dev: docker-start migrate seed
	@echo "Docker services, migrations, and seed data are ready for development."
	docker compose watch

docker-start:
	docker compose up -d --build

destroy:
	docker compose down

migrate:
	@for file in services/*/db/migration/*.sql; do \
		echo "Applying $$file..."; \
		docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d app < "$$file" || exit 1; \
	done
	@echo "Database migrations applied successfully."

seed:
	@for file in \
		services/user-service/db/seed/001-user-service-seed.sql \
		services/bank-account-service/db/seed/001-bank-account-service-seed.sql \
		services/ekyc-service/db/seed/001-ekyc-service-seed.sql \
		services/transfer-service/db/seed/001-transfer-service-seed.sql; do \
		echo "Applying $$file..."; \
		docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d app < "$$file" || exit 1; \
	done
	@echo "Database seed data applied successfully."

test: test-unit

test-unit:
	@go test ./services/bank-account-service/... \
	        ./services/bff-service/... \
	        ./services/ekyc-service/... \
	        ./services/otp-service/... \
	        ./services/transfer-service/... \
	        ./services/user-service/... \
	        ./services/utility-service/...

test-integration:
	cd tests && npm install && npm run test:integration

test-e2e:
	cd tests && npm install && npm run test:e2e

test-all: test test-integration test-e2e
	@echo "All unit, integration, and E2E test suites executed successfully!"

build-slides:
	@echo "Building static Slidev presentation..."
	cd slides && npx @slidev/cli build --base /

fmt:
	@echo "Formatting Go files..."
	@gofmt -s -w services/

vet:
	@echo "Running go vet..."
	@go vet ./services/bank-account-service/... \
	        ./services/bff-service/... \
	        ./services/ekyc-service/... \
	        ./services/otp-service/... \
	        ./services/transfer-service/... \
	        ./services/user-service/... \
	        ./services/utility-service/...

lint: vet
	@echo "Checking Go formatting..."
	@test -z "$$(gofmt -l services/)" || (echo "Unformatted files found:" && gofmt -l services/ && exit 1)
	@echo "Checking TypeScript types in tests..."
	@cd tests && npx tsc --noEmit

check: test lint
	@echo "All checks passed successfully!"

slides:
	cd slides && bunx @slidev/cli slides.md
