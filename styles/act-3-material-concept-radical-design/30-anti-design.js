(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "anti-design",
    classNames: ["theme-anti-design", "layout-single"],
    variables: {
      "--bg": "#e8d84f",
      "--fg": "#231b36",
      "--muted": "#554765",
      "--line": "#231b36",
      "--card": "#f5efcc",
      "--card-strong": "#e85c47",
      "--accent": "#a12868",
      "--radius": "0px",
      "--style-site-width": "1080px",
      "--style-h1-max": "108px",
      "--style-card-gap": "20px",
      "--style-component-outline": "3px solid var(--line)",
      "--style-button-radius": "0px",
      "--style-button-border-width": "3px",
      "--style-button-font": "var(--mono)",
      "--style-button-weight": "800",
      "--style-button-text-transform": "uppercase",
      "--style-button-tracking": ".05em"
    },
    label: { en: "Anti-Design", zh: "反设计" },
    period: "1960s",
    introduction: {
      en: "Two deliberate surface and border systems disagree in public, creating tension without introducing accidental errors or hiding content.",
      zh: "两套明确的表面与边界系统公开冲突，在不制造意外错误或遮挡内容的前提下形成张力。"
    }
  });
})();
