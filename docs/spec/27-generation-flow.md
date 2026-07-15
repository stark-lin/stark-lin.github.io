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
生成中段顺序（包含 Room Introduction / Exhibition Note）
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
按 seeded DOM 顺序渲染全部中段 section
↓
渲染 Contact
↓
渲染 Roll Again
↓
更新 URL 与分享状态
~~~

---
