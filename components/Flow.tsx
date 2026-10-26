"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Flow as FlowData, FlowNode } from "@/data/site";

const width = (n: FlowNode) => Math.min(132, Math.max(78, n.label.length * 6.2 + 22));

function Node({ n, on }: { n: FlowNode; on: boolean }) {
  const w = width(n);
  const stroke = on ? "var(--accent)" : "color-mix(in oklab, var(--fg) 28%, transparent)";
  const fill = on ? "color-mix(in oklab, var(--accent) 16%, var(--surface))" : "var(--surface)";
  const label = (
    <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={n.kind === "agent" ? 10.5 : 9.5} fontWeight={n.kind === "agent" ? 600 : 400} fill="var(--fg)" fontFamily="var(--font-label)">
      {n.label}
    </text>
  );
  const t = { transition: "all .35s" };

  if (n.kind === "router")
    return (
      <g>
        <rect x={n.x - 13} y={n.y - 13} width="26" height="26" transform={`rotate(45 ${n.x} ${n.y})`} fill="var(--bg)" stroke={on ? "var(--accent)" : "var(--accent-2)"} strokeWidth="2" style={t} />
        <text x={n.x + 24} y={n.y + 4} fontSize="9.5" fill="var(--muted)" fontFamily="var(--font-label)">
          {n.label}
        </text>
      </g>
    );
  if (n.kind === "store")
    return (
      <g style={t}>
        <path d={`M${n.x - w / 2} ${n.y - 10} v20 a${w / 2} 6 0 0 0 ${w} 0 v-20`} fill={fill} stroke={stroke} strokeWidth="1.5" />
        <ellipse cx={n.x} cy={n.y - 10} rx={w / 2} ry="6" fill={fill} stroke={stroke} strokeWidth="1.5" />
        <text x={n.x} y={n.y + 8} textAnchor="middle" fontSize="9.5" fill="var(--fg)" fontFamily="var(--font-label)">
          {n.label}
        </text>
      </g>
    );
  const r = n.kind === "io" || n.kind === "hub" ? 15 : n.kind === "agent" ? 10 : 6;
  const h = n.kind === "agent" ? 34 : 28;
  return (
    <g>
      <rect
        x={n.x - w / 2}
        y={n.y - h / 2}
        width={w}
        height={h}
        rx={r}
        fill={fill}
        stroke={n.kind === "hub" && !on ? "var(--accent-3)" : stroke}
        strokeWidth={n.kind === "agent" ? 2 : 1.5}
        strokeDasharray={n.kind === "tool" ? "3 3" : undefined}
        style={t}
      />
      {label}
    </g>
  );
}

export default function FlowDiagram({ flow, title, highlight, compact = false }: { flow: FlowData; title: string; highlight?: string[]; compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const [route, setRoute] = useState(0);
  const byId = Object.fromEntries(flow.nodes.map((n) => [n.id, n]));
  const r = flow.routes[route];
  // A walkthrough step can light up its own nodes instead of the cycling routes
  const path = highlight && highlight.length ? highlight : r.path;
  const onRoute = new Set(path);
  const routeEdges = new Set(
    highlight && highlight.length
      ? flow.edges.filter(([a, b]) => onRoute.has(a) && onRoute.has(b)).map(([a, b]) => `${a}>${b}`)
      : r.path.slice(1).map((id, i) => `${r.path[i]}>${id}`),
  );
  const pts = path.map((id) => byId[id]).filter(Boolean);
  const d = `M${pts.map((p) => `${p.x} ${p.y}`).join(" L")}`;

  useEffect(() => {
    if (!inView || highlight) return;
    const t = setInterval(() => setRoute((v) => (v + 1) % flow.routes.length), 3600);
    return () => clearInterval(t);
  }, [inView, flow.routes.length, highlight]);

  return (
    <div ref={ref} className={compact ? "h-full" : ""}>
      <div className={compact ? "h-full" : "overflow-x-auto"}>
        <svg viewBox="0 0 480 360" className={`block w-full ${compact ? "h-full" : "min-w-[440px]"}`} role="img" aria-label={`${title} workflow`}>
          {flow.groups?.map((g) => (
            <g key={g.label}>
              <rect x={g.x} y={g.y} width={g.w} height={g.h} rx="12" fill={`var(--${g.tone})`} fillOpacity="0.06" stroke={`var(--${g.tone})`} strokeOpacity="0.35" strokeDasharray="2 4" />
              <text x={g.x + 10} y={g.y + 14} fontSize="8.5" letterSpacing="1.5" fill={`var(--${g.tone})`} fontFamily="var(--font-label)">
                {g.label}
              </text>
            </g>
          ))}
          <g fill="none" strokeWidth="1.3">
            {flow.edges.map(([a, b]) => {
              const A = byId[a], B = byId[b];
              const hot = routeEdges.has(`${a}>${b}`) || routeEdges.has(`${b}>${a}`);
              return (
                <path
                  key={`${a}-${b}`}
                  d={`M${A.x} ${A.y} L${B.x} ${B.y}`}
                  stroke={hot ? "var(--accent)" : "color-mix(in oklab, var(--fg) 18%, transparent)"}
                  className={hot ? "flow-line" : ""}
                  strokeWidth={hot ? 2 : 1.3}
                />
              );
            })}
          </g>
          {flow.nodes.map((n) => (
            <Node key={n.id} n={n} on={onRoute.has(n.id)} />
          ))}
          <g key={path.join("-")}>
            <circle r="9" fill="var(--accent)" opacity="0.25">
              <animateMotion dur={`${Math.max(pts.length, 2) * 0.55}s`} repeatCount="indefinite" path={d} />
            </circle>
            <circle r="4" fill="var(--accent)">
              <animateMotion dur={`${pts.length * 0.55}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        </svg>
      </div>
      {!compact && <div className="flex items-start gap-2 border-t border-border px-4 py-3 font-mono text-[11px] text-muted">
        <span className="mt-1 size-1.5 shrink-0 animate-pulse rounded-full bg-accent" />
        <motion.span key={route} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>
          {r.caption}
        </motion.span>
        <span className="ml-auto flex shrink-0 gap-1">
          {flow.routes.map((_, i) => (
            <button key={i} type="button" onClick={() => setRoute(i)} aria-label={`Show path ${i + 1}`} className={`size-2 rounded-full ${i === route ? "bg-accent" : "bg-border-strong"}`} />
          ))}
        </span>
      </div>}
    </div>
  );
}
