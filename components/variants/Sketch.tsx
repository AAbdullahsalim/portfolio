"use client";

import Image from "next/image";
import { useState } from "react";
import { about, daily, process, profile, promises, services, stack, stats } from "@/data/site";
import { Reveal } from "../ui";

// Handwritten: the site as a notebook. Notes, tape, polaroids and doodles.

const ink = { fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, filter: "url(#rough)" };

const Arrow = ({ className = "", d = "M10 60 C50 10 110 10 150 40 M150 40 L126 38 M150 40 L142 18" }: { className?: string; d?: string }) => (
  <svg viewBox="0 0 160 80" className={className} aria-hidden>
    <path {...ink} d={d} />
  </svg>
);
const Circle = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 80" className={`pointer-events-none absolute ${className}`} preserveAspectRatio="none" aria-hidden>
    <path {...ink} stroke="var(--accent)" d="M20 40 C20 12 180 8 188 36 C196 66 40 76 14 50 C4 38 30 18 70 14" />
  </svg>
);
const Underline = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 300 16" className={className} preserveAspectRatio="none" aria-hidden>
    <path {...ink} stroke="var(--accent)" d="M4 10 C80 2 200 2 296 8 M40 14 C120 8 200 9 260 12" />
  </svg>
);
const Check = ({ on = true }: { on?: boolean }) => (
  <svg viewBox="0 0 28 28" className="size-6 shrink-0" aria-hidden>
    <path {...ink} d="M4 5 L24 4 L25 24 L4 25 Z" />
    {on && <path {...ink} stroke="var(--accent)" strokeWidth={3} d="M7 14 L12 20 L26 2" />}
  </svg>
);

