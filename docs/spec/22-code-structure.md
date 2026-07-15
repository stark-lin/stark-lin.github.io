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

/docs
  /rooms
    01-purism.md
    02-constructivism.md
    03-suprematism.md
    04-de-stijl.md
    ...

/rooms
  /01-purism
    01-purism.html
    01-purism.css
    01-purism.js
  /02-constructivism
    02-constructivism.html
    02-constructivism.css
    02-constructivism.js
  /03-suprematism
    03-suprematism.html
    03-suprematism.css
    03-suprematism.js
  /04-de-stijl
    04-de-stijl.html
    04-de-stijl.css
    04-de-stijl.js
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
docs/rooms/03-suprematism.md
docs/rooms/04-de-stijl.md
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

## 22.5 风格 HTML、CSS 与 JavaScript 独立文件

42 个展厅中的每一个都必须拥有独立的 HTML、CSS 和 JavaScript 文件。三个实现文件必须使用与风格设计规范相同的编号和 style-id，并放入该展厅的独立目录。

目录与文件格式：

~~~text
/rooms/NN-style-id/
  NN-style-id.html
  NN-style-id.css
  NN-style-id.js
~~~

一个完整展厅必须形成以下一一对应的四文件集合：

~~~text
/docs/rooms/NN-style-id.md
/rooms/NN-style-id/NN-style-id.html
/rooms/NN-style-id/NN-style-id.css
/rooms/NN-style-id/NN-style-id.js
~~~

正确示例：

~~~text
/docs/rooms/02-constructivism.md
/rooms/02-constructivism/02-constructivism.html
/rooms/02-constructivism/02-constructivism.css
/rooms/02-constructivism/02-constructivism.js
~~~

文件职责：

* HTML：定义该展厅对统一语义骨架的结构转译、语义槽位和展厅专属构图，不复制或写死个人内容；
* CSS：定义该展厅的排版、构图、色彩关系、装饰、响应式和 Reduced Motion 规则，并通过通用设计令牌取值；
* JavaScript：实现统一 Room 接口、展厅专属布局参数、交互、装饰和动效行为，不决定文案内容或个人事实；
* Markdown：定义该展厅的设计依据、必需特征、禁止特征、整页规则和验收标准。

独立性要求：

* 每个展厅必须同时拥有 HTML、CSS 和 JavaScript 文件，不得缺少其中任何一个；
* 三个实现文件必须具有相同 basename，不得使用 index.html、style.css、script.js 等无法独立识别展厅的通用文件名；
* 展厅专属 HTML 模板不得全部集中在根入口文件或单个全局模板文件；
* 展厅专属 CSS 不得全部集中在 assets/styles.css 或其他全局样式文件；
* 展厅专属 JavaScript 不得全部集中在 assets/app.js 或其他全局脚本文件；
* 页面生成时应只加载或激活当前展厅所需的专属实现，避免同时执行 42 个展厅的行为代码；
* 修改一个展厅时，不应要求修改另一个展厅的专属实现文件；
* 空文件、仅含注释的占位文件或没有实际职责的代理文件不视为满足独立文件要求。

允许共享：

* 真实个人内容和中英文数据；
* seed、派生随机流、状态与 URL 核心；
* 通用设计令牌、reset 和基础可访问性样式；
* 统一 Room 接口与加载器；
* 所有展厅都必须遵守且没有风格偏向的基础工具函数。

共享文件不得包含只服务于某一个展厅的结构、选择器、参数或行为。若一段代码只有一个展厅使用，它必须保留在该展厅的独立 HTML、CSS 或 JavaScript 文件中。

---
