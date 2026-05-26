interface NewsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const NewsHeader = ({ search, onSearchChange }: NewsHeaderProps) => (
  <>
    <div className="mb-8">
      <p className="mb-2 text-sm font-bold tracking-widest text-accent uppercase">
        News
      </p>
      <h1 className="text-4xl font-bold text-text-primary">Latest Updates</h1>
    </div>

    <div className="mb-6">
      <input
        type="text"
        placeholder="Search news..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-full border border-border bg-bg-secondary px-6 py-3 text-sm text-text-primary placeholder-text-secondary outline-none focus:border-accent transition-colors duration-200"
      />
    </div>
  </>
);
