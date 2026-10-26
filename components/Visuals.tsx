"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

function Frame({ title, children, footer }: { title: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-card border border-border bg-surface shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="ml-2 font-mono text-[11px] text-subtle">{title}</span>
      </div>
      <div className="bg-grid relative">{children}</div>
      {footer && <div className="border-t border-border px-4 py-3 font-mono text-[11px] text-muted">{footer}</div>}
    </div>
  );
}

const C = { accent: "#c8f031", cyan: "#22d3ee", violet: "#8b7bff", line: "#ffffff22", text: "#ededef", muted: "#a1a1aa" };

/* ---------------- FinBot: LangGraph + MCP workflow ---------------- */

const AGENTS = [
  { x: 80, label: "Document", sub: "Analysis", tool: 0, toolName: "mcp:db.query", note: "reads filings, extracts figures" },
  { x: 240, label: "Compliance", sub: "Checker", tool: 1, toolName: "mcp:calc.evaluate", note: "checks ratios against rules" },
  { x: 400, label: "Report", sub: "Generation", tool: 2, toolName: "mcp:viz.chart", note: "charts results into a report" },
];
const TOOLS = [
  { x: 80, label: "Database Query" },
  { x: 240, label: "Calculation Engine" },
  { x: 400, label: "Visualization" },
];

export function FinbotDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % 3), 3200);
    return () => clearInterval(id);
  }, [inView]);

  const a = AGENTS[active];
  const t = TOOLS[a.tool];
  // Path a request takes: user → router → agent → MCP → tool → back up → output
  const route = `M240 34 L240 92 L${a.x} 168 L${a.x} 196 L240 252 L${t.x} 318 L${t.x} 330 L${t.x} 318 L240 252 L${a.x} 196 L${a.x} 168 L240 92 L240 34`;

  return (
    <div ref={ref}>
      <Frame
        title="finbot / workflow.langgraph"
        footer={
          <span className="flex items-center gap-2">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            <motion.span key={active} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>
              router → {a.label.toLowerCase()}_{a.sub.toLowerCase()} → {a.toolName} · {a.note}
            </motion.span>
          </span>
        }
      >
        <div className="overflow-x-auto"><svg viewBox="0 0 480 360" className="block w-full min-w-[440px]" role="img" aria-label="FinBot architecture: a LangGraph router sends requests to document analysis, compliance checker and report generation agents, which call database, calculation and visualization tools through MCP servers.">
          {/* group backgrounds */}
          <rect x="16" y="70" width="448" height="146" rx="14" fill={C.violet} fillOpacity="0.06" stroke={C.violet} strokeOpacity="0.25" />
          <text x="28" y="88" fill={C.violet} fontSize="9" fontFamily="monospace" letterSpacing="1.5">LANGGRAPH · MULTI-AGENT</text>
          <rect x="16" y="232" width="448" height="116" rx="14" fill={C.accent} fillOpacity="0.04" stroke={C.accent} strokeOpacity="0.2" />
          <text x="28" y="250" fill={C.accent} fontSize="9" fontFamily="monospace" letterSpacing="1.5">MCP · TOOLS</text>

          {/* edges */}
          <g stroke={C.line} strokeWidth="1" fill="none">
            <path d="M240 34 L240 80" />
            {AGENTS.map((ag, i) => (
              <path key={i} d={`M240 104 L${ag.x} 160`} stroke={i === active ? C.violet : C.line} className={i === active ? "flow-line" : ""} />
            ))}
            {AGENTS.map((ag, i) => (
              <path key={`m${i}`} d={`M${ag.x} 200 L240 244`} stroke={i === active ? C.accent : C.line} className={i === active ? "flow-line" : ""} />
            ))}
            {TOOLS.map((tl, i) => (
              <path key={`t${i}`} d={`M240 262 L${tl.x} 312`} stroke={i === a.tool ? C.accent : C.line} className={i === a.tool ? "flow-line" : ""} />
            ))}
          </g>

          {/* user query */}
          <rect x="180" y="14" width="120" height="22" rx="11" fill="#18181c" stroke={C.line} />
          <text x="240" y="29" textAnchor="middle" fill={C.text} fontSize="10" fontFamily="monospace">user query</text>

          {/* router diamond */}
          <g>
            <rect x="226" y="78" width="28" height="28" transform="rotate(45 240 92)" fill="#09090b" stroke={C.violet} strokeWidth="1.5" />
            <text x="262" y="82" fill={C.muted} fontSize="9" fontFamily="monospace">router / state</text>
          </g>

          {/* agents */}
          {AGENTS.map((ag, i) => (
            <g key={ag.label}>
              <rect
                x={ag.x - 58}
                y={160}
                width="116"
                height="40"
                rx="10"
                fill={i === active ? "#8b7bff22" : "#111114"}
                stroke={i === active ? C.violet : C.line}
                style={{ transition: "all .4s" }}
              />
              <text x={ag.x} y={177} textAnchor="middle" fill={C.text} fontSize="10.5" fontWeight="600">{ag.label}</text>
              <text x={ag.x} y={191} textAnchor="middle" fill={C.muted} fontSize="9">{ag.sub}</text>
            </g>
          ))}

          {/* MCP hub */}
          <rect x="160" y="242" width="160" height="22" rx="11" fill="#09090b" stroke={C.accent} strokeOpacity="0.7" />
          <text x="240" y="257" textAnchor="middle" fill={C.accent} fontSize="9.5" fontFamily="monospace">Model Context Protocol</text>

          {/* tools */}
          {TOOLS.map((tl, i) => (
            <g key={tl.label}>
              <rect x={tl.x - 58} y={312} width="116" height="26" rx="8" fill={i === a.tool ? "#c8f03118" : "#111114"} stroke={i === a.tool ? C.accent : C.line} style={{ transition: "all .4s" }} />
              <text x={tl.x} y={329} textAnchor="middle" fill={C.text} fontSize="9.5" fontFamily="monospace">{tl.label}</text>
            </g>
          ))}

          {/* travelling request */}
          <g key={active}>
            <circle r="4" fill={C.accent}>
              <animateMotion dur="2.8s" repeatCount="1" fill="freeze" path={route} />
            </circle>
            <circle r="10" fill={C.accent} opacity="0.2">
              <animateMotion dur="2.8s" repeatCount="1" fill="freeze" path={route} />
            </circle>
          </g>
        </svg></div>
      </Frame>
    </div>
  );
}

