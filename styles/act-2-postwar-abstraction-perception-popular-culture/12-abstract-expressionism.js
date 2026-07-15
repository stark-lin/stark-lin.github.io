(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "abstract-expressionism",
    classNames: ["theme-abstract-expressionism", "layout-single"],
    variables: {
      "--bg": "#d8d0c1", "--fg": "#191816", "--muted": "#514b43", "--line": "#29251f",
      "--card": "#f4f0e7", "--card-strong": "#e5dccb", "--accent": "#8b2f24", "--radius": "3px",
      "--style-site-width": "1080px", "--style-h1-max": "112px", "--style-h1-tracking": "-0.055em",
      "--style-card-gap": "24px", "--style-component-outline": "2px solid var(--line)", "--style-button-radius": "2px"
    },
    label: { en: "Abstract Expressionism", zh: "抽象表现主义" },
    introduction: {
      en: "Broad gestural traces, irregular contours, and an all-over field surround stable planes of readable content.",
      zh: "宽阔的动作痕迹、不规则轮廓与全覆盖色场环绕稳定、可读的内容平面。"
    }
  });
})();
