import { Page } from "@playwright/test";

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
