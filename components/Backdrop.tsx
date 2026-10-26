"use client";

import { useEffect } from "react";
import { useTheme, type ThemeId } from "./theme";

/* ---------- Decorative art, one set per style ---------- */

const Sunburst = () => (
  <svg viewBox="0 0 200 200">
    {Array.from({ length: 24 }).map((_, i) => (
      <path key={i} d="M100 100 L97 0 L103 0 Z" transform={`rotate(${i * 15} 100 100)`} fill={i % 2 ? "var(--accent)" : "var(--accent-2)"} />
    ))}
    <circle cx="100" cy="100" r="38" fill="var(--accent-3)" />
    <circle cx="100" cy="100" r="24" fill="var(--bg)" />
  </svg>
);
const Checker = () => (
  <svg viewBox="0 0 200 200">
    <defs>
      <pattern id="chk" width="25" height="25" patternUnits="userSpaceOnUse">
        <rect width="12.5" height="12.5" fill="var(--accent-2)" />
        <rect x="12.5" y="12.5" width="12.5" height="12.5" fill="var(--accent-2)" />
      </pattern>
    </defs>
    <circle cx="100" cy="100" r="96" fill="var(--accent)" />
    <circle cx="100" cy="100" r="80" fill="url(#chk)" />
  </svg>
);
const Eye = () => (
  <svg viewBox="0 0 220 120">
    <path d="M10 60 Q110 -20 210 60 Q110 140 10 60Z" fill="var(--fg)" stroke="var(--accent-2)" strokeWidth="6" />
    <circle cx="110" cy="60" r="32" fill="var(--accent-3)" />
    <circle cx="110" cy="60" r="14" fill="var(--bg)" />
    <circle cx="118" cy="52" r="5" fill="var(--fg)" />
  </svg>
);
const Arch = () => (
  <svg viewBox="0 0 160 200">
    <defs>
      <pattern id="str" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="16" fill="var(--accent-4)" />
      </pattern>
    </defs>
    <path d="M10 200 V80 A70 70 0 0 1 150 80 V200Z" fill="url(#str)" stroke="var(--accent-2)" strokeWidth="6" />
    <path d="M40 200 V90 A40 40 0 0 1 120 90 V200Z" fill="var(--accent)" />
  </svg>
);
const Star8 = ({ fill = "var(--accent)" }: { fill?: string }) => (
  <svg viewBox="0 0 100 100">
    <path d="M50 0 L60 35 L95 25 L68 50 L95 75 L60 65 L50 100 L40 65 L5 75 L32 50 L5 25 L40 35Z" fill={fill} />
  </svg>
);

const Leaf = () => (
  <svg viewBox="0 0 200 220">
    <path d="M100 210 C40 180 10 120 30 60 C50 10 110 0 150 30 C200 70 190 160 100 210Z" fill="var(--accent-2)" />
    <path d="M100 210 C100 150 105 90 130 40" stroke="var(--bg)" strokeWidth="5" fill="none" />
    {[60, 95, 130, 165].map((y, i) => (
      <path key={y} d={`M${110 - i * 2} ${y + 20} Q${70} ${y} ${48 + i * 6} ${y - 10}`} stroke="var(--bg)" strokeWidth="4" fill="none" />
    ))}
  </svg>
);
const Blob = ({ fill }: { fill: string }) => (
  <svg viewBox="0 0 200 200">
    <path d="M45 30 C90 -5 170 10 185 70 C200 130 160 190 95 185 C30 180 -5 130 10 85 C18 60 25 45 45 30Z" fill={fill} />
  </svg>
);
const Sun = () => (
  <svg viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="50" fill="var(--accent-4)" />
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x="96" y="14" width="8" height="26" rx="4" fill="var(--accent-4)" transform={`rotate(${i * 30} 100 100)`} />
    ))}
  </svg>
);
const Plant = () => (
  <svg viewBox="0 0 160 220">
    <path d="M40 140 H120 L110 210 H50Z" fill="var(--accent)" />
    <path d="M80 140 C70 100 40 90 20 60 C55 60 75 90 80 120 C85 80 100 40 140 30 C130 70 100 100 80 140Z" fill="var(--accent-2)" />
    <path d="M80 140 C82 110 75 70 60 30" stroke="var(--accent-3)" strokeWidth="4" fill="none" />
  </svg>
);
const Dots = () => (
  <svg viewBox="0 0 120 120">
    {Array.from({ length: 25 }).map((_, i) => (
      <circle key={i} cx={12 + (i % 5) * 24} cy={12 + Math.floor(i / 5) * 24} r="5" fill="var(--accent-3)" />
    ))}
  </svg>
);

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

