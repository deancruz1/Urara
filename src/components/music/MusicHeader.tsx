interface MusicHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const MusicHeader = ({ search, onSearchChange }: MusicHeaderProps) => (
  <>
    <div className="mb-8">
      <p className="mb-2 text-sm font-bold tracking-widest text-accent uppercase">
        Music
      </p>
      <h1 className="text-4xl font-bold text-text-primary">Discography</h1>
    </div>

    <div className="mb-8">
      <input
        type="text"
        placeholder="Search songs..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-full border border-border bg-bg-secondary px-6 py-3 text-sm text-text-primary placeholder-text-secondary outline-none focus:border-accent transition-colors duration-200"
      />
    </div>
  </>
);
