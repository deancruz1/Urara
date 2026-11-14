import { Link } from "react-router-dom";

/** A character's name as a link to her profile. */
export const ProfileLink = ({
  slug,
  children,
  className = "",
}: {
  slug: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Link
    to={`/characters/${slug}`}
    className={`text-ink no-underline hover:text-turf-dark hover:underline ${className}`}
  >
    {children}
  </Link>
);
