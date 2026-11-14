import { describe, expect, it } from "vitest";
import { buildPage, outputFile, pageUrl, sitemap } from "./prerender-html.mjs";

const template = `<!doctype html>
<html lang="en">
  <head>
    <title>Urara - Fan Guide</title>
    <meta
      name="description"
      content="Default description"
    />
    <link rel="canonical" href="https://deancruz1.github.io/Urara" />
    <meta property="og:url" content="https://deancruz1.github.io/Urara" />
    <meta
      property="og:title"
      content="Urara - Fan Guide"
    />
    <meta name="twitter:description" content="Default description" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

const html =
  '<title>King Halo | Urara</title><meta name="description" content="King Halo&#x27;s profile"/><div class="wrap">Profile</div>';

describe("buildPage", () => {
  const page = buildPage(template, { route: "/characters/king-halo", html, state: { a: 1 } });

  it("moves the page title and description into the head", () => {
    expect(page).toContain("<title>King Halo | Urara</title>");
    expect(page).not.toContain("Urara - Fan Guide");
    expect(page).toMatch(/name="description"\s+content="King Halo&#x27;s profile"/);
    expect(page).toContain('name="twitter:description" content="King Halo&#x27;s profile"');
    expect(page).toContain('<div id="root"><div class="wrap">Profile</div></div>');
  });

  it("points the canonical and share links at the page itself", () => {
    expect(page).toContain('<link rel="canonical" href="https://deancruz1.github.io/Urara/characters/king-halo"');
    expect(page).toContain('property="og:url" content="https://deancruz1.github.io/Urara/characters/king-halo"');
  });

  it("escapes the data so it can't close its script tag", () => {
    const evil = buildPage(template, { route: "/news", html: "", state: { t: "</script><b>" } });
    expect(evil).toContain("\\u003c/script>\\u003cb>");
    expect(evil.match(/<\/script>/g)).toHaveLength(1);
  });
});

describe("routes", () => {
  it("maps routes to files and addresses", () => {
    expect(outputFile("/")).toBe("index.html");
    expect(outputFile("/music/haru-urara")).toBe("music/haru-urara.html");
    expect(pageUrl("/")).toBe("https://deancruz1.github.io/Urara/");
    expect(sitemap(["/", "/news"])).toContain("<loc>https://deancruz1.github.io/Urara/news</loc>");
  });
});
