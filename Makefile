.PHONY: all build clean sync tidy setup docker-up docker-start migrate seed test test-integration test-e2e slides

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

setup: docker-up migrate seed
	@echo "Docker services, migrations, and seed data are ready."

docker-up:
	docker compose watch

docker-start:
	docker compose up -d --build
	@until docker compose exec -T db pg_isready -U app -d app >/dev/null 2>&1; do \
		echo "Waiting for PostgreSQL..."; \
		sleep 1; \
	done
	@echo "PostgreSQL is ready."

migrate:
	@for file in services/*/db/migration/*.sql; do \
		echo "Applying $$file..."; \
		docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d app < "$$file" || exit 1; \
	done
	@echo "Database migrations applied successfully."

seed:
	@for file in \
		services/user-service/db/seed/002-user-service-seed.sql \
		services/bank-account-service/db/seed/001-bank-account-service-seed.sql \
		services/ekyc-service/db/seed/001-ekyc-service-seed.sql \
		services/transfer-service/db/seed/001-transfer-service-seed.sql; do \
		echo "Applying $$file..."; \
		docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d app < "$$file" || exit 1; \
	done
	@echo "Database seed data applied successfully."

test:
	@for d in services/*; do \
		if [ -d "$$d" ] && [ -f "$$d/go.mod" ]; then \
			echo "Testing $$d..."; \
			(cd "$$d" && go test -v ./...); \
		fi; \
	done

test-integration:
	cd tests && npm install && npm run test:integration

test-e2e:
	cd tests && npm install && npm run test:e2e

slides:
	cd slides && bunx @slidev/cli slides.md
