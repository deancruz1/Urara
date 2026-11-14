import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => (
  <>
    <Helmet>
      <title>404 | Urara</title>
      <meta name="description" content="This page doesn't exist." />
    </Helmet>

    <section className="wrap pt-14">
      <p
        aria-hidden="true"
        className="m-0 font-cond text-[150px] font-extrabold leading-[0.8] tabular-nums"
      >
        404
      </p>
      <h1 className="mt-6 border-b-[3px] border-ink pb-1.5 font-cond text-4xl font-extrabold uppercase leading-none">
        Page not found
      </h1>
      <p className="mt-4 max-w-[60ch] text-ink-sub">
        This page doesn't exist. Maybe Haru Urara ran past it.
      </p>
      <Link
        to="/"
        className="mt-2 inline-block font-bold"
      >
        Back to the home page →
      </Link>
    </section>
  </>
);

export default NotFound;
