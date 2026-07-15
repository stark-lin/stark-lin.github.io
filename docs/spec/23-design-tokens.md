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

