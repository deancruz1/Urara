import { isJapanese } from "./color";

/** Turns the literal "\n" sequences some API fields contain into spaces. */
export const cleanText = (text: string) =>
  text.replace(/\\ ?n/g, " ").replace(/\n/g, " ").trim();

/** Non-empty text from the API, or null. */
export const present = (text: string | null | undefined) =>
  text && cleanText(text) ? cleanText(text) : null;

/** `lang` attribute for a piece of API text: "ja" when it is Japanese. */
export const langOf = (text: string | null | undefined) =>
  isJapanese(text) ? "ja" : undefined;
