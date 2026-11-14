import { Link, NavLink } from "react-router-dom";
import { formatHeaderDate } from "../../lib/jst";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { to: "/characters", label: "Characters", ja: "ウマ娘" },
  { to: "/music", label: "Music", ja: "楽曲" },
  { to: "/news", label: "News", ja: "お知らせ" },
];

const skipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const main = document.getElementById("content");
  if (!main) return;
  e.preventDefault();
  main.focus();
  main.scrollIntoView();
};

export const SiteHeader = () => (
  <header className="bg-header text-white">
    <a
      href="#content"
      onClick={skipToContent}
      className="absolute left-2 top-2 z-50 -translate-y-[200%] bg-paper px-4 py-2 font-bold text-ink focus:translate-y-0"
    >
      Skip to content
    </a>
    <div className="wrap flex min-h-[68px] flex-wrap items-center justify-between gap-x-4">
      <Link
        to="/"
        className="flex items-baseline gap-3 py-2 text-white no-underline hover:text-white"
      >
        <span className="font-cond text-[30px] font-extrabold tracking-[0.08em]">
          URARA
        </span>
        <span lang="ja" className="hidden text-xs font-medium sm:inline">
          ウマ娘 ファンガイド
        </span>
      </Link>

      <nav
        aria-label="Main"
        className="flex w-full justify-between gap-1 max-sm:order-last sm:w-auto sm:justify-start"
      >
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center border-b-4 px-3.5 py-2 text-white no-underline hover:border-gate-5 hover:text-white ${
                isActive ? "border-gate-5" : "border-transparent"
              }`
            }
          >
            <span className="font-cond text-[17px] font-bold uppercase leading-[1.1] tracking-[0.06em]">
              {item.label}
            </span>
            <span lang="ja" className="text-[11px] leading-[1.3]">
              {item.ja}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <span className="hidden font-cond text-[17px] font-semibold tracking-[0.04em] tabular-nums sm:inline">
          {formatHeaderDate()}
        </span>
        <ThemeToggle />
      </div>
    </div>
  </header>
);
