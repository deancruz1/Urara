import DOMPurify from "dompurify";

// No window when pages are pre-rendered at build time; post bodies only
// render in the browser, so the server never needs to sanitise.
const purify = typeof window === "undefined" ? null : DOMPurify(window);

purify?.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A" && node.hasAttribute("href")) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  }
});

/**
 * Cleans news post HTML from the API before it is rendered: basic formatting,
 * headings, tables and links survive; scripts, event handlers, iframes and non-http(s)/mailto
 * URLs are removed. Links open in a new tab.
 */
export const sanitize = (html: string): string =>
  purify
    ? purify.sanitize(html, {
        ALLOWED_TAGS: [
          "p", "br", "b", "strong", "i", "em", "u", "ul", "ol", "li", "a", "span", "div", "img",
          // Structure that real posts use; none of these can run code.
          "h2", "h3", "table", "thead", "tbody", "tr", "th", "td", "figure", "figcaption",
        ],
        ALLOWED_ATTR: ["href", "src", "alt"],
        ALLOWED_URI_REGEXP: /^(?:https?|mailto):/i,
      })
    : "";
