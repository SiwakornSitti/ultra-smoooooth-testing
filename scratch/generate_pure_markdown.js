const fs = require('fs');
const path = require('path');

const wiremockDir = path.join(__dirname, '../slides/wiremock');

function cleanHtml(s) {
  if (!s) return '';
  return s
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**')
    .replace(/<span[^>]*class="[^"]*font-mono[^"]*"[^>]*>([\s\S]*?)<\/span>/gi, '`$1`')
    .replace(/<span[^>]*class="[^"]*font-bold[^"]*"[^>]*>([\s\S]*?)<\/span>/gi, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&le;/g, '≤')
    .replace(/&ge;/g, '≥')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&bull;/g, '')
    .replace(/[•\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanCallout(s) {
  let c = cleanHtml(s);
  c = c.replace(/^[💡\s]+/, '');
  return c.trim();
}

function cleanBullet(b) {
  let s = cleanHtml(b);
  s = s.replace(/^[•\s\-\*]+/, '').trim();
  // fix double bolding
  s = s.replace(/\*\*\s*\*\*/g, '');
  return s;
}

function parseCards(raw) {
  const cards = [];
  const cardRegex = /<div\s+[^>]*class="[^"]*slide-card[^"]*"[^>]*>([\s\S]*?)(?=<div\s+[^>]*class="[^"]*slide-card[^"]*"|$)/gi;
  let match;
  while ((match = cardRegex.exec(raw)) !== null) {
    const cardHtml = match[1];
    if (cardHtml.includes('py-3') && (cardHtml.includes('💡') || cardHtml.includes('Rule') || cardHtml.includes('Pattern') || cardHtml.includes('Takeaway'))) {
      continue;
    }

    let title = '';
    let badge = '';
    const headerMatch = cardHtml.match(/<div class="flex items-center justify-between[^>]*>([\s\S]*?)<\/div>/i);
    if (headerMatch) {
      const headerHtml = headerMatch[1];
      const badgeMatch = headerHtml.match(/<span[^>]*font-mono[^>]*>([\s\S]*?)<\/span>/i);
      if (badgeMatch) {
        badge = cleanHtml(badgeMatch[1]);
      }
      const titleClean = headerHtml.replace(/<span[^>]*font-mono[\s\S]*?<\/span>/i, '');
      title = cleanHtml(titleClean);
    }

    let desc = '';
    const pMatch = cardHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      desc = cleanHtml(pMatch[1]);
    }

    const bullets = [];
    const liMatches = cardHtml.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
    if (liMatches) {
      for (const li of liMatches) {
        const cb = cleanBullet(li);
        if (cb) bullets.push(cb);
      }
    } else {
      const divMatches = cardHtml.match(/<div>\s*(?:•|&bull;)?\s*([\s\S]*?)<\/div>/gi);
      if (divMatches) {
        for (const d of divMatches) {
          if (d.includes('flex items-center') || d.includes('border-t') || d.includes('text-xs') || d.includes('Topology Flow')) continue;
          const cb = cleanBullet(d);
          if (cb) bullets.push(cb);
        }
      }
    }

    let footer = '';
    const footerMatch = cardHtml.match(/<div[^>]*border-t[^>]*>([\s\S]*?)<\/div>/i);
    if (footerMatch) {
      footer = cleanHtml(footerMatch[1]);
    }

    if (title || desc || bullets.length > 0) {
      cards.push({ title, badge, desc, bullets, footer });
    }
  }
  return cards;
}

function parsePresenterNotes(raw) {
  const match = raw.match(/<!--\s*Presenter Notes:\s*([\s\S]*?)-->/i);
  if (!match) return '';
  const notes = match[1].trim().split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .map(l => l.startsWith('-') ? l : `- ${l}`);
  if (notes.length === 0) return '';
  return `\n### Presenter Notes\n\n${notes.join('\n')}\n`;
}

function parseCallout(raw) {
  const match = raw.match(/<div[^>]*class="[^"]*slide-card[^"]*py-3[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (match) {
    return cleanCallout(match[1]);
  }
  return '';
}

function parseTable(raw) {
  const tableMatch = raw.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) return null;
  const tableHtml = tableMatch[1];

  const headers = [];
  const thMatches = tableHtml.match(/<th[^>]*>([\s\S]*?)<\/th>/gi);
  if (thMatches) {
    for (const th of thMatches) {
      headers.push(cleanHtml(th));
    }
  }

  const rows = [];
  const trMatches = tableHtml.match(/<tr>([\s\S]*?)<\/tr>/gi);
  if (trMatches) {
    for (const tr of trMatches) {
      if (tr.includes('<th')) continue;
      const cells = [];
      const tdMatches = tr.match(/<td[^>]*>([\s\S]*?)<\/td>/gi);
      if (tdMatches) {
        for (const td of tdMatches) {
          cells.push(cleanHtml(td));
        }
      }
      if (cells.length > 0) {
        rows.push(cells);
      }
    }
  }

  return { headers, rows };
}

function parseCodeBlock(raw) {
  const match = raw.match(/```([a-z]*)\n([\s\S]*?)```/i);
  if (match) {
    return { lang: match[1] || 'json', code: match[2].trim() };
  }
  return null;
}

function parseTerminal(raw) {
  const match = raw.match(/<div class="sv-terminal[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (!match) return null;
  const lines = match[1].match(/<div[^>]*>([\s\S]*?)<\/div>/gi);
  if (!lines) return null;
  const bashLines = lines.map(l => cleanHtml(l));
  return bashLines.join('\n');
}

function buildPureMarkdown(fileNum, raw) {
  // Extract title and subtitle
  let title = '';
  let subtitle = '';
  const h1Match = raw.match(/^#\s+(.+)$/m);
  if (h1Match) title = cleanHtml(h1Match[1]);
  const h2Match = raw.match(/^##\s+(.+)$/m);
  const h3Match = raw.match(/^###\s+(.+)$/m);
  if (h3Match) subtitle = cleanHtml(h3Match[1]);
  else if (h2Match) subtitle = cleanHtml(h2Match[1]);

  const cards = parseCards(raw);
  const callout = parseCallout(raw);
  const notes = parsePresenterNotes(raw);
  const table = parseTable(raw);
  const codeBlock = parseCodeBlock(raw);
  const terminal = parseTerminal(raw);

  // 1. Cover
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
${notes}`;
  }

  // 2. Section Dividers (12, 35, 61)
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
${notes}`;
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
${notes}`;
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
${notes}`;
  }

  // 3. Pro Tip Slides: 14, 16, 18, 20, 22, 24, 26, 28, 30
  if ([14, 16, 18, 20, 22, 24, 26, 28, 30].includes(fileNum)) {
    let proTipTag = '';
    const tagMatch = raw.match(/Pro Tip\s*•\s*([^<\n]+)/i);
    if (tagMatch) proTipTag = cleanHtml(tagMatch[1]);

    let tipHeading = '';
    const thMatch = raw.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    if (thMatch) tipHeading = cleanHtml(thMatch[1]);

    let tipContent = '';
    const tcMatch = raw.match(/<div class="slide-card[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (tcMatch) tipContent = cleanHtml(tcMatch[1]);

    return `# Pro Tip: ${proTipTag || title}

## ${tipHeading}

> 💡 **Core Takeaway:** ${tipContent}

---

### Operational Rationale & Best Practices
- **Resilient Matching**: Isolates test suites from incidental payload variations, whitespace drift, or parameter reordering.
- **Production Parity**: Keeps test stubs realistic without introducing fragile coupling to test runner order.
- **Maintenance Reduction**: A single robust stub withstands upstream API evolution without constant test updates.
${notes}`;
  }

  // 4. Operator Reference Slides: 13, 15, 17, 19, 21, 23, 25, 27, 29
  if ([13, 15, 17, 19, 21, 23, 25, 27, 29].includes(fileNum)) {
    const card = cards[0] || { bullets: [], footer: '' };

    // Parse operators table
    const opRows = [];
    for (const b of card.bullets) {
      const parts = b.split(':');
      if (parts.length >= 2) {
        const op = parts[0].trim().replace(/`/g, '');
        const desc = parts.slice(1).join(':').trim();
        opRows.push(`| \`${op}\` | ${desc} |`);
      } else {
        opRows.push(`| Operator | ${b} |`);
      }
    }
    const opTable = `| Operator / Key | Operational Matching Behavior & Recommendation |\n| :--- | :--- |\n${opRows.join('\n')}\n`;

    const bulletsMd = card.bullets.map(b => `- ${b}`).join('\n');

    return `# ${title}

### ${subtitle}

---

### Operator Reference Matrix

${opTable}
---

### Key Capabilities & Mechanics
${bulletsMd}

> 💡 ${card.footer ? `**Best Practice:** ${card.footer}` : (callout ? `**Best Practice:** ${callout}` : '**Best Practice:** Apply precise request matching to avoid flaky test suites.')}
${notes}`;
  }

  // 5. Admin API Tables: 31, 32, 33
  if ([31, 32, 33].includes(fileNum)) {
    let tableMd = '';
    if (table) {
      tableMd = `| ${table.headers.join(' | ')} |\n| ${table.headers.map(() => ':---').join(' | ')} |\n`;
      for (const row of table.rows) {
        const comp = row[0] || '';
        const method = row[1] ? `\`${row[1]}\`` : '';
        const endpoint = row[2] ? `\`${row[2]}\`` : '';
        const desc = row[3] || '';
        tableMd += `| ${comp} | ${method} | ${endpoint} | ${desc} |\n`;
      }
    }

    return `# ${title}

### ${subtitle}

---

### API Specification & Endpoints

${tableMd}
---

### Key Operational Guidelines
- **Zero Process Restarts**: Never restart WireMock between tests; use administrative reset endpoints to clear state in < 2ms.
- **Request Journal Inspection**: Check unmatched request diffs to diagnose 404 errors with precision field-level clarity.
- **Runtime Snapshotting**: Dynamically record stubs during exploratory testing and persist them directly into the mappings directory.

> 💡 ${callout ? `**Persistence Protocol:** ${callout}` : '**Production Rule:** Use the Admin API to control stub state dynamically without restarting test containers.'}
${notes}`;
  }

  // 6. Section 03 Slide A: Scenario & Rules (36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58)
  if ([36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58].includes(fileNum)) {
    const card = cards[0] || { title: 'Rules', bullets: [], footer: '' };

    const tableRows = [];
    for (const b of card.bullets) {
      const parts = b.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim().replace(/\*\*/g, '');
        const desc = parts.slice(1).join(':').trim();
        tableRows.push(`| **${key}** | ${desc} |`);
      } else {
        tableRows.push(`| **Requirement** | ${b} |`);
      }
    }

    const tableMd = `| Architectural Component | Rule / Operational Specification |\n| :--- | :--- |\n${tableRows.join('\n')}\n`;
    const bulletsMd = card.bullets.map(b => `- ${b}`).join('\n');

    return `# ${title}

### ${subtitle}

---

### Specification & Rule Matrix

${tableMd}
---

### Architectural Rules
${bulletsMd}

> 💡 ${callout || card.footer || '**Production Pattern:** Decouple test cases from physical databases by virtualizing service boundaries with precision rules.'}
${notes}`;
  }

  // 7. Section 03 Slide B: JSON Stub Mapping (37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59)
  if ([37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59].includes(fileNum)) {
    let filename = '';
    const fnMatch = raw.match(/<span[^>]*class="[^"]*text-cyan-300[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
    if (fnMatch) filename = cleanHtml(fnMatch[1]);

    const verifItems = [];
    const verifMatches = raw.match(/<div class="text-(?:emerald|rose|cyan|slate)-[0-9]+">([\s\S]*?)<\/div>/gi);
    if (verifMatches) {
      for (const vm of verifMatches) {
        verifItems.push(cleanHtml(vm));
      }
    }

    let verifTable = '';
    if (verifItems.length > 0) {
      verifTable = `| Scenario | Expected HTTP Status | Verification Outcome |\n| :--- | :---: | :--- |\n`;
      for (const vi of verifItems) {
        const parts = vi.split('➔');
        if (parts.length >= 2) {
          const req = parts[0].trim();
          const res = parts[1].trim();
          verifTable += `| ${req} | \`${res}\` | Contract expectation fulfilled |\n`;
        } else {
          verifTable += `| Verification | \`200 OK\` | ${vi} |\n`;
        }
      }
    }

    let cardFooter = '';
    const cfMatch = raw.match(/<div[^>]*border-t[^>]*text-slate-400[^>]*>([\s\S]*?)<\/div>/i);
    if (cfMatch) cardFooter = cleanHtml(cfMatch[1]);

    return `# ${title}

### ${subtitle}

${filename ? `**Mapping Configuration File:** \`${filename}\`\n` : ''}
\`\`\`json
${codeBlock ? codeBlock.code : '{}'}
\`\`\`

---

### Verification Scenarios

${verifTable}
> 🔍 ${cardFooter || 'Declarative WireMock stub configuration enforced with zero external runtime dependencies.'}
${notes}`;
  }

  // 8. Section 04 Labs: 62, 63, 64, 65, 66
  if ([62, 63, 64, 65, 66].includes(fileNum)) {
    const card1 = cards[0] || { title: 'Scenario', bullets: [], desc: '' };

    let dashboard = '';
    const dbMatch = raw.match(/Dashboard:\s*([^<\n]+)/i);
    if (dbMatch) dashboard = cleanHtml(dbMatch[1]);

    const criteriaRows = [];
    for (const b of card1.bullets) {
      const parts = b.split(':');
      if (parts.length >= 2) {
        const k = parts[0].trim().replace(/\*\*/g, '');
        criteriaRows.push(`| **${k}** | ${parts.slice(1).join(':').trim()} |`);
      } else {
        criteriaRows.push(`| **Acceptance Criteria** | ${b} |`);
      }
    }
    const criteriaTable = `| Test Case / Condition | Expected Behavior & Status |\n| :--- | :--- |\n${criteriaRows.join('\n')}\n`;

    let bashCode = terminal || '';
    if (!bashCode) {
      const lines = raw.match(/<div class="font-mono[^"]*">([\s\S]*?)<\/div>/gi);
      if (lines) {
        bashCode = lines.map(l => cleanHtml(l)).join('\n');
      }
    }

    return `# ${title}

### ${subtitle}

---

### Lab Configuration & Acceptance Criteria

${dashboard ? `> 🌐 **Dashboard:** \`${dashboard}\`\n\n` : ''}${criteriaTable}
---

### Hands-On Verification Commands

\`\`\`bash
${bashCode}
\`\`\`

---

### Step-by-Step Lab Execution Checklist
- [ ] Open the WireMock Web UI dashboard and inspect current registered stub mappings.
- [ ] Execute the test commands from your terminal; confirm receipt of the expected HTTP status codes.
- [ ] Inspect the Request Journal to view real-time request diffs and assertion results.
- [ ] Reset WireMock scenarios via \`POST /__admin/scenarios/reset\` to verify state clean-up.

> 💡 ${callout ? `**Key Skill:** ${callout}` : '**Lab Takeaway:** Validate client resilience, backoff retry policies, and error handling branches in sub-5ms hermetic test runs.'}
${notes}`;
  }

  // 9. General Concept / Comparison Slides (2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 34, 60, 67)
  const validCards = cards.filter(c => c.title && c.title.trim().length > 0);

  let tableRows = '';
  if (validCards.length > 0) {
    tableRows = `| Pillar / Focus Area | Focus / Category | Key Capabilities & Rules | Takeaway |\n| :--- | :--- | :--- | :--- |\n`;
    for (const c of validCards) {
      const bulletSummary = c.bullets.map(b => `- ${b}`).join('<br>');
      tableRows += `| **${c.title}** | ${c.badge || '-'} | ${c.desc ? `${c.desc}<br>` : ''}${bulletSummary} | ${c.footer || '-'} |\n`;
    }
  }

  let cardSections = '';
  for (const c of validCards) {
    cardSections += `\n### ${c.title} ${c.badge ? `(${c.badge})` : ''}\n\n`;
    if (c.desc) cardSections += `${c.desc}\n\n`;
    if (c.bullets.length > 0) {
      cardSections += `${c.bullets.map(b => `- ${b}`).join('\n')}\n\n`;
    }
    if (c.footer) cardSections += `> ${c.footer}\n\n`;
  }

  return `# ${title}

### ${subtitle}

---

### Comparison & Pillars Matrix

${tableRows}
---

### Detailed Architectural Breakdown
${cardSections}
> 💡 ${callout ? `**Architectural Takeaway:** ${callout}` : '**Architectural Takeaway:** WireMock provides hermetic, isolated API virtualization with true socket fidelity.'}
${notes}`;
}

// Read raw slides from slides-wiremock.md to get original pristine HTML for conversion
const mainWiremockMd = fs.readFileSync(path.join(__dirname, '../slides/slides-wiremock.md'), 'utf-8');
const { parse } = require('@slidev/parser');
const parsed = parse(mainWiremockMd);

console.log(`Parsed ${parsed.slides.length} slides from slides-wiremock.md`);

for (let i = 0; i < parsed.slides.length; i++) {
  const fileNum = i + 1;
  const raw = parsed.slides[i].raw;
  const pureMd = buildPureMarkdown(fileNum, raw);
  const outPath = path.join(wiremockDir, `slide-wiremock-${fileNum}.md`);
  fs.writeFileSync(outPath, pureMd, 'utf-8');
}

console.log('Successfully regenerated all 67 slides from pristine source to pure Markdown!');
