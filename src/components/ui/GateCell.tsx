const GATE_STYLES: Record<number, string> = {
  1: "bg-gate-1 text-ink outline-2 -outline-offset-2 outline-ink",
  2: "bg-gate-2 text-paper",
  3: "bg-gate-3 text-paper",
  4: "bg-gate-4 text-paper",
  5: "bg-gate-5 text-ink",
  6: "bg-gate-6 text-paper",
  7: "bg-gate-7 text-ink",
  8: "bg-gate-8 text-ink",
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
