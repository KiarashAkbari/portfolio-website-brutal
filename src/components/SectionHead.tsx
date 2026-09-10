import { cn } from "../utils/cn";
import Reveal from "./Reveal";

type Props = {
  index: string;
  title: string;
  note?: string;
  dark?: boolean;
  className?: string;
};

export default function SectionHead({ index, title, note, dark, className }: Props) {
  return (
    <div
      className={cn(
        "relative flex items-end justify-between gap-6 border-b px-4 pb-5 pt-16 md:px-6 md:pt-24",
        dark ? "border-line-inv" : "border-line",
        className
      )}
    >
      <Reveal clip>
        <div className="flex items-start gap-3 md:gap-5">
          <span
            className={cn(
              "mt-2 border px-2 py-1 font-mono text-[10px] tracking-[0.25em] md:text-xs",
              dark ? "border-line-inv text-paper/60" : "border-line text-ink/60"
            )}
          >
            [{index}]
          </span>
          <h2
            className={cn(
              "cond font-display text-[clamp(2.6rem,8vw,6.5rem)] font-black leading-[0.85] tracking-[-0.01em]",
              dark ? "text-paper" : "text-ink"
            )}
          >
            {title}
          </h2>
        </div>
      </Reveal>
      {note && (
        <Reveal delay={140} className="hidden md:block">
          <span
            className={cn(
              "max-w-[240px] pb-1 text-right font-mono text-[10px] leading-relaxed tracking-[0.2em]",
              dark ? "text-paper/50" : "text-ink/50"
            )}
          >
            {note}
          </span>
        </Reveal>
      )}
    </div>
  );
}
