import { jstFromUnix, pad2 } from "./jst";

/** `01.21` */
export const mmdd = (month: number | null, day: number | null) =>
  month && day ? `${pad2(month)}.${pad2(day)}` : "—";

/** News timestamp as JST `MM.DD`. */
export const newsMMDD = (seconds: number) => {
  const d = jstFromUnix(seconds);
  return mmdd(d.month, d.day);
};

/** News timestamp as JST `YYYY.MM.DD`. */
export const newsDate = (seconds: number) => {
  const d = jstFromUnix(seconds);
  return `${d.year}.${pad2(d.month)}.${pad2(d.day)}`;
};

type Dated = { post_at: number; update_at: number | null };

/** True when a post was edited after it went up. */
export const isUpdated = (post: Dated) => !!post.update_at && post.update_at > post.post_at;

/** When a post last changed. The API orders news by this, so lists show it. */
export const lastActivity = (post: Dated) => (isUpdated(post) ? post.update_at! : post.post_at);

/** News timestamp as JST `YYYY.MM.DD HH:MM JST`. */
export const newsDateTime = (seconds: number) => {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(seconds * 1000));
  return `${newsDate(seconds)} ${time} JST`;
};
