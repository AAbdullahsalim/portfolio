"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { about, experience, journey, stats } from "@/data/site";
import { Container, CountUp, Eyebrow, Reveal, SectionHeader } from "./ui";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeader eyebrow="About me" title="The problem" accent="I solve" sub="Why most AI never leaves the demo, and what I do about it." />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-3xl space-y-5 text-[17px] leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <p className={i === 0 ? "text-xl leading-snug text-fg sm:text-2xl" : ""}>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="lg:pt-2">
            <div className="rounded-card border border-border bg-surface p-6">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-subtle">What that looks like</p>
              <ul className="space-y-3">
                {about.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 text-[15px] leading-snug">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px] shadow-accent" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="bg-bg p-6">
              <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
                <CountUp value={`${s.value}${s.suffix}`} />
              </div>
              <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>

        <Experience />
        <Journey />
      </Container>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = useState<string | null>(null);
  const selected = experience.find((e) => e.company === open);

  return (
    <div className="mt-20">
      <Reveal>
        <Eyebrow tone="accent-2">Where I&apos;ve worked</Eyebrow>
      </Reveal>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {experience.map((r, i) => (
          <li key={r.company}>
            <Reveal delay={i * 0.05} className="h-full">
              <button
                type="button"
                onClick={() => setOpen(open === r.company ? null : r.company)}
                aria-expanded={open === r.company}
                className={`group relative flex h-full w-full flex-col gap-3 overflow-hidden rounded-card border bg-surface p-4 text-left transition-colors ${open === r.company ? "border-border-strong" : "border-border hover:border-border-strong"}`}
              >
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-50" style={{ background: `radial-gradient(circle, ${r.color}, transparent 70%)` }} />
                <span className="absolute right-3 top-3 font-mono text-xs text-subtle transition-transform group-hover:text-fg" style={{ transform: open === r.company ? "rotate(45deg)" : undefined }}>
                  +
                </span>
                <div className="relative grid size-9 place-items-center rounded-lg font-mono text-sm font-semibold text-bg" style={{ background: r.color }}>
                  {r.initials}
                </div>
                <div className="relative">
                  <p className="truncate text-sm font-medium">{r.company}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted">{r.title}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-subtle">{r.period}</p>
                </div>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.company}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-card border border-border-strong bg-surface p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-semibold">
                  {selected.title} <span className="text-muted">· {selected.company}</span>
                </h3>
                <span className="font-mono text-xs text-subtle">
                  {selected.type} · {selected.place}
                </span>
              </div>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {selected.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <span className="mt-2.5 h-px w-3 shrink-0" style={{ background: selected.color }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="mt-24" ref={ref}>
      <Reveal>
        <Eyebrow tone="accent-2">How I got here</Eyebrow>
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          From <span className="font-serif font-normal italic">pixels</span> to <span className="font-serif font-normal italic text-gradient">agents</span>
        </h3>
      </Reveal>

      <div className="relative mt-10">
        <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-border md:block" />
        <motion.div style={{ width }} className="absolute left-0 top-[7px] hidden h-px bg-gradient-to-r from-accent-2 via-accent-3 to-accent md:block" />
        <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
          {journey.map((j, i) => (
            <li key={j.year} className="relative border-l border-border pl-6 md:border-l-0 md:pl-0">
              <Reveal delay={i * 0.1}>
                <span className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full md:static md:block md:size-3.5 ${i === journey.length - 1 ? "bg-accent shadow-[0_0_16px] shadow-accent" : "border-2 border-border-strong bg-bg"}`} />
                <p className="font-mono text-xs text-subtle md:mt-5">{j.year}</p>
                <p className="mt-1 font-serif text-3xl italic">{j.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{j.text}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {j.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-subtle">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
