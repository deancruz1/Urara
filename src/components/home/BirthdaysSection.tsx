import { SectionHeading, Swatches } from "../ui";
import { mmdd } from "../../lib/format";
import { todaysBirthdays, upcomingGroups } from "../../lib/birthdays";
import type { JSTDate } from "../../lib/jst";
import type { CharacterInfo } from "../../types";
import { MonthChart } from "./MonthChart";
import { ProfileLink } from "./CharacterName";

interface Props {
  characters: CharacterInfo[] | undefined;
  isLoading: boolean;
  isError: boolean;
  today: JSTDate;
}

const Portrait = ({ c }: { c: CharacterInfo }) => (
  <img
    src={c.sns_icon ?? c.thumb_img ?? ""}
    alt=""
    width={88}
    height={88}
    loading="lazy"
    decoding="async"
    className="box-border h-22 w-22 shrink-0 border-[3px] border-b-8 border-ink object-cover"
    style={{ borderBottomColor: c.color_main }}
  />
);

const Featured = ({ c, date }: { c: CharacterInfo; date?: string }) => (
  <li className="flex items-center gap-4">
    <Portrait c={c} />
    <div>
      <ProfileLink
        id={c.id}
        className="block font-cond text-[28px] font-bold uppercase leading-none"
      >
        {c.name_en}
      </ProfileLink>
      <div className="mt-1 text-sm">
        <span lang="ja">{c.name_jp}</span>
        {date && (
          <>
            {" · "}
            <span lang="ja">{date}</span>
          </>
        )}
      </div>
    </div>
  </li>
);

export const BirthdaysSection = ({ characters, isLoading, isError, today }: Props) => {
  let body: React.ReactNode;
  if (isError) {
    body = <p className="mt-6 text-ink-sub">Couldn't load birthdays.</p>;
  } else if (isLoading || !characters) {
    body = <p className="mt-6 min-h-60 text-ink-sub">Loading birthdays…</p>;
  } else {
    const todays = todaysBirthdays(characters, today);
    const queue = upcomingGroups(characters, today, 6);
    const next = queue[0];

    body = (
      <>
        <div className="flex flex-wrap gap-10 pt-6">
          <div className="min-w-0 flex-[1_1_340px]">
            {todays.length > 0 ? (
              <>
                <p className="m-0 text-ink-sub">
                  Today, {mmdd(today.month, today.day)}
                </p>
                <ul className="m-0 mt-4 flex list-none flex-col gap-4 p-0">
                  {todays.map((c) => (
                    <Featured key={c.id} c={c} />
                  ))}
                </ul>
              </>
            ) : next ? (
              <>
                <p className="m-0 text-ink-sub">No birthdays today. Next up:</p>
                <div className="mt-2 flex items-end gap-4.5">
                  <span className="font-cond text-[clamp(96px,22vw,150px)] font-extrabold leading-[0.8] tabular-nums">
                    {next.days}
                  </span>
                  <span className="pb-1.5 font-cond text-2xl font-bold uppercase leading-[1.05]">
                    {next.days === 1 ? "day" : "days"}
                    <br />
                    to go
                  </span>
                </div>
                <ul className="m-0 mt-6 flex list-none flex-col gap-4 p-0">
                  {next.characters.map((c) => (
                    <Featured key={c.id} c={c} date={`${next.month}月${next.day}日`} />
                  ))}
                </ul>
              </>
            ) : (
              <p className="m-0 text-ink-sub">No birthdays listed.</p>
            )}
          </div>

          <div className="min-w-0 flex-[1_1_520px] overflow-x-auto">
            <table className="w-full border-collapse tabular-nums">
              <caption className="sr-only">Upcoming birthdays</caption>
              <thead>
                <tr className="bg-ink text-xs text-paper">
                  <th scope="col" className="whitespace-nowrap px-3 py-2.5 text-left font-bold">
                    <span lang="ja">日付</span>
                    <span className="sr-only"> (date)</span>
                  </th>
                  <th scope="col" className="whitespace-nowrap px-3 py-2.5 text-left font-bold">
                    <span lang="ja">勝負服</span>
                    <span className="sr-only"> (colours)</span>
                  </th>
                  <th scope="col" className="whitespace-nowrap px-3 py-2.5 text-left font-bold">
                    Name
                  </th>
                  <th scope="col" className="whitespace-nowrap px-3 py-2.5 text-right font-bold">
                    <span lang="ja">あと</span>
                    <span className="sr-only"> (days to go)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {queue.map((g) => {
                  const [first, ...others] = g.characters;
                  return (
                    <tr key={g.days} className="border-t border-rule first:border-t-0">
                      <td className="whitespace-nowrap px-3 py-2.5 font-cond text-xl font-bold">
                        {mmdd(g.month, g.day)}
                      </td>
                      <td className="px-3 py-2.5">
                        <Swatches main={first.color_main} sub={first.color_sub} />
                      </td>
                      <td className="px-3 py-2.5">
                        <ProfileLink id={first.id} className="font-bold">
                          {first.name_en}
                        </ProfileLink>{" "}
                        <span className="text-[13px] text-ink-sub max-sm:block">
                          {others.length > 0 ? (
                            <>
                              +{" "}
                              {others.map((o, i) => (
                                <span key={o.id}>
                                  {i > 0 && ", "}
                                  <ProfileLink id={o.id} className="text-ink-sub">
                                    {o.name_en}
                                  </ProfileLink>
                                </span>
                              ))}
                            </>
                          ) : (
                            <span lang="ja">{first.name_jp}</span>
                          )}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2.5 text-right font-cond text-lg font-semibold">
                        {g.days}
                        <span lang="ja">日</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <MonthChart characters={characters} month={today.month} />
      </>
    );
  }

  return (
    <section className="wrap pt-14" aria-labelledby="birthdays-heading">
      <SectionHeading id="birthdays-heading" title="Birthdays" ja="誕生日" />
      {body}
    </section>
  );
};
