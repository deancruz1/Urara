import { ProgressBar, SectionHeading } from "../ui";
import { useAudioPreview } from "../../hooks";
import { mmdd } from "../../lib/format";
import { langOf, present } from "../../lib/text";
import type { CharacterDetail } from "../../types";

const Value = ({ text }: { text: string }) => <span lang={langOf(text)}>{text}</span>;

const DetailRow = ({ ja, en, children, big }: { ja: string; en: string; children: React.ReactNode; big?: boolean }) => (
  <tr>
    <th scope="row" className="w-[38%] border-b border-rule px-2.5 py-2 text-left align-baseline text-[13px] font-bold text-ink-sub">
      <span lang="ja">{ja}</span>
      <small className="block font-cond text-xs font-semibold uppercase tracking-[0.06em]">{en}</small>
    </th>
    <td className={`border-b border-rule px-2.5 py-2 align-baseline ${big ? "font-cond text-[22px] font-bold" : ""}`}>
      {children}
    </td>
  </tr>
);

export const DetailsTable = ({ d }: { d: CharacterDetail }) => {
  const weight = present(d.weight);
  const shoe = present(d.shoe_size);
  const dorm = present(d.residence);
  const sizes = d.size_b && d.size_w && d.size_h ? `${d.size_b} · ${d.size_w} · ${d.size_h}` : null;
  const rows = [
    d.birth_month && d.birth_day && (
      <DetailRow key="b" ja="誕生日" en="Birthday" big>{mmdd(d.birth_month, d.birth_day)}</DetailRow>
    ),
    d.height && <DetailRow key="h" ja="身長" en="Height" big>{d.height}cm</DetailRow>,
    weight && <DetailRow key="w" ja="体重" en="Weight"><Value text={weight} /></DetailRow>,
    sizes && <DetailRow key="s" ja="スリーサイズ" en="B / W / H" big>{sizes}</DetailRow>,
    shoe && <DetailRow key="f" ja="靴のサイズ" en="Shoe size"><Value text={shoe} /></DetailRow>,
    dorm && <DetailRow key="d" ja="所属寮" en="Dorm"><Value text={dorm} /></DetailRow>,
  ].filter(Boolean);
  if (rows.length === 0) return null;
  return (
    <div>
      <SectionHeading level={3} title="Profile" ja="プロフィール" />
      <table className="w-full border-collapse tabular-nums">
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export const GoodBad = ({ d }: { d: CharacterDetail }) => {
  const items = [
    { ja: "得意なこと", en: "Good at", text: present(d.strengths) },
    { ja: "苦手なこと", en: "Bad at", text: present(d.weaknesses) },
  ].filter((i) => i.text);
  if (items.length === 0) return null;
  return (
    <div className={`grid border-[3px] border-ink ${items.length === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((i, n) => (
        <div
          key={i.en}
          className={`px-3.5 py-3 ${n > 0 ? "border-ink max-sm:border-t-[3px] sm:border-l-[3px]" : ""}`}
        >
          <small className="block text-xs font-bold text-ink-sub">
            <span lang="ja">{i.ja}</span> · {i.en}
          </small>
          <p className="mt-0.5 mb-0 font-bold">
            <Value text={i.text!} />
          </p>
        </div>
      ))}
    </div>
  );
};

export const Introduction = ({ d }: { d: CharacterDetail }) => {
  const { playingId, progress, toggle } = useAudioPreview();
  const profile = present(d.profile);
  if (!profile && !d.voice) return null;
  const playing = playingId === "voice";
  return (
    <div>
      <SectionHeading level={3} title="In her words" ja="自己紹介" />
      {profile && (
        <p lang={langOf(profile)} className="mt-3 mb-0 text-lg font-medium leading-[1.7]">
          “{profile}”
        </p>
      )}
      {d.voice && (
        <div className="mt-3.5 flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => toggle("voice", d.voice!)}
            aria-label={playing ? "Pause voice line" : "Play voice line"}
            className={`flex h-11 shrink-0 cursor-pointer items-center gap-2.5 border-0 px-4 font-bold text-paper ${
              playing ? "bg-turf" : "bg-ink hover:bg-turf-dark"
            }`}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 4v16l13-8z" />
              </svg>
            )}
            Voice line
          </button>
          <div className="flex-1">{playing && <ProgressBar value={progress} />}</div>
        </div>
      )}
    </div>
  );
};

export const Trivia = ({ d }: { d: CharacterDetail }) => {
  const facts = [
    { ja: "耳", en: "Ears", text: present(d.ears_fact) },
    { ja: "尻尾", en: "Tail", text: present(d.tail_fact) },
    { ja: "家族", en: "Family", text: present(d.family_fact) },
  ].filter((f) => f.text);
  if (facts.length === 0) return null;
  return (
    <div>
      <SectionHeading level={3} title="Trivia" ja="ひみつ" />
      <dl className="m-0">
        {facts.map((f) => (
          <div key={f.en} className="grid grid-cols-[64px_1fr] gap-3.5 border-b border-rule py-3">
            <dt className="h-fit bg-ink py-1 text-center text-[13px] font-bold text-paper">
              <span lang="ja">{f.ja}</span>
              <span className="sr-only"> ({f.en})</span>
            </dt>
            <dd className="m-0">
              <Value text={f.text!} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export const NoProfileYet = () => (
  <div className="border-[3px] border-ink bg-tint px-4 py-3.5">
    <p className="m-0 font-cond text-[22px] font-bold uppercase leading-tight">
      No English profile yet
    </p>
  </div>
);

