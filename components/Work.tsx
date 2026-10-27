"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/site";
import FlowDiagram from "./Flow";
import GraphView from "./GraphView";
import { ProductScreen, URLS } from "./Screens";
import { Container, SectionHeader } from "./ui";
import { scrollToSection } from "./theme";

const pad = (n: number) => String(n).padStart(2, "0");
const STEP_DURATION = 4500; // 4.5s per step

function ProjectPlayer({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const S = p.steps.length;
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mobileTab, setMobileTab] = useState<"screen" | "workflow" | "graph">("screen");
  const isInView = useInView(ref, { amount: 0.25 });

  const nextSlug = i < projects.length - 1 ? `project-${projects[i + 1].slug}` : "services";
  const active = p.steps[step];
  const dark = p.mockup === "relay";

  // Auto-advance step timer
  useEffect(() => {
    if (!isInView || !isPlaying) return;

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const frac = Math.min(1, elapsed / STEP_DURATION);
      setProgress(frac);

      if (frac >= 1) {
        setStep((cur) => (cur + 1) % S);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, isPlaying, step, S]);

  const jumpToStep = (idx: number) => {
    setStep(idx);
    setProgress(0);
  };

  return (
    <article
      ref={ref}
      id={`project-${p.slug}`}
      data-section={`project-${p.slug}`}
      className="relative scroll-mt-24 my-8 md:my-14 mx-4 sm:mx-6 lg:mx-8 card overflow-hidden flex flex-col justify-between lg:h-[86vh] lg:min-h-[720px] lg:max-h-[880px] shadow-2xl border border-border"
      aria-label={p.title}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/80 px-4 py-3 sm:px-6 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="display text-2xl font-bold text-accent sm:text-3xl leading-none">
            {pad(i + 1)}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg text-fg">{p.title}</h3>
              <span className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent font-semibold">
                {p.category}
              </span>
            </div>
            <p className="hidden sm:block text-xs text-muted line-clamp-1">{p.tagline}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tech tags on large screens */}
          <div className="hidden xl:flex items-center gap-1.5 mr-2">
            {p.tech.slice(0, 4).map((t) => (
              <span key={t} className="chip !py-0.5 !text-[10px]">
                {t}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection(`#${nextSlug}`)}
            className="flex items-center gap-1 rounded-full border border-border bg-elevated px-3 py-1 font-mono text-xs text-muted hover:border-accent hover:text-accent transition-all active:scale-95"
            title={i < projects.length - 1 ? "Skip to next project" : "Skip to Services"}
          >
            <span>{i < projects.length - 1 ? "Skip project ↓" : "To Services ↓"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden border-b border-border bg-elevated/50 p-1">
        {(["screen", "workflow", "graph"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setMobileTab(tab)}
            className={`flex-1 rounded-lg py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all ${
              mobileTab === tab ? "bg-accent text-black font-bold shadow-sm" : "text-muted hover:text-fg"
            }`}
          >
            {tab === "screen" ? "Interface" : tab === "workflow" ? "Workflow" : "Graph"}
          </button>
        ))}
      </div>

      {/* Main Content Body */}
      <div className="relative lg:flex-1 lg:min-h-[440px] p-2.5 sm:p-5 lg:grid lg:grid-cols-[1.25fr_0.75fr] gap-4 overflow-hidden">
        {/* Left: Product Screen Window */}
        <div
          className={`lg:h-full lg:min-h-[400px] lg:flex-1 flex-col rounded-2xl border border-border overflow-hidden shadow-lg ${
            mobileTab === "screen" ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Browser Mockup Chrome */}
          <div className="flex h-9 shrink-0 items-center justify-between border-b border-border bg-surface px-3">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="flex items-center gap-1.5 rounded-md bg-elevated px-3 py-0.5 font-mono text-[11px] text-muted max-w-[280px] truncate">
              <span aria-hidden>🔒</span>
              {URLS[p.mockup] || `app.${p.slug}.io`}
            </span>
            <span className="font-mono text-[10px] text-subtle uppercase">
              Step {step + 1}/{S}
            </span>
          </div>

          {/* Interactive Screen View */}
          <div className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] lg:flex-1 overflow-hidden ${dark ? "bg-[#0b0b12]" : "bg-[#f6f7f9]"}`}>
            <ProductScreen project={p} region={active?.region ?? null} step={step} />
          </div>
        </div>

        {/* Right: Workflow + Graph View Cards */}
        <div
          className={`h-full flex-col gap-3 min-h-0 ${
            mobileTab !== "screen" ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Workflow Diagram Card */}
          <div
            className={`card flex min-h-0 flex-1 flex-col overflow-hidden ${
              mobileTab === "graph" ? "hidden lg:flex" : "flex"
            }`}
          >
            <div className="flex items-center justify-between border-b border-border px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-wider text-subtle bg-surface">
              <span className="font-semibold text-fg">Workflow Pipeline</span>
              <span className="text-accent normal-case font-medium">
                {active?.nodes ? `${active.nodes.length} nodes active` : "Interactive"}
              </span>
            </div>
            <div className="min-h-0 flex-1 p-2 bg-elevated/30">
              <FlowDiagram flow={p.flow} title={p.title} highlight={active?.nodes} compact />
            </div>
          </div>

          {/* Interactive Graph View Card */}
          <div
            className={`card flex min-h-0 flex-1 flex-col overflow-hidden ${
              mobileTab === "workflow" ? "hidden lg:flex" : "flex"
            }`}
          >
            <div className="flex items-center justify-between border-b border-border px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-wider text-subtle bg-surface">
              <span className="font-semibold text-fg">Knowledge Graph</span>
              <span className="text-muted normal-case text-[10px]">drag nodes</span>
            </div>
            <div className="min-h-0 flex-1 bg-elevated/30">
              <GraphView project={p} highlight={active?.nodes} compact />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="border-t border-border bg-surface/90 px-4 py-3 sm:px-6 backdrop-blur-md">
        {/* Segmented Stories Progress Bar */}
        <div className="mb-2.5 flex items-center gap-1.5 w-full">
          {p.steps.map((_, k) => (
            <button
              key={k}
              type="button"
              onClick={() => jumpToStep(k)}
              className="relative h-1.5 flex-1 rounded-full bg-border overflow-hidden transition-all hover:h-2"
              title={`Jump to step ${k + 1}`}
              aria-label={`Jump to step ${k + 1}`}
            >
              <div
                className="h-full bg-accent transition-all duration-100"
                style={{
                  width: k < step ? "100%" : k === step ? `${progress * 100}%` : "0%",
                }}
              />
            </button>
          ))}
        </div>

        {/* Controls & Active Step Explanation */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Step Selector & Play/Pause */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 rounded-full bg-elevated border border-border px-3 py-1 font-mono text-xs text-fg hover:border-accent transition-all active:scale-95"
            >
              <span>{isPlaying ? "⏸" : "▶"}</span>
              <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
            </button>

            <button
              type="button"
              onClick={() => jumpToStep((step - 1 + S) % S)}
              className="size-7 rounded-full bg-elevated border border-border flex items-center justify-center font-mono text-xs hover:border-accent transition-transform active:scale-90"
              aria-label="Previous step"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => jumpToStep((step + 1) % S)}
              className="size-7 rounded-full bg-elevated border border-border flex items-center justify-center font-mono text-xs hover:border-accent transition-transform active:scale-90"
              aria-label="Next step"
            >
              →
            </button>

            {/* Direct Step Pills */}
            <div className="hidden sm:flex items-center gap-1 ml-1">
              {p.steps.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => jumpToStep(k)}
                  className={`size-6 rounded-md font-mono text-[11px] font-semibold transition-all ${
                    k === step
                      ? "bg-accent text-black scale-105 shadow-sm"
                      : "bg-elevated text-muted hover:text-fg hover:bg-surface border border-border"
                  }`}
                >
                  {k + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Details */}
          <div className="flex-1 min-w-[200px] text-right sm:text-left sm:ml-4">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-semibold text-xs sm:text-sm text-fg line-clamp-1">
                    <span className="font-mono text-accent mr-1.5">[{step + 1}/{S}]</span>
                    {active.title}
                  </p>
                  <p className="text-[11px] sm:text-xs text-muted line-clamp-1 sm:line-clamp-2">
                    {active.text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" data-section="work" className="relative scroll-mt-24">
      <Container className="pt-20 pb-8 md:pt-28 md:pb-12">
        <SectionHeader
          eyebrow="Selected work"
          title="Step inside what I've"
          accent="shipped"
          sub="Six products. Interactive players step through real workflows, live interfaces, and knowledge graphs without scroll-locking."
        />
        {/* Quick jump navigation chips */}
        <nav aria-label="Projects navigation" className="mt-6 flex flex-wrap gap-2">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => scrollToSection(`#project-${p.slug}`)}
              className="chip hover:!text-fg transition-all active:scale-95 cursor-pointer"
            >
              <span className="font-bold text-accent mr-1">{pad(i + 1)}</span>
              {p.title}
            </button>
          ))}
        </nav>
      </Container>

      {/* Render each project as a self-contained player */}
      <div className="space-y-4">
        {projects.map((p, i) => (
          <ProjectPlayer key={p.slug} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
