import type { Track } from "../../types";

interface TrackItemProps {
  track: Track;
  isPlaying: boolean;
  onPlay: (url: string) => void;
}

export const TrackItem = ({ track, isPlaying, onPlay }: TrackItemProps) => (
  <div className="flex items-center gap-4 rounded-2xl bg-bg-secondary p-4">
    {/* Album Art */}
    {track._albums[0]?.album_art && (
      <img
        src={track._albums[0].album_art}
        alt={track._albums[0].name_en}
        className="h-16 w-16 shrink-0 rounded-xl object-cover"
      />
    )}

    {/* Track Info */}
    <div className="min-w-0 flex-1">
      <p className="truncate font-semibold text-text-primary">
        {track.name_en}
      </p>
      <p className="text-sm text-text-secondary">
        {track._singers.map((s) => s.chara_name_en).join(", ")}
      </p>
      <p className="truncate text-xs text-text-secondary">
        {track._albums[0]?.name_en}
      </p>
    </div>

    {/* Singer Icons */}
    <div className="hidden shrink-0 flex-wrap justify-end gap-1 sm:flex">
      {track._singers.slice(0, 4).map((singer) => (
        <img
          key={singer.id}
          src={singer.chara_image}
          alt={singer.chara_name_en}
          title={singer.chara_name_en}
          className="h-8 w-8 rounded-full border border-border object-cover"
        />
      ))}
      {track._singers.length > 4 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-tertiary text-xs text-text-secondary">
          +{track._singers.length - 4}
        </div>
      )}
    </div>

    {/* Play Button */}
    {track.preview_url && (
      <button
        onClick={() => onPlay(track.preview_url!)}
        className="shrink-0 cursor-pointer rounded-full bg-accent p-3 text-white transition-opacity duration-200 hover:opacity-80"
        aria-label={`Play ${track.name_en}`}
      >
        {isPlaying ? (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    )}
  </div>
);
