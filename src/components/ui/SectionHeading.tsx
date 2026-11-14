import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SectionHeadingProps {
  title: string;
  ja: string;
  /** Optional single link to the full view, shown at the end of the line. */
  link?: { to: string; label: string };
  /** `h2` for page sections, `h3` for sub-sections (smaller). */
  level?: 2 | 3;
  id?: string;
  children?: ReactNode;
}

export const SectionHeading = ({
  title,
  ja,
  link,
  level = 2,
  id,
  children,
}: SectionHeadingProps) => {
  const Tag = level === 2 ? "h2" : "h3";
  const big = level === 2;
  return (
    <div
      className={`flex flex-wrap items-baseline border-b-[3px] border-ink ${
        big ? "gap-3.5 pb-1.5" : "gap-2.5 pb-1"
      }`}
    >
      <Tag
        id={id}
        className={`m-0 flex flex-wrap items-baseline font-cond font-extrabold uppercase leading-none ${
          big ? "gap-3.5 text-4xl" : "gap-2.5 text-[26px]"
        }`}
      >
        {title}
        <span
          lang="ja"
          className={`font-body font-bold normal-case ${big ? "text-[15px]" : "text-[13px]"}`}
        >
          {ja}
        </span>
      </Tag>
      {children}
      {link && (
        <Link to={link.to} className="ml-auto font-bold">
          {link.label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
};
