import { useState, useEffect, useMemo } from "react";
import { useMusicFilters, useMusicFilter } from "../hooks";
import Container from "../components/Container";
import type { Track } from "../types";
import { Helmet } from "react-helmet-async";
import { useCharacterList } from "../hooks";

const DEFAULT_CHARACTER = "haru-urara";

const Music = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(DEFAULT_CHARACTER);
  const [search, setSearch] = useState("");
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const { data: characterList } = useCharacterList();

  const { data: filters, isLoading: filtersLoading } = useMusicFilters();
  const { data: musicData, isLoading: tracksLoading } = useMusicFilter(
    selectedCharacter ? { character: selectedCharacter } : {},
  );

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const tracks = useMemo(() => musicData?.tracks ?? [], [musicData]);
  const filteredTracks = useMemo(
    () =>
      search
        ? tracks.filter((t) =>
            t.name_en.toLowerCase().includes(search.toLowerCase()),
          )
        : tracks,
    [tracks, search],
  );

  const handlePlay = (url: string) => {
    if (playingUrl === url) {
      setPlayingUrl(null);
    } else {
      setPlayingUrl(url);
    }
  };

  // Build a map of character display name -> image
  const characterImageMap = useMemo(() => {
    const map = new Map();
    characterList?.forEach((char) => {
      map.set(char.name_en, char.thumb_img);
    });
    return map;
  }, [characterList]);

  return (
    <>
      <Helmet>
        <title>Music | Urara</title>
        <meta
          name="description"
          content="Browse the Umamusume Pretty Derby discography, filter by character, and preview tracks."
        />
      </Helmet>

      <div className="min-h-screen bg-bg-primary pt-24">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-bold tracking-widest text-accent uppercase">
              Music
            </p>
            <h1 className="text-4xl font-bold text-text-primary">
              Discography
            </h1>
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

          {/* Desktop: Full viewport height layout */}
          {isDesktop ? (
            <div className="-mx-4" style={{ height: "calc(100vh - 280px)" }}>
              <div className="flex h-full gap-8 px-4 pb-12">
                {/* Character Filter - Scrollable */}
                <div className="w-64 shrink-0 flex flex-col h-full">
                  <p className="mb-4 text-sm font-bold tracking-widest text-accent uppercase">
                    Filter by Character
                  </p>
                  <div className="flex-1 overflow-y-auto">
                    {filtersLoading ? (
                      <p className="text-text-secondary text-sm">Loading...</p>
                    ) : (
                      <div className="flex flex-col gap-1 pr-2">
                        {filters?.character.map((char) => {
                          const characterImage = characterImageMap.get(
                            char.display,
                          );
                          return (
                            <button
                              key={char.id}
                              onClick={() => setSelectedCharacter(char.id)}
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
                    )}
                  </div>
                </div>

                {/* Track List - Scrollable */}
                <div className="flex-1 flex flex-col h-full min-w-0">
                  <div className="flex-1 overflow-y-auto pr-2">
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
                                {track._singers
                                  .map((s) => s.chara_name_en)
                                  .join(", ")}
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
              </div>
            </div>
          ) : (
            /* Mobile/Tablet: Horizontal scroll layout */
            <div className="flex flex-col gap-8">
              {/* Character Filter - Horizontal scroll */}
              <div>
                <p className="mb-4 text-sm font-bold tracking-widest text-accent uppercase">
                  Filter by Character
                </p>
                {filtersLoading ? (
                  <p className="text-text-secondary text-sm">Loading...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <div className="flex gap-2 pb-2 min-w-max">
                      {filters?.character.map((char) => {
                        const characterImage = characterImageMap.get(
                          char.display,
                        );
                        return (
                          <button
                            key={char.id}
                            onClick={() => setSelectedCharacter(char.id)}
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
                )}
              </div>

              {/* Track List - MADE SCROLLABLE ONLY */}
              <div className="h-[calc(100vh-350px)] overflow-y-auto mb-6">
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
                            {track._singers
                              .map((s) => s.chara_name_en)
                              .join(", ")}
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
          )}
        </Container>

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
      </div>
    </>
  );
};

export default Music;
