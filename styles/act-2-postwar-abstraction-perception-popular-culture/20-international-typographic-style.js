(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "international-typographic-style",
    classNames: ["theme-international-typographic-style", "layout-single"],
    variables: {
      "--bg": "#f1f1ed", "--fg": "#14191c", "--muted": "#596064", "--line": "#a9adae",
      "--card": "#fafaf6", "--card-strong": "#e5e6e2", "--accent": "#d12b24", "--radius": "0px",
      "--sans": "\"Helvetica Neue\", Helvetica, Arial, \"Noto Sans SC\", \"PingFang SC\", sans-serif",
      "--style-site-width": "960px", "--style-line-height": "1.48", "--style-h1-max": "108px",
      "--style-h1-tracking": "-0.045em", "--style-h2-tracking": "-0.025em", "--style-h3-tracking": "-0.015em",
      "--style-section-padding-y": "72px", "--style-card-padding": "24px", "--style-card-gap": "24px",
      "--style-component-outline": "0px solid transparent", "--style-button-radius": "0px",
      "--style-button-font": "var(--sans)", "--style-button-weight": "700", "--style-button-bg": "var(--accent)",
      "--style-button-border-color": "var(--accent)", "--style-button-secondary-color": "var(--fg)",
      "--style-button-secondary-border-color": "var(--fg)", "--style-meta-spacing": ".09em"
    },
    label: { en: "International Typographic Style", zh: "瑞士国际主义排版" },
    introduction: {
      en: "A rigorous column grid, neutral sans serif, precise baselines, and restrained red metadata produce an objective hierarchy.",
      zh: "严格栏网、中性无衬线、精确基线与克制红色元数据共同形成客观层级。"
    }
  });
})();
