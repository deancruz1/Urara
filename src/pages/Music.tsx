import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  useAudioPreview,
  useCharacterList,
  useMusicFilter,
  useMusicFilters,
} from "../hooks";
import { SectionHeading } from "../components/ui";
import { MusicFilter, SongList } from "../components/music";

const DEFAULT_CHARACTER = "haru-urara";

const Music = () => {
  const [selected, setSelected] = useState(DEFAULT_CHARACTER);
  const [search, setSearch] = useState("");
  const { playingId, progress, toggle, stop } = useAudioPreview();

  const { data: characterList } = useCharacterList();
  const filters = useMusicFilters();
  const music = useMusicFilter({ character: selected });

  const imageByName = useMemo(
    () => new Map((characterList ?? []).map((c) => [c.name_en, c.thumb_img])),
    [characterList],
  );
  const selectedName =
    filters.data?.character.find((c) => c.id === selected)?.display ?? "Haru Urara";

  const tracks = useMemo(() => music.data?.tracks ?? [], [music.data]);
  const q = search.trim().toLowerCase();
  const shown = useMemo(
    () =>
      q
        ? tracks.filter(
            (t) =>
              (t.name_en ?? "").toLowerCase().includes(q) ||
              (t.name_jp ?? "").toLowerCase().includes(q),
          )
        : tracks,
    [tracks, q],
  );

  const select = (id: string) => {
    if (id === selected) return;
    stop();
    setSelected(id);
  };

  let body: React.ReactNode;
  if (music.isError) {
    body = <p className="mt-4 text-ink-sub">Couldn't load songs.</p>;
  } else if (music.isLoading) {
    body = <p className="mt-4 min-h-60 text-ink-sub">Loading songs…</p>;
  } else if (tracks.length === 0) {
    body = <p className="mt-4 text-ink-sub">{selectedName} has no songs yet.</p>;
  } else if (shown.length === 0) {
    body = <p className="mt-4 text-ink-sub">No songs match “{search.trim()}”.</p>;
  } else {
    body = (
      <SongList
        tracks={shown}
        singer={selectedName}
        playingId={playingId}
        progress={progress}
        onToggle={toggle}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Music | Urara</title>
        <meta
          name="description"
          content="Browse Umamusume Pretty Derby songs by the character who sings them, search by title, and play previews."
        />
      </Helmet>

      <div className="wrap pt-8">
        <SectionHeading level={1} title="Music" ja="楽曲" />
      </div>

      <div className="wrap flex flex-col items-start gap-6 pt-6 lg:flex-row lg:gap-8">
        <MusicFilter
          characters={filters.data?.character ?? []}
          imageByName={imageByName}
          selected={selected}
          onSelect={select}
          isLoading={filters.isLoading}
          isError={filters.isError}
        />

        <section className="w-full min-w-0 flex-1" aria-labelledby="songs-heading">
          <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1 border-b-[3px] border-ink pb-1.5">
            <h2 id="songs-heading" className="m-0 font-cond text-[26px] font-extrabold uppercase leading-none">
              {selectedName}
            </h2>
            <span className="font-cond text-lg font-bold tabular-nums" aria-live="polite">
              {music.data ? `${q ? `${shown.length} of ` : ""}${tracks.length} ${tracks.length === 1 ? "song" : "songs"}` : ""}
            </span>
          </div>
          <label htmlFor="song-search" className="sr-only">
            Search {selectedName}'s songs by title
          </label>
          <input
            id="song-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search songs"
            autoComplete="off"
            className="mt-4 block h-12 w-full border-0 border-b-2 border-ink bg-tint px-3 -outline-offset-4 focus-visible:bg-paper"
          />
          {body}
        </section>
      </div>
    </>
  );
};

export default Music;
