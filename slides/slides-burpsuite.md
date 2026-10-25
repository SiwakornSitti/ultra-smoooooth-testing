---
theme: default
colorSchema: dark
background: '#0f172a'
title: Burp Suite — MITM Traffic Control & Interception Deep Dive
info: |
  Comprehensive guide to in-flight HTTP interception, dual-direction tampering, scenario header steering, match & replace automation, and security boundary testing.
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
mdc: true
---

<div class="flex justify-center items-center w-full h-full my-auto">
  <div class="cover-slide text-center p-8">
    <div class="inline-block px-3.5 py-1 mb-4 rounded-full sv-tag-fuchsia text-sm tracking-wide">
      PILLAR 2 &bull; IN-FLIGHT TRAFFIC INTERCEPTION
    </div>
    <h1 class="text-4xl md:text-5xl font-black mb-3">Burp Suite <span class="text-fuchsia">Deep Dive</span></h1>
    <p class="cover-subtitle text-slate-300 text-lg mb-6 max-w-2xl mx-auto font-medium">
      In-Flight Traffic Interception, Live Request/Response Tampering &amp; Security Resilience
    </p>
    <div class="flex flex-wrap justify-center gap-2 mt-4 text-xs font-mono">
      <span class="cover-tag">Burp Proxy</span>
      <span class="cover-tag">MITM Architecture</span>
      <span class="cover-tag">Duplex Intercept</span>
      <span class="cover-tag">Scenario Steering</span>
      <span class="cover-tag">Match &amp; Replace</span>
    </div>
  </div>
</div>

---
class: py-5 px-10
---

# The In-Flight Testing Gap

### Why Modern Systems Demand a Transparent Proxy

<div class="multi-col-grid-2 mt-2 gap-4">

<div class="col-card p-5 space-y-3">
  <h3 class="text-rose-400 font-bold text-lg mb-1">Code Modification Fragility</h3>
  <ul class="space-y-2.5 text-slate-200 text-sm leading-relaxed">
    <li>• <strong>Hardcoded branches</strong>: Adding debug flags or mock conditionals leaks risk into production bundles.</li>
    <li>• <strong>Gateway blindness</strong>: Client unit tests cannot evaluate how reverse proxies handle malformed HTTP frames.</li>
    <li>• <strong>Mobile app barriers</strong>: Simulating network failures on mobile often requires cumbersome internal build variants.</li>
    <li>• <strong>Unobserved traffic</strong>: Blackbox client SDKs transmit uninspected packets without local visibility.</li>
  </ul>
  <div class="mt-auto pt-2.5 text-rose-300 font-mono text-xs border-t border-slate-700/60">
    Result: Test code pollutes production releases and hides real protocol edge cases.
  </div>
</div>

<div class="col-card p-5 space-y-3">
  <h3 class="text-cyan-400 font-bold text-lg mb-1">The Burp MITM Approach</h3>
  <ul class="space-y-2.5 text-slate-200 text-sm leading-relaxed">
    <li>• <strong>Zero source changes</strong>: Intercepts network packets at the socket layer (:8080). Code stays 100% clean.</li>
    <li>• <strong>Interactive mutation</strong>: Pause requests mid-flight, modify JSON values, or alter response status codes on demand.</li>
    <li>• <strong>Universal support</strong>: Intercepts web browsers, mobile apps, curl, Playwright, and services identically.</li>
    <li>• <strong>Automated rules</strong>: Match &amp; Replace transparently alters passing CI traffic unattended.</li>
  </ul>
  <div class="mt-auto pt-2.5 text-cyan-300 font-mono text-xs border-t border-slate-700/60">
    Result: Complete traffic control across the entire boundary without a single code edit.
  </div>
</div>

</div>

---
class: py-5 px-10
---

# Burp Suite Overview

