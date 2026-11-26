# Architecture

A static web app. There is no server and no database: content lives in Git, the build turns it into JSON and tiles, and the browser does the rest.

Built so far: the coordinate transform, the content schema and validation, the size gate and the map shell. Sections marked *(planned)* describe the design for parts that do not exist yet.

## Coordinates

All positions are **game-world metres**: x east, y north, origin at the centre, world bounds ±16,384 m on each axis. This is the system GTADB uses, so its data needs no conversion, and distances and travel times are real.

MapLibre only understands Web Mercator, so the game world is mapped onto the whole Mercator square. [`src/map/coords.ts`](../src/map/coords.ts) is the only file that converts between the two; [`src/map/coords.test.ts`](../src/map/coords.test.ts) checks it against known landmarks.

## Content to app

```text
content/*.yaml, content/locations/**/*.md
        │  bun run validate   (schema/content.ts, Zod; CI only)
        ▼
   build scripts (Bun, planned)  ──►  per-category JSON, search index, stats, spoiler chunks
        ▼
   the app (Preact + MapLibre) loads a category's JSON only when it is turned on
```

Zod runs in the build and CI only. The app ships no validation library for content: it reads JSON that already passed the checks.

## Size budget

Checked in CI by [`scripts/check-size.ts`](../scripts/check-size.ts), gzip:

| Budget | Limit | What counts |
|---|---|---|
| First load | 300 kB | Scripts referenced by `index.html` |
| Map ready | 460 kB | First load plus MapLibre's worker |

MapLibre is most of it. Everything not needed for the first view (search, routing, editor, spoiler text) loads with dynamic `import()`.

## Player data *(planned)*

Progress and settings stay on the device (IndexedDB through idb-keyval). No accounts, no cookies, no third-party scripts. Export and import as a file.

## Hosting *(planned)*

Cloudflare Workers with static assets ([`wrangler.jsonc`](../wrangler.jsonc)); map tiles as PMTiles files on Cloudflare R2.
