interface CharacterVoiceSampleProps {
  voiceUrl: string;
  accentColor: string;
}

export const CharacterVoiceSample = ({
  voiceUrl,
  accentColor,
}: CharacterVoiceSampleProps) => (
  <div className="mt-6">
    <p
      className="mb-4 text-sm font-bold tracking-widest uppercase"
      style={{ color: accentColor }}
    >
      Voice Sample
    </p>
    <audio controls src={voiceUrl} className="w-full" />
  </div>
);
