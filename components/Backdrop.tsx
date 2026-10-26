"use client";

import { useEffect } from "react";
import { useTheme, type ThemeId } from "./theme";

/* ---------- Decorative art, one set per style ---------- */



const Burst = ({ text, fill, tilt = -8 }: { text: string; fill: string; tilt?: number }) => (
  <svg viewBox="0 0 240 200">
    <path
      d="M120 5 L140 55 L195 25 L175 80 L235 90 L182 120 L215 170 L155 155 L140 198 L115 160 L75 195 L75 145 L15 160 L50 115 L5 85 L65 72 L45 20 L100 50Z"
      fill={fill}
      stroke="#111"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <text x="120" y="118" textAnchor="middle" fontFamily="var(--font-bangers)" fontSize="52" fill="#fff" stroke="#111" strokeWidth="2.5" transform={`rotate(${tilt} 120 100)`}>
      {text}
    </text>
  </svg>
);
const Bolt = () => (
  <svg viewBox="0 0 120 200">
    <path d="M70 0 L10 110 H55 L35 200 L110 75 H65 L95 0Z" fill="var(--accent-2)" stroke="#111" strokeWidth="5" strokeLinejoin="round" />
  </svg>
);
const Halftone = ({ color }: { color: string }) => (
  <svg viewBox="0 0 200 200">
    {Array.from({ length: 100 }).map((_, i) => {
      const x = (i % 10) * 20 + 10, y = Math.floor(i / 10) * 20 + 10;
      const d = Math.hypot(x - 100, y - 100);
      const r = Math.max(0, 8 - d / 14);
      return r > 0 ? <circle key={i} cx={x} cy={y} r={r} fill={color} /> : null;
    })}
  </svg>
);
const Bubble = () => (
  <svg viewBox="0 0 240 160">
    <path d="M20 20 H220 V110 H90 L50 150 L60 110 H20Z" fill="#fff" stroke="#111" strokeWidth="5" strokeLinejoin="round" />
    <text x="120" y="78" textAnchor="middle" fontFamily="var(--font-bangers)" fontSize="38" fill="#111">HIRE ME!</text>
  </svg>
);


const ink = { fill: "none", stroke: "var(--fg)", strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, filter: "url(#rough)" };
const Doodle = ({ kind }: { kind: "arrow" | "spiral" | "star" | "smile" | "clip" | "coffee" | "loop" }) => {
  const paths: Record<string, React.ReactNode> = {
    arrow: <path {...ink} d="M10 80 C50 20 120 10 170 50 M170 50 L140 48 M170 50 L160 22" />,
    spiral: <path {...ink} d="M100 100 m0 0 c10 0 14 12 4 18 c-14 8 -30 -6 -26 -22 c6 -22 36 -26 50 -8 c18 22 2 56 -26 58 c-36 4 -60 -30 -50 -62" />,
    star: <path {...ink} stroke="var(--accent)" d="M100 20 L118 75 L175 75 L130 108 L148 165 L100 130 L52 165 L70 108 L25 75 L82 75Z" />,
    smile: (
      <g {...ink}>
        <circle cx="100" cy="100" r="60" />
        <path d="M75 85 v6 M125 85 v6 M70 115 Q100 145 130 115" />
      </g>
    ),
    clip: <path {...ink} stroke="#8a8f9c" d="M80 30 V150 Q80 175 100 175 Q120 175 120 150 V50 Q120 35 107 35 Q94 35 94 50 V140" />,
    coffee: <circle cx="100" cy="100" r="62" fill="none" stroke="#a0703a" strokeOpacity="0.35" strokeWidth="9" filter="url(#rough)" />,
    loop: <path {...ink} stroke="var(--accent-3)" d="M10 100 C40 40 70 40 60 90 C50 140 110 140 100 80 C90 30 150 40 140 100 C135 130 170 130 190 100" />,
  };
  return <svg viewBox="0 0 200 200">{paths[kind]}</svg>;
};
const Sticky = ({ text, color, rot }: { text: string; color: string; rot: number }) => (
  <div className="relative p-4 shadow-md" style={{ background: color, transform: `rotate(${rot}deg)`, fontFamily: "var(--font-caveat)", color: "#1d2a6b", fontSize: 26, lineHeight: 1.05, width: 170 }}>
    <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-white/60" />
    {text}
  </div>
);

