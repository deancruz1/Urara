interface MusicPlayerProps {
  playingUrl: string | null;
  onEnded: () => void;
}

export const MusicPlayer = ({ playingUrl, onEnded }: MusicPlayerProps) => {
  if (!playingUrl) return null;

  return (
    <audio
      key={playingUrl}
      src={playingUrl}
      autoPlay
      onEnded={onEnded}
      className="hidden"
    />
  );
};
