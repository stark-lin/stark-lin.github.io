# 生成式个人主页通用设计规范

> 状态：本仓库的权威产品与设计规范总索引。若现有实现、README、注释、历史约定或其他项目文档与本规范冲突，以本规范为准。

为避免单一文件过长，原规范按顶级章节拆分为 `docs/spec/00-*.md` 至 `docs/spec/28-*.md`。章节编号、顺序和内容保持不变；本文件作为稳定入口和阅读清单。

## 阅读要求

- 规划、实现、重构、评审或验收前，必须完整阅读本索引及下列全部规范分册。
- 修改某一领域时，除对应分册外，仍须核对[第 26 节：验收标准](spec/26-acceptance-criteria.md)。
- 实现或修改某个展厅前，还必须读取对应的 `docs/rooms/NN-style-id.md`。
- 分册之间发生疑义时，以章节编号顺序、本文的规范优先级声明和更严格的可用性约束为准。

## 规范目录

### 产品、结构与内容

| 章节 | 分册 |
| --- | --- |
| 0 | [文档目的](spec/00-document-purpose.md) |
| 1 | [项目定义](spec/01-project-definition.md) |
| 2 | [核心设计原则](spec/02-core-design-principles.md) |
| 3 | [首尾固定与中段可变结构](spec/03-fixed-page-structure.md) |
| 4 | [页面语义骨架](spec/04-semantic-page-skeleton.md) |
| 5 | [Hero 规范](spec/05-hero.md) |
| 6 | [Personal Archive 规范](spec/06-personal-archive.md) |
| 7 | [Contact 规范](spec/07-contact.md) |
| 8 | [Roll Again 规范](spec/08-roll-again.md) |
| 9 | [Room Introduction / Exhibition Note 规范](spec/09-room-introduction.md) |
| 10 | [导航规范](spec/10-navigation.md) |

### 生成与视觉系统

| 章节 | 分册 |
| --- | --- |
| 11 | [随机系统规范](spec/11-random-system.md) |
| 12 | [配色系统规范](spec/12-color-system.md) |
| 13 | [排版系统规范](spec/13-typography-system.md) |
| 14 | [间距与尺寸规范](spec/14-spacing-and-sizing.md) |
| 15 | [页面长度规范](spec/15-page-length.md) |

### 适配、交互与质量底线

| 章节 | 分册 |
| --- | --- |
| 16 | [响应式规范](spec/16-responsive-design.md) |
| 17 | [动效规范](spec/17-motion.md) |
| 18 | [交互规范](spec/18-interaction.md) |
| 19 | [首次访问提示](spec/19-first-visit-prompt.md) |
| 20 | [可访问性规范](spec/20-accessibility.md) |
| 21 | [性能规范](spec/21-performance.md) |

### 工程、展厅与验收

| 章节 | 分册 |
| --- | --- |
| 22 | [代码结构规范](spec/22-code-structure.md) |
| 23 | [通用设计令牌](spec/23-design-tokens.md) |
| 24 | [通用禁止项](spec/24-general-prohibitions.md) |
| 25 | [风格质量要求](spec/25-room-quality.md) |
| 26 | [验收标准](spec/26-acceptance-criteria.md) |
| 27 | [最终生成流程](spec/27-generation-flow.md) |
| 28 | [最终体验目标](spec/28-experience-goal.md) |

## 维护约定

1. 新增或修改规则时，放入语义最接近的既有分册，不在本索引重复正文。
2. 顶级章节编号是稳定引用；新增小节优先使用 `N.x`，避免无必要地重排 0–28。
3. 跨章节引用使用 Markdown 相对链接，不只写“见上文”或“见下文”。
4. `docs/rooms/` 只存放 42 个展厅各自的设计规范；通用规则保留在 `docs/spec/`。
5. 本索引、`AGENTS.md` 与 README 中的权威规范链接必须始终保持有效。
