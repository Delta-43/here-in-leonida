/**
 * Validate everything in content/ against schema/content.ts.
 * Usage: bun scripts/validate-content.ts   (exit code 1 on any problem)
 */
import { Glob } from 'bun';
import { category, type Location, location } from '../schema/content.ts';
import { parseFrontmatter } from './lib/frontmatter.ts';

const root = new URL('../content/', import.meta.url).pathname;
const problems: string[] = [];

const categoriesFile = Bun.YAML.parse(await Bun.file(`${root}categories.yaml`).text()) as {
  categories: unknown[];
};
const categoryIds = new Set<string>();
for (const [i, raw] of categoriesFile.categories.entries()) {
  const result = category.safeParse(raw);
  if (!result.success) {
    problems.push(`categories.yaml #${i}: ${result.error.issues.map((e) => e.message).join('; ')}`);
    continue;
  }
  if (categoryIds.has(result.data.id))
    problems.push(`categories.yaml: duplicate id ${result.data.id}`);
  categoryIds.add(result.data.id);
}

const seen = new Map<string, string>();
let count = 0;
for await (const file of new Glob('locations/**/*.md').scan(root)) {
  count++;
  const { data } = parseFrontmatter(await Bun.file(root + file).text());
  const result = location.safeParse(data);
  if (!result.success) {
    for (const issue of result.error.issues) {
      problems.push(`${file}: ${issue.path.join('.') || '(root)'}: ${issue.message}`);
    }
    continue;
  }
  const loc: Location = result.data;
  if (!categoryIds.has(loc.category)) problems.push(`${file}: unknown category ${loc.category}`);
  const other = seen.get(loc.id);
  if (other) problems.push(`${file}: id ${loc.id} already used by ${other}`);
  seen.set(loc.id, file);
  if (!file.endsWith(`/${loc.id}.md`)) problems.push(`${file}: file name must be ${loc.id}.md`);
}

if (problems.length > 0) {
  console.error(`Content check failed (${problems.length} problems):\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`Content OK: ${categoryIds.size} categories, ${count} locations.`);
