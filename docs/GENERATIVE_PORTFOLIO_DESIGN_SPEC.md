# 生成式个人主页通用设计规范

> 状态：本仓库的权威产品与设计规范。若现有实现、README、注释、历史约定或其他项目文档与本规范冲突，以本规范为准。

## 0. 文档目的

本规范定义整个生成式个人主页的统一结构、随机逻辑、内容边界、视觉系统、交互规则、响应式行为、可访问性与验收标准。

项目由 42 种艺术与设计语言组成。每次访问根据 seed 生成一个可复现的页面版本。

不同版本可以在以下方面发生变化：

* 当前展厅；
* 配色；
* Hero 文案；
* 项目排序；
* 项目描述版本；
* 中间内容顺序；
* section 组合方式；
* 布局参数；
* 装饰参数；
* 动效参数。

但所有版本必须保持：

* 内容真实；
* 页面结构完整；
* 核心信息可访问；
* 联系方式明确；
* 页面可复现；
* 视觉质量稳定；
* 风格之间具有明显差异。

---

# 1. 项目定义

这是一个将同一份个人档案通过 42 种艺术与设计语言重新组织的生成式网页展览。

项目不是：

* 42 套网页模板；
* 42 套主题色；
* 42 种不同人格；
* 42 个独立作品集；
* 完全随机生成的 CSS；
* AI 实时生成页面；
* 普通的作品集换肤系统。

项目是：

> 同一组真实内容，在确定性随机系统控制下，被不同的历史视觉语言、媒介逻辑和交互方式重新组织。

---

# 2. 核心设计原则

## 2.1 内容与风格完全解耦

系统必须明确区分：

~~~text
内容系统：决定说什么
结构系统：决定什么时候出现
展厅系统：决定如何呈现
配色系统：决定颜色关系
随机系统：决定本次选择
~~~

艺术风格不能：

* 重写 Hero 文案；
* 改写项目描述；
* 改变个人事实；
* 为不同风格生成不同人格；
* 为某些风格筛选“更适合”的文案；
* 删除风格不喜欢的内容；
* 虚构风格化的项目结论。

---

## 2.2 随机必须受控

所有随机结果都必须来自有限选项池或安全参数区间。

禁止：

~~~js
fontSize = random(8, 240);
rotation = random(-180, 180);
gap = random(0, 300);
~~~

推荐：

~~~js
fontScale = pick(["compact", "balanced", "display"]);
rotation = pick([0, -6, 6, -12, 12]);
spacingMode = pick(["tight", "regular", "open"]);
~~~

每一个随机值都必须满足：

* 可预测；
* 可测试；
* 有上下限；
* 不破坏布局；
* 不影响核心内容；
* 同一 seed 可复现。

---

## 2.3 风格必须改变结构

每个展厅至少需要显著改变以下项目中的两个：

* 构图逻辑；
* 排版逻辑；
* section 关系；
* 项目组织方式；
* 页面节奏；
* 交互方式；
* 动效方式；
* 信息显现方式。

只改变以下内容不算独立展厅：

* 背景色；
* 字体；
* 圆角；
* 边框；
* 阴影；
* 装饰图形；
* 按钮样式。

---

## 2.4 所有页面必须首先是可用的个人主页

艺术表达不能破坏：

* 姓名识别；
* 项目阅读；
* 教育信息；
* 技术栈；
* 联系方式；
* 页面导航；
* 移动端浏览；
* 键盘访问；
* 内容复制；
* URL 分享。

视觉实验必须发生在可用性边界以内。

---

# 3. 固定页面结构

所有 42 个展厅共享同一语义结构。

~~~text
01. Hero
02. Randomised Personal Archive
03. Contact
04. Roll Again
05. Room Introduction
~~~

完整动线：

~~~text
Hero
↓
随机排列的个人档案
↓
Contact
↓
Roll Again
↓
当前展厅介绍
~~~

固定规则：

* Hero 永远是第一页；
* 中间个人档案允许重排；
* Contact 永远是最后一个个人内容 section；
* Roll Again 永远位于 Contact 之后；
* 展厅介绍永远位于页面最末端；
* 固定部分不得参与随机排序。

---

# 4. 页面语义骨架

