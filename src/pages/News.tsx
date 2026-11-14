import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { useLatestNews, useNewsPost, useNewsSearch } from "../hooks";
import { SectionHeading } from "../components/ui";
import { NewsPostDialog, NewsRow } from "../components/news";
import type { NewsPost } from "../types";

const PAGE = 10;

/** `value`, updated only after it has stopped changing for `ms`. */
const useDebounced = <T,>(value: T, ms: number) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
};

const News = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(PAGE);
  const [search, setSearch] = useState("");
  const query = useDebounced(search.trim(), 300);
  const searching = query.length > 0;

  const latest = useLatestNews(count, 0);
  const results = useNewsSearch(query);

  const posts = useMemo(() => {
    if (!searching) return latest.data ?? [];
    const seen = new Set<number>();
    return (results.data ?? []).filter((p) => {
      if (seen.has(p.announce_id)) return false;
      seen.add(p.announce_id);
      return true;
    });
  }, [searching, latest.data, results.data]);

  // ?post=<announce_id> opens that post: from the loaded list if it's there,
  // otherwise fetched on its own. Unknown ids open nothing.
  const postId = Number(searchParams.get("post")) || 0;
  const inList = postId
    ? [...(latest.data ?? []), ...(results.data ?? [])].find((p) => p.announce_id === postId)
    : undefined;
  const fetched = useNewsPost(postId && !inList ? postId : 0);
  const openPost = inList ?? (fetched.data?.announce_id === postId ? fetched.data : null);

  const setPostParam = useCallback(
    (id: number | null) =>
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (id) next.set("post", String(id));
          else next.delete("post");
          return next;
        },
        { replace: true },
      ),
    [setSearchParams],
  );

  const active = searching ? results : latest;
  const hasMore = !searching && (latest.data?.length ?? 0) >= count;

  let body: React.ReactNode;
  if (active.isError) {
    body = <p className="mt-4 text-ink-sub">The news couldn't be loaded. Try again later.</p>;
  } else if (active.isLoading || (searching && search.trim() !== query)) {
    body = <p className="mt-4 min-h-60 text-ink-sub">{searching ? "Searching…" : "Loading news…"}</p>;
  } else if (posts.length === 0) {
    body = (
      <p className="mt-4 text-ink-sub">
        {searching ? `No news matches “${query}”.` : "There's no news to show."}
      </p>
    );
  } else {
    body = (
      <>
        <ul className="m-0 list-none p-0">
          {posts.map((p: NewsPost) => (
            <NewsRow key={p.announce_id} post={p} onOpen={(post) => setPostParam(post.announce_id)} />
          ))}
        </ul>
        {hasMore && (
          <button
            type="button"
            onClick={() => setCount((c) => c + PAGE)}
            disabled={latest.isFetching}
            className="mt-6 h-11 cursor-pointer border-[3px] border-ink bg-paper px-6 font-cond text-lg font-bold uppercase tracking-[0.04em] hover:bg-ink hover:text-paper disabled:cursor-wait disabled:opacity-60"
          >
            {latest.isFetching ? "Loading…" : "Load more"}
          </button>
        )}
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>News | Urara</title>
        <meta name="description" content="The latest official Umamusume Pretty Derby announcements, searchable." />
      </Helmet>

      <section className="wrap pt-8" aria-labelledby="news-title">
        <SectionHeading level={1} id="news-title" title="News" ja="お知らせ" />
        <p className="mt-3 mb-0 max-w-[60ch] text-ink-sub">
          Official Umamusume announcements, newest first, with English titles
          where available.
        </p>
        <label htmlFor="news-search" className="mt-6 block text-xs font-bold text-ink-sub">
          Search the news
        </label>
        <input
          id="news-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="e.g. Tachyon"
          autoComplete="off"
          className="mt-1 mb-2 block h-12 w-full border-[3px] border-ink bg-paper px-3 -outline-offset-4 focus-visible:bg-tint"
        />
        {body}
      </section>

      <NewsPostDialog post={openPost} onClose={() => setPostParam(null)} />
    </>
  );
};

export default News;
