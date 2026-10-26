"use client";

import { useEffect, useRef } from "react";

// A living graph of nodes. Labeled nodes are "agents" and tools; signals
// travel along edges between them. The cursor pulls nearby nodes and lights
// up connections.

const LABELS = ["router", "retriever", "pgvector", "reranker", "guardrails", "evaluator", "mcp:db", "mcp:calc", "planner", "langfuse", "embedder", "report"];

type Node = { x: number; y: number; vx: number; vy: number; r: number; label?: string; glow: number };
type Pulse = { a: number; b: number; t: number; speed: number; color: string };


export default function AgentCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let running = true;
    let lastSpawn = 0;
    const mouse = { x: -9999, y: -9999 };
    // Colours come from the active style
    let ACCENT = "215,255,59", LINE = "255,255,255", FG = "237,237,239";
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      ACCENT = cs.getPropertyValue("--canvas-dot").trim() || ACCENT;
      LINE = cs.getPropertyValue("--canvas-line").trim() || LINE;
      FG = LINE;
    };
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const LINK = () => Math.min(170, Math.max(120, w / 9));

    function init() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(95, Math.floor((w * h) / 15000));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: i < LABELS.length ? 2.6 : 1.2 + Math.random() * 1.1,
        label: i < LABELS.length && w > 640 ? LABELS[i] : undefined,
        glow: 0,
      }));
      pulses = [];
    }

    function neighbors(i: number) {
      const out: number[] = [];
      const L = LINK();
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        if (dx * dx + dy * dy < L * L) out.push(j);
      }
      return out;
    }

    function spawn() {
      const start = Math.floor(Math.random() * Math.min(LABELS.length, nodes.length));
      const n = neighbors(start);
      if (!n.length) return;
      const colors = [ACCENT, ACCENT, LINE];
      pulses.push({ a: start, b: n[Math.floor(Math.random() * n.length)], t: 0, speed: 0.012 + Math.random() * 0.012, color: colors[Math.floor(Math.random() * 3)] });
    }

    function frame(time: number) {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const L = LINK();

      for (const n of nodes) {
        // Cursor pull
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 200 * 200) {
          n.vx += dx * 0.00004;
          n.vy += dy * 0.00004;
        }
        n.vx *= 0.995;
        n.vy *= 0.995;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.glow *= 0.96;
      }

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < L) {
            ctx.strokeStyle = `rgba(${LINE},${(1 - d / L) * 0.14})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // Lines to cursor
        const n = nodes[i];
        const md = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        if (md < 180) {
          ctx.strokeStyle = `rgba(${ACCENT},${(1 - md / 180) * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          n.glow = Math.max(n.glow, 1 - md / 180);
        }
      }

      // Pulses
      if (!reduce && time - lastSpawn > 260) {
        spawn();
        lastSpawn = time;
      }
      pulses = pulses.filter((p) => {
        p.t += p.speed;
        const a = nodes[p.a], b = nodes[p.b];
        if (!a || !b) return false;
        if (p.t >= 1) {
          b.glow = 1;
          // Sometimes hop onward, like a request moving through a graph
          if (Math.random() < 0.55) {
            const n = neighbors(p.b);
            if (n.length) pulses.push({ ...p, a: p.b, b: n[Math.floor(Math.random() * n.length)], t: 0 });
          }
          return false;
        }
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.18), ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.18);
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `rgba(${p.color},0)`);
        grad.addColorStop(1, `rgba(${p.color},0.9)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = `rgba(${p.color},1)`;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
      if (pulses.length > 60) pulses.splice(0, pulses.length - 60);

      // Nodes and labels
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      for (const n of nodes) {
        if (n.glow > 0.05) {
          ctx.fillStyle = `rgba(${ACCENT},${n.glow * 0.25})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 7 * n.glow, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = n.label ? `rgba(${ACCENT},${0.7 + n.glow * 0.3})` : `rgba(${LINE},${0.3 + n.glow * 0.5})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        if (n.label) {
          ctx.fillStyle = `rgba(${FG},${0.4 + n.glow * 0.6})`;
          ctx.fillText(n.label, n.x + 7, n.y + 3);
        }
      }

      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    init();
    raf = requestAnimationFrame(frame);
    const ro = new ResizeObserver(() => init());
    ro.observe(canvas);
    // Pause when the hero is off screen
    const io = new IntersectionObserver(([e]) => {
      const vis = e.isIntersecting;
      if (vis && !running) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!vis) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
