# 展厅规范目录

本目录用于存放 42 个展厅各自的设计规范。通用规则位于[通用设计规范总索引](../GENERATIVE_PORTFOLIO_DESIGN_SPEC.md)，不得在这里复制维护。

## 文件约定

每个展厅必须拥有一份非占位规范文件：

```text
docs/rooms/NN-style-id.md
```

其中 `NN` 为 `01`–`42` 的两位编号，`style-id` 为稳定的小写英文 kebab-case 标识。对应实现必须位于：

```text
rooms/NN-style-id/NN-style-id.html
rooms/NN-style-id/NN-style-id.css
rooms/NN-style-id/NN-style-id.js
```

完整内容要求见[第 22 节：代码结构规范](../spec/22-code-structure.md)，验收要求见[第 26 节：验收标准](../spec/26-acceptance-criteria.md)。

## 已有展厅规范

| Room | 规范 | 主要构图单位 | 阅读方式 | 动效逻辑 |
| --- | --- | --- | --- | --- |
| 01 | [纯粹主义 / Purism](01-purism.md) | 稳定比例平面 | 平静、连续 | 校准与对齐 |
| 02 | [构成主义 / Constructivism](02-constructivism.md) | 对角轴与结构板 | 强方向推进 | 装配与撤离 |
| 03 | [至上主义 / Suprematism](03-suprematism.md) | 漂浮形体与距离 | 空间探索 | 漂移与让位 |
| 04 | [风格派 / De Stijl](04-de-stijl.md) | 可见正交网格 | 水平与垂直 | 切割与重分配 |

四个展厅均遵守[首尾固定与中段可变结构](../spec/03-fixed-page-structure.md)：Hero 固定在开头，展厅说明随其他中段内容按 seed 重排，Contact → Roll Again 固定在结尾。

建议实现顺序为：Room 04 风格派 → Room 01 纯粹主义 → Room 02 构成主义 → Room 03 至上主义。先建立稳定的可见网格，再逐步放开到比例、对角结构和自由空间。

## 当前状态

截至 2026-07-15，本目录已包含前 4 份展厅规范，仍缺少 Room 05–42 的 38 份规范。当前实现也尚未形成规范要求的 42 组独立 HTML、CSS 和 JavaScript 文件。

影响：当前仓库仍不能通过 42 个展厅完整性和逐展厅实现文件独立性验收。这里不创建空白占位文件，因为按权威规范，空文件或仅含注释的代理文件不算有效实现。
