import { countsByMonth } from "../../lib/birthdays";
import type { CharacterInfo } from "../../types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const BAR_MAX = 120;

interface Props {
  characters: CharacterInfo[];
  /** Current JST month, 1–12. */
  month: number;
}

export const MonthChart = ({ characters, month }: Props) => {
  const counts = countsByMonth(characters);
  const max = Math.max(1, ...counts);
  const label = `Birthdays per month: ${counts
    .map((n, i) => `${MONTHS[i]} ${n}${i + 1 === month ? " (this month)" : ""}`)
    .join(", ")}`;

  return (
    <figure className="m-0 mt-9 border-t-[3px] border-ink pt-4.5">
      <div
        role="img"
        aria-label={label}
        className="grid h-[170px] grid-cols-12 items-end gap-1.5 tabular-nums"
      >
        {counts.map((n, i) => {
          const current = i + 1 === month;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <span
                className={`text-center font-cond text-[15px] ${current ? "font-extrabold text-turf" : "font-semibold"}`}
              >
                {current && (
                  <span lang="ja" className="block whitespace-nowrap text-center font-body text-[11px] font-bold leading-tight">
                    今月
                  </span>
                )}
                {n}
              </span>
              <div
                className={`w-full ${current ? "bg-turf outline-3 outline-turf" : "bg-ink"}`}
                style={{ height: Math.max(1, Math.round((n / max) * BAR_MAX)) }}
              />
            </div>
          );
        })}
      </div>
      <div
        aria-hidden="true"
        className="grid grid-cols-12 gap-1.5 border-t-2 border-ink pt-1.5 text-center font-cond text-[15px] font-bold uppercase"
      >
        {MONTHS.map((m, i) => (
          <span key={m} className={i + 1 === month ? "text-turf" : ""}>
            {m}
          </span>
        ))}
      </div>
    </figure>
  );
};