/* ---------------- Healthcare RAG: hybrid retrieval ---------------- */

export function RagDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setTick((v) => v + 1), 3000);
    return () => clearInterval(id);
  }, [inView]);

  // Which chunks each retriever "finds" this round; the reranker keeps the overlap-ish top ones
  const seed = tick % 3;
  const dense = [[0, 2, 4], [1, 2, 5], [0, 3, 4]][seed];
  const sparse = [[2, 3, 4], [2, 4, 5], [0, 1, 3]][seed];
  const kept = [[2, 4], [2, 5], [0, 3]][seed];

  return (
    <div ref={ref}>
      <Frame title="assistant / retrieval.trace" footer={<span>answer cites [{kept[0] + 1}] [{kept[1] + 1}] · ungrounded claims blocked</span>}>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 p-5 sm:gap-5 sm:p-7">
          {/* documents */}
          <div className="space-y-1.5">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-subtle">Indexed chunks</p>
            {Array.from({ length: 6 }).map((_, i) => {
              const d = dense.includes(i), s = sparse.includes(i), k = kept.includes(i);
              return (
                <motion.div
                  key={i}
                  className="flex h-6 items-center gap-2 rounded-md border px-2 font-mono text-[10px]"
                  animate={{
                    borderColor: k ? "#c8f031" : d || s ? "#ffffff33" : "#ffffff14",
                    backgroundColor: k ? "#c8f03114" : "#00000000",
                  }}
                  transition={{ duration: 0.5, delay: k ? 0.9 : 0.2 }}
                >
                  <span className="text-subtle">{i + 1}</span>
                  <span className="h-1 flex-1 rounded bg-white/10" style={{ maxWidth: `${50 + ((i * 37) % 45)}%` }} />
                  <span className="flex gap-1">
                    <motion.span className="size-1.5 rounded-full bg-accent-3" animate={{ opacity: d ? 1 : 0.1 }} transition={{ delay: 0.2 }} />
                    <motion.span className="size-1.5 rounded-full bg-accent-2" animate={{ opacity: s ? 1 : 0.1 }} transition={{ delay: 0.4 }} />
                  </span>
                </motion.div>
              );
            })}
            <div className="flex gap-3 pt-2 font-mono text-[9px] text-subtle">
              <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-accent-3" />dense</span>
              <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-accent-2" />sparse</span>
            </div>
          </div>

          {/* pipeline */}
          <div className="flex flex-col items-center gap-2 font-mono text-[10px]">
            {["pgvector", "+ BM25", "fusion", "rerank"].map((s, i) => (
              <motion.span
                key={s}
                className="rounded-full border border-border bg-bg px-2.5 py-1 text-muted"
                animate={{ borderColor: ["#ffffff14", i < 2 ? "#22d3ee" : "#c8f031", "#ffffff14"] }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.25, repeat: Infinity, repeatDelay: 2.2 }}
              >
                {s}
              </motion.span>
            ))}
          </div>

          {/* answer */}
          <div className="rounded-xl border border-border bg-bg p-3">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-subtle">Answer</p>
            <motion.div key={tick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="space-y-1.5">
              <span className="block h-1.5 w-full rounded bg-white/15" />
              <span className="block h-1.5 w-11/12 rounded bg-white/15" />
              <span className="block h-1.5 w-4/5 rounded bg-white/15" />
              <span className="block h-1.5 w-2/3 rounded bg-white/15" />
              <span className="mt-2 flex gap-1">
                {kept.map((k) => (
                  <span key={k} className="rounded bg-accent/15 px-1.5 font-mono text-[9px] text-accent">[{k + 1}]</span>
                ))}
              </span>
            </motion.div>
          </div>
        </div>
      </Frame>
    </div>
  );
}

