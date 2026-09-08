# Anomx website

The public Anomx website, built with Next.js 16 and React 19. The home and platform
pages focus on background agents and system intelligence. System explains
the architecture, and Cases presents the DESY alpha work alongside an invitation to collaborate.
The CLI guide is at
`/documentation/`, checked against `anomx-package` 0.2.34 and the current platform.

## Development

```sh
npm ci
npm run dev
```

## Production deployment: ALL-INKL static hosting

`npm run build` exports all public pages and packages the complete deployable
website in **`build/`**. Apache serves HTML, CSS, JavaScript and images directly.
Animations, scientific tabs, language switching and navigation remain interactive.
No Node.js process is needed on the web server. The contact form uses PHP 8.1+
with PHPMailer over authenticated SMTP.

Install Node.js 20.9+, PHP and Composer on your development machine, then run:

```sh
npm ci
npm run lint
npm run build
npm run test:static
npm run deploy
```

`test:static` needs PHP 8.1+; set `PHP_BIN=/path/to/php` if your default PHP is older.
Composer uses a locked dependency and the PHP 8.3 target available at ALL-INKL.
It installs the PHP dependency locally; the deployed bundle includes it.

The deployment command defaults to `ssh-w0130bf4@www.theorieken.de`, with the
repository at `/www/htdocs/w0130bf4/anomx.io`. SSH prompts for your password.
It uploads a fresh directory, checks PHP syntax, then replaces `build/` and
retains any previous version as `.build-backup-<timestamp>/` for rollback.
Override `ANOMX_DEPLOY_HOST` and `ANOMX_DEPLOY_ROOT` for another account.

**The domain's document root must be `/anomx.io/build/` in ALL-INKL KAS**, or the
corresponding absolute path `/www/htdocs/w0130bf4/anomx.io/build`.
`build/index.html` must be the file served for `https://anomx.io/`.
Alternatively, upload the contents of `build/` via SFTP to that directory,
including `.htaccess`, `_next/`, media and `api/`.

Generated `build/`, `out/` and `.next/` directories are intentionally ignored by
Git. **A Git push/pull alone does not deploy the website.** Build locally and run
`npm run deploy` after your source changes. No npm commands are needed remotely.
Never point Apache at the repository root, `public/`, or `.next/`.

## Contact form and email credentials

Copy `php/mail.example.php` to **`.private/mail.php` beside `build/`** on the
server. Fill in the mailbox credentials there. This file is ignored by Git and
must stay outside the public document root. Keep private-directory permissions
restrictive and writable by the site's PHP user for the rate-limit file.

The default ALL-INKL endpoint is `w0130bf4.kasserver.com`, port 465, implicit TLS.
Use the mailbox login, `hello@anomx.io` as sender, and the desired recipient.
Only the PHP endpoint reads this configuration; credentials never enter client
JavaScript. Deployment preserves `.private/`.

The endpoint `/api/waitlist.php` validates input, rejects unrelated browser
origins, applies a honeypot and limits submissions per client and globally. It
sends only to the configured recipient, with the visitor as Reply-To. If delivery
fails, the form keeps the entered details and offers an email-draft link.
`npm run test:static` uses an isolated local fixture with an unreachable local
SMTP address; it never sends mail or accesses production credentials.

## Optional Node development and administration

`npm run dev` keeps the original local Node API and administration routes.
Those routes use `.node.ts` / `.node.tsx` filenames and are deliberately excluded
from the static export. `/admin/` and the website's `/login/` are unavailable on
static hosting; the public platform-login link still opens `/coming-soon/`.
No private administration functionality is presented as working without a backend.

For a future Node-capable host, use `npm run build:server` followed by
`npm run start`. The optional Node contact endpoint uses `.env.example` settings;
it does not read the PHP configuration. The existing Node admin uses
`config/database.config.json` and process-memory sessions.

## Content and design

- `components/home-page.tsx` and `components/hero-signals.tsx`: main narrative
  and a pinned, scroll-linked time-series hero with no raster background.
  Scrolling advances the observation window, reveals a deviation and connects
  related signals. Reduced motion and short viewports use a complete still view.
  The landing navigation stays transparent throughout the pinned hero and gains
  its background once the hero releases.
