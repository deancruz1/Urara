// hooks/useTranslation.ts
import { useState } from "react";

export const useTranslation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translate = async (
    text: string,
    source = "ja",
    target = "en",
  ): Promise<string | null> => {
    if (!text || text.trim().length === 0) return text;

    setIsLoading(true);
    setError(null);

    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;
      const response = await fetch(url);
      const data = await response.json();

      // MyMemory returns the translation in responseData.translatedText
      let translated = data.responseData.translatedText;

      // Remove the " (from Google Translate)" suffix if present
      translated = translated.replace(/ \(from Google Translate\)$/, "");

      setIsLoading(false);
      return translated;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Translation failed");
      setIsLoading(false);
      return null;
    }
  };

  return { translate, isLoading, error };
};
