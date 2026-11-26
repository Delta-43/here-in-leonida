<h1 align="center">Here in Leonida</h1>

<p align="center"><i>An interactive map of Leonida for GTA VI: every location, a 100% tracker, routes on real roads, and spoilers hidden by default.</i></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/Code-AGPL--3.0-blue.svg" alt="Code licence"></a>
  <a href="LICENSE-CONTENT"><img src="https://img.shields.io/badge/Content-CC%20BY%204.0-lightgrey.svg" alt="Content licence"></a>
  <a href="https://github.com/Delta-43/here-in-leonida/commits"><img src="https://img.shields.io/github/last-commit/Delta-43/here-in-leonida" alt="Last commit"></a>
  <a href="https://github.com/Delta-43/here-in-leonida/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/Delta-43/here-in-leonida/ci.yml?branch=main&label=ci" alt="CI"></a>
</p>

<p align="center">
  <a href="#-what-it-does">What it does</a> •
  <a href="#-why-this-design">Why this design</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-documentation">Documentation</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

> [!NOTE]
> Early stage: the map shell, coordinate system, content schema and checks are in place; locations, tracker and routing are next. Fan project, not affiliated with or endorsed by Rockstar Games or Take-Two Interactive.

---

## 🗺️ What it does

A static web app that draws Leonida with MapLibre and keeps every position in game-world metres. Locations are Markdown files in [`content/`](content/), checked against a schema in CI. Next, a build step will turn them into small JSON files the map loads per category, and a tracker will keep your progress in your browser. There will be no accounts and no cookies.

## 🧠 Why this design

- **No wall in front of the map** — no cookie dialog, no account, no ads, no third-party scripts. It opens straight to the map.
- **Size gate in CI** — first load ≤ 300 kB and map ready ≤ 460 kB of JavaScript (gzip), checked on every pull request by [`scripts/check-size.ts`](scripts/check-size.ts). Preact instead of React keeps room for MapLibre.
- **Game metres everywhere** — the same system as GTADB, so its data drops in and distances are real; only [`src/map/coords.ts`](src/map/coords.ts) knows about projections.
- **Content as files** — one Markdown file per location, so every change is a small, reviewable diff and nobody needs a database.
- **Spoilers hidden by default** — Rockstar's fan policy asks fans not to spoil the plot; spoiler text does not ship until you turn it on.

## 🚀 Quick Start

```bash
git clone https://github.com/Delta-43/here-in-leonida.git
cd here-in-leonida
bun install
bun run dev
```

`bun run check` runs typecheck, lint, unit tests, content validation, build and the size gate. `bun run test:e2e` runs the browser tests on desktop, Pixel and iPhone profiles.

## 📁 Project Structure

```text
src/            # the app: Preact shell, MapLibre map (src/map/coords.ts = projection)
content/        # categories.yaml and one Markdown file per location
schema/         # content schema (Zod), used by the build and CI only
scripts/        # Bun scripts: content validation, size gate, data build
tests/e2e/      # Playwright tests
docs/           # architecture notes
.claude/        # AI tooling: settings, hooks, rules, skills, subagents
AGENTS.md       # project rules for AI coding agents (and a checklist for people)
```

## 📚 Documentation

| Doc | What's in it |
|---|---|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Coordinates, content pipeline, size budget, storage, hosting |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | How to report or edit locations, content rules, code checks |
| [`AGENTS.md`](AGENTS.md) | Commands, layout and hard rules for AI coding agents |
| [`CLAUDE.md`](CLAUDE.md) | Claude Code specifics: skills, hooks, subagents |

## 🤝 Contributing

Location fixes are the most useful contribution: open an issue with the location form, or edit the file directly. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the content rules; the most important is to write in your own words and never copy from guide sites.

## 📄 License

Code: [AGPL-3.0](LICENSE). Anyone who runs a modified copy as a public site must publish their changes. Content and data: [CC BY 4.0](LICENSE-CONTENT), with credits for GTADB and Open GTA 6 Map.

---

<p align="center">
  <a href="https://github.com/Delta-43/here-in-leonida/graphs/contributors"><img src="https://contrib.rocks/image?repo=Delta-43/here-in-leonida" alt="Contributors"></a>
</p>
<p align="center"><sub>Code licensed under <a href="LICENSE">AGPL-3.0</a>, content under <a href="LICENSE-CONTENT">CC BY 4.0</a>.</sub></p>
