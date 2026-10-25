# Dynamic Webhook Templating: Reconciliation

### Echo request correlation IDs and generate dynamic nonces on the fly with Handlebars

---

### Specification & Rule Matrix

| Architectural Component | Rule / Operational Specification |
| :--- | :--- |
| **Trace Propagation** | `{{request.headers.X-Correlation-ID}}` echoes tracking headers back to client for distributed tracing assertions. |
| **Dynamic Nonces** | `{{randomValue type='UUID'}}` generates unique transaction IDs without database sequences. |
| **Body Reflection** | `{{jsonPath request.body '$.sender'}}` echoes incoming body values. |
| **Real-time Timestamps** | `{{now}}` ensures valid ISO timestamps on every run. |

---

### Architectural Rules
- **Trace Propagation**: `{{request.headers.X-Correlation-ID}}` echoes tracking headers back to client for distributed tracing assertions.
- **Dynamic Nonces**: `{{randomValue type='UUID'}}` generates unique transaction IDs without database sequences.
- **Body Reflection**: `{{jsonPath request.body '$.sender'}}` echoes incoming body values.
- **Real-time Timestamps**: `{{now}}` ensures valid ISO timestamps on every run.

---

### Verification Scenarios

| Scenario | Expected HTTP Status | Verification Outcome |
| :--- | :---: | :--- |
| Verification | `Asserted` | ✨ Zero Plugins: Native Handlebars engine without custom Go/Java plugins |

> 💡 **Production Pattern:** Zero Plugins: Native Handlebars engine without custom Go/Java plugins

### Presenter Notes

- Point out {{request.headers.X-Correlation-ID}}: echoes tracing headers back to client for distributed trace propagation.
- Highlight {{randomValue type='UUID'}}: guarantees unique transaction references without database sequences.
