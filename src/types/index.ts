// Character list item (from /api/v1/character/list)
export interface CharacterListItem {
  id: number;
  name_en: string;
  name_jp: string;
  name_en_internal: string;
  preferred_url: string;
  thumb_img: string;
  color_main: string;
  color_sub: string;
  category_label: string;
  category_label_en: string;
  category_value: string;
  row_number: number;
}

// Music filter options (from /api/v1/music/filters)
export interface MusicFilters {
  album: FilterItem[];
  character: FilterItem[];
  song: FilterItem[];
  voiceactor: FilterItem[];
  search: FilterItem[];
}

export interface FilterItem {
  display: string;
  id: string;
}

// News post (from /api/v1/news/latest)
export interface NewsPost {
  id: number;
  row_number: number;
  announce_id: number;
  announce_label: number;
  title: string;
  title_english: string;
  message: string;
  message_english: string;
  image: string;
  article_image: string | null;
  label_name_en: string;
  label_color: string;
  post_at: number;
  update_at: number | null;
  post_platform_flag: number;
}

// Music
interface MusicSinger {
  id: number;
  chara_name_en: string;
  chara_name_jp: string;
  chara_image: string;
  preferred_url: string;
  va_name_en: string;
  va_name_jp: string;
  vgmdb_id: number;
}

interface MusicAlbum {
  id: number;
  name_en: string;
  name_jp: string;
  slug: string;
  album_art: string;
  release_date: number;
  runtime: number;
  disc_no: number;
  disc_order: number;
  apple_music_id: string | null;
  cystore_product_id: string | null;
  vgmdb_id: number;
}

export interface Track {
  id: number;
  name_en: string;
  name_jp: string;
  slug: string;
  preview_url: string | null;
  _albums: MusicAlbum[];
  _singers: MusicSinger[];
}

export interface MusicFilterResponse {
  albums: MusicAlbum[];
  tracks: Track[];
}

export interface CharacterDetail {
  id: number;
  game_id: number | null;
  name_en: string;
  name_jp: string;
  name_en_internal: string;
  preferred_url: string;
  category_label: string;
  category_label_en: string;
  color_main: string;
  color_sub: string;
  thumb_img: string | null;
  sns_icon: string | null;
  sns_header: string | null;
  detail_img_pc: string | null;
  detail_img_sp: string | null;
  profile: string | null;
  slogan: string | null;
  strengths: string | null;
  weaknesses: string | null;
  ears_fact: string | null;
  tail_fact: string | null;
  family_fact: string | null;
  residence: string | null;
  grade: string | null;
  height: number | null;
  weight: string | null;
  size_b: number | null;
  size_w: number | null;
  size_h: number | null;
  shoe_size: string | null;
  birth_day: number | null;
  birth_month: number | null;
  voice: string | null;
  link: string | null;
  row_number: number;
}

export interface CharacterImageSet {
  label: string;
  label_en: string;
  images: {
    image: string;
    uploaded: string;
  }[];
}

// Every character with birthday, colours and portraits (from /api/v1/character/info)
export interface CharacterInfo {
  id: number;
  game_id: number | null;
  name_en: string;
  name_jp: string;
  preferred_url: string;
  category_label: string;
  category_label_en: string;
  color_main: string;
  color_sub: string;
  thumb_img: string | null;
  sns_icon: string | null;
  birth_month: number | null;
  birth_day: number | null;
  height: number | null;
  row_number: number;
}
