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
    baseURL: process.env.BASE_URL || "http://localhost:8080",
    actionTimeout: 0,
    trace: "on-first-retry",
  },
});
