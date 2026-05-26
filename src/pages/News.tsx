import { useState, useMemo, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLatestNews, useNewsSearch } from "../hooks";
import Container from "../components/Container";
import { NewsHeader, NewsList, NewsDetailModal } from "../components/news";
import type { NewsPost } from "../types";

const COUNT = 10;

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

  // Update accumulated posts when new data arrives
  useEffect(() => {
    if (!isSearching && latestNews && Array.isArray(latestNews)) {
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

  // Ensure hasMore is always a boolean
  const hasMore =
    !isSearching && latestNews ? latestNews.length >= displayCount : false;

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
        <NewsHeader search={search} onSearchChange={handleSearch} />

        <NewsList
          posts={posts}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onPostClick={setSelectedPost}
        />
      </Container>

      {selectedPost && (
        <NewsDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default News;
