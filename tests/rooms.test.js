"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const rooms = [
  ["01-purism", "purism"],
  ["02-constructivism", "constructivism"],
  ["03-suprematism", "suprematism"],
  ["04-de-stijl", "de-stijl"]
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function createRng(seed) {
  let state = 2166136261;
  for (const character of seed) {
    state ^= character.codePointAt(0);
    state = Math.imul(state, 16777619);
  }
  return () => {
    state = Math.imul(state ^ (state >>> 15), 2246822519) >>> 0;
    return state / 4294967296;
  };
}

function pick(rng, values) {
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

function captureRoom(relativePath) {
  let captured;
  const sandbox = {
    window: { RoomRuntime: { start(room) { captured = room; } } },
    document: { documentElement: { style: { setProperty() {} } } }
  };
  vm.runInNewContext(read(relativePath), sandbox, { filename: relativePath });
  return captured;
}

function routeForSeed(seed, language = "en-US") {
  let destination = "";
  const href = `https://example.test/index.html?seed=${encodeURIComponent(seed)}`;
  const sandbox = {
    URL,
    URLSearchParams,
    crypto: { getRandomValues() { throw new Error("Seed generation must not run when a seed is supplied."); } },
    document: { documentElement: { lang: language } },
    window: {
      location: {
        href,
        search: new URL(href).search,
        replace(value) { destination = String(value); }
      }
    }
  };
  vm.runInNewContext(read("assets/app.js"), sandbox, { filename: "assets/app.js" });
  return new URL(destination);
}

function mockModel(room, roomConfig) {
  return {
    seed: "test-seed",
    language: "en",
    isZh: false,
    labels: {
      nav: { entry: "Entry", archive: "Archive", contact: "Contact", again: "Again" },
      sections: { projects: "Projects", experience: "Experience", education: "Education", stack: "Working Stack", room: "Exhibition Note" },
      details: "View details",
      closeDetails: "Hide details",
      repository: "Open repository",
      technology: "Technology",
      courseProject: "Course project",
      layout: "Current composition",
      seed: "Seed",
      copy: "Copy this version",
      email: "Email",
      linkedinMissing: "LinkedIn not listed",
      generate: "Generate another version",
      language: "中文",
      languageAria: "Switch to Chinese",
      scroll: "Continue"
    },
    data: { identity: { name: "Stark Lin" } },
    hero: { kicker: "Backend systems", headline: "Systems need structure.", secondary: "A stable secondary line." },
    middleOrder: ["projects", "experience", "education", "working-stack", "room-introduction"],
    projects: [
      { id: "saturn", title: "Saturn", subtitle: "Personal data backend", description: "A modular backend.", stack: "Go · PostgreSQL", url: "https://example.com/saturn", bullets: ["One", "Two"] },
      { id: "ojlite", title: "OJLite", subtitle: "Teaching judge", description: "A compact online judge.", stack: "Go · SQLite", url: "https://example.com/ojlite", bullets: ["Three", "Four"] }
    ],
    experience: { title: "Assessment Platform", subtitle: "Product lead", description: "A reviewable workflow.", bullets: ["Defined roles", "Added review"] },
    education: { school: "UNSW", degree: "Bachelor of Computer Science", graduation: "Expected Dec 2026", body: "Computer science training." },
    skills: [["Languages", ["Go", "Python"]], ["Backend", ["REST API"]], ["Databases", ["PostgreSQL"]], ["Tools", ["Docker"]]],
    contactCopy: { headline: "Start a useful conversation.", body: "Email is direct." },
    contact: { email: "stark@example.com", github: "https://github.com/stark" },
    room,
    roomConfig
  };
}

for (const [basename, styleId] of rooms) {
  const directory = `rooms/${basename}`;
  const htmlPath = `${directory}/${basename}.html`;
  const cssPath = `${directory}/${basename}.css`;
  const jsPath = `${directory}/${basename}.js`;
  const specPath = `docs/rooms/${basename}.md`;

  for (const file of [htmlPath, cssPath, jsPath, specPath]) {
    assert.ok(fs.existsSync(path.join(root, file)), `${file} must exist`);
    assert.ok(read(file).trim().length > 0, `${file} must not be empty`);
  }

  const html = read(htmlPath);
  const css = read(cssPath);
  const js = read(jsPath);
  assert.ok(html.indexOf('id="hero"') < html.indexOf('id="middle-sequence"'));
  assert.ok(html.indexOf('id="middle-sequence"') < html.indexOf('id="contact"'));
  assert.ok(html.indexOf('id="contact"') < html.indexOf('id="roll-again"'));
  assert.match(css, /@media \(max-width:/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(`${css}\n${js}`, /Math\.random\s*\(/);
  assert.doesNotMatch(css, /gradient\s*\(/i);

  const room = captureRoom(jsPath);
  assert.equal(room.id, styleId);
  const configure = () => room.configure({
    deriveRng: namespace => createRng(`test-seed::${namespace}`),
    pick,
    shuffle,
    seed: "test-seed"
  });
  assert.deepEqual(configure(), configure(), `${basename} config must be deterministic`);

  const roomConfig = configure();
  const rendered = room.render(mockModel(room, roomConfig), { escapeHtml: value => String(value) });
  for (const key of ["navigation", "hero", "middle", "contact", "rollAgain"]) {
    assert.ok(rendered[key].length > 0, `${basename} must render ${key}`);
  }
  assert.match(rendered.hero, /id="hero-title"/);
  assert.match(rendered.contact, /id="contact-title"/);
  assert.match(rendered.rollAgain, /data-roll-again/);
  assert.match(rendered.middle, /id="room-introduction"/);
  assert.ok(
    rendered.middle.indexOf('id="room-introduction"') > rendered.middle.indexOf('id="working-stack"'),
    `${basename} must keep the exhibition note at the end of the middle sequence`
  );
  assert.equal((rendered.middle.match(/>Saturn</g) || []).length, 1);
  assert.equal((rendered.middle.match(/>OJLite</g) || []).length, 1);

  let previous = -1;
  for (const key of mockModel(room, roomConfig).middleOrder) {
    const current = rendered.middle.indexOf(`id="${key}"`);
    assert.ok(current > previous, `${basename} must preserve seeded DOM order`);
    previous = current;
  }
}

const allGenerationCode = ["assets/app.js", "core/room-runtime.js", ...rooms.map(([basename]) => `rooms/${basename}/${basename}.js`)]
  .map(read)
  .join("\n");
assert.doesNotMatch(allGenerationCode, /Math\.random\s*\(/);
assert.match(read("core/room-runtime.js"), /hash\(`\$\{seed\}::room`\) % ROOM_PATHS\.length/);
assert.match(read("assets/app.js"), /hash\(`\$\{seed\}::room`\) % rooms\.length/);
assert.match(
  read("core/room-runtime.js"),
  /middleOrder:\s*\[\s*\.\.\.shuffle\(middleRng, \["projects", "experience", "education", "working-stack"\]\),\s*"room-introduction"\s*\]/s
);

const routedRooms = ["test-1", "test-2", "test-3", "test-4"].map(seed => routeForSeed(seed).pathname);
assert.deepEqual(routedRooms, [
  "/rooms/01-purism/01-purism.html",
  "/rooms/02-constructivism/02-constructivism.html",
  "/rooms/03-suprematism/03-suprematism.html",
  "/rooms/04-de-stijl/04-de-stijl.html"
]);
assert.equal(routeForSeed("test-1", "zh-CN").searchParams.get("lang"), "zh");

console.log("Room implementation checks passed for rooms 01–04.");
