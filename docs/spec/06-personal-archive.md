# 6. Personal Archive 规范

## 6.1 内容范围

Personal Archive 包含：

* Projects；
* Experience；
* Education；
* Working Stack；
* Current Focus；
* Additional Profile Information。

Hero、Contact、Roll Again 和 Room Introduction 不属于 Personal Archive。Room Introduction 在语义上保持独立，但与 Personal Archive 各 section 一起参加中段的 seeded 排序。

---

## 6.2 随机排序

允许随机排序：

* Projects section；
* Experience；
* Education；
* Working Stack；
* Current Focus；
* Additional Profile；
* Room Introduction / Exhibition Note。

禁止参与随机：

* Hero；
* Contact；
* Roll Again。

Room Introduction 只能改变其在中段的位置，不得与个人事实合并成含义不清的单一模块，也不得被随机隐藏。

示例：

~~~js
const variableMiddleSections = seededShuffle([
  "projects",
  "experience",
  "education",
  "working-stack",
  "current-focus",
  "room-introduction"
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
