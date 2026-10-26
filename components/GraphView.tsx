"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/data/site";
import { useTheme } from "./theme";

// An Obsidian-style graph: a force layout you can drag, where hovering a
// node lights up everything it connects to.

type GNode = { id: string; label: string; tech: boolean; x: number; y: number; vx: number; vy: number; deg: number; fixed?: boolean };

export default function GraphView({ project, highlight, compact = false }: { project: Project; highlight?: string[]; compact?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const lit = useRef<string[]>([]);
  lit.current = highlight ?? [];
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const css = getComputedStyle(canvas);
    const col = (v: string) => css.getPropertyValue(v).trim() || "#888";
    const C = { fg: col("--fg"), muted: col("--muted"), accent: col("--accent"), tech: col("--accent-3"), line: col("--border-strong"), font: css.getPropertyValue("--font-label") };

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const nodes: GNode[] = [
      ...project.flow.nodes.map((n) => ({ id: n.id, label: n.label, tech: false, x: (n.x / 480) * w, y: (n.y / 360) * h, vx: 0, vy: 0, deg: 0 })),
      ...Object.keys(project.uses).map((t, i) => {
        const a = (i / Object.keys(project.uses).length) * Math.PI * 2;
        return { id: `t:${t}`, label: t, tech: true, x: w / 2 + Math.cos(a) * w * 0.4, y: h / 2 + Math.sin(a) * h * 0.4, vx: 0, vy: 0, deg: 0 };
      }),
    ];
    const idx = new Map(nodes.map((n, i) => [n.id, i]));
    const links: [number, number][] = [
      ...project.flow.edges.map(([a, b]) => [idx.get(a)!, idx.get(b)!] as [number, number]),
      ...Object.entries(project.uses).flatMap(([t, ids]) => ids.map((id) => [idx.get(`t:${t}`)!, idx.get(id)!] as [number, number])),
    ].filter(([a, b]) => a !== undefined && b !== undefined);
    links.forEach(([a, b]) => {
      nodes[a].deg++;
      nodes[b].deg++;
    });
    const nbrs = nodes.map(() => new Set<number>());
    links.forEach(([a, b]) => {
      nbrs[a].add(b);
      nbrs[b].add(a);
    });

    let hover = -1, dragging = -1, alpha = 1, raf = 0, visible = true;
    const radius = (n: GNode) => (n.tech ? 3.5 : 4) + Math.min(n.deg, 6) * 0.9;

    const step = () => {
      if (alpha > 0.005) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            let dx = a.x - b.x, dy = a.y - b.y;
            const d2 = Math.max(dx * dx + dy * dy, 40);
            const f = (6500 / d2) * alpha;
            const d = Math.sqrt(d2);
            dx /= d;
            dy /= d;
            a.vx += dx * f; a.vy += dy * f;
            b.vx -= dx * f; b.vy -= dy * f;
          }
        }
        const L = Math.min(w, h) * 0.27;
        for (const [ai, bi] of links) {
          const a = nodes[ai], b = nodes[bi];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.max(Math.hypot(dx, dy), 1);
          const f = ((d - L) / d) * 0.04 * alpha;
          a.vx += dx * f; a.vy += dy * f;
          b.vx -= dx * f; b.vy -= dy * f;
        }
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.vx += (w / 2 - n.x) * 0.003 * alpha;
          n.vy += (h / 2 - n.y) * 0.005 * alpha;
          if (i === dragging) continue;
          n.vx *= 0.82;
          n.vy *= 0.82;
          n.x = Math.max(20, Math.min(w - 20, n.x + n.vx));
          n.y = Math.max(16, Math.min(h - 22, n.y + n.vy));
        }
        alpha *= 0.992;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const focus = hover >= 0 ? hover : dragging;
      // Walkthrough highlight: the step's nodes glow, their neighbours stay visible
      const hl = new Set(lit.current.map((id) => idx.get(id)).filter((x): x is number => x !== undefined));
      const useHl = focus < 0 && hl.size > 0;
      const near = (i: number) => hl.has(i) || [...hl].some((h) => nbrs[h].has(i));
      const lit2 = (i: number) => (useHl ? near(i) : focus < 0 || i === focus || nbrs[focus].has(i));
      for (const [a, b] of links) {
        const on = useHl ? hl.has(a) && hl.has(b) : focus >= 0 && (a === focus || b === focus);
        const any = useHl || focus >= 0;
        ctx.strokeStyle = on ? C.accent : C.line;
        ctx.globalAlpha = any && !on ? 0.12 : on ? 0.95 : 0.55;
        ctx.lineWidth = on ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.stroke();
      }
      ctx.textAlign = "center";
      nodes.forEach((n, i) => {
        const on = lit2(i);
        const hot = i === focus || (useHl && hl.has(i));
        ctx.globalAlpha = on ? 1 : 0.15;
        if (hot) {
          ctx.fillStyle = C.accent;
          ctx.globalAlpha = 0.22;
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius(n) + 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        ctx.fillStyle = hot ? C.accent : n.tech ? C.tech : C.fg;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius(n) + (hot ? 2.5 : 0), 0, Math.PI * 2);
        ctx.fill();
        ctx.font = `${hot ? "600 12px" : "10.5px"} ${C.font}`;
        ctx.fillStyle = hot ? C.fg : n.tech ? C.tech : C.muted;
        ctx.globalAlpha = on ? (hot ? 1 : 0.75) : 0.1;
        ctx.fillText(n.label, n.x, n.y + radius(n) + 13);
      });
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (!visible) return;
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const pick = (x: number, y: number) => {
      let best = -1, bd = 18 * 18;
      nodes.forEach((n, i) => {
        const d = (n.x - x) ** 2 + (n.y - y) ** 2;
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      return best;
    };
    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const down = (e: PointerEvent) => {
      const [x, y] = pos(e);
      dragging = pick(x, y);
      if (dragging >= 0) {
        canvas.setPointerCapture(e.pointerId);
        alpha = Math.max(alpha, 0.5);
      }
    };
    const move = (e: PointerEvent) => {
      const [x, y] = pos(e);
      if (dragging >= 0) {
        nodes[dragging].x = x;
        nodes[dragging].y = y;
        alpha = Math.max(alpha, 0.3);
      } else hover = pick(x, y);
      canvas.style.cursor = dragging >= 0 ? "grabbing" : hover >= 0 ? "grab" : "default";
    };
    const up = () => (dragging = -1);
    const leave = () => (hover = -1);
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointerleave", leave);
    const ro = new ResizeObserver(() => {
      resize();
      alpha = 0.6;
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, [project, theme]);

  return (
    <div className={compact ? "h-full" : ""}>
      <canvas ref={ref} className={`block w-full touch-none ${compact ? "h-full" : "h-[360px]"}`} aria-label={`${project.title} knowledge graph: components and the technology behind them`} />
      {!compact && <div className="flex flex-wrap items-center gap-4 border-t border-border px-4 py-3 font-mono text-[11px] text-muted">
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-fg" />component</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-accent-3" />technology</span>
        <span className="ml-auto">drag nodes · hover to trace links</span>
      </div>}
    </div>
  );
}
