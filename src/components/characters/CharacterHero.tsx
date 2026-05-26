interface CharacterHeroProps {
  nameEn: string;
  nameJp: string;
  categoryLabelEn: string;
  colorMain: string;
  colorSub: string;
  thumbImg: string;
}

export const CharacterHero = ({
  nameEn,
  nameJp,
  categoryLabelEn,
  colorMain,
  colorSub,
  thumbImg,
}: CharacterHeroProps) => (
  <div
    className="relative flex h-64 items-end p-8"
    style={{
      background: `linear-gradient(135deg, ${colorMain}40, ${colorSub}20)`,
    }}
  >
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)`,
      }}
    />
    <img
      src={thumbImg}
      alt={nameEn}
      className="absolute right-8 bottom-0 h-56 w-auto object-contain"
    />
    <div className="relative z-10">
      <span
        className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold text-white"
        style={{ backgroundColor: colorMain }}
      >
        {categoryLabelEn}
      </span>
      <h1 className="text-4xl font-bold text-text-primary">{nameEn}</h1>
      <p className="text-sm text-text-secondary">{nameJp}</p>
    </div>
  </div>
);
