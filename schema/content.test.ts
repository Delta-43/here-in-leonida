import { expect, test } from 'bun:test';
import { location } from './content.ts';

const valid = {
  id: 'flamingo-001',
  category: 'cocaine-flamingo',
  name: 'Test flamingo',
  position: { x: 100, y: 200 },
  spoiler: 'location',
  confidence: 'unverified',
  sources: [{ type: 'in-game', by: 'tester' }],
};

test('accepts a valid location', () => {
  expect(location.safeParse(valid).success).toBe(true);
});

test('rejects positions outside the world', () => {
  expect(location.safeParse({ ...valid, position: { x: 20_000, y: 0 } }).success).toBe(false);
});

test('allows unknown positions as null, never guessed', () => {
  expect(location.safeParse({ ...valid, position: null }).success).toBe(true);
});

test('requires at least one source', () => {
  expect(location.safeParse({ ...valid, sources: [] }).success).toBe(false);
});

test('rejects unknown fields', () => {
  expect(location.safeParse({ ...valid, colour: '#fff' }).success).toBe(false);
});
