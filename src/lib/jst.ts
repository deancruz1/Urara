/** A calendar date in Japan Standard Time. `month` is 1–12, `weekday` is 0 (Sun) – 6 (Sat). */
export interface JSTDate {
  year: number;
  month: number;
  day: number;
  weekday: number;
}

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  weekday: "short",
});

/** Today's date in Japan, whatever the visitor's own time zone. */
export const todayJST = (now: Date = new Date()): JSTDate => {
  const parts = Object.fromEntries(
    formatter.formatToParts(now).map((p) => [p.type, p.value]),
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    weekday: WEEKDAYS.indexOf(parts.weekday.toUpperCase()),
  };
};

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** `2026.11.14 SAT` */
export const formatHeaderDate = (today: JSTDate = todayJST()): string =>
  `${today.year}.${pad2(today.month)}.${pad2(today.day)} ${WEEKDAYS[today.weekday]}`;

/** Unix seconds → JST date, for news timestamps. */
export const jstFromUnix = (seconds: number): JSTDate =>
  todayJST(new Date(seconds * 1000));
