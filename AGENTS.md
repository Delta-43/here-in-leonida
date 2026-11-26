# AGENTS.md

Instructions for AI coding agents (and a quick start for humans). Keep this file under 200 lines: add only what an agent cannot work out from the code.

## Project

Here in Leonida: an interactive GTA VI map. Every location, a 100% tracker, routes on real roads, spoilers hidden by default. Static site; no server, no accounts. Fan project, non-commercial (Rockstar fan policy).

## Commands

Bun is the package manager and script runner. Vite builds the app.

| Command | Does |
|---|---|
| `bun install` | Install dependencies |
| `bun run dev` | Dev server |
| `bun run check` | **Everything below, in order. Run before saying work is done.** |
| `bun run typecheck` | TypeScript, no emit |
| `bun run lint` | Biome lint and format check (`bun run format` fixes) |
| `bun run test` | Unit tests (`bun test`), files named `*.test.ts` next to the code |
| `bun run validate` | Checks every file in `content/` against `schema/content.ts` |
| `bun run build` | Production build to `dist/` |
| `bun run size` | Size gate: first load ≤ 300 kB, map ready ≤ 460 kB (gzip) |
| `bun run test:e2e` | Playwright on desktop, Pixel and iPhone profiles (builds first) |

## Layout

```
src/app/        shell, layout, global CSS
src/map/        MapLibre setup; coords.ts is the only projection code
src/lib/        small helpers with no UI
schema/         Zod content schema (build and CI only, never imported by src/)
scripts/        Bun scripts: validation, data build, size gate
content/        the data: categories.yaml, one Markdown file per location
tests/e2e/      Playwright tests
docs/           public docs for contributors
```

## Stack

Preact (not React) with `@preact/signals` for state; MapLibre GL JS; idb-keyval for device storage; Vite; Bun; Biome; Playwright. Write Preact: `class` not `className`, `onInput` for live text input, import hooks from `preact/hooks`.

## Hard rules

1. **Game metres everywhere.** Positions are `{ x, y }` in game-world metres (x east, y north, ±16,384). Only `src/map/coords.ts` converts to MapLibre longitude/latitude. Never use MapLibre's distance functions; they assume Earth.
2. **Size budget.** First load ≤ 300 kB gzip, map ready ≤ 460 kB. Anything not needed on first paint (search, routing, editor, spoiler text) loads with dynamic `import()`. Never import `zod` or anything from `schema/` in `src/`.
3. **No third-party code at runtime.** No analytics, CDNs, external fonts or trackers. No cookies. No dialog in front of the map.
4. **Spoilers hidden by default.** Text marked `solution`, `story` or `endgame` never ships in the default bundle or data.
5. **Content rules.** Never copy text, icons or images from guide sites (MapGenie, IGN, GTABase…). Never guess a position from the real-world place: use `position: null`. Every location has at least one `source`. Outside data starts as `confidence: unverified`.
6. **No Rockstar branding.** No GTA logos, wordmark or blip art.
7. **Stable IDs.** A location `id` never changes; the file name is `<id>.md`.
8. **Phones first.** Tap targets ≥ 44 px, `100dvh`, safe-area insets, no hover-only features.

## Conventions

- TypeScript strict; no `any`. Small modules; named exports.
- Tests beside the code (`coords.test.ts`). Every bug fix gets a test that failed before the fix.
- Commit messages: imperative summary line, then why.
- Keep pull requests to one topic; content changes and code changes in separate pull requests.

## Verifying work

1. `bun run check` must pass. Paste the summary lines (tests passed, size numbers) as evidence.
2. UI changes: `bun run test:e2e`, and look at the page on a phone-sized viewport.
3. Map or coordinate changes: the tests in `src/map/coords.test.ts` must still pass; add a known landmark if you touch the transform.

## Licences

Code: AGPL-3.0 (`LICENSE`). Content and data: CC BY 4.0 (`LICENSE-CONTENT`). Third-party data credits are listed in `LICENSE-CONTENT`; add any new source there in the same pull request.

## Plans and decisions

The maintainer keeps research notes and the decision log outside this repository. Do not add plans, research or decision logs here; put lasting design facts in `docs/` and the reasoning in the pull request description.
