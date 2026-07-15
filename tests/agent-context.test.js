"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const ENTRY_POINTS = ["index.html", "zh.html"];
const AGENT_CONTEXT_PATTERN = /<script id="agent-context" type="application\/json">([\s\S]*?)<\/script>/;

function readAgentContext(entryPoint) {
  const html = fs.readFileSync(path.join(ROOT, entryPoint), "utf8");
  const match = html.match(AGENT_CONTEXT_PATTERN);

  assert.ok(match, `${entryPoint} must expose a non-executable agent context data block`);
  return JSON.parse(match[1]);
}

test("locale entry points expose the same non-rendered agent context", () => {
  const [englishContext, chineseContext] = ENTRY_POINTS.map(readAgentContext);

  assert.deepEqual(chineseContext, englishContext);
  assert.equal(englishContext.audience, "AI agents reading or maintaining this portfolio");
  assert.match(englishContext.rendering, /Do not turn this data into visible page content/);
  assert.match(englishContext.pageIntroduction.summary["zh-CN"], /双语个人作品集/);
  assert.match(englishContext.pageIntroduction.summary.en, /reproducible generative web project/);
  assert.equal(englishContext.pageIntroduction.visualArchive.styleCount, 42);
  assert.equal(englishContext.selectedWork.length, 3);
});