~~~html
<body>
  <header class="site-header">
    <nav class="site-navigation">
      <!-- 阅读进度 -->
      <!-- 语言切换 -->
      <!-- 必要快捷入口 -->
    </nav>
  </header>

  <main>
    <section id="hero" class="hero">
      <!-- 姓名 -->
      <!-- 通用 Hero 文案池随机结果 -->
      <!-- 可选次级文案 -->
    </section>

    <div id="archive" class="personal-archive">
      <!-- 随机排序和组合的个人档案 -->
    </div>

    <section id="contact" class="contact">
      <!-- 联系文案 -->
      <!-- Email -->
      <!-- GitHub -->
      <!-- LinkedIn -->
    </section>

    <section id="roll-again" class="roll-again">
      <!-- 新版本生成入口 -->
    </section>

    <section id="room-introduction" class="room-introduction">
      <!-- 展厅名称 -->
      <!-- 时间范围 -->
      <!-- 策展说明 -->
      <!-- Seed -->
      <!-- 分享入口 -->
    </section>
  </main>
</body>
~~~

DOM 顺序必须与语义阅读顺序一致。

禁止通过 CSS order 或绝对定位制造与 DOM 完全不同的阅读顺序。

---

# 5. Hero 规范

## 5.1 Hero 定义

Hero 是页面第一屏。

Hero 只负责：

* 显示姓名；
* 显示一条通用 Hero 文案；
* 可选显示一条次级文案；
* 建立当前展厅的视觉语言；
* 提供继续浏览的暗示。

Hero 不负责：

* 解释 42 个展厅；
* 展示完整艺术史介绍；
* 展示全部项目；
* 解释随机算法；
* 展示长篇个人介绍；
* 暴露全部项目反转。

---

## 5.2 Hero 内容来源

Hero 主文案必须来自统一的全局文案池。

~~~js
const heroHeadlines = [
  "...",
  "...",
  "..."
];
~~~

生成方式：

~~~js
const heroHeadline = seededPick(heroHeadlines);
~~~

规则：

* 每次只展示一条；
* 所有展厅共享同一个池；
* 每条默认等概率；
* 同一 seed 结果一致；
* 当前展厅不得筛选文案；
* 当前展厅不得改写句子；
* 当前展厅不得改变语气。

---

## 5.3 Hero 次级文案

次级文案来自独立全局池。

~~~js
const heroSecondaryLines = [
  "...",
  "...",
  "..."
];
~~~

是否显示次级文案由全局内容参数控制。

~~~js
const showHeroSecondary = seededBoolean(0.75);
~~~

展厅不能单独决定：

* 某种风格永远不显示；
* 某种风格显示专属文案；
* 某种风格自动缩短文案。

---

## 5.4 Hero 布局范围

建议：

~~~css
.hero {
  min-height: 100svh;
}
~~~

允许范围：

~~~text
90svh–140svh
~~~

Hero 必须：

* 形成完整首屏；
* 让姓名与主文案可识别；
* 不同时塞入完整项目；
* 不像普通网站 header；
* 在移动端保持完整；
* 在无动画状态下仍然成立。

---

## 5.5 Hero 换行规则

文案池中不储存风格化换行。

错误：

~~~js
"I build systems\nfor ideas\nthat need structure."
~~~

正确：

~~~js
"I build systems for ideas that need structure."
~~~

换行由布局系统决定。

允许：

* CSS 宽度控制；
* 单词级包装；
* CSS Grid；
* max-width；
* 受控关键词拆分；
* 响应式换行。

必须保证：

* 复制后获得完整原句；
* 屏幕阅读器顺序正确；
* 不删词；
* 不改变标点；
* 不改变原义。

---

## 5.6 Hero 可选元信息

Hero 可低调显示：

* 当前版本号；
* Seed；
* Room 编号；
* Edition；
* 当前语言；
* 阅读进度。

这些信息不能抢过：

* 姓名；
* 主文案；
* 页面入口。

Hero 中默认不完整显示展厅名称和艺术史介绍。

---

# 6. Personal Archive 规范

## 6.1 内容范围

Personal Archive 包含：

* Projects；
* Experience；
* Education；
* Working Stack；
* Current Focus；
* Additional Profile Information。

Hero、Contact、Roll Again 和 Room Introduction 不属于 Archive。

---

## 6.2 随机排序

允许随机排序：

* Projects section；
* Experience；
* Education；
* Working Stack；
* Current Focus；
* Additional Profile。

禁止参与随机：

* Hero；
* Contact；
* Roll Again；
* Room Introduction。

示例：

~~~js
const archiveSections = seededShuffle([
  "projects",
  "experience",
  "education",
  "working-stack",
  "current-focus"
]);
~~~

---

## 6.3 核心内容完整性

随机排序不等于随机删除。

每个版本必须包含：

* 所有核心项目；
* 核心经历；
* 教育背景；
* 技术栈；
* 联系方式。

