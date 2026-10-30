---
theme: default
colorSchema: dark
background: '#0f172a'
title: Ultra Smoooooth Testing Workshop
info: |
  Microservices Integration Testing, WireMock Stateful Stubs, Burp Suite MITM Proxy, and Testcontainers.
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

<div class="flex justify-center items-center w-full h-full my-auto">
  <div class="cover-poster-container">
    <img src="/content.png" class="cover-poster-img" alt="Ultra Smoooooth Testing Workshop Cover" />
  </div>
</div>

---
class: pt-2 pb-1.5 px-8
---

# 📦 Workshop Materials &amp; Quick Access

<h3 class="text-slate-300 text-xs mb-1.5">Scan the QR Code or Clone the Repository to Follow Along Live</h3>

<div class="grid grid-cols-[45%_1fr] gap-3 mt-1 flex-1">
<div class="slide-card p-2.5 border border-cyan-500/40 bg-cyan-950/20 flex flex-col items-center justify-between text-center rounded-lg">
  <div class="w-full flex flex-col items-center">
    <div class="text-xs font-bold text-cyan-300 mb-0.5 flex items-center gap-1.5">
      <span>📱</span> Scan for Workshop Materials &amp; Labs
    </div>
    <div class="bg-white p-2 rounded-xl shadow-xl border-2 border-cyan-400/80 inline-block my-1">
      <img src="/qr-repo.svg" class="w-56 h-56 object-contain block" alt="Workshop GitHub Repository QR Code" />
    </div>
    <div class="mt-0.5 font-mono text-[10px] text-cyan-200 font-semibold tracking-wide">
      github.com/SiwakornSitti/ultra-smoooooth-testing
    </div>
  </div>
  <div class="w-full pt-1 border-t border-cyan-500/30 text-[9.5px] font-mono text-cyan-300 flex items-center justify-between">
    <span>Public GitHub Repository</span>
    <span class="bg-cyan-900/50 px-1.5 py-0.2 rounded border border-cyan-500/30">Free Access</span>
  </div>
</div>
<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/60 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>🚀</span> Quick Clone &amp; Environment Setup
      </span>
      <span class="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded">Terminal Setup</span>
    </div>
    <div class="space-y-1.5 text-xs text-slate-300">
      <div>
        <div class="text-[11px] font-semibold text-slate-200 mb-0.5">1. Clone the Workshop Monorepo:</div>
        <div class="bg-slate-950/90 border border-slate-800 rounded px-2 py-1 font-mono text-[9.5px] text-emerald-300 select-all truncate">
          git clone https://github.com/SiwakornSitti/ultra-smoooooth-testing.git
        </div>
      </div>
      <div>
        <div class="text-[11px] font-semibold text-slate-200 mb-0.5">2. Navigate to Workspace:</div>
        <div class="bg-slate-950/90 border border-slate-800 rounded px-2 py-1 font-mono text-[10px] text-cyan-300 select-all">
          cd ultra-smoooooth-testing
        </div>
      </div>
      <div>
        <div class="text-[11px] font-semibold text-slate-200 mb-0.5">3. Local Stack Prerequisites:</div>
        <div class="grid grid-cols-3 gap-1.5 text-center font-mono text-[9.5px] pt-0.5">
          <div class="bg-slate-950/80 border border-slate-800 p-1 rounded">
            <span class="text-emerald-300 font-bold">Go 1.27+</span>
            <span class="text-slate-400 block text-[8.5px]">Microservices</span>
          </div>
          <div class="bg-slate-950/80 border border-slate-800 p-1 rounded">
            <span class="text-sky-300 font-bold">Docker 24+</span>
            <span class="text-slate-400 block text-[8.5px]">Testcontainers</span>
          </div>
          <div class="bg-slate-950/80 border border-slate-800 p-1 rounded">
            <span class="text-purple-300 font-bold">Node 20+</span>
            <span class="text-slate-400 block text-[8.5px]">Playwright &amp; Slidev</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-[10px] text-slate-400 flex items-center justify-between">
    <span>Follow along in <code>WORKSHOP.md</code></span>
    <span class="font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">Ready to Rock</span>
  </div>
</div>
</div>

<div class="slide-card py-1 px-3 flex items-center justify-between text-xs mt-1 border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-[11px] text-slate-200">💡 <strong>Workshop Companion:</strong> All exercise source files, WireMock JSON stubs, and Playwright specs are in this repository.</span>
  <span class="text-[9.5px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">Open Source</span>
</div>

<!--
Presenter Notes:
- Keep this slide on screen for 2-3 minutes as attendees enter the room and settle in.
- Encourage everyone to scan the QR code with their mobile device or clone directly in their terminal.
- Remind attendees to check their prerequisites (Go, Docker, Node.js) while you introduce the workshop.
-->

---
class: pt-3 pb-2 px-8
---

# ⚠️ The Testing Crisis

### Why Traditional Microservice Testing Fails in Practice

<div class="grid grid-cols-2 gap-3 mt-1.5">

<div class="slide-card p-3 border-rose-500/40 bg-rose-950/20">
  <h3 class="text-rose-400 font-bold mb-1 text-base flex items-center gap-1.5">
    <span>🌪️</span> 1. The Flakiness Spiral
  </h3>
  <p class="text-slate-300 text-xs leading-relaxed">
    Shared staging databases and unstable 3rd-party sandboxes cause <strong>40%+ false-positive CI failures</strong>. Teams start ignoring red pipelines.
  </p>
  <div class="mt-1.5 text-rose-300 font-mono text-[11px]">
    🚨 "Just re-run CI until it passes" anti-pattern.
  </div>
</div>

<div class="slide-card p-3 border-amber-500/40 bg-amber-950/20">
  <h3 class="text-amber-400 font-bold mb-1 text-base flex items-center gap-1.5">
    <span>⏳</span> 2. The Debugging Black Hole
  </h3>
  <p class="text-slate-300 text-xs leading-relaxed">
    Engineers waste <strong>5+ hours/week</strong> triaging "works on my machine" drift, port collisions, and orphan background zombie processes.
  </p>
  <div class="mt-1.5 text-amber-300 font-mono text-[11px]">
    🚨 Discrepancy between macOS and Linux CI runners.
  </div>
</div>

<div class="slide-card p-3 border-amber-500/40 bg-amber-950/20">
  <h3 class="text-amber-400 font-bold mb-1 text-base flex items-center gap-1.5">
    <span>💸</span> 3. Third-Party Sandbox Quotas &amp; Lock-in
  </h3>
  <p class="text-slate-300 text-xs leading-relaxed">
    Payment and SMS provider test environments have <strong>rate limits, maintenance windows, and billing costs</strong> that block parallel pull requests.
  </p>
  <div class="mt-1.5 text-amber-300 font-mono text-[11px]">
    🚨 Blocked deployments waiting on sandbox stability.
  </div>
</div>

<div class="slide-card p-3 border-emerald-500/40 bg-emerald-950/20">
  <h3 class="text-emerald-400 font-bold mb-1 text-base flex items-center gap-1.5">
    <span>🎯</span> 4. The Goal: Ultra Smoooooth
  </h3>
  <p class="text-slate-300 text-xs leading-relaxed">
    Achieve <strong>100% deterministic, hermetic, sub-second test execution</strong> on local laptops and CI with zero shared infrastructure flakiness.
  </p>
  <div class="mt-1.5 text-emerald-300 font-mono text-[11px]">
    ✨ Green locally = Guaranteed green in CI.
  </div>
</div>

</div>

---
class: agenda-slide pt-4 pb-2 px-8
---

# 📋 Workshop Agenda

### What We'll Cover Today

<div class="agenda-grid">

<div class="agenda-card">
  <h3>🏗️ Part 1 — Ecosystem Architecture</h3>
  <p>Go Workspace monorepo, microservices topology, and technology stack overview.</p>
</div>

<div class="agenda-card">
  <h3>🪝 Part 2 — WireMock Deep Dive</h3>
  <p>Request matching, priority stubs, Handlebars templating, and state machines.</p>
</div>

<div class="agenda-card">
  <h3>🛡️ Part 3 — Burp Suite MITM</h3>
  <p>HTTP intercept, header tampering, Match &amp; Replace rules, and traffic auditing.</p>
</div>

<div class="agenda-card">
  <h3>🐳 Part 4 — Testcontainers</h3>
  <p>Ephemeral container lifecycle, dynamic port binding, and bootstrapping.</p>
</div>

<div class="agenda-card col-span-2">
  <h3>🎭 Part 5 — Playwright (Full-Stack Automation)</h3>
  <p>Web locators, dynamic route mock steering, native device bridge injection, and CI trace diagnostics.</p>
</div>

</div>

---
class: strategy-slide
---

# 🎯 Testing Strategy & Core Pillars

### Comprehensive Architectural Foundations for Integration Testing

<div class="strategy-grid text-sm">

<div class="slide-card">
  <h3 class="text-emerald-400 font-bold mb-1 text-base">🌐 1. External API Virtualization (WireMock)</h3>
  <p class="text-slate-300 leading-relaxed">
    Virtualize all third-party external integrations with deterministic stateful stubs, dynamic Handlebars responses, and zero sandbox dependencies.
  </p>
</div>

<div class="slide-card">
  <h3 class="text-emerald-400 font-bold mb-1 text-base">⚡ 2. In-Flight Traffic Interception (Burp Suite)</h3>
  <p class="text-slate-300 leading-relaxed">
    Intercept live HTTP traffic in-flight, tamper with payloads, inject fault scenarios, and probe security/IDOR boundaries.
  </p>
</div>

<div class="slide-card">
  <h3 class="text-emerald-400 font-bold mb-1 text-base">🐳 3. Hermetic Infrastructure (Testcontainers)</h3>
  <p class="text-slate-300 leading-relaxed">
    Execute integration suites against isolated, ephemeral Docker containers with dynamic ports and guaranteed Ryuk teardown.
  </p>
</div>

<div class="slide-card">
  <h3 class="text-emerald-400 font-bold mb-1 text-base">🎭 4. Full-Stack E2E Automation (Playwright)</h3>
  <p class="text-slate-300 leading-relaxed">
    Drive unified browser DOM interactions and headless REST API validation with zero-flake auto-waiting assertions and rich tracing.
  </p>
</div>

</div>

---

# 🌐 Pillar 1: External API Virtualization (WireMock)

### Eliminating External API Dependencies & Sandbox Flakiness

<div class="multi-col-grid-2">

<div class="col-card space-y-3">
  <h3 class="text-emerald-400">🪝 Architectural Role</h3>
  <div class="text-sm text-slate-200 space-y-3 leading-relaxed">
    <div>
      <strong class="text-emerald-300 block text-base font-bold mb-0.5">1. Third-Party Simulation</strong>
      Virtualize Paotang OAuth (<code>/oauth/token</code>) and SMS gateways with lightweight HTTP stubs.
    </div>
    <div>
      <strong class="text-emerald-300 block text-base font-bold mb-0.5">2. Deterministic Edge Cases</strong>
      Instantly test token expiration, rate-limit throttling, HTTP 503, and network timeouts on demand.
    </div>
    <div>
      <strong class="text-emerald-300 block text-base font-bold mb-0.5">3. Zero Limits &amp; Zero Billing</strong>
      Execute thousands of CI/CD test runs without provider sandboxes or billing quotas.
    </div>
  </div>
</div>

<div class="col-card">
  <h3 class="text-emerald-400">📄 Mapping Stub Example</h3>

```json
{
  "request": {
    "method": "POST",
    "url": "/oauth/token",
    "headers": {
      "Mock-Scenario": { "contains": "SUCCESS" }
    }
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "access_token": "mock_jwt_paotang_9988",
      "token_type": "Bearer",
      "expires_in": 3600
    }
  }
}
```

</div>

</div>

---

# ⚡ Pillar 2: In-Flight Traffic Interception (Burp Suite)

### Live MITM Traffic Inspection, Fault Injection & Security Boundaries

<div class="multi-col-grid-2">

<div class="col-card space-y-3">
  <h3 class="text-amber-400">🔀 MITM Interception Role</h3>
  <div class="text-sm text-slate-200 space-y-3 leading-relaxed">
    <div>
      <strong class="text-amber-300 block text-base font-bold mb-0.5">1. Transparent In-Flight Proxy</strong>
      Sits between browser / mobile WebViews and backend services to inspect and alter HTTP traffic.
    </div>
    <div>
      <strong class="text-amber-300 block text-base font-bold mb-0.5">2. Mock-Scenario Header Steering</strong>
      Inject <code>Mock-Scenario: PAOTANG:SUCCESS</code> on the fly to steer stubs without code modifications.
    </div>
    <div>
      <strong class="text-amber-300 block text-base font-bold mb-0.5">3. Response Status &amp; Payload Tampering</strong>
      Mutate backend responses into HTTP 401/500 to test frontend fallback UI banners and error handling.
    </div>
  </div>
</div>

<div class="col-card">
  <h3 class="text-amber-400">📡 Intercepted HTTP Packet</h3>

```http
POST /api/v1/auth/login HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Mock-Scenario: PAOTANG:SUCCESS,OTP:SUCCESS

{
  "auth_code": "auth_code_live_7721",
  "phone": "0812345678"
}
```

  <div class="text-sm text-slate-200 mt-2 font-medium">
    💡 Injects scenario headers directly in-flight before forwarding to BFF.
  </div>
</div>

</div>

---

# 🐳 Pillar 3: Hermetic Infrastructure (Testcontainers)

### Isolated Ephemeral Containers, Dynamic Ports & Automatic Teardown

<div class="grid grid-cols-3 gap-3.5 mt-4">

<div class="slide-card p-4 border border-cyan-500/40 bg-slate-900/60 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm">🐳 Ephemeral Instances</span>
      <span class="text-xs font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded">Hook-Driven</span>
    </div>
    <p class="text-sm text-slate-200 leading-relaxed">
      Spins up sterile PostgreSQL 16 and WireMock instances directly inside test suite hooks—destroying and recreating state on demand.
    </p>
  </div>
  <div class="mt-3 pt-2 border-t border-cyan-500/20 text-xs font-mono text-cyan-300">
    ✨ Zero dirty database state
  </div>
</div>

<div class="slide-card p-4 border border-cyan-500/40 bg-slate-900/60 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm">🔌 Dynamic Host Ports</span>
      <span class="text-xs font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded">Zero Collision</span>
    </div>
    <p class="text-sm text-slate-200 leading-relaxed">
      Docker binds random available host ports (e.g. <code>:5432 ➔ :32768</code>), completely eliminating port collision in parallel CI and dev environments.
    </p>
  </div>
  <div class="mt-3 pt-2 border-t border-cyan-500/20 text-xs font-mono text-cyan-300">
    ✨ Parallel execution safe
  </div>
</div>

<div class="slide-card p-4 border border-cyan-500/40 bg-slate-900/60 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm">🧹 Guaranteed Ryuk Teardown</span>
      <span class="text-xs font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded">Auto Reap</span>
    </div>
    <p class="text-sm text-slate-200 leading-relaxed">
      Moby Ryuk sidecar automatically monitors test process lifecycle and purges containers, networks, and volumes even on unexpected aborts.
    </p>
  </div>
  <div class="mt-3 pt-2 border-t border-cyan-500/20 text-xs font-mono text-cyan-300">
    ✨ Zero orphan containers
  </div>
</div>

</div>

<div class="slide-card p-3 mt-4 border border-cyan-500/30 bg-cyan-950/20 rounded-lg flex items-center justify-between">
  <span class="text-sm text-slate-200 font-medium">
    💡 <strong>Hermetic Guarantee:</strong> Every test suite executes against isolated, disposable Docker containers with zero state leakage.
  </span>
  <span class="text-xs font-mono text-cyan-300 bg-cyan-900/50 px-2 py-1 rounded">
    Next: Code Bootstrap ➔
  </span>
</div>

---
class: pt-2 pb-1 px-8
---

# 💻 Pillar 3: Container Bootstrap in Code

### Dynamic Port Mapping & Ephemeral Bootstrap in TypeScript

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/60 mt-1">
  <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
    <span class="text-slate-200 font-bold text-xs flex items-center gap-2">
      <span>💻</span> <code>tests/specs/support/containers.ts</code>
    </span>
    <span class="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
      Testcontainers Node.js SDK
    </span>
  </div>

```typescript
// 1. Spin up clean PostgreSQL 16 container with fresh schema
const postgres = await new PostgreSqlContainer("postgres:16-alpine").withDatabase("ultrasmooth").start();

// 2. Spin up WireMock container with exposed mock HTTP port
const wiremock = await new GenericContainer("wiremock/wiremock:3.3.1").withExposedPorts(8080).start();

// 3. Inject randomized host ports into runtime environment
process.env.DB_PORT = postgres.getMappedPort(5432).toString();
process.env.WIREMOCK_PORT = wiremock.getMappedPort(8080).toString();
```

</div>

<div class="grid grid-cols-2 gap-2.5 mt-2">
  <div class="slide-card p-2 text-xs border border-emerald-500/30 bg-emerald-950/20 rounded">
    <strong class="text-emerald-300 block mb-0.5 text-xs font-semibold">🔌 Dynamic Host Port Mapping</strong>
    <span class="text-slate-300 leading-snug"><code>postgres.getMappedPort(5432)</code> resolves container ports to random open host ports (e.g. <code>:32768</code>), preventing local collisions.</span>
  </div>
  <div class="slide-card p-2 text-xs border border-cyan-500/30 bg-cyan-950/20 rounded">
    <strong class="text-cyan-300 block mb-0.5 text-xs font-semibold">🧹 Automatic Teardown Hook</strong>
    <span class="text-slate-300 leading-snug">Ryuk reaps all containers on process exit, or explicitly call <code>await postgres.stop()</code> in <code>afterAll</code>.</span>
  </div>
</div>

---

# 🎭 Pillar 4: Full-Stack E2E Automation (Playwright)

### Unified Browser Automation, REST API Testing & Zero Flakiness

<div class="multi-col-grid-2">

<div class="col-card space-y-3">
  <h3 class="text-purple-400">🎭 Full-Stack Test Engine</h3>
  <div class="text-sm text-slate-200 space-y-3 leading-relaxed">
    <div>
      <strong class="text-purple-300 block text-base font-bold mb-0.5">1. Unified UI + API Testing</strong>
      Drive browser DOM interactions and headless REST verification in the same test spec.
    </div>
    <div>
      <strong class="text-purple-300 block text-base font-bold mb-0.5">2. Web-First Auto-Waiting</strong>
      Eliminates flaky <code>sleep()</code> by dynamically awaiting element visibility and network idle.
    </div>
    <div>
      <strong class="text-purple-300 block text-base font-bold mb-0.5">3. Post-Mortem CI Tracing</strong>
      Captures DOM snapshots, action timelines, and network waterfalls for failure analysis.
    </div>
  </div>
</div>

<div class="col-card">
  <h3 class="text-purple-400">💻 Full-Stack TypeScript Spec</h3>

```typescript
// tests/specs/e2e/website.spec.ts
test("Paotang login flow", async ({
  page, request
}) => {
  mockScenario(page)(
    "PAOTANG:SUCCESS", "OTP:SUCCESS"
  );

  await page.goto(`${websiteUrl}/login`);
  await page.getByTestId("btn-paotang").click();
  await expect(page).toHaveURL(/\/dashboard$/);

  const res = await request.get(`${bffUrl}/me`);
  expect(res.status()).toBe(200);
});
```

</div>

</div>

---
layout: section
---

# 🏗️ Part 1
## Ecosystem Architecture

<p class="section-narrative">
  Before we can eliminate test flakiness, we need to understand our system topology: a Go Workspace monorepo, 6 microservices, PostgreSQL, and external provider integrations.
</p>

---
class: pt-2 pb-2 px-8
---

# 🗺️ Detailed Service Topology & Flow

### Interactive Microservices Ecosystem & Call Flow Diagram

<div class="w-full flex justify-center items-center my-auto">
  <iframe 
    src="/system-architecture.html?embed=1&theme=dark" 
    class="w-full h-[66vh] rounded-lg border border-slate-700/60 shadow-2xl bg-[#020617]"
    allow="fullscreen"
  ></iframe>
</div>

---
class: pt-2 pb-2 px-8
---

# ⚙️ Technology Stack — Core Runtime & Services

<h3 class="text-slate-300 text-sm mb-1.5">Monorepo Workspaces, Modern Web &amp; Relational Persistence</h3>

<div class="grid grid-cols-3 gap-3.5 mt-2 flex-1">

<div class="slide-card p-3.5 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-sm flex items-center gap-1.5">
        <span>🐹</span> Go Workspaces
      </span>
      <span class="text-[10.5px] font-mono text-emerald-300 bg-emerald-900/50 px-2 py-0.5 rounded">go.work</span>
    </div>
    <p class="text-xs text-slate-300 leading-relaxed">
      Unifies all 6 microservices in a single monorepo with cross-service dependency synchronization, fast incremental compilation, and shared domain models.
    </p>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-emerald-500/30 text-[11px] font-mono text-emerald-300">
    ✨ 6 Services • Monorepo
  </div>
</div>

<div class="slide-card p-3.5 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
        <span>⚛️</span> Next.js 19
      </span>
      <span class="text-[10.5px] font-mono text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded">React 19</span>
    </div>
    <p class="text-xs text-slate-300 leading-relaxed">
      Modern React 19 application with Tailwind CSS for testing full-stack user journeys, authentication flows, and dynamic client routing.
    </p>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-cyan-500/30 text-[11px] font-mono text-cyan-300">
    ✨ Full-Stack Web Frontend
  </div>
</div>

<div class="slide-card p-3.5 border border-sky-500/40 bg-sky-950/20 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-sky-500/30">
      <span class="text-sky-300 font-bold text-sm flex items-center gap-1.5">
        <span>🐘</span> PostgreSQL
      </span>
      <span class="text-[10.5px] font-mono text-sky-300 bg-sky-900/50 px-2 py-0.5 rounded">ACID DB</span>
    </div>
    <p class="text-xs text-slate-300 leading-relaxed">
      Provides transactional ACID integrity for bank balances, atomic transfer rollbacks, and concurrent debit race condition testing.
    </p>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-sky-500/30 text-[11px] font-mono text-sky-300">
    ✨ ACID Isolation • Row Locks
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-2 border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-[11.5px] text-slate-200">💡 <strong>Monorepo Foundation:</strong> Unified Go backend services, Next.js web client, and PostgreSQL persistence with single-command local orchestration.</span>
  <span class="text-[10.5px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">Core Runtime</span>
</div>

---
class: pt-3 pb-3 px-8
---

# 🧪 Technology Stack — Virtualization & Traffic Control

### External API Simulation (WireMock) & In-Flight Traffic Interception (Burp Suite)

<div class="grid grid-cols-2 gap-3.5 mt-2">

<div class="slide-card p-4 md:p-5 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-base md:text-lg flex items-center gap-1.5">
        <span>🪝</span> WireMock
      </span>
      <span class="text-xs font-mono text-emerald-300/80 bg-emerald-900/40 px-2 py-0.5 rounded">Pillar 1 • Virtualization</span>
    </div>
    <p class="text-sm md:text-base text-slate-200 leading-snug mb-2 font-medium">
      Out-of-process HTTP stand-in server with deterministic stubbing &amp; fault injection
    </p>
    <ul class="space-y-1.5 text-sm md:text-base text-slate-300 leading-snug">
      <li>• <strong>Precision Matching:</strong> Routes requests by dynamic UUIDs, JSONPath expressions, and regex patterns.</li>
      <li>• <strong>Dynamic Handlebars:</strong> Computes VAT totals, generates UUIDs, and echoes client tracing headers.</li>
      <li>• <strong>Chaos &amp; Statefulness:</strong> Injects socket faults, 503 flapping, and multi-step state machines.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-emerald-500/30 text-xs md:text-sm font-mono text-emerald-300">
    ✨ Sub-5ms loopback • 100% hermetic CI execution
  </div>
</div>

<div class="slide-card p-4 md:p-5 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-base md:text-lg flex items-center gap-1.5">
        <span>🛡️</span> Burp Suite
      </span>
      <span class="text-xs font-mono text-cyan-300/80 bg-cyan-900/40 px-2 py-0.5 rounded">Pillar 2 • Traffic Control</span>
    </div>
    <p class="text-sm md:text-base text-slate-200 leading-snug mb-2 font-medium">
      Transparent duplex HTTP proxy for live inspection, tampering &amp; automated fuzzing
    </p>
    <ul class="space-y-1.5 text-sm md:text-base text-slate-300 leading-snug">
      <li>• <strong>Bi-Directional Interception:</strong> Inspects and mutates client requests and backend responses mid-flight.</li>
      <li>• <strong>Match &amp; Replace:</strong> Automatically injects Mock-Scenario headers without application code changes.</li>
      <li>• <strong>Security Inspection:</strong> Identifies IDOR vulnerabilities, broken auth, and contract flaws before prod.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-cyan-500/30 text-xs md:text-sm font-mono text-cyan-300">
    ✨ In-flight tampering • Zero-code failure injection
  </div>
</div>

</div>

---
class: pt-3 pb-3 px-8
---

# 🧪 Technology Stack — Infrastructure & E2E Automation

### Ephemeral Containers (Testcontainers) & Unified Full-Stack Testing (Playwright)

<div class="grid grid-cols-2 gap-3.5 mt-2">

<div class="slide-card p-4 md:p-5 border border-sky-500/40 bg-sky-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-sky-500/30">
      <span class="text-sky-300 font-bold text-base md:text-lg flex items-center gap-1.5">
        <span>🐳</span> Testcontainers
      </span>
      <span class="text-xs font-mono text-sky-300/80 bg-sky-900/40 px-2 py-0.5 rounded">Pillar 3 • Infrastructure</span>
    </div>
    <p class="text-sm md:text-base text-slate-200 leading-snug mb-2 font-medium">
      Code-driven Docker container lifecycle with dynamic ports and automatic teardown
    </p>
    <ul class="space-y-1.5 text-sm md:text-base text-slate-300 leading-snug">
      <li>• <strong>Zero Port Collisions:</strong> Allocates random OS loopback ports to enable 100% parallel CI test suites.</li>
      <li>• <strong>Production DDL Execution:</strong> Runs real PostgreSQL schemas, seeds, and migrations on every test run.</li>
      <li>• <strong>Moby Ryuk Teardown:</strong> Automatically removes containers on test completion to prevent orphan resource leaks.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-sky-500/30 text-xs md:text-sm font-mono text-sky-300">
    ✨ Disposable containers • Clean test isolation
  </div>
</div>

<div class="slide-card p-4 md:p-5 border border-purple-500/40 bg-purple-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-purple-500/30">
      <span class="text-purple-300 font-bold text-base md:text-lg flex items-center gap-1.5">
        <span>🎭</span> Playwright
      </span>
      <span class="text-xs font-mono text-purple-300/80 bg-purple-900/40 px-2 py-0.5 rounded">Pillar 4 • E2E Automation</span>
    </div>
    <p class="text-sm md:text-base text-slate-200 leading-snug mb-2 font-medium">
      Unified browser automation and REST API integration runner with web-first assertions
    </p>
    <ul class="space-y-1.5 text-sm md:text-base text-slate-300 leading-snug">
      <li>• <strong>Auto-Waiting Assertions:</strong> Eliminates arbitrary sleep() flakiness with built-in DOM actionability checks.</li>
      <li>• <strong>Network Routing:</strong> Intercepts browser HTTP traffic and injects Mock-Scenario headers via page.route().</li>
      <li>• <strong>Deep Diagnostics:</strong> Captures full execution traces, network HAR logs, and DOM snapshots on failure.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-purple-500/30 text-xs font-mono text-purple-300">
    ✨ Headless speed • Complete trace diagnostics
  </div>
</div>

</div>

---
layout: section
---

# 🪝 Part 2
## WireMock — External API Virtualization

<p class="section-narrative">
  We know our architecture, but external third-party dependencies (OAuth, SMS) are unpredictable and fragile. How do we virtualize external APIs deterministically? Enter WireMock.
</p>


---
class: pt-2 pb-2 px-8
---

# 🪝 What is WireMock & Why Use It in Testing?

<h3 class="text-slate-300 text-sm mb-1.5">Programmable HTTP Mock Server • Deterministic Isolation &amp; Zero Sandbox Flakiness</h3>

<div class="grid grid-cols-2 gap-3.5 mt-2 flex-1">

<div class="slide-card p-3.5 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-sm flex items-center gap-1.5">
        <span>🪝</span> Core Mocking Engine
      </span>
      <span class="text-[10px] font-mono text-emerald-300 bg-emerald-900/50 px-2 py-0.5 rounded">Capabilities</span>
    </div>
    <ul class="space-y-2.5 text-xs text-slate-300 leading-snug">
      <li class="flex items-start gap-1.5">
        <span class="text-emerald-400 font-bold">•</span>
        <span><strong class="text-emerald-300">Precision Matching:</strong> Match traffic by exact paths, regex patterns, <code class="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded">Mock-Scenario</code> header, and JSONPath.</span>
      </li>
      <li class="flex items-start gap-1.5">
        <span class="text-emerald-400 font-bold">•</span>
        <span><strong class="text-emerald-300">Dynamic Templating:</strong> Echo client params, compute dynamic VAT math, and generate UUIDs/timestamps on the fly via Handlebars.</span>
      </li>
      <li class="flex items-start gap-1.5">
        <span class="text-emerald-400 font-bold">•</span>
        <span><strong class="text-emerald-300">Chaos &amp; State (FSM):</strong> Inject network latency, socket drops, and model multi-step lifecycles like <code class="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded">Started → PAID</code>.</span>
      </li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-emerald-500/30 text-[10.5px] font-mono text-emerald-300">
    ✨ Out-of-Process HTTP Stand-In Server
  </div>
</div>

<div class="slide-card p-3.5 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
        <span>🎯</span> Why WireMock in Testing?
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded">Strategic Value</span>
    </div>
    <ul class="space-y-2.5 text-xs text-slate-300 leading-snug">
      <li class="flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold">•</span>
        <span><strong class="text-cyan-300">Hermetic Isolation:</strong> Eliminates vendor sandbox flakiness, rate limits, and maintenance windows by running 100% locally.</span>
      </li>
      <li class="flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold">•</span>
        <span><strong class="text-cyan-300">Sub-Millisecond Speed:</strong> Sub-millisecond execution with zero remote network calls, zero API costs, and zero rate limiting.</span>
      </li>
      <li class="flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold">•</span>
        <span><strong class="text-cyan-300">Live Proxy &amp; Record:</strong> Records live third-party HTTP traffic directly into JSON stubs and transparently proxies unmapped routes.</span>
      </li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-cyan-500/30 text-[10.5px] font-mono text-cyan-300">
    ✨ 100% Deterministic &amp; Fast CI Execution
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-2 border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-[11.5px] text-slate-200">💡 <strong>Virtualization Foundation:</strong> Eliminates fragile external dependencies with fast, offline, repeatable HTTP stubs.</span>
  <span class="text-[10.5px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">WireMock</span>
</div>

---
class: pt-2 pb-2 px-8
---

# ⚡ WireMock — URL & Path Matching

### Exact Path Routing, Regex Patterns & Dynamic Resource Validation

<div class="grid grid-cols-2 gap-3 mt-1.5 flex-1">

<div class="slide-card p-3 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-sm flex items-center gap-1.5">
        <span>🌐</span> Path Matcher Operators
      </span>
      <span class="text-[11px] font-mono text-emerald-300/80 bg-emerald-900/40 px-2 py-0.5 rounded">Routing</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong><code>url</code></strong>: Matches full absolute path <em>including</em> query parameters.</li>
      <li>• <strong><code>urlPath</code></strong>: Matches URI path only, safely ignoring query parameters.</li>
      <li>• <strong><code>urlPathPattern</code></strong>: Regular expression matching on URI paths.</li>
      <li>• <strong><code>urlPattern</code></strong>: Regular expression matching on the complete URL.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-emerald-500/30 text-xs font-mono text-emerald-300">
    💡 Best Practice: Use <code>urlPath</code> for stable paths and <code>urlPathPattern</code> for dynamic IDs.
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/50 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>📄</span> Path Pattern Mapping Stub
      </span>
      <span class="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">JSON</span>
    </div>

```json
{
  "request": {
    "method": "GET",
    "urlPathPattern": "/lab/api/users/[0-9]+"
  },
  "response": {
    "status": 200,
    "jsonBody": { "status": "ACTIVE", "role": "USER" }
  }
}
```

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-xs text-slate-400">
    🎯 Matches any numeric user path (e.g. <code>/users/101</code>) without hardcoding.
  </div>
</div>

</div>

---
class: pt-2 pb-2 px-8
---

# ⚡ WireMock — Header Matching & Scenario Steering

### Exact Matches, Substrings, Regex & Mock Scenario Steering

<div class="grid grid-cols-2 gap-3 mt-1.5 flex-1">

<div class="slide-card p-3 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
        <span>🏷️</span> Operator Reference
      </span>
      <span class="text-[11px] font-mono text-cyan-300/80 bg-cyan-900/40 px-2 py-0.5 rounded">Headers</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong><code>equalTo</code></strong>: Exact case-sensitive match (<code>application/json</code>).</li>
      <li>• <strong><code>matches</code></strong>: Regex on header value (<code>Bearer [A-Za-z0-9-_\\.]+</code>).</li>
      <li>• <strong><code>contains</code></strong>: Substring match (<code>TRANSFER:INSUFFICIENT_FUNDS</code>).</li>
      <li>• <strong><code>absent</code></strong>: Asserts header is completely omitted.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-cyan-500/30 text-xs font-mono text-cyan-300">
    💉 Header Steering: Selects specific mock responses without restarting services.
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/50 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>📄</span> Auth &amp; Steering Mapping Stub
      </span>
      <span class="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">JSON</span>
    </div>

```json
{
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/transfers",
    "headers": {
      "Authorization": { "matches": "Bearer [A-Za-z0-9-_]+" },
      "Mock-Scenario": { "contains": "ACCOUNT_ACTIVE" }
    }
  },
  "response": {
    "status": 200,
    "jsonBody": { "status": "APPROVED" }
  }
}
```

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-xs text-slate-400">
    🛡️ Validates Bearer token format &amp; routes on <code>Mock-Scenario</code> header.
  </div>
</div>

</div>

---
class: pt-2 pb-2 px-8
---

# ⚡ WireMock — Query Parameter & Cookie Filters

### Parameter Flags, Cookie Assertions & Multi-Criteria Conjunction

<div class="grid grid-cols-2 gap-3 mt-1.5 flex-1">

<div class="slide-card p-3 border border-amber-500/40 bg-amber-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-amber-500/30">
      <span class="text-amber-300 font-bold text-sm flex items-center gap-1.5">
        <span>🔍</span> Filter Operators
      </span>
      <span class="text-[11px] font-mono text-amber-300/80 bg-amber-900/40 px-2 py-0.5 rounded">Query &amp; Cookie</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong><code>queryParameters</code></strong>: Match flags (<code>?active=true</code>) or limits (<code>?limit=10</code>).</li>
      <li>• <strong><code>cookies</code></strong>: Assert session, authentication, or tracking cookies.</li>
      <li>• <strong><code>absent: true</code></strong>: Verify optional query parameters or cookies are omitted.</li>
      <li>• <strong>Conjunction Rule</strong>: Method, path, headers, and queries must <strong>all</strong> evaluate to true.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-amber-500/30 text-xs font-mono text-amber-300">
    ⚖️ If any matcher fails, evaluation cascades to next priority stub.
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/50 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>📄</span> Query Flag Mapping Stub
      </span>
      <span class="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">JSON</span>
    </div>

```json
{
  "request": {
    "method": "GET",
    "urlPath": "/lab/api/users/filter",
    "queryParameters": {
      "active": { "equalTo": "true" },
      "limit": { "matches": "[0-9]+" }
    }
  },
  "response": {
    "status": 200,
    "jsonBody": { "count": 10, "users": [] }
  }
}
```

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-xs text-slate-400">
    🏷️ Matches exact flag (<code>?active=true</code>) and regex limit (<code>?limit=10</code>).
  </div>
</div>

</div>

---
class: pt-2 pb-1 px-8
---

# ⚖️ WireMock — Priority & 3-Tier Precedence Hierarchy

### Specific Error Overrides vs. Default Happy Paths vs. Catch-All Proxies

<div class="grid grid-cols-3 gap-3.5 mt-2 flex-1">

<div class="slide-card p-3 bg-slate-900/60 border border-rose-500/40 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-xs flex items-center gap-1.5">
        <span>🥇</span> Fault Override
      </span>
      <span class="text-[10px] font-mono font-semibold text-rose-300 bg-rose-950/80 border border-rose-500/40 px-2 py-0.5 rounded whitespace-nowrap">Priority 1</span>
    </div>
    <p class="text-xs text-slate-300 mb-2 leading-relaxed">Explicit scenario error &amp; fault contracts.</p>
    <div class="bg-slate-950/90 rounded-md p-2 font-mono text-[10.5px] leading-relaxed border border-slate-800 text-slate-300 space-y-0.5">
      <div><span class="text-rose-400 font-semibold">"priority"</span>: <span class="text-amber-300 font-bold">1</span>,</div>
      <div><span class="text-slate-400">"urlPath"</span>: <span class="text-emerald-300">"/api/transfers"</span>,</div>
      <div><span class="text-slate-400">"headers"</span>: { <span class="text-rose-300">"Mock-Scenario"</span>: <span class="text-emerald-300">"FUNDS"</span> },</div>
      <div><span class="text-slate-400">"status"</span>: <span class="text-rose-400 font-bold">400</span> <span class="text-slate-500">// ERR_FUNDS</span></div>
    </div>
  </div>
  <div class="pt-1.5 border-t border-rose-500/30 text-[11px] font-mono text-rose-300 mt-2 flex items-center justify-between">
    <span>🎯 Highest Precedence</span>
    <span class="text-[9.5px] text-rose-400/90 bg-rose-950/50 px-1.5 py-0.5 rounded border border-rose-500/30">Tier 1</span>
  </div>
</div>

<div class="slide-card p-3 bg-slate-900/60 border border-emerald-500/40 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
        <span>🥈</span> Happy Path
      </span>
      <span class="text-[10px] font-mono font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded whitespace-nowrap">Priority 10</span>
    </div>
    <p class="text-xs text-slate-300 mb-2 leading-relaxed">Standard domain routes without scenario headers.</p>
    <div class="bg-slate-950/90 rounded-md p-2 font-mono text-[10.5px] leading-relaxed border border-slate-800 text-slate-300 space-y-0.5">
      <div><span class="text-emerald-400 font-semibold">"priority"</span>: <span class="text-amber-300 font-bold">10</span>,</div>
      <div><span class="text-slate-400">"urlPath"</span>: <span class="text-emerald-300">"/api/transfers"</span>,</div>
      <div><span class="text-slate-400">"status"</span>: <span class="text-emerald-400 font-bold">201</span>,</div>
      <div><span class="text-slate-400">"jsonBody"</span>: { <span class="text-cyan-300">"status"</span>: <span class="text-emerald-300">"COMPLETED"</span> }</div>
    </div>
  </div>
  <div class="pt-1.5 border-t border-emerald-500/30 text-[11px] font-mono text-emerald-300 mt-2 flex items-center justify-between">
    <span>🎯 Default Domain Route</span>
    <span class="text-[9.5px] text-emerald-400/90 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-500/30">Tier 2</span>
  </div>
</div>

<div class="slide-card p-3 bg-slate-900/60 border border-cyan-500/40 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
        <span>🛡️</span> Catch-All Proxy
      </span>
      <span class="text-[10px] font-mono font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded whitespace-nowrap">Priority 100</span>
    </div>
    <p class="text-xs text-slate-300 mb-2 leading-relaxed">Fallback proxy for unmapped external traffic.</p>
    <div class="bg-slate-950/90 rounded-md p-2 font-mono text-[10.5px] leading-relaxed border border-slate-800 text-slate-300 space-y-0.5">
      <div><span class="text-cyan-400 font-semibold">"priority"</span>: <span class="text-amber-300 font-bold">100</span>,</div>
      <div><span class="text-slate-400">"urlPattern"</span>: <span class="text-emerald-300">"/.*"</span>,</div>
      <div><span class="text-slate-400">"proxyBaseUrl"</span>:</div>
      <div class="pl-3 truncate"><span class="text-cyan-300">"https://api.external.com"</span></div>
    </div>
  </div>
  <div class="pt-1.5 border-t border-cyan-500/30 text-[11px] font-mono text-cyan-300 mt-2 flex items-center justify-between">
    <span>🎯 Live Fallback Proxy</span>
    <span class="text-[9.5px] text-cyan-400/90 bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-500/30">Tier 3</span>
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-2.5 border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-[11.5px] text-slate-200">💡 <strong>Precedence Rule:</strong> Lower integer = higher priority (<code class="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded">1 &gt; 10 &gt; 100</code>). WireMock stops on first match. Default is <strong class="text-emerald-300 font-mono">5</strong>.</span>
  <span class="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">Precedence Hierarchy</span>
</div>

---

# ⚖️ Priority Precedence in Action

### Comparing Matched Stubs: Scenario Override vs. Default Route

<div class="multi-col-grid-2 gap-3 mb-1.5">

<div class="col-card p-2.5 space-y-1 bg-slate-900/60 border-rose-500/30">
  <h3 class="text-rose-400 text-sm mb-0.5">🥇 Case A: Header Present (Priority 1 Wins)</h3>
  <div class="text-xs text-slate-300">
    <code>POST /lab/api/transfers</code> + <span class="text-amber-300">Mock-Scenario: INSUFFICIENT_FUNDS</span>
  </div>
  <div class="bg-slate-950/90 rounded p-1.5 border border-rose-500/40 font-mono text-xs text-rose-200 mt-auto">
    <div class="text-xs text-slate-400 font-sans mb-0.5">💥 Evaluated Response:</div>
    <code>HTTP/1.1 400 Bad Request<br/>
    {"code": "ERR_INSUFFICIENT_FUNDS"}</code>
  </div>
  <p class="text-rose-300/80 text-xs leading-tight">
    Matches Priority 1 error stub explicitly; evaluation terminates immediately.
  </p>
</div>

<div class="col-card p-2.5 space-y-1 bg-slate-900/60 border-emerald-500/30">
  <h3 class="text-emerald-400 text-sm mb-0.5">🥈 Case B: Header Absent (Falls to Priority 10)</h3>
  <div class="text-xs text-slate-300">
    <code>POST /lab/api/transfers</code> (Standard request, no steer header)
  </div>
  <div class="bg-slate-950/90 rounded p-1.5 border border-emerald-500/40 font-mono text-xs text-emerald-200 mt-auto">
    <div class="text-xs text-slate-400 font-sans mb-0.5">✅ Evaluated Response:</div>
    <code>HTTP/1.1 201 Created<br/>
    {"status": "COMPLETED"}</code>
  </div>
  <p class="text-emerald-300/80 text-xs leading-tight">
    Priority 1 check fails (missing header); cascades down to Priority 10 happy path.
  </p>
</div>

</div>

<div class="slide-card text-xs bg-slate-900/70 border-cyan-500/50 p-2 flex items-center gap-2 shadow-lg">
  <span class="text-base">💡</span>
  <span class="text-slate-200 leading-snug"><strong>Resolution Rule</strong>: Lowest integer priority wins first. Cascades downward until a stub's full criteria (URL, method, headers, body) match.</span>
</div>

---

# 🔀 Multi-Scenario Steering — Comma-Separated Headers

### Steer Multiple Downstream Services from a Single Test Request

<div class="multi-col-grid-2 gap-3 mb-1.5">

<div class="col-card p-2.5 space-y-1.5">
  <h3 class="text-cyan-400 text-sm mb-0.5">📤 1. Injected Steering Header</h3>
  <p class="text-slate-300 text-xs leading-relaxed">
    Playwright or Burp Suite injects a single comma-separated header targeting multiple downstream dependencies:
  </p>
  <div class="bg-slate-950/80 rounded p-1.5 border border-cyan-500/40 font-mono text-xs text-cyan-200 mt-auto">
    <code>Mock-Scenario: PAOTANG:SUCCESS,OTP:EXPIRED,TRANSFER:FAIL</code>
  </div>
</div>

<div class="col-card p-2.5 space-y-1.5">
  <h3 class="text-emerald-400 text-sm mb-0.5">🎯 2. Independent Stub Matching (<code>contains</code>)</h3>
  <ul class="space-y-0.5 text-slate-200 text-xs leading-relaxed">
    <li>• <strong>Paotang Stub</strong>: <code>"contains": "PAOTANG:SUCCESS"</code> ➔ <span class="text-emerald-400 font-semibold">200 OK</span></li>
    <li>• <strong>OTP Stub</strong>: <code>"contains": "OTP:EXPIRED"</code> ➔ <span class="text-rose-400 font-semibold">400 Expired</span></li>
    <li>• <strong>Transfer Stub</strong>: <code>"contains": "TRANSFER:FAIL"</code> ➔ <span class="text-rose-400 font-semibold">500 Error</span></li>
  </ul>
  <div class="bg-slate-950/80 rounded p-1.5 border border-emerald-500/40 font-mono text-xs text-emerald-200 mt-auto">
    <code>"headers": { "Mock-Scenario": { "contains": "OTP:EXPIRED" } }</code>
  </div>
</div>

</div>

<div class="slide-card text-xs bg-slate-900/70 border-cyan-500/50 p-2 flex items-center gap-2 shadow-lg">
  <span class="text-base">💡</span>
  <span class="text-slate-200 leading-snug"><strong>Orchestration Benefit</strong>: Using <code>contains</code> instead of <code>equalTo</code> allows a single test case to orchestrate complex multi-service branch paths simultaneously.</span>
</div>

---

# 📦 WireMock — Semantic JSON Matching (`equalToJson`)

### Data & Structural Meaning vs. Raw Character Matching

<div class="multi-col-grid-2 gap-3 mb-1.5">

<div class="col-card p-2.5 space-y-1.5">
  <h3 class="text-rose-400 text-sm mb-0.5">❌ Literal String Matching (Raw Text)</h3>
  <ul class="space-y-0.5 text-slate-200 text-xs leading-relaxed">
    <li>• <strong>Character Stream</strong>: Treats JSON as unparsed dumb text.</li>
    <li>• ⚠️ <strong>Spacing Sensitive</strong>: <code>{"a":1}</code> ≠ <code>{"a": 1}</code>.</li>
    <li>• ⚠️ <strong>Newline Sensitive</strong>: Indented JSON triggers test failure.</li>
    <li>• ⚠️ <strong>Key Order Sensitive</strong>: <code>{"a":1,"b":2}</code> ≠ <code>{"b":2,"a":1}</code>.</li>
  </ul>
  <div class="bg-rose-950/50 rounded p-1.5 border border-rose-500/40 text-xs text-rose-200 mt-auto flex items-center justify-between font-mono">
    <span>{"a":1, "b":2}</span>
    <span class="text-rose-400 font-bold font-sans">❌ NO MATCH</span>
    <span>{"b":2, "a":1}</span>
  </div>
</div>

<div class="col-card p-2.5 space-y-1.5">
  <h3 class="text-emerald-400 text-sm mb-0.5">✅ Semantic JSON Matching (<code>equalToJson</code>)</h3>
  <ul class="space-y-0.5 text-slate-200 text-xs leading-relaxed">
    <li>• <strong>AST Object Parsing</strong>: Parses JSON document tree first.</li>
    <li>• 🟢 <strong>Whitespace Immune</strong>: Ignores spaces, tabs, and linebreaks.</li>
    <li>• 🟢 <strong>Key Order Agnostic</strong>: Compares key-values semantically.</li>
    <li>• 🟢 <strong>Cross-Language Safe</strong>: 100% stable across Go, Java, and Node.</li>
  </ul>
  <div class="bg-emerald-950/50 rounded p-1.5 border border-emerald-500/40 text-xs text-emerald-200 mt-auto flex items-center justify-between font-mono">
    <span>{"a":1, "b":2}</span>
    <span class="text-emerald-400 font-bold font-sans">✅ EQUIVALENT</span>
    <span>{"b":2, "a":1}</span>
  </div>
</div>

</div>

<div class="slide-card text-xs bg-slate-900/70 border-cyan-500/50 p-2 flex items-center gap-2 shadow-lg">
  <span class="text-base">💡</span>
  <span class="text-slate-200 leading-snug"><strong>Key Principle</strong>: <code>equalToJson</code> validates the <em>data contract and values</em> rather than accidental serializer formatting differences.</span>
</div>

---
class: pt-2 pb-2 px-8
---

# ⚙️ WireMock — Body Match Operators & Lenient Flags

### Strict Matchers vs. Resilient Microservice Contracts

<div class="grid grid-cols-2 gap-3 mt-1.5 flex-1">

<div class="slide-card p-3 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-sm flex items-center gap-1.5">
        <span>⚙️</span> Lenient Flags
      </span>
      <span class="text-[11px] font-mono text-emerald-300/80 bg-emerald-900/40 px-2 py-0.5 rounded">Resilience</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong><code>equalToJson</code></strong>: Semantic JSON equivalence (AST-based).</li>
      <li>• <strong><code>ignoreExtraElements: true</code></strong>: Ignores new fields (e.g. <code>traceId</code>) for safe schema evolution.</li>
      <li>• <strong><code>ignoreArrayOrder: true</code></strong>: Treats array items as sets (<code>[A, B]</code> matches <code>[B, A]</code>).</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-emerald-500/30 text-xs font-mono text-emerald-300">
    💡 Prevents false test failures when upstream microservices add fields.
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/50 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>📄</span> Lenient Body Mapping Stub
      </span>
      <span class="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">JSON</span>
    </div>

```json
{
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/accounts/open",
    "bodyPatterns": [
      {
        "equalToJson": { "type": "SAVINGS" },
        "ignoreExtraElements": true,
        "ignoreArrayOrder": true
      }
    ]
  },
  "response": {
    "status": 201,
    "jsonBody": { "accountId": "ACC-998877" }
  }
}
```

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-xs text-slate-400">
    ✨ Matches exact type while tolerating extra metadata fields.
  </div>
</div>

</div>

---

# 🔍 WireMock — JSONPath Expression Capabilities

### Advanced Payload Filtering with Jayway JsonPath

<div class="grid grid-cols-2 gap-3 mb-2">

<div class="col-card p-2.5 space-y-1 bg-slate-900/60 border-cyan-500/30">
  <div class="text-cyan-400 font-bold text-sm flex items-center gap-1.5">
    <span>📊</span> <span>1. Numeric Comparison</span>
  </div>
  <div class="text-cyan-200 text-xs font-mono bg-slate-950/80 p-1.5 rounded border border-cyan-500/30">
    $.payment[?(@.amount &gt; 1000)]
  </div>
  <p class="text-slate-300 text-[11px] leading-tight">
    Supports <code>&gt;</code>, <code>&gt;=</code>, <code>&lt;</code>, <code>&lt;=</code>, <code>==</code>, <code>!=</code> for value thresholds.
  </p>
</div>

<div class="col-card p-2.5 space-y-1 bg-slate-900/60 border-indigo-500/30">
  <div class="text-indigo-400 font-bold text-sm flex items-center gap-1.5">
    <span>🔀</span> <span>2. Logical Combinations</span>
  </div>
  <div class="text-indigo-200 text-xs font-mono bg-slate-950/80 p-1.5 rounded border border-indigo-500/30">
    [?(@.amount &gt; 1000 &amp;&amp; @.currency == 'THB')]
  </div>
  <p class="text-slate-300 text-[11px] leading-tight">
    Combines criteria with <code>&amp;&amp;</code> (AND), <code>||</code> (OR), <code>!</code> (NOT).
  </p>
</div>

<div class="col-card p-2.5 space-y-1 bg-slate-900/60 border-amber-500/30">
  <div class="text-amber-400 font-bold text-sm flex items-center gap-1.5">
    <span>🏷️</span> <span>3. Set Membership &amp; Field Check</span>
  </div>
  <div class="text-amber-200 text-xs font-mono bg-slate-950/80 p-1.5 rounded border border-amber-500/30">
    $.order[?(@.status in ['PENDING', 'PAID'])]
  </div>
  <p class="text-slate-300 text-[11px] leading-tight">
    Allowed lists with <code>in</code> / <code>nin</code>, or existence via <code>$[?(@.promoCode)]</code>.
  </p>
</div>

<div class="col-card p-2.5 space-y-1 bg-slate-900/60 border-emerald-500/30">
  <div class="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
    <span>🎯</span> <span>4. RegEx &amp; Deep Scan</span>
  </div>
  <div class="text-emerald-200 text-xs font-mono bg-slate-950/80 p-1.5 rounded border border-emerald-500/30">
    $..[?(@.sku =~ /^IPHONE-.*/)]
  </div>
  <p class="text-slate-300 text-[11px] leading-tight">
    Regex matching with <code>=~</code> and recursive object scan with <code>..</code>.
  </p>
</div>

</div>

<div class="slide-card text-xs bg-slate-900/70 border-cyan-500/50 p-2 flex items-center gap-2 shadow-lg">
  <span class="text-base">💡</span>
  <span class="text-slate-200 leading-snug"><strong>Evaluation Rule</strong>: When the filter returns a non-empty result set, WireMock evaluates it as <strong>TRUE (200/201 Match)</strong>.</span>
</div>

---
class: pt-2 pb-2 px-8
---

# 🔍 JSONPath Expression — High-Value Payment Filter

### Declarative threshold routing in WireMock request body patterns

<div class="grid grid-cols-2 gap-3 mt-1.5 flex-1">

<div class="slide-card p-3 border border-fuchsia-500/40 bg-fuchsia-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-fuchsia-500/30">
      <span class="text-fuchsia-300 font-bold text-sm flex items-center gap-1.5">
        <span>⚡</span> Filter Mechanics
      </span>
      <span class="text-[11px] font-mono text-fuchsia-300/80 bg-fuchsia-900/40 px-2 py-0.5 rounded">matchesJsonPath</span>
    </div>
    <ul class="space-y-2 text-xs text-slate-200 leading-snug">
      <li>• <strong>Filter Predicate</strong>: <code>$.payment[?(@.amount > 1000)]</code> evaluates numeric comparisons directly in JSON.</li>
      <li>• <strong>Priority Control</strong>: Set <code>priority: 1</code> so high-value stubs evaluate before generic fallback stubs.</li>
      <li>• <strong>Boolean Match</strong>: If the JSONPath filter returns a non-empty set, WireMock evaluates it as <strong>MATCH (201 Created)</strong>.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-fuchsia-500/30 text-xs font-mono text-fuchsia-300">
    📂 <code>wiremock/mappings/04-payment-high-value.json</code>
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/50 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>📄</span> WireMock Mapping Stub
      </span>
      <span class="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">JSON</span>
    </div>

```json
{
  "priority": 1,
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/stateless/payments",
    "bodyPatterns": [
      { "matchesJsonPath": "$.payment[?(@.amount > 1000)]" }
    ]
  },
  "response": {
    "status": 201,
    "jsonBody": {
      "status": "APPROVED",
      "flag": "HIGH_VALUE_TRANSACTION"
    }
  }
}
```

  </div>
</div>

</div>

<div v-pre class="slide-card py-1.5 px-3 flex items-center text-xs mt-2 border border-fuchsia-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-fuchsia-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Decoupled Architecture:</strong> Route requests to different mock personas without touching backend service source code.
  </span>
</div>

<!--
Presenter Notes:
- Explain that matchesJsonPath uses standard JsonPath filter expressions.
- Emphasize the importance of stub priority when multiple stubs match the same path.
-->

---
class: pt-2 pb-1 px-8
---

# 🎯 WireMock RegEx — Path & Dynamic Routing

<h3 class="text-slate-300 text-sm mb-1.5">Multi-Segment Hierarchy Matching with <code class="text-cyan-300 font-mono text-xs">urlPathPattern</code></h3>

<div class="grid grid-cols-2 gap-3.5 mt-2 flex-1">

<div class="slide-card p-3 border border-cyan-500/40 bg-cyan-950/20 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
        <span>🌐</span> Path RegEx Patterns
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded">Routing</span>
    </div>
    <ul class="space-y-2 text-xs text-slate-300 leading-snug">
      <li class="flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold">•</span>
        <span><strong class="text-cyan-300">Standard UUID:</strong> <code class="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded">[a-z0-9-]+</code> (RFC 4122 IDs)</span>
      </li>
      <li class="flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold">•</span>
        <span><strong class="text-cyan-300">Entity Prefixes:</strong> <code class="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded">ACC-[0-9]{6}</code> (Banking account IDs)</span>
      </li>
      <li class="flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold">•</span>
        <span><strong class="text-cyan-300">Hierarchy Routing:</strong> Combines static paths with dynamic regex slots.</span>
      </li>
    </ul>
    <div class="bg-slate-950/90 rounded p-1.5 border border-cyan-500/30 font-mono text-[10.5px] text-cyan-200 mt-2 truncate">
      <code>/api/users/[a-z0-9-]+/accounts/ACC-[0-9]{6}</code>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center justify-between">
    <span>💡 Ignores arbitrary query params</span>
    <span class="text-[9.5px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">Safe Path</span>
  </div>
</div>

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/60 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>📄</span> Path Pattern Mapping Stub
      </span>
      <span class="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">JSON</span>
    </div>
    <div class="bg-slate-950/90 rounded-md p-2 font-mono text-[10px] leading-relaxed border border-slate-800 text-slate-300 space-y-0.5">
      <div>{</div>
      <div class="pl-2.5"><span class="text-slate-400">"request"</span>: {</div>
      <div class="pl-5"><span class="text-slate-400">"method"</span>: <span class="text-emerald-300">"GET"</span>,</div>
      <div class="pl-5"><span class="text-slate-400">"urlPathPattern"</span>: <span class="text-cyan-300">"/api/users/[a-z0-9-]+/accounts/ACC-\\d{6}"</span></div>
      <div class="pl-2.5">},</div>
      <div class="pl-2.5"><span class="text-slate-400">"response"</span>: {</div>
      <div class="pl-5"><span class="text-slate-400">"status"</span>: <span class="text-emerald-400 font-bold">200</span>,</div>
      <div class="pl-5"><span class="text-slate-400">"jsonBody"</span>: { <span class="text-slate-400">"type"</span>: <span class="text-emerald-300">"SAVINGS"</span>, <span class="text-slate-400">"currency"</span>: <span class="text-emerald-300">"THB"</span>, <span class="text-slate-400">"status"</span>: <span class="text-emerald-300">"ACTIVE"</span> }</div>
      <div class="pl-2.5">}</div>
      <div>}</div>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-xs text-slate-400 flex items-center justify-between">
    <span>✨ Multi-Segment Banking Path</span>
    <span class="text-[9.5px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">Dynamic URL</span>
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-2.5 border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-[11.5px] text-slate-200">💡 <strong>Best Practice:</strong> Use <code class="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded">urlPathPattern</code> to validate nested resource hierarchies without pinning hardcoded database IDs.</span>
  <span class="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">urlPathPattern</span>
</div>

---
class: pt-2 pb-1 px-8
---

# 🎯 WireMock RegEx — Header & Scenario Steering

<h3 class="text-slate-300 text-sm mb-1.5">Strict Bearer Token & Scenario Enum Validation with <span class="font-mono text-cyan-300 bg-cyan-900/60 border border-cyan-500/40 px-2 py-0.5 rounded text-xs font-bold">matches</span></h3>

<div class="grid grid-cols-2 gap-3 mt-1 flex-1">

<div class="slide-card p-2.5 border border-cyan-500/40 bg-cyan-950/20 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
        <span>🏷️</span> Header RegEx Operators
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded">Security</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li class="flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold">•</span>
        <span><span class="font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded text-xs font-semibold">matches</span>: Target must satisfy regular expression.</span>
      </li>
      <li class="flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold">•</span>
        <span><span class="font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded text-xs font-semibold">doesNotMatch</span>: Passes only when pattern fails.</span>
      </li>
      <li class="flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold">•</span>
        <span><strong class="text-cyan-300">Strict Enums:</strong> Restricts scenarios to registered values.</span>
      </li>
    </ul>
    <div class="bg-slate-950/90 rounded p-1.5 border border-cyan-500/30 font-mono text-[10.5px] text-cyan-300 mt-2 truncate">
      <span class="text-cyan-400 font-semibold">"matches"</span>: <span>"TRANSFER:(SUCCESS|INSUFFICIENT_FUNDS)"</span>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-cyan-500/30 text-[11px] text-cyan-300 flex items-center justify-between">
    <span>💡 Prevents silent scenario fallthroughs</span>
    <span class="text-[9.5px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">Strict Enum</span>
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/60 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>📄</span> Stub Mapping Example
      </span>
      <span class="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">JSON</span>
    </div>
    <div class="bg-slate-950/90 rounded-md p-2 font-mono text-[9.5px] leading-relaxed border border-slate-800 text-slate-300 space-y-0.5">
      <div>{</div>
      <div class="pl-2.5"><span class="text-slate-400">"request"</span>: {</div>
      <div class="pl-5"><span class="text-slate-400">"method"</span>: <span class="text-emerald-300">"POST"</span>, <span class="text-slate-400">"urlPath"</span>: <span class="text-cyan-300">"/api/transfers"</span>,</div>
      <div class="pl-5"><span class="text-slate-400">"headers"</span>: {</div>
      <div class="pl-7"><span class="text-slate-400">"Authorization"</span>: { <span class="text-cyan-300 font-semibold">"matches"</span>: <span class="text-emerald-300">"Bearer .*"</span> },</div>
      <div class="pl-7"><span class="text-slate-400">"Mock-Scenario"</span>: { <span class="text-cyan-300 font-semibold">"matches"</span>: <span class="text-cyan-300">"TRANSFER:(SUCCESS|FAIL)"</span> }</div>
      <div class="pl-5">}</div>
      <div class="pl-2.5">},</div>
      <div class="pl-2.5"><span class="text-slate-400">"response"</span>: {</div>
      <div class="pl-5"><span class="text-slate-400">"status"</span>: <span class="text-emerald-400 font-bold">200</span>, <span class="text-slate-400">"jsonBody"</span>: { <span class="text-slate-400">"authorized"</span>: <span class="text-amber-300">true</span> }</div>
      <div class="pl-2.5">}</div>
      <div>}</div>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center justify-between">
    <span>🔐 Enforces JWT syntax & scenario routing</span>
    <span class="text-[9.5px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">Header Gate</span>
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-2 border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-[11.5px] text-slate-200">💡 <strong>Best Practice:</strong> Use header regex to simulate auth states and gateway routing without generating real cryptography signatures.</span>
  <span class="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">Header Steering</span>
</div>

---
class: pt-2 pb-1 px-8
---

# 🎯 WireMock RegEx — Body & Query Matching

<h3 class="text-slate-300 text-sm mb-1.5">13-Digit Thai National ID & Query Versioning with <span class="font-mono text-cyan-300 bg-cyan-900/60 border border-cyan-500/40 px-2 py-0.5 rounded text-xs font-bold">matches</span></h3>

<div class="grid grid-cols-2 gap-3 mt-1 flex-1">

<div class="slide-card p-2.5 border border-cyan-500/40 bg-cyan-950/20 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
        <span>📝</span> Matching Evaluation
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded">Validation</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li class="flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold">•</span>
        <span><strong class="text-cyan-300">Query Versioning:</strong> <span class="font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded text-xs">v[1-3].*</span> routes across versions.</span>
      </li>
      <li class="flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold">•</span>
        <span><strong class="text-cyan-300">Raw Body RegEx:</strong> Matches 13-digit Thai national IDs.</span>
      </li>
      <li class="flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold">•</span>
        <span><strong class="text-cyan-300">⚠️ Key Order:</strong> Raw regex breaks on key reordering.</span>
      </li>
    </ul>
    <div class="bg-slate-950/90 rounded p-1.5 border border-cyan-500/30 font-mono text-[10px] text-cyan-200 mt-2 truncate">
      <span class="text-slate-400">"matches"</span>: <span class="text-cyan-300">".*\"national_id\":\"[0-9]{13}\".*"</span>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-cyan-500/30 text-[11px] text-cyan-300 flex items-center justify-between">
    <span>💡 Prefer matchesJsonPath for payload resilience</span>
    <span class="text-[9.5px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">Order Safe</span>
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/60 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>📄</span> Stub Mapping Example
      </span>
      <span class="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">JSON</span>
    </div>
    <div class="bg-slate-950/90 rounded-md p-2 font-mono text-[9.5px] leading-relaxed border border-slate-800 text-slate-300 space-y-0.5">
      <div>{</div>
      <div class="pl-2.5"><span class="text-slate-400">"request"</span>: {</div>
      <div class="pl-5"><span class="text-slate-400">"method"</span>: <span class="text-emerald-300">"POST"</span>, <span class="text-slate-400">"urlPath"</span>: <span class="text-cyan-300">"/api/ekyc/verify"</span>,</div>
      <div class="pl-5"><span class="text-slate-400">"queryParameters"</span>: { <span class="text-slate-400">"v"</span>: { <span class="text-slate-400">"matches"</span>: <span class="text-cyan-300">"v[1-3].*"</span> } },</div>
      <div class="pl-5"><span class="text-slate-400">"bodyPatterns"</span>: [</div>
      <div class="pl-7">{ <span class="text-slate-400">"matches"</span>: <span class="text-cyan-300">".*\"national_id\":\"[0-9]{13}\".*"</span> }</div>
      <div class="pl-5">]</div>
      <div class="pl-2.5">},</div>
      <div class="pl-2.5"><span class="text-slate-400">"response"</span>: {</div>
      <div class="pl-5"><span class="text-slate-400">"status"</span>: <span class="text-emerald-400 font-bold">200</span>, <span class="text-slate-400">"jsonBody"</span>: { <span class="text-slate-400">"verified"</span>: <span class="text-amber-300">true</span> }</div>
      <div class="pl-2.5">}</div>
      <div>}</div>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center justify-between">
    <span>🪪 Strict 13-digit ID across versions v1, v2, v3</span>
    <span class="text-[9.5px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">eKYC Gate</span>
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-2 border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-[11.5px] text-slate-200">💡 <strong>Best Practice:</strong> Use regex query parameters for version routing; prefer <span class="font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded text-xs font-semibold">matchesJsonPath</span> for resilient JSON body matching.</span>
  <span class="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">Body & Query</span>
</div>

---
class: pt-2 pb-2 px-8
---

# 🎯 WireMock RegEx — Multiple JSONPath Matchers

### Conjunctive (AND) Multi-Field Payload Validation with JSONPath

```json
{
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/otp/send",
    "bodyPatterns": [
      { "matchesJsonPath": "$[?(@.phone =~ /^0[689]\\d{8}$/)]" },
      { "matchesJsonPath": "$[?(@.channel =~ /^(SMS|WA)$/)]" },
      { "matchesJsonPath": "$.auth[?(@.purpose == 'VERIFY')]" }
    ]
  },
  "response": {
    "status": 200,
    "jsonBody": { "status": "sent", "channel": "SMS" }
  }
}
```

<div class="slide-card text-xs mt-2 p-2">
  🔗 <strong>Conjunctive (AND) Evaluation:</strong> All <code>bodyPatterns</code> JSONPath expressions must evaluate to true (Thai mobile regex + channel enum + auth purpose) while remaining immune to key ordering and extraneous fields.
</div>

---

# 🔍 JSONPath RegEx Deep Dive — Expression Breakdown

### Anatomy of `matchesJsonPath: "$[?(@.phone =~ /^0[689]\\d{8}$/)]"`

<div class="grid grid-cols-2 gap-3 mt-1 text-sm">

<div class="slide-card space-y-2 p-3">
  <h3 class="text-emerald-400 font-bold text-sm">🧩 1. Expression Anatomy</h3>
  <div class="space-y-1.5 text-slate-300 font-mono text-[11px]">
    <div><code class="text-cyan-300">$</code> — <span class="text-slate-300 font-sans">Root object of incoming JSON document</span></div>
    <div><code class="text-cyan-300">[?( ... )]</code> — <span class="text-slate-300 font-sans">Filter predicate evaluating condition inside</span></div>
    <div><code class="text-cyan-300">@.phone</code> — <span class="text-slate-300 font-sans">Extracts the <code>phone</code> field on object</span></div>
    <div><code class="text-amber-300">=~</code> — <span class="text-slate-300 font-sans">Jayway JsonPath <strong>regex match operator</strong></span></div>
    <div><code class="text-amber-300">/^0[689]\d{8}$/</code> — <span class="text-slate-300 font-sans">10-digit Thai mobile format</span></div>
  </div>
  <p class="text-slate-400 text-[11px] pt-1.5 border-t border-slate-700/50">
    📌 <strong>Regex rule</strong>: Starts with <code>0</code>, second digit <code>6, 8, 9</code>, followed by 8 numeric digits.
  </p>
</div>

<div class="slide-card space-y-2 p-3">
  <h3 class="text-emerald-400 font-bold text-sm">🧪 2. Matching vs Non-Matching</h3>
  <div class="space-y-1 text-slate-300 text-[11px]">
    <div class="text-emerald-400 font-semibold">✅ Matches (200 Stub Served):</div>
    <div>• <code>{"phone": "0812345678"}</code> <span class="text-slate-400 font-sans">(Standard mobile)</span></div>
    <div>• <code>{"user": "Alice", "phone": "0698765432"}</code> <span class="text-slate-400 font-sans">(Extra fields ignored)</span></div>
    <div class="text-rose-400 font-semibold pt-1">❌ Rejects (Falls through to 404):</div>
    <div>• <code>{"phone": "021234567"}</code> <span class="text-slate-400 font-sans">(Landline 02 prefix)</span></div>
    <div>• <code>{"phone": "081234567"}</code> <span class="text-slate-400 font-sans">(Only 9 digits)</span></div>
  </div>
  <p class="text-slate-400 text-[11px] pt-1.5 border-t border-slate-700/50">
    🛡️ <strong>Schema Safe</strong>: Immune to key ordering and whitespace differences unlike raw body regex.
  </p>
</div>

</div>

---
class: pt-1.5 pb-1 px-8
---

# 📥 WireMock — Request Data Extraction & Echoing

<h3 class="text-slate-300 text-xs mb-1">Path Segments, Query Parameters, Headers &amp; JSONPath Payloads</h3>

<div v-pre class="grid grid-cols-[46%_1fr] gap-3 mt-1.5">

<div class="slide-card p-2.5 border border-cyan-500/40 bg-cyan-950/20 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
        <span>🌐</span> Request Model Helpers
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded">Handlebars</span>
    </div>
    <div class="space-y-1.5 text-xs text-slate-200">
      <div>
        <div class="font-semibold text-cyan-300 mb-0.5 text-[11px] flex items-center justify-between">
          <span>🌐 URL Path Segment (0-indexed):</span>
          <span class="text-[9.5px] font-mono text-slate-400">/users/[0-9]+</span>
        </div>
        <div class="font-mono text-[11px] text-cyan-200 bg-slate-950/80 px-2 py-1 rounded border border-cyan-500/30">
          {{request.pathSegments.[3]}}
        </div>
      </div>
      <div>
        <div class="font-semibold text-sky-300 mb-0.5 text-[11px] flex items-center justify-between">
          <span>🔑 In-Flight HTTP Header:</span>
          <span class="text-[9.5px] font-mono text-slate-400">X-Trace-ID</span>
        </div>
        <div class="font-mono text-[11px] text-sky-200 bg-slate-950/80 px-2 py-1 rounded border border-sky-500/30">
          {{request.headers.[X-Trace-ID]}}
        </div>
      </div>
      <div>
        <div class="font-semibold text-amber-300 mb-0.5 text-[11px] flex items-center justify-between">
          <span>📦 JSONPath Request Body:</span>
          <span class="text-[9.5px] font-mono text-slate-400">$.accountId</span>
        </div>
        <div class="font-mono text-[11px] text-amber-200 bg-slate-950/80 px-2 py-1 rounded border border-amber-500/30">
          {{jsonPath request.body '$.accountId'}}
        </div>
      </div>
      <div class="pt-1 flex items-center justify-between text-[10.5px] text-slate-300 border-t border-cyan-500/20">
        <span>🔍 Query: <code class="text-cyan-300 font-mono text-[10px] bg-slate-950/80 px-1 py-0.5 rounded border border-slate-800">{{request.query.q}}</code></span>
        <span>🔒 Encode: <code class="text-cyan-300 font-mono text-[10px] bg-slate-950/80 px-1 py-0.5 rounded border border-slate-800">{{base64 request.body}}</code></span>
      </div>
    </div>
  </div>
  <div class="mt-1.5 pt-1 border-t border-cyan-500/30 text-[10.5px] text-cyan-300 flex items-center justify-between">
    <span>💡 Requires response-template</span>
    <span class="text-[9px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">Transformers</span>
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/60 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>📄</span> Dynamic Echo Mapping Stub
      </span>
      <span class="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">JSON</span>
    </div>
    <div class="bg-slate-950/95 rounded-md p-2 font-mono text-[10.5px] leading-relaxed border border-slate-800 text-slate-300 space-y-0.5 overflow-x-auto">
      <div>{</div>
      <div class="pl-2.5"><span class="text-slate-400">"request"</span>: { <span class="text-slate-400">"method"</span>: <span class="text-emerald-300">"POST"</span>, <span class="text-slate-400">"urlPathPattern"</span>: <span class="text-cyan-300">"/lab/api/users/[0-9]+"</span> },</div>
      <div class="pl-2.5"><span class="text-slate-400">"response"</span>: {</div>
      <div class="pl-5"><span class="text-slate-400">"status"</span>: <span class="text-emerald-400 font-bold">200</span>, <span class="text-slate-400">"transformers"</span>: [<span class="text-cyan-300">"response-template"</span>],</div>
      <div class="pl-5"><span class="text-slate-400">"jsonBody"</span>: {</div>
      <div class="pl-7"><span class="text-slate-400">"userId"</span>: <span class="text-cyan-300">"{{request.pathSegments.[3]}}"</span>,</div>
      <div class="pl-7"><span class="text-slate-400">"traceId"</span>: <span class="text-sky-300">"{{request.headers.[X-Trace-ID]}}"</span>,</div>
      <div class="pl-7"><span class="text-slate-400">"account"</span>: <span class="text-amber-300">"{{jsonPath request.body '$.accountId'}}"</span></div>
      <div class="pl-5">}</div>
      <div class="pl-2.5">}</div>
      <div>}</div>
    </div>
  </div>
  <div class="mt-1.5 pt-1 border-t border-slate-700/60 text-xs text-slate-400 flex items-center justify-between">
    <span>✨ Echoes path parameters, headers &amp; body</span>
    <span class="text-[9px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">Echo Stub</span>
  </div>
</div>

</div>

<div class="slide-card py-1 px-3 flex items-center justify-between text-xs mt-1 border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-[11px] text-slate-200">💡 <strong>Echo Precision:</strong> WireMock exposes the full incoming HTTP request model directly into Handlebars, eliminating hardcoded test IDs.</span>
  <span class="text-[9.5px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">Request Model</span>
</div>

---
class: pt-2 pb-1.5 px-8
---

# 🪄 Handlebars Logic, Math & Dynamic Data

<h3 class="text-slate-300 text-sm mb-1.5">Conditionals, Arithmetic Calculations &amp; Ephemeral Token Generators</h3>

<div v-pre class="grid grid-cols-[42%_1fr] gap-3 mt-1.5">

<div class="slide-card p-3 border border-emerald-500/40 bg-emerald-950/20 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
        <span>🎲</span> Handlebars Helpers
      </span>
      <span class="text-[10px] font-mono text-emerald-300 bg-emerald-900/50 px-2 py-0.5 rounded">Capabilities</span>
    </div>
    <div class="space-y-2 text-xs text-slate-200">
      <div>
        <div class="font-semibold text-emerald-300 mb-0.5 text-xs">🎲 Random UUID &amp; Entropy:</div>
        <div class="font-mono text-[10.5px] text-emerald-200 bg-slate-950/80 px-2 py-1 rounded border border-emerald-500/30">
          {{randomValue type='UUID'}}
        </div>
      </div>
      <div>
        <div class="font-semibold text-amber-300 mb-0.5 text-xs">➗ Arithmetic Math (7% VAT):</div>
        <div class="font-mono text-[10.5px] text-amber-200 bg-slate-950/80 px-2 py-1 rounded border border-amber-500/30">
          {{math (jsonPath request.body '$.price') '*' 1.07}}
        </div>
      </div>
      <div>
        <div class="font-semibold text-cyan-300 mb-0.5 text-xs">⏱️ Current Timestamps:</div>
        <div class="font-mono text-[10.5px] text-cyan-200 bg-slate-950/80 px-2 py-1 rounded border border-cyan-500/30">
          {{now format='yyyy-MM-dd HH:mm:ss'}}
        </div>
      </div>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
    <span>💡 In-memory arithmetic</span>
    <span class="text-[9.5px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">Deterministic</span>
  </div>
</div>

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/60 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-sm flex items-center gap-1.5">
        <span>📄</span> Dynamic Response Stub
      </span>
      <span class="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">JSON</span>
    </div>
    <div class="bg-slate-950/95 rounded-md p-2.5 font-mono text-[10.5px] leading-relaxed border border-slate-800 text-slate-200 space-y-0.5 overflow-x-auto">
      <div>{</div>
      <div class="pl-3"><span class="text-slate-400">"status"</span>: <span class="text-emerald-400 font-bold">201</span>,</div>
      <div class="pl-3"><span class="text-slate-400">"jsonBody"</span>: {</div>
      <div class="pl-6"><span class="text-slate-400">"orderId"</span>: <span class="text-cyan-300">"{{randomValue type='UUID'}}"</span>,</div>
      <div class="pl-6"><span class="text-slate-400">"total"</span>: <span class="text-amber-300 font-semibold">{{math (jsonPath request.body '$.price') '*' 1.07}}</span>,</div>
      <div class="pl-6"><span class="text-slate-400">"createdAt"</span>: <span class="text-cyan-300">"{{now format='yyyy-MM-dd'}}"</span></div>
      <div class="pl-3">},</div>
      <div class="pl-3"><span class="text-slate-400">"transformers"</span>: [<span class="text-cyan-300">"response-template"</span>]</div>
      <div>}</div>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-xs text-slate-300 flex items-center justify-between">
    <span>✨ Computes 7% VAT &amp; stamps fresh UUID</span>
    <span class="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">Response Template</span>
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-2 border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-xs text-slate-200 leading-snug">💡 <strong>Dynamic Synthesis:</strong> Combine Handlebars math calculations with entropy generators to produce unique, collision-free API fixtures on every call.</span>
  <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Handlebars Math</span>
</div>

---
class: pt-2 pb-2 px-8
---

# 🔁 WireMock — Array Iteration & String Modifiers

### Loop Collections with each, Indexing, String Modifiers & Safe Defaults

<div v-pre class="grid grid-cols-2 gap-3 mt-1.5 flex-1">

<div class="slide-card p-3 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
        <span>🔤</span> Array &amp; String Helpers
      </span>
      <span class="text-[11px] font-mono text-cyan-300/80 bg-cyan-900/40 px-2 py-0.5 rounded">Transformers</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong>Array Iteration</strong>: <code>{{#each (jsonPath request.body '$.items')}}</code>.</li>
      <li>• <strong>Position Flags</strong>: <code>{{@index}}</code>, <code>{{@first}}</code>, <code>{{@last}}</code> (comma control).</li>
      <li>• <strong>Array Sizing</strong>: <code>{{size (jsonPath request.body '$.items')}}</code>.</li>
      <li>• <strong>Case &amp; Trim</strong>: <code>{{upper val}}</code>, <code>{{lower val}}</code>, <code>{{trim val}}</code>.</li>
      <li>• <strong>Safe Fallback</strong>: <code>{{jsonPath request.body '$.tier' default='SILVER'}}</code>.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-cyan-500/30 text-xs font-mono text-cyan-300">
    💡 <code>default='...'</code> prevents null crashes on missing client fields.
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/50 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>📄</span> Array Looping Template Stub
      </span>
      <span class="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Handlebars</span>
    </div>

```handlebars
{
  "total": {{size (jsonPath request.body '$.items')}},
  "items": [
    {{#each (jsonPath request.body '$.items')}}
    {
      "index": {{@index}},
      "sku": "{{upper this.sku}}",
      "tier": "{{jsonPath this '$.tier' default='STD'}}"
    }{{#unless @last}},{{/unless}}
    {{/each}}
  ]
}
```

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-xs text-slate-400">
    ✨ Loops array, uppercases SKU, omits trailing comma via <code>@last</code>.
  </div>
</div>

</div>

---
class: pt-2 pb-1 px-8
---

# 📁 File-Based Response Templates (`bodyFileName`)

### Decoupling Large Dynamic JSON/XML Payloads from Mapping Stubs

<div v-pre class="multi-col-grid-2 gap-3 mb-1">

<div class="col-card p-2 space-y-1 bg-slate-900/60 border-slate-700/40">
  <h3 class="text-cyan-400 text-xs font-bold mb-0.5">📑 1. Mapping Stub (<code>mappings/order.json</code>)</h3>
  <div class="bg-slate-950/90 rounded p-1.5 border border-cyan-500/30 font-mono text-[11px] text-cyan-200">
    {<br/>
    &nbsp;&nbsp;"request": { "method": "POST", "urlPath": "/api/orders" },<br/>
    &nbsp;&nbsp;"response": {<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;"status": 201,<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;<strong class="text-amber-300">"bodyFileName": "orders/created.json"</strong>,<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;"transformers": ["response-template"]<br/>
    &nbsp;&nbsp;}<br/>
    }
  </div>
  <p class="text-slate-400 text-[10px] leading-tight mt-auto">
    Mapping file remains clean and concise; delegates body rendering to template.
  </p>
</div>

<div class="col-card p-2 space-y-1 bg-slate-900/60 border-emerald-500/40">
  <h3 class="text-emerald-400 text-xs font-bold mb-0.5">📦 2. Template File (<code>__files/orders/created.json</code>)</h3>
  <div class="bg-slate-950/90 rounded p-1.5 border border-emerald-500/30 font-mono text-[11px] text-emerald-200">
    {<br/>
    &nbsp;&nbsp;"orderId": "{{randomValue type='UUID'}}",<br/>
    &nbsp;&nbsp;"userId": "{{jsonPath request.body '$.userId'}}",<br/>
    &nbsp;&nbsp;"total": {{math (jsonPath request.body '$.price') '*' 1.07}},<br/>
    &nbsp;&nbsp;"createdAt": "{{now timezone='Asia/Bangkok' format='yyyy-MM-dd HH:mm:ss'}}"<br/>
    }
  </div>
  <p class="text-emerald-300/80 text-[10px] leading-tight mt-auto">
    Full Handlebars expressions evaluate dynamically when served from <code>__files/</code>.
  </p>
</div>

</div>

<div v-pre class="slide-card text-xs bg-slate-900/70 border-emerald-500/50 p-1.5 flex items-center gap-2 shadow-lg">
  <span class="text-sm">💡</span>
  <span class="text-slate-200 leading-snug text-xs"><strong>Best Practice for Large Payloads</strong>: Keeps mapping JSONs lightweight and readable while allowing complex 100+ line JSON/XML template files to live under <code>__files/</code>.</span>
</div>

---
class: pt-1.5 pb-1 px-8
---

# ⏱️ WireMock — Fixed Latency & Timeout Testing

<h3 class="text-slate-300 text-xs mb-1">Deterministic Delay &amp; Chunked Dribble Simulation for HTTP Deadlines</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="slide-card p-2.5 border border-amber-500/40 bg-amber-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-0.5 border-b border-amber-500/30">
      <span class="text-amber-300 font-bold text-xs flex items-center gap-1.5">
        <span>⏱️</span> 1. Fixed Response Delay
      </span>
      <span class="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded">fixedDelayMilliseconds</span>
    </div>

<div class="bg-slate-950/80 border border-slate-700/60 rounded px-1.5 py-1 font-mono text-[9px] text-slate-200 leading-tight space-y-0.5 mb-1">
  <div class="text-slate-400">"response": {</div>
  <div class="text-amber-300 pl-2">"fixedDelayMilliseconds": 8000,</div>
  <div class="text-emerald-300 pl-2">"status": 200, "jsonBody": { "status": "DELIVERED" }</div>
  <div class="text-slate-400">}</div>
</div>

<ul class="space-y-0.5 text-xs text-slate-300 leading-snug">
  <li>• <strong>Deadline Testing:</strong> Holds response for 8,000ms to verify client timeout aborts (e.g. 5s context deadline).</li>
  <li>• <strong>Deterministic Assertions:</strong> Guarantees client error handlers (e.g. <code>context deadline exceeded</code>) trigger reliably.</li>
</ul>
  </div>
  <div class="mt-1 pt-0.5 border-t border-amber-500/30 text-[10px] text-amber-300 font-mono">
    ⏳ Proves client timeouts abort without hanging test workers.
  </div>
</div>

<div class="slide-card p-2.5 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-0.5 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
        <span>🌊</span> 2. Chunked Dribble Delay
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded">chunkedDribbleDelay</span>
    </div>

<div class="bg-slate-950/80 border border-slate-700/60 rounded px-1.5 py-1 font-mono text-[9px] text-slate-200 leading-tight space-y-0.5 mb-1">
  <div class="text-slate-400">"response": {</div>
  <div class="text-cyan-300 pl-2">"chunkedDribbleDelay": {</div>
  <div class="text-amber-300 pl-4">"numberOfChunks": 5, "totalDuration": 5000</div>
  <div class="text-cyan-300 pl-2">}</div>
  <div class="text-slate-400">}</div>
</div>

<ul class="space-y-0.5 text-xs text-slate-300 leading-snug">
  <li>• <strong>Slow Streaming:</strong> Divides response body into 5 chunks emitted incrementally over 5,000ms.</li>
  <li>• <strong>Backpressure Testing:</strong> Simulates slow mobile network connections and client read deadline timeouts.</li>
</ul>
  </div>
  <div class="mt-1 pt-0.5 border-t border-cyan-500/30 text-[10px] text-cyan-300 font-mono">
    🌊 Tests socket read deadlines and streaming buffers.
  </div>
</div>

</div>

<div class="slide-card py-1 px-3 flex items-center justify-between text-xs mt-1 border border-amber-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-amber-200 font-medium flex items-center gap-1.5 leading-snug">
    <span>💡</span> <strong>Timeout Engineering:</strong> Validates that client context deadlines (<code>context.WithTimeout</code>) properly abort slow requests before backend connection pools are exhausted.
  </span>
  <span class="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded">Fail Fast</span>
</div>

---
class: pt-1.5 pb-1 px-8
---

# 🎲 WireMock — Random Jitter & Latency Distributions

<h3 class="text-slate-300 text-xs mb-1">Simulating Real-World Asymmetric Network Jitter &amp; Tail Spikes</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="slide-card p-2.5 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-0.5 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
        <span>📈</span> 1. Log-Normal Distribution
      </span>
      <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">Realistic Spikes</span>
    </div>

<div class="bg-slate-950/80 border border-slate-700/60 rounded px-1.5 py-1 font-mono text-[9px] text-slate-200 leading-tight space-y-0.5 mb-1">
  <div class="text-slate-400">"delayDistribution": {</div>
  <div class="text-emerald-400 pl-2">"type": "lognormal",</div>
  <div class="text-amber-300 pl-2">"median": 150, "sigma": 0.5</div>
  <div class="text-slate-400">}</div>
</div>

<ul class="space-y-0.5 text-xs text-slate-300 leading-snug">
  <li>• <strong>Real Traffic Modeling:</strong> Fast median (150ms) with realistic asymmetric 99th-percentile long-tail spikes.</li>
  <li>• <strong>Tail Latency:</strong> <code>sigma</code> governs variance spread—simulates cloud GC pauses and noisy neighbors.</li>
</ul>
  </div>
  <div class="mt-1 pt-0.5 border-t border-emerald-500/30 text-[10px] text-emerald-300 font-mono">
    📊 Best for simulating real-world production network traffic.
  </div>
</div>

<div class="slide-card p-2.5 border border-blue-500/40 bg-blue-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-0.5 border-b border-blue-500/30">
      <span class="text-blue-300 font-bold text-xs flex items-center gap-1.5">
        <span>📊</span> 2. Uniform &amp; Pareto Distributions
      </span>
      <span class="text-[10px] font-mono text-blue-300 bg-blue-950/60 px-1.5 py-0.5 rounded">Jitter Bands</span>
    </div>

<div class="bg-slate-950/80 border border-slate-700/60 rounded px-1.5 py-1 font-mono text-[9px] text-slate-200 leading-tight space-y-0.5 mb-1">
  <div class="text-cyan-300 font-semibold">Uniform (Flat Jitter Band):</div>
  <div class="text-slate-300 pl-1">{"type": "uniform", "lower": 100, "upper": 500}</div>
  <div class="text-violet-300 font-semibold mt-0.5">Pareto (Power-Law Decay):</div>
  <div class="text-slate-300 pl-1">{"type": "pareto", "scale": 100, "alpha": 1.2}</div>
</div>

<ul class="space-y-0.5 text-xs text-slate-300 leading-snug">
  <li>• <strong>Uniform Window:</strong> Equal probability within min/max bounds—great for baseline latency variance.</li>
  <li>• <strong>Pareto Curve:</strong> Heavy-tailed power-law decay—simulates 80/20 rule network congestion.</li>
</ul>
  </div>
  <div class="mt-1 pt-0.5 border-t border-blue-500/30 text-[10px] text-blue-300 font-mono">
    ⚡ Verifies adaptive client retry backoff under network variance.
  </div>
</div>

</div>

<div class="slide-card py-1 px-3 flex items-center justify-between text-xs mt-1 border border-emerald-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-emerald-200 font-medium flex items-center gap-1.5 leading-snug">
    <span>💡</span> <strong>Thundering Herd Defense:</strong> Testing against jitter distributions validates that client retries incorporate randomized jitter to prevent synchronized retry spikes.
  </span>
  <span class="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded">Jittered Backoff</span>
</div>

---
class: pt-1.5 pb-1 px-8
---

# 💥 WireMock — Network Fault Injection (Chaos)

<h3 class="text-slate-300 text-xs mb-1">Simulating Hard Socket Failures, Packet Truncation &amp; Circuit Breaker Tripping</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="slide-card p-2.5 border border-rose-500/40 bg-rose-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-0.5 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-xs flex items-center gap-1.5">
        <span>💥</span> 1. Hard Socket Faults vs HTTP 500
      </span>
      <span class="text-[10px] font-mono text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded">TCP Layer</span>
    </div>

<div class="bg-slate-950/80 border border-slate-700/60 rounded px-1.5 py-1 font-mono text-[9px] text-slate-200 leading-tight space-y-0.5 mb-1">
  <div><span class="text-rose-400 font-semibold">• EMPTY_RESPONSE:</span> TCP closes immediately with 0 bytes</div>
  <div><span class="text-amber-300 font-semibold">• MALFORMED_RESPONSE_CHUNK:</span> Sends corrupt bytes mid-stream</div>
  <div><span class="text-violet-300 font-semibold">• RANDOM_DATA_THEN_CLOSE:</span> Sends garbage bytes and aborts</div>
  <div><span class="text-cyan-300 font-semibold">• CONNECTION_RESET_BY_PEER:</span> Sends abrupt TCP RST frame</div>
</div>

<ul class="space-y-0.5 text-xs text-slate-300 leading-snug">
  <li>• <strong>Beyond HTTP 500:</strong> HTTP 500 is still a valid HTTP response. Socket faults test unhandled EOFs &amp; driver crashes.</li>
  <li>• <strong>Circuit Breakers:</strong> Forces resilience wrappers (e.g. gobreaker) to increment failure counters and trip to <code>OPEN</code>.</li>
</ul>
  </div>
  <div class="mt-1 pt-0.5 border-t border-rose-500/30 text-[10px] text-rose-300 font-mono">
    ⚡ Simulates network card crashes &amp; dropped TCP sockets.
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-0.5 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>📄</span> 2. Declarative Fault Mapping Stub
      </span>
      <span class="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded">JSON Stub</span>
    </div>

<div class="bg-slate-950/80 border border-slate-700/60 rounded px-1.5 py-1 font-mono text-[9px] text-slate-200 leading-tight space-y-0.5 mb-1">
  <div class="text-slate-400">{</div>
  <div class="text-slate-300 pl-2">"request": { "method": "GET", "urlPath": "/api/payments" },</div>
  <div class="text-rose-400 font-bold pl-2">"response": { "fault": "EMPTY_RESPONSE" }</div>
  <div class="text-slate-400">}</div>
</div>

<div class="bg-slate-950/80 border border-slate-700/60 rounded px-1.5 py-1 font-mono text-[9px] text-slate-200 leading-tight space-y-0.5 mb-1">
  <div class="text-amber-300 font-semibold">Client-Side Error Mapping:</div>
  <div>• Go: <code class="text-slate-300">net/http: unexpected EOF / connection reset</code></div>
  <div>• Node/Axios: <code class="text-slate-300">ECONNRESET / socket hang up</code></div>
</div>

<ul class="space-y-0.5 text-xs text-slate-300 leading-snug">
  <li>• <strong>Zero Mock Logic:</strong> WireMock natively terminates socket without spinning up external network proxies.</li>
</ul>
  </div>
  <div class="mt-1 pt-0.5 border-t border-slate-700/60 text-[10px] text-slate-400 font-mono">
    🔍 Asserts client socket-level error handling.
  </div>
</div>

</div>

<div class="slide-card py-1 px-3 flex items-center justify-between text-xs mt-1 border border-rose-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-rose-200 font-medium flex items-center gap-1.5 leading-snug">
    <span>💡</span> <strong>Chaos Target:</strong> Proves that upstream gateway services fail gracefully and trip circuit breakers to <code>OPEN</code> without exhausting worker threads or crashing.
  </span>
  <span class="text-[11px] font-mono text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded">Circuit Breaker OPEN</span>
</div>

---

# 🔄 WireMock — Stateful Scenario Primitives

### Transforming Stateless HTTP Mocks into Finite State Machines (FSM)

<div class="space-y-2.5 mb-2.5">

  <div class="slide-card bg-slate-900/70 border-emerald-500/30 p-2.5 flex items-center justify-between gap-4">
    <div class="w-56 flex-shrink-0">
      <div class="flex items-center gap-2">
        <span class="text-base">🏷️</span>
        <span class="font-mono text-emerald-400 font-bold text-sm">scenarioName</span>
      </div>
      <div class="text-[11px] text-slate-400 pl-6">State Machine Scope</div>
    </div>
    <div class="flex-grow text-xs text-slate-300">
      Groups related stub mappings into an <strong>isolated state machine instance</strong>. Different scenario names never interfere with each other.
    </div>
    <div class="w-80 flex-shrink-0 bg-slate-950/90 rounded border border-slate-700/60 px-3 py-2 font-mono text-xs text-left">
      <span class="text-amber-300">"scenarioName"</span>: <span class="text-emerald-400">"order-lifecycle"</span>
    </div>
  </div>

  <div class="slide-card bg-slate-900/70 border-amber-500/30 p-2.5 flex items-center justify-between gap-4">
    <div class="w-56 flex-shrink-0">
      <div class="flex items-center gap-2">
        <span class="text-base">🚦</span>
        <span class="font-mono text-amber-300 font-bold text-sm">requiredScenarioState</span>
      </div>
      <div class="text-[11px] text-slate-400 pl-6">Precondition Guard</div>
    </div>
    <div class="flex-grow text-xs text-slate-300">
      Stub matches <strong>only</strong> when the scenario is in this state. All state machines start in default initial state <code class="text-amber-300">"Started"</code>.
    </div>
    <div class="w-80 flex-shrink-0 bg-slate-950/90 rounded border border-slate-700/60 px-3 py-2 font-mono text-xs text-left">
      <span class="text-amber-300">"requiredScenarioState"</span>: <span class="text-emerald-400">"Started"</span>
    </div>
  </div>

  <div class="slide-card bg-slate-900/70 border-cyan-500/30 p-2.5 flex items-center justify-between gap-4">
    <div class="w-56 flex-shrink-0">
      <div class="flex items-center gap-2">
        <span class="text-base">🔄</span>
        <span class="font-mono text-cyan-400 font-bold text-sm">newScenarioState</span>
      </div>
      <div class="text-[11px] text-slate-400 pl-6">State Mutation</div>
    </div>
    <div class="flex-grow text-xs text-slate-300">
      Target state to transition into <strong>after</strong> serving this response. If omitted, the scenario remains in its current state.
    </div>
    <div class="w-80 flex-shrink-0 bg-slate-950/90 rounded border border-slate-700/60 px-3 py-2 font-mono text-xs text-left">
      <span class="text-amber-300">"newScenarioState"</span>: <span class="text-emerald-400">"PAID"</span>
    </div>
  </div>

</div>

<div class="slide-card text-xs bg-slate-900/60 p-2.5 border-emerald-500/30 flex items-center gap-3">
  <span class="text-lg">💡</span>
  <span class="text-slate-300">
    <strong>Lifecycle Rule</strong>: WireMock evaluates scenario state <em>after</em> URL and method match. When a transition occurs, subsequent requests immediately see the updated state.
  </span>
</div>

---

# 🔄 WireMock — Scenario Execution Flow

### State-Aware Request Evaluation & Transition Mechanics

<div class="w-full flex justify-center py-2">

```mermaid {scale: 0.85}
flowchart LR
    Req["📨 Incoming HTTP<br/>Request"] --> Check["🔍 Match URL, Method,<br/>Headers, Body?"]
    Check -- Yes --> StateCheck{"🚦 Scenario in<br/>requiredScenarioState?"}
    Check -- No --> Next["⏭️ Evaluate Next Stub<br/>(or 404)"]
    StateCheck -- Yes --> Serve["✅ Serve Configured<br/>HTTP Response"]
    StateCheck -- No --> Next
    Serve --> Trans["🔄 Transition State to<br/>newScenarioState"]

    classDef pass fill:#064e3b,stroke:#34d399,color:#f8fafc,stroke-width:2px;
    classDef fail fill:#450a0a,stroke:#f87171,color:#fca5a5,stroke-width:2px;
    classDef proc fill:#1e293b,stroke:#64748b,color:#f8fafc,stroke-width:2px;

    class Serve,Trans pass;
    class Next fail;
    class Req,Check,StateCheck proc;
```

</div>

<div class="slide-card text-sm mt-2">
  ⚡ <strong>Deterministic Routing</strong>: The exact same HTTP endpoint produces completely different responses based on the caller's historical interaction sequence.
</div>

---
class: pt-1 pb-1 px-8
---

# 🔄 Stateful Pattern 1: Single-Use Tokens & Replays

<h3 class="text-slate-300 text-sm mb-1">OAuth Authorization Code &amp; OTP Replay Attack Prevention</h3>

<div class="compact-stateful-grid">

<div class="slide-card space-y-1 p-2 bg-slate-900/60 border-emerald-500/30">
  <div>
    <h3 class="text-emerald-400 font-bold mb-0.5 text-xs">✅ 1st Call: Exchange Token</h3>
    <p class="text-slate-300 mb-1 text-xs"><code>Started</code> ➔ <code>TOKEN_ISSUED</code>: Consumes auth code and issues token.</p>

```json
{
  "scenarioName": "auth-token-flow",
  "requiredScenarioState": "Started",
  "newScenarioState": "TOKEN_ISSUED",
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/oauth/token"
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "access_token": "jwt_abc123"
    }
  }
}
```
  </div>
  <p class="text-slate-300 text-xs pt-1 border-t border-slate-700/50">🟢 <strong>Returns 200 OK</strong> &amp; transitions state to <code>TOKEN_ISSUED</code></p>
</div>

<div class="slide-card space-y-1 p-2 bg-slate-900/60 border-rose-500/30">
  <div>
    <h3 class="text-rose-400 font-bold mb-0.5 text-xs">🚨 2nd Call: Replay Rejected</h3>
    <p class="text-slate-300 mb-1 text-xs"><code>TOKEN_ISSUED</code>: Replay attempt fails with invalid grant.</p>

```json
{
  "scenarioName": "auth-token-flow",
  "requiredScenarioState": "TOKEN_ISSUED",
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/oauth/token"
  },
  "response": {
    "status": 400,
    "jsonBody": {
      "error": "invalid_grant"
    }
  }
}
```
  </div>
  <p class="text-slate-300 text-xs pt-1 border-t border-slate-700/50">🔴 <strong>Returns 400 Bad Request</strong> (Code already consumed)</p>
</div>

</div>

---
class: pt-1 pb-1 px-8
---

# 🔄 Stateful Pattern 2: Multi-Step Order Lifecycle

<h3 class="text-slate-300 text-sm mb-1">Modeling Sequential Domain State Transitions</h3>

<div class="w-full flex justify-center py-0.5">

```mermaid {scale: 0.85}
flowchart LR
    S([Start]) --> Started["State: Started<br/>(PENDING)"]
    Started -->|POST /orders/101/pay| PAID["State: PAID"]
    PAID -->|POST /orders/101/ship| SHIPPED["State: SHIPPED"]
    SHIPPED -->|POST /orders/101/ship| ERR["⚠️ 400 ALREADY_SHIPPED"]

    classDef default fill:#1e293b,stroke:#34d399,color:#f8fafc,stroke-width:2px;
    classDef err fill:#450a0a,stroke:#f87171,color:#fca5a5,stroke-width:2px;
    class ERR err;
```

</div>

```json
{
  "scenarioName": "order-fulfillment-lifecycle",
  "requiredScenarioState": "PAID",
  "newScenarioState": "SHIPPED",
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/orders/101/ship"
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "status": "ORDER_SHIPPED"
    }
  }
}
```

<div class="slide-card text-xs mt-1 p-1.5">
  📦 Shipping is allowed only after <code>PAID</code>. A duplicate ship attempt triggers a <code>400 Bad Request</code> stub.
</div>

---
class: pt-1 pb-1 px-8
---

# 🔄 Stateful Pattern 3: Transient Failure & Retries

<h3 class="text-slate-300 text-sm mb-1">Testing Client Exponential Backoff &amp; Circuit Breaker Recovery</h3>

<div class="flex items-center justify-center gap-3 py-1 mb-1.5 bg-slate-950/70 border border-slate-700/50 rounded-lg text-xs font-mono">
  <span class="text-rose-400">Attempt 1: Started (💥 503)</span>
  <span class="text-slate-500">➔</span>
  <span class="text-rose-400">Attempt 2: FAIL_1 (💥 503)</span>
  <span class="text-slate-500">➔</span>
  <span class="text-emerald-400 font-bold">Attempt 3: FAIL_2 (✅ 200 OK)</span>
</div>

<div class="compact-stateful-grid">

<div class="slide-card space-y-1 p-2 bg-slate-900/60 border-rose-500/30">
  <h3 class="text-rose-400 font-bold mb-0.5 text-xs">💥 Flapping Failures (Attempts 1 &amp; 2)</h3>
  <p class="text-slate-300 mb-1 text-[11px]"><code>Started</code> ➔ <code>FAIL_1</code> (or <code>FAIL_1</code> ➔ <code>FAIL_2</code>)</p>

```json
{
  "scenarioName": "retry-flow",
  "requiredScenarioState": "Started",
  "newScenarioState": "FAIL_1",
  "request": {
    "method": "GET",
    "urlPath": "/lab/api/flaky"
  },
  "response": {
    "status": 503,
    "jsonBody": { "error": "Flapping" }
  }
}
```
  <p class="text-slate-300 text-xs pt-1 border-t border-slate-700/50">🔴 <strong>Returns 503 Service Unavailable</strong> (Triggering client backoff)</p>
</div>

<div class="slide-card space-y-1 p-2 bg-slate-900/60 border-emerald-500/30">
  <h3 class="text-emerald-400 font-bold mb-0.5 text-xs">✅ Self-Healing Recovery (Attempt 3)</h3>
  <p class="text-slate-300 mb-1 text-xs"><code>FAIL_2</code> ➔ Final Success State</p>

```json
{
  "scenarioName": "retry-flow",
  "requiredScenarioState": "FAIL_2",
  "request": {
    "method": "GET",
    "urlPath": "/lab/api/flaky"
  },
  "response": {
    "status": 200,
    "jsonBody": { "status": "RECOVERED" }
  }
}
```
  <p class="text-slate-300 text-xs pt-1 border-t border-slate-700/50">🟢 <strong>Returns 200 OK</strong> (Client retry successfully verified)</p>
</div>

</div>

---
class: pt-1 pb-1 px-8
---

# 🔄 Stateful Pattern 4: Webhook Idempotency

<h3 class="text-slate-300 text-sm mb-1">At-Least-Once Delivery &amp; Duplicate Message Detection</h3>

<div class="compact-stateful-grid">

<div class="slide-card space-y-1 p-2 bg-slate-900/60 border-emerald-500/30">
  <div>
    <h3 class="text-emerald-400 font-bold mb-0.5 text-xs">📨 1st Delivery: Processed</h3>
    <p class="text-slate-300 mb-1 text-xs"><code>Started</code> ➔ <code>WEBHOOK_PROCESSED</code>: Accepts payment event.</p>

```json
{
  "scenarioName": "webhook-idempotency",
  "requiredScenarioState": "Started",
  "newScenarioState": "WEBHOOK_PROCESSED",
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/payments/pay_123/webhook"
  },
  "response": {
    "status": 202,
    "jsonBody": {
      "status": "ACCEPTED"
    }
  }
}
```
  </div>
  <p class="text-slate-300 text-xs pt-1 border-t border-slate-700/50">🟢 <strong>Returns 202 Accepted</strong> (First-time processing)</p>
</div>

<div class="slide-card space-y-1 p-2 bg-slate-900/60 border-amber-500/30">
  <div>
    <h3 class="text-amber-400 font-bold mb-0.5 text-xs">🛡️ 2nd Delivery: Duplicate</h3>
    <p class="text-slate-300 mb-1 text-xs"><code>WEBHOOK_PROCESSED</code>: Detects duplicate and rejects.</p>

```json
{
  "scenarioName": "webhook-idempotency",
  "requiredScenarioState": "WEBHOOK_PROCESSED",
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/payments/pay_123/webhook"
  },
  "response": {
    "status": 409,
    "jsonBody": {
      "error": "DUPLICATE_EVENT"
    }
  }
}
```
  </div>
  <p class="text-slate-300 text-xs pt-1 border-t border-slate-700/50">🟡 <strong>Returns 409 Conflict</strong> (Idempotent guard)</p>
</div>

</div>

---
class: pt-1 pb-1 px-8
---

# 🪝 WireMock — Asynchronous Webhooks & Callbacks

<h3 class="text-slate-300 text-[11px] mb-0.5">Triggering Outbound HTTP Events with <code>serveEventListeners</code></h3>

<div v-pre class="compact-stateful-grid">

<div class="slide-card space-y-1 p-2 bg-slate-900/60 border-cyan-500/30 flex flex-col justify-between">
  <div>
    <h3 class="text-cyan-400 font-semibold">⚡ Event-Driven Webhook Execution</h3>
    <p class="text-slate-300 mb-1">
      WireMock can act as an active HTTP client. With <code>serveEventListeners</code> and the built-in <code>webhook</code> action, it fires asynchronous HTTP requests back to your webhook receiver after serving a stub.
    </p>
    <div class="space-y-0.5 pt-1 border-t border-slate-700/50">
      <div>
        <strong class="text-emerald-400">🎯 Dynamic Callback URL:</strong>
        <p class="text-slate-300">Extracts <code class="text-emerald-300 font-bold">callbackUrl</code> dynamically from the request body.</p>
      </div>
      <div>
        <strong class="text-amber-400">⏱️ Background Latency:</strong>
        <p class="text-slate-300">Defines <code>delay</code> to simulate real worker queue latency.</p>
      </div>
      <div>
        <strong class="text-purple-400">📨 Dynamic Payload:</strong>
        <p class="text-slate-300">Templates webhook payloads and signatures with Handlebars.</p>
      </div>
    </div>
  </div>
  <p class="text-slate-400 pt-1 border-t border-slate-700/50">
    💡 Enables full testing of async payment gateways and webhook consumers.
  </p>
</div>

<div class="slide-card space-y-1 p-2 bg-slate-900/60 border-indigo-500/30 flex flex-col">
  <div>
    <h3 class="text-indigo-400 font-semibold mb-0.5 text-xs">📝 Stub with <code>serveEventListeners</code></h3>

```json
{
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/payments/async-charge"
  },
  "response": {
    "status": 202,
    "jsonBody": { "status": "PROCESSING", "id": "ch_9901" }
  },
  "serveEventListeners": [{
    "name": "webhook",
    "parameters": {
      "method": "POST",
      "url": "{{jsonPath request.body '$.callbackUrl'}}",
      "headers": { "Content-Type": "application/json" },
      "body": "{\"id\": \"ch_9901\", \"status\": \"SETTLED\"}",
      "delay": { "type": "fixed", "milliseconds": 1000 }
    }
  }]
}
```
  </div>
</div>

</div>

---
class: pt-2 pb-2 px-8
---

# ⚠️ WireMock — The State Bleed Problem

### Why In-Memory Finite State Machines Cause Flaky CI Failures

<div class="grid grid-cols-2 gap-3.5 mb-2.5">

  <div class="slide-card bg-slate-900/70 border-rose-500/40 p-3.5 flex flex-col justify-between">
    <div>
      <div class="flex items-center gap-2 mb-2 pb-1.5 border-b border-rose-500/30">
        <span class="text-base">💥</span>
        <span class="text-rose-400 font-bold text-sm">Sequential Execution Hazard</span>
      </div>
      <p class="text-xs text-slate-300 leading-relaxed mb-2.5">
        WireMock scenario state machines are stored in <strong>JVM container memory</strong>. State transitions persist across completely separate test files:
      </p>
      <div class="space-y-1.5 text-xs text-slate-300 font-mono">
        <div class="bg-slate-950/80 p-2 rounded border border-slate-800">
          <span class="text-emerald-400">Test 1 (Checkout)</span>: mutates state<br/>
          &nbsp;&nbsp;<code class="text-amber-300">Started</code> ➔ <code class="text-rose-400">ORDER_COMPLETED</code>
        </div>
        <div class="bg-slate-950/80 p-2 rounded border border-slate-800">
          <span class="text-rose-400">Test 2 (New Order)</span>: expects <code class="text-amber-300">Started</code><br/>
          &nbsp;&nbsp;Hits <code class="text-rose-400">ORDER_COMPLETED</code> ➔ 💥 <strong>404 Not Found</strong>
        </div>
      </div>
    </div>
    <div class="mt-2 pt-1.5 border-t border-slate-700/50 text-xs text-rose-300/80">
      ❌ Test 2 passes in isolation, but fails when run in CI test batches!
    </div>
  </div>

  <div class="slide-card bg-slate-900/70 border-amber-500/40 p-3.5 flex flex-col justify-between">
    <div>
      <div class="flex items-center gap-2 mb-2 pb-1.5 border-b border-amber-500/30">
        <span class="text-base">🔍</span>
        <span class="text-amber-300 font-bold text-sm">Root Cause Analysis</span>
      </div>
      <p class="text-xs text-slate-300 leading-relaxed mb-2.5">
        Stateless stubs match solely on request URL and payload. Stateful stubs introduce <strong>shared mutable state</strong>:
      </p>
      <div class="space-y-2 text-xs text-slate-300">
        <div class="flex items-start gap-2">
          <span class="text-amber-300 text-sm">🧠</span>
          <div>
            <strong class="text-slate-200">In-Memory Persistence:</strong> WireMock retains state indefinitely until explicitly instructed to reset.
          </div>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-amber-300 text-sm">🎲</span>
          <div>
            <strong class="text-slate-200">Execution Order Coupling:</strong> Test execution order determines pass or fail, leading to non-deterministic flakiness.
          </div>
        </div>
        <div class="flex items-start gap-2">
          <span class="text-amber-300 text-sm">🧪</span>
          <div>
            <strong class="text-slate-200">Cascading Failures:</strong> One failing test leaves dirty state, poisoning every subsequent test in the suite.
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2 pt-1.5 border-t border-slate-700/50 text-xs text-amber-300/80">
      ⚠️ Hermetic testing requires an explicit reset mechanism between tests.
    </div>
  </div>

</div>

<div class="slide-card text-xs bg-slate-900/60 p-2.5 border-emerald-500/30 flex items-center gap-3">
  <span class="text-lg">💡</span>
  <span class="text-slate-300">
    <strong>The Golden Rule of Integration Testing</strong>: Tests must be <em>order-independent</em> and <em>self-contained</em>. Never rely on the state left behind by a previous test.
  </span>
</div>

---
class: pt-2 pb-1 px-8
---

# 🧹 WireMock — Automated Scenario Reset Hook

<h3 class="text-slate-300 text-sm mb-1.5">Hermetic Test Isolation with <span class="font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded text-xs font-bold">POST /__admin/scenarios/reset</span></h3>

<div class="grid grid-cols-[44%_1fr] gap-3 mb-2">

<div class="slide-card p-2.5 border border-emerald-500/40 bg-emerald-950/20 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
        <span>🔄</span> Global Reset Mechanics
      </span>
      <span class="text-[10px] font-mono text-emerald-300 bg-emerald-900/50 px-2 py-0.5 rounded">Rewind All</span>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li class="flex items-start gap-2">
        <span class="text-emerald-400 font-bold">•</span>
        <span><strong class="text-emerald-300">Ultra-Fast Execution:</strong> Takes <code class="text-emerald-300 font-mono text-[11px]">&lt; 5ms</code> over HTTP. Zero restart overhead.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-emerald-400 font-bold">•</span>
        <span><strong class="text-emerald-300">Rewinds All Scenarios:</strong> Every scenario transitions back to <span class="font-mono text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded text-[11px]">"Started"</span> simultaneously.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-emerald-400 font-bold">•</span>
        <span><strong class="text-slate-200">Preserves Stubs:</strong> Only in-memory state resets. Stubs, templates, and fault delays stay cached.</span>
      </li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-emerald-500/30 text-[10.5px] font-mono text-emerald-300 flex items-center justify-between">
    <span>POST /__admin/scenarios/reset</span>
    <span class="text-[9.5px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">:8088</span>
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/60 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>🎭</span> Playwright Global Teardown Hook
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded">TypeScript</span>
    </div>
    <p class="text-xs text-slate-300 mb-1">
      Configure <code class="text-cyan-300 font-mono text-[11px]">test.afterEach()</code> to rewind state after every single test:
    </p>
    <div class="bg-slate-950/90 rounded-md p-2 font-mono text-[10px] leading-snug border border-slate-800 text-slate-300 space-y-0.5 overflow-x-auto">
      <div><span class="text-purple-400">import</span> { test } <span class="text-purple-400">from</span> <span class="text-emerald-300">'@playwright/test'</span>;</div>
      <div>test.<span class="text-yellow-300">afterEach</span>(<span class="text-purple-400">async</span> ({ request }) =&gt; {</div>
      <div class="pl-2.5 text-slate-500">// Rewind all WireMock scenarios to 'Started'</div>
      <div class="pl-2.5"><span class="text-purple-400">await</span> request.<span class="text-yellow-300">post</span>(</div>
      <div class="pl-5"><span class="text-emerald-300">'http://localhost:8088/__admin/scenarios/reset'</span></div>
      <div class="pl-2.5">);</div>
      <div>});</div>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center justify-between">
    <span>💡 Runs in <code>afterEach</code> even if test assertions fail</span>
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-xs text-slate-200">✨ <strong>Guaranteed Hermeticity:</strong> In sequential suites, resetting in <code>afterEach</code> ensures every test receives a clean, deterministic WireMock environment.</span>
  <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded whitespace-nowrap ml-2">Sequential Hermetic</span>
</div>

---
class: pt-2 pb-1 px-8
---

# 🎯 WireMock — Targeted Per-Scenario Teardown

<h3 class="text-slate-300 text-sm mb-1.5">Avoiding Cross-Spec Collisions with <span class="font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-2 py-0.5 rounded text-xs font-bold">PUT /__admin/scenarios/:name/state</span></h3>

<div class="grid grid-cols-[42%_1fr] gap-3 mb-2">

<div class="slide-card p-2.5 border border-cyan-500/40 bg-cyan-950/20 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
        <span>⚠️</span> The Parallel Execution Hazard
      </span>
      <span class="text-[10px] font-mono text-rose-300 bg-rose-900/50 px-2 py-0.5 rounded">Concurrency</span>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li class="flex items-start gap-2">
        <span class="text-rose-400 font-bold">•</span>
        <span><strong class="text-rose-300">Global Reset Hazard:</strong> <code class="text-rose-300 font-mono text-[10.5px]">POST /reset</code> clears <em>everything</em> globally, wiping active states of sibling concurrent specs.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-cyan-400 font-bold">•</span>
        <span><strong class="text-cyan-300">Surgical Teardown:</strong> Rewind <em>only</em> the scenario touched by this spec back to <span class="font-mono text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded text-[11px]">"Started"</span>.</span>
      </li>
      <li class="flex items-start gap-2">
        <span class="text-cyan-400 font-bold">•</span>
        <span><strong class="text-slate-200">Shared Mock Safe:</strong> Parallel tests executing against other scenarios remain completely unaffected.</span>
      </li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-cyan-500/30 text-[10.5px] font-mono text-cyan-200 flex items-center justify-between">
    <span>PUT /__admin/scenarios/<span class="text-cyan-400">{name}</span>/state</span>
    <span class="text-[9.5px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">:8088</span>
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/60 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>🎭</span> Targeted Teardown Implementation
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded">TypeScript</span>
    </div>
    <p class="text-xs text-slate-300 mb-1">
      Reset <em>only</em> the scenario used in this test file to avoid race conditions:
    </p>
    <div class="bg-slate-950/90 rounded-md p-2 font-mono text-[10px] leading-snug border border-slate-800 text-slate-300 space-y-0.5 overflow-x-auto">
      <div><span class="text-purple-400">import</span> { test } <span class="text-purple-400">from</span> <span class="text-emerald-300">'@playwright/test'</span>;</div>
      <div>test.<span class="text-yellow-300">afterEach</span>(<span class="text-purple-400">async</span> ({ request }) =&gt; {</div>
      <div class="pl-2.5 text-slate-500">// Rewind ONLY 'order-flow' back to 'Started'</div>
      <div class="pl-2.5"><span class="text-purple-400">await</span> request.<span class="text-yellow-300">put</span>(</div>
      <div class="pl-5"><span class="text-emerald-300">'http://localhost:8088/__admin/scenarios/order-flow/state'</span>,</div>
      <div class="pl-5">{ <span class="text-slate-400">data:</span> { <span class="text-slate-400">state:</span> <span class="text-amber-300">'Started'</span> } }</div>
      <div class="pl-2.5">);</div>
      <div>});</div>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center justify-between">
    <span>💡 Resets state to 'Started' without touching sibling scenarios</span>
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-xs text-slate-200">🛡️ <strong>Production Rule:</strong> Use targeted teardown when sharing a WireMock instance; use Testcontainers (Pillar 3) for 100% ephemeral isolation per worker.</span>
  <span class="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded whitespace-nowrap ml-2">Parallel Safe</span>
</div>

---
class: pt-2 pb-2 px-8
---

# ⚡ WireMock — Scenario Seeding & Inspection

### Fast-Forwarding Preconditions and Introspecting Live FSM States

<div class="grid grid-cols-2 gap-3.5 mt-2">

  <div class="slide-card bg-slate-900/70 border-amber-500/30 p-3 flex flex-col justify-between">
    <div>
      <div class="flex items-center gap-2 mb-1.5 pb-1 border-b border-amber-500/30">
        <span class="text-base">⚡</span>
        <span class="text-amber-300 font-bold text-sm">Target State Fast-Forward</span>
      </div>
      <p class="text-xs text-slate-300 leading-relaxed mb-1.5">
        Force a scenario directly into any state using:<br/><code class="text-amber-300">PUT /__admin/scenarios/:name/state</code>
      </p>
      <div class="space-y-1.5 text-xs text-slate-300">
        <div>
          <strong class="text-amber-300">🎯 Precondition Seeding:</strong>
          <p class="text-slate-400">Skip prerequisite API calls (e.g., test refund directly from <code class="text-amber-300">"PAID"</code>).</p>
        </div>
        <div>
          <strong class="text-emerald-400">⚡ Execution Speed:</strong>
          <p class="text-slate-400">Turns a 5-step checkout setup into a single 5ms admin API call.</p>
        </div>
      </div>
    </div>
    <div class="mt-2.5 pt-1.5 border-t border-slate-700/60 font-mono text-xs">
      <div class="text-slate-500 mb-0.5">// Fast-forward in beforeEach hook:</div>
      <div class="bg-slate-950/80 rounded p-1.5 border border-slate-800 text-[11px] leading-relaxed">
        <span class="text-cyan-400">await</span> request.<span class="text-yellow-300">put</span>(<br/>
        &nbsp;&nbsp;<span class="text-emerald-300">'/__admin/scenarios/order/state'</span>,<br/>
        &nbsp;&nbsp;{ <span class="text-slate-400">data:</span> { <span class="text-slate-400">state:</span> <span class="text-emerald-300">'PAID'</span> } }<br/>
        );
      </div>
    </div>
  </div>

  <div class="slide-card bg-slate-900/70 border-cyan-500/30 p-3 flex flex-col justify-between">
    <div>
      <div class="flex items-center gap-2 mb-1.5 pb-1 border-b border-cyan-500/30">
        <span class="text-base">🔍</span>
        <span class="font-mono text-cyan-400 font-bold text-sm">Active State Introspection</span>
      </div>
      <p class="text-xs text-slate-300 leading-relaxed mb-1.5">
        Query live FSM snapshot for all scenarios using:<br/><code class="text-cyan-300">GET /__admin/scenarios</code>
      </p>
      <div class="space-y-1.5 text-xs text-slate-300">
        <div>
          <strong class="text-cyan-300">🔬 Assertion Verification:</strong>
          <p class="text-slate-400">Assert in tests that an API workflow actually triggered expected state transitions.</p>
        </div>
        <div>
          <strong class="text-purple-300">🛠️ CI Failure Diagnostics:</strong>
          <p class="text-slate-400">Query states via cURL when triaging unexpected stub mismatches or 404s.</p>
        </div>
      </div>
    </div>
    <div class="mt-2.5 pt-1.5 border-t border-slate-700/60 font-mono text-xs">
      <div class="text-slate-500 mb-0.5"># Inspect scenario state via CLI:</div>
      <div class="bg-slate-950/80 rounded p-1.5 border border-slate-800 text-[11px] leading-relaxed">
        <span class="text-cyan-400">curl</span> <span class="text-slate-400">-s</span> http://localhost:8088/__admin/scenarios \<br/>
        &nbsp;&nbsp;| <span class="text-yellow-300">jq</span> <span class="text-emerald-300">'.scenarios[] | {name, state}'</span>
      </div>
    </div>
  </div>

</div>

---
layout: section
---

# 🎬 Live Demo
## WireMock in Action — Virtualization & Scenario Steering

<p class="section-narrative">
  Instructor walkthrough: Precision contract matching, dynamic response templating, chaos latency injection, and stateful scenario state machines in real time.
</p>

---
layout: section
---

# 🏆 Hands-On Workshops
## Production Challenge Missions & Controlled Chaos

<p class="section-narrative">
  Put theory into practice: Author stateful scenarios, build resilient stubs under vendor failure, and tamper with live financial transactions in controlled chaos.
</p>

---
class: pt-2 pb-1 px-8
---

# 🧪 Practice Lab: Precision Matching — Baseline

<h3 class="text-slate-300 text-sm mb-2">Step 1: Verify High-Value JSONPath Filter (&gt; 1000) in WireMock</h3>

<div class="grid grid-cols-2 gap-3 mb-2.5">

<div class="slide-card p-3 border border-emerald-500/40 bg-emerald-950/20 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
        <span>📤</span> Request Dispatch
      </span>
      <span class="text-[10px] font-mono text-emerald-300 bg-emerald-900/50 px-2 py-0.5 rounded">POST :8088</span>
    </div>
    <p class="text-xs text-slate-300 mb-1.5 leading-snug">Send amount <code>2500</code> to satisfy the threshold filter:</p>

```bash
curl -s -X POST \
  http://localhost:8088/lab/api/stateless/payments \
  -H "Content-Type: application/json" \
  -d '{"payment":{"amount":2500}}'
```

  </div>
  <div class="mt-2.5 pt-1.5 border-t border-emerald-500/30">
    <div class="flex items-center justify-between text-xs mb-1">
      <span class="font-semibold text-emerald-300 flex items-center gap-1 text-[11px]">
        <span>📥</span> Expected Response:
      </span>
      <span class="font-mono text-[10px] text-emerald-300 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-500/40 font-bold">HTTP 201 Created</span>
    </div>
    <div class="bg-slate-950/90 rounded px-2.5 py-1.5 font-mono text-[11px] text-emerald-200 border border-emerald-500/30">
      { <span class="text-slate-400">"status"</span>: <span class="text-emerald-300">"APPROVED"</span>, <span class="text-slate-400">"flag"</span>: <span class="text-amber-300">"HIGH_VALUE_TRANSACTION"</span> }
    </div>
  </div>
</div>

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/60 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-700/60">
      <span class="text-slate-200 font-bold text-xs flex items-center gap-1.5">
        <span>⚙️</span> WireMock JSONPath Rule
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded">Priority 1</span>
    </div>
    <p class="text-xs text-slate-300 mb-1.5 leading-snug">Stub intercepts payload using precision JSONPath filter:</p>

```json
{
  "matchesJsonPath": "$.payment[?(@.amount > 1000)]"
}
```

  </div>
  <div class="mt-2.5 pt-1.5 border-t border-slate-700/60">
    <div class="flex items-center justify-between text-xs mb-1">
      <span class="font-semibold text-slate-200 flex items-center gap-1 text-[11px]">
        <span>🎯</span> Rule Verdict:
      </span>
      <span class="font-mono text-[10px] text-emerald-400 bg-emerald-950/90 px-1.5 py-0.5 rounded border border-emerald-500/40 font-bold">MATCH SUCCESS</span>
    </div>
    <div class="bg-slate-950/90 rounded px-2.5 py-1.5 font-mono text-[11px] text-emerald-200 border border-slate-700/60">
      <span class="text-slate-400">2500 &gt; 1000</span>: <span class="text-emerald-300 font-bold">TRUE</span> ➔ Routes to <span class="text-cyan-300">02-json-body-matching</span>
    </div>
  </div>
</div>

</div>

<div v-pre class="slide-card py-1.5 px-3 text-xs border border-emerald-500/30 bg-slate-900/70 rounded-lg space-y-1">
  <div class="text-cyan-200 leading-snug">
    <strong>📦 Container technology:</strong> Packages WireMock with its dependencies in an isolated runtime; Docker maps its port <code>8080</code> to <code>localhost:8088</code> for this lab.
  </div>
  <div class="text-emerald-200 leading-snug">
    <strong>🌐 Web UI Verification:</strong> Open <code class="text-emerald-300 font-mono text-[11px]">http://localhost:8088/__admin/webapp</code> ➔ Inspect <strong>Matched Stubs</strong> tab.
  </div>
</div>

<!--
Presenter Notes:
- Guide participants to open WireMock Web UI at localhost:8088/__admin/webapp.
- Show how the incoming 2500 request matches the JSONPath expression.
-->

---
class: pt-2 pb-1 px-8
---

# 🧪 Practice Lab: Precision Matching — Challenge

<h3 class="text-slate-300 text-sm mb-2">Step 2: Participant Challenge — Trigger Threshold Rejection (&lt;= 1000)</h3>

<div class="grid grid-cols-2 gap-3 mb-2.5">

<div class="slide-card p-3 border border-rose-500/40 bg-rose-950/20 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-xs flex items-center gap-1.5">
        <span>🎯</span> Participant Challenge
      </span>
      <span class="text-[10px] font-mono text-rose-300 bg-rose-900/50 px-2 py-0.5 rounded">POST :8088</span>
    </div>
    <p class="text-xs text-slate-300 mb-1.5 leading-snug">Change amount to <code>500</code> (violates threshold, triggers rejection):</p>

```bash
curl -s -X POST \
  http://localhost:8088/lab/api/stateless/payments \
  -H "Content-Type: application/json" \
  -d '{"payment":{"amount":500}}'
```

  </div>
  <div class="mt-2.5 pt-1.5 border-t border-rose-500/30">
    <div class="flex items-center justify-between text-xs mb-1">
      <span class="font-semibold text-rose-300 flex items-center gap-1 text-[11px]">
        <span>📥</span> Expected Response:
      </span>
      <span class="font-mono text-[10px] text-rose-300 bg-rose-950/90 px-1.5 py-0.5 rounded border border-rose-500/40 font-bold">HTTP 400 Bad Request</span>
    </div>
    <div class="bg-slate-950/90 rounded px-2.5 py-1.5 font-mono text-[11px] text-rose-200 border border-rose-500/30">
      { <span class="text-slate-400">"error"</span>: <span class="text-rose-300">"BAD_REQUEST"</span>, <span class="text-slate-400">"message"</span>: <span class="text-slate-300">"Payment amount must be &gt; 1000"</span> }
    </div>
  </div>
</div>

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/60 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-700/60">
      <span class="text-slate-200 font-bold text-xs flex items-center gap-1.5">
        <span>🛡️</span> Validation Rejection Rule
      </span>
      <span class="text-[10px] font-mono text-amber-300 bg-amber-900/50 px-2 py-0.5 rounded">Priority 1</span>
    </div>
    <p class="text-xs text-slate-300 mb-1.5 leading-snug">Negative condition stub rejects requests that fail threshold:</p>

```json
{
  "matchesJsonPath": "$.payment[?(@.amount <= 1000)]"
}
```

  </div>
  <div class="mt-2.5 pt-1.5 border-t border-slate-700/60">
    <div class="flex items-center justify-between text-xs mb-1">
      <span class="font-semibold text-slate-200 flex items-center gap-1 text-[11px]">
        <span>🎯</span> Rule Verdict:
      </span>
      <span class="font-mono text-[10px] text-rose-400 bg-rose-950/90 px-1.5 py-0.5 rounded border border-rose-500/40 font-bold">REJECTION TRIGGERED</span>
    </div>
    <div class="bg-slate-950/90 rounded px-2.5 py-1.5 font-mono text-[11px] text-rose-200 border border-slate-700/60">
      <span class="text-slate-400">500 &lt;= 1000</span>: <span class="text-rose-300 font-bold">TRUE</span> ➔ Routes to <span class="text-amber-300">02b-payments-low-value</span>
    </div>
  </div>
</div>

</div>

<div v-pre class="slide-card py-2 px-3 flex items-center justify-between text-xs border border-rose-500/30 bg-slate-900/70 rounded-lg">
  <span class="text-rose-200 text-xs flex items-center gap-2">
    <span class="text-base">🔍</span> <strong>Web UI Inspection:</strong> Open <code class="text-rose-300 font-mono text-[11px]">http://localhost:8088/__admin/webapp</code> ➔ Inspect <strong>Requests</strong> tab to verify rule logs.
  </span>
  <span class="text-[10px] font-mono text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded whitespace-nowrap ml-2">Requests Tab</span>
</div>

<!--
Presenter Notes:
- Guide participants to send amount: 500 in their terminal.
- Have them open the Requests tab to observe how WireMock routed the call to the 400 rejection stub.
-->

---
class: pt-2 pb-2 px-8
---

# 🧪 Practice Lab: Dynamic Templating & Chaos Latency

### Validate Dynamic Math Calculations & Chaos Latency Timeout Handling

<div class="grid grid-cols-2 gap-3 mt-1.5 flex-1">

<div class="slide-card p-3 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-sm flex items-center gap-1.5">
        <span>🧮</span> Step 1: Dynamic Math &amp; VAT
      </span>
      <span class="text-[11px] font-mono text-emerald-300/80 bg-emerald-900/40 px-2 py-0.5 rounded">:8088 Stub</span>
    </div>
    <p class="text-xs text-slate-300 mb-1 leading-snug">Dispatches price 4000; WireMock calculates 7% VAT (4280.0) + UUID:</p>

```bash
curl -s -X POST \
  http://localhost:8088/lab/api/stateless/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":"U-100","price":4000}'
```

  </div>
  <div class="mt-2 pt-1 border-t border-emerald-500/30 text-xs font-mono text-emerald-300">
    ✨ Returns <code>total: 4280.0</code> and unique <code>orderId</code> UUID.
  </div>
</div>

<div class="slide-card p-3 border border-rose-500/40 bg-rose-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-sm flex items-center gap-1.5">
        <span>⏱️</span> Step 2: Chaos Latency Timeout
      </span>
      <span class="text-[11px] font-mono text-rose-300/80 bg-rose-900/40 px-2 py-0.5 rounded">Resilience</span>
    </div>
    <p class="text-xs text-slate-300 mb-1 leading-snug">WireMock delays 8000ms; verify client cancels at 2s timeout:</p>

```bash
time curl -s --max-time 2 \
  http://localhost:8088/lab/api/stateless/delayed
```

  </div>
  <div class="mt-2 pt-1 border-t border-rose-500/30 text-xs font-mono text-rose-300">
    🚨 Exits code 28 after 2s without thread starvation!
  </div>
</div>

</div>

<div v-pre class="slide-card py-1.5 px-3 flex items-center text-xs mt-2 border border-emerald-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-emerald-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Hands-On Verification:</strong> Inspect live responses in terminal or visit <code>http://localhost:8088/__admin/webapp</code> to see matched requests.
  </span>
</div>

---
class: pt-2 pb-1.5 px-8
---

# 🏆 Workshop: Biometric Face Scan Stub

<h3 class="text-slate-300 text-sm mb-1.5">Author a self-service biometric verification stub with liveness confidence thresholding</h3>

<div class="grid grid-cols-2 gap-3.5 mt-1 flex-1">

<div class="slide-card p-3 border border-fuchsia-500/40 bg-fuchsia-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-fuchsia-500/30">
      <span class="text-fuchsia-400 font-bold text-sm flex items-center gap-1.5">
        <span>🎯</span> Workshop Challenge Rules
      </span>
      <span class="text-[11px] font-mono text-fuchsia-300/80 bg-fuchsia-900/40 px-2 py-0.5 rounded"><code>POST /lab/api/ekyc/biometrics</code></span>
    </div>
    <ul class="space-y-2 text-xs text-slate-300 leading-snug">
      <li>• <strong>Low Confidence (&lt; 85.0):</strong> Return <code>422 Unprocessable</code> with body <code>{"error": "LIVENESS_FAILED"}</code>.</li>
      <li>• <strong>High Confidence (&ge; 85.0):</strong> Return <code>200 OK</code> with dynamic UUID <code>scanId</code>, echoed <code>nationalId</code>, and timestamp.</li>
      <li>• <strong>Chaos Latency:</strong> Inject <code>2500ms</code> delay to test client timeout cancellation.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-fuchsia-500/30 text-[11px] font-mono text-fuchsia-300 flex items-center gap-1">
    <span>📂</span> Save file to: <code class="text-[10px]">wiremock/mappings/diy-biometrics.json</code>
  </div>
</div>

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-sm flex items-center gap-1.5">
        <span>⚡</span> Verification Commands
      </span>
      <span class="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Terminal</span>
    </div>

<div class="bg-slate-950/90 border border-slate-800 rounded p-2 font-mono text-[10.5px] text-slate-200 space-y-1.5">
  <div>
    <div class="text-slate-500 text-[9.5px]"># 1. Low Confidence (&lt; 85.0) ➔ Expect HTTP 422</div>
    <div class="text-rose-300">curl -s -X POST http://localhost:8088/lab/api/ekyc/biometrics \</div>
    <div class="text-rose-300 pl-3">-d '{"nationalId":"11005","confidence":71.2}'</div>
  </div>
  <div>
    <div class="text-slate-500 text-[9.5px]"># 2. High Confidence (&ge; 85.0) ➔ Expect HTTP 200 + UUID</div>
    <div class="text-emerald-300">curl -s -X POST http://localhost:8088/lab/api/ekyc/biometrics \</div>
    <div class="text-emerald-300 pl-3">-d '{"nationalId":"11005","confidence":92.4}'</div>
  </div>
</div>

  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-xs font-mono text-slate-300">
    ✨ Reload stubs: <code>POST /__admin/mappings/reset</code>
  </div>
</div>

</div>

<div class="slide-card py-2 px-3 flex items-center justify-between text-xs mt-2 border border-fuchsia-500/30 bg-slate-900/70 rounded-lg">
  <div class="text-fuchsia-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Stateless Challenge:</strong> Build a high-precision contract stub with thresholding logic and Handlebars templating in under 15 minutes.</span>
  </div>
  <span class="text-[11px] font-mono text-fuchsia-300 bg-fuchsia-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">15 Min Hands-On</span>
</div>

<!--
Presenter Notes:
- Give attendees 15 minutes to implement the stub in wiremock/mappings/diy-biometrics.json.
- Solution reference is available in labs/wiremock-stateless/diy-biometrics.http.
-->

---
class: pt-2 pb-1 px-8
---

# 🏆 Workshop: Patient Medical Checkup Machine

<h3 class="text-slate-300 text-sm mb-1">Author a stateful clinical workflow FSM from sample collection to sealed diagnosis</h3>

<div class="grid grid-cols-2 gap-3 mb-1">

<div class="slide-card p-2 border border-emerald-500/40 bg-emerald-950/20 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
        <span>🏥</span> Clinical Workflow Rules
      </span>
      <span class="text-[10px] font-mono text-emerald-300/90 bg-emerald-900/40 px-2 py-0.5 rounded"><code>medical-checkup-flow</code></span>
    </div>
    <ul class="space-y-0.5 text-xs text-slate-300 leading-snug">
      <li>• <strong>Step 1 (Started):</strong> <code>POST .../start</code> in <code>Started</code> ➔ <code>SAMPLE_COLLECTED</code> (<code>201 Created</code>).</li>
      <li>• <strong>Step 2 (Diagnose):</strong> <code>POST .../diagnose</code> in <code>SAMPLE_COLLECTED</code> ➔ <code>DIAGNOSED</code> (<code>200 OK</code>).</li>
      <li>• <strong>Step 3 (Sealed Lock):</strong> Duplicate <code>POST</code> in <code>DIAGNOSED</code> ➔ <code>409 Conflict {"error": "RECORD_SEALED"}</code>.</li>
      <li>• <strong>Step 4 (Targeted Teardown):</strong> <code>PUT .../medical-checkup-flow/state</code> resets <em>only</em> this FSM back to <code>Started</code>.</li>
    </ul>
  </div>
  <div class="mt-1 pt-1 border-t border-emerald-500/30 text-[10px] font-mono text-emerald-300 flex items-center gap-1">
    <span>📂</span> Stubs: <code class="text-[9px]">wiremock/mappings/lab-stateful/05-medical-checkup.json</code>
  </div>
</div>

<div class="slide-card p-2 border border-slate-700/60 bg-slate-900/60 rounded-lg flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>⚡</span> Verification Sequence
      </span>
      <span class="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Terminal / FSM</span>
    </div>

<div class="bg-slate-950/90 border border-slate-800 rounded p-1 font-mono text-[9px] text-slate-200 space-y-0.5">
  <div>
    <div class="text-slate-500 text-[8.5px]"># 1. Start checkup ➔ 201 Created &amp; state ➔ SAMPLE_COLLECTED</div>
    <div class="text-sky-300">curl -s -X POST http://localhost:8088/lab/api/medical/checkup/start</div>
  </div>
  <div>
    <div class="text-slate-500 text-[8.5px]"># 2. Complete diagnosis ➔ 200 OK &amp; state ➔ DIAGNOSED</div>
    <div class="text-emerald-300">curl -s -X POST http://localhost:8088/lab/api/medical/checkup/diagnose</div>
  </div>
  <div>
    <div class="text-slate-500 text-[8.5px]"># 3. Alter sealed record ➔ Expect HTTP 409 RECORD_SEALED</div>
    <div class="text-rose-300">curl -s -X POST http://localhost:8088/lab/api/medical/checkup/diagnose</div>
  </div>
  <div>
    <div class="text-slate-500 text-[8.5px]"># 4. Rewind ONLY this scenario to Started (isolated reset)</div>
    <div class="text-amber-300 truncate">curl -s -X PUT http://localhost:8088/__admin/scenarios/medical-checkup-flow/state \</div>
    <div class="text-slate-400 pl-2 text-[8.5px]">-H "Content-Type: application/json" -d '{"state":"Started"}'</div>
  </div>
</div>

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-[9.5px] font-mono text-cyan-300 flex items-center justify-between">
    <span>🎯 Targeted Teardown:</span>
    <code class="text-[8.5px] text-slate-300 bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800">PUT /scenarios/medical-checkup-flow/state</code>
  </div>
</div>

</div>

<div class="slide-card py-1 px-3 flex items-center justify-between text-xs border border-emerald-500/30 bg-slate-900/70 rounded-lg">
  <div class="text-emerald-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Challenge Objective:</strong> Model healthcare data governance with <code>scenarioName</code>, <code>requiredScenarioState</code>, and <code>newScenarioState</code> to prevent tampering with finalized medical diagnoses.</span>
  </div>
  <span class="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">15 Min Hands-On</span>
</div>

<!--
Presenter Notes:
- Guide attendees to implement or inspect clinical checkup stateful scenario stubs.
- Show how the scenario advances: Started ➔ SAMPLE_COLLECTED ➔ DIAGNOSED.
- Highlight how WireMock returns 409 Conflict once the diagnosis is sealed.
- Demonstrate resetting only this scenario via PUT /__admin/scenarios/medical-checkup-flow/state.
-->

---
layout: section
---

# 🛡️ Part 3
## Burp Suite — MITM Traffic Control & Interception

<p class="section-narrative">
  WireMock virtualizes downstream services, but what about manipulating live in-flight traffic between web/mobile clients and backend gateways without modifying code? Enter Burp Suite.
</p>


---
class: pt-1.5 pb-1 px-8
---

# 🛡️ What is Burp Suite? — MITM Security Proxy

<h3 class="text-slate-300 text-xs mb-1">The Industry-Standard Cybersecurity Platform for Web &amp; API Traffic Inspection</h3>

<div class="grid grid-cols-2 gap-3 mt-1 flex-1">

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/50 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
        <span>🛡️</span> 1. The Gold Standard in Web Security
      </span>
      <span class="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded">PortSwigger</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong>Global AppSec Benchmark:</strong> The world's most widely used platform for web penetration testing and API security audits.</li>
      <li>• <strong>Network-Level Interceptor:</strong> Captures raw HTTP/1.1, HTTP/2, and WebSocket traffic at the TCP socket layer.</li>
      <li>• <strong>Zero Source Code Intrusion:</strong> Operates completely out-of-process—no SDKs, no agent injection, and zero code changes.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-[10px] text-emerald-300 font-mono">
    🔒 Raw packet-level inspection without touching application code.
  </div>
</div>

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/50 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
        <span>⚙️</span> 2. How It Operates (Local MITM)
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded">127.0.0.1:8080</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong>Loopback Proxy Listener:</strong> Runs silently on local port <code>8080</code>; browsers, mobile emulators, and test runners route traffic through it.</li>
      <li>• <strong>Dual-Terminus Decryption:</strong> Terminates TLS from client, inspects plaintext, and re-encrypts upstream to backend gateways.</li>
      <li>• <strong>Integrated Tool Suite:</strong> One unified UI hosting <strong>Proxy</strong>, <strong>Repeater</strong>, <strong>Intruder</strong>, and <strong>Logger</strong> engines.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-[10px] text-cyan-300 font-mono">
    ⚡ Transparent Man-In-The-Middle inspection engine.
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1 border border-emerald-500/30 bg-slate-900/60 rounded-lg">
  <div class="text-emerald-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Core Definition:</strong> Burp Suite sits between web/mobile clients and backend gateways, giving testers full visibility and control over in-flight traffic.</span>
  </div>
  <span class="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Transparent MITM Proxy</span>
</div>

<!--
Presenter Notes:
- Introduce Burp Suite's origin: Created by PortSwigger, it is the undisputed industry standard for web application security.
- Demystify the tool: It's not magic—it's simply an HTTP/S proxy running on localhost:8080 that intercepts packets before they leave your machine.
- Set up the transition: Let's see the high-level MITM proxy architecture showing how Burp positions itself between clients and backend gateways.
-->


---
class: pt-1.5 pb-1 px-6
---

# 🛡️ Burp Suite — MITM Proxy Architecture

<h3 class="text-slate-300 text-sm mb-1">Client, MITM Proxy Engine & Backend Microservices Interaction</h3>

<div class="flex justify-center items-center w-full mt-0.5">
  <div class="adorable-arch-container !max-w-[772px] !h-[430px] !max-h-[435px]">
    <img src="/burp_suite_architecture.jpg" class="adorable-arch-img" alt="Burp Suite MITM Proxy Architecture" />
  </div>
</div>

<!--
Presenter Notes:
- Walk through the three tiers: client (browser/mobile app), Burp Suite MITM proxy engine in the center, and backend microservices gateway.
- Highlight the interception seam: traffic enters Burp, where it can be inspected, decoded, or modified before forwarding.
- Set up the transition: Now let's explore how QA engineers repurpose this proxy architecture in integration testing, starting with duplex interception.
-->

---
class: pt-1.5 pb-1 px-8
---

# 🎯 Why Use Burp Suite in Integration Testing?

<h3 class="text-slate-300 text-xs mb-1">Repurposing Cybersecurity Superpowers for Microservices QA &amp; Resilience</h3>

<div class="multi-col-grid-3">

<div class="col-card p-3 border border-emerald-500/30 bg-slate-900/60 flex flex-col justify-between">
  <div>
    <h3 class="text-emerald-400 font-bold text-sm mb-1 flex items-center gap-1.5">
      <span>⚡</span> In-Flight Tampering
    </h3>
    <p class="text-xs text-slate-300 leading-snug">
      Pause requests mid-flight to inject <code>Mock-Scenario</code> headers that steer backend WireMock stubs. Mutate responses to HTTP 500 to test frontend fallback UI banners.
    </p>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-[10px] text-emerald-300 font-mono">
    Proxy ➔ Duplex Traffic Control
  </div>
</div>

<div class="col-card p-3 border border-cyan-500/30 bg-slate-900/60 flex flex-col justify-between">
  <div>
    <h3 class="text-cyan-400 font-bold text-sm mb-1 flex items-center gap-1.5">
      <span>🔁</span> Instant API Replay
    </h3>
    <p class="text-xs text-slate-300 leading-snug">
      1-click handoff from live logs into <strong>Repeater</strong>. Tweak JSON payloads, query params, or auth tokens to test edge cases in total isolation without repeating manual UI flows.
    </p>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-[10px] text-cyan-300 font-mono">
    Repeater ➔ Rapid Edge Reproduction
  </div>
</div>

<div class="col-card p-3 border border-amber-500/30 bg-slate-900/60 flex flex-col justify-between">
  <div>
    <h3 class="text-amber-400 font-bold text-sm mb-1 flex items-center gap-1.5">
      <span>⚙️</span> CI Steering &amp; Races
    </h3>
    <p class="text-xs text-slate-300 leading-snug">
      Auto-inject mock headers unattended in CI/CD using <strong>Match &amp; Replace</strong>. Stress-test TOCTOU race conditions and rate limits with <strong>Intruder</strong> multi-packet attacks.
    </p>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-[10px] text-amber-300 font-mono">
    Intruder ➔ Fuzzing &amp; Concurrency
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1 border border-cyan-500/30 bg-slate-900/60 rounded-lg">
  <div class="text-cyan-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>The QA Advantage:</strong> Security tools excel at low-level packet manipulation, giving QA engineers raw power to simulate failure states application code normally prevents.</span>
  </div>
  <span class="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">AppSec ➔ QA Superpower</span>
</div>

<!--
Presenter Notes:
- Emphasize the 3 key QA testing wins: in-flight tampering, rapid replay, and automated race condition testing.
- Bridge to the tools: Now let's explore the core Proxy Interception engine in depth.
-->

---
class: pt-1.5 pb-1 px-6
---

# 🔀 Deep Dive: Bi-Directional Duplex Interception

<h3 class="text-slate-300 text-sm mb-1">Visualizing Request and Response Flow Through the MITM Engine</h3>

<div class="flex justify-center items-center w-full mt-0.5">
  <div class="adorable-arch-container !max-w-[700px] !h-[390px] !max-h-[395px]">
    <img src="/burp_duplex_intercept.jpg" class="adorable-arch-img" alt="Bi-Directional Duplex Interception" />
  </div>
</div>

<div class="slide-card text-xs mt-1 py-1 px-3 bg-slate-900/70 border-slate-700/50 flex items-center justify-between rounded-lg">
  <span class="text-[11.5px] text-slate-200">🔀 <strong>Duplex Control:</strong> Intercept outbound requests to steer backend stubs; intercept responses to test client fallbacks.</span>
  <span class="text-amber-400 font-mono text-[10.5px] bg-amber-950/60 px-2 py-0.5 rounded ml-2 whitespace-nowrap">Bi-Directional Mutation</span>
</div>

---
class: pt-1.5 pb-1 px-6
---

# ⚡ Live Intercept in Action

<h3 class="text-slate-300 text-sm mb-1">Pausing, Inspecting, Modifying &amp; Forwarding Packets Mid-Flight</h3>

<div class="flex justify-center items-center w-full mt-0.5">
  <div class="adorable-arch-container !max-w-[700px] !h-[390px] !max-h-[395px]">
    <img src="/burp_intercept_action.jpg" class="adorable-arch-img" alt="Live Intercept Action in Burp Suite" />
  </div>
</div>

<div class="slide-card text-xs mt-1 py-1 px-3 bg-slate-900/70 border-slate-700/50 flex items-center justify-between rounded-lg">
  <span class="text-[11.5px] text-slate-200">⏯️ <strong>Action Controls:</strong> <code>Forward</code> passes packet; <code>Drop</code> kills TCP socket; <code>Action</code> sends to Repeater/Intruder.</span>
  <span class="text-cyan-400 font-mono text-[10.5px] bg-cyan-950/60 px-2 py-0.5 rounded ml-2 whitespace-nowrap">Real-Time Inspection</span>
</div>

<!--
Presenter Notes:
- Demonstrate pausing traffic in Burp Suite Proxy Intercept tab.
- Show how the browser or curl hangs waiting for operator decision (Forward or Drop).
- Set up the transition: We've seen how the proxy intercepts plain HTTP traffic. But modern web and API traffic is encrypted with HTTPS/SSL! How does Burp decrypt traffic mid-flight without browser security warnings? Let's examine How HTTPS & SSL Work next.
-->

---
class: pt-2 pb-1 px-8
---

# 🔒 How HTTPS Works — Phase 1: TLS Handshake

<h3 class="text-slate-300 text-sm mb-1.5">Asymmetric Authentication, SNI Routing &amp; Ephemeral Key Exchange (ECDHE)</h3>

<div class="grid grid-cols-2 gap-3 mt-1 flex-1">

<div class="slide-card p-3 border border-sky-500/40 bg-sky-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-sky-500/30">
      <span class="text-sky-300 font-bold text-sm flex items-center gap-1.5">
        <span>🤝</span> Step 1 &amp; 2: Identity &amp; Certificates
      </span>
      <span class="text-[11px] font-mono text-sky-300/80 bg-sky-900/40 px-2 py-0.5 rounded">Asymmetric (RSA / ECDSA)</span>
    </div>
    <ul class="space-y-2 text-xs text-slate-300 leading-snug">
      <li>• <strong>1. ClientHello &amp; SNI:</strong> Client announces TLS version, cipher suites &amp; target host via <strong>Server Name Indication</strong> (SNI).</li>
      <li>• <strong>2. ServerHello &amp; Certificate:</strong> Server selects cipher parameters and returns its signed <strong>X.509 Certificate Chain</strong>.</li>
      <li>• <strong>3. Trust Validation:</strong> Client verifies server certificate against pre-installed OS Root CAs and checks hostname match (SAN).</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-sky-500/30 text-[11px] text-sky-300 font-mono">
    🔐 Authenticates server identity and guarantees authenticity.
  </div>
</div>

<div class="slide-card p-3 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
        <span>🔑</span> Step 3: Ephemeral Key Exchange
      </span>
      <span class="text-[11px] font-mono text-cyan-300/80 bg-cyan-900/40 px-2 py-0.5 rounded">ECDHE (Curve25519)</span>
    </div>
    <ul class="space-y-2 text-xs text-slate-300 leading-snug">
      <li>• <strong>Diffie-Hellman Exchange:</strong> Client and server exchange public elliptic curve parameters over the unencrypted wire.</li>
      <li>• <strong>Shared Secret Derivation:</strong> Both sides independently compute identical <strong>Symmetric Session Keys</strong> without transmitting secrets.</li>
      <li>• <strong>Perfect Forward Secrecy (PFS):</strong> Compromising the server's long-term private key cannot decrypt historical captured traffic.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-cyan-500/30 text-[11px] text-cyan-300 font-mono">
    ⚡ Shared session keys established without ever sending secrets.
  </div>
</div>

</div>

<div class="slide-card py-2 px-3 flex items-center justify-between text-xs mt-2 border border-sky-500/30 bg-slate-900/70 rounded-lg">
  <div class="text-sky-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Handshake Milestone:</strong> Once Phase 1 completes, both sides switch from heavy asymmetric math to high-speed symmetric AEAD streaming.</span>
  </div>
  <span class="text-[11px] font-mono text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Ready for Phase 2</span>
</div>

<!--
Presenter Notes:
- Walk through Phase 1: The client initiates ClientHello with SNI, the server presents its certificate chain, and client validates trust.
- Highlight ECDHE: Elliptic Curve Diffie-Hellman Ephemeral creates forward secrecy without transmitting shared secrets over the wire.
- Transition to Phase 2: Now that session keys are established, how does data flow in direct TLS vs how Burp intercepts it? Let's look at Phase 2 next.
-->

---
class: pt-2 pb-1 px-8
---

# 🔒 How HTTPS Works — Phase 2: Direct TLS vs. MITM Dual-Terminus

<h3 class="text-slate-300 text-sm mb-1.5">Symmetric Payload Encryption (AES-GCM): Single Direct Tunnel vs. Two Terminated Handshakes</h3>

<div class="space-y-2 mt-1">

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/50">
  <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-800">
    <div class="flex items-center gap-2">
      <span class="text-amber-300 font-bold text-xs flex items-center gap-1">
        <span>🌐</span> Direct TLS (Before Proxying)
      </span>
      <span class="text-[10px] text-slate-400 font-mono">Standard Production Flow</span>
    </div>
    <span class="text-[10.5px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.2 rounded border border-amber-500/30">Single Encrypted Tunnel</span>
  </div>
  
  <div class="bg-slate-950/90 border border-slate-800 rounded p-1.5 font-mono text-[10px] flex items-center justify-center gap-2 text-slate-200 my-1">
    <span class="text-sky-300 font-bold bg-sky-950/70 px-2 py-0.5 rounded border border-sky-500/30">💻 Client</span>
    <span class="text-slate-500 font-bold">──────[</span>
    <span class="text-amber-300 font-semibold">🔒 Opaque AES-GCM Ciphertext Tunnel</span>
    <span class="text-slate-500 font-bold">]──────►</span>
    <span class="text-emerald-300 font-bold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30">🏢 Server</span>
  </div>

  <p class="text-[11.5px] text-slate-300 leading-snug mt-1">
    • <strong>Intermediaries Blind:</strong> Standard network proxies (Wireshark, Envoy, routers) see only ciphertext packets. HTTP verbs, paths, headers, and request bodies are 100% opaque.
  </p>
</div>

<div class="slide-card p-2.5 border border-emerald-500/40 bg-emerald-950/15">
  <div class="flex items-center justify-between mb-1 pb-1 border-b border-emerald-500/20">
    <div class="flex items-center gap-2">
      <span class="text-emerald-300 font-bold text-xs flex items-center gap-1">
        <span>🛡️</span> Burp Suite MITM (After Proxying)
      </span>
      <span class="text-[10px] text-cyan-300 font-mono">Test Interception Seam</span>
    </div>
    <span class="text-[10.5px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.2 rounded border border-emerald-500/40">Dual TLS Terminus</span>
  </div>

  <div class="bg-slate-950/90 border border-slate-800 rounded p-1.5 font-mono text-[10px] flex items-center justify-center gap-2 text-slate-200 my-1">
    <span class="text-sky-300 font-bold bg-sky-950/70 px-2 py-0.5 rounded border border-sky-500/30">💻 Client</span>
    <span class="text-slate-500 font-bold">──[</span><span class="text-amber-300">TLS 1: PortSwigger CA</span><span class="text-slate-500 font-bold">]──►</span>
    <span class="text-cyan-300 font-bold bg-cyan-950/90 px-2.5 py-0.5 rounded border border-cyan-400 shadow-md">🛡️ Burp (Plaintext)</span>
    <span class="text-slate-500 font-bold">──[</span><span class="text-emerald-300">TLS 2: Target CA</span><span class="text-slate-500 font-bold">]──►</span>
    <span class="text-emerald-300 font-bold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30">🏢 Server</span>
  </div>

  <p class="text-[11.5px] text-slate-300 leading-snug mt-1">
    • <strong>Dual Terminus:</strong> Burp terminates TLS 1 with Client (forging the server cert) and terminates TLS 2 with Server. Traffic is unencrypted in memory at the seam for tampering and inspection.
  </p>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1.5 border border-amber-500/30 bg-slate-900/70 rounded-lg">
  <div class="text-amber-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Why PKI Matters:</strong> Because Burp terminates TLS 1, the client will show a <strong>Certificate Untrusted Warning</strong> unless Burp's Root CA is installed in the OS trust store.</span>
  </div>
  <span class="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Leads to PKI Flow</span>
</div>

<!--
Presenter Notes:
- Compare the two models clearly: Direct TLS creates a single opaque tunnel that no middlebox can read.
- Explain Burp MITM: Burp breaks the single tunnel into two independent TLS sessions (TLS 1 with Client, TLS 2 with Server).
- Highlight the transition: To terminate TLS 1 without security warnings, Burp must issue certificates signed by a trusted CA—leading into PKI Architecture next.
-->

---
class: pt-1.5 pb-1 px-8
---

# 🏛️ PKI Architecture — Core Trust Flow

<h3 class="text-slate-300 text-xs mb-1">How Key Pairs, Digital Certificates &amp; Trusted CAs Establish Encrypted Identity</h3>

<div class="flex justify-center items-center w-full mt-0.5">
<div class="adorable-arch-container !h-[265px] !max-h-[265px] relative">
<img src="/pki_flow_architecture.jpg" class="adorable-arch-img" alt="Public Key Infrastructure (PKI) Architecture Flow" />
<div class="absolute top-2.5 left-[22%] -translate-x-1/2 bg-slate-950/85 border border-amber-500/50 text-amber-300 font-mono text-[10.5px] px-2 py-0.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1 pointer-events-none">
<span>🔐</span> <strong>Server</strong> <span class="text-slate-400 text-[9.5px]">(Key Pair)</span>
</div>
<div class="absolute top-2 left-[49%] -translate-x-1/2 bg-slate-950/85 border border-cyan-500/50 text-cyan-300 font-mono text-[10.5px] px-2 py-0.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1 pointer-events-none">
<span>📜</span> <strong>Certificate</strong>
</div>
<div class="absolute top-2.5 right-[22%] translate-x-1/2 bg-slate-950/85 border border-indigo-500/50 text-indigo-300 font-mono text-[10.5px] px-2 py-0.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1 pointer-events-none">
<span>🏛️</span> <strong>CA</strong> <span class="text-slate-400 text-[9.5px]">(Root Authority)</span>
</div>
<div class="absolute bottom-2.5 left-[31%] -translate-x-1/2 bg-slate-950/85 border border-sky-500/50 text-sky-300 font-mono text-[10.5px] px-2 py-0.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1 pointer-events-none">
<span>💻</span> <strong>Client</strong> <span class="text-slate-400 text-[9.5px]">(Browser/App)</span>
</div>
<div class="absolute bottom-2 left-[50%] -translate-x-1/2 bg-slate-950/85 border border-emerald-500/50 text-emerald-300 font-mono text-[10.5px] px-2 py-0.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1 pointer-events-none">
<span>✓</span> <strong>Verified Trust</strong>
</div>
</div>
</div>

<!-- Architecture Roles Legend -->
<div class="grid grid-cols-3 gap-2 mt-1.5 w-full max-w-[820px] mx-auto">
  <div class="slide-card py-1 px-2.5 bg-slate-900/80 border-sky-500/40 flex items-center gap-2">
    <span class="text-base">💻</span>
    <div class="text-[11px] leading-tight">
      <span class="font-bold text-sky-300">Client:</span>
      <span class="text-slate-300"> Browser/OS store verifies Root CA</span>
    </div>
  </div>
  <div class="slide-card py-1 px-2.5 bg-slate-900/80 border-indigo-500/40 flex items-center gap-2">
    <span class="text-base">🏛️</span>
    <div class="text-[11px] leading-tight">
      <span class="font-bold text-indigo-300">CA:</span>
      <span class="text-slate-300"> Trusted authority signs server identity</span>
    </div>
  </div>
  <div class="slide-card py-1 px-2.5 bg-slate-900/80 border-amber-500/40 flex items-center gap-2">
    <span class="text-base">🔐</span>
    <div class="text-[11px] leading-tight">
      <span class="font-bold text-amber-300">Server:</span>
      <span class="text-slate-300"> Holds private key &amp; presents certificate</span>
    </div>
  </div>
</div>

<div class="slide-card text-xs mt-1 py-1 px-3 bg-slate-900/70 border-slate-700/50 flex items-center justify-between rounded-lg">
  <div class="text-slate-200 leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>PKI Principle:</strong> Clients don't trust servers directly. Clients trust a <strong>Certification Authority (CA)</strong>, which cryptographically signs the server's public key inside a <strong>Certificate</strong>.</span>
  </div>
  <span class="text-emerald-400 font-mono text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Asymmetric Trust Chain</span>
</div>

<!--
Presenter Notes:
- Walk through the 4 steps of the flow:
  1. Key Pair & Encryption: Server holds a private key securely and publishes its public key.
  2. Certificate: Digital credential binding domain identity to the public key.
  3. Certification Authority (CA): Institutional trust anchor that cryptographically stamps and signs the certificate.
  4. Client Verification: Browser/App verifies the CA signature against pre-installed OS root trust stores, proving identity without pre-sharing keys.
- Bridge to Burp Suite: Burp acts as a local CA on the tester's machine, generating signed certificates for microservices on the fly so clients can verify trust.
-->

---
class: pt-2 pb-1 px-8
---

# 🔐 Why We Need Custom Certificate Chaining

<h3 class="text-slate-300 text-sm mb-1.5">How Dynamic TLS Interception &amp; Hierarchical Trust Chains Solve HTTPS Encryption</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="slide-card p-2.5 border border-rose-500/40 bg-rose-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-sm flex items-center gap-1.5">
        <span>🚫</span> 1. The Strict TLS Problem
      </span>
      <span class="text-[11px] font-mono text-rose-300/80 bg-rose-900/40 px-2 py-0.5 rounded">Alert 48</span>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li>• <strong>Hostname Binding:</strong> TLS mandates certificate Subject Alternative Name (SAN) match the requested target host.</li>
      <li>• <strong>Static Certs Fail:</strong> A static cert cannot predict arbitrary microservice domains. Clients abort with <code>ERR_CERT_COMMON_NAME_INVALID</code>.</li>
      <li>• <strong>Untrusted Authority:</strong> Even if host matches, the OS rejects certs not signed by a recognized root authority (<code>unknown_ca</code>).</li>
    </ul>
  </div>
  <div class="mt-1 pt-1 border-t border-rose-500/30 text-[11px] text-rose-300 font-mono">
    🛑 Direct interception fails without dynamic per-host certificate generation.
  </div>
</div>

<div class="slide-card p-2.5 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
        <span>⛓️</span> 2. Dynamic On-the-Fly Chaining
      </span>
      <span class="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded">Root ➔ Leaf PKI</span>
    </div>

<div class="bg-slate-950/80 border border-slate-700/60 rounded p-1.5 font-mono text-[11px] text-slate-200 space-y-0.5 mb-1">
  <div class="text-emerald-400">1. OS Store ➔ Trusts PortSwigger Root CA (Installed ONCE)</div>
  <div class="text-cyan-400 pl-2">↳ 2. SNI Captured ➔ 3. Leaf Generated ➔ 4. Signed by Root CA</div>
</div>

<ul class="space-y-1 text-xs text-slate-300 leading-snug">
  <li>• <strong>Install Once, Decrypt All:</strong> Trusting Root CA lets Burp mint valid leaf certs for any domain dynamically.</li>
  <li>• <strong>Preserves PKI Hierarchy:</strong> Satisfies strict RFC 5280 chain validation in browsers, iOS ATS, and Android.</li>
</ul>
  </div>
  <div class="mt-1 pt-1 border-t border-cyan-500/30 text-[11px] text-cyan-300 font-mono">
    ✨ Transparent full-duplex TLS decryption and re-encryption.
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1 border border-cyan-500/30 bg-slate-900/60 rounded-lg">
  <div class="text-cyan-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Custom Enterprise CA:</strong> Exporting a shared custom Root CA to team workstations &amp; CI/CD runners standardizes test environments with 0 TLS warnings.</span>
  </div>
  <span class="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">RFC 5280 PKI Chain</span>
</div>

<!--
Presenter Notes:
- Explain that TLS handshake occurs before HTTP layer; SNI in ClientHello is the only plaintext indicator of target hostname.
- Highlight the difference between self-signing every domain manually vs having an installed Root CA that signs dynamic leaf certificates in real time.
- Mention that mTLS can be handled by configuring upstream client certificates (.p12) in Burp Proxy settings.
-->
---
class: pt-1.5 pb-1 px-8
---

# ⚙️ Why Certificate Chaining Works — Cryptographic Delegation

<h3 class="text-slate-300 text-xs mb-1">Transitive Trust, RFC 5280 Path Validation &amp; Asymmetric Signature Verification</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="slide-card p-2 border border-indigo-500/40 bg-indigo-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-0.5 border-b border-indigo-500/30">
      <span class="text-indigo-300 font-bold text-xs flex items-center gap-1.5">
        <span>🔏</span> 1. Burp Minting &amp; Signing
      </span>
      <span class="text-[10px] font-mono text-indigo-300 bg-indigo-950/60 px-1.5 py-0.5 rounded">Private Key Mint</span>
    </div>

<div class="bg-slate-950/80 border border-slate-700/60 rounded px-1.5 py-1 font-mono text-[9.5px] text-slate-200 leading-tight space-y-0.5 mb-1">
  <div><span class="text-amber-300 font-semibold">Burp Dynamic Minting:</span> Read SNI ➔ <span class="text-cyan-300">order-service.internal</span></div>
  <div>• Leaf SAN: <span class="text-cyan-300">order-service.internal</span> | Hash: <span class="text-emerald-300">SHA-256(Leaf)</span></div>
  <div>• Signature: <span class="text-violet-300">Encrypt(Hash, Root_PrivateKey)</span></div>
</div>

<ul class="space-y-0.5 text-xs text-slate-300 leading-snug">
  <li>• <strong>Asymmetric Delegation:</strong> Burp keeps Root Private Key secret, using it strictly to mint and sign leaf certs.</li>
  <li>• <strong>Any Target Domain:</strong> Whether 1 or 1,000 internal services, Burp mints custom certs on TLS connection.</li>
</ul>
  </div>
  <div class="mt-1 pt-0.5 border-t border-indigo-500/30 text-[10px] text-indigo-300 font-mono">
    🔑 Root CA Private Key signs on-the-fly leaf certificates.
  </div>
</div>

<div class="slide-card p-2 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-0.5 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
        <span>✅</span> 2. Client Cryptographic Verification
      </span>
      <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">RFC 5280 Loop</span>
    </div>

<div class="bg-slate-950/80 border border-slate-700/60 rounded px-1.5 py-1 font-mono text-[9.5px] text-slate-200 leading-tight space-y-0.5 mb-1">
  <div><span class="text-emerald-300 font-semibold">OS RFC 5280 Verification:</span> H1 = <span class="text-emerald-300">SHA-256(Leaf)</span></div>
  <div>• Decrypt Sig: <span class="text-violet-300">H2 = Decrypt(Sig, Root_PublicKey)</span></div>
  <div class="text-emerald-400 font-semibold">• If H1 == H2 &amp; SAN matches ➔ Valid Trust! ✓</div>
</div>

<ul class="space-y-0.5 text-xs text-slate-300 leading-snug">
  <li>• <strong>Transitive Trust:</strong> Client trusts Root CA ➔ therefore trusts any leaf cert signed by Root CA's private key.</li>
  <li>• <strong>Zero Warnings:</strong> Because signature decrypts with Root Public Key, OS marks connection fully secure.</li>
</ul>
  </div>
  <div class="mt-1 pt-0.5 border-t border-emerald-500/30 text-[10px] text-emerald-300 font-mono">
    🛡️ Mathematical proof of authenticity without pre-installing leaf certs.
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1 border border-emerald-500/30 bg-slate-900/60 rounded-lg">
  <div class="text-emerald-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Why It Scales:</strong> Root CA is trusted <strong>once</strong> in OS store; client math automatically validates infinite microservices.</span>
  </div>
  <span class="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">O(1) Overhead</span>
</div>

<!--
Presenter Notes:
- Walk through the two sides: Burp signing with Root Private Key, and Client verifying with Root Public Key from OS trust store.
- Highlight the math: H1 = SHA-256(Leaf) vs H2 = Decrypt(Signature, Root_PublicKey). If they match, the cert is authentic and untampered.
- Explain transitive trust: The client doesn't need to know every microservice in advance. As long as the issuer chain leads to a trusted Root CA in the OS store, the entire chain is valid.
- Bridge to the tools: Now that we understand both Proxy interception and how SSL decryption works under the hood, let's explore the rest of Burp Suite's test workbench, starting with Target and Scope.
-->

---
class: pt-2 pb-2 px-8
---

# 🎯 Burp Suite — Target: Site Map & Scope Control

<h3 class="text-slate-300 text-sm mb-1.5">Mapping Microservice Topology &amp; Isolating Test Traffic from External Noise</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="slide-card p-3 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
        <span>🎯</span> Core Capabilities &amp; Scoping
      </span>
      <span class="text-[11px] font-mono text-cyan-300/80 bg-cyan-900/40 px-2 py-0.5 rounded">Target Tab</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong>Endpoint Discovery:</strong> Passively builds a complete directory tree of all microservice routes, parameters, and query flags.</li>
      <li>• <strong>Suite Scoping:</strong> Right-click <code>http://localhost:8080</code> ➔ <strong>Add to scope</strong> to isolate your microservices under test.</li>
      <li>• <strong>Noise Reduction:</strong> Enable <em>"Show only in-scope items"</em> to filter out browser telemetry, CDN requests, and OS background pings.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-cyan-500/30 text-[11px] text-cyan-300 font-mono">
    ⚡ Essential for keeping Logger &amp; Proxy focused purely on test APIs.
  </div>
</div>

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-sm flex items-center gap-1.5">
        <span>🗺️</span> Discovered Microservices Tree
      </span>
      <span class="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded">In Scope</span>
    </div>

```text
📁 http://localhost:8080 (bff-service gateway)
├── 📂 /api/v1/users (user-service :8081)
│   └── 📄 POST /register, POST /login
├── 📂 /api/v1/accounts (bank-service :8082)
│   └── 📄 GET /balance, POST /deposit
├── 📂 /api/v1/ekyc (ekyc-service :8083)
│   └── 📄 POST /biometrics
└── 📂 /api/v1/transfers (transfer-service :8085)
    └── 📄 POST /execute, GET /history
```

  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-[11px] text-slate-300 font-mono">
    🎯 Right-click any node ➔ Send to Repeater (Cmd+R)
  </div>
</div>

</div>

<div class="slide-card text-xs mt-2 p-1.5 bg-slate-900/70 border-cyan-500/40 flex items-center justify-between">
  <span class="text-slate-200">💡 <strong>Best Practice:</strong> Define target scope before running integration suites to prevent proxy log contamination.</span>
  <span class="text-cyan-300 font-mono text-[10px] bg-cyan-950/60 px-2 py-0.5 rounded">Scope Isolation</span>
</div>

---

# 📋 Burp Suite — Logger / HTTP History

### Real-Time Traffic Auditing & Inspection

<div class="multi-col-grid-2">

<div class="col-card">
  <h3 class="text-emerald-400">📋 Real-Time Audit Trail</h3>
  <p class="mb-2">
    Maintains a complete chronological record of every outbound request and inbound response with filtering by status code, method, host, or payload size.
  </p>
  <div class="slide-card text-sm mt-auto bg-slate-900/60 p-2.5 border-emerald-500/30">
    🔍 Filter by regex or status code (e.g. <code>4xx / 5xx</code>) to isolate regressions instantly.
  </div>
</div>

<div class="col-card">
  <h3 class="text-emerald-400">🔍 Rapid Troubleshooting &amp; Tool Handoff</h3>
  <p class="mb-2">
    Instantly isolate failing API calls and right-click to send requests directly to <strong>Repeater</strong> for manual replay or <strong>Intruder</strong> for boundary fuzzing.
  </p>
  <div class="slide-card text-sm mt-auto bg-slate-900/60 p-2.5 border-emerald-500/30">
    ⚡ One-click handoff between live logging, manual replay, and parameter fuzzing.
  </div>
</div>

</div>

---
class: pt-2 pb-2 px-8
---

# 🔁 Burp Suite — Repeater: Manual Request Workbench

<h3 class="text-slate-300 text-xs mb-1.5">Zero-UI API Workbench for Ad-Hoc Modification, Edge-Case Probing &amp; Rapid Replay</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">
<div class="slide-card p-2.5 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
        <span>🔁</span> The QA Repeater Advantage
      </span>
      <span class="text-[10px] font-mono text-emerald-300/90 bg-emerald-900/40 px-2 py-0.5 rounded">Cmd+R / Ctrl+R</span>
    </div>
    <ul class="space-y-1 text-[11px] text-slate-300 leading-snug">
      <li>• <strong>1-Click Live Clone (<code>Cmd+R</code>):</strong> Clone any captured request from Proxy or Logger with all headers, cookies, and tokens intact.</li>
      <li>• <strong>Bypass Client-Side Validation:</strong> Test raw backend guards directly—no disabled submit buttons, input masks, or UI restrictions.</li>
      <li>• <strong>Byte-Level Protocol Control:</strong> Manipulate malformed headers, custom verbs, invalid JSON types, or edge-case Unicode.</li>
      <li>• <strong>Total Isolation:</strong> Re-issue requests 100 times in seconds without resetting browser sessions or re-running full test suites.</li>
    </ul>
  </div>
  <div class="mt-1.5 pt-1 border-t border-emerald-500/30 text-[10.5px] text-emerald-300 font-mono flex items-center justify-between">
    <span>⚡ Sub-second feedback loop for edge cases</span>
    <span class="text-[9.5px] bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">Zero-UI</span>
  </div>
</div>
<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/60 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xs flex items-center gap-1.5">
        <span>🖥️</span> Dual-Pane Workbench Anatomy
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded">Live Editor</span>
    </div>
    <div class="bg-slate-950/90 border border-slate-800 rounded px-2 py-0.5 text-[9.5px] font-mono flex items-center justify-between mb-1">
      <div class="flex items-center gap-1.5">
        <span class="text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-500/40 px-1.5 py-0.2 rounded">▶ Send</span>
        <span class="text-slate-500">|</span>
        <span class="text-slate-300 bg-slate-900 px-1 py-0.2 rounded border border-slate-800">◀</span>
        <span class="text-slate-300 bg-slate-900 px-1 py-0.2 rounded border border-slate-800">▶</span>
        <span class="text-slate-400 text-[8.5px]">(History)</span>
      </div>
      <div class="text-[9px] text-slate-400">Target: <span class="text-cyan-300 font-mono">127.0.0.1:8080</span></div>
    </div>
    <div class="grid grid-cols-2 gap-1.5 font-mono text-[9px] leading-tight">
      <div class="bg-slate-950/95 border border-slate-800 rounded p-1.5 space-y-0.5">
        <div class="text-slate-400 pb-0.5 border-b border-slate-800 font-bold text-[8.5px]">Request (Editable)</div>
        <div class="text-purple-300">POST <span class="text-slate-200">/api/transfers</span></div>
        <div class="text-slate-400">Host: localhost:8080</div>
        <div class="text-amber-300 font-semibold">Mock-Scenario: FAIL</div>
        <div class="text-slate-400">Content-Type: json</div>
        <div class="text-slate-500 pt-0.5">{"amount": -50.00}</div>
      </div>
      <div class="bg-slate-950/95 border border-slate-800 rounded p-1.5 space-y-0.5">
        <div class="text-slate-400 pb-0.5 border-b border-slate-800 font-bold text-[8.5px] flex justify-between">
          <span>Response</span>
          <span class="text-rose-400 font-bold">400 Bad Req</span>
        </div>
        <div class="text-slate-400">Time: <span class="text-emerald-300">12ms</span> | 142B</div>
        <div class="text-slate-400">Content-Type: json</div>
        <div class="text-rose-300 pt-0.5">{"error":"INVALID"}</div>
        <div class="text-slate-500">{"code":"ERR_400"}</div>
      </div>
    </div>
  </div>
  <div class="mt-1.5 pt-1 border-t border-slate-700/60 text-[10px] text-slate-400 flex items-center justify-between">
    <span>View Modes: <strong class="text-slate-200">Pretty</strong> · Raw · Hex · Render</span>
    <span class="text-[9px] font-mono text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">Dual-Pane</span>
  </div>
</div>
</div>

<div class="slide-card py-1 px-3 flex items-center justify-between text-xs mt-1 border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-[11px] text-slate-200">💡 <strong>Why Not Postman?</strong> Postman normalizes headers and runs pre-scripts. Repeater sends the <em>exact raw socket bytes</em> you type, exposing true backend validation crashes.</span>
  <span class="text-[9.5px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">Raw Socket Power</span>
</div>

<!--
Presenter Notes:
- Introduce Repeater as the #1 daily driver for developers and QA engineers: An isolated HTTP/S scratchpad.
- Contrast with Postman: Postman is great for saved collections, but Burp Repeater gives 100% control over raw byte payloads and malformed headers.
- Highlight the 1-click clone: Cmd+R instantly copies any captured request from Proxy or Logger without manual setup.
-->

---
class: pt-2 pb-1.5 px-8
---

# 🔬 Burp Suite — Repeater: Advanced Triage &amp; QA Workflow

<h3 class="text-slate-300 text-xs mb-1.5">Sidecar Inspector, Tab Organization, Iterative Mutation &amp; Tool Handoffs</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">
<div class="slide-card p-2.5 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
        <span>🛠️</span> Workbench Superpowers
      </span>
      <span class="text-[10px] font-mono text-cyan-300/90 bg-cyan-900/40 px-2 py-0.5 rounded">Power Features</span>
    </div>
    <ul class="space-y-1 text-[11px] text-slate-300 leading-snug">
      <li>• <strong>Tab Groups &amp; Color Coding:</strong> Organize requests by microservice or scenario (e.g. <span class="text-emerald-300 font-semibold">Auth [Green]</span>, <span class="text-amber-300 font-semibold">Transfer [Amber]</span>, <span class="text-rose-300 font-semibold">Fraud [Red]</span>).</li>
      <li>• <strong>Sidecar Inspector:</strong> Real-time decoding of URL parameters, JSON fields, cookies, and Base64/JWT tokens directly in the right sidebar.</li>
      <li>• <strong>History Undo/Redo (<code>◀</code> <code>▶</code>):</strong> Every click of <em>Send</em> snapshots the request/response pair. Step backward and forward to review previous variations.</li>
      <li>• <strong>Target Switching:</strong> Change destination host/port on the fly (e.g. switch between local container <code>:8081</code> and staging gateway).</li>
    </ul>
  </div>
  <div class="mt-1.5 pt-1 border-t border-cyan-500/30 text-[10.5px] text-cyan-300 font-mono flex items-center justify-between">
    <span>🔍 Built-in JWT &amp; parameter inspection</span>
    <span class="text-[9.5px] bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">Inspector</span>
  </div>
</div>
<div class="slide-card p-2.5 border border-amber-500/40 bg-amber-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-amber-500/30">
      <span class="text-amber-300 font-bold text-xs flex items-center gap-1.5">
        <span>🔄</span> The 4-Step QA Tampering Loop
      </span>
      <span class="text-[10px] font-mono text-amber-300/90 bg-amber-900/40 px-2 py-0.5 rounded">Triage Seam</span>
    </div>
    <div class="space-y-1 text-xs text-slate-300">
      <div class="bg-slate-950/90 border border-slate-800 rounded p-1 flex items-start gap-1.5">
        <span class="text-cyan-400 font-bold font-mono text-[10.5px]">1. Capture:</span>
        <span class="text-[11px] text-slate-300">Intercept live request from Playwright/curl ➔ press <code class="text-cyan-300 font-mono text-[9.5px]">Cmd+R</code>.</span>
      </div>
      <div class="bg-slate-950/90 border border-slate-800 rounded p-1 flex items-start gap-1.5">
        <span class="text-amber-400 font-bold font-mono text-[10.5px]">2. Steer:</span>
        <span class="text-[11px] text-slate-300">Add <code class="text-amber-300 font-mono text-[9.5px]">Mock-Scenario: OTP:EXPIRED</code> to steer WireMock.</span>
      </div>
      <div class="bg-slate-950/90 border border-slate-800 rounded p-1 flex items-start gap-1.5">
        <span class="text-rose-400 font-bold font-mono text-[10.5px]">3. Mutate:</span>
        <span class="text-[11px] text-slate-300">Tweak boundary fields (negative amounts, nulls, long strings).</span>
      </div>
      <div class="bg-slate-950/90 border border-slate-800 rounded p-1 flex items-start gap-1.5">
        <span class="text-purple-400 font-bold font-mono text-[10.5px]">4. Handoff:</span>
        <span class="text-[11px] text-slate-300">Right-click ➔ <strong>Send to Intruder</strong> (fuzz) or <strong>Comparer</strong> (diff).</span>
      </div>
    </div>
  </div>
  <div class="mt-1.5 pt-1 border-t border-amber-500/30 text-[10.5px] text-amber-300 font-mono flex items-center justify-between">
    <span>⚡ Instant handoff to Intruder &amp; Comparer</span>
    <span class="text-[9.5px] bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">Handoff</span>
  </div>
</div>
</div>

<div class="slide-card py-1 px-3 flex items-center justify-between text-xs mt-1 border border-slate-700/60 bg-slate-900/70 rounded-lg">
  <span class="text-[11px] text-slate-200">🛡️ <strong>The 5-Second Triage:</strong> Reproduce a failing CI integration test in Repeater in 5 seconds without waiting for a 2-minute build and browser run.</span>
  <span class="text-[9.5px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">Fast Feedback</span>
</div>

<!--
Presenter Notes:
- Walk through the 4-step loop: Capture from live traffic, inject WireMock steering headers, mutate boundary parameters, and hand off to Intruder or Comparer.
- Show the Inspector: Point out how it decodes parameters and JWTs on the fly so testers don't paste secrets into third-party websites like jwt.io.
-->

---
class: pt-2 pb-2 px-8
---

# ⚡ Burp Suite — Intruder: Automated Parameter Fuzzing

<h3 class="text-slate-300 text-sm mb-1.5">High-Throughput Payload Fuzzing, Boundary Probes &amp; Race Condition Testing</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="slide-card p-3 border border-purple-500/40 bg-purple-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-purple-500/30">
      <span class="text-purple-300 font-bold text-sm flex items-center gap-1.5">
        <span>⚡</span> Automated Attack Engine
      </span>
      <span class="text-[11px] font-mono text-purple-300/80 bg-purple-900/40 px-2 py-0.5 rounded">Cmd+I / Ctrl+I</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong>Payload Positions:</strong> Mark parameters with <code>§...§</code> markers (e.g. <code>"amount": §100§</code> or <code>"otp": "§123456§"</code>).</li>
      <li>• <strong>4 Attack Modes:</strong> <em>Sniper</em> (1 field), <em>Battering Ram</em> (sync all), <em>Pitchfork</em> (paired lockstep), <em>Cluster Bomb</em> (Cartesian matrix).</li>
      <li>• <strong>Concurrency &amp; TOCTOU:</strong> HTTP/2 single-packet bursts to probe database row locks &amp; double-spend race conditions.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-purple-500/30 text-[11px] text-purple-300 font-mono">
    ⚡ Uncovers rate-limit bypasses, boundary crashes &amp; missing idempotency keys.
  </div>
</div>

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-sm flex items-center gap-1.5">
        <span>🎯</span> Position Markers &amp; Attack Matrix
      </span>
      <span class="text-[11px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded">Sniper Mode</span>
    </div>

```http
POST /api/v1/transfers HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Idempotency-Key: §IDEMP-KEY-001§

{
  "fromAccount": "ACC-001",
  "toAccount": "ACC-002",
  "amount": §100.00§
}
```

```text
Payload List: [-1, 0, 0.001, 999999999, "NaN", null, "'; DROP--"]
```

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-[11px] text-slate-300 font-mono">
    🔍 Sort results by HTTP Status Code, Length &amp; Latency
  </div>
</div>

</div>

<div class="slide-card text-xs mt-2 p-1.5 bg-slate-900/70 border-purple-500/40 flex items-center justify-between">
  <span class="text-slate-200">💡 <strong>QA Superpower:</strong> Intruder rapidly validates that backend validation rejecting negative amounts returns <code>422 Unprocessable Entity</code>.</span>
  <span class="text-purple-300 font-mono text-[10px] bg-purple-950/60 px-2 py-0.5 rounded">Boundary Matrix</span>
</div>

---
class: pt-1.5 pb-1 px-8
---

# 🎯 Intruder Modes — Sniper vs. Battering Ram

<h3 class="text-slate-300 text-xs mb-1.5 -mt-1.5">Single Payload List: One Blank at a Time vs. Identical Twin Values Everywhere (ELI5)</h3>

<div class="grid grid-cols-2 gap-3 flex-1">

<div class="slide-card p-3 border border-purple-500/40 bg-purple-950/20 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-purple-500/30">
      <span class="text-purple-300 font-bold text-xs flex items-center gap-1.5">
        <span>🎯</span> 1. Sniper (One Blank at a Time)
      </span>
      <span class="text-[10px] font-mono text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded">1 List • 1-by-1</span>
    </div>
    <p class="text-[11.5px] text-slate-300 leading-snug mb-1">
      <strong>How it works:</strong> Takes turns! Puts a test word in <strong>Blank #1</strong> while keeping all other blanks at their normal default values. Once finished, moves to <strong>Blank #2</strong>.
    </p>
    <div class="bg-slate-950/80 border border-purple-500/30 rounded p-2 font-mono text-[10.5px] leading-relaxed my-1">
      <div class="text-slate-400 text-[9.5px] pb-0.5 border-b border-slate-800 flex justify-between">
        <span>Template: { "amount": §100§, "fee": §5§ }</span>
        <span class="text-purple-400">List: [-1, 999999]</span>
      </div>
      <div class="pt-1 space-y-0.5 text-slate-200">
        <div>• <span class="text-purple-300">Req 1:</span> { "amount": <span class="text-amber-300 font-bold">-1</span>, "fee": 5 } <span class="text-slate-500 text-[9.5px]">← Blank 1</span></div>
        <div>• <span class="text-purple-300">Req 2:</span> { "amount": <span class="text-amber-300 font-bold">999999</span>, "fee": 5 } <span class="text-slate-500 text-[9.5px]">← Blank 1</span></div>
        <div>• <span class="text-purple-300">Req 3:</span> { "amount": 100, "fee": <span class="text-amber-300 font-bold">-1</span> } <span class="text-slate-500 text-[9.5px]">← Blank 2</span></div>
        <div>• <span class="text-purple-300">Req 4:</span> { "amount": 100, "fee": <span class="text-amber-300 font-bold">999999</span> } <span class="text-slate-500 text-[9.5px]">← Blank 2</span></div>
      </div>
      <div class="pt-1 mt-1 border-t border-slate-800 text-[10px] text-purple-300 font-medium">
        📊 Math: 2 blanks × 2 words = <strong>4 total requests</strong>
      </div>
    </div>
  </div>
  <div class="mt-1 pt-1 border-t border-purple-500/30 text-[10.5px] text-purple-300">
    🎯 <strong>Best for:</strong> Isolating exactly which input field causes a validation error or crash.
  </div>
</div>

<div class="slide-card p-3 border border-amber-500/40 bg-amber-950/20 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-amber-500/30">
      <span class="text-amber-300 font-bold text-xs flex items-center gap-1.5">
        <span>🦹</span> 2. Battering Ram (Copy-Paste)
      </span>
      <span class="text-[10px] font-mono text-amber-300 bg-amber-900/50 px-2 py-0.5 rounded whitespace-nowrap">1 List • Same Word</span>
    </div>
    <p class="text-[11.5px] text-slate-300 leading-snug mb-1">
      <strong>How it works:</strong> Types the <strong>exact same word into every blank simultaneously</strong>. Like pressing Ctrl+V into all fields at once — they are always identical twins!
    </p>
    <div class="bg-slate-950/80 border border-amber-500/30 rounded p-2 font-mono text-[10.5px] leading-relaxed my-1">
      <div class="text-slate-400 text-[9.5px] pb-0.5 border-b border-slate-800 flex justify-between">
        <span>Template: { "user": §alice§, "pass": §secret§ }</span>
        <span class="text-amber-400">1 List: [admin, root, guest]</span>
      </div>
      <div class="pt-1 space-y-0.5 text-slate-200">
        <div>• <span class="text-amber-300">Req 1:</span> { "user": <span class="text-amber-300 font-bold">"admin"</span>, "pass": <span class="text-amber-300 font-bold">"admin"</span> } <span class="text-slate-500 text-[9.5px]">← Both!</span></div>
        <div>• <span class="text-amber-300">Req 2:</span> { "user": <span class="text-amber-300 font-bold">"root"</span>,  "pass": <span class="text-amber-300 font-bold">"root"</span> } <span class="text-slate-500 text-[9.5px]">← Both!</span></div>
        <div>• <span class="text-amber-300">Req 3:</span> { "user": <span class="text-amber-300 font-bold">"guest"</span>, "pass": <span class="text-amber-300 font-bold">"guest"</span> } <span class="text-slate-500 text-[9.5px]">← Both!</span></div>
      </div>
      <div class="pt-1 mt-1 border-t border-slate-800 text-[10px] text-amber-300 font-medium">
        📊 Math: 1 × 3 words = <strong>3 total requests</strong>
      </div>
    </div>
  </div>
  <div class="mt-1 pt-1 border-t border-amber-500/30 text-[10.5px] text-amber-300">
    🦹 <strong>Best for:</strong> Default credentials (user = password) or CSRF token reflection checks.
  </div>
</div>

</div>

<div class="slide-card py-1 px-3 flex items-center justify-between text-xs mt-1.5 border border-purple-500/40 bg-slate-900/70 rounded-lg">
  <span class="text-[11.5px] text-purple-200">💡 <strong>Single-List Rule:</strong> <strong>Sniper</strong> isolates 1 parameter at a time; <strong>Battering Ram</strong> forces identical twin values into all parameters.</span>
  <span class="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">1-List Modes</span>
</div>

<!--
Presenter Notes:
- Both Sniper and Battering Ram use only 1 single payload list.
- Sniper: The bread and butter of API fuzzing. If an endpoint crashes on Req 1, you know 'amount' was the culprit because 'fee' was untouched.
- Battering Ram: Useful when two parameters need to match, such as testing weak default accounts (admin/admin, root/root) or checking if an anti-CSRF token in the body must match a header.
-->

---
class: pt-1.5 pb-1 px-8
---

# 🔱 Intruder Modes — Pitchfork vs. Cluster Bomb

<h3 class="text-slate-300 text-xs mb-1.5 -mt-1.5">Multiple Payload Lists: Lockstep Pairs vs. Trying Every Possible Combination (ELI5)</h3>

<div class="grid grid-cols-2 gap-3 flex-1">

<div class="slide-card p-3 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
        <span>🔱</span> 3. Pitchfork (Buddy Pairs)
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded whitespace-nowrap">2+ Lists • Paired</span>
    </div>
    <p class="text-[11.5px] text-slate-300 leading-snug mb-1">
      <strong>How it works:</strong> Walks lists <strong>hand-in-hand in parallel</strong>. Word #1 in List A pairs with Word #1 in List B. Items never cross or mix — strictly matching buddies!
    </p>
    <div class="bg-slate-950/80 border border-cyan-500/30 rounded p-2 font-mono text-[10.5px] leading-relaxed my-1">
      <div class="text-slate-400 text-[9.5px] pb-0.5 border-b border-slate-800 flex justify-between">
        <span>Template: POST /login { user, pass }</span>
        <span class="text-cyan-400">List A &amp; List B</span>
      </div>
      <div class="pt-1 space-y-0.5 text-slate-200">
        <div>• <span class="text-cyan-300">Req 1:</span> { "user": <span class="text-cyan-300 font-bold">"alice"</span>, "pass": <span class="text-cyan-300 font-bold">"alice123"</span> } <span class="text-slate-500 text-[9.5px]">← Pair 1</span></div>
        <div>• <span class="text-cyan-300">Req 2:</span> { "user": <span class="text-cyan-300 font-bold">"bob"</span>,   "pass": <span class="text-cyan-300 font-bold">"bob456"</span> }   <span class="text-slate-500 text-[9.5px]">← Pair 2</span></div>
        <div class="text-slate-500 text-[9.5px] italic">(Stops when the shortest list runs out!)</div>
      </div>
      <div class="pt-1 mt-1 border-t border-slate-800 text-[10px] text-cyan-300 font-medium">
        📊 Math: Min(|A|, |B|) = <strong>2 total requests</strong>
      </div>
    </div>
  </div>
  <div class="mt-1 pt-1 border-t border-cyan-500/30 text-[10.5px] text-cyan-300">
    🔱 <strong>Best for:</strong> Testing known pairs: username + password, or User ID + matched Auth Token (IDOR).
  </div>
</div>

<div class="slide-card p-3 border border-rose-500/40 bg-rose-950/20 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-xs flex items-center gap-1.5">
        <span>💣</span> 4. Cluster Bomb (Every Combo)
      </span>
      <span class="text-[10px] font-mono text-rose-300 bg-rose-900/50 px-2 py-0.5 rounded whitespace-nowrap">2+ Lists • Combos</span>
    </div>
    <p class="text-[11.5px] text-slate-300 leading-snug mb-1">
      <strong>How it works:</strong> Tries <strong>every word in List A with every word in List B</strong>. Like spinning all dials on a bike lock to crack every possible combination!
    </p>
    <div class="bg-slate-950/80 border border-rose-500/30 rounded p-2 font-mono text-[10.5px] leading-relaxed my-1">
      <div class="text-slate-400 text-[9.5px] pb-0.5 border-b border-slate-800 flex justify-between">
        <span>Template: POST /login { user, pass }</span>
        <span class="text-rose-400">List A × List B</span>
      </div>
      <div class="pt-1 space-y-0.5 text-slate-200">
        <div>• <span class="text-rose-300">Req 1:</span> { "user": <span class="text-cyan-300">"alice"</span>, "pass": <span class="text-amber-300">"1234"</span> }</div>
        <div>• <span class="text-rose-300">Req 2:</span> { "user": <span class="text-cyan-300">"alice"</span>, "pass": <span class="text-amber-300">"password"</span> }</div>
        <div>• <span class="text-rose-300">Req 3:</span> { "user": <span class="text-cyan-300">"bob"</span>,   "pass": <span class="text-amber-300">"1234"</span> }</div>
        <div>• <span class="text-rose-300">Req 4:</span> { "user": <span class="text-cyan-300">"bob"</span>,   "pass": <span class="text-amber-300">"password"</span> }</div>
      </div>
      <div class="pt-1 mt-1 border-t border-slate-800 text-[10px] text-rose-300 font-medium">
        📊 Math: |A| × |B| = 2 × 2 = <strong>4 requests</strong> (10 × 100 = 1,000!)
      </div>
    </div>
  </div>
  <div class="mt-1 pt-1 border-t border-rose-500/30 text-[10.5px] text-rose-300">
    💣 <strong>Best for:</strong> Credential spraying against usernames or multi-variable permutation testing.
  </div>
</div>

</div>

<div class="slide-card py-1 px-3 flex items-center justify-between text-xs mt-1.5 border border-cyan-500/40 bg-slate-900/70 rounded-lg">
  <span class="text-[11.5px] text-cyan-200">💡 <strong>Multi-List Rule:</strong> <strong>Pitchfork</strong> tests paired datasets in parallel; <strong>Cluster Bomb</strong> exhaustively tests every combination.</span>
  <span class="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">Multi-List Modes</span>
</div>

<!--
Presenter Notes:
- Pitchfork and Cluster Bomb both take multiple payload lists (one list per marked position).
- Pitchfork: Advances simultaneously. If you have 50 test users with their 50 respective passwords or tokens, you get 50 requests.
- Cluster Bomb: Warning on large lists! If you have 50 users and 50 passwords, you get 50 x 50 = 2,500 requests. Great for brute forcing or testing permutation matrices.
-->

---

# ⚙️ Match & Replace Rules: Automated Transformation

### Zero-Click Automated Header & Payload Manipulation

<div class="multi-col-grid-2 gap-3 mb-1.5">

<div class="col-card p-2.5 space-y-1.5 bg-slate-900/60 border-cyan-500/40">
  <h3 class="text-cyan-400 text-sm mb-0.5">🛠️ What is Match &amp; Replace?</h3>
  <p class="text-slate-300 text-xs leading-relaxed">
    Built into Burp Proxy Settings. Automatically applies regex find-and-replace rules across all passing traffic <strong>without pausing the interceptor</strong>.
  </p>
  <ul class="space-y-1 text-slate-200 text-xs">
    <li>• <strong>Header Injection</strong>: Auto-inject <code>Mock-Scenario</code> or <code>Authorization</code> into every outbound request.</li>
    <li>• <strong>Host Redirection</strong>: Transparently redirect staging URLs to localhost.</li>
    <li>• <strong>Feature Flag Flipping</strong>: Mutate boolean flags in inbound response JSON.</li>
  </ul>
</div>

<div class="col-card p-2.5 space-y-1.5 bg-slate-900/60 border-emerald-500/40">
  <h3 class="text-emerald-400 text-sm mb-0.5">📋 Example Match &amp; Replace Rule</h3>
  <div class="bg-slate-950/90 rounded p-2 border border-emerald-500/30 font-mono text-[11px] text-emerald-200">
    <div><strong>Item Type</strong>: Request header</div>
    <div><strong>Match</strong>: <code>^User-Agent:.*$</code></div>
    <div><strong>Replace</strong>: <code>Mock-Scenario: TRANSFER:FAIL</code></div>
    <div><strong>Comment</strong>: Auto-steer transfer failure</div>
  </div>
  <p class="text-emerald-300/80 text-[11px] leading-tight mt-auto">
    Any test suite running through the proxy will automatically execute failure paths without script edits.
  </p>
</div>

</div>

<div class="slide-card text-xs bg-slate-900/70 border-cyan-500/50 p-2 flex items-center gap-2 shadow-lg">
  <span class="text-base">💡</span>
  <span class="text-slate-200 leading-snug"><strong>Automated CI Integration</strong>: Configure Match &amp; Replace rules once, and your existing Playwright/Selenium suites seamlessly run against targeted failure scenarios!</span>
</div>

---
class: pt-2 pb-2 px-8
---

# 🔤 Burp Suite — Decoder: Multi-Layer Payload Transformation

<h3 class="text-slate-300 text-sm mb-1.5">Bi-Directional Encoding, Decoding, Hashing &amp; JWT Token Inspection</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="slide-card p-2.5 border border-indigo-500/40 bg-indigo-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-indigo-500/30">
      <span class="text-indigo-300 font-bold text-sm flex items-center gap-1.5">
        <span>🔤</span> Multi-Layer Transform Lab
      </span>
      <span class="text-[11px] font-mono text-indigo-300/80 bg-indigo-900/40 px-2 py-0.5 rounded">Decoder Tab</span>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li>• <strong>Format Conversions:</strong> Convert URL, HTML, Base64, Hex, ASCII, and Gzip data.</li>
      <li>• <strong>Chained Transforms:</strong> Apply chained steps (URL-decode ➔ Base64-decode ➔ JSON unpack).</li>
      <li>• <strong>Cryptographic Hashes:</strong> Compute MD5, SHA-256, and HMAC signatures on payloads.</li>
      <li>• <strong>JWT Inspector:</strong> Parse auth tokens and mutate claims for privilege escalation probes.</li>
    </ul>
  </div>
  <div class="mt-1.5 pt-1 border-t border-indigo-500/30 text-[11px] text-indigo-300 font-mono">
    ⚡ Essential for inspecting binary tokens &amp; serialized microservice states.
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-sm flex items-center gap-1.5">
        <span>🔍</span> Practical JWT Inspection &amp; Tamper
      </span>
      <span class="text-[11px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded">Base64URL</span>
    </div>

```json
// Raw In-Flight Bearer Token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTAwMSIs...

// Decoded Claims in Burp Decoder:
{
  "sub": "user-001",
  "role": "CUSTOMER",        // <-- Tamper to "ADMIN"
  "scope": ["transfer:read"] // <-- Add "transfer:write"
}
```

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-[11px] text-slate-300 font-mono">
    ➔ Re-encode as Base64URL and paste back into Repeater!
  </div>
</div>

</div>

<div class="slide-card text-xs mt-1.5 p-1.5 bg-slate-900/70 border-indigo-500/40 flex items-center justify-between">
  <span class="text-slate-200">💡 <strong>Security Verification:</strong> Validate that backend gateways verify signatures and reject tampered tokens with <code>401 Unauthorized</code>.</span>
  <span class="text-indigo-300 font-mono text-[10px] bg-indigo-950/60 px-2 py-0.5 rounded">JWT Verification</span>
</div>

---
class: pt-2 pb-2 px-8
---

# ⚖️ Burp Suite — Comparer: Visual Response Diffing

<h3 class="text-slate-300 text-sm mb-1.5">Side-by-Side Word &amp; Byte Level Diffs to Isolate Subtle State Variations</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="slide-card p-2.5 border border-teal-500/40 bg-teal-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-teal-500/30">
      <span class="text-teal-300 font-bold text-sm flex items-center gap-1.5">
        <span>⚖️</span> Precision Visual Comparison
      </span>
      <span class="text-[11px] font-mono text-teal-300/80 bg-teal-900/40 px-2 py-0.5 rounded">Comparer Tab</span>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li>• <strong>Any-to-Any Diffing:</strong> Send any two requests or responses from Proxy, Logger, or Repeater to Comparer.</li>
      <li>• <strong>Dual Comparison Modes:</strong>
        <br/>- <em>Words:</em> Compares JSON structure, keys, and error messages.
        <br/>- <em>Bytes:</em> Pinpoints binary variations and subtle encoding shifts.</li>
      <li>• <strong>Color-Coded Analysis:</strong> Modified text (orange), deleted (blue), added (yellow).</li>
    </ul>
  </div>
  <div class="mt-1.5 pt-1 border-t border-teal-500/30 text-[11px] text-teal-300 font-mono">
    ⚡ Instantly isolates regressions between microservice versions.
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-sm flex items-center gap-1.5">
        <span>🔍</span> Comparing 200 OK vs 403 Forbidden
      </span>
      <span class="text-[11px] font-mono text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded">Word Diff</span>
    </div>

```diff
- HTTP/1.1 200 OK
- {"status": "SUCCESS", "txId": "TX-101"}
+ HTTP/1.1 403 Forbidden
+ {"status": "BLOCKED", "code": "FRAUD_ALERT"}
```

```text
Headers Diff:
- X-RateLimit-Remaining: 49
+ X-RateLimit-Remaining: 0 | Retry-After: 300
```

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-[11px] text-slate-300 font-mono">
    🎯 Quickly spots missing headers, unexpected status codes &amp; body diffs.
  </div>
</div>

</div>

<div class="slide-card text-xs mt-1.5 p-1.5 bg-slate-900/70 border-teal-500/40 flex items-center justify-between">
  <span class="text-slate-200">💡 <strong>Regression Testing:</strong> Diff responses across staging vs local test containers to verify contract parity before merging PRs.</span>
  <span class="text-teal-300 font-mono text-[10px] bg-teal-950/60 px-2 py-0.5 rounded">Parity Audit</span>
</div>

---
class: pt-2 pb-2 px-8
---

# 🎲 Burp Suite — Sequencer &amp; Extensibility (BApp)

<h3 class="text-slate-300 text-sm mb-1.5">Token Entropy Analysis &amp; Custom Test Automation with Extensions</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="slide-card p-3 border border-pink-500/40 bg-pink-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-pink-500/30">
      <span class="text-pink-300 font-bold text-sm flex items-center gap-1.5">
        <span>🎲</span> Sequencer: Token Entropy
      </span>
      <span class="text-[11px] font-mono text-pink-300/80 bg-pink-900/40 px-2 py-0.5 rounded">Statistical Test</span>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li>• <strong>Entropy Testing:</strong> Harvests sample tokens (session cookies, CSRF tokens, OTPs) across 1,000+ sequential requests.</li>
      <li>• <strong>Randomness Evaluation:</strong> Performs FIPS 140-2 statistical tests to verify unpredictable randomness.</li>
      <li>• <strong>Banking Security:</strong> Asserts that OTP codes or transaction IDs cannot be guessed by malicious actors.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-pink-500/30 text-[10px] text-pink-300 font-mono">
    📊 Measures effective entropy bits against predictability.
  </div>
</div>

<div class="slide-card p-3 border border-orange-500/40 bg-orange-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-orange-500/30">
      <span class="text-orange-300 font-bold text-sm flex items-center gap-1.5">
        <span>🧩</span> Extensions: BApp Store &amp; APIs
      </span>
      <span class="text-[11px] font-mono text-orange-300/80 bg-orange-900/40 px-2 py-0.5 rounded">Extender</span>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li>• <strong>BApp Store:</strong> 1-click install community plugins (e.g. <em>OpenAPI Parser</em>, <em>Autorize</em>, <em>JSON Web Tokens</em>).</li>
      <li>• <strong>Montoya API / Python:</strong> Author custom scripts to auto-sign requests with HMAC keys or export test traffic directly to Playwright specs.</li>
      <li>• <strong>CI/CD Integration:</strong> Headless Burp extensions to export JUnit reports.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-orange-500/30 text-[10px] text-orange-300 font-mono">
    🧩 Extensible in Python, Java, Kotlin &amp; Ruby.
  </div>
</div>

</div>

<div class="slide-card text-xs mt-2 p-1.5 bg-slate-900/70 border-slate-700/60 flex items-center justify-between">
  <span class="text-slate-200">💡 <strong>Synergy:</strong> Combine Burp extensions with WireMock stubs for fully automated end-to-end chaos pipelines.</span>
  <span class="text-amber-400 font-mono text-[10px] bg-amber-950/60 px-2 py-0.5 rounded">Ecosystem Power</span>
</div>

---
class: pt-2 pb-2 px-8
---

# 🛡️ Burp CA Certificate Setup — macOS

<h3 class="text-slate-300 text-sm mb-1.5">Keychain Access Trust, Terminal CLI One-Liner & Loopback Proxy Bypass</h3>

<div class="grid grid-cols-2 gap-3 mt-1.5 flex-1">

<div class="slide-card p-3 border border-sky-500/40 bg-sky-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-sky-500/30">
      <span class="text-sky-300 font-bold text-sm flex items-center gap-1.5">
        <span>🍏</span> 1. Keychain Access (GUI Setup)
      </span>
      <span class="text-[11px] font-mono text-sky-300/80 bg-sky-900/40 px-2 py-0.5 rounded">Always Trust</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong>Export Cert:</strong> In Burp ➔ <strong>Proxy settings ➔ Import / Export CA certificate</strong> ➔ Export in DER format as <code>cacert.der</code>.</li>
      <li>• <strong>Import to Keychain:</strong> Open <strong>Keychain Access.app</strong> ➔ Select <strong>System</strong> keychain ➔ Drag &amp; drop <code>cacert.der</code>.</li>
      <li>• <strong>Set Always Trust:</strong> Double-click <strong>PortSwigger CA</strong> ➔ Expand <strong>Trust</strong> ➔ Set <em>When using this certificate</em> to <strong>Always Trust</strong>.</li>
      <li>• Close window and enter your macOS administrator password.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-sky-500/30 text-xs text-sky-300 font-mono">
    ✅ Instantly trusted by Safari, Chrome, Electron &amp; native macOS tools.
  </div>
</div>

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-sm flex items-center gap-1.5">
        <span>⚡</span> 2. CLI Automation &amp; Hosts Bypass
      </span>
      <span class="text-[11px] font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded">Terminal / CI</span>
    </div>

```bash
# 1. Install & trust root CA via security CLI
sudo security add-trusted-cert -d -r trustRoot \
  -k /Library/Keychains/System.keychain cacert.der

# 2. Fix macOS 'localhost' loopback proxy bypass:
echo "127.0.0.1 localhost.com" | sudo tee -a /etc/hosts

# 3. Test HTTPS proxy routing cleanly:
curl -x http://127.0.0.1:8080 -s https://localhost.com:8443
```

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-xs font-mono text-slate-300">
    ⚡ Fully scriptable for developer workstations and macOS CI runners.
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1.5 border border-sky-500/30 bg-slate-900/60 rounded-lg">
  <div class="text-sky-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Verify via CLI:</strong> Check trust in terminal: <code>security find-certificate -c "PortSwigger CA" -p /Library/Keychains/System.keychain</code>.</span>
  </div>
  <span class="text-[11px] font-mono text-sky-300 bg-sky-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Security CLI</span>
</div>

<!--
Presenter Notes:
- Emphasize the importance of selecting 'System' keychain rather than 'login' if running service background daemons.
- Remind participants that macOS ignores proxies for 'localhost' by default; localhost.com in /etc/hosts is required.
-->

---
class: pt-2 pb-1 px-8
---

# 🛡️ Burp CA Certificate Setup — Windows

<h3 class="text-slate-300 text-sm mb-1.5">Certificate Import Wizard, PowerShell Automation & Enterprise Browser Stores</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="slide-card p-2.5 border border-blue-500/40 bg-blue-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-blue-500/30">
      <span class="text-blue-300 font-bold text-sm flex items-center gap-1.5">
        <span>🪟</span> 1. Certificate Import Wizard (GUI)
      </span>
      <span class="text-[11px] font-mono text-blue-300/80 bg-blue-900/40 px-2 py-0.5 rounded">certmgr.msc</span>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li>• <strong>Download:</strong> Open <code>http://burpsuite</code> in browser ➔ save <code>cacert.der</code>.</li>
      <li>• <strong>Import Wizard:</strong> Double-click <code>cacert.der</code> ➔ <strong>Install Certificate...</strong> ➔ select <strong>Local Machine</strong>.</li>
      <li>• <strong>Root Store (Crucial):</strong> Choose <em>Place all certificates in store</em> ➔ Browse ➔ select <strong>Trusted Root Certification Authorities</strong> ➔ Finish.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-blue-500/30 text-xs text-blue-300 font-mono">
    ✅ Instantly trusted by Microsoft Edge, Chrome &amp; .NET runtime.
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-sm flex items-center gap-1.5">
        <span>⚡</span> 2. PowerShell Administrator Automation
      </span>
      <span class="text-[11px] font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded">PowerShell 5+</span>
    </div>

```powershell
# 1. Import cert to LocalMachine Root store
Import-Certificate -FilePath .\cacert.der `
  -CertStoreLocation Cert:\LocalMachine\Root

# 2. Verify: Get-ChildItem Cert:\LocalMachine\Root
```

  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-xs font-mono text-slate-300">
    🚀 Fully automated deployment for Windows test environments.
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1.5 border border-blue-500/30 bg-slate-900/60 rounded-lg">
  <div class="text-blue-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Firefox Store Note:</strong> Firefox uses its own certificate store by default. In <code>about:config</code>, set <code>security.enterprise_roots.enabled = true</code> to trust the Windows Root Store.</span>
  </div>
  <span class="text-[11px] font-mono text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">about:config</span>
</div>

<!--
Presenter Notes:
- Walk Windows users through selecting "Trusted Root Certification Authorities" specifically; automatic store selection places it in Intermediate CAs where it will not work.
- Note Firefox's separate certificate store setting (security.enterprise_roots.enabled).
-->

---
class: pt-2 pb-2 px-8
---

# 🛡️ Burp CA Certificate Setup — iOS

<h3 class="text-slate-300 text-sm mb-1.5">Trusting PortSwigger Root CA on iPhone, iPad & iOS Simulator</h3>

<div class="grid grid-cols-2 gap-3 mt-1.5 flex-1">

<div class="slide-card p-3 border border-indigo-500/40 bg-indigo-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-indigo-500/30">
      <span class="text-indigo-300 font-bold text-sm flex items-center gap-1.5">
        <span>📱</span> 1. Real Device (iPhone / iPad)
      </span>
      <span class="text-[11px] font-mono text-indigo-300/80 bg-indigo-900/40 px-2 py-0.5 rounded">Safari Only</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong>Download Profile:</strong> Configure proxy to <code>:8080</code>, open <strong>Safari</strong>, go to <code>http://burpsuite</code> ➔ tap <strong>CA Certificate</strong>.</li>
      <li>• <strong>Install Profile:</strong> Open <strong>Settings ➔ Profile Downloaded</strong> ➔ Tap <strong>Install</strong> ➔ enter device passcode.</li>
      <li>• <strong>Enable Full Trust (Crucial):</strong> Go to <strong>Settings ➔ General ➔ About ➔ Certificate Trust Settings</strong>.</li>
      <li>• Under <em>Enable full trust for root certificates</em>, toggle <strong>PortSwigger CA</strong> to <strong>ON</strong>.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-indigo-500/30 text-xs text-indigo-300 font-mono">
    ⚠️ Must toggle in About, or apps reject TLS with NSURLErrorServerCertificateUntrusted.
  </div>
</div>

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-sm flex items-center gap-1.5">
        <span>⚡</span> 2. iOS Simulator & Automation
      </span>
      <span class="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded">xcrun simctl</span>
    </div>

```bash
# 1. Direct drag-and-drop:
# Drag cacert.der into running Simulator window

# 2. Or install via CLI automation:
xcrun simctl keychain booted add-root-cert cacert.der

# 3. Verify simulator trust status:
xcrun simctl keychain booted status
```

<p class="text-[11px] text-slate-300 mt-1 leading-snug m-0">Works out-of-the-box for Swift, Objective-C, React Native, and Flutter iOS builds.</p>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-xs font-mono text-slate-300">
    ✨ Ready for native iOS app &amp; Safari MITM testing!
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1.5 border border-amber-500/40 bg-slate-900/70 rounded-lg">
  <div class="text-amber-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Safari Rule:</strong> Always download via <strong>Safari</strong> — iOS blocks Chrome from triggering configuration profile installers.</span>
  </div>
  <span class="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">iOS 10+ Trust Policy</span>
</div>

<!--
Presenter Notes:
- Emphasize the Certificate Trust Settings step: 90% of students forget to toggle trust in Settings > General > About.
- Show how xcrun simctl enables one-click root CA injection on macOS development machines for local simulators.
-->

---
class: pt-2 pb-1 px-8
---

# 🛡️ Burp CA Certificate Setup — Android

<h3 class="text-slate-300 text-sm mb-1.5">User Certificate Store, Network Security Config & Emulator Root Injection</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="slide-card p-2.5 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-sm flex items-center gap-1.5">
        <span>🤖</span> 1. Device Store & App Security Config
      </span>
      <span class="text-[11px] font-mono text-emerald-300/80 bg-emerald-900/40 px-2 py-0.5 rounded">API 24+</span>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li>• <strong>Export Cert:</strong> Rename <code>cacert.der</code> ➔ <code>cacert.crt</code> (Android requires <code>.crt</code>).</li>
      <li>• <strong>Install CA Cert:</strong> <strong>Settings ➔ Security ➔ Encryption &amp; credentials ➔ Install CA certificate</strong>.</li>
      <li>• <strong>App Trust (Android 7.0+):</strong> Modern apps ignore user certs. Add to <code>res/xml/network_security_config.xml</code>:</li>
    </ul>

```xml
<network-security-config>
  <base-config><trust-anchors>
    <certificates src="user" /><certificates src="system" />
  </trust-anchors></base-config>
</network-security-config>
```

  </div>
  <div class="mt-1 pt-1 border-t border-emerald-500/30 text-[11px] text-emerald-300 font-mono">
    📁 In AndroidManifest.xml: android:networkSecurityConfig="@xml/..."
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-sm flex items-center gap-1.5">
        <span>⚡</span> 2. Emulator System Root (No App Code Changes)
      </span>
      <span class="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">adb root</span>
    </div>

```bash
# 1. Compute subject hash & convert to PEM
HASH=$(openssl x509 -inform DER -in cacert.der \
  -subject_hash_old | head -n 1)
openssl x509 -inform DER -in cacert.der -out ${HASH}.0

# 2. Push directly to Android system CA store
adb root && adb remount
adb push ${HASH}.0 /system/etc/security/cacerts/
adb shell chmod 644 /system/etc/security/cacerts/${HASH}.0
```

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-xs font-mono text-slate-300">
    🛡️ Treated as a trusted system CA: works on ALL apps without rebuilding!
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1.5 border border-emerald-500/30 bg-slate-900/60 rounded-lg">
  <div class="text-emerald-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>SSL Pinning Bypass:</strong> If third-party APKs enforce certificate pinning (OkHttp CertificatePinner), use <code>objection --gadget com.app explore</code> to disable pinning at runtime.</span>
  </div>
  <span class="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Frida / Objection</span>
</div>

<!--
Presenter Notes:
- Explain Android 7.0 (Nougat) breaking change: apps stopped trusting user-installed CA certificates by default.
- Highlight the emulator trick: pushing directly to /system/etc/security/cacerts/ turns Burp CA into a system root, bypassing app-level restrictions.
-->

---
class: pt-1.5 pb-1 px-8
---

# 📱 Mobile SSL Pinning — What It Is & Why It Breaks Proxies

<h3 class="text-slate-300 text-xs mb-1.5">Hardcoded SPKI Public Key Hashes vs. Operating System Trust Store Delegation</h3>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mb-2 border border-sky-500/40 bg-sky-950/25 rounded-lg">
  <div class="text-sky-200 font-medium leading-snug flex items-center gap-2">
    <span>📌</span>
    <span><strong>What is SSL Pinning?</strong> A security mechanism where mobile apps <strong>hardcode (pin) the server's public key (SPKI)</strong> inside the binary, deliberately bypassing the OS root store to stop Man-in-the-Middle attacks.</span>
  </div>
  <span class="text-[11px] font-mono text-sky-300 bg-sky-900/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Client-Side Pin</span>
</div>

<div class="grid grid-cols-2 gap-3.5 flex-1">

<div class="col-card p-2.5 border border-indigo-500/40 bg-slate-900/60 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-indigo-500/30">
      <span class="text-indigo-300 font-bold text-xs flex items-center gap-1.5">
        <span>🌐</span> 1. Standard HTTPS (OS Delegation)
      </span>
      <span class="text-[10px] font-mono text-indigo-300 bg-indigo-950/60 px-1.5 py-0.2 rounded">OS Store</span>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li>• <strong>OS Trust Store:</strong> Apps delegate certificate validation to root CAs installed in device system settings.</li>
      <li>• <strong>Burp Works:</strong> Installing PortSwigger CA allows Burp to forge leaf certs that the app accepts without error.</li>
      <li>• <strong>Risk:</strong> Any rogue root CA or malicious device profile can silently intercept in-flight traffic.</li>
    </ul>
  </div>
  <div class="mt-1 pt-0.5 border-t border-indigo-500/30 text-[11px] text-indigo-300 font-mono">
    ✅ Burp CA in OS store succeeds for unpinned apps.
  </div>
</div>

<div class="col-card p-2.5 border border-rose-500/40 bg-slate-900/60 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-xs flex items-center gap-1.5">
        <span>🛑</span> 2. SSL Pinned (App-Level Guard)
      </span>
      <span class="text-[10px] font-mono text-rose-300 bg-rose-950/60 px-1.5 py-0.2 rounded">SPKI Hash</span>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li>• <strong>Hardcoded SPKI Hash:</strong> Production apps compile the server's public key SHA-256 hash into the binary.</li>
      <li>• <strong>Burp Blocked:</strong> Even though the OS trusts Burp, the dynamic leaf key has the wrong hash!</li>
      <li>• <strong>Fatal Handshake Error:</strong> App aborts with <code>SSLHandshakeException</code> before sending data.</li>
    </ul>
  </div>
  <div class="mt-1 pt-0.5 border-t border-rose-500/30 text-[11px] text-rose-300 font-mono">
    ❌ App actively blocks MITM proxy inspection.
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1.5 border border-amber-500/40 bg-slate-900/70 rounded-lg">
  <div class="text-amber-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>The Testing Dilemma:</strong> Crucial for mobile banking defense, but completely blinds QA &amp; automation suites unless bypassed in staging builds.</span>
  </div>
  <span class="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Testing Crisis</span>
</div>

<!--
Presenter Notes:
- Contrast OS Root CA Trust with Application-Level SSL Pinning: Root CA satisfies the operating system, but pinned apps hardcode the server's SPKI public key hash.
- Explain why banking and production apps pin: Defends against rogue or compromised CAs and hostile Wi-Fi routers in public venues.
- Frame the testing dilemma: QA and developers need to inspect and steer traffic in staging, but cannot afford to weaken production security.
-->

---
class: pt-1.5 pb-1 px-8
---

# 🤖 Mobile SSL Pinning — Android White-Box Setup

<h3 class="text-slate-300 text-xs mb-1">res/xml/network_security_config.xml — Enabling Staging Proxying with Zero Production Risk</h3>

<div class="col-card p-2.5 border border-emerald-500/40 bg-slate-900/60 flex flex-col justify-between rounded-lg flex-1">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-sm flex items-center gap-1.5">
        <span>🏗️</span> Android Network Security Configuration (Android 7.0+ / API 24+)
      </span>
      <span class="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded">Config as Code</span>
    </div>
    <div class="bg-slate-950/90 border border-slate-700/80 rounded px-3 py-2 font-mono text-xs text-slate-200 leading-snug space-y-0.5 mb-2">
      <div class="text-cyan-300 font-semibold">// res/xml/network_security_config.xml</div>
      <div class="text-slate-400">&lt;network-security-config&gt;</div>
      <div class="text-emerald-300 pl-3">&lt;debug-overrides&gt;</div>
      <div class="text-slate-400 pl-6">&lt;!-- Staging &amp; QA only: Trust user-installed PortSwigger CA --&gt;</div>
      <div class="text-emerald-300 pl-6">&lt;trust-anchors&gt;&lt;certificates src="user" /&gt;&lt;/trust-anchors&gt;</div>
      <div class="text-emerald-300 pl-3">&lt;/debug-overrides&gt;</div>
      <div class="text-slate-400">&lt;/network-security-config&gt;</div>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-200 leading-snug mt-1">
      <li>• <strong class="text-emerald-300">AndroidManifest.xml:</strong> Link config via <code>android:networkSecurityConfig="@xml/network_security_config"</code> in <code>&lt;application&gt;</code>.</li>
      <li>• <strong class="text-emerald-300">Automated Guardrail:</strong> Production builds compile with <code>debuggable="false"</code>, automatically ignoring <code>&lt;debug-overrides&gt;</code>.</li>
      <li>• <strong class="text-emerald-300">Physical &amp; Emulators:</strong> Intercepts staging traffic on standard unrooted physical test phones and emulators.</li>
    </ul>
  </div>
</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1 border border-emerald-500/40 bg-slate-900/70 rounded-lg">
  <div class="text-emerald-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Android Best Practice:</strong> Never tamper with <code>&lt;base-config&gt;</code>. Using <code>&lt;debug-overrides&gt;</code> guarantees production builds remain 100% hermetically pinned.</span>
  </div>
  <span class="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Safe by Default</span>
</div>

<!--
Presenter Notes:
- Explain Android Network Security Config: Introduced in Android 7 (API 24) to stop apps from trusting user certs by default.
- Show why debug-overrides is the clean architectural solution: The OS only activates debug-overrides when debuggable="true".
- Reassure teams that standard Google Play release builds automatically compile with debuggable="false", preserving pinning.
-->

---
class: pt-1.5 pb-1 px-8
---

# 🍎 Mobile SSL Pinning — iOS White-Box Setup

<h3 class="text-slate-300 text-xs mb-1">Build Schemes &amp; URLSessionDelegate — Safe Staging Inspection Without Production Debt</h3>

<div class="col-card p-2.5 border border-cyan-500/40 bg-slate-900/60 flex flex-col justify-between rounded-lg flex-1">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
        <span>🍏</span> Conditional URLSession Pinning via Swift Compiler Directives
      </span>
      <span class="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded">Swift Scheme</span>
    </div>
    <div class="bg-slate-950/90 border border-slate-700/80 rounded px-3 py-2 font-mono text-xs text-slate-200 leading-snug space-y-0.5 mb-2">
      <div class="text-cyan-300 font-semibold">// NetworkManager.swift</div>
      <div class="text-amber-300 font-semibold">#if DEBUG || STAGING // Staging: Trust Burp Proxy</div>
      <div class="text-emerald-300 pl-3">let session = URLSession(configuration: .default)</div>
      <div class="text-amber-300 font-semibold">#else // Production: Enforce SPKI Public Key Pinning</div>
      <div class="text-cyan-300 pl-3">let session = URLSession(configuration: .default, delegate: PinnedDelegate(), delegateQueue: nil)</div>
      <div class="text-amber-300 font-semibold">#endif</div>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-200 leading-snug mt-1">
      <li>• <strong class="text-cyan-300">Xcode Build Schemes:</strong> Set <code>DEBUG</code> or <code>STAGING</code> in Project Build Settings ➔ Active Compilation Conditions.</li>
      <li>• <strong class="text-cyan-300">Compile-Time Safety:</strong> The Swift compiler completely excises bypass code from App Store release archives.</li>
      <li>• <strong class="text-cyan-300">Standard Hardware:</strong> Intercepts staging traffic cleanly on real iPhones, iPads, and iOS Simulators without jailbreaking.</li>
    </ul>
  </div>
</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1 border border-cyan-500/40 bg-slate-900/70 rounded-lg">
  <div class="text-cyan-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>iOS Clean Architecture:</strong> Encapsulate pinning logic inside the networking layer behind a protocol or factory so tests inject mock sessions cleanly.</span>
  </div>
  <span class="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Clean Code</span>
</div>

<!--
Presenter Notes:
- Explain iOS Pinning: Unlike Android's XML declaration, iOS pinning is implemented imperatively in Swift/Objective-C via URLSessionDelegate.
- Show how Swift conditional compilation (#if DEBUG || STAGING) completely excises the test branch from production binaries.
- Highlight the developer experience: QA can install internal TestFlight staging builds and intercept traffic immediately.
-->

---
class: pt-1 pb-1 px-8
---

# ⚡ SSL Pinning — Dynamic Hooking & Black-Box Bypass

<h3 class="text-slate-300 text-xs mb-1">Runtime Memory Instrumentation with Frida &amp; Objection for Penetration Testing</h3>

<div class="grid grid-cols-2 gap-3 mt-0.5 flex-1">

<div class="col-card p-2.5 border border-violet-500/40 bg-slate-900/60 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-violet-500/30">
      <span class="text-violet-300 font-bold text-sm flex items-center gap-1.5">
        <span>🧠</span> When &amp; How Dynamic Hooking Works
      </span>
      <span class="text-[11px] font-mono text-violet-300 bg-violet-950/60 px-2 py-0.5 rounded">Runtime RAM Patch</span>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li>• <strong>When Needed:</strong> Auditing third-party vendor SDKs, legacy binaries with no source code, or conducting black-box penetration tests.</li>
      <li>• <strong>Zero Recompilation:</strong> Avoids tampering with APK/IPA or breaking digital signatures; Frida injects JavaScript directly into RAM.</li>
      <li>• <strong>Method Interception:</strong> Hooks TLS validation functions (e.g. <code>TrustManagerImpl</code>) in memory and forces them to return <code>true</code>.</li>
    </ul>
  </div>
  <div class="mt-1 pt-0.5 border-t border-violet-500/30 text-xs text-violet-300 font-mono">
    🔓 For penetration testers &amp; security auditors.
  </div>
</div>

<div class="col-card p-2.5 border border-cyan-500/40 bg-slate-900/60 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
        <span>🛠️</span> Practical Tooling &amp; Commands
      </span>
      <span class="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded">Frida / Objection</span>
    </div>
    <div class="bg-slate-950/90 border border-slate-700/80 rounded px-2.5 py-1 font-mono text-[10px] text-slate-200 leading-snug space-y-0.5 mb-1">
      <div class="text-violet-300 font-semibold">Android (Frida RAM Hooking):</div>
      <div class="text-slate-400"># Hook TrustManagerImpl in memory via USB:</div>
      <div class="text-emerald-300">frida -U --codeshare akabe1/frida-multiple-unpinning -f app</div>
      <div class="text-amber-300 font-semibold pt-1 border-t border-slate-800">iOS (Objection Mobile Exploration):</div>
      <div class="text-slate-400"># Hook SecTrustEvaluate in Security framework:</div>
      <div class="text-cyan-300">objection --gadget "App" explore -s "ios sslpinning disable"</div>
    </div>
    <ul class="space-y-1 text-xs text-slate-300 leading-snug">
      <li>• <strong>System CA Injection:</strong> Push Burp CA to Android <code>/system/etc/security/cacerts/</code>.</li>
    </ul>
  </div>
  <div class="mt-1 pt-0.5 border-t border-cyan-500/30 text-xs text-cyan-300 font-mono">
    ⚡ Injects hooks into live process memory without binary edits.
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1 border border-violet-500/40 bg-slate-900/70 rounded-lg">
  <div class="text-violet-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Defense-in-Depth Takeaway:</strong> Client-side SSL pinning is a speed bump, not an impenetrable wall. Mobile APIs must always enforce zero-trust token validation and server authorization.</span>
  </div>
  <span class="text-[11px] font-mono text-violet-300 bg-violet-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Zero Trust</span>
</div>

<!--
Presenter Notes:
- Explain black-box testing: When teams must evaluate third-party vendor binaries or test pre-release builds without modifying code, dynamic instrumentation is required.
- Frida and Objection inject into the running process's memory space to hook TLS validation methods like TrustManagerImpl on Android and SecTrustEvaluate on iOS.
- Reiterate the core security lesson: Client-side controls can always be bypassed by a motivated attacker in memory; robust security must live on the server.
-->

---
class: pt-1.5 pb-1 px-8
---

# 🧪 Practice Lab: Proxy Setup & Verification

<h3 class="text-slate-300 text-xs mb-1.5 -mt-1.5">Configure Proxy Listener, Local Hostname Aliasing &amp; End-to-End Pipeline Verification</h3>

<div class="grid grid-cols-2 gap-3 flex-1">

<div class="slide-card p-3 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
        <span>🛠️</span> Step 1: Listener &amp; Host Alias
      </span>
      <span class="text-[10px] font-mono text-cyan-300 bg-cyan-900/50 px-2 py-0.5 rounded whitespace-nowrap">:8080 Listener</span>
    </div>
    <ul class="space-y-1.5 text-[11px] text-slate-300 leading-snug mb-1.5">
      <li>• <strong>Verify Listener:</strong> In Burp, go to <strong>Proxy ➔ Proxy settings</strong>. Ensure listener on <code>127.0.0.1:8080</code> is <strong>Running</strong>.</li>
      <li>• <strong>macOS Loopback Fix:</strong> macOS bypasses proxies for <code>localhost</code>. Map a loopback alias in <code>/etc/hosts</code>:</li>
    </ul>
    <div class="bg-slate-950/80 border border-cyan-500/30 rounded p-2 font-mono text-[10px] leading-relaxed my-1">
      <div class="text-slate-400 text-[9px] pb-0.5 border-b border-slate-800"># Add loopback alias to route through proxy:</div>
      <div class="text-cyan-300 pt-1">echo "127.0.0.1 localhost.com" | sudo tee -a /etc/hosts</div>
    </div>
  </div>
  <div class="mt-1 pt-1 border-t border-cyan-500/30 text-[10.5px] text-cyan-300">
    ⚡ <strong>Prerequisite Ready:</strong> Traffic to <code>localhost.com</code> now routes cleanly into Burp.
  </div>
</div>

<div class="slide-card p-3 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between rounded-lg">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
        <span>🧪</span> Step 2: Route &amp; Verify Traffic
      </span>
      <span class="text-[10px] font-mono text-emerald-300 bg-emerald-900/50 px-2 py-0.5 rounded whitespace-nowrap">Audit &amp; Check</span>
    </div>
    <p class="text-[11px] text-slate-300 leading-snug mb-1">
      Send a health check through the proxy or run the automated lab helper:
    </p>
    <div class="bg-slate-950/80 border border-emerald-500/30 rounded p-2 font-mono text-[10px] leading-relaxed my-1 space-y-1">
      <div>
        <div class="text-slate-400 text-[9px]"># Option A: Manual cURL with proxy flag</div>
        <div class="text-emerald-300">curl -s -x http://127.0.0.1:8080 http://localhost.com:8081/health</div>
      </div>
      <div>
        <div class="text-slate-400 text-[9px]"># Option B: Automated verification script</div>
        <div class="text-sky-300">bash labs/burp-suite/verify-proxy.sh</div>
      </div>
    </div>
  </div>
  <div class="mt-1 pt-1 border-t border-emerald-500/30 text-[10.5px] text-emerald-300">
    ✅ <strong>Assertion:</strong> Request appears in Burp's <strong>Proxy ➔ HTTP history</strong> with <code>200 OK</code>.
  </div>
</div>

</div>

<div class="slide-card py-1 px-3 flex items-center justify-between text-xs mt-1.5 border border-cyan-500/40 bg-slate-900/70 rounded-lg">
  <span class="text-[11.5px] text-cyan-200 truncate">💡 <strong>Pro-Tip:</strong> Set <code>export HTTP_PROXY=http://127.0.0.1:8080</code> to route entire terminal sessions, SDKs, or Playwright tests into Burp.</span>
  <span class="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-2">Terminal Proxy</span>
</div>

<!--
Presenter Notes:
- Walk participants through confirming that Burp Suite proxy listener on 127.0.0.1:8080 is running.
- Explain why the localhost alias is necessary on macOS (Darwin network stack ignores proxies for localhost/127.0.0.1).
- Run verify-proxy.sh and show students where the request appears in Burp's HTTP history tab.
- Bridge to next slide: Now that our proxy is verified, let's turn Intercept ON and mutate live packets mid-flight.
-->

---
class: pt-2 pb-2 px-8
---

# 🧪 Practice Lab: Live MITM Packet Interception

<h3 class="text-slate-300 text-xs mb-1">Tamper with live HTTP traffic mid-flight to steer downstream WireMock responses</h3>

<div class="grid grid-cols-2 gap-3 mt-1.5 flex-1">

<div class="slide-card p-3 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-sm flex items-center gap-1.5">
        <span>⚡</span> Step 1: Proxy Request
      </span>
      <span class="text-[11px] font-mono text-cyan-300/80 bg-cyan-900/40 px-2 py-0.5 rounded">:8080 MITM</span>
    </div>
    <p class="text-xs text-slate-300 mb-1.5 leading-snug">Toggle <strong>Intercept is ON</strong> in Burp Proxy, then send request:</p>
    <div class="bg-slate-950/90 border border-slate-700/80 rounded px-2.5 py-1.5 font-mono text-xs text-slate-200 leading-snug space-y-0.5 mb-1">
      <div class="text-cyan-300">curl -x http://127.0.0.1:8080 -s -X POST \</div>
      <div class="text-slate-300 pl-3">http://localhost.com:8081/api/v1/users \</div>
      <div class="text-slate-300 pl-3">-H "Content-Type: application/json" \</div>
      <div class="text-emerald-300 pl-3">-d '{"username":"student","password":"secret"}'</div>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-cyan-500/30 text-xs text-cyan-300 font-mono">
    ⏸️ Request pauses in Burp Suite Proxy tab
  </div>
</div>

<div class="slide-card p-3 border border-amber-500/40 bg-amber-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-amber-500/30">
      <span class="text-amber-300 font-bold text-sm flex items-center gap-1.5">
        <span>🔀</span> Step 2: Inject Steering Header
      </span>
      <span class="text-[11px] font-mono text-amber-300/80 bg-amber-900/40 px-2 py-0.5 rounded">Forward</span>
    </div>
    <p class="text-xs text-slate-300 mb-1.5 leading-snug">In Burp Proxy window, append header before clicking <strong>Forward</strong>:</p>
    <div class="bg-slate-950/90 border border-slate-700/80 rounded px-2.5 py-1.5 font-mono text-xs text-slate-200 leading-snug space-y-0.5 mb-1">
      <div class="text-slate-400">// Append steering header:</div>
      <div class="text-amber-300">Mock-Scenario: PAOTANG:SUCCESS,OTP:EXPIRED</div>
    </div>
    <p class="text-[11px] text-slate-300 mt-1 leading-snug">WireMock intercepts header and returns downstream expired OTP error.</p>
  </div>
  <div class="mt-2 pt-1 border-t border-amber-500/30 text-xs text-amber-300 font-mono">
    ✨ Client receives expired OTP without app code change!
  </div>
</div>

</div>

<div v-pre class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-2 border border-cyan-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-cyan-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Zero-Touch Steering:</strong> Inject mock scenarios and simulate third-party failure responses without code changes.
  </span>
  <span class="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">macOS: 127.0.0.1 localhost.com</span>
</div>

<!--
Presenter Notes:
- macOS Note: macOS network stack and browsers bypass proxying for 'localhost'. Map '127.0.0.1 localhost.com' in /etc/hosts to route traffic through Burp.
- Walk participants through setting up Burp proxy and executing the curl command with -x.
- Show how the downstream response changes dynamically based on the injected Mock-Scenario header.
-->

---
class: pt-2 pb-2 px-8
---

# 🎬 In-Flight Traffic Interception & Tampering

<h3 class="text-slate-300 text-xs mb-1">Live instructor walkthrough: Intercepting payloads and steering downstream failure states</h3>

<div class="grid grid-cols-2 gap-3.5 mt-1 flex-1">

<div class="slide-card p-3 border border-amber-500/40 bg-amber-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-amber-500/30">
      <span class="text-amber-400 font-bold text-sm flex items-center gap-1.5">
        <span>⚡</span> Walkthrough Steps
      </span>
      <span class="text-[11px] font-mono text-amber-300/80 bg-amber-900/40 px-2 py-0.5 rounded">Burp MITM</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong>1. Intercept Traffic:</strong> In Burp Suite Proxy tab, toggle <strong>Intercept is ON</strong> on port <code>:8080</code>.</li>
      <li>• <strong>2. Dispatch Request:</strong> Issue client cURL with <code>-x http://127.0.0.1:8080</code> to route through proxy.</li>
      <li>• <strong>3. Mutate In-Flight:</strong> Inspect packet in Burp, edit payload or append steering header in real time.</li>
      <li>• <strong>4. Forward &amp; Assert:</strong> Click <strong>Forward</strong>; verify downstream service reacts to tampered request.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-amber-500/30 text-xs font-mono text-amber-300">
    💡 Enables negative testing and security tampering without touching backend code.
  </div>
</div>

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-sm flex items-center gap-1.5">
        <span>🖥️</span> Live Terminal Commands
      </span>
      <span class="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Terminal / Proxy</span>
    </div>
    <div class="bg-slate-950/90 border border-slate-700/80 rounded px-2.5 py-1.5 font-mono text-xs text-slate-200 leading-snug space-y-0.5 mb-1">
      <div class="text-slate-400"># 1. Send outbound transfer through Burp Proxy</div>
      <div class="text-cyan-300">curl -x http://127.0.0.1:8080 -s -X POST \</div>
      <div class="text-slate-300 pl-3">http://localhost.com:8081/api/v1/transfers \</div>
      <div class="text-slate-300 pl-3">-H "Content-Type: application/json" \</div>
      <div class="text-emerald-300 pl-3">-d '{"fromAccount":"ACC-001","toAccount":"ACC-002","amount":100}'</div>
      <div class="text-slate-400 pt-0.5"># 2. In Burp: Intercept pauses the request</div>
      <div class="text-amber-300"># 3. Tamper amount ➔ 999999, inject header, click Forward</div>
      <div class="text-emerald-300"># 4. Observe downstream response in terminal</div>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-xs font-mono text-slate-300">
    ⚡ Client receives downstream response seamlessly
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1.5 border border-amber-500/40 bg-slate-900/70 rounded-lg">
  <div class="text-amber-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>Duplex Interception Control:</strong> Burp Suite holds the raw TCP socket open while you tamper with headers or payload data, completely transparent to both caller and receiver.</span>
  </div>
  <span class="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Duplex MITM</span>
</div>

<!--
Presenter Notes:
- Ensure Burp Suite Intercept is ON before running the curl command.
- Note for macOS: Ensure '127.0.0.1 localhost.com' is mapped in /etc/hosts.
- Show the paused request in Burp Proxy, highlight the headers and JSON payload.
- Edit the payload live and forward the request to show instant downstream reaction.
-->

---
class: pt-2 pb-2 px-8
---

# 🏆 Workshop: In-Flight Fraud Tampering

<h3 class="text-slate-300 text-xs mb-1">Tamper with transfer payload mid-flight and inject downstream fraud steering headers</h3>

<div class="grid grid-cols-2 gap-3.5 mt-1 flex-1">

<div class="slide-card p-3 border border-amber-500/40 bg-amber-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-amber-500/30">
      <span class="text-amber-400 font-bold text-sm flex items-center gap-1.5">
        <span>🎯</span> Workshop Challenge Rules
      </span>
      <span class="text-[11px] font-mono text-amber-300/80 bg-amber-900/40 px-2 py-0.5 rounded">Burp Proxy :8080</span>
    </div>
    <ul class="space-y-1.5 text-xs text-slate-300 leading-snug">
      <li>• <strong>Target Transaction:</strong> Intercept outbound <code>POST /api/v1/transfers</code> packet before it reaches the backend gateway.</li>
      <li>• <strong>Payload Mutation:</strong> Modify JSON body in transit from <code>"amount": 100</code> to <code>"amount": 999999</code>.</li>
      <li>• <strong>Header Injection:</strong> Inject <code>Mock-Scenario: TRANSFER:FRAUD_ALERT</code> into the HTTP headers.</li>
      <li>• <strong>Expected Verification:</strong> WireMock detects the tampered state and halts the transfer with <code>HTTP 403 Forbidden</code>.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-amber-500/30 text-xs font-mono text-amber-300">
    🛡️ Simulates malicious mobile client tampering &amp; gateway fraud defenses.
  </div>
</div>

<div class="slide-card p-3 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-sm flex items-center gap-1.5">
        <span>⚡</span> Verification Sequence
      </span>
      <span class="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Terminal / MITM</span>
    </div>
    <div class="bg-slate-950/90 border border-slate-700/80 rounded px-2.5 py-1.5 font-mono text-xs text-slate-200 leading-snug space-y-0.5 mb-1">
      <div class="text-slate-400"># 1. Send normal transfer through Burp Proxy</div>
      <div class="text-cyan-300">curl -x http://127.0.0.1:8080 -s -X POST \</div>
      <div class="text-slate-300 pl-3">http://localhost.com:8081/api/v1/transfers \</div>
      <div class="text-slate-300 pl-3">-H "Content-Type: application/json" \</div>
      <div class="text-emerald-300 pl-3">-d '{"fromAccount":"ACC-001","toAccount":"ACC-002","amount":100}'</div>
      <div class="text-slate-400 pt-0.5"># 2. In Burp Intercept: Tamper amount to 999999 &amp; inject header:</div>
      <div class="text-amber-300">Mock-Scenario: TRANSFER:FRAUD_ALERT</div>
      <div class="text-slate-400 pt-0.5"># 3. Forward request ➔ Assert HTTP 403 Forbidden</div>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-slate-700/60 text-xs font-mono text-slate-300">
    ⚡ No application code changes required!
  </div>
</div>

</div>

<div class="slide-card py-1.5 px-3 flex items-center justify-between text-xs mt-1.5 border border-amber-500/40 bg-slate-900/70 rounded-lg">
  <div class="text-amber-200 font-medium leading-snug flex items-center gap-2">
    <span>💡</span>
    <span><strong>MITM Tampering Verification:</strong> When the tampered amount triggers a downstream fraud rule, WireMock immediately rejects the transfer with <code>HTTP 403 Forbidden</code>.</span>
  </div>
  <span class="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded whitespace-nowrap ml-3">Security QA</span>
</div>

<!--
Presenter Notes:
- Challenge participants to intercept the transfer request in Burp Proxy.
- Observe how tampering with the amount and injecting the fraud scenario triggers an immediate 403 response.
- Bridge to Platform Setup: Now that we've seen Burp in action on localhost APIs, let's explore the platform setup playbook to trust Burp CA on iOS, Android, macOS, Windows, and handle Mobile SSL Pinning.
-->

---

# ⚡ Architectural Split: WireMock vs. Burp Suite

### Downstream Service Virtualization vs. In-Flight MITM Traffic Interception

<div class="grid grid-cols-2 gap-3 mt-1 text-sm">

<div class="slide-card p-3 border-emerald-500/40 bg-emerald-950/20 flex flex-col">
  <h3 class="text-emerald-400 font-bold mb-1.5 text-base flex items-center gap-1.5">
    <span>🪝</span> WireMock: Downstream Virtualization
  </h3>
  <ul class="space-y-1.5 text-slate-300 text-xs leading-relaxed flex-1">
    <li>• <strong>Placement</strong>: Downstream 3rd-party provider endpoint (replaces SMS, OAuth, Bank Core).</li>
    <li>• <strong>Mechanism</strong>: Standalone HTTP mock server receiving routed external calls.</li>
    <li>• <strong>Matching &amp; State</strong>: Declarative JSON stubs, JSONPath regex, Finite State Machines (FSM).</li>
    <li>• <strong>Best Used For</strong>: Automated CI/CD suites, deterministic contracts, chaos timeouts, webhooks.</li>
  </ul>
  <div class="mt-2 p-1.5 bg-emerald-950/60 rounded border border-emerald-500/30 text-[11px] text-emerald-200">
    🎯 <em>Core Question Answered</em>: "How does my system react when external APIs fail or return unusual payloads?"
  </div>
</div>

<div class="slide-card p-3 border-amber-500/40 bg-amber-950/20 flex flex-col">
  <h3 class="text-amber-400 font-bold mb-1.5 text-base flex items-center gap-1.5">
    <span>🛡️</span> Burp Suite: In-Flight MITM Proxy
  </h3>
  <ul class="space-y-1.5 text-slate-300 text-xs leading-relaxed flex-1">
    <li>• <strong>Placement</strong>: In-flight between Client (Browser/Mobile) and Backend Gateway (BFF).</li>
    <li>• <strong>Mechanism</strong>: Transparent Man-In-The-Middle socket proxy intercepting live HTTP traffic.</li>
    <li>• <strong>Interception &amp; Mutation</strong>: Live pause, payload tampering, response mutation, Match &amp; Replace.</li>
    <li>• <strong>Best Used For</strong>: Exploratory QA, security fuzzing, ad-hoc header injection, UI error simulation.</li>
  </ul>
  <div class="mt-2 p-1.5 bg-amber-950/60 rounded border border-amber-500/30 text-[11px] text-amber-200">
    🎯 <em>Core Question Answered</em>: "How can I alter traffic between client and gateway without touching source code?"
  </div>

</div>

</div>

<div class="slide-card text-xs bg-slate-900/80 border-cyan-500/40 p-2.5 mt-2 flex items-center gap-3">
  <span class="text-xl">🤝</span>
  <span class="text-slate-200 leading-snug">
    <strong class="text-cyan-400">The Power of Synergy</strong>: Use <strong>Burp Suite</strong> to intercept client requests and inject <code>Mock-Scenario: PAOTANG:SUCCESS,OTP:TIMEOUT</code>, then let <strong>WireMock</strong> consume that header downstream to simulate multi-service failures end-to-end!
  </span>
</div>

---
layout: section
---

# 🐳 Part 4
## Testcontainers — Hermetic Infrastructure

<p class="section-narrative">
  We can intercept traffic and mock external APIs, but what about local stateful infrastructure? How do we eliminate port collisions and dirty database state? Enter Testcontainers.
</p>


---

# 🐳 What is Testcontainers? — Core Concepts

### Programmable Docker Infrastructure Directly in Your Test Suite

<div class="space-y-2.5 mb-2.5">

  <div class="slide-card bg-slate-900/70 border-emerald-500/30 p-2.5 flex items-center justify-between gap-3">
    <div class="w-52 flex-shrink-0">
      <div class="flex items-center gap-2">
        <span class="text-base">📦</span>
        <span class="font-mono text-emerald-400 font-bold text-sm">Container Technology</span>
      </div>
      <div class="text-[11px] text-slate-400 pl-6">Portable, isolated runtime</div>
    </div>
    <div class="flex-grow text-xs text-slate-300">
      An image packages an app and its dependencies. The container isolates its process, filesystem, and network while sharing the host OS kernel.
    </div>
    <div class="w-[380px] flex-shrink-0 bg-slate-950/90 rounded border border-slate-700/60 px-3 py-2 font-mono text-xs text-left">
      <span class="text-cyan-400">new</span> <span class="text-amber-300">PostgreSqlContainer</span>(<span class="text-emerald-400">"postgres:16"</span>)
    </div>
  </div>

  <div class="slide-card bg-slate-900/70 border-amber-500/30 p-2.5 flex items-center justify-between gap-3">
    <div class="w-52 flex-shrink-0">
      <div class="flex items-center gap-2">
        <span class="text-base">🔌</span>
        <span class="font-mono text-amber-300 font-bold text-sm">Dynamic Port Mapping</span>
      </div>
      <div class="text-[11px] text-slate-400 pl-6">Zero Port Conflicts</div>
    </div>
    <div class="flex-grow text-xs text-slate-300">
      Binds containers to <strong>randomized host ports</strong> at runtime, eliminating socket collisions in parallel CI runners.
    </div>
    <div class="w-[380px] flex-shrink-0 bg-slate-950/90 rounded border border-slate-700/60 px-3 py-2 font-mono text-xs text-left">
      <span class="text-amber-300">postgres</span>.<span class="text-cyan-400">getMappedPort</span>(<span class="text-emerald-400">5432</span>)
    </div>
  </div>

  <div class="slide-card bg-slate-900/70 border-cyan-500/30 p-2.5 flex items-center justify-between gap-3">
    <div class="w-52 flex-shrink-0">
      <div class="flex items-center gap-2">
        <span class="text-base">🔄</span>
        <span class="font-mono text-cyan-400 font-bold text-sm">Lifecycle & Ryuk Cleanup</span>
      </div>
      <div class="text-[11px] text-slate-400 pl-6">Automated Teardown</div>
    </div>
    <div class="flex-grow text-xs text-slate-300">
      Orchestrates bootstrap in <code>beforeAll()</code> hooks, seeds migrations, and guarantees <strong>zero zombie leaks</strong> via Ryuk.
    </div>
    <div class="w-[380px] flex-shrink-0 bg-slate-950/90 rounded border border-slate-700/60 px-3 py-2 font-mono text-xs text-left">
      <span class="text-cyan-400">await</span> <span class="text-amber-300">container</span>.<span class="text-cyan-400">stop</span>()
    </div>
  </div>

</div>

<div class="slide-card text-xs bg-slate-900/60 p-2.5 border-emerald-500/30 flex items-center gap-3">
  <span class="text-lg">💡</span>
  <span class="text-slate-300">
    <strong>Production Parity</strong>: No in-memory approximations (H2/SQLite) — tests run against the exact PostgreSQL image, extensions, and schema scripts deployed to production.
  </span>
</div>

---
class: pt-2 pb-1 px-8
---

# 📦 What Container Technology Provides

### Package a dependency once, then run it in an isolated, disposable environment

<div class="grid grid-cols-3 gap-3 mt-4">
  <div class="slide-card p-4 border border-cyan-500/40 bg-slate-900/70">
    <div class="text-2xl mb-2">🧱</div>
    <h3 class="text-cyan-300 text-base font-bold mb-1">Image</h3>
    <p class="text-slate-300 text-sm">A template containing the application, runtime, and required files. Example: <code>postgres:16</code>.</p>
  </div>
  <div class="slide-card p-4 border border-emerald-500/40 bg-slate-900/70">
    <div class="text-2xl mb-2">📦</div>
    <h3 class="text-emerald-300 text-base font-bold mb-1">Container</h3>
    <p class="text-slate-300 text-sm">A running instance with isolated processes, filesystem, and network. It shares the host OS kernel.</p>
  </div>
  <div class="slide-card p-4 border border-violet-500/40 bg-slate-900/70">
    <div class="text-2xl mb-2">🧪</div>
    <h3 class="text-violet-300 text-base font-bold mb-1">Test</h3>
    <p class="text-slate-300 text-sm">Testcontainers starts the dependency, exposes a temporary host port, then removes it after use.</p>
  </div>
</div>

<div class="slide-card mt-4 p-3 text-sm border border-amber-500/40 bg-amber-950/20 text-slate-200">
  <strong class="text-amber-300">In this suite:</strong> PostgreSQL and WireMock run as real services for the test, without installing either service directly on the developer's machine.
</div>

---

# 🐳 Do We Need Docker for Testcontainers?

### Docker Daemon Requirement & Supported Runtimes

<div class="multi-col-grid-2">

<div class="col-card">
  <h3 class="text-amber-400">🔌 Docker API Socket Required</h3>
  <p class="mb-2">
    Testcontainers is a <strong>code SDK</strong> (TypeScript/Go/Java), not a standalone container engine. It communicates via the local Docker socket (<code>/var/run/docker.sock</code>).
  </p>
  <div class="slide-card text-sm mt-auto bg-slate-900/60 p-2.5 border-amber-500/30">
    🎯 <strong>Zero Host Tooling</strong>: Docker is the <em>only</em> tool needed. No local DBs or Java runtimes on host!
  </div>
</div>

<div class="col-card">
  <h3 class="text-emerald-400">🛠️ Supported Container Runtimes</h3>
  <ul class="space-y-1 text-slate-200 text-sm">
    <li>• <strong>Docker Desktop / Docker CE</strong>: Default on macOS, Windows, Linux, and CI.</li>
    <li>• <strong>OrbStack / Colima</strong>: Ultra-fast, lightweight macOS open-source alternatives.</li>
    <li>• <strong>Podman / Rancher Desktop</strong>: Compatible via standard Docker socket emulation.</li>
    <li>• <strong>Testcontainers Cloud</strong>: Offloads container execution to cloud workers.</li>
  </ul>
</div>

</div>



---

# 🧪 Testcontainers — Programmable Test Infrastructure

### Dynamic Ports & Code-Driven Orchestration

<div class="slide-card text-sm space-y-3 pt-2">

| Feature | Static Docker Compose | Dynamic Testcontainers |
| :--- | :--- | :--- |
| **Lifecycle** | Manual `docker compose up` | **Code-managed in test runner** |
| **Port Binding** | Fixed host ports (collisions) | **Random dynamic host ports** |
| **Parallelism** | Hard to run in parallel | **Isolated parallel test suites** |
| **Teardown** | Leaks on process crash | **Automatic cleanup on test exit** |
| **Control** | Static YAML configuration | **Native TypeScript / Go APIs** |

</div>

---
class: pt-2 pb-1 px-8
---

# 🧪 Testcontainers — Network Isolation & Dynamic Ports

<h3 class="text-slate-300 text-xs mb-1">Integration Fixture: Internal Aliases &amp; Dynamic Host Ports (<code>tests/specs/integration/bff.spec.ts</code>)</h3>

<div class="hermetic-code-wrapper">

```typescript
// From tests/specs/integration/bff.spec.ts
const network = await startNetwork();
const db = await startPostgres(network); // Internal alias: db:5432
const wiremock = await startWiremock(network, "wiremock", [
  wiremockMapping("paotang", { flat: true }),
]);
const user = await startUserService(network, db, {
  PAOTANG_SERVICE_URL: "http://wiremock:8080",
});

// The test runner reaches exposed service ports through mapped host ports.
const host = user.getHost();
const port = user.getMappedPort(8080);
```

</div>

<div class="slide-card text-xs mt-1 p-1.5 mb-0">
  🔌 <strong>Dynamic Resolution</strong>: Containers communicate internally via network aliases (<code>db:5432</code>, <code>wiremock:8080</code>), while the test runner reaches exposed ports through randomized host mappings.
</div>

---
class: pt-2 pb-1 px-8
---

# ⏳ Testcontainers — Wait Until Services Are Ready

### A running container process does not guarantee that its service can accept requests

<div class="slide-card p-2 mt-2 border border-violet-500/40 bg-violet-950/20 text-xs text-slate-200">
  <strong class="text-violet-300">A container</strong> is a running instance of an image: an app process with an isolated filesystem and network that shares the host OS kernel.
</div>

<div class="grid grid-cols-2 gap-3 mt-3 items-stretch">
  <div class="slide-card p-3 border border-cyan-500/40 bg-slate-900/70">
    <h3 class="text-cyan-300 text-sm font-bold mb-2">Wait for an HTTP health route</h3>

```typescript
new GenericContainer(`${SERVICE_NAME.USER}:test`)
  .withExposedPorts(PORT)
  .withWaitStrategy(Wait.forHttp(HEALTH_PATH, PORT))
  .start();
```

    <p class="text-slate-300 text-xs mt-2">The helper resolves only after the service health endpoint responds.</p>
  </div>
  <div class="slide-card p-3 border border-emerald-500/40 bg-slate-900/70">
    <h3 class="text-emerald-300 text-sm font-bold mb-2">Use the right readiness check</h3>
    <div class="space-y-2 text-slate-300 text-xs">
      <p><strong class="text-emerald-300">Application services:</strong> wait for their configured health path.</p>
      <p><strong class="text-emerald-300">WireMock:</strong> this fixture waits for <code>/__admin/health</code>.</p>
      <p><strong class="text-emerald-300">Startup failures:</strong> inspect container logs and dependency order before increasing timeouts.</p>
    </div>
  </div>
</div>

<div class="slide-card mt-3 p-2.5 border border-amber-500/40 bg-amber-950/20 text-sm text-slate-200">
  <strong class="text-amber-300">In this repo:</strong> service containers use <code>Wait.forHttp(HEALTH_PATH, PORT)</code>; WireMock uses <code>Wait.forHttp("/__admin/health", PORT)</code> in <code>tests/specs/support/containers.ts</code>.
</div>

---
class: pt-2 pb-1 px-8
---

# 🗄️ Testcontainers — Database Migrations & Test Data

<h3 class="text-slate-300 text-xs mb-1">Apply Service SQL Migrations; Seed Test Records Separately (<code>tests/specs/support/containers.ts</code>)</h3>

<div class="hermetic-code-wrapper">

```typescript
// Inside runDatabaseScripts(...) in containers.ts
const result = await database.exec([
  "sh",
  "-c",
  `for file in /test-data/${directory}/${name}/*.sql; do [ -e "$file" ] || continue; ` +
    `PGPASSWORD=${database.getPassword()} psql -v ON_ERROR_STOP=1 ` +
    `-U ${database.getUsername()} -d ${database.getDatabase()} -f "$file"; done`,
]);
if (result.exitCode !== 0) {
  throw new Error(`${directory} failed for ${name}: ${result.stderr || result.output}`);
}
```

</div>

<div class="grid grid-cols-3 gap-2 mt-1 text-[11px]">
  <div class="slide-card p-1.5 mb-0 border-indigo-500/30">
    <strong class="text-indigo-400 font-bold block text-[11px]">📁 Migration DDL</strong>
    <p class="text-slate-300 leading-tight text-[10px]">Creates the tables and constraints services expect, so tests can run real queries and catch schema mismatches.</p>
  </div>
  <div class="slide-card p-1.5 mb-0 border-emerald-500/30">
    <strong class="text-emerald-400 font-bold block text-[11px]">🛡️ Strict Abort</strong>
    <p class="text-slate-300 leading-tight text-[10px]"><code>ON_ERROR_STOP=1</code> plus the exit-code check fails setup on SQL errors.</p>
  </div>
  <div class="slide-card p-1.5 mb-0 border-cyan-500/30">
    <strong class="text-cyan-400 font-bold block text-[11px]">🌱 Test Data</strong>
    <p class="text-slate-300 leading-tight text-[10px]">API seeding is default; <code>SEED_MODE=direct</code> uses SQL inserts.</p>
  </div>
</div>

---
class: pt-2 pb-1 px-8
---

# 🗄️ Why Run Database Migrations in Tests?

### A fresh database is empty; migrations build the schema the service expects

<div class="grid grid-cols-4 gap-2 mt-4 items-stretch">
  <div class="slide-card p-3 border border-slate-600/60 bg-slate-900/70">
    <div class="text-cyan-300 font-bold text-sm mb-2">1 · Fresh database</div>
    <p class="text-slate-300 text-xs">Each test run starts with a clean PostgreSQL instance.</p>
  </div>
  <div class="slide-card p-3 border border-indigo-500/40 bg-slate-900/70">
    <div class="text-indigo-300 font-bold text-sm mb-2">2 · Apply migrations</div>
    <p class="text-slate-300 text-xs">Run the same ordered SQL changes used to create and evolve the service schema.</p>
  </div>
  <div class="slide-card p-3 border border-emerald-500/40 bg-slate-900/70">
    <div class="text-emerald-300 font-bold text-sm mb-2">3 · Seed test records</div>
    <p class="text-slate-300 text-xs">Add only the records needed for this scenario, separately from schema setup.</p>
  </div>
  <div class="slide-card p-3 border border-violet-500/40 bg-slate-900/70">
    <div class="text-violet-300 font-bold text-sm mb-2">4 · Exercise real queries</div>
    <p class="text-slate-300 text-xs">Run service code against the real database structure and constraints.</p>
  </div>
</div>

<div class="grid grid-cols-3 gap-2 mt-3">
  <div class="slide-card p-2 border border-rose-500/30 bg-rose-950/20 text-xs text-slate-200"><strong class="text-rose-300">Catch migration failures</strong><br />Invalid SQL stops test setup immediately.</div>
  <div class="slide-card p-2 border border-amber-500/30 bg-amber-950/20 text-xs text-slate-200"><strong class="text-amber-300">Catch schema mismatches</strong><br />Missing columns or constraints surface in integration tests.</div>
  <div class="slide-card p-2 border border-cyan-500/30 bg-cyan-950/20 text-xs text-slate-200"><strong class="text-cyan-300">Keep runs repeatable</strong><br />Every run follows the same schema setup sequence.</div>
</div>

---
class: pt-2 pb-1 px-8
---

# 🗄️ Database Migration Tools

### Choose a runner to version, order, and apply schema changes

<div class="grid grid-cols-3 gap-2 mt-4">
  <div class="slide-card p-3 border border-cyan-500/40 bg-slate-900/70">
    <h3 class="text-cyan-300 text-sm font-bold mb-1">This repo: Testcontainers + <code>psql</code></h3>
    <p class="text-slate-300 text-xs">Starts clean PostgreSQL and runs service SQL files with fail-fast error handling.</p>
  </div>
  <div class="slide-card p-3 border border-emerald-500/40 bg-slate-900/70">
    <h3 class="text-emerald-300 text-sm font-bold mb-1"><a href="https://documentation.red-gate.com/flyway/flyway-concepts/migrations" target="_blank">Flyway</a></h3>
    <p class="text-slate-300 text-xs">Applies ordered, versioned SQL migrations and records applied versions.</p>
  </div>
  <div class="slide-card p-3 border border-violet-500/40 bg-slate-900/70">
    <h3 class="text-violet-300 text-sm font-bold mb-1"><a href="https://docs.liquibase.com/concepts/changelogs/changeset.html" target="_blank">Liquibase</a></h3>
    <p class="text-slate-300 text-xs">Tracks schema changes as changesets in a changelog.</p>
  </div>
  <div class="slide-card p-3 border border-amber-500/40 bg-slate-900/70">
    <h3 class="text-amber-300 text-sm font-bold mb-1"><a href="https://github.com/golang-migrate/migrate" target="_blank">golang-migrate</a> / <a href="https://pressly.github.io/goose/" target="_blank">Goose</a></h3>
    <p class="text-slate-300 text-xs">Go-friendly migration runners; Goose supports SQL files and Go migration functions.</p>
  </div>
  <div class="slide-card p-3 border border-sky-500/40 bg-slate-900/70">
    <h3 class="text-sky-300 text-sm font-bold mb-1"><a href="https://atlasgo.io/docs" target="_blank">Atlas</a></h3>
    <p class="text-slate-300 text-xs">Plans, lints, and applies declarative or versioned schema changes.</p>
  </div>
  <div class="slide-card p-3 border border-blue-500/40 bg-slate-900/70">
    <h3 class="text-blue-300 text-sm font-bold mb-1"><a href="https://www.prisma.io/docs/orm/v7/prisma-migrate" target="_blank">Prisma Migrate</a></h3>
    <p class="text-slate-300 text-xs">Generates customizable SQL migration files from a Prisma schema and tracks migration history.</p>
  </div>
</div>

<div class="slide-card mt-3 p-3 border border-indigo-500/40 bg-indigo-950/20 text-sm text-slate-200">
  <strong class="text-indigo-300">Test the migration files against the production database engine.</strong> Here, Testcontainers provides PostgreSQL and <code>psql</code> executes the service SQL files; the other tools add migration history and workflow management.
</div>

---
class: pt-2 pb-1 px-8
---

# 🧪 Recommended Test Setup — 3-Step Hermetic Lifecycle

<h3 class="text-slate-300 text-xs mb-1">Complete Test Hook Pipeline (<code>beforeAll</code> Setup &amp; <code>afterAll</code> Teardown)</h3>

<div class="hermetic-code-wrapper">

```typescript
// tests/specs/integration/bff.spec.ts (lifecycle excerpt)
test.beforeAll(async () => {
  network = await startNetwork();
  dbContainer = await startPostgres(network);
  wiremockContainer = await startWiremock(network, "wiremock", [
    wiremockMapping("paotang", { flat: true }),
    wiremockMapping("sms", { flat: true }),
  ]);
  // Other service starts are omitted; migrations and API seeding follow.
  await runMigrations(dbContainer);
});

test.afterAll(async () => {
  await stopAll(
    [bffContainer, otpServiceContainer, ekycServiceContainer, transferServiceContainer,
      bankAccountServiceContainer, userServiceContainer, wiremockContainer, dbContainer],
    network
  );
});
```

</div>

<div class="grid grid-cols-3 gap-2 mt-1 text-[11px]">
  <div class="slide-card p-1.5 mb-0">
    <strong class="text-emerald-400 font-bold block text-[11px]">1. Ephemeral Containers</strong>
    <p class="text-slate-300 leading-tight text-[10px]">Fresh DB &amp; WireMock on dynamic ports.</p>
  </div>
  <div class="slide-card p-1.5 mb-0">
    <strong class="text-emerald-400 font-bold block text-[11px]">2. Schema Migrations</strong>
    <p class="text-slate-300 leading-tight text-[10px]">Executes production DDL migration scripts.</p>
  </div>
  <div class="slide-card p-1.5 mb-0">
    <strong class="text-emerald-400 font-bold block text-[11px]">3. Guaranteed Teardown</strong>
    <p class="text-slate-300 leading-tight text-[10px]">Auto-Ryuk cleans up containers upon exit.</p>
  </div>
</div>

---
layout: section
---

# 🎭 Part 5
## Playwright — Full-Stack E2E Automation

<p class="section-narrative">
  Our infrastructure is hermetic and our mocks are deterministic. Now, who drives the full user journey from browser DOM to backend REST APIs with zero flakiness? Enter Playwright.
</p>


---

# 🎭 Playwright — Unified UI & API Test Engine

### Modern Full-Stack Integration Testing Architecture

<div class="space-y-2.5 mb-2.5">

  <div class="slide-card bg-slate-900/70 border-emerald-500/30 p-2.5 flex items-center justify-between gap-3">
    <div class="w-52 flex-shrink-0">
      <div class="flex items-center gap-2">
        <span class="text-base">⚡</span>
        <span class="font-mono text-emerald-400 font-bold text-sm">DevTools Protocol</span>
      </div>
      <div class="text-[11px] text-slate-400 pl-6">Direct Engine Wire</div>
    </div>
    <div class="flex-grow text-xs text-slate-300">
      Communicates directly via Chrome DevTools Protocol & BiDi for <strong>sub-millisecond execution</strong> without flaky WebDriver.
    </div>
    <div class="w-[380px] flex-shrink-0 bg-slate-950/90 rounded border border-slate-700/60 px-3 py-2 font-mono text-xs text-left">
      <span class="text-cyan-400">await</span> <span class="text-amber-300">page</span>.<span class="text-cyan-400">goto</span>(<span class="text-emerald-400">"http://localhost:3000"</span>)
    </div>
  </div>

  <div class="slide-card bg-slate-900/70 border-amber-500/30 p-2.5 flex items-center justify-between gap-3">
    <div class="w-52 flex-shrink-0">
      <div class="flex items-center gap-2">
        <span class="text-base">🛡️</span>
        <span class="font-mono text-amber-300 font-bold text-sm">Context Isolation</span>
      </div>
      <div class="text-[11px] text-slate-400 pl-6">Zero State Bleed</div>
    </div>
    <div class="flex-grow text-xs text-slate-300">
      Every test executes in an isolated incognito browser context with <strong>zero session bleed</strong> across parallel workers.
    </div>
    <div class="w-[380px] flex-shrink-0 bg-slate-950/90 rounded border border-slate-700/60 px-3 py-2 font-mono text-xs text-left">
      <span class="text-cyan-400">const</span> ctx = <span class="text-cyan-400">await</span> <span class="text-amber-300">browser</span>.<span class="text-cyan-400">newContext</span>()
    </div>
  </div>

  <div class="slide-card bg-slate-900/70 border-cyan-500/30 p-2.5 flex items-center justify-between gap-3">
    <div class="w-52 flex-shrink-0">
      <div class="flex items-center gap-2">
        <span class="text-base">🌐</span>
        <span class="font-mono text-cyan-400 font-bold text-sm">Unified Full-Stack</span>
      </div>
      <div class="text-[11px] text-slate-400 pl-6">Single Test Runner</div>
    </div>
    <div class="flex-grow text-xs text-slate-300">
      Drive real browser UI workflows and execute backend <strong>headless REST API requests</strong> in the exact same test file.
    </div>
    <div class="w-[380px] flex-shrink-0 bg-slate-950/90 rounded border border-slate-700/60 px-3 py-2 font-mono text-xs text-left">
      <span class="text-cyan-400">await</span> <span class="text-amber-300">request</span>.<span class="text-cyan-400">post</span>(<span class="text-emerald-400">"/api/v1/transfers"</span>)
    </div>
  </div>

</div>

<div class="slide-card text-xs bg-slate-900/60 p-2.5 border-emerald-500/30 flex items-center gap-3">
  <span class="text-lg">💡</span>
  <span class="text-slate-300">
    <strong>Web-First Auto-Waiting</strong>: Playwright automatically waits for elements to be actionable (visible, stable, enabled) before clicking, eliminating flaky <code>sleep()</code> delays.
  </span>
</div>

---
class: pt-2 pb-1 px-8
---

# 🎭 Reliable UI Tests Without Fixed Sleeps

### Playwright waits for actionable elements and retries web assertions

<div class="grid grid-cols-2 gap-3 mt-4 items-stretch">
  <div class="slide-card p-4 border border-emerald-500/40 bg-slate-900/70">
    <h3 class="text-emerald-300 text-base font-bold mb-2">Before an action</h3>
    <p class="text-slate-300 text-sm">A click waits until the target is visible, stable, enabled, and able to receive events.</p>
  </div>
  <div class="slide-card p-4 border border-cyan-500/40 bg-slate-900/70">
    <h3 class="text-cyan-300 text-base font-bold mb-2">For an assertion</h3>
    <p class="text-slate-300 text-sm">A web-first assertion checks again until the expected state appears or times out.</p>
  </div>
</div>

<div class="slide-card mt-3 p-3 border border-indigo-500/40 bg-indigo-950/20 text-sm text-slate-200">
  <strong class="text-indigo-300">Why it helps:</strong> tests wait for the UI condition they need instead of guessing with fixed delays. <a class="text-indigo-300 underline" href="https://playwright.dev/docs/actionability" target="_blank">Auto-waiting docs</a>
</div>

---
class: pt-2 pb-1 px-8
---

# 🎭 Test Browser Journeys and APIs Together

### Use one test flow to prepare server state and verify what the user sees

<div class="grid grid-cols-3 gap-3 mt-4 items-stretch">
  <div class="slide-card p-4 border border-cyan-500/40 bg-slate-900/70">
    <div class="text-cyan-300 font-bold text-base mb-2">1 · Arrange</div>
    <p class="text-slate-300 text-sm">Send an API request to create or inspect the server-side state.</p>
  </div>
  <div class="slide-card p-4 border border-violet-500/40 bg-slate-900/70">
    <div class="text-violet-300 font-bold text-base mb-2">2 · Act</div>
    <p class="text-slate-300 text-sm">Use the browser to follow the user's real interface flow.</p>
  </div>
  <div class="slide-card p-4 border border-emerald-500/40 bg-slate-900/70">
    <div class="text-emerald-300 font-bold text-base mb-2">3 · Verify</div>
    <p class="text-slate-300 text-sm">Assert both the visible result and any important API post-condition.</p>
  </div>
</div>

<div class="slide-card mt-3 p-3 border border-indigo-500/40 bg-indigo-950/20 text-sm text-slate-200">
  <strong class="text-indigo-300">Why it helps:</strong> API calls can set up or verify data without replacing the browser checks that prove the user experience. <a class="text-indigo-300 underline" href="https://playwright.dev/docs/api-testing" target="_blank">API testing docs</a>
</div>

---
class: pt-2 pb-1 px-8
---

# 🎭 Reuse Tests Across Browser Projects

### Configure a project for each browser or device you need to support

<div class="grid grid-cols-3 gap-3 mt-4">
  <div class="slide-card p-4 border border-amber-500/40 bg-slate-900/70 text-center">
    <div class="text-3xl mb-2">🟦</div>
    <h3 class="text-amber-300 text-base font-bold">Chromium</h3>
    <p class="text-slate-400 text-xs mt-1">Chrome and Edge engine</p>
  </div>
  <div class="slide-card p-4 border border-cyan-500/40 bg-slate-900/70 text-center">
    <div class="text-3xl mb-2">🟧</div>
    <h3 class="text-cyan-300 text-base font-bold">Firefox</h3>
    <p class="text-slate-400 text-xs mt-1">Firefox engine</p>
  </div>
  <div class="slide-card p-4 border border-violet-500/40 bg-slate-900/70 text-center">
    <div class="text-3xl mb-2">🧭</div>
    <h3 class="text-violet-300 text-base font-bold">WebKit</h3>
    <p class="text-slate-400 text-xs mt-1">Safari engine</p>
  </div>
</div>

<div class="slide-card mt-3 p-3 border border-indigo-500/40 bg-indigo-950/20 text-sm text-slate-200">
  <strong class="text-indigo-300">Why it helps:</strong> the same test can reveal browser-specific behavior; projects also support device emulation. <a class="text-indigo-300 underline" href="https://playwright.dev/docs/test-projects" target="_blank">Project configuration docs</a>
</div>

---
class: pt-2 pb-1 px-8
---

# 🎭 Debug Failures with Trace Viewer

### Review each test action and the page state around it

<div class="grid grid-cols-3 gap-3 mt-4">
  <div class="slide-card p-4 border border-cyan-500/40 bg-slate-900/70">
    <h3 class="text-cyan-300 text-base font-bold mb-2">Action timeline</h3>
    <p class="text-slate-300 text-sm">See what Playwright did and where it waited or failed.</p>
  </div>
  <div class="slide-card p-4 border border-violet-500/40 bg-slate-900/70">
    <h3 class="text-violet-300 text-base font-bold mb-2">Page snapshots</h3>
    <p class="text-slate-300 text-sm">Inspect the DOM and visible page before and after an action.</p>
  </div>
  <div class="slide-card p-4 border border-amber-500/40 bg-slate-900/70">
    <h3 class="text-amber-300 text-base font-bold mb-2">Network activity</h3>
    <p class="text-slate-300 text-sm">Review requests and responses captured during the test.</p>
  </div>
</div>

<div class="slide-card mt-3 p-3 border border-indigo-500/40 bg-indigo-950/20 text-sm text-slate-200">
  <strong class="text-indigo-300">Why it helps:</strong> a failed CI run can leave evidence to inspect instead of relying on a local reproduction. <a class="text-indigo-300 underline" href="https://playwright.dev/docs/trace-viewer" target="_blank">Trace Viewer docs</a>
</div>

---
class: pt-2 pb-1 px-8
---

# 🎭 Playwright Limitations: Know What It Doesn’t Prove

### Use browser tests for user-visible behavior, and other checks for the risks they cannot see

<div class="grid grid-cols-3 gap-3 mt-4">
  <div class="slide-card p-3 border border-violet-500/40 bg-slate-900/70">
    <h3 class="text-violet-300 text-base font-bold mb-2">📱 Mobile web: yes · Native hardware: no</h3>
    <p class="text-slate-300 text-sm">Playwright can emulate mobile browser settings such as viewport, user agent, and touch. It does not verify native app code, biometrics, or physical sensors.</p>
    <p class="text-xs mt-2"><a class="text-violet-300 underline" href="https://playwright.dev/docs/emulation" target="_blank">Playwright emulation docs</a></p>
  </div>
  <div class="slide-card p-3 border border-cyan-500/40 bg-slate-900/70">
    <h3 class="text-cyan-300 text-base font-bold mb-2">🧪 E2E is a broad check</h3>
    <p class="text-slate-300 text-sm">A failing browser journey crosses many components and can be slower to diagnose. Keep unit and integration tests for fast, focused feedback.</p>
  </div>
  <div class="slide-card p-3 border border-amber-500/40 bg-slate-900/70">
    <h3 class="text-amber-300 text-base font-bold mb-2">🌐 Third parties can change</h3>
    <p class="text-slate-300 text-sm">A browser test cannot control a partner’s uptime or data. Stub external calls for repeatable tests, then verify partner contracts separately.</p>
    <p class="text-xs mt-2"><a class="text-amber-300 underline" href="https://playwright.dev/docs/best-practices#avoid-testing-third-party-dependencies" target="_blank">Playwright guidance</a></p>
  </div>
</div>

<div class="slide-card mt-3 p-3 border border-indigo-500/40 bg-indigo-950/20 text-sm text-slate-200">
  <strong class="text-indigo-300">In this deck:</strong> Playwright tests browser journeys, WireMock controls partner behavior, and the mobile bridge example mocks native APIs.
</div>

---
class: pt-2 pb-1 px-8
---

# 📱 Choosing a Mobile Testing Tool

### Match the tool to the part of the mobile experience you need to verify

<div class="grid grid-cols-3 gap-3 mt-4">
  <div class="slide-card p-3 border border-cyan-500/40 bg-slate-900/70">
    <h3 class="text-cyan-300 text-base font-bold mb-2">🌐 Playwright</h3>
    <p class="text-slate-300 text-sm">Best fit for mobile websites: emulate phone browsers, touch, and viewport settings in the existing web test suite.</p>
    <p class="text-xs mt-2 text-cyan-200">Use for responsive UI and browser journeys.</p>
  </div>
  <div class="slide-card p-3 border border-violet-500/40 bg-slate-900/70">
    <h3 class="text-violet-300 text-base font-bold mb-2">📲 Appium</h3>
    <p class="text-slate-300 text-sm">Code-first automation for native and hybrid Android or iOS apps, using platform drivers.</p>
    <p class="text-xs mt-2 text-violet-200">Use when tests must interact with the installed app.</p>
  </div>
  <div class="slide-card p-3 border border-emerald-500/40 bg-slate-900/70">
    <h3 class="text-emerald-300 text-base font-bold mb-2">🧰 Katalon</h3>
    <p class="text-slate-300 text-sm">A visual test authoring option for mobile apps; Studio uses Appium, and TestCloud can run tests on real devices.</p>
    <p class="text-xs mt-2 text-emerald-200">Use for low-code workflows and managed device coverage.</p>
  </div>
</div>

<div class="slide-card mt-3 p-3 border border-indigo-500/40 bg-indigo-950/20 text-sm text-slate-200">
  <strong class="text-indigo-300">For this workshop:</strong> keep Playwright for web and mobile web; choose Katalon or Appium when native app behavior needs real-device coverage.
</div>

---
class: pt-2 pb-1 px-8
---

# 📱 Start by Identifying the App Type

### The test target determines which tool and device coverage you need

<div class="grid grid-cols-3 gap-3 mt-4">
  <div class="slide-card p-3 border border-cyan-500/40 bg-slate-900/70">
    <h3 class="text-cyan-300 text-base font-bold mb-2">🌐 Mobile website</h3>
    <p class="text-slate-300 text-sm">Runs in a phone browser. Check responsive layout, touch interactions, and browser behavior with Playwright.</p>
  </div>
  <div class="slide-card p-3 border border-violet-500/40 bg-slate-900/70">
    <h3 class="text-violet-300 text-base font-bold mb-2">🔗 Hybrid app</h3>
    <p class="text-slate-300 text-sm">Combines native screens with web content in a WebView. Decide which layer owns each behavior before writing the test.</p>
  </div>
  <div class="slide-card p-3 border border-emerald-500/40 bg-slate-900/70">
    <h3 class="text-emerald-300 text-base font-bold mb-2">📲 Native app</h3>
    <p class="text-slate-300 text-sm">Installed iOS or Android app. Use native mobile automation such as Appium or Katalon for app-level flows.</p>
  </div>
</div>

<div class="slide-card mt-3 p-3 border border-indigo-500/40 bg-indigo-950/20 text-sm text-slate-200">
  <strong class="text-indigo-300">Device coverage:</strong> emulators and simulators are fast for routine checks; run important flows on real devices to catch hardware and OS-specific behavior.
</div>

---
class: pt-2 pb-1 px-8
---

# ✅ Reliable UI Test Habits: Web &amp; Native

### The principles are shared; selectors and commands depend on the tool

<div class="grid grid-cols-2 gap-3 mt-4">
  <div class="slide-card p-3 border border-cyan-500/40 bg-slate-900/70">
    <h3 class="text-cyan-300 text-base font-bold mb-1">1. Find elements by meaning</h3>
    <p class="text-slate-300 text-sm">Prefer accessibility labels or stable test IDs over screen coordinates that break when layouts move.</p>
  </div>
  <div class="slide-card p-3 border border-violet-500/40 bg-slate-900/70">
    <h3 class="text-violet-300 text-base font-bold mb-1">2. Wait for a real condition</h3>
    <p class="text-slate-300 text-sm">Wait for a screen or control to appear; avoid fixed sleeps that make tests slow and flaky.</p>
  </div>
  <div class="slide-card p-3 border border-emerald-500/40 bg-slate-900/70">
    <h3 class="text-emerald-300 text-base font-bold mb-1">3. Assert the user outcome</h3>
    <p class="text-slate-300 text-sm">Check that sign-in succeeds or an error is shown, not only that a tap was performed.</p>
  </div>
  <div class="slide-card p-3 border border-amber-500/40 bg-slate-900/70">
    <h3 class="text-amber-300 text-base font-bold mb-1">4. Keep each run independent</h3>
    <p class="text-slate-300 text-sm">Start from known app and account state so one test does not depend on another test's leftovers.</p>
  </div>
</div>

---
class: pt-2 pb-1 px-8
---

# 🎭 Your First Playwright Test

### Navigate to a page and assert the behavior a visitor should see

<div class="grid grid-cols-2 gap-3 mt-3 items-stretch">
  <div class="slide-card p-3 border border-cyan-500/40 bg-slate-900/70">

```typescript
import { test, expect } from "@playwright/test";

test("redirects visitors to sign in", async ({ page }) => {
  await page.goto(websiteUrl);
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByTestId("btn-paotang-login")).toBeVisible();
});
```

  </div>
  <div class="slide-card p-3 border border-emerald-500/40 bg-slate-900/70 space-y-2">
    <p class="text-slate-200 text-sm"><strong class="text-cyan-300">page</strong> is the isolated browser page supplied by Playwright.</p>
    <p class="text-slate-200 text-sm"><strong class="text-cyan-300">websiteUrl</strong> points to the website container's mapped host port.</p>
    <p class="text-slate-200 text-sm"><strong class="text-cyan-300">expect</strong> checks the URL and button visibility.</p>
  </div>
</div>

<div class="slide-card mt-3 p-2 border border-amber-500/40 bg-amber-950/20 text-sm text-slate-200">
  <strong class="text-amber-300">Run it:</strong> from <code>tests/</code>, use <code>bun run test:e2e</code>. The suite starts its containers in <code>beforeAll</code>.
</div>

---
class: pt-2 pb-1 px-8
---

# 🎭 Fill a Form and Assert the Feedback

### Playwright can check both the action and the form's response

<div class="grid grid-cols-2 gap-3 mt-3 items-stretch">
  <div class="slide-card p-3 border border-violet-500/40 bg-slate-900/70">

```typescript
const setScenario = mockScenario(page);
await page.goto(`${websiteUrl}/login`);
setScenario(MOCK_SCENARIO.PAOTANG.SUCCESS);

await page.getByTestId("btn-paotang-login").click();
await expect(page.getByTestId("result-paotang"))
  .toContainText("successfully");
await page.getByTestId("input-phone").fill("0800000000");

await expect(page.getByTestId("phone-validation-error")).toBeVisible();
await expect(page.getByTestId("btn-verify-otp")).toBeDisabled();
```

  </div>
  <div class="slide-card p-3 border border-emerald-500/40 bg-slate-900/70 space-y-2">
    <p class="text-slate-200 text-sm"><strong class="text-violet-300">Arrange:</strong> set a predictable partner response and open the login page.</p>
    <p class="text-slate-200 text-sm"><strong class="text-violet-300">Act:</strong> click login and fill the phone field.</p>
    <p class="text-slate-200 text-sm"><strong class="text-violet-300">Assert:</strong> show the validation message and keep OTP verification disabled.</p>
    <p class="text-slate-400 text-xs">The existing e2e fixture provides <code>page</code>, <code>websiteUrl</code>, and the running service stack.</p>
  </div>
</div>

---

# 🎭 Playwright — Web-First Locators & Auto-Waiting

### Eliminating Flaky `sleep()` Calls with Actionability Checks

<div class="multi-col-grid-2">

<div class="col-card">
  <h3 class="text-emerald-400">🎯 4-Stage Actionability Lifecycle</h3>
  <p class="mb-2 text-slate-200 text-sm">Playwright automatically awaits all 4 conditions before clicking or filling:</p>
  <ul class="space-y-1.5 text-slate-200 text-sm">
    <li>1️⃣ <strong>Attached</strong> — Element exists in the DOM tree</li>
    <li>2️⃣ <strong>Visible</strong> — Non-zero bounding box, not <code>display: none</code></li>
    <li>3️⃣ <strong>Stable</strong> — Completed CSS animations &amp; transitions</li>
    <li>4️⃣ <strong>Receives Events</strong> — Not obscured by modal dialogs</li>
  </ul>
</div>

<div class="col-card">
  <h3 class="text-emerald-400">💻 Resilient Locator Pattern</h3>

```typescript
// ❌ Bad: Fragile manual sleep
await page.waitForTimeout(5000);
await page.locator("#btn-submit").click();

// ✅ Good: Auto-retrying web-first assertion
const submitBtn = page.getByTestId("btn-submit");
await expect(submitBtn).toBeEnabled();
await submitBtn.click();
```

</div>

</div>

---
class: pt-2 pb-1 px-8
---

# 🎭 Playwright — Network Route Interception

<h3 class="text-slate-300 text-xs mb-1">Dynamic Mock Header Injection &amp; Multi-Scenario Steering as Code</h3>

<div v-pre class="mock-scenario-grid">

<div class="slide-card bg-slate-900/60 border-cyan-500/30">
  <h3 class="text-cyan-400 font-semibold">🛠️ <code>mockScenario(page)</code> Helper</h3>

```typescript
// tests/specs/support/mock-scenario.ts
export function mockScenario(page: Page) {
  const box = { value: "" };

  // Intercept every outgoing browser fetch/XHR
  page.route("**/*", (route) => {
    const headers = { ...route.request().headers() };
    if (box.value && !headers["mock-scenario"]) {
      headers["mock-scenario"] = box.value;
    }
    route.continue({ headers });
  });

  // Variadic: supports multiple scenarios as code
  return (...scenarios: (string | undefined)[]) => {
    box.value = scenarios.filter(Boolean).join(",");
  };
}
```
</div>

<div class="slide-card bg-slate-900/60 border-indigo-500/30">
  <h3 class="text-indigo-400 font-semibold">💻 Multi-Scenario Spec Usage</h3>

```typescript
// tests/specs/e2e/website.spec.ts
test("Multi-service auth flow", async ({ page }) => {
  const setScenario = mockScenario(page);

  // 1. Steer multiple services simultaneously
  setScenario(
    MOCK_SCENARIO.PAOTANG.SUCCESS,
    MOCK_SCENARIO.OTP.SUCCESS
  );

  await page.goto(`${websiteUrl}/login`);
  await page.getByTestId("btn-paotang-login").click();

  // 2. Mutate downstream service mid-test
  setScenario(MOCK_SCENARIO.OTP.INVALID);
  await page.getByTestId("btn-verify-otp").click();
});
```
</div>

</div>

<div class="slide-card text-xs bg-slate-900/70 border-cyan-500/40 p-1.5 flex items-center gap-2 mt-1">
  <span class="text-sm">🔀</span>
  <span class="text-slate-200 text-xs leading-snug"><strong>Multi-Scenario as Code</strong>: <code>setScenario(...)</code> serializes variadic tags into a single comma-separated <code>Mock-Scenario</code> header (e.g. <code>"PT_PASS:SUCCESS,OTP:SUCCESS"</code>), steering independent WireMock stubs without UI dropdown dependencies.</span>
</div>

---
class: pt-2 pb-1 px-8
---

# 🎭 Playwright — Hybrid Mobile WebView & JSBridge

### Mocking Native Device APIs with `page.addInitScript()`

```typescript
test("Biometric check via native JSBridge", async ({ page }) => {
  // Inject mock JSBridge into window before page scripts run
  await page.addInitScript(() => {
    (window as any).JSBridge = {
      verifyBiometrics: async () => ({ success: true, token: "bio_token_9988" }),
      getDeviceInfo: () => ({ platform: "iOS", model: "iPhone15,2" })
    };
  });

  await page.goto(`${websiteUrl}/webview/biometrics`);
  await page.getByTestId("btn-scan-face").click();
  await expect(page.getByTestId("auth-status")).toHaveText("Verified via FaceID");
});
```

<div class="slide-card text-xs mt-1.5 p-1.5">
  📱 <strong>Zero Mock Servers Needed</strong>: Playwright injects the native device bridge (<code>window.JSBridge</code>) directly into browser contexts before scripts execute via <code>page.addInitScript()</code>, eliminating separate mock servers.
</div>

---
class: pt-2 pb-1 px-8
---

# 🎭 Playwright — Full-Stack Browser E2E Flow

### Testing Multi-Step Auth Flow with Mock Steer (`website.spec.ts`)

```typescript
test("Paotang login verifies OTP & redirects", async ({ page }) => {
  const setScenario = mockScenario(page);

  // Set multiple mock scenarios at once (OAuth + OTP):
  setScenario(MOCK_SCENARIO.PAOTANG.SUCCESS, MOCK_SCENARIO.OTP.SUCCESS);

  await page.goto(`${websiteUrl}/login`);
  await page.getByTestId("btn-paotang-login").click();
  await expect(page.getByTestId("result-paotang")).toContainText("successfully");

  await page.getByTestId("btn-verify-otp").click();
  await expect(page).toHaveURL(/\/$/);
});
```

<div class="slide-card text-xs mt-1.5 p-1.5">
  🎯 Combines DOM click actions, dynamic network header steering, and auto-waiting URL assertions in a single deterministic test.
</div>

---
class: pt-2 pb-1 px-8
---

# 🎭 Playwright — Direct API Integration Testing

### Headless REST Verification & Scenario Resets (`bff.spec.ts`)

```typescript
test("fund transfer returns 201 and persists", async ({ request }) => {
  const res = await request.post(`${bffUrl}/api/v1/transfers`, {
    headers: { "Mock-Scenario": "TRANSFER:SUCCESS" },
    data: { amount: 500, from_account: "ACC-001", to_account: "ACC-002" }
  });

  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body.status).toBe("COMPLETED");
});

test.afterEach(async ({ request }) => {
  // Clean all WireMock state machines after each test
  await request.post(`${wiremockUrl}/__admin/scenarios/reset`);
});
```

<div class="slide-card text-xs mt-1.5 p-1.5">
  🎭 Built-in <code>request</code> fixture executes backend REST tests against live containerized services with zero browser overhead.
</div>

---
class: pt-2 pb-1 px-8
---

# 🎭 Playwright — Tracing & Diagnostics in CI

<h3 class="text-slate-300 text-xs mb-1">Record Every Action, DOM Snapshot &amp; Network Request for Post-Mortem Debugging</h3>

<div class="grid grid-cols-2 gap-3 mt-1 text-sm">

<div class="slide-card p-2.5 flex flex-col justify-between">
  <div>
    <h3 class="text-emerald-400 font-semibold mb-1 text-xs flex items-center gap-1.5">
      <span>🎬</span> 1. Enable Recording in Config
    </h3>
    <p class="text-slate-300 text-xs mb-1">Configure <code>playwright.config.ts</code> to automatically capture traces on test failure:</p>

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});
```
  </div>
  <div class="text-xs text-slate-400 font-mono pt-1 border-t border-slate-700/50">
    💡 Only saves traces on failed tests to conserve CI artifact storage.
  </div>
</div>

<div class="slide-card p-2.5 flex flex-col justify-between">
  <div>
    <h3 class="text-emerald-400 font-semibold mb-1 text-xs flex items-center gap-1.5">
      <span>🔍</span> 2. Open &amp; Inspect Trace Viewer
    </h3>
    <div class="space-y-1 text-slate-300 font-mono text-xs">
      <div><code class="text-emerald-300">npx playwright show-trace &lt;path/trace.zip&gt;</code><br/><span class="text-slate-400 font-sans text-xs">Opens local interactive trace GUI.</span></div>
      <div><code class="text-emerald-300">https://trace.playwright.dev</code><br/><span class="text-slate-400 font-sans text-xs">Drop zip file in browser (100% client-side privacy).</span></div>
    </div>
  </div>
  <div class="mt-1.5 pt-1.5 border-t border-slate-700/50 text-xs text-slate-300 space-y-0.5">
    <div>• <strong>Filmstrip Timeline</strong>: Time-travel through page renders.</div>
    <div>• <strong>DOM Snapshots</strong>: Interactive before/after HTML inspection.</div>
    <div>• <strong>Network Activity</strong>: Request/response bodies and mock headers.</div>
    <div>• <strong>Console &amp; Source</strong>: Stack trace mapped to TypeScript lines.</div>
  </div>
</div>

</div>

---

# 🎭 Playwright Scripting — Essential TypeScript API Cheat Sheet

### Common Locators, Actions, Web-First Assertions & Network Steering

<div class="grid grid-cols-2 gap-3 mt-1 text-sm">

<div class="slide-card p-3">
  <h3 class="text-emerald-400 font-bold mb-1.5 text-sm flex items-center gap-1.5">
    <span>📍</span> Locators &amp; Browser Actions
  </h3>
  <div class="space-y-1.5 text-slate-300 font-mono text-[11px]">
    <div><code class="text-emerald-300">page.getByTestId("btn-login").click()</code><br/><span class="text-slate-400 font-sans">Clicks resilient test ID locator with auto-waiting.</span></div>
    <div><code class="text-emerald-300">page.getByRole("button", { name: "Pay" })</code><br/><span class="text-slate-400 font-sans">Finds accessibility role element with accessible name.</span></div>
    <div><code class="text-emerald-300">locator.fill("0812345678")</code><br/><span class="text-slate-400 font-sans">Clears existing input and types text cleanly.</span></div>
    <div><code class="text-emerald-300">locator.selectOption("ACTIVE")</code><br/><span class="text-slate-400 font-sans">Selects option in <code>&lt;select&gt;</code> dropdown by value or label.</span></div>
    <div><code class="text-emerald-300">locator.press("Enter")</code><br/><span class="text-slate-400 font-sans">Dispatches keyboard key press event to element.</span></div>
  </div>
</div>

<div class="slide-card p-3">
  <h3 class="text-emerald-400 font-bold mb-1.5 text-sm flex items-center gap-1.5">
    <span>🎯</span> Web-First Assertions &amp; Route Mocking
  </h3>
  <div class="space-y-1.5 text-slate-300 font-mono text-[11px]">
    <div><code class="text-emerald-300">await expect(locator).toBeVisible()</code><br/><span class="text-slate-400 font-sans">Auto-retrying assertion until element is in DOM &amp; visible.</span></div>
    <div><code class="text-emerald-300">await expect(locator).toHaveText("Success")</code><br/><span class="text-slate-400 font-sans">Asserts element inner text matches expected string.</span></div>
    <div><code class="text-emerald-300">await expect(page).toHaveURL(/\/dashboard$/)</code><br/><span class="text-slate-400 font-sans">Asserts browser navigation completes to URL pattern.</span></div>
    <div><code class="text-emerald-300">await expect(locator).toBeDisabled()</code><br/><span class="text-slate-400 font-sans">Asserts button/input is in disabled state.</span></div>
    <div><code class="text-emerald-300">page.route("**/*", route =&gt; route.continue())</code><br/><span class="text-slate-400 font-sans">Intercepts network requests to inject headers or stubs.</span></div>
  </div>
</div>

</div>

---

# 🎭 Playwright CLI — Debugging & Test Runner Cheat Sheet

### Interactive UI, Debugging, Filtering & Code Generation

<div class="grid grid-cols-2 gap-3 mt-1 text-sm">

<div class="slide-card p-3">
  <h3 class="text-emerald-400 font-bold mb-1.5 text-sm flex items-center gap-1.5">
    <span>🖥️</span> Interactive UI &amp; Inspector
  </h3>
  <div class="space-y-1.5 text-slate-300 font-mono text-[11px]">
    <div><code class="text-emerald-300">npx playwright test --ui</code><br/><span class="text-slate-400 font-sans">Opens time-travel UI debugger with watch mode.</span></div>
    <div><code class="text-emerald-300">npx playwright test --debug</code><br/><span class="text-slate-400 font-sans">Step-by-step execution with Playwright Inspector.</span></div>
    <div><code class="text-emerald-300">npx playwright test --headed</code><br/><span class="text-slate-400 font-sans">Runs tests visually inside visible browser windows.</span></div>
  </div>
</div>

<div class="slide-card p-3">
  <h3 class="text-emerald-400 font-bold mb-1.5 text-sm flex items-center gap-1.5">
    <span>🎯</span> Filtering, Codegen &amp; Traces
  </h3>
  <div class="space-y-1.5 text-slate-300 font-mono text-[11px]">
    <div><code class="text-emerald-300">npx playwright test -g "login"</code><br/><span class="text-slate-400 font-sans">Runs only tests matching regex pattern title.</span></div>
    <div><code class="text-emerald-300">npx playwright codegen &lt;url&gt;</code><br/><span class="text-slate-400 font-sans">Record browser interactions to generate test code.</span></div>
    <div><code class="text-emerald-300">npx playwright show-trace &lt;zip&gt;</code><br/><span class="text-slate-400 font-sans">Inspect network, DOM snapshots, and console logs.</span></div>
  </div>
</div>

</div>

---
layout: center
class: text-center
---

<div class="thank-you-slide">

<div class="text-7xl mb-2">🎬</div>

# Live Walkthrough

<div class="cover-subtitle" style="font-size: 1.6rem; margin-top: 0.5rem;">Hands-On Walkthrough 🚀</div>

<div class="cover-tags" style="margin-top: 1.5rem;">
  <span class="cover-tag">🪝 WireMock</span>
  <span class="cover-tag">🛡️ Burp Suite</span>
  <span class="cover-tag">🐳 Testcontainers</span>
  <span class="cover-tag">🎭 Playwright</span>
</div>

</div>

---
class: pt-2 pb-1 px-8
---

# 🎯 Choose the Fastest Test That Can Catch the Risk

### Put each check at the narrowest boundary that still sees the failure

<div class="grid grid-cols-3 gap-3 mt-4">
  <div class="slide-card p-4 border border-emerald-500/40 bg-slate-900/70">
    <div class="text-emerald-300 font-bold text-base mb-2">Unit · many</div>
    <p class="text-slate-300 text-sm mb-2">A single function or business rule.</p>
    <p class="text-slate-400 text-xs">Example: map a partner result to the correct payment status.</p>
  </div>
  <div class="slide-card p-4 border border-cyan-500/40 bg-slate-900/70">
    <div class="text-cyan-300 font-bold text-base mb-2">Integration · some</div>
    <p class="text-slate-300 text-sm mb-2">A service working with its real database or controlled dependency.</p>
    <p class="text-slate-400 text-xs">Example: verify a handler writes the expected row in PostgreSQL.</p>
  </div>
  <div class="slide-card p-4 border border-violet-500/40 bg-slate-900/70">
    <div class="text-violet-300 font-bold text-base mb-2">End to end · few</div>
    <p class="text-slate-300 text-sm mb-2">A critical journey through the browser and services.</p>
    <p class="text-slate-400 text-xs">Example: sign in, verify OTP, and reach the home page.</p>
  </div>
</div>

<div class="slide-card mt-3 p-3 text-sm border border-amber-500/40 bg-amber-950/20 text-slate-200">
  <strong class="text-amber-300">Rule of thumb:</strong> Keep most checks fast; use end-to-end tests for risks only the full journey can reveal.
</div>

---
class: pt-2 pb-1 px-8
---

# 🧪 Make Test Data Explicit and Isolated

### Each scenario should create the state it needs and avoid depending on another test

<div class="grid grid-cols-4 gap-2 mt-4">
  <div class="slide-card p-3 border border-cyan-500/40 bg-slate-900/70">
    <div class="text-cyan-300 font-bold text-sm mb-2">1 · Start clean</div>
    <p class="text-slate-300 text-xs">Use a fresh database or reset the state this scenario owns.</p>
  </div>
  <div class="slide-card p-3 border border-indigo-500/40 bg-slate-900/70">
    <div class="text-indigo-300 font-bold text-sm mb-2">2 · Seed the case</div>
    <p class="text-slate-300 text-xs">Create only the records needed to make the expected path clear.</p>
  </div>
  <div class="slide-card p-3 border border-emerald-500/40 bg-slate-900/70">
    <div class="text-emerald-300 font-bold text-sm mb-2">3 · Assert behavior</div>
    <p class="text-slate-300 text-xs">Check the response and important persisted changes.</p>
  </div>
  <div class="slide-card p-3 border border-violet-500/40 bg-slate-900/70">
    <div class="text-violet-300 font-bold text-sm mb-2">4 · Clean up</div>
    <p class="text-slate-300 text-xs">Stop containers and clear state so the next run starts predictably.</p>
  </div>
</div>

<div class="slide-card mt-3 p-3 border border-rose-500/40 bg-rose-950/20 text-sm text-slate-200">
  <strong class="text-rose-300">Avoid shared mutable fixtures:</strong> tests that rely on execution order or leftover rows become hard to reproduce and unsafe to run in parallel.
</div>

---
class: pt-2 pb-1 px-8
---

# 🎲 Remove the Sources of Flaky Tests

### Control time, randomness, network calls, and shared state instead of waiting and hoping

<div class="grid grid-cols-2 gap-3 mt-4">
  <div class="slide-card p-3 border border-amber-500/40 bg-slate-900/70">
    <strong class="text-amber-300 text-sm">⏱️ Time and scheduling</strong>
    <p class="text-slate-300 text-xs mt-1">Prefer observable conditions and bounded timeouts over fixed sleeps.</p>
  </div>
  <div class="slide-card p-3 border border-cyan-500/40 bg-slate-900/70">
    <strong class="text-cyan-300 text-sm">🌐 External services</strong>
    <p class="text-slate-300 text-xs mt-1">Stub partner APIs with explicit responses and scenarios.</p>
  </div>
  <div class="slide-card p-3 border border-emerald-500/40 bg-slate-900/70">
    <strong class="text-emerald-300 text-sm">🔌 Ports and infrastructure</strong>
    <p class="text-slate-300 text-xs mt-1">Use isolated containers and dynamic ports instead of shared fixed ports.</p>
  </div>
  <div class="slide-card p-3 border border-violet-500/40 bg-slate-900/70">
    <strong class="text-violet-300 text-sm">🧹 Mutable state</strong>
    <p class="text-slate-300 text-xs mt-1">Reset WireMock scenarios and create test data per scenario.</p>
  </div>
</div>

<div class="slide-card mt-3 p-3 text-sm border border-emerald-500/40 bg-emerald-950/20 text-slate-200">
  <strong class="text-emerald-300">Stable tests are designed:</strong> retries can hide timing defects, so first remove the uncontrolled dependency.
</div>

---
class: pt-2 pb-1 px-8
---

# 🔎 Turn a Test Failure into Useful Evidence

### Collect the request, service, and browser evidence before changing the test

<div class="grid grid-cols-3 gap-3 mt-4">
  <div class="slide-card p-4 border border-cyan-500/40 bg-slate-900/70">
    <div class="text-cyan-300 font-bold text-base mb-2">1 · Reproduce</div>
    <p class="text-slate-300 text-sm">Keep the same inputs, scenario state, and test boundary.</p>
  </div>
  <div class="slide-card p-4 border border-amber-500/40 bg-slate-900/70">
    <div class="text-amber-300 font-bold text-base mb-2">2 · Inspect evidence</div>
    <p class="text-slate-300 text-sm">Check service logs, WireMock request history, database state, or a Playwright trace.</p>
  </div>
  <div class="slide-card p-4 border border-violet-500/40 bg-slate-900/70">
    <div class="text-violet-300 font-bold text-base mb-2">3 · Find the broken boundary</div>
    <p class="text-slate-300 text-sm">Decide whether the failure is in application behavior, setup, or an uncontrolled dependency.</p>
  </div>
</div>

<div class="slide-card mt-3 p-3 border border-rose-500/40 bg-rose-950/20 text-sm text-slate-200">
  <strong class="text-rose-300">In CI:</strong> retain traces and logs for failed runs so the first useful signal is available without rerunning locally.
</div>

---
class: pt-2 pb-1 px-8
---

# 🚦 Build a Fast Feedback Pipeline

### Run cheap checks early, then spend CI time on broader confidence

<div class="grid grid-cols-4 gap-2 mt-4">
  <div class="slide-card p-3 border border-emerald-500/40 bg-slate-900/70">
    <div class="text-emerald-300 font-bold text-sm mb-2">1 · Unit</div>
    <p class="text-slate-300 text-xs">Fast feedback on local logic.</p>
  </div>
  <div class="slide-card p-3 border border-cyan-500/40 bg-slate-900/70">
    <div class="text-cyan-300 font-bold text-sm mb-2">2 · Integration</div>
    <p class="text-slate-300 text-xs">Real database and service wiring in isolated containers.</p>
  </div>
  <div class="slide-card p-3 border border-violet-500/40 bg-slate-900/70">
    <div class="text-violet-300 font-bold text-sm mb-2">3 · Browser</div>
    <p class="text-slate-300 text-xs">Critical journeys with traces available on failure.</p>
  </div>
  <div class="slide-card p-3 border border-amber-500/40 bg-slate-900/70">
    <div class="text-amber-300 font-bold text-sm mb-2">4 · Extended checks</div>
    <p class="text-slate-300 text-xs">Security, load, or exploratory testing for targeted risks.</p>
  </div>
</div>

<div class="slide-card mt-3 p-3 text-sm border border-cyan-500/40 bg-cyan-950/20 text-slate-200">
  <strong class="text-cyan-300">Pipeline goal:</strong> catch common defects quickly; run slower checks where they add distinct confidence.
</div>

---

# 💬 Open Q&A & Key Takeaways

### Bringing All 4 Pillars Together for Ultra Smoooooth Testing

<div class="multi-col-grid-2 gap-3 mb-1.5">

<div class="col-card p-3 space-y-1.5 bg-slate-900/60 border-emerald-500/30">
  <h3 class="text-emerald-400 text-base mb-1">🎯 The 4 Core Pillars Summary</h3>
  <ul class="space-y-1 text-slate-200 text-xs leading-relaxed">
    <li>• 🪝 <strong>WireMock</strong>: Deterministic 3rd-party virtualization &amp; state machines.</li>
    <li>• 🛡️ <strong>Burp Suite</strong>: Live in-flight traffic inspection &amp; fault injection.</li>
    <li>• 🐳 <strong>Testcontainers</strong>: Ephemeral, isolated, zero-drift infrastructure.</li>
    <li>• 🎭 <strong>Playwright</strong>: Unified full-stack UI &amp; REST API automation.</li>
  </ul>
  <div class="bg-slate-950/80 rounded p-1.5 border border-emerald-500/40 font-mono text-xs text-emerald-200 mt-auto">
    <span>✨ Result: Fast, reliable, deterministic tests with zero flakiness.</span>
  </div>
</div>

<div class="col-card p-3 space-y-1.5 bg-slate-900/60 border-cyan-500/30">
  <h3 class="text-cyan-400 text-base mb-1">🚀 Next Steps &amp; Resources</h3>
  <ul class="space-y-1 text-slate-200 text-xs leading-relaxed">
    <li>• 📖 <strong>Follow the Guide</strong>: Walk through all labs in <code>WORKSHOP.md</code>.</li>
    <li>• 💻 <strong>Fork &amp; Experiment</strong>: Try adding a new microservice or stub.</li>
    <li>• 🤝 <strong>Adopt in Your Team</strong>: Start by replacing shared test DBs or sandboxes.</li>
    <li>• ⭐ <strong>Star the Repo</strong>: <code>SiwakornSitti/ultra-smoooooth-testing</code>.</li>
  </ul>
  <div class="bg-slate-950/80 rounded p-1.5 border border-cyan-500/40 font-mono text-xs text-cyan-200 mt-auto">
    <span>💡 Ask anything — architecture, implementation, or tooling!</span>
  </div>
</div>

</div>

<div class="slide-card text-xs bg-slate-900/70 border-emerald-500/50 p-2 flex items-center gap-2 shadow-lg">
  <span class="text-base">🎙️</span>
  <span class="text-slate-200 leading-snug"><strong>Floor Open for Questions</strong>: Any thoughts, edge cases, or real-world adoption challenges?</span>
</div>

---
class: pt-2 pb-1 px-8
---

# 💬 Q&amp;A — Where Would You Test It?

### Choose the smallest test boundary that gives you confidence

<div class="multi-col-grid-3 gap-3 mt-3">

<div class="col-card p-3 space-y-2 bg-slate-900/60 border-cyan-500/30">
  <h3 class="text-cyan-400 text-base">🧩 One Service</h3>
  <p class="text-slate-200 text-sm">A handler must map a partner response into the right business result.</p>
  <p class="text-slate-400 text-xs"><strong>Discuss:</strong> What can a fast unit test prove without containers?</p>
</div>

<div class="col-card p-3 space-y-2 bg-slate-900/60 border-emerald-500/30">
  <h3 class="text-emerald-400 text-base">🔗 Several Services</h3>
  <p class="text-slate-200 text-sm">A request crosses the BFF, account service, and database.</p>
  <p class="text-slate-400 text-xs"><strong>Discuss:</strong> Which real boundaries should the integration test include?</p>
</div>

<div class="col-card p-3 space-y-2 bg-slate-900/60 border-violet-500/30">
  <h3 class="text-violet-400 text-base">🖥️ User Journey</h3>
  <p class="text-slate-200 text-sm">A user signs in, verifies OTP, and reaches the home page.</p>
  <p class="text-slate-400 text-xs"><strong>Discuss:</strong> What should Playwright assert end to end?</p>
</div>

</div>

<div class="slide-card text-sm mt-3 bg-slate-900/70 border-cyan-500/40 p-2">
  🎙️ <strong>Room prompt:</strong> What is the slowest test layer you need to catch this failure reliably?
</div>

---
class: pt-2 pb-1 px-8
---

# 💬 Q&amp;A — What Should Be Real or Simulated?

### Keep the behavior under test real; control dependencies at their boundaries

<div class="grid grid-cols-2 gap-3 mt-3">

<div class="slide-card p-3 border border-cyan-500/30 bg-slate-900/60">
  <h3 class="text-cyan-400 text-base mb-1">🪝 External Partner API</h3>
  <p class="text-slate-200 text-sm">The partner sandbox is slow or unavailable during CI.</p>
  <p class="text-slate-400 text-xs mt-2"><strong>Discuss:</strong> Which request and response cases should a WireMock stub cover?</p>
</div>

<div class="slide-card p-3 border border-emerald-500/30 bg-slate-900/60">
  <h3 class="text-emerald-400 text-base mb-1">🐳 Database &amp; Service Wiring</h3>
  <p class="text-slate-200 text-sm">You need confidence that migrations and service connections work together.</p>
  <p class="text-slate-400 text-xs mt-2"><strong>Discuss:</strong> What belongs in an isolated Testcontainers fixture?</p>
</div>

<div class="slide-card p-3 border border-violet-500/30 bg-slate-900/60">
  <h3 class="text-violet-400 text-base mb-1">🎭 Browser Behavior</h3>
  <p class="text-slate-200 text-sm">A page must show an error and prevent a second submission.</p>
  <p class="text-slate-400 text-xs mt-2"><strong>Discuss:</strong> Which user-visible outcomes should Playwright verify?</p>
</div>

<div class="slide-card p-3 border border-amber-500/30 bg-slate-900/60">
  <h3 class="text-amber-400 text-base mb-1">🛡️ Live Traffic</h3>
  <p class="text-slate-200 text-sm">A request behaves differently after a proxy changes or blocks it.</p>
  <p class="text-slate-400 text-xs mt-2"><strong>Discuss:</strong> When is Burp Suite useful beyond automated tests?</p>
</div>

</div>

<div class="slide-card text-sm mt-3 bg-slate-900/70 border-emerald-500/40 p-2">
  🎙️ <strong>Takeaway:</strong> Choose the test boundary from the risk you need to cover, then make its dependencies predictable.
</div>

---
layout: center
class: text-center
---

<div class="thank-you-slide">

# 🎉 Thank You!

<div class="cover-subtitle" style="font-size: 1.4rem; margin-top: 0.5rem;">Happy Ultra Smoooooth Testing 🚀</div>

<div class="thank-you-recap">
  <div class="thank-you-pill">🪝 WireMock — API Virtualization</div>
  <div class="thank-you-pill">🛡️ Burp Suite — Traffic Control</div>
  <div class="thank-you-pill">🐳 Testcontainers — Hermetic Infra</div>
  <div class="thank-you-pill">🎭 Playwright — Full-Stack E2E</div>
</div>

<div class="thank-you-links">
  <a href="https://github.com/SiwakornSitti/ultra-smoooooth-testing" target="_blank" class="thank-you-link">⭐ GitHub Repository</a>
  <span class="text-slate-500">•</span>
  <a href="WORKSHOP.md" class="thank-you-link">📖 Workshop Guide</a>
</div>

</div>

---
layout: section
---

# 📚 Appendix
## Additional Tools — Trace Atlas & k6 Performance Testing

<p class="section-narrative">
  Beyond core integration testing, ecosystem visibility and high-throughput reliability are vital. Here is a look at Trace (our multi-repo dependency atlas) and Grafana k6 (developer-centric load testing).
</p>

---
class: pt-2 pb-1 px-8
---

# 🗺️ Internal Tools — Trace Workspaces Catalog

<h3 class="text-slate-300 text-sm mb-1">Multi-Repo Service Discovery, Workspaces & Ecosystem Scale</h3>

<div class="flex justify-center items-center w-full mt-0.5">
  <div class="adorable-arch-container">
    <img src="/trace_workspaces_atlas.png" class="adorable-arch-img" alt="Trace Workspaces and Repositories Catalog" />
  </div>
</div>

---
class: pt-2 pb-1 px-8
---

# 🕸️ Internal Tools — Multi-Tier Dependency Graph

<h3 class="text-slate-300 text-sm mb-1">Visualizing Microservice Call Chains, External Dependencies & Datastores</h3>

<div class="flex justify-center items-center w-full mt-0.5">
  <div class="adorable-arch-container">
    <img src="/trace_dependency_graph.png" class="adorable-arch-img" alt="Trace Multi-Tier Service Dependency Graph" />
  </div>
</div>

---

# ⚡ k6 — Modern Load & Performance Testing

### Developer-Centric High-Concurrency Performance Testing & SLA Verification

<div class="multi-col-grid-3">

<div class="col-card">
  <h3 class="text-emerald-400">🚀 High Throughput & Go Engine</h3>
  <p>Engineered in Go to compile JavaScript test scripts into blazing fast native threads, generating thousands of Virtual Users (VUs) with minimal CPU and memory footprint.</p>
</div>

<div class="col-card">
  <h3 class="text-emerald-400">🎯 Thresholds as Code (SLAs/SLOs)</h3>
  <p>Define objective performance criteria directly in test scripts (e.g. <code>p(95) &lt; 200ms</code>, <code>http_req_failed &lt; 1%</code>) to enforce automated pass/fail CI/CD quality gates.</p>
</div>

<div class="col-card">
  <h3 class="text-emerald-400">🔀 Microservice Scenario Orchestration</h3>
  <p>Simulate realistic multi-phase load curves with ramp-up/ramp-down stages, custom <code>Mock-Scenario</code> header injection, and concurrent user journeys.</p>
</div>

</div>

<div class="slide-card text-sm mt-2 bg-slate-900/60 border-emerald-500/30">
  💡 <strong>Testing Synergy</strong>: Pair k6 with WireMock and Testcontainers to performance-test Go microservices at scale without incurring 3rd-party API rate limits.
</div>

---
class: pt-2 pb-1 px-8
---

# ⚡ k6 Load Scripting — Microservices Example

### Simulating High-Throughput BFF & Core Service Traffic with WireMock Backing

<div class="grid grid-cols-2 gap-3 mt-1.5 flex-1">

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/50 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
        <span>⚙️</span> Stages &amp; SLA Thresholds
      </span>
      <span class="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded">Options</span>
    </div>

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 20 }, // Ramp up
    { duration: '30s', target: 50 }, // Sustained
    { duration: '10s', target: 0 },  // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<250'], // 95% < 250ms
    http_req_failed: ['rate<0.01'],    // < 1% errors
  },
};
```

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-xs text-slate-400">
    🎯 Defines SLA quality gates directly in test script code.
  </div>
</div>

<div class="slide-card p-2.5 border border-slate-700/60 bg-slate-900/50 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1 pb-1 border-b border-slate-700/60">
      <span class="text-cyan-400 font-bold text-xs flex items-center gap-1.5">
        <span>🚀</span> VU Execution &amp; Assertions
      </span>
      <span class="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded">Runner</span>
    </div>

```javascript
export default function () {
  const payload = JSON.stringify({
    from_account: 'ACC-10000001',
    to_account: 'ACC-10000002',
    amount: 500,
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Mock-Scenario': 'TRANSFER:SUCCESS',
    },
  };
  const res = http.post(
    'http://localhost:8080/api/v1/transfers',
    payload,
    params
  );
  check(res, { 'status is 201': (r) => r.status === 201 });
  sleep(0.1);
}
```

  </div>
  <div class="mt-1 pt-1 border-t border-slate-700/60 text-xs text-slate-400">
    ⚡ Injects mock steering headers per virtual user.
  </div>
</div>

</div>

---

# ⚡ k6 CLI — Performance Runner & Metrics Cheat Sheet

### Everyday Execution Commands, Dynamic Overrides & Live Dashboards

<div class="grid grid-cols-2 gap-3 mt-1 text-sm">

<div class="slide-card p-3">
  <h3 class="text-emerald-400 font-bold mb-1.5 text-sm flex items-center gap-1.5">
    <span>🚀</span> Execution &amp; Runtime Overrides
  </h3>
  <div class="space-y-1.5 text-slate-300 font-mono text-[11px]">
    <div><code class="text-emerald-300">k6 run load-test.js</code><br/><span class="text-slate-400 font-sans">Executes test script using configuration defined in <code>options</code>.</span></div>
    <div><code class="text-emerald-300">k6 run --vus 50 --duration 1m test.js</code><br/><span class="text-slate-400 font-sans">Overrides script with 50 concurrent virtual users for 1 minute.</span></div>
    <div><code class="text-emerald-300">k6 run -e TARGET_URL=http://localhost:8080</code><br/><span class="text-slate-400 font-sans">Passes dynamic environment variables to the JS test script.</span></div>
    <div><code class="text-emerald-300">k6 run --http-debug="full" test.js</code><br/><span class="text-slate-400 font-sans">Prints full raw HTTP request/response headers and bodies.</span></div>
  </div>
</div>

<div class="slide-card p-3">
  <h3 class="text-emerald-400 font-bold mb-1.5 text-sm flex items-center gap-1.5">
    <span>📊</span> Metrics, Dashboards &amp; CI Export
  </h3>
  <div class="space-y-1.5 text-slate-300 font-mono text-[11px]">
    <div><code class="text-emerald-300">K6_WEB_DASHBOARD=true k6 run test.js</code><br/><span class="text-slate-400 font-sans">Opens real-time interactive browser performance dashboard.</span></div>
    <div><code class="text-emerald-300">k6 run --out json=results.json test.js</code><br/><span class="text-slate-400 font-sans">Streams raw point-in-time metrics to JSON file for post-analysis.</span></div>
    <div><code class="text-emerald-300">k6 run --out influxdb=http://localhost:8086/k6</code><br/><span class="text-slate-400 font-sans">Streams live metrics directly to InfluxDB / Prometheus / Grafana.</span></div>
    <div><code class="text-emerald-300">k6 run --summary-export=summary.json test.js</code><br/><span class="text-slate-400 font-sans">Exports aggregated percentile metrics for CI/CD status reporting.</span></div>
  </div>
</div>

</div>
