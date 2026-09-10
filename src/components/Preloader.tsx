import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/cn";
import { buildBar, padNum } from "../lib/ascii";

const LOGS = [
  "> INIT KIA.SYS v5.2 — RENDER_CORE:ASCII",
  "> LINK github.com/KiarashAkbari ....... [LINKED]",
  "> MOUNTING POINT-CLOUD CORE ........... [OK]",
  "> CALIBRATING DOT-MATRIX OPTICS ....... [OK]",
  "> READABILITY PROTOCOL ................ [ACTIVE]",
];

const ASCII_LOGO = [
  "██   ██       ██  ",
  "██  ██       ████ ",
  "█████       ██  ██",
  "██  ██     ████████",
  "██   ██   ██    ██",
];

const GLYPHS = "▚▞▛▟█▓▒░#@%&$XO";

function scrambleRow(base: string, seed: number) {
  let out = "";
  for (let i = 0; i < base.length; i++) {
    const r = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453;
    const f = r - Math.floor(r);
    out += base[i] !== " " && f > 0.72 ? GLYPHS[(i * 7 + seed) % GLYPHS.length] : base[i];
  }
  return out;
}

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const [tick, setTick] = useState(0);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    window.setTimeout(() => {
      setGone(true);
      onDone();
    }, 950);
  };

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const iv = window.setInterval(() => {
      setPct((p) => {
        const next = p + (p < 60 ? Math.random() * 9 + 3 : Math.random() * 5 + 1.5);
        return next >= 100 ? 100 : next;
      });
    }, 110);
    const gl = window.setInterval(() => setTick((t) => t + 1), 140);
    const click = () => setPct(100);
    window.addEventListener("pointerdown", click);
    return () => {
      window.clearInterval(iv);
      window.clearInterval(gl);
      window.removeEventListener("pointerdown", click);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (pct >= 100) {
      const t = window.setTimeout(finish, 650);
      return () => window.clearTimeout(t);
    }
  }, [pct]);

  if (gone) return null;
  const logCount = Math.max(0, Math.min(LOGS.length, Math.floor(pct / 19) + 1));
  const seed = tick * 13;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col bg-ink text-paper transition-transform duration-[900ms] ease-[cubic-bezier(.76,0,.24,1)]",
        leaving && "-translate-y-full"
      )}
    >
      {/* chrome */}
      <div className="flex items-center justify-between border-b border-line-inv px-4 py-3 text-[10px] tracking-[0.25em]">
        <span>KIA.SYS // BOOT_SEQUENCE</span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-blink bg-acc" />
          RECORDING
        </span>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden blueprint-inv">
        <div className="plus absolute left-4 top-4 text-paper/40" />
        <div className="plus absolute right-4 top-4 text-paper/40" />
        <div className="plus absolute bottom-4 left-4 text-paper/40" />
        <div className="plus absolute bottom-4 right-4 text-paper/40" />

        {/* ASCII logo */}
        <pre className="select-none text-center font-mono text-[clamp(8px,1.6vw,14px)] leading-[1.05] tracking-tight text-paper flicker">
          {ASCII_LOGO.map((row, i) => (
            <div key={i}>{scrambleRow(row, seed + i * 31)}</div>
          ))}
        </pre>
        <div className="mt-3 text-[10px] tracking-[0.5em] text-paper/50">
          KIARASH AKBARI <span className="text-acc">//</span> AI_ENGINEER
        </div>

        {/* log */}
        <div className="absolute bottom-6 left-4 right-4 md:left-8 md:right-8">
          <div className="min-h-[5.5rem] text-[10px] leading-[1.7] text-paper/70 md:text-[11px]">
            {LOGS.slice(0, logCount).map((l, i) => (
              <div key={i}>
                {l.replace("[LINKED]", "[OK]")}
                {i === logCount - 1 && pct < 100 && (
                  <span className="ml-1 inline-block h-3 w-2 animate-blink bg-acc align-middle" />
                )}
              </div>
            ))}
            {pct >= 100 && (
              <div className="text-acc">&gt; ACCESS GRANTED — ENTERING DOSSIER ▓▓</div>
            )}
          </div>
          <div className="mt-3 flex items-center gap-3 text-[11px] tabular">
            <span className="whitespace-pre-wrap font-mono tracking-tight">
              [{buildBar(pct / 100, 30, "█", "░")}]
            </span>
            <span className="text-acc">{padNum(pct, 3)}%</span>
            <span className="hidden text-paper/40 md:inline">// TAP ANYWHERE TO SKIP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
