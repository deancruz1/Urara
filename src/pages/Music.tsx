import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useMusicFilters, useMusicFilter, useCharacterList } from "../hooks";
import Container from "../components/Container";
import {
  MusicHeader,
  CharacterFilter,
  TrackList,
  MusicPlayer,
} from "../components/music";

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
          <MusicHeader search={search} onSearchChange={setSearch} />

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
                    <CharacterFilter
                      characters={filters?.character || []}
                      selectedCharacter={selectedCharacter}
                      characterImageMap={characterImageMap}
                      isLoading={filtersLoading}
                      onSelect={setSelectedCharacter}
                      isDesktop={true}
                    />
                  </div>
                </div>

                {/* Track List - Scrollable */}
                <div className="flex-1 flex flex-col h-full min-w-0">
                  <TrackList
                    tracks={filteredTracks}
                    playingUrl={playingUrl}
                    onPlay={handlePlay}
                    isLoading={tracksLoading}
                  />
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
                <CharacterFilter
                  characters={filters?.character || []}
                  selectedCharacter={selectedCharacter}
                  characterImageMap={characterImageMap}
                  isLoading={filtersLoading}
                  onSelect={setSelectedCharacter}
                  isDesktop={false}
                />
              </div>

              {/* Track List - Scrollable */}
              <TrackList
                tracks={filteredTracks}
                playingUrl={playingUrl}
                onPlay={handlePlay}
                isLoading={tracksLoading}
                isMobile={true}
              />
            </div>
          )}
        </Container>

        <MusicPlayer
          playingUrl={playingUrl}
          onEnded={() => setPlayingUrl(null)}
        />
      </div>
    </>
  );
};

export default Music;
