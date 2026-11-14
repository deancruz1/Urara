import { Routes, Route, useLocation } from "react-router-dom";
import {
  ErrorBoundary,
  GateStripe,
  ScrollToTop,
  SiteFooter,
  SiteHeader,
} from "./components/ui";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Music from "./pages/Music";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

const App = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <SiteHeader />
      <GateStripe />
      <main id="content" tabIndex={-1} className="flex-1">
        <ErrorBoundary key={pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/music" element={<Music />} />
            <Route path="/news" element={<News />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <SiteFooter />
    </div>
  );
};

export default App;
