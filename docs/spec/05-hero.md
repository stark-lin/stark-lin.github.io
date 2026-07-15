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

