"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");
const STYLE_ENTRIES = [
  ["act-1-avant-garde-modern-order", "00-futurism"],
  ["act-1-avant-garde-modern-order", "01-dada"],
  ["act-1-avant-garde-modern-order", "02-suprematism"],
  ["act-1-avant-garde-modern-order", "03-de-stijl"],
  ["act-1-avant-garde-modern-order", "04-purism"],
  ["act-1-avant-garde-modern-order", "05-constructivism"],
  ["act-1-avant-garde-modern-order", "06-bauhaus"],
  ["act-1-avant-garde-modern-order", "07-surrealism"],
  ["act-1-avant-garde-modern-order", "08-new-typography"],
  ["act-1-avant-garde-modern-order", "09-art-deco"],
  ["act-1-avant-garde-modern-order", "10-international-style"],
  ["act-1-avant-garde-modern-order", "11-concrete-art"],
  ["act-2-postwar-abstraction-perception-popular-culture", "12-abstract-expressionism"],
  ["act-2-postwar-abstraction-perception-popular-culture", "13-spatialism"],
  ["act-2-postwar-abstraction-perception-popular-culture", "14-color-field-painting"],
  ["act-2-postwar-abstraction-perception-popular-culture", "15-hard-edge-painting"],
  ["act-2-postwar-abstraction-perception-popular-culture", "16-pop-art"],
  ["act-2-postwar-abstraction-perception-popular-culture", "17-op-art"],
  ["act-2-postwar-abstraction-perception-popular-culture", "18-zero"],
  ["act-2-postwar-abstraction-perception-popular-culture", "19-minimalism"],
  ["act-2-postwar-abstraction-perception-popular-culture", "20-international-typographic-style"],
  ["act-2-postwar-abstraction-perception-popular-culture", "21-atomic-age-futurism"],
  ["act-2-postwar-abstraction-perception-popular-culture", "22-supergraphics"],
  ["act-3-material-concept-radical-design", "23-brutalism"],
  ["act-3-material-concept-radical-design", "24-soviet-modernism"],
  ["act-3-material-concept-radical-design", "25-conceptual-art"],
  ["act-3-material-concept-radical-design", "26-arte-povera"],
  ["act-3-material-concept-radical-design", "27-metabolism"],
  ["act-3-material-concept-radical-design", "28-high-tech"],
  ["act-3-material-concept-radical-design", "29-radical-design"],
  ["act-3-material-concept-radical-design", "30-anti-design"],
  ["act-4-postmodernism-plural-surfaces", "31-postmodernism"],
  ["act-4-postmodernism-plural-surfaces", "32-memphis"],
  ["act-4-postmodernism-plural-surfaces", "33-new-wave-typography"],
  ["act-4-postmodernism-plural-surfaces", "34-deconstructivism"],
  ["act-4-postmodernism-plural-surfaces", "35-neo-geo"],
  ["act-4-postmodernism-plural-surfaces", "36-pattern-and-decoration"],
  ["act-5-computers-web-future-visual-culture", "37-early-computer-art"],
  ["act-5-computers-web-future-visual-culture", "38-early-web-design"],
  ["act-5-computers-web-future-visual-culture", "39-cyberpunk-visual-culture"],
  ["act-5-computers-web-future-visual-culture", "40-glitch-art"],
  ["act-5-computers-web-future-visual-culture", "41-post-internet-art"]
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function loadStyleRegistry() {
  const context = vm.createContext({ window: {} });
  vm.runInContext(read(path.join(ROOT, "assets", "data", "styles.js")), context);
  STYLE_ENTRIES.forEach(([directory, stem]) => {
    vm.runInContext(read(path.join(ROOT, "styles", directory, `${stem}.js`)), context);
  });
  return context.window.PORTFOLIO_STYLE_POOL;
}

function splitSelectorList(selectorList) {
  const selectors = [];
  let start = 0;
  let depth = 0;
  let quote = "";

  for (let index = 0; index < selectorList.length; index += 1) {
    const character = selectorList[index];

    if (quote) {
      if (character === quote && selectorList[index - 1] !== "\\") quote = "";
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "(" || character === "[") depth += 1;
    else if (character === ")" || character === "]") depth = Math.max(0, depth - 1);
    else if (character === "," && depth === 0) {
      selectors.push(selectorList.slice(start, index).trim());
      start = index + 1;
    }
  }

  selectors.push(selectorList.slice(start).trim());
  return selectors.filter(Boolean);
}

function hasScopedThemeSelector(css, themeId, targetClass) {
  const themeClass = `.theme-${themeId}`;
  const target = `.${targetClass}`;
  const source = css.replace(/\/\*[\s\S]*?\*\//g, "");

  for (const match of source.matchAll(/([^{}]+)\{/g)) {
    const selectorList = match[1].trim();
    if (!selectorList || selectorList.startsWith("@")) continue;

    for (const selector of splitSelectorList(selectorList)) {
      let themeIndex = selector.indexOf(themeClass);

      while (themeIndex !== -1) {
        const themeEnd = themeIndex + themeClass.length;
        const targetIndex = selector.indexOf(target, themeEnd);
        const relationship = targetIndex === -1 ? "" : selector.slice(themeEnd, targetIndex);

        if (targetIndex !== -1 && /[\s>]/.test(relationship)) return true;
        themeIndex = selector.indexOf(themeClass, themeEnd);
      }
    }
  }

  return false;
}

test("the style folder contains one complete, continuously numbered trio per style", () => {
  STYLE_ENTRIES.forEach(([directory, stem], index) => {
    assert.equal(stem.slice(0, 2), String(index).padStart(2, "0"));
    for (const extension of ["html", "js", "css"]) {
      assert.ok(fs.existsSync(path.join(ROOT, "styles", directory, `${stem}.${extension}`)), `${stem}.${extension} is missing`);
    }
  });
});

test("all implemented styles register once with bilingual exhibition copy", () => {
  const styles = loadStyleRegistry();
  assert.equal(styles.length, STYLE_ENTRIES.length);
  assert.equal(new Set(styles.map(style => style.id)).size, STYLE_ENTRIES.length);

  styles.forEach(style => {
    assert.ok(style.classNames.includes(`theme-${style.id}`));
    assert.ok(style.label.en);
    assert.ok(style.label.zh);
    assert.match(style.period, /^\d{4}s$/);
    assert.ok(style.introduction.en);
    assert.ok(style.introduction.zh);
  });
});

test("each standalone preview forces and loads only its matching style", () => {
  const styles = loadStyleRegistry();

  STYLE_ENTRIES.forEach(([directory, stem], index) => {
    const html = read(path.join(ROOT, "styles", directory, `${stem}.html`));
    const style = styles[index];
    assert.match(html, new RegExp(`PORTFOLIO_FORCED_STYLE_ID = ["']${style.id}["']`));
    assert.match(html, new RegExp(`href=["']\\./${stem}\\.css["']`));
    assert.match(html, new RegExp(`src=["']\\./${stem}\\.js["']`));
  });
});

test("the application accepts a single registered style in forced preview mode", () => {
  const app = read(path.join(ROOT, "assets", "app.js"));

  assert.match(app, /const forcedStyleId = window\.PORTFOLIO_FORCED_STYLE_ID;/);
  assert.match(app, /const expectedStyleCount = forcedStyleId \? 1 : SYSTEM_CONFIG\.styleModulo;/);
  assert.match(app, /forcedStyleId && !ids\.has\(forcedStyleId\)/);
});

test("deconstructivism separates clipped surfaces with color instead of outline borders", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-4-postmodernism-plural-surfaces",
    "34-deconstructivism.css"
  ));

  assert.match(css, /\.theme-deconstructivism :is\(\.card, \.principle, \.timeline-item\)\s*{[^}]*border:\s*0;/s);
  assert.match(css, /\.theme-deconstructivism \.contact-panel,\s*\.theme-deconstructivism \.reveal\s*{[^}]*border:\s*0;/s);
  assert.match(css, /\.theme-deconstructivism \.button\s*{[^}]*border:\s*0;/s);
  assert.doesNotMatch(css, /border(?:-top|-right|-bottom|-left)?:\s*[1-9]\d*px\s+solid/);
});