<div class="sv-card space-y-3">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
    <div>
      <span class="text-sm font-semibold text-slate-100">Module Curriculum</span>
      <span class="text-xs text-slate-400 ml-2">Mastering in-flight traffic control &amp; security boundary testing</span>
    </div>
    <span class="text-xs font-mono text-cyan-400">4 Modules</span>
  </div>
  <div class="grid grid-cols-2 gap-3 mt-1.5">
    <div class="slide-card p-3.5 space-y-1">
      <div class="font-bold text-fuchsia-400 text-base mb-1">1. MITM Proxy Architecture</div>
      <p class="text-slate-300 text-sm leading-relaxed">
        Transparent network interception topology between client apps and backend gateways without modifying application code.
      </p>
    </div>
    <div class="slide-card p-3.5 space-y-1">
      <div class="font-bold text-cyan-400 text-base mb-1">2. Bi-Directional Traffic Control</div>
      <p class="text-slate-300 text-sm leading-relaxed">
        Request tampering (client to gateway) and response mutation (gateway to client) with live packet pausing.
      </p>
    </div>
    <div class="slide-card p-3.5 space-y-1">
      <div class="font-bold text-emerald-400 text-base mb-1">3. Scenario Steering &amp; Match/Replace</div>
      <p class="text-slate-300 text-sm leading-relaxed">
        Injecting <code>Mock-Scenario</code> headers to steer downstream WireMock stubs and configuring automated rule engines.
      </p>
    </div>
    <div class="slide-card p-3.5 space-y-1">
      <div class="font-bold text-amber-400 text-base mb-1">4. Auditing, Replay &amp; Reference</div>
      <p class="text-slate-300 text-sm leading-relaxed">
        HTTP history log auditing, handoff to Repeater for parameter fuzzing, and practical operational commands.
      </p>
    </div>
  </div>
  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Includes architectural division: WireMock downstream virtualization vs. Burp Suite MITM proxying.</span>
    <span class="text-slate-400 font-mono text-[10px]">Overview</span>
  </div>
</div>

---
class: text-center flex flex-col justify-center items-center h-full
---

<div class="space-y-3">
  <div class="inline-block px-3.5 py-1 rounded-full text-xs font-mono tracking-wider sv-tag-fuchsia">
    SECTION 02
  </div>
  <h1 class="text-3xl md:text-4xl font-extrabold text-slate-100">
    Fundamentals &amp; Tooling Reference
  </h1>
  <p class="text-slate-400 text-sm max-w-xl mx-auto">
    MITM proxy architecture, listener bindings, CA certificate installation, and tool comparisons
  </p>
</div>

---
class: py-5 px-10
---

# Burp Suite Architecture

<div class="sv-card space-y-2">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-1.5">
    <div>
      <span class="text-xs font-semibold text-slate-100">MITM Network Topology</span>
      <span class="text-xs text-slate-400 ml-2">Client, proxy listener, and backend gateway data paths</span>
    </div>
    <span class="text-[11px] font-mono text-cyan-400">Port 8080</span>
  </div>

  <div class="flex justify-center items-center w-full py-1">
    <div class="adorable-arch-container">
      <img src="/burp_suite_architecture.jpg" class="adorable-arch-img" alt="Burp Suite MITM Proxy Architecture" />
    </div>
  </div>

  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Data flow: Client (Browser / Mobile) &rarr; Burp Suite (:8080) &rarr; BFF Gateway (:8080) &rarr; Internal Services.</span>
    <span class="text-slate-400 font-mono text-[10px]">Socket Proxy</span>
  </div>
</div>

---
class: py-5 px-10
---

# Burp Suite Operational Reference

<div class="sv-card space-y-2">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
    <div>
      <span class="text-xs font-semibold text-slate-100">Setup &amp; Diagnostic Shortcuts</span>
      <span class="text-xs text-slate-400 ml-2">Proxy listeners, certificates, and keyboard commands</span>
    </div>
    <span class="text-[11px] font-mono text-cyan-400">Quick Reference</span>
  </div>
  <div class="grid grid-cols-2 gap-2.5 text-xs">
    <div class="p-2.5 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5">
      <div class="font-semibold text-fuchsia-400 text-[11px]">Proxy Listeners &amp; Certificates</div>
      <div class="space-y-1.5 text-[11px]">
        <div>
          <code class="font-mono text-cyan-300 text-[10px] block">127.0.0.1:8080</code>
          <span class="text-slate-400 text-[10px]">Default proxy listener for local browser sessions.</span>
        </div>
        <div>
          <code class="font-mono text-cyan-300 text-[10px] block">http://burpsuite/cert</code>
          <span class="text-slate-400 text-[10px]">Download PortSwigger CA certificate to trust HTTPS.</span>
        </div>
        <div>
          <code class="font-mono text-cyan-300 text-[10px] block">0.0.0.0:8080</code>
          <span class="text-slate-400 text-[10px]">Bind to all interfaces to intercept mobile device/Docker traffic.</span>
        </div>
      </div>
    </div>
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5">
      <div class="font-semibold text-fuchsia-400 text-[11px]">Essential Keyboard Shortcuts</div>
      <div class="space-y-1.5 text-[11px]">
        <div>
          <code class="font-mono text-emerald-300 text-[10px] block">Cmd+R / Ctrl+R</code>
          <span class="text-slate-400 text-[10px]">Send active request to Repeater tab immediately.</span>
        </div>
        <div>
          <code class="font-mono text-emerald-300 text-[10px] block">Cmd+I / Ctrl+I</code>
          <span class="text-slate-400 text-[10px]">Send active request to Intruder for parameter fuzzing.</span>
        </div>
        <div>
          <code class="font-mono text-emerald-300 text-[10px] block">Cmd+F / Ctrl+F</code>
          <span class="text-slate-400 text-[10px]">Forward intercepted request immediately.</span>
        </div>
      </div>
    </div>
  </div>
  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Rule of thumb: Use Match &amp; Replace for automated runs; use Intercept for ad-hoc debugging.</span>
    <span class="text-slate-400 font-mono text-[10px]">Burp Suite Reference</span>
  </div>
