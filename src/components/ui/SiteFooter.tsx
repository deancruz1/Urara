export const SiteFooter = () => (
  <footer className="mt-18 bg-header text-white">
    <div className="wrap flex flex-wrap justify-between gap-4 py-5.5 text-[13px]">
      <span>
        Data from the{" "}
        <a
          href="https://umapyoi.net/"
          className="font-bold text-white underline hover:text-white"
        >
          Umapyoi
        </a>{" "}
        community API. Not affiliated with Cygames.
      </span>
      <a
        href="https://deancruz1.github.io/"
        className="font-bold text-white hover:text-white"
      >
        Dean Cruz <span aria-hidden="true">↗</span>
      </a>
    </div>
  </footer>
);
