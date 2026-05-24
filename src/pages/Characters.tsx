import { useState } from "react";
import { useCharacterList, useCharacter, useCharacterImages } from "../hooks";
import { motion, AnimatePresence } from "framer-motion";
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

  const { data: characterDetailRaw, isLoading: detailLoading } = useCharacter(
    selectedId ?? 0,
  );
  const { data: characterImagesRaw } = useCharacterImages(selectedId ?? 0);

  const characterDetail = characterDetailRaw as CharacterDetail | undefined;
  const characterImages = characterImagesRaw as CharacterImageSet[] | undefined;

  const handleSelect = (char: CharacterListItem) => {
    setSelectedId(char.id);
    setSelectedChar(char);
  };

  if (characters && !selectedChar) {
    handleSelect(characters[0]);
  }

  return (
    <div className="min-h-screen bg-bg-primary pt-16">
      <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
        {/* Sidebar — Character Roster */}
        <div className="w-full shrink-0 overflow-x-auto border-b border-border lg:w-72 lg:overflow-x-hidden lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <div className="flex gap-2 p-4 lg:flex-col lg:gap-1 lg:p-4">
            {isLoading ? (
              <p className="text-sm text-text-secondary">Loading...</p>
            ) : (
              characters?.map((char) => (
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
                        <p className="mb-4 text-sm font-bold tracking-widest text-accent uppercase">
                          Profile
                        </p>
                        {characterDetail.profile && (
                          <p className="mb-4 text-sm leading-relaxed text-text-secondary italic">
                            "{characterDetail.profile}"
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
                                {characterDetail.weight}
                              </span>
                            </div>
                          )}
                          {characterDetail.grade && (
                            <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                              <span className="text-sm text-text-secondary">
                                Grade
                              </span>
                              <span className="text-sm font-semibold text-text-primary">
                                {characterDetail.grade}
                              </span>
                            </div>
                          )}
                          {characterDetail.residence && (
                            <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                              <span className="text-sm text-text-secondary">
                                Residence
                              </span>
                              <span className="text-sm font-semibold text-text-primary">
                                {characterDetail.residence}
                              </span>
                            </div>
                          )}
                          {characterDetail.strengths && (
                            <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                              <span className="text-sm text-text-secondary">
                                Strengths
                              </span>
                              <span className="text-sm font-semibold text-text-primary">
                                {characterDetail.strengths}
                              </span>
                            </div>
                          )}
                          {characterDetail.weaknesses && (
                            <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
                              <span className="text-sm text-text-secondary">
                                Weaknesses
                              </span>
                              <span className="text-sm font-semibold text-text-primary">
                                {characterDetail.weaknesses}
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
                                {characterDetail.shoe_size}
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
                                    {characterDetail.ears_fact}
                                  </p>
                                </div>
                              )}
                              {characterDetail.tail_fact && (
                                <div className="rounded-xl bg-bg-secondary px-4 py-3">
                                  <p className="mb-1 text-xs font-bold text-accent uppercase">
                                    Tail
                                  </p>
                                  <p className="text-sm text-text-secondary">
                                    {characterDetail.tail_fact}
                                  </p>
                                </div>
                              )}
                              {characterDetail.family_fact && (
                                <div className="rounded-xl bg-bg-secondary px-4 py-3">
                                  <p className="mb-1 text-xs font-bold text-accent uppercase">
                                    Family
                                  </p>
                                  <p className="text-sm text-text-secondary">
                                    {characterDetail.family_fact}
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

                          {/* Voice Sample */}
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
  );
};

export default Characters;
