# QA Website

Next.js frontend for exercising the BFF and the service integrations through a browser.

## Pages

- `/`: Workshop landing page.
- `/signup`: Public user registration before authentication.
- `/login`: Paotang authcode exchange followed by OTP verification.
- `/account`: User and bank-account creation, SMS simulation, and profile lookup.
- `/transfer`: Create a money transfer and view transfer history.

The frontend sends requests to the BFF URL configured via `NEXT_PUBLIC_BFF_URL` (or `BFF_URL`), defaulting to `http://localhost:8080`.

The `/account` and `/transfer` pages require a successful Paotang and OTP login from `/login` in the current browser session. User registration at `/signup` does not require authentication.

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_BFF_URL` / `BFF_URL` | BFF base URL used by the frontend | `http://localhost:8080` |
| `PORT` | Next.js listening port | `3000` |

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` after starting the BFF and its dependencies.

## Test with mock scenarios

Keep the browser pointed at the real BFF (`http://localhost:8080`). WireMock is used by domain services for external-provider scenarios such as `PT_PASS:SUCCESS_ONCE` replay rejection and `SMS:INVALID_NUMBER`; the BFF sends bank-account and transfer requests to WireMock, which handles service scenarios or proxies to the real core services.

```bash
docker compose up --build
```

Open `http://localhost:3000`.

For a production build:

```bash
npm run build
npm run start
```
