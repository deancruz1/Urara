import { textOn } from "../../lib/color";
import type { NewsPost } from "../../types";

/** A post's label (Game, Media…) on its own label colour. */
export const LabelChip = ({ post, className = "" }: { post: NewsPost; className?: string }) => (
  <span
    className={`inline-block px-1.5 py-px text-[11px] font-bold uppercase ${className}`}
    style={{ backgroundColor: post.label_color, color: textOn(post.label_color) }}
  >
    {post.label_name_en}
  </span>
);
