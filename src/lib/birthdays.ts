import type { JSTDate } from "./jst";

export interface HasBirthday {
  birth_month: number | null;
  birth_day: number | null;
}

type Dated<T> = T & { birth_month: number; birth_day: number };

export interface BirthdayGroup<T> {
  month: number;
  day: number;
  /** Days from today; 0 is today. */
  days: number;
  characters: T[];
}

const isLeap = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const utcDay = (year: number, month: number, day: number) =>
  Date.UTC(year, month - 1, day) / 86_400_000;

const withBirthday = <T extends HasBirthday>(chars: T[]): Dated<T>[] =>
  chars.filter(
    (c): c is Dated<T> => c.birth_month != null && c.birth_day != null,
  );

/** The date a birthday falls on in `year`. 29 Feb becomes 28 Feb in non-leap years. */
export const birthdayInYear = (month: number, day: number, year: number) =>
  month === 2 && day === 29 && !isLeap(year)
    ? { month: 2, day: 28 }
    : { month, day };

/** Days until the next occurrence of a birthday; 0 when it is today. */
export const daysUntil = (month: number, day: number, today: JSTDate) => {
  const now = utcDay(today.year, today.month, today.day);
  const thisYear = birthdayInYear(month, day, today.year);
  const next = utcDay(today.year, thisYear.month, thisYear.day);
  if (next >= now) return next - now;
  const nextYear = birthdayInYear(month, day, today.year + 1);
  return utcDay(today.year + 1, nextYear.month, nextYear.day) - now;
};

/** Characters whose birthday is today (JST). */
export const todaysBirthdays = <T extends HasBirthday>(chars: T[], today: JSTDate) =>
  withBirthday(chars).filter((c) => daysUntil(c.birth_month, c.birth_day, today) === 0);

/**
 * The next `count` distinct birthday dates after today, soonest first.
 * Characters sharing a date stay in API order within their group.
 */
export const upcomingGroups = <T extends HasBirthday>(
  chars: T[],
  today: JSTDate,
  count = 6,
): BirthdayGroup<T>[] => {
  const byDays = new Map<number, BirthdayGroup<T>>();
  for (const c of withBirthday(chars)) {
    const days = daysUntil(c.birth_month, c.birth_day, today);
    if (days === 0) continue;
    const group = byDays.get(days);
    if (group) {
      group.characters.push(c);
    } else {
      const date = new Date(Date.UTC(today.year, today.month - 1, today.day + days));
      byDays.set(days, {
        month: date.getUTCMonth() + 1,
        day: date.getUTCDate(),
        days,
        characters: [c],
      });
    }
  }
  return [...byDays.values()].sort((a, b) => a.days - b.days).slice(0, count);
};

/** How many characters have a birthday in each month, January first. */
export const countsByMonth = <T extends HasBirthday>(chars: T[]) => {
  const counts = Array<number>(12).fill(0);
  for (const c of withBirthday(chars)) counts[c.birth_month - 1]++;
  return counts;
};
