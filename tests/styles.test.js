"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");
const STYLE_DIRECTORY = path.join(ROOT, "styles", "act-1-avant-garde-modern-order");
const STYLE_STEMS = [
  "00-futurism",
  "01-dada",
  "02-suprematism",
  "03-de-stijl",
  "04-purism",
  "05-constructivism",
  "06-bauhaus",
  "07-surrealism",
  "08-new-typography",
  "09-art-deco",
  "10-international-style",
  "11-concrete-art"
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function loadStyleRegistry() {
  const context = vm.createContext({ window: {} });
  vm.runInContext(read(path.join(ROOT, "assets", "data", "styles.js")), context);
  STYLE_STEMS.forEach(stem => {
    vm.runInContext(read(path.join(STYLE_DIRECTORY, `${stem}.js`)), context);
  });
  return context.window.PORTFOLIO_STYLE_POOL;
}

test("the style folder contains one complete, continuously numbered trio per style", () => {
  STYLE_STEMS.forEach((stem, index) => {
    assert.equal(stem.slice(0, 2), String(index).padStart(2, "0"));
    for (const extension of ["html", "js", "css"]) {
      assert.ok(fs.existsSync(path.join(STYLE_DIRECTORY, `${stem}.${extension}`)), `${stem}.${extension} is missing`);
    }
  });
});

test("all twelve styles register once with bilingual exhibition copy", () => {
  const styles = loadStyleRegistry();
  assert.equal(styles.length, STYLE_STEMS.length);
  assert.equal(new Set(styles.map(style => style.id)).size, STYLE_STEMS.length);

  styles.forEach(style => {
    assert.ok(style.classNames.includes(`theme-${style.id}`));
    assert.ok(style.label.en);
    assert.ok(style.label.zh);
    assert.ok(style.introduction.en);
    assert.ok(style.introduction.zh);
  });
});

test("each standalone preview forces and loads only its matching style", () => {
  const styles = loadStyleRegistry();

  STYLE_STEMS.forEach((stem, index) => {
    const html = read(path.join(STYLE_DIRECTORY, `${stem}.html`));
    const style = styles[index];
    assert.match(html, new RegExp(`PORTFOLIO_FORCED_STYLE_ID = ["']${style.id}["']`));
    assert.match(html, new RegExp(`href=["']\\./${stem}\\.css["']`));
    assert.match(html, new RegExp(`src=["']\\./${stem}\\.js["']`));
  });
});

test("both locale entry points load every style in registry order", () => {
  for (const entryPoint of ["index.html", "zh.html"]) {
    const html = read(path.join(ROOT, entryPoint));
    let previousPosition = -1;

    STYLE_STEMS.forEach(stem => {
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

  STYLE_STEMS.forEach((stem, index) => {
    const css = read(path.join(STYLE_DIRECTORY, `${stem}.css`)).replace(/\/\*[\s\S]*?\*\//g, "");
    assert.ok(css.includes(`.theme-${styles[index].id}`));
    const opening = (css.match(/{/g) || []).length;
    const closing = (css.match(/}/g) || []).length;
    assert.equal(opening, closing, `${stem}.css has unbalanced blocks`);
  });
});

test("all local stylesheet and script references resolve", () => {
  const htmlFiles = [
    path.join(ROOT, "index.html"),
    path.join(ROOT, "zh.html"),
    ...STYLE_STEMS.map(stem => path.join(STYLE_DIRECTORY, `${stem}.html`))
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
