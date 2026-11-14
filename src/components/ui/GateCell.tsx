const GATE_STYLES: Record<number, string> = {
  1: "bg-gate-1 text-gate-ink outline-2 -outline-offset-2 outline-gate-ink",
  2: "bg-gate-2 text-white dark:outline-2 dark:-outline-offset-2 dark:outline-white",
  3: "bg-gate-3 text-white",
  4: "bg-gate-4 text-white",
  5: "bg-gate-5 text-gate-ink",
  6: "bg-gate-6 text-white",
  7: "bg-gate-7 text-gate-ink",
  8: "bg-gate-8 text-gate-ink",
};

interface GateCellProps {
  gate: number;
  as?: "td" | "span";
  className?: string;
}

/** A race-card gate number on its JRA gate colour (1 white … 8 pink). */
export const GateCell = ({ gate, as = "td", className = "" }: GateCellProps) => {
  const Tag = as;
  return (
    <Tag
      className={`text-center font-cond text-[28px] font-extrabold tabular-nums ${
        GATE_STYLES[((gate - 1) % 8) + 1]
      } ${className}`}
    >
      {gate}
    </Tag>
  );
};
