(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "ascii-art",
    classNames: ["theme-ascii-art", "layout-single"],
    variables: {
      "--bg": "#e9e1cf",
      "--fg": "#25211b",
      "--muted": "#655e52",
      "--line": "#39332a",
      "--card": "#f4eddd",
      "--card-strong": "#ded2b9",
      "--accent": "#9b3f2f",
      "--radius": "0px",
      "--style-site-width": "1040px",
      "--style-line-height": "1.62",
      "--style-h1-max": "96px",
      "--style-component-outline": "1px solid var(--line)",
      "--style-button-radius": "0px",
      "--style-button-font": "var(--mono)",
      "--style-button-tracking": ".04em"
    },
    label: { en: "ASCII Art", zh: "ASCII 艺术" },
    introduction: {
      en: "Character density becomes border, numbering, and abstract texture while the portfolio copy remains ordinary, readable text.",
      zh: "字符密度被转化为边框、编号与抽象纹理，同时作品集正文仍保持普通、可读的文本。"
    }
  });
})();
