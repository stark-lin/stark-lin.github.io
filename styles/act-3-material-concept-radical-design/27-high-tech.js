(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "high-tech",
    classNames: ["theme-high-tech", "layout-single"],
    variables: {
      "--bg": "#e9eef0",
      "--fg": "#152229",
      "--muted": "#506169",
      "--line": "#6f858f",
      "--card": "#f6f8f7",
      "--card-strong": "#d9e3e6",
      "--accent": "#146b88",
      "--radius": "2px",
      "--style-site-width": "1140px",
      "--style-h1-max": "106px",
      "--style-section-padding-y": "88px",
      "--style-card-gap": "24px",
      "--style-component-outline": "1px solid var(--line)",
      "--style-button-radius": "2px",
      "--style-button-font": "var(--mono)",
      "--style-button-size": "12px",
      "--style-button-text-transform": "uppercase",
      "--style-button-tracking": ".08em"
    },
    label: { en: "High-Tech", zh: "高技派" },
    period: "1960s",
    introduction: {
      en: "Light frames, exposed fasteners, edge scales, and precise panel joints make construction visible without becoming a control interface.",
      zh: "轻型框架、外露连接件、边缘刻度与精密面板接缝，让构造可见但不变成控制界面。"
    }
  });
})();
