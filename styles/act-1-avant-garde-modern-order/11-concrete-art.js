(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "concrete-art",
    classNames: ["theme-concrete-art", "layout-single"],
    variables: {
      "--bg": "#ecece5",
      "--fg": "#17201d",
      "--muted": "#4d5753",
      "--line": "#17201d",
      "--card": "#f7f7f0",
      "--card-strong": "#d7e1d8",
      "--accent": "#2d775b",
      "--radius": "0px",
      "--style-site-width": "1080px",
      "--style-card-padding": "24px",
      "--style-card-gap": "24px",
      "--style-section-gap": "48px",
      "--style-component-outline": "2px solid var(--line)",
      "--style-button-radius": "0px",
      "--style-meta-spacing": ".12em"
    },
    label: { en: "Concrete Art", zh: "具体艺术" },
    period: "1930s",
    introduction: {
      en: "A visible modular ratio governs type, spacing, line weight, and geometric sequence as one self-sufficient system.",
      zh: "一套可见的模块比例统一控制字号、间距、线宽与几何序列，形成自足系统。"
    }
  });
})();
