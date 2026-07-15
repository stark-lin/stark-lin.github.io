(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "new-typography",
    classNames: ["theme-new-typography", "layout-single"],
    variables: {
      "--bg": "#f1efe8",
      "--fg": "#101820",
      "--muted": "#4b555d",
      "--line": "#101820",
      "--card": "#f7f5ef",
      "--card-strong": "#dce4e7",
      "--accent": "#a93222",
      "--radius": "0px",
      "--style-site-width": "1100px",
      "--style-h1-max": "124px",
      "--style-h1-tracking": "-0.045em",
      "--style-h2-tracking": "-0.025em",
      "--style-component-outline": "0px solid transparent",
      "--style-button-radius": "0px",
      "--style-button-text-transform": "uppercase",
      "--style-button-weight": "750",
      "--style-title-rule-width": "2px",
      "--style-title-rule-padding": "16px"
    },
    label: { en: "New Typography", zh: "新排版" },
    period: "1920s",
    introduction: {
      en: "Asymmetric type scale, active white space, and functional rules create a strong informational cadence.",
      zh: "非对称字号层级、动态留白与功能性线条，共同建立强烈的信息节奏。"
    }
  });
})();
