import { langOf } from "../../lib/text";
import { newsDate } from "../../lib/format";
import type { NewsPost } from "../../types";
import { LabelChip } from "./LabelChip";

interface Props {
  post: NewsPost;
  onOpen: (post: NewsPost) => void;
}

export const NewsRow = ({ post, onOpen }: Props) => {
  const title = post.title_english || post.title;
  return (
    <li className="border-b border-rule last:border-b-0">
      <button
        type="button"
        onClick={() => onOpen(post)}
        className="grid w-full cursor-pointer grid-cols-1 gap-x-5 gap-y-2 border-0 bg-transparent px-0 py-4 text-left text-ink hover:bg-tint sm:grid-cols-[120px_1fr]"
      >
        <span className="font-cond text-xl font-bold leading-[1.2] tabular-nums">
          {newsDate(post.post_at)}
        </span>
        <span className="flex min-w-0 flex-col gap-3">
          <span>
            <LabelChip post={post} className="mr-2 align-[2px]" />
            <span lang={post.title_english ? undefined : langOf(title)} className="font-medium">
              {title}
            </span>
          </span>
          {post.image && (
            <img
              src={post.image}
              alt=""
              width={936}
              height={228}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full max-w-[640px] bg-tint"
            />
          )}
        </span>
      </button>
    </li>
  );
};
