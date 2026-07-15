<a id="top"></a>

# Stark Lin Portfolio

[English](README.md) · [文档中心](docs/README.md) · [在线网站](https://stark-lin.github.io/) · [许可证](LICENSE)

> **设计依据：** 产品与实现工作必须遵循[《生成式个人主页通用设计规范》](docs/GENERATIVE_PORTFOLIO_DESIGN_SPEC.md)，agent 从 [AGENTS.md](AGENTS.md) 进入。若现有文档或实现与规范冲突，以规范为准。

> **实现状态：** 下文描述的可运行网站是早期生成式作品集原型，尚未实现规范要求的 42 个独立展厅及其逐展厅文件。README 只记录当前运行方式，不能作为偏离权威规范的例外。详见[展厅文档状态](docs/rooms/README.md)。

这是一个零构建依赖、由原生 HTML、CSS 和 JavaScript 实现的双语个人作品集。每次访问都会获得一个参考代码，并据此确定性地组合页面文案、项目顺序、配色、背景、卡片表面、形状与排版特征。你可以随时生成新版本，也可以分享原链接以复现同一页面。

### 功能亮点

- **可复现的生成式页面** — 参考代码通过带种子的伪随机数生成器映射到完整页面配置；相同的 `id` 会生成相同版本。
- **原生中英文内容** — 英文入口为 `index.html`，中文入口为 `zh.html`；切换语言时会保留查询参数和当前页内锚点。
- **克制的视觉系统** — 当前包含 16 套单强调色配色、16 种平面图案背景、8 种实体表面和 8 种克制的形状变体。
- **动态文案与布局** — 标题、简介、项目描述、标签、章节顺序、技能顺序和视觉特征都会根据参考代码组合。
- **精简与完整两种阅读方式** — 默认页面突出关键信息，也可展开完整项目记录与实现说明。
- **可分享的页面状态** — 每个页面都会显示参考代码、组合稀有度和可分享链接。
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

只要内容池和生成算法没有改变，相同 `id` 就会得到相同组合。中英文页面共用参考代码和生成流程，因此会对应到相同的结构与视觉配置，同时分别选择本地化文案。

### 项目结构

```text
.
├── index.html              # 英文入口
├── zh.html                 # 中文入口
├── assets/
│   ├── app.js              # 生成、渲染、交互与无障碍逻辑
│   ├── styles.css          # 基础样式和全部视觉变体
│   └── data/
│       ├── en.js           # 英文内容和界面文案
│       ├── zh.js           # 中文内容和界面文案
│       └── palettes.js     # 主题 ID 和数据驱动配色
├── docs/
│   ├── README.md           # 文档导航
│   ├── GENERATIVE_PORTFOLIO_DESIGN_SPEC.md
│   │                       # 权威规范总索引
│   ├── spec/               # 规范第 00–28 章分册
│   └── rooms/              # 展厅规范与状态
├── AGENTS.md               # Agent 入口与规范优先级
├── LICENSE                 # AGPL-3.0-only
├── README.md               # 英文项目说明
└── README.zh-CN.md         # 中文项目说明
```

两个 HTML 入口按以下顺序加载脚本：配色数据 → 当前语言数据 → 共享应用逻辑。`app.js` 读取 `window.PORTFOLIO_LOCALE`，生成配置后再构建页面 DOM，因此入口 HTML 本身保持精简。

### 工作原理

1. 页面读取 `id`；如果不存在，则使用 `crypto.getRandomValues()` 创建参考代码。
2. `cyrb128` 将代码哈希为四个 32 位种子，`sfc32` 再生成确定性的随机序列。
3. 生成器从视觉、布局和文案池中选择内容，并对项目、章节和技能进行排序。
4. 样式基因被合并为 CSS 自定义属性，主题类负责背景、表面和形状变体。
5. 共享渲染器根据当前语言数据创建导航、作品、经历、教育、原则、技能、联系方式和完整项目记录。
6. **再生成一个版本**会创建新 `id`；**复制 URL** 会生成不含首次引导的 `surface` 链接。

### 自定义内容

#### 修改个人资料和项目

同时修改 `assets/data/en.js` 和 `assets/data/zh.js`。两份文件使用相同的数据结构，主要区域包括：

- `data.identity` — 姓名、教育、邮箱和 GitHub
- `data.projects` — 项目标题、技术栈、链接、简介、实现要点和标签
- `data.experienceProject` — 项目经历
- `data.heroKickers`、`data.heroHeadlines`、`data.heroSubheads` — 首屏文案池
- `data.principles`、`data.educationBodies`、`data.contactCopies` — 其他内容池
- `descriptions` — 各项目可随机选择的补充描述
- `ui` — 导航、控件、标签、技能和稀有度文案

新增项目时，应在两种语言的 `data.projects` 中使用相同的项目 `id` 和项目顺序，并为该 `id` 补充对应的 `descriptions`。请保持两份语言文件的字段、项目 ID 和视觉池同步；纯文案池可以根据语言需要使用不同数量的候选内容。

#### 修改配色

最直接的方式是在 `assets/data/palettes.js` 的 `window.PORTFOLIO_PALETTES` 中添加对象：

```js
{
  id: "my-palette",
  bg: "#F5F5F5",
  surface: "#FFFFFF",
  text: "#202020",
  muted: "#6B6B6B",
  accent: "#315EFB",
  accent2: "#D95F59",
  border: "#DADADA"
}
```

这些颜色会由应用映射到 CSS 变量。若要添加传统 CSS 主题，还需要将 ID 加入 `window.PORTFOLIO_CSS_PALETTE_IDS`，并在 `assets/styles.css` 中定义对应的 `body.theme-<id>`。

#### 修改视觉变体

背景、表面和形状名称位于两份语言数据文件的 `backgroundStyles`、`surfaceStyles` 和 `shapeStyles` 中，对应实现位于 `assets/styles.css`。每个生成池都必须保持非空且长度为 2 的幂；应用启动时会验证配色、背景、表面、形状、样式基因和布局池。当前视觉池长度为 16 套配色、16 种背景、8 种表面和 8 种形状。

排版、密度、边框、按钮等可组合特征定义在 `assets/app.js` 的 `STYLE_GENES` 中，阴影已在全局禁用。修改生成池会改变既有 `id` 的映射结果，因此如果需要长期保留分享链接的视觉结果，应把这些生成池视为需要版本管理的公开接口。

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
- 相同 `id` 可以复现同一页面，重新生成会创建新 `id`。
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

欢迎通过 Issue 或 Pull Request 提交修复和改进。请保持中英文内容同步、保留无构建部署方式，并在扩展视觉池时维持长度为 2 的幂。

### 许可证

版权所有 © 2026 Stark Lin。本项目以 [GNU Affero General Public License v3.0 only](LICENSE)（`AGPL-3.0-only`）发布。

[English](README.md) · [返回顶部](#top)