test("surrealism keeps project descriptions and skill pills legible on dark hover cards", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-1-avant-garde-modern-order",
    "07-surrealism.css"
  ));

  assert.match(css, /\.theme-surrealism \.card:hover :is\([^)]*\.skill-pill[^)]*\)\s*{[^}]*color:\s*#f0b44e/s);
  assert.match(css, /\.theme-surrealism \.card:hover \.generated-description\s*{[^}]*color:\s*var\(--card\)/s);
});

test("surrealism gives the arched profile card enough roof clearance for education", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-1-avant-garde-modern-order",
    "07-surrealism.css"
  ));

  assert.match(css, /\.theme-surrealism \.hero-card\s*{[^}]*padding:\s*44px 22px 22px/s);
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*?\.theme-surrealism \.hero-card\s*{[^}]*padding:\s*26px 18px 18px/s);
});

test("new typography keeps numbers informational and component borders complete", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-1-avant-garde-modern-order",
    "08-new-typography.css"
  ));

  assert.doesNotMatch(css, /content:\s*["'](?:21|42|\d{2})["']/);
  assert.match(css, /\.theme-new-typography :is\(\.card, \.principle, \.timeline-item\)\s*{[^}]*border:\s*2px solid var\(--line\);/s);
  assert.match(css, /\.theme-new-typography \.regenerating::before,\s*\.theme-new-typography \.regenerating::after\s*{[^}]*content:\s*none;/s);
  assert.match(css, /\.theme-new-typography \.regen-line\.active\s*{[^}]*background:\s*var\(--accent\);/s);
  const shadows = [...css.matchAll(/box-shadow:\s*([^;]+);/g)].map(match => match[1].trim());
  assert.ok(shadows.every(shadow => shadow === "none"));
});

