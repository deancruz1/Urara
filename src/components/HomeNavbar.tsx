// components/HomeNavbar.tsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HomeNavbar = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const navLinks = [
    { label: "Characters", to: "/characters" },
    { label: "Music", to: "/music" },
    { label: "News", to: "/news" },
  ];

  if (isDesktop) {
    return (
      <div className="flex flex-col items-start justify-start bg-accent h-full pt-15 overflow-visible">
        <div className="flex flex-col items-start gap-16 pl-23 relative">
          <Link
            to="/"
            className="tracking-[0.2em] font-bold text-home-nav-primary text-9xl whitespace-nowrap relative -right-4 drop-shadow-md"
          >
            URARA
          </Link>
          <div className="flex flex-col gap-12 pl-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-4xl font-semibold transition-all duration-200 text-home-nav-primary hover:text-home-nav-primary/70 uppercase italic drop-shadow-lg"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 flex flex-col gap-1.5 p-2 rounded-lg bg-accent cursor-pointer"
      >
        <span
          className={`block h-0.5 w-6 bg-home-nav-primary transition-transform duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-home-nav-primary transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-home-nav-primary transition-transform duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-accent shadow-lg transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col pt-20 pl-6 gap-8">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="tracking-[0.2em] font-bold text-home-nav-primary text-3xl"
          >
            URARA
          </Link>
          <div className="w-full h-px bg-border" />
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold transition-all duration-200 text-home-nav-primary/70 hover:text-home-nav-primary uppercase italic"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default HomeNavbar;
