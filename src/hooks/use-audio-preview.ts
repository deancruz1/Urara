import { useCallback, useEffect, useRef, useState } from "react";

export type AudioId = string | number;

/**
 * One audio element per page, so starting any sound stops the one before it.
 * Pausing resets the preview; it also resets when the preview ends.
 */
export const useAudioPreview = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef<AudioId | null>(null);
  const [playingId, setPlayingId] = useState<AudioId | null>(null);
  const [progress, setProgress] = useState(0);

  const reset = useCallback(() => {
    playingRef.current = null;
    setPlayingId(null);
    setProgress(0);
  }, []);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "none";
      audio.addEventListener("timeupdate", () => {
        if (audio.duration > 0) setProgress(audio.currentTime / audio.duration);
      });
      audio.addEventListener("ended", reset);
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [reset]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    }
    reset();
  }, [reset]);

  const toggle = useCallback(
    (id: AudioId, url: string) => {
      if (playingRef.current === id) {
        stop();
        return;
      }
      const audio = getAudio();
      audio.pause();
      audio.src = url;
      playingRef.current = id;
      setPlayingId(id);
      setProgress(0);
      audio.play().catch((err: unknown) => {
        // A newer toggle replaced this source before it started; ignore.
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (playingRef.current === id) stop();
      });
    },
    [getAudio, stop],
  );

  useEffect(() => () => {
    audioRef.current?.pause();
  }, []);

  return { playingId, progress, toggle, stop };
};
