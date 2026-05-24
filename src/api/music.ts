const BASE_URL = "https://umapyoi.net/api/v1";

export const getMusicFilters = async () => {
  const res = await fetch(`${BASE_URL}/music/filters`);
  if (!res.ok) throw new Error("Failed to fetch music filters");
  return res.json();
};

export const filterMusic = async (params: Record<string, string>) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/music/filter?${query}`);
  if (!res.ok) throw new Error("Failed to filter music");
  return res.json();
};

export const getAlbum = async (albumId: string) => {
  const res = await fetch(`${BASE_URL}/music/album/${albumId}`);
  if (!res.ok) throw new Error("Failed to fetch album");
  return res.json();
};