允许随机隐藏的只能是：

* 可选辅助说明；
* 次级元数据；
* 重复性补充内容；
* 非核心标签；
* 可展开细节。

---

## 6.4 section 组合规则

允许合并：

~~~text
Education + Working Stack
Experience + Current Focus
Project + Related Technologies
Profile + Education
Projects + System Relationships
~~~

合并条件：

* 信息关系明确；
* 当前风格适合；
* 不损害阅读；
* 不降低内容完整性；
* 移动端可拆分；
* 同一 seed 可复现。

禁止：

* 随机把无关模块拼在一起；
* 为了缩短页面而压缩内容；
* 将所有内容放入单个巨型 section；
* 产生语义混乱。

---

## 6.5 项目排序

项目可根据 seed 重排。

规则：

* 每个项目出现一次；
* 不重复；
* 不遗漏；
* 同一 seed 顺序相同；
* 分享 URL 可复现；
* 项目排序不暗示质量排名；
* 第一项目不固定。

---

## 6.6 项目描述池

每个项目可拥有多个真实描述版本。

~~~js
{
  id: "project-id",
  descriptions: {
    architecture: "...",
    product: "...",
    technical: "...",
    concise: "...",
    reflective: "..."
  }
}
~~~

每次只选择一个主描述。

选择逻辑由 seed 控制，不由展厅风格控制。

风格只能改变：

* 描述宽度；
* 描述位置；
* 描述显现方式；
* 与标题关系；
* 展开或折叠行为。

---

# 7. Contact 规范

## 7.1 Contact 定义

Contact 是最后一个个人内容 section。

它不是普通页脚，也不参与随机排序。

页面顺序必须是：

~~~text
Personal Archive
↓
Contact
↓
Roll Again
↓
Room Introduction
~~~

---

## 7.2 Contact 内容

必须包含：

* 联系主文案；
* Email；
* GitHub；
* LinkedIn；
* 必要职业链接。

可选：

* 复制邮箱；
* 当前所在地；
* 简短可用状态；
* 一句结尾说明。

禁止：

* 重新展示全部技术栈；
* 重复所有项目；
* 长篇自我介绍；
* 大量社交图标；
* 联系表单；
* 需要后端的提交系统；
* 风格化谜语。

---

## 7.3 Contact 页面尺度

建议：

~~~text
80svh–120svh
~~~

Contact 应产生明显收束感。

它应当：

* 比 Archive 更安静；
* 更低信息密度；
* 一眼看到联系方式；
* 形成个人主页的视觉终点。

---

## 7.4 联系文案

联系主文案可来自全局文案池。

~~~js
const contactLines = [
  "...",
  "...",
  "..."
];
~~~

规则与 Hero 相同：

* 不按展厅分类；
* 不由风格改写；
* 同一 seed 可复现；
* 不改变语气；
* 不虚构可用状态。

---

## 7.5 链接实现

Email：

~~~html
<a href="mailto:address@example.com">
  address@example.com
</a>
~~~

外部链接：

~~~html
<a
  href="..."
  target="_blank"
  rel="noopener noreferrer"
>
  GitHub
</a>
~~~

必须保证：

* 可点击；
* 可复制；
* focus 状态明显；
* 不通过 JavaScript 阻断默认行为；
* 不隐藏真实地址；
* 不使用图标作为唯一说明。

---

# 8. Roll Again 规范

## 8.1 位置

Roll Again 永远位于 Contact 后面。

它是页面核心反转，而不是普通导航按钮。

用户动线：

~~~text
完成个人主页浏览
↓
发现当前页面只是一个版本
↓
点击 Roll Again
↓
进入另一个展厅
~~~

---

## 8.2 功能

Roll Again 必须同时完成：

* 生成新 seed；
* 选择新展厅；
* 选择新配色；
* 选择新 Hero 文案；
* 重排 Archive；
* 选择项目描述；
* 更新布局参数；
* 更新 URL；
* 返回 Hero；
* 允许浏览器前进后退。

---

## 8.3 文案

必须保留明确功能说明。

推荐结构：

~~~text
ROLL AGAIN
Generate another version
~~~

主标签可风格化，例如：

* Another Room；
* Reassemble；
* Recompose；
* New Configuration；
* Regenerate；
* Resample；
* Rebuild；
* Enter Another Room。

辅助说明必须始终清楚。

---

## 8.4 行为

点击后：

