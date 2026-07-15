(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "purism",
    classNames: ["theme-purism", "layout-single"],
    variables: {
      "--bg": "#e9edf0",
      "--fg": "#1d292d",
      "--muted": "#4c5b5d",
      "--line": "#8d9a99",
      "--card": "#f7f8f5",
      "--card-strong": "#dde6e4",
      "--accent": "#3d615f",
      "--radius": "18px",
      "--style-site-width": "1040px",
      "--style-line-height": "1.65",
      "--style-h1-max": "94px",
      "--style-h1-tracking": "-0.035em",
      "--style-section-padding-y": "88px",
      "--style-component-outline": "1px solid color-mix(in srgb, var(--line), transparent 28%)",
      "--style-button-radius": "8px"
    },
    label: { en: "Purism", zh: "纯粹主义" },
    period: "1910s",
    introduction: {
      en: "Clear contours, stable ratios, and quiet machine-age forms reduce the page to calm, legible essentials.",
      zh: "清晰轮廓、稳定比例与安静的机器时代形态，把页面收束为清楚可读的基本关系。"
    }
  });
})();