</div>

---
class: py-5 px-10
---

# Burp Suite vs. WireMock

<div class="sv-card space-y-3">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
    <div>
      <span class="text-xs font-semibold text-slate-100">Architectural Roles Across the Test Pipeline</span>
      <span class="text-xs text-slate-400 ml-2">In-flight MITM proxy interception vs. downstream service virtualization</span>
    </div>
    <span class="text-[11px] font-mono text-cyan-400">Architecture</span>
  </div>
  <div class="grid grid-cols-2 gap-3 text-xs">
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
      <div class="space-y-1.5">
        <div class="font-semibold text-fuchsia-400 text-sm">Burp Suite: In-Flight MITM Proxy</div>
        <ul class="space-y-1.5 text-slate-200 text-xs leading-relaxed">
          <li>• <strong class="text-slate-100">Placement:</strong> Between client (browser/mobile app) and backend gateway (BFF).</li>
          <li>• <strong class="text-slate-100">Mechanism:</strong> Transparent socket proxy intercepting live HTTP traffic.</li>
          <li>• <strong class="text-slate-100">Interception:</strong> Live traffic pause, body tampering, Match &amp; Replace rules.</li>
          <li>• <strong class="text-slate-100">Best used for:</strong> Exploratory QA, security fuzzing, ad-hoc header injection, UI error simulation.</li>
        </ul>
      </div>
      <div class="text-xs text-slate-400 pt-1.5 border-t border-slate-700/60 mt-2 italic">
        "How can I alter traffic between client and gateway without modifying code?"
      </div>
    </div>
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
      <div class="space-y-1.5">
        <div class="font-semibold text-cyan-400 text-sm">WireMock: Downstream Virtualization</div>
        <ul class="space-y-1.5 text-slate-200 text-xs leading-relaxed">
          <li>• <strong class="text-slate-100">Placement:</strong> Downstream 3rd-party provider endpoint (replaces SMS, OAuth, Bank Core).</li>
          <li>• <strong class="text-slate-100">Mechanism:</strong> Standalone HTTP mock server receiving routed external calls.</li>
          <li>• <strong class="text-slate-100">Matching &amp; State:</strong> Declarative JSON stubs, JSONPath regex, Finite State Machines.</li>
          <li>• <strong class="text-slate-100">Best used for:</strong> Automated CI/CD suites, deterministic contracts, chaos timeouts, webhooks.</li>
        </ul>
      </div>
      <div class="text-xs text-slate-400 pt-1.5 border-t border-slate-700/60 mt-2 italic">
        "How does my service behave when external dependencies fail or time out?"
      </div>
    </div>
  </div>
  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Team synergy: Use Burp to inject scenario headers at the edge, and let WireMock simulate provider outcomes downstream.</span>
    <span class="text-slate-400 font-mono text-[10px]">End-to-End Testing</span>
  </div>
</div>

---
class: text-center flex flex-col justify-center items-center h-full
---

<div class="space-y-3">
  <div class="inline-block px-3.5 py-1 rounded-full text-xs font-mono tracking-wider sv-tag-fuchsia">
    SECTION 03
  </div>
  <h1 class="text-3xl md:text-4xl font-extrabold text-slate-100">
    Real-World Use Cases &amp; Application
  </h1>
  <p class="text-slate-400 text-sm max-w-xl mx-auto">
    Live duplex interception, packet tampering, automated header injection, and traffic diagnostics
  </p>
</div>

---
class: py-5 px-10
---

# Proxy Intercept Capabilities

