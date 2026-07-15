(() => {
  "use strict";

  const rooms = [
    "01-purism",
    "02-constructivism",
    "03-suprematism",
    "04-de-stijl"
  ];

  function hash(value) {
    let result = 2166136261;
    for (const character of value) {
      result ^= character.codePointAt(0);
      result = Math.imul(result, 16777619);
    }
    return result >>> 0;
  }

  function createSeed() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return `SL-${[...bytes].map(byte => alphabet[byte % alphabet.length]).join("")}`;
  }

  const params = new URLSearchParams(window.location.search);
  const suppliedSeed = params.get("seed") || params.get("id");
  const seed = suppliedSeed || createSeed();
  const language = document.documentElement.lang.startsWith("zh") ? "zh" : "en";
  const room = rooms[hash(`${seed}::room`) % rooms.length];
  const url = new URL(`./rooms/${room}/${room}.html`, window.location.href);

  url.searchParams.set("seed", seed);
  url.searchParams.set("lang", language);
  if (!suppliedSeed) url.searchParams.set("entry", "1");
  window.location.replace(url);
})();
