"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { createPoolRandom, pick, seedModulo, shuffle } = require("../assets/selection.js");

const REFERENCE_CODE_OPTIONS = Object.freeze({
  prefix: "SL-",
  alphabet: "0123456789ABCDEF",
  caseInsensitive: true,
  hashInvalid: true
});

function sample(rng, count = 12) {
  return Array.from({ length: count }, () => rng());
}

test("a pool stream is deterministic for the same reference code", () => {
  const first = sample(createPoolRandom("SL-DEMO", "copy"));
  const second = sample(createPoolRandom("SL-DEMO", "copy"));
  assert.deepEqual(first, second);
});

test("named pools use independent random streams", () => {
  const expectedSecondary = sample(createPoolRandom("SL-DEMO", "secondary"));
  const copy = createPoolRandom("SL-DEMO", "copy");

  // Consuming one draw sequence must not advance another named stream.
  sample(copy, 100);

  const actualSecondary = sample(createPoolRandom("SL-DEMO", "secondary"));
  assert.deepEqual(actualSecondary, expectedSecondary);
  assert.notDeepEqual(actualSecondary, sample(createPoolRandom("SL-DEMO", "copy")));
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

test("seed modulo maps the reference code directly without floating-point conversion", () => {
  assert.equal(seedModulo("SL-0", 42, REFERENCE_CODE_OPTIONS), 0);
  assert.equal(seedModulo("SL-2A", 42, REFERENCE_CODE_OPTIONS), 0);
  assert.equal(seedModulo("SL-2B", 42, REFERENCE_CODE_OPTIONS), 1);
  assert.equal(seedModulo("SL-ff", 42, REFERENCE_CODE_OPTIONS), 3);

  const longSeed = `SL-${"F".repeat(42)}`;
  const expected = Number(BigInt(`0x${longSeed.slice(3)}`) % 42n);
  assert.equal(seedModulo(longSeed, 42, REFERENCE_CODE_OPTIONS), expected);
});

test("seed modulo hashes non-hex reference codes as a deterministic fallback", () => {
  const first = seedModulo("SL-DEMO!", 42, REFERENCE_CODE_OPTIONS);
  const second = seedModulo("SL-DEMO!", 42, REFERENCE_CODE_OPTIONS);

  assert.equal(first, second);
  assert.ok(Number.isInteger(first));
  assert.ok(first >= 0 && first < 42);
});

test("seed modulo requires at least one seed character", () => {
  assert.throws(() => seedModulo("SL-", 42, REFERENCE_CODE_OPTIONS), /non-empty seed/);
});
