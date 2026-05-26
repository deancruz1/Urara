import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useCharacterList, useCharacter, useCharacterImages } from "../hooks";
import {
  CharacterSidebar,
  CharacterHero,
  CharacterProfile,
  CharacterFunFacts,
  CharacterGallery,
  CharacterVoiceSample,
} from "../components/characters";
import type {
  CharacterListItem,
  CharacterDetail,
  CharacterImageSet,
} from "../types";

const Characters = () => {
  const { data: characters, isLoading } = useCharacterList();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedChar, setSelectedChar] = useState<CharacterListItem | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showTranslation, setShowTranslation] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const { data: characterDetailRaw, isLoading: detailLoading } = useCharacter(
    selectedId ?? 0,
  );
  const { data: characterImagesRaw } = useCharacterImages(selectedId ?? 0);

  const characterDetail = characterDetailRaw as CharacterDetail | undefined;
  const characterImages = characterImagesRaw as CharacterImageSet[] | undefined;

  const cleanText = (text: string): string => {
    if (!text) return text;
    return text.replace(/\\n/g, " ").replace(/\\ n/g, " ").replace(/\n/g, " ");
  };

  const hasJapaneseText = (text: string): boolean => {
    if (!text) return false;
    return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
  };

  const hasJapaneseContent = characterDetail
    ? hasJapaneseText(characterDetail.profile || "") ||
      hasJapaneseText(characterDetail.ears_fact || "") ||
      hasJapaneseText(characterDetail.tail_fact || "") ||
      hasJapaneseText(characterDetail.family_fact || "") ||
      hasJapaneseText(characterDetail.strengths || "") ||
      hasJapaneseText(characterDetail.weaknesses || "") ||
      hasJapaneseText(characterDetail.residence || "") ||
      hasJapaneseText(characterDetail.grade || "") ||
      hasJapaneseText(characterDetail.shoe_size || "")
    : false;

  const filteredCharacters = useMemo(() => {
    if (!characters) return [];
    if (!searchQuery.trim()) return characters;
    const query = searchQuery.toLowerCase();
    return characters.filter(
      (char) =>
        char.name_en.toLowerCase().includes(query) ||
        char.name_jp.toLowerCase().includes(query) ||
        char.category_label_en.toLowerCase().includes(query),
    );
  }, [characters, searchQuery]);

  const handleSelect = (char: CharacterListItem) => {
    setSelectedId(char.id);
    setSelectedChar(char);
    setShowTranslation(false);
    setGalleryIndex(0);
  };

  if (filteredCharacters.length > 0 && !selectedChar) {
    handleSelect(filteredCharacters[0]);
  }

  return (
    <>
      <Helmet>
        <title>Characters | Urara</title>
        <meta
          name="description"
          content="Browse all Umamusume Pretty Derby characters, their profiles, gallery, and voice samples."
        />
      </Helmet>

      <div className="min-h-screen bg-bg-primary pt-12">
        <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
          <CharacterSidebar
            characters={filteredCharacters}
            selectedChar={selectedChar}
            searchQuery={searchQuery}
            isLoading={isLoading}
            onSearch={setSearchQuery}
            onSelect={handleSelect}
          />

          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {selectedChar && (
                <motion.div
                  key={selectedChar.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full"
                >
                  <CharacterHero
                    nameEn={selectedChar.name_en}
                    nameJp={selectedChar.name_jp}
                    categoryLabelEn={selectedChar.category_label_en}
                    colorMain={selectedChar.color_main}
                    colorSub={selectedChar.color_sub}
                    thumbImg={selectedChar.thumb_img}
                  />

                  <div className="p-8">
                    {detailLoading ? (
                      <p className="text-text-secondary">Loading details...</p>
                    ) : characterDetail ? (
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                          <CharacterProfile
                            characterDetail={characterDetail}
                            showTranslation={showTranslation}
                            hasJapaneseText={hasJapaneseText}
                            cleanText={cleanText}
                            onToggleTranslation={() =>
                              setShowTranslation(!showTranslation)
                            }
                            hasJapaneseContent={hasJapaneseContent}
                            accentColor={selectedChar.color_main}
                          />
                          <CharacterFunFacts
                            characterDetail={characterDetail}
                            showTranslation={showTranslation}
                            hasJapaneseText={hasJapaneseText}
                            cleanText={cleanText}
                            accentColor={selectedChar.color_main}
                          />
                        </div>

                        <div>
                          <CharacterGallery
                            images={characterImages || []}
                            galleryIndex={galleryIndex}
                            onIndexChange={setGalleryIndex}
                            onImageClick={setLightboxImage}
                            accentColor={selectedChar.color_main}
                          />
                          {characterDetail.voice && (
                            <CharacterVoiceSample
                              voiceUrl={characterDetail.voice}
                              accentColor={selectedChar.color_main}
                            />
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={lightboxImage}
              alt="Lightbox"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Characters;
