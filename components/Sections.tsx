"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { daily, process, profile, promises, services, stack } from "@/data/site";
import { Container, Reveal, SectionHeader } from "./ui";

/* Card with a glow that follows the cursor */
function Spotlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -400, y: -400 });
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onPointerLeave={() => setPos({ x: -400, y: -400 })}
      className={`card group h-full overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--accent) 12%, transparent), transparent 60%)` }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export function Services() {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <SectionHeader eyebrow="Services" title="What clients" accent="hire me for" />
        <div className="mt-12 grid gap-3 md:grid-cols-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05} className={s.wide ? "md:col-span-6" : s.big ? "md:col-span-3" : "md:col-span-2"}>
              <Spotlight>
                <div className={`flex h-full flex-col p-6 ${s.wide ? "md:flex-row md:items-end md:gap-10" : s.big ? "md:min-h-56" : "md:min-h-52"}`}>
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={`display mt-auto pt-8 md:shrink-0 ${s.big ? "text-3xl" : "text-2xl"}`}>{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:max-w-xl">{s.text}</p>
                  <p className="mt-4 font-mono text-[11px] text-accent md:ml-auto md:shrink-0">{s.tag}</p>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="card mt-6 p-6 md:p-8">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-subtle">How I work, on every project</p>
            <ul className="grid gap-3 md:grid-cols-2">
              {promises.map((p) => (
                <li key={p} className="flex gap-3 text-[15px]">
                  <span className="text-accent">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative scroll-mt-24 py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader eyebrow="The process" title="Four questions," accent="answered in order" sub="Every engagement runs the same way, so nothing ships before it's proven." />
          </div>
          <ol ref={ref} className="relative space-y-4">
            <div aria-hidden className="absolute bottom-6 left-[27px] top-6 w-px bg-border">
              <motion.div style={{ scaleY }} className="h-full w-px origin-top bg-accent" />
            </div>
            {process.map((s, i) => (
              <Reveal key={s.q} delay={i * 0.05}>
                <li className="card flex gap-5 p-5">
                  <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-border-strong bg-bg font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display text-2xl">{s.q}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Marquee({ items, reverse = false, duration = 45 }: { items: string[]; reverse?: boolean; duration?: number }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div
        className="flex shrink-0 animate-marquee gap-3 pr-3 hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className="chip whitespace-nowrap !px-4 !py-2 !text-sm">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stack() {
  const all = stack.flatMap((g) => g.items);
  const half = Math.ceil(all.length / 2);
  return (
    <section id="stack" className="relative scroll-mt-24 py-24 md:py-32">
      <Container>
        <SectionHeader eyebrow="Tech stack" title="Tools I" accent="reach for" sub="From model training to the pipeline that feeds it to the trace that explains it." />
      </Container>

      <div className="mt-12 space-y-3">
        <Marquee items={all.slice(0, half)} />
        <Marquee items={all.slice(half)} reverse duration={50} />
      </div>

      <Container>
        <div className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((g, i) => (
            <Reveal key={g.group} delay={(i % 3) * 0.05}>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-subtle">{g.group}</p>
              <p className="text-[15px] leading-relaxed text-muted">
                {g.items.map((it, j) => (
                  <span key={it}>
                    <span className="transition-colors hover:text-accent">{it}</span>
                    {j < g.items.length - 1 && <span className="text-subtle"> · </span>}
                  </span>
                ))}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="card mt-12 flex flex-wrap items-center gap-3 p-5">
            <span className="mr-2 font-mono text-[11px] uppercase tracking-widest text-subtle">What I use daily</span>
            {daily.map((d) => (
              <span key={d} className="chip !px-3 !py-1.5 !text-sm">
                {d}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function Availability() {
  const items = Array.from({ length: 8 }, () => ["Open to work", "Available for projects"]).flat();
  return (
    <div className="-rotate-1 border-y-2 border-fg bg-accent py-3 text-on-accent">
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-6 pr-6" style={{ ["--marquee-duration" as string]: "30s" }}>
          {[...items, ...items].map((t, i) => (
            <span key={i} className="display flex items-center gap-6 whitespace-nowrap text-2xl uppercase">
              {t}
              <span aria-hidden className="text-base">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-28 md:py-40">
            <Container className="relative text-center">
        <Reveal>
          <span className="mb-4 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Contact
            <span aria-hidden className="h-px w-6 bg-accent" />
          </span>
          <h2 className="display mx-auto max-w-4xl text-5xl sm:text-6xl md:text-8xl">
            Got an AI idea stuck in <span className="accent-word">demo mode?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted">
            Tell me what you&apos;re trying to automate. I&apos;ll tell you honestly whether AI is the right tool, and what it would take to ship it.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`mailto:${profile.email}`} className="btn btn-primary group">
              {profile.email}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(profile.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="btn btn-ghost"
            >
              {copied ? "Copied ✓" : "Copy email"}
            </button>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
              LinkedIn ↗
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image src={profile.photo} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
              <div>
                <p className="font-medium">{profile.name}</p>
                <p className="text-sm text-muted">{profile.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">AI agents, RAG and LLMOps that hold up in production. Based in {profile.location}, working with teams worldwide.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-subtle">Site</p>
              <ul className="space-y-2 text-muted">
                {["about", "work", "process", "stack"].map((l) => (
                  <li key={l}>
                    <a href={`#${l}`} className="capitalize hover:text-fg">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-subtle">Connect</p>
              <ul className="space-y-2 text-muted">
                <li><a href={`mailto:${profile.email}`} className="hover:text-fg">Email</a></li>
                <li><a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-fg">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-subtle">Shortcut</p>
              <p className="text-muted">
                Press <kbd className="rounded border border-border px-1.5 font-mono text-xs">⌘K</kbd> anywhere
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-border pt-6 font-mono text-[11px] text-subtle sm:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with Next.js, Tailwind &amp; Motion</span>
        </div>
      </Container>
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="display translate-y-[18%] whitespace-nowrap text-center text-[19vw] leading-none text-transparent [-webkit-text-stroke:1px_color-mix(in_oklab,var(--fg)_18%,transparent)]">Taha Umar</p>
      </div>
    </footer>
  );
}
