import { Dialog } from "../ui";
import { sanitize } from "../../lib/sanitize";
import { newsDateTime } from "../../lib/format";
import { langOf } from "../../lib/text";
import type { NewsPost } from "../../types";
import { LabelChip } from "./LabelChip";

interface Props {
  post: NewsPost | null;
  onClose: () => void;
}

export const NewsPostDialog = ({ post, onClose }: Props) => {
  const title = post ? post.title_english || post.title : "";
  const english = !!post?.message_english;
  const body = post ? post.message_english || post.message || "" : "";

  return (
    <Dialog
      open={!!post}
      onClose={onClose}
      label={title || "News post"}
      className="w-[48rem] border-[3px] border-ink bg-paper text-ink"
    >
      {post && (
        <div className="max-h-[calc(90vh-6px)] overflow-y-auto">
          {post.image && (
            <img
              src={post.image}
              alt=""
              width={768}
              height={384}
              className="block aspect-[2/1] h-auto w-full border-b-[3px] border-ink bg-tint object-cover"
            />
          )}
          <div className="px-5 pt-5 pb-7 sm:px-7">
            <p className="m-0 flex flex-wrap items-center gap-2.5 pr-12">
              <LabelChip post={post} />
              <span className="font-cond text-lg font-bold tabular-nums">
                {newsDateTime(post.post_at)}
              </span>
            </p>
            <h2
              lang={post.title_english ? undefined : langOf(title)}
              className="mt-3 mb-0 border-b-[3px] border-ink pb-2 text-2xl font-bold leading-snug"
            >
              {title}
            </h2>
            {body ? (
              <div
                lang={english ? undefined : "ja"}
                className="news-body mt-4 leading-[1.8] break-words"
                dangerouslySetInnerHTML={{ __html: sanitize(body) }}
              />
            ) : (
              <p className="mt-4 text-ink-sub">This post has no text.</p>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
};
