(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "international-typographic-style",
    classNames: ["theme-international-typographic-style", "layout-single"],
    variables: {
      "--bg": "#f4f1e8", "--fg": "#111416", "--muted": "#596064", "--line": "#b9b8b0",
      "--card": "#f4f1e8", "--card-strong": "#e6e3da", "--accent": "#1759d1", "--radius": "0px",
      "--sans": "\"Helvetica Neue\", Helvetica, Arial, \"Noto Sans SC\", \"PingFang SC\", sans-serif",
      "--style-site-width": "1120px", "--style-line-height": "1.48", "--style-h1-min": "54px",
      "--style-h1-fluid": "9.5vw", "--style-h1-max": "124px", "--style-h1-tracking": "-0.065em",
      "--style-h2-tracking": "-0.05em", "--style-h3-tracking": "-0.035em",
      "--style-section-padding-y": "88px", "--style-card-padding": "24px", "--style-card-gap": "0px",
      "--style-component-outline": "0px solid transparent", "--style-button-radius": "0px",
      "--style-button-font": "var(--sans)", "--style-button-weight": "700", "--style-button-bg": "var(--accent)",
      "--style-button-border-color": "var(--accent)", "--style-button-secondary-color": "var(--fg)",
      "--style-button-secondary-border-color": "var(--fg)", "--style-meta-spacing": ".09em"
    },
    label: { en: "International Typographic Style", zh: "国际字体排印风格" },
    period: "1950s",
    introduction: {
      en: "A postwar graphic-design system built from asymmetric modular grids, flush-left ragged-right type, sans serif hierarchy, and text treated as image. This is typography, not the 1920s architectural International Style; historically, Swiss Style is another name for the same movement.",
      zh: "一种由不对称模数网格、齐左不齐右、无衬线层级与文字图像化构成的战后平面设计方法。这里特指字体排印，不是 1920 年代的建筑“国际风格”；历史上“瑞士风格”是它的别称，而非另一流派。"
    }
  });
})();