test("pattern and decoration keeps content surfaces opaque and section badges content-sized", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-4-postmodernism-plural-surfaces",
    "36-pattern-and-decoration.css"
  ));
  const script = read(path.join(
    ROOT,
    "styles",
    "act-4-postmodernism-plural-surfaces",
    "36-pattern-and-decoration.js"
  ));

  assert.match(css, /\.theme-pattern-and-decoration \.section-index\s*{[^}]*align-self:\s*start;[^}]*white-space:\s*nowrap;/s);
  assert.match(css, /\.theme-pattern-and-decoration :is\(\.card, \.hero-card, \.principle, \.timeline-item\)\s*{[^}]*background:\s*var\(--card\);[^}]*backdrop-filter:\s*none;/s);
  assert.match(css, /\.theme-pattern-and-decoration :is\([^}]*\.section-index[^}]*\.contact-panel[^}]*\.regen-box\)\s*{[^}]*border-radius:\s*var\(--radius\);/s);
  assert.match(css, /\.theme-pattern-and-decoration \.complete-project \.intro-list p\s*{[^}]*background:\s*var\(--card\);/s);
  assert.doesNotMatch(css, /border-radius:\s*(?:999|8|10|18)px/);
  assert.doesNotMatch(css, /box-shadow\s*:/);
  assert.doesNotMatch(script, /--style-(?:card|panel)-shadow/);
  assert.match(script, /"--style-button-radius":\s*"var\(--radius\)"/);
});

test("abstract expressionism keeps the animated hero content above its paint strokes", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-2-postwar-abstraction-perception-popular-culture",
    "12-abstract-expressionism.css"
  ));

  assert.match(css, /\.theme-abstract-expressionism \.hero-grid\s*{[^}]*position:\s*relative;[^}]*z-index:\s*2;/s);
  assert.match(css, /\.theme-abstract-expressionism \.hero::after\s*{[^}]*z-index:\s*1;/s);
});

test("compact decorated section indexes opt out of grid-row stretching", () => {
  const themes = [
    ["act-2-postwar-abstraction-perception-popular-culture", "12-abstract-expressionism", "abstract-expressionism"],
    ["act-3-material-concept-radical-design", "28-high-tech", "high-tech"],
    ["act-3-material-concept-radical-design", "30-anti-design", "anti-design"],
    ["act-4-postmodernism-plural-surfaces", "31-postmodernism", "postmodernism"],
    ["act-4-postmodernism-plural-surfaces", "36-pattern-and-decoration", "pattern-and-decoration"],
    ["act-5-computers-web-future-visual-culture", "40-glitch-art", "glitch-art"]
  ];

  themes.forEach(([directory, stem, themeId]) => {
    const css = read(path.join(ROOT, "styles", directory, `${stem}.css`));
    const compactBadgeRule = new RegExp(
      `\\.theme-${themeId} \\.section-index\\s*\\{[^}]*align-self:\\s*start;`,
      "s"
    );

    assert.match(css, compactBadgeRule, `${themeId} must keep its section badge at intrinsic height`);
  });
});

