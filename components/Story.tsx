"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { story } from "@/data/site";
import { useTheme, type ThemeId } from "./theme";

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
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const [x, y] = [hex(a), hex(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`;
};

const N = story.length;

export default function Story() {
  const { theme } = useTheme();
  const pal = PALETTES[theme];
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const pencil = useRef<SVGGElement>(null);
  const meRefs = useRef<(SVGPathElement | null)[]>([]);
  const sceneRefs = useRef<(SVGPathElement | null)[][]>(story.map(() => []));
  const groupRefs = useRef<(SVGGElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

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

  const update = useCallback(
    (p: number) => {
      const t = p * N;
      let tip: DOMPoint | null = null;

      // I draw myself in the first part of chapter one
      const meTip = drawSeq(meRefs.current, clamp(t / 0.4));
      if (meTip) tip = meTip;

      story.forEach((_, i) => {
        const local = t - i;
        const sceneTip = drawSeq(sceneRefs.current[i], clamp((local - (i === 0 ? 0.35 : 0.05)) / 0.55));
        if (sceneTip) tip = sceneTip;
        const g = groupRefs.current[i];
        if (g) g.style.opacity = String(i === N - 1 ? 1 : 1 - clamp((local - 0.92) / 0.1));
        const tx = textRefs.current[i];
        if (tx) {
          const inn = clamp((local + 0.05) / 0.25);
          const out = i === N - 1 ? 1 : 1 - clamp((local - 0.82) / 0.15);
          const o = Math.min(inn, out);
          tx.style.opacity = String(o);
          tx.style.transform = `translateY(${(1 - inn) * 24}px)`;
          tx.style.pointerEvents = o > 0.5 ? "auto" : "none";
        }
      });

      // Background colour drifts between chapters
      const c = Math.min(N - 1, Math.max(0, t - 0.5));
      const a = Math.floor(c), b = Math.min(N - 1, a + 1);
      if (stage.current) stage.current.style.backgroundColor = mix(pal.bgs[a], pal.bgs[b], clamp((c - a) * 2 - 0.5));
      const ch = Math.min(N - 1, Math.floor(t));
      if (markerRef.current) markerRef.current.textContent = `${String(ch).padStart(2, "0")}  ${story[ch].place}`;

      if (pencil.current) {
        if (tip) {
          const pt = tip as DOMPoint;
          pencil.current.style.opacity = "1";
          pencil.current.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
        } else pencil.current.style.opacity = "0";
      }
    },
    [pal],
  );

  useMotionValueEvent(scrollYProgress, "change", update);
  useEffect(() => {
    update(scrollYProgress.get());
  }, [update, scrollYProgress, theme]);

  return (
    <section ref={section} id="story" data-section="story" className="relative" style={{ height: `${N * 110 + 40}vh` }} aria-label="How I got here">
      <div ref={stage} className={`story-stage sticky top-0 h-[100svh] overflow-hidden`} style={{ color: pal.text, backgroundColor: pal.bgs[0] }}>
        {/* Chapter text */}
        {story.map((c, i) => (
          <div
            key={c.place}
            ref={(el) => {
              textRefs.current[i] = el;
            }}
            className="absolute inset-x-0 top-24 mx-auto grid max-w-6xl gap-6 px-6 opacity-0 sm:px-8 md:top-28 md:grid-cols-2"
          >
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] opacity-70">
                {String(i).padStart(2, "0")} · {c.place}
              </p>
              <h2 className="display text-3xl sm:text-5xl md:text-6xl" style={{ color: pal.text, WebkitTextStroke: "0" }}>
                {c.title[0]}
                <br />
                {c.title[1]}
              </h2>
            </div>
            <div className="md:pt-9">
              <p className="max-w-md text-base leading-relaxed opacity-85 sm:text-lg">{c.text}</p>
              {i === N - 1 && (
                <a href="#contact" className="btn btn-primary mt-6">
                  Start a project →
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Line drawing */}
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-[62%] w-full md:h-full" aria-hidden>
          <g fill="none" stroke={pal.line} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter={theme === "sketch" ? "url(#rough)" : undefined}>
            <path d={HORIZON} />
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
            {story.map((c, i) => (
              <g
                key={c.scene}
                ref={(el) => {
                  groupRefs.current[i] = el;
                }}
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
          {/* The pencil that does the drawing */}
          <g ref={pencil} style={{ opacity: 0, transition: "opacity .2s" }}>
            <g transform="rotate(-35)">
              <path d="M0 0 L10 -22 H22 L12 0 Z" fill={pal.line} opacity="0.9" />
              <path d="M10 -22 L22 -22 L44 -110 L32 -110 Z" fill={pal.bgs[0]} stroke={pal.line} strokeWidth="3" strokeLinejoin="round" />
              <path d="M32 -110 L44 -110 L48 -124 L36 -124 Z" fill={pal.line} />
            </g>
          </g>
        </svg>

        {/* Footer marks */}
        <div className="absolute inset-x-0 bottom-5 mx-auto flex max-w-6xl items-center justify-between px-6 font-mono text-[11px] uppercase tracking-widest opacity-70 sm:px-8">
          <span ref={markerRef} className="whitespace-pre" />
          <span>Keep going ↓</span>
        </div>
      </div>
    </section>
  );
}
