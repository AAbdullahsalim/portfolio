"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/site";
import FlowDiagram from "./Flow";
import GraphView from "./GraphView";
import { ProductScreen, URLS } from "./Screens";
import { Container, SectionHeader } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");
const INTRO = 130; // vh of scrolling for the zoom-in
const STEP = 70; // vh of scrolling per walkthrough step
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const seg = (v: number, a: number, b: number) => clamp((v - a) / (b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

type Geo = { W: number; H: number; desktop: boolean; fw: number; fh: number; start: number; s: number; x: number; y: number };

function measure(): Geo {
  const W = window.innerWidth, H = window.innerHeight;
  const desktop = W >= 1024;
  if (desktop) {
    // Frame fills the screen when zoomed in, then settles top-left
    const s = Math.min((W * 0.58 - 24) / W, (H - 300) / H);
    return { W, H, desktop, fw: W, fh: H, start: 0.62, s, x: -(W - W * s) / 2 + 24, y: 88 - (H - H * s) / 2 };
  }
  const fh = Math.min(H * 0.5, W * 0.62 + 36);
  return { W, H, desktop, fw: W, fh, start: 0.86, s: 1, x: 0, y: 72 - (H - fh) / 2 };
}

function ProjectScrolly({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const S = p.steps.length;
  const totalVh = INTRO + S * STEP + 100;
  const dist = totalVh - 100;
  const [geo, setGeo] = useState<Geo | null>(null);
  const g = useRef<Geo | null>(null);
  const [step, setStep] = useState(-1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useEffect(() => {
    const on = () => {
      g.current = measure();
      setGeo(g.current);
    };
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const v = useTransform(scrollYProgress, (x) => x * dist);
  const zoom = (x: number) => ease(seg(x, 0, 55));
  const settle = (x: number) => ease(seg(x, 72, 110));
  const scale = useTransform(v, (x) => {
    const G = g.current;
    if (!G) return 1;
    return mix(mix(G.start, 1, zoom(x)), G.s, settle(x));
  });
  const tx = useTransform(v, (x) => (g.current ? settle(x) * g.current.x : 0));
  const ty = useTransform(v, (x) => (g.current ? settle(x) * g.current.y : 0));
  const radius = useTransform(v, (x) => mix(mix(22, 0, zoom(x)), 14, settle(x)));
  const introOpacity = useTransform(v, (x) => 1 - seg(x, 2, 32));
  const introY = useTransform(v, (x) => seg(x, 2, 32) * -30);
  const panelOpacity = useTransform(v, (x) => seg(x, 95, 122));
  const panelX = useTransform(v, (x) => (1 - seg(x, 95, 122)) * 60);
  const hintOpacity = useTransform(v, (x) => seg(x, 40, 55) * (1 - seg(x, 62, 72)));

  useMotionValueEvent(v, "change", (x) => {
    const k = x < INTRO - 10 ? -1 : Math.min(S - 1, Math.floor((x - (INTRO - 10)) / STEP));
    setStep((cur) => (cur === k ? cur : k));
  });

  const active = step >= 0 ? p.steps[step] : null;
  const dark = p.mockup === "relay";

  // Positions of the text and diagram areas once the frame has settled
  const textTop = geo ? (geo.desktop ? 88 + geo.H * geo.s + 22 : 72 + geo.fh + 14) : 0;
  const frameW = geo ? geo.W * geo.s : 0;

  return (
    <section ref={ref} id={`project-${p.slug}`} data-section={`project-${p.slug}`} className="relative" style={{ height: `${totalVh}vh` }} aria-label={p.title}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Intro text under the window */}
        <motion.div style={{ opacity: introOpacity, y: introY }} className="pointer-events-none absolute inset-x-0 bottom-[5vh] z-0 mx-auto max-w-6xl px-6 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2 !text-[11px]">
                {pad(i + 1)} / {pad(projects.length)} · {p.category} · {p.year}
              </p>
              <h3 className="display text-5xl sm:text-7xl">{p.title}</h3>
            </div>
            <p className="max-w-md text-[15px] leading-snug text-muted">{p.tagline}</p>
          </div>
        </motion.div>

        {/* The website window */}
        {geo && (
          <motion.div
            className="card absolute left-0 top-0 z-10 flex origin-center flex-col overflow-hidden will-change-transform"
            style={{
              width: geo.fw,
              height: geo.fh,
              top: (geo.H - geo.fh) / 2,
              scale,
              x: tx,
              y: ty,
              borderRadius: radius,
            }}
          >
            <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border bg-surface px-3">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="mx-auto flex items-center gap-1.5 rounded-md bg-elevated px-3 py-0.5 font-mono text-[11px] text-muted">
                <span aria-hidden>🔒</span>
                {URLS[p.mockup]}
              </span>
            </div>
            <div className={`min-h-0 flex-1 ${dark ? "bg-[#0b0b12]" : "bg-[#f6f7f9]"}`}>
              <ProductScreen project={p} region={active?.region ?? null} step={step} />
            </div>
            <motion.p style={{ opacity: hintOpacity }} className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/75 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-white">
              You&apos;re inside {p.title} · keep scrolling
            </motion.p>
          </motion.div>
        )}

        {/* Step text */}
        {geo && (
          <motion.div
            style={{ opacity: panelOpacity, top: textTop, left: geo.desktop ? 24 : 16, width: geo.desktop ? frameW : geo.W - 32 }}
            className="absolute z-20"
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                {p.title} · step {Math.max(step, 0) + 1}/{S}
              </span>
              <span className="flex gap-1">
                {p.steps.map((_, k) => (
                  <span key={k} className={`h-1 rounded-full transition-all duration-300 ${k === step ? "w-6 bg-accent" : k < step ? "w-2 bg-accent/60" : "w-2 bg-border-strong"}`} />
                ))}
              </span>
            </div>
            <AnimatePresence mode="wait">
              {active && (
                <motion.div key={step} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <h4 className="display text-2xl sm:text-3xl">{active.title}</h4>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">{active.text}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {geo.desktop && step === S - 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="mr-1 font-mono text-[11px] text-subtle">{p.role}</span>
                {p.tech.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Workflow + graph, lighting up with each step */}
        {geo && (
          <motion.div
            style={{
              opacity: panelOpacity,
              x: panelX,
              ...(geo.desktop
                ? { top: 88, bottom: 24, left: frameW + 48, right: 24 }
                : { top: textTop + 150, bottom: 16, left: 16, right: 16 }),
            }}
            className="absolute z-20 flex flex-col gap-3"
          >
            <div className="card flex min-h-0 flex-1 flex-col overflow-hidden">
              <p className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10.5px] uppercase tracking-widest text-subtle">
                Workflow <span className="normal-case tracking-normal">{active ? `${active.nodes.length} components active` : ""}</span>
              </p>
              <div className="min-h-0 flex-1 p-2">
                <FlowDiagram flow={p.flow} title={p.title} highlight={active?.nodes} compact />
              </div>
            </div>
            {geo.desktop && (
              <div className="card flex min-h-0 flex-1 flex-col overflow-hidden">
                <p className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[10.5px] uppercase tracking-widest text-subtle">
                  Graph view <span className="normal-case tracking-normal">drag the nodes</span>
                </p>
                <div className="min-h-0 flex-1">
                  <GraphView project={p} highlight={active?.nodes} compact />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default function Work() {
  return (
    <div id="work" data-section="work" className="relative scroll-mt-24">
      <Container className="py-24 md:py-32">
        <SectionHeader eyebrow="Selected work" title="Step inside what I've" accent="shipped" sub="Six products. Scroll into each one: the interface opens up, and every part lights up in the workflow and the graph as it's explained." />
        <nav aria-label="Projects" className="mt-8 flex flex-wrap gap-2">
          {projects.map((p, i) => (
            <a key={p.slug} href={`#project-${p.slug}`} className="chip hover:!text-fg">
              {pad(i + 1)} {p.title}
            </a>
          ))}
        </nav>
      </Container>
      {projects.map((p, i) => (
        <ProjectScrolly key={p.slug} p={p} i={i} />
      ))}
    </div>
  );
}
