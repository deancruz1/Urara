import type { ReactNode } from "react";

interface ScrollTableProps {
  label: string;
  children: ReactNode;
  className?: string;
}

/** Lets a wide table scroll sideways inside its own box instead of the page. */
export const ScrollTable = ({ label, children, className = "" }: ScrollTableProps) => (
  <div
    role="region"
    aria-label={label}
    tabIndex={0}
    className={`max-w-full overflow-x-auto ${className}`}
  >
    {children}
  </div>
);