type Deco = { node: React.ReactNode; top: string; side: "left" | "right"; offset: string; size: number; rot?: number; opacity?: number };

const DECOR: Record<Exclude<ThemeId, "studio">, Deco[]> = {
  pop: [
    { node: <Burst text="POW!" fill="var(--accent-2)" />, top: "2%", side: "right", offset: "-30px", size: 230 },
    { node: <Halftone color="var(--accent-3)" />, top: "8%", side: "left", offset: "-70px", size: 220 },
    { node: <Bolt />, top: "16%", side: "right", offset: "10px", size: 90, rot: 10 },
    { node: <Burst text="ZAP!" fill="var(--accent-3)" tilt={6} />, top: "26%", side: "left", offset: "-30px", size: 200 },
    { node: <Bubble />, top: "36%", side: "right", offset: "-10px", size: 210, rot: 4 },
    { node: <Halftone color="var(--accent)" />, top: "46%", side: "right", offset: "-80px", size: 240 },
    { node: <Burst text="WOW!" fill="var(--accent-4)" />, top: "56%", side: "left", offset: "-40px", size: 210 },
    { node: <Bolt />, top: "66%", side: "left", offset: "10px", size: 80, rot: -14 },
    { node: <Burst text="BAM!" fill="var(--accent)" tilt={-4} />, top: "76%", side: "right", offset: "-30px", size: 220 },
    { node: <Halftone color="var(--accent-4)" />, top: "88%", side: "left", offset: "-60px", size: 200 },
  ],
  sketch: [
    { node: <Doodle kind="arrow" />, top: "2%", side: "right", offset: "10px", size: 170, rot: 160 },
    { node: <Sticky text="ships to prod ✓" color="#fff27a" rot={-5} />, top: "8%", side: "left", offset: "8px", size: 170 },
    { node: <Doodle kind="spiral" />, top: "16%", side: "right", offset: "10px", size: 120 },
    { node: <Doodle kind="coffee" />, top: "24%", side: "left", offset: "-40px", size: 180 },
    { node: <Doodle kind="star" />, top: "32%", side: "right", offset: "20px", size: 110, rot: 12 },
    { node: <Sticky text="evals > vibes" color="#ffc2d1" rot={4} />, top: "41%", side: "right", offset: "8px", size: 170 },
    { node: <Doodle kind="clip" />, top: "50%", side: "left", offset: "10px", size: 90, rot: -20 },
    { node: <Doodle kind="loop" />, top: "59%", side: "right", offset: "-20px", size: 180 },
    { node: <Doodle kind="smile" />, top: "68%", side: "left", offset: "10px", size: 110 },
    { node: <Sticky text="trace every run" color="#b9f0d7" rot={-3} />, top: "78%", side: "left", offset: "8px", size: 170 },
    { node: <Doodle kind="star" />, top: "88%", side: "right", offset: "20px", size: 100 },
  ],
};

export default function Backdrop() {
  const { theme } = useTheme();

  // Cursor position for the grid light
  useEffect(() => {
    if (theme !== "studio") return;
    const root = document.documentElement;
    const move = (e: PointerEvent) => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [theme]);

  if (theme === "studio") {
    return (
      <>
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,black_90%,transparent)]" />
        <div aria-hidden className="grid-lines grid-light pointer-events-none fixed inset-0" />
      </>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {DECOR[theme].map((d, i) => (
        <div
          key={`${theme}-${i}`}
          className="absolute opacity-40 sm:opacity-100"
          style={{
            top: d.top,
            [d.side]: d.offset,
            width: d.size,
            transform: `rotate(${d.rot ?? 0}deg)`,
            opacity: d.opacity,
          }}
        >
          {d.node}
        </div>
      ))}
    </div>
  );
}
