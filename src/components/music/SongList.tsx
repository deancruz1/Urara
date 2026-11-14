import { useState } from "react";
import { PlayButton, ProgressBar } from "../ui";
import { langOf } from "../../lib/text";
import type { AudioId } from "../../hooks";
import type { Track } from "../../types";

interface Props {
  tracks: Track[];
  /** The singer being browsed; listed first in each song's singers. */
  singer: string;
  playingId: AudioId | null;
  progress: number;
  onToggle: (id: AudioId, url: string) => void;
}

const SHOWN = 3;

/** Up to three singers, then a "+N more" toggle for the rest. */
const Singers = ({ names, lead }: { names: string[]; lead: string }) => {
  const [open, setOpen] = useState(false);
  const ordered = names.includes(lead) ? [lead, ...names.filter((n) => n !== lead)] : names;
  const hidden = ordered.length - SHOWN;
  const shown = open || hidden <= 0 ? ordered : ordered.slice(0, SHOWN);
  return (
    <>
      {shown.join(", ")}
      {hidden > 0 && (
        <>
          {" "}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="cursor-pointer border-0 bg-transparent p-0 font-bold text-ink underline decoration-dotted underline-offset-2"
          >
            {open ? "Show fewer" : `+${hidden} more`}
          </button>
        </>
      )}
    </>
  );
};

export const SongList = ({ tracks, singer, playingId, progress, onToggle }: Props) => (
  <ol className="m-0 list-none p-0">
    {tracks.map((t) => {
      const playing = playingId === t.id;
      const album = t._albums[0];
      const title = t.name_en || t.name_jp;
      return (
        <li key={t.id} className="flex items-center gap-3.5 border-b border-rule py-3 last:border-b-0">
          {t.preview_url ? (
            <PlayButton
              title={title}
              playing={playing}
              onClick={() => onToggle(t.id, t.preview_url!)}
            />
          ) : (
            <span className="grid h-11 w-11 shrink-0 place-items-center border-2 border-rule text-center text-[10px] font-bold leading-tight text-ink-sub">
              No preview
            </span>
          )}
          {album?.album_art ? (
            <img
              src={album.album_art}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className="h-14 w-14 shrink-0 bg-tint object-cover"
            />
          ) : (
            <span aria-hidden="true" className="h-14 w-14 shrink-0 bg-tint" />
          )}
          <div className="min-w-0 flex-1">
            <div lang={langOf(title)} className={`break-words font-bold leading-[1.3] ${playing ? "text-turf" : ""}`}>
              {title}
            </div>
            {t.name_en && t.name_jp && t.name_jp !== t.name_en && (
              <div lang={langOf(t.name_jp)} className="break-words text-sm">
                {t.name_jp}
              </div>
            )}
            <div className="break-words text-[13px] text-ink-sub">
              <Singers names={t._singers.map((s) => s.chara_name_en)} lead={singer} />
              {album && (
                <>
                  {t._singers.length > 0 && " · "}
                  <span lang={langOf(album.name_en)}>{album.name_en || album.name_jp}</span>
                </>
              )}
            </div>
            {playing && <ProgressBar value={progress} />}
          </div>
        </li>
      );
    })}
  </ol>
);
