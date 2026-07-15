(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "international-style",
    classNames: ["theme-international-style", "layout-single"],
    variables: {
      "--bg": "#e7e9e5",
      "--fg": "#172023",
      "--muted": "#556063",
      "--line": "#9ba3a1",
      "--card": "#f3f4f0",
      "--card-strong": "#d8ddda",
      "--accent": "#2d5f73",
      "--radius": "0px",
      "--style-site-width": "1180px",
      "--style-hero-pad-top": "112px",
      "--style-hero-pad-bottom": "96px",
      "--style-section-padding-y": "88px",
      "--style-component-outline": "1px solid color-mix(in srgb, var(--line), transparent 22%)",
      "--style-button-radius": "0px"
    },
    label: { en: "International Style", zh: "国际风格" },
    introduction: {
      en: "Open plan, architectural proportion, and undecorated horizontal volumes let spatial relationships carry the design.",
      zh: "开放平面、建筑式比例与无装饰的水平体块，让空间关系本身承担设计。"
    }
  });
})();
