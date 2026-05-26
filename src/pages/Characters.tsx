import { useState, useMemo } from "react";
import { useCharacterList, useCharacter, useCharacterImages } from "../hooks";
import { motion, AnimatePresence } from "framer-motion";
import { TranslatedText } from "../components/TranslatedText";
import type {
  CharacterListItem,
  CharacterDetail,
  CharacterImageSet,
} from "../types";
import { Helmet } from "react-helmet-async";

const Characters = () => {
  const { data: characters, isLoading } = useCharacterList();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedChar, setSelectedChar] = useState<CharacterListItem | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showTranslation, setShowTranslation] = useState(false);

  const { data: characterDetailRaw, isLoading: detailLoading } = useCharacter(
    selectedId ?? 0,
  );
  const { data: characterImagesRaw } = useCharacterImages(selectedId ?? 0);

  const characterDetail = characterDetailRaw as CharacterDetail | undefined;
  const characterImages = characterImagesRaw as CharacterImageSet[] | undefined;

  // Helper function to clean text (remove \n and similar)
  const cleanText = (text: string): string => {
    if (!text) return text;
    return text.replace(/\\n/g, " ").replace(/\\ n/g, " ").replace(/\n/g, " ");
  };

  // Helper function to detect Japanese text
  const hasJapaneseText = (text: string): boolean => {
    if (!text) return false;
    return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
  };

  // Check if any content has Japanese text
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

  // Filter characters based on search query
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

      <div className="min-h-screen bg-bg-primary pt-16">
        <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
          {/* Sidebar — Character Roster */}
          <div className="flex w-full shrink-0 flex-col border-b border-border lg:w-72 lg:border-b-0 lg:border-r">
            <div className="p-4 pb-2">
              <input
                type="text"
                placeholder="Search characters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm text-text-primary placeholder-text-secondary outline-none focus:border-accent transition-colors duration-200"
              />
            </div>

            <div className="overflow-x-auto lg:overflow-y-auto">
              <div className="flex gap-2 p-4 pt-2 lg:flex-col lg:gap-1">
                {isLoading ? (
                  <p className="text-sm text-text-secondary">Loading...</p>
                ) : filteredCharacters.length === 0 ? (
                  <p className="text-sm text-text-secondary">
                    No characters found.
                  </p>
                ) : (
                  filteredCharacters.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => handleSelect(char)}
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

          {/* Detail View */}
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
                  {/* Hero Banner */}
                  <div
                    className="relative flex h-64 items-end p-8"
                    style={{
                      background: `linear-gradient(135deg, ${selectedChar.color_main}40, ${selectedChar.color_sub}20)`,
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)`,
                      }}
                    />
                    <img
                      src={selectedChar.thumb_img}
                      alt={selectedChar.name_en}
                      className="absolute right-8 bottom-0 h-56 w-auto object-contain"
                    />
                    <div className="relative z-10">
                      <span
                        className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold text-white"
                        style={{ backgroundColor: selectedChar.color_main }}
                      >
                        {selectedChar.category_label_en}
                      </span>
                      <h1 className="text-4xl font-bold text-text-primary">
                        {selectedChar.name_en}
                      </h1>
                      <p className="text-sm text-text-secondary">
                        {selectedChar.name_jp}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {detailLoading ? (
                      <p className="text-text-secondary">Loading details...</p>
                    ) : characterDetail ? (
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Profile */}
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-sm font-bold tracking-widest text-accent uppercase">
                              Profile
                            </p>
                            {hasJapaneseContent && (
                              <button
                                onClick={() =>
                                  setShowTranslation(!showTranslation)
                                }
                                className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors"
                              >
                                {showTranslation
                                  ? "Show Original"
                                  : "Translate to English"}
                              </button>
                            )}
                          </div>

                          {/* Profile Quote */}
                          {characterDetail.profile && (
                            <p className="mb-4 text-sm leading-relaxed text-text-secondary italic">
                              {showTranslation &&
                              hasJapaneseText(characterDetail.profile) ? (
                                <TranslatedText
                                  text={characterDetail.profile}
                                />
                              ) : (
                                `"${cleanText(characterDetail.profile)}"`
                              )}
                            </p>
                          )}

                          <div className="flex flex-col gap-3">
                            {characterDetail.birth_month && (
                              <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                                <span className="text-sm text-text-secondary">
                                  Birthday
                                </span>
                                <span className="text-sm font-semibold text-text-primary">
                                  {characterDetail.birth_month}/
                                  {characterDetail.birth_day}
                                </span>
                              </div>
                            )}

                            {characterDetail.height && (
                              <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                                <span className="text-sm text-text-secondary">
                                  Height
                                </span>
                                <span className="text-sm font-semibold text-text-primary">
                                  {characterDetail.height}cm
                                </span>
                              </div>
                            )}

                            {characterDetail.weight && (
                              <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                                <span className="text-sm text-text-secondary">
                                  Weight
                                </span>
                                <span className="text-sm font-semibold text-text-primary">
                                  {showTranslation &&
                                  hasJapaneseText(characterDetail.weight) ? (
                                    <TranslatedText
                                      text={characterDetail.weight}
                                    />
                                  ) : (
                                    cleanText(characterDetail.weight)
                                  )}
                                </span>
                              </div>
                            )}

                            {characterDetail.grade && (
                              <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                                <span className="text-sm text-text-secondary">
                                  Grade
                                </span>
                                <span className="text-sm font-semibold text-text-primary">
                                  {showTranslation &&
                                  hasJapaneseText(characterDetail.grade) ? (
                                    <TranslatedText
                                      text={characterDetail.grade}
                                    />
                                  ) : (
                                    cleanText(characterDetail.grade)
                                  )}
                                </span>
                              </div>
                            )}

                            {characterDetail.residence && (
                              <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                                <span className="text-sm text-text-secondary">
                                  Residence
                                </span>
                                <span className="text-sm font-semibold text-text-primary">
                                  {showTranslation &&
                                  hasJapaneseText(characterDetail.residence) ? (
                                    <TranslatedText
                                      text={characterDetail.residence}
                                    />
                                  ) : (
                                    cleanText(characterDetail.residence)
                                  )}
                                </span>
                              </div>
                            )}

                            {characterDetail.strengths && (
                              <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                                <span className="text-sm text-text-secondary">
                                  Strengths
                                </span>
                                <span className="text-sm font-semibold text-text-primary">
                                  {showTranslation &&
                                  hasJapaneseText(characterDetail.strengths) ? (
                                    <TranslatedText
                                      text={characterDetail.strengths}
                                    />
                                  ) : (
                                    cleanText(characterDetail.strengths)
                                  )}
                                </span>
                              </div>
                            )}

                            {characterDetail.weaknesses && (
                              <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                                <span className="text-sm text-text-secondary">
                                  Weaknesses
                                </span>
                                <span className="text-sm font-semibold text-text-primary">
                                  {showTranslation &&
                                  hasJapaneseText(
                                    characterDetail.weaknesses,
                                  ) ? (
                                    <TranslatedText
                                      text={characterDetail.weaknesses}
                                    />
                                  ) : (
                                    cleanText(characterDetail.weaknesses)
                                  )}
                                </span>
                              </div>
                            )}

                            {characterDetail.size_b && (
                              <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                                <span className="text-sm text-text-secondary">
                                  Measurements
                                </span>
                                <span className="text-sm font-semibold text-text-primary">
                                  {characterDetail.size_b} /{" "}
                                  {characterDetail.size_w} /{" "}
                                  {characterDetail.size_h}
                                </span>
                              </div>
                            )}

                            {characterDetail.shoe_size && (
                              <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                                <span className="text-sm text-text-secondary">
                                  Shoe Size
                                </span>
                                <span className="text-sm font-semibold text-text-primary">
                                  {showTranslation &&
                                  hasJapaneseText(characterDetail.shoe_size) ? (
                                    <TranslatedText
                                      text={characterDetail.shoe_size}
                                    />
                                  ) : (
                                    cleanText(characterDetail.shoe_size)
                                  )}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Fun Facts */}
                          {(characterDetail.ears_fact ||
                            characterDetail.tail_fact ||
                            characterDetail.family_fact) && (
                            <div className="mt-6">
                              <p className="mb-4 text-sm font-bold tracking-widest text-accent uppercase">
                                Fun Facts
                              </p>
                              <div className="flex flex-col gap-3">
                                {characterDetail.ears_fact && (
                                  <div className="rounded-xl bg-bg-secondary px-4 py-3">
                                    <p className="mb-1 text-xs font-bold text-accent uppercase">
                                      Ears
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                      {showTranslation &&
                                      hasJapaneseText(
                                        characterDetail.ears_fact,
                                      ) ? (
                                        <TranslatedText
                                          text={characterDetail.ears_fact}
                                        />
                                      ) : (
                                        cleanText(characterDetail.ears_fact)
                                      )}
                                    </p>
                                  </div>
                                )}

                                {characterDetail.tail_fact && (
                                  <div className="rounded-xl bg-bg-secondary px-4 py-3">
                                    <p className="mb-1 text-xs font-bold text-accent uppercase">
                                      Tail
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                      {showTranslation &&
                                      hasJapaneseText(
                                        characterDetail.tail_fact,
                                      ) ? (
                                        <TranslatedText
                                          text={characterDetail.tail_fact}
                                        />
                                      ) : (
                                        cleanText(characterDetail.tail_fact)
                                      )}
                                    </p>
                                  </div>
                                )}

                                {characterDetail.family_fact && (
                                  <div className="rounded-xl bg-bg-secondary px-4 py-3">
                                    <p className="mb-1 text-xs font-bold text-accent uppercase">
                                      Family
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                      {showTranslation &&
                                      hasJapaneseText(
                                        characterDetail.family_fact,
                                      ) ? (
                                        <TranslatedText
                                          text={characterDetail.family_fact}
                                        />
                                      ) : (
                                        cleanText(characterDetail.family_fact)
                                      )}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Gallery */}
                        {characterImages && characterImages.length > 0 && (
                          <div>
                            <p className="mb-4 text-sm font-bold tracking-widest text-accent uppercase">
                              Gallery
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                              {characterImages.map((set, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                  <img
                                    src={set.images[0].image}
                                    alt={set.label_en}
                                    className="w-full rounded-xl object-cover"
                                  />
                                  <p className="text-center text-xs text-text-secondary">
                                    {set.label_en}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {characterDetail.voice && (
                              <div className="mt-6">
                                <p className="mb-4 text-sm font-bold tracking-widest text-accent uppercase">
                                  Voice Sample
                                </p>
                                <audio
                                  controls
                                  src={characterDetail.voice}
                                  className="w-full"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Characters;
