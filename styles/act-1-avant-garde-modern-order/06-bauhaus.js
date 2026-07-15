(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "bauhaus",
    classNames: ["theme-bauhaus", "layout-single"],
    variables: {
      "--bg": "#ece8dc",
      "--fg": "#172224",
      "--muted": "#526063",
      "--line": "#172224",
      "--card": "#f8f5eb",
      "--card-strong": "#e6c84c",
      "--accent": "#17688b",
      "--radius": "4px",
      "--style-site-width": "1080px",
      "--style-component-outline": "2px solid var(--line)",
      "--style-button-radius": "999px",
      "--style-button-weight": "750",
      "--style-card-gap": "20px"
    },
    label: { en: "Bauhaus", zh: "包豪斯" },
    period: "1910s",
    introduction: {
      en: "Functional zones, workshop geometry, and material-minded components connect experimentation to clear use.",
      zh: "功能分区、工坊几何与具有材料感的组件，把实验性和清晰用途连接起来。"
    }
  });
})();