1. 生成新 seed；
2. 更新 URL；
3. 重新生成页面状态；
4. 重置局部交互状态；
5. 将滚动位置移动到顶部；
6. 恢复 Hero 初始展示；
7. 不整页闪白；
8. 不出现长时间加载。

允许使用页面刷新，也允许客户端重新渲染，但结果必须一致。

---

## 8.5 防止重复

新 seed 可以允许偶然重复某些参数，但应尽量避免连续两次得到完全相同的展厅。

推荐：

~~~js
if (nextRoom === currentRoom) {
  nextRoom = pickAnotherRoom();
}
~~~

不要求所有内容都必须变化。

例如新版本可能：

* 展厅不同但 Hero 文案相同；
* 配色不同但项目顺序相同；
* 项目顺序不同但项目描述相同。

这种局部重复是正常的。

---

# 9. Room Introduction 规范

## 9.1 位置

Room Introduction 是页面最后一个 section。

它位于 Roll Again 后面。

---

## 9.2 必须包含

~~~text
Room Number
Chinese Name
English Name
Historical Period
Curatorial Description
Current Seed
~~~

可选：

* 核心规则；
* 参考方向；
* 当前版本参数；
* 分享入口；
* Plain View；
* View Rules。

---

## 9.3 内容结构

示例：

~~~text
ROOM 02 / 42

构成主义
Constructivism

1910s–1930s

This room reorganises the same personal archive through
directional typography, geometric tension and visible structure.

Seed: 8D41A2...
~~~

---

## 9.4 策展说明规则

策展说明应回答：

1. 该语言的核心原则是什么；
2. 当前网页如何进行转译。

建议长度：

* 中文 60–140 字；
* 英文 40–90 词；
* 一至两段。

禁止：

* 完整艺术史论文；
* 复杂理论术语堆积；
* 将页面描述为某位艺术家的复制；
* 虚构历史；
* 使用未经确认的绝对结论；
* 重复个人介绍。

---

# 10. 导航规范

## 10.1 导航内容

全局导航最多包含：

* Entry；
* Archive；
* Contact；
* Again；
* 语言切换。

推荐阶段：

~~~text
01 — ENTRY
02 — ARCHIVE
03 — CONTACT
04 — AGAIN
~~~

中文：

~~~text
01 — 入口
02 — 档案
03 — 联系
04 — 再次生成
~~~

---

## 10.2 导航表现

当前展厅可改变：

* 导航方向；
* 导航位置；
* 下划线；
* 高亮方式；
* 数字标记；
* 线条；
* 模块形式。

不可改变：

* 导航功能；
* 键盘访问；
* 当前状态；
* 点击区域；
* 可读性。

---

## 10.3 导航限制

禁止：

* 超过五个一级入口；
* 每个 section 都放一个导航项；
* 占据大量首屏空间；
* 使用图标代替所有文字；
* 隐藏 Contact；
* 将 Roll Again 放入普通导航后取代尾部入口；
* 移动端使用难以关闭的全屏菜单。

---

# 11. 随机系统规范

## 11.1 随机层级

~~~text
Seed
├── Room
├── Color Scheme
├── Hero Headline
├── Hero Secondary Line
├── Archive Order
├── Project Order
├── Project Description Variants
├── Section Combination
├── Contact Line
├── Layout Variant
├── Decorative Parameters
└── Motion Parameters
~~~

各层级平行，不互相决定内容语气。

---

## 11.2 确定性

同一 seed 必须得到：

* 相同展厅；
* 相同配色；
* 相同 Hero；
* 相同项目顺序；
* 相同 Archive 顺序；
* 相同描述版本；
* 相同布局变体；
* 相同装饰参数。

必须避免在组件中直接调用无 seed 的：

~~~js
Math.random()
~~~

---

## 11.3 随机流隔离

推荐为不同系统派生独立随机流。

~~~js
const roomRng = deriveRng(seed, "room");
const copyRng = deriveRng(seed, "copy");
const layoutRng = deriveRng(seed, "layout");
const colorRng = deriveRng(seed, "color");
const motionRng = deriveRng(seed, "motion");
~~~

这样修改某一个内容池时，不会导致所有随机结果重新洗牌。

---

## 11.4 URL 规则

推荐：

~~~text
/?seed=...
~~~

可选：

~~~text
/?seed=...&lang=en
~~~

分享 URL 后必须：

* 重现当前页面；
* 不触发首次提示；
* 保留当前语言；
* 支持浏览器返回；
* 不依赖本地缓存。

---

# 12. 配色系统规范

## 12.1 颜色与展厅解耦

配色由独立配色池控制。

展厅不写死具体颜色。

使用统一令牌：

