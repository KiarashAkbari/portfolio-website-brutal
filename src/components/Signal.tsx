import { ArrowUpRight, ArrowUp } from "lucide-react";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";
import { GhMark } from "./icons";
import { GH, SITE } from "../data";
import { scrollTop } from "../lib/scroll";

const ASCII_WAVE = ["∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿"];

export default function Signal() {
  return (
    <footer id="signal" className="relative bg-ink text-paper">
      <SectionHead
        dark
        index="04"
        title="OPEN_CHANNEL"
        note="CHANNEL UNENCRYPTED, INTENTIONS CLEAR. RESPONSE SLA: FAST."
        className="border-b border-line-inv"
      />

      <div className="relative overflow-hidden">
        <div className="blueprint-inv pointer-events-none absolute inset-0 opacity-60" />

        <div className="relative px-4 py-14 md:px-6 md:py-20">
          <Reveal clip>
            <h3 className="xcond font-display text-[clamp(2.8rem,9.5vw,8.5rem)] font-black leading-[0.86]">
              GOT A PROBLEM
            </h3>
          </Reveal>
          <Reveal clip delay={120}>
            <h3 className="xcond font-display text-[clamp(2.8rem,9.5vw,8.5rem)] font-black leading-[0.86]">
              THAT NEEDS <span className="stroke-acc">EYES</span>?
            </h3>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-8 max-w-md font-mono text-[11px] leading-[1.9] text-paper/60 md:text-xs">
              Open to AI / engineering roles and collaborations. The fastest
              way to reach me is through the channels below — bring a hard
              problem and I'll bring the model.
            </p>
          </Reveal>
        </div>

        {/* channel cards */}
        <div className="relative grid border-t border-line-inv md:grid-cols-2">
          <Reveal className="border-b border-line-inv md:border-b-0 md:border-r">
            <a
              href={GH}
              target="_blank"
              rel="noreferrer"
              data-cursor="TRANSMIT"
              className="group flex h-full flex-col justify-between gap-10 p-6 transition-colors duration-300 hover:bg-acc hover:text-ink md:p-8"
            >
              <div className="flex items-center justify-between">
                <GhMark size={22} />
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
              <div>
                <div className="cond font-display text-[clamp(2.2rem,5vw,4rem)] font-black leading-none">
                  GITHUB
                </div>
                <div className="mt-3 font-mono text-[10px] tracking-[0.2em] opacity-60">
                  @KiarashAkbari — THE CODE IS THE RESUME
                </div>
              </div>
            </a>
          </Reveal>
          <Reveal delay={120}>
            <a
              href={SITE}
              target="_blank"
              rel="noreferrer"
              data-cursor="TRANSMIT"
              className="group flex h-full flex-col justify-between gap-10 p-6 transition-colors duration-300 hover:bg-paper hover:text-ink md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg">⌂</span>
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
              <div>
                <div className="cond font-display text-[clamp(2.2rem,5vw,4rem)] font-black leading-none">
                  HQ.SITE
                </div>
                <div className="mt-3 truncate font-mono text-[10px] tracking-[0.2em] opacity-60">
                  kiarash-akbari.netlify.app — PRIMARY UPLINK
                </div>
              </div>
            </a>
          </Reveal>
        </div>

        {/* bottom bar */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-line-inv px-4 py-4 font-mono text-[9px] tracking-[0.25em] text-paper/45 md:px-6">
          <span>© 2026 KIARASH AKBARI</span>
          <span className="hidden md:inline text-paper/25 select-none" aria-hidden>
            {ASCII_WAVE[0]}
          </span>
          <span className="hidden lg:inline">ENG: REACT+TS+ASCII // DOC:KIA.SYS_V5.2</span>
          <button
            onClick={scrollTop}
            data-cursor="RTB"
            className="flex items-center gap-2 text-paper/70 transition-colors hover:text-acc"
          >
            RETURN_TO_BASE <ArrowUp size={11} />
          </button>
        </div>
      </div>
    </footer>
  );
}
