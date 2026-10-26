"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { projects, type Project } from "@/data/site";
import FlowDiagram from "./Flow";
import GraphView from "./GraphView";
import Mockup from "./Mockups";
import { Container, CountUp, Reveal, SectionHeader } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");
const TABS = ["Interface", "Workflow", "Graph"] as const;

function Viewer({ p }: { p: Project }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Interface");
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-1 border-b border-border p-1.5" role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`relative flex-1 rounded-[calc(var(--radius)*0.6)] px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${tab === t ? "text-on-accent" : "text-muted hover:text-fg"}`}
          >
            {tab === t && <motion.span layoutId={`tab-${p.slug}`} className="absolute inset-0 rounded-[inherit] bg-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          {tab === "Interface" && <Mockup project={p} />}
          {tab === "Workflow" && <FlowDiagram flow={p.flow} title={p.title} />}
          {tab === "Graph" && <GraphView project={p} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const flip = i % 2 === 1;
  return (
    <article id={`project-${p.slug}`} className="scroll-mt-28">
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className={flip ? "lg:order-2" : ""}>
          <Reveal>
            <div className="mb-5 flex items-end gap-4">
              <span className="display text-7xl leading-[0.8] text-accent sm:text-8xl">{pad(i + 1)}</span>
              <div className="pb-1">
                <p className="font-mono text-[11px] text-subtle">
                  {p.year} · {pad(i + 1)}/{pad(projects.length)}
                </p>
                <p className="eyebrow !text-[11px]">{p.category}</p>
              </div>
            </div>
            <h3 className="display text-4xl sm:text-5xl">{p.title}</h3>
            <p className="mt-3 text-lg leading-snug text-muted">{p.tagline}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-6 border-l-2 border-accent-2 pl-4 text-[15px] leading-relaxed">
              <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">Problem · </span>
              {p.problem}
            </p>
            <ul className="mt-5 space-y-2.5">
              {p.built.map((b, k) => (
                <li key={b} className="flex gap-3 text-[15px] leading-snug">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent font-mono text-[10px] text-on-accent">{k + 1}</span>
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-xs text-subtle">{p.role}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
          </Reveal>

          {p.stats && (
            <Reveal delay={0.1}>
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {p.stats.map((s) => (
                  <div key={s.label}>
                    <dd>
                      <CountUp value={s.value} className="display block text-3xl text-accent" />
                    </dd>
                    <dt className="text-xs text-muted">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        <div className={`lg:sticky lg:top-24 ${flip ? "lg:order-1" : ""}`}>
          <Reveal delay={0.1}>
            <Viewer p={p} />
          </Reveal>
          {p.images && p.images.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              {p.images.map((img) => (
                <div key={img.src} className="card overflow-hidden">
                  <Image src={img.src} alt={img.alt} width={800} height={500} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
          {p.link && (
            <a href={p.link.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm text-accent hover:underline">
              {p.link.label} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeader eyebrow="Selected work" title="Systems I've" accent="shipped" sub="Each one started as a problem someone was solving by hand. Flip between the interface, the workflow and the graph." />
        <nav aria-label="Projects" className="mt-8 flex flex-wrap gap-2">
          {projects.map((p, i) => (
            <a key={p.slug} href={`#project-${p.slug}`} className="chip hover:!text-fg">
              {pad(i + 1)} {p.title}
            </a>
          ))}
        </nav>
        <div className="mt-16 space-y-24 md:space-y-32">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} p={p} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
