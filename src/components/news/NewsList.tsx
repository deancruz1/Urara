import type { NewsPost } from "../../types";
import { NewsCard } from "./NewsCard";

interface NewsListProps {
  posts: NewsPost[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onPostClick: (post: NewsPost) => void;
}

export const NewsList = ({
  posts,
  isLoading,
  hasMore,
  onLoadMore,
  onPostClick,
}: NewsListProps) => {
  if (isLoading) {
    return <p className="text-text-secondary">Loading...</p>;
  }

  if (posts.length === 0) {
    return <p className="text-text-secondary">No news found.</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {posts.map((post, index) => {
          const reactKey =
            post.id !== undefined && post.id !== null
              ? `post-${post.id}`
              : `fallback-${index}`;

          return <NewsCard key={reactKey} post={post} onClick={onPostClick} />;
        })}
      </div>

      {hasMore && (
        <div className="my-8 flex justify-center">
          <button
            onClick={onLoadMore}
            className="rounded-full border border-border px-8 py-3 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-accent hover:text-accent cursor-pointer"
          >
            View More
          </button>
        </div>
      )}
    </>
  );
};
