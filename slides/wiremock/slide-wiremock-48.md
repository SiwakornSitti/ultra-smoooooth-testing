# Section 04: Lab Challenges

> **Hands-on practice applying WireMock techniques to solve real-world microservices testing problems.**

---

### Hands-On Labs Curriculum

| Lab | Title | Target Endpoint | Primary Skill Tested |
| :---: | :--- | :--- | :--- |
| **Lab 1** | Web UI & JSONPath Matching | `POST /lab/api/stateless/payments` | JSONPath numeric threshold matching and Request Journal diffs |
| **Lab 2** | Scenario Steering & Token Replay | `POST /lab/api/stateful/tokens/verify` | Header-driven FSM steering and token replay rejection |
| **Lab 3** | Flapping Retry & Self-Healing | `POST /lab/api/flapping/submit` | Exponential backoff client verification against transient 503s |
| **Lab 4** | Dynamic Templating & Chaos Latency | `POST /lab/api/templating/order` | Handlebars 7% VAT math, date offsets, and 3000ms timeout injection |
| **DIY** | Challenge: Face Biometrics Stub | `POST /lab/api/ekyc/biometrics` | Authoring production stub with base64 matching and confidence score |

---

### Lab Execution Guidelines
- **Live Diagnostics**: Inspect request diffs in the Web UI dashboard journal (`http://localhost:8088/__admin/webapp`).
- **Idempotent Resets**: Execute scenario resets between test runs to ensure independent verification states.
- **Zero Mock Pollution**: Production application code executes unaltered without mock libraries or bytecode injection.