test("purism uses stable proportions, clear outlines, and a reduced geometric still life", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-1-avant-garde-modern-order",
    "04-purism.css"
  ));
  const script = read(path.join(
    ROOT,
    "styles",
    "act-1-avant-garde-modern-order",
    "04-purism.js"
  ));

  assert.match(script, /"--radius":\s*"2px"/);
  assert.match(css, /body\.theme-purism\s*{[^}]*background:\s*var\(--bg\)/s);
  assert.match(css, /\.theme-purism \.hero-grid\s*{[^}]*grid-template-columns:\s*minmax\(0, 1\.55fr\) minmax\(236px, \.52fr\)/s);
  assert.match(css, /\.theme-purism \.hero::before\s*{[^}]*border:\s*1px solid/s);
  assert.match(css, /\.theme-purism \.hero::after\s*{[^}]*border-radius:\s*50%/s);
  assert.match(css, /\.theme-purism \.card,[\s\S]*?\.theme-purism \.timeline-item\s*{[^}]*box-shadow:\s*none/s);
});

test("ZERO keeps its regeneration surface flat and fully outlined", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-2-postwar-abstraction-perception-popular-culture",
    "18-zero.css"
  ));

  assert.match(css, /\.theme-zero \.regen-box\s*{[^}]*border:\s*1px solid[^}]*box-shadow:\s*none;/s);
});

test("minimalism uses flat repeated modules without ornamental layers", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-2-postwar-abstraction-perception-popular-culture",
    "19-minimalism.css"
  ));
  const script = read(path.join(
    ROOT,
    "styles",
    "act-2-postwar-abstraction-perception-popular-culture",
    "19-minimalism.js"
  ));

  assert.match(css, /\.theme-minimalism :is\([\s\S]*?\.reveal[\s\S]*?\)\s*{[^}]*border:\s*1px solid var\(--line\);[^}]*border-radius:\s*0;[^}]*box-shadow:\s*none;/s);
  assert.match(css, /\.theme-minimalism \.regen-line::before\s*{[^}]*content:\s*none;/s);
  assert.match(css, /\.theme-minimalism \.footer-spotlight-card,[\s\S]*?\.theme-minimalism \.toast\s*{[^}]*border-radius:\s*0;[^}]*box-shadow:\s*none;/s);
  assert.doesNotMatch(css, /gradient\(|nth-child\(|\.(?:brand|hero|regen-box)::(?:before|after)/);
  assert.match(script, /"--style-component-outline":\s*"0 solid transparent"/);
  assert.match(script, /"--style-(?:card|panel|button)-shadow":\s*"none"/);
});

test("early computer art keeps plotted surfaces flat while retaining geometric linework", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-5-computers-web-future-visual-culture",
    "37-early-computer-art.css"
  ));

  assert.match(css, /\.theme-early-computer-art :is\(\.card, \.hero-card, \.principle, \.timeline-item\)\s*{[^}]*box-shadow:\s*none;/s);
  assert.match(css, /\.theme-early-computer-art \.regen-box\s*{[^}]*border:\s*1px solid[^}]*box-shadow:\s*none;/s);
  assert.match(css, /\.theme-early-computer-art \.reveal::before\s*{[^}]*box-shadow:\s*inset 0 0 0 32px/s);
});

test("soviet modernism uses a wide civic canvas and modular facade rhythm", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-3-material-concept-radical-design",
    "24-soviet-modernism.css"
  ));
  const script = read(path.join(
    ROOT,
    "styles",
    "act-3-material-concept-radical-design",
    "24-soviet-modernism.js"
  ));

  assert.match(script, /id:\s*"soviet-modernism"/);
  assert.match(script, /period:\s*"1950s"/);
  assert.match(css, /body\.theme-soviet-modernism\.layout-single \.site\s*{[^}]*max-width:\s*var\(--style-site-width\)/s);
  assert.match(css, /\.theme-soviet-modernism \.hero::before\s*{[^}]*clip-path:/s);
  assert.match(css, /\.theme-soviet-modernism \.section-index\s*{[^}]*repeating-linear-gradient/s);
});

test("both locale entry points load every style in registry order", () => {
  for (const entryPoint of ["index.html", "zh.html"]) {
    const html = read(path.join(ROOT, entryPoint));
    let previousPosition = -1;

    STYLE_ENTRIES.forEach(([directory, stem]) => {
      const cssPosition = html.indexOf(`${stem}.css`);
      const jsPosition = html.indexOf(`${stem}.js`);
      assert.ok(cssPosition > previousPosition, `${entryPoint} CSS order is wrong at ${stem}`);
      assert.ok(jsPosition > cssPosition, `${entryPoint} does not load ${stem}.js after its CSS`);
      previousPosition = cssPosition;
    });
  }
});

