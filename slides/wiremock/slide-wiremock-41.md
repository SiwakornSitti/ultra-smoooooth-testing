# Large Payloads with External Files

### Decouple multi-megabyte JSON responses from stubs using the __files repository

---

### Specification & Rule Matrix

| Architectural Component | Rule / Operational Specification |
| :--- | :--- |
| **Clean Stubs** | Externalizes 5MB catalogs into `__files/`, keeping mapping stubs lightweight (under 20 lines). |
| **Dynamic Interpolation** | External files in `__files/` still support full Handlebars templating at runtime. |
| **Git Diff Hygiene** | Prevents massive multi-thousand line JSON commits in PR code reviews. |
| **MIME Type Flexibility** | Safely serves large binary assets, PDFs, or XML schemas alongside JSON. |

---

### Architectural Rules
- **Clean Stubs**: Externalizes 5MB catalogs into `__files/`, keeping mapping stubs lightweight (under 20 lines).
- **Dynamic Interpolation**: External files in `__files/` still support full Handlebars templating at runtime.
- **Git Diff Hygiene**: Prevents massive multi-thousand line JSON commits in PR code reviews.
- **MIME Type Flexibility**: Safely serves large binary assets, PDFs, or XML schemas alongside JSON.


> 💡 **Production Pattern:** � Architectural Payload Hygiene `__files Storage`

### Presenter Notes

- Emphasize hygiene: keeps mapping files lightweight (10-20 lines) and version-controllable.
- External files in `__files` still support Handlebars template interpolation at runtime.
