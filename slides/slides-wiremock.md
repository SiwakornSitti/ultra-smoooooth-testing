---
theme: default
colorSchema: dark
background: '#0f172a'
title: WireMock — External API Virtualization Deep Dive
info: |
  Comprehensive guide to API stubbing, precision matching, dynamic templating, stateful scenarios, and fault injection with WireMock.
class: text-left
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

<div class="flex flex-col justify-center items-start w-full h-full my-auto px-6">
  <div class="cover-slide-left text-left max-w-3xl">
    <div class="inline-flex items-center px-3.5 py-1 mb-4 rounded-full sv-tag-fuchsia text-xs font-mono tracking-wider font-semibold">
      PILLAR 1 • API VIRTUALIZATION • ~4 HOURS
    </div>
    <h1 class="text-4xl md:text-5xl font-black mb-3 text-white">WireMock <span class="text-fuchsia">Deep Dive</span></h1>
    <p class="text-slate-300 text-lg md:text-xl mb-6 max-w-2xl font-medium leading-relaxed">
      Virtualizing external APIs, stateful sequences, and chaos testing for microservices
    </p>
    <div class="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-mono">
      <span class="px-2.5 py-1 rounded bg-slate-800/90 border border-slate-700/70 font-semibold text-fuchsia-300">WireMock 3.x</span>
      <span class="text-slate-500">•</span>
      <span class="px-2.5 py-1 rounded bg-slate-800/90 border border-slate-700/70 text-slate-300">Precision Routing</span>
      <span class="text-slate-500">•</span>
      <span class="px-2.5 py-1 rounded bg-slate-800/90 border border-slate-700/70 text-slate-300">Stateful FSM</span>
      <span class="text-slate-500">•</span>
      <span class="px-2.5 py-1 rounded bg-slate-800/90 border border-slate-700/70 text-slate-300">Chaos Testing</span>
    </div>
  </div>
</div>

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# What is WireMock?

### Out-of-process HTTP stand-in server with mock stubbing and proxy capabilities

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-fuchsia-500/30">
      <span class="text-fuchsia-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>🪝</span> Mock Server &amp; Transparent Proxy
      </span>
      <span class="text-xs font-mono text-fuchsia-300/90 bg-fuchsia-900/50 px-2.5 py-0.5 rounded-md border border-fuchsia-500/30">Foundation • Mock &amp; Proxy</span>
    </div>
    <div class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <div>• <strong>Socket Stand-in:</strong> Runs out-of-process on genuine TCP ports (<code>:8088</code>), validating connection pools, timeouts, and status parsers.</div>
      <div>• <strong>Mock Server Mode:</strong> Answers requests directly from in-memory stubs with deterministic JSON, dynamic templates, or fault injection.</div>
      <div>• <strong>Proxy &amp; Record Mode:</strong> Forwards unmatched traffic to live APIs (<code>proxyBaseUrl</code>), capturing real payloads into reusable stubs.</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-fuchsia-500/30 text-sm md:text-base font-mono text-fuchsia-300 font-medium">
    ⚡ Ephemeral lifecycle • In-memory stubs • Transparent live proxying &amp; recording
  </div>
</div>

<!--
Presenter Notes:
- Emphasize WireMock's dual nature: In-memory mock server and transparent reverse proxy.
- Mock vs Proxy: Stub isolated responses in memory, or forward to live APIs (proxyBaseUrl) and record.
- Socket Fidelity: Validates real network calls over TCP loopback instead of mocking language interfaces.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# The Problem: Fragile Vendor Sandboxes

### Why remote staging environments degrade automated test reliability

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-rose-500/40 bg-rose-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚠️</span> Fragile Remote Vendor Sandbox Trap
      </span>
      <span class="text-xs font-mono text-rose-300/90 bg-rose-900/50 px-2.5 py-0.5 rounded-md border border-rose-500/30">The Testing Crisis</span>
    </div>
    <div class="py-1.5 px-3 rounded-lg bg-slate-900/90 border border-rose-500/30 text-center font-mono text-sm md:text-base mb-2 text-slate-200">
      <code>[ Service Under Test ]</code> ➔ <span class="text-rose-400 font-bold">Public WAN / VPN Hop</span> ➔ <code>[ ⚠️ Vendor Sandbox ]</code>
    </div>
    <div class="space-y-2 md:space-y-2.5 text-lg md:text-xl text-slate-200 leading-snug">
      <div>• <strong>Dirty State &amp; Collisions:</strong> Mutating shared staging accounts across parallel CI runners triggers phantom 409 conflicts.</div>
      <div>• <strong>Vendor Outages &amp; Quotas:</strong> Unannounced maintenance windows and strict rate limits throttle automated build pipelines.</div>
      <div>• <strong>Untestable Failure Chaos:</strong> Live vendor APIs cannot simulate timeouts, dropped sockets, or transient 503 flapping on demand.</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-rose-500/30 text-sm md:text-base font-mono text-rose-300 font-medium">
    🚨 Shared staging environments hold CI/CD velocity hostage
  </div>
</div>

<!--
Presenter Notes:
- Microservice tests spend 70% of execution time waiting on remote network I/O.
- Explain the culprit: Shared state in external vendor sandboxes causes non-reproducible test flakiness.
- Point out the happy-path bias: Live vendor sandboxes never fail when you need to test retry and circuit breaker logic.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# The Solution: Hermetic Local Virtualization

### Deterministic loopback testing over real TCP sockets with sub-5ms latency

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-emerald-500/40 bg-emerald-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1.5 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>🟢</span> Local Hermetic Execution (WireMock)
      </span>
      <span class="text-xs font-mono text-emerald-300/90 bg-emerald-900/50 px-2.5 py-0.5 rounded-md border border-emerald-500/30">Hermetic &amp; Fast</span>
    </div>
    <div class="py-1.5 px-3 rounded-lg bg-slate-900/90 border border-emerald-500/30 text-center font-mono text-sm md:text-base mb-2 text-slate-200">
      <code>[ Service Under Test ]</code> ➔ <span class="text-emerald-400 font-bold">Real TCP Loopback (:8088)</span> ➔ <code>[ 🪝 WireMock ]</code>
    </div>
    <div class="space-y-2 md:space-y-2.5 text-lg md:text-xl text-slate-200 leading-snug">
      <div>• <strong>100% Hermetic Isolation:</strong> Ephemeral mock instances eliminate dirty shared state and unlock 100% parallel CI runs.</div>
      <div>• <strong>Sub-5ms Offline Speed:</strong> In-memory request matching responds in sub-5ms with zero vendor API charges or cloud latency.</div>
      <div>• <strong>On-Demand Fault Injection:</strong> Declaratively simulate timeouts, dropped sockets, and flapping 503s directly in test code.</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-emerald-500/30 text-sm md:text-base font-mono text-emerald-300 font-medium">
    ✨ Fast, deterministic integration tests restore developer confidence
  </div>
</div>

<!--
Presenter Notes:
- Walk through the local loopback: App talks to localhost:8088, WireMock intercepts and matches stubs in-memory.
- Highlight speed: Sub-5ms loopback transforms 30-minute CI suites into 30 seconds.
- Emphasize fault control: We can test timeouts and dropped sockets deterministically before deploying to production.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# Tool Boundaries: In-Memory Unit Mocks

### Fast algorithmic unit logic vs network-level blindspots

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-cyan-500/40 bg-cyan-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>🧪</span> In-Memory Unit Doubles
      </span>
      <span class="text-xs font-mono text-cyan-300/90 bg-cyan-900/50 px-2.5 py-0.5 rounded-md border border-cyan-500/30">Unit Scope</span>
    </div>
    <div class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <div>• <strong>Memory Heap Execution:</strong> Runs directly in application memory (Go interfaces, Mockery doubles), bypassing OS network sockets.</div>
      <div>• <strong>Pure Logic Target:</strong> Highly effective for testing isolated domain algorithms, state mutations, and business calculations.</div>
      <div>• <strong>The Integration Blindspot:</strong> Completely misses JSON serialization, header parsing, HTTP status mappings, and socket timeouts.</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-cyan-500/30 text-sm md:text-base font-mono text-cyan-300 font-medium">
    ⚡ Fast unit feedback • Zero network validation
  </div>
</div>

<!--
Presenter Notes:
- Clarify unit testing boundaries: Unit tests verify isolated business algorithms without external dependencies.
- Explain why unit mocks fail for integration tests: They mock away the HTTP client entirely.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# Tool Boundaries: WireMock Virtualization

### Full HTTP network socket fidelity without third-party sandboxes

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-fuchsia-500/30">
      <span class="text-fuchsia-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>🪝</span> WireMock Service Virtualization
      </span>
      <span class="text-xs font-mono text-fuchsia-300/90 bg-fuchsia-900/50 px-2.5 py-0.5 rounded-md border border-fuchsia-500/30">Integration Scope</span>
    </div>
    <div class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <div>• <strong>Real Socket Loopback:</strong> Exercises your real HTTP client, connection pools, TLS negotiation, and status code parsers.</div>
      <div>• <strong>Full Transport Protocol:</strong> Validates HTTP headers, connection keep-alive pools, timeouts, and JSON serialization.</div>
      <div>• <strong>Chaos &amp; Statefulness:</strong> Injects dropped connections, 504 timeouts, flapping 503s, and stateful multi-step FSMs.</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-fuchsia-500/30 text-sm md:text-base font-mono text-fuchsia-300 font-medium">
    ✨ Real network stack validation • 100% deterministic external boundaries
  </div>
</div>

<!--
Presenter Notes:
- Point out why WireMock complements unit tests: It validates the entire transport boundary over real TCP sockets.
- Emphasize full network transport: Exercises status codes, headers, and connection pooling without external vendors.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# Architectural Pillar: Zero Code Mutation

### Production source code requires zero modifications or test-only mock abstractions

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-cyan-500/40 bg-cyan-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>🧩</span> Zero Production Code Changes
      </span>
      <span class="text-xs font-mono text-cyan-300/90 bg-cyan-900/50 px-2.5 py-0.5 rounded-md border border-cyan-500/30">Pillar • Production Parity</span>
    </div>
    <div class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <div>• <strong>Config-Driven Redirection:</strong> Point service <code>baseURL</code> to WireMock via standard 12-factor environment variables.</div>
      <div>• <strong>100% Code Parity:</strong> Production HTTP client code executes completely unaltered in test suites.</div>
      <div>• <strong>Zero Mock Pollution:</strong> No test doubles, reflection hacks, or mock bytecode injected into application binaries.</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-cyan-500/30 text-sm md:text-base font-mono text-cyan-300 font-medium">
    ✨ Transparent boundary substitution • 100% production code parity
  </div>
</div>

<!--
Presenter Notes:
- Point out zero production mutation: point baseURL to WireMock and run.
- Contrast with unit test mock libraries that require dependency injection interfaces everywhere.
- Mention environment variable configuration as standard 12-factor pattern.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# Architectural Pillar: Polyglot Packaging

### Runs uniformly across local developer workstations, Docker Compose, and CI/CD pipelines

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-amber-500/40 bg-amber-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-amber-500/30">
      <span class="text-amber-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>📦</span> Universal Deployment Options
      </span>
      <span class="text-xs font-mono text-amber-300/90 bg-amber-900/50 px-2.5 py-0.5 rounded-md border border-amber-500/30">Pillar • Any Tech Stack</span>
    </div>
    <div class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <div>• <strong>Docker &amp; Compose:</strong> Run official <code>wiremock/wiremock</code> image with mounted JSON stubs—zero Java runtime required.</div>
      <div>• <strong>Language Agnostic:</strong> Works identically for Go, Node.js, Python, Java, Rust, C#, or shell scripts.</div>
      <div>• <strong>Testcontainers Sidecars:</strong> Spawns ephemeral WireMock instances programmatically per test suite run.</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-amber-500/30 text-sm md:text-base font-mono text-amber-300 font-medium">
    🚀 Uniform execution across local dev workstations and automated CI runners
  </div>
</div>

<!--
Presenter Notes:
- Emphasize that WireMock is polyglot: developers do not need Java installed.
- Show Docker run command: one container mounts a local mappings directory and serves stubs instantly.
- Mention Testcontainers: Go tests can spin up WireMock dynamically using testcontainers-go.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# 4 Core Virtualization Superpowers

