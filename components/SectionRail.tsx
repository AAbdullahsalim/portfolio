"use client";

import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { projects } from "@/data/site";
import { scrollToSection } from "./theme";

export type SectionItem = {
  id: string;
  label: string;
  sub?: string;
};

const SECTIONS: SectionItem[] = [
  { id: "top", label: "Top" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "story", label: "Story" },
  { id: "work", label: "Work", sub: "6 projects" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "stack", label: "Tech Stack" },
  { id: "contact", label: "Contact" },
];

export default function SectionRail() {
  const [activeSection, setActiveSection] = useState<string>("top");
  const [activeProject, setActiveProject] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();

  // Track the active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = SECTIONS.map((s) => s.id);
    const projectIds = projects.map((p) => `project-${p.slug}`);
    const allIds = [...sectionIds, ...projectIds];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id.startsWith("project-")) {
              setActiveSection("work");
              setActiveProject(id.replace("project-", ""));
            } else if (id) {
              setActiveSection(id);
              if (id !== "work") setActiveProject("");
            }
          }
        });
      },
      { rootMargin: "-35% 0px -40% 0px" },
    );

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const currentLabel = useMemo(() => {
    const s = SECTIONS.find((x) => x.id === activeSection);
    if (!s) return "Portfolio";
    if (activeSection === "work" && activeProject) {
      const p = projects.find((x) => x.slug === activeProject);
      return p ? `Work · ${p.title}` : "Work";
    }
    return s.label;
  }, [activeSection, activeProject]);

  return (
    <>
      {/* Desktop Vertical Elevator Rail */}
      <aside
        aria-label="Page navigation rail"
        className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1.5 lg:flex select-none"
      >
        <div className="relative flex flex-col items-center py-2 px-1 rounded-full bg-elevated/80 border border-border/80 shadow-xl shadow-black/20 backdrop-blur-md">
          {/* Track line behind dots */}
          <div className="absolute top-4 bottom-4 w-[2px] bg-border-strong/40" />

          {SECTIONS.map((sec, i) => {
            const isActive = activeSection === sec.id;
            const isHovered = hovered === sec.id;

            return (
              <div
                key={sec.id}
                className="relative flex items-center justify-center p-1.5"
                onMouseEnter={() => setHovered(sec.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Clickable node button */}
                <button
                  type="button"
                  onClick={() => scrollToSection(`#${sec.id}`)}
                  className={`group relative flex items-center justify-center size-5 rounded-full transition-all duration-300 ${
                    isActive ? "scale-110" : "hover:scale-125"
                  }`}
                  aria-label={`Jump to ${sec.label}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Outer pulse ring for active */}
                  {isActive && (
                    <motion.span
                      layoutId="rail-glow"
                      className="absolute inset-0 rounded-full bg-accent/20 ring-2 ring-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}

                  {/* Core dot */}
                  <span
                    className={`size-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-accent shadow-[0_0_8px_var(--accent)]"
                        : "bg-muted/50 group-hover:bg-fg group-hover:scale-125"
                    }`}
                  />
                </button>

                {/* Floating tooltips on hover or active */}
                <AnimatePresence>
                  {(isHovered || (isActive && hovered === null)) && (
                    <motion.div
                      initial={{ opacity: 0, x: 8, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="pointer-events-none absolute right-8 whitespace-nowrap rounded-lg border border-border bg-surface px-2.5 py-1 text-xs shadow-lg backdrop-blur-md"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold mr-1.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium text-fg">{sec.label}</span>
                      {sec.id === "work" && activeProject && (
                        <span className="ml-1 text-[11px] text-muted font-normal">
                          · {projects.find((p) => p.slug === activeProject)?.title}
                        </span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Mobile Floating Mini Section Bar (under the main nav) */}
      <div className="fixed top-[4.6rem] inset-x-4 z-40 flex justify-center lg:hidden pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-border/80 bg-elevated/90 px-3.5 py-1 text-[11px] shadow-lg backdrop-blur-md">
          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-muted uppercase tracking-wider">Section:</span>
          <span className="font-semibold text-fg">{currentLabel}</span>
          <button
            type="button"
            onClick={() => {
              const curIdx = SECTIONS.findIndex((s) => s.id === activeSection);
              const next = SECTIONS[(curIdx + 1) % SECTIONS.length];
              scrollToSection(`#${next.id}`);
            }}
            className="ml-1 rounded px-1.5 py-0.5 font-mono text-[10px] text-accent hover:bg-accent/10 active:scale-95"
            title="Next section"
          >
            Next ↓
          </button>
        </div>
      </div>
    </>
  );
}
