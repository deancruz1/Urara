import { describe, expect, it } from "vitest";
import {
  birthdayInYear,
  countsByMonth,
  daysUntil,
  todaysBirthdays,
  upcomingGroups,
} from "./birthdays";
import { todayJST, type JSTDate } from "./jst";

const day = (iso: string): JSTDate => todayJST(new Date(`${iso}T12:00:00+09:00`));

const c = (name: string, birth_month: number | null, birth_day: number | null) => ({
  name,
  birth_month,
  birth_day,
});

const chars = [
  c("Air Messiah", 2, 4),
  c("Symboli Kris S", 1, 21),
  c("Gran Alegria", 1, 24),
  c("Marche Lorraine", 2, 4),
  c("Leap Girl", 2, 29),
  c("Haru Urara", 2, 27),
  c("Aoi Kiryuin", null, null),
  c("Tosen Jordan", 2, 4),
  c("Fine Motion", 1, 27),
  c("Satono Diamond", 1, 30),
  c("Biko Pegasus", 2, 8),
];

describe("daysUntil", () => {
  it("counts 68 days from 14 Nov to 21 Jan", () => {
    expect(daysUntil(1, 21, day("2026-11-14"))).toBe(68);
  });

  it("counts 32 days from 20 Dec to 21 Jan across the year end", () => {
    expect(daysUntil(1, 21, day("2026-12-20"))).toBe(32);
  });

  it("is 0 on the day itself", () => {
    expect(daysUntil(2, 27, day("2027-02-27"))).toBe(0);
  });
});

describe("leap-day birthdays", () => {
  it("maps 29 Feb to 28 Feb in non-leap years only", () => {
    expect(birthdayInYear(2, 29, 2027)).toEqual({ month: 2, day: 28 });
    expect(birthdayInYear(2, 29, 2028)).toEqual({ month: 2, day: 29 });
  });

  it("shows a 29 Feb birthday as today on 28 Feb 2027", () => {
    const names = todaysBirthdays(chars, day("2027-02-28")).map((x) => x.name);
    expect(names).toEqual(["Leap Girl"]);
  });

  it("does not show it on 28 Feb in a leap year", () => {
    expect(todaysBirthdays(chars, day("2028-02-28"))).toEqual([]);
  });
});

describe("todaysBirthdays", () => {
  it("uses Japan time for a visitor in London", () => {
    // 23:30 on 26 Feb in London is 08:30 on 27 Feb in Japan.
    const today = todayJST(new Date("2027-02-26T23:30:00Z"));
    expect(todaysBirthdays(chars, today).map((x) => x.name)).toEqual(["Haru Urara"]);
  });
});

describe("upcomingGroups", () => {
  const groups = upcomingGroups(chars, day("2026-11-14"));

  it("starts with Symboli Kris S in 68 days", () => {
    expect(groups[0]).toMatchObject({ month: 1, day: 21, days: 68 });
    expect(groups[0].characters.map((x) => x.name)).toEqual(["Symboli Kris S"]);
  });

  it("returns six distinct dates in order", () => {
    expect(groups.map((g) => `${g.month}.${g.day}`)).toEqual([
      "1.21", "1.24", "1.27", "1.30", "2.4", "2.8",
    ]);
  });

  it("groups the shared 4 Feb date into one entry, in API order", () => {
    const feb4 = groups.find((g) => g.month === 2 && g.day === 4)!;
    expect(feb4.characters.map((x) => x.name)).toEqual([
      "Air Messiah", "Marche Lorraine", "Tosen Jordan",
    ]);
  });

  it("leaves out today's birthdays and characters without a birthday", () => {
    const names = upcomingGroups(chars, day("2027-02-27"), 50)
      .flatMap((g) => g.characters.map((x) => x.name));
    expect(names).not.toContain("Haru Urara");
    expect(names).not.toContain("Aoi Kiryuin");
    expect(names).toHaveLength(9);
  });
});

describe("countsByMonth", () => {
  it("adds up to the number of characters with a birthday", () => {
    const counts = countsByMonth(chars);
    expect(counts).toHaveLength(12);
    expect(counts.reduce((a, b) => a + b, 0)).toBe(10);
    expect(counts[0]).toBe(4);
    expect(counts[1]).toBe(6);
  });
});
