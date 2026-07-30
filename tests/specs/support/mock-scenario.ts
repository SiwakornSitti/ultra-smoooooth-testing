import { Page } from "@playwright/test";

export const MOCK_SCENARIO = {
  PAOTANG: {
    SUCCESS: "PT_PASS:SUCCESS",
    INVALID_GRANT: "PT_PASS:INVALID_GRANT",
    SUCCESS_ONCE: "PT_PASS:SUCCESS_ONCE",
  },
  OTP: {
    SUCCESS: "OTP:SUCCESS",
    INVALID: "OTP:INVALID",
  },
  SMS: {
    SUCCESS: "SMS:SUCCESS",
    INVALID_NUMBER: "SMS:INVALID_NUMBER",
  },
} as const;

// mockScenario intercepts every outgoing request from the page and injects
// a Mock-Scenario header, decoupling test scenario selection from the
// select-*-scenario dropdown UI.
export function mockScenario(page: Page) {
  const box = { value: "" };
  page.route("**/*", (route) => {
    const headers = { ...route.request().headers() };
    if (box.value) headers["mock-scenario"] = box.value;
    route.continue({ headers });
  });
  return (scenario: string) => {
    box.value = scenario;
  };
}
