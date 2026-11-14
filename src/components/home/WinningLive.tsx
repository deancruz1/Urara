import { PlayButton, ProgressBar, SectionHeading } from "../ui";
import { featuredTracks } from "../../data/featured-tracks";
import { useAudioPreview } from "../../hooks";

export const WinningLive = () => {
  const { playingId, progress, toggle } = useAudioPreview();

  return (
    <section className="min-w-0 flex-[1_1_560px]" aria-labelledby="live-heading">
      <SectionHeading
        id="live-heading"
        title="Winning Live"
        ja="ウイニングライブ"
        link={{ to: "/music", label: "All songs" }}
      />
      <ol className="m-0 list-none p-0">
        {featuredTracks.map((t) => {
          const playing = playingId === t.id;
          return (
            <li key={t.id} className="flex items-center gap-3.5 border-b border-rule py-3 last:border-b-0">
              <PlayButton
                title={t.name_en}
                playing={playing}
                onClick={() => toggle(t.id, t.preview_url)}
              />
              <img
                src={t.image}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="h-14 w-14 shrink-0 object-cover"
              />
              <div className="min-w-0 flex-1">
                <div lang="ja" className={`text-base font-bold leading-[1.3] ${playing ? "text-turf" : ""}`}>
                  {t.name}
                </div>
                <div className="text-[13px] text-ink-sub">
                  {t.name_en !== t.name && <>{t.name_en} · </>}
                  {t.artist}
                </div>
                {playing && <ProgressBar value={progress} />}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
