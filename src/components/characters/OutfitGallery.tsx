import { useState } from "react";
import { Dialog } from "../ui";
import type { CharacterImageSet } from "../../types";

interface Props {
  sets: CharacterImageSet[];
  name: string;
}

export const OutfitGallery = ({ sets, name }: Props) => {
  const [setIndex, setSetIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [enlarged, setEnlarged] = useState(false);

  const usable = sets.filter((s) => s.images.length > 0);
  if (usable.length === 0) return null;
  const set = usable[Math.min(setIndex, usable.length - 1)];
  const image = set.images[Math.min(imageIndex, set.images.length - 1)];
  const alt = `${name}, ${set.label_en}${set.images.length > 1 ? ` (${imageIndex + 1} of ${set.images.length})` : ""}`;

  return (
    <div className="min-w-0 flex-[1_1_320px]">
      <div role="tablist" aria-label="Outfit" className="flex flex-wrap border-[3px] border-b-0 border-ink">
        {usable.map((s, i) => {
          const selected = s === set;
          return (
            <button
              key={s.label_en}
              type="button"
              role="tab"
              id={`outfit-tab-${i}`}
              aria-selected={selected}
              aria-controls="outfit-panel"
              onClick={() => {
                setSetIndex(i);
                setImageIndex(0);
              }}
              className={`h-11 flex-[1_1_auto] cursor-pointer border-0 border-r-2 border-ink px-3 font-cond text-base font-bold uppercase tracking-[0.04em] -outline-offset-4 last:border-r-0 ${
                selected ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-tint"
              }`}
            >
              {s.label_en}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id="outfit-panel"
        aria-labelledby={`outfit-tab-${usable.indexOf(set)}`}
      >
        <button
          type="button"
          onClick={() => setEnlarged(true)}
          aria-label={`Enlarge image: ${alt}`}
          className="flex h-[clamp(360px,70vw,620px)] w-full cursor-zoom-in items-end justify-center overflow-hidden border-[3px] border-ink bg-tint bg-[repeating-linear-gradient(90deg,transparent_0_59px,#DDE4DE_59px_60px)] p-0"
        >
          <img
            key={image.image}
            src={image.image}
            alt={alt}
            width={800}
            height={1000}
            decoding="async"
            loading="lazy"
            className="h-full w-full object-contain object-bottom"
          />
        </button>
        {set.images.length > 1 && (
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {set.images.map((img, i) => (
              <button
                key={img.image}
                type="button"
                aria-label={`${set.label_en} image ${i + 1} of ${set.images.length}`}
                aria-pressed={i === imageIndex}
                onClick={() => setImageIndex(i)}
                className={`h-24 cursor-pointer overflow-hidden bg-tint p-0 ${
                  i === imageIndex ? "border-[3px] border-ink" : "border-2 border-rule hover:border-ink"
                }`}
              >
                <img
                  src={img.image}
                  alt=""
                  width={160}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[50%_24%]"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={enlarged}
        onClose={() => setEnlarged(false)}
        label={`Enlarged image: ${alt}`}
        className="bg-ink"
        closeClassName="bg-ink text-paper"
      >
        <img
          src={image.image}
          alt={alt}
          width={800}
          height={1000}
          className="block h-auto max-h-[90vh] w-auto max-w-full object-contain"
        />
      </Dialog>
    </div>
  );
};
