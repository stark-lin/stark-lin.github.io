(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "ascii-art",
    classNames: ["theme-ascii-art", "layout-single"],
    variables: {
      "--bg": "#020604",
      "--fg": "#b8ffc7",
      "--muted": "#65a875",
      "--line": "#14572b",
      "--card": "#06110a",
      "--card-strong": "#09190f",
      "--accent": "#39ff68",
      "--radius": "0px",
      "--style-site-width": "1180px",
      "--style-line-height": "1.66",
      "--style-hero-gap": "40px",
      "--style-section-padding-y": "88px",
      "--style-section-gap": "48px",
      "--style-card-padding": "28px",
      "--style-card-gap": "20px",
      "--style-h1-fluid": "7.4vw",
      "--style-h1-max": "84px",
      "--style-h1-tracking": "-.065em",
      "--style-desc-size": "16px",
      "--style-component-outline": "1px solid var(--line)",
      "--style-button-radius": "0px",
      "--style-button-font": "var(--mono)",
      "--style-button-size": "12px",
      "--style-button-weight": "700",
      "--style-button-tracking": ".06em",
      "--style-button-bg": "var(--accent)",
      "--style-button-color": "var(--bg)",
      "--style-button-border-color": "var(--accent)",
      "--style-button-secondary-bg": "transparent",
      "--style-button-secondary-color": "var(--accent)",
      "--style-button-secondary-border-color": "var(--line)"
    },
    label: { en: "ASCII Art", zh: "ASCII 艺术" },
    introduction: {
      en: "A phosphor-green terminal system built from prompts, character frames, numbered data blocks, scan lines, and live ASCII status graphics.",
      zh: "一套由命令提示符、字符边框、编号数据块、扫描线与实时 ASCII 状态图形组成的磷光绿终端系统。"
    }
  });
})();
