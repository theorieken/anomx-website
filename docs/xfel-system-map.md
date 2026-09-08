# European XFEL / DESY animated system map

Created on 2026-09-07 to replace the generated tunnel photographs on the case card and detail page.

The user's campus-map screenshot provided the visual reference: a linear XFEL connection, branching experimental halls, and the DESY campus with its ring outline. The website drawing deliberately simplifies those shapes. It is an illustrative system sketch, not a surveyed map, engineering plan, operational status view, or depiction of live telemetry.

- Component and shared SVG geometry: `components/xfel-system-map.tsx`
- Theme-aware styling: `app/xfel-map.css`
- Social preview: `public/media/xfel-system-map.png` (1600 × 900)
- Vector poster: `public/media/xfel-system-map.svg`
- Regeneration: `node scripts/render-xfel-poster.mjs`

The drawing uses existing website colors, including the orange brand accent. Native scroll progress draws routes and positions data markers along SVG paths. There is no looping timer, video download, map service, or animation dependency. Reduced-motion settings show the full drawing without moving markers. The full map also remains visible without JavaScript.

Labels and accessible descriptions are maintained in English and German. The official DESY logo remains separate. The previous generated images and their provenance document remain in the repository but are no longer used by the case pages or social metadata.
