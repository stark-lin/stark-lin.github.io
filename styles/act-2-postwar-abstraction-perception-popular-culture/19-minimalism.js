(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "minimalism",
    classNames: ["theme-minimalism", "layout-single"],
    variables: {
      "--bg": "#e9e6df", "--fg": "#202322", "--muted": "#626662", "--line": "#a9aaa4",
      "--card": "#f2f0ea", "--card-strong": "#dedbd3", "--accent": "#3c4642", "--radius": "0px",
      "--style-site-width": "1000px", "--style-h1-max": "92px", "--style-section-padding-y": "88px",
      "--style-card-gap": "16px", "--style-component-outline": "1px solid var(--line)", "--style-button-radius": "0px"
    },
    label: { en: "Minimalism", zh: "极简主义" },
    introduction: {
      en: "Serial modules, industrial restraint, and a deliberately narrow hierarchy make repetition carry the visual system.",
      zh: "序列模块、工业克制与刻意压缩的层级，让重复本身承担视觉系统。"
    }
  });
})();
