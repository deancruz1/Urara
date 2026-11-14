import { useQuery } from "@tanstack/react-query";
import {
  getCharacterList,
  getCharacter,
  getCharacterImages,
  getCharacterInfo,
} from "../api";
import type { CharacterInfo, CharacterListItem } from "../types";

export const useCharacterList = () => {
  return useQuery<CharacterListItem[]>({
    queryKey: ["characters"],
    queryFn: getCharacterList,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useCharacter = (charaId: number) => {
  return useQuery({
    queryKey: ["character", charaId],
    queryFn: () => getCharacter(charaId),
    enabled: !!charaId,
    staleTime: 1000 * 60 * 60,
  });
};

export const useCharacterImages = (charaId: number) => {
  return useQuery({
    queryKey: ["character-images", charaId],
    queryFn: () => getCharacterImages(charaId),
    enabled: !!charaId,
    staleTime: 1000 * 60 * 60,
  });
};

export const useCharacterInfo = () => {
  return useQuery<CharacterInfo[]>({
    queryKey: ["characterInfo"],
    queryFn: getCharacterInfo,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
