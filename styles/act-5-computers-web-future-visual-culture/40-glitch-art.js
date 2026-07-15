(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "glitch-art",
    classNames: ["theme-glitch-art", "layout-single"],
    variables: {
      "--bg": "#ecebe6",
      "--fg": "#17171a",
      "--muted": "#58575d",
      "--line": "#25252a",
      "--card": "#f8f7f2",
      "--card-strong": "#dedee5",
      "--accent": "#e23a35",
      "--radius": "2px",
      "--style-site-width": "1080px",
      "--style-h1-max": "112px",
      "--style-h1-tracking": "-.055em",
      "--style-component-outline": "1px solid var(--line)",
      "--style-button-radius": "2px",
      "--style-button-font": "var(--mono)",
      "--style-button-weight": "700"
    },
    label: { en: "Glitch Art", zh: "故障艺术" },
    introduction: {
      en: "Small displaced slices and chromatic edge errors interrupt decorative planes briefly, while every line of real copy stays still and intact.",
      zh: "小范围错位切片与色彩边缘误差短暂打断装饰平面，而每一行真实正文始终稳定、完整。"
    }
  });
})();
