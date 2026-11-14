import { describe, expect, it } from "vitest";
import { formatHeaderDate, todayJST } from "./jst";

describe("todayJST", () => {
  it("formats 2026-11-14 10:00 JST as 2026.11.14 SAT", () => {
    const now = new Date("2026-11-14T10:00:00+09:00");
    expect(formatHeaderDate(todayJST(now))).toBe("2026.11.14 SAT");
  });

  it("treats 23:30 on 26 Feb in London as 27 Feb in Japan", () => {
    // London is on GMT (UTC+0) in February.
    const now = new Date("2026-02-26T23:30:00Z");
    expect(todayJST(now)).toMatchObject({ year: 2026, month: 2, day: 27 });
  });

  it("returns the weekday as 0–6", () => {
    expect(todayJST(new Date("2026-11-15T12:00:00+09:00")).weekday).toBe(0);
  });
});
