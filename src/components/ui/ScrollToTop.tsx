import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to the top when the path changes. Query-string-only changes keep their position. */
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
