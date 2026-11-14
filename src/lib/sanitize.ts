import DOMPurify from "dompurify";

const purify = DOMPurify(window);

purify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A" && node.hasAttribute("href")) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  }
});

/**
 * Cleans news post HTML from the API before it is rendered: basic formatting
 * and links survive; scripts, event handlers, iframes and non-http(s)/mailto
 * URLs are removed. Links open in a new tab.
 */
export const sanitize = (html: string): string =>
  purify.sanitize(html, {
    ALLOWED_TAGS: ["p", "br", "b", "strong", "i", "em", "u", "ul", "ol", "li", "a", "span", "div", "img"],
    ALLOWED_ATTR: ["href", "src", "alt"],
    ALLOWED_URI_REGEXP: /^(?:https?|mailto):/i,
  });
