# Contributing

Thanks for helping map Leonida. There are three ways to help, from easiest:

1. **Open an issue** with the "Location fix or new location" form. Say what is wrong in your own words, add the position and a screenshot if you can.
2. **Edit a location file** on GitHub: every location is one Markdown file in [`content/locations/`](content/locations/). The format is in [`schema/content.ts`](schema/content.ts) and the example [`vice-regal.md`](content/locations/vice-city/vice-regal.md).
3. **Change the code**: see below.

## Content rules

- **Your own words.** Never copy text, icons or images from guide sites or other maps (MapGenie, IGN, GTABase and so on). Positions are facts; their descriptions are someone else's work.
- **Never guess a position** from the real-world place a location is based on. If nobody has checked it in game, use `position: null`.
- **Every location needs a source**: `in-game` with your handle, or the open project it came from with its id, licence and link.
- **Data from other projects starts as `unverified`.** It becomes `confirmed` only after someone checks it in game and sets `verified_in` to the game version.
- **Spoilers**: mission names, story events and puzzle solutions go inside a `:::spoiler{level=...}` block.
- **Crop out your PSN name** from screenshots.

By contributing content you agree to license it under CC BY 4.0 ([`LICENSE-CONTENT`](LICENSE-CONTENT)). Code contributions are under AGPL-3.0 ([`LICENSE`](LICENSE)).

## Code

You need [Bun](https://bun.sh).

```bash
bun install
bun run dev      # dev server
bun run check    # typecheck, lint, unit tests, content check, build, size gate
bun run test:e2e # browser tests (first run: bunx playwright install chromium webkit)
```

`bun run check` must pass before a pull request is merged; CI runs the same command. Keep one topic per pull request, and content separate from code. [`AGENTS.md`](AGENTS.md) lists the project's rules in short form (it is written for AI coding agents, and works as a checklist for people too).
