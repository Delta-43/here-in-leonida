import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [preact()],
  build: {
    target: 'es2022',
    sourcemap: true,
    // MapLibre alone is ~1 MB minified; the real gate is scripts/check-size.ts (gzip).
    chunkSizeWarningLimit: 1200,
  },
});
