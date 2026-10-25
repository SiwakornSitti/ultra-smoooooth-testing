# Webhook Idempotency & Outbound Callbacks

### Test asynchronous event listeners and signature verification via outbound mock HTTP callbacks

---

### Specification & Rule Matrix

| Architectural Component | Rule / Operational Specification |
| :--- | :--- |
| **serveEventListeners** | Triggers real outbound HTTP POST callbacks from WireMock back into your service. |
| **Dynamic Destination** | `{{jsonPath originalRequest.body '$.callback_url'}}` dispatches to dynamic test ports. |
| **Configurable Delay** | Fixed or random jitter delay (e.g. 500ms) mimics asynchronous banking settlement. |
| **Zero Tunnels** | Tests webhook listeners, HMAC signatures, and idempotency without ngrok. |

---

### Architectural Rules
- **serveEventListeners**: Triggers real outbound HTTP POST callbacks from WireMock back into your service.
- **Dynamic Destination**: `{{jsonPath originalRequest.body '$.callback_url'}}` dispatches to dynamic test ports.
- **Configurable Delay**: Fixed or random jitter delay (e.g. 500ms) mimics asynchronous banking settlement.
- **Zero Tunnels**: Tests webhook listeners, HMAC signatures, and idempotency without ngrok.


> 💡 **Production Pattern:** Native Event Delivery: Zero third-party tunnel dependencies

### Presenter Notes

- Highlight `serveEventListeners: webhook`: WireMock receives client payment, returns 202 PENDING, then independently fires POST callback to client.
- Tests your service's webhook HMAC signature verifier and idempotency key handling without public tunnels.