### Essential capabilities for testing distributed microservices with WireMock

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-fuchsia-500/30">
      <span class="text-fuchsia-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Core Virtualization Engine
      </span>
      <span class="text-xs font-mono text-fuchsia-300/90 bg-fuchsia-900/50 px-2.5 py-0.5 rounded-md border border-fuchsia-500/30">Feature Overview</span>
    </div>
    <div class="space-y-2 md:space-y-2.5 text-lg md:text-xl text-slate-200 leading-snug">
      <div>• <strong>1. Precision Matching:</strong> Route by path regex (<code>urlPathPattern</code>), query flags, headers, and semantic JSON AST.</div>
      <div>• <strong>2. Dynamic Templating:</strong> Compute math, date offsets, and echo request IDs dynamically via Handlebars expressions.</div>
      <div>• <strong>3. Stateful Scenarios (FSM):</strong> Model multi-step state transitions and token replay rejections in memory with sub-2ms resets.</div>
      <div>• <strong>4. Chaos &amp; Fault Injection:</strong> Simulate log-normal latency percentiles, dropped TCP sockets, and self-healing 503 retries.</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-fuchsia-500/30 text-sm md:text-base font-mono text-fuchsia-300 font-medium">
    ⚡ Comprehensive boundary control • Deep dive into mechanics in Section 02
  </div>
</div>

<!--
Presenter Notes:
- Preview the four core capabilities that will be explored in depth across Section 02 and Section 03.
- Highlight how precision matching and dynamic templating handle complex API contracts without custom mock code.
- Stress that stateful FSM and chaos injection turn WireMock into an active resilience testing harness.
-->

---
layout: section
---

# ⚙️ Section 02
## Fundamentals &amp; Tooling Reference

<p class="section-narrative">
  Virtualization engine architecture, request matching operators, dynamic response templating, and Admin API contracts.
</p>

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# URL &amp; Path Matching Mechanics

### Exact path routing, regex pattern evaluation, and HTTP verb assertion

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-fuchsia-500/30">
      <span class="text-fuchsia-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Core Path Matching Operators
      </span>
      <span class="text-xs md:text-sm font-mono text-fuchsia-300/90 bg-fuchsia-900/50 px-2.5 py-0.5 rounded-md border border-fuchsia-500/30">Routing Reference</span>
    </div>
    <ul class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-fuchsia-300 bg-fuchsia-950/80 px-2 py-0.5 rounded border border-fuchsia-500/40">urlPathPattern</code>: Evaluates regex on URI paths (e.g. <code>[0-9a-f-]{36}</code> UUIDs). The gold standard for dynamic REST resources.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-fuchsia-300 bg-fuchsia-950/80 px-2 py-0.5 rounded border border-fuchsia-500/40">urlPath</code>: Matches exact path only, safely ignoring query parameter existence and serialization order.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-fuchsia-300 bg-fuchsia-950/80 px-2 py-0.5 rounded border border-fuchsia-500/40">url</code>: Matches entire absolute URI including query strings (brittle if parameters reorder).</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-fuchsia-300 bg-fuchsia-950/80 px-2 py-0.5 rounded border border-fuchsia-500/40">method</code>: Enforces strict HTTP verb constraints (<code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>, <code>PATCH</code>).</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-fuchsia-500/30 text-base md:text-lg font-mono text-fuchsia-300 font-medium">
    💡 Pro Tip: Decouple Path Routing with urlPathPattern &amp; queryParameters so key reordering never breaks builds.
  </div>
</div>

<!--
Presenter Notes:
- Emphasize the difference between url and urlPath: url fails if query parameters reorder.
- Highlight urlPathPattern: essential for microservice architectures where UUIDs are generated dynamically.
- Point out the 404 diff: WireMock returns exact path mismatch info in the response body.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# Query Parameter Matching Mechanics

### Key-value routing, regex constraints, presence/absence, and conjunction logic

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-sky-500/40 bg-sky-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-sky-500/30">
      <span class="text-sky-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Query Filter Operators
      </span>
      <span class="text-xs md:text-sm font-mono text-sky-300/90 bg-sky-900/50 px-2.5 py-0.5 rounded-md border border-sky-500/30">Query Reference</span>
    </div>
    <ul class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/40">queryParameters</code>: Key-value map for query filters. WireMock evaluates this as an order-agnostic semantic map.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/40">equalTo</code>: Exact parameter match (e.g. <code>channel=MOBILE</code> or <code>status=ACTIVE</code>).</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/40">matches</code>: RegEx constraint on parameter values (e.g. <code>limit=[0-9]+</code> pagination guards).</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/40">absent</code>: Validates parameter is omitted (e.g. asserting internal debug flags are stripped).</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-sky-500/30 text-base md:text-lg font-mono text-sky-300 font-medium">
    💡 Pro Tip: Treat Query Parameters as Semantic Maps. Use absent: true to assert internal debug flags are cleanly stripped.
  </div>
</div>

<!--
Presenter Notes:
- Point out equalTo vs matches: equalTo is literal string, matches is regex.
- Absent matcher is critical for security tests: verify debug flags are not sent in production calls.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# Header Matching &amp; Request Inspection

### Header assertions, JWT authentication tokens, and multi-service scenario steering

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-cyan-500/40 bg-cyan-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Header Matching Operators
      </span>
      <span class="text-xs md:text-sm font-mono text-cyan-300/90 bg-sky-900/50 px-2.5 py-0.5 rounded-md border border-cyan-500/30">Header Reference</span>
    </div>
    <ul class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">headers</code>: Map of HTTP header matchers evaluated against incoming request headers.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">contains</code>: Substring matching (e.g. <code>Mock-Scenario</code> header steering multiple mock behaviors).</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">matches</code>: RegEx validation (e.g. <code>^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$</code> JWT assertion).</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">absent</code>: Validates header is omitted (e.g. verifying unauthenticated request contracts).</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-cyan-500/30 text-base md:text-lg font-mono text-cyan-300 font-medium">
    💡 Pro Tip: Steer Sub-Scenarios via Mock Headers (e.g. Mock-Scenario: INSUFFICIENT_FUNDS) without backend code changes.
  </div>
</div>

<!--
Presenter Notes:
- Emphasize the Mock-Scenario pattern: it is our workshop convention for triggering specific behaviors.
- Walk through the JWT regex: header.payload.signature format.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# Semantic JSON Body Matching

### Schema tolerance, whitespace insensitivity, and array-order-independent contracts

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-emerald-500/40 bg-emerald-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Semantic JSON Matching Operators
      </span>
      <span class="text-xs md:text-sm font-mono text-emerald-300/90 bg-emerald-900/50 px-2.5 py-0.5 rounded-md border border-emerald-500/30">Body Reference</span>
    </div>
    <ul class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">equalToJson</code>: Parses actual and expected bodies as JSON ASTs, ignoring harmless whitespace differences.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">ignoreArrayOrder</code>: Compares array elements set-wise (e.g. <code>["a", "b"]</code> matches <code>["b", "a"]</code>).</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">ignoreExtraElements</code>: Lenient contract matching — ignores new or unmapped fields added upstream.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">matchesJsonPath</code>: Deep attribute traversal and conditional predicate filtering on nested payload fields.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-emerald-500/30 text-base md:text-lg font-mono text-emerald-300 font-medium">
    💡 Pro Tip: Protect tests with lenient AST comparison. Always pair equalToJson with ignoreExtraElements: true.
  </div>
</div>

<!--
Presenter Notes:
- Emphasize why equalToJson is superior to exact string matching: whitespace and key order do not cause test failures.
- ignoreExtraElements is key for consumer-driven contracts: allows provider to add new fields safely.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# JSONPath Expressions &amp; Predicates

### Deep attribute traversal, numeric comparisons, and regex payload filters

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-teal-500/40 bg-teal-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-teal-500/30">
      <span class="text-teal-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Jayway JSONPath Operators &amp; Evaluation
      </span>
      <span class="text-xs md:text-sm font-mono text-teal-300/90 bg-teal-900/50 px-2.5 py-0.5 rounded-md border border-teal-500/30">Deep Traversal</span>
    </div>
    <ul class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/40">matchesJsonPath</code>: Evaluates Jayway JSONPath queries against JSON request bodies with Boolean AND conjunction.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/40">Numeric Predicates</code>: <code>$[?(@.amount >= 50000)]</code> routes high-value transactions to manager approval stubs.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/40">RegEx Predicates</code>: <code>$[?(@.recipient =~ /^0[689]\d{8}$/)]</code> validates Thai phone format without database fixtures.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-teal-300 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/40">Sub-Property Traversal</code>: Deep nested object navigation (e.g. <code>$.payment.sender.account.id</code>).</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-teal-500/30 text-base md:text-lg font-mono text-teal-300 font-medium">
    💡 Pro Tip: Route on Domain Values (amounts, limits, formats) rather than hardcoded IDs for flexible test doubles.
  </div>
</div>

<!--
Presenter Notes:
- Walk through the JSONPath syntax: $ is root, ?() is filter predicate, @ is current item.
- Point out conjunctive behavior: multiple matchesJsonPath objects are evaluated with AND logic.
- Highlight the Thai phone regex: starts with 06, 08, 09 and followed by 8 digits.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# Priority &amp; Matching Precedence

### Resolution hierarchy for overlapping stub mappings and specific error overrides

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-amber-500/40 bg-amber-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-amber-500/30">
      <span class="text-amber-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Priority Resolution Hierarchy
      </span>
      <span class="text-xs md:text-sm font-mono text-amber-300/90 bg-amber-900/50 px-2.5 py-0.5 rounded-md border border-amber-500/30">Precedence Scale</span>
    </div>
    <ul class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">Integer Scale</code>: Lower integer = higher priority (<code>1 > 5 > 10 > 100</code>). Evaluated strictly in order of precedence.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">Priority 1 (Specific Error Overrides)</code>: High-precedence fault stubs triggered via headers or error flags.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">Priority 5–10 (Default Happy Path)</code>: Standard business logic and default approvals (default priority is 5).</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">Priority 100 (Catch-All Proxy)</code>: Fallback route forwarding unmatched traffic or logging actionable 404 diffs.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-amber-500/30 text-base md:text-lg font-mono text-amber-300 font-medium">
    💡 Pro Tip: Layer Specific Outliers over Default Stubs. Keep happy paths at priority: 10 and edge overrides at priority: 1.
  </div>
</div>

<!--
Presenter Notes:
- Explain what happens when two mappings match the same URL: WireMock evaluates priority integer.
- The lowest number wins. If priorities are equal, WireMock evaluates the more specific matcher.
- Best practice: Always set explicit priorities on scenario override stubs.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# Dynamic Response Templating

### Handlebars evaluation, dynamic data generation, and request model echoing

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-purple-500/40 bg-purple-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-purple-500/30">
      <span class="text-purple-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Handlebars Templating Engine
      </span>
      <span class="text-xs md:text-sm font-mono text-purple-300/90 bg-purple-900/50 px-2.5 py-0.5 rounded-md border border-purple-500/30">Dynamic Responses</span>
    </div>
    <ul class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40">response-template</code>: Transformer enabling dynamic Handlebars variable evaluation in response payloads.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40">request.headers</code>: Echoes correlation IDs (e.g. <code>{{request.headers.X-Correlation-ID}}</code>) for end-to-end tracing.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40">randomValue</code>: Generates unique runtime data: <code>{{randomValue type='UUID'}}</code>.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/40">now &amp; math</code>: Dynamic arithmetic and timestamps: <code>{{now offset='1 days' format='yyyy-MM-dd'}}</code>.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-purple-500/30 text-base md:text-lg font-mono text-purple-300 font-medium">
    💡 Pro Tip: Echo incoming traceparent and correlation IDs back into responses via Handlebars for unbroken distributed tracing.
  </div>
</div>

<!--
Presenter Notes:
- Point out response-template transformer: stubs must have transformers: ["response-template"] to parse Handlebars.
- Note JSON escaping helper: {{jsonPath request.body '$.field'}} escapes JSON characters automatically.
- Explain date offset syntax: {{now offset='3 days' format='yyyy-MM-dd'}}.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# Latency Injection &amp; Network Chaos

### Delay simulation, log-normal jitter, and socket-level connection faults

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-rose-500/40 bg-rose-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Latency &amp; Fault Simulation
      </span>
      <span class="text-xs md:text-sm font-mono text-rose-300/90 bg-rose-900/50 px-2.5 py-0.5 rounded-md border border-rose-500/30">Chaos Injection</span>
    </div>
    <ul class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40">fixedDelayMilliseconds</code>: Deterministic delay in milliseconds (e.g. <code>2000</code>) for HTTP client timeout testing.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40">logNormal</code>: Realistic latency distribution with median and sigma parameters simulating WAN jitter.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40">fault: CONNECTION_RESET_BY_PEER</code>: Abruptly terminates TCP socket with RST packet to verify connection pool cleanup.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40">fault: EMPTY_RESPONSE / GARBAGE</code>: Injects 0 bytes or corrupted payloads to verify client error handling.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-rose-500/30 text-base md:text-lg font-mono text-rose-300 font-medium">
    💡 Pro Tip: Test fail-fast resilience with socket faults. Use CONNECTION_RESET_BY_PEER to prove client pools cleanly release sockets.
  </div>
</div>

