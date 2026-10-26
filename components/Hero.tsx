"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AgentCanvas from "./AgentCanvas";
import { profile } from "@/data/site";

// Illustrative trace lines, typed out under the headline
const TRACE = [
  { step: "router", text: "intent=compliance_review → compliance_agent" },
  { step: "retrieve", text: "hybrid_search(dense+bm25, k=20) → rerank → 5 chunks" },
  { step: "tool", text: "mcp:calc.ratio(liabilities, equity) → 1.84" },
  { step: "guard", text: "grounded ✓  pii ✓  schema ✓" },
  { step: "trace", text: "run logged to langfuse · eval score 0.94" },
];

function TraceTyper() {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);
  const current = TRACE[line];

  useEffect(() => {
    if (chars < current.text.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 22);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLine((l) => (l + 1) % TRACE.length);
      setChars(0);
    }, 1600);
    return () => clearTimeout(t);
  }, [chars, current.text.length]);

  return (
    <div className="card mx-auto mt-7 flex h-9 w-fit max-w-full items-center gap-2 overflow-hidden !rounded-full px-4 font-mono text-[11px] text-muted sm:text-xs">
      <span className="shrink-0 rounded bg-accent/15 px-1.5 py-0.5 text-accent">{current.step}</span>
      <span className="truncate">
        {current.text.slice(0, chars)}
        <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-accent" />
      </span>
    </div>
  );
}

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: profile.timezone }).format(new Date()));
    fmt();
    const id = setInterval(fmt, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time || "--:--"} PKT</span>;
}

/** Pins the hero while the page slides up over it, fading it as that happens */
export function HeroStage({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 900], [1, 0.92]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0.15]);
  const blur = useTransform(scrollY, [0, 900], ["blur(0px)", "blur(6px)"]);
  return (
    <div id="top" className="sticky top-0 h-[100svh]">
      <motion.div style={{ scale, opacity, filter: blur }} className="h-full">
        {children}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const words = ["I", "build", "AI", "agents"];

  return (
        <section
          className="page-surface relative flex h-[100svh] flex-col items-center justify-center overflow-hidden"
        >
          <div aria-hidden className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)]" />
          <AgentCanvas />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_44%_40%_at_50%_50%,var(--bg)_0%,color-mix(in_oklab,var(--bg)_75%,transparent)_50%,transparent_82%)]" />

          <div className="relative z-10 w-full max-w-3xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="short-hide mx-auto mb-6 w-fit"
            >
              <div className="relative">
                <div className="absolute -inset-1.5 animate-[spin_24s_linear_infinite] rounded-full border-2 border-dashed border-accent" />
                <Image src={profile.photo} alt={profile.name} width={96} height={96} priority className="relative size-20 rounded-full border-4 border-bg object-cover sm:size-24" />
                <span className="absolute bottom-1 right-1 flex size-4">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-4 rounded-full border-2 border-bg bg-accent" />
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted"
            >
              Hi, I&apos;m {profile.firstName} · {profile.role}
            </motion.p>

            <h1 className="display short-h1 text-[2.8rem] sm:text-6xl md:text-7xl">
              {words.map((w, i) => (
                <motion.span
                  key={w + i}
                  className="hero-word mr-[0.25em] inline-block"
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              ))}
              <br />
              <motion.span
                className="accent-word mt-2 inline-block text-balance text-[1.02em]"
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                that hold up in production.
              </motion.span>
            </h1>

            <motion.div className="short-hide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
              <TraceTyper />
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <a href="#work" className="btn btn-primary group">
                View my work
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a href="#contact" className="btn btn-ghost">
                Start a project
              </a>
            </motion.div>
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-6xl items-center justify-between px-6 font-mono text-[11px] uppercase tracking-widest text-subtle sm:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="hidden sm:inline">{profile.location}</span>
            <span className="flex items-center gap-2">
              <span className="h-8 w-px overflow-hidden bg-border">
                <motion.span className="block h-3 w-px bg-accent" animate={{ y: [-12, 32] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} />
              </span>
              Scroll
            </span>
            <span className="hidden sm:inline">
              <LocalTime />
            </span>
          </motion.div>
        </section>
  );
}
