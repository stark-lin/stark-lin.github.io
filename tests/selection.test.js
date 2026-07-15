"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { createPoolRandom, pick, shuffle } = require("../assets/selection.js");

function sample(rng, count = 12) {
  return Array.from({ length: count }, () => rng());
}

test("a pool stream is deterministic for the same reference code", () => {
  const first = sample(createPoolRandom("SL-DEMO", "copy"));
  const second = sample(createPoolRandom("SL-DEMO", "copy"));
  assert.deepEqual(first, second);
});

test("copy and style use independent random streams", () => {
  const expectedStyle = sample(createPoolRandom("SL-DEMO", "style"));
  const copy = createPoolRandom("SL-DEMO", "copy");

  // Consuming or expanding the copy draw sequence must not advance the style stream.
  sample(copy, 100);

  const actualStyle = sample(createPoolRandom("SL-DEMO", "style"));
  assert.deepEqual(actualStyle, expectedStyle);
  assert.notDeepEqual(actualStyle, sample(createPoolRandom("SL-DEMO", "copy")));
});

test("pool versions intentionally create new deterministic mappings", () => {
  const versionOne = sample(createPoolRandom("SL-DEMO", "style", 1));
  const versionTwo = sample(createPoolRandom("SL-DEMO", "style", 2));
  assert.notDeepEqual(versionOne, versionTwo);
});

test("pool helpers never mutate their source arrays", () => {
  const source = Object.freeze(["a", "b", "c", "d"]);
  const rng = createPoolRandom("SL-DEMO", "copy");
  const selected = pick(rng, source);
  const shuffled = shuffle(rng, source);

  assert.ok(source.includes(selected));
  assert.deepEqual([...source], ["a", "b", "c", "d"]);
  assert.deepEqual([...shuffled].sort(), [...source].sort());
});
