<a id="top"></a>

# Molybdenum

> A deterministic, reproducible portfolio presented through 42 visual languages.<br>
> 一个以 42 种视觉语言呈现、可确定性复现的个人作品集。

[English](#english) · [中文](#中文) · [Filter specification](docs/42-filters.md) · [滤镜规范](docs/42-filters-zh.md) · [Production site](https://stark-lin.github.io/) · [License](LICENSE)

<a id="english"></a>

## English

Molybdenum is a bilingual static portfolio implemented in vanilla HTML, CSS, and JavaScript, with no build step or runtime dependencies. Rather than presenting one fixed page, the project implements the portfolio as a deterministic visual system. Each generated view is identified by a reference code that controls the content composition and selects exactly one style from the [42-filter catalog of art, design, and visual culture](docs/42-filters.md).

The reference code is the stable identifier for a generated view. Reusing the same `id` restores the same content configuration and visual filter; **Roll Again** creates a new identifier and generates another view. Filters may change typography, color, surfaces, decoration, and motion tone, but they do not rewrite copy, alter the information architecture, or replace interaction logic. Generated views therefore remain reproducible, shareable, inspectable, and testable.

### Project overview

| Item | Description |
| --- | --- |
| Project type | Deterministic bilingual personal portfolio |
| Languages | English and Simplified Chinese |
| Technology | Vanilla HTML, CSS, and JavaScript |
| Visual systems | 42 modulo-indexed filters in five historical acts |
| State model | Deterministic, shareable, URL-based reference codes |
| Tooling | No runtime dependencies, package manager, or build step |
| Hosting | GitHub Pages or any static file host |

### Core capabilities

- **One reproducible filter per view** — A valid hexadecimal seed maps directly to style index `seed mod 42`; a non-HEX reference falls back to a deterministic hash, so the same `id` still produces the same filter.
- **Native Chinese and English content** — English lives at `index.html`, Chinese at `zh.html`, and the language switch preserves query parameters and the current hash.
- **All 42 historical visual languages implemented** — Five catalog folders now cover the complete sequence from Futurism through Post-Internet Art.
- **Deterministic content composition** — Headlines, summaries, project descriptions, tags, section order, and skill order are selected according to the reference-code rules.
- **Independent copy and style mapping** — Copy uses its own versioned random stream, while style uses only `seed mod 42`, so adding copy draw steps cannot remap the selected filter.
- **Filter separation** — Filters do not rewrite copy, reorder content, change the information structure, or alter interaction logic.
- **Compact and complete reading modes** — The default view keeps the signal compact, while the full-record view exposes complete project and implementation notes.
- **Room Control** — The active style introduction and **Roll Again** appear together at the end of the page, serving as the exhibition label and the entry point to the next view.
- **Shareable state** — Each view exposes its reference code, active filter, and a shareable URL.
- **Responsive and accessible** — Includes active navigation, visible keyboard focus, semantic sections, Chinese title segmentation, mobile layouts, and reduced-motion support.
- **Static deployment** — No framework, package manager, or build artifact is required; the site can be hosted on GitHub Pages or any static file server.

### Local development

#### Requirements

- Git, only when cloning the repository
- Python 3 or another local static-file server
- Node.js, only when running static checks and automated tests
- A modern browser with current Web API and CSS support

#### Start the development server

```bash
git clone https://github.com/stark-lin/stark-lin.github.io.git
cd stark-lin.github.io
python3 -m http.server 8080
```

Then open:

- English: <http://localhost:8080/index.html>
- Chinese: <http://localhost:8080/zh.html>

No installation or build step is required. Use an HTTP server instead of opening the HTML files directly so that URL handling, clipboard access, and browser security-context behavior match production more closely.

### URL parameters and reproducibility

View state is stored in query parameters and can be used directly for testing or sharing.

| Parameter | Values | Description |
| --- | --- | --- |
| `id` | At least one character; `SL-` is optional | Seed for page generation. HEX payloads (`0-9`, `A-F`, case-insensitive) use direct modulo; other strings use the hash fallback. If omitted, the page creates `SL-` plus 42 HEX characters. |
| `label` | `guide`, `surface` | `guide` keeps the first-view onboarding; `surface` is the clean presentation link. |
| `complete` | `1` | Opens the full project record immediately. |

Examples:

```text
http://localhost:8080/index.html?id=SL-A&label=surface
http://localhost:8080/zh.html?id=SL-DEMO&label=surface&complete=1
```

As long as each pool, its version, and its generation algorithm remain unchanged, the same `id` resolves to the same portfolio configuration and filter. Copy uses a named random stream. For style, one or more HEX characters are decoded directly and mapped to registry index `seed mod 42`; any non-HEX reference is hashed first and then reduced modulo 42 for backward compatibility. Changing how many random values the copy generator consumes therefore cannot shift the selected style. Both locales share the reference code, so they correspond to the same structural and visual configuration while selecting localized copy.

### Project structure

```text
.
├── index.html              # English entry point
├── zh.html                 # Chinese entry point
├── assets/
│   ├── app.js              # Generation, rendering, interaction, and accessibility
│   ├── selection.js        # Deterministic, namespaced pool selection engine
│   ├── styles.css          # Shared layout and component foundations
│   └── data/
│       ├── en.js           # English content and UI copy
│       ├── zh.js           # Chinese content and UI copy
│       └── styles.js       # Registry of implemented selectable styles
├── styles/
│   ├── act-1-avant-garde-modern-order/
│   │   └── 00–11 HTML/JS/CSS theme trios
│   ├── act-2-postwar-abstraction-perception-popular-culture/
│   │   └── 12–22 HTML/JS/CSS theme trios
│   ├── act-3-material-concept-radical-design/
│   │   └── 23–30 HTML/JS/CSS theme trios
│   ├── act-4-postmodernism-plural-surfaces/
│   │   └── 31–36 HTML/JS/CSS theme trios
│   └── act-5-computers-web-future-visual-culture/
│       └── 37–41 HTML/JS/CSS theme trios
├── docs/
│   ├── 42-filters.md       # English specification for the 42-filter exhibition
│   └── 42-filters-zh.md    # Chinese specification for the 42-filter exhibition
├── tests/
│   ├── selection.test.js   # Determinism and pool-isolation tests
│   └── styles.test.js      # Theme trio, registry, and entry-point tests
├── LICENSE                 # AGPL-3.0-only
└── README.md
```

Both HTML entry points load scripts in this order: selection engine → style registry → ordered theme files → active locale data → shared application logic. `app.js` reads `window.PORTFOLIO_LOCALE`, derives the copy stream and direct style index from the current reference code, and then builds the DOM, keeping the entry documents intentionally thin.

### Architecture

1. The page reads `id`; when absent, it creates a reference code with `crypto.getRandomValues()`.
2. The selection engine combines that code with the copy pool name and version before `cyrb128` and `sfc32` create a deterministic random stream.
3. The `copy/v1` stream selects copy, project slices, tags, section order, and skill order exclusively from the copy and layout pools.
4. The style selector decodes a case-insensitive HEX seed of at least one character and selects registry index `seed mod 42`; non-HEX references use a deterministic 128-bit hash fallback.
5. The selected filter supplies one complete visual system for typography, boundaries, surfaces, patterns, decoration, and motion tone; it does not affect copy generation or renderer behavior.
6. **Roll Again** creates a new 42-character seed, recomposes the copy, and applies its modulo-selected style; **Copy URL** creates an onboarding-free `surface` link.

### Configuration and extension

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

Keep all 42 filters in a single ordered registry with one stable modulo index each. Every filter must have its own matching HTML, JavaScript, and CSS files, using one shared filename stem prefixed by a continuous, zero-padded two-digit index from `00` through `41`. The file order follows the catalog order (`01`–`42`), so Futurism starts with `00-futurism.html`, `00-futurism.js`, and `00-futurism.css`. Theme-specific code must remain in that theme's file trio; shared foundations do not replace any of these required files. A filter may adapt responsively or honor reduced-motion preferences, but it must not change copy, content order, structure, or behavior. Changing the registry order changes how existing reference codes map to filters and file indexes, so treat that order as a versioned public interface.

### Validation and testing

The project uses the Node.js built-in test runner and does not require a separate test framework. Before committing, run at least the following checks:

```bash
node --check assets/app.js
node --check assets/selection.js
node --check assets/data/en.js
node --check assets/data/zh.js
node --check assets/data/styles.js
node --test tests/*.test.js
python3 -m http.server 8080
```

Then verify at desktop and mobile widths:

- Both locale entry points load without console errors.
- Language switching preserves `id`, `label`, `complete`, and hash state.
- The same `id` reproduces the same portfolio configuration and filter in both languages, and rerolling selects from the same implemented registry.
- Consuming additional values or adding internal draw steps in the copy stream does not change the direct `seed mod 42` style mapping.
- Exactly one filter is active, and its style introduction appears with **Roll Again** in the final Room Control.
- Applying a filter does not rewrite copy, reorder content, change the information structure, or alter interaction behavior.
- Every implemented filter has a complete HTML/JavaScript/CSS file trio, the three basenames match, and every prefix matches its catalog position without duplicates.
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

### Browser compatibility

The site uses CSS custom properties, `color-mix()`, `crypto.getRandomValues()`, `URL`/`URLSearchParams`, `IntersectionObserver`, `requestAnimationFrame`, and the Clipboard API, plus `Intl.Segmenter` when available for Chinese title wrapping. A recent version of Chrome, Edge, Firefox, or Safari is recommended.

### Contributing

Fixes and improvements are welcome through issues or pull requests. Keep both locales synchronized, preserve the build-free deployment path, and keep the 42-filter registry ordered, complete, and aligned with modulo indexes `0`–`41`.

### License

Copyright © 2026 Stark Lin. This project is licensed under the [GNU Affero General Public License v3.0 only](LICENSE) (`AGPL-3.0-only`).

[阅读中文翻译 →](#中文) · [Back to top](#top)

---

<a id="中文"></a>

## 中文

Molybdenum 是一个使用原生 HTML、CSS 和 JavaScript 实现的双语静态个人作品集，无需构建步骤或运行时依赖。项目并非只呈现一个固定页面，而是将作品集实现为一套确定性、可复现的视觉系统。每个生成视图均由参考代码标识；该代码用于控制内容组合，并从[《42 种艺术、设计与视觉文化滤镜》](docs/42-filters-zh.md)中选择且只选择一种样式。

参考代码是生成视图的稳定标识。再次使用相同的 `id` 即可恢复相同的内容配置与视觉滤镜；点击 **Roll Again** 会创建新的标识并生成另一个视图。滤镜可以改变字体、颜色、表面、装饰与动效语气，但不会重写文案、改变信息架构或替换交互逻辑。因此，每个生成视图都可以被准确复现、分享、检查和测试。

### 项目概览

| 项目 | 说明 |
| --- | --- |
| 项目类型 | 确定性双语个人作品集 |
| 支持语言 | 英文、简体中文 |
| 技术栈 | 原生 HTML、CSS、JavaScript |
| 视觉系统 | 分为五个历史章节的 42 种等权重滤镜 |
| 状态模型 | 基于 URL 参考代码、可确定性复现与分享 |
| 工具依赖 | 无运行时依赖、无包管理器、无构建步骤 |
| 部署方式 | GitHub Pages 或任意静态文件托管服务 |

### 核心能力

- **每次一种、可复现的滤镜** — 合法 HEX seed 直接通过 `seed mod 42` 映射到样式索引；非 HEX 参考码回退到确定性 hash，因此相同的 `id` 仍始终得到同一种滤镜。
- **原生中英文内容** — 英文入口为 `index.html`，中文入口为 `zh.html`；切换语言时会保留查询参数和当前页内锚点。
- **42 种历史视觉语言已全部实现** — 五个样式文件夹现已完整覆盖从未来主义到后互联网艺术的连续序列。
- **确定性内容组合** — 标题、简介、项目描述、标签、章节顺序和技能顺序均按照参考代码规则完成选择。
- **文案与样式独立映射** — 文案使用独立且带版本的随机流，样式只使用 `seed mod 42`，因此增加文案抽选步骤不会重新映射滤镜。
- **滤镜与内容分离** — 滤镜不会重写文案、调整内容顺序、改变信息结构或修改交互逻辑。
- **精简与完整两种阅读方式** — 默认页面突出关键信息，也可展开完整项目记录与实现说明。
- **Room Control** — 当前风格介绍与 **Roll Again** 共同位于页面末尾，分别承担展签说明与生成下一视图的入口功能。
- **可分享的页面状态** — 每个页面都会显示参考代码、当前滤镜和可分享链接。
- **响应式与无障碍设计** — 包含活动导航、清晰的键盘焦点、语义化区块、中文标题分词、移动端布局和减少动态效果支持。
- **纯静态部署** — 无需框架、包管理器或构建产物，可直接托管到 GitHub Pages 或任意静态文件服务器。

### 本地开发

#### 环境要求

- Git，仅在克隆仓库时需要
- Python 3，或其他本地静态文件服务器
- Node.js，仅在执行静态检查和自动化测试时需要
- 支持现代 Web API 和 CSS 的浏览器

#### 启动开发服务器

```bash
git clone https://github.com/stark-lin/stark-lin.github.io.git
cd stark-lin.github.io
python3 -m http.server 8080
```

然后打开：

- 英文：<http://localhost:8080/index.html>
- 中文：<http://localhost:8080/zh.html>

项目无需安装依赖或执行构建。应通过 HTTP 服务器预览，而不是直接打开 HTML 文件，以确保 URL 处理、剪贴板访问和浏览器安全上下文等行为与正式部署更为一致。

### URL 参数与页面复现

页面状态保存在查询参数中，可直接用于测试或分享。

| 参数 | 可选值 | 说明 |
| --- | --- | --- |
| `id` | 至少一个字符；`SL-` 可选 | 生成页面的 seed。HEX 内容（`0-9`、`A-F`，不区分大小写）直接取模，其他字符串使用 hash 回退；未提供时会创建 `SL-` 加 42 个 HEX 字符。 |
| `label` | `guide`、`surface` | `guide` 保留首次访问引导；`surface` 是不含引导的纯展示链接。 |
| `complete` | `1` | 直接打开完整项目记录。 |

示例：

```text
http://localhost:8080/index.html?id=SL-A&label=surface
http://localhost:8080/zh.html?id=SL-DEMO&label=surface&complete=1
```

只要各个抽选池、对应版本和生成算法没有改变，相同 `id` 就会得到相同的作品集配置与滤镜。文案使用命名随机流。样式接受至少一位、不区分大小写的 HEX seed，直接选择 `seed mod 42` 对应的注册表索引；非 HEX 参考码会先做 hash，再取模 42，以兼容旧链接。因此文案生成器增加或减少随机数消耗不会改变选中的样式。中英文页面共用参考代码，因此会对应到相同的结构与视觉配置，同时分别选择本地化文案。

### 项目结构

```text
.
├── index.html              # 英文入口
├── zh.html                 # 中文入口
├── assets/
│   ├── app.js              # 生成、渲染、交互与无障碍逻辑
│   ├── selection.js        # 确定性、带命名空间的抽选引擎
│   ├── styles.css          # 共享布局与组件基础样式
│   └── data/
│       ├── en.js           # 英文内容和界面文案
│       ├── zh.js           # 中文内容和界面文案
│       └── styles.js       # 已实现且可抽选的样式注册表
├── styles/
│   ├── act-1-avant-garde-modern-order/
│   │   └── 00–11 同名 HTML/JS/CSS 主题文件组
│   ├── act-2-postwar-abstraction-perception-popular-culture/
│   │   └── 12–22 同名 HTML/JS/CSS 主题文件组
│   ├── act-3-material-concept-radical-design/
│   │   └── 23–30 同名 HTML/JS/CSS 主题文件组
│   ├── act-4-postmodernism-plural-surfaces/
│   │   └── 31–36 同名 HTML/JS/CSS 主题文件组
│   └── act-5-computers-web-future-visual-culture/
│       └── 37–41 同名 HTML/JS/CSS 主题文件组
├── docs/
│   ├── 42-filters.md       # 42 种滤镜连续展览英文规格
│   └── 42-filters-zh.md    # 42 种滤镜连续展览中文规格
├── tests/
│   ├── selection.test.js   # 确定性与抽选池隔离测试
│   └── styles.test.js      # 主题文件组、注册表与入口引用测试
├── LICENSE                 # AGPL-3.0-only
└── README.md
```

两个 HTML 入口按以下顺序加载脚本：抽选引擎 → 样式注册表 → 有序主题文件 → 当前语言数据 → 共享应用逻辑。`app.js` 读取 `window.PORTFOLIO_LOCALE`，根据当前参考代码派生文案流并直接计算样式索引后再构建页面 DOM，因此入口 HTML 本身保持精简。

### 系统架构

1. 页面读取 `id`；如果不存在，则使用 `crypto.getRandomValues()` 创建参考代码。
2. 抽选引擎先把参考代码与文案池名称、版本组合，再由 `cyrb128` 和 `sfc32` 生成确定性的随机流。
3. `copy/v1` 随机流只从文案池和布局池中选择文案、项目切片、标签、章节顺序与技能顺序。
4. 样式选择器接受至少一位、不区分大小写的 HEX seed，直接选择注册表中 `seed mod 42` 对应的一项；非 HEX 参考码使用确定性的 128 位 hash 回退。
5. 被选中的滤镜作为一个整体决定字体、边界、表面、图案、装饰和动效语气，但不会影响文案生成或渲染行为。
6. **Roll Again** 会创建新的 42 字符 seed、重新组合文案并应用取模选中的样式；**复制 URL** 会生成不含首次引导的 `surface` 链接。

### 配置与扩展

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

请把 42 种滤镜保存在一个有序注册表中，并让每项稳定对应一个取模索引。每个滤镜都必须分别拥有一组相互对应的 HTML、JavaScript 和 CSS 独立文件；同组文件使用完全相同的文件名主体，并以从 `00` 到 `41` 连续递增、补零后的两位数编号开头。文件顺序与下方 `01`–`42` 的目录顺序一致，因此未来主义从 `00-futurism.html`、`00-futurism.js` 和 `00-futurism.css` 开始。主题专属代码必须保留在该主题的三个文件中，共用基础代码不能替代这些必需文件。滤镜可以响应不同视口或遵循“减少动态效果”偏好，但不能改变文案、内容顺序、结构或行为。修改注册表顺序会改变既有参考代码对应的滤镜和文件编号，因此应把该顺序视为需要版本管理的公开接口。

### 验证与测试

项目使用 Node.js 内置测试运行器，无需额外测试框架。提交前至少应执行以下检查：

```bash
node --check assets/app.js
node --check assets/selection.js
node --check assets/data/en.js
node --check assets/data/zh.js
node --check assets/data/styles.js
node --test tests/*.test.js
python3 -m http.server 8080
```

然后在桌面端和移动端视口检查：

- 英文和中文入口均可加载，控制台没有错误。
- 语言切换会保留 `id`、`label`、`complete` 和页内锚点状态。
- 相同 `id` 在两种语言中会复现相同的作品集配置和滤镜，重新生成时仍从同一份已实现注册表中选择。
- 文案流新增抽选步骤或额外消耗随机数不会改变 `seed mod 42` 的直接样式映射。
- 页面一次只启用一种滤镜，其风格介绍与 **Roll Again** 位于最后的 Room Control 中。
- 应用滤镜不会重写文案、调整内容顺序、改变信息结构或修改交互行为。
- 每个已实现滤镜都具备完整的 HTML／JavaScript／CSS 文件组，同组文件名主体一致，且每个编号前缀都与目录中的主题位置一致、没有重复。
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

### 浏览器兼容性

页面使用 CSS 自定义属性、`color-mix()`、`crypto.getRandomValues()`、`URL`/`URLSearchParams`、`IntersectionObserver`、`requestAnimationFrame` 和剪贴板 API，并在可用时使用 `Intl.Segmenter` 优化中文标题换行。建议使用近期版本的 Chrome、Edge、Firefox 或 Safari。

### 贡献

欢迎通过 Issue 或 Pull Request 提交修复和改进。请保持中英文内容同步、保留无构建部署方式，并让 42 项滤镜注册表保持顺序稳定、内容完整且与 `0`–`41` 的取模索引一致。

### 许可证

版权所有 © 2026 Stark Lin。本项目以 [GNU Affero General Public License v3.0 only](LICENSE)（`AGPL-3.0-only`）发布。

[Back to English](#english) · [返回顶部](#top)
