<a id="top"></a>

# Stark Lin Portfolio

[English](#english) · [中文](#中文) · [42 filters](docs/42-filters.md) · [42 种滤镜](docs/42-filters-zh.md) · [Live site](https://stark-lin.github.io/) · [License](LICENSE)

<a id="english"></a>

## English

A bilingual, build-free personal portfolio written in vanilla HTML, CSS, and JavaScript. Each visit receives a reference code that deterministically composes the portfolio view and selects exactly one of [42 filters of art, design, and visual culture](docs/42-filters.md). The selected filter changes only the visual language, never the copy, content structure, or interaction logic. Generate another version when you want one, or share the original URL to reproduce the same view.

### Highlights

- **One reproducible filter per view** — A seeded selector maps each reference code to exactly one of 42 equal-probability filters; the same `id` produces the same filter.
- **Native Chinese and English content** — English lives at `index.html`, Chinese at `zh.html`, and the language switch preserves query parameters and the current hash.
- **42 historical visual languages** — The exhibition spans avant-garde movements, postwar abstraction, radical design, postmodern surfaces, and digital visual culture.
- **Generated copy and layout** — Headlines, summaries, project descriptions, tags, section order, and skill order continue to follow the existing reference-code rules.
- **Filter separation** — Filters do not rewrite copy, reorder content, change the information structure, or alter interaction logic.
- **Compact and complete reading modes** — The default view keeps the signal compact, while the full-record view exposes complete project and implementation notes.
- **Room Control** — The active style introduction and **Roll Again** sit together at the end of the page as the exhibition label and entrance to the next room.
- **Shareable state** — Each view exposes its reference code, active filter, and a shareable URL.
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

As long as the content pools, 42-filter registry, and generation algorithm remain unchanged, the same `id` resolves to the same portfolio configuration and filter. Both locales share the reference code, so they correspond to the same structural and visual configuration while selecting localized copy.

### Project structure

```text
.
├── index.html              # English entry point
├── zh.html                 # Chinese entry point
├── assets/
│   ├── app.js              # Generation, rendering, interaction, and accessibility
│   ├── styles.css          # Base styles and the 42 filter implementations
│   └── data/
│       ├── en.js           # English content and UI copy
│       ├── zh.js           # Chinese content and UI copy
│       └── palettes.js     # Shared color definitions used by filters
├── docs/
│   ├── 42-filters.md       # English specification for the 42-filter exhibition
│   └── 42-filters-zh.md    # Chinese specification for the 42-filter exhibition
├── LICENSE                 # AGPL-3.0-only
└── README.md
```

Both HTML entry points load scripts in this order: shared color data → active locale data → shared application logic. `app.js` reads `window.PORTFOLIO_LOCALE`, selects the filter for the current reference code, and then builds the DOM, keeping the entry documents intentionally thin.

### How it works

1. The page reads `id`; when absent, it creates a reference code with `crypto.getRandomValues()`.
2. `cyrb128` hashes the code into four 32-bit seeds, and `sfc32` provides a deterministic random sequence.
3. The existing generator selects copy and layout while preserving the established portfolio rules.
4. The filter selector maps the seed to exactly one of the 42 filters, with every filter receiving equal probability.
5. The selected filter supplies one complete visual system for typography, boundaries, surfaces, patterns, decoration, and motion tone; these traits are not randomized separately and do not affect the renderer's content or behavior.
6. **Roll Again** creates a new `id` and selects another filter; **Copy URL** creates an onboarding-free `surface` link.

### Customizing content

#### Edit profile and projects

Edit both `assets/data/en.js` and `assets/data/zh.js`. The files share the same schema, whose main areas include:

- `data.identity` — Name, education, email, and GitHub
- `data.projects` — Project titles, stacks, links, introductions, implementation notes, and tags
- `data.experienceProject` — Project experience
- `data.heroKickers`, `data.heroHeadlines`, `data.heroSubheads` — Hero copy
- `data.principles`, `data.educationBodies`, `data.contactCopies` — Supporting copy
- `descriptions` — Project descriptions
- `ui` — Navigation, controls, labels, skills, and filter copy

When adding a project, use the same project `id` and project order in both locales and add the matching `descriptions` entry. Keep fields and project IDs synchronized so every filter presents the same underlying portfolio.

#### Edit the 42 filters

The complete filter list and the design boundary for each item live in [docs/42-filters.md](docs/42-filters.md). Each filter is an atomic visual system rather than a collection of independently randomized traits.

Keep all 42 filters in a single ordered registry and give them equal selection weight. Every filter must have its own matching HTML, JavaScript, and CSS files, using one shared filename stem prefixed by a continuous, zero-padded two-digit index from `00` through `41`. The file order follows the catalog order (`01`–`42`), so Futurism starts with `00-futurism.html`, `00-futurism.js`, and `00-futurism.css`. Theme-specific code must remain in that theme's file trio; shared foundations do not replace any of these required files. A filter may adapt responsively or honor reduced-motion preferences, but it must not change copy, content order, structure, or behavior. Changing the registry order changes how existing reference codes map to filters and file indexes, so treat that order as a versioned public interface.

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
- The same `id` reproduces the same portfolio configuration and filter in both languages, and rerolling selects from the same 42-item registry.
- Exactly one filter is active, and its style introduction appears with **Roll Again** in the final Room Control.
- Applying a filter does not rewrite copy, reorder content, change the information structure, or alter interaction behavior.
- Every filter has a complete HTML/JavaScript/CSS file trio, the three basenames match, and their prefixes form the continuous range `00`–`41` without duplicates.
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

Fixes and improvements are welcome through issues or pull requests. Keep both locales synchronized, preserve the build-free deployment path, and keep the 42-filter registry ordered, complete, and equally weighted.

### License

Copyright © 2026 Stark Lin. This project is licensed under the [GNU Affero General Public License v3.0 only](LICENSE) (`AGPL-3.0-only`).

[阅读中文翻译 →](#中文) · [Back to top](#top)

---

<a id="中文"></a>

## 中文翻译

这是一个零构建依赖、由原生 HTML、CSS 和 JavaScript 实现的双语个人作品集。每次访问都会获得一个参考代码，并据此确定性地生成作品集视图，同时从[《42 种艺术、设计与视觉文化滤镜》](docs/42-filters-zh.md)中选择且只选择一种。被选中的滤镜只改变视觉语言，不修改文案、内容结构或交互逻辑。你可以随时生成另一个版本，也可以分享原链接以复现同一页面。

### 功能亮点

- **每次一种、可复现的滤镜** — 参考代码通过带种子的选择器映射到 42 种等概率滤镜中的一项；相同的 `id` 始终得到同一种滤镜。
- **原生中英文内容** — 英文入口为 `index.html`，中文入口为 `zh.html`；切换语言时会保留查询参数和当前页内锚点。
- **42 种历史视觉语言** — 展览覆盖先锋派、战后抽象、激进设计、后现代多元表面和数字视觉文化。
- **动态文案与布局** — 标题、简介、项目描述、标签、章节顺序和技能顺序继续遵循现有的参考代码规则。
- **滤镜与内容分离** — 滤镜不会重写文案、调整内容顺序、改变信息结构或修改交互逻辑。
- **精简与完整两种阅读方式** — 默认页面突出关键信息，也可展开完整项目记录与实现说明。
- **Room Control** — 当前风格介绍与 **Roll Again** 共同位于页面最后，作为本展厅的展签和下一展厅入口。
- **可分享的页面状态** — 每个页面都会显示参考代码、当前滤镜和可分享链接。
- **响应式与无障碍设计** — 包含活动导航、清晰的键盘焦点、语义化区块、中文标题分词、移动端布局和减少动态效果支持。
- **纯静态部署** — 无需框架、包管理器或构建产物，可直接托管到 GitHub Pages 或任意静态文件服务器。

### 快速开始

#### 环境要求

- Git，仅在克隆仓库时需要
- Python 3，或其他本地静态文件服务器
- 支持现代 Web API 和 CSS 的浏览器

#### 本地运行

```bash
git clone https://github.com/stark-lin/stark-lin.github.io.git
cd stark-lin.github.io
python3 -m http.server 8080
```

然后打开：

- 英文：<http://localhost:8080/index.html>
- 中文：<http://localhost:8080/zh.html>

项目没有安装或构建步骤。建议通过 HTTP 服务器预览，而不是直接打开 HTML 文件，这样 URL、剪贴板和浏览器安全上下文相关行为会更接近正式部署。

### URL 状态与页面复现

页面状态保存在查询参数中，可直接用于测试或分享。

| 参数 | 可选值 | 说明 |
| --- | --- | --- |
| `id` | 任意字符串 | 生成页面的种子；未提供时会创建一个以 `SL-` 开头的 32 位代码。 |
| `label` | `guide`、`surface` | `guide` 保留首次访问引导；`surface` 是不含引导的纯展示链接。 |
| `complete` | `1` | 直接打开完整项目记录。 |

示例：

```text
http://localhost:8080/index.html?id=SL-DEMO&label=surface
http://localhost:8080/zh.html?id=SL-DEMO&label=surface&complete=1
```

只要内容池、42 项滤镜注册表和生成算法没有改变，相同 `id` 就会得到相同的作品集配置与滤镜。中英文页面共用参考代码，因此会对应到相同的结构与视觉配置，同时分别选择本地化文案。

### 项目结构

```text
.
├── index.html              # 英文入口
├── zh.html                 # 中文入口
├── assets/
│   ├── app.js              # 生成、渲染、交互与无障碍逻辑
│   ├── styles.css          # 基础样式和 42 种滤镜实现
│   └── data/
│       ├── en.js           # 英文内容和界面文案
│       ├── zh.js           # 中文内容和界面文案
│       └── palettes.js     # 滤镜共用的颜色定义
├── docs/
│   ├── 42-filters.md       # 42 种滤镜连续展览英文规格
│   └── 42-filters-zh.md    # 42 种滤镜连续展览中文规格
├── LICENSE                 # AGPL-3.0-only
└── README.md
```

两个 HTML 入口按以下顺序加载脚本：共用颜色数据 → 当前语言数据 → 共享应用逻辑。`app.js` 读取 `window.PORTFOLIO_LOCALE`，根据当前参考代码选择滤镜后再构建页面 DOM，因此入口 HTML 本身保持精简。

### 工作原理

1. 页面读取 `id`；如果不存在，则使用 `crypto.getRandomValues()` 创建参考代码。
2. `cyrb128` 将代码哈希为四个 32 位种子，`sfc32` 再生成确定性的随机序列。
3. 现有生成器继续按照既定主页规则选择文案和布局。
4. 滤镜选择器把种子映射到 42 种滤镜中的一项，每一种获得相同的出现概率。
5. 被选中的滤镜作为一个整体决定字体、边界、表面、图案、装饰和动效语气；这些特征不再分别随机组合，也不影响渲染器的内容或行为。
6. **Roll Again** 会创建新 `id` 并重新选择滤镜；**复制 URL** 会生成不含首次引导的 `surface` 链接。

### 自定义内容

#### 修改个人资料和项目

同时修改 `assets/data/en.js` 和 `assets/data/zh.js`。两份文件使用相同的数据结构，主要区域包括：

- `data.identity` — 姓名、教育、邮箱和 GitHub
- `data.projects` — 项目标题、技术栈、链接、简介、实现要点和标签
- `data.experienceProject` — 项目经历
- `data.heroKickers`、`data.heroHeadlines`、`data.heroSubheads` — 首屏文案
- `data.principles`、`data.educationBodies`、`data.contactCopies` — 其他文案
- `descriptions` — 项目描述
- `ui` — 导航、控件、标签、技能和滤镜文案

新增项目时，应在两种语言的 `data.projects` 中使用相同的项目 `id` 和项目顺序，并为该 `id` 补充对应的 `descriptions`。请保持两份语言文件的字段和项目 ID 同步，让每种滤镜都呈现同一份作品集内容。

#### 修改 42 种滤镜

完整滤镜清单及每一项的设计边界位于 [docs/42-filters-zh.md](docs/42-filters-zh.md)。每种滤镜都是一个不可拆分的视觉系统，而不是若干可独立随机的视觉特征。

请把 42 种滤镜保存在一个有序注册表中，并赋予相同选择权重。每个滤镜都必须分别拥有一组相互对应的 HTML、JavaScript 和 CSS 独立文件；同组文件使用完全相同的文件名主体，并以从 `00` 到 `41` 连续递增、补零后的两位数编号开头。文件顺序与下方 `01`–`42` 的目录顺序一致，因此未来主义从 `00-futurism.html`、`00-futurism.js` 和 `00-futurism.css` 开始。主题专属代码必须保留在该主题的三个文件中，共用基础代码不能替代这些必需文件。滤镜可以响应不同视口或遵循“减少动态效果”偏好，但不能改变文案、内容顺序、结构或行为。修改注册表顺序会改变既有参考代码对应的滤镜和文件编号，因此应把该顺序视为需要版本管理的公开接口。

### 验证与测试

项目目前没有独立测试框架。提交前至少建议执行以下检查：

```bash
node --check assets/app.js
node --check assets/data/en.js
node --check assets/data/zh.js
node --check assets/data/palettes.js
python3 -m http.server 8080
```

然后在桌面端和移动端视口检查：

- 英文和中文入口均可加载，控制台没有错误。
- 语言切换会保留 `id`、`label`、`complete` 和页内锚点状态。
- 相同 `id` 在两种语言中会复现相同的作品集配置和滤镜，重新生成时仍从同一份 42 项注册表中选择。
- 页面一次只启用一种滤镜，其风格介绍与 **Roll Again** 位于最后的 Room Control 中。
- 应用滤镜不会重写文案、调整内容顺序、改变信息结构或修改交互行为。
- 每个滤镜都具备完整的 HTML／JavaScript／CSS 文件组，同组文件名主体一致，编号前缀无重复且连续覆盖 `00`–`41`。
- 复制链接、首次访问引导和完整项目记录均可使用。
- 外部项目链接、邮箱链接、导航和键盘焦点均可使用。
- 开启“减少动态效果”后不会出现不必要的动画。

### 部署

#### GitHub Pages

此仓库使用 `<username>.github.io` 命名方式，可以直接作为用户站点部署：

1. 将文件推送到仓库的默认分支。
2. 在 **Settings → Pages** 中选择 **Deploy from a branch**。
3. 选择默认分支和 `/ (root)`。
4. 发布后访问 <https://stark-lin.github.io/>。

#### 其他静态托管

直接将仓库根目录作为发布目录，并将构建命令留空。请保持 `index.html`、`zh.html`、`assets/` 和 `LICENSE` 的相对路径不变；不需要配置 SPA 回退规则。

### 浏览器能力

页面使用 CSS 自定义属性、`color-mix()`、`crypto.getRandomValues()`、`URL`/`URLSearchParams`、`IntersectionObserver`、`requestAnimationFrame` 和剪贴板 API，并在可用时使用 `Intl.Segmenter` 优化中文标题换行。建议使用近期版本的 Chrome、Edge、Firefox 或 Safari。

### 贡献

欢迎通过 Issue 或 Pull Request 提交修复和改进。请保持中英文内容同步、保留无构建部署方式，并让 42 项滤镜注册表保持顺序稳定、内容完整且权重相等。

### 许可证

版权所有 © 2026 Stark Lin。本项目以 [GNU Affero General Public License v3.0 only](LICENSE)（`AGPL-3.0-only`）发布。

[Back to English](#english) · [返回顶部](#top)
