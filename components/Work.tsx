"use client";

import Image from "next/image";
import { projects, type Project } from "@/data/site";
import { Container, CountUp, Reveal, SectionHeader } from "./ui";
import { FinbotDiagram, HospitalityVisual, RagDiagram } from "./Visuals";

const pad = (n: number) => String(n).padStart(2, "0");

function Visual({ p }: { p: Project }) {
  if (p.visual === "finbot") return <FinbotDiagram />;
  if (p.visual === "rag") return <RagDiagram />;
  if (p.visual === "hospitality") return <HospitalityVisual />;
  return null;
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const flip = i % 2 === 1;
  return (
    <article id={`project-${p.slug}`} className="relative scroll-mt-28 border-t border-border pt-12 md:pt-16">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div className={flip ? "lg:order-2" : ""}>
          <Reveal>
            <div className="mb-6 flex items-center gap-4">
              <span className="font-serif text-6xl italic leading-none text-transparent [-webkit-text-stroke:1px_#ffffff40] sm:text-7xl">{pad(i + 1)}</span>
              <div>
                <p className="font-mono text-[11px] text-subtle">
                  {pad(i + 1)} / {pad(projects.length)}
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{p.category}</p>
              </div>
            </div>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{p.title}</h3>
            <p className="mt-2 font-serif text-xl italic text-muted">{p.tagline}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed">
              <div>
                <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-subtle">The problem</p>
                <p className="text-muted">{p.problem}</p>
              </div>
              <div>
                <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-subtle">What I built</p>
                <p className="text-fg/90">{p.solution}</p>
              </div>
              <p className="font-mono text-xs text-subtle">
                <span className="text-muted">Role:</span> {p.role}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <li key={t} className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className={`lg:sticky lg:top-28 ${flip ? "lg:order-1" : ""}`}>
          <Reveal delay={0.1}>
            <Visual p={p} />
          </Reveal>

          {p.images && p.images.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              {p.images.map((img) => (
                <Reveal key={img.src} className="overflow-hidden rounded-xl border border-border">
                  <Image src={img.src} alt={img.alt} width={800} height={500} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={0.15}>
            <dl className="mt-3 grid grid-cols-3 gap-px overflow-hidden rounded-card border border-border bg-border">
              {p.stats.map((s) => (
                <div key={s.label} className="bg-surface p-4">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <CountUp value={s.value} className="block text-2xl font-semibold tracking-tight text-accent sm:text-3xl" />
                    <span className="mt-1 block text-xs leading-snug text-muted">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {p.link && (
            <a href={p.link.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:underline">
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
        <SectionHeader eyebrow="Selected work" title="Systems I've" accent="shipped" sub="Each one started as a problem someone was solving by hand." />
        <div className="mt-16 space-y-20 md:space-y-28">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
