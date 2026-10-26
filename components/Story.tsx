"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { story } from "@/data/site";
import { useTheme, type ThemeId, scrollToSection } from "./theme";

/* Line art on a 1440×900 canvas, horizon at y=640. */
const HORIZON = "M0 640 H1440";

// Me: sweater, glasses, beard
const ME = [
  "M262 640 C262 600 258 560 270 536 C280 516 298 506 312 503",
  "M352 503 C366 506 384 516 392 536 C402 560 398 600 398 640",
  "M312 503 L332 520 L352 503",
  "M272 560 C268 590 280 612 304 620",
  "M388 560 C394 590 382 612 360 620",
  "M304 466 C302 438 316 424 332 424 C348 424 362 438 360 466",
  "M300 452 C292 420 316 398 338 404 C360 398 374 424 362 450",
  "M306 468 C308 494 320 510 332 510 C344 510 356 494 358 468",
  "M311 458 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0 M335 458 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0 M329 457 H335 M311 455 L303 451 M353 455 L361 451",
  "M323 486 Q332 493 341 486",
];

const SCENES: Record<string, string[]> = {
  laptop: [
    "M600 640 L622 618 H858 L880 640",
    "M640 618 V482 Q640 470 652 470 H828 Q840 470 840 482 V618",
    "M672 508 H732 M672 534 H790 M692 560 H762 M672 586 H722",
    "M1010 470 H1110 V500 C1110 550 1082 574 1060 578 C1038 574 1010 550 1010 500 Z",
    "M1010 486 C984 486 984 526 1018 530 M1110 486 C1136 486 1136 526 1102 530",
    "M1060 578 V612 M1030 640 V612 H1090 V640",
    "M1060 500 l6 12 13 2 -9 9 2 13 -12 -6 -12 6 2 -13 -9 -9 13 -2z",
  ],
  camera: [
    "M720 640 L765 522 M810 640 L765 522 M765 640 V522",
    "M690 522 H840 V440 H690 Z M712 440 V424 H752 V440",
    "M737 481 a28 28 0 1 0 56 0 a28 28 0 1 0 -56 0 M751 481 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0",
    "M795 486 L1040 500",
    "M1074 520 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0 M1062 640 C1062 592 1068 560 1090 548 C1112 560 1118 592 1118 640",
    "M1036 488 h26 M1036 488 v26 M1144 488 h-26 M1144 488 v26 M1036 632 h26 M1036 632 v-26 M1144 632 h-26 M1144 632 v-26",
    "M1036 468 H1124 V488 H1036 Z",
  ],
  chart: [
    "M640 640 V612 M700 640 V598 M760 640 V560 M820 640 V580 M880 640 V540 M940 640 V500 M1000 640 V520 M1060 640 V470 M1120 640 V488 M1180 640 V430",
    "M600 610 L660 580 L720 598 L790 520 L860 556 L940 452 L1010 498 L1090 404 L1170 430 L1250 340",
    "M1250 340 L1222 344 M1250 340 L1246 368",
    "M1290 470 a34 34 0 1 0 0.1 0 M1290 486 V542 M1304 494 C1296 486 1278 488 1278 500 C1278 514 1304 512 1304 526 C1304 540 1282 540 1276 532",
  ],
  pulse: [
    "M560 560 H660 L680 520 L700 600 L725 456 L750 584 L770 560 H890",
    "M960 640 V486 H1076 V640",
    "M982 486 V466 H1098 V620 H1076",
    "M982 516 H1056 M982 540 H1050 M982 564 H1060 M982 588 H1040",
    "M1112 520 a42 42 0 1 0 84 0 a42 42 0 1 0 -84 0 M1184 552 L1226 596",
    "M1154 502 V538 M1136 520 H1172",
  ],
  pipeline: [
    "M620 560 H720 V620 H620 Z",
    "M720 590 H860",
    "M860 560 H960 V620 H860 Z",
    "M960 590 H1100",
    "M1100 560 H1200 V620 H1100 Z",
    "M876 470 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0 M910 426 V414 M910 514 V526 M866 470 H854 M954 470 H966 M879 439 L870 430 M941 501 L950 510 M941 439 L950 430 M879 501 L870 510",
    "M1226 590 l14 14 28 -32",
  ],
  network: [
    "M640 560 L760 470 L900 520 L1020 430 L1140 500 L1260 440",
    "M760 470 L900 400 L1020 430 M900 520 L1140 500 M900 400 L900 520",
    "M628 560 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0 M748 470 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0 M888 520 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0",
    "M1008 430 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0 M1128 500 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0 M1248 440 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0",
    "M900 376 L924 400 L900 424 L876 400 Z",
  ],
  door: [
    "M980 640 V420 H1100 V640",
    "M980 420 L1036 440 V628 L980 640",
    "M1022 540 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0",
    "M1112 450 L1210 410 M1112 530 L1230 530 M1112 610 L1210 640",
    "M1240 640 A60 60 0 0 1 1360 640",
  ],
};