test("theme stylesheets target their own class and have balanced blocks", () => {
  const styles = loadStyleRegistry();

  STYLE_ENTRIES.forEach(([directory, stem], index) => {
    const css = read(path.join(ROOT, "styles", directory, `${stem}.css`)).replace(/\/\*[\s\S]*?\*\//g, "");
    assert.ok(css.includes(`.theme-${styles[index].id}`));
    const opening = (css.match(/{/g) || []).length;
    const closing = (css.match(/}/g) || []).length;
    assert.equal(opening, closing, `${stem}.css has unbalanced blocks`);
  });
});

test("every theme scopes its regeneration overlay and box", () => {
  const styles = loadStyleRegistry();

  STYLE_ENTRIES.forEach(([directory, stem], index) => {
    const css = read(path.join(ROOT, "styles", directory, `${stem}.css`));
    const style = styles[index];

    for (const targetClass of ["regenerating", "regen-box"]) {
      assert.ok(
        hasScopedThemeSelector(css, style.id, targetClass),
        `${stem}.css must scope .${targetClass} beneath .theme-${style.id}`
      );
    }
  });
});

test("post-internet art preserves its wide catalog canvas", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-5-computers-web-future-visual-culture",
    "41-post-internet-art.css"
  ));

  assert.match(css, /body\.theme-post-internet-art\.layout-single \.site\s*{[^}]*max-width:\s*var\(--style-site-width\)/s);
});

test("international typographic style is identified as typography rather than architectural International Style", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-2-postwar-abstraction-perception-popular-culture",
    "20-international-typographic-style.css"
  ));
  const script = read(path.join(
    ROOT,
    "styles",
    "act-2-postwar-abstraction-perception-popular-culture",
    "20-international-typographic-style.js"
  ));

  assert.match(script, /zh:\s*"国际字体排印风格"/);
  assert.match(script, /不是 1920 年代的建筑“国际风格”/);
  assert.match(script, /“瑞士风格”是它的别称/);
  assert.doesNotMatch(script, /瑞士国际主义排版/);
  assert.match(css, /--its-columns:\s*repeat\(12, minmax\(0, 1fr\)\)/);
  assert.match(css, /repeating-linear-gradient/);
  assert.match(css, /\.theme-international-typographic-style \.project-card\s*{[^}]*grid-template-columns:\s*repeat\(9, minmax\(0, 1fr\)\)/s);
  assert.doesNotMatch(css, /content:\s*"20"/);
  assert.doesNotMatch(css, /INTERNATIONAL\\A TYPOGRAPHIC STYLE/);
  assert.doesNotMatch(css, /font-size:\s*(?:10|11)px/);
  assert.match(css, /\.theme-international-typographic-style \.contact-links \.button:is\(:hover, :focus-visible, :active\)\s*{[^}]*background:\s*var\(--fg\);[^}]*color:\s*var\(--bg\);/s);
  assert.match(css, /\.theme-international-typographic-style \.contact-links \.button::selection\s*{[^}]*background:\s*var\(--bg\);[^}]*color:\s*var\(--fg\);/s);
  assert.match(css, /\.theme-international-typographic-style \.reveal-stat-section\s*{[^}]*border:\s*0;/s);
  assert.match(css, /\.theme-international-typographic-style \.reveal-stat-section \+ \.reveal-stat-section\s*{[^}]*margin-top:\s*0;[^}]*border-top:\s*1px solid var\(--line\);/s);
});

