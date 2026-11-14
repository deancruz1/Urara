import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top when moving to another section. Changes inside a section
 * (picking a character or singer, query strings) keep their position.
 */
export const ScrollToTop = () => {
  const section = useLocation().pathname.split("/")[1];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [section]);
  return null;
};
