import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./specs",
  timeout: 180000, // 3 minutes to accommodate image building
  expect: {
    timeout: 10000,
  },
  fullyParallel: false, // Sequential execution for testcontainers
  workers: 1,
  reporter: "list",
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
  },
});
