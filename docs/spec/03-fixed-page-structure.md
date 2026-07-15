# 3. 首尾固定与中段可变结构

所有 42 个展厅共享同一“首尾固定、中间可变”的语义结构。

~~~text
01. Hero（固定开头）
02. Seeded Variable Middle（由 seed 确定顺序）
03. Contact（固定末段）
04. Roll Again（固定结尾）
~~~

完整动线：

~~~text
Hero
↓
随机排列的中段内容
├── Projects
├── Experience
├── Education
├── Working Stack
├── 其他可选个人档案
└── Room Introduction / Exhibition Note
↓
Contact
↓
Roll Again
~~~

固定规则：

* Hero 永远是第一页；
* 中段内容允许重排，其 DOM 顺序和视觉顺序都必须由 seed 确定并可复现；
* Room Introduction 与 Exhibition Note 指同一个展厅说明 section，属于可变中段，不固定在页面末端；
* Contact 永远是最后一个个人内容 section；
* Roll Again 永远位于 Contact 之后；
* Roll Again 永远是页面最后一个主要 section；
* Hero、Contact 和 Roll Again 不得参与随机排序；
* “中间可变”只允许改变中段 section 的顺序、组合和空间表达，不得遗漏核心内容或改变事实。

---
