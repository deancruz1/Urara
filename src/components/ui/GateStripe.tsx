const GATES = [
  "bg-gate-1 border-b border-gate-ink",
  "bg-gate-2 dark:border-b dark:border-white",
  "bg-gate-3",
  "bg-gate-4",
  "bg-gate-5",
  "bg-gate-6",
  "bg-gate-7",
  "bg-gate-8",
];

/** The eight JRA gate colours, in order, as a full-width stripe. */
export const GateStripe = () => (
  <div aria-hidden="true" className="grid h-2 grid-cols-8">
    {GATES.map((cls) => (
      <div key={cls} className={cls} />
    ))}
  </div>
);
