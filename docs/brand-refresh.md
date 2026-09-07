# Brand refresh — September 2026

The user requested a new generated `X.` icon, a blue-gradient `Anomx` wordmark with an orange period on desktop, and the icon alone in the mobile navigation.

Generated with the built-in image-generation tool. The result was inspected and resized with Sharp, preserving its alpha channel. No CLI image-generation fallback was used.

The generated concept is saved at `docs/assets/anomx-icon-concept.webp` for later consideration. It is not referenced by the website or copied into the static build. Existing app icons, touch icons and favicons remain unchanged.

The final user direction is plain-text `Anomx.` on desktop and `X.` on mobile: solid primary-blue letters, orange period, no image or SVG in the navigation. `components/site-logo.tsx` implements the same responsive text mark in the footer.

The landing hero uses code-native time-series graphics only; no generated knot image is loaded. Scroll position advances the observation window, deviation highlight and context connection. Reduced motion and short viewports use a complete still view. `public/media/time-series-intelligence.png` is the matching social preview, rendered from the same vector signal paths; its editable SVG is included alongside it.

## Final image prompt

Use case: logo-brand. Create a single finished square app icon for Anomx, a minimal scientific AI platform for autonomous infrastructure. Exact lettering: "X." only, a large confident geometric uppercase X with a small circular orange period at its lower right. The X should be optically balanced, extremely crisp and simple, in a luminous ice-blue to medium-blue vertical gradient (#b8eeff to #249bd2). The period is vivid warm orange #f18f1f. Background: very dark midnight navy #07121b, softly rounded square corners, with only a restrained smooth glass-like blue edge highlight, inspired by premium modern platform UI. Composition: flat straight-on, no perspective, no 3D extrusion, no mockup, no surrounding canvas padding; the rounded-square tile nearly fills the 1:1 image. Generous internal spacing, X and dot together centered, glyph occupies about 65% of the icon width and 62% of its height, highly readable at tiny favicon size. Outside the rounded square is truly transparent. Clean vector-like contours, pure smooth surfaces. No other letters, no words, no tiny lines, no sparkles, no shadows outside the tile, no textures, no decorative circuitry or charts, no watermark. Deliver one icon, not a collection.