type Palette = { bgs: string[]; line: string; text: string };
const PALETTES: Record<ThemeId, Palette> = {
  studio: { bgs: ["#1c1c1b", "#55607d", "#6e4b4b", "#3d5b78", "#5b6640", "#4a4c78", "#2f4f46"], line: "#f4f2ec", text: "#f4f2ec" },
  pop: { bgs: ["#fff8e7", "#ffe600", "#9fd3ff", "#ff9ec8", "#fff1b8", "#ff8a8a", "#a8c4ff"], line: "#111111", text: "#111111" },
  sketch: { bgs: ["#fbf8ef", "#f8f3e0", "#f2f6ec", "#f8efef", "#edf1f8", "#f7f4e4", "#fbf8ef"], line: "#1d2a6b", text: "#1d2a6b" },
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const N = story.length;
const FOCUS: Record<string, number> = { laptop: 860, camera: 930, chart: 950, pulse: 900, pipeline: 940, network: 950, door: 1170 };

const CHAPTER_YEARS = ["2016", "2020", "2021", "2023", "2024", "2025", "Next"];
const CHAPTER_DURATION = 5000; // 5 seconds per chapter

export default function Story() {
  const { theme } = useTheme();
  const pal = PALETTES[theme] || PALETTES.studio;
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pencil = useRef<SVGGElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const meRefs = useRef<(SVGPathElement | null)[]>([]);
  const sceneRefs = useRef<(SVGPathElement | null)[][]>(story.map(() => []));
  const groupRefs = useRef<(SVGGElement | null)[]>([]);

  const [activeChapter, setActiveChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  const drawSeq = (paths: (SVGPathElement | null)[], prog: number) => {
    let tip: DOMPoint | null = null;
    const k = paths.length;
    paths.forEach((p, j) => {
      if (!p) return;
      const len = p.getTotalLength();
      const f = clamp(prog * k - j);
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len * (1 - f)}`;
      if (f > 0 && f < 1) tip = p.getPointAtLength(len * f);
    });
    return tip as DOMPoint | null;
  };

  // Render the current scene artwork based on active chapter and sub-chapter progress
  const renderDrawing = useCallback(
    (ch: number, frac: number) => {
      // Me is drawn fully or during chapter 0
      const meProg = ch === 0 ? clamp(frac * 2) : 1;
      let tip = drawSeq(meRefs.current, meProg);

      // Hide all scenes except active and previous
      story.forEach((_, i) => {
        const g = groupRefs.current[i];
        if (!g) return;
        if (i < ch) {
          g.style.opacity = "0.2";
          drawSeq(sceneRefs.current[i], 1);
        } else if (i === ch) {
          g.style.opacity = "1";
          const sceneTip = drawSeq(sceneRefs.current[i], clamp(frac * 1.5));
          if (sceneTip) tip = sceneTip;
        } else {
          g.style.opacity = "0";
          drawSeq(sceneRefs.current[i], 0);
        }
      });

      // Camera panning on smaller screens
      const svg = svgRef.current;
      if (svg) {
        const visible = Math.min(1440, (900 * svg.clientWidth) / Math.max(1, svg.clientHeight));
        let x = 0;
        if (visible < 1440) {
          const here = FOCUS[story[ch].scene] || 900;
          x = Math.max(0, Math.min(1440 - visible, here - visible / 2));
        }
        svg.setAttribute("viewBox", `${x.toFixed(1)} 0 1440 900`);
      }

      // Position pencil tip
      if (pencil.current) {
        if (tip) {
          const pt = tip as DOMPoint;
          pencil.current.style.opacity = "1";
          pencil.current.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        } else {
          pencil.current.style.opacity = "0";
        }
      }
    },
    [],
  );

  // Playback timer loop
  useEffect(() => {
    if (!isInView || !isPlaying) return;

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / CHAPTER_DURATION);
      setProgress(p);
      renderDrawing(activeChapter, p);

      if (p >= 1) {
        setActiveChapter((cur) => (cur + 1) % N);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, isPlaying, activeChapter, renderDrawing]);

  // When manually changing chapters
  const selectChapter = (idx: number) => {
    setActiveChapter(idx);
    setProgress(0);
    renderDrawing(idx, 0.95);
  };

  const current = story[activeChapter];

  return (
    <section
      ref={sectionRef}
      id="story"
      data-section="story"
      className="relative scroll-mt-24 my-8 md:my-16"
      aria-label="How I got here"
    >
      <div
        ref={stageRef}
        className="story-stage relative mx-4 sm:mx-6 lg:mx-8 min-h-[580px] lg:h-[80vh] lg:min-h-[640px] lg:max-h-[780px] overflow-hidden rounded-3xl border border-border shadow-2xl transition-colors duration-700 flex flex-col justify-between"
        style={{ color: pal.text, backgroundColor: pal.bgs[activeChapter % pal.bgs.length] }}
      >
        {/* Top Header Bar inside the stage */}
        <div className="relative z-20 flex items-center justify-between px-6 pt-6 sm:px-10">
          <div className="flex items-center gap-3">
            <span className="flex size-2 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] opacity-80">
              Interactive Story · Chapter {String(activeChapter + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/25 px-3 py-1 font-mono text-xs backdrop-blur-md transition-all hover:bg-black/40"
              aria-label={isPlaying ? "Pause timeline" : "Play timeline"}
            >
              <span>{isPlaying ? "⏸ Pause" : "▶ Play"}</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("#work")}
              className="hidden sm:inline-flex rounded-full border border-white/20 bg-black/25 px-3 py-1 font-mono text-xs text-accent backdrop-blur-md transition-all hover:bg-black/40"
            >
              Skip to Work ↓
            </button>
          </div>
        </div>

        {/* Chapter Story Text Overlay */}
        <div className="relative z-10 px-6 sm:px-10 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.place}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid gap-4 md:grid-cols-2 md:gap-8 items-start"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2">
                  {current.place}
                </p>
                <h2 className="display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight" style={{ color: pal.text }}>
                  {current.title[0]}
                  <br />
                  {current.title[1]}
                </h2>
              </div>
              <div className="md:pt-4">
                <p className="text-base sm:text-lg leading-relaxed opacity-90 max-w-md">
                  {current.text}
                </p>
                {activeChapter === N - 1 && (
                  <button
                    type="button"
                    onClick={() => scrollToSection("#contact")}
                    className="btn btn-primary mt-4 inline-flex"
                  >
                    Start a project →
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Live Line drawing SVG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            ref={svgRef}
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMinYMax slice"
            className="story-art absolute inset-x-0 bottom-0 h-[65%] w-full md:h-full"
            aria-hidden
          >
            <g
              fill="none"
              stroke={pal.line}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={theme === "sketch" ? "url(#rough)" : undefined}
            >
              <path d={HORIZON} />
              {/* Me */}
              <g>
                {ME.map((d, j) => (
                  <path
                    key={j}
                    d={d}
                    ref={(el) => {
                      meRefs.current[j] = el;
                    }}
                  />
                ))}
              </g>
              {/* All Scenes */}
              {story.map((c, i) => (
                <g
                  key={c.scene}
                  ref={(el) => {
                    groupRefs.current[i] = el;
                  }}
                  className="transition-opacity duration-500"
                >
                  {SCENES[c.scene].map((d, j) => (
                    <path
                      key={j}
                      d={d}
                      ref={(el) => {
                        sceneRefs.current[i][j] = el;
                      }}
                    />
                  ))}
                </g>
              ))}
            </g>
            {/* The Pencil SVG */}
            <g ref={pencil} style={{ opacity: 0, transition: "opacity .2s" }}>
              <g transform="rotate(-35)">
                <path d="M0 0 L10 -22 H22 L12 0 Z" fill={pal.line} opacity="0.9" />
                <path d="M10 -22 L22 -22 L44 -110 L32 -110 Z" fill={pal.bgs[0]} stroke={pal.line} strokeWidth="3" strokeLinejoin="round" />
                <path d="M32 -110 L44 -110 L48 -124 L36 -124 Z" fill={pal.line} />
              </g>
            </g>
          </svg>
        </div>

        {/* Bottom Interactive Timeline Rail */}
        <div className="relative z-20 px-4 sm:px-8 pb-5 pt-3 bg-gradient-to-t from-black/60 to-transparent">
          {/* Segmented Progress Bars */}
          <div className="mb-3 flex items-center gap-1.5 w-full">
            {story.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectChapter(i)}
                className="relative h-1.5 flex-1 rounded-full bg-white/20 overflow-hidden transition-all hover:h-2.5"
                title={`Jump to Chapter ${i + 1}`}
                aria-label={`Jump to Chapter ${i + 1}`}
              >
                <div
                  className="h-full bg-accent transition-all"
                  style={{
                    width: i < activeChapter ? "100%" : i === activeChapter ? `${progress * 100}%` : "0%",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Timeline Chapter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 max-w-full">
              {story.map((c, i) => {
                const isActive = activeChapter === i;
                return (
                  <button
                    key={c.place}
                    type="button"
                    onClick={() => selectChapter(i)}
                    className={`rounded-full px-3 py-1 font-mono text-[11px] sm:text-xs transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-accent text-black font-bold shadow-md scale-105"
                        : "bg-white/10 text-white/80 hover:bg-white/25 hover:text-white"
                    }`}
                  >
                    {CHAPTER_YEARS[i] || `Ch.${i + 1}`}
                  </button>
                );
              })}
            </div>

            {/* Step navigation arrows */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => selectChapter((activeChapter - 1 + N) % N)}
                className="size-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-sm font-mono transition-transform active:scale-90"
                aria-label="Previous chapter"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => selectChapter((activeChapter + 1) % N)}
                className="size-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-sm font-mono transition-transform active:scale-90"
                aria-label="Next chapter"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
