/**
 * Audit Clearbit logo URLs referenced in lib/tools.ts
 * Usage: node scripts/audit-clearbit.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toolsPath = path.join(__dirname, "..", "lib", "tools.ts");
const source = fs.readFileSync(toolsPath, "utf8");

const urls = [
  ...new Set(
    [...source.matchAll(/https:\/\/logo\.clearbit\.com\/[^\s"'`]+/g)].map(
      (m) => m[0]
    )
  ),
];

console.log(`Found ${urls.length} unique Clearbit URLs`);

const results = { ok: [], fail: [], error: [] };

async function check(url) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "EssentialAI-LogoAudit/1.0" },
    });
    clearTimeout(timer);
    const ct = res.headers.get("content-type") || "";
    if (res.ok && ct.includes("image")) {
      results.ok.push({ url, status: res.status });
    } else {
      results.fail.push({ url, status: res.status, ct });
    }
  } catch (e) {
    results.error.push({ url, error: String(e.message || e) });
  }
}

const concurrency = 8;
for (let i = 0; i < urls.length; i += concurrency) {
  const batch = urls.slice(i, i + concurrency);
  await Promise.all(batch.map(check));
  process.stdout.write(`Checked ${Math.min(i + concurrency, urls.length)}/${urls.length}\r`);
}

console.log("\n--- Summary ---");
console.log(`OK: ${results.ok.length}`);
console.log(`Fail: ${results.fail.length}`);
console.log(`Error: ${results.error.length}`);

if (results.fail.length) {
  console.log("\nFailed:");
  for (const item of results.fail.slice(0, 40)) {
    console.log(`  [${item.status}] ${item.url}`);
  }
}
if (results.error.length) {
  console.log("\nErrors:");
  for (const item of results.error.slice(0, 40)) {
    console.log(`  ${item.url} — ${item.error}`);
  }
}

const out = path.join(__dirname, "clearbit-audit.json");
fs.writeFileSync(
  out,
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      total: urls.length,
      ok: results.ok.length,
      fail: results.fail.length,
      error: results.error.length,
      failures: [...results.fail, ...results.error],
    },
    null,
    2
  )
);
console.log(`\nWrote ${out}`);
