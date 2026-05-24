import { useQuery } from "@tanstack/react-query";
import { getLatestNews, getNewsPost, searchNews } from "../api";
import type { NewsPost } from "../types";

export const useLatestNews = (count: number, offset = 0) => {
  return useQuery<NewsPost[]>({
    queryKey: ["news", count, offset],
    queryFn: () => getLatestNews(count, offset),
    staleTime: 1000 * 60 * 15, // 15 mins
  });
};

export const useNewsPost = (postId: number) => {
  return useQuery<NewsPost>({
    queryKey: ["news-post", postId],
    queryFn: () => getNewsPost(postId),
    enabled: !!postId,
    staleTime: 1000 * 60 * 60,
  });
};

export const useNewsSearch = (query: string) => {
  return useQuery<NewsPost[]>({
    queryKey: ["news-search", query],
    queryFn: () => searchNews(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });
};
