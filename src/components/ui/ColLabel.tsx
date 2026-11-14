/** A Japanese label with its English name underneath, for table headers. */
export const ColLabel = ({ ja, en }: { ja: string; en: string }) => (
  <>
    <span lang="ja">{ja}</span>
    <small className="block font-cond text-xs font-semibold uppercase tracking-[0.06em]">{en}</small>
  </>
);
