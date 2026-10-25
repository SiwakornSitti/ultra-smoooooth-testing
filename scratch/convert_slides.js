const fs = require('fs');
const path = require('path');

const wiremockDir = path.join(__dirname, '../slides/wiremock');

function stripTags(text) {
  if (!text) return '';
  let s = text;
  s = s.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');
  s = s.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  s = s.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  s = s.replace(/<span class="[^"]*font-bold[^"]*"[^>]*>([\s\S]*?)<\/span>/gi, '**$1**');
  s = s.replace(/<[^>]+>/g, ' ');
  s = s.replace(/&amp;/g, '&')
       .replace(/&lt;/g, '<')
       .replace(/&gt;/g, '>')
       .replace(/&le;/g, '≤')
       .replace(/&ge;/g, '≥')
       .replace(/&quot;/g, '"')
       .replace(/&#39;/g, "'")
       .replace(/&bull;/g, '•');
  return s.replace(/[ \t]+/g, ' ').trim();
}

function convertSlide(fileNum, raw) {
  // Strip frontmatter
  let text = raw.replace(/^---[\s\S]*?---\n*/, '');

  // Extract presenter notes if present
  let presenterNotes = '';
  const notesMatch = text.match(/<!--\s*Presenter Notes:\s*([\s\S]*?)-->/i);
  if (notesMatch) {
    const rawNotes = notesMatch[1].trim().split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.startsWith('-') ? line : `- ${line}`);
    if (rawNotes.length > 0) {
      presenterNotes = `\n### Presenter Notes\n\n${rawNotes.join('\n')}\n`;
    }
  }
  text = text.replace(/<!--[\s\S]*?-->/g, '');

  // Extract main headings
  let title = '';
  let subtitle = '';

  const h1Match = text.match(/^#\s+(.+)$/m);
  if (h1Match) {
    title = stripTags(h1Match[1]);
  }
  const h2Match = text.match(/^##\s+(.+)$/m);
  const h3Match = text.match(/^###\s+(.+)$/m);
  if (h3Match) {
    subtitle = stripTags(h3Match[1]);
  } else if (h2Match) {
    subtitle = stripTags(h2Match[1]);
  }

  // Handle special cases:
  // Slide 1: Cover
  if (fileNum === 1) {
    return `# WireMock Deep Dive

### Virtualizing External APIs, Stateful Sequences, and Chaos Testing for Microservices

> **Pillar 1 • API Virtualization Workshop** | Duration: ~2.5 Hours

---

### Core Curriculum Matrix

| Section | Focus Area | Duration | Key Learning Outcomes |
| :--- | :--- | :---: | :--- |
| **Section 01** | Introduction & Boundaries | 25 min | Out-of-process HTTP stand-in model, hermetic vs staging topologies, and core virtualization superpowers. |
| **Section 02** | Fundamentals & Tooling Reference | 45 min | Request matching (URL, query, headers, body, JSONPath), dynamic templating, stateful FSM, and Admin API. |
| **Section 03** | Real-World Use Cases & Application | 40 min | 12 end-to-end production patterns: eKYC verification, token replay protection, flapping retries, and network faults. |
| **Section 04** | Hands-On Lab Challenges | 60 min | 4 progressive labs and 1 DIY capstone challenge testing real-world client resilience. |

---

### Key Capabilities
- **WireMock 3.x Stand-in Process**: Real TCP loopback fidelity with zero production code changes.
- **Precision Request Routing**: Match dynamic REST resources via Regex, JSONPath predicates, and header steering.
- **Stateful Finite State Machine (FSM)**: Simulate multi-step transactions and token replay attacks in memory.
- **Transport Chaos Injection**: Induce realistic latency jitter, 503 flapping sequences, and dropped sockets.
${presenterNotes}`;
  }

  // Section Dividers: 12, 35, 61
  if (fileNum === 12) {
    return `# Section 02: Fundamentals & Tooling Reference

> **Deep-dive into the WireMock virtualization engine architecture, request matching operators, dynamic response templating, and Admin API contracts.**

---

### Section Modules

| # | Topic | Primary Operators & Tools | Key Capability |
| :---: | :--- | :--- | :--- |
| **01** | URL & Path Matching | \`urlPathPattern\`, \`urlPath\`, \`method\` | Exact routing vs regex matching on dynamic REST IDs |
| **02** | Query Parameter Matching | \`queryParameters\`, \`hasExactly\`, \`absent\` | Order-agnostic filtering and presence assertions |
| **03** | Header Matching | \`equalTo\`, \`matches\`, \`Mock-Scenario\` | Sub-scenario steering and Bearer token assertions |
| **04** | Semantic Body Matching | \`equalToJson\`, lenient JSON AST | Order-independent array and whitespace resilience |
| **05** | JSONPath Expressions | \`matchesJsonPath\`, Jayway syntax | Deep nested payload predicate filtering |
| **06** | Priority Precedence | \`priority: 1\` (high) vs \`priority: 10\` (default) | Specific exception overrides layered on default stubs |
| **07** | Response Templating | \`{{now}}\`, \`{{randomValue}}\`, \`{{math}}\` | Dynamic context echoing and mathematical calculations |
| **08** | Chaos & Latency | \`fixedDelayMilliseconds\`, \`lognormal\`, \`fault\` | Real transport delays, jitter, and dropped connections |
| **09** | Stateful Scenarios | \`scenarioName\`, \`requiredScenarioState\`, \`newScenarioState\` | Finite State Machines for token replay and state transitions |
| **10** | WireMock Admin API | \`/__admin/mappings\`, \`/__admin/requests\`, \`/__admin/scenarios\` | Full programmatic control and runtime inspection |
${presenterNotes}`;
  }

  if (fileNum === 35) {
    return `# Section 03: Real-World Use Cases & Application

> **Practical patterns for virtualizing downstream vendor APIs, legacy monoliths, and third-party gateways in high-throughput microservices.**

---

### Production Virtualization Catalog

| # | Use Case Topic | Downstream Service Pattern | Target Test Scenario |
| :---: | :--- | :--- | :--- |
| **01** | Precision Routing | Thai National ID & Paotang eKYC | Match dynamic UUIDs & regex 13-digit citizen IDs |
| **02** | Priority Precedence | Banking Core Ledger System | High-priority error overrides over default success stubs |
| **03** | Scenario Steering | Microservices Test Routing | Multi-tenant test routing via \`Mock-Scenario\` header |
| **04** | Stateful Scenarios | OAuth2 / OTP One-Time Tokens | Single-use code consumption and 401 replay rejection |
| **05** | SMS Gateway | Telecom Provider (AIS / True) | Validate Thai mobile prefixes and echo reference codes |
| **06** | Flapping Services | Payment Gateway Transient Failure | 503 Service Unavailable followed by automatic 200 recovery |
| **07** | Semantic Body Matching | Merchant Settlement API | Whitespace-agnostic and array-order lenient AST matching |
| **08** | Dynamic Templating | Payment Reconciliation Webhook | Correlation ID echoing and cryptographic nonce generation |
| **09** | Computed Values | Tax Invoice Calculation | Real-time 7% Thai VAT computation and date offsets |
| **10** | Large Payloads | Core Banking Account Statements | Multi-megabyte JSON payload decoupling via body files |
| **11** | Outbound Callbacks | Async Payment Notification | WireMock webhook callbacks to client endpoint |
| **12** | Network Chaos | Unreliable Cross-Border Link | Log-normal latency jitter and dropped TCP socket connections |
${presenterNotes}`;
  }

  if (fileNum === 61) {
    return `# Section 04: Lab Challenges

> **Hands-on practice applying WireMock techniques to solve real-world microservices testing problems.**

---

### Hands-On Labs Curriculum

| Lab | Title | Target Endpoint | Primary Skill Tested |
| :---: | :--- | :--- | :--- |
| **Lab 1** | Web UI & JSONPath Matching | \`POST /lab/api/stateless/payments\` | JSONPath numeric threshold matching and Request Journal diffs |
| **Lab 2** | Scenario Steering & Token Replay | \`POST /lab/api/stateful/tokens/verify\` | Header-driven FSM steering and token replay rejection |
| **Lab 3** | Flapping Retry & Self-Healing | \`POST /lab/api/flapping/submit\` | Exponential backoff client verification against transient 503s |
| **Lab 4** | Dynamic Templating & Chaos Latency | \`POST /lab/api/templating/order\` | Handlebars 7% VAT math, date offsets, and 3000ms timeout injection |
| **DIY** | Challenge: Face Biometrics Stub | \`POST /lab/api/ekyc/biometrics\` | Authoring production stub with base64 matching and confidence score |
${presenterNotes}`;
  }

  return null;
}

console.log('Converter module created.');
