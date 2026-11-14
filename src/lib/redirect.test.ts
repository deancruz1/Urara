import { describe, expect, it } from "vitest";
import { resolveRedirect } from "./redirect";

const forwarded = (url: string) => `?p=${encodeURIComponent(url)}`;

describe("resolveRedirect", () => {
  it("keeps the query string and fragment", () => {
    expect(resolveRedirect(forwarded("/Urara/characters?id=5404"))).toBe(
      "/Urara/characters?id=5404",
    );
    expect(resolveRedirect(forwarded("/Urara/news?post=3549#top"))).toBe(
      "/Urara/news?post=3549#top",
    );
  });

  it("rejects a redirect to another site", () => {
    expect(resolveRedirect(forwarded("//evil.example"))).toBe("/Urara/");
    expect(resolveRedirect(forwarded("https://evil.example/Urara/"))).toBe(
      "/Urara/",
    );
    expect(resolveRedirect(forwarded("/elsewhere"))).toBe("/Urara/");
  });

  it("ignores a missing parameter", () => {
    expect(resolveRedirect("")).toBeNull();
    expect(resolveRedirect("?id=5404")).toBeNull();
  });
});
