/** Split a Markdown file into YAML frontmatter (parsed) and body. */
export function parseFrontmatter(text: string): { data: unknown; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text);
  if (!match) return { data: null, body: text };
  return { data: Bun.YAML.parse(match[1] ?? ''), body: match[2] ?? '' };
}
