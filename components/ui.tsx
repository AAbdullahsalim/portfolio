"use client";

import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

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

export function Eyebrow({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "accent-2" }) {
  const color = tone === "accent" ? "text-accent" : "text-accent-2";
  const bar = tone === "accent" ? "bg-accent" : "bg-accent-2";
  return (
    <span className={`mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest ${color}`}>
      <span aria-hidden className={`h-px w-6 ${bar}`} />
      {children}
    </span>
  );
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
      <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
        {title} <span className="font-serif text-[1.08em] font-normal italic text-gradient">{accent}</span>
      </h2>
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
