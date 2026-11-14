import { useEffect } from "react";
import { useCharacter, useCharacterImages } from "../../hooks";
import type { CharacterListItem } from "../../types";
import { ProfileHeader } from "./ProfileHeader";
import {
  DetailsTable,
  GoodBad,
  Introduction,
  NoProfileYet,
  Trivia,
} from "./ProfileDetails";
import { hasNoProfileText } from "../../lib/profile";
import { OutfitGallery } from "./OutfitGallery";

/** The selected character's "form guide". Remount per character (key by id). */
interface Props {
  character: CharacterListItem;
  /** Called once the profile's data has settled (loaded or failed). */
  onReady?: () => void;
}

export const CharacterProfile = ({ character, onReady }: Props) => {
  const detail = useCharacter(character.id);
  const images = useCharacterImages(character.id);
  const d = detail.data;
  const settled = !detail.isLoading && !images.isLoading;

  useEffect(() => {
    if (settled) onReady?.();
  }, [settled, onReady]);

  return (
    <article className="animate-fade-in" aria-label={`${character.name_en} profile`}>
      <ProfileHeader character={character} grade={d?.grade} slogan={d?.slogan} />

      <div className="mt-7 flex flex-wrap gap-8">
        {images.data && <OutfitGallery sets={images.data} name={character.name_en} />}

        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-7">
          {detail.isError ? (
            <p className="m-0 text-ink-sub">
              Couldn't load this profile.
            </p>
          ) : detail.isLoading || !d ? (
            <p className="m-0 min-h-60 text-ink-sub">Loading profile…</p>
          ) : (
            <>
              {hasNoProfileText(d) && <NoProfileYet />}
              <DetailsTable d={d} />
              <GoodBad d={d} />
              <Introduction d={d} />
              <Trivia d={d} />
            </>
          )}
        </div>
      </div>
    </article>
  );
};