<div class="sv-card space-y-3">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
    <div>
      <span class="text-xs font-semibold text-slate-100">Dual-Direction Traffic Control</span>
      <span class="text-xs text-slate-400 ml-2">Tampering outbound requests and inbound responses</span>
    </div>
    <span class="text-[11px] font-mono text-cyan-400">Duplex Interception</span>
  </div>
  <div class="grid grid-cols-2 gap-3 text-xs">
    <div class="p-3.5 rounded-lg border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
      <div class="space-y-1.5">
        <div class="font-semibold text-fuchsia-400">Request Interception (Client &rarr; Server)</div>
        <p class="text-[11px] text-slate-300 leading-relaxed">
          Pause outbound HTTP requests mid-flight to inspect payloads, inject scenario headers, or tamper with parameters before packets reach the gateway.
        </p>
      </div>
      <div class="text-[10px] text-slate-400 pt-2 border-t border-slate-700/60 mt-2">
        Use case: Inject fault headers to test downstream error handling paths.
      </div>
    </div>
    <div class="p-3.5 rounded-lg border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
      <div class="space-y-1.5">
        <div class="font-semibold text-cyan-400">Response Interception (Server &rarr; Client)</div>
        <p class="text-[11px] text-slate-300 leading-relaxed">
          Pause inbound HTTP responses to alter status codes (<code>200 &rarr; 500/403</code>) and mutate payload values to test frontend error handling and UI fallback resilience.
        </p>
      </div>
      <div class="text-[10px] text-slate-400 pt-2 border-t border-slate-700/60 mt-2">
        Use case: Verify frontend components gracefully display fallback banners.
      </div>
    </div>
  </div>
  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Duplex control gives testers the ability to manipulate both ends of the HTTP exchange independently.</span>
    <span class="text-slate-400 font-mono text-[10px]">Interactive MITM</span>
  </div>
</div>

---
class: py-5 px-10
---

# Bi-Directional Interception Flow

<div class="sv-card space-y-2">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-1.5">
    <div>
      <span class="text-xs font-semibold text-slate-100">Duplex Interception Visual Flow</span>
      <span class="text-xs text-slate-400 ml-2">Tracing request tampering and response mutation</span>
    </div>
    <span class="text-[11px] font-mono text-cyan-400">Request &amp; Response</span>
  </div>

  <div class="flex justify-center items-center w-full py-1">
    <div class="adorable-arch-container">
      <img src="/burp_duplex_intercept.jpg" class="adorable-arch-img" alt="Bi-Directional Duplex Interception" />
    </div>
  </div>

  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Duplex control: Intercept outbound requests to steer backend mocks; mutate responses to verify UI error handling.</span>
    <span class="text-slate-400 font-mono text-[10px]">Duplex Intercept</span>
  </div>
</div>

---
class: py-5 px-10
---

# Live Intercept Workflow

<div class="sv-card space-y-2">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-1.5">
    <div>
      <span class="text-xs font-semibold text-slate-100">Interactive Packet Control</span>
      <span class="text-xs text-slate-400 ml-2">Pausing, inspecting, modifying, and forwarding frames</span>
    </div>
    <span class="text-[11px] font-mono text-cyan-400">Real-Time Control</span>
  </div>

  <div class="flex justify-center items-center w-full py-1">
    <div class="adorable-arch-container">
      <img src="/burp_intercept_action.jpg" class="adorable-arch-img" alt="Live Intercept Action in Burp Suite" />
    </div>
  </div>

  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Controls: Forward releases modified packet; Drop terminates TCP connection; Action sends frame to Repeater.</span>
    <span class="text-slate-400 font-mono text-[10px]">Burp Intercept Tab</span>
  </div>
</div>

---
class: py-5 px-10
---

# Header Injection in Practice

