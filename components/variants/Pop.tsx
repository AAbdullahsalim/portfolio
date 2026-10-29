"use client";

import Image from "next/image";
import { useState } from "react";
import { about, daily, process, profile, promises, services, stack, stats } from "@/data/site";
import { Reveal } from "../ui";

// Pop Art: the site as a comic book. Cover, panels, captions, bubbles.

const Burst = ({ children, fill = "#ffe600", className = "", size = 150 }: { children: React.ReactNode; fill?: string; className?: string; size?: number }) => (
  <div className={`relative grid place-items-center ${className}`} style={{ width: `min(${size}px, 44vw)`, height: `min(${size}px, 44vw)` }}>
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      <path
        d="M100 4 L118 52 L166 22 L152 76 L198 88 L156 112 L186 158 L132 148 L118 198 L96 156 L58 192 L60 140 L8 150 L42 108 L2 76 L56 70 L36 22 L84 48Z"
        fill={fill}
        stroke="#111"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
    <div className="relative text-center">{children}</div>
  </div>
);

const Shell = ({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) => (
  <section id={id} className={`relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28 ${className}`}>
    {children}
  </section>
);

const ChapterTitle = ({ n, title }: { n: string; title: string }) => (
  <Reveal>
    <div className="mb-10 flex flex-wrap items-center gap-4">
      <span className="comic-caption -rotate-2 !bg-black !text-[#ffe600]">Chapter {n}</span>
      <h2 className="comic-title text-5xl sm:text-7xl">{title}</h2>
    </div>
  </Reveal>
);

/* ---------------- Cover ---------------- */
export function PopHero() {
  return (
    <section className="page-surface relative flex h-[100svh] flex-col overflow-hidden pt-[76px]">
      {/* Masthead */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between border-y-4 border-black bg-[#111] px-4 py-1.5 font-[family-name:var(--font-archivo)] text-[11px] font-black uppercase tracking-widest text-[#ffe600] sm:text-xs">
        <span>Issue #01</span>
        <span className="hidden sm:inline">The adventures of a Lead AI/ML Engineer</span>
        <span>Lahore · 6+ yrs</span>
      </div>
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-6 sm:px-6">
        <h1 className="comic-title mt-3 -rotate-2 text-center text-[19vw] sm:text-[11rem] md:text-[12.5rem]">TAHA UMAR</h1>
        <div className="relative mt-2 grid min-h-0 flex-1 grid-cols-1 items-center gap-6 md:grid-cols-[0.9fr_1.1fr]">
          {/* Hero panel */}
          <div className="relative mx-auto hidden h-[min(430px,44vh)] w-full max-w-[360px] md:block">
            <div className="comic-panel absolute inset-0 rotate-[-2deg] bg-[#1e5bff]">
              <div className="absolute inset-0 bg-[repeating-conic-gradient(from_0deg_at_50%_60%,#1e5bff_0deg_10deg,#3b74ff_10deg_20deg)]" />
              <Image src={profile.photo} alt={profile.name} fill sizes="400px" className="halftone-img object-cover object-top" priority />
              <div className="halftone-over absolute inset-0" />
            </div>
            <Burst className="absolute -right-8 -top-6 rotate-12" size={120} fill="#ff2e2e">
              <span className="font-[family-name:var(--font-bangers)] text-3xl leading-none text-white [-webkit-text-stroke:1.5px_#111]">
                6+
                <br />
                YRS!
              </span>
            </Burst>
          </div>
          {/* Bubble + actions */}
          <div className="flex flex-col items-start gap-5">
            <span className="comic-caption rotate-1">Meanwhile, in production…</span>
            <div className="bubble tail-left text-2xl leading-tight sm:text-4xl md:text-[2.6rem]" style={{ ["--tail-x" as string]: "50px" }}>
              I build AI agents that <span className="bg-[#ffe600] px-1">hold up</span> in production!
            </div>
            <p className="comic-caption !bg-white">Lead AI/ML Engineer · LangGraph · MCP · RAG · LLMOps</p>
            <div className="flex flex-wrap gap-3">
              <a href="#work" className="btn btn-primary">See the work!</a>
              <a href="#contact" className="btn btn-ghost">Hire this hero</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About: a comic page ---------------- */
export function PopAbout() {
  return (
    <Shell>
      <ChapterTitle n="1" title="The problem I solve" />
      <div className="grid gap-5 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <div className="comic-panel h-full bg-[#9fd3ff] p-6">
            <span className="comic-caption">Every AI project, everywhere…</span>
            <p className="mt-4 font-[family-name:var(--font-archivo)] text-xl font-extrabold uppercase leading-snug sm:text-2xl">{about.paragraphs[0]}</p>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="comic-panel grid h-full place-items-center bg-[#ff4fb4] p-6">
            <Burst size={210}>
              <span className="font-[family-name:var(--font-bangers)] text-[2.6rem] leading-[0.9] text-white [-webkit-text-stroke:2px_#111]">
                That&apos;s
                <br />
                where I
                <br />
                come in!
              </span>
            </Burst>
          </div>
        </Reveal>
        <Reveal>
          <div className="comic-panel h-full p-6">
            <span className="comic-caption">Our hero</span>
            <p className="mt-3 font-[family-name:var(--font-archivo)] text-[15px] font-semibold leading-relaxed">{about.paragraphs[1]}</p>
            <p className="mt-3 font-[family-name:var(--font-archivo)] text-[15px] leading-relaxed">{about.paragraphs[2]}</p>
          </div>
        </Reveal>
        <Reveal delay={0.05} className="md:col-span-2">
          <div className="comic-panel h-full bg-[#fff1b8] p-6 pb-10">
            <div className="bubble text-lg leading-snug sm:text-xl" style={{ ["--tail-x" as string]: "70%" }}>
              {about.paragraphs[3]}
            </div>
            <p className="mt-10 font-[family-name:var(--font-archivo)] text-[15px] font-semibold">{about.paragraphs[4]}</p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="comic-panel mt-5 p-6">
          <span className="comic-caption !bg-[#ff2e2e] !text-white">Super powers</span>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {about.outcomes.map((o) => (
              <li key={o} className="flex gap-3 font-[family-name:var(--font-archivo)] text-[15px] font-bold uppercase">
                <span className="text-xl text-[#ff2e2e]">★</span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 place-items-center gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <Burst size={190} fill={["#ffe600", "#9fd3ff", "#ff4fb4", "#ff2e2e"][i]} className={i % 2 ? "rotate-6" : "-rotate-6"}>
              <span className="block font-[family-name:var(--font-bangers)] text-5xl leading-none text-white [-webkit-text-stroke:2px_#111] sm:text-6xl">
                {s.value}
                {s.suffix}
              </span>
              <span className="mx-auto mt-1 block max-w-[86px] font-[family-name:var(--font-archivo)] text-[9px] font-black uppercase leading-tight sm:max-w-[110px] sm:text-[10px]">{s.label}</span>
            </Burst>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- Services: trading cards ---------------- */
export function PopServices() {
  const colors = ["#ff2e2e", "#1e5bff", "#ffe600", "#ff4fb4", "#00b37e", "#ff8a00"];
  return (
    <Shell>
      <ChapterTitle n="4" title="Hero powers for hire" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.05}>
            <div className={`group h-full rounded-2xl border-4 border-black bg-white p-2 shadow-[8px_8px_0_#111] transition-transform hover:-translate-y-1 ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
              <div className="flex h-full flex-col rounded-xl border-[3px] border-black" style={{ background: colors[i] }}>
                <div className="flex items-center justify-between border-b-[3px] border-black bg-white px-3 py-1.5 font-[family-name:var(--font-archivo)] text-[11px] font-black uppercase">
                  <span>Power #{String(i + 1).padStart(2, "0")}</span>
                  <span>★★★</span>
                </div>
                <div className="relative h-28 overflow-hidden border-b-[3px] border-black">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,#0003_2px,transparent_2.5px)] bg-[length:10px_10px]" />
                  <p className="absolute inset-0 grid place-items-center font-[family-name:var(--font-bangers)] text-[2.6rem] leading-none text-white [-webkit-text-stroke:2px_#111] [text-shadow:4px_4px_0_#111]">
                    {s.title.split(" ")[0].toUpperCase()}!
                  </p>
                </div>
                <div className="flex flex-1 flex-col bg-white p-4">
                  <h3 className="font-[family-name:var(--font-bangers)] text-3xl tracking-wide">{s.title}</h3>
                  <p className="mt-1 font-[family-name:var(--font-archivo)] text-sm leading-relaxed">{s.text}</p>
                  <p className="mt-auto border-t-2 border-dashed border-black pt-2 font-[family-name:var(--font-archivo)] text-[11px] font-black uppercase">Gadgets: {s.tag}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="comic-panel mt-10 bg-[#fff1b8] p-6">
          <span className="comic-caption !bg-black !text-white">The hero&apos;s code</span>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {promises.map((p) => (
              <li key={p} className="font-[family-name:var(--font-archivo)] text-[15px] font-bold">✔ {p}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Shell>
  );
}

/* ---------------- Process: a comic strip ---------------- */
export function PopProcess() {
  const sfx = ["HMM?", "ZAP!", "BOOM!", "BEEP!"];
  const bgs = ["#9fd3ff", "#ffe600", "#ff4fb4", "#ffffff"];
  return (
    <Shell>
      <ChapterTitle n="5" title="How every mission goes" />
      <div className="grid gap-4 border-4 border-black bg-black p-4 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((s, i) => (
          <Reveal key={s.q} delay={i * 0.06}>
            <div className="relative flex h-full min-h-[320px] flex-col overflow-hidden border-[3px] border-black p-4" style={{ background: bgs[i] }}>
              <span className="pointer-events-none absolute -right-2 bottom-2 rotate-[-10deg] font-[family-name:var(--font-bangers)] text-7xl text-white/80 [-webkit-text-stroke:2px_#111]">{sfx[i]}</span>
              <span className="comic-caption w-fit">Panel {i + 1}</span>
              <div className="bubble mt-4 text-base leading-snug" style={{ ["--tail-x" as string]: "30px" }}>
                {s.q}
              </div>
              <p className="relative mt-8 border-[3px] border-black bg-white p-3 font-[family-name:var(--font-archivo)] text-[13px] font-semibold leading-snug">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

/* ---------------- Stack: a utility belt of stickers ---------------- */
export function PopStack() {
  const colors = ["#ffe600", "#9fd3ff", "#ff4fb4", "#fff", "#ff8a00", "#b8f2c9"];
  return (
    <Shell>
      <ChapterTitle n="6" title="The utility belt" />
      <div className="comic-panel bg-[#1e5bff] p-6 sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff33_2px,transparent_2.5px)] bg-[length:14px_14px]" />
        <div className="relative space-y-6">
          {stack.map((g, gi) => (
            <div key={g.group}>
              <span className="comic-caption">{g.group}</span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {g.items.map((it, k) => (
                  <span
                    key={it}
                    className="rounded-md border-[3px] border-black px-3 py-1 font-[family-name:var(--font-archivo)] text-sm font-black uppercase shadow-[3px_3px_0_#111] transition-transform hover:scale-110"
                    style={{ background: colors[(gi + k) % colors.length], transform: `rotate(${((k * 7 + gi * 3) % 9) - 4}deg)` }}
                  >
                    {daily.includes(it) ? "★ " : ""}
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 font-[family-name:var(--font-archivo)] text-xs font-bold uppercase">★ = used every single day</p>
    </Shell>
  );
}

/* ---------------- Contact ---------------- */
export function PopContact() {
  const [copied, setCopied] = useState(false);
  return (
    <Shell>
      <div className="comic-panel grid gap-8 bg-[#ff2e2e] p-6 sm:p-10 md:grid-cols-[1.3fr_1fr]">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#0000002a_3px,transparent_3.5px)] bg-[length:16px_16px]" />
        <div className="relative">
          <span className="comic-caption">The final chapter</span>
          <div className="bubble mt-5 text-3xl leading-tight sm:text-5xl" style={{ ["--tail-x" as string]: "60px" }}>
            Got an AI idea stuck in <span className="bg-[#ffe600] px-1">demo mode?</span>
          </div>
          <p className="mt-10 max-w-md border-[3px] border-black bg-white p-3 font-[family-name:var(--font-archivo)] text-sm font-semibold">
            Tell me what you&apos;re trying to automate. I&apos;ll tell you honestly whether AI is the right tool, and what it would take to ship it.
          </p>
        </div>
        <div className="relative flex flex-col justify-center gap-4">
          <a href={`mailto:${profile.email}`} className="block -rotate-2 border-4 border-black bg-[#ffe600] p-5 text-center shadow-[6px_6px_0_#111] transition-transform hover:rotate-0">
            <span className="block font-[family-name:var(--font-bangers)] text-4xl">Send a signal!</span>
            <span className="font-[family-name:var(--font-archivo)] text-sm font-bold">{profile.email}</span>
          </a>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(profile.email);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="btn btn-ghost flex-1"
            >
              {copied ? "Copied! ✓" : "Copy email"}
            </button>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost flex-1 !bg-white">
              LinkedIn ↗
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost flex-1 !bg-white">
              GitHub ↗
            </a>
          </div>
          <a href={profile.phoneHref} className="block rotate-1 border-4 border-black bg-white p-4 text-center shadow-[6px_6px_0_#111] transition-transform hover:rotate-0">
            <span className="block font-[family-name:var(--font-bangers)] text-3xl">Ring ring! ☎</span>
            <span className="font-[family-name:var(--font-archivo)] text-sm font-bold">{profile.phone}</span>
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost !bg-[#25d366]">
            WhatsApp ↗
          </a>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Footer ---------------- */
export function PopFooter() {
  return (
    <footer className="border-t-4 border-black bg-[#ffe600]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-16 text-center">
        <p className="comic-title text-7xl sm:text-8xl">THE END?</p>
        <p className="comic-caption !bg-white">To be continued… in your project</p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 font-[family-name:var(--font-archivo)] text-sm font-black uppercase">
          <a href={`mailto:${profile.email}`} className="underline decoration-4 underline-offset-4">Email</a>
          <a href={profile.phoneHref} className="underline decoration-4 underline-offset-4">Call</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline decoration-4 underline-offset-4">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="underline decoration-4 underline-offset-4">GitHub</a>
          <a href="#top" className="underline decoration-4 underline-offset-4">Back to the cover</a>
        </div>
        <p className="font-[family-name:var(--font-archivo)] text-xs font-bold">© {new Date().getFullYear()} {profile.name} · Press ⌘K anywhere</p>
      </div>
    </footer>
  );
}
