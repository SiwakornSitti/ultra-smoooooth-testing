# WireMock Admin REST API Reference

### Declarative HTTP control plane for stubs, assertions, scenarios, and teardown

---

### API Specification & Endpoints

| Component | Method | Endpoint Path | Operational Purpose |
| :--- | :--- | :--- | :--- |
| Stub Mappings | `GET` | `/__admin/mappings` | Inspect all active in-memory and file-backed stubs. |
| Stub Mappings | `POST` | `/__admin/mappings` | Dynamically register a new stub definition at runtime. |
| Stub Mappings | `POST` | `/__admin/mappings/save` | Persist active in-memory stubs into `mappings/*.json` files. |
| Request Journal | `POST` | `/__admin/requests/count` | Assert exact call counts (retries, deduplication) without sleeps. |
| Request Journal | `GET` | `/__admin/requests/unmatched` | Inspect near-miss diff details when calls return 404 Not Found. |
| Scenarios & Reset | `POST` | `/__admin/scenarios/reset` | Reset all stateful FSM scenarios back to `Started` (~2ms). |
| Scenarios & Reset | `POST` | `/__admin/reset` | Atomic global teardown: clears journal and restores default stubs. |

---

### Key Operational Guidelines
- **Zero Process Restarts**: Never restart WireMock between tests; use administrative reset endpoints to clear state in sub-2ms.
- **Request Journal Inspection**: Check unmatched request diffs to diagnose 404 errors with precision field-level clarity.
- **Runtime Snapshotting**: Dynamically record stubs during exploratory testing and persist them directly into the mappings directory.

> 💡 **Clean Slate Protocol:** Clean Slate Protocol: Run POST /__admin/scenarios/reset and DELETE /__admin/requests in BeforeEach hooks for 100% test isolation.

### Presenter Notes

- Walk through the unified Admin API cheat sheet: stub manipulation, request journal, and scenario teardown.
- Emphasize POST /__admin/mappings/save for persisting dynamic stubs recorded in memory back to JSON files.
- Highlight the Clean Slate Protocol: Reset scenarios in ~2ms and wipe request history between test cases.