const Page = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:pl-24 md:py-28 ${className}`}>{children}</section>
);

const Heading = ({ n, children, note }: { n: string; children: React.ReactNode; note?: string }) => (
  <Reveal>
    <div className="relative mb-10">
      <p className="pencil text-lg text-accent">— page {n}</p>
      <h2 className="hand text-6xl font-bold leading-[0.95] sm:text-7xl">{children}</h2>
      <Underline className="mt-1 h-4 w-64" />
      {note && <p className="hand absolute -top-2 right-0 hidden rotate-6 text-2xl text-accent md:block">{note}</p>}
    </div>
  </Reveal>
);

/* ---------------- Hero: page one ---------------- */
export function SketchHero() {
  return (
    <section className="page-surface relative flex h-[100svh] items-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pt-16 sm:pl-24 md:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="pencil text-lg text-subtle">Mon · notes to self · page 1</p>
          <h1 className="hand mt-2 text-6xl font-bold leading-[0.95] sm:text-7xl md:text-8xl">
            Hi, I&apos;m Taha 👋
          </h1>
          <p className="hand mt-4 text-4xl leading-tight sm:text-5xl">
            I build AI{" "}
            <span className="relative inline-block">
              demos
              <svg viewBox="0 0 100 30" className="absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2" preserveAspectRatio="none" aria-hidden>
                <path {...ink} stroke="var(--accent)" strokeWidth={3.5} d="M2 18 C30 8 70 22 98 10 M4 10 C40 20 70 6 96 18" />
              </svg>
              <span className="absolute -top-8 left-2 -rotate-6 text-3xl text-accent">agents</span>
            </span>{" "}
            that hold up in <span className="accent-word">production.</span>
          </p>
          <ul className="pencil mt-8 space-y-1.5 text-xl">
            {[["prototype it on real data", true], ["evals from week one", true], ["trace every run", true], ["your project", false]].map(([t, on]) => (
              <li key={t as string} className="flex items-center gap-3">
                <Check on={on as boolean} />
                <span className={on ? "text-muted line-through decoration-accent/60" : "font-bold"}>{t as string}</span>
                {!on && <Arrow className="ml-1 h-8 w-16 -scale-x-100 text-accent" d="M10 40 C50 30 100 30 150 40 M10 40 L30 28 M10 40 L30 52" />}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#work" className="btn btn-primary">see my work →</a>
            <a href="#contact" className="btn btn-ghost">write to me</a>
          </div>
        </div>
        <div className="relative mx-auto hidden w-[300px] md:block">
          <div className="relative rotate-[4deg] bg-white p-3 pb-14 shadow-[0_18px_40px_-14px_#1d2a6b55]">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={profile.photo} alt={profile.name} fill sizes="300px" className="object-cover object-top" priority />
            </div>
            <p className="hand absolute inset-x-0 bottom-3 text-center text-2xl">me, probably reading a trace</p>
          </div>
          <div className="absolute -left-24 -top-20 flex items-end text-accent">
            <p className="hand w-40 -rotate-6 text-2xl leading-none">Lead AI/ML engineer, 6+ yrs</p>
            <Arrow className="-mb-6 h-12 w-24 rotate-[35deg]" />
          </div>
          <p className="hand absolute -bottom-12 right-0 rotate-3 text-xl text-subtle">Lahore, Pakistan ✈ worldwide</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About: a journal entry ---------------- */
export function SketchAbout() {
  const colors = ["#fff27a", "#ffc2d1", "#b9f0d7", "#c7dcff"];
  return (
    <Page>
      <Heading n="2" note="read this one!">The problem I solve</Heading>
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr]">
        <div className="pencil ruled relative text-xl text-fg">
          <span className="hand absolute -left-20 top-0 hidden -rotate-12 text-3xl text-accent sm:block">!!</span>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i}>
              <p className="mb-8">{i === 3 ? <span className="accent-word !font-[inherit]">{p}</span> : p}</p>
            </Reveal>
          ))}
        </div>
        <div>
          <Reveal>
            <div className="paper -rotate-1 p-6">
              <span className="tape -top-3 left-6 rotate-[-8deg] pink" />
              <p className="hand text-3xl font-bold">so, what I do:</p>
              <ul className="pencil mt-3 space-y-3 text-lg">
                {about.outcomes.map((o) => (
                  <li key={o} className="flex gap-3">
                    <Check />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-5">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="relative p-4 shadow-[0_8px_16px_-10px_#0005]" style={{ background: colors[i], transform: `rotate(${[-4, 3, 2, -3][i]}deg)` }}>
                  <p className="hand text-6xl font-bold leading-none">
                    {s.value}
                    {s.suffix}
                  </p>
                  <p className="pencil mt-1 text-sm leading-tight">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ---------------- Services: pinned index cards ---------------- */
export function SketchServices() {
  const pins = ["#e6403a", "#1f3a93", "#2f9e6b", "#f2b84b", "#a855f7", "#e6403a"];
  return (
    <Page>
      <Heading n="5">What people hire me for</Heading>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.05}>
            <div
              className="relative h-full bg-white px-5 pb-5 pt-8 shadow-[0_14px_24px_-14px_#1d2a6b66] transition-transform hover:rotate-0"
              style={{
                transform: `rotate(${[-2, 1.5, -1, 2, -1.5, 1][i]}deg)`,
                backgroundImage: "linear-gradient(#fff 0 34px, #e6403a55 34px 35.5px, transparent 35.5px), repeating-linear-gradient(transparent 0 27px, #1f3a9322 27px 28px)",
              }}
            >
              <span className="absolute left-1/2 top-2 size-4 -translate-x-1/2 rounded-full shadow-[1px_2px_0_#0004]" style={{ background: pins[i] }} />
              <h3 className="hand mt-2 text-3xl font-bold leading-[28px]">{s.title}</h3>
              <p className="pencil mt-2 text-[17px] leading-[28px]">{s.text}</p>
              <p className="pencil mt-2 text-sm leading-[28px] text-accent">↳ {s.tag}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="paper mt-14 max-w-2xl rotate-1 p-6">
          <span className="tape mint -top-3 right-10 rotate-6" />
          <p className="hand text-3xl font-bold">rules I stick to</p>
          <ol className="pencil mt-2 list-decimal space-y-1 pl-6 text-lg">
            {promises.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ol>
        </div>
      </Reveal>
    </Page>
  );
}

/* ---------------- Process: a hand-drawn flowchart ---------------- */
export function SketchProcess() {
  return (
    <Page>
      <Heading n="6">How a project goes</Heading>
      <div className="relative mx-auto max-w-3xl">
        {process.map((s, i) => (
          <Reveal key={s.q}>
            <div className={`relative flex ${i % 2 ? "justify-end" : "justify-start"}`}>
              <div className="rough-box w-full max-w-md bg-white/60 p-5">
                <p className="hand text-4xl font-bold leading-none text-accent">{i + 1}.</p>
                <h3 className="hand mt-1 text-3xl font-bold">{s.q}</h3>
                <p className="pencil mt-1 text-lg leading-snug">{s.text}</p>
              </div>
            </div>
            {i < process.length - 1 && (
              <Arrow
                className={`mx-auto my-2 h-20 w-40 text-fg ${i % 2 ? "-scale-x-100" : ""}`}
                d="M20 10 C40 60 110 30 130 70 M130 70 L112 60 M130 70 L134 50"
              />
            )}
          </Reveal>
        ))}
        <p className="hand mt-4 text-center text-3xl text-accent">…and repeat, every release ↺</p>
      </div>
    </Page>
  );
}

/* ---------------- Stack: the toolbox list ---------------- */
export function SketchStack() {
  return (
    <Page>
      <Heading n="7" note="(the ones I circled, I use daily)">My toolbox</Heading>
      <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 0.04}>
            <p className="hand text-3xl font-bold">{g.group}</p>
            <Underline className="h-3 w-40" />
            <ul className="pencil mt-2 flex flex-wrap gap-x-4 gap-y-2 text-lg">
              {g.items.map((it) => (
                <li key={it} className="relative">
                  {daily.includes(it) && <Circle className="-inset-x-3 -inset-y-2 h-[calc(100%+16px)] w-[calc(100%+24px)]" />}
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Page>
  );
}

/* ---------------- Contact: a letter ---------------- */
export function SketchContact() {
  const [copied, setCopied] = useState(false);
  return (
    <Page>
      <Reveal>
        <div className="paper relative mx-auto max-w-3xl -rotate-[0.6deg] p-8 sm:p-12">
          <span className="tape -top-3 left-10 -rotate-6" />
          <span className="tape pink -top-3 right-10 rotate-6" />
          {/* stamp */}
          <a
            href={`mailto:${profile.email}`}
            className="absolute right-6 top-6 hidden rotate-6 border-[3px] border-dotted border-accent p-2 text-center text-accent transition-transform hover:rotate-0 sm:block"
          >
            <span className="hand block text-2xl font-bold leading-none">AIR MAIL</span>
            <span className="pencil text-xs">click to send</span>
          </a>
          <p className="pencil text-lg text-subtle">Lahore, today</p>
          <p className="hand mt-6 text-4xl">Dear future collaborator,</p>
          <div className="pencil ruled mt-4 text-xl">
            <p>
              Got an AI idea stuck in <span className="accent-word !font-[inherit]">demo mode?</span> Tell me what you&apos;re trying to automate.
            </p>
            <p>I&apos;ll tell you honestly whether AI is the right tool, and what it would take to ship it properly.</p>
          </div>
          <p className="hand mt-6 text-3xl">talk soon,</p>
          <p className="hand -rotate-3 text-6xl font-bold text-accent">— Taha</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              {profile.email}
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
              {copied ? "copied ✓" : "copy email"}
            </button>
          </div>
          <p className="pencil mt-6 text-lg">
            p.s. I&apos;m on{" "}
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline decoration-wavy decoration-accent underline-offset-4">
              LinkedIn
            </a>{" "}
            too.
          </p>
        </div>
      </Reveal>
    </Page>
  );
}

/* ---------------- Footer ---------------- */
export function SketchFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:pl-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="hand text-5xl font-bold">the end of the notebook</p>
          <p className="pencil text-lg text-subtle">(for now) · © {new Date().getFullYear()} {profile.name}</p>
        </div>
        <div className="relative rotate-3 bg-[#fff27a] p-4 shadow-md">
          <span className="tape -top-3 left-1/2 -translate-x-1/2" />
          <p className="hand text-2xl leading-tight">tip: press ⌘K
            <br />
            anywhere ✍︎</p>
        </div>
      </div>
    </footer>
  );
}
