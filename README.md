<a id="top"></a>

# Stark Lin Portfolio

[中文](README.zh-CN.md) · [Documentation](docs/README.md) · [Live site](https://stark-lin.github.io/) · [License](LICENSE)

> **Design authority:** Product and implementation work must follow the [Generative Personal Homepage Design Specification](docs/GENERATIVE_PORTFOLIO_DESIGN_SPEC.md). Agent instructions enter through [AGENTS.md](AGENTS.md). If existing documentation or implementation conflicts with the specification, the specification takes precedence.

> **Implementation status:** Rooms 01–04 are implemented as independent HTML, CSS, and JavaScript sets. Rooms 05–42 remain unimplemented, so the repository does not yet satisfy the 42-room completeness requirement. See the [room documentation status](docs/rooms/README.md).

A bilingual, build-free personal portfolio written in vanilla HTML, CSS, and JavaScript. Each visit receives a seed. A dedicated seeded random stream selects one of the implemented rooms, while independent streams select the palette, copy, archive-section DOM order, project order, descriptions, and room-safe layout parameters. The Exhibition Note is fixed after the shuffled archive and before Contact. Share the URL to reproduce the same version.

### Highlights

- **Seeded room selection** — The seed selects Rooms 01–04 with equal deterministic mapping; the selector does not rotate rooms or suppress repeat outcomes.
- **Independent room implementations** — Purism, Constructivism, Suprematism, and De Stijl each own their HTML skeleton, CSS composition, and JavaScript renderer.
- **Native Chinese and English content** — English enters through `index.html`, Chinese through `zh.html`, and room URLs preserve the seed while switching locale.
- **Decoupled generation** — Palette, content copy, archive order, project order, descriptions, and room layout use isolated seeded streams; the Exhibition Note remains fixed at the archive's end.
- **Shareable state** — Each room exposes its seed and a copyable URL; browser back and forward remain valid after regeneration.
- **Responsive and accessible** — Includes semantic fixed/middle/fixed structure, active navigation, project disclosure buttons, keyboard focus, mobile translations, and reduced-motion support.
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
| `seed` | Any string | Seed for room and page generation. If omitted, a code prefixed with `SL-` is created. |
| `lang` | `en`, `zh` | Locale used inside an individual room URL. |
| `entry` | `1` | Internal first-entry marker used to show the one-session Roll Again introduction. Copied URLs omit it. |

Examples:

```text
http://localhost:8080/index.html?seed=SL-DEMO
http://localhost:8080/zh.html?seed=SL-DEMO
```

As long as the pools and generation algorithm remain unchanged, the same `seed` resolves to the same room and configuration. Both locales share the seed and structural pipeline while selecting localized copy. Direct room URLs are canonicalized to the room selected by the seed.

### Project structure

```text
.
├── index.html              # English entry point
├── zh.html                 # Chinese entry point
├── assets/
│   ├── app.js              # Seeded room router for the two root entries
│   ├── room-base.css       # Neutral tokens and shared accessibility foundations
│   └── data/
│       ├── en.js           # English content and UI copy
│       └── zh.js           # Chinese content and UI copy
├── core/
│   └── room-runtime.js     # Seed streams, URL state, shared content model, and interactions
├── rooms/
│   ├── 01-purism/          # 01-purism.html / .css / .js
│   ├── 02-constructivism/  # 02-constructivism.html / .css / .js
│   ├── 03-suprematism/     # 03-suprematism.html / .css / .js
│   └── 04-de-stijl/        # 04-de-stijl.html / .css / .js
├── docs/
│   ├── README.md             # Documentation map
│   ├── GENERATIVE_PORTFOLIO_DESIGN_SPEC.md
│   │                         # Authoritative specification index
│   ├── spec/                 # Specification chapters 00–28
│   └── rooms/                # Per-room specifications and status
├── tests/
│   └── rooms.test.js        # Determinism and structural acceptance checks
├── AGENTS.md                # Agent entry point and specification precedence
├── LICENSE                 # AGPL-3.0-only
├── README.zh-CN.md          # Chinese project guide
└── README.md                # English project guide
```

Both root entries use `assets/app.js` only as a seeded room router. Inside a room, `core/room-runtime.js` loads the selected locale, builds the shared content model, and hands it to that room's independent renderer.

### How it works

1. The root entry reads `seed`; when absent, it creates one with `crypto.getRandomValues()`.
2. The `room` stream maps the seed to one of the implemented rooms. Repeat rooms are valid outcomes.
3. Independent derived streams choose the palette, Hero copy, archive DOM order, project order, descriptions, skills, and room-safe variants; the Exhibition Note is then appended to the archive.
4. The active room renders Hero, every seeded middle section, Contact, and Roll Again through its own HTML/CSS/JavaScript composition.
5. **Generate another version** creates a new seed and navigates to its selected room; **Copy this version** copies a clean reproducible URL.

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

Shared palettes are finite token objects in `COLOR_SCHEMES` inside `core/room-runtime.js`:

```js
{
  bg: "#F5F5F5",
  surface: "#FFFFFF",
  surface2: "#E7E7E7",
  text: "#202020",
  muted: "#6B6B6B",
  accent: "#315EFB",
  accent2: "#D95F59",
  line: "#202020"
}
```

The runtime maps these values to neutral CSS tokens. Room files define color relationships only and must not hard-code their own palette.

#### Edit visual variants

Room-safe layout, decoration, and motion pools live in each room's JavaScript file. Their structural translation, responsive behavior, and reduced-motion behavior live in the matching CSS file. Changing a pool changes existing seed mappings, so treat generation pools as a versioned public interface.

### Validation and testing

The repository includes a zero-dependency structural test. Before committing, run:

```bash
node --check assets/app.js
node --check core/room-runtime.js
node --check assets/data/en.js
node --check assets/data/zh.js
node tests/rooms.test.js
python3 -m http.server 8080
```

Then verify at desktop and mobile widths:

- Both locale entry points load without console errors.
- Language switching preserves `seed` and room selection.
- The same `seed` reproduces the room, DOM order, project order, copy, and safe room variants.
- Copied links, first-view onboarding, project disclosures, and Roll Again work.
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

The site uses CSS custom properties, `color-mix()`, `crypto.getRandomValues()`, `URL`/`URLSearchParams`, `IntersectionObserver`, `requestAnimationFrame`, and the Clipboard API. A recent version of Chrome, Edge, Firefox, or Safari is recommended.

### Contributing

Fixes and improvements are welcome through issues or pull requests. Keep both locales synchronized, preserve the build-free deployment path, keep random streams seed-derived, and maintain each room's independent file set.

### License

Copyright © 2026 Stark Lin. This project is licensed under the [GNU Affero General Public License v3.0 only](LICENSE) (`AGPL-3.0-only`).

[阅读中文说明 →](README.zh-CN.md) · [Back to top](#top)
