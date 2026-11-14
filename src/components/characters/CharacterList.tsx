import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import type { CharacterListItem } from "../../types";

interface Props {
  characters: CharacterListItem[];
  total: number;
  selectedId: number | undefined;
  search: string;
  onSearch: (value: string) => void;
  /** Called when an entry is clicked, before the selection changes. */
  onSelect?: () => void;
  isLoading: boolean;
  isError: boolean;
}

/** The race card: every character, searchable, with the current one marked. */
export const CharacterList = ({
  characters,
  total,
  selectedId,
  search,
  onSearch,
  onSelect,
  isLoading,
  isError,
}: Props) => {
  const listRef = useRef<HTMLOListElement>(null);

  // Keep the current entry visible inside the list's own scroll area,
  // without moving the page.
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!list || !el) return;
    const l = list.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    if (e.top < l.top || e.bottom > l.bottom) {
      list.scrollTop += e.top - l.top - (list.clientHeight - el.clientHeight) / 2;
    }
  }, [selectedId, characters.length]);

  const searching = search.trim().length > 0;

  return (
    <aside
      aria-label="Character list"
      className="flex w-full min-w-0 flex-col border-[3px] border-ink bg-paper lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:w-[300px] lg:shrink-0"
    >
      <h2 className="m-0 flex shrink-0 items-baseline gap-2 bg-ink px-3 py-1.5 text-xs font-bold text-paper">
        <span className="font-cond text-[15px] uppercase tracking-[0.04em]">Characters</span>
        <span lang="ja">出走表</span>
        <span aria-hidden="true">·</span>
        <span className="font-cond text-[15px] tabular-nums">
          {isLoading ? "—" : searching ? `${characters.length} of ${total}` : total}
        </span>
      </h2>
      <label htmlFor="character-search" className="sr-only">
        Search characters by name or category
      </label>
      <input
        id="character-search"
        type="search"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Name, ウララ, or category"
        autoComplete="off"
        className="block h-12 w-full shrink-0 border-0 border-b-[3px] border-ink bg-paper px-3 -outline-offset-4 focus-visible:bg-tint"
      />
      <p role="status" className="sr-only">
        {searching && !isLoading ? `${characters.length} characters match` : ""}
      </p>

      {isError ? (
        <p className="m-0 px-3 py-3 text-sm text-ink-sub">
          Couldn't load characters.
        </p>
      ) : isLoading ? (
        <p className="m-0 px-3 py-3 text-sm text-ink-sub">Loading characters…</p>
      ) : characters.length === 0 ? (
        <p className="m-0 px-3 py-3 text-sm text-ink-sub">
          No characters match “{search}”.
        </p>
      ) : (
        <ol
          ref={listRef}
          className="relative m-0 max-h-[260px] list-none overflow-y-auto p-0 lg:max-h-none lg:flex-1"
        >
          {characters.map((c) => {
            const current = c.id === selectedId;
            return (
              <li key={c.id}>
                <Link
                  to={`/characters?id=${c.id}`}
                  replace
                  onClick={current ? undefined : onSelect}
                  aria-current={current ? "true" : undefined}
                  className={`flex items-center gap-3 border-b border-rule py-1.5 pr-3 pl-2 no-underline -outline-offset-3 ${
                    current
                      ? "bg-ink text-paper hover:text-paper"
                      : "text-ink hover:bg-tint hover:text-ink"
                  }`}
                >
                  <img
                    src={c.thumb_img}
                    alt=""
                    width={44}
                    height={44}
                    loading="lazy"
                    decoding="async"
                    className="h-11 w-11 shrink-0 object-cover object-top"
                    style={{ backgroundColor: current ? undefined : "var(--color-tint)" }}
                  />
                  <span className="flex min-w-0 flex-col leading-[1.2]">
                    <span className="truncate font-cond text-lg font-bold uppercase">
                      {c.name_en}
                    </span>
                    <span lang="ja" className="truncate text-[11px]">
                      {c.name_jp}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </aside>
  );
};