<div v-pre class="sv-card space-y-2.5">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
    <div>
      <span class="text-xs font-semibold text-slate-100">Before &amp; After Request Tampering</span>
      <span class="text-xs text-slate-400 ml-2">Injecting Mock-Scenario headers without application changes</span>
    </div>
    <span class="text-[11px] font-mono text-fuchsia-400 bg-fuchsia-950/40 border border-fuchsia-500/30 px-2 py-0.5 rounded">Mock-Scenario</span>
  </div>
  <div class="grid grid-cols-2 gap-3 text-xs">
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
      <div>
        <div class="font-mono text-[11px] font-semibold text-slate-300 mb-1">1. Original Request from Client</div>
        <p class="text-[11px] text-slate-400 mb-2">Standard request dispatched by frontend client or automated test runner.</p>
        <div class="text-[11px] font-mono text-slate-200 bg-slate-950 p-2 rounded border border-slate-700/60 leading-normal">
          <span class="text-cyan-400 font-semibold">POST</span> /api/v1/users HTTP/1.1<br/>
          Host: localhost:8080<br/>
          Content-Type: application/json<br/>
          &#123;<br/>
          &nbsp;&nbsp;"username": "testuser",<br/>
          &nbsp;&nbsp;"password": "secret"<br/>
          &#125;
        </div>
      </div>
    </div>
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
      <div>
        <div class="font-mono text-[11px] font-semibold text-slate-300 mb-1">2. After Burp MITM Injection</div>
        <p class="text-[11px] text-slate-400 mb-2">Injected header instructs downstream WireMock stubs to simulate specific provider outcomes.</p>
        <div class="text-[11px] font-mono text-slate-200 bg-slate-950 p-2 rounded border border-slate-700/60 leading-normal">
          <span class="text-cyan-400 font-semibold">POST</span> /api/v1/users HTTP/1.1<br/>
          Host: localhost:8080<br/>
          Content-Type: application/json<br/>
          <strong class="text-fuchsia-300 bg-fuchsia-950/60 px-1 rounded">Mock-Scenario: PAOTANG:SUCCESS,OTP:SUCCESS</strong><br/>
          &#123;<br/>
          &nbsp;&nbsp;"username": "testuser",<br/>
          &nbsp;&nbsp;"password": "secret"<br/>
          &#125;
        </div>
      </div>
    </div>
  </div>
  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Multi-scenario steering: Steer multiple downstream microservice mocks simultaneously from a single proxy point.</span>
    <span class="text-slate-400 font-mono text-[10px]">Zero Code Changes</span>
  </div>
</div>

---
class: py-5 px-10
---

# Automated Match &amp; Replace Rules

<div class="sv-card space-y-2.5">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
    <div>
      <span class="text-xs font-semibold text-slate-100">Zero-Click Automated Header &amp; Payload Manipulation</span>
      <span class="text-xs text-slate-400 ml-2">Apply regex transforms across passing traffic without pausing intercept</span>
    </div>
    <span class="text-[11px] font-mono text-cyan-400">Match and replace</span>
  </div>
  <div class="grid grid-cols-2 gap-3 text-xs">
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5">
      <div class="font-semibold text-fuchsia-400">Rule Engine Capabilities</div>
      <p class="text-[11px] text-slate-300 leading-relaxed">
        Configured inside Burp Proxy Settings. Transparently matches headers, request bodies, or responses matching regex patterns.
      </p>
      <ul class="space-y-1 text-slate-300 text-[11px] pt-1 border-t border-slate-700/60">
        <li>• <strong class="text-slate-100">Header injection:</strong> Automatically append <code>Mock-Scenario</code> or auth tokens.</li>
        <li>• <strong class="text-slate-100">Host rewriting:</strong> Redirect production or staging hostnames to localhost stubs.</li>
        <li>• <strong class="text-slate-100">Flag manipulation:</strong> Flip boolean values inside inbound JSON payloads.</li>
      </ul>
    </div>
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
      <div>
        <div class="font-semibold text-slate-200 mb-1.5">Rule Configuration Example</div>
        <div class="space-y-1.5 font-mono text-[11px] bg-slate-950 p-2.5 rounded border border-slate-700/60 text-slate-200">
          <div><span class="text-slate-400 font-sans">Type:</span> Request header</div>
          <div><span class="text-slate-400 font-sans">Match:</span> ^User-Agent:.*$</div>
          <div><span class="text-slate-400 font-sans">Replace:</span> Mock-Scenario: TRANSFER:FAIL</div>
          <div><span class="text-slate-400 font-sans">Comment:</span> Auto-steer failure scenario</div>
        </div>
      </div>
      <p class="text-[11px] text-slate-400 mt-2">
        Test suites running through the proxy will execute targeted failure branches automatically.
      </p>
    </div>
  </div>
  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Automated test suites (Playwright, Cypress, k6) gain instant fault injection without editing tests.</span>
    <span class="text-slate-400 font-mono text-[10px]">CI/CD Ready</span>
  </div>
</div>

---
class: py-5 px-10
---

# Traffic Auditing &amp; HTTP History

