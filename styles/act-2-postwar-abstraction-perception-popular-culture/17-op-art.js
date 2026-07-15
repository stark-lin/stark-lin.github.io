(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "op-art",
    classNames: ["theme-op-art", "layout-single"],
    variables: {
      "--bg": "#f4f2e9", "--fg": "#111315", "--muted": "#4c5052", "--line": "#111315",
      "--card": "#fffef7", "--card-strong": "#eceae1", "--accent": "#111315", "--radius": "0px",
      "--style-site-width": "1040px", "--style-component-outline": "2px solid var(--line)", "--style-button-radius": "0px",
      "--style-card-gap": "28px"
    },
    label: { en: "Op Art", zh: "欧普艺术" },
    introduction: {
      en: "Localized line frequencies, concentric structures, and checker fields create optical tension around calm reading surfaces.",
      zh: "局部线条频率、同心结构与棋格色场在安静阅读平面周围制造视错张力。"
    }
  });
})();
