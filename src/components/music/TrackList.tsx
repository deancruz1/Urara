import type { Track } from "../../types";
import { TrackItem } from "./TrackItem";

interface TrackListProps {
  tracks: Track[];
  playingUrl: string | null;
  onPlay: (url: string) => void;
  isLoading: boolean;
  isMobile?: boolean;
}

export const TrackList = ({
  tracks,
  playingUrl,
  onPlay,
  isLoading,
  isMobile = false,
}: TrackListProps) => {
  if (isLoading) {
    return <p className="text-text-secondary">Loading tracks...</p>;
  }

  if (tracks.length === 0) {
    return <p className="text-text-secondary">No tracks found.</p>;
  }

  const scrollClass = isMobile
    ? "h-[calc(100vh-350px)] overflow-y-auto mb-6"
    : "flex-1 overflow-y-auto pr-2";

  return (
    <div className={scrollClass}>
      <div className="flex flex-col gap-4">
        {tracks.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            isPlaying={playingUrl === track.preview_url}
            onPlay={onPlay}
          />
        ))}
      </div>
    </div>
  );
};
