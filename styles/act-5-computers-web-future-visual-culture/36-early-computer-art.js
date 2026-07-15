(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "early-computer-art",
    classNames: ["theme-early-computer-art", "layout-single"],
    variables: {
      "--bg": "#e8e4d8",
      "--fg": "#17211e",
      "--muted": "#4e5b55",
      "--line": "#52645b",
      "--card": "#f2efe5",
      "--card-strong": "#d9ded2",
      "--accent": "#ad3e2c",
      "--radius": "0px",
      "--style-site-width": "1120px",
      "--style-h1-max": "108px",
      "--style-card-gap": "24px",
      "--style-component-outline": "1px solid color-mix(in srgb, var(--line), transparent 18%)",
      "--style-button-radius": "0px",
      "--style-button-font": "var(--mono)",
      "--style-button-tracking": ".08em",
      "--style-button-text-transform": "uppercase"
    },
    label: { en: "Early Computer Art", zh: "早期计算机艺术" },
    period: "1950s",
    introduction: {
      en: "Plotter-fine vectors, finite matrices, and deterministic line variations make computation visible without turning the page into a live simulation.",
      zh: "绘图仪般的细向量、有限矩阵与确定性线条变体，让计算过程可见，同时不把页面变成实时模拟。"
    }
  });
})();