~~~css
:root {
  --color-bg: ...;
  --color-surface: ...;
  --color-surface-2: ...;
  --color-text: ...;
  --color-muted: ...;
  --color-accent: ...;
  --color-accent-2: ...;
  --color-line: ...;
}
~~~

---

## 12.2 展厅可规定颜色关系

展厅可以规定：

* 大面积背景；
* 小面积强调；
* 色块占比；
* 是否允许多色并置；
* 是否使用高对比；
* 是否使用单色结构；
* 前景与背景反转方式。

展厅不能：

* 写死“构成主义必须红黑”；
* 写死“Art Deco 必须黑金”；
* 写死“AI Art 必须紫蓝渐变”；
* 绕过配色令牌。

---

## 12.3 对比要求

必须保证：

* 正文对比充分；
* 链接可识别；
* focus 不只依赖颜色；
* 不出现文字与背景过于接近；
* 大色块之间存在清楚边界；
* 低对比只用于装饰元素。

---

# 13. 排版系统规范

## 13.1 字体数量

单个展厅建议最多：

* 两个字体家族；
* 四至六个字号层级；
* 三至五个字重。

特殊排版展厅可以突破，但必须有明确理由。

---

## 13.2 字号

使用响应式字号。

推荐：

~~~css
font-size: clamp(min, preferred, max);
~~~

禁止：

* 移动端巨大标题溢出；
* 正文低于可读尺寸；
* 通过缩小字体解决布局问题；
* 所有标题都占满视口。

---

## 13.3 正文

正文必须：

* 保持合理行宽；
* 保持适当行距；
* 不持续移动；
* 不被图形遮挡；
* 不沿曲线排版；
* 不强制全大写；
* 不被拆成单字阅读。

---

## 13.4 中英文

中英文必须共享：

* 内容层级；
* section 顺序；
* 核心事实；
* 交互逻辑；
* 展厅规则。

允许差异：

* 换行；
* 字号；
* 字距；
* 字体；
* 局部布局调整。

禁止把中文简单压缩成英文布局。

---

# 14. 间距与尺寸规范

## 14.1 基础模数

推荐使用 8px 基础模数。

~~~text
4
8
16
24
32
48
64
96
128
~~~

特殊风格可以使用自己的比例系统，但必须最终映射到受控设计令牌。

---

## 14.2 页面边距

桌面端建议：

~~~text
24px–80px
~~~

移动端建议：

~~~text
16px–24px
~~~

展厅可以改变视觉边距，但必须：

* 保证内容不贴屏幕边缘；
* 不因绝对定位造成裁切；
* 不影响系统安全区域；
* 适配移动端刘海和底部区域。

---

## 14.3 section 高度

Hero：

~~~text
90svh–140svh
~~~

Archive section：

~~~text
60svh–160svh
~~~

Contact：

~~~text
80svh–120svh
~~~

Roll Again：

~~~text
60svh–120svh
~~~

Room Introduction：

~~~text
auto–100svh
~~~

---

# 15. 页面长度规范

建议总长度：

~~~text
4–8 个视口高度
~~~

目标：

* 快速浏览约 30–60 秒；
* 深度阅读可以更长；
* 用户不会因为过长无法抵达 Roll Again；
* 每次版本长度允许变化；
* 不因 section 随机导致极端长度。

推荐主要 section 数：

~~~text
Hero：1
Archive：3–6
Contact：1
Roll Again：1
Room Introduction：1
~~~

总计：

~~~text
7–10 个主要区域
~~~

---

# 16. 响应式规范

## 16.1 移动端不是缩小桌面版

每个展厅必须定义移动端转译。

必须处理：

* 超大标题；
* 横向布局；
* 重叠；
* 多栏；
* 旋转文字；
* 拖动交互；
* hover 状态；
* 固定导航；
* 几何装饰数量。

---

## 16.2 移动端要求

* 不出现意外横向滚动；
* 核心文字不被裁切；
* Contact 链接易点击；
* Roll Again 清晰；
* 固定元素不遮挡内容；
* 触摸目标尺寸充分；
* hover 交互有点击替代；
* 多栏自动重组；
* 装饰复杂度降低；
* 动画性能稳定。

---

## 16.3 横向体验

特殊展厅允许有意识的横向浏览，但必须：

* 有明显提示；
* 支持触摸；
* 支持键盘；
* 保留浏览器返回行为；
* 不锁定垂直滚动；
* 不将横向溢出当设计。

---

# 17. 动效规范

## 17.1 动效存在条件

每个动效必须至少满足一项：

