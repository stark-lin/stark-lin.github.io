(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "hard-edge-painting",
    classNames: ["theme-hard-edge-painting", "layout-single"],
    variables: {
      "--bg": "#e7d7ad", "--fg": "#18272b", "--muted": "#45565a", "--line": "#18272b",
      "--card": "#f4eddb", "--card-strong": "#f0c545", "--accent": "#b83b37", "--radius": "0px",
      "--style-site-width": "1120px", "--style-h1-max": "110px", "--style-card-gap": "20px",
      "--style-component-outline": "3px solid var(--line)", "--style-button-radius": "0px", "--style-button-border-width": "2px"
    },
    label: { en: "Hard-Edge Painting", zh: "硬边绘画" },
    period: "1950s",
    introduction: {
      en: "Crisp adjoining planes and a few large color decisions organize the page without gradients, blur, or brushwork.",
      zh: "锐利相接的平面与少量大色块组织页面，不使用渐变、模糊或笔触。"
    }
  });
})();
