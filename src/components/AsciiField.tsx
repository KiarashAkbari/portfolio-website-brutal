import { useEffect, useRef } from "react";

const RAMP = " .·:;=+*#%@";
const PAPER = "#e9e6dc";
const ACC = "#ff4d00";

type V3 = { x: number; y: number; z: number; kind: number; s: number };

function buildCore(n: number): V3[] {
  const pts: V3[] = [];
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = ga * i;
    pts.push({
      x: Math.cos(th) * r,
      y,
      z: Math.sin(th) * r,
      kind: 0,
      s: Math.random(),
    });
  }
  return pts;
}
function buildRing(n: number, radius: number, tilt: number, tube: number): V3[] {
  const pts: V3[] = [];
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = radius + (Math.random() - 0.5) * tube;
    const x = Math.cos(a) * rr;
    const z = Math.sin(a) * rr;
    pts.push({ x, y: (Math.random() - 0.5) * tube, z, kind: 1 + 0, s: a, });
    // tilt around X
    const p = pts[pts.length - 1];
    const y2 = p.y * ct - p.z * st;
    p.z = p.y * st + p.z * ct;
    p.y = y2;
    void st;
  }
  return pts;
}
function buildDust(n: number): V3[] {
  const pts: V3[] = [];
  for (let i = 0; i < n; i++) {
    const v = {
      x: (Math.random() - 0.5) * 5.4,
      y: (Math.random() - 0.5) * 3.4,
      z: (Math.random() - 0.5) * 3,
      kind: 2,
      s: Math.random() * Math.PI * 2,
    };
    pts.push(v);
  }
  return pts;
}

export default function AsciiField({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const core = buildCore(1500);
    const ringA = buildRing(520, 1.5, 0.5, 0.05);
    const ringB = buildRing(360, 1.86, -0.85, 0.04);
    const dust = buildDust(220);
    const all = [...core, ...ringA, ...ringB, ...dust];

    let W = 0;
    let H = 0;
    let dpr = 1;
    let fs = 11;
    let cellW = fs * 0.6;
    let cellH = fs;
    let S = 100;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let running = true;
    let inView = true;
    let raf = 0;
    let last = 0;
    let spin = 0.6;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const grid = new Map<number, { ch: string; z: number; c: string; a: number }>();

    const resize = () => {
      dpr = Math.min(1.6, window.devicePixelRatio || 1);
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fs = Math.max(8, Math.min(13, Math.floor(W / 92)));
      cellW = fs * 0.6;
      cellH = fs;
      S = Math.min(W, H) * 0.36;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), {
      threshold: 0.02,
    });
    io.observe(wrap);

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (!running || !inView) return;
      if (now - last < 33) return;
      last = now;
      const t = now * 0.001;

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      if (!reduce) spin += 0.0035;
      const rotY = spin + mouse.x * 0.6;
      const rotX = 0.45 + mouse.y * 0.35;
      const cy = Math.cos(rotY);
      const sy = Math.sin(rotY);
      const cxr = Math.cos(rotX);
      const sxr = Math.sin(rotX);

      grid.clear();

      for (let i = 0; i < all.length; i++) {
        const p = all[i];
        let nf = 0;
        let rr = 1;
        if (p.kind === 0) {
          nf =
            Math.sin(p.x * 2.6 + t * 0.9) *
            Math.sin(p.y * 2.6 + t * 0.65) *
            Math.sin(p.z * 2.6 + t * 1.15);
          rr = 1 + 0.16 * nf;
        } else if (p.kind === 1 && !reduce) {
          nf = 0.5 + 0.5 * Math.sin(p.s * 3 - t * 1.4);
        }
        const x = p.x * rr;
        const y = p.y * rr;
        const z = p.z * rr;
        // rotate Y
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        // rotate X
        const y2 = y * cxr - z1 * sxr;
        const z2 = y * sxr + z1 * cxr;

        const f = 3.1 / (3.1 + z2);
        const sx = W * 0.5 + x1 * f * S;
        const syy = H * 0.5 + y2 * f * S;
        if (sx < -20 || sx > W + 20 || syy < -20 || syy > H + 20) continue;

        const b = Math.max(0, Math.min(1, (f - 0.68) / 0.42));
        let ch: string;
        let color = PAPER;
        let alpha = 0.28 + b * 0.72;
        if (p.kind === 2) {
          const tw = 0.5 + 0.5 * Math.sin(t * 1.4 + p.s * 5);
          if (tw < 0.62) continue;
          ch = ".";
          alpha = 0.25 * tw;
        } else if (p.kind === 1) {
          ch = RAMP[Math.min(RAMP.length - 1, 2 + Math.floor(b * 6))];
          alpha *= 0.75;
          if (nf > 0.86) {
            color = ACC;
            ch = "@";
            alpha = 0.95;
          }
        } else {
          ch = RAMP[Math.min(RAMP.length - 1, 1 + Math.floor(b * (RAMP.length - 1.4)))];
          // anomaly points on the core
          if (Math.abs(nf) > 0.86) {
            color = ACC;
            alpha = Math.min(1, alpha + 0.25);
          }
        }

        const gx = Math.round(sx / cellW);
        const gy = Math.round(syy / cellH);
        const key = gx + gy * 4096;
        const ex = grid.get(key);
        if (!ex || z2 < ex.z) grid.set(key, { ch, z: z2, c: color, a: alpha });
      }

      // phosphor trail clear
      ctx.fillStyle = "rgba(23, 21, 18, 0.5)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${fs}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";

      grid.forEach((v, key) => {
        ctx.globalAlpha = v.a;
        ctx.fillStyle = v.c;
        ctx.fillText(v.ch, (key % 4096) * cellW, Math.floor(key / 4096) * cellH);
      });

      // occasional glitch row
      if (!reduce && Math.random() < 0.05) {
        const gy = Math.floor(Math.random() * (H / cellH));
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = ACC;
        for (let k = 0; k < 14; k++) {
          const gx = Math.floor(Math.random() * (W / cellW));
          ctx.fillText("/\\|=+*#"[Math.floor(Math.random() * 7)], gx * cellW, gy * cellH);
        }
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
