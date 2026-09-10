import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("kursor");

    const pos = { x: -100, y: -100 };
    const cur = { x: -100, y: -100 };
    let scale = 1;
    let curScale = 1;
    let raf = 0;
    let label = "";
    let visible = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      visible = true;
      const t = (e.target as HTMLElement).closest?.(
        "a,button,[data-cursor]"
      ) as HTMLElement | null;
      if (t) {
        scale = 2.3;
        label = t.dataset.cursor ?? "";
      } else {
        scale = 1;
        label = "";
      }
    };
    const onLeave = () => {
      visible = false;
    };

    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.16;
      cur.y += (pos.y - cur.y) * 0.16;
      curScale += (scale - curScale) * 0.18;
      const d = dotRef.current;
      const b = boxRef.current;
      const l = labelRef.current;
      if (d && b) {
        d.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        d.style.opacity = visible ? "1" : "0";
        b.style.transform = `translate(${cur.x}px, ${cur.y}px) scale(${curScale})`;
        b.style.opacity = visible ? "1" : "0";
      }
      if (l) {
        l.style.transform = `translate(${cur.x + 22}px, ${cur.y + 14}px)`;
        l.style.opacity = visible ? "1" : "0";
        const txt =
          label !== ""
            ? `[ ${label} ]`
            : `X:${String(Math.round(cur.x)).padStart(4, "0")} Y:${String(
                Math.round(cur.y)
              ).padStart(4, "0")}`;
        if (l.textContent !== txt) l.textContent = txt;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("kursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      {/* trailing box */}
      <div
        ref={boxRef}
        className="pointer-events-none fixed left-[-16px] top-[-16px] z-[95] h-8 w-8 mix-blend-difference"
      >
        <div className="absolute inset-0 border border-white" />
        <div className="absolute left-1/2 top-[-5px] h-[5px] w-px bg-white" />
        <div className="absolute left-1/2 bottom-[-5px] h-[5px] w-px bg-white" />
        <div className="absolute top-1/2 left-[-5px] w-[5px] h-px bg-white" />
        <div className="absolute top-1/2 right-[-5px] w-[5px] h-px bg-white" />
      </div>
      {/* exact dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-[-2px] top-[-2px] z-[95] h-1 w-1 bg-white mix-blend-difference"
      />
      {/* label */}
      <div
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[95] font-mono text-[9px] tabular tracking-[0.15em] text-white mix-blend-difference"
      />
    </>
  );
}
