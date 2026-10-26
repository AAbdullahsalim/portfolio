"use client";

import { AnimatePresence, animate, motion, useInView, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { experience, type Role } from "@/data/site";
import { Container, Eyebrow } from "./ui";

/* ---------- Disc artwork, one composition per company ---------- */

function RimText({ text, id }: { text: string; id: string }) {
  return (
    <>
      <defs>
        <path id={id} d="M200 200 m-168 0 a168 168 0 1 1 336 0 a168 168 0 1 1 -336 0" />
      </defs>
      <text fontSize="11" letterSpacing="3" fill="currentColor" opacity="0.75" fontFamily="var(--font-label)">
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
    </>
  );
}

function DiscArt({ role, index }: { role: Role; index: number }) {
  const rim = `${role.title.toUpperCase()} · ${role.period.toUpperCase()} · ${role.place.toUpperCase()} · `;
  const id = `rim-${index}`;
  const common = (
    <>
      <RimText text={rim + rim} id={id} />
      <text x="200" y="300" textAnchor="middle" className="display" fontSize="34" fill="currentColor">
        {role.company}
      </text>
      <text x="200" y="324" textAnchor="middle" fontSize="10" letterSpacing="4" fill="currentColor" opacity="0.7" fontFamily="var(--font-label)">
        TAHA UMAR
      </text>
    </>
  );

  // Uploaded artwork: full-bleed, or a logo printed like a CD label
  if (role.image?.fit === "cover")
    return (
      <svg viewBox="0 0 400 400" className="h-full w-full" style={{ color: "#fff" }}>
        <image href={role.image.src} x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid slice" />
        <rect y="250" width="400" height="150" fill={`url(#fade-${index})`} />
        <defs>
          <linearGradient id={`fade-${index}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        {common}
      </svg>
    );
  if (role.image?.fit === "logo")
    return (
      <svg viewBox="0 0 400 400" className="h-full w-full" style={{ color: "#1d1d1f" }}>
        <rect width="400" height="400" fill={role.image.bg ?? "#f4f4f2"} />
        {[176, 150].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#00000010" strokeWidth="1.5" />
        ))}
        <defs>
          <radialGradient id={`lg-${index}`}>
            <stop offset="0.62" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id={`lm-${index}`}>
            <rect x="115" y="30" width="170" height="132" fill={`url(#lg-${index})`} />
          </mask>
        </defs>
        <image href={role.image.src} x="115" y="30" width="170" height="132" preserveAspectRatio="xMidYMid meet" mask={`url(#lm-${index})`} style={{ mixBlendMode: "multiply" }} />
        {common}
      </svg>
    );

  switch (role.art) {
    case "prism":
      return (
        <svg viewBox="0 0 400 400" className="h-full w-full" style={{ color: "var(--fg)" }}>
          <rect width="400" height="400" fill="var(--elevated)" />
          <path d="M0 150 L170 165" stroke="var(--fg)" strokeWidth="5" />
          {["var(--accent)", "var(--accent-4)", "var(--accent-2)", "var(--accent-3)"].map((c, i) => (
            <path key={c} d={`M205 168 L400 ${120 + i * 26}`} stroke={c} strokeWidth="9" />
          ))}
          <path d="M140 230 L200 90 L260 230Z" fill="var(--surface)" stroke="var(--fg)" strokeWidth="4" strokeLinejoin="round" />
          {common}
        </svg>
      );
    case "maple":
      return (
        <svg viewBox="0 0 400 400" className="h-full w-full" style={{ color: "var(--on-accent)" }}>
          <defs>
            <clipPath id="kangaroo-clip">
              <circle cx="200" cy="140" r="76" />
            </clipPath>
            <radialGradient id="kangaroo-glow" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#1a938c" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0b383c" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <rect width="400" height="400" fill="#082b2f" />
          <rect width="400" height="400" fill="url(#kangaroo-glow)" />
          {[175, 160, 145, 130, 115, 100].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#2dd4bf" strokeOpacity="0.12" strokeWidth="1" />
          ))}
          <circle cx="200" cy="140" r="82" fill="none" stroke="#f97316" strokeOpacity="0.4" strokeWidth="3" />
          <circle cx="200" cy="140" r="77" fill="none" stroke="#2dd4bf" strokeWidth="2" />
          <image
            href="/experience/kangaroo.png"
            x="115"
            y="50"
            width="170"
            height="180"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#kangaroo-clip)"
          />
          <rect x="135" y="218" width="130" height="18" rx="9" fill="#f97316" fillOpacity="0.9" />
          <text x="200" y="231" textAnchor="middle" fontSize="9" letterSpacing="2" fill="#ffffff" fontWeight="bold" fontFamily="var(--font-label)">
            CONSULTANT · ML
          </text>
          {common}
        </svg>
      );
    case "pulse":
      return (
        <svg viewBox="0 0 400 400" className="h-full w-full" style={{ color: "var(--on-accent)" }}>
          <defs>
            <clipPath id="core-edge-clip">
              <rect x="110" y="70" width="180" height="110" rx="16" />
            </clipPath>
            <linearGradient id="core-edge-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0a192f" />
              <stop offset="100%" stopColor="#050b14" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#core-edge-bg)" />
          {[175, 155, 135, 115, 95].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#0072ce" strokeOpacity="0.16" strokeWidth="1.2" />
          ))}
          <path
            d="M0 190 H100 L115 155 L130 220 L150 135 L170 230 L185 175 L200 190 H400"
            fill="none"
            stroke="#00a3ff"
            strokeWidth="3"
            strokeOpacity="0.4"
            strokeLinejoin="round"
          />
          <rect x="108" y="68" width="184" height="114" rx="18" fill="#ffffff" filter="drop-shadow(0 6px 16px rgba(0,0,0,0.5))" />
          <image
            href="/experience/core-edge.png"
            x="110"
            y="70"
            width="180"
            height="110"
            preserveAspectRatio="xMidYMid meet"
            clipPath="url(#core-edge-clip)"
          />
          <rect x="108" y="68" width="184" height="114" rx="18" fill="none" stroke="#0072ce" strokeWidth="2.5" />
          <rect x="135" y="202" width="130" height="18" rx="9" fill="#0072ce" fillOpacity="0.85" />
          <text x="200" y="215" textAnchor="middle" fontSize="9" letterSpacing="2" fill="#ffffff" fontWeight="bold" fontFamily="var(--font-label)">
            HEALTHCARE RAG
          </text>
          {common}
        </svg>
      );
    case "lens":
      return (
        <svg viewBox="0 0 400 400" className="h-full w-full" style={{ color: "var(--on-accent)" }}>
          <defs>
            <clipPath id="geniteam-clip">
              <rect x="115" y="70" width="170" height="110" rx="16" />
            </clipPath>
            <linearGradient id="geniteam-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#101712" />
              <stop offset="100%" stopColor="#070a08" />
            </linearGradient>
          </defs>
          <rect width="400" height="400" fill="url(#geniteam-bg)" />
          {[175, 155, 135, 115, 95].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#84cc16" strokeOpacity="0.14" strokeWidth="1" />
          ))}
          <line x1="200" y1="20" x2="200" y2="55" stroke="#84cc16" strokeWidth="2" strokeOpacity="0.5" />
          <line x1="30" y1="200" x2="70" y2="200" stroke="#84cc16" strokeWidth="2" strokeOpacity="0.5" />
          <line x1="330" y1="200" x2="370" y2="200" stroke="#84cc16" strokeWidth="2" strokeOpacity="0.5" />
          {[
            "M100 58 h24 M100 58 v24",
            "M300 58 h-24 M300 58 v24",
            "M100 195 h24 M100 195 v-24",
            "M300 195 h-24 M300 195 v-24",
          ].map((d) => (
            <path key={d} d={d} stroke="#84cc16" strokeWidth="3" fill="none" strokeLinecap="round" />
          ))}
          <rect x="100" y="38" width="88" height="18" rx="4" fill="#84cc16" />
          <text x="105" y="51" fontSize="10" fontWeight="bold" fill="#000000" fontFamily="var(--font-mono, monospace)">
            guest 0.98
          </text>
          <rect x="113" y="68" width="174" height="114" rx="18" fill="#ffffff" filter="drop-shadow(0 6px 16px rgba(0,0,0,0.5))" />
          <image
            href="/experience/geniteam.png"
            x="115"
            y="70"
            width="170"
            height="110"
            preserveAspectRatio="xMidYMid meet"
            clipPath="url(#geniteam-clip)"
          />
          <rect x="113" y="68" width="174" height="114" rx="18" fill="none" stroke="#84cc16" strokeWidth="2" />
          <rect x="135" y="202" width="130" height="18" rx="9" fill="#84cc16" fillOpacity="0.2" stroke="#84cc16" strokeWidth="1" />
          <text x="200" y="215" textAnchor="middle" fontSize="9" letterSpacing="2" fill="#84cc16" fontWeight="bold" fontFamily="var(--font-label)">
            OPENCV · YOLO
          </text>
          {common}
        </svg>
      );
    case "grad":
    default:
      return (
        <svg viewBox="0 0 400 400" className="h-full w-full" style={{ color: "var(--on-accent)" }}>
          <defs>
            <clipPath id="fast-seal-clip">
              <circle cx="200" cy="138" r="72" />
            </clipPath>
            <radialGradient id="fast-disc-grad" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#0c2d54" />
              <stop offset="100%" stopColor="#040e1b" />
            </radialGradient>
          </defs>
          <rect width="400" height="400" fill="url(#fast-disc-grad)" />
          {[175, 160, 145, 130, 115, 100].map((r) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#009fe3" strokeOpacity="0.14" strokeWidth="1" />
          ))}
          <circle cx="200" cy="138" r="78" fill="none" stroke="#eab308" strokeOpacity="0.6" strokeWidth="2.5" strokeDasharray="4 2" />
          <circle cx="200" cy="138" r="74" fill="#ffffff" />
          <image
            href="/experience/fast.png"
            x="126"
            y="64"
            width="148"
            height="148"
            preserveAspectRatio="xMidYMid meet"
            clipPath="url(#fast-seal-clip)"
          />
          <circle cx="200" cy="138" r="72" fill="none" stroke="#009fe3" strokeWidth="2" />
          <rect x="125" y="222" width="150" height="18" rx="9" fill="#eab308" fillOpacity="0.15" stroke="#eab308" strokeWidth="1" />
          <text x="200" y="235" textAnchor="middle" fontSize="9" letterSpacing="2" fill="#fde047" fontWeight="bold" fontFamily="var(--font-label)">
            SOFTEC WINNER · CS
          </text>
          {common}
        </svg>
      );
  }
}