const Tag = ({ text, color }: { text: string; color: string }) => (
  <svg viewBox="0 0 300 140">
    <text x="150" y="90" textAnchor="middle" fontFamily="var(--font-marker)" fontSize="72" fill={color} stroke="#000" strokeWidth="3" transform="rotate(-8 150 70)" style={{ filter: `drop-shadow(0 0 10px ${color})` }}>
      {text}
    </text>
    {[90, 140, 200].map((x, i) => (
      <path key={x} d={`M${x} 95 v${18 + i * 10}`} stroke={color} strokeWidth="5" strokeLinecap="round" />
    ))}
  </svg>
);
const Crown = () => (
  <svg viewBox="0 0 160 120">
    <path d="M15 100 L25 30 L60 70 L80 15 L100 70 L135 30 L145 100Z" fill="none" stroke="var(--accent-2)" strokeWidth="8" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 8px #ff2bd6)" }} />
  </svg>
);
const XMark = () => (
  <svg viewBox="0 0 100 100">
    <path d="M15 15 L85 85 M85 15 L15 85" stroke="var(--accent-3)" strokeWidth="12" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 8px #00e5ff)" }} />
  </svg>
);
const Spray = ({ color }: { color: string }) => (
  <svg viewBox="0 0 200 200">
    <defs>
      <filter id="sprayblur"><feGaussianBlur stdDeviation="12" /></filter>
    </defs>
    <circle cx="100" cy="100" r="60" fill={color} opacity="0.45" filter="url(#sprayblur)" />
    {Array.from({ length: 40 }).map((_, i) => (
      <circle key={i} cx={100 + Math.cos(i * 2.4) * (50 + (i % 7) * 7)} cy={100 + Math.sin(i * 2.4) * (50 + (i % 5) * 8)} r={1 + (i % 3)} fill={color} />
    ))}
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 220 120">
    <path d="M10 90 C60 20 140 20 190 60 M190 60 L160 55 M190 60 L180 30" fill="none" stroke="var(--accent-4)" strokeWidth="9" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 8px #ff8a00)" }} />
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
  maximal: [
    { node: <Sunburst />, top: "2%", side: "right", offset: "-60px", size: 240, rot: 0 },
    { node: <Eye />, top: "9%", side: "left", offset: "-40px", size: 200, rot: -12 },
    { node: <Checker />, top: "17%", side: "right", offset: "-50px", size: 180 },
    { node: <Arch />, top: "27%", side: "left", offset: "-30px", size: 150, rot: 6 },
    { node: <Star8 fill="var(--accent-2)" />, top: "37%", side: "right", offset: "20px", size: 110, rot: 12 },
    { node: <Sunburst />, top: "48%", side: "left", offset: "-90px", size: 220 },
    { node: <Eye />, top: "58%", side: "right", offset: "-50px", size: 190, rot: 14 },
    { node: <Checker />, top: "68%", side: "left", offset: "-60px", size: 170 },
    { node: <Star8 />, top: "78%", side: "right", offset: "10px", size: 120, rot: -10 },
    { node: <Arch />, top: "88%", side: "left", offset: "-20px", size: 140, rot: -6 },
  ],
  vector: [
    { node: <Leaf />, top: "1%", side: "left", offset: "-60px", size: 200, rot: 20 },
    { node: <Sun />, top: "6%", side: "right", offset: "-40px", size: 180 },
    { node: <Blob fill="var(--accent-4)" />, top: "15%", side: "right", offset: "-80px", size: 240, opacity: 0.6 },
    { node: <Plant />, top: "24%", side: "left", offset: "-10px", size: 150 },
    { node: <Dots />, top: "34%", side: "right", offset: "10px", size: 110 },
    { node: <Blob fill="var(--accent-2)" />, top: "44%", side: "left", offset: "-100px", size: 260, opacity: 0.5 },
    { node: <Leaf />, top: "55%", side: "right", offset: "-50px", size: 190, rot: -30 },
    { node: <Sun />, top: "66%", side: "left", offset: "-50px", size: 160 },
    { node: <Plant />, top: "77%", side: "right", offset: "-10px", size: 150 },
    { node: <Blob fill="var(--accent)" />, top: "88%", side: "left", offset: "-90px", size: 220, opacity: 0.4 },
  ],
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
  graffiti: [
    { node: <Tag text="TAHA" color="var(--accent)" />, top: "1.5%", side: "right", offset: "-40px", size: 280, rot: -4 },
    { node: <Spray color="#ff2bd6" />, top: "7%", side: "left", offset: "-80px", size: 260 },
    { node: <Crown />, top: "14%", side: "right", offset: "20px", size: 120, rot: 10 },
    { node: <XMark />, top: "23%", side: "left", offset: "20px", size: 80 },
    { node: <Tag text="ML" color="var(--accent-3)" />, top: "32%", side: "right", offset: "-60px", size: 220, rot: 6 },
    { node: <Spray color="#00e5ff" />, top: "42%", side: "right", offset: "-90px", size: 260 },
    { node: <Arrow />, top: "51%", side: "left", offset: "-10px", size: 170, rot: 10 },
    { node: <Crown />, top: "61%", side: "left", offset: "10px", size: 110, rot: -8 },
    { node: <Spray color="#b6ff00" />, top: "70%", side: "left", offset: "-90px", size: 240 },
    { node: <Tag text="AI" color="var(--accent-2)" />, top: "80%", side: "right", offset: "-40px", size: 200, rot: -10 },
    { node: <XMark />, top: "91%", side: "right", offset: "30px", size: 70 },
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
