/** Ink or paper text, whichever reads better on a `#rrggbb` background. */
export const textOn = (hex: string): "#111511" | "#FFFFFF" => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex ?? "");
  if (!m) return "#111511";
  const n = parseInt(m[1], 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  // Contrast against ink (#111511, lum ≈ 0.008) vs white.
  return (lum + 0.05) / 0.058 >= 1.05 / (lum + 0.05) ? "#111511" : "#FFFFFF";
};

/** True when a string contains Japanese script, for marking it `lang="ja"`. */
export const isJapanese = (text: string | null | undefined) =>
  !!text && /[぀-ヿ㐀-鿿ｦ-ﾟ]/.test(text);
