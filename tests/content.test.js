"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const selection = require("../assets/selection.js");

const ROOT = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(ROOT, file), "utf8");
const plain = value => JSON.parse(JSON.stringify(value));

function load(lang) {
  const context = vm.createContext({ window: {} });
  vm.runInContext(read(`assets/data/${lang}.js`), context);
  return plain(context.window.PORTFOLIO_LOCALE);
}

function generator(lang) {
  const context = vm.createContext({ window: { PORTFOLIO_LOCALE: load(lang), PORTFOLIO_SELECTION: selection } });
  vm.runInContext(read("assets/data/styles.js"), context);
  const paths = [...read("index.html").matchAll(/<script src="\.\/(styles\/[^"]+\.js)"><\/script>/g)];
  for (const [, file] of paths) vm.runInContext(read(file), context);
  // Exercise the real composition functions without creating a browser DOM.
  vm.runInContext(read("assets/app.js").replace(/    init\(\);/, "    window.generate = generateConfig;"), context);
  return id => plain(context.window.generate(id));
}

test("both locales share project IDs, exact project schema, and factual fields", () => {
  const locales = [load("en"), load("zh")];
  const fields = ["id", "title", "subtitle", "stack", "url", "tags", "intros", "bullets"].sort();
  for (const locale of locales) {
    assert.deepEqual(locale.data.projects.map(project => project.id), ["jab", "llmf", "saturn", "ojlite"]);
    assert.equal(locale.data.experienceProject.id, "genai-platform");
    assert.deepEqual(Object.keys(locale.descriptions).sort(), ["jab", "llmf", "saturn", "ojlite", "genai-platform"].sort());
    for (const project of locale.data.projects) {
      assert.deepEqual(Object.keys(project).sort(), fields);
      for (const field of ["tags", "intros", "bullets"]) {
        assert.ok(project[field].length > 0);
        assert.ok(project[field].every(value => typeof value === "string" && value.trim()));
      }
    }
  }
  const [en, zh] = locales;
  en.data.projects.forEach((project, index) => {
    const translated = zh.data.projects[index];
    for (const field of ["id", "title", "stack", "url"]) assert.equal(project[field], translated[field]);
    for (const field of ["tags", "intros", "bullets"]) assert.equal(project[field].length, translated[field].length);
  });
  assert.deepEqual(en.ui.skills.map(([, skills]) => skills.length), zh.ui.skills.map(([, skills]) => skills.length));
});

test("Principles is absent from data, navigation, section leads, and rendering", () => {
  for (const lang of ["en", "zh"]) {
    const locale = load(lang);
    for (const source of [locale.data, locale.data.sectionLeads, locale.ui.nav, locale.ui.sectionTitles]) {
      assert.ok(!Object.hasOwn(source, "principles"));
    }
  }
  assert.doesNotMatch(read("assets/app.js"), /principles|renderPrinciples/i);
});

test("reference codes reproduce bilingual composition without pinning projects or remapping styles", () => {
  const en = generator("en");
  const zh = generator("zh");
  const projectOrders = new Set();
  const headlines = new Set();
  const styles = new Set();
  const firstProjects = new Set();
  const sectionOrders = new Set();
  for (let seed = 0; seed < 420; seed += 1) {
    const id = `SL-${seed.toString(16).toUpperCase()}`;
    const first = en(id);
    const translated = zh(id);
    assert.deepEqual(first, en(id));
    assert.deepEqual(translated, zh(id));
    assert.deepEqual(first.sections, translated.sections);
    assert.equal(first.educationPlacement, translated.educationPlacement);
    assert.deepEqual(first.projects.map(project => project.id), translated.projects.map(project => project.id));
    assert.equal(first.style.id, translated.style.id);
    assert.equal(first.style.id, en(`SL-${(seed + 42).toString(16).toUpperCase()}`).style.id);
    assert.ok(!first.sections.includes("principles"));
    assert.equal(first.projects.length, 4);
    assert.equal(first.experienceProject.id, "genai-platform");
    assert.equal(Object.hasOwn(first, "principles"), false);
    styles.add(first.style.id);
    headlines.add(first.headline);
    projectOrders.add(first.projects.map(project => project.id).join(","));
    firstProjects.add(first.projects[0].id);
    sectionOrders.add(first.sections.join(","));
  }
  assert.equal(styles.size, 42);
  assert.equal(headlines.size, load("en").data.heroHeadlines.length);
  assert.equal(projectOrders.size, 24);
  assert.equal(firstProjects.size, 4);
  assert.ok(sectionOrders.size > 1);
});

test("Chinese hero phrase boundaries preserve every headline", () => {
  const locale = load("zh");
  for (const headline of locale.data.heroHeadlines) {
    const text = headline.replace(/。$/u, "");
    assert.equal(locale.titlePhrases[text].join(""), text);
  }
});
