(() => {
  "use strict";

  const locale = window.PORTFOLIO_LOCALE;
  if (!locale) throw new Error("Portfolio locale data is missing.");
  const { data: DATA, descriptions: PROJECT_DESCRIPTION_POOLS, ui: UI } = locale;

    const STYLE_GENES = {
      density: [
        { variables: { "--style-site-width": "720px", "--style-card-padding": "16px", "--style-card-gap": "10px", "--style-section-padding-y": "42px", "--style-section-gap": "20px", "--style-hero-pad-top": "54px", "--style-hero-pad-bottom": "44px", "--style-hero-gap": "18px" } },
        { variables: { "--style-site-width": "780px", "--style-card-padding": "18px", "--style-card-gap": "12px", "--style-section-padding-y": "50px", "--style-section-gap": "22px", "--style-hero-pad-top": "58px", "--style-hero-pad-bottom": "48px", "--style-hero-gap": "20px" } },
        { variables: { "--style-site-width": "840px", "--style-card-padding": "20px", "--style-card-gap": "14px", "--style-section-padding-y": "58px", "--style-section-gap": "26px", "--style-hero-pad-top": "64px", "--style-hero-pad-bottom": "56px", "--style-hero-gap": "22px" } },
        { variables: { "--style-site-width": "900px", "--style-card-padding": "22px", "--style-card-gap": "15px", "--style-section-padding-y": "66px", "--style-section-gap": "28px", "--style-hero-pad-top": "72px", "--style-hero-pad-bottom": "62px", "--style-hero-gap": "24px" } },
        { variables: { "--style-site-width": "960px", "--style-card-padding": "24px", "--style-card-gap": "16px", "--style-section-padding-y": "74px", "--style-section-gap": "32px", "--style-hero-pad-top": "82px", "--style-hero-pad-bottom": "72px", "--style-hero-gap": "28px" } },
        { variables: { "--style-site-width": "1020px", "--style-card-padding": "26px", "--style-card-gap": "18px", "--style-section-padding-y": "82px", "--style-section-gap": "34px", "--style-hero-pad-top": "90px", "--style-hero-pad-bottom": "78px", "--style-hero-gap": "30px" } },
        { variables: { "--style-site-width": "1080px", "--style-card-padding": "28px", "--style-card-gap": "20px", "--style-section-padding-y": "90px", "--style-section-gap": "38px", "--style-hero-pad-top": "98px", "--style-hero-pad-bottom": "84px", "--style-hero-gap": "34px" } },
        { variables: { "--style-site-width": "940px", "--style-card-padding": "30px", "--style-card-gap": "22px", "--style-section-padding-y": "100px", "--style-section-gap": "42px", "--style-hero-pad-top": "110px", "--style-hero-pad-bottom": "92px", "--style-hero-gap": "38px" } },
        { variables: { "--style-site-width": "860px", "--style-card-padding": "21px", "--style-card-gap": "26px", "--style-section-padding-y": "76px", "--style-section-gap": "46px", "--style-hero-pad-top": "86px", "--style-hero-pad-bottom": "66px", "--style-hero-gap": "42px" } },
        { variables: { "--style-site-width": "1120px", "--style-card-padding": "32px", "--style-card-gap": "24px", "--style-section-padding-y": "104px", "--style-section-gap": "48px", "--style-hero-pad-top": "116px", "--style-hero-pad-bottom": "96px", "--style-hero-gap": "40px" } }
      ],
      border: [
        { variables: { "--style-border-width": "0px", "--style-border-style": "solid", "--style-section-border-width": "1px", "--style-section-border-style": "solid" } },
        { variables: { "--style-border-width": "1px", "--style-border-style": "solid", "--style-section-border-width": "1px", "--style-section-border-style": "solid" } },
        { variables: { "--style-border-width": "2px", "--style-border-style": "solid", "--style-section-border-width": "2px", "--style-section-border-style": "solid" } },
        { variables: { "--style-border-width": "1px", "--style-border-style": "dashed", "--style-section-border-width": "1px", "--style-section-border-style": "dashed" } },
        { variables: { "--style-border-width": "2px", "--style-border-style": "dashed", "--style-section-border-width": "1px", "--style-section-border-style": "solid" } },
        { variables: { "--style-border-width": "1px", "--style-border-style": "dotted", "--style-section-border-width": "1px", "--style-section-border-style": "dotted" } },
        { variables: { "--style-border-width": "3px", "--style-border-style": "double", "--style-section-border-width": "3px", "--style-section-border-style": "double" } },
        { variables: { "--style-border-width": "1px", "--style-border-style": "solid", "--style-section-border-width": "0px", "--style-section-border-style": "solid" } }
      ],
      shadow: [
        { variables: { "--style-card-shadow": "none", "--style-panel-shadow": "none", "--style-blur": "0px" } },
        { variables: { "--style-card-shadow": "0 8px 22px rgba(0,0,0,.04)", "--style-panel-shadow": "0 18px 58px rgba(0,0,0,.07)", "--style-blur": "8px" } },
        { variables: { "--style-card-shadow": "0 18px 60px rgba(0,0,0,.08)", "--style-panel-shadow": "0 26px 90px rgba(0,0,0,.10)", "--style-blur": "14px" } },
        { variables: { "--style-card-shadow": "inset 0 1px 0 color-mix(in srgb, var(--fg), transparent 88%)", "--style-panel-shadow": "inset 0 1px 0 color-mix(in srgb, var(--fg), transparent 84%)", "--style-blur": "18px" } },
        { variables: { "--style-card-shadow": "8px 8px 0 color-mix(in srgb, var(--accent), transparent 44%)", "--style-panel-shadow": "10px 10px 0 color-mix(in srgb, var(--accent), transparent 38%)", "--style-blur": "0px" } },
        { variables: { "--style-card-shadow": "0 1px 0 color-mix(in srgb, var(--fg), transparent 80%)", "--style-panel-shadow": "0 1px 0 color-mix(in srgb, var(--fg), transparent 76%)", "--style-blur": "0px" } },
        { variables: { "--style-card-shadow": "0 30px 90px rgba(0,0,0,.11)", "--style-panel-shadow": "0 42px 120px rgba(0,0,0,.15)", "--style-blur": "24px" } },
        { variables: { "--style-card-shadow": "-6px 6px 0 color-mix(in srgb, var(--fg), transparent 90%)", "--style-panel-shadow": "-8px 8px 0 color-mix(in srgb, var(--fg), transparent 86%)", "--style-blur": "4px" } },
        { variables: { "--style-card-shadow": "0 0 0 1px color-mix(in srgb, var(--accent), transparent 76%), 0 20px 70px rgba(0,0,0,.08)", "--style-panel-shadow": "0 0 0 1px color-mix(in srgb, var(--accent), transparent 70%), 0 34px 100px rgba(0,0,0,.11)", "--style-blur": "20px" } },
        { variables: { "--style-card-shadow": "0 0 0 999px rgba(255,255,255,.015) inset", "--style-panel-shadow": "0 0 0 999px rgba(255,255,255,.025) inset", "--style-blur": "12px" } }
      ],
      type: [
        { variables: { "--style-line-height": "1.42", "--style-h1-min": "44px", "--style-h1-fluid": "9vw", "--style-h1-max": "104px", "--style-h1-tracking": "-0.095em", "--style-h2-tracking": "-0.07em", "--style-h3-tracking": "-0.045em", "--style-desc-size": "18px", "--style-section-lead-size": "17px" } },
        { variables: { "--style-line-height": "1.48", "--style-h1-min": "40px", "--style-h1-fluid": "7.5vw", "--style-h1-max": "86px", "--style-h1-tracking": "-0.065em", "--style-h2-tracking": "-0.05em", "--style-h3-tracking": "-0.03em", "--style-desc-size": "17px", "--style-section-lead-size": "16px" } },
        { variables: { "--style-line-height": "1.6", "--style-h1-min": "42px", "--style-h1-fluid": "8vw", "--style-h1-max": "92px", "--style-h1-tracking": "-0.075em", "--style-h2-tracking": "-0.055em", "--style-h3-tracking": "-0.035em", "--style-desc-size": "18px", "--style-section-lead-size": "17px" } },
        { variables: { "--style-line-height": "1.68", "--style-h1-min": "38px", "--style-h1-fluid": "6.8vw", "--style-h1-max": "78px", "--style-h1-tracking": "-0.04em", "--style-h2-tracking": "-0.035em", "--style-h3-tracking": "-0.018em", "--style-desc-size": "19px", "--style-section-lead-size": "18px" } },
        { variables: { "--style-line-height": "1.52", "--style-h1-min": "46px", "--style-h1-fluid": "10vw", "--style-h1-max": "116px", "--style-h1-tracking": "-0.11em", "--style-h2-tracking": "-0.08em", "--style-h3-tracking": "-0.05em", "--style-desc-size": "17px", "--style-section-lead-size": "17px" } },
        { variables: { "--style-line-height": "1.5", "--style-h1-min": "36px", "--style-h1-fluid": "6vw", "--style-h1-max": "70px", "--style-h1-tracking": "-0.025em", "--style-h2-tracking": "-0.02em", "--style-h3-tracking": "-0.012em", "--style-desc-size": "16px", "--style-section-lead-size": "15px" } },
        { variables: { "--style-line-height": "1.74", "--style-h1-min": "42px", "--style-h1-fluid": "7vw", "--style-h1-max": "84px", "--style-h1-tracking": "-0.05em", "--style-h2-tracking": "-0.04em", "--style-h3-tracking": "-0.02em", "--style-desc-size": "20px", "--style-section-lead-size": "19px" } },
        { variables: { "--style-line-height": "1.36", "--style-h1-min": "48px", "--style-h1-fluid": "9.5vw", "--style-h1-max": "108px", "--style-h1-tracking": "-0.085em", "--style-h2-tracking": "-0.065em", "--style-h3-tracking": "-0.04em", "--style-desc-size": "16px", "--style-section-lead-size": "16px" } },
        { variables: { "--style-line-height": "1.58", "--style-h1-min": "41px", "--style-h1-fluid": "8.4vw", "--style-h1-max": "98px", "--style-h1-tracking": "-0.09em", "--style-h2-tracking": "-0.06em", "--style-h3-tracking": "-0.028em", "--style-desc-size": "19px", "--style-section-lead-size": "18px" } },
        { variables: { "--style-line-height": "1.46", "--style-h1-min": "39px", "--style-h1-fluid": "7.8vw", "--style-h1-max": "88px", "--style-h1-tracking": "-0.055em", "--style-h2-tracking": "-0.042em", "--style-h3-tracking": "-0.024em", "--style-desc-size": "17px", "--style-section-lead-size": "18px" } }
      ],
      chrome: [
        { variables: { "--style-title-rule-width": "0px", "--style-title-rule-padding": "0px", "--style-outline-width": "0px", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "1px", "--style-title-rule-padding": "12px", "--style-outline-width": "0px", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "2px", "--style-title-rule-padding": "14px", "--style-outline-width": "0px", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "0px", "--style-title-rule-padding": "0px", "--style-outline-width": "0px", "--style-outline-style": "solid", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "1px", "--style-title-rule-style": "dashed", "--style-title-rule-padding": "10px", "--style-outline-width": "0px", "--style-outline-style": "solid", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "0px", "--style-title-rule-padding": "0px", "--style-outline-width": "0px", "--style-outline-style": "solid", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "3px", "--style-title-rule-style": "double", "--style-title-rule-padding": "16px", "--style-outline-width": "0px", "--style-outline-offset": "0px" } },
        { variables: { "--style-title-rule-width": "1px", "--style-title-rule-style": "solid", "--style-title-rule-padding": "18px", "--style-outline-width": "0px", "--style-outline-style": "solid", "--style-outline-offset": "0px" } }
      ],
      rhythm: [
        { variables: { "--style-text-width": "620px", "--style-micro-opacity": ".72" } },
        { variables: { "--style-text-width": "680px", "--style-micro-opacity": ".82" } },
        { variables: { "--style-text-width": "720px", "--style-micro-opacity": ".9" } },
        { variables: { "--style-text-width": "760px", "--style-micro-opacity": "1" } },
        { variables: { "--style-text-width": "820px", "--style-micro-opacity": ".88" } },
        { variables: { "--style-text-width": "900px", "--style-micro-opacity": ".76" } },
        { variables: { "--style-text-width": "560px", "--style-micro-opacity": ".95" } },
        { variables: { "--style-text-width": "100%", "--style-micro-opacity": ".68" } }
      ],
      controls: [
        { variables: { "--style-button-y": "9px", "--style-button-x": "12px", "--style-button-size": "12px" } },
        { variables: { "--style-button-y": "10px", "--style-button-x": "14px", "--style-button-size": "13px" } },
        { variables: { "--style-button-y": "12px", "--style-button-x": "16px", "--style-button-size": "14px" } },
        { variables: { "--style-button-y": "13px", "--style-button-x": "18px", "--style-button-size": "14px" } },
        { variables: { "--style-button-y": "14px", "--style-button-x": "22px", "--style-button-size": "15px" } },
        { variables: { "--style-button-y": "11px", "--style-button-x": "20px", "--style-button-size": "12px" } },
        { variables: { "--style-button-y": "15px", "--style-button-x": "18px", "--style-button-size": "16px" } },
        { variables: { "--style-button-y": "8px", "--style-button-x": "18px", "--style-button-size": "13px" } }
      ],
      index: [
        { variables: { "--style-index-box-border-width": "0px", "--style-index-box-padding": "0px", "--style-meta-transform": "uppercase", "--style-meta-spacing": ".08em" } },
        { variables: { "--style-index-box-border-width": "1px", "--style-index-box-padding": "6px 8px", "--style-meta-transform": "uppercase", "--style-meta-spacing": ".1em" } },
        { variables: { "--style-index-box-border-width": "1px", "--style-index-box-padding": "8px 10px", "--style-meta-transform": "none", "--style-meta-spacing": ".02em" } },
        { variables: { "--style-index-box-border-width": "2px", "--style-index-box-padding": "7px 9px", "--style-meta-transform": "uppercase", "--style-meta-spacing": ".14em" } },
        { variables: { "--style-index-box-border-width": "0px", "--style-index-box-padding": "0px", "--style-meta-transform": "lowercase", "--style-meta-spacing": ".04em" } },
        { variables: { "--style-index-box-border-width": "1px", "--style-index-box-padding": "4px 12px", "--style-meta-transform": "uppercase", "--style-meta-spacing": ".18em" } },
        { variables: { "--style-index-box-border-width": "0px", "--style-index-box-padding": "0px", "--style-meta-transform": "none", "--style-meta-spacing": "0" } },
        { variables: { "--style-index-box-border-width": "1px", "--style-index-box-padding": "10px 12px", "--style-meta-transform": "uppercase", "--style-meta-spacing": ".06em" } }
      ]
    };

    function styleGeneSpace() {
      return DATA.surfaceStyles.length * Object.values(STYLE_GENES).reduce((total, options) => total * options.length, 1);
    }

    function chooseGene(rng, options) {
      const index = Math.floor(rng() * options.length);
      return { index, option: options[index] };
    }

    function createStyleGenome(rng) {
      const modeIndex = Math.floor(rng() * DATA.surfaceStyles.length);
      const mode = DATA.surfaceStyles[modeIndex];
      const variables = {};
      const signature = [modeIndex];

      Object.entries(STYLE_GENES).forEach(([name, options]) => {
        const { index, option } = chooseGene(rng, options);
        signature.push(index);
        Object.assign(variables, option.variables);
      });

      return {
        id: "SG-" + signature.map(value => value.toString(36).toUpperCase()).join(""),
        mode,
        variables,
        space: styleGeneSpace()
      };
    }


    function cyrb128(str) {
      let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
      for (let i = 0; i < str.length; i++) {
        const k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
      }
      h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
      h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
      h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
      h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
      return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
    }

    function sfc32(a, b, c, d) {
      return function() {
        a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
        let t = (a + b) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        d = (d + 1) | 0;
        t = (t + d) | 0;
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      }
    }

    function createRandom(seed) {
      const [a, b, c, d] = cyrb128(seed);
      return sfc32(a, b, c, d);
    }

    function pick(rng, arr) {
      return arr[Math.floor(rng() * arr.length)];
    }

    function shuffle(rng, arr) {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    function pickN(rng, arr, n) {
      return shuffle(rng, arr).slice(0, n);
    }

    function createShortSeed() {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      let seed = "LS-";
      for (const byte of bytes) seed += chars[byte % chars.length];
      return seed;
    }

    function getSeed() {
      const params = new URLSearchParams(window.location.search);
      let seed = params.get("seed");
      if (!seed) {
        seed = createShortSeed();
        const url = new URL(window.location.href);
        url.searchParams.set("seed", seed);
        window.history.replaceState(null, "", url);
      }
      return seed;
    }

    function generateConfig(seed) {
      const rng = createRandom(seed);
      const layout = "single";
      const colorTheme = pick(rng, DATA.colorThemes);
      const backgroundStyle = pick(rng, DATA.backgroundStyles);
      const styleGenome = createStyleGenome(rng);
      const surfaceStyle = styleGenome.mode;
      const shapeStyle = pick(rng, DATA.shapeStyles);
      const educationPlacement = pick(rng, ["hero", "section"]);
      const sectionPool = ["work", "experience", "principles", "skills", "now"];
      if (educationPlacement === "section") sectionPool.push("education");
      const sections = shuffle(rng, sectionPool);
      const projects = shuffle(rng, DATA.projects).map(project => {
        const descriptionPool = PROJECT_DESCRIPTION_POOLS[project.id] || project.intros;
        return {
          ...project,
          intro: pick(rng, project.intros),
          description: pick(rng, descriptionPool),
          descriptionMode: pick(rng, UI.descriptionModes),
          tag: pick(rng, project.tags)
        };
      });

      const experienceSource = DATA.experienceProject;
      const experienceDescriptionPool = PROJECT_DESCRIPTION_POOLS[experienceSource.id] || experienceSource.intros;
      const experienceProject = {
        ...experienceSource,
        intro: pick(rng, experienceSource.intros),
        description: pick(rng, experienceDescriptionPool),
        descriptionMode: pick(rng, UI.descriptionModes),
        tag: pick(rng, experienceSource.tags)
      };

      return {
        seed,
        layout,
        colorTheme,
        backgroundStyle,
        surfaceStyle,
        styleGenome,
        shapeStyle,
        educationPlacement,
        motion: pick(rng, DATA.motions),
        tone: pick(rng, DATA.tones),
        bias: pick(rng, DATA.biases),
        rarity: pick(rng, ["Common", "Common", "Rare", "Rare", "Epic", "Glitch"]),
        kicker: pick(rng, DATA.heroKickers),
        headline: pick(rng, DATA.heroHeadlines),
        subhead: pick(rng, DATA.heroSubheads),
        sections,
        projects,
        experienceProject,
        principles: pickN(rng, DATA.principles, 4),
        currentState: pick(rng, DATA.currentStates),
        educationBody: pick(rng, DATA.educationBodies),
        contactCopy: pick(rng, DATA.contactCopies),
        revealCopy: pick(rng, DATA.revealCopies),
        leads: Object.fromEntries(Object.entries(DATA.sectionLeads).map(([key, values]) => [key, pick(rng, values)]))
      };
    }

    function escapeHtml(str) {
      return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function renderShell() {
      const { shell } = UI;
      document.body.innerHTML = `
        <div class="regenerating" id="regenerating" aria-hidden="true">
          <div class="regen-box">
            ${shell.regenerating.map((line, index) => `<div class="regen-line${index === 0 ? " active" : ""}">${escapeHtml(line)}</div>`).join("")}
          </div>
        </div>
        <header class="topbar">
          <div class="topbar-inner">
            <a class="brand" href="#top" aria-label="${escapeHtml(shell.brandAria)}">
              <span class="brand-mark">LS</span>
              <span>Lin Stark</span>
            </a>
            <nav id="nav" aria-label="${escapeHtml(shell.navAria)}"></nav>
          </div>
        </header>
        <div class="site" id="top">
          <section class="hero" id="hero"></section>
          <main id="main"></main>
          <section class="reveal" id="reveal"></section>
          <section class="complete-version" id="completeVersion" hidden></section>
      <footer class="tiny-footer">
        <span>© 2026 Lin Stark</span>
        <span>${escapeHtml(shell.footer)}</span>
        <span>
          <a href="https://github.com/stark-lin/stark-lin.github.io" target="_blank" rel="noreferrer">${escapeHtml(shell.sourceLabel)}</a>
          · <a href="./LICENSE">AGPL-3.0</a>
        </span>
      </footer>
        </div>
        <div class="toast" id="toast">${escapeHtml(shell.copied)}</div>
      `;
    }

    function renderNav(config) {
      document.getElementById("nav").innerHTML = [...config.sections, "contact"]
        .map(id => `<a href="#${id}">${escapeHtml(UI.nav[id])}</a>`)
        .join("");
    }

    function renderHero(config) {
      const summaryCard = config.educationPlacement === "hero" ? `
        <aside class="hero-card" aria-label="${escapeHtml(UI.profileSummary.ariaLabel)}">
          <div class="stat-grid">
            ${UI.profileSummary.items.map(([label, value]) => `
              <div class="stat">
                <div class="stat-label">${escapeHtml(label)}</div>
                <div class="stat-value">${escapeHtml(value)}</div>
              </div>
            `).join("")}
          </div>
        </aside>
      ` : "";
    
      document.getElementById("hero").innerHTML = `
        <div class="hero-grid fade-in">
          <div>
            <div class="kicker">${escapeHtml(config.kicker)}</div>
            <h1>${escapeHtml(config.headline)}</h1>
            <p class="hero-sub">${escapeHtml(config.subhead)}</p>
            <div class="hero-actions">
              <a class="button" href="#work">${escapeHtml(UI.heroActions.work)}</a>
              <a class="button secondary" href="#contact">${escapeHtml(UI.heroActions.contact)}</a>
            </div>
          </div>
          ${summaryCard}
        </div>
      `;
    }

    function sectionShell(index, id, title, lead, body) {
      return `
        <section class="section" id="${id}">
          <div class="section-head">
            <div class="section-index">${String(index).padStart(2, "0")} / ${escapeHtml(id)}</div>
            <div>
              <h2>${escapeHtml(title)}</h2>
              <p class="section-lead">${escapeHtml(lead)}</p>
            </div>
          </div>
          ${body}
        </section>
      `;
    }

    function renderWork(config, index) {
      const cards = config.projects.map((project, i) => `
        <article class="card ${i === 0 ? "full" : ""}">
          <div class="card-title-row">
            <div>
              <h3>${escapeHtml(project.title)} — ${escapeHtml(project.subtitle)}</h3>
              <div class="stack">${escapeHtml(project.stack)}</div>
            </div>
            <span class="tag">${escapeHtml(project.tag)}</span>
          </div>
          <div class="generated-desc-meta">${escapeHtml(UI.labels.projectNote)} · ${escapeHtml(project.descriptionMode)}</div>
          <p class="generated-description">${escapeHtml(project.description)}</p>
          ${project.url.startsWith("http") ? `<p style="margin-top:18px"><a href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">${escapeHtml(UI.labels.openRepository)}</a></p>` : ""}
        </article>
      `).join("");
    
      return sectionShell(index, "work", UI.sectionTitles.work, config.leads.work, `<div class="cards">${cards}</div>`);
    }

    function renderExperience(config, index) {
      const project = config.experienceProject;
      const body = `
        <div class="timeline">
          <article class="timeline-item">
            <div class="time-label">${escapeHtml(UI.labels.courseProject)}</div>
            <div>
              <h3>${escapeHtml(project.title)}</h3>
              <div class="stack">${escapeHtml(project.subtitle)}</div>
              <div class="generated-desc-meta">${escapeHtml(UI.labels.projectNote)} · ${escapeHtml(project.descriptionMode || UI.labels.defaultProjectSlice)}</div>
              <p class="generated-description">${escapeHtml(project.description || project.intros[0])}</p>
            </div>
          </article>
        </div>
      `;
      return sectionShell(index, "experience", UI.sectionTitles.experience, config.leads.experience, body);
    }

    function renderEducation(config, index) {
      const education = DATA.identity.education;
      const body = `
        <div class="cards">
          <article class="card full">
            <div class="card-title-row">
              <div>
                <h3>${escapeHtml(education.school)}</h3>
                <div class="stack">${escapeHtml(education.degree)}</div>
              </div>
              <span class="tag">${escapeHtml(education.graduation)}</span>
            </div>
            <p>${escapeHtml(config.educationBody)}</p>
          </article>
        </div>
      `;
      return sectionShell(index, "education", UI.sectionTitles.education, config.leads.education, body);
    }

    function renderPrinciples(config, index) {
      const body = `
        <div class="principles">
          ${config.principles.map((principle, i) => `<div class="principle"><span class="tag">P${String(i + 1).padStart(2, "0")}</span><p style="margin-top:16px">${escapeHtml(principle)}</p></div>`).join("")}
        </div>
      `;
      return sectionShell(index, "principles", UI.sectionTitles.principles, config.leads.principles, body);
    }

    function renderSkills(config, index) {
      const body = `
        <div class="cards">
          ${UI.skills.map(([title, skills]) => `
            <article class="card third">
              <h3>${escapeHtml(title)}</h3>
              <div class="skill-cloud" style="margin-top:18px">
                ${skills.map(skill => `<span class="skill-pill">${escapeHtml(skill)}</span>`).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      `;
      return sectionShell(index, "skills", UI.sectionTitles.skills, config.leads.skills, body);
    }

    function renderNow(config, index) {
      const body = `
        <div class="cards">
          <article class="card full">
            <div class="card-title-row">
              <h3>${escapeHtml(config.currentState.title)}</h3>
              <span class="tag">${escapeHtml(UI.labels.now)}</span>
            </div>
            <p>${escapeHtml(config.currentState.body)}</p>
          </article>
        </div>
      `;
      return sectionShell(index, "now", UI.sectionTitles.now, config.leads.now, body);
    }

    function renderContact(config, index) {
      return sectionShell(index, "contact", UI.sectionTitles.contact, config.leads.contact, `
        <div class="contact-panel">
          <div>
            <h2>${escapeHtml(config.contactCopy.headline)}</h2>
            <p class="section-lead">${escapeHtml(config.contactCopy.body)}</p>
          </div>
          <div class="contact-links">
            <a class="button" href="mailto:${escapeHtml(DATA.identity.contact.email)}">${escapeHtml(UI.labels.email)}</a>
            <a class="button secondary" href="${escapeHtml(DATA.identity.contact.github)}" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      `);
    }

    function renderCompleteVersion(config, forceShow = false) {
      const params = new URLSearchParams(window.location.search);
      const shouldShow = forceShow || params.get("complete") === "1";
      const complete = document.getElementById("completeVersion");
      complete.hidden = !shouldShow;
      if (!shouldShow) return;
    
      const projects = DATA.projects.map(project => `
        <article class="card complete-project">
          <div class="card-title-row">
            <div>
              <h3>${escapeHtml(project.title)} — ${escapeHtml(project.subtitle)}</h3>
              <div class="stack">${escapeHtml(project.stack)}</div>
            </div>
            <span class="tag">${escapeHtml(UI.labels.fullRecord)}</span>
          </div>
          <div class="generated-desc-meta">${escapeHtml(UI.labels.projectSummaries)}</div>
          <div class="intro-list">
            ${project.intros.map(intro => `<p>${escapeHtml(intro)}</p>`).join("")}
            ${(PROJECT_DESCRIPTION_POOLS[project.id] || []).map(description => `<p>${escapeHtml(description)}</p>`).join("")}
          </div>
          <div class="generated-desc-meta" style="margin-top:22px">${escapeHtml(UI.labels.implementationNotes)}</div>
          <ul>${project.bullets.map(bullet => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
          ${project.url.startsWith("http") ? `<p style="margin-top:16px"><a href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">${escapeHtml(UI.labels.openRepository)}</a></p>` : ""}
        </article>
      `).join("");
    
      const education = DATA.identity.education;
      complete.innerHTML = `
        <div class="complete-head">
          <div class="section-index">${escapeHtml(UI.labels.completeIndex)}</div>
          <div>
            <h2>${escapeHtml(UI.labels.completeTitle)}</h2>
            <p class="section-lead">${escapeHtml(UI.labels.completeLead)}</p>
          </div>
        </div>
        <div class="cards">
          <article class="card full">
            <div class="card-title-row">
              <div>
                <h3>${escapeHtml(education.school)}</h3>
                <div class="stack">${escapeHtml(education.degree)}</div>
              </div>
              <span class="tag">${escapeHtml(education.graduation)}</span>
            </div>
            <p>${escapeHtml(DATA.identity.stableLine)}</p>
          </article>
          ${projects}
        </div>
      `;
    }

    function showCompleteVersion(config) {
      const url = new URL(window.location.href);
      url.searchParams.set("complete", "1");
      window.history.replaceState(null, "", url.toString());
      renderCompleteVersion(config, true);
      document.getElementById("completeVersion").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function renderMain(config) {
      const renderers = {
        work: renderWork,
        experience: renderExperience,
        education: renderEducation,
        principles: renderPrinciples,
        skills: renderSkills,
        now: renderNow
      };
      const sections = config.sections.map((key, i) => renderers[key](config, i + 1)).join("");
      document.getElementById("main").innerHTML = sections + renderContact(config, config.sections.length + 1);
    }

    function renderReveal(config) {
      const reveal = document.getElementById("reveal");
      reveal.innerHTML = `
        <div class="kicker">${escapeHtml(config.revealCopy.kicker)}</div>
        <h2>${escapeHtml(config.revealCopy.headline)}</h2>
        <p style="margin-top:18px">${escapeHtml(config.revealCopy.body)}</p>
        <div class="reveal-grid">
          <div class="reveal-stat">
            <div class="reveal-stat-label">${escapeHtml(UI.labels.referenceCode)}</div>
            <div class="reveal-stat-value">${escapeHtml(config.seed)}</div>
          </div>
        </div>
        <div class="reveal-actions">
          <button class="button" id="rollAgain">${escapeHtml(UI.labels.refreshView)}</button>
          <button class="button secondary" id="copyVersion">${escapeHtml(UI.labels.copyView)}</button>
          <button class="button secondary" id="copySeed">${escapeHtml(UI.labels.copySeed)}</button>
          <button class="button secondary surrender" id="surrenderComplete">${escapeHtml(UI.labels.showComplete)}</button>
        </div>
      `;
    
      document.getElementById("rollAgain").addEventListener("click", rollAgain);
      document.getElementById("copyVersion").addEventListener("click", () => copyText(window.location.href, UI.labels.viewCopied));
      document.getElementById("copySeed").addEventListener("click", () => copyText(config.seed, UI.labels.seedCopied));
      document.getElementById("surrenderComplete").addEventListener("click", () => showCompleteVersion(config));
    }

    function copyText(text, message) {
      navigator.clipboard.writeText(text).then(() => showToast(message)).catch(() => {
        const input = document.createElement("input");
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
        showToast(message);
      });
    }

    function showToast(message) {
      const toast = document.getElementById("toast");
      toast.textContent = message;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1400);
    }

    function rollAgain() {
      const overlay = document.getElementById("regenerating");
      overlay.classList.add("active");
      const lines = [...overlay.querySelectorAll(".regen-line")];
      lines.forEach((line, index) => {
        setTimeout(() => line.classList.add("active"), index * 210);
      });
      setTimeout(() => {
        const seed = createShortSeed();
        const url = new URL(window.location.href);
        url.searchParams.set("seed", seed);
        window.location.href = url.toString();
      }, 980);
    }

    function applyStyleGenome(styleGenome) {
      Object.entries(styleGenome.variables).forEach(([property, value]) => {
        document.body.style.setProperty(property, value);
      });
      document.documentElement.dataset.styleGenome = styleGenome.id;
    }

    function applyBodyClass(config) {
      document.body.className = [
        `theme-${config.colorTheme}`,
        `bg-${config.backgroundStyle}`,
        `style-${config.surfaceStyle}`,
        `shape-${config.shapeStyle}`,
        "style-generated",
        "layout-single"
      ].join(" ");
      applyStyleGenome(config.styleGenome);
    }

    function init() {
      renderShell();
      const seed = getSeed();
      const config = generateConfig(seed);
      applyBodyClass(config);
      renderNav(config);
      renderHero(config);
      renderMain(config);
      renderReveal(config);
      renderCompleteVersion(config);
    }

    init();
})();
