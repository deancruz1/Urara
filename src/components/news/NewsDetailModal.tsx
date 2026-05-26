import type { NewsPost } from "../../types";

interface NewsDetailModalProps {
  post: NewsPost;
  onClose: () => void;
}

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

export const NewsDetailModal = ({ post, onClose }: NewsDetailModalProps) => (
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
