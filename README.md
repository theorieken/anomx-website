# Anomx website

The public Anomx website, built with Next.js 16 and React 19. The home and platform
pages focus on background agents and system intelligence. The CLI guide is at
`/documentation/`, checked against `anomx-package` 0.2.34 and the current platform.

## Development

```sh
npm ci
npm run dev
```

## Production deployment

This is a **Node.js application**, not a static export. The waitlist and existing
administration routes require a server. Run from this repository:

```sh
npm ci
npm run lint
npm run build
npm run start
```

Deploy the repository, production dependencies, `.next/`, and `public/` together,
or use your hosting provider's Next.js deployment support. Use Node.js 20.9+.
The old instructions describing `build/` as a static webroot were incorrect.
Keep `.env.local` and private configuration out of Git. The public pages do not
require the administration database.

## Early access

Set the SMTP variables in `.env.example` on the server to deliver form requests.
Environment variables override the existing `config/waitlist.config.json` values.
Port 465 normally uses `SMTP_SECURE=true`; port 587 uses STARTTLS with `false`.
`SMTP_FROM_EMAIL` must be accepted by your mail provider. A sender and recipient
are needed in addition to host and authentication.

If delivery is unavailable, the form keeps the request and offers a prefilled
email link. It never claims success for a failed delivery. Validation and
honeypot requests can be checked without sending mail. Verify real delivery with
your own address once production SMTP is configured.

The existing private administration area uses `config/database.config.json`
(ignored by Git). Its sessions are held in process memory; a restart signs admins
out and multiple server replicas need a shared session implementation. Keep
administration behind your deployment's access controls.

## Content and design

- `components/home-page.tsx`: main system-intelligence narrative.
- `components/intelligence-demo.tsx`: scroll-driven agent story and interactive
  forecasting/reconstruction/representation diagrams. Charts are illustrative.
- `components/platform-page.tsx`: platform, autonomy boundaries, real product view.
- `components/agent-page.tsx`: CLI features, four interactive modes, providers.
- `components/documentation-page.tsx`: current commands, setup, background policy,
  local storage and an example of the actual component API.
- `app/experience.css`: shared public design, responsive layout, reduced motion.
- `app/globals.css`: existing legal/administration styling and shared base styles.
- `public/media/intelligence-sculpture.webp`: original generated hero artwork.
- `public/media/background-agent-product.webp`: real platform capture;
  the displayed frame excludes the account sidebar and profile controls.
- `public/images/app-icon.webp`: user-supplied icon; icon variants live in `app/`.

English and German copy are maintained together. Language and light/dark
preferences persist locally. Motion respects `prefers-reduced-motion`; the
scroll story becomes a normal interactive section on small screens. Content
remains visible without JavaScript. No animation library or remote fonts added.

## Release notes

Before public deployment, complete the existing legal notice and privacy policy
with the actual publisher/address and hosting/email processing details. The
repository originally contained placeholders; these facts cannot be inferred
from the product code. Confirm the applicable legal text with the publisher.

Validate desktop/mobile navigation, science tabs (including arrow keys), all
agent-story steps, both languages, both themes, command copying, and form
validation/fallback. The local preview uses port 3100 in this task.

See `docs/media.md` for generated-asset provenance.
