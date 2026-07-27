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

For a production build:

```bash
npm run build
npm run start
```
