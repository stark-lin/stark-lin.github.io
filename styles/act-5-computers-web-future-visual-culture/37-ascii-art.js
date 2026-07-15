(() => {
  "use strict";

  const FRAME_TARGETS = Object.freeze([
    [".hero-grid", "BOOT / HOME"],
    [".hero-card", "PROFILE.DAT"],
    [".section-head", "PROCESS_HEADER"],
    [".complete-head", "COMPLETE_RECORD"],
    [".card", "FILE"],
    [".principle", "RULE"],
    [".timeline-item", "LOG_ENTRY"],
    [".contact-panel", "OPEN_CHANNEL"],
    [".reveal", "SESSION_REPORT"],
    [".reveal-stat", "STYLE_DATA"],
    [".complete-project .intro-list p", "NOTE"],
    [".toast", "STATUS"],
    [".regen-box", "REBUILDING_VIEW"],
    [".footer-spotlight-card", "README"]
  ]);

  function buildRule(width, label = "") {
    const middleWidth = Math.max(2, width - 2);
    const heading = label ? `--[ ${label} ]` : "";
    return `+${(heading + "-".repeat(middleWidth)).slice(0, middleWidth)}+`;
  }

  function createFrame(element, label) {
    if (element.classList.contains("ascii-framed")) return;

    const frame = document.createElement("span");
    frame.className = "ascii-frame";
    frame.setAttribute("aria-hidden", "true");

    for (const edge of ["top", "left", "right", "bottom"]) {
      const span = document.createElement("span");
      span.className = `ascii-frame-${edge}`;
      frame.appendChild(span);
    }

    element.classList.add("ascii-framed");
    element.dataset.asciiLabel = label;
    element.prepend(frame);
  }

  function enhanceAsciiComponents(root = document) {
    const scope = root?.querySelectorAll ? root : document;
    let fileIndex = 0;
    let ruleIndex = 0;

    FRAME_TARGETS.forEach(([selector, baseLabel]) => {
      scope.querySelectorAll(selector).forEach(element => {
        let label = baseLabel;
        if (selector === ".card") label = `${baseLabel}_${String(++fileIndex).padStart(2, "0")}`;
        if (selector === ".principle") label = `${baseLabel}_${String(++ruleIndex).padStart(2, "0")}`;
        createFrame(element, label);
      });
    });

    const framed = [...scope.querySelectorAll(".ascii-framed")];
    if (!framed.length) return;

    const probe = document.createElement("span");
    probe.className = "ascii-measure-probe";
    probe.textContent = "00000000000000000000";
    document.body.appendChild(probe);
    const characterWidth = Math.max(1, probe.getBoundingClientRect().width / 20);
    const lineHeight = Math.max(1, probe.getBoundingClientRect().height);
    probe.remove();

    function drawFrame(element) {
      const frame = element.querySelector(":scope > .ascii-frame");
      if (!frame) return;

      const width = Math.max(8, Math.floor(element.clientWidth / characterWidth));
      const rows = Math.max(1, Math.ceil((element.clientHeight - lineHeight * 2) / lineHeight));
      const sides = Array.from({ length: rows }, () => "|").join("\n");
      frame.querySelector(".ascii-frame-top").textContent = buildRule(width, element.dataset.asciiLabel);
      frame.querySelector(".ascii-frame-bottom").textContent = buildRule(width);
      frame.querySelector(".ascii-frame-left").textContent = sides;
      frame.querySelector(".ascii-frame-right").textContent = sides;
    }

    let animationFrame;
    const redraw = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => framed.forEach(drawFrame));
    };

    redraw();
    document.fonts?.ready.then(redraw);

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(entries => entries.forEach(entry => drawFrame(entry.target)));
      framed.forEach(element => observer.observe(element));
    } else {
      window.addEventListener("resize", redraw, { passive: true });
    }
  }

  window.PORTFOLIO_REGISTER_STYLE({
    id: "ascii-art",
    classNames: ["theme-ascii-art", "layout-single"],
    variables: {
      "--bg": "#000000",
      "--fg": "#00ff41",
      "--muted": "#00ff41",
      "--line": "#00ff41",
      "--card": "#000000",
      "--card-strong": "#000000",
      "--accent": "#00ff41",
      "--radius": "0px",
      "--style-site-width": "1120px",
      "--style-line-height": "1.62",
      "--style-hero-gap": "32px",
      "--style-section-padding-y": "72px",
      "--style-section-gap": "40px",
      "--style-card-padding": "24px",
      "--style-card-gap": "24px",
      "--style-h1-fluid": "7vw",
      "--style-h1-max": "78px",
      "--style-h1-tracking": "-.055em",
      "--style-desc-size": "15px",
      "--style-component-outline": "0",
      "--style-button-radius": "0px",
      "--style-button-font": "var(--mono)",
      "--style-button-size": "12px",
      "--style-button-weight": "700",
      "--style-button-tracking": ".06em",
      "--style-button-bg": "var(--bg)",
      "--style-button-color": "var(--accent)",
      "--style-button-border-color": "var(--accent)",
      "--style-button-secondary-bg": "transparent",
      "--style-button-secondary-color": "var(--accent)",
      "--style-button-secondary-border-color": "var(--accent)"
    },
    label: { en: "ASCII Art", zh: "ASCII 艺术" },
    period: "1960s",
    introduction: {
      en: "A strict black-and-green terminal interface drawn with prompts, character rules, numbered files, and ASCII-only system graphics.",
      zh: "一套严格限定为纯黑与磷光绿、由提示符、字符分隔线、编号文件和纯 ASCII 系统图形构成的终端界面。"
    },
    enhance: enhanceAsciiComponents
  });
})();
