import { TranslatedText } from "../TranslatedText";
import type { CharacterDetail } from "../../types";

interface FunFactProps {
  title: string;
  text: string;
  showTranslation: boolean;
  hasJapaneseText: (text: string) => boolean;
  cleanText: (text: string) => string;
  accentColor: string;
}

const FunFact = ({
  title,
  text,
  showTranslation,
  hasJapaneseText,
  cleanText,
  accentColor,
}: FunFactProps) => (
  <div className="rounded-xl bg-bg-secondary px-4 py-3">
    <p
      className="mb-1 text-xs font-bold uppercase"
      style={{ color: accentColor }}
    >
      {title}
    </p>
    <p className="text-sm text-text-secondary">
      {showTranslation && hasJapaneseText(text) ? (
        <TranslatedText text={text} />
      ) : (
        cleanText(text)
      )}
    </p>
  </div>
);

interface CharacterFunFactsProps {
  characterDetail: CharacterDetail;
  showTranslation: boolean;
  hasJapaneseText: (text: string) => boolean;
  cleanText: (text: string) => string;
  accentColor: string;
}

export const CharacterFunFacts = ({
  characterDetail,
  showTranslation,
  hasJapaneseText,
  cleanText,
  accentColor,
}: CharacterFunFactsProps) => {
  const hasAnyFact =
    characterDetail.ears_fact ||
    characterDetail.tail_fact ||
    characterDetail.family_fact;

  if (!hasAnyFact) return null;

  return (
    <div className="mt-6">
      <p
        className="mb-4 text-sm font-bold tracking-widest uppercase"
        style={{ color: accentColor }}
      >
        Fun Facts
      </p>
      <div className="flex flex-col gap-3">
        {characterDetail.ears_fact && (
          <FunFact
            title="Ears"
            text={characterDetail.ears_fact}
            showTranslation={showTranslation}
            hasJapaneseText={hasJapaneseText}
            cleanText={cleanText}
            accentColor={accentColor}
          />
        )}
        {characterDetail.tail_fact && (
          <FunFact
            title="Tail"
            text={characterDetail.tail_fact}
            showTranslation={showTranslation}
            hasJapaneseText={hasJapaneseText}
            cleanText={cleanText}
            accentColor={accentColor}
          />
        )}
        {characterDetail.family_fact && (
          <FunFact
            title="Family"
            text={characterDetail.family_fact}
            showTranslation={showTranslation}
            hasJapaneseText={hasJapaneseText}
            cleanText={cleanText}
            accentColor={accentColor}
          />
        )}
      </div>
    </div>
  );
};
