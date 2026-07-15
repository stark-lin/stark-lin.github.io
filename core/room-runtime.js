(() => {
  "use strict";

  const ROOM_PATHS = [
    "01-purism/01-purism.html",
    "02-constructivism/02-constructivism.html",
    "03-suprematism/03-suprematism.html",
    "04-de-stijl/04-de-stijl.html"
  ];

  const COLOR_SCHEMES = [
    { bg: "#f4f1e8", surface: "#fffdf6", surface2: "#d9d3c5", text: "#151515", muted: "#5d5a52", accent: "#1858a8", accent2: "#d65b32", line: "#151515" },
    { bg: "#13202a", surface: "#1d2d38", surface2: "#28404d", text: "#f4f0df", muted: "#bdc6c6", accent: "#f2be22", accent2: "#5cc8bd", line: "#f4f0df" },
    { bg: "#efe8df", surface: "#fbf7ef", surface2: "#cfd9d3", text: "#201b1b", muted: "#665f5a", accent: "#a52a2a", accent2: "#19736f", line: "#201b1b" },
    { bg: "#e8e7e2", surface: "#f8f8f3", surface2: "#c9c6ce", text: "#17151b", muted: "#5e5965", accent: "#633f91", accent2: "#a4b52c", line: "#17151b" },
    { bg: "#152447", surface: "#20345d", surface2: "#304875", text: "#fff3cf", muted: "#c8c1ad", accent: "#f47b5f", accent2: "#f3cf45", line: "#fff3cf" },
    { bg: "#f0eee9", surface: "#ffffff", surface2: "#cfd5d8", text: "#172026", muted: "#58656b", accent: "#006d77", accent2: "#c4493d", line: "#172026" }
  ];

  const TEXT = {
    en: {
      nav: { entry: "Entry", archive: "Archive", contact: "Contact", again: "Again" },
      sections: { projects: "Projects", experience: "Experience", education: "Education", stack: "Working Stack", room: "Exhibition Note" },
      roomNumber: "Room",
      period: "Historical period",
      seed: "Seed",
      layout: "Current composition",
      details: "View implementation details",
      closeDetails: "Hide implementation details",
      repository: "Open repository",
      courseProject: "Course project",
      email: "Email",
      copy: "Copy this version",
      copied: "Version URL copied.",
      linkedinMissing: "LinkedIn is not listed in the source profile.",
      generate: "Generate another version",
      language: "中文",
      languageAria: "Switch to Chinese",
      firstVisitTitle: "This page is only one version.",
      firstVisitBody: "Roll again to enter another room.",
      dismiss: "Got it",
      scroll: "Continue through the archive",
      role: "Role",
      technology: "Technology"
    },
    zh: {
      nav: { entry: "入口", archive: "档案", contact: "联系", again: "再次生成" },
      sections: { projects: "项目", experience: "经历", education: "教育", stack: "技术栈", room: "展厅说明" },
      roomNumber: "展厅",
      period: "历史时期",
      seed: "Seed",
      layout: "当前构图",
      details: "查看实现细节",
      closeDetails: "收起实现细节",
      repository: "打开仓库",
      courseProject: "课程项目",
      email: "邮箱",
      copy: "复制当前版本",
      copied: "当前版本链接已复制。",
      linkedinMissing: "源档案中未提供 LinkedIn。",
      generate: "生成另一个版本",
      language: "EN",
      languageAria: "切换到英文",
      firstVisitTitle: "这只是其中一个版本。",
      firstVisitBody: "再次生成，进入另一个展厅。",
      dismiss: "知道了",
      scroll: "继续浏览档案",
      role: "角色",
      technology: "技术"
    }
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function cyrb128(value) {
    let h1 = 1779033703;
    let h2 = 3144134277;
    let h3 = 1013904242;
    let h4 = 2773480762;
    for (let index = 0; index < value.length; index += 1) {
      const code = value.charCodeAt(index);
      h1 = h2 ^ Math.imul(h1 ^ code, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ code, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ code, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ code, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
  }

  function createRng(value) {
    let [a, b, c, d] = cyrb128(value);
    return () => {
      a >>>= 0;
      b >>>= 0;
      c >>>= 0;
      d >>>= 0;
      let result = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      d = (d + 1) | 0;
      result = (result + d) | 0;
      c = (c + result) | 0;
      return (result >>> 0) / 4294967296;
    };
  }

  function deriveRng(seed, namespace) {
    return createRng(`${seed}::${namespace}`);
  }

  function pick(rng, values) {
    if (!values.length) throw new Error("Cannot pick from an empty collection.");
    return values[Math.floor(rng() * values.length)];
  }

  function shuffle(rng, values) {
    const result = [...values];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const other = Math.floor(rng() * (index + 1));
      [result[index], result[other]] = [result[other], result[index]];
    }
    return result;
  }

  function hash(value) {
    let result = 2166136261;
    for (const character of value) {
      result ^= character.codePointAt(0);
      result = Math.imul(result, 16777619);
    }
    return result >>> 0;
  }

  function createSeed() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return `SL-${[...bytes].map(byte => alphabet[byte % alphabet.length]).join("")}`;
  }

  function getLanguage() {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested === "zh" || requested === "en") return requested;
    return document.documentElement.lang.startsWith("zh") ? "zh" : "en";
  }

  function getSeed() {
    const url = new URL(window.location.href);
    const requested = url.searchParams.get("seed") || url.searchParams.get("id");
    const seed = requested?.trim().slice(0, 80) || createSeed();
    url.searchParams.delete("id");
    url.searchParams.set("seed", seed);
    if (!requested) url.searchParams.set("entry", "1");
    window.history.replaceState({ seed }, "", url);
    return seed;
  }

  function loadLocale(language) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = new URL(`../../assets/data/${language}.js`, window.location.href).href;
      script.onload = () => resolve(window.PORTFOLIO_LOCALE);
      script.onerror = () => reject(new Error(`Could not load locale: ${language}`));
      document.head.appendChild(script);
    });
  }

  function applyColorScheme(scheme) {
    const root = document.documentElement;
    Object.entries({
      "--color-bg": scheme.bg,
      "--color-surface": scheme.surface,
      "--color-surface-2": scheme.surface2,
      "--color-text": scheme.text,
      "--color-muted": scheme.muted,
      "--color-accent": scheme.accent,
      "--color-accent-2": scheme.accent2,
      "--color-line": scheme.line
    }).forEach(([property, value]) => root.style.setProperty(property, value));
  }

  function createModel(seed, language, locale, room) {
    const data = locale.data;
    const ui = locale.ui;
    const copyRng = deriveRng(seed, "copy");
    const middleRng = deriveRng(seed, "middle-order");
    const projectRng = deriveRng(seed, "projects");
    const descriptionRng = deriveRng(seed, "project-descriptions");
    const stackRng = deriveRng(seed, "working-stack");
    const colorRng = deriveRng(seed, "color");
    const descriptions = locale.descriptions || {};
    const labels = TEXT[language];

    const projects = shuffle(projectRng, data.projects).map(project => ({
      ...project,
      description: pick(descriptionRng, [...project.intros, ...(descriptions[project.id] || [])])
    }));
    const experience = {
      ...data.experienceProject,
      description: pick(descriptionRng, [...data.experienceProject.intros, ...(descriptions[data.experienceProject.id] || [])])
    };
    const showSecondary = deriveRng(seed, "hero-secondary")() < 0.75;
    const roomConfig = room.configure({
      seed,
      deriveRng: namespace => deriveRng(seed, namespace),
      pick,
      shuffle
    });

    return {
      seed,
      language,
      isZh: language === "zh",
      labels,
      data,
      ui,
      room,
      roomConfig,
      colorScheme: pick(colorRng, COLOR_SCHEMES),
      hero: {
        kicker: pick(copyRng, data.heroKickers),
        headline: pick(copyRng, data.heroHeadlines),
        secondary: showSecondary ? pick(copyRng, data.heroSubheads) : ""
      },
      middleOrder: [
        ...shuffle(middleRng, ["projects", "experience", "education", "working-stack"]),
        "room-introduction"
      ],
      projects,
      experience,
      education: { ...data.identity.education, body: pick(copyRng, data.educationBodies) },
      skills: shuffle(stackRng, ui.skills).map(([group, items]) => [group, shuffle(stackRng, items)]),
      contactCopy: pick(copyRng, data.contactCopies),
      contact: data.identity.contact
    };
  }

  function setDocumentMetadata(model) {
    document.documentElement.lang = model.isZh ? "zh-CN" : "en-US";
    document.body.dataset.room = model.room.id;
    document.body.dataset.seed = model.seed;
    document.title = model.isZh
      ? `Stark Lin — ${model.room.nameZh}`
      : `Stark Lin — ${model.room.nameEn}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = model.isZh ? model.room.curatorial.zh : model.room.curatorial.en;
  }

  function insertRenderedPage(rendered) {
    document.getElementById("site-navigation").innerHTML = rendered.navigation;
    document.getElementById("hero").innerHTML = rendered.hero;
    document.getElementById("middle-sequence").innerHTML = rendered.middle;
    document.getElementById("contact").innerHTML = rendered.contact;
    document.getElementById("roll-again").innerHTML = rendered.rollAgain;
    document.getElementById("room-loading").hidden = true;
    document.getElementById("room-page").hidden = false;
  }

  function setupProjectToggles(model) {
    document.querySelectorAll("[data-project-toggle]").forEach(button => {
      const details = document.getElementById(button.getAttribute("aria-controls"));
      if (!details) return;
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        button.textContent = expanded ? model.labels.details : model.labels.closeDetails;
        details.hidden = expanded;
      });
    });
  }

  function setupLanguageSwitch(model) {
    document.querySelectorAll("[data-language-switch]").forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
        const url = new URL(window.location.href);
        url.searchParams.set("lang", model.isZh ? "en" : "zh");
        url.searchParams.delete("entry");
        window.location.assign(url);
      });
    });
  }

  function getShareUrl() {
    const url = new URL(window.location.href);
    url.searchParams.delete("entry");
    return url.toString();
  }

  function showStatus(message) {
    const status = document.getElementById("status-message");
    status.textContent = message;
    status.hidden = false;
    window.setTimeout(() => { status.hidden = true; }, 1600);
  }

  function copyText(value, done) {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value).then(done).catch(() => fallbackCopy(value, done));
      return;
    }
    fallbackCopy(value, done);
  }

  function fallbackCopy(value, done) {
    const input = document.createElement("textarea");
    input.value = value;
    input.setAttribute("readonly", "");
    input.className = "sr-only";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
    done();
  }

  function setupCopy(model) {
    document.querySelectorAll("[data-copy-url]").forEach(button => {
      button.addEventListener("click", () => copyText(getShareUrl(), () => showStatus(model.labels.copied)));
    });
  }

  function nextRoomUrl(model, seed) {
    const roomIndex = hash(`${seed}::room`) % ROOM_PATHS.length;
    const url = new URL(`../${ROOM_PATHS[roomIndex]}`, window.location.href);
    url.searchParams.set("seed", seed);
    url.searchParams.set("lang", model.language);
    return url;
  }

  function setupRollAgain(model, rendered) {
    const button = document.querySelector("[data-roll-again]");
    if (!button) return;
    button.addEventListener("click", () => {
      const nextSeed = createSeed();
      const nextUrl = nextRoomUrl(model, nextSeed);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.body.classList.add("is-rolling");
      button.disabled = true;
      const delay = reducedMotion ? 0 : Math.min(rendered.transitionMs || 0, 900);
      window.setTimeout(() => window.location.assign(nextUrl), delay);
    });
  }

  function setupActiveNavigation() {
    const links = [...document.querySelectorAll("[data-nav-target]")];
    const sections = links.map(link => ({
      link,
      element: document.querySelector(link.getAttribute("href"))
    })).filter(item => item.element);
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = Math.min(window.innerHeight * 0.35, 220);
      let active = sections[0];
      sections.forEach(item => {
        if (item.element.getBoundingClientRect().top <= marker) active = item;
      });
      sections.forEach(item => {
        const current = item === active;
        item.link.classList.toggle("is-current", current);
        if (current) item.link.setAttribute("aria-current", "location");
        else item.link.removeAttribute("aria-current");
      });
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }

  function setupFirstVisit(model) {
    const params = new URLSearchParams(window.location.search);
    if (params.get("entry") !== "1") return;
    try {
      if (sessionStorage.getItem("portfolio-room-introduction") === "shown") return;
    } catch (_error) {
      // The prompt remains session-optional when storage is unavailable.
    }

    const roll = document.getElementById("roll-again");
    const prompt = document.getElementById("first-visit");
    const scrim = document.getElementById("first-visit-scrim");
    let visible = false;

    const dismiss = () => {
      if (!visible) return;
      visible = false;
      prompt.hidden = true;
      scrim.hidden = true;
      document.removeEventListener("keydown", onKeydown);
      try { sessionStorage.setItem("portfolio-room-introduction", "shown"); } catch (_error) { /* no-op */ }
    };
    const onKeydown = event => {
      if (event.key === "Escape") dismiss();
    };
    const show = () => {
      if (visible) return;
      visible = true;
      prompt.innerHTML = `
        <p><strong>${escapeHtml(model.labels.firstVisitTitle)}</strong></p>
        <p>${escapeHtml(model.labels.firstVisitBody)}</p>
        <button type="button" data-dismiss-first-visit>${escapeHtml(model.labels.dismiss)}</button>`;
      prompt.hidden = false;
      scrim.hidden = false;
      prompt.querySelector("button").addEventListener("click", dismiss);
      document.addEventListener("keydown", onKeydown);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer.disconnect();
          show();
        }
      }, { threshold: 0.35 });
      observer.observe(roll);
    }
  }

  async function start(room) {
    const language = getLanguage();
    const seed = getSeed();
    const selectedRoomIndex = hash(`${seed}::room`) % ROOM_PATHS.length;
    if (!ROOM_PATHS[selectedRoomIndex].startsWith(room.number)) {
      const canonicalUrl = new URL(`../${ROOM_PATHS[selectedRoomIndex]}`, window.location.href);
      canonicalUrl.search = window.location.search;
      canonicalUrl.searchParams.set("seed", seed);
      canonicalUrl.searchParams.set("lang", language);
      window.location.replace(canonicalUrl);
      return;
    }
    try {
      const locale = await loadLocale(language);
      const model = createModel(seed, language, locale, room);
      applyColorScheme(model.colorScheme);
      setDocumentMetadata(model);
      const rendered = room.render(model, { escapeHtml });
      insertRenderedPage(rendered);
      setupProjectToggles(model);
      setupLanguageSwitch(model);
      setupCopy(model);
      setupRollAgain(model, rendered);
      setupActiveNavigation();
      setupFirstVisit(model);
      window.__PORTFOLIO_ROOM_STATE__ = Object.freeze({
        seed: model.seed,
        language: model.language,
        room: model.room.id,
        middleOrder: [...model.middleOrder],
        projectOrder: model.projects.map(project => project.id),
        roomConfig: { ...model.roomConfig }
      });
    } catch (error) {
      const loading = document.getElementById("room-loading");
      loading.textContent = language === "zh" ? "展厅加载失败，请刷新重试。" : "The room could not be assembled. Please refresh.";
      console.error(error);
    }
  }

  window.RoomRuntime = Object.freeze({ start });
})();
