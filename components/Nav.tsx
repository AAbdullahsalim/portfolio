"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile, projects } from "@/data/site";
import { THEMES, scrollToSection, useTheme } from "./theme";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#story", label: "Story" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  // Highlight the section currently on screen
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="nav-shell relative flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-border bg-elevated/70 px-3 py-2 shadow-lg shadow-black/30 backdrop-blur-xl">
          <a href="#top" className="flex items-center gap-2 pl-1 font-mono text-sm font-medium tracking-tight" aria-label={profile.name}>
            <span className="relative">
              <Image src={profile.photo} alt="" width={28} height={28} className="size-7 rounded-full object-cover" />
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-elevated bg-accent" />
            </span>
            <span className="hidden font-mono sm:inline">taha.umar</span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href} className="relative">
                {active === l.href.slice(1) && (
                  <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-fg/10" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <a
                  href={l.href}
                  className={`relative rounded-full px-3 py-1.5 text-sm transition-colors hover:text-fg ${active === l.href.slice(1) ? "text-fg" : "text-muted"}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-1 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-subtle transition-colors hover:border-border-strong hover:text-fg sm:flex"
              aria-label="Open command menu"
            >
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </button>
            <a href="#contact" className="hidden rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-on-accent transition-transform hover:scale-[1.03] active:scale-95 sm:inline-block">
              Let&apos;s talk
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-full border border-border md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 h-px w-4 bg-fg transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-px w-4 bg-fg transition-opacity ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-px w-4 bg-fg transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-border bg-elevated/95 p-3 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg text-muted hover:bg-white/5 hover:text-fg">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-2xl bg-fg px-4 py-3 text-center font-medium text-bg">
              Let&apos;s talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}

type Cmd = { label: string; hint: string; run: () => void };

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { setTheme } = useTheme();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = useCallback(
    (hash: string) => {
      onClose();
      scrollToSection(hash);
    },
    [onClose],
  );

  const cmds: Cmd[] = useMemo(
    () => [
      ...links.map((l) => ({ label: `Go to ${l.label}`, hint: "section", run: () => go(l.href) })),
      ...projects.map((p) => ({ label: `Project: ${p.title}`, hint: p.year, run: () => go(`#project-${p.slug}`) })),
      ...THEMES.map((t) => ({ label: `Style: ${t.name}`, hint: t.blurb.toLowerCase(), run: () => { onClose(); setTheme(t.id); } })),
      {
        label: "Copy email address",
        hint: profile.email,
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
            onClose();
          }, 900);
        },
      },
      { label: "Send an email", hint: "mailto", run: () => (window.location.href = `mailto:${profile.email}`) },
      { label: "Open LinkedIn", hint: "linkedin.com/in/tahaumar", run: () => window.open(profile.linkedin, "_blank") },
    ],
    [go, onClose, setTheme],
  );

  const filtered = cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setI((v) => Math.min(v + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setI((v) => Math.max(v - 1, 0));
    }
    if (e.key === "Enter") filtered[i]?.run();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-label="Command menu"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-strong bg-elevated shadow-2xl"
            initial={{ scale: 0.96, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <span className="font-mono text-accent">›</span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setI(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Where to?"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-subtle"
              />
              <kbd className="font-mono text-[10px] text-subtle">ESC</kbd>
            </div>
            <ul className="max-h-80 overflow-auto p-2">
              {filtered.map((c, idx) => (
                <li key={c.label}>
                  <button
                    type="button"
                    onMouseEnter={() => setI(idx)}
                    onClick={c.run}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${idx === i ? "bg-fg/10 text-fg" : "text-muted"}`}
                  >
                    <span>{copied && c.label.startsWith("Copy") ? "Copied ✓" : c.label}</span>
                    <span className="font-mono text-[11px] text-subtle">{c.hint}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-subtle">No matches</li>}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
