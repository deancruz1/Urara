const GATES = ["#ffffff", "#111511", "#d7261e", "#1f5fbf", "#f5d000", "#13883d", "#f08300", "#f28db2"];
const HEAD = 26;
const MAX_LEAD = 140;
const TRAIL = 70 + MAX_LEAD;
const DURATION = 1100;
const FRAMES = 40;

let running = false;

const ease =(t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Each lane is its own small named element, so the browser snapshots it once
// and moves the snapshot on the GPU.
const makeLanes = (laneH: number) =>
  GATES.map((c, i) => {
    const lane = document.createElement("div");
    lane.setAttribute("aria-hidden", "true");
    lane.style.cssText = `position:fixed;left:0;top:${i * laneH}px;height:${laneH}px;width:${HEAD + TRAIL}px;display:flex;pointer-events:none;view-transition-name:gate-lane-${i}`;
    const outline = i === 0 ? "box-shadow:inset 0 0 0 1px #111511;" : "";
    lane.innerHTML = `<div style="width:${TRAIL}px;background:linear-gradient(90deg,transparent,${c}59)"></div><div style="width:${HEAD}px;background:${c};${outline}"></div>`;
    return lane;
  });

/**
 * Runs `apply` inside a view transition: the old page slides out of view behind
 * a straight edge while eight gate-coloured lanes race ahead of it. Everything
 * animates with transforms only, so the GPU does the work and nothing repaints.
 *
 * Known issue: the intended look is a per-lane staircase edge, but animating it
 * with clip-path stutters on large screens. See docs/theme-toggle-staircase.md.
 */
export const gateBreak = (apply: () => void) => {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce) {
    root.classList.add("theme-switching");
    apply();
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("theme-switching")));
    return;
  }
  if (running) return;
  running = true;

  const W = window.innerWidth;
  const H = window.innerHeight;
  const laneH = H / 8;
  const leads = GATES.map(() => 0.25 + Math.random() * 0.75);
  const lanes = makeLanes(laneH);

  const edgeFrames: Keyframe[] = [];
  const pairFrames: Keyframe[] = [];
  const laneFrames: Keyframe[][] = GATES.map(() => []);
  for (let f = 0; f <= FRAMES; f++) {
    const p = f / FRAMES;
    const edge = ease(p) * (W + HEAD + 80);
    edgeFrames.push({ offset: p, transform: `translateX(${edge}px)` });
    pairFrames.push({ offset: p, transform: `translateX(${-edge}px)` });
    leads.forEach((lead, i) => {
      // Lanes pull ahead mid-race and fall back to the edge at the start and finish.
      const x = edge + lead * MAX_LEAD * Math.sin(Math.PI * p);
      laneFrames[i].push({ offset: p, transform: `translate(${x - HEAD - TRAIL}px, ${i * laneH}px)` });
    });
  }

  // Old and new pages get separate names so the old one can be clipped on its own.
  root.classList.add("theme-switching");
  root.style.viewTransitionName = "page-old";
  const transition = document.startViewTransition(() => {
    root.style.viewTransitionName = "page-new";
    apply();
    document.body.append(...lanes);
  });

  transition.ready
    .then(() => {
      const timing = { duration: DURATION, easing: "linear", fill: "both" } as const;
      root.animate(edgeFrames, { ...timing, pseudoElement: "::view-transition-group(page-old)" });
      root.animate(pairFrames, { ...timing, pseudoElement: "::view-transition-image-pair(page-old)" });
      lanes.forEach((_, i) =>
        root.animate(laneFrames[i], { ...timing, pseudoElement: `::view-transition-group(gate-lane-${i})` }),
      );
    })
    .catch(() => {});

  transition.finished.finally(() => {
    lanes.forEach((lane) => lane.remove());
    root.style.viewTransitionName = "";
    root.classList.remove("theme-switching");
    running = false;
  });
};
