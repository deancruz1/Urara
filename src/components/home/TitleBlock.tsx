import heroBg from "../../assets/home-hero.webp";

interface TitleBlockProps {
  count: number | undefined;
  nextBirthday: string | undefined;
  latestNews: string | undefined;
}

const Stat = ({ ja, en, value }: { ja: string; en: string; value: string | undefined }) => (
  <>
    <dt className="text-xs font-bold leading-tight text-ink-sub">
      <span lang="ja">{ja}</span>
      <small className="block font-cond text-xs font-semibold uppercase tracking-[0.06em]">{en}</small>
    </dt>
    <dd className="m-0 text-right font-cond text-xl font-bold tabular-nums">
      {value ?? "—"}
    </dd>
  </>
);

export const TitleBlock = ({ count, nextBirthday, latestNews }: TitleBlockProps) => (
  <section className="wrap pt-8">
    <div className="flex flex-wrap border-[3px] border-ink">
      <div className="flex flex-[0_0_auto] flex-col justify-center bg-ink px-6.5 py-5 text-paper">
        <span className="inline-block min-w-[3ch] font-cond text-[76px] font-extrabold leading-[0.85] tabular-nums">
          {count ?? "—"}
        </span>
        <span lang="ja" className="mt-1.5 text-[13px] font-bold">
          頭のウマ娘
        </span>
      </div>
      <div className="min-w-0 flex-[1_1_420px] px-7 py-5.5">
        <h1 className="m-0 font-cond text-[clamp(40px,6vw,70px)] font-extrabold uppercase leading-[0.92] text-balance">
          Umamusume Pretty Derby fan guide
        </h1>
      </div>
      <dl className="m-0 grid flex-[1_1_260px] grid-cols-[auto_1fr] content-center items-center gap-x-4 gap-y-3 border-ink px-5.5 py-4.5 max-[47rem]:border-t-[3px] min-[47rem]:flex-[0_1_260px] min-[47rem]:border-l-[3px]">
        <Stat ja="次の誕生日" en="Next birthday" value={nextBirthday} />
        <Stat ja="最新ニュース" en="Latest news" value={latestNews} />
      </dl>
    </div>
    <img
      src={heroBg}
      alt="Umamusume key art: a field of characters racing along the rail"
      width={1920}
      height={1109}
      fetchPriority="high"
      className="block h-[clamp(220px,40vw,440px)] w-full border-[3px] border-t-0 border-ink object-cover object-[center_35%]"
    />
  </section>
);
