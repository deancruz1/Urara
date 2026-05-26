import type { NewsPost } from "../../types";

interface NewsCardProps {
  post: NewsPost;
  onClick: (post: NewsPost) => void;
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

export const NewsCard = ({ post, onClick }: NewsCardProps) => (
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
