"use client";

import { AnimatePresence, motion, useMotionValue, animate } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export const THEMES = [
  { id: "studio", name: "Studio", blurb: "Ink, paper and one signal colour" },
  { id: "pop", name: "Pop Art", blurb: "A comic book, Ben-Day dots and all" },
  { id: "sketch", name: "Handwritten", blurb: "A notebook full of notes and doodles" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
const KEY = "taha-style";

// Runs before paint so the saved style shows without a flash
export const themeScript = `try{var t=localStorage.getItem("${KEY}");if(t==="studio"||t==="pop"||t==="sketch")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

type Ctx = {
  theme: ThemeId;
  setTheme: (t: ThemeId, origin?: { x: number; y: number }) => void;
};
const ThemeContext = createContext<Ctx>({ theme: "studio", setTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

/** The section crossing the middle of the screen; used to keep your place when layouts change */
function centerSection(): HTMLElement | null {
  const mid = window.innerHeight / 2;
  for (const el of document.querySelectorAll<HTMLElement>("[data-section]")) {
    const r = el.getBoundingClientRect();
    if (r.top <= mid && r.bottom >= mid) return el;
  }
  return null;
}

/* ---------------- In-page navigation ---------------- */

const nav = { raf: 0 };

/** Scroll to a section, re-aiming at its live position every frame */
export function scrollToSection(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  cancelAnimationFrame(nav.raf);
  const target = () => {
    const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    return Math.max(0, el.getBoundingClientRect().top + window.scrollY - margin);
  };
  const start = window.scrollY;
  const dist = Math.abs(target() - start);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const jump = (y: number) => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  if (reduce || dist < 2) {
    jump(target());
    return;
  }
  const duration = Math.min(1400, Math.max(500, 400 + dist / 10));
  const t0 = performance.now();
  const stop = () => {
    cancelAnimationFrame(nav.raf);
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
  };
  // Your own scrolling takes over immediately
  window.addEventListener("wheel", stop, { passive: true, once: true });
  window.addEventListener("touchstart", stop, { passive: true, once: true });
  const tick = (now: number) => {
    const t = Math.min(1, (now - t0) / duration);
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    jump(start + (target() - start) * e);
    if (t < 1) nav.raf = requestAnimationFrame(tick);
    else {
      jump(target());
      stop();
    }
  };
  nav.raf = requestAnimationFrame(tick);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("studio");
  const themeRef = useRef<ThemeId>("studio");

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme") as ThemeId | null;
    if (t && THEMES.some((x) => x.id === t)) {
      setThemeState(t);
      themeRef.current = t;
    }
  }, []);

  const setTheme = useCallback((t: ThemeId, origin?: { x: number; y: number }) => {
    if (t === themeRef.current) return;
    const apply = () => {
      // Layouts differ per style, so pin the section you're reading in place
      const anchor = centerSection();
      const before = anchor?.getBoundingClientRect().top ?? 0;
      document.documentElement.setAttribute("data-theme", t);
      themeRef.current = t;
      flushSync(() => setThemeState(t));
      if (anchor) {
        const after = anchor.getBoundingClientRect().top;
        if (Math.abs(after - before) > 1) window.scrollTo({ top: window.scrollY + after - before, behavior: "instant" as ScrollBehavior });
      }
      try {
        localStorage.setItem(KEY, t);
      } catch {}
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (doc.startViewTransition && !reduce) {
      const root = document.documentElement;
      root.style.setProperty("--vt-x", `${origin?.x ?? window.innerWidth / 2}px`);
      root.style.setProperty("--vt-y", `${origin?.y ?? window.innerHeight / 2}px`);
      doc.startViewTransition(apply);
    } else apply();
  }, []);

  // Every in-page link (nav, buttons, footer) uses the steady scroll above
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as Element).closest?.('a[href^="#"]');
      const hash = a?.getAttribute("href");
      if (!hash || hash === "#" || !document.querySelector(hash)) return;
      e.preventDefault();
      scrollToSection(hash);
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

/* ---------------- The style wheel ---------------- */

function Wedge({ i, r, label }: { i: number; r: number; label?: boolean }) {
  const a0 = ((i * 120 - 90) * Math.PI) / 180;
  const a1 = (((i + 1) * 120 - 90) * Math.PI) / 180;
  const c = r;
  const d = `M${c} ${c} L${c + r * Math.cos(a0)} ${c + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${c + r * Math.cos(a1)} ${c + r * Math.sin(a1)} Z`;
  const mid = (((i * 120 + 60) - 90) * Math.PI) / 180;
  const lx = c + r * 0.62 * Math.cos(mid);
  const ly = c + r * 0.62 * Math.sin(mid);
  const fills = ["url(#w-studio)", "url(#w-pop)", "url(#w-sketch)"];
  const ink = ["#d7ff3b", "#111", "#1d2a6b"];
  const fonts = ["var(--font-geist-sans)", "var(--font-bangers)", "var(--font-caveat)"];
  return (
    <g>
      <path d={d} fill={fills[i]} stroke="#111" strokeWidth={r > 60 ? 2.5 : 1.5} />
      {label && (
        <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={i === 1 ? 19 : i === 2 ? 22 : 14} fontWeight={i === 0 ? 600 : 400} fill={ink[i]} fontFamily={fonts[i]} transform={`rotate(${i * 120 + 60} ${lx} ${ly})`}>
          {THEMES[i].name}
        </text>
      )}
    </g>
  );
}

function WheelDefs() {
  return (
    <defs>
      <pattern id="w-studio" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#151514" />
        <path d="M12 0H0V12" fill="none" stroke="#ffffff22" />
      </pattern>
      <pattern id="w-pop" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#ffe600" />
        <circle cx="5" cy="5" r="2.2" fill="#ff2e2e" />
      </pattern>
      <pattern id="w-sketch" width="14" height="14" patternUnits="userSpaceOnUse">
        <rect width="14" height="14" fill="#fbf8ef" />
        <path d="M0 13H14" stroke="#1f3a9340" />
      </pattern>
    </defs>
  );
}

export function StyleWheel() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const idx = THEMES.findIndex((t) => t.id === theme);
  const rot = useMotionValue(-(idx * 120 + 60));

  // Turn the wheel so the active style sits under the pointer, always rolling forward
  useEffect(() => {
    if (spinning) return;
    const target = -(idx * 120 + 60);
    const cur = rot.get();
    let next = target;
    while (next > cur) next -= 360;
    if (cur - next > 300) next += 360;
    animate(rot, next, { type: "spring", stiffness: 90, damping: 16 });
  }, [idx, rot, spinning]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    // Always land on a different style than the current one
    const pick = (idx + 1 + Math.floor(Math.random() * 2)) % 3;
    const target = -(pick * 120 + 60);
    let next = target;
    const cur = rot.get();
    while (next > cur - 720) next -= 360;
    animate(rot, next, { duration: 2.2, ease: [0.15, 0.6, 0.2, 1] }).then(() => {
      setSpinning(false);
      setTheme(THEMES[pick].id);
    });
  };

  return (
    <div className="style-wheel fixed right-[68px] top-[22px] z-[58] flex flex-col-reverse items-end font-[family-name:var(--font-geist-sans)] text-[#111] sm:bottom-5 sm:left-5 sm:right-auto sm:top-auto sm:flex-col sm:items-start">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="mt-3 w-[260px] rounded-3xl border-2 border-black bg-[#f4f1ea] p-4 shadow-[6px_6px_0_#111] sm:mb-3 sm:mt-0"
            role="dialog"
            aria-label="Style wheel"
          >
            <div className="relative mx-auto size-[200px]">
              {/* pointer */}
              <svg viewBox="0 0 20 16" className="absolute -top-3 left-1/2 z-10 w-5 -translate-x-1/2" aria-hidden>
                <path d="M0 0H20L10 16Z" fill="#111" />
              </svg>
              <motion.svg viewBox="0 0 200 200" className="size-full" style={{ rotate: rot }}>
                <WheelDefs />
                {THEMES.map((t, i) => (
                  <g
                    key={t.id}
                    className="cursor-pointer"
                    onClick={(e) => {
                      if (spinning) return;
                      setTheme(t.id, { x: e.clientX, y: e.clientY });
                    }}
                  >
                    <Wedge i={i} r={100} label />
                  </g>
                ))}
              </motion.svg>
              <button
                type="button"
                onClick={spin}
                className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-black bg-white text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_#111] transition-transform hover:scale-105 active:scale-95"
              >
                {spinning ? "…" : "Spin"}
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-black/60">Click a slice to pick, or spin for luck.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Open the style wheel"
        className="group flex items-center gap-2 rounded-full border-2 border-black bg-[#f4f1ea] p-1 sm:pr-4 text-sm font-semibold shadow-[3px_3px_0_#111] transition-transform hover:-translate-y-0.5"
      >
        <span className="relative block size-8 sm:size-10">
          <svg viewBox="0 0 20 16" className="absolute -top-1.5 left-1/2 z-10 w-2.5 -translate-x-1/2" aria-hidden>
            <path d="M0 0H20L10 16Z" fill="#111" />
          </svg>
          <motion.svg viewBox="0 0 80 80" className="size-full" style={{ rotate: rot }}>
            <WheelDefs />
            {THEMES.map((t, i) => (
              <Wedge key={t.id} i={i} r={40} />
            ))}
          </motion.svg>
        </span>
        <span className="wheel-label hidden leading-tight sm:block">
          {THEMES[idx]?.name}
          <span className="block text-[10px] font-medium text-black/55">tap to change style</span>
        </span>
      </button>
    </div>
  );
}
