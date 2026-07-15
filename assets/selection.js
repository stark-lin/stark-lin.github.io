(function exposeSelectionEngine(root, factory) {
  "use strict";

  const api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  if (root) {
    root.PORTFOLIO_SELECTION = api;
  }
})(typeof globalThis === "object" ? globalThis : this, () => {
  "use strict";

  function cyrb128(value) {
    let h1 = 1779033703;
    let h2 = 3144134277;
    let h3 = 1013904242;
    let h4 = 2773480762;

    for (let index = 0; index < value.length; index += 1) {
      const code = value.charCodeAt(index);
      h1 = h2 ^ Math.imul(h1 ^ code, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ code, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ code, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ code, 2716044179);
    }

    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);

    return [
      (h1 ^ h2 ^ h3 ^ h4) >>> 0,
      (h2 ^ h1) >>> 0,
      (h3 ^ h1) >>> 0,
      (h4 ^ h1) >>> 0
    ];
  }

  function sfc32(a, b, c, d) {
    return function random() {
      a >>>= 0;
      b >>>= 0;
      c >>>= 0;
      d >>>= 0;

      let result = (a + b) | 0;
      a = b ^ (b >>> 9);
      b = (c + (c << 3)) | 0;
      c = (c << 21) | (c >>> 11);
      d = (d + 1) | 0;
      result = (result + d) | 0;
      c = (c + result) | 0;
      return (result >>> 0) / 4294967296;
    };
  }

  function createPoolRandom(referenceCode, poolName, version = 1) {
    if (typeof poolName !== "string" || !poolName.trim()) {
      throw new Error("A non-empty pool name is required.");
    }

    if (!Number.isInteger(version) || version < 1) {
      throw new Error("A positive integer pool version is required.");
    }

    // JSON encoding prevents ambiguous seeds such as ["ab", "c"] and ["a", "bc"].
    const seed = JSON.stringify({ pool: poolName, version, referenceCode: String(referenceCode) });
    return sfc32(...cyrb128(seed));
  }

  function seedModulo(seed, modulus, {
    prefix = "",
    alphabet = "0123456789",
    caseInsensitive = false,
    hashInvalid = false
  } = {}) {
    if (!Number.isInteger(modulus) || modulus < 1) {
      throw new Error("A positive integer modulus is required.");
    }
    if (typeof prefix !== "string") throw new Error("The seed prefix must be a string.");
    if (typeof alphabet !== "string" || !alphabet.length) {
      throw new Error("A non-empty seed alphabet is required.");
    }
    if (new Set(alphabet).size !== alphabet.length) {
      throw new Error("The seed alphabet cannot contain duplicate characters.");
    }

    if (typeof caseInsensitive !== "boolean" || typeof hashInvalid !== "boolean") {
      throw new Error("Seed modulo flags must be boolean values.");
    }

    const referenceCode = String(seed);
    const payload = prefix && referenceCode.startsWith(prefix)
      ? referenceCode.slice(prefix.length)
      : referenceCode;
    if (!payload.length) throw new Error("A non-empty seed is required.");

    const normalizedPayload = caseInsensitive ? payload.toUpperCase() : payload;
    const normalizedAlphabet = caseInsensitive ? alphabet.toUpperCase() : alphabet;
    if (new Set(normalizedAlphabet).size !== normalizedAlphabet.length) {
      throw new Error("The normalized seed alphabet cannot contain duplicate characters.");
    }
    const bigModulus = BigInt(modulus);
    const base = BigInt(normalizedAlphabet.length);
    let remainder = 0n;

    for (const character of normalizedPayload) {
      const digit = normalizedAlphabet.indexOf(character);
      if (digit === -1) {
        if (hashInvalid) {
          return Number(cyrb128(referenceCode).reduce(
            (hashRemainder, word) => ((hashRemainder << 32n) + BigInt(word)) % bigModulus,
            0n
          ));
        }
        throw new Error(`Seed contains character "${character}" outside its alphabet.`);
      }
      remainder = (remainder * base + BigInt(digit)) % bigModulus;
    }
    return Number(remainder);
  }

  function uniformTrait(rng, options) {
    if (typeof rng !== "function") throw new Error("A random function is required.");
    if (!Array.isArray(options) || options.length === 0) {
      throw new Error("A selection pool cannot be empty.");
    }

    const index = Math.floor(rng() * options.length);
    return { value: options[index], index, probability: 1 / options.length };
  }

  function pick(rng, options) {
    return uniformTrait(rng, options).value;
  }

  function shuffle(rng, options) {
    if (!Array.isArray(options)) throw new Error("A selection pool must be an array.");

    const result = [...options];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(rng() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function pickN(rng, options, count) {
    if (!Number.isInteger(count) || count < 0) {
      throw new Error("Selection count must be a non-negative integer.");
    }
    return shuffle(rng, options).slice(0, count);
  }

  return Object.freeze({ createPoolRandom, pick, pickN, seedModulo, shuffle, uniformTrait });
});
