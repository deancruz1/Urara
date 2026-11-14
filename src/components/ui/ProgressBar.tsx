/** Thin playback progress bar, 0–1. Decorative; the play button carries the state. */
export const ProgressBar = ({ value }: { value: number }) => (
  <div aria-hidden="true" className="mt-1.5 h-1 bg-rule">
    <div className="h-1 bg-turf" style={{ width: `${Math.round(value * 100)}%` }} />
  </div>
);
