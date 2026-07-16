(() => {
  "use strict";

  window.PORTFOLIO_REGISTER_STYLE({
    id: "cyberpunk-visual-culture",
    classNames: ["theme-cyberpunk-visual-culture", "layout-single"],
    variables: {
      "--bg": "#080a09",
      "--fg": "#eee9db",
      "--muted": "#aaa99d",
      "--line": "#50554e",
      "--card": "#111512",
      "--card-strong": "#171c18",
      "--accent": "#d7ff43",
      "--radius": "0px",
      "--style-site-width": "1320px",
      "--style-line-height": "1.62",
      "--style-hero-pad-top": "72px",
      "--style-hero-pad-bottom": "72px",
      "--style-hero-gap": "clamp(28px, 5vw, 72px)",
      "--style-section-padding-y": "clamp(72px, 9vw, 116px)",
      "--style-section-gap": "40px",
      "--style-card-padding": "clamp(22px, 3vw, 36px)",
      "--style-card-gap": "18px",
      "--style-h1-min": "56px",
      "--style-h1-fluid": "8.4vw",
      "--style-h1-max": "112px",
      "--style-h1-tracking": "-.075em",
      "--style-h2-tracking": "-.055em",
      "--style-h3-tracking": "-.035em",
      "--style-desc-size": "17px",
      "--style-section-lead-size": "16px",
      "--style-component-outline": "1px solid var(--line)",
      "--style-card-shadow": "none",
      "--style-panel-shadow": "none",
      "--style-title-rule-width": "1px",
      "--style-title-rule-padding": "18px",
      "--style-button-radius": "0px",
      "--style-button-y": "11px",
      "--style-button-x": "16px",
      "--style-button-size": "11px",
      "--style-button-bg": "var(--accent)",
      "--style-button-color": "#080a09",
      "--style-button-border-color": "var(--accent)",
      "--style-button-secondary-bg": "transparent",
      "--style-button-secondary-color": "var(--fg)",
      "--style-button-secondary-border-color": "var(--line)",
      "--style-button-font": "var(--mono)",
      "--style-button-weight": "780",
      "--style-button-text-transform": "uppercase",
      "--style-button-tracking": ".11em"
    },
    label: { en: "Cyberpunk Visual Culture", zh: "赛博朋克视觉文化" },
    period: "1980s",
    introduction: {
      en: "A civic signal terminal where acid wayfinding, oxidized warnings, clipped frames, edge graduations, and local scan lines let advanced systems remain visibly embedded in worn everyday infrastructure.",
      zh: "一座城市信号终端：酸性导视、氧化警示、切角框架、边缘刻度与局部扫描线，让先进系统始终显露其嵌入磨损日常基础设施的事实。"
    }
  });

  const TEXT = {
    en: {
      status: "PORTFOLIO NODE / PUBLIC CHANNEL",
      online: "link stable",
      time: "local time",
      quiet: "noise filter",
      contrast: "high contrast",
      node: "NODE 39 / ADVANCED SYSTEMS / WORN INFRASTRUCTURE",
      disclosure: "SYSTEM DISCLOSURE / ACTIVE SURFACE",
      console: "signal control",
      signal: "interface signal",
      records: "records detected",
      route: "current route",
      filterLabel: "Filter project records",
      all: "all records",
      showing: (shown, total) => `${shown} / ${total} records visible`,
      expand: "open record",
      collapse: "close record"
    },
    zh: {
      status: "作品集节点 / 公共信道",
      online: "链路稳定",
      time: "本地时间",
      quiet: "噪点过滤",
      contrast: "高对比度",
      node: "节点 39 / 先进系统 / 磨损基础设施",
      disclosure: "系统说明 / 当前视觉表层",
      console: "信号控制",
      signal: "界面信号",
      records: "检测到的记录",
      route: "当前路径",
      filterLabel: "筛选项目记录",
      all: "全部记录",
      showing: (shown, total) => `显示 ${shown} / ${total} 条记录`,
      expand: "展开记录",
      collapse: "收起记录"
    }
  };

  function enhanceCyberpunk() {
    if (!document.body.classList.contains("theme-cyberpunk-visual-culture")) return;

    const language = document.documentElement.lang.startsWith("zh") ? "zh" : "en";
    const copy = TEXT[language];
    const topbar = document.querySelector(".topbar-inner");
    const heroGrid = document.querySelector(".hero-grid");
    const work = document.getElementById("work");
    const hero = document.getElementById("hero");
    const reveal = document.getElementById("reveal");
    if (!topbar || !heroGrid || !work) return;
    if (hero) hero.dataset.cyberNode = copy.node;
    if (reveal) reveal.dataset.cyberDisclosure = copy.disclosure;

    const statusbar = document.createElement("div");
    statusbar.className = "cyber-statusbar";
    statusbar.setAttribute("aria-label", copy.status);
    statusbar.innerHTML = `
      <span class="cyber-channel"><span class="cyber-live-dot" aria-hidden="true"></span>${copy.status}</span>
      <span class="cyber-link-state">${copy.online}</span>
      <span class="cyber-clock"><span>${copy.time}</span><time></time></span>
      <button class="cyber-mode-button" type="button" data-mode="quiet" aria-pressed="false">${copy.quiet}</button>
      <button class="cyber-mode-button" type="button" data-mode="contrast" aria-pressed="false">${copy.contrast}</button>
    `;
    topbar.appendChild(statusbar);

    const clock = statusbar.querySelector("time");
    const updateClock = () => {
      clock.dateTime = new Date().toISOString();
      clock.textContent = new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-AU", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).format(new Date());
    };
    updateClock();
    window.setInterval(updateClock, 1000);

    statusbar.querySelectorAll(".cyber-mode-button").forEach(button => {
      button.addEventListener("click", () => {
        const pressed = button.getAttribute("aria-pressed") !== "true";
        button.setAttribute("aria-pressed", String(pressed));
        document.body.classList.toggle(`cyber-${button.dataset.mode}`, pressed);
      });
    });

    const projectCards = [...work.querySelectorAll(".project-card")];
    const consolePanel = document.createElement("section");
    consolePanel.className = "cyber-console";
    consolePanel.setAttribute("aria-label", copy.console);
    consolePanel.innerHTML = `
      <div class="cyber-console-head">
        <span>${copy.console}</span>
        <output for="cyberSignal">082%</output>
      </div>
      <label class="cyber-signal-control" for="cyberSignal">
        <span>${copy.signal}</span>
        <input id="cyberSignal" type="range" min="20" max="100" value="82" />
      </label>
      <dl class="cyber-readout">
        <div><dt>${copy.records}</dt><dd>${String(projectCards.length).padStart(2, "0")}</dd></div>
        <div><dt>${copy.route}</dt><dd>${window.location.pathname.split("/").pop() || "/"}</dd></div>
      </dl>
    `;

    const profile = heroGrid.querySelector(".hero-card");
    if (profile) {
      profile.classList.add("cyber-profile-console");
      profile.prepend(consolePanel);
    } else {
      const aside = document.createElement("aside");
      aside.className = "hero-card cyber-profile-console";
      aside.appendChild(consolePanel);
      heroGrid.appendChild(aside);
    }

    const signalInput = consolePanel.querySelector("input");
    const signalOutput = consolePanel.querySelector("output");
    signalInput.addEventListener("input", () => {
      const value = Number(signalInput.value);
      document.body.style.setProperty("--cyber-signal", String(value / 100));
      signalOutput.value = `${String(value).padStart(3, "0")}%`;
    });

    const projectStacks = projectCards.map(card => (card.querySelector(".stack")?.textContent || "")
      .split(/\s*[·,|+]\s*/)
      .map(token => token.trim())
      .filter(Boolean));
    const tokenFrequency = projectStacks.flat().reduce((frequency, token) => {
      frequency.set(token, (frequency.get(token) || 0) + 1);
      return frequency;
    }, new Map());
    const stackTokens = [];
    const widestStack = Math.max(0, ...projectStacks.map(stack => stack.length));
    for (let column = 0; column < widestStack && stackTokens.length < 4; column += 1) {
      projectStacks.forEach(stack => {
        const token = stack[column];
        if (token && tokenFrequency.get(token) < projectCards.length && !stackTokens.includes(token) && stackTokens.length < 4) {
          stackTokens.push(token);
        }
      });
    }

    projectCards.forEach((card, index) => {
      card.dataset.record = String(index + 1).padStart(2, "0");
      const titleRow = card.querySelector(".card-title-row");
      const body = document.createElement("div");
      body.className = "cyber-record-body";
      let node = titleRow?.nextSibling;
      while (node) {
        const next = node.nextSibling;
        body.appendChild(node);
        node = next;
      }
      card.appendChild(body);

      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "cyber-record-toggle";
      toggle.setAttribute("aria-expanded", "true");
      toggle.textContent = copy.collapse;
      titleRow?.appendChild(toggle);
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") !== "false";
        toggle.setAttribute("aria-expanded", String(!expanded));
        toggle.textContent = expanded ? copy.expand : copy.collapse;
        body.hidden = expanded;
      });
    });

    const filterPanel = document.createElement("div");
    filterPanel.className = "cyber-filter-panel";
    filterPanel.setAttribute("role", "toolbar");
    filterPanel.setAttribute("aria-label", copy.filterLabel);
    const filters = [{ value: "all", label: copy.all }, ...stackTokens.map(token => ({ value: token, label: token }))];
    const filterButtons = document.createElement("div");
    filterButtons.className = "cyber-filter-buttons";
    filters.forEach((filter, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.filter = filter.value;
      button.setAttribute("aria-pressed", String(index === 0));
      button.textContent = filter.label;
      filterButtons.appendChild(button);
    });
    const filterStatusOutput = document.createElement("output");
    filterStatusOutput.className = "cyber-filter-status";
    filterStatusOutput.setAttribute("aria-live", "polite");
    filterStatusOutput.value = copy.showing(projectCards.length, projectCards.length);
    filterPanel.append(filterButtons, filterStatusOutput);
    work.querySelector(".cards")?.before(filterPanel);

    const filterStatus = filterPanel.querySelector(".cyber-filter-status");
    filterPanel.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        let visible = 0;
        filterPanel.querySelectorAll("button").forEach(candidate => {
          candidate.setAttribute("aria-pressed", String(candidate === button));
        });
        projectCards.forEach(card => {
          const match = filter === "all" || (card.querySelector(".stack")?.textContent || "").includes(filter);
          card.hidden = !match;
          if (match) visible += 1;
        });
        filterStatus.value = copy.showing(visible, projectCards.length);
      });
    });
  }

  if (typeof window.addEventListener === "function") {
    window.addEventListener("DOMContentLoaded", enhanceCyberpunk, { once: true });
  }
})();
