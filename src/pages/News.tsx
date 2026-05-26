import { useState, useMemo, useRef, useEffect } from "react";
import { useLatestNews, useNewsSearch } from "../hooks";
import Container from "../components/Container";
import type { NewsPost } from "../types";
import { Helmet } from "react-helmet-async";

const COUNT = 10;

const formattedDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo",
  };

  const dateString = new Intl.DateTimeFormat("ja-JP", options).format(date);
  return `${dateString} (JST)`;
};

const NewsCard = ({
  post,
  onClick,
}: {
  post: NewsPost;
  onClick: (post: NewsPost) => void;
}) => (
  <div
    className="flex gap-4 rounded-2xl bg-bg-secondary p-4 sm:p-6 cursor-pointer hover:bg-bg-secondary/80 transition-colors duration-200 flex-col"
    onClick={() => onClick(post)}
  >
    {post.image && (
      <img
        src={post.image}
        alt={post.title_english}
        className="shrink-0 rounded-xl object-cover sm:h-auto sm:w-full"
      />
    )}
    <div className="min-w-0 flex-1">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-8 md:px-12 py-0.5 text-sm md:text-lg font-bold text-white"
          style={{ backgroundColor: post.label_color }}
        >
          {post.label_name_en}
        </span>
        <span
          className="text-md md:text-lg font-bold"
          style={{ color: post.label_color }}
        >
          {formattedDate(post.post_at)}
        </span>
      </div>
      <p className="mb-1 text-text-primary line-clamp-2 text-sm md:text-lg">
        {post.title_english || post.title}
      </p>
    </div>
  </div>
);

const NewsDetail = ({
  post,
  onClose,
}: {
  post: NewsPost;
  onClose: () => void;
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    onClick={onClose}
  >
    <div
      className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-bg-primary p-6 sm:p-8"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full p-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors duration-200 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {post.image && (
        <img
          src={post.image}
          alt={post.title_english}
          className="mb-6 h-48 w-full rounded-xl object-cover sm:h-64"
        />
      )}

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-3 py-0.5 text-xs font-bold text-white"
          style={{ backgroundColor: post.label_color }}
        >
          {post.label_name_en}
        </span>
        <span className="text-xs text-text-secondary">
          {formattedDate(post.post_at)}
        </span>
      </div>

      <h2 className="mb-4 text-2xl font-bold text-text-primary">
        {post.title_english || post.title}
      </h2>

      <div className="prose prose-invert max-w-none text-text-primary">
        {post.message_english ? (
          <div
            dangerouslySetInnerHTML={{
              __html: post.message_english,
            }}
            className="text-text-secondary leading-relaxed"
          />
        ) : (
          <p className="text-text-secondary">No content available.</p>
        )}
      </div>
    </div>
  </div>
);

const News = () => {
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(COUNT);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [accumulatedPosts, setAccumulatedPosts] = useState<NewsPost[]>([]);
  const isFirstRender = useRef(true);

  const { data: latestNews, isLoading: latestLoading } = useLatestNews(
    displayCount,
    0,
  );
  const { data: searchResults, isLoading: searchLoading } =
    useNewsSearch(search);

  const isSearching = search.length > 0;
  const isLoading = isSearching ? searchLoading : latestLoading;

  // Update accumulated posts when new data arrives - without cascading renders
  useEffect(() => {
    if (!isSearching && latestNews && Array.isArray(latestNews)) {
      // Use a ref to prevent the cascade warning on first render
      if (isFirstRender.current) {
        isFirstRender.current = false;
        setAccumulatedPosts(latestNews);
      } else {
        setAccumulatedPosts(latestNews);
      }
    }
  }, [latestNews, isSearching]);

  const posts = useMemo(() => {
    if (isSearching) {
      if (!searchResults || !Array.isArray(searchResults)) return [];
      // Deduplicate search results
      const uniquePostsMap = new Map();
      searchResults.forEach((post: NewsPost) => {
        const stringId =
          post.id !== undefined && post.id !== null ? String(post.id) : null;
        const uniqueKey = stringId ?? JSON.stringify(post);
        if (!uniquePostsMap.has(uniqueKey)) {
          uniquePostsMap.set(uniqueKey, post);
        }
      });
      return Array.from(uniquePostsMap.values());
    }

    return accumulatedPosts;
  }, [accumulatedPosts, searchResults, isSearching]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setDisplayCount(COUNT);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + COUNT);
  };

  const hasMore =
    !isSearching && latestNews && latestNews.length >= displayCount;

  return (
    <div className="min-h-screen bg-bg-primary pt-24">
      <Helmet>
        <title>News | Urara</title>
        <meta
          name="description"
          content="Latest news and updates from Umamusume Pretty Derby."
        />
      </Helmet>

      <Container>
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold tracking-widest text-accent uppercase">
            News
          </p>
          <h1 className="text-4xl font-bold text-text-primary">
            Latest Updates
          </h1>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-full border border-border bg-bg-secondary px-6 py-3 text-sm text-text-primary placeholder-text-secondary outline-none focus:border-accent transition-colors duration-200"
          />
        </div>

        {isLoading ? (
          <p className="text-text-secondary">Loading...</p>
        ) : !posts || posts.length === 0 ? (
          <p className="text-text-secondary">
            {search ? "No news found for your search." : "No news found."}
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {posts.map((post: NewsPost, index: number) => {
                const reactKey =
                  post.id !== undefined && post.id !== null
                    ? `post-${post.id}`
                    : `fallback-${index}`;

                return (
                  <NewsCard
                    key={reactKey}
                    post={post}
                    onClick={setSelectedPost}
                  />
                );
              })}
            </div>

            {!isSearching && hasMore && (
              <div className="my-8 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="rounded-full border border-border px-8 py-3 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-accent hover:text-accent cursor-pointer"
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}
      </Container>

      {selectedPost && (
        <NewsDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default News;
