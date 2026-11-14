interface PlayButtonProps {
  title: string;
  playing: boolean;
  onClick: () => void;
  className?: string;
}

/** Always-visible play/pause button whose accessible name includes the song title. */
export const PlayButton = ({ title, playing, onClick, className = "" }: PlayButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={playing ? `Pause ${title}` : `Play preview of ${title}`}
    className={`grid h-11 w-11 shrink-0 cursor-pointer place-items-center border-0 text-paper ${
      playing ? "bg-turf" : "bg-ink hover:bg-turf-dark"
    } ${className}`}
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
  </button>
);
