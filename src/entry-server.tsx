import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { QueryCache, QueryClient, QueryClientProvider, dehydrate } from "@tanstack/react-query";
import type { DehydratedState, QueryKey } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

/** Query results shared across every page of one build, keyed by query hash. */
export type QueryStore = Map<string, { key: QueryKey; data: unknown } | "failed">;

const renderOnce = (url: string, store: QueryStore) => {
  const cache = new QueryCache();
  const client = new QueryClient({ queryCache: cache, defaultOptions: { queries: { retry: 1 } } });
  store.forEach((entry) => {
    if (entry !== "failed") client.setQueryData(entry.key, entry.data);
  });
  // Record which queries the page's hooks ask for, as opposed to the seeded ones.
  const touched = new Set<string>();
  const build = cache.build.bind(cache);
  cache.build = (...args) => {
    const query = build(...args);
    touched.add(query.queryHash);
    return query;
  };
  const html = renderToString(
    <HelmetProvider>
      <StaticRouter location={`/Urara${url}`} basename="/Urara">
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </StaticRouter>
    </HelmetProvider>,
  );
  return { client, html, touched };
};

/**
 * Renders one route to HTML at build time. Queries don't run during a server
 * render, so this renders, fetches whatever the page asked for, and renders
 * again until nothing new is requested (a profile needs the list first).
 */
export const prerender = async (
  url: string,
  store: QueryStore,
): Promise<{ html: string; state: DehydratedState; incomplete: boolean }> => {
  for (let pass = 0; pass < 5; pass++) {
    const { client, html, touched } = renderOnce(url, store);
    const used = client
      .getQueryCache()
      .getAll()
      // The hook's options (including `enabled`) are kept on the query, though not typed there.
      .filter((q) => touched.has(q.queryHash) && (q.options as { enabled?: boolean }).enabled !== false);
    const wanted = used.filter((q) => !store.has(q.queryHash));
    if (wanted.length === 0) {
      // A page built around a failed request would show an error; let the caller skip it.
      const incomplete = used.some((q) => store.get(q.queryHash) === "failed");
      // The client is seeded with the whole store; ship only what this page used.
      const usedHashes = new Set(used.map((q) => q.queryHash));
      const state = dehydrate(client, {
        shouldDehydrateQuery: (q) => usedHashes.has(q.queryHash) && q.state.status === "success",
      });
      return { html, state, incomplete };
    }
    await Promise.all(
      wanted.map(async (q) => {
        try {
          await q.fetch();
          store.set(q.queryHash, { key: q.queryKey, data: q.state.data });
        } catch {
          store.set(q.queryHash, "failed");
        }
      }),
    );
  }
  throw new Error(`Pre-render of ${url} kept requesting new data`);
};
