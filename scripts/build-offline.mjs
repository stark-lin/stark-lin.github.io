import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const output = new URL("dist/molybdenum-offline.html", root);
const read = path => readFileSync(new URL(path, root), "utf8").replaceAll("\r\n", "\n");

function readInlineAsset(path, tag) {
  const source = read(path);
  if (new RegExp(`</${tag}(?:[\\s/>]|$)`, "i").test(source)) {
    throw new Error(`${path} contains a closing </${tag}> tag and cannot be inlined.`);
  }
  return source;
}

function inlineStylesheet(path) {
  const css = readInlineAsset(path, "style");
  const resourceUrls = css.matchAll(/\burl\(\s*["']?([^"')\s]*)/gi);
  if (/@import\b/i.test(css) || Array.from(resourceUrls).some(([, url]) => !/^(data:|#)/i.test(url))) {
    throw new Error(`${path} references another resource. Embed it before packaging the offline HTML.`);
  }
  return `<style>\n${css}</style>`;
}

function inlineScript(path) {
  const source = readInlineAsset(path, "script");
  if (path !== "./assets/data/en.js") return `<script>\n${source}</script>`;

  const chinese = readInlineAsset("./assets/data/zh.js", "script");
  const license = Buffer.from(read("LICENSE")).toString("base64");
  return `<script>
window.PORTFOLIO_OFFLINE = { licenseUrl: "data:text/plain;charset=utf-8;base64,${license}" };
if (new URLSearchParams(window.location.search).get("lang") === "zh") {
  document.documentElement.lang = "zh-CN";
${chinese}
} else {
${source}
}
</script>`;
}

// Preserve the site entry point's stylesheet cascade and script order.
const html = read("index.html")
  .replace(/^  <link rel="alternate"[^>]*>\n/gm, "")
  .replace(/<link rel="stylesheet" href="([^"]+)"\s*\/?>/g, (_, path) => inlineStylesheet(path))
  .replace(/<script src="([^"]+)"><\/script>/g, (_, path) => inlineScript(path));

if (/<link\b|<script\b[^>]*\bsrc\s*=/i.test(html)) {
  throw new Error("The offline HTML still contains a linked resource.");
}

mkdirSync(new URL("./", output), { recursive: true });
writeFileSync(output, html);
console.log(`Built dist/molybdenum-offline.html (${Buffer.byteLength(html)} bytes)`);
