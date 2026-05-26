interface CharacterFilterProps {
  characters: { id: string; display: string }[];
  selectedCharacter: string;
  characterImageMap: Map<string, string>;
  isLoading: boolean;
  onSelect: (id: string) => void;
  isDesktop: boolean;
}

export const CharacterFilter = ({
  characters,
  selectedCharacter,
  characterImageMap,
  isLoading,
  onSelect,
  isDesktop,
}: CharacterFilterProps) => {
  if (isLoading) {
    return <p className="text-text-secondary text-sm">Loading...</p>;
  }

  if (isDesktop) {
    return (
      <div className="flex flex-col gap-1 pr-2">
        {characters.map((char) => {
          const characterImage = characterImageMap.get(char.display);
          return (
            <button
              key={char.id}
              onClick={() => onSelect(char.id)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 text-left flex items-center gap-2 ${
                selectedCharacter === char.id
                  ? "bg-accent text-white"
                  : "bg-bg-secondary text-text-secondary hover:text-text-primary"
              }`}
            >
              {characterImage && (
                <img
                  src={characterImage}
                  alt={char.display}
                  className="h-6 w-6 rounded-full object-cover"
                />
              )}
              {char.display}
            </button>
          );
        })}
      </div>
    );
  }

  // Mobile: horizontal scroll
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2 pb-2 min-w-max">
        {characters.map((char) => {
          const characterImage = characterImageMap.get(char.display);
          return (
            <button
              key={char.id}
              onClick={() => onSelect(char.id)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 text-left flex items-center gap-2 whitespace-nowrap ${
                selectedCharacter === char.id
                  ? "bg-accent text-white"
                  : "bg-bg-secondary text-text-secondary hover:text-text-primary"
              }`}
            >
              {characterImage && (
                <img
                  src={characterImage}
                  alt={char.display}
                  className="h-6 w-6 rounded-full object-cover"
                />
              )}
              {char.display}
            </button>
          );
        })}
      </div>
    </div>
  );
};
