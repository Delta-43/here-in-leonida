---
name: verify
description: Run every project check and report the evidence. Use before saying any code or content work is done, and when asked whether something works.
---

# Verify

1. Run `bun run check`. It runs typecheck, lint, unit tests, content validation, build and the size gate, and stops at the first failure.
2. If the change touches anything visible (files in `src/`, `index.html`, CSS), also run `bun run test:e2e`.
3. If a step fails: read the error, fix the cause (not the test), and run the step again. Do not lower the size limits or skip tests to get a pass; if a limit seems wrong, stop and explain.
4. Report, in this order:
   - each step with pass or fail,
   - the unit test count (`N pass, 0 fail`),
   - the size lines (`first load` and `map ready` in kB),
   - the e2e result per profile if it ran,
   - anything you could not check and why.
