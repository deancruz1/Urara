import type { CharacterListItem } from "../../types";

interface CharacterSidebarProps {
  characters: CharacterListItem[];
  selectedChar: CharacterListItem | null;
  searchQuery: string;
  isLoading: boolean;
  onSearch: (query: string) => void;
  onSelect: (char: CharacterListItem) => void;
}

export const CharacterSidebar = ({
  characters,
  selectedChar,
  searchQuery,
  isLoading,
  onSearch,
  onSelect,
}: CharacterSidebarProps) => (
  <div className="flex w-full shrink-0 flex-col border-b border-border lg:w-72 lg:border-b-0 lg:border-r">
    <div className="px-4 pb-2 pt-6">
      <input
        type="text"
        placeholder="Search characters..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm text-text-primary placeholder-text-secondary outline-none focus:border-accent transition-colors duration-200"
      />
    </div>

    <div className="overflow-x-auto lg:overflow-y-auto">
      <div className="flex gap-2 p-4 pt-2 lg:flex-col lg:gap-1">
        {isLoading ? (
          <p className="text-sm text-text-secondary">Loading...</p>
        ) : characters.length === 0 ? (
          <p className="text-sm text-text-secondary">No characters found.</p>
        ) : (
          characters.map((char) => (
            <button
              key={char.id}
              onClick={() => onSelect(char)}
              className={`flex shrink-0 cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors duration-200 lg:w-full ${
                selectedChar?.id === char.id
                  ? "bg-bg-tertiary"
                  : "hover:bg-bg-secondary"
              }`}
            >
              <img
                src={char.thumb_img}
                alt={char.name_en}
                className="h-12 w-12 shrink-0 rounded-full object-cover"
                style={{
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderColor:
                    selectedChar?.id === char.id
                      ? char.color_main
                      : "transparent",
                }}
              />
              <span className="hidden text-left text-sm font-semibold text-text-primary lg:block">
                {char.name_en}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  </div>
);
