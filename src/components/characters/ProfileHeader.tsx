import { langOf, present } from "../../lib/text";
import type { CharacterListItem } from "../../types";

interface Props {
  character: CharacterListItem;
  grade: string | null | undefined;
  slogan: string | null | undefined;
}

export const ProfileHeader = ({ character: c, grade, slogan }: Props) => {
  const g = present(grade);
  const s = present(slogan);
  return (
    <>
      <div className="flex flex-wrap border-[3px] border-ink">
        <div
          aria-hidden="true"
          className="flex min-h-24 w-full flex-col sm:w-[120px] sm:shrink-0"
        >
          <div className="min-h-12 flex-[2]" style={{ backgroundColor: c.color_main }} />
          <div className="min-h-6 flex-1" style={{ backgroundColor: c.color_sub }} />
        </div>
        <div className="min-w-0 flex-[1_1_300px] px-6 py-4 max-sm:border-t-[3px] max-sm:border-ink sm:border-l-[3px] sm:border-ink">
          <h1 className="m-0 font-cond text-[clamp(44px,6vw,88px)] font-extrabold uppercase leading-[0.9] break-words">
            {c.name_en}
          </h1>
          <p className="mt-1.5 mb-0 text-lg font-bold">
            <span lang="ja">{c.name_jp}</span>
            {" · "}
            {c.category_label_en}
            {g && (
              <>
                {" · "}
                <span lang={langOf(g)}>{g}</span>
              </>
            )}
          </p>
        </div>
      </div>
      {s && (
        <p
          lang={langOf(s)}
          className="m-0 border-[3px] border-t-0 border-ink bg-tint px-6 py-3 text-[17px] font-bold"
        >
          {s}
        </p>
      )}
    </>
  );
};
