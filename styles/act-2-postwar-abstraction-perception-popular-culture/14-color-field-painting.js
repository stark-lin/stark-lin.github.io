(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "color-field-painting",
    classNames: ["theme-color-field-painting", "layout-single"],
    variables: {
      "--bg": "#924747", "--fg": "#201c22", "--muted": "#5d5259", "--line": "#88757b",
      "--card": "#f2e9df", "--card-strong": "#ddcbbb", "--accent": "#6b3344", "--radius": "22px",
      "--style-site-width": "1020px", "--style-hero-pad-top": "136px", "--style-hero-pad-bottom": "128px",
      "--style-section-padding-y": "112px", "--style-card-gap": "40px", "--style-component-outline": "0px solid transparent",
      "--style-button-radius": "999px"
    },
    label: { en: "Color Field Painting", zh: "色域绘画" },
    period: "1940s",
    introduction: {
      en: "Large continuous zones of muted color carry quiet islands of text through an immersive, low-density page.",
      zh: "大片连续的低饱和色域承载安静的文字岛，形成沉浸且低密度的页面。"
    }
  });
})();
