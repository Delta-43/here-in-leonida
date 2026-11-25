import 'maplibre-gl/dist/maplibre-gl.css';
import { Map as MapLibreMap, type StyleSpecification, setWorkerUrl } from 'maplibre-gl';
// MapLibre 6 runs its tile work in a module worker; let Vite bundle it and hand MapLibre the URL.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import { useEffect, useRef } from 'preact/hooks';
import { toLngLat, WORLD_HALF } from './coords.ts';

// Placeholder style until the vector basemap exists: sea, and the outline of the game world.
const corners = [
  [-WORLD_HALF, WORLD_HALF],
  [WORLD_HALF, WORLD_HALF],
  [WORLD_HALF, -WORLD_HALF],
  [-WORLD_HALF, -WORLD_HALF],
  [-WORLD_HALF, WORLD_HALF],
].map(([x = 0, y = 0]) => {
  const { lng, lat } = toLngLat({ x, y });
  return [lng, lat];
});

setWorkerUrl(workerUrl);

const style: StyleSpecification = {
  version: 8,
  sources: {
    world: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: { type: 'LineString', coordinates: corners },
      },
    },
  },
  layers: [
    { id: 'sea', type: 'background', paint: { 'background-color': '#0b1d2a' } },
    {
      id: 'world-edge',
      type: 'line',
      source: 'world',
      paint: { 'line-color': '#2a4a5e', 'line-width': 1 },
    },
  ],
};

/** Starting view: Vice City, in game metres. */
const START = toLngLat({ x: -1500, y: 1500 });

export function MapView() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!host.current) return;
    const map = new MapLibreMap({
      container: host.current,
      style,
      center: [START.lng, START.lat],
      zoom: 3,
      minZoom: 1,
      maxZoom: 9,
      renderWorldCopies: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      attributionControl: false,
    });
    map.touchZoomRotate.disableRotation();
    return () => map.remove();
  }, []);

  return <div ref={host} class="map" data-testid="map" />;
}