<div class="sv-card space-y-3">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
    <div>
      <span class="text-xs font-semibold text-slate-100">Real-Time Traffic Auditing &amp; Diagnostics</span>
      <span class="text-xs text-slate-400 ml-2">Inspect, filter, and triage requests passing through the proxy</span>
    </div>
    <span class="text-[11px] font-mono text-cyan-400">Logger &amp; History</span>
  </div>
  <div class="grid grid-cols-2 gap-3 text-xs">
    <div class="p-3.5 rounded-lg border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
      <div class="space-y-1.5">
        <div class="font-semibold text-fuchsia-400">Real-Time Chronological Audit Trail</div>
        <p class="text-[11px] text-slate-300 leading-relaxed">
          Maintains a complete record of every outbound request and inbound response with filtering by status code, HTTP method, URL pattern, or payload size.
        </p>
      </div>
      <div class="text-[10px] text-slate-400 pt-2 border-t border-slate-700/60 mt-2">
        Diagnostic tip: Filter by <code>4xx / 5xx</code> status to isolate broken contracts immediately.
      </div>
    </div>
    <div class="p-3.5 rounded-lg border border-slate-700/60 bg-slate-900/40 flex flex-col justify-between">
      <div class="space-y-1.5">
        <div class="font-semibold text-cyan-400">Instant Diagnostic Tool Handoff</div>
        <p class="text-[11px] text-slate-300 leading-relaxed">
          Right-click any captured entry to send the exact request into <strong>Repeater</strong> for manual iterative replay or <strong>Intruder</strong> for automated boundary fuzzing.
        </p>
      </div>
      <div class="text-[10px] text-slate-400 pt-2 border-t border-slate-700/60 mt-2">
        Shortcut: Press <code>Cmd+R</code> (macOS) or <code>Ctrl+R</code> to send to Repeater immediately.
      </div>
    </div>
  </div>
  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>The HTTP history journal provides visibility into what really passed over the wire between client and server.</span>
    <span class="text-slate-400 font-mono text-[10px]">Traffic Analysis</span>
  </div>
</div>

---
class: py-5 px-10
---

# Replay &amp; Parameter Fuzzing

<div class="sv-card space-y-2.5">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
    <div>
      <span class="text-xs font-semibold text-slate-100">Burp Repeater &amp; Intruder Workflows</span>
      <span class="text-xs text-slate-400 ml-2">Manual request replay and automated boundary exploration</span>
    </div>
    <span class="text-[11px] font-mono text-cyan-400">Repeater / Intruder</span>
  </div>
  <div class="grid grid-cols-2 gap-3 text-xs">
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5">
      <div class="font-semibold text-fuchsia-400">Burp Repeater (Manual Iterative Replay)</div>
      <p class="text-[11px] text-slate-300 leading-relaxed">
        Send any captured request into Repeater (<kbd class="px-1 py-0.2 bg-slate-800 rounded border border-slate-600 font-mono text-[10px] text-slate-200">Cmd+R</kbd>) to modify headers and payloads without re-triggering the whole application.
      </p>
      <ul class="space-y-1 text-slate-300 text-[11px] pt-1 border-t border-slate-700/60">
        <li>• Test expired tokens and unauthorized claims quickly.</li>
        <li>• Experiment with negative values, extreme payloads, or edge casing.</li>
        <li>• Observe deterministic server responses on repeated clicks.</li>
      </ul>
    </div>
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5">
      <div class="font-semibold text-cyan-400">Burp Intruder (Automated Boundary Fuzzing)</div>
      <p class="text-[11px] text-slate-300 leading-relaxed">
        Automate parameterized testing and boundary exploration across microservice API parameters.
      </p>
      <ul class="space-y-1 text-slate-300 text-[11px] pt-1 border-t border-slate-700/60">
        <li>• Define insertion markers around amounts, IDs, or timestamps.</li>
        <li>• Iterate numeric sequences (e.g. <code>-1, 0, 99999999</code>).</li>
        <li>• Uncover boundary edge cases, unexpected 500s, and validation holes.</li>
      </ul>
    </div>
  </div>
  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Developer flow: Capture app request &rarr; Send to Repeater &rarr; Tweak params to reproduce bug &rarr; Fix service code.</span>
    <span class="text-slate-400 font-mono text-[10px]">Triage Workflow</span>
  </div>
</div>

---
class: py-5 px-10
---

# In-Flight Testing in Practice

