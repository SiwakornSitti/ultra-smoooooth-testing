# QA Website

Next.js frontend for exercising the BFF and the service integrations through a browser.

## Pages

- `/`: Workshop landing page.
- `/login`: Paotang authcode exchange followed by OTP verification.
- `/account`: User and bank-account creation, SMS simulation, and profile lookup.
- `/transfer`: Create a money transfer and view transfer history.

The frontend sends requests to the BFF URL returned by `/api/config`. The runtime endpoint reads `BFF_URL`, so the BFF address does not need to be baked into the production build.

The `/account` and `/transfer` pages require a successful Paotang and OTP login from `/login` in the current browser session.

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `BFF_URL` | BFF base URL used by the runtime config endpoint | `http://localhost:8080` |
| `PORT` | Next.js listening port | `3000` |

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` after starting the BFF and its dependencies.

## Test with BFF mappings

The BFF contract mappings live in the existing WireMock service under [`wiremock/mappings/bff-mock`](../../wiremock/mappings/bff-mock). Point the browser frontend at WireMock instead of the real BFF:

```bash
BFF_URL=http://localhost:8088 docker compose up --build
```

Open `http://localhost:3000`. BFF mock responses require a non-empty `Mock-Scenario` header; requests without it use the low-priority fallback proxy to the real `bff-service:8080`. The mock supports `PT_PASS:SUCCESS_ONCE` replay rejection and `SMS:INVALID_NUMBER` scenarios.

For a production build:

```bash
npm run build
npm run start
```
