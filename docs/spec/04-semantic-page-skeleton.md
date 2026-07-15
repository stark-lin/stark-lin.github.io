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

    <div id="middle-sequence" class="variable-middle">
      <!-- 以下中段 section 由 seed 决定 DOM 顺序 -->
      <!-- Projects -->
      <!-- Experience -->
      <!-- Education -->
      <!-- Working Stack -->
      <!-- 其他可选个人档案 -->
      <!-- Room Introduction / Exhibition Note -->
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

  </main>
</body>
~~~

`#room-introduction` 必须作为 `#middle-sequence` 的一个独立子 section 渲染，并包含展厅名称、时间范围、策展说明、Seed 与可选分享入口。

DOM 顺序必须与本次 seed 生成的语义阅读顺序一致。

禁止通过 CSS order 或绝对定位制造与 DOM 完全不同的阅读顺序。

---
