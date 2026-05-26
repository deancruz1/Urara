// components/TranslatedText.tsx
import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "../hooks/use-translation";

interface TranslatedTextProps {
  text: string;
  className?: string;
  showOriginal?: boolean;
}

const cleanText = (text: string): string => {
  if (!text) return text;
  return text.replace(/\\n/g, " ").replace(/\\ n/g, " ").replace(/\n/g, " ");
};

export const TranslatedText = ({
  text,
  className = "",
  showOriginal = false,
}: TranslatedTextProps) => {
  const [translated, setTranslated] = useState<string | null>(null);
  const { translate, isLoading } = useTranslation();
  const hasTranslated = useRef(false);

  const loadTranslation = useCallback(async () => {
    if (!text || hasTranslated.current) return;

    hasTranslated.current = true;
    const result = await translate(text);
    setTranslated(result);
  }, [text, translate]);

  useEffect(() => {
    loadTranslation();
  }, [loadTranslation]);

  if (isLoading && !translated) {
    return <span className={`animate-pulse ${className}`}>Translating...</span>;
  }

  if (showOriginal && text) {
    return (
      <div className={className}>
        <div>{cleanText(translated || text)}</div>
        <div className="text-xs text-text-secondary mt-1">
          {cleanText(text)}
        </div>
      </div>
    );
  }

  return <span className={className}>{cleanText(translated || text)}</span>;
};
