const BASE_PATH = "/Urara/";

/**
 * GitHub Pages serves 404.html for deep links, which forwards the original
 * path, query and hash as `?p=`. Returns the URL to restore, `BASE_PATH` when
 * `p` is present but points off-site, or `null` when there is no `p` at all.
 */
export const resolveRedirect = (search: string): string | null => {
  const p = new URLSearchParams(search).get("p");
  if (p === null) return null;
  if (p.startsWith(BASE_PATH) && !p.startsWith("//")) return p;
  return BASE_PATH;
};
