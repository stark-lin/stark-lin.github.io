<a id="top"></a>

# Stark Lin Portfolio

[English](README.md) · [文档中心](docs/README.md) · [在线网站](https://stark-lin.github.io/) · [许可证](LICENSE)

> **设计依据：** 产品与实现工作必须遵循[《生成式个人主页通用设计规范》](docs/GENERATIVE_PORTFOLIO_DESIGN_SPEC.md)，agent 从 [AGENTS.md](AGENTS.md) 进入。若现有文档或实现与规范冲突，以规范为准。

> **实现状态：** Room 01–04 已分别实现独立的 HTML、CSS 和 JavaScript 文件；Room 05–42 尚未实现，因此仓库仍未通过 42 个展厅完整性要求。详见[展厅文档状态](docs/rooms/README.md)。

这是一个零构建依赖、由原生 HTML、CSS 和 JavaScript 实现的双语个人作品集。每次访问都会获得一个 seed：独立随机流据此选择一个已实现展厅，并分别决定配色、文案、档案区 DOM 顺序、项目顺序、描述和展厅安全布局参数。展厅说明固定在随机档案之后、Contact 之前。分享 URL 后可以复现同一版本。

### 功能亮点

- **Seeded 展厅选择** — seed 在 Room 01–04 中进行等概率确定性映射；选择器不轮换展厅，也不屏蔽连续重复结果。
- **独立展厅实现** — 纯粹主义、构成主义、至上主义和风格派各自拥有 HTML 骨架、CSS 构图和 JavaScript 渲染器。
- **原生中英文内容** — 英文从 `index.html` 进入，中文从 `zh.html` 进入；展厅内切换语言时保留 seed。
- **解耦生成** — 配色、内容文案、档案顺序、项目顺序、描述和展厅布局使用彼此隔离的 seeded 随机流；展厅说明固定在档案末尾。
- **可分享的页面状态** — 每个展厅显示 seed 并可复制 URL；重新生成后浏览器前进和后退仍然有效。
- **响应式与无障碍设计** — 包含语义化固定/随机/固定结构、活动导航、项目展开按钮、键盘焦点、移动端转译和减少动态效果支持。
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
| `seed` | 任意字符串 | 展厅与页面生成种子；未提供时会创建一个以 `SL-` 开头的代码。 |
| `lang` | `en`、`zh` | 独立展厅 URL 中使用的语言。 |
| `entry` | `1` | 内部首次进入标记，用于每会话只显示一次 Roll Again 提示；复制链接时会移除。 |

示例：

```text
http://localhost:8080/index.html?seed=SL-DEMO
http://localhost:8080/zh.html?seed=SL-DEMO
```

只要内容池和生成算法没有改变，相同 `seed` 就会得到相同展厅和配置。中英文共用 seed 和结构生成流程，同时分别选择本地化文案。直接访问展厅 URL 时也会校验并跳转到 seed 选中的规范展厅。

### 项目结构

```text
.
├── index.html              # 英文入口
├── zh.html                 # 中文入口
├── assets/
│   ├── app.js              # 两个根入口共用的 seeded 展厅路由器
│   ├── room-base.css       # 中性令牌与共享无障碍基础样式
│   └── data/
│       ├── en.js           # 英文内容和界面文案
│       └── zh.js           # 中文内容和界面文案
├── core/
│   └── room-runtime.js     # seed 流、URL 状态、共享内容模型和交互
├── rooms/
│   ├── 01-purism/          # 01-purism.html / .css / .js
│   ├── 02-constructivism/  # 02-constructivism.html / .css / .js
│   ├── 03-suprematism/     # 03-suprematism.html / .css / .js
│   └── 04-de-stijl/        # 04-de-stijl.html / .css / .js
├── docs/
│   ├── README.md           # 文档导航
│   ├── GENERATIVE_PORTFOLIO_DESIGN_SPEC.md
│   │                       # 权威规范总索引
│   ├── spec/               # 规范第 00–28 章分册
│   └── rooms/              # 展厅规范与状态
├── tests/
│   └── rooms.test.js       # 确定性与结构验收检查
├── AGENTS.md               # Agent 入口与规范优先级
├── LICENSE                 # AGPL-3.0-only
├── README.md               # 英文项目说明
└── README.zh-CN.md         # 中文项目说明
```

两个根 HTML 入口只用 `assets/app.js` 完成 seeded 展厅路由。进入展厅后，`core/room-runtime.js` 加载当前语言、建立共享内容模型，再交给该展厅的独立渲染器。

### 工作原理

1. 根入口读取 `seed`；若不存在，则使用 `crypto.getRandomValues()` 创建 seed。
2. `room` 随机流把 seed 映射到一个已实现展厅；抽到连续重复展厅也是合法结果。
3. 独立派生流分别选择配色、Hero 文案、档案 DOM 顺序、项目顺序、描述、技能和展厅安全变体，随后把展厅说明追加在档案末尾。
4. 当前展厅使用自己的 HTML/CSS/JavaScript 构图，渲染 Hero、全部随机中段、Contact 和 Roll Again。
5. **生成另一个版本**会创建新 seed 并进入其选中的展厅；**复制当前版本**会复制干净的可复现 URL。

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

共享配色是 `core/room-runtime.js` 中 `COLOR_SCHEMES` 的有限令牌对象：

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

运行时把这些值映射到中性 CSS 令牌。展厅文件只定义颜色关系，不能写死自己的配色。

#### 修改视觉变体

各展厅的安全布局、装饰和动效池位于其独立 JavaScript 文件中；结构转译、响应式和 Reduced Motion 规则位于同名 CSS 文件中。修改池会改变既有 seed 的映射，因此生成池应被视为需要版本管理的公开接口。

### 验证与测试

仓库包含零依赖结构测试。提交前运行：

```bash
node --check assets/app.js
node --check core/room-runtime.js
node --check assets/data/en.js
node --check assets/data/zh.js
node tests/rooms.test.js
python3 -m http.server 8080
```

然后在桌面端和移动端视口检查：

- 英文和中文入口均可加载，控制台没有错误。
- 语言切换会保留 `seed` 与展厅选择。
- 相同 `seed` 会复现展厅、DOM 顺序、项目顺序、文案和安全展厅变体。
- 复制链接、首次访问引导、项目展开和 Roll Again 均可使用。
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

页面使用 CSS 自定义属性、`color-mix()`、`crypto.getRandomValues()`、`URL`/`URLSearchParams`、`IntersectionObserver`、`requestAnimationFrame` 和剪贴板 API。建议使用近期版本的 Chrome、Edge、Firefox 或 Safari。

### 贡献

欢迎通过 Issue 或 Pull Request 提交修复和改进。请保持中英文内容同步、保留无构建部署方式、确保所有随机流由 seed 派生，并维护每个展厅的独立文件集合。

### 许可证

版权所有 © 2026 Stark Lin。本项目以 [GNU Affero General Public License v3.0 only](LICENSE)（`AGPL-3.0-only`）发布。

[English](README.md) · [返回顶部](#top)
