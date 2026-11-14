import { pad2, type JSTDate } from "./jst";

export interface FeaturedCandidate {
  id: number;
  category_label_en: string;
  thumb_img: string | null;
}

/** The JST Monday of the week containing `today`, as `YYYY-MM-DD`. */
export const weekKey = (today: JSTDate) => {
  const back = (today.weekday + 6) % 7; // Mon → 0 … Sun → 6
  const monday = new Date(Date.UTC(today.year, today.month - 1, today.day - back));
  return `${monday.getUTCFullYear()}-${pad2(monday.getUTCMonth() + 1)}-${pad2(monday.getUTCDate())}`;
};

/** 32-bit FNV-1a string hash. */
const hash = (s: string) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

/** mulberry32: small deterministic PRNG returning floats in [0, 1). */
const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/**
 * This week's featured field: `count` Umamusume with portraits, the same for
 * every visitor from Monday to Sunday (JST), reshuffled each week.
 */
export const featuredField = <T extends FeaturedCandidate>(
  chars: T[],
  today: JSTDate,
  count = 8,
): T[] => {
  const eligible = chars
    .filter((c) => c.category_label_en === "Umamusume" && !!c.thumb_img)
    .sort((a, b) => a.id - b.id);
  const random = mulberry32(hash(weekKey(today)));
  for (let i = eligible.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
  }
  return eligible.slice(0, count);
};
