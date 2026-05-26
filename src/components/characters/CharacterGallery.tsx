import type { CharacterImageSet } from "../../types";

interface CharacterGalleryProps {
  images: CharacterImageSet[];
  galleryIndex: number;
  onIndexChange: (index: number) => void;
  onImageClick: (imageUrl: string) => void;
  accentColor: string;
}

export const CharacterGallery = ({
  images,
  galleryIndex,
  onIndexChange,
  onImageClick,
  accentColor,
}: CharacterGalleryProps) => {
  if (!images || images.length === 0) return null;

  const currentImage = images[galleryIndex]?.images[0]?.image;
  const currentLabel = images[galleryIndex]?.label_en;

  return (
    <div className="w-full">
      <p
        className="mb-4 text-sm font-bold tracking-widest uppercase"
        style={{ color: accentColor }}
      >
        Gallery
      </p>

      {/* Label Buttons - Horizontal scroll on mobile */}
      <div className="overflow-x-auto mb-4 lg:overflow-x-visible">
        <div className="flex gap-2 min-w-max lg:flex-wrap lg:justify-center">
          {images.map((set, i) => (
            <button
              key={i}
              onClick={() => onIndexChange(i)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap"
              style={{
                backgroundColor: galleryIndex === i ? accentColor : undefined,
                color: galleryIndex === i ? "white" : undefined,
              }}
            >
              {set.label_en}
            </button>
          ))}
        </div>
      </div>

      {/* Main Image */}
      <div className="relative w-full h-120 overflow-hidden rounded-xl bg-bg-secondary flex items-center justify-center">
        <img
          src={currentImage}
          alt={currentLabel}
          className="w-full h-full object-contain cursor-pointer"
          style={{ transform: "translateY(-10%)" }}
          onClick={() => onImageClick(currentImage)}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() =>
            onIndexChange(
              galleryIndex === 0 ? images.length - 1 : galleryIndex - 1,
            )
          }
          className="rounded-full bg-bg-secondary p-2 text-text-primary transition-colors cursor-pointer hover:opacity-70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="text-sm text-text-secondary">
          {galleryIndex + 1} / {images.length}
        </span>
        <button
          onClick={() =>
            onIndexChange(
              galleryIndex === images.length - 1 ? 0 : galleryIndex + 1,
            )
          }
          className="rounded-full bg-bg-secondary p-2 text-text-primary transition-colors cursor-pointer hover:opacity-70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
