interface SwatchesProps {
  main: string;
  sub: string;
  /** Tailwind width/height classes for each block. */
  size?: string;
  className?: string;
}

/** A character's main and sub colour as two solid blocks. Never shows colour values as text. */
export const Swatches = ({
  main,
  sub,
  size = "h-[26px] w-[18px]",
  className = "",
}: SwatchesProps) => (
  <span aria-hidden="true" className={`inline-flex ${className}`}>
    {[main, sub].map((c, i) => (
      <span
        key={i}
        className={`block outline-1 -outline-offset-1 outline-rule ${size}`}
        style={{ backgroundColor: c || "transparent" }}
      />
    ))}
  </span>
);
