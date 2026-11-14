import { Link } from "react-router-dom";
import { SectionHeading } from "../ui";
import { isJapanese, textOn } from "../../lib/color";
import { newsMMDD } from "../../lib/format";
import type { NewsPost } from "../../types";

interface Props {
  posts: NewsPost[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const LabelChip = ({ post, className = "" }: { post: NewsPost; className?: string }) => (
  <span
    className={`inline-block px-1.5 py-px text-[11px] font-bold uppercase ${className}`}
    style={{ backgroundColor: post.label_color, color: textOn(post.label_color) }}
  >
    {post.label_name_en}
  </span>
);

export const NewsPreview = ({ posts, isLoading, isError }: Props) => (
  <section className="min-w-0 flex-[1_1_400px]" aria-labelledby="news-heading">
    <SectionHeading
      id="news-heading"
      title="News"
      ja="お知らせ"
      link={{ to: "/news", label: "All news" }}
    />
    {isError ? (
      <p className="mt-4 text-ink-sub">The news couldn't be loaded. Try again later.</p>
    ) : isLoading || !posts ? (
      <p className="mt-4 text-ink-sub">Loading news…</p>
    ) : (
      <ul className="m-0 list-none p-0">
        {posts.map((p) => {
          const title = p.title_english || p.title;
          return (
            <li
              key={p.announce_id}
              className="grid grid-cols-[56px_1fr] gap-x-3.5 gap-y-1 border-b border-rule py-3.5 last:border-b-0"
            >
              <span className="font-cond text-xl font-bold leading-[1.2] tabular-nums">
                {newsMMDD(p.post_at)}
              </span>
              <Link
                to={`/news?post=${p.announce_id}`}
                className="font-medium text-ink no-underline hover:text-turf-dark hover:underline"
              >
                <LabelChip post={p} className="mr-2 align-[2px]" />
                <span lang={isJapanese(title) && !p.title_english ? "ja" : undefined}>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    )}
  </section>
);
