import { ColLabel, GateCell, ScrollTable, SectionHeading, Swatches } from "../ui";
import { featuredField } from "../../lib/featured";
import { mmdd } from "../../lib/format";
import type { JSTDate } from "../../lib/jst";
import type { CharacterInfo } from "../../types";
import { ProfileLink } from "./CharacterName";

interface Props {
  characters: CharacterInfo[] | undefined;
  isLoading: boolean;
  isError: boolean;
  today: JSTDate;
}

const th = "px-3 py-2.5 text-left font-bold";
const td = "px-3 py-2.5 align-middle";
const num = `${td} font-cond text-[19px] font-semibold`;

export const FeaturedField = ({ characters, isLoading, isError, today }: Props) => {
  const field = characters ? featuredField(characters, today) : [];

  return (
    <section className="wrap pt-16" aria-labelledby="field-heading">
      <SectionHeading
        id="field-heading"
        title="This week's field"
        ja="出走表"
        link={{ to: "/characters", label: characters ? `All ${characters.length}` : "All characters" }}
      />
      {isError ? (
        <p className="mt-6 text-ink-sub">Couldn't load this week's field.</p>
      ) : isLoading || !characters ? (
        <p className="mt-6 min-h-60 text-ink-sub">Loading this week's field…</p>
      ) : (
        <ScrollTable label="This week's field">
          <table className="w-full min-w-[640px] border-collapse tabular-nums">
            <thead>
              <tr className="border-b-2 border-ink text-xs text-ink-sub">
                <th scope="col" className={`${th} w-13`}>
                  <ColLabel ja="枠" en="Gate" />
                </th>
                <th scope="col" className={`${th} w-18`}>
                  <span className="sr-only">Portrait</span>
                </th>
                <th scope="col" className={th}>
                  <ColLabel ja="名前" en="Name" />
                </th>
                <th scope="col" className={th}>
                  <ColLabel ja="誕生日" en="Birthday" />
                </th>
                <th scope="col" className={th}>
                  <ColLabel ja="身長" en="Height" />
                </th>
                <th scope="col" className={th}>
                  <ColLabel ja="勝負服" en="Colours" />
                </th>
              </tr>
            </thead>
            <tbody>
              {field.map((c, i) => (
                <tr key={c.id} className="border-t border-rule first:border-t-0">
                  <GateCell gate={i + 1} />
                  <td className={td}>
                    <img
                      src={c.thumb_img ?? ""}
                      alt=""
                      width={60}
                      height={60}
                      loading="lazy"
                      decoding="async"
                      className="block h-15 w-15 object-cover object-top"
                    />
                  </td>
                  <td className={td}>
                    <ProfileLink slug={c.preferred_url} className="block">
                      <span className="block font-cond text-[22px] font-bold uppercase leading-[1.1]">
                        {c.name_en}
                      </span>
                      <span lang="ja" className="text-[13px]">
                        {c.name_jp}
                      </span>
                    </ProfileLink>
                  </td>
                  <td className={num}>{mmdd(c.birth_month, c.birth_day)}</td>
                  <td className={num}>{c.height ? `${c.height}cm` : "—"}</td>
                  <td className={td}>
                    {c.color_main || c.color_sub ? (
                      <Swatches main={c.color_main} sub={c.color_sub} size="h-[30px] w-[22px]" />
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollTable>
      )}
    </section>
  );
};
