/** MapLibre needs WebGL 2. Check before loading the map so old browsers get a clear message. */
export function hasWebGL2(): boolean {
  try {
    return Boolean(document.createElement('canvas').getContext('webgl2'));
  } catch {
    return false;
  }
}
