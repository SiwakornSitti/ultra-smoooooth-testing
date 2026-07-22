.PHONY: all build clean sync tidy test test-integration test-e2e

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
