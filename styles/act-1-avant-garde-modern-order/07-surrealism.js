(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "surrealism",
    classNames: ["theme-surrealism", "layout-single"],
    variables: {
      "--bg": "#dbe6df",
      "--fg": "#172125",
      "--muted": "#455457",
      "--line": "#35464a",
      "--card": "#f7f3e8",
      "--card-strong": "#c6d6cf",
      "--accent": "#7d3a59",
      "--radius": "38px",
      "--style-site-width": "1060px",
      "--style-h1-max": "102px",
      "--style-line-height": "1.62",
      "--style-component-outline": "1px solid color-mix(in srgb, var(--line), transparent 30%)",
      "--style-button-radius": "62% 38% 55% 45% / 45% 56% 44% 55%"
    },
    label: { en: "Surrealism", zh: "超现实主义" },
    introduction: {
      en: "Soft biological contours and locally impossible scale relationships make the familiar interface subtly uncanny.",
      zh: "柔软的生物轮廓与局部不可能的尺度关系，让熟悉的界面产生轻微陌生感。"
    }
  });
})();
