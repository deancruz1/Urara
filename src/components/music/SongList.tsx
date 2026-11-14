import { PlayButton, ProgressBar } from "../ui";
import { langOf } from "../../lib/text";
import type { AudioId } from "../../hooks";
import type { Track } from "../../types";

interface Props {
  tracks: Track[];
  playingId: AudioId | null;
  progress: number;
  onToggle: (id: AudioId, url: string) => void;
}

export const SongList = ({ tracks, playingId, progress, onToggle }: Props) => (
  <ol className="m-0 list-none p-0">
    {tracks.map((t) => {
      const playing = playingId === t.id;
      const album = t._albums[0];
      const singers = t._singers.map((s) => s.chara_name_en).join(", ");
      return (
        <li key={t.id} className="flex items-center gap-3.5 border-b border-rule py-3 last:border-b-0">
          {t.preview_url ? (
            <PlayButton
              title={t.name_en || t.name_jp}
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
            <div lang={langOf(t.name_jp)} className={`break-words font-bold leading-[1.3] ${playing ? "text-turf" : ""}`}>
              {t.name_jp || t.name_en}
            </div>
            {t.name_en && t.name_en !== t.name_jp && (
              <div className="break-words text-sm">{t.name_en}</div>
            )}
            <div className="break-words text-[13px] text-ink-sub">
              {singers}
              {album && (
                <>
                  {singers && " · "}
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
