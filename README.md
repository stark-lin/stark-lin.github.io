<a id="top"></a>

# Stark Lin Portfolio

[中文](README.zh-CN.md) · [Documentation](docs/README.md) · [Live site](https://stark-lin.github.io/) · [License](LICENSE)

> **Design authority:** Product and implementation work must follow the [Generative Personal Homepage Design Specification](docs/GENERATIVE_PORTFOLIO_DESIGN_SPEC.md). Agent instructions enter through [AGENTS.md](AGENTS.md). If existing documentation or implementation conflicts with the specification, the specification takes precedence.

> **Implementation status:** The runnable site described below is an earlier generated-portfolio prototype. It does not yet implement the required 42 independent rooms or their per-room files. This README records the current runtime only and is not an exception to the authoritative specification. See the [room documentation status](docs/rooms/README.md).

A bilingual, build-free personal portfolio written in vanilla HTML, CSS, and JavaScript. Each visit receives a reference code that deterministically composes the copy, project order, palette, background, surface, shape, and typography traits. Generate a new version when you want one; share the original URL to reproduce the same view.

### Highlights

- **Reproducible generated views** — A seeded pseudo-random generator maps each reference code to a complete page configuration; the same `id` produces the same version.
- **Native Chinese and English content** — English lives at `index.html`, Chinese at `zh.html`, and the language switch preserves query parameters and the current hash.
- **Curated visual system** — The current pools contain 16 single-accent palettes, 16 flat patterned backgrounds, 8 solid surface treatments, and 8 restrained shape variants.
- **Generated copy and layout** — Headlines, summaries, project descriptions, tags, section order, skill order, and visual traits are composed from the reference code.
- **Compact and complete reading modes** — The default view keeps the signal compact, while the full-record view exposes complete project and implementation notes.
- **Shareable state** — Each view exposes its reference code, combination rarity, and a shareable URL.
- **Responsive and accessible** — Includes active navigation, visible keyboard focus, semantic sections, Chinese title segmentation, mobile layouts, and reduced-motion support.
- **Static deployment** — No framework, package manager, or build artifact is required; the site can be hosted on GitHub Pages or any static file server.

### Quick start

#### Requirements

- Git, only when cloning the repository
- Python 3 or another local static-file server
- A modern browser with current Web API and CSS support

#### Run locally

```bash
git clone https://github.com/stark-lin/stark-lin.github.io.git
cd stark-lin.github.io
python3 -m http.server 8080
```

Then open:

- English: <http://localhost:8080/index.html>
- Chinese: <http://localhost:8080/zh.html>

There is no install or build step. Preview through HTTP instead of opening the HTML files directly so URL, clipboard, and browser security-context behavior more closely matches production.

### URL state and reproduction

View state is stored in query parameters and can be used directly for testing or sharing.

| Parameter | Values | Description |
| --- | --- | --- |
| `id` | Any string | Seed for page generation. If omitted, a 32-character code prefixed with `SL-` is created. |
| `label` | `guide`, `surface` | `guide` keeps the first-view onboarding; `surface` is the clean presentation link. |
| `complete` | `1` | Opens the full project record immediately. |

Examples:

```text
http://localhost:8080/index.html?id=SL-DEMO&label=surface
http://localhost:8080/zh.html?id=SL-DEMO&label=surface&complete=1
```

As long as the content pools and generation algorithm remain unchanged, the same `id` resolves to the same combination. Both locales share the reference code and generation pipeline, so they correspond to the same structural and visual configuration while selecting their own localized copy.

### Project structure

```text
.
├── index.html              # English entry point
├── zh.html                 # Chinese entry point
├── assets/
│   ├── app.js              # Generation, rendering, interaction, and accessibility
│   ├── styles.css          # Base styles and all visual variants
│   └── data/
│       ├── en.js           # English content and UI copy
│       ├── zh.js           # Chinese content and UI copy
│       └── palettes.js     # Theme IDs and data-driven palettes
├── docs/
│   ├── README.md             # Documentation map
│   ├── GENERATIVE_PORTFOLIO_DESIGN_SPEC.md
│   │                         # Authoritative specification index
│   ├── spec/                 # Specification chapters 00–28
│   └── rooms/                # Per-room specifications and status
├── AGENTS.md                # Agent entry point and specification precedence
├── LICENSE                 # AGPL-3.0-only
├── README.zh-CN.md          # Chinese project guide
└── README.md                # English project guide
```

Both HTML entry points load scripts in this order: palette data → active locale data → shared application logic. `app.js` reads `window.PORTFOLIO_LOCALE`, generates a configuration, and then builds the DOM, keeping the entry documents intentionally thin.

### How it works

1. The page reads `id`; when absent, it creates a reference code with `crypto.getRandomValues()`.
2. `cyrb128` hashes the code into four 32-bit seeds, and `sfc32` provides a deterministic random sequence.
3. The generator selects from visual, layout, and copy pools and orders projects, sections, and skills.
4. Style genes are merged into CSS custom properties, while theme classes provide background, surface, and shape variants.
5. The shared renderer creates navigation, work, experience, education, principles, skills, contact, and full records from the active locale data.
6. **Show another version** creates a new `id`; **Copy URL** creates an onboarding-free `surface` link.

### Customizing content

#### Edit profile and projects

Edit both `assets/data/en.js` and `assets/data/zh.js`. The files share the same schema, whose main areas include:

- `data.identity` — Name, education, email, and GitHub
- `data.projects` — Project titles, stacks, links, introductions, implementation notes, and tags
- `data.experienceProject` — Project experience
- `data.heroKickers`, `data.heroHeadlines`, `data.heroSubheads` — Hero copy pools
- `data.principles`, `data.educationBodies`, `data.contactCopies` — Supporting copy pools
- `descriptions` — Additional generated descriptions by project
- `ui` — Navigation, controls, labels, skills, and rarity copy

When adding a project, use the same project `id` and project order in both locales and add the matching `descriptions` entry. Keep fields, project IDs, and visual pools synchronized; copy-only pools may contain different numbers of candidates when a locale needs them.

#### Edit palettes

The simplest approach is to add an object to `window.PORTFOLIO_PALETTES` in `assets/data/palettes.js`:

```js
{
  id: "my-palette",
  bg: "#F5F5F5",
  surface: "#FFFFFF",
  text: "#202020",
  muted: "#6B6B6B",
  accent: "#315EFB",
  accent2: "#315EFB",
  border: "#DADADA"
}
```

These colors are mapped to CSS variables by the application. To add a traditional CSS theme, also register its ID in `window.PORTFOLIO_CSS_PALETTE_IDS` and define the matching `body.theme-<id>` in `assets/styles.css`.

#### Edit visual variants

Background, surface, and shape names live in `backgroundStyles`, `surfaceStyles`, and `shapeStyles` in both locale files, with their implementations in `assets/styles.css`. Each generated pool must remain non-empty and have a power-of-two length; the application validates palettes, backgrounds, surfaces, shapes, style genes, and layout pools at startup. The current visual lengths are 16 palettes, 16 backgrounds, 8 surfaces, and 8 shapes.

Composable typography, density, border, button, and related traits are defined in `STYLE_GENES` in `assets/app.js`. Shadows are globally disabled. Changing a generation pool changes the mapping of existing IDs, so treat those pools as a versioned public interface if long-lived shared views must remain visually stable.

### Validation and testing

The project currently has no separate test framework. Before committing, run at least these checks:

```bash
node --check assets/app.js
node --check assets/data/en.js
node --check assets/data/zh.js
node --check assets/data/palettes.js
python3 -m http.server 8080
```

Then verify at desktop and mobile widths:

- Both locale entry points load without console errors.
- Language switching preserves `id`, `label`, `complete`, and hash state.
- The same `id` reproduces a view, and rerolling creates a new one.
- Copied links, first-view onboarding, and full records work.
- Project links, email, navigation, and keyboard focus work.
- Unnecessary motion is removed under reduced-motion preferences.

### Deployment

#### GitHub Pages

This repository follows the `<username>.github.io` convention and can be deployed directly as a user site:

1. Push the files to the repository's default branch.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select the default branch and `/ (root)`.
4. After publishing, visit <https://stark-lin.github.io/>.

#### Other static hosts

Publish the repository root directly and leave the build command empty. Preserve the relative paths of `index.html`, `zh.html`, `assets/`, and `LICENSE`; no SPA fallback rule is required.

### Browser capabilities

The site uses CSS custom properties, `color-mix()`, `crypto.getRandomValues()`, `URL`/`URLSearchParams`, `IntersectionObserver`, `requestAnimationFrame`, and the Clipboard API, plus `Intl.Segmenter` when available for Chinese title wrapping. A recent version of Chrome, Edge, Firefox, or Safari is recommended.

### Contributing

Fixes and improvements are welcome through issues or pull requests. Keep both locales synchronized, preserve the build-free deployment path, and maintain power-of-two lengths when extending visual pools.

### License

Copyright © 2026 Stark Lin. This project is licensed under the [GNU Affero General Public License v3.0 only](LICENSE) (`AGPL-3.0-only`).

[阅读中文说明 →](README.zh-CN.md) · [Back to top](#top)
