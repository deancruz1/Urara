import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, hydrate } from "@tanstack/react-query";
import type { DehydratedState } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";
import { resolveRedirect } from "./lib/redirect";

declare global {
  interface Window {
    __URARA_STATE__?: DehydratedState;
  }
}

const queryClient = new QueryClient();
// Pre-rendered pages carry the data they were built with, so the first render
// matches the HTML instead of flashing a loading state.
if (window.__URARA_STATE__) hydrate(queryClient, window.__URARA_STATE__);

const redirect = resolveRedirect(window.location.search);
if (redirect !== null) {
  window.history.replaceState(null, "", redirect);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/Urara/">
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