<div class="sv-card space-y-4">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
    <div>
      <span class="text-xs font-semibold text-slate-100">Summary &amp; Key Patterns</span>
      <span class="text-xs text-slate-400 ml-2">Clean traffic control without code modifications</span>
    </div>
    <span class="text-[11px] font-mono text-cyan-400">Core Takeaways</span>
  </div>
  <div class="grid grid-cols-3 gap-3 text-xs">
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5">
      <div class="font-semibold text-fuchsia-400">1. Duplex Control</div>
      <p class="text-[11px] text-slate-300 leading-relaxed">
        Intercept requests outbound to inject scenarios; mutate responses inbound to evaluate frontend fallbacks.
      </p>
    </div>
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5">
      <div class="font-semibold text-cyan-400">2. Match &amp; Replace</div>
      <p class="text-[11px] text-slate-300 leading-relaxed">
        Automate header injection and URL rewriting unattended across CI/CD test executions without code edits.
      </p>
    </div>
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5">
      <div class="font-semibold text-emerald-400">3. Diagnostic Replay</div>
      <p class="text-[11px] text-slate-300 leading-relaxed">
        Log all HTTP frames chronologically and hand off requests to Repeater or Intruder for rapid bug isolation.
      </p>
    </div>
  </div>
  <div class="p-3.5 rounded-lg border border-slate-700/60 bg-slate-900/40">
    <div class="text-xs text-slate-300 leading-relaxed">
      Burp Suite bridges the gap between client interfaces and backend gateways. By operating at the network socket layer, QA and developers can simulate security edge cases and fault states without polluting production bundles.
    </div>
  </div>
  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Next: Apply live tampering in the Section 04 hands-on lab challenges.</span>
    <span class="text-slate-400 font-mono text-[10px]">Burp Suite Workshop</span>
  </div>
</div>

---
class: text-center flex flex-col justify-center items-center h-full
---

<div class="space-y-3">
  <div class="inline-block px-3.5 py-1 rounded-full text-xs font-mono tracking-wider sv-tag-fuchsia">
    SECTION 04
  </div>
  <h1 class="text-3xl md:text-4xl font-extrabold text-slate-100">
    Lab Challenges
  </h1>
  <p class="text-slate-400 text-sm max-w-xl mx-auto">
    Interactive proxy intercept exercises, automated match &amp; replace rules, and self-guided security tampering
  </p>
</div>

---
class: py-5 px-10
---

# Lab 1: Live Traffic Interception

<div class="sv-card space-y-3">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
    <div>
      <span class="text-xs font-semibold text-slate-100">Hands-on Exercise</span>
      <span class="text-xs text-slate-400 ml-2">Pause outbound requests and inject steering headers</span>
    </div>
    <span class="text-[11px] font-mono text-fuchsia-400 bg-fuchsia-950/40 border border-fuchsia-500/30 px-2 py-0.5 rounded">Listener: 127.0.0.1:8080</span>
  </div>
  <div class="grid grid-cols-2 gap-3 text-xs">
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5">
      <div class="font-semibold text-fuchsia-400">Task A: Intercept Registration Request</div>
      <p class="text-[11px] text-slate-300 leading-relaxed">
        Send the registration curl request through proxy port 8080 with <code>Intercept is on</code>. Observe the packet paused in the Burp UI.
      </p>
    </div>
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5">
      <div class="font-semibold text-cyan-400">Task B: Inject Scenario Header &amp; Forward</div>
      <p class="text-[11px] text-slate-300 leading-relaxed">
        Add <code>Mock-Scenario: PAOTANG:SUCCESS,OTP:EXPIRED</code> into the raw request headers and click <strong>Forward</strong>.
      </p>
    </div>
  </div>
  <div class="sv-terminal text-xs leading-relaxed">
    <div class="text-slate-400 font-mono text-[10px] mb-1"># Dispatch user registration through Burp Proxy listener</div>
    <div class="font-mono text-slate-200">curl -x http://127.0.0.1:8080 -s -X POST \</div>
    <div class="font-mono text-slate-200 pl-4">http://localhost:8081/api/v1/users \</div>
    <div class="font-mono text-slate-200 pl-4">-H "Content-Type: application/json" \</div>
    <div class="font-mono text-slate-200 pl-4">-d '{"username":"student","password":"secret"}'</div>
  </div>
  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Outcome: WireMock returns an expired OTP response downstream without modifying backend or client logic.</span>
    <span class="text-slate-400 font-mono text-[10px]">Lab 1</span>
  </div>
</div>

---
class: py-5 px-10
---

# Lab 2: Match &amp; Replace Automation