- `components/intelligence-demo.tsx`: scroll-driven agent story and scroll-driven
  forecasting/reconstruction/representation diagrams. `agent-figures.tsx`
  supplies distinct Observe, Reason, Act and Remember illustrations.
- `components/platform-page.tsx`: platform and autonomy boundaries.
- `components/background-assignments.tsx`: four scroll-linked ongoing assignments
  that illustrate the agent working while the workspace is closed: hierarchy
  discovery, channel metadata, correlations and forecasting preparation.
- `components/agent-page.tsx`: platform, background and terminal experiences;
  four interactive modes, the separate Background mode and model providers.
- `components/technology-page.tsx` and `components/architecture-diagram.tsx`:
  six-layer scroll-linked architecture; manual tabs and a complete diagram on
  smaller screens and when reduced motion is requested.
- `components/cases-page.tsx` and `lib/cases-content.ts`: bilingual case grid and
  statically generated details. DESY is explicitly alpha, with planned DAQ;
  100M+ is a project planning scale, not measured throughput. The second card
  links to Early Access; only the DESY case has a detail page.
- `components/documentation-page.tsx`: current commands, setup, background policy,
  local storage and an example of the actual component API. Sidebar highlighting
  follows the section at the reading position without changing the URL.
- `app/experience.css`: shared public design, responsive layout, reduced motion.
- `app/expanded-experience.css`: architecture, cases, agent modes and hero motion.
- `components/scroll-scenes.tsx` and `app/scroll-experience.css`: shared native
  sticky sequences, shared underline progress rows, cumulative card reveals and
  sticky copy beside scrolling items. Panels fall back to a complete vertical
  flow on small/short screens, with reduced motion, or if a scene does not fit.
  Science, background stories and Agent modes advance by scrolling, not clicks.
  Figure paths draw and flow markers follow the same per-stage scroll progress;
  scientific charts progressively reveal traces and feature-space observations.
  Background scenes use a compact layout to stay pinned on laptop viewports.
  Sticky split progress runs from zero at the pin start to one at release.
  Card sequences show their numbers and titles only in the shared progress row;
  System responsibilities use the same cumulative reveal.
  On mobile, progress rows become a rounded floating bottom bar with a 75%
  translucent background and blur; only the current section's bar is visible.
- `app/platform-polish.css`: full-width legal footers, theme icon group, mobile
  progress bars and the ongoing-assignment scene.
- `app/globals.css`: existing legal/administration styling and shared base styles.
- `components/site-logo.tsx`: plain-text `Anomx.` on desktop and `X.` on mobile,
  with solid primary-blue letters and an orange period. No image or SVG wordmark.
- `public/media/platform-intelligence.webp`: generated platform artwork.
- `components/xfel-system-map.tsx` and `app/xfel-map.css`: a native vector map
  inspired by the XFEL beamline and DESY campus. Paths draw and data markers
  move with scrolling; theme colors apply instantly. Reduced motion shows the
  complete still sketch. The card and detail page use the same component.
- `public/media/xfel-system-map.png`: static social preview from the same geometry.
  Regenerate it with `node scripts/render-xfel-poster.mjs` after artwork changes.
  The earlier generated tunnel images are retained as unused historical assets.
- `public/images/desy-logo-white.png`: official DESY logo, adapted to the theme.
- Existing favicon and touch-icon files remain unchanged; the generated icon
  concept in `docs/assets/` is deferred and is not part of the public build.

English and German copy are maintained together. Language and light/dark
preferences persist locally. Motion respects `prefers-reduced-motion`; the
scroll stories become readable vertical sequences on small screens. Content
remains visible without JavaScript. No animation library or remote fonts added.

## Release notes

Before public deployment, complete the existing legal notice and privacy policy
with the actual publisher/address and hosting/email processing details. The
repository originally contained placeholders; these facts cannot be inferred
from the product code. Confirm the applicable legal text with the publisher.

Validate desktop/mobile navigation, scroll stages, architecture controls
(including arrow keys), both languages, both themes, command copying, and form
validation/fallback. The local preview uses port 3100 in this task.

See `docs/media.md`, `docs/feedback-media.md`, `docs/brand-refresh.md` and
`docs/xfel-minimal-media.md` (previous images), and `docs/xfel-system-map.md` for
generated-asset provenance and prompts.
