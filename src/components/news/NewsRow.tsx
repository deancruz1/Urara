import { langOf } from "../../lib/text";
import { isUpdated, lastActivity, newsDate } from "../../lib/format";
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
        className="grid w-full cursor-pointer grid-cols-1 items-center gap-x-5 gap-y-2 border-0 bg-transparent px-0 py-4 text-left text-ink hover:bg-tint sm:grid-cols-[120px_1fr_200px]"
      >
        <span className="font-cond text-xl font-bold leading-[1.2] tabular-nums">
          {newsDate(lastActivity(post))}
          {isUpdated(post) && (
            <small className="block font-body text-xs font-bold text-ink-sub">Updated</small>
          )}
        </span>
        <span className="min-w-0">
          <LabelChip post={post} className="mr-2 align-[2px]" />
          <span lang={post.title_english ? undefined : langOf(title)} className="font-medium">
            {title}
          </span>
        </span>
        {post.image ? (
          <img
            src={post.image}
            alt=""
            width={200}
            height={49}
            loading="lazy"
            decoding="async"
            className="block aspect-[936/228] w-full max-w-[320px] bg-tint object-cover sm:w-[200px]"
          />
        ) : (
          <span aria-hidden="true" className="hidden aspect-[936/228] w-[200px] bg-tint sm:block" />
        )}
      </button>
    </li>
  );
};
