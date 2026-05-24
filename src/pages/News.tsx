import { useState } from "react";
import { useLatestNews, useNewsSearch } from "../hooks";
import Container from "../components/Container";
import type { NewsPost } from "../types";

const COUNT = 10;

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const NewsCard = ({ post }: { post: NewsPost }) => (
  <div className="flex gap-4 rounded-2xl bg-bg-secondary p-4 sm:p-6">
    {post.image && (
      <img
        src={post.image}
        alt={post.title_english}
        className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-32 sm:w-32"
      />
    )}
    <div className="min-w-0 flex-1">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-3 py-0.5 text-xs font-bold text-white"
          style={{ backgroundColor: post.label_color }}
        >
          {post.label_name_en}
        </span>
        <span className="text-xs text-text-secondary">
          {formatDate(post.post_at)}
        </span>
      </div>
      <p className="mb-1 font-semibold text-text-primary line-clamp-2">
        {post.title_english || post.title}
      </p>
      <p className="text-sm text-text-secondary line-clamp-3">
        {post.message_english
          ? post.message_english.replace(/<[^>]+>/g, "").slice(0, 200) + "..."
          : ""}
      </p>
    </div>
  </div>
);

const News = () => {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);

  const { data: latestNews, isLoading: latestLoading } = useLatestNews(
    COUNT,
    offset,
  );
  const { data: searchResults, isLoading: searchLoading } =
    useNewsSearch(search);

  const isSearching = search.length > 0;
  const posts = isSearching ? searchResults : latestNews;
  const isLoading = isSearching ? searchLoading : latestLoading;

  return (
    <div className="min-h-screen bg-bg-primary pt-24">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold tracking-widest text-accent uppercase">
            News
          </p>
          <h1 className="text-4xl font-bold text-text-primary">
            Latest Updates
          </h1>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOffset(0);
            }}
            className="w-full rounded-full border border-border bg-bg-secondary px-6 py-3 text-sm text-text-primary placeholder-text-secondary outline-none focus:border-accent transition-colors duration-200"
          />
        </div>

        {/* Posts */}
        {isLoading ? (
          <p className="text-text-secondary">Loading...</p>
        ) : !posts || posts.length === 0 ? (
          <p className="text-text-secondary">No news found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post: NewsPost) => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isSearching && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setOffset(Math.max(0, offset - COUNT))}
              disabled={offset === 0}
              className="rounded-full border border-border px-6 py-2 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            <span className="text-sm text-text-secondary">
              Page {Math.floor(offset / COUNT) + 1}
            </span>
            <button
              onClick={() => setOffset(offset + COUNT)}
              disabled={!posts || posts.length < COUNT}
              className="rounded-full border border-border px-6 py-2 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default News;
