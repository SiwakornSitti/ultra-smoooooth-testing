# Latency Injection & Network Chaos

### Delay simulation, log-normal jitter, and socket-level connection faults

---

### Operator Reference Matrix

| Operator / Key | Operational Matching Behavior & Recommendation |
| :--- | :--- |
| `fixedDelayMilliseconds` | Deterministic delay in milliseconds (e.g. `2000`) for HTTP client timeout testing. |
| `logNormal` | Realistic latency distribution with median and sigma parameters simulating WAN jitter. |
| `fault` | CONNECTION_RESET_BY_PEER`: Abruptly terminates TCP socket with RST packet to verify connection pool cleanup. |
| `fault` | EMPTY_RESPONSE / GARBAGE`: Injects 0 bytes or corrupted payloads to verify client error handling. |

---

### Key Capabilities & Mechanics
- `fixedDelayMilliseconds`: Deterministic delay in milliseconds (e.g. `2000`) for HTTP client timeout testing.
- `logNormal`: Realistic latency distribution with median and sigma parameters simulating WAN jitter.
- `fault: CONNECTION_RESET_BY_PEER`: Abruptly terminates TCP socket with RST packet to verify connection pool cleanup.
- `fault: EMPTY_RESPONSE / GARBAGE`: Injects 0 bytes or corrupted payloads to verify client error handling.

> 💡 **Pro Tip:** Pro Tip: Test fail-fast resilience with socket faults. Use CONNECTION_RESET_BY_PEER to prove client pools cleanly release sockets.

### Presenter Notes

- Contrast fixed delays with log-normal distributions: real systems have long tail latencies.
- Explain CONNECTION_RESET_BY_PEER: WireMock sends a TCP RST packet.
- This tests whether your Go/Node/Java HTTP client properly cleans up socket descriptors in the connection pool.
