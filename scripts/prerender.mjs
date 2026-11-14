// Writes a static HTML file for every page after `vite build`, so search
// engines get real content and a 200 status instead of the 404.html redirect.
// Run through `npm run build`. If the API is down, pages that can't be built
// are skipped and those addresses fall back to the redirect.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { buildPage, outputFile, sitemap } from "./prerender-html.mjs";

const API = "https://umapyoi.net/api/v1";
const CONCURRENCY = 4;
const dist = join(import.meta.dirname, "..", "dist");
const { prerender } = await import("../dist-ssr/entry-server.js");

const template = await readFile(join(dist, "index.html"), "utf8");
if (template.includes("__URARA_STATE__")) {
  throw new Error("dist/index.html is already pre-rendered; run the full build again.");
}

const getJson = async (path) => {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return res.json();
};

const started = Date.now();
let characters = [];
let singers = [];
try {
  [characters, { character: singers }] = await Promise.all([
    getJson("/character/list"),
    getJson("/music/filters"),
  ]);
} catch (err) {
  console.warn(`Pre-render: couldn't list characters or singers (${err.message}).`);
}

const sections = ["/", "/characters", "/music", "/news"];
const details = [
  ...characters.map((c) => `/characters/${c.preferred_url}`),
  ...singers.map((s) => `/music/${s.id}`),
];

const store = new Map();
const written = [];
let bytes = 0;

const build = async (route) => {
  try {
    const { html, state, incomplete } = await prerender(route, store);
    if (incomplete) throw new Error("some data failed to load");
    const page = buildPage(template, { route, html, state });
    const file = join(dist, outputFile(route));
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, page);
    written.push(route);
    bytes += page.length;
  } catch (err) {
    console.warn(`Pre-render: skipped ${route} (${err.message}).`);
  }
};

// Section pages first, one at a time, so the shared lists are fetched once.
for (const route of sections) await build(route);
const queue = [...details];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) await build(queue.shift());
  }),
);

await writeFile(join(dist, "sitemap.xml"), sitemap(written));
const total = sections.length + details.length;
console.log(
  `Pre-rendered ${written.length} of ${total} pages (${(bytes / 1024 / 1024).toFixed(1)} MB) in ${((Date.now() - started) / 1000).toFixed(0)}s.`,
);
