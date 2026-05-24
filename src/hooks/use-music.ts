import { useQuery } from "@tanstack/react-query";
import { getMusicFilters, filterMusic, getAlbum } from "../api";
import type { MusicFilters } from "../types";

export const useMusicFilters = () => {
  return useQuery<MusicFilters>({
    queryKey: ["music-filters"],
    queryFn: getMusicFilters,
    staleTime: 1000 * 60 * 60,
  });
};

export const useMusicFilter = (params: Record<string, string>) => {
  return useQuery({
    queryKey: ["music-filter", params],
    queryFn: () => filterMusic(params),
    enabled: Object.keys(params).length > 0,
    staleTime: 1000 * 60 * 60,
  });
};

export const useAlbum = (albumId: string) => {
  return useQuery({
    queryKey: ["album", albumId],
    queryFn: () => getAlbum(albumId),
    enabled: !!albumId,
    staleTime: 1000 * 60 * 60,
  });
};
