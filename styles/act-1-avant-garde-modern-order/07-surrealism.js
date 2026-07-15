(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "surrealism",
    classNames: ["theme-surrealism", "layout-single"],
    variables: {
      "--bg": "#eee7d6",
      "--fg": "#18161e",
      "--muted": "#5c574e",
      "--line": "#18161e",
      "--card": "#f2ebdc",
      "--card-strong": "#df492d",
      "--accent": "#df492d",
      "--radius": "0px",
      "--style-site-width": "1180px",
      "--style-h1-max": "122px",
      "--style-line-height": "1.62",
      "--style-card-padding": "40px",
      "--style-card-gap": "18px",
      "--style-button-y": "12px",
      "--style-button-x": "22px",
      "--style-button-radius": "999px",
      "--style-component-outline": "1px solid var(--line)"
    },
    label: { en: "Surrealism", zh: "超现实主义" },
    period: "1920s",
    introduction: {
      en: "An impossible daylight stage of floating eyes, displaced suns, theatrical arches, and objects that refuse gravity.",
      zh: "一座不可能的白昼梦境：漂浮的眼睛、错位的太阳、舞台般的拱门，以及拒绝重力的物体。"
    }
  });

  if (typeof document === "undefined") return;

  function installDreamStage() {
    if (!document.body.classList.contains("theme-surrealism")) return;

    const hero = document.getElementById("hero");
    if (!hero || hero.querySelector(".surreal-stage")) return;

    hero.insertAdjacentHTML("beforeend", `
      <div class="surreal-stage" aria-hidden="true">
        <span class="surreal-stage__sun"></span>
        <span class="surreal-stage__arch"></span>
        <span class="surreal-stage__eye"></span>
        <span class="surreal-stage__moon"></span>
        <span class="surreal-stage__orb"></span>
        <span class="surreal-stage__stairs"></span>
      </div>
    `);

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame;
    hero.addEventListener("pointermove", event => {
      const bounds = hero.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - .5) * 20;
      const y = ((event.clientY - bounds.top) / bounds.height - .5) * 20;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.style.setProperty("--dream-x", `${x.toFixed(2)}px`);
        hero.style.setProperty("--dream-y", `${y.toFixed(2)}px`);
        hero.style.setProperty("--dream-x-inverse", `${(-x).toFixed(2)}px`);
        hero.style.setProperty("--dream-y-inverse", `${(-y).toFixed(2)}px`);
      });
    }, { passive: true });

    hero.addEventListener("pointerleave", () => {
      hero.style.setProperty("--dream-x", "0px");
      hero.style.setProperty("--dream-y", "0px");
      hero.style.setProperty("--dream-x-inverse", "0px");
      hero.style.setProperty("--dream-y-inverse", "0px");
    }, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installDreamStage, { once: true });
  } else {
    requestAnimationFrame(installDreamStage);
  }
})();
