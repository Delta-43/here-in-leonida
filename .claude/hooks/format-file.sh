#!/usr/bin/env bash
# PostToolUse hook: format the file Claude just edited with Biome. Never blocks.
f=$(jq -r '.tool_input.file_path // empty')
[ -n "$f" ] && [ -f "$f" ] || exit 0
case "$f" in
  *.ts|*.tsx|*.js|*.mjs|*.json|*.jsonc|*.css) ;;
  *) exit 0 ;;
esac
cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" || exit 0
[ -x node_modules/.bin/biome ] || exit 0
node_modules/.bin/biome check --write --no-errors-on-unmatched "$f" >/dev/null 2>&1
exit 0