test("cyberpunk visual culture uses a yellow field-dossier system without fake status copy", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-5-computers-web-future-visual-culture",
    "39-cyberpunk-visual-culture.css"
  ));
  const script = read(path.join(
    ROOT,
    "styles",
    "act-5-computers-web-future-visual-culture",
    "39-cyberpunk-visual-culture.js"
  ));
  const boxShadows = [...css.matchAll(/box-shadow\s*:\s*([^;]+);/g)].map(match => match[1].trim());
  const borderRadii = [...css.matchAll(/border-radius\s*:\s*([^;]+);/g)].map(match => match[1].trim());

  assert.match(script, /"--bg":\s*"#040606"/);
  assert.match(script, /"--accent":\s*"#ffd84f"/);
  assert.match(css, /--cyber-yellow:\s*#ffd84f/);
  assert.match(css, /--cyber-acid:\s*#c6ff3f/);
  assert.match(css, /--cyber-coral:\s*#ff5a45/);
  assert.match(css, /--cyber-ice:\s*#79eadf/);
  assert.match(css, /\.theme-cyberpunk-visual-culture \.cyber-field-strip\s*{/);
  assert.match(css, /\.theme-cyberpunk-visual-culture \.button\s*{[^}]*clip-path:\s*none;/s);
  assert.match(css, /\.theme-cyberpunk-visual-culture \.button::before\s*{[^}]*content:\s*none;/s);
  assert.match(css, /\.theme-cyberpunk-visual-culture h1\s*{[^}]*overflow:\s*visible;[^}]*text-shadow:\s*none;/s);
  assert.doesNotMatch(css, /\.theme-cyberpunk-visual-culture h1::after/);
  assert.match(css, /\.theme-cyberpunk-visual-culture \.project-card::after\s*{[^}]*content:\s*attr\(data-number\)/s);
  assert.match(css, /\.theme-cyberpunk-visual-culture \.cyber-filter\s*{[^}]*grid-column:\s*1 \/ -1;[^}]*align-self:\s*start;/s);
  assert.match(script, /cardsContainer\.prepend\(toolbar\)/);
  assert.match(script, /button\.setAttribute\("aria-label", filter\.label\)/);
  assert.match(css, /\.theme-cyberpunk-visual-culture \.hero::after\s*{[^}]*border-radius:\s*0;/s);
  assert.ok(boxShadows.every(value => /^none(?:\s*!important)?$/.test(value)));
  assert.ok(borderRadii.every(value => /^(?:0|0px)$/.test(value)));
  assert.match(script, /filterLabel:\s*"按技术筛选项目索引"/);
  assert.match(script, /field:\s*"Project dossier \/ 42"/);
  assert.match(script, /field:\s*"作品档案 \/ 42"/);
  assert.match(css, /content:\s*"42 \/ VISUAL CULTURE"/);
  assert.match(css, /content:\s*"STYLE RECORD \/ 042"/);
  assert.doesNotMatch(css, /content:\s*"[^"\n]*\b0?39\b/);
  assert.doesNotMatch(css, /\.generated-description::(?:before|after)/);
  assert.doesNotMatch(script, /上行链路|uplink|signal interference|信号干扰|system notice|系统通知/i);
});

test("high-tech preserves its wide construction canvas", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-3-material-concept-radical-design",
    "28-high-tech.css"
  ));

  assert.match(css, /body\.theme-high-tech\.layout-single \.site\s*{[^}]*max-width:\s*var\(--style-site-width\)/s);
});

test("featured projects remain equal-width full rows across themes", () => {
  const app = read(path.join(ROOT, "assets", "app.js"));
  const css = read(path.join(ROOT, "assets", "styles.css"));

  assert.match(app, /<article class="card project-card">/);
  assert.doesNotMatch(app, /class="card \$\{i === 0 \? "full"/);
  assert.match(css, /#work \.cards\s*{[^}]*grid-template-columns:\s*minmax\(0, 1fr\) !important/s);
  assert.match(css, /#work \.project-card\s*{[^}]*grid-column:\s*1 \/ -1 !important[^}]*inline-size:\s*100% !important[^}]*margin-inline:\s*0 !important/s);
});

test("all local stylesheet and script references resolve", () => {
  const htmlFiles = [
    path.join(ROOT, "index.html"),
    path.join(ROOT, "zh.html"),
    ...STYLE_ENTRIES.map(([directory, stem]) => path.join(ROOT, "styles", directory, `${stem}.html`))
  ];

  htmlFiles.forEach(htmlPath => {
    const html = read(htmlPath);
    const references = [...html.matchAll(/(?:href|src)=["']([^"']+)["']/g)]
      .map(match => match[1])
      .filter(reference => !/^(?:https?:|mailto:|#)/.test(reference));

    references.forEach(reference => {
      const localPath = path.resolve(path.dirname(htmlPath), reference.split(/[?#]/, 1)[0]);
      assert.ok(fs.existsSync(localPath), `${path.relative(ROOT, htmlPath)} references missing ${reference}`);
    });
  });
});
