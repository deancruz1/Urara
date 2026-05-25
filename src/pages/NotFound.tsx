import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  <Helmet>
    <title>404 | Urara</title>
  </Helmet>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg-primary px-4 text-center">
      <p className="text-8xl font-bold text-accent">404</p>
      <h1 className="text-2xl font-bold text-text-primary">Page not found</h1>
      <p className="text-text-secondary max-w-sm">
        Looks like this page doesn't exist. Maybe Haru Urara ran past it.
      </p>
      <Link
        to="/"
        className="rounded-full bg-accent px-8 py-3 text-sm font-bold text-white transition-opacity duration-200 hover:opacity-80"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