1. 解释当前艺术语言；
2. 帮助理解页面结构；
3. 表现系统状态变化；
4. 强化 Roll Again 的生成行为；
5. 反馈用户操作。

否则删除。

---

## 17.2 动效限制

禁止：

* 频闪；
* 持续抖动；
* 无限制自动滚动；
* 正文持续漂浮；
* 强制开场动画；
* 超长加载动画；
* 滚动劫持；
* 光标尾巴；
* 高频粒子；
* 无法暂停的持续动画；
* 高 CPU Canvas；
* 让用户等待页面完成。

---

## 17.3 动效时长

建议：

~~~text
即时反馈：100–180ms
普通过渡：180–400ms
结构变化：400–800ms
大型 Roll Again 转场：600–1200ms
~~~

避免所有组件使用相同动画。

---

## 17.4 Reduced Motion

必须支持：

~~~css
@media (prefers-reduced-motion: reduce) {
  /* 停止或简化动画 */
}
~~~

减少动态模式：

* 禁用漂浮；
* 禁用视差；
* 禁用故障；
* 禁用自动旋转；
* 禁用复杂转场；
* 保留最终静态构图；
* 不隐藏任何内容。

---

# 18. 交互规范

## 18.1 交互类型

允许：

* 点击；
* hover；
* focus；
* 展开；
* 折叠；
* 拖动；
* 路径选择；
* 参数切换；
* 视图切换；
* Roll Again；
* 复制链接；
* 复制邮箱。

---

## 18.2 交互要求

所有交互必须：

* 有明确反馈；
* 可恢复；
* 不阻断核心信息；
* 有键盘替代；
* 有触摸替代；
* 不依赖精确鼠标操作；
* 不隐藏 Contact；
* 不强迫用户完成任务。

---

## 18.3 禁止交互

禁止：

* 假系统提示；
* 自动打开窗口；
* 大量弹窗；
* 强制小游戏；
* 需要用户寻找隐藏入口；
* 误导性按钮；
* 关闭不了的遮罩；
* 假登录；
* 假验证码；
* 假错误；
* 用户操作后丢失返回路径。

---

# 19. 首次访问提示

## 19.1 触发条件

首次提示只在满足以下条件时触发：

* 用户从主页自然进入；
* URL 不包含分享 seed；
* 当前会话未显示过；
* 用户已经滚动到底部；
* Roll Again 已进入视口。

---

## 19.2 提示内容

推荐：

~~~text
This page is only one version.

Roll again to enter another room.
~~~

中文：

~~~text
这只是其中一个版本。

再次生成，进入另一个展厅。
~~~

---

## 19.3 提示表现

允许：

* 弱化周围区域；
* 高亮 Roll Again；
* 显示一段解释；
* 点击关闭；
* 按 Escape 关闭。

禁止：

* 自动倒计时；
* 自动生成新页面；
* 锁定滚动；
* 强制用户点击；
* 分享链接中重复出现；
* 每次访问都出现。

---

# 20. 可访问性规范

所有展厅必须满足统一最低标准。

## 20.1 语义

* 使用真实 heading；
* 使用真实 link；
* 使用真实 button；
* 保持正确标题层级；
* 装饰元素使用 aria-hidden="true"；
* 不用 div 模拟所有交互；
* DOM 顺序符合阅读顺序。

---

## 20.2 键盘

必须可以通过键盘完成：

* 导航；
* 打开项目；
* 关闭项目；
* 访问 Contact；
* 点击 Roll Again；
* 切换语言；
* 复制或分享；
* 关闭提示。

focus 状态必须清楚。

---

## 20.3 屏幕阅读器

视觉拆字、重复文字或装饰文字必须：

* 保留隐藏但完整的语义文本；
* 避免重复朗读；
* 避免读取纯装饰字符；
* 保持项目标题与描述关联。

---

## 20.4 颜色与状态

状态不能只依赖颜色。

同时使用：

* 文字；
* 边框；
* 位置；
* 图形；
* 下划线；
* aria-current；
* aria-expanded。

---

# 21. 性能规范

## 21.1 基础要求

* 不依赖大型框架；
* 不依赖第三方动画库；
* 不依赖图片素材；
* 首屏快速显示；
* JavaScript 失败时仍有基本内容；
* 不阻塞页面阅读；
* 不使用高耗能持续动画。

---

## 21.2 Canvas 与 SVG

允许使用：

* CSS；
* SVG；
* Canvas。

优先顺序：

~~~text
CSS
↓
SVG
↓
Canvas
~~~

