import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Music from "./pages/Music";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Helmet
        defaultTitle="Urara - Umamusume Pretty Derby Fan Guide"
        titleTemplate="%s | Urara"
      >
        {/* Primary Meta Tags */}
        <meta
          name="description"
          content="A comprehensive fan guide for Umamusume Pretty Derby. Browse detailed horse girl profiles, listen to music tracks, catch up on news, and celebrate character birthdays."
        />
        <link rel="canonical" href="https://deancruz1.github.io/Urara" />

        {/* Favicon & App Icons - Using your existing SVG and a fallback */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Open Graph / Facebook - Use a PNG here, not SVG */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://deancruz1.github.io/Urara" />
        <meta
          property="og:title"
          content="Urara - Umamusume Pretty Derby Fan Guide"
        />
        <meta
          property="og:description"
          content="A comprehensive fan guide for Umamusume Pretty Derby. Browse detailed horse girl profiles, listen to music tracks, catch up on news, and celebrate character birthdays."
        />
        <meta
          property="og:image"
          content="https://deancruz1.github.io/Urara/og-image.webp"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Urara Umamusume Fan Guide" />
        <meta property="og:site_name" content="Urara Guide" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://deancruz1.github.io/Urara" />
        <meta
          name="twitter:title"
          content="Urara - Umamusume Pretty Derby Fan Guide"
        />
        <meta
          name="twitter:description"
          content="A comprehensive fan guide for Umamusume Pretty Derby. Browse detailed horse girl profiles, listen to music tracks, catch up on news, and celebrate character birthdays."
        />
        <meta
          name="twitter:image"
          content="https://deancruz1.github.io/Urara/og-image.webp"
        />
        <meta name="twitter:image:alt" content="Urara Umamusume Fan Guide" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dean Cruz" />
        <meta
          name="keywords"
          content="Umamusume, Pretty Derby, horse girls, fan guide, characters, music, anime"
        />

        {/* Theme Color for browsers */}
        <meta name="theme-color" content="#4f46e5" />
      </Helmet>

      {!isHomePage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/music" element={<Music />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
