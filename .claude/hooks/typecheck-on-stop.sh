#!/usr/bin/env bash
# Stop hook: block stopping while TypeScript has errors (exit 2 sends them back to Claude).
cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)" || exit 0
# Only when TypeScript files changed since the last commit.
git status --porcelain | grep -qE '\.(ts|tsx)$' || exit 0
[ -x node_modules/.bin/tsc ] || exit 0
if ! out=$(node_modules/.bin/tsc --noEmit 2>&1); then
  echo "TypeScript errors; fix them before finishing:" >&2
  echo "$out" | head -40 >&2
  exit 2
fi
exit 0
