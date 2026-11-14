export const SITE = "https://deancruz1.github.io/Urara";

// React 19 renders <Helmet> tags inline with the page, so they are lifted out
// of the body and written into the template's <head> instead.
const TITLE = /<title>([\s\S]*?)<\/title>/;
const DESCRIPTION = /<meta name="description" content="([^"]*)"\/>/;

const setContent = (html, attr, value) =>
  html.replace(new RegExp(`(<meta\\s+${attr}\\s+content=")[^"]*(")`), `$1${value}$2`);

/** The public address of a route, e.g. "/characters/king-halo". */
export const pageUrl = (route) => (route === "/" ? `${SITE}/` : `${SITE}${route}`);

/** The file a route is written to; GitHub Pages serves /a/b from a/b.html. */
export const outputFile = (route) => (route === "/" ? "index.html" : `${route.slice(1)}.html`);

/** Fills the built index.html with one pre-rendered route. */
export const buildPage = (template, { route, html, state }) => {
  const title = html.match(TITLE)?.[1];
  const description = html.match(DESCRIPTION)?.[1];
  const body = html.replace(TITLE, "").replace(DESCRIPTION, "");
  const url = pageUrl(route);

  let page = template
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${url}"`)
    .replace(/<div id="root"><\/div>/, () => {
      // Escape "<" so post text can never close the script tag early.
      const json = JSON.stringify(state).replace(/</g, "\\u003c");
      return `<div id="root">${body}</div><script>window.__URARA_STATE__=${json}</script>`;
    });
  page = setContent(page, 'property="og:url"', url);
  page = setContent(page, 'name="twitter:url"', url);
  if (title) {
    page = page.replace(TITLE, `<title>${title}</title>`);
    page = setContent(page, 'property="og:title"', title);
    page = setContent(page, 'name="twitter:title"', title);
  }
  if (description) {
    page = setContent(page, 'name="description"', description);
    page = setContent(page, 'property="og:description"', description);
    page = setContent(page, 'name="twitter:description"', description);
  }
  return page;
};

export const sitemap = (routes) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${pageUrl(r)}</loc></url>`).join("\n")}
</urlset>
`;
