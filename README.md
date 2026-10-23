# Anomx website

The public Anomx website, built with Next.js 16 and React 19. The home and platform
pages focus on background agents and system intelligence. System explains
the architecture, and Cases presents the DESY alpha work alongside an invitation to collaborate.
Documentation at `/documentation/` has three sections: the existing CLI Agent guide,
the generated Python Package reference, and System guides (coming soon).

## Development

```sh
npm ci
npm run dev
```

## Python API documentation

The package reference lives at `/documentation/package/`. Each public module has
its own static page, with exports, typed signatures, constructor parameters,
docstrings, class members, inherited-member links, and source links pinned to the
package Git revision. Source docstrings remain in English; the documentation shell
and introductory guides follow the website language. Agent internals, private
modules, and the platform implementation are excluded. Third-party re-exports
are identified as external APIs; their signatures are not invented.

`npm run dev`, `npm run build`, and `npm run build:server` regenerate the reference
from the sibling `../anomx-package` checkout. **Python 3.11+ is required**; no Python
package installation or optional ML dependencies are needed. The generator parses
source with the standard library AST and never imports or executes package code.

```sh
npm run docs:generate
npm run docs:check
npm run test:docs
# Use a different source checkout:
ANOMX_PACKAGE_SOURCE=/path/to/anomx-package npm run build
```

Commit `lib/generated/package-docs.json` after updating the package. This snapshot
lets a website-only checkout build reproducibly when the sibling repo is absent;
the build explicitly reports that it is using the snapshot. An explicitly configured
missing source is an error. `docs:check` requires source and fails for stale output.
For release CI, check out the desired package revision, set `ANOMX_PACKAGE_SOURCE`,
run generation, and commit/check the resulting snapshot before building. No Git
clone, package download, or network fetch happens implicitly.

The generated metadata includes the package version, source digest, and Git
revision. Source links assume the documented code has been committed to that
revision; rebuild from the committed package revision when preparing a release.
New public modules in `base`, `config`, `data`, `detection`, `execution`,
`integrations`, `metrics`, and `models` are discovered automatically. Add new
public package domains to `DOMAINS` in the generator and the navigation groups.
Supported exports include explicit `__all__`, `_EXPORTS`, `_LAZY_IMPORTS`, relative
imports, aliases, and the optional Darts catalog. Unknown dynamic `__all__`
expressions fail generation so API documentation cannot silently disappear.
Missing docstrings leave signatures available; improving the Python docstrings
improves the next generated website build. Native members, properties, dataclass
fields, and locally resolved inheritance are documented; external base-class
members require the upstream library's documentation.

System documentation is intentionally a coming-soon page, ready for future
how-to guides and video walkthroughs. The preview is decorative, not a player.

## Production deployment: ALL-INKL static hosting

`npm run build` exports all public pages and packages the complete deployable
website in **`build/`**. Apache serves HTML, CSS, JavaScript and images directly.
Animations, scientific tabs, language switching and navigation remain interactive.
No Node.js process is needed on the web server. The contact form uses PHP 8.1+
with PHPMailer over authenticated SMTP.

Install Node.js 20.9+, Python 3.11+, PHP and Composer on your development machine, then run:

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

The deployment command defaults to `ssh-w0130bf4@w0130bf4.kasserver.com`, with the
repository at `/www/htdocs/w0130bf4/anomx.io`. SSH prompts for your password.
Use this ALL-INKL account hostname; `www.theorieken.de` points to a different
server that does not offer password login.
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
- `components/documentation-page.tsx`: CLI setup, commands, background policy,
  and local storage. Existing `/documentation/#…` links remain valid.
- `components/docs/` and `app/documentation/`: the shared product switcher,
  searchable Python reference, and System video-guide placeholder.
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
