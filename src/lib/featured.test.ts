import { describe, expect, it } from "vitest";
import { featuredField, weekKey } from "./featured";
import { todayJST } from "./jst";

const day = (iso: string) => todayJST(new Date(`${iso}T12:00:00+09:00`));

const chars = Array.from({ length: 60 }, (_, i) => ({
  id: 1000 + i * 7,
  category_label_en: i % 5 === 0 ? "Related parties" : "Umamusume",
  thumb_img: i % 11 === 3 ? null : `https://example.test/${i}.png`,
}));

describe("weekKey", () => {
  it("is the JST Monday of the week", () => {
    expect(weekKey(day("2026-11-14"))).toBe("2026-11-09"); // Saturday
    expect(weekKey(day("2026-11-15"))).toBe("2026-11-09"); // Sunday
    expect(weekKey(day("2026-11-16"))).toBe("2026-11-16"); // Monday
    expect(weekKey(day("2027-01-01"))).toBe("2026-12-28"); // across the year
  });
});

describe("featuredField", () => {
  const ids = (iso: string) => featuredField(chars, day(iso)).map((c) => c.id);

  it("gives the same 8 in the same order on Tuesday and Saturday of one week", () => {
    expect(ids("2026-11-10")).toHaveLength(8);
    expect(ids("2026-11-14")).toEqual(ids("2026-11-10"));
  });

  it("does not depend on the API's order", () => {
    const reversed = featuredField([...chars].reverse(), day("2026-11-10")).map((c) => c.id);
    expect(reversed).toEqual(ids("2026-11-10"));
  });

  it("gives a different set the next Monday", () => {
    expect(new Set(ids("2026-11-16"))).not.toEqual(new Set(ids("2026-11-10")));
  });

  it("only features Umamusume with a portrait", () => {
    for (const iso of ["2026-11-10", "2026-11-16", "2026-11-23", "2026-11-30"]) {
      for (const c of featuredField(chars, day(iso))) {
        expect(c.category_label_en).toBe("Umamusume");
        expect(c.thumb_img).toBeTruthy();
      }
    }
  });
});
