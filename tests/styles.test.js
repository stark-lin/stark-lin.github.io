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
  ["act-3-material-concept-radical-design", "24-conceptual-art"],
  ["act-3-material-concept-radical-design", "25-arte-povera"],
  ["act-3-material-concept-radical-design", "26-metabolism"],
  ["act-3-material-concept-radical-design", "27-high-tech"],
  ["act-3-material-concept-radical-design", "28-radical-design"],
  ["act-3-material-concept-radical-design", "29-anti-design"],
  ["act-4-postmodernism-plural-surfaces", "30-postmodernism"],
  ["act-4-postmodernism-plural-surfaces", "31-memphis"],
  ["act-4-postmodernism-plural-surfaces", "32-new-wave-typography"],
  ["act-4-postmodernism-plural-surfaces", "33-deconstructivism"],
  ["act-4-postmodernism-plural-surfaces", "34-neo-geo"],
  ["act-4-postmodernism-plural-surfaces", "35-pattern-and-decoration"],
  ["act-5-computers-web-future-visual-culture", "36-early-computer-art"],
  ["act-5-computers-web-future-visual-culture", "37-ascii-art"],
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
    "33-deconstructivism.css"
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

test("post-internet art preserves its wide catalog canvas", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-5-computers-web-future-visual-culture",
    "41-post-internet-art.css"
  ));

  assert.match(css, /body\.theme-post-internet-art\.layout-single \.site\s*{[^}]*max-width:\s*var\(--style-site-width\)/s);
});

test("high-tech preserves its wide construction canvas", () => {
  const css = read(path.join(
    ROOT,
    "styles",
    "act-3-material-concept-radical-design",
    "27-high-tech.css"
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
