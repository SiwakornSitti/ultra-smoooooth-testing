# Microservices Testing Course Outline

## Estimated Duration

The complete hands-on course takes approximately **10–12 hours**, best
delivered over two days:

### Day 1

- WireMock 101: 1.5 hours
- Burp Suite 101: 1.5 hours
- Docker 101 and Compose Watch: 1 hour
- Manual testing: 1 hour
- Breaks and troubleshooting: 1 hour

### Day 2

- Integration testing cases: 2 hours
- Automated testing: 1.5 hours
- E2E testing cases: 1.5 hours
- Breaks and troubleshooting: 1 hour

A compressed overview can fit into **4–6 hours**, with less time for hands-on
exercises and debugging.

## Testing Case Guides

- [Integration Testing Cases](integration.md)
- [E2E Testing Cases](e2e.md)

## WireMock 101

1. What WireMock is and where it fits in the microservices test architecture
2. Start WireMock with Docker Compose
3. Navigate the WireMock GUI
4. Understand mappings: request matchers, responses, priorities, and fallbacks
5. Match requests by path, method, body, and headers
6. Use `Mock-Scenario` to select test behavior
7. Test success and failure scenarios:
   - `SMS:SUCCESS`
   - `SMS:INVALID_NUMBER`
   - `SMS:UNAVAILABLE`
8. Inspect matched and unmatched requests
9. Edit, reload, and reset mappings/scenarios
10. Connect WireMock to the QA website and verify the end-to-end flow
11. Manual testing with WireMock:
    - Open the WireMock GUI and inspect the target mapping
    - Use the mapping **Test** action or send a request with cURL
    - Add the required `Mock-Scenario` header
    - Compare the response with the expected status and body
    - Inspect **Matched** and **Unmatched** requests when behavior differs

## Burp Suite 101

1. What an intercepting proxy is and how Burp Suite fits into API testing
2. Install and launch Burp Suite
3. Configure the proxy listener without conflicting with the BFF port
4. Configure browser, cURL, or REST Client traffic through Burp
5. Install the Burp CA certificate for HTTPS inspection
6. Intercept and forward requests
7. Inspect headers, payloads, cookies, and responses
8. Modify request fields and headers before forwarding
9. Inject `Mock-Scenario` headers to trigger WireMock mappings
10. Send requests to Repeater for manual testing
11. Test malformed payloads, missing fields, and boundary values
12. Configure Match and Replace rules for repeatable header injection
13. Review HTTP history and compare request/response behavior
14. Disable proxy rules and clean up after testing
15. Manual testing with Burp Suite:
    - Send a request through the Burp proxy
    - Pause it in **Proxy → Intercept**
    - Edit the method, URL, headers, or JSON body
    - Forward the request and inspect the response
    - Send the request to **Repeater** for repeated variations
    - Add or change `Mock-Scenario` to select a WireMock response
    - Compare success, validation, and downstream-failure scenarios

## Docker 101

1. Understand containers, images, networks, volumes, and Docker Compose.
2. Review the services defined in `docker-compose.yml`.
3. Start the workshop stack with:

   ```bash
   docker compose up --build
   ```

4. Start selected services for focused testing:

   ```bash
   docker compose up -d wiremock bff-service website
   ```

5. Inspect running containers, ports, and health status.
6. Read service logs with `docker compose logs`.
7. Understand service-to-service names and the Docker Compose network.
8. Inspect mounted WireMock mappings and PostgreSQL data volumes.
9. Rebuild a service after changing source code or configuration.
10. Use Docker Compose Watch for development feedback:

    ```bash
    docker compose watch
    ```

    - You do not need to run `docker compose up` first; Watch builds and
      starts the services by default.
    - Use `docker compose watch --no-up` only when the services are already
      running and you want Watch to observe them without starting them.
    - Edit source files and observe the configured `develop.watch` action.
    - In this repository, public website assets can be copied into the running
      website container:

      ```yaml
      develop:
        watch:
          - action: sync
            path: ./services/website/public
            target: /app/public
      ```

    - WireMock mappings are also watched and synced:

      ```yaml
      develop:
        watch:
          - action: sync
            path: ./wiremock/mappings
            target: /home/wiremock/mappings
      ```

      Reload mappings through the WireMock Admin API after a file change when
      the running instance does not pick it up automatically.

    - Use `rebuild` for application source changes because they require a new
      image, dependency install, compiled binary, or Dockerfile update:
      compiled binary, or Dockerfile update:

      ```yaml
      develop:
        watch:
          - action: rebuild
            path: ./services/bff-service
      ```

    - Run `docker compose watch` from the repository root, edit the watched
      path, and observe the sync or rebuild action in the terminal.
    - Watch a focused service when iterating on one component.
    - Stop Watch with `Ctrl+C` and keep the containers running if needed.

11. Stop and clean up the environment with:

    ```bash
    docker compose down
    ```

12. Troubleshoot common issues: port conflicts, failed health checks,
    unavailable dependencies, stale images, and incorrect environment values.

## Playwright 101

1. Understand Playwright as both a browser automation and API testing tool.
2. Review the Playwright project configuration in `tests/playwright.config.ts`.
3. Run the test suites:

   ```bash
   cd tests
   npm run test:integration
   npm run test:e2e
   ```

4. Navigate pages and interact with forms, buttons, inputs, and selects.
5. Use stable locators such as `getByTestId`, `getByRole`, and `getByText`.
6. Use `expect` assertions for URLs, status codes, response bodies, and UI state.
7. Use `APIRequestContext` for direct BFF integration tests.
8. Use fixtures such as `page` and `request` to keep tests isolated.
9. Mock or modify browser requests with `page.route` and request headers.
10. Use Testcontainers to start isolated Postgres, WireMock, and service dependencies.
11. Capture traces, screenshots, videos, and console output when tests fail.
12. Run one test or one file during development, then run the complete suite in CI.

## Manual Testing

1. Start WireMock and the workshop services.
2. Open the QA website and perform the login and account flows.
3. Select a success or failure scenario in the QA controls.
4. Confirm the request and response in the WireMock request journal.
5. Send the same request through Burp Suite.
6. Intercept and modify the payload or `Mock-Scenario` header.
7. Forward the request and compare the result with the direct QA request.
8. Replay the request in Repeater with different inputs.
9. Record the expected status, response body, matched mapping, and service logs.

## Automated Testing

1. Understand the test pyramid for this workshop:
   - Go unit tests for service-level logic
   - Playwright API tests for BFF integration
   - Playwright browser tests for end-to-end QA flows
   - WireMock lab tests for mock and stateful behavior
2. Run Go service tests with `make test`.
3. Run BFF integration tests with:

   ```bash
   cd tests
   npm run test:integration
   ```

4. Run browser E2E tests with:

   ```bash
   cd tests
   npm run test:e2e
   ```

5. Run WireMock lab tests with `npm run test:lab`.
6. Use Playwright assertions for status codes, response bodies, headers, and
   persisted state.
7. Use test fixtures and Testcontainers to create isolated Postgres,
   WireMock, and service environments.
8. Test both success and failure scenarios using `Mock-Scenario` headers.
9. Review traces, console output, service logs, and WireMock request history
   when a test fails.
10. Run the complete test suite in CI and publish the failure artifacts.
