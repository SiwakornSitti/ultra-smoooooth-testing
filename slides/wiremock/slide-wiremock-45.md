# Network Chaos: Cross-Border Link Simulation

### Verify client timeouts and socket drops using log-normal latency jitter and connection faults

---

### Specification & Rule Matrix

| Architectural Component | Rule / Operational Specification |
| :--- | :--- |
| **Deterministic Delay** | `fixedDelayMilliseconds: 3500` asserts that client 2s context deadlines cancel properly. |
| **Log-Normal Distribution** | `type: "lognormal", median: 100` models real production WAN latency percentiles. |
| **Hard TCP Drop** | `fault: "CONNECTION_RESET_BY_PEER"` terminates socket to test resource leak prevention. |
| **Malformed Chunks** | `fault: "EMPTY_RESPONSE"` verifies JSON parser resilience on EOF. |

---

### Architectural Rules
- **Deterministic Delay**: `fixedDelayMilliseconds: 3500` asserts that client 2s context deadlines cancel properly.
- **Log-Normal Distribution**: `type: "lognormal", median: 100` models real production WAN latency percentiles.
- **Hard TCP Drop**: `fault: "CONNECTION_RESET_BY_PEER"` terminates socket to test resource leak prevention.
- **Malformed Chunks**: `fault: "EMPTY_RESPONSE"` verifies JSON parser resilience on EOF.


> 💡 **Production Pattern:** Pro Tip: Eliminates arbitrary sleep() calls in automated test suites

### Presenter Notes

- Contrast fixed delay vs log-normal jitter: Real networks flap with long tails, not static numbers.
- Mention `CONNECTION_RESET_BY_PEER`: Proves your Go or Node HTTP client handles abrupt EOF socket closes gracefully.
