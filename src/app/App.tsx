import { hasWebGL2 } from '../lib/webgl.ts';
import { MapView } from '../map/MapView.tsx';

export function App() {
  return (
    <>
      {hasWebGL2() ? (
        <MapView />
      ) : (
        <p class="notice" role="alert">
          This map needs WebGL 2, which your browser does not offer. The list pages and tracker are
          coming soon.
        </p>
      )}
      <header class="brand">
        <h1>Here in Leonida</h1>
        <p>Fan project. Not affiliated with Rockstar Games or Take-Two Interactive.</p>
      </header>
    </>
  );
}