<!--
Presenter Notes:
- Contrast fixed delays with log-normal distributions: real systems have long tail latencies.
- Explain CONNECTION_RESET_BY_PEER: WireMock sends a TCP RST packet.
- This tests whether your Go/Node/Java HTTP client properly cleans up socket descriptors in the connection pool.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# Stateful Scenarios &amp; State Transitions

### Modeling stateful workflows, single-use token consumption, and state isolation

<div v-pre class="slide-card flex-1 p-4 md:p-5 border border-indigo-500/40 bg-indigo-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2.5 pb-1.5 border-b border-indigo-500/30">
      <span class="text-indigo-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Finite State Machine (FSM)
      </span>
      <span class="text-xs md:text-sm font-mono text-indigo-300/90 bg-indigo-900/50 px-2.5 py-0.5 rounded-md border border-indigo-500/30">Stateful FSM</span>
    </div>
    <ul class="space-y-2.5 md:space-y-3 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/40">scenarioName</code>: Groups multiple stubs into an isolated state machine (e.g. <code>OTP_REPLAY_FLOW</code>).</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/40">requiredScenarioState</code>: Precondition state required for stub to match (default: <code>Started</code>).</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/40">newScenarioState</code>: Advances scenario state upon successful match execution.</li>
      <li>• <code class="text-lg md:text-xl font-mono font-bold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/40">Zero DB State</code>: Simulates multi-step lifecycles entirely in-memory without persistent database writes.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-indigo-500/30 text-base md:text-lg font-mono text-indigo-300 font-medium">
    💡 Pro Tip: Model stateful lifecycles with sub-2ms resets via POST /__admin/scenarios/reset without database scripts.
  </div>
</div>

<!--
Presenter Notes:
- Walk through the state transition: Initial call sees state "Started", returns 200, and transitions to "TOKEN_CONSUMED".
- Second call with same token matches the sibling stub (requiredScenarioState: "TOKEN_CONSUMED") returning 400.
- Point out the reset API: POST /__admin/scenarios/reset resets all scenarios back to "Started".
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# WireMock Admin REST API Reference

### Declarative HTTP control plane for stubs, assertions, scenarios, and teardown

