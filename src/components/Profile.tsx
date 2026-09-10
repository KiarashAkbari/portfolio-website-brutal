import { CAPABILITIES, TIMELINE, GH, SITE } from "../data";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const DOSSIER: [string, string][] = [
  ["NAME", "KIARASH AKBARI"],
  ["CALLSIGN", "KIA.SYS"],
  ["ROLE", "AI ENGINEER"],
  ["ALLOCATION", "REMOTE / EARTH > ANYWHERE"],
  ["UPLINK_A", "github.com/KiarashAkbari"],
  ["UPLINK_B", "kiarash-akbari.netlify.app"],
];

function Bar({ label, v, acc }: { label: string; v: number; acc?: boolean }) {
  const cells = 14;
  const f = Math.round(v * cells);
  return (
    <div className="flex items-baseline justify-between gap-3 py-[5px] font-mono text-[10px] md:text-[11px]">
      <span className="text-paper/55">{label}</span>
      <span className="tabular tracking-tight">
        <span className="text-acc">{"█".repeat(f)}</span>
        <span className="text-paper/20">{"░".repeat(cells - f)}</span>
        <span className={acc ? "text-acc" : "text-paper/70"}>
          {"  "}
          {Math.round(v * 100)}
        </span>
      </span>
    </div>
  );
}

export default function Profile() {
  return (
    <section id="profile" className="relative border-b border-line">
      <SectionHead
        index="03"
        title="PROFILE.SYS"
        note="HUMAN FILE — SHORT BY DESIGN. DETAILS LIVE IN THE CODE."
      />

      <div className="grid lg:grid-cols-12">
        {/* statement */}
        <div className="border-b border-line px-4 py-10 md:px-6 md:py-14 lg:col-span-6 lg:border-b-0 lg:border-r">
          <Reveal clip>
            <h3 className="cond font-display text-[clamp(2.2rem,5.6vw,4.6rem)] font-black leading-[0.92]">
              MACHINES THAT <span className="text-acc">NOTICE</span> WHAT
              HUMANS MISS.
            </h3>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-lg text-[12px] leading-[1.9] text-ink/70 md:text-[13px]">
              AI engineer working where machine learning meets adversarial
              reality. My lane: train models on what <em>normal</em> looks
              like, then let mathematics catch everything else — network
              intrusions, broken pipelines, entropy in general. I care about
              systems that keep running when conditions stop being polite.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-2 font-mono text-[9px] tracking-[0.25em]">
              <span className="border border-line px-2.5 py-1.5 text-ink/60">
                ▸ PRAGMATIC
              </span>
              <span className="border border-line px-2.5 py-1.5 text-ink/60">
                ▸ SYSTEMS-FIRST
              </span>
              <span className="border border-acc px-2.5 py-1.5 text-acc">
                ▸ SHIPS CODE
              </span>
            </div>
          </Reveal>

          {/* timeline */}
          <Reveal delay={300}>
            <h4 className="mt-12 text-[10px] font-bold tracking-[0.3em] text-ink/60">
              ENGAGEMENT_LOG://
            </h4>
            <div className="mt-4 border-t border-line">
              {TIMELINE.map(([year, tag, blurb]) => (
                <div
                  key={tag}
                  className="group grid grid-cols-[86px_1fr] gap-4 border-b border-line py-3"
                >
                  <span className="font-mono text-[10px] tabular tracking-[0.15em] text-acc">
                    {year}
                  </span>
                  <div>
                    <div className="font-mono text-[11px] font-bold tracking-[0.2em]">
                      {tag}
                    </div>
                    <div className="mt-1 font-mono text-[10px] leading-relaxed text-ink/55 md:text-[11px]">
                      {blurb}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* dossier + capabilities */}
        <div className="px-4 py-10 md:px-6 md:py-14 lg:col-span-6">
          <Reveal>
            <div className="border border-line">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[9px] tracking-[0.3em] text-ink/60">
                <span>PERSONNEL.DAT</span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 animate-blink bg-acc" />
                  SYNCED
                </span>
              </div>
              {DOSSIER.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[110px_1fr] border-b border-line text-[10px] last:border-b-0 md:grid-cols-[130px_1fr] md:text-[11px]"
                >
                  <span className="border-r border-line px-3 py-2.5 tracking-[0.2em] text-ink/45">
                    {k}
                  </span>
                  <a
                    href={k === "UPLINK_A" ? GH : k === "UPLINK_B" ? SITE : undefined}
                    target={k.startsWith("UPLINK") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-cursor={k.startsWith("UPLINK") ? "UPLINK" : undefined}
                    className={`truncate px-3 py-2.5 font-bold tracking-[0.1em] ${
                      k.startsWith("UPLINK")
                        ? "link-u w-fit text-ink hover:text-acc"
                        : "text-ink"
                    }`}
                  >
                    {v}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-8 border border-ink bg-ink text-paper scanlines relative">
              <div className="flex items-center justify-between border-b border-line-inv px-4 py-2.5 text-[9px] tracking-[0.3em] text-paper/60">
                <span>CAPABILITY_MATRIX.CSV</span>
                <span className="text-acc">CALIBRATED</span>
              </div>
              <div className="grid gap-6 p-4 md:grid-cols-3 md:p-5">
                {CAPABILITIES.map((g) => (
                  <div key={g.group}>
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.25em]">
                      <span className="inline-block h-1.5 w-1.5 bg-acc" />
                      {g.group}
                    </div>
                    <div className="border-t border-line-inv">
                      {g.rows.map(([label, v], i) => (
                        <Bar
                          key={label as string}
                          label={label as string}
                          v={v as number}
                          acc={i === 0}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-6 font-mono text-[9px] leading-relaxed tracking-[0.2em] text-ink/40">
              NOTE: BARS ARE SELF-ASSESSED, LIKE ALL HONEST ENGINEERS DO.
              GROUND TRUTH AVAILABLE <a href={GH} target="_blank" rel="noreferrer" data-cursor="PROOF" className="link-u text-ink/70">ON_GITHUB ↗</a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
