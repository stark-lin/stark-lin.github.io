(() => {
  "use strict";

  const locale = window.PORTFOLIO_LOCALE;
  if (!locale) throw new Error("Portfolio locale data is missing.");
  const selection = window.PORTFOLIO_SELECTION;
  if (!selection) throw new Error("Portfolio selection engine is missing.");
  const { createPoolRandom, pick, pickN, seedModulo, shuffle } = selection;
  const { data: DATA, descriptions: PROJECT_DESCRIPTION_POOLS, titlePhrases: TITLE_PHRASES = {}, ui: UI } = locale;
  const registeredStyles = window.PORTFOLIO_STYLE_POOL;
  if (!Array.isArray(registeredStyles) || registeredStyles.length === 0) {
    throw new Error("Portfolio style pool is missing or empty.");
  }
  const STYLE_POOL = Object.freeze([...registeredStyles]);
  const POOL_STREAMS = Object.freeze({
    copy: Object.freeze({ name: "copy", version: 1 })
  });
  const VIEW_LABELS = Object.freeze({ GUIDE: "guide", SURFACE: "surface" });
  const ENTRY_ROOT = window.PORTFOLIO_ENTRY_ROOT || "./";
  const SAFE_BILINGUAL_QUIPS = [
    { zh: "这页会变，但不是在逃避责任。", en: "This page changes, but it is not dodging responsibility." },
    { zh: "随机的是外观，固定的是链接能点。", en: "The surface is random. The links are reliably clickable." },
    { zh: "如果这版不好看，至少它诚实地不好看。", en: "If this version is not pretty, at least it is honestly not pretty." },
    { zh: "主页负责变脸，项目负责站稳。", en: "The homepage changes faces. The projects hold their ground." },
    { zh: "这不是模板失效，是模板没有被邀请。", en: "This is not template failure. The template was not invited." },
    { zh: "风格可以抽签，工程不能靠抽签。", en: "Style can be drawn by lot. Engineering cannot." },
    { zh: "刷新一下，看看 CSS 今天想做什么。", en: "Refresh and see what CSS wants to do today." },
    { zh: "内容很认真，只是外壳不想穿正装。", en: "The content is serious. The shell just refuses formalwear." },
    { zh: "这是一个会换衣服的主页，不是一个会换项目的人。", en: "This is a homepage that changes outfits, not a person changing projects." },
    { zh: "如果你看到了奇怪边框，那是页面在热身。", en: "If you see a strange border, the page is warming up." },
    { zh: "它不保证优雅，但保证不是默认配置。", en: "It does not guarantee elegance. It guarantees non-default settings." },
    { zh: "项目是真的，皮肤是随机的。", en: "The projects are real. The skin is randomized." },
    { zh: "这页没有迷路，只是在走一条不太常规的路。", en: "This page is not lost. It is taking a less conventional route." },
    { zh: "页面风格可以冒险，信息结构不能失踪。", en: "The visual style may take risks. The information structure cannot disappear." },
    { zh: "这不是花哨，是给刷新按钮一点工作。", en: "This is not decoration. It is giving the refresh button a job." },
    { zh: "如果这版像实验记录，那说明实验还活着。", en: "If this version looks like a lab note, the experiment is still alive." },
    { zh: "同一个作者，不同的 CSS 天气。", en: "Same author, different CSS weather." },
    { zh: "随机页面，固定邮箱，基本职业道德。", en: "Random page, fixed email, basic professional discipline." },
    { zh: "这页比较会变通，但不会把仓库地址变没。", en: "This page is flexible, but it will not hide the repository links." },
    { zh: "简历负责直线叙事，这页负责旁边开一扇窗。", en: "The resume keeps the straight line. This page opens a side window." },
    { zh: "视觉上可以有脾气，语义上必须讲道理。", en: "The visuals may have attitude. The semantics must make sense." },
    { zh: "如果你觉得这页太安静，它可能还没抽到响亮配色。", en: "If this page feels too quiet, it may not have drawn a loud palette yet." },
    { zh: "这不是个人品牌，是个人接口。", en: "This is not personal branding. It is a personal interface." },
    { zh: "每次刷新都像小型改版，但不用开会。", en: "Every refresh feels like a tiny redesign, without a meeting." },
    { zh: "它有时像档案，有时像便利贴墙，但都能点开项目。", en: "Sometimes it is a dossier, sometimes a wall of sticky notes. The projects still open." },
    { zh: "这页不是为了显得完美，是为了显得有人在场。", en: "This page is not trying to look perfect. It is trying to show someone is present." },
    { zh: "如果它看起来像草稿，那也是可部署草稿。", en: "If it looks like a draft, it is still a deployable draft." },
    { zh: "主页在换装，后端在值班。", en: "The homepage is changing outfits. The backend is on duty." },
    { zh: "我没有隐藏个性，只是给它加了版本号。", en: "I did not hide personality. I gave it a version number." },
    { zh: "随机不是借口，是一种有 ID 的展示方式。", en: "Randomness is not an excuse. It is presentation with an ID." },
    { zh: "这页没有端着，但也没有乱扔信息。", en: "This page is not stiff, but it does not throw information around." },
    { zh: "外观在抽样，判断没有抽样。", en: "The appearance is sampled. The judgment is not." },
    { zh: "如果这版很顺眼，那是算法今天比较客气。", en: "If this version looks pleasant, the algorithm is being polite today." },
    { zh: "如果这版不顺眼，那也是一个可复现结论。", en: "If this version does not look pleasant, that is still a reproducible result." },
    { zh: "项目列表很短，因为噪音不参与部署。", en: "The project list is short because noise does not get deployed." },
    { zh: "这页在认真和不正经之间做负载均衡。", en: "This page load-balances between serious and unserious." },
    { zh: "它不是完美主页，它是一个有证据的入口。", en: "It is not a perfect homepage. It is an entry point with evidence." },
    { zh: "刷新按钮不是逃生门，是换镜头。", en: "The refresh button is not an escape hatch. It is a camera cut." },
    { zh: "这页的目标不是赢设计奖，是让合适的人多看一眼。", en: "The goal is not to win a design award. It is to make the right person look twice." }
  ];
  const LAYOUT_POOL = Object.freeze({
    educationPlacements: Object.freeze(["hero", "section"]),
    sections: Object.freeze(["work", "experience", "principles", "skills"])
  });

  const SYSTEM_CONFIG = Object.freeze({
    idPrefix: "SL-",
    idLength: 42,
    idCharacters: "0123456789ABCDEF",
    styleModulo: 42
  });

  const TITLE_TYPOGRAPHY = Object.freeze({
    safeGutter: 12,
    mobileBreakpoint: 520,
    h1: Object.freeze({ minLeading: 0.88, minLeadingZh: 1.05, mobileMaxSizeRatio: 0.18 }),
    h2: Object.freeze({ minLeading: 0.94, minLeadingZh: 1.08, mobileMaxSizeRatio: 0.15 }),
    h3: Object.freeze({ minLeading: 1.05, minLeadingZh: 1.18, mobileMaxSizeRatio: 0.105 })
  });

  const COPY_POOL = Object.freeze({
    kickers: DATA.heroKickers,
    headlines: DATA.heroHeadlines,
    subheads: DATA.heroSubheads,
    principles: DATA.principles,
    educationBodies: DATA.educationBodies,
    contactCopies: DATA.contactCopies,
    revealCopies: DATA.revealCopies,
    sectionLeads: DATA.sectionLeads,
    footerQuips: SAFE_BILINGUAL_QUIPS,
    descriptionModes: UI.descriptionModes,
    projects: DATA.projects.map(project => ({
      record: project,
      descriptions: [...project.intros, ...(PROJECT_DESCRIPTION_POOLS[project.id] || [])],
      tags: project.tags
    })),
    experienceProject: {
      record: DATA.experienceProject,
      descriptions: [
        ...DATA.experienceProject.intros,
        ...(PROJECT_DESCRIPTION_POOLS[DATA.experienceProject.id] || [])
      ],
      tags: DATA.experienceProject.tags
    },
    skills: UI.skills
  });

  function createStream(id, stream) {
    return createPoolRandom(id, stream.name, stream.version);
  }

  function validateStylePool() {
    const ids = new Set();
    const forcedStyleId = window.PORTFOLIO_FORCED_STYLE_ID;
    const expectedStyleCount = forcedStyleId ? 1 : SYSTEM_CONFIG.styleModulo;

    if (STYLE_POOL.length !== expectedStyleCount) {
      throw new Error(`Style pool must contain exactly ${expectedStyleCount} ${forcedStyleId ? "forced preview" : "catalog"} ${expectedStyleCount === 1 ? "entry" : "entries"}.`);
    }

    STYLE_POOL.forEach((style, index) => {
      if (!style || typeof style.id !== "string" || !style.id.trim()) {
        throw new Error(`Style pool entry ${index} requires a non-empty id.`);
      }
      if (ids.has(style.id)) throw new Error(`Style pool contains duplicate id "${style.id}".`);
      if (!Array.isArray(style.classNames) || style.classNames.length === 0) {
        throw new Error(`Style "${style.id}" requires at least one body class.`);
      }
      for (const localeKey of ["en", "zh"]) {
        if (typeof style.label?.[localeKey] !== "string" || !style.label[localeKey].trim()) {
          throw new Error(`Style "${style.id}" requires a ${localeKey} label.`);
        }
        if (typeof style.introduction?.[localeKey] !== "string" || !style.introduction[localeKey].trim()) {
          throw new Error(`Style "${style.id}" requires a ${localeKey} introduction.`);
        }
      }
      if (typeof style.period !== "string" || !style.period.trim()) {
        throw new Error(`Style "${style.id}" requires a period label.`);
      }
      ids.add(style.id);
    });

    if (forcedStyleId && !ids.has(forcedStyleId)) {
      throw new Error(`Forced style "${forcedStyleId}" is not registered by this preview.`);
    }
  }

  validateStylePool();

    function createShortId() {
      const { idPrefix, idLength, idCharacters } = SYSTEM_CONFIG;
      const bytes = new Uint8Array(idLength);
      const unbiasedLimit = 256 - (256 % idCharacters.length);
      let id = idPrefix;

      while (id.length < idPrefix.length + idLength) {
        crypto.getRandomValues(bytes);
        for (const byte of bytes) {
          if (byte >= unbiasedLimit) continue;
          id += idCharacters[byte % idCharacters.length];
          if (id.length === idPrefix.length + idLength) break;
        }
      }
      return id;
    }

    function getId() {
      const params = new URLSearchParams(window.location.search);
      const requestedId = params.get("id");
      const needsGeneratedId = !requestedId || requestedId === SYSTEM_CONFIG.idPrefix;
      const id = needsGeneratedId ? createShortId() : requestedId;
      const label = params.get("label");

      if (needsGeneratedId || !Object.values(VIEW_LABELS).includes(label)) {
        const url = new URL(window.location.href);
        url.searchParams.set("id", id);
        if (!Object.values(VIEW_LABELS).includes(label)) {
          url.searchParams.set("label", VIEW_LABELS.GUIDE);
        }
        window.history.replaceState(null, "", url);
      }
      return id;
    }

    function getViewLabel() {
      return new URLSearchParams(window.location.search).get("label") === VIEW_LABELS.SURFACE
        ? VIEW_LABELS.SURFACE
        : VIEW_LABELS.GUIDE;
    }

    function setViewLabel(label) {
      const url = new URL(window.location.href);
      url.searchParams.set("label", label);
      window.history.replaceState(null, "", url);
    }

    function getSurfaceUrl() {
      const url = new URL(window.location.href);
      url.searchParams.set("label", VIEW_LABELS.SURFACE);
      return url.toString();
    }

    function generateCopyConfig(id) {
      const rng = createStream(id, POOL_STREAMS.copy);
      const layout = "single";
      const educationPlacement = pick(rng, LAYOUT_POOL.educationPlacements);
      const sectionPool = [...LAYOUT_POOL.sections];
      if (educationPlacement === "section") sectionPool.push("education");
      const sections = shuffle(rng, sectionPool);
      const projects = shuffle(rng, COPY_POOL.projects).map(source => {
        return {
          ...source.record,
          description: pick(rng, source.descriptions),
          descriptionMode: pick(rng, COPY_POOL.descriptionModes),
          tag: pick(rng, source.tags)
        };
      });

      const experienceSource = COPY_POOL.experienceProject;
      const experienceProject = {
        ...experienceSource.record,
        description: pick(rng, experienceSource.descriptions),
        descriptionMode: pick(rng, COPY_POOL.descriptionModes),
        tag: pick(rng, experienceSource.tags)
      };

      const config = {
        id,
        layout,
        educationPlacement,
        kicker: pick(rng, COPY_POOL.kickers),
        headline: pick(rng, COPY_POOL.headlines),
        subhead: pick(rng, COPY_POOL.subheads),
        sections,
        projects,
        experienceProject,
        principles: pickN(rng, COPY_POOL.principles, 2 + Math.floor(rng() * 4)),
        educationBody: pick(rng, COPY_POOL.educationBodies),
        contactCopy: pick(rng, COPY_POOL.contactCopies),
        revealCopy: pick(rng, COPY_POOL.revealCopies),
        leads: Object.fromEntries(Object.entries(COPY_POOL.sectionLeads).map(([key, values]) => [key, pick(rng, values)])),
        footerQuip: pick(rng, COPY_POOL.footerQuips),
        skills: shuffle(rng, COPY_POOL.skills).map(([title, skills]) => [title, shuffle(rng, skills)])
      };

      return config;
    }

    function selectStyle(id) {
      const forcedStyleId = window.PORTFOLIO_FORCED_STYLE_ID;
      if (forcedStyleId) {
        const forcedStyle = STYLE_POOL.find(style => style.id === forcedStyleId);
        if (!forcedStyle) throw new Error(`Forced style "${forcedStyleId}" is not registered.`);
        return forcedStyle;
      }
      const styleIndex = seedModulo(id, SYSTEM_CONFIG.styleModulo, {
        prefix: SYSTEM_CONFIG.idPrefix,
        alphabet: SYSTEM_CONFIG.idCharacters,
        caseInsensitive: true,
        hashInvalid: true
      });
      return STYLE_POOL[styleIndex];
    }

    function generateConfig(id) {
      return {
        ...generateCopyConfig(id),
        style: selectStyle(id)
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

    function getHeroBreakIndex(parts, separatorLength = 0) {
      if (parts.length < 2) return -1;

      const halfway = (
        parts.reduce((length, part) => length + Array.from(part).length, 0)
        + separatorLength * (parts.length - 1)
      ) / 2;
      let length = 0;

      for (let index = 0; index < parts.length - 1; index += 1) {
        length += Array.from(parts[index]).length + (index > 0 ? separatorLength : 0);
        if (length >= halfway) return index + 1;
      }

      return -1;
    }

    function renderHeroHeadline(headline) {
      if (document.documentElement.lang.startsWith("zh")) return escapeHtml(headline);

      const words = String(headline).trim().split(/\s+/u);
      const breakIndex = getHeroBreakIndex(words, 1);

      return words.map((word, index) => {
        const separator = index === 0 ? "" : index === breakIndex ? "<br>" : " ";
        return `${separator}${escapeHtml(word)}`;
      }).join("");
    }

    function segmentChineseText(root = document.body) {
      if (!document.documentElement.lang.startsWith("zh")) return;

      const segmenter = Intl.Segmenter
        ? new Intl.Segmenter("zh-CN", { granularity: "word" })
        : null;
      const textNodes = [];

      root.querySelectorAll("h1, h2, h3").forEach(title => {
        const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (!node.parentElement.closest(".zh-segment") && /\p{Script=Han}/u.test(node.data)) {
            textNodes.push(node);
          }
        }
      });

      textNodes.forEach(node => {
        const fragment = document.createDocumentFragment();
        const titleText = node.data.replace(/。$/u, "");
        const phrases = TITLE_PHRASES[titleText];

        if (phrases) {
          const title = node.parentElement.closest("h1, h2, h3");
          const heroBreakIndex = title?.matches("#hero h1")
            ? getHeroBreakIndex(phrases)
            : -1;

          title?.setAttribute("aria-label", titleText);
          phrases.forEach((phrase, index) => {
            if (index > 0) {
              fragment.appendChild(document.createElement(index === heroBreakIndex ? "br" : "wbr"));
            }
            const span = document.createElement("span");
            span.className = "zh-segment zh-word";
            span.textContent = phrase;
            fragment.appendChild(span);
          });
          node.replaceWith(fragment);
          return;
        }

        const parts = segmenter
          ? segmenter.segment(titleText)
          : [{ segment: titleText, isWordLike: true }];
        for (const part of parts) {
          const span = document.createElement("span");
          span.className = part.isWordLike ? "zh-segment zh-word" : "zh-segment";
          span.textContent = part.segment;
          fragment.appendChild(span);
        }

        node.replaceWith(fragment);
      });
    }

    function getLanguageSwitch() {
      const isChinese = document.documentElement.lang.startsWith("zh");
      const siteRootUrl = new URL(ENTRY_ROOT, window.location.href);
      const targetUrl = new URL(isChinese ? "index.html" : "zh.html", siteRootUrl);
      targetUrl.search = window.location.search;
      targetUrl.hash = window.location.hash;

      return {
        href: targetUrl.href,
        hrefLang: isChinese ? "en" : "zh",
        labelLang: isChinese ? "en" : "zh-CN",
        label: isChinese ? "EN" : "中文",
        ariaLabel: isChinese ? "切换到英文" : "Switch to Chinese"
      };
    }

    function renderShell(config) {
      const { shell } = UI;
      const language = document.documentElement.lang.startsWith("zh") ? "zh" : "en";
      const footerQuip = config.footerQuip?.[language] || shell.footer;
      const languageSwitch = getLanguageSwitch();
      const licenseUrl = new URL("LICENSE", new URL(ENTRY_ROOT, window.location.href));
      document.body.innerHTML = `
        <div class="regenerating" id="regenerating" aria-hidden="true">
          <div class="regen-box">
            ${shell.regenerating.map((line, index) => `<div class="regen-line${index === 0 ? " active" : ""}">${escapeHtml(line)}</div>`).join("")}
          </div>
        </div>
        <header class="topbar">
          <div class="topbar-inner">
            <a class="brand" href="#top" aria-label="${escapeHtml(shell.brandAria)}">
              <span>Stark Lin</span>
            </a>
            <nav id="nav" aria-label="${escapeHtml(shell.navAria)}"></nav>
            <a class="button secondary language-switch" href="${escapeHtml(languageSwitch.href)}" hreflang="${languageSwitch.hrefLang}" lang="${languageSwitch.labelLang}" aria-label="${escapeHtml(languageSwitch.ariaLabel)}">${languageSwitch.label}</a>
          </div>
        </header>
        <div class="site">
          <section class="hero" id="hero"></section>
          <main id="main"></main>
          <section class="reveal" id="reveal"></section>
          <section class="complete-version" id="completeVersion" hidden></section>
      <footer class="tiny-footer">
        <span>© 2026 Stark Lin</span>
        <span>${escapeHtml(footerQuip)}</span>
        <span>
          <a href="https://github.com/stark-lin/stark-lin.github.io" target="_blank" rel="noreferrer">${escapeHtml(shell.sourceLabel)}</a>
          · <a href="${escapeHtml(licenseUrl.href)}">AGPL-3.0</a>
        </span>
      </footer>
        </div>
        <div class="toast" id="toast">${escapeHtml(shell.copied)}</div>
      `;
    }

    function renderNav(config) {
      document.getElementById("nav").innerHTML = ["top", ...config.sections, "contact"]
        .map(id => `<a href="#${id}">${escapeHtml(UI.nav[id])}</a>`)
        .join("");
    }

    function setupActiveNavigation(config) {
      const navLinks = [...document.querySelectorAll("#nav a[href^='#']")];
      const sections = ["top", ...config.sections, "contact"]
        .map(id => ({ id, element: document.getElementById(id) }))
        .filter(section => section.element);
      let activeId = "";
      let frame;

      function updateActiveNavigation() {
        frame = undefined;
        const topbarHeight = document.querySelector(".topbar").getBoundingClientRect().height;
        const marker = topbarHeight + Math.min(96, window.innerHeight * 0.18);
        let currentId = "";

        for (const section of sections) {
          if (section.element.getBoundingClientRect().top > marker) break;
          currentId = section.id;
        }

        if (currentId === activeId) return;
        activeId = currentId;
        navLinks.forEach(link => {
          const isCurrent = link.getAttribute("href") === `#${currentId}`;
          link.classList.toggle("current", isCurrent);
          if (isCurrent) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }

      function scheduleUpdate() {
        if (frame) return;
        frame = requestAnimationFrame(updateActiveNavigation);
      }

      updateActiveNavigation();
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate, { passive: true });
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
            <h1 aria-label="${escapeHtml(config.headline)}">${renderHeroHeadline(config.headline)}</h1>
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
      const cards = config.projects.map(project => `
        <article class="card project-card">
          <div class="card-title-row">
            <div>
              <h3>${escapeHtml(project.title)} — ${escapeHtml(project.subtitle)}</h3>
              <div class="stack">${escapeHtml(project.stack)}</div>
            </div>
            <span class="tag">${escapeHtml(project.tag)}</span>
          </div>
          <div class="generated-desc-meta">${escapeHtml(UI.labels.projectNote)} · ${escapeHtml(project.descriptionMode)}</div>
          <p class="generated-description">${escapeHtml(project.description)}</p>
          ${project.url.startsWith("http") ? `<p style="margin-top:16px"><a href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">${escapeHtml(UI.labels.openRepository)}</a></p>` : ""}
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
          ${config.skills.map(([title, skills]) => `
            <article class="card third">
              <h3>${escapeHtml(title)}</h3>
              <div class="skill-cloud" style="margin-top:16px">
                ${skills.map(skill => `<span class="skill-pill">${escapeHtml(skill)}</span>`).join("")}
              </div>
            </article>
          `).join("")}
        </div>
      `;
      return sectionShell(index, "skills", UI.sectionTitles.skills, config.leads.skills, body);
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
          <div class="generated-desc-meta">${escapeHtml(UI.labels.projectIntroduction)}</div>
          <div class="intro-list">
            <p>${escapeHtml(project.intros[0])}</p>
          </div>
          <div class="generated-desc-meta" style="margin-top:24px">${escapeHtml(UI.labels.implementationNotes)}</div>
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
      segmentChineseText(document.getElementById("completeVersion"));
      applyTitleTypographyLimits();
      document.getElementById("completeVersion").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function renderMain(config) {
      const renderers = {
        work: renderWork,
        experience: renderExperience,
        education: renderEducation,
        principles: renderPrinciples,
        skills: renderSkills
      };
      const sections = config.sections.map((key, i) => renderers[key](config, i + 1)).join("");
      document.getElementById("main").innerHTML = sections + renderContact(config, config.sections.length + 1);
    }

    function renderReveal(config) {
      const reveal = document.getElementById("reveal");
      const language = document.documentElement.lang.startsWith("zh") ? "zh" : "en";
      const styleLabel = config.style.label[language];
      const styleIntroduction = config.style.introduction[language];
      const stylePeriod = config.style.period;
      reveal.innerHTML = `
        <div class="kicker">${escapeHtml(config.revealCopy.kicker)}</div>
        <h2>${escapeHtml(config.revealCopy.headline)}</h2>
        <p style="margin-top:16px">${escapeHtml(config.revealCopy.body)}</p>
        <div class="reveal-grid">
          <div class="reveal-stat">
            <div class="reveal-stat-section active-style-report">
              <div class="reveal-stat-label">${escapeHtml(UI.labels.activeStyle)}</div>
              <div class="active-style-heading">
                <div class="reveal-stat-value active-style-value">${escapeHtml(styleLabel)}</div>
                <div class="style-period">${escapeHtml(stylePeriod)}</div>
              </div>
              <div class="style-introduction">${escapeHtml(styleIntroduction)}</div>
            </div>
            <div class="reveal-stat-section">
              <div class="reveal-stat-label">${escapeHtml(UI.labels.referenceCode)}</div>
              <div class="reveal-stat-value">${escapeHtml(config.id)}</div>
            </div>
          </div>
        </div>
        <div class="reveal-actions">
          <button class="button" id="rollAgain">${escapeHtml(UI.labels.refreshView)}</button>
          <button class="button secondary" id="copyVersion">${escapeHtml(UI.labels.copyView)}</button>
          <button class="button secondary surrender" id="surrenderComplete">${escapeHtml(UI.labels.showComplete)}</button>
        </div>
      `;
    
      document.getElementById("rollAgain").addEventListener("click", rollAgain);
      document.getElementById("copyVersion").addEventListener("click", () => copyText(getSurfaceUrl(), UI.labels.viewCopied));
      document.getElementById("surrenderComplete").addEventListener("click", () => showCompleteVersion(config));
    }

    function setupFooterSpotlightOnboarding() {
      if (getViewLabel() !== VIEW_LABELS.GUIDE) return;

      const target = document.getElementById("rollAgain");
      if (!target || !UI.footerSpotlight) return;

      let observer;
      let layer;
      let previousTabIndex;

      function positionLayer() {
        if (!layer) return;
        const rect = target.getBoundingClientRect();
        const viewportPadding = 16;
        const cardWidth = Math.min(480, window.innerWidth - viewportPadding * 2);
        const targetCenter = rect.left + rect.width / 2;
        const viewportCenter = window.innerWidth / 2;
        const balancedCenter = targetCenter * 0.25 + viewportCenter * 0.75;
        const cardLeft = Math.min(
          Math.max(viewportPadding, balancedCenter - cardWidth / 2),
          window.innerWidth - cardWidth - viewportPadding
        );
        const arrowLeft = Math.min(
          Math.max(24, targetCenter - cardLeft - 8),
          cardWidth - 40
        );

        layer.style.left = `${rect.left}px`;
        layer.style.top = `${rect.top}px`;
        layer.style.width = `${rect.width}px`;
        layer.style.height = `${rect.height}px`;
        layer.style.setProperty("--spotlight-card-width", `${cardWidth}px`);
        layer.style.setProperty("--spotlight-card-offset", `${cardLeft - rect.left}px`);
        layer.style.setProperty("--spotlight-arrow-left", `${arrowLeft}px`);
      }

      function dismiss({ focusTarget = false } = {}) {
        if (!layer) return;
        setViewLabel(VIEW_LABELS.SURFACE);
        window.removeEventListener("resize", positionLayer);
        window.removeEventListener("scroll", positionLayer);
        document.removeEventListener("keydown", handleKeydown);
        target.style.removeProperty("visibility");
        target.removeAttribute("aria-hidden");
        if (previousTabIndex === null) target.removeAttribute("tabindex");
        else target.setAttribute("tabindex", previousTabIndex);
        layer.remove();
        document.querySelector(".footer-spotlight-scrim")?.remove();
        document.body.classList.remove("footer-spotlight-active");
        layer = undefined;
        if (focusTarget) target.focus({ preventScroll: true });
      }

      function handleKeydown(event) {
        if (event.key === "Escape") dismiss({ focusTarget: true });
      }

      function show() {
        if (layer || getViewLabel() !== VIEW_LABELS.GUIDE) return;
        observer?.disconnect();

        const scrim = document.createElement("div");
        scrim.className = "footer-spotlight-scrim";
        scrim.setAttribute("aria-hidden", "true");

        layer = document.createElement("div");
        layer.className = "footer-spotlight-layer";
        layer.innerHTML = `
          <button class="button footer-spotlight-button" type="button" aria-describedby="footerSpotlightCard">
            ${escapeHtml(UI.labels.refreshView)}
          </button>
          <aside class="footer-spotlight-card" id="footerSpotlightCard" role="note" aria-live="polite" aria-label="${escapeHtml(UI.footerSpotlight.title)}">
            <button class="footer-spotlight-close" type="button" aria-label="${escapeHtml(UI.footerSpotlight.closeAria)}">&times;</button>
            <div class="footer-spotlight-eyebrow">${escapeHtml(UI.footerSpotlight.title)}</div>
            ${UI.footerSpotlight.body.map(line => `<p>${escapeHtml(line)}</p>`).join("")}
          </aside>
        `;

        previousTabIndex = target.getAttribute("tabindex");
        target.style.visibility = "hidden";
        target.setAttribute("aria-hidden", "true");
        target.setAttribute("tabindex", "-1");
        document.body.classList.add("footer-spotlight-active");
        document.body.append(scrim, layer);
        positionLayer();

        layer.querySelector(".footer-spotlight-button").addEventListener("click", () => {
          dismiss();
          rollAgain();
        });
        layer.querySelector(".footer-spotlight-close").addEventListener("click", () => {
          dismiss({ focusTarget: true });
        });
        window.addEventListener("resize", positionLayer, { passive: true });
        window.addEventListener("scroll", positionLayer, { passive: true });
        document.addEventListener("keydown", handleKeydown);
      }

      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) show();
      }, { threshold: 0.5 });
      observer.observe(target);
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
        const id = createShortId();
        const url = new URL(window.location.href);
        // Roll Again starts a clean generated view: keep only the new ID and drop view state such as `complete` and section hashes.
        url.search = "";
        url.searchParams.set("id", id);
        url.searchParams.set("label", VIEW_LABELS.SURFACE);
        url.hash = "";
        window.location.href = url.toString();
      }, 980);
    }


    function clampTitleTracking(value, fontWeight, fontSizePx) {
      let min = -0.045;

      if (fontWeight >= 800) min = -0.035;
      if (fontSizePx >= 96) min = Math.max(min, -0.03);
      if (fontSizePx >= 120) min = Math.max(min, -0.025);

      return Math.max(value, min);
    }

    function applyTitleTypographyLimits() {
      const isChinese = document.documentElement.lang.startsWith("zh");
      const viewportWidth = document.documentElement.clientWidth;
      const safeRight = viewportWidth - TITLE_TYPOGRAPHY.safeGutter;

      document.querySelectorAll("h1, h2, h3").forEach(title => {
        // Always measure the active theme, rather than a clamp from an earlier width.
        title.classList.remove("title-boundary-fallback");
        ["font-size", "letter-spacing", "line-height", "max-width"].forEach(property => {
          title.style.removeProperty(property);
        });

        const level = title.tagName.toLowerCase();
        const rules = TITLE_TYPOGRAPHY[level];
        let computedStyle = window.getComputedStyle(title);
        let fontSizePx = Number.parseFloat(computedStyle.fontSize);

        if (viewportWidth <= TITLE_TYPOGRAPHY.mobileBreakpoint && Number.isFinite(fontSizePx)) {
          const mobileMaxSize = viewportWidth * rules.mobileMaxSizeRatio;
          if (fontSizePx > mobileMaxSize) {
            title.style.fontSize = `${mobileMaxSize}px`;
            computedStyle = window.getComputedStyle(title);
            fontSizePx = Number.parseFloat(computedStyle.fontSize);
          }
        }

        const fontWeight = Number.parseInt(computedStyle.fontWeight, 10);
        const lineHeightPx = Number.parseFloat(computedStyle.lineHeight);
        const trackingPx = Number.parseFloat(computedStyle.letterSpacing);

        if (!Number.isFinite(fontSizePx) || fontSizePx <= 0) return;

        const minLeading = isChinese ? rules.minLeadingZh : rules.minLeading;
        if (Number.isFinite(lineHeightPx) && lineHeightPx / fontSizePx < minLeading) {
          title.style.lineHeight = String(minLeading);
        }

        if ([fontWeight, trackingPx].every(Number.isFinite)) {
          const tracking = trackingPx / fontSizePx;
          const clampedTracking = isChinese
            ? Math.max(tracking, 0.01)
            : clampTitleTracking(tracking, fontWeight, fontSizePx);
          if (clampedTracking > tracking) {
            title.style.letterSpacing = `${clampedTracking}em`;
          }
        }

        // Preserve each theme's preferred measure until it crosses the viewport.
        // Then narrow the title; remove decorative displacement only as a fallback.
        let bounds = title.getBoundingClientRect();
        if (bounds.left < TITLE_TYPOGRAPHY.safeGutter || bounds.right > safeRight) {
          const availableWidth = Math.max(
            1,
            safeRight - Math.max(bounds.left, TITLE_TYPOGRAPHY.safeGutter)
          );
          const scaleX = title.offsetWidth > 0 ? bounds.width / title.offsetWidth : 1;
          title.style.maxWidth = `${availableWidth / Math.max(scaleX, 0.01)}px`;
          bounds = title.getBoundingClientRect();

          if (bounds.left < TITLE_TYPOGRAPHY.safeGutter || bounds.right > safeRight) {
            title.classList.add("title-boundary-fallback");
            const fallbackBounds = title.getBoundingClientRect();
            const fallbackWidth = Math.max(
              1,
              safeRight - Math.max(fallbackBounds.left, TITLE_TYPOGRAPHY.safeGutter)
            );
            title.style.maxWidth = `${fallbackWidth}px`;
          }
        }
      });
    }

    let titleTypographyFrame;
    function scheduleTitleTypographyLimits() {
      cancelAnimationFrame(titleTypographyFrame);
      titleTypographyFrame = requestAnimationFrame(() => {
        applyTitleTypographyLimits();
      });
    }

    function applySelectedStyle(style) {
      document.body.className = style.classNames.join(" ");
      document.body.dataset.styleId = style.id;

      Object.entries(style.variables || {}).forEach(([name, value]) => {
        if (!name.startsWith("--")) {
          throw new Error(`Style "${style.id}" contains invalid CSS variable "${name}".`);
        }
        document.documentElement.style.setProperty(name, String(value));
      });
    }

    function init() {
      const id = getId();
      const config = generateConfig(id);
      renderShell(config);
      applySelectedStyle(config.style);
      renderNav(config);
      renderHero(config);
      renderMain(config);
      renderReveal(config);
      renderCompleteVersion(config);
      setupActiveNavigation(config);
      setupFooterSpotlightOnboarding();
      segmentChineseText();
      applyTitleTypographyLimits();
      window.addEventListener("resize", scheduleTitleTypographyLimits, { passive: true });
    }

    init();
})();