<div class="slide-card flex-1 p-3.5 md:p-4 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-fuchsia-500/30">
      <span class="text-fuchsia-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Admin REST Control Plane (<code>:8088/__admin</code>)
      </span>
      <span class="text-xs md:text-sm font-mono text-fuchsia-300/90 bg-fuchsia-900/50 px-2.5 py-0.5 rounded-md border border-fuchsia-500/30">Unified API Reference</span>
    </div>
    <table class="w-full text-left border-collapse text-base md:text-lg leading-snug">
      <thead>
        <tr class="border-b border-slate-700/60 text-slate-300 text-xs md:text-sm font-semibold uppercase tracking-wider">
          <th class="py-0.5 w-36">Component</th>
          <th class="py-0.5 w-24">Method</th>
          <th class="py-0.5 w-72">Endpoint Path</th>
          <th class="py-0.5">Operational Purpose</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-800/60">
        <tr>
          <td class="py-0.5 text-fuchsia-300 font-sans font-semibold text-sm md:text-base">Stub Mappings</td>
          <td class="py-0.5"><span class="px-2 py-0.5 rounded text-sm md:text-base font-bold bg-emerald-500/25 text-emerald-300">GET</span></td>
          <td class="py-0.5 text-slate-100 font-mono text-base md:text-lg">/__admin/mappings</td>
          <td class="py-0.5 text-slate-200 text-base md:text-lg">Inspect all active in-memory and file-backed stubs.</td>
        </tr>
        <tr>
          <td class="py-0.5 text-fuchsia-300 font-sans font-semibold text-sm md:text-base">Stub Mappings</td>
          <td class="py-0.5"><span class="px-2 py-0.5 rounded text-sm md:text-base font-bold bg-sky-500/25 text-sky-300">POST</span></td>
          <td class="py-0.5 text-slate-100 font-mono text-base md:text-lg">/__admin/mappings</td>
          <td class="py-0.5 text-slate-200 text-base md:text-lg">Dynamically register a new stub definition at runtime.</td>
        </tr>
        <tr>
          <td class="py-0.5 text-fuchsia-300 font-sans font-semibold text-sm md:text-base">Stub Mappings</td>
          <td class="py-0.5"><span class="px-2 py-0.5 rounded text-sm md:text-base font-bold bg-sky-500/25 text-sky-300">POST</span></td>
          <td class="py-0.5 text-slate-100 font-mono text-base md:text-lg">/__admin/mappings/save</td>
          <td class="py-0.5 text-slate-200 text-base md:text-lg">Persist active in-memory stubs into <code>mappings/*.json</code> files.</td>
        </tr>
        <tr>
          <td class="py-0.5 text-cyan-300 font-sans font-semibold text-sm md:text-base">Request Journal</td>
          <td class="py-0.5"><span class="px-2 py-0.5 rounded text-sm md:text-base font-bold bg-sky-500/25 text-sky-300">POST</span></td>
          <td class="py-0.5 text-slate-100 font-mono text-base md:text-lg">/__admin/requests/count</td>
          <td class="py-0.5 text-slate-200 text-base md:text-lg">Assert exact call counts (retries, deduplication) without sleeps.</td>
        </tr>
        <tr>
          <td class="py-0.5 text-cyan-300 font-sans font-semibold text-sm md:text-base">Request Journal</td>
          <td class="py-0.5"><span class="px-2 py-0.5 rounded text-sm md:text-base font-bold bg-emerald-500/25 text-emerald-300">GET</span></td>
          <td class="py-0.5 text-slate-100 font-mono text-base md:text-lg">/__admin/requests/unmatched</td>
          <td class="py-0.5 text-slate-200 text-base md:text-lg">Inspect near-miss diff details when calls return 404 Not Found.</td>
        </tr>
        <tr>
          <td class="py-0.5 text-emerald-300 font-sans font-semibold text-sm md:text-base">Scenarios &amp; Reset</td>
          <td class="py-0.5"><span class="px-2 py-0.5 rounded text-sm md:text-base font-bold bg-sky-500/25 text-sky-300">POST</span></td>
          <td class="py-0.5 text-slate-100 font-mono text-base md:text-lg">/__admin/scenarios/reset</td>
          <td class="py-0.5 text-slate-200 text-base md:text-lg">Reset all stateful FSM scenarios back to <code>Started</code> (~2ms).</td>
        </tr>
        <tr>
          <td class="py-0.5 text-emerald-300 font-sans font-semibold text-sm md:text-base">Scenarios &amp; Reset</td>
          <td class="py-0.5"><span class="px-2 py-0.5 rounded text-sm md:text-base font-bold bg-sky-500/25 text-sky-300">POST</span></td>
          <td class="py-0.5 text-slate-100 font-mono text-base md:text-lg">/__admin/reset</td>
          <td class="py-0.5 text-slate-200 text-base md:text-lg">Atomic global teardown: clears journal and restores default stubs.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mt-2 pt-1 border-t border-fuchsia-500/30 text-base md:text-lg font-mono text-fuchsia-300 font-medium">
    💡 Clean Slate Protocol: Run POST /__admin/scenarios/reset and DELETE /__admin/requests in BeforeEach hooks for 100% test isolation.
  </div>
</div>

<!--
Presenter Notes:
- Walk through the unified Admin API cheat sheet: stub manipulation, request journal, and scenario teardown.
- Emphasize POST /__admin/mappings/save for persisting dynamic stubs recorded in memory back to JSON files.
- Highlight the Clean Slate Protocol: Reset scenarios in ~2ms and wipe request history between test cases.
-->

---
class: pt-3 pb-3 px-8 h-full flex flex-col
---

# WireMock in the Test Pipeline

### Unified simulation serving high-velocity CI automation and developer-local exploration

<div class="grid grid-cols-2 gap-3 mt-1.5 flex-1">

<div class="slide-card p-3.5 md:p-4 border border-fuchsia-500/40 bg-fuchsia-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-fuchsia-500/30">
      <span class="text-fuchsia-300 font-bold text-lg md:text-xl flex items-center gap-1.5">
        <span>🚀</span> Automated CI/CD Pipelines
      </span>
      <span class="text-xs md:text-sm font-mono text-fuchsia-300/80 bg-fuchsia-900/40 px-2 py-0.5 rounded">CI Automation</span>
    </div>
    <div class="space-y-2 text-base md:text-lg text-slate-200 leading-snug">
      <div class="p-2 md:p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
        <strong class="text-slate-100 block mb-0.5 text-base md:text-lg font-bold">Ephemeral Execution</strong>
        <span class="text-base md:text-lg">Headless Docker or Testcontainers sidecar with sub-5ms responses and zero network lag.</span>
      </div>
      <div class="p-2 md:p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
        <strong class="text-slate-100 block mb-0.5 text-base md:text-lg font-bold">Total Determinism</strong>
        <span class="text-base md:text-lg">Static JSON stubs eliminate staging rate limits, vendor downtime, and flaky test retries.</span>
      </div>
      <div class="p-2 md:p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
        <strong class="text-slate-100 block mb-0.5 text-base md:text-lg font-bold">Parallel CI Scaling</strong>
        <span class="text-base md:text-lg">50 parallel PR branches run concurrently without shared database collisions.</span>
      </div>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-fuchsia-500/30 text-sm md:text-base font-mono text-fuchsia-300">
    ⚡ Fast, reproducible integration builds without third-party sandboxes
  </div>
</div>

<div class="slide-card p-3.5 md:p-4 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-lg md:text-xl flex items-center gap-1.5">
        <span>💻</span> Local Dev &amp; Exploratory Testing
      </span>
      <span class="text-xs md:text-sm font-mono text-cyan-300/80 bg-cyan-900/40 px-2 py-0.5 rounded">Local Exploration</span>
    </div>
    <div class="space-y-2 text-base md:text-lg text-slate-200 leading-snug">
      <div class="p-2 md:p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
        <strong class="text-slate-100 block mb-0.5 text-base md:text-lg font-bold">Web UI &amp; Request Journal</strong>
        <span class="text-base md:text-lg">Live inspection at <code>:8088/__admin/webapp</code> with visual diffs on 404 unmatched calls.</span>
      </div>
      <div class="p-2 md:p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
        <strong class="text-slate-100 block mb-0.5 text-base md:text-lg font-bold">Interactive Chaos Testing</strong>
        <span class="text-base md:text-lg">On-demand scenario state transitions and instant latency injection via REST API.</span>
      </div>
      <div class="p-2 md:p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/50">
        <strong class="text-slate-100 block mb-0.5 text-base md:text-lg font-bold">100% Offline Development</strong>
        <span class="text-base md:text-lg">Build and verify entire integration flows on a plane or train with zero WiFi connection.</span>
      </div>
    </div>
  </div>
  <div class="mt-2 pt-1 border-t border-cyan-500/30 text-sm md:text-base font-mono text-cyan-300">
    ✨ Instant visual feedback when debugging API integration issues locally
  </div>
</div>

</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-fuchsia-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-fuchsia-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Ecosystem Value:</strong> One unified declarative stub repository powers both headless CI speed and developer-local exploration.
  </span>
</div>

<!--
Presenter Notes:
- Summarize Section 02: We've covered the complete matching toolkit and administrative endpoints.
- Highlight the dual benefit: Developers use the Web UI locally; CI runners use headless Docker.
- Transition to Section 03: Now we will see these patterns applied to complex real-world banking flows.
-->

---
layout: section
---

# 🚀 Section 03
## Real-World Use Cases &amp; Application

<p class="section-narrative">
  Production banking patterns: identity verification, stateful auth tokens, dynamic calculation, and fault injection.
</p>

---
class: pt-3 pb-2 px-8
---

# Precision Routing: Thai National IDs &amp; UUIDs

### Route requests by URL regex patterns and validate payload structure without hardcoding test accounts

<div v-pre class="slide-card p-4 md:p-5 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-fuchsia-500/30">
      <span class="text-fuchsia-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Paotang eKYC Precision Rules
      </span>
      <span class="text-xs font-mono text-fuchsia-300/80 bg-fuchsia-900/40 px-2 py-0.5 rounded">eKYC Virtualization</span>
    </div>
    <ul class="space-y-2 md:space-y-2.5 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <strong class="text-slate-100 font-mono">urlPathPattern</strong>: Matches dynamic UUIDs (<code>[0-9a-f-]{36}</code>) generated by upstream auth sessions. Decouples tests from static database IDs.</li>
      <li>• <strong class="text-slate-100 font-mono">matchesJsonPath</strong>: RegEx predicate <code>^[0-9]{13}$</code> enforces valid 13-digit Thai National ID format.</li>
      <li>• <strong class="text-slate-100 font-mono">Dynamic Timestamp</strong>: <code>checkedAt: "{{now}}"</code> returns current UTC time to prevent test clock skew.</li>
      <li>• <strong class="text-slate-100 font-mono">Parallel CI Scale</strong>: 50 CI jobs can verify unique accounts simultaneously without database collision.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-fuchsia-500/30 text-sm md:text-base font-mono text-fuchsia-300">
    ✨ Parallel Safety: Decoupled from hardcoded database fixtures
  </div>
</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-fuchsia-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-fuchsia-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Production Pattern:</strong> Combining URL regex patterns with JSONPath body assertions enables hermetic testing without touching external vendor staging sandboxes.
  </span>
</div>

<!--
Presenter Notes:
- Point out the URL regex: matches dynamic UUIDs generated by client or upstream auth.
- Emphasize the JSONPath expression: validates Thai citizen 13-digit ID without pinning test to a static DB record.
- Mention {{now}} templating: ensures timestamp assertions pass without clock skew.
-->

---
class: pt-3 pb-2 px-8
---

# Precision Routing: Thai National IDs &amp; UUIDs: JSON Stub Mapping

### Dynamic UUID path routing & 13-digit Thai citizen ID regex matching

<div v-pre class="slide-card p-5 md:p-6 border border-slate-700/60 bg-slate-900/40 mt-2 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>🔍</span> Stub Mapping &amp; Verification
      </span>
      <span class="text-sm font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-500/30 font-semibold">01-core-verify-approved.json</span>
    </div>

```json
{
  "request": {
    "method": "POST",
    "urlPathPattern":
      "/lab/api/ekyc/[0-9a-f-]{36}/verify",
    "bodyPatterns": [{
      "matchesJsonPath":
        "$[?(@.nationalId =~ /^[0-9]{13}$/)]"
    }]
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "verified": true,
      "tier": "STANDARD",
      "checkedAt": "{{now}}"
    },
    "transformers": ["response-template"]
  }
}
```

<div class="mt-3 flex items-center justify-between text-base font-mono px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
      <div class="text-emerald-400">🟢 POST .../verify + valid 13-digit ID ➔ 200 OK</div>
      <div class="text-rose-400">🔴 POST .../verify + invalid ID ➔ 404 Unmatched</div>
    </div>
  </div>
  <div class="mt-3 pt-2 border-t border-slate-700/60 text-sm font-mono text-slate-400">
    Matches any dynamic UUID while strictly enforcing 13-digit format
  </div>
</div>

<!--
Presenter Notes:
- Point out urlPathPattern matching dynamic UUIDs and matchesJsonPath enforcing 13-digit ID regex.
- Highlight {{now}} dynamic timestamp eliminating client clock skew during automated assertions.
-->

---
class: pt-3 pb-2 px-8
---

# Priority Precedence: Error Overrides vs Defaults

### Higher specific matching rules override lower generic default routes

<div v-pre class="slide-card p-6 md:p-7 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-3 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>🥇</span> Priority 1 • Explicit Error Override
      </span>
      <span class="text-xs font-mono text-rose-300/80 bg-rose-900/40 px-2 py-0.5 rounded">High Precedence</span>
    </div>

```json
{
  "priority": 1,
  "request": {
    "method": "POST",
    "urlPathPattern": "/lab/api/ekyc/.*/verify",
    "headers": {
      "Mock-Scenario": {
        "contains": "EKYC:BLACKLISTED"
      }
    }
  },
  "response": {
    "status": 403,
    "jsonBody": {
      "code": "ERR_CITIZEN_BLACKLISTED",
      "reason": "AML watchlist match"
    }
  }
}
```

<div class="mt-1.5 text-xs font-mono text-rose-300">
      🔴 Header Mock-Scenario: EKYC:BLACKLISTED ➔ 403 Forbidden
    </div>
  </div>
  <div class="mt-1.5 pt-1 border-t border-rose-500/30 text-xs font-mono text-slate-300">
    Priority 1 cleanly intercepts matching calls before default routes evaluate
  </div>
</div>

<div v-pre class="slide-card py-3 px-4 flex items-center text-lg mt-3 border border-fuchsia-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-fuchsia-200 text-lg font-medium flex items-center gap-3 leading-relaxed">
    <span>💡</span> <strong>Precedence Rule:</strong> Lower integer = higher priority (<code>1 &gt; 5 &gt; 10 &gt; 100</code>). Specific overrides at Priority 1 allow testing rare errors without altering default stubs.
  </span>
</div>

<!--

-->

---
class: pt-3 pb-2 px-8
---

# Priority Precedence: Error Overrides vs Defaults: JSON Stub Mapping

### Priority 1 error fault stub overriding Priority 10 default happy path

<div v-pre class="slide-card p-5 md:p-6 border border-slate-700/60 bg-slate-900/40 mt-2 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>🥈</span> Priority 10 • Default Happy Path
      </span>
      <span class="text-xs font-mono text-emerald-300/80 bg-emerald-900/40 px-2 py-0.5 rounded">Standard Default</span>
    </div>

```json
{
  "priority": 10,
  "request": {
    "method": "POST",
    "urlPathPattern": "/lab/api/ekyc/.*/verify"
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "verified": true,
      "status": "APPROVED"
    }
  }
}
```

<div class="mt-1.5 text-xs font-mono text-emerald-300">
      🟢 Standard request without override header ➔ 200 OK Approved
    </div>
  </div>
  <div class="mt-1.5 pt-1 border-t border-emerald-500/30 text-xs font-mono text-slate-300">
    Cascades down to Priority 10 default when no scenario header is present
  </div>
</div>

<!--
Presenter Notes:
- Compare priority: 1 on specific error stub against priority: 10 on default catch-all route.
- Show how WireMock evaluates lower integer numbers with higher precedence during request matching.
-->

---
class: pt-3 pb-2 px-8
---

# Scenario Steering: Multi-Service Mocks

### Steer multiple downstream microservices independently across E2E tests from a single HTTP header

<div v-pre class="slide-card p-4 md:p-5 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Multi-Service Steering Dilemma
      </span>
      <span class="text-xs font-mono text-cyan-300/80 bg-cyan-900/40 px-2 py-0.5 rounded">Scenario Steering</span>
    </div>
    <ul class="space-y-2 md:space-y-2.5 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <strong class="text-slate-100 font-mono">The Challenge</strong>: Test A needs expired token + valid payment; Test B needs valid token + failing OTP. Deploying separate mocks creates infrastructure sprawl.</li>
      <li>• <strong class="text-slate-100 font-mono">Comma-Separated Headers</strong>: E2E test sends <code>Mock-Scenario: PAOTANG:EXPIRED,OTP:FLAKY</code> in a single request.</li>
      <li>• <strong class="text-slate-100 font-mono">contains Matching</strong>: WireMock evaluates <code>contains: "PAOTANG:EXPIRED"</code>, ignoring other scenario flags.</li>
      <li>• <strong class="text-slate-100 font-mono">Zero Code Changes</strong>: Microservices propagate standard tracing headers without mock coupling.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-cyan-500/30 text-sm md:text-base font-mono text-cyan-300">
    ✨ Header Injection: Propagates through API gateways transparently
  </div>
</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-cyan-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-cyan-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Decoupled Steering:</strong> Substring matching on Mock-Scenario headers allows test runners to orchestrate complex failure combinations across 5+ services at once.
  </span>
</div>

<!--
Presenter Notes:
- Explain the multi-service dilemma: In complex checkout flows, one test needs expired token but valid payment; another needs valid token but failing OTP.
- The solution: Comma-separated Mock-Scenario header with `contains` operator steers each mock independently.
-->

---
class: pt-3 pb-2 px-8
---

# Scenario Steering: Multi-Service Mocks: JSON Stub Mapping

### Substring header matching with Mock-Scenario for multi-service test routing

<div v-pre class="slide-card p-5 md:p-6 border border-slate-700/60 bg-slate-900/40 mt-2 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>🔍</span> Stub Mapping &amp; Verification
      </span>
      <span class="text-sm font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-500/30 font-semibold">03-header-matching.json</span>
    </div>

```json
{
  "priority": 2,
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/oauth/token",
    "headers": {
      "Mock-Scenario": {
        "contains": "PAOTANG:EXPIRED"
      }
    }
  },
  "response": {
    "status": 401,
    "jsonBody": {
      "error": "token_expired",
      "error_description": "Pass code expired"
    }
  }
}
```

<div class="mt-3 flex items-center justify-between text-base font-mono px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
      <div class="text-emerald-400">🟢 Mock-Scenario: PAOTANG:EXPIRED,OTP:OK ➔ 401 Expired</div>
      <div class="text-emerald-400">🟢 Downstream OTP service reads OTP:OK ➔ 200 OK</div>
    </div>
  </div>
  <div class="mt-2 pt-2 border-t border-slate-700/60 text-xs font-mono text-slate-400">
    Each downstream service reads only its relevant scenario slice
  </div>
</div>

<!--
Presenter Notes:
- Explain comma-separated token search using `contains: "PAOTANG:EXPIRED"` inside Mock-Scenario header.
- Show how one test request steers OAuth to fail while allowing downstream OTP to succeed.
-->

---
class: pt-3 pb-2 px-8
---

# Stateful Scenarios: One-Time Token Replays

### Modeling authorization code single-use lifecycles with Finite State Machines (FSM)

<div v-pre class="slide-card p-6 md:p-7 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-3 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>1️⃣</span> Step 1: First Call Consumes Code
      </span>
      <span class="text-xs font-mono text-emerald-300/80 bg-emerald-900/40 px-2 py-0.5 rounded">Started ➔ CONSUMED</span>
    </div>

```json
{
  "scenarioName": "oauth-code-exchange",
  "requiredScenarioState": "Started",
  "newScenarioState": "CODE_CONSUMED",
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/oauth/token",
    "bodyPatterns": [
      { "contains": "code=auth_code_12345" }
    ]
  },
  "response": {
    "status": 200,
    "jsonBody": { "access_token": "jwt_demo_token" }
  }
}
```

<div class="mt-1.5 text-xs font-mono text-emerald-300">
      🟢 Call 1: Valid code exchanged ➔ 200 OK (State ➔ CODE_CONSUMED)
    </div>
  </div>
  <div class="mt-1.5 pt-1 border-t border-emerald-500/30 text-xs font-mono text-slate-300">
    Advances scenario state in memory immediately upon response dispatch
  </div>
</div>

<div v-pre class="slide-card py-3 px-4 flex items-center text-lg mt-3 border border-fuchsia-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-fuchsia-200 text-lg font-medium flex items-center gap-3 leading-relaxed">
    <span>💡</span> <strong>State Machine Advantage:</strong> Model stateful authentication lifecycles without writing cleanup SQL scripts. Reset all via <code>POST /__admin/scenarios/reset</code>.
  </span>
</div>

<!--

-->

---
class: pt-3 pb-2 px-8
---

# Stateful Scenarios: One-Time Token Replays: JSON Stub Mapping

### Step 2 replay rejection enforcing OAuth 400 Bad Request on CODE_CONSUMED state

<div v-pre class="slide-card p-5 md:p-6 border border-slate-700/60 bg-slate-900/40 mt-2 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>2️⃣</span> Step 2: Replay Attempt Rejected
      </span>
      <span class="text-xs font-mono text-rose-300/80 bg-rose-900/40 px-2 py-0.5 rounded">State: CODE_CONSUMED</span>
    </div>

```json
{
  "scenarioName": "oauth-code-exchange",
  "requiredScenarioState": "CODE_CONSUMED",
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/oauth/token",
    "bodyPatterns": [
      { "contains": "code=auth_code_12345" }
    ]
  },
  "response": {
    "status": 400,
    "jsonBody": { "error": "invalid_grant" }
  }
}
```

<div class="mt-1.5 text-xs font-mono text-rose-300">
      🔴 Call 2: Replay attack blocked ➔ 400 Bad Request
    </div>
  </div>
  <div class="mt-1.5 pt-1 border-t border-rose-500/30 text-xs font-mono text-slate-300">
    Verifies OAuth single-use security invariants deterministically
  </div>
</div>

<!--
Presenter Notes:
- Walk through the state transition: Call 1 consumed code, so Call 2 matches CODE_CONSUMED state.
- Emphasize how WireMock rejects authorization code replays deterministically without database rollbacks.
-->

---
class: pt-3 pb-2 px-8
---

# SMS Gateway: Validating Thai Mobile Numbers

### Validate operator format conventions with Jayway JSONPath before dispatching SMS OTP tokens

<div v-pre class="slide-card p-4 md:p-5 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>📱</span> Thai Mobile Gateway Rules
      </span>
      <span class="text-xs font-mono text-cyan-300/80 bg-cyan-900/40 px-2 py-0.5 rounded">JSONPath RegEx</span>
    </div>
    <ul class="space-y-2 md:space-y-2.5 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <strong class="text-slate-100 font-mono">Mobile Prefix RegEx</strong>: Pattern <code>^0[689]\d{8}$</code> covers all AIS, TrueMove H, and Dtac cellular prefixes.</li>
      <li>• <strong class="text-slate-100 font-mono">Landline Rejection</strong>: Landline numbers (<code>02...</code>) or international codes are automatically unmatched (404).</li>
      <li>• <strong class="text-slate-100 font-mono">Recipient Echoing</strong>: <code>{{jsonPath request.body '$.recipient'}}</code> echoes the dialed number back into response.</li>
      <li>• <strong class="text-slate-100 font-mono">Dynamic Nonce</strong>: <code>{{randomValue type='UUID'}}</code> generates tracking reference without database sequences.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-cyan-500/30 text-sm md:text-base font-mono text-cyan-300">
    ✨ Pro Tip: Eliminates vendor SMS quota charges in automated suites
  </div>
</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-cyan-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-cyan-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Format Enforcement:</strong> Jayway JSONPath regular expressions validate telecommunications format rules before dispatching mock SMS callbacks.
  </span>
</div>

<!--
Presenter Notes:
- Highlight the regex pattern `/^0[689]\d{8}$/`: covers TrueMove, AIS, and Dtac Thai prefixes.
- Mention `{{jsonPath request.body '$.recipient'}}`: echoes the dialed number back into response for client assertions.
-->

---
class: pt-3 pb-2 px-8
---

# SMS Gateway: Validating Thai Mobile Numbers: JSON Stub Mapping

### Jayway JSONPath regular expression validating Thai mobile phone operator prefixes

<div v-pre class="slide-card p-5 md:p-6 border border-slate-700/60 bg-slate-900/40 mt-2 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>🔍</span> Stub Mapping &amp; Verification
      </span>
      <span class="text-sm font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-500/30 font-semibold">03-send-success.json</span>
    </div>

```json
{
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/otp/sms/send",
    "bodyPatterns": [{
      "matchesJsonPath":
        "$[?(@.recipient =~ /^0[689]\\d{8}$/)]"
    }]
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "status": "DELIVERED",
      "referenceId":
        "{{randomValue type='UUID'}}",
      "sentTo":
        "{{jsonPath request.body '$.recipient'}}"
    },
    "transformers": ["response-template"]
  }
}
```

<div class="mt-3 flex items-center justify-between text-base font-mono px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
      <div class="text-emerald-400">🟢 POST ... + "recipient": "0812345678" ➔ 200 OK</div>
      <div class="text-rose-400">🔴 POST ... + "recipient": "02123456" ➔ 404 Unmatched</div>
    </div>
  </div>
  <div class="mt-2 pt-2 border-t border-slate-700/60 text-xs font-mono text-slate-400">
    Enforces format rules strictly before acknowledging OTP delivery
  </div>
</div>

<!--
Presenter Notes:
- Explain JSONPath regex ^0[689]\d{8}$ strictly validating Thai mobile carriers (AIS, True, Dtac).
- Highlight {{jsonPath request.body '$.recipient'}} echoing target phone number for client assertions.
-->

---
class: pt-3 pb-2 px-8
---

# Flapping Services: Testing Exponential Backoff

### Simulate transient outages (HTTP 503 ➔ 503 ➔ 200) to verify client self-healing

<div v-pre class="slide-card p-6 md:p-7 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-3 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>⚠️</span> Attempts 1 &amp; 2: Service Unavailable
      </span>
      <span class="text-xs font-mono text-rose-300/80 bg-rose-900/40 px-2 py-0.5 rounded">HTTP 503 Flap</span>
    </div>

```json
{
  "scenarioName": "flapping-sms-service",
  "requiredScenarioState": "Started",
  "newScenarioState": "FAILED_ONCE",
  "request": {
    "method": "GET",
    "urlPath": "/lab/api/flaky"
  },
  "response": {
    "status": 503,
    "headers": { "Retry-After": "1" },
    "jsonBody": { "error": "RATE_LIMITED" }
  }
}
```

<div class="mt-1.5 text-xs font-mono text-rose-300">
      🔴 Calls 1 &amp; 2 return 503 with Retry-After: 1 header
    </div>
  </div>
  <div class="mt-1.5 pt-1 border-t border-rose-500/30 text-xs font-mono text-slate-300">
    Triggers client exponential backoff retry loop without human intervention
  </div>
</div>

<div v-pre class="slide-card py-3 px-4 flex items-center text-lg mt-3 border border-fuchsia-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-fuchsia-200 text-lg font-medium flex items-center gap-3 leading-relaxed">
    <span>💡</span> <strong>Resilience Verification:</strong> WireMock state transitions model transient 503 throttling sequences deterministically to test retry middleware and circuit breakers.
  </span>
</div>

<!--

-->

---
class: pt-3 pb-2 px-8
---

# Flapping Services: Testing Exponential Backoff: JSON Stub Mapping

### Two-stage transient 503 outage stub transitioning to self-healing 200 OK

<div v-pre class="slide-card p-5 md:p-6 border border-slate-700/60 bg-slate-900/40 mt-2 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>🔄</span> Attempt 3: Automatic Self-Healing
      </span>
      <span class="text-xs font-mono text-emerald-300/80 bg-emerald-900/40 px-2 py-0.5 rounded">HTTP 200 Recovery</span>
    </div>

```json
{
  "scenarioName": "flapping-sms-service",
  "requiredScenarioState": "FAILED_TWICE",
  "newScenarioState": "RECOVERED",
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

<div class="mt-1.5 text-xs font-mono text-emerald-300">
      🟢 Call 3: Client retry succeeds ➔ 200 OK RECOVERED
    </div>
  </div>
  <div class="mt-1.5 pt-1 border-t border-emerald-500/30 text-xs font-mono text-slate-300">
    Proves resilience middleware (retry-go, resilience4j) self-heals
  </div>
</div>

<!--
Presenter Notes:
- Show how the scenario progresses: Started (503) ➔ FAILED_ONCE (503) ➔ FAILED_TWICE (200 OK).
- Verify client retry middleware exponential backoff without flaky thread sleep delays in test code.
-->

---
class: pt-3 pb-2 px-8
---

# Semantic Body Matching: Lenient Contract Verification

### Reordered keys and extra metadata pass reliably without breaking assertions

<div v-pre class="slide-card p-6 md:p-7 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-3 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>📄</span> 1. WireMock Stub Contract
      </span>
      <span class="text-xs font-mono text-cyan-400">02-json-body-matching.json</span>
    </div>

```json
{
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/transfers",
    "bodyPatterns": [{
      "equalToJson": {
        "source": "ACC-001",
        "target": "ACC-002",
        "amount": 1500.00
      },
      "ignoreArrayOrder": true,
      "ignoreExtraElements": true
    }]
  },
  "response": {
    "status": 201,
    "jsonBody": { "status": "APPROVED" }
  }
}
```

<div class="mt-1.5 text-xs font-mono text-slate-300">
      Checks JSON AST semantics rather than character byte equality
    </div>
  </div>
  <div class="mt-1.5 pt-1 border-t border-emerald-500/30 text-xs font-mono text-emerald-300">
    ✨ Immune to whitespace, indentation, and key sequence
  </div>
</div>

<div v-pre class="slide-card py-3 px-4 flex items-center text-lg mt-3 border border-emerald-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-emerald-200 text-lg font-medium flex items-center gap-3 leading-relaxed">
    <span>💡</span> <strong>Contract Resilience:</strong> Lenient semantic body matching prevents test breakage when upstream serializers reorder keys or append diagnostic headers.
  </span>
</div>

<!--

-->

---
class: pt-3 pb-2 px-8
---

# Semantic Body Matching: Lenient Contract Verification: JSON Stub Mapping

### Lenient equalToJson AST comparison ignoring key ordering and extra client trace metadata

<div v-pre class="slide-card p-5 md:p-6 border border-slate-700/60 bg-slate-900/40 mt-2 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>🌐</span> 2. Client Request in the Wild
      </span>
      <span class="text-xs font-mono text-emerald-400">Status: 201 Created</span>
    </div>

```json
{
  "target": "ACC-002",
  "source": "ACC-001",
  "amount": 1500.00,
  "clientTraceId": "tr-9988",
  "timestamp": 1729785600
}
```

<div class="mt-1.5 space-y-0.5 text-xs font-mono">
      <div class="text-emerald-400">🟢 Reordered Keys: target before source matches</div>
      <div class="text-emerald-400">🟢 Extra Fields: clientTraceId is safely tolerated</div>
      <div class="text-rose-400">🔴 Raw String Matcher would have failed with 404!</div>
    </div>
  </div>
  <div class="mt-1.5 pt-1 border-t border-cyan-500/30 text-xs font-mono text-slate-300">
    Microservices can evolve schemas without breaking stub assertions
  </div>
</div>

<!--
Presenter Notes:
- Demonstrate how ignoreExtraElements and ignoreArrayOrder tolerate reordered JSON properties.
- Contrast AST evaluation with brittle byte-string comparison that breaks on schema evolution.
-->

---
class: pt-3 pb-2 px-8
---

# Dynamic Webhook Templating: Reconciliation

### Echo request correlation IDs and generate dynamic nonces on the fly with Handlebars

<div v-pre class="slide-card p-4 md:p-5 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-rose-500/30">
      <span class="text-rose-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>🪄</span> Correlation &amp; Nonce Generation
      </span>
      <span class="text-xs font-mono text-rose-300/80 bg-rose-900/40 px-2 py-0.5 rounded">Handlebars Engine</span>
    </div>
    <ul class="space-y-2 md:space-y-2.5 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <strong class="text-slate-100 font-mono">Trace Propagation</strong>: <code>{{request.headers.X-Correlation-ID}}</code> echoes tracking headers back to client for distributed tracing assertions.</li>
      <li>• <strong class="text-slate-100 font-mono">Dynamic Nonces</strong>: <code>{{randomValue type='UUID'}}</code> generates unique transaction IDs without database sequences.</li>
      <li>• <strong class="text-slate-100 font-mono">Body Reflection</strong>: <code>{{jsonPath request.body '$.sender'}}</code> echoes incoming body values.</li>
      <li>• <strong class="text-slate-100 font-mono">Real-time Timestamps</strong>: <code>{{now}}</code> ensures valid ISO timestamps on every run.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-fuchsia-500/30 text-sm md:text-base font-mono text-rose-300">
    ✨ Zero Plugins: Native Handlebars engine without custom Go/Java plugins
  </div>
</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-rose-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-rose-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Observability Invariance:</strong> Preserving tracing headers through mock stubs ensures distributed tracing and OpenTelemetry assertions pass cleanly.
  </span>
</div>

<!--
Presenter Notes:
- Point out {{request.headers.X-Correlation-ID}}: echoes tracing headers back to client for distributed trace propagation.
- Highlight {{randomValue type='UUID'}}: guarantees unique transaction references without database sequences.
-->

---
class: pt-3 pb-2 px-8
---

# Dynamic Webhook Templating: JSON Stub Mapping

### Handlebars response templating echoing correlation headers and generating random nonces

<div v-pre class="slide-card p-5 md:p-6 border border-slate-700/60 bg-slate-900/40 mt-2 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>🔍</span> Stub Mapping &amp; Verification
      </span>
      <span class="text-sm font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-500/30 font-semibold">05-response-templating.json</span>
    </div>

```json
{
  "request": {
    "method": "POST",
    "urlPath": "/lab/api/payments"
  },
  "response": {
    "status": 200,
    "headers": {
      "X-Correlation-ID":
        "{{request.headers.X-Correlation-ID}}"
    },
    "jsonBody": {
      "paymentId":
        "{{randomValue type='UUID'}}",
      "sender":
        "{{jsonPath request.body '$.sender'}}",
      "processedAt": "{{now}}"
    },
    "transformers": ["response-template"]
  }
}
```

<div class="mt-3 flex items-center justify-between text-base font-mono px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
      <div class="text-emerald-400">🟢 Header X-Correlation-ID: c-9901 ➔ Echoed in header</div>
      <div class="text-emerald-400">🟢 paymentId: Unique UUID generated per request</div>
    </div>
  </div>
  <div class="mt-3 pt-2 border-t border-slate-700/60 text-sm font-mono text-slate-400">
    Guarantees unique transaction references across parallel CI runs
  </div>
</div>

<!--
Presenter Notes:
- Trace {{request.headers.X-Correlation-ID}} reflection to maintain unbroken OpenTelemetry spans.
- Highlight {{randomValue type='UUID'}} generating unique paymentId values across parallel test runs.
-->

---
class: pt-3 pb-2 px-8
---

# Computed Values &amp; Date Offsets

### Calculate dynamic arithmetic totals and future ISO expiry dates directly in stubs

<div v-pre class="slide-card p-4 md:p-5 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>🧮</span> Computed Math &amp; Offset Rules
      </span>
      <span class="text-xs font-mono text-emerald-300/80 bg-emerald-900/40 px-2 py-0.5 rounded">Handlebars Math</span>
    </div>
    <ul class="space-y-2 md:space-y-2.5 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <strong class="text-slate-100 font-mono">Dynamic Thai VAT</strong>: <code>{{math price '*' 0.07}}</code> computes 7% tax from incoming request price.</li>
      <li>• <strong class="text-slate-100 font-mono">Total Calculation</strong>: <code>{{math price '*' 1.07}}</code> computes grand total without hardcoding fixtures.</li>
      <li>• <strong class="text-slate-100 font-mono">Future Expiry Offsets</strong>: <code>{{now offset='2 hours'}}</code> generates guaranteed valid expiration windows.</li>
      <li>• <strong class="text-slate-100 font-mono">Immune to Clock Skew</strong>: Midnight and month rollover tests never fail due to expired dates.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-emerald-500/30 text-sm md:text-base font-mono text-emerald-300">
    ✨ Native Math: No test runner recalculation needed
  </div>
</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-emerald-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-emerald-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Deterministic Arithmetic:</strong> In-stub dynamic math eliminates brittle test assertions caused by hardcoded tax rates or date expiration drift.
  </span>
</div>

<!--
Presenter Notes:
- Explain math helper: extracts price from request body, calculates 7% Thai VAT, and computes final total on the fly.
- Mention `now offset='2 hours'`: test clients asserting token expiration receive valid future dates regardless of when test executes.
-->

---
class: pt-3 pb-2 px-8
---

# Computed Values &amp; Date Offsets: JSON Stub Mapping

### Inline Handlebars arithmetic calculating 7% Thai VAT and +2-hour expiry dates

<div v-pre class="slide-card p-5 md:p-6 border border-slate-700/60 bg-slate-900/40 mt-2 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>🔍</span> Stub Mapping &amp; Verification
      </span>
      <span class="text-sm font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-500/30 font-semibold">05-response-templating.json</span>
    </div>

```json
{
  "request": {
    "method": "POST",
    "url": "/lab/api/orders"
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "orderId": "{{randomValue type='UUID'}}",
      "vat":
        "{{math (jsonPath request.body '$.price') '*' 0.07}}",
      "total":
        "{{math (jsonPath request.body '$.price') '*' 1.07}}",
      "expiresAt":
        "{{now offset='2 hours' format='yyyy-MM-dd HH:mm'}}"
    },
    "transformers": ["response-template"]
  }
}
```

<div class="mt-3 flex items-center justify-between text-base font-mono px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
      <div class="text-emerald-400">🟢 POST /orders {"price": 1000} ➔ vat: 70.0, total: 1070.0</div>
      <div class="text-emerald-400">🟢 expiresAt computed exactly 2 hours into the future</div>
    </div>
  </div>
  <div class="mt-2 pt-2 border-t border-slate-700/60 text-xs font-mono text-slate-400">
    Enables assertions on dynamic cart totals and expiration policies
  </div>
</div>

<!--
Presenter Notes:
- Walk through the math helper computing 7% VAT (price * 0.07) and total amount (price * 1.07).
- Point out {{now offset='2 hours'}} generating predictable future timestamps for expiry assertions.
-->

---
class: pt-3 pb-2 px-8
---

# Large Payloads with External Files

### Decouple multi-megabyte JSON responses from stubs using the __files repository

<div v-pre class="slide-card p-4 md:p-5 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-teal-500/30">
      <span class="text-teal-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>📁</span> Architectural Payload Hygiene
      </span>
      <span class="text-xs font-mono text-teal-300/80 bg-teal-900/40 px-2 py-0.5 rounded">__files Storage</span>
    </div>
    <ul class="space-y-2 md:space-y-2.5 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <strong class="text-slate-100 font-mono">Clean Stubs</strong>: Externalizes 5MB catalogs into <code>__files/</code>, keeping mapping stubs lightweight (under 20 lines).</li>
      <li>• <strong class="text-slate-100 font-mono">Dynamic Interpolation</strong>: External files in <code>__files/</code> still support full Handlebars templating at runtime.</li>
      <li>• <strong class="text-slate-100 font-mono">Git Diff Hygiene</strong>: Prevents massive multi-thousand line JSON commits in PR code reviews.</li>
      <li>• <strong class="text-slate-100 font-mono">MIME Type Flexibility</strong>: Safely serves large binary assets, PDFs, or XML schemas alongside JSON.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-teal-500/30 text-sm md:text-base font-mono text-teal-300">
    ✨ Best Practice: Keep mappings for routing rules; use __files for bodies
  </div>
</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-teal-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-teal-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Repository Hygiene:</strong> Decoupling large payloads into __files keeps mapping stubs concise, reviewable, and version-controllable.
  </span>
</div>

<!--
Presenter Notes:
- Emphasize hygiene: keeps mapping files lightweight (10-20 lines) and version-controllable.
- External files in `__files` still support Handlebars template interpolation at runtime.
-->

---
class: pt-3 pb-2 px-8
---

# Large Payloads with External Files: JSON Stub Mapping

### Decoupling multi-megabyte JSON responses into the __files storage repository

<div v-pre class="slide-card p-5 md:p-6 border border-slate-700/60 bg-slate-900/40 mt-2 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>🔍</span> Stub Mapping &amp; Verification
      </span>
      <span class="text-sm font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-500/30 font-semibold">04-body-file.json</span>
    </div>

```json
{
  "request": {
    "method": "GET",
    "urlPath": "/lab/api/stateless/body-file"
  },
  "response": {
    "status": 200,
    "headers": {
      "Content-Type": "application/json"
    },
    "bodyFileName":
      "lab-stateless/body-file-response.json"
  }
}
```

<div class="mt-3 flex items-center justify-between text-base font-mono px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
      <div class="text-emerald-400">🟢 GET /lab/api/stateless/body-file ➔ 200 OK</div>
      <div class="text-emerald-400">🟢 Serves wiremock/__files/lab-stateless/body-file-response.json</div>
    </div>
  </div>
  <div class="mt-2 pt-2 border-t border-slate-700/60 text-xs font-mono text-slate-400">
    External payload streams with zero performance overhead
  </div>
</div>

<!--
Presenter Notes:
- Explain bodyFileName routing to wiremock/__files/lab-stateless/body-file-response.json.
- Highlight how decoupling large payloads keeps git commits clean and PR diffs easy to review.
-->

---
class: pt-3 pb-2 px-8
---

# Webhook Idempotency &amp; Outbound Callbacks

### Test asynchronous event listeners and signature verification via outbound mock HTTP callbacks

<div v-pre class="slide-card p-4 md:p-5 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-indigo-500/30">
      <span class="text-indigo-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>🪝</span> Asynchronous Webhook Mechanics
      </span>
      <span class="text-xs font-mono text-indigo-300/80 bg-indigo-900/40 px-2 py-0.5 rounded">Event-Driven Mocks</span>
    </div>
    <ul class="space-y-2 md:space-y-2.5 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <strong class="text-slate-100 font-mono">serveEventListeners</strong>: Triggers real outbound HTTP POST callbacks from WireMock back into your service.</li>
      <li>• <strong class="text-slate-100 font-mono">Dynamic Destination</strong>: <code>{{jsonPath originalRequest.body '$.callback_url'}}</code> dispatches to dynamic test ports.</li>
      <li>• <strong class="text-slate-100 font-mono">Configurable Delay</strong>: Fixed or random jitter delay (e.g. 500ms) mimics asynchronous banking settlement.</li>
      <li>• <strong class="text-slate-100 font-mono">Zero Tunnels</strong>: Tests webhook listeners, HMAC signatures, and idempotency without ngrok.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-fuchsia-500/30 text-sm md:text-base font-mono text-indigo-300">
    ✨ Native Event Delivery: Zero third-party tunnel dependencies
  </div>
</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-indigo-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-indigo-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Full Duplex Testing:</strong> Outbound webhooks verify asynchronous message listeners and HMAC signature verification entirely within hermetic local networks.
  </span>
</div>

<!--
Presenter Notes:
- Highlight `serveEventListeners: webhook`: WireMock receives client payment, returns 202 PENDING, then independently fires POST callback to client.
- Tests your service's webhook HMAC signature verifier and idempotency key handling without public tunnels.
-->

---
class: pt-3 pb-2 px-8
---

# Webhook Idempotency &amp; Outbound Callbacks: JSON Stub Mapping

### Asynchronous outbound HTTP event callbacks dispatched via serveEventListeners

<div v-pre class="slide-card p-5 md:p-6 border border-slate-700/60 bg-slate-900/40 mt-2 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>🔍</span> Stub Mapping &amp; Verification
      </span>
      <span class="text-sm font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-500/30 font-semibold">12-webhook-trigger.json</span>
    </div>

```json
{
  "request": {
    "method": "POST",
    "url": "/lab/api/payments"
  },
  "response": {
    "status": 202,
    "jsonBody": { "status": "PENDING" }
  },
  "serveEventListeners": [{
    "name": "webhook",
    "parameters": {
      "method": "POST",
      "url":
        "{{jsonPath originalRequest.body '$.callback_url'}}",
      "headers": { "Content-Type": "application/json" },
      "body": "{"event": "paid", "status": "PAID"}",
      "delay": { "type": "fixed", "milliseconds": 500 }
    }
  }]
}
```

<div class="mt-3 flex items-center justify-between text-base font-mono px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
      <div class="text-emerald-400">🟢 1. POST /payments ➔ Receives 202 PENDING</div>
      <div class="text-emerald-400">🟢 2. WireMock 500ms delay ➔ POSTs event: paid</div>
    </div>
  </div>
  <div class="mt-3 pt-2 border-t border-slate-700/60 text-sm font-mono text-slate-400">
    Verifies that client event listeners process asynchronous callbacks cleanly
  </div>
</div>

<!--
Presenter Notes:
- Trace the lifecycle: client receives 202 PENDING, then WireMock asynchronously POSTs paid event.
- Explain testing webhook listeners and signature verification without public reverse tunnels.
-->

---
class: pt-3 pb-2 px-8
---

# Network Chaos: Cross-Border Link Simulation

### Verify client timeouts and socket drops using log-normal latency jitter and connection faults

<div v-pre class="slide-card p-4 md:p-5 border border-fuchsia-500/40 bg-fuchsia-950/20 mt-1.5 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-red-500/30">
      <span class="text-red-300 font-bold text-lg md:text-xl flex items-center gap-2">
        <span>⚡</span> Latency Jitter &amp; Connection Faults
      </span>
      <span class="text-xs font-mono text-red-300/80 bg-red-900/40 px-2 py-0.5 rounded">Chaos Injection</span>
    </div>
    <ul class="space-y-2 md:space-y-2.5 text-lg md:text-xl text-slate-200 leading-snug">
      <li>• <strong class="text-slate-100 font-mono">Deterministic Delay</strong>: <code>fixedDelayMilliseconds: 3500</code> asserts that client 2s context deadlines cancel properly.</li>
      <li>• <strong class="text-slate-100 font-mono">Log-Normal Distribution</strong>: <code>type: "lognormal", median: 100</code> models real production WAN latency percentiles.</li>
      <li>• <strong class="text-slate-100 font-mono">Hard TCP Drop</strong>: <code>fault: "CONNECTION_RESET_BY_PEER"</code> terminates socket to test resource leak prevention.</li>
      <li>• <strong class="text-slate-100 font-mono">Malformed Chunks</strong>: <code>fault: "EMPTY_RESPONSE"</code> verifies JSON parser resilience on EOF.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-red-500/30 text-sm md:text-base font-mono text-red-300">
    ✨ Pro Tip: Eliminates arbitrary sleep() calls in automated test suites
  </div>
</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-red-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-red-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Chaos Engineering:</strong> Injected latency and dropped sockets prove that microservice connection pools fail fast and cleanly under stress.
  </span>
</div>

<!--
Presenter Notes:
- Contrast fixed delay vs log-normal jitter: Real networks flap with long tails, not static numbers.
- Mention `CONNECTION_RESET_BY_PEER`: Proves your Go or Node HTTP client handles abrupt EOF socket closes gracefully.
-->

---
class: pt-3 pb-2 px-8
---

# Network Chaos: Cross-Border Link Stub Mapping

### Latency injection and abrupt CONNECTION_RESET_BY_PEER socket fault simulation

<div v-pre class="slide-card p-5 md:p-6 border border-slate-700/60 bg-slate-900/40 mt-2 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-xl flex items-center gap-2.5 gap-1.5">
        <span>🔍</span> Stub Mapping &amp; Verification
      </span>
      <span class="text-sm font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-500/30 font-semibold">07-delayed-response.json</span>
    </div>

```json
{
  "request": {
    "method": "GET",
    "urlPath": "/lab/api/slow-endpoint"
  },
  "response": {
    "status": 200,
    "jsonBody": {
      "message": "Delayed 3500ms"
    },
    "fixedDelayMilliseconds": 3500,
    "fault": "CONNECTION_RESET_BY_PEER"
  }
}
```

<div class="mt-3 flex items-center justify-between text-base font-mono px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
      <div class="text-emerald-400">🟢 2s Timeout Client: Cancels at 2.0s ➔ 504 Gateway Timeout</div>
      <div class="text-rose-400">🔴 Unbounded Client: Blocks thread and leaks socket!</div>
    </div>
  </div>
  <div class="mt-2 pt-2 border-t border-slate-700/60 text-xs font-mono text-slate-400">
    Proves that microservice connection pools fail fast and recover
  </div>
</div>

<!--
Presenter Notes:
- Explain fixedDelayMilliseconds: 3500 verifying client context cancellation at 2.0s timeout.
- Contrast socket termination (CONNECTION_RESET_BY_PEER) with standard HTTP error status codes.
-->

---
class: pt-3 pb-2 px-8
---

# Production-Ready Virtualization

### Summary of core virtualization architectural patterns for enterprise test reliability

<div class="grid grid-cols-3 gap-2.5 mt-1.5">

<div class="slide-card p-3.5 md:p-4 border border-fuchsia-500/40 bg-fuchsia-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-fuchsia-500/30">
      <span class="text-fuchsia-300 font-bold text-base flex items-center gap-1.5">
        <span>🎯</span> 1. Precision Routing
      </span>
      <span class="text-xs font-mono text-fuchsia-300/80 bg-fuchsia-900/40 px-2 py-0.5 rounded">Matching</span>
    </div>
    <ul class="space-y-1.5 text-sm md:text-base text-slate-200 leading-snug">
      <li>• <strong>urlPathPattern</strong>: Decouples tests from static database IDs.</li>
      <li>• <strong>queryParameters</strong>: Matches query filters order-agnostically.</li>
      <li>• <strong>equalToJson</strong>: Lenient AST comparison resists whitespace &amp; formatting.</li>
      <li>• <strong>Mock-Scenario</strong>: Substring header steering for multi-service tests.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-fuchsia-500/30 text-xs font-mono text-fuchsia-300">
    ✨ Zero Flakiness: Resilient contracts
  </div>
</div>

<div class="slide-card p-3.5 md:p-4 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-300 font-bold text-base flex items-center gap-1.5">
        <span>🔄</span> 2. Stateful FSM
      </span>
      <span class="text-xs font-mono text-cyan-300/80 bg-cyan-900/40 px-2 py-0.5 rounded">Scenarios</span>
    </div>
    <ul class="space-y-1.5 text-sm md:text-base text-slate-200 leading-snug">
      <li>• <strong>Finite State Machines</strong>: Models complex multi-step lifecycles.</li>
      <li>• <strong>Token Replays</strong>: Single-use code consumption and rejection.</li>
      <li>• <strong>Self-Healing Flaps</strong>: Transient 503 errors and 200 recovery.</li>
      <li>• <strong>Sub-2ms Resets</strong>: Clean state via <code>POST /__admin/scenarios/reset</code>.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-cyan-500/30 text-xs font-mono text-cyan-300">
    ✨ Zero DB Writes: Pure memory state
  </div>
</div>

<div class="slide-card p-3.5 md:p-4 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5 pb-1 border-b border-emerald-500/30">
      <span class="text-emerald-300 font-bold text-base flex items-center gap-1.5">
        <span>🪄</span> 3. Dynamic Chaos
      </span>
      <span class="text-xs font-mono text-emerald-300/80 bg-emerald-900/40 px-2 py-0.5 rounded">Simulation</span>
    </div>
    <ul class="space-y-1.5 text-sm md:text-base text-slate-200 leading-snug">
      <li>• <strong>Handlebars Engine</strong>: Echoes tracing headers and request models.</li>
      <li>• <strong>Computed Math</strong>: Computes 7% Thai VAT and expiration dates.</li>
      <li>• <strong>Outbound Webhooks</strong>: Asynchronous POST callbacks into tests.</li>
      <li>• <strong>Socket Faults</strong>: Dropped connections and log-normal jitter.</li>
    </ul>
  </div>
  <div class="mt-2 pt-1 border-t border-emerald-500/30 text-xs font-mono text-emerald-300">
    ✨ Total Telemetry: Trace propagation
  </div>
</div>

</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-fuchsia-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-fuchsia-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Architectural Milestone:</strong> WireMock converts flaky third-party sandboxes into fast, deterministic, hermetic local stubs. Ready for Section 04 hands-on labs!
  </span>
</div>

<!--
Presenter Notes:
- Summarize the three pillars: Precision Routing, Stateful Scenarios, and Dynamic Chaos.
- Reiterate that attendees now possess the entire toolset needed to isolate any microservice.
- Transition immediately to Section 04 hands-on lab challenges.
-->

---
layout: section
---

# 🛠️ Section 04
## Lab Challenges

<p class="section-narrative">
  Interactive terminal exercises, state verification recipes, and the self-guided biometric challenge.
</p>

---
class: pt-3 pb-2 px-8
---

# Practice Lab 1: Web UI &amp; JSONPath Matching

### Inspect live stub mappings and verify JSONPath threshold evaluation

<div class="grid grid-cols-2 gap-3 mt-1.5">

<div class="slide-card p-4 border border-fuchsia-500/40 bg-fuchsia-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-fuchsia-500/30">
      <span class="text-fuchsia-400 font-bold text-base flex items-center gap-1.5">
        <span>🔍</span> Scenario &amp; Acceptance Criteria
      </span>
      <span class="text-xs font-mono text-fuchsia-300/80 bg-fuchsia-900/40 px-2 py-0.5 rounded">Lab 1</span>
    </div>
    <p class="text-sm text-slate-200 leading-relaxed mb-2">
      <strong>Target:</strong> <code>POST /lab/api/stateless/payments</code>
    </p>
    <ul class="space-y-1.5 md:space-y-2 text-base md:text-lg text-slate-200 leading-snug">
      <li>• <strong>High-Value (&gt; 1000):</strong> When payment amount is &gt; 1000, WireMock matches <code>$[?(@.payment.amount &gt; 1000)]</code> ➔ Returns <code>201 Created</code>.</li>
      <li>• <strong>Low-Value (&le; 1000):</strong> When amount is 500, no stub matches ➔ Returns <code>404 Not Found</code>.</li>
      <li>• <strong>Web UI Journal:</strong> Inspect unmatched diffs in the live dashboard journal.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-fuchsia-500/30 text-xs md:text-sm font-mono text-cyan-300">
    🌐 Dashboard: http://localhost:8088/__admin/webapp (admin / password)
  </div>
</div>

<div class="slide-card p-4 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-base flex items-center gap-1.5">
        <span>⚡</span> Hands-On Verification
      </span>
      <span class="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Terminal / REST</span>
    </div>
    <div class="sv-terminal text-sm leading-relaxed mb-2">
      <div class="font-mono text-emerald-400 mb-1"># Test Case 1: High-value (&gt; 1000) ➔ 201 Created</div>
      <div class="font-mono text-slate-200">curl -s -X POST http://localhost:8088/lab/api/stateless/payments \</div>
      <div class="font-mono text-slate-200 pl-3">-H "Content-Type: application/json" \</div>
      <div class="font-mono text-slate-200 pl-3">-d '{"payment":{"amount":2500},"customer":{"name":"Alice"}}'</div>
      <div class="font-mono text-rose-400 mt-2 mb-1"># Test Case 2: Low-value (500) ➔ 404 Unmatched</div>
      <div class="font-mono text-slate-200">curl -s -X POST http://localhost:8088/lab/api/stateless/payments \</div>
      <div class="font-mono text-slate-200 pl-3">-H "Content-Type: application/json" \</div>
      <div class="font-mono text-slate-200 pl-3">-d '{"payment":{"amount":500},"customer":{"name":"Bob"}}'</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-slate-700/60 text-xs font-mono text-slate-300">
    📂 Stub: wiremock/mappings/lab-stateless/02-json-body-matching.json
  </div>
</div>

</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-fuchsia-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-fuchsia-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Key Skill:</strong> Use the Web UI Request Journal to inspect unmatched field diffs when debugging integration failures.
  </span>
</div>

<!--
Presenter Notes:
- Guide attendees to open http://localhost:8088/__admin/webapp in browser.
- Run curl Case 1 (201 Created), then curl Case 2 (404 Not Found).
- In Web UI, click on unmatched request and show the JSONPath failure diff.
-->

---
class: pt-3 pb-2 px-8
---

# Practice Lab 2: Scenario Steering &amp; Token Replay

### Execute multi-scenario steering and verify one-time authorization code replay defense

<div class="grid grid-cols-2 gap-3 mt-1.5">

<div class="slide-card p-4 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-cyan-500/30">
      <span class="text-cyan-400 font-bold text-base flex items-center gap-1.5">
        <span>🛡️</span> Scenario &amp; Acceptance Criteria
      </span>
      <span class="text-xs font-mono text-cyan-300/80 bg-cyan-900/40 px-2 py-0.5 rounded">Lab 2</span>
    </div>
    <p class="text-sm text-slate-200 leading-relaxed mb-2">
      <strong>Target:</strong> <code>POST /lab/api/oauth/token</code>
    </p>
    <ul class="space-y-1.5 md:space-y-2 text-base md:text-lg text-slate-200 leading-snug">
      <li>• <strong>First Call (Exchange):</strong> Code <code>auth_code_12345</code> exchanges successfully ➔ Returns <code>200 OK</code> with JWT and transitions state to <code>TOKEN_CONSUMED</code>.</li>
      <li>• <strong>Second Call (Replay Attack):</strong> Re-sending the same code ➔ WireMock detects consumed state and returns <code>400 Bad Request</code> with <code>{"error": "invalid_grant"}</code>.</li>
      <li>• <strong>Reset:</strong> Single HTTP POST resets scenario back to clean state.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-cyan-500/30 text-xs md:text-sm font-mono text-cyan-300">
    ✨ State Resets in 2ms via POST /__admin/scenarios/reset
  </div>
</div>

<div class="slide-card p-4 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-base flex items-center gap-1.5">
        <span>⚡</span> Hands-On Verification
      </span>
      <span class="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Terminal / REST</span>
    </div>
    <div class="sv-terminal text-sm leading-relaxed mb-2">
      <div class="font-mono text-emerald-400 mb-1"># Call 1: Consume code ➔ 200 OK (JWT)</div>
      <div class="font-mono text-slate-200">curl -s -X POST http://localhost:8088/lab/api/oauth/token \</div>
      <div class="font-mono text-slate-200 pl-3">-d "grant_type=authorization_code&amp;code=auth_code_12345"</div>
      <div class="font-mono text-rose-400 mt-2 mb-1"># Call 2: Replay attack ➔ 400 Bad Request</div>
      <div class="font-mono text-slate-200">curl -s -X POST http://localhost:8088/lab/api/oauth/token \</div>
      <div class="font-mono text-slate-200 pl-3">-d "grant_type=authorization_code&amp;code=auth_code_12345"</div>
      <div class="font-mono text-cyan-300 mt-2 mb-1"># Reset scenario state for next test</div>
      <div class="font-mono text-slate-200">curl -s -X POST http://localhost:8088/__admin/scenarios/reset</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-slate-700/60 text-xs font-mono text-slate-300">
    📂 Stub: wiremock/mappings/lab-stateful/auth-token-replay-prevention/
  </div>
</div>

</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-cyan-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-cyan-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Key Skill:</strong> WireMock Finite State Machines simulate stateful business invariants without persistent database side-effects.
  </span>
</div>

<!--
Presenter Notes:
- Emphasize the security vulnerability: Replay attacks are difficult to test against real staging OAuth providers because reset requires manual db wipes.
- Show how WireMock's FSM makes this deterministic: 1 call consumes, 2nd call blocks.
-->

---
class: pt-3 pb-2 px-8
---

# Practice Lab 3: Flapping Retry &amp; Self-Healing

### Observe transient service outages and verify client exponential backoff recovery

<div class="grid grid-cols-2 gap-3 mt-1.5">

<div class="slide-card p-4 border border-indigo-500/40 bg-indigo-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-indigo-500/30">
      <span class="text-indigo-400 font-bold text-base flex items-center gap-1.5">
        <span>🔄</span> Scenario &amp; Acceptance Criteria
      </span>
      <span class="text-xs font-mono text-indigo-300/80 bg-indigo-900/40 px-2 py-0.5 rounded">Lab 3</span>
    </div>
    <p class="text-sm text-slate-200 leading-relaxed mb-2">
      <strong>Target:</strong> <code>GET /lab/api/unstable-endpoint</code>
    </p>
    <ul class="space-y-1.5 md:space-y-2 text-base md:text-lg text-slate-200 leading-snug">
      <li>• <strong>Attempt 1 &amp; 2 (Flapping):</strong> Service is temporarily overloaded ➔ WireMock returns <code>HTTP 503 Service Unavailable</code> with <code>Retry-After: 1</code> header.</li>
      <li>• <strong>Attempt 3 (Self-Healing):</strong> State transitions to <code>HEALTHY</code> ➔ WireMock returns <code>HTTP 200 OK {"status": "SUCCESS"}</code>.</li>
      <li>• <strong>Client Assertion:</strong> Validates that client retry middleware recovers gracefully without throwing unhandled exceptions.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-indigo-500/30 text-xs md:text-sm font-mono text-indigo-300">
    ✨ Models AWS/Vendor transient throttling &amp; recovery
  </div>
</div>

<div class="slide-card p-4 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-base flex items-center gap-1.5">
        <span>⚡</span> Hands-On Verification
      </span>
      <span class="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Terminal / REST</span>
    </div>
    <div class="sv-terminal text-sm leading-relaxed mb-2">
      <div class="font-mono text-rose-400 mb-1"># Attempt 1: Returns HTTP 503 Service Unavailable</div>
      <div class="font-mono text-slate-200">curl -s -i http://localhost:8088/lab/api/unstable-endpoint</div>
      <div class="font-mono text-rose-400 mt-2 mb-1"># Attempt 2: Returns HTTP 503 Service Unavailable</div>
      <div class="font-mono text-slate-200">curl -s -i http://localhost:8088/lab/api/unstable-endpoint</div>
      <div class="font-mono text-emerald-400 mt-2 mb-1"># Attempt 3: Returns HTTP 200 OK {"status": "SUCCESS"}</div>
      <div class="font-mono text-slate-200">curl -s -i http://localhost:8088/lab/api/unstable-endpoint</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-slate-700/60 text-xs font-mono text-slate-300">
    📂 Stub: wiremock/mappings/lab-stateful/retry-recovery-flow/
  </div>
</div>

</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-indigo-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-indigo-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Key Skill:</strong> Flapping scenarios allow CI pipelines to thoroughly test retry budgets, jitter algorithms, and circuit breakers.
  </span>
</div>

<!--
Presenter Notes:
- Run the 3 curl commands in rapid succession.
- Point out the Retry-After header and show how the scenario step automatically advances on each request.
-->

---
class: pt-3 pb-2 px-8
---

# Practice Lab 4: Dynamic Templating &amp; Chaos Latency

### Execute dynamic VAT calculations and verify client timeout cancellation handlers

<div v-pre class="grid grid-cols-2 gap-3 mt-1.5">

<div class="slide-card p-4 border border-amber-500/40 bg-amber-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-amber-500/30">
      <span class="text-amber-400 font-bold text-base flex items-center gap-1.5">
        <span>🪄</span> Scenario &amp; Acceptance Criteria
      </span>
      <span class="text-xs font-mono text-amber-300/80 bg-amber-900/40 px-2 py-0.5 rounded">Lab 4</span>
    </div>
    <p class="text-sm text-slate-200 leading-relaxed mb-2">
      <strong>Targets:</strong> <code>POST /lab/api/stateless/orders</code> &bull; <code>/slow-endpoint</code>
    </p>
    <ul class="space-y-1.5 md:space-y-2 text-base md:text-lg text-slate-200 leading-snug">
      <li>• <strong>Dynamic Math:</strong> Send order payload with <code>price: 4000</code> ➔ WireMock computes 7% VAT dynamically: <code>{{math price '*' 1.07}}</code> ➔ Returns total <code>4280.0</code>.</li>
      <li>• <strong>Chaos Delay:</strong> Call delayed route configured with <code>fixedDelayMilliseconds: 3500</code>.</li>
      <li>• <strong>Timeout Assertion:</strong> Verify client cancels after 2s (<code>context.WithTimeout</code>) without leaking worker goroutines.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-amber-500/30 text-xs md:text-sm font-mono text-amber-300">
    ✨ Tests client goroutine context cancellation under delay
  </div>
</div>

<div class="slide-card p-4 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-base flex items-center gap-1.5">
        <span>⚡</span> Hands-On Verification
      </span>
      <span class="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Terminal / REST</span>
    </div>
    <div class="sv-terminal text-sm leading-relaxed mb-2">
      <div class="font-mono text-amber-400 mb-1"># Test Case 1: Dynamic VAT calculation (4000 ➔ 4280)</div>
      <div class="font-mono text-slate-200">curl -s -X POST http://localhost:8088/lab/api/stateless/orders \</div>
      <div class="font-mono text-slate-200 pl-3">-H "Content-Type: application/json" \</div>
      <div class="font-mono text-slate-200 pl-3">-d '{"userId":"U-100","price":4000}'</div>
      <div class="font-mono text-cyan-300 mt-2 mb-1"># Test Case 2: Assert client timeout aborts at 2s</div>
      <div class="font-mono text-slate-200">time curl -s --max-time 2 \</div>
      <div class="font-mono text-slate-200 pl-3">http://localhost:8088/lab/api/stateless/slow-endpoint</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-slate-700/60 text-xs font-mono text-slate-300">
    📂 Stub: wiremock/mappings/lab-stateless/05-response-templating.json
  </div>
</div>

</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-amber-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-amber-200 font-medium flex items-center gap-2 leading-snug">
    <span>💡</span> <strong>Key Skill:</strong> Dynamic templating computes calculations on the fly while chaos latency verifies fail-fast timeout boundaries.
  </span>
</div>

<!--
Presenter Notes:
- Highlight the math helper: `math price '*' 1.07` eliminates hardcoded test values.
- Point out the `time curl --max-time 2` output: it terminates exactly at 2.0s rather than waiting 3.5s.
-->

---
class: pt-3 pb-2 px-8
---

# Challenge: Face Biometrics Stub

### Author a self-service biometric verification stub with liveness confidence thresholding

<div class="grid grid-cols-2 gap-3 mt-1.5">

<div class="slide-card p-4 border border-fuchsia-500/40 bg-fuchsia-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-fuchsia-500/30">
      <span class="text-fuchsia-400 font-bold text-base flex items-center gap-1.5">
        <span>🎯</span> DIY Challenge Requirements
      </span>
      <span class="text-xs font-mono text-fuchsia-300/80 bg-fuchsia-900/40 px-2 py-0.5 rounded">DIY Lab</span>
    </div>
    <p class="text-sm text-slate-200 leading-relaxed mb-2">
      <strong>Target:</strong> <code>POST /lab/api/ekyc/biometrics</code>
    </p>
    <ul class="space-y-1.5 md:space-y-2 text-base md:text-lg text-slate-200 leading-snug">
      <li>• <strong>Low Confidence (&lt; 85.0):</strong> Return <code>422 Unprocessable Entity</code> with JSON error <code>{"error": "LIVENESS_FAILED", "code": "ERR_LOW_CONFIDENCE"}</code>.</li>
      <li>• <strong>High Confidence (&ge; 85.0):</strong> Return <code>200 OK</code> with dynamic UUID <code>scanId</code>, echoed <code>nationalId</code>, and timestamp.</li>
      <li>• <strong>Chaos Latency:</strong> Inject <code>2500ms</code> latency to verify client timeout cancellation handlers.</li>
    </ul>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-fuchsia-500/30 text-xs md:text-sm font-mono text-fuchsia-300">
    📂 Save file to: wiremock/mappings/diy-biometrics.json
  </div>
</div>

<div class="slide-card p-4 border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/60">
      <span class="text-slate-100 font-bold text-base flex items-center gap-1.5">
        <span>⚡</span> Verification Commands
      </span>
      <span class="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Terminal / REST</span>
    </div>
    <div class="sv-terminal text-sm leading-relaxed mb-2">
      <div class="font-mono text-rose-400 mb-1"># Test Case 1: Low confidence (71.2) ➔ Expect HTTP 422</div>
      <div class="font-mono text-slate-200">curl -s -i -X POST http://localhost:8088/lab/api/ekyc/biometrics \</div>
      <div class="font-mono text-slate-200 pl-3">-H "Content-Type: application/json" \</div>
      <div class="font-mono text-slate-200 pl-3">-d '{"nationalId":"1100500123456", "confidence":71.2}'</div>
      <div class="font-mono text-emerald-400 mt-2 mb-1"># Test Case 2: High confidence (92.4) ➔ Expect HTTP 200 + UUID</div>
      <div class="font-mono text-slate-200">curl -s -i -X POST http://localhost:8088/lab/api/ekyc/biometrics \</div>
      <div class="font-mono text-slate-200 pl-3">-H "Content-Type: application/json" \</div>
      <div class="font-mono text-slate-200 pl-3">-d '{"nationalId":"1100500123456", "confidence":92.4}'</div>
    </div>
  </div>
  <div class="mt-2.5 pt-1.5 border-t border-slate-700/60 text-xs font-mono text-slate-300">
    ✨ Reload stubs via: POST /__admin/mappings/reset
  </div>
</div>

</div>

<div v-pre class="slide-card py-2 px-4 flex items-center text-base md:text-lg mt-2 border border-fuchsia-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-fuchsia-200 font-medium flex items-center gap-2 leading-snug">
    <span>🏆</span> <strong>Challenge Goal:</strong> Combine JSONPath operators, Handlebars UUID generation, and chaos latency into a single production stub.
  </span>
</div>

<!--
Presenter Notes:
- Give attendees 15 minutes to implement the stub in wiremock/mappings/diy-biometrics.json.
- Solution reference is available in labs/wiremock-stateless/diy-biometrics.http.
-->

---
class: pt-3 pb-2 px-8
---

# Rollout Playbook &amp; Team Adoption

### How to integrate WireMock into your service pipeline today

<div class="grid grid-cols-3 gap-3.5 mt-2">

<div class="slide-card p-4 border border-cyan-500/40 bg-cyan-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5">
      <span class="text-cyan-400 font-bold text-base flex items-center gap-1.5">
        <span>💻</span> Phase 1: Local Dev
      </span>
      <span class="text-xs font-mono text-cyan-300/80 bg-cyan-900/40 px-1.5 py-0.5 rounded">Day 1</span>
    </div>
    <p class="text-sm text-slate-200 leading-relaxed">
      Run WireMock alongside your service with <code>docker compose up wiremock</code>. Explore and debug stubs interactively via the Web UI at <code>:8088/__admin/webapp</code>.
    </p>
  </div>
  <div class="mt-3 pt-2 border-t border-cyan-500/30 text-xs font-mono text-cyan-300">
    🎯 Immediate zero-dependency local runs
  </div>
</div>

<div class="slide-card p-4 border border-emerald-500/40 bg-emerald-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5">
      <span class="text-emerald-400 font-bold text-base flex items-center gap-1.5">
        <span>🚀</span> Phase 2: CI PR Gate
      </span>
      <span class="text-xs font-mono text-emerald-300/80 bg-emerald-900/40 px-1.5 py-0.5 rounded">Sprint 1</span>
    </div>
    <p class="text-sm text-slate-200 leading-relaxed">
      Embed WireMock into automated integration suites via Testcontainers or headless Docker. Enforce 100% deterministic builds with zero sandbox flakiness.
    </p>
  </div>
  <div class="mt-3 pt-2 border-t border-emerald-500/30 text-xs font-mono text-emerald-300">
    🎯 Fast PR checks under 30 seconds
  </div>
</div>

<div class="slide-card p-4 border border-purple-500/40 bg-purple-950/20 flex flex-col justify-between">
  <div>
    <div class="flex items-center justify-between mb-1.5">
      <span class="text-purple-400 font-bold text-base flex items-center gap-1.5">
        <span>🛡️</span> Phase 3: Chaos Drills
      </span>
      <span class="text-xs font-mono text-purple-300/80 bg-purple-900/40 px-1.5 py-0.5 rounded">Sprint 2</span>
    </div>
    <p class="text-sm text-slate-200 leading-relaxed">
      Add fault-injection stubs (503 flapping, socket disconnects, 2s latency) to verify that client retry loops and timeout cancellations handle real-world failures safely.
    </p>
  </div>
  <div class="mt-3 pt-2 border-t border-purple-500/30 text-xs font-mono text-purple-300">
    🎯 Bulletproof failure resilience
  </div>
</div>

</div>

<div v-pre class="slide-card py-3 px-4 flex items-center text-lg mt-3 border border-cyan-500/30 bg-slate-900/60 rounded-lg">
  <span class="text-cyan-200 text-lg font-medium flex items-center gap-3 leading-relaxed">
    <span>🏁</span> <strong>Immediate Action:</strong> Check out <code>wiremock/mappings/</code> and run <code>make test-integration</code> to verify against stubs.
  </span>
</div>

<!--
Presenter Notes:
- Wrap up the session with a concrete Call to Action (The "Ask"):
  1. Have engineers try `make test-integration` on their laptops today.
  2. Propose adding WireMock container to the team's CI GitHub Actions workflow this sprint.
  3. Thank the audience and open the floor for questions.
-->
