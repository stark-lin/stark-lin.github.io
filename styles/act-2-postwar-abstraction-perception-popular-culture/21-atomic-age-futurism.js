(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "atomic-age-futurism",
    classNames: ["theme-atomic-age-futurism", "layout-single"],
    variables: {
      "--bg": "#f8efd8",
      "--fg": "#17343b",
      "--muted": "#46615f",
      "--line": "#17343b",
      "--card": "#fffaf0",
      "--card-strong": "#f2b84b",
      "--accent": "#e4573d",
      "--radius": "7px",
      "--style-site-width": "1240px",
      "--style-line-height": "1.65",
      "--style-hero-pad-top": "clamp(76px, 10vw, 132px)",
      "--style-hero-pad-bottom": "clamp(62px, 8vw, 108px)",
      "--style-hero-gap": "clamp(30px, 6vw, 86px)",
      "--style-section-padding-y": "clamp(72px, 9vw, 116px)",
      "--style-section-gap": "clamp(34px, 5vw, 64px)",
      "--style-card-padding": "clamp(26px, 3vw, 40px)",
      "--style-card-gap": "20px",
      "--style-h1-min": "56px",
      "--style-h1-fluid": "7.2vw",
      "--style-h1-max": "104px",
      "--style-h1-tracking": "-.055em",
      "--style-h2-tracking": "-.045em",
      "--style-h3-tracking": "-.035em",
      "--style-desc-size": "17px",
      "--style-section-lead-size": "17px",
      "--style-component-outline": "3px solid var(--line)",
      "--style-card-shadow": "8px 9px 0 rgba(23, 52, 59, .2)",
      "--style-panel-shadow": "12px 14px 0 #f2b84b",
      "--style-title-rule-width": "2px",
      "--style-title-rule-style": "dotted",
      "--style-title-rule-padding": "18px",
      "--style-button-radius": "999px",
      "--style-button-y": "11px",
      "--style-button-x": "19px",
      "--style-button-size": "11px",
      "--style-button-bg": "#e4573d",
      "--style-button-color": "#fffaf0",
      "--style-button-border-color": "#17343b",
      "--style-button-secondary-bg": "#fffaf0",
      "--style-button-secondary-color": "#17343b",
      "--style-button-secondary-border-color": "#17343b",
      "--style-button-font": "var(--mono)",
      "--style-button-weight": "900",
      "--style-button-text-transform": "uppercase",
      "--style-button-tracking": ".1em",
      "--style-button-shadow": "4px 4px 0 #f2b84b"
    },
    label: { en: "Atomic Age Futurism", zh: "原子时代未来主义" },
    period: "1950s",
    introduction: {
      en: "A warm postwar space salon of orbital diagrams, instrument panels, starbursts, boomerangs, and machine-age optimism.",
      zh: "一座温暖的战后太空沙龙：轨道图、仪表面板、星爆与回旋镖形态，共同勾勒机器时代的乐观想象。"
    }
  });

  if (typeof document === "undefined") return;

  function installAtomicStage() {
    if (!document.body.classList.contains("theme-atomic-age-futurism")) return;

    const hero = document.getElementById("hero");
    if (!hero || hero.querySelector(".atomic-stage")) return;

    hero.insertAdjacentHTML("beforeend", `
      <div class="atomic-stage" aria-hidden="true">
        <span class="atomic-orbit atomic-orbit--one"><i class="atomic-satellite"></i></span>
        <span class="atomic-orbit atomic-orbit--two"><i class="atomic-satellite"></i></span>
        <span class="atomic-orbit atomic-orbit--three"><i class="atomic-satellite"></i></span>
        <span class="atomic-sun"></span>
        <span class="atomic-starburst"></span>
        <span class="atomic-boomerang"></span>
      </div>
    `);

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame;
    hero.addEventListener("pointermove", event => {
      if (event.pointerType === "touch") return;
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - .5) * 12;
      const y = ((event.clientY - bounds.top) / bounds.height - .5) * 10;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.style.setProperty("--atomic-shift-x", `${x.toFixed(2)}px`);
        hero.style.setProperty("--atomic-shift-y", `${y.toFixed(2)}px`);
      });
    }, { passive: true });

    hero.addEventListener("pointerleave", () => {
      hero.style.setProperty("--atomic-shift-x", "0px");
      hero.style.setProperty("--atomic-shift-y", "0px");
    }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installAtomicStage, { once: true });
  } else {
    requestAnimationFrame(installAtomicStage);
  }
})();