只有在 CSS 或 SVG 无法合理实现时使用 Canvas。

Canvas 必须：

* 响应设备像素比；
* 限制刷新频率；
* 在不可见时停止；
* Reduced Motion 下停止；
* 不承担核心文本。

---

## 21.3 装饰元素数量

每个展厅应定义最大装饰数量。

移动端应减少：

* 几何体；
* 线条；
* 粒子；
* 阴影；
* 动态节点；
* SVG 复杂度。

禁止无限生成 DOM 节点。

---

# 22. 代码结构规范

## 22.1 数据与视图分离

推荐：

~~~text
/data
  hero-copy.js
  contact-copy.js
  projects.js
  experience.js
  education.js
  rooms.js
  color-schemes.js

/core
  seed.js
  rng.js
  generator.js
  state.js
  url.js

/rooms
  purism.js
  constructivism.js
  ...
~~~

---

## 22.2 Room 接口

每个展厅应实现统一接口。

~~~js
{
  id: "constructivism",
  nameZh: "构成主义",
  nameEn: "Constructivism",
  period: "1910s–1930s",

  principles: [],
  requiredFeatures: [],
  forbiddenFeatures: [],

  layoutVariants: [],
  decorativeVariants: [],
  motionVariants: [],

  applyHero(),
  applyArchive(),
  applyContact(),
  applyRollAgain(),
  applyRoomIntroduction()
}
~~~

---

## 22.3 Room 必须覆盖整页

每个展厅必须定义：

* Hero；
* Archive；
* Projects；
* Contact；
* Roll Again；
* Room Introduction；
* Navigation；
* Responsive；
* Reduced Motion。

禁止只设计 Hero，剩余部分使用通用卡片。

---

## 22.4 风格设计规范文件命名

42 个展厅中的每一个风格都必须拥有一份独立的 Markdown 设计规范文件，统一存放在：

~~~text
/docs/rooms
~~~

文件名必须使用以下格式：

~~~text
NN-style-id.md
~~~

其中：

* NN 是与 Room Number 一致的两位数字，范围固定为 01–42；
* style-id 是该风格唯一且稳定的英文标识；
* style-id 必须使用小写英文字母、数字和连字符组成的 kebab-case；
* 数字与风格标识之间必须使用一个连字符；
* 扩展名必须为 .md；
* 文件编号和 Room Number 必须一一对应，不得重复、跳号或临时变更；
* 同一风格的文档、数据和实现必须使用相同的 style-id。

正确示例：

~~~text
docs/rooms/01-purism.md
docs/rooms/02-constructivism.md
docs/rooms/03-de-stijl.md
docs/rooms/42-generative-art.md
~~~

禁止：

~~~text
docs/rooms/purism.md
docs/rooms/1-purism.md
docs/rooms/room-01-purism.md
docs/rooms/02_Constructivism.md
docs/rooms/02-构成主义.md
~~~

每份风格设计规范至少必须定义：

* Room Number、中文名、英文名和历史时期；
* 核心原则；
* 必须特征与禁止特征；
* 与至少两个相邻或易混淆展厅的区别；
* Hero、Archive、Projects、Contact、Roll Again、Room Introduction 和 Navigation 的整页转译；
* 响应式规则；
* Reduced Motion 规则；
* 装饰和动效上限；
* 去色测试与静态测试标准。

Agent 在实现或修改某个展厅前，必须先读取对应的风格设计规范文件。若风格文件与本通用规范冲突，以本通用规范为准。

---

# 23. 通用设计令牌

建议至少建立以下令牌。

~~~css
:root {
  --color-bg: #fff;
  --color-surface: #fff;
  --color-surface-2: #fff;
  --color-text: #000;
  --color-muted: #666;
  --color-accent: #000;
  --color-accent-2: #999;
  --color-line: #000;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;
  --space-9: 128px;

  --font-size-xs: clamp(...);
  --font-size-sm: clamp(...);
  --font-size-md: clamp(...);
  --font-size-lg: clamp(...);
  --font-size-xl: clamp(...);
  --font-size-display: clamp(...);

  --line-thin: 1px;
  --line-medium: 2px;
  --line-heavy: 4px;

  --duration-fast: 160ms;
  --duration-medium: 360ms;
  --duration-slow: 720ms;
}
~~~

每个展厅可以覆盖令牌，但不应绕过令牌系统。

---

# 24. 通用禁止项

除非有明确策展理由，禁止默认使用：

