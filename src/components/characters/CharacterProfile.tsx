import { TranslatedText } from "../TranslatedText";
import type { CharacterDetail } from "../../types";

interface CharacterProfileProps {
  characterDetail: CharacterDetail;
  showTranslation: boolean;
  hasJapaneseText: (text: string) => boolean;
  cleanText: (text: string) => string;
  onToggleTranslation: () => void;
  hasJapaneseContent: boolean;
  accentColor: string;
}

const ProfileRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between rounded-xl bg-bg-secondary px-4 py-3">
    <span className="text-sm text-text-secondary">{label}</span>
    <span className="text-sm font-semibold text-text-primary">{value}</span>
  </div>
);

export const CharacterProfile = ({
  characterDetail,
  showTranslation,
  hasJapaneseText,
  cleanText,
  onToggleTranslation,
  hasJapaneseContent,
  accentColor,
}: CharacterProfileProps) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <p
        className="text-sm font-bold tracking-widest uppercase"
        style={{ color: accentColor }}
      >
        Profile
      </p>
      {hasJapaneseContent && (
        <button
          onClick={onToggleTranslation}
          className="rounded-full px-3 py-1 text-xs font-semibold transition-colors"
          style={{
            backgroundColor: `${accentColor}10`,
            color: accentColor,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${accentColor}20`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = `${accentColor}10`;
          }}
        >
          {showTranslation
            ? "Show Original (Japanese)"
            : "Translate to English (Machine Translated)"}
        </button>
      )}
    </div>

    {characterDetail.profile && (
      <p className="mb-4 text-sm leading-relaxed text-text-secondary italic">
        {showTranslation && hasJapaneseText(characterDetail.profile) ? (
          <TranslatedText text={characterDetail.profile} />
        ) : (
          `"${cleanText(characterDetail.profile)}"`
        )}
      </p>
    )}

    <div className="flex flex-col gap-3">
      {characterDetail.birth_month && (
        <ProfileRow
          label="Birthday"
          value={`${characterDetail.birth_month}/${characterDetail.birth_day}`}
        />
      )}
      {characterDetail.height && (
        <ProfileRow label="Height" value={`${characterDetail.height}cm`} />
      )}
      {characterDetail.weight && (
        <ProfileRow
          label="Weight"
          value={
            showTranslation && hasJapaneseText(characterDetail.weight) ? (
              <TranslatedText text={characterDetail.weight} />
            ) : (
              cleanText(characterDetail.weight)
            )
          }
        />
      )}
      {characterDetail.grade && (
        <ProfileRow
          label="Grade"
          value={
            showTranslation && hasJapaneseText(characterDetail.grade) ? (
              <TranslatedText text={characterDetail.grade} />
            ) : (
              cleanText(characterDetail.grade)
            )
          }
        />
      )}
      {characterDetail.residence && (
        <ProfileRow
          label="Residence"
          value={
            showTranslation && hasJapaneseText(characterDetail.residence) ? (
              <TranslatedText text={characterDetail.residence} />
            ) : (
              cleanText(characterDetail.residence)
            )
          }
        />
      )}
      {characterDetail.strengths && (
        <ProfileRow
          label="Strengths"
          value={
            showTranslation && hasJapaneseText(characterDetail.strengths) ? (
              <TranslatedText text={characterDetail.strengths} />
            ) : (
              cleanText(characterDetail.strengths)
            )
          }
        />
      )}
      {characterDetail.weaknesses && (
        <ProfileRow
          label="Weaknesses"
          value={
            showTranslation && hasJapaneseText(characterDetail.weaknesses) ? (
              <TranslatedText text={characterDetail.weaknesses} />
            ) : (
              cleanText(characterDetail.weaknesses)
            )
          }
        />
      )}
      {characterDetail.size_b && (
        <ProfileRow
          label="Measurements"
          value={`${characterDetail.size_b} / ${characterDetail.size_w} / ${characterDetail.size_h}`}
        />
      )}
      {characterDetail.shoe_size && (
        <ProfileRow
          label="Shoe Size"
          value={
            showTranslation && hasJapaneseText(characterDetail.shoe_size) ? (
              <TranslatedText text={characterDetail.shoe_size} />
            ) : (
              cleanText(characterDetail.shoe_size)
            )
          }
        />
      )}
    </div>
  </div>
);
