import { expect, test } from 'bun:test';
import { parseFrontmatter } from './frontmatter.ts';

test('parses frontmatter and body', () => {
  const { data, body } = parseFrontmatter('---\nid: a\nposition: { x: 1.5, y: -2 }\n---\nHello\n');
  expect(data).toEqual({ id: 'a', position: { x: 1.5, y: -2 } });
  expect(body).toBe('Hello\n');
});

test('no frontmatter gives null data', () => {
  expect(parseFrontmatter('Just text').data).toBeNull();
});
