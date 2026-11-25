---
paths:
  - "scripts/**"
---
# Build scripts

- Scripts run with Bun (`bun scripts/<name>.ts`). Use Bun APIs (`Bun.file`, `Bun.YAML`, `Glob`) rather than adding packages.
- Upstream data (GTADB, Open GTA 6 Map) comes from a pinned commit recorded in `content/sources/`, checked out under `.cache/`. Never fetch live data from gtadb.org.
- Scripts exit non-zero on any problem and print one line per problem with the file and field.