<div class="sv-card space-y-3">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
    <div>
      <span class="text-xs font-semibold text-slate-100">Hands-on Exercise</span>
      <span class="text-xs text-slate-400 ml-2">Unattended header steering for automated test pipelines</span>
    </div>
    <span class="text-[11px] font-mono text-fuchsia-400 bg-fuchsia-950/40 border border-fuchsia-500/30 px-2 py-0.5 rounded">Match and replace</span>
  </div>
  <div class="grid grid-cols-2 gap-3 text-xs">
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5">
      <div class="font-semibold text-fuchsia-400">Task A: Configure Match &amp; Replace Rule</div>
      <p class="text-[11px] text-slate-300 leading-relaxed">
        In Burp Settings &rarr; Tools &rarr; Proxy &rarr; Match and replace, add a rule: Type <code>Request header</code>, Match <code>^User-Agent:.*$</code>, Replace <code>Mock-Scenario: TRANSFER:FAIL</code>. Ensure <code>Intercept is off</code>.
      </p>
    </div>
    <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5">
      <div class="font-semibold text-cyan-400">Task B: Dispatch Request &amp; Verify History</div>
      <p class="text-[11px] text-slate-300 leading-relaxed">
        Send the transfer request below. Open Burp's <strong>HTTP history</strong> tab to inspect the outbound request and confirm that the header was injected cleanly.
      </p>
    </div>
  </div>
  <div class="sv-terminal text-xs leading-relaxed">
    <div class="text-slate-400 font-mono text-[10px] mb-1"># Dispatch transfer request with Intercept OFF</div>
    <div class="font-mono text-slate-200">curl -x http://127.0.0.1:8080 -s \</div>
    <div class="font-mono text-slate-200 pl-4">http://localhost:8081/api/v1/transfers</div>
  </div>
  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Outcome: Demonstrates zero-click automated header injection suitable for CI test automation runners.</span>
    <span class="text-slate-400 font-mono text-[10px]">Lab 2</span>
  </div>
</div>

---
class: py-5 px-10
---

# Challenge: Security Tampering

<div class="sv-card space-y-2.5">
  <div class="flex items-center justify-between border-b border-slate-700/60 pb-2">
    <div>
      <span class="text-xs font-semibold text-slate-100">Self-Service DIY Challenge</span>
      <span class="text-xs text-slate-400 ml-2">Tamper transfer payload and force fraud alert</span>
    </div>
    <span class="text-[11px] font-mono text-fuchsia-400 bg-fuchsia-950/40 border border-fuchsia-500/30 px-2 py-0.5 rounded">Endpoint: POST /api/v1/transfers</span>
  </div>

  <div class="p-3 rounded-lg border border-slate-700/60 bg-slate-900/40 space-y-1.5 text-xs">
    <div class="font-semibold text-slate-200">Implementation Criteria</div>
    <ul class="space-y-1 text-[11px] text-slate-300 leading-relaxed">
      <li>• <strong class="text-rose-400">Criteria 1 (Mid-Flight Tamper):</strong> Intercept outbound transfer to <code>/api/v1/transfers</code> and modify <code>amount: 5000000.00</code>.</li>
      <li>• <strong class="text-emerald-400">Criteria 2 (Steering Injection):</strong> Add header <code>Mock-Scenario: FRAUD_DETECTED</code> in Burp Intercept and click <strong>Forward</strong>.</li>
      <li>• <strong class="text-amber-400">Criteria 3 (Automated Rule):</strong> Create Match &amp; Replace rule injecting <code>X-Forwarded-For: 203.0.113.195</code> to simulate suspicious geo-IP.</li>
    </ul>
  </div>

  <div class="sv-terminal text-xs leading-relaxed">
    <div class="text-slate-400 font-mono text-[10px] mb-1"># Dispatch transfer through proxy, pause in Intercept, modify body/header, and forward:</div>
    <div class="font-mono text-slate-200">curl -x http://127.0.0.1:8080 -s -X POST \</div>
    <div class="font-mono text-slate-200 pl-4">http://localhost:8081/api/v1/transfers \</div>
    <div class="font-mono text-slate-200 pl-4">-H "Content-Type: application/json" \</div>
    <div class="font-mono text-slate-200 pl-4">-d '{"fromAccount":"ACC-001",</div>
    <div class="font-mono text-slate-200 pl-8">"toAccount":"ACC-999","amount":500.00}'</div>
  </div>

  <div class="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-700/60">
    <span>Inspect the tampered roundtrip in Burp's <strong>Logger / HTTP history</strong> tab.</span>
    <span class="text-slate-400 font-mono text-[10px]">Target: http://localhost:8081</span>
  </div>
</div>
