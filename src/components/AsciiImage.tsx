import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { RAMP, GLITCH } from "../lib/ascii";

type Props = {
  src: string;
  caption: string;
  cols?: number;
  className?: string;
};

type Burst = { cells: { i: number; t: number }[] };

export default function AsciiImage({ src, caption, cols = 66, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [base, setBase] = useState<string[] | null>(null);
  const [shown, setShown] = useState<string[] | null>(null);
  const [err, setErr] = useState(false);
  const [hover, setHover] = useState(false);
  const progress = useRef(0);
  const rafRef = useRef(0);

  /* build ascii from image */
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const ratio = img.naturalHeight / img.naturalWidth;
      const rows = Math.max(8, Math.round(cols * ratio * 0.5));
      const cv = document.createElement("canvas");
      cv.width = cols;
      cv.height = rows;
      const ctx = cv.getContext("2d", { willReadFrequently: true });
      if (!ctx) return setErr(true);
      ctx.drawImage(img, 0, 0, cols, rows);
      const d = ctx.getImageData(0, 0, cols, rows).data;
      const lines: string[] = [];
      for (let y = 0; y < rows; y++) {
        let line = "";
        for (let x = 0; x < cols; x++) {
          const k = (y * cols + x) * 4;
          const lum =
            (0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]) / 255;
          const boosted = Math.pow(lum, 0.8);
          line += RAMP[Math.min(RAMP.length - 1, Math.floor(boosted * RAMP.length))];
        }
        lines.push(line);
      }
      setBase(lines);
    };
    img.onerror = () => setErr(true);
    return () => {
      cancelled = true;
    };
  }, [src, cols]);

  /* decode animation on view */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !base) return;
    const total = base.length * cols;
    const burst: Burst[] = base.map((_, y) => {
      const cells = [];
      for (let x = 0; x < cols; x++) cells.push({ i: y * cols + x, t: Math.pow(Math.random(), 1.6) });
      return { cells };
    });
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1100;
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / dur);
          progress.current = p;
          const out = base.map((line, y) => {
            let s = "";
            for (let x = 0; x < cols; x++) {
              const c = burst[y].cells[x];
              if (line[x] === " ") {
                s += " ";
                continue;
              }
              if (c.t <= p) s += line[x];
              else if (c.t - p < 0.13) s += GLITCH[(c.i * 31 + ((now / 90) | 0)) % GLITCH.length];
              else s += " ";
            }
            return s;
          });
          setShown(out);
          if (p < 1 && total > 0) rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [base, cols]);

  const fs = Math.max(5, 924 / cols / 1.55);

  return (
    <div
      ref={rootRef}
      className={cn("group relative select-none", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="RAW"
    >
      <div className="relative overflow-hidden border border-paper/25 bg-ink scanlines">
        {/* corners */}
        <div className="plus absolute left-2 top-2 z-10 text-paper/50" />
        <div className="plus absolute right-2 top-2 z-10 text-paper/50" />
        <div className="plus absolute bottom-2 left-2 z-10 text-paper/50" />
        <div className="plus absolute bottom-2 right-2 z-10 text-paper/50" />

        {err ? (
          <div className="flex h-48 items-center justify-center text-[10px] tracking-[0.3em] text-paper/50">
            [ SIGNAL_LOST ]
          </div>
        ) : (
          <pre
            aria-hidden
            className="block w-full overflow-hidden whitespace-pre text-center font-mono text-paper/90"
            style={{
              fontSize: `${fs}px`,
              lineHeight: `${fs}px`,
              transition: "opacity .5s",
              opacity: hover ? 0 : 1,
            }}
          >
            {(shown ?? base ?? []).map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </pre>
        )}

        {/* raw image on hover */}
        <img
          src={src}
          alt={caption}
          draggable={false}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out",
            hover ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]"
          )}
        />
      </div>

      {/* caption bar */}
      <div className="flex items-center justify-between border border-t-0 border-line bg-paper px-3 py-2 text-[9px] tracking-[0.2em] text-ink/70">
        <span className="truncate">{caption}</span>
        <span className="shrink-0 text-acc">
          OPTIC:{hover ? "RAW" : "ASCII"}
        </span>
      </div>
    </div>
  );
}
