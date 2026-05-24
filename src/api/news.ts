const BASE_URL = "https://umapyoi.net/api/v1";

export const getLatestNews = async (count: number, offset = 0) => {
  const res = await fetch(`${BASE_URL}/news/latest/${count}/${offset}`);
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
};

export const getNewsPost = async (postId: number) => {
  const res = await fetch(`${BASE_URL}/news/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch news post");
  return res.json();
};

export const searchNews = async (query: string) => {
  const res = await fetch(
    `${BASE_URL}/news/search/${encodeURIComponent(query)}`,
  );
  if (!res.ok) throw new Error("Failed to search news");
  return res.json();
};
