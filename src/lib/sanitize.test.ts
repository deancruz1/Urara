import { describe, expect, it } from "vitest";
import { sanitize } from "./sanitize";

describe("sanitize", () => {
  it("removes scripts and keeps the rest of the body", () => {
    const out = sanitize("<p>Hello</p><script>alert(1)</script><p>World</p>");
    expect(out).not.toContain("<script");
    expect(out).not.toContain("alert");
    expect(out).toContain("<p>Hello</p>");
    expect(out).toContain("<p>World</p>");
  });

  it("removes inline event handlers", () => {
    const out = sanitize('<img src="https://example.test/a.png" onerror="alert(1)">');
    expect(out).not.toContain("onerror");
    expect(out).toContain('src="https://example.test/a.png"');
    expect(sanitize("<img src=x onerror=alert(1)>")).not.toContain("onerror");
  });

  it("removes iframes", () => {
    expect(sanitize('<iframe src="https://evil.example"></iframe><p>ok</p>')).toBe("<p>ok</p>");
  });

  it("removes javascript: links but keeps their text", () => {
    const out = sanitize('<a href="javascript:alert(1)">click</a>');
    expect(out).not.toContain("javascript");
    expect(out).toContain("click");
  });

  it("keeps paragraphs, line breaks, bold and lists", () => {
    const html = "<p>A<br><strong>B</strong> <b>C</b></p><ul><li>one</li></ul><ol><li>two</li></ol>";
    expect(sanitize(html)).toBe(html);
  });

  it("keeps http, https and mailto links and opens them in a new tab", () => {
    for (const href of ["https://umamusume.jp/", "http://example.test/", "mailto:info@example.test"]) {
      const doc = new DOMParser().parseFromString(sanitize(`<a href="${href}">x</a>`), "text/html");
      const a = doc.querySelector("a")!;
      expect(a.getAttribute("href")).toBe(href);
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
    }
  });

  it("drops style and class attributes", () => {
    expect(sanitize('<span style="color:red" class="x">t</span>')).toBe("<span>t</span>");
  });
});
