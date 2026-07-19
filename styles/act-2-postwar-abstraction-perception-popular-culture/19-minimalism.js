(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "minimalism",
    classNames: ["theme-minimalism", "layout-single"],
    variables: {
      "--bg": "#f2f0eb", "--fg": "#20211f", "--muted": "#60615d", "--line": "#b9b7b0",
      "--card": "#f8f7f3", "--card-strong": "#e8e6df", "--accent": "#20211f", "--radius": "0px",
      "--style-site-width": "1000px", "--style-h1-max": "84px", "--style-section-padding-y": "80px",
      "--style-card-gap": "16px", "--style-component-outline": "0 solid transparent", "--style-button-radius": "0px",
      "--style-card-shadow": "none", "--style-panel-shadow": "none", "--style-button-shadow": "none", "--style-blur": "0px"
    },
    label: { en: "Minimalism", zh: "极简主义" },
    period: "1960s",
    introduction: {
      en: "Simple geometry, repeated modules, stable spacing, and impersonal surfaces reduce the page to one consistent system.",
      zh: "简单几何、重复模块、稳定间距与非情绪化表面，把页面收束为一套一致系统。"
    }
  });
})();
