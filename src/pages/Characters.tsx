import { useCallback, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useCharacterList } from "../hooks";
import { CharacterList, CharacterProfile } from "../components/characters";

const Characters = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { data: characters, isLoading, isError } = useCharacterList();
  const [search, setSearch] = useState("");

  // While a newly selected profile loads, hold the profile area at its old
  // height so the page doesn't shrink and pull the scroll position up.
  const profileRef = useRef<HTMLDivElement>(null);
  const [heldHeight, setHeldHeight] = useState<number>();
  const holdHeight = useCallback(
    () => setHeldHeight(profileRef.current?.offsetHeight),
    [],
  );
  const release = useCallback(() => setHeldHeight(undefined), []);

  // The URL is the only source of the selection; unknown slugs fall back to
  // the first character of the full list.
  const selected = characters?.find((c) => c.preferred_url === slug) ?? characters?.[0];
  // Old links used ?id=; send them to the slug address.
  const legacyId = searchParams.get("id");
  const legacy = legacyId ? characters?.find((c) => c.id === Number(legacyId)) : undefined;

  const filtered = useMemo(() => {
    if (!characters) return [];
    const q = search.trim().toLowerCase();
    if (!q) return characters;
    return characters.filter(
      (c) =>
        c.name_en.toLowerCase().includes(q) ||
        c.name_jp.toLowerCase().includes(q) ||
        c.category_label_en.toLowerCase().includes(q),
    );
  }, [characters, search]);

  if (legacy) return <Navigate replace to={`/characters/${legacy.preferred_url}`} />;

  const named = slug && selected?.preferred_url === slug ? selected : undefined;

  return (
    <>
      <Helmet>
        <title>{named ? `${named.name_en} | Urara` : "Characters | Urara"}</title>
        <meta
          name="description"
          content={
            named
              ? `${named.name_en} (${named.name_jp}) from Umamusume Pretty Derby: profile, official colours, voice line, trivia and outfit artwork.`
              : "Browse every Umamusume Pretty Derby character: profiles, official colours, voice lines, trivia and outfit artwork."
          }
        />
      </Helmet>

      <div className="wrap flex flex-col items-start gap-6 pt-6 lg:flex-row lg:gap-8">
        <CharacterList
          characters={filtered}
          total={characters?.length ?? 0}
          selectedId={selected?.id}
          search={search}
          onSearch={setSearch}
          onSelect={holdHeight}
          isLoading={isLoading}
          isError={isError}
        />
        <div
          ref={profileRef}
          className="w-full min-w-0 flex-1"
          style={{ minHeight: heldHeight }}
        >
          {isError ? (
            <p className="m-0 text-ink-sub">
              Couldn't load characters.
            </p>
          ) : selected ? (
            <CharacterProfile
              key={selected.id}
              character={selected}
              onReady={release}
            />
          ) : (
            <p className="m-0 min-h-60 text-ink-sub">Loading profile…</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Characters;
