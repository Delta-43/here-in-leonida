@AGENTS.md

## Claude Code

- **Skills** in `.claude/skills/`: `verify` (run every check, report evidence) and `add-location` (add or fix a location file). Use them instead of improvising those steps.
- **Rules** in `.claude/rules/` load when you touch matching files (map code, content, scripts).
- **Hooks** (`.claude/settings.json`): every file you edit is formatted with Biome; when you stop, `bun run typecheck` runs and blocks the stop if it fails. Fix the reported errors rather than working around the hook.
- **Subagent** `content-reviewer` (read-only) reviews content changes against the content rules. Use it before opening a content pull request.
- Bun may not be on `PATH` yet on a new machine. If `bun` is missing, say so and stop; do not install it with a piped shell script.
