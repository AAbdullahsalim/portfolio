"use client";

import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./theme";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode; tone?: string }) {
  return (
    <span className="eyebrow mb-4 flex w-fit items-center gap-2">
      <span aria-hidden className="h-px w-6 bg-current" />
      {children}
    </span>
  );
}

/** A little hand-made mark under headings; changes with the style */
export function Flourish() {
  const { theme } = useTheme();
  if (theme === "sketch")
    return (
      <svg viewBox="0 0 220 20" className="-mt-2 mb-2 h-4 w-48" aria-hidden>
        <path d="M4 14 C60 4 120 4 216 10 M30 18 C90 10 150 12 200 15" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" filter="url(#rough)" />
      </svg>
    );
  if (theme === "pop")
    return (
      <div aria-hidden className="mb-3 flex gap-1.5">
        {["var(--accent)", "var(--accent-2)", "var(--accent-3)"].map((c) => (
          <span key={c} className="size-4 rounded-full border-2 border-black" style={{ background: c }} />
        ))}
      </div>
    );
  return null;
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  sub,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  sub?: string;
}) {
  return (
    <Reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display mb-4 text-4xl sm:text-5xl md:text-6xl">
        {title} <span className="accent-word text-[1.06em]">{accent}</span>
      </h2>
      <Flourish />
      {sub && <p className="max-w-2xl text-muted">{sub}</p>}
    </Reveal>
  );
}

/** Counts up numeric values ("100%", "6+") when scrolled into view; leaves text values alone. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = value.match(/^(\d+)(.*)$/);
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!inView || !match) return;
    const target = Number(match[1]);
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${Math.round(v)}${match[2]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>{children}</div>;
}
