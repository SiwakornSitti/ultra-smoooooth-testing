# 🖥️ WireMock Web UI & GUI Management Guide

Welcome to the **WireMock Web UI Guide**! This document explains how to view, search, inspect, create, and manage WireMock stubs interactively using the built-in Web GUI interface.

---

## 🎯 Purpose & Capabilities

The **WireMock Web UI** (`holomekc/wiremock-gui`) provides a web-based dashboard at `http://localhost:8088/__admin/`.

Key Features:

1. **Interactive Stub Management**: View, search, edit, create, and delete HTTP stubs visually without manually writing JSON files.
2. **Request Log Inspection**: View real-time incoming HTTP request logs, matched stubs, unmatched requests, and exact payload diffs.
3. **Scenario State Visualization**: Inspect current state machine states for stateful stubs (`Started`, `TOKEN_ISSUED`, `PAID`, `SHIPPED`).
4. **One-Click Scenario Reset**: Reset all scenario state machines back to `Started` with a single click.

---

## 🚀 Accessing the WireMock Web UI

1. Ensure the ecosystem or WireMock container is running:

   ```bash
   docker compose up -d wiremock
   ```

2. Open your web browser and navigate to:

   ```
   http://localhost:8088/__admin/
   ```

---

## 📚 Key Sections in the Web UI

### 1. 🔍 Stub Mappings Dashboard

- View all active JSON stub mappings (stateless & stateful).
- Filter stubs by URL path, HTTP method (`GET`, `POST`, `PATCH`, `DELETE`), or scenario name.
- Click any stub to inspect matching patterns (Headers, Query Params, JSONPath body expressions, and Handlebars response templates).

### 2. 📊 Request Log Journal

- View real-time audit logs of every HTTP request sent to WireMock by `user-service`, `bank-account-service`, or `bff-service`.
- Identify unmatched requests (`404 Not Found`) and view payload diffs to debug test failures quickly.

### 3. 🔄 Scenario State Manager

- View active WireMock scenario state machines.
- Monitor current states (e.g. `order-fulfillment-lifecycle` current state: `PAID`).
- Click **Reset All Scenarios** to restore states to `Started`.

---

## 📂 Related Resources

- 🎓 **[WireMock Stateful Stubbing Guide](../wiremock-stateful/README.md)**
- 🎓 **[WireMock Stateless Stubbing Guide](../wiremock-stateless/README.md)**
- 🎓 **[Burp Suite MITM Proxy Guide](../burp-suite/README.md)**
