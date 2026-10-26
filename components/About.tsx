"use client";

import { about, stats } from "@/data/site";
import { Container, CountUp, Reveal, SectionHeader } from "./ui";

export default function About() {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <SectionHeader eyebrow="About me" title="The problem" accent="I solve" sub="Why most AI never leaves the demo, and what I do about it." />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-3xl space-y-5 text-[17px] leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <p className={i === 0 ? "lead text-2xl leading-snug text-fg sm:text-3xl" : ""}>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="lg:pt-2">
            <div className="card p-6">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-subtle">What that looks like</p>
              <ul className="space-y-3">
                {about.outcomes.map((o, i) => (
                  <li key={o} className="flex gap-3 text-[15px] leading-snug">
                    <span className="mt-0.5 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="card h-full p-6">
                <div className="display text-5xl sm:text-6xl">
                  <CountUp value={`${s.value}${s.suffix}`} />
                </div>
                <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
