import { useState } from "react";
import { useMusicFilters, useMusicFilter } from "../hooks";
import Container from "../components/Container";
import type { Track } from "../types";
import { Helmet } from "react-helmet-async";

const DEFAULT_CHARACTER = "haru-urara";

const Music = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(DEFAULT_CHARACTER);
  const [search, setSearch] = useState("");
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  const { data: filters, isLoading: filtersLoading } = useMusicFilters();
  const { data: musicData, isLoading: tracksLoading } = useMusicFilter(
    selectedCharacter ? { character: selectedCharacter } : {},
  );

  const tracks = musicData?.tracks ?? [];
  const filteredTracks = search
    ? tracks.filter((t) =>
        t.name_en.toLowerCase().includes(search.toLowerCase()),
      )
    : tracks;

  const handlePlay = (url: string) => {
    if (playingUrl === url) {
      setPlayingUrl(null);
    } else {
      setPlayingUrl(url);
    }
  };

  <Helmet>
    <title>Music | Urara</title>
    <meta
      name="description"
      content="Browse the Umamusume Pretty Derby discography, filter by character, and preview tracks."
    />
  </Helmet>;

  return (
    <div className="min-h-screen bg-bg-primary pt-24">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold tracking-widest text-accent uppercase">
            Music
          </p>
          <h1 className="text-4xl font-bold text-text-primary">Discography</h1>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search songs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-border bg-bg-secondary px-6 py-3 text-sm text-text-primary placeholder-text-secondary outline-none focus:border-accent transition-colors duration-200"
          />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Character Filter */}
          <div className="w-full shrink-0 lg:w-64">
            <p className="mb-4 text-sm font-bold tracking-widest text-accent uppercase">
              Filter by Character
            </p>
            {filtersLoading ? (
              <p className="text-text-secondary text-sm">Loading...</p>
            ) : (
              <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {filters?.character.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => setSelectedCharacter(char.id)}
                    className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 text-left ${
                      selectedCharacter === char.id
                        ? "bg-accent text-white"
                        : "bg-bg-secondary text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {char.display}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Track List */}
          <div className="flex-1">
            {tracksLoading ? (
              <p className="text-text-secondary">Loading tracks...</p>
            ) : filteredTracks.length === 0 ? (
              <p className="text-text-secondary">No tracks found.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredTracks.map((track: Track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 rounded-2xl bg-bg-secondary p-4"
                  >
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
                        onClick={() => handlePlay(track.preview_url!)}
                        className="shrink-0 cursor-pointer rounded-full bg-accent p-3 text-white transition-opacity duration-200 hover:opacity-80"
                        aria-label={`Play ${track.name_en}`}
                      >
                        {playingUrl === track.preview_url ? (
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                          </svg>
                        ) : (
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Audio Player */}
        {playingUrl && (
          <audio
            key={playingUrl}
            src={playingUrl}
            autoPlay
            onEnded={() => setPlayingUrl(null)}
            className="hidden"
          />
        )}
      </Container>
    </div>
  );
};

export default Music;
