# 7. Contact 规范

## 7.1 Contact 定义

Contact 是最后一个个人内容 section。

它不是普通页脚，也不参与随机排序。

页面顺序必须是：

~~~text
Seeded Variable Middle
↓
Contact
↓
Roll Again
~~~

Contact 与 Roll Again 共同构成固定末段；任何中段 section，包括 Room Introduction / Exhibition Note，都不得插入二者之间或排在 Roll Again 之后。

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
