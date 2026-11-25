---
paths:
  - "src/map/**"
---
# Map code

- Positions are game metres `{ x, y }` (x east, y north). `src/map/coords.ts` is the only file that converts to MapLibre `LngLat`; call `toLngLat` / `toGame`, never write projection maths elsewhere.
- Distances: `distance()` from `coords.ts`. MapLibre's metre-based helpers assume Earth and are wrong here.
- Pins are MapLibre layers (symbol or circle) over GeoJSON sources with `cluster: true`. Never one DOM element (`Marker`) per location.
- Rotation and pitch stay off.
- MapLibre's worker URL is set with `setWorkerUrl` from a Vite `?worker&url` import; keep it that way or the production build breaks (the e2e smoke test catches this).
- If you change `coords.ts`, extend `coords.test.ts` with a known landmark from GTADB.
