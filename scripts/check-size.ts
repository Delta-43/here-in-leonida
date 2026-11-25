/**
 * Size gate, run after `bun run build`. Two budgets, gzip:
 * - first load: scripts and modulepreloads referenced by dist/index.html
 * - map ready: first load plus the MapLibre worker, which loads right after
 */
import { Glob, gzipSync } from 'bun';

const FIRST_LOAD_LIMIT_KB = 300;
const MAP_READY_LIMIT_KB = 460;

const dist = new URL('../dist/', import.meta.url).pathname;
const html = await Bun.file(`${dist}index.html`).text();

const gz = async (file: string) =>
  gzipSync(await Bun.file(dist + file).bytes(), { level: 9 }).byteLength / 1024;
const line = (kb: number, label: string) =>
  console.log(`${kb.toFixed(1).padStart(7)} kB  ${label}`);

const entry = new Set<string>();
for (const m of html.matchAll(
  /<(?:script[^>]*src|link[^>]*rel="modulepreload"[^>]*href)="\/?([^"]+\.js)"/g,
)) {
  if (m[1]) entry.add(m[1]);
}
if (entry.size === 0) {
  console.error('No scripts found in dist/index.html. Did the build run?');
  process.exit(1);
}

let firstLoad = 0;
for (const file of entry) {
  const kb = await gz(file);
  firstLoad += kb;
  line(kb, file);
}

let worker = 0;
for await (const file of new Glob('assets/maplibre-gl-worker-*.js').scan(dist)) {
  const kb = await gz(file);
  worker += kb;
  line(kb, `${file} (worker)`);
}

const failures: string[] = [];
line(firstLoad, `first load (limit ${FIRST_LOAD_LIMIT_KB} kB)`);
if (firstLoad > FIRST_LOAD_LIMIT_KB) failures.push('first load');
line(firstLoad + worker, `map ready (limit ${MAP_READY_LIMIT_KB} kB)`);
if (firstLoad + worker > MAP_READY_LIMIT_KB) failures.push('map ready');

if (failures.length > 0) {
  console.error(`Over budget: ${failures.join(', ')}.`);
  process.exit(1);
}
