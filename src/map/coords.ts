/**
 * The only place that knows about map projections.
 *
 * Everything else in the app works in game-world metres: x east, y north, origin at the centre,
 * world bounds ±WORLD_HALF on each axis (GTADB's system). MapLibre only understands Web Mercator,
 * so we treat the game world as the whole Mercator square and convert here.
 */

/** Half the width of the game world, in metres. */
export const WORLD_HALF = 16_384;
const WORLD_SIZE = WORLD_HALF * 2;

export interface GamePoint {
  x: number;
  y: number;
}

export interface LngLatLike {
  lng: number;
  lat: number;
}

/** Game metres → MapLibre longitude/latitude. */
export function toLngLat({ x, y }: GamePoint): LngLatLike {
  const mx = (x + WORLD_HALF) / WORLD_SIZE; // 0 at west edge, 1 at east edge
  const my = (WORLD_HALF - y) / WORLD_SIZE; // 0 at north edge, 1 at south edge
  const lng = mx * 360 - 180;
  const lat = (Math.atan(Math.sinh(Math.PI * (1 - 2 * my))) * 180) / Math.PI;
  return { lng, lat };
}

/** MapLibre longitude/latitude → game metres. */
export function toGame({ lng, lat }: LngLatLike): GamePoint {
  const mx = (lng + 180) / 360;
  const phi = (lat * Math.PI) / 180;
  const my = (1 - Math.log(Math.tan(phi) + 1 / Math.cos(phi)) / Math.PI) / 2;
  return { x: mx * WORLD_SIZE - WORLD_HALF, y: WORLD_HALF - my * WORLD_SIZE };
}

/** Straight-line distance in metres. Never use MapLibre's distance functions: they assume Earth. */
export function distance(a: GamePoint, b: GamePoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** True when the point lies inside the game world. */
export function inWorld({ x, y }: GamePoint): boolean {
  return Math.abs(x) <= WORLD_HALF && Math.abs(y) <= WORLD_HALF;
}

/**
 * Open GTA 6 Map stores positions in GTADB's 1,024-unit tile pyramid with y pointing down.
 * Fit over 1,020 shared places: median error 1.8 m (their values are rounded to 3.2 m).
 */
export function fromOpenGta6(u: number, v: number): GamePoint {
  return { x: 32 * u - WORLD_HALF, y: WORLD_HALF - 32 * v };
}
