(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "pop-art",
    classNames: ["theme-pop-art", "layout-single"],
    variables: {
      "--bg": "#f2d84e", "--fg": "#111820", "--muted": "#303943", "--line": "#111820",
      "--card": "#fff8e7", "--card-strong": "#f05a49", "--accent": "#d82f55", "--radius": "0px",
      "--style-site-width": "1080px", "--style-h1-max": "108px", "--style-h1-tracking": "-0.04em",
      "--style-component-outline": "4px solid var(--line)", "--style-card-shadow": "8px 8px 0 var(--line)",
      "--style-panel-shadow": "10px 10px 0 var(--line)", "--style-button-radius": "0px", "--style-button-border-width": "3px",
      "--style-button-weight": "900", "--style-button-text-transform": "uppercase"
    },
    label: { en: "Pop Art", zh: "波普艺术" },
    introduction: {
      en: "Mechanical dots, repeated units, heavy outlines, and offset print color turn the interface into a bold mass-media surface.",
      zh: "机械网点、重复单元、粗轮廓与错位印色，把界面转化为强烈的大众媒介表面。"
    }
  });
})();
