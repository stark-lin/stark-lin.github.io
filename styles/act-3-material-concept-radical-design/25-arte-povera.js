(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "arte-povera",
    classNames: ["theme-arte-povera", "layout-single"],
    variables: {
      "--bg": "#ddd5c3",
      "--fg": "#292820",
      "--muted": "#5f5a4b",
      "--line": "#625f50",
      "--card": "#ece6d8",
      "--card-strong": "#c9c0a9",
      "--accent": "#79523a",
      "--radius": "2px",
      "--style-site-width": "1040px",
      "--style-line-height": "1.66",
      "--style-card-gap": "24px",
      "--style-component-outline": "1px solid var(--line)",
      "--style-button-radius": "2px",
      "--style-button-bg": "var(--card)",
      "--style-button-color": "var(--fg)",
      "--style-button-border-color": "var(--line)",
      "--style-button-secondary-bg": "var(--card-strong)"
    },
    label: { en: "Arte Povera", zh: "贫穷艺术" },
    introduction: {
      en: "Unfinished edges, fibre-like lines, and plainly exposed joins give ordinary surfaces a provisional material presence.",
      zh: "未精加工的边缘、纤维式线条与直接外露的连接，让普通表面呈现临时而真实的物质感。"
    }
  });
})();
