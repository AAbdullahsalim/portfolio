"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const THEMES = [
  { id: "studio", name: "Studio", blurb: "Ink, paper and one signal colour", swatch: ["#0d0d0c", "#eceae4", "#d7ff3b", "#ff6a3d"] },
  { id: "maximal", name: "Maximalism", blurb: "More is more. Jewel tones and pattern", swatch: ["#1b1442", "#ff2e88", "#ffc93c", "#00c2a8"] },
  { id: "vector", name: "Vector", blurb: "Flat shapes, cream paper, soft colour", swatch: ["#f5ead9", "#23314d", "#e07a5f", "#81b29a"] },
  { id: "pop", name: "Pop Art", blurb: "Ben-Day dots and thick ink", swatch: ["#fff8e7", "#111111", "#ff2e2e", "#ffe600"] },
  { id: "graffiti", name: "Graffiti", blurb: "Concrete wall, spray neon", swatch: ["#161616", "#b6ff00", "#ff2bd6", "#00e5ff"] },
  { id: "sketch", name: "Handwritten", blurb: "Notebook, ink and highlighter", swatch: ["#fbf8ef", "#1d2a6b", "#e6403a", "#fff27a"] },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
const KEY = "taha-style";

// Runs before paint so the saved style shows without a flash
export const themeScript = `try{var t=localStorage.getItem("${KEY}");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

type Ctx = { theme: ThemeId; setTheme: (t: ThemeId, origin?: { x: number; y: number }) => void };
const ThemeContext = createContext<Ctx>({ theme: "studio", setTheme: () => {} });
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("studio");

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme") as ThemeId | null;
    if (t && THEMES.some((x) => x.id === t)) setThemeState(t);
  }, []);

  const setTheme = useCallback((t: ThemeId, origin?: { x: number; y: number }) => {
    const apply = () => {
      document.documentElement.setAttribute("data-theme", t);
      setThemeState(t);
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

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

/** Floating "paint chip" picker for the site style */
export function StyleSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-[58]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="mb-3 w-[min(92vw,420px)] rounded-2xl border border-black/10 bg-[#f4f1ea] p-3 text-[#111] shadow-2xl"
            role="dialog"
            aria-label="Choose a style"
          >
            <p className="px-1 pb-2 pt-1 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.2em] text-black/50">Pick a style</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  data-theme={t.id}
                  onClick={(e) => {
                    setTheme(t.id, { x: e.clientX, y: e.clientY });
                    setOpen(false);
                  }}
                  className={`group relative overflow-hidden rounded-xl text-left transition-transform hover:-translate-y-0.5 ${theme === t.id ? "ring-2 ring-black ring-offset-2 ring-offset-[#f4f1ea]" : "ring-1 ring-black/10"}`}
                  style={{ background: "var(--bg)", color: "var(--fg)" }}
                  aria-pressed={theme === t.id}
                >
                  <div className="flex h-12">
                    {t.swatch.map((c) => (
                      <span key={c} className="flex-1 transition-[flex] duration-300 group-hover:first:flex-[0.4]" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="p-2.5">
                    <p className="display text-xl leading-none">{t.name}</p>
                    <p className="mt-1 text-[11px] leading-tight opacity-70">{t.blurb}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex items-center gap-2 rounded-full border border-black/10 bg-[#f4f1ea] py-1.5 pl-1.5 pr-4 text-sm font-medium text-[#111] shadow-xl transition-transform hover:scale-[1.03]"
      >
        <span className="relative grid size-8 place-items-center overflow-hidden rounded-full">
          <span className="absolute inset-0 animate-[spin_6s_linear_infinite] bg-[conic-gradient(#ff2e88,#ffc93c,#b6ff00,#00e5ff,#1e5bff,#ff2e88)]" />
          <span className="relative size-3.5 rounded-full bg-[#f4f1ea]" />
        </span>
        <span>
          Style: <span className="font-semibold">{THEMES.find((t) => t.id === theme)?.name}</span>
        </span>
      </button>
    </div>
  );
}
