import { Link } from "react-router-dom";

/** A character's name as a link to her profile. */
export const ProfileLink = ({
  id,
  children,
  className = "",
}: {
  id: number;
  children: React.ReactNode;
  className?: string;
}) => (
  <Link
    to={`/characters?id=${id}`}
    className={`text-ink no-underline hover:text-turf-dark hover:underline ${className}`}
  >
    {children}
  </Link>
);
