import { describe, expect, test } from 'bun:test';
import { distance, fromOpenGta6, inWorld, toGame, toLngLat, WORLD_HALF } from './coords.ts';

// GTADB L1, "Vice Regal, Washington Beach" (CC BY 4.0, map.gtadb.org).
const VICE_REGAL = { x: 1409.40126306379, y: 2803.2135475894142 };

describe('coords', () => {
  test('world corners map to the Mercator square', () => {
    const nw = toLngLat({ x: -WORLD_HALF, y: WORLD_HALF });
    const se = toLngLat({ x: WORLD_HALF, y: -WORLD_HALF });
    expect(nw.lng).toBeCloseTo(-180, 9);
    expect(se.lng).toBeCloseTo(180, 9);
    expect(nw.lat).toBeCloseTo(85.0511287798, 6);
    expect(se.lat).toBeCloseTo(-85.0511287798, 6);
  });

  test('origin maps to 0,0', () => {
    const p = toLngLat({ x: 0, y: 0 });
    expect(p.lng).toBeCloseTo(0, 9);
    expect(p.lat).toBeCloseTo(0, 9);
  });

  test('round trip keeps millimetre precision', () => {
    for (const point of [VICE_REGAL, { x: -9000, y: -7000 }, { x: 16000, y: -16000 }]) {
      const back = toGame(toLngLat(point));
      expect(back.x).toBeCloseTo(point.x, 3);
      expect(back.y).toBeCloseTo(point.y, 3);
    }
  });

  test('north is up', () => {
    expect(toLngLat({ x: 0, y: 1000 }).lat).toBeGreaterThan(toLngLat({ x: 0, y: -1000 }).lat);
  });

  test('distance is in game metres', () => {
    expect(distance({ x: 0, y: 0 }, { x: 300, y: 400 })).toBe(500);
  });

  test('inWorld', () => {
    expect(inWorld(VICE_REGAL)).toBe(true);
    expect(inWorld({ x: WORLD_HALF + 1, y: 0 })).toBe(false);
  });

  test('Open GTA 6 Map units convert to GTADB metres', () => {
    // Open GTA 6 Map stores the same place as u=556, v=424.4 (rounded to 0.1 unit = 3.2 m).
    const p = fromOpenGta6(556, 424.4);
    expect(distance(p, VICE_REGAL)).toBeLessThan(3.2);
  });
});
