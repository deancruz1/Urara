import { useEffect, useRef } from "react";
import type { FilterItem } from "../../types";

interface Props {
  characters: FilterItem[];
  imageByName: Map<string, string>;
  selected: string;
  onSelect: (id: string) => void;
  isLoading: boolean;
  isError: boolean;
}

/** Character filter: a race-card list on wide screens, a sideways strip on phones. */
export const MusicFilter = ({ characters, imageByName, selected, onSelect, isLoading, isError }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);

  // Bring the selected entry into view inside the list/strip, not the page.
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!list || !el) return;
    const l = list.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    if (e.top < l.top || e.bottom > l.bottom) {
      list.scrollTop += e.top - l.top - (list.clientHeight - el.clientHeight) / 2;
    }
    if (e.left < l.left || e.right > l.right) {
      list.scrollLeft += e.left - l.left - (list.clientWidth - el.clientWidth) / 2;
    }
  }, [selected, characters.length]);

  return (
    <aside
      aria-labelledby="music-filter-heading"
      className="flex w-full min-w-0 flex-col border-[3px] border-ink bg-paper lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:w-[280px] lg:shrink-0"
    >
      <h2
        id="music-filter-heading"
        className="m-0 flex shrink-0 items-baseline gap-2 bg-ink px-3 py-1.5 text-xs font-bold text-paper"
      >
        <span className="font-cond text-[15px] uppercase tracking-[0.04em]">Singer</span>
        <span lang="ja">歌唱</span>
      </h2>
      {isError ? (
        <p className="m-0 px-3 py-3 text-sm text-ink-sub">The character filter couldn't be loaded.</p>
      ) : isLoading ? (
        <p className="m-0 px-3 py-3 text-sm text-ink-sub">Loading characters…</p>
      ) : (
        <ul
          ref={listRef}
          className="relative m-0 flex list-none overflow-x-auto p-0 lg:flex-1 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto"
        >
          {characters.map((c) => {
            const isSelected = c.id === selected;
            const img = imageByName.get(c.display);
            return (
              <li key={c.id} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelect(c.id)}
                  className={`flex w-full cursor-pointer items-center gap-2.5 border-0 border-rule py-1.5 pr-3 pl-2 text-left -outline-offset-3 max-lg:h-full max-lg:border-r lg:border-b ${
                    isSelected ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-tint"
                  }`}
                >
                  {img ? (
                    <img
                      src={img}
                      alt=""
                      width={36}
                      height={36}
                      loading="lazy"
                      decoding="async"
                      className="h-9 w-9 shrink-0 bg-tint object-cover object-top"
                    />
                  ) : (
                    <span aria-hidden="true" className="h-9 w-9 shrink-0 bg-tint" />
                  )}
                  <span className="whitespace-nowrap font-cond text-[17px] font-bold uppercase leading-tight lg:truncate">
                    {c.display}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
};
