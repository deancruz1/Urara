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
