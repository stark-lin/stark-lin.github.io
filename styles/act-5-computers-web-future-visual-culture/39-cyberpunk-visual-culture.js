(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "cyberpunk-visual-culture",
    classNames: ["theme-cyberpunk-visual-culture", "layout-single"],
    variables: {
      "--bg": "#050707",
      "--fg": "#e9f0e8",
      "--muted": "#8c9690",
      "--line": "#39413d",
      "--card": "#0b1010",
      "--card-strong": "#101716",
      "--accent": "#ffd43b",
      "--radius": "0px",
      "--style-site-width": "1460px",
      "--style-line-height": "1.62",
      "--style-hero-pad-top": "clamp(104px, 13vw, 190px)",
      "--style-hero-pad-bottom": "clamp(58px, 8vw, 108px)",
      "--style-hero-gap": "clamp(30px, 6vw, 92px)",
      "--style-section-padding-y": "clamp(82px, 10vw, 144px)",
      "--style-section-gap": "clamp(30px, 5vw, 72px)",
      "--style-card-padding": "clamp(24px, 3vw, 42px)",
      "--style-card-gap": "12px",
      "--style-h1-min": "58px",
      "--style-h1-fluid": "10.4vw",
      "--style-h1-max": "158px",
      "--style-h1-tracking": "-.085em",
      "--style-h2-tracking": "-.065em",
      "--style-h3-tracking": "-.035em",
      "--style-desc-size": "16px",
      "--style-section-lead-size": "14px",
      "--style-component-outline": "1px solid var(--line)",
      "--style-card-shadow": "none",
      "--style-panel-shadow": "none",
      "--style-title-rule-width": "0px",
      "--style-button-radius": "0px",
      "--style-button-y": "12px",
      "--style-button-x": "18px",
      "--style-button-size": "10px",
      "--style-button-bg": "var(--accent)",
      "--style-button-color": "#050707",
      "--style-button-border-color": "var(--accent)",
      "--style-button-secondary-bg": "transparent",
      "--style-button-secondary-color": "var(--fg)",
      "--style-button-secondary-border-color": "var(--line)",
      "--style-button-font": "var(--mono)",
      "--style-button-weight": "800",
      "--style-button-text-transform": "uppercase",
      "--style-button-tracking": ".11em"
    },
    label: { en: "Cyberpunk Visual Culture", zh: "赛博朋克视觉文化" },
    period: "1980s",
    introduction: {
      en: "Cyberpunk visual culture turns corporate technology, street improvisation, artificial light and social fracture into one compressed visual field.",
      zh: "赛博朋克视觉文化把企业技术、街头改造、人造光与社会断层压进同一个高密度视觉场。"
    }
  });

  const COPY = {
    en: {
      field: "Project dossier / 42",
      period: "Backend / Systems / Tools",
      subject: "Stark Lin / Selected work",
      filterLabel: "Filter project index by technology",
      all: "Full index",
      showing: (shown, total) => `${shown} / ${total} records`,
      project: "Project record"
    },
    zh: {
      field: "作品档案 / 42",
      period: "后端 / 系统 / 工具",
      subject: "Stark Lin / 作品选集",
      filterLabel: "按技术筛选项目索引",
      all: "完整索引",
      showing: (shown, total) => `${shown} / ${total} 条记录`,
      project: "项目记录"
    }
  };

  function splitStack(stack) {
    return stack
      .split(/\s*[·,|+]\s*/)
      .map(token => token.trim())
      .filter(Boolean);
  }

  function selectFilters(cards) {
    const tokensByCard = cards.map(card => splitStack(card.querySelector(".stack")?.textContent || ""));
    const counts = new Map();
    tokensByCard.flat().forEach(token => counts.set(token, (counts.get(token) || 0) + 1));

    return [...counts]
      .filter(([, count]) => count < cards.length)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 4)
      .map(([token]) => token);
  }

  function createFieldStrip(hero, copy) {
    const strip = document.createElement("div");
    strip.className = "cyber-field-strip";
    strip.setAttribute("aria-hidden", "true");
    [copy.field, copy.period, copy.subject].forEach(value => {
      const item = document.createElement("span");
      item.textContent = value;
      strip.appendChild(item);
    });
    hero.prepend(strip);
  }

  function decorateSurface(copy) {
    const hero = document.getElementById("hero");
    if (hero) {
      createFieldStrip(hero, copy);

      hero.addEventListener("pointermove", event => {
        if (event.pointerType === "touch") return;
        const bounds = hero.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        document.body.style.setProperty("--cyber-pointer-x", `${x.toFixed(1)}%`);
        document.body.style.setProperty("--cyber-pointer-y", `${y.toFixed(1)}%`);
      }, { passive: true });
    }

    document.querySelectorAll("main > .section").forEach((section, index) => {
      const title = section.querySelector(".section-head h2")?.textContent.trim() || "";
      section.dataset.cyberSection = `${String(index + 1).padStart(2, "0")} — ${title}`;
    });
  }

  function buildProjectIndex(copy) {
    const cardsContainer = document.querySelector("#work .cards");
    const cards = cardsContainer ? [...cardsContainer.querySelectorAll(".project-card")] : [];
    if (!cardsContainer || !cards.length) return;

    cards.forEach((card, index) => {
      const title = card.querySelector("h3")?.textContent.trim() || "";
      card.dataset.number = String(index + 1).padStart(2, "0");
      card.setAttribute("aria-label", `${copy.project} ${index + 1}: ${title}`);
    });

    if (cards.length < 2) return;

    const filters = selectFilters(cards);
    const toolbar = document.createElement("div");
    toolbar.className = "cyber-filter";
    toolbar.setAttribute("role", "toolbar");
    toolbar.setAttribute("aria-label", copy.filterLabel);

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "cyber-filter-buttons";

    [{ value: "all", label: copy.all }, ...filters.map(value => ({ value, label: value }))]
      .forEach((filter, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.filter = filter.value;
        button.setAttribute("aria-pressed", String(index === 0));
        button.textContent = filter.label;
        buttonGroup.appendChild(button);
      });

    const status = document.createElement("output");
    status.className = "cyber-filter-status";
    status.setAttribute("aria-live", "polite");
    status.value = copy.showing(cards.length, cards.length);
    toolbar.append(buttonGroup, status);
    cardsContainer.before(toolbar);

    buttonGroup.addEventListener("click", event => {
      const button = event.target.closest("button[data-filter]");
      if (!button) return;
      const filter = button.dataset.filter;
      let visible = 0;

      buttonGroup.querySelectorAll("button").forEach(candidate => {
        candidate.setAttribute("aria-pressed", String(candidate === button));
      });

      cards.forEach(card => {
        const stack = splitStack(card.querySelector(".stack")?.textContent || "");
        const matches = filter === "all" || stack.includes(filter);
        card.hidden = !matches;
        if (matches) visible += 1;
      });

      status.value = copy.showing(visible, cards.length);
    });
  }

  function enhanceCyberpunk() {
    if (!document.body.classList.contains("theme-cyberpunk-visual-culture")) return;
    const language = document.documentElement.lang.startsWith("zh") ? "zh" : "en";
    const copy = COPY[language];
    decorateSurface(copy);
    buildProjectIndex(copy);
  }

  if (typeof window.addEventListener === "function") {
    window.addEventListener("DOMContentLoaded", enhanceCyberpunk, { once: true });
  }
})();
