import { useState } from "react";
import { Dialog } from "../ui";
import type { CharacterImageSet } from "../../types";

interface Props {
  sets: CharacterImageSet[];
  name: string;
}

export const OutfitGallery = ({ sets, name }: Props) => {
  const [setIndex, setSetIndex] = useState(0);
  const [enlarged, setEnlarged] = useState(false);

  const usable = sets.filter((s) => s.images.length > 0);
  if (usable.length === 0) return null;
  const set = usable[Math.min(setIndex, usable.length - 1)];
  // The first image is the current art; the rest are archived older copies of it.
  const image = set.images[0];
  const alt = `${name}, ${set.label_en}`;

  return (
    <div className="min-w-0 flex-[1_1_320px]">
      <div role="tablist" aria-label="Outfit" className="flex flex-wrap gap-x-5 border-b border-rule">
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
              onClick={() => setSetIndex(i)}
              className={`-mb-px h-11 cursor-pointer border-0 border-b-[3px] bg-transparent px-0 font-cond text-base font-bold uppercase tracking-[0.04em] ${
                selected ? "border-ink text-ink" : "border-transparent text-ink-sub hover:text-ink"
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
          className="mt-3 flex h-[clamp(360px,70vw,620px)] w-full cursor-zoom-in items-end justify-center overflow-hidden border-0 bg-tint bg-[repeating-linear-gradient(90deg,transparent_0_59px,var(--color-grid)_59px_60px)] p-0"
        >
          <img
            key={image.image}
            src={image.image}
            alt={alt}
            width={800}
            height={1000}
            decoding="async"
            loading="lazy"
            className="h-full w-full animate-fade object-contain object-bottom"
          />
        </button>
      </div>

      <Dialog
        open={enlarged}
        onClose={() => setEnlarged(false)}
        label={`Enlarged image: ${alt}`}
        className="bg-gate-ink"
        closeClassName="bg-gate-ink text-white"
      >
        <img
          src={image.image}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={800}
          height={1000}
          className="block h-auto max-h-[calc(90vh-6px)] w-auto max-w-full object-contain"
        />
      </Dialog>
    </div>
  );
};