* SaaS 风格 Hero；
* 两个并排 CTA；
* Bento Grid；
* 三张圆角项目卡片；
* 模糊光球；
* 紫蓝渐变；
* 玻璃拟态；
* 统一胶囊标签；
* 卡片 hover 上浮；
* 通用 Dashboard；
* 头像圆形裁切；
* 技能 Logo 墙；
* 模板式时间轴；
* 普通页脚；
* 大量装饰图标；
* “AI 科技感”；
* PPT 式一屏一标题；
* 无意义的背景动画。

---

# 25. 风格质量要求

每个展厅必须回答以下问题：

## 25.1 核心规则

* 该语言的核心原则是什么？
* 页面使用了哪些结构规则？
* 哪些元素必须出现？
* 哪些元素绝对不能出现？

## 25.2 与相邻展厅区别

必须明确区别于至少两个容易混淆的展厅。

例如：

~~~text
风格派 ≠ 国际风格
具体艺术 ≠ 极简主义
构成主义 ≠ 至上主义
网络艺术 ≠ 浏览器艺术
软件艺术 ≠ 系统艺术
~~~

---

## 25.3 去色测试

暂时转成灰度后：

* 风格是否仍然可识别？
* 构图是否仍然成立？
* 是否只是依赖配色？
* 页面层级是否清楚？

---

## 25.4 静态测试

关闭所有动画后：

* 页面是否仍然成立？
* 内容是否完整？
* 风格是否仍然可辨认？
* 是否有元素依赖动画才能定位？

---

# 26. 验收标准

## 26.1 内容验收

* Hero 使用全局通用文案池；
* Hero 未被风格改写；
* 所有项目出现一次；
* 所有事实准确；
* 教育信息完整；
* 技术栈完整；
* Contact 信息正确；
* 展厅介绍准确；
* 中英文含义一致。

---

## 26.2 结构验收

* Hero 位于第一；
* Archive 位于中间；
* Contact 是最后一个个人内容 section；
* Roll Again 位于 Contact 后；
* Room Introduction 位于页面最后；
* 固定区域没有参与随机排序；
* 页面长度合理。

---

## 26.3 随机验收

* 同一 seed 可复现；
* URL 可分享；
* 浏览器返回有效；
* 没有直接使用未受控 Math.random()；
* 参数均在安全范围；
* 不出现项目重复；
* 不出现内容遗漏；
* 不出现布局事故。

---

## 26.4 视觉验收

* 风格贯穿整页；
* 不只改变颜色；
* 去色后仍可识别；
* 无动画后仍可识别；
* 不像普通网页模板；
* 不像 PPT；
* 不依赖图片；
* 不直接复制具体艺术作品。

---

## 26.5 可用性验收

* 首屏可识别姓名；
* Hero 文案可读；
* 项目可浏览；
* 联系方式容易找到；
* Roll Again 足够明显；
* 首次用户能理解重新生成；
* 移动端可用；
* 键盘可用；
* Reduced Motion 可用；
* 不存在横向意外溢出。

---

## 26.6 性能验收

* 页面打开后快速出现内容；
* 动画不卡顿；
* Canvas 在不可见时停止；
* 不无限创建 DOM；
* 不加载无关资源；
* 不依赖大型库；
* 长时间停留不会明显增加内存。

---

# 27. 最终生成流程

~~~text
读取 URL seed
↓
如无 seed，创建新 seed
↓
从独立随机流生成 Room
↓
生成 Color Scheme
↓
生成 Hero 文案
↓
生成 Hero 次级文案
↓
生成 Archive 顺序
↓
生成项目顺序
↓
生成项目描述版本
↓
生成 section 组合
↓
生成 Contact 文案
↓
生成展厅布局参数
↓
生成装饰与动效参数
↓
渲染 Hero
↓
渲染 Archive
↓
渲染 Contact
↓
渲染 Roll Again
↓
渲染 Room Introduction
↓
更新 URL 与分享状态
~~~

---

# 28. 最终体验目标

用户第一次进入时，应经历：

~~~text
这是一个设计完整的个人主页
↓
内容真实、专业且可以快速浏览
↓
页面具有明显但难以立即归类的艺术语言
↓
用户看完项目和经历
↓
用户抵达联系方式
↓
用户以为页面已经结束
↓
用户发现 Roll Again
↓
用户意识到这只是其中一个版本
↓
用户进入另一个展厅
↓
同一份内容被完全不同的系统重新组织
~~~

整个项目最终表达的不是“我做了很多风格”，而是：

> 个人主页不必是一个固定页面。它可以是一套有边界、有历史意识、可复现、可维护并持续产生新版本的生成系统。
