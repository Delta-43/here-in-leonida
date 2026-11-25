---
paths:
  - "content/**"
  - "schema/**"
---
# Content

- One location per file: `content/locations/<region>/<id>.md`, YAML frontmatter as defined in `schema/content.ts`. The file name is the `id`.
- `id` never changes once merged. To rename, keep the id and change `name`.
- Every location has at least one entry in `sources` with `type`, and `ref`/`licence`/`url` for outside data.
- Data from another project starts as `confidence: unverified`. Only an in-game check makes it `confirmed`, with `verified_in` set to the game version.
- Unknown position: `position: null`. Never infer a position from the real-world counterpart.
- Write descriptions in our own words. Never copy text from guide sites, wikis or other maps.
- Spoilers: anything about missions, story or puzzle solutions goes in a `:::spoiler{level=...}` block and the location's `spoiler` level is set accordingly.
- Allowed sources: GTADB (CC BY 4.0), Open GTA 6 Map (CC BY 4.0), in-game play, contributors. MapGenie, IGN, GTABase and other all-rights-reserved sites are hints only.
- Run `bun run validate` after every content change.