/* ---------- A disc with front art, clear hub and an iridescent back ---------- */

const hole = "radial-gradient(circle at center, transparent 0 8.5%, black 8.8%)";

function Disc({ role, index, rotateY }: { role: Role; index: number; rotateY?: ReturnType<typeof useMotionValue<number>> }) {
  return (
    <motion.div className="relative aspect-square w-full [transform-style:preserve-3d]" style={{ rotateY }}>
      {/* front */}
      <div className="absolute inset-0 overflow-hidden rounded-full [backface-visibility:hidden]" style={{ WebkitMaskImage: hole, maskImage: hole, boxShadow: "inset 0 0 0 3px #ffffff55, 0 30px 60px -20px #0008" }}>
        <DiscArt role={role} index={index} />
        {/* clear plastic hub */}
        <div className="absolute left-1/2 top-1/2 size-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ffffffcc_0_26%,#d9dde2_27%_44%,#ffffff99_45%_58%,#ffffff33_59%_100%)] shadow-[inset_0_0_0_1px_#ffffff80]" />
        {/* light sheen */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,#ffffff40_45%,transparent_60%)]" />
      </div>
      {/* back: the data side */}
      <div
        className="absolute inset-0 rounded-full [backface-visibility:hidden] [transform:rotateY(180deg)]"
        style={{
          WebkitMaskImage: hole,
          maskImage: hole,
          background:
            "radial-gradient(circle, #e9edf2 0 17%, transparent 17.5%), repeating-radial-gradient(circle, #ffffff10 0 1px, transparent 1px 3px), conic-gradient(from 30deg, #9ad0ff, #f6a6ff, #fff3a1, #a6ffd8, #9ad0ff, #d5a6ff, #9ad0ff)",
          boxShadow: "inset 0 0 0 3px #ffffff88",
        }}
      />
    </motion.div>
  );
}

/* A loose hand-drawn loop around the active disc */
function Scribble() {
  return (
    <svg viewBox="0 0 500 500" className="pointer-events-none absolute -inset-[9%] h-[118%] w-[118%]" aria-hidden>
      <motion.path
        d="M250 32 C390 28 478 140 468 262 C458 392 340 474 222 466 C96 458 22 360 34 238 C46 112 160 40 284 46 C400 54 462 160 450 270 C440 360 380 420 300 440"
        fill="none"
        stroke="var(--fg)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.25 }}
      />
    </svg>
  );
}

export default function Experience() {
  const [active, setActive] = useState(0);
  const [indexOpen, setIndexOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-30% 0px -30% 0px" });
  const rotateY = useMotionValue(0);
  const drag = useRef<{ x: number; dx: number } | null>(null);
  const role = experience[active];
  const n = experience.length;

  const go = (i: number) => setActive(((i % n) + n) % n);

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(active + 1);
      if (e.key === "ArrowLeft") go(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, active]);

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, dx: 0 };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    drag.current.dx = e.clientX - drag.current.x;
    rotateY.set(drag.current.dx * 0.6);
  };
  const onUp = () => {
    if (!drag.current) return;
    const dx = drag.current.dx;
    drag.current = null;
    if (Math.abs(dx) > 90) {
      // spin all the way round, then move on
      animate(rotateY, dx < 0 ? -360 : 360, { duration: 0.5, ease: "easeOut" }).then(() => {
        rotateY.set(0);
        go(active + (dx < 0 ? 1 : -1));
      });
    } else animate(rotateY, 0, { type: "spring", stiffness: 200, damping: 18 });
  };

  return (
    <section ref={ref} id="experience" className="relative scroll-mt-24 overflow-hidden py-24 md:py-28">
      <Container>
        <div className="flex items-start justify-between gap-6">
          <Eyebrow>Where I&apos;ve worked</Eyebrow>
          <div className="relative">
            <button type="button" onClick={() => setIndexOpen((v) => !v)} className="font-mono text-xs uppercase tracking-widest text-muted hover:text-fg" aria-expanded={indexOpen}>
              Index <sup>{String(n).padStart(2, "0")}</sup> {indexOpen ? "▴" : "▾"}
            </button>
            <AnimatePresence>
              {indexOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="card absolute right-0 z-20 mt-2 w-64 p-2"
                >
                  {experience.map((r, i) => (
                    <li key={r.company}>
                      <button
                        type="button"
                        onClick={() => {
                          go(i);
                          setIndexOpen(false);
                        }}
                        className={`flex w-full justify-between gap-3 px-3 py-2 text-left text-sm ${i === active ? "text-fg" : "text-muted hover:text-fg"}`}
                      >
                        <span>{r.company}</span>
                        <span className="font-mono text-[11px]">{r.period.slice(-4) === "sent" ? "Now" : r.period.slice(-4)}</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          {/* Credits */}
          <div className="relative z-10 min-h-[210px] w-full max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={role.company}
                initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                exit={{ opacity: 0, filter: "blur(8px)", y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="display text-4xl uppercase sm:text-5xl">{role.company}</h3>
                <dl className="mt-4 text-sm">
                  {[
                    ["Role", role.title],
                    ["Period", role.period],
                    ["Based", role.place],
                    ["Type", role.type],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-t border-border-strong py-1.5">
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-subtle">{k}</dt>
                      <dd className="text-right">{v}</dd>
                    </div>
                  ))}
                  <div className="flex flex-wrap justify-end gap-1 border-t border-border-strong pt-2">
                    {role.stack.map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="relative z-10 flex items-end gap-4">
            <span className="display text-7xl leading-none">{String(active + 1).padStart(2, "0")}</span>
            <span className="pb-2 font-mono text-xs text-subtle">/ {String(n).padStart(2, "0")}</span>
            <div className="flex gap-2 pb-1">
              <button type="button" onClick={() => go(active - 1)} aria-label="Previous" className="btn btn-ghost size-11 !p-0">←</button>
              <button type="button" onClick={() => go(active + 1)} aria-label="Next" className="btn btn-primary size-11 !p-0">→</button>
            </div>
          </div>
        </div>
      </Container>

      {/* Disc stage: the active disc in the middle, neighbours peeking in from the sides */}
      <div className="relative mx-auto mt-6 w-[min(78vw,440px)] [perspective:1400px]">
        <div className="relative aspect-square w-full">
          {experience.map((r, i) => {
            let off = i - active;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const isActive = off === 0;
            return (
              <motion.div
                key={r.company}
                className={`absolute inset-0 ${isActive ? "cursor-grab touch-pan-y active:cursor-grabbing" : "cursor-pointer"}`}
                initial={false}
                animate={{
                  x: `${off * 112}%`,
                  scale: isActive ? 1 : 0.7,
                  opacity: Math.abs(off) > 1 ? 0 : isActive ? 1 : 0.85,
                  zIndex: isActive ? 5 : 1,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                onClick={() => !isActive && go(i)}
                onPointerDown={isActive ? onDown : undefined}
                onPointerMove={isActive ? onMove : undefined}
                onPointerUp={isActive ? onUp : undefined}
                onPointerCancel={isActive ? onUp : undefined}
                style={{ transformStyle: "preserve-3d" }}
                aria-hidden={!isActive}
              >
                <div style={{ transform: "rotateX(16deg) rotateZ(-12deg)" }} className="[transform-style:preserve-3d]">
                  <Disc role={r} index={i} rotateY={isActive ? rotateY : undefined} />
                </div>
                {isActive && <Scribble key={`s-${active}`} />}
              </motion.div>
            );
          })}
        </div>
        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-widest text-subtle">Drag to spin · ← → to browse</p>
      </div>

      <Container>
        {/* Pull quotes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={role.company}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-6 text-center"
          >
            {role.highlights.map((h) => (
              <div key={h.label}>
                <p className="mb-1 text-accent">✦</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">{h.label}</p>
                <p className="display mt-1 text-lg uppercase leading-tight sm:text-xl">&ldquo;{h.text}&rdquo;</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <details className="mx-auto mt-8 max-w-3xl">
          <summary className="cursor-pointer text-center font-mono text-xs uppercase tracking-widest text-muted hover:text-fg">What I did at {role.company}</summary>
          <ul className="mt-4 space-y-2">
            {role.points.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                <span className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                {p}
              </li>
            ))}
          </ul>
        </details>
      </Container>
    </section>
  );
}