/* ---------------- Hospitality: pricing curve + vision ---------------- */

export function HospitalityVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const bars = [30, 42, 38, 55, 70, 88, 64, 48, 52, 60, 78, 92, 74, 58];
  const pts = bars.map((b, i) => `${10 + i * 20},${110 - b * 0.9 - 6}`).join(" L");

  return (
    <div ref={ref}>
      <Frame title="hospitality / models" footer={<span>forecast → price · recommender → offers · vision → check-in</span>}>
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          <div className="rounded-xl border border-border bg-bg p-3">
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-subtle">
              <span>DEMAND × PRICE</span>
              <span className="text-accent">forecast</span>
            </div>
            <svg viewBox="0 0 290 120" className="w-full">
              {bars.map((b, i) => (
                <motion.rect
                  key={i}
                  x={4 + i * 20}
                  width="12"
                  rx="2"
                  fill="#ffffff14"
                  initial={{ height: 0, y: 110 }}
                  animate={inView ? { height: b * 0.9, y: 110 - b * 0.9 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.04 }}
                />
              ))}
              <motion.path
                d={`M${pts}`}
                fill="none"
                stroke={C.accent}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-border bg-bg p-3">
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-subtle">
              <span>CAM_02 · LOBBY</span>
              <span className="flex items-center gap-1 text-red-400"><span className="size-1.5 animate-pulse rounded-full bg-red-400" />live</span>
            </div>
            <div className="relative h-[104px] rounded-md bg-[radial-gradient(ellipse_at_50%_100%,#ffffff10,transparent_70%)]">
              {/* silhouettes */}
              <svg viewBox="0 0 200 104" className="absolute inset-0 h-full w-full">
                <g fill="#ffffff18">
                  <circle cx="62" cy="38" r="11" />
                  <rect x="46" y="52" width="32" height="52" rx="12" />
                  <circle cx="140" cy="44" r="9" />
                  <rect x="127" y="56" width="26" height="48" rx="10" />
                </g>
              </svg>
              <motion.div
                className="absolute rounded-sm border-2 border-accent"
                style={{ left: "19%", top: "18%", width: "24%", height: "82%" }}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 }}
              >
                <span className="absolute -top-4 left-0 bg-accent px-1 font-mono text-[8px] text-bg">guest 0.97</span>
              </motion.div>
              <motion.div
                className="absolute rounded-sm border-2 border-accent-3"
                style={{ left: "62%", top: "30%", width: "17%", height: "70%" }}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2 }}
              >
                <span className="absolute -top-4 left-0 bg-accent-3 px-1 font-mono text-[8px] text-bg">guest 0.91</span>
              </motion.div>
              <motion.div className="absolute inset-x-0 h-px bg-accent/70 shadow-[0_0_10px] shadow-accent" animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }} />
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
}
