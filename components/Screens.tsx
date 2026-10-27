"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/site";

// Realistic product screens for each project, designed at 1280×800 and
// scaled to fit. Regions light up as the scroll walkthrough explains them.

/* ---------- region highlighting ---------- */

const Active = createContext<{ region: string | null; step: number }>({ region: null, step: -1 });

function R({ id, children, className = "", style }: { id: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const { region, step } = useContext(Active);
  const on = region === id;
  const dim = region !== null && !on;
  return (
    <div
      className={`relative transition-all duration-500 ${className}`}
      style={{
        ...style,
        opacity: dim ? 0.35 : 1,
        filter: dim ? "saturate(0.4)" : "none",
        boxShadow: on ? "0 0 0 2px var(--b), 0 0 0 9px color-mix(in oklab, var(--b) 18%, transparent), 0 20px 40px -12px rgba(15,23,42,.25)" : undefined,
        zIndex: on ? 5 : undefined,
        transform: on ? "scale(1.012)" : undefined,
      }}
    >
      {on && (
        <span className="absolute -top-3 left-3 z-10 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white" style={{ background: "var(--b)" }}>
          Step {step + 1}
        </span>
      )}
      {children}
    </div>
  );
}

/* ---------- small UI kit ---------- */

const ICONS: Record<string, string> = {
  home: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  bot: "M12 3v3M5 9h14v10H5zM9 14h.01M15 14h.01M2 13v3M22 13v3",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  file: "M14 3H6v18h12V7zM14 3v4h4",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  cog: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12l2-1-1-3-2 .5-1.5-1.5L17 5l-3-1-1 2h-2L10 4 7 5l.5 2L6 8.5 4 8l-1 3 2 1v0l-2 1 1 3 2-.5L7.5 17 7 19l3 1 1-2h2l1 2 3-1-.5-2 1.5-1.5 2 .5 1-3z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.5-4.5",
  bell: "M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  users: "M16 19v-1a4 4 0 0 0-8 0v1M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 19v-1a3 3 0 0 0-2-3M4 19v-1a3 3 0 0 1 2-3",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  db: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  cal: "M4 6h16v14H4zM4 10h16M9 3v4M15 3v4",
  cam: "M3 8h4l2-3h6l2 3h4v11H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  lock: "M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4",
};
function Icon({ n, size = 18, className = "" }: { n: string; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={ICONS[n]} />
    </svg>
  );
}

type Nav = { icon: string; label: string; active?: boolean }[];
function Shell({ brand, name, logo, nav, title, sub, actions, dark = false, children, footer }: { brand: string; name: string; logo: string; nav: Nav; title: string; sub?: string; actions?: React.ReactNode; dark?: boolean; children: React.ReactNode; footer?: React.ReactNode }) {
  const c = dark
    ? { bg: "#0b0b12", side: "#11111b", line: "#ffffff14", text: "#ececf3", muted: "#8b8ba3", card: "#151522" }
    : { bg: "#f6f7f9", side: "#ffffff", line: "#e6e8ec", text: "#0f172a", muted: "#64748b", card: "#ffffff" };
  return (
    <div
      className="flex h-[800px] w-[1280px] font-[family-name:var(--font-geist-sans)] text-[13px] antialiased"
      style={{ ["--b" as string]: brand, ["--line" as string]: c.line, ["--muted" as string]: c.muted, ["--card" as string]: c.card, background: c.bg, color: c.text, letterSpacing: "-0.005em", textTransform: "none" }}
    >
      <aside className="flex w-[220px] shrink-0 flex-col border-r px-3 py-4" style={{ background: c.side, borderColor: c.line }}>
        <div className="mb-6 flex items-center gap-2.5 px-2">
          <span className="grid size-8 place-items-center rounded-lg text-[13px] font-bold text-white" style={{ background: brand }}>
            {logo}
          </span>
          <span className="text-[15px] font-semibold">{name}</span>
        </div>
        <nav className="space-y-0.5">
          {nav.map((n) => (
            <div
              key={n.label}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2"
              style={n.active ? { background: `color-mix(in oklab, ${brand} 12%, transparent)`, color: brand, fontWeight: 600 } : { color: c.muted }}
            >
              <Icon n={n.icon} />
              {n.label}
            </div>
          ))}
        </nav>
        <div className="mt-auto">{footer}</div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[60px] shrink-0 items-center gap-4 border-b px-6" style={{ borderColor: c.line, background: c.side }}>
          <div>
            <p className="text-[15px] font-semibold leading-tight">{title}</p>
            {sub && <p className="text-[11.5px]" style={{ color: c.muted }}>{sub}</p>}
          </div>
          <div className="ml-auto flex items-center gap-3">
            {actions}
            <span className="flex h-8 w-56 items-center gap-2 rounded-lg border px-2.5" style={{ borderColor: c.line, color: c.muted }}>
              <Icon n="search" size={15} /> Search…
              <span className="ml-auto rounded border px-1 text-[10px]" style={{ borderColor: c.line }}>⌘K</span>
            </span>
            <span style={{ color: c.muted }}>
              <Icon n="bell" />
            </span>
            <span className="grid size-8 place-items-center rounded-full text-[11px] font-semibold text-white" style={{ background: "#334155" }}>
              SM
            </span>
          </div>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden p-5">{children}</div>
      </main>
    </div>
  );
}

const Card = ({ children, className = "", title, right }: { children: React.ReactNode; className?: string; title?: string; right?: React.ReactNode }) => (
  <div className={`rounded-xl border p-4 ${className}`} style={{ borderColor: "var(--line)", background: "var(--card)" }}>
    {title && (
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[13px] font-semibold">{title}</p>
        {right}
      </div>
    )}
    {children}
  </div>
);
const Badge = ({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "ok" | "warn" | "bad" | "muted" }) => {
  const map = { brand: "var(--b)", ok: "#16a34a", warn: "#d97706", bad: "#dc2626", muted: "#64748b" };
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ color: map[tone], background: `color-mix(in oklab, ${map[tone]} 12%, transparent)` }}>
      {children}
    </span>
  );
};
const Btn = ({ children, primary }: { children: React.ReactNode; primary?: boolean }) => (
  <span className="inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[12.5px] font-medium" style={primary ? { background: "var(--b)", color: "#fff", borderColor: "var(--b)" } : { borderColor: "var(--line)" }}>
    {children}
  </span>
);
const Muted = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={className} style={{ color: "var(--muted)" }}>
    {children}
  </span>
);

function LineChart({ values, w = 520, h = 150, labels }: { values: number[]; w?: number; h?: number; labels?: string[] }) {
  const max = Math.max(...values) * 1.1, min = Math.min(...values) * 0.85;
  const pts = values.map((v, i) => [30 + (i * (w - 40)) / (values.length - 1), 10 + (1 - (v - min) / (max - min)) * (h - 34)]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="30" x2={w - 10} y1={10 + i * ((h - 34) / 3)} y2={10 + i * ((h - 34) / 3)} stroke="var(--line)" />
      ))}
      <path d={`${d} L${pts[pts.length - 1][0]} ${h - 24} L30 ${h - 24}Z`} fill="var(--b)" opacity="0.08" />
      <path d={d} fill="none" stroke="var(--b)" strokeWidth="2.5" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="var(--card)" stroke="var(--b)" strokeWidth="2" />
      ))}
      {labels?.map((l, i) => (
        <text key={l} x={30 + (i * (w - 40)) / (labels.length - 1)} y={h - 6} textAnchor="middle" fontSize="11" fill="var(--muted)">
          {l}
        </text>
      ))}
    </svg>
  );
}
function BarChart({ values, labels, h = 140, hi = -1 }: { values: number[]; labels: string[]; h?: number; hi?: number }) {
  const max = Math.max(...values);
  return (
    <div>
      <div className="flex items-end gap-3" style={{ height: h }}>
        {values.map((v, i) => (
          <div key={i} className="flex-1 rounded-t-md" style={{ height: `${(v / max) * 100}%`, background: i === hi ? "var(--b)" : "color-mix(in oklab, var(--b) 28%, transparent)" }} />
        ))}
      </div>
      <div className="mt-2 flex gap-3">
        {labels.map((l) => (
          <span key={l} className="flex-1 text-center text-[11px]" style={{ color: "var(--muted)" }}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
const Spark = ({ v }: { v: number[] }) => {
  const max = Math.max(...v), min = Math.min(...v);
  return (
    <svg viewBox="0 0 80 24" className="h-6 w-20">
      <path d={v.map((x, i) => `${i ? "L" : "M"}${(i * 80) / (v.length - 1)} ${22 - ((x - min) / (max - min || 1)) * 20}`).join(" ")} fill="none" stroke="var(--b)" strokeWidth="2" />
    </svg>
  );
};

/* ---------------- FinBot ---------------- */

function FinBotScreen() {
  return (
    <Shell
      brand="#4f46e5"
      name="FinBot"
      logo="F"
      title="Q3 2025 · 10-Q filing review"
      sub="Requested by Sarah Malik · Risk · started 09:41"
      actions={<><Badge>● 3 agents running</Badge><Btn>Share</Btn><Btn primary>Export PDF</Btn></>}
      nav={[{ icon: "home", label: "Overview" }, { icon: "shield", label: "Reviews", active: true }, { icon: "bot", label: "Agents" }, { icon: "list", label: "Rule library" }, { icon: "file", label: "Reports" }, { icon: "clock", label: "Traces" }, { icon: "cog", label: "Settings" }]}
    >
      <div className="grid h-full grid-cols-[1fr_340px] gap-4">
        <div className="flex min-h-0 flex-col gap-4">
          <R id="chat" className="rounded-xl">
            <Card>
              <div className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-700 text-[11px] font-semibold text-white">SM</span>
                <div className="flex-1">
                  <p className="font-medium">Review the Q3 10-Q for capital adequacy, liquidity and disclosure completeness. Flag anything that needs sign-off.</p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <Muted className="text-[12px]">Router →</Muted>
                    <Badge>document_agent</Badge>
                    <Badge>compliance_agent</Badge>
                    <Badge>report_agent</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </R>
          <R id="checks" className="rounded-xl">
            <Card title="Rule checks" right={<Muted className="text-[12px]">14 rules · 12 passed · 1 flagged · 1 n/a</Muted>}>
              <div className="grid grid-cols-[1.6fr_1fr_0.8fr_0.8fr_0.8fr] border-b pb-2 text-[11.5px] font-medium" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
                <span>Rule</span><span>Source</span><span>Value</span><span>Threshold</span><span>Status</span>
              </div>
              {[
                ["CET1 capital ratio", "Note 9 · p.31", "12.8%", "≥ 7.0%", "ok"],
                ["Total capital ratio", "Note 9 · p.31", "14.2%", "≥ 10.5%", "ok"],
                ["Liquidity coverage ratio", "MD&A · p.44", "118%", "≥ 100%", "ok"],
                ["Leverage ratio", "Note 9 · p.32", "5.6%", "≥ 3.0%", "ok"],
                ["Related-party disclosure", "Note 14", "missing", "required", "flag"],
              ].map((r) => (
                <div key={r[0]} className="grid grid-cols-[1.6fr_1fr_0.8fr_0.8fr_0.8fr] items-center border-b py-2.5 last:border-0" style={{ borderColor: "var(--line)" }}>
                  <span className="font-medium">{r[0]}</span>
                  <Muted>{r[1]}</Muted>
                  <span className="font-mono text-[12.5px]">{r[2]}</span>
                  <Muted className="font-mono text-[12.5px]">{r[3]}</Muted>
                  <span>{r[4] === "ok" ? <Badge tone="ok">✓ Pass</Badge> : <Badge tone="warn">⚠ Flagged</Badge>}</span>
                </div>
              ))}
            </Card>
          </R>
          <R id="chart" className="rounded-xl">
            <Card title="Capital ratios · last 6 quarters" right={<Badge tone="muted">generated by mcp:viz</Badge>}>
              <LineChart values={[12.1, 12.6, 13.0, 13.4, 13.9, 14.2]} h={130} labels={["Q2 24", "Q3 24", "Q4 24", "Q1 25", "Q2 25", "Q3 25"]} />
            </Card>
          </R>
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          <R id="doc" className="rounded-xl">
            <Card title="10-Q_Q3_2025.pdf" right={<Muted className="text-[12px]">p. 31</Muted>}>
              <div className="space-y-2 rounded-lg bg-slate-50 p-3 font-serif text-[12px] leading-relaxed text-slate-600">
                <p>Note 9 — Regulatory Capital</p>
                <p>
                  As of September 30, the Company&apos;s Common Equity Tier 1 ratio was <mark className="rounded bg-indigo-100 px-0.5 text-indigo-700">12.8%</mark> and its Total Capital ratio was{" "}
                  <mark className="rounded bg-indigo-100 px-0.5 text-indigo-700">14.2%</mark>, compared with regulatory minimums of 7.0% and 10.5%.
                </p>
                <p className="opacity-60">The leverage ratio stood at 5.6%…</p>
              </div>
              <p className="mt-2 text-[11.5px]"><Muted>Extracted via mcp:db.query · 3 figures matched the ledger</Muted></p>
            </Card>
          </R>
          <R id="trace" className="flex-1 rounded-xl">
            <Card title="Run trace" right={<Badge tone="ok">eval 0.94</Badge>} className="h-full">
              <ol className="relative space-y-3 border-l pl-4" style={{ borderColor: "var(--line)" }}>
                {[
                  ["router", "intent: compliance_review", "38 ms"],
                  ["document_agent", "extract figures", "1.2 s"],
                  ["mcp:db.query", "ledger lookup", "120 ms"],
                  ["compliance_agent", "14 rules", "2.4 s"],
                  ["mcp:calc.ratio", "5 ratios", "40 ms"],
                  ["guardrails", "grounded · schema · PII", "✓"],
                  ["report_agent", "summary + chart", "3.1 s"],
                ].map(([a, b, t]) => (
                  <li key={a} className="relative">
                    <span className="absolute -left-[21px] top-1 size-2.5 rounded-full border-2 bg-white" style={{ borderColor: "var(--b)" }} />
                    <div className="flex justify-between">
                      <span className="font-mono text-[12px] font-medium">{a}</span>
                      <Muted className="font-mono text-[11.5px]">{t}</Muted>
                    </div>
                    <Muted className="text-[12px]">{b}</Muted>
                  </li>
                ))}
              </ol>
            </Card>
          </R>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Workforce ---------------- */

function WorkforceScreen() {
  return (
    <Shell
      brand="#0d9488"
      name="Workforce IQ"
      logo="W"
      title="Weekly overview"
      sub="Oct 20 – Oct 26 · all sites"
      actions={
        <span className="flex rounded-lg border p-0.5 text-[12px]" style={{ borderColor: "var(--line)" }}>
          {["Daily", "Weekly", "Monthly"].map((x) => (
            <span key={x} className="rounded-md px-2.5 py-1" style={x === "Weekly" ? { background: "var(--b)", color: "#fff" } : { color: "var(--muted)" }}>
              {x}
            </span>
          ))}
        </span>
      }
      nav={[{ icon: "home", label: "Dashboard", active: true }, { icon: "file", label: "Reports" }, { icon: "users", label: "Teams" }, { icon: "db", label: "Data sources" }, { icon: "cal", label: "Schedules" }, { icon: "cog", label: "Settings" }]}
      footer={
        <R id="tenant" className="rounded-lg">
          <div className="rounded-lg border p-2.5" style={{ borderColor: "var(--line)" }}>
            <p className="text-[11px]"><Muted>Workspace</Muted></p>
            <p className="font-semibold">Acme Logistics ▾</p>
            <p className="mt-1 flex items-center gap-1 text-[11px]"><Icon n="lock" size={12} /><Muted>Isolated · row-level security</Muted></p>
          </div>
        </R>
      }
    >
      <div className="grid h-full grid-cols-[1fr_330px] gap-4">
        <div className="flex min-h-0 flex-col gap-4">
          <R id="kpis" className="rounded-xl">
            <div className="grid grid-cols-4 gap-3">
              {[
                ["Attendance", "94.1%", "+1.2 pts", [90, 91, 92, 93, 92, 94]],
                ["Overtime", "312 h", "+18%", [210, 230, 250, 240, 280, 312]],
                ["Absence rate", "3.2%", "−0.4 pts", [4, 3.9, 3.7, 3.6, 3.4, 3.2]],
                ["Headcount", "1,284", "+12", [1250, 1258, 1262, 1270, 1272, 1284]],
              ].map(([k, v, d, s]) => (
                <Card key={k as string}>
                  <Muted className="text-[12px]">{k as string}</Muted>
                  <div className="mt-1 flex items-end justify-between">
                    <p className="text-[24px] font-semibold tracking-tight">{v as string}</p>
                    <Spark v={s as number[]} />
                  </div>
                  <p className="text-[11.5px]" style={{ color: (d as string) === "+18%" ? "#d97706" : "#16a34a" }}>{d as string} vs last week</p>
                </Card>
              ))}
            </div>
          </R>
          <Card title="Overtime by site" right={<Muted className="text-[12px]">hours</Muted>}>
            <BarChart values={[38, 44, 41, 52, 47, 58, 96]} labels={["Karachi", "Multan", "Dubai", "Riyadh", "Doha", "Leeds", "Lahore WH"]} h={150} hi={6} />
          </Card>
          <R id="schedule" className="rounded-xl">
            <Card title="Scheduled reports" right={<Btn>+ New schedule</Btn>}>
              {[
                ["Weekly ops report", "Mondays 08:00", "14 managers", "Email + PDF"],
                ["Daily attendance", "Every day 07:00", "32 supervisors", "Email"],
                ["Monthly payroll summary", "1st of month", "Finance", "PDF"],
              ].map((r) => (
                <div key={r[0]} className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] items-center border-t py-2.5" style={{ borderColor: "var(--line)" }}>
                  <span className="font-medium">{r[0]}</span>
                  <Muted>{r[1]}</Muted>
                  <Muted>{r[2]}</Muted>
                  <Badge tone="muted">{r[3]}</Badge>
                </div>
              ))}
            </Card>
          </R>
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          <R id="insight" className="rounded-xl">
            <Card>
              <p className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: "var(--b)" }}>
                <Icon n="spark" size={15} /> AI insight
              </p>
              <p className="text-[14px] leading-relaxed">
                Overtime rose <b>18%</b> this week, and almost all of it came from <b>night shifts at the Lahore warehouse</b>. Two open roles there have been unfilled for 3 weeks. Filling them would cover roughly 70 hours.
              </p>
              <p className="mt-3 text-[11.5px]"><Muted>Written 06:02 · from 4 tables · reviewed by evals</Muted></p>
            </Card>
          </R>
          <R id="sources" className="flex-1 rounded-xl">
            <Card title="Data sources" className="h-full" right={<Badge tone="ok">All synced</Badge>}>
              {[
                ["Timeclock", "02:00", "41,280 rows"],
                ["HRIS", "02:05", "1,284 people"],
                ["Rostering", "02:08", "9,610 shifts"],
                ["Payroll export", "02:11", "1,284 rows"],
              ].map((r) => (
                <div key={r[0]} className="flex items-center gap-3 border-t py-2.5 first:border-0" style={{ borderColor: "var(--line)" }}>
                  <span className="grid size-8 place-items-center rounded-lg" style={{ background: "color-mix(in oklab, var(--b) 12%, transparent)", color: "var(--b)" }}>
                    <Icon n="db" size={15} />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{r[0]}</p>
                    <Muted className="text-[11.5px]">{r[2]}</Muted>
                  </div>
                  <Muted className="text-[11.5px]">✓ {r[1]}</Muted>
                </div>
              ))}
              <p className="mt-2 rounded-lg bg-slate-50 p-2 font-mono text-[11px] text-slate-500">airflow · nightly_elt · 12 dbt models · 02:14</p>
            </Card>
          </R>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Healthcare ---------------- */

function HealthScreen() {
  return (
    <Shell
      brand="#0284c7"
      name="Clinical Assistant"
      logo="+"
      title="Ask the protocols"
      sub="Answers only from your indexed documents"
      nav={[{ icon: "spark", label: "Ask", active: true }, { icon: "file", label: "Library" }, { icon: "clock", label: "History" }, { icon: "chart", label: "Evaluations" }, { icon: "cog", label: "Settings" }]}
      footer={
        <R id="eval" className="rounded-lg">
          <div className="rounded-lg border p-2.5" style={{ borderColor: "var(--line)" }}>
            <p className="text-[11px]"><Muted>Eval set v7 · 320 questions</Muted></p>
            <p className="mt-1 flex justify-between"><span>Answer accuracy</span><b>0.91</b></p>
            <p className="flex justify-between"><span>Groundedness</span><b>0.97</b></p>
          </div>
        </R>
      }
    >
      <div className="grid h-full grid-cols-[1fr_360px] gap-4">
        <div className="flex min-h-0 flex-col gap-4">
          <R id="question" className="ml-auto max-w-[560px] rounded-2xl">
            <div className="rounded-2xl rounded-br-md px-4 py-3 text-[14px] text-white" style={{ background: "var(--b)" }}>
              What is the maximum daily acetaminophen dose for an adult with chronic liver disease?
            </div>
          </R>
          <R id="answer" className="max-w-[680px] rounded-2xl">
            <Card>
              <p className="text-[14px] leading-relaxed">
                For adults with chronic liver disease, the hepatic dosing protocol recommends a reduced maximum of <b>2 g per day</b>, split into doses no closer than 6 hours apart
                <sup className="ml-0.5 rounded px-1 text-[10px] font-semibold" style={{ background: "color-mix(in oklab, var(--b) 15%, transparent)", color: "var(--b)" }}>1</sup>. Patients who drink alcohol regularly should avoid it unless a clinician approves
                <sup className="ml-0.5 rounded px-1 text-[10px] font-semibold" style={{ background: "color-mix(in oklab, var(--b) 15%, transparent)", color: "var(--b)" }}>2</sup>.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Badge tone="ok">✓ Grounded in 2 sources</Badge>
                <Badge tone="muted">confidence high</Badge>
                <Muted className="ml-auto text-[12px]">Copy · Feedback</Muted>
              </div>
            </Card>
          </R>
          <div className="mt-auto flex h-12 items-center gap-3 rounded-xl border px-4" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
            <Muted>Ask about a protocol, dose or interaction…</Muted>
            <span className="ml-auto grid size-8 place-items-center rounded-lg text-white" style={{ background: "var(--b)" }}>↑</span>
          </div>
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          <R id="library" className="rounded-xl">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Library</p>
                  <Muted className="text-[12px]">1,842 documents · indexed 2 h ago</Muted>
                </div>
                <Badge tone="ok">vector + keyword</Badge>
              </div>
            </Card>
          </R>
          <R id="sources" className="flex-1 rounded-xl">
            <Card title="Sources" className="h-full" right={<Muted className="text-[12px]">reranked</Muted>}>
              {[
                ["Hepatic dosing protocol", "p. 12 · §4.2", 0.92, "…a reduced maximum of 2 g/day is recommended for patients with chronic hepatic impairment…"],
                ["Analgesic formulary 2024", "p. 47", 0.81, "…avoid with regular alcohol intake unless approved by the treating clinician…"],
                ["OTC safety leaflet", "p. 2", 0.38, "…do not exceed 4 g in 24 hours in healthy adults…"],
              ].map(([t, p, s, q], i) => (
                <div key={t as string} className={`border-t py-3 first:border-0 ${i === 2 ? "opacity-45" : ""}`} style={{ borderColor: "var(--line)" }}>
                  <div className="flex justify-between">
                    <p className="font-medium">
                      <span style={{ color: "var(--b)" }}>[{i + 1}]</span> {t as string}
                    </p>
                    <Muted className="font-mono text-[11.5px]">{(s as number).toFixed(2)}</Muted>
                  </div>
                  <Muted className="text-[11.5px]">{p as string}</Muted>
                  <p className="mt-1 text-[12px] italic text-slate-500">{q as string}</p>
                  <div className="mt-1.5 h-1 rounded-full bg-slate-100">
                    <div className="h-1 rounded-full" style={{ width: `${(s as number) * 100}%`, background: "var(--b)" }} />
                  </div>
                </div>
              ))}
            </Card>
          </R>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Relay ---------------- */

function RelayScreen() {
  return (
    <Shell
      dark
      brand="#8b5cf6"
      name="Relay"
      logo="R"
      title="Outreach · Gulf Q4"
      sub="48 contacts · 21 called today"
      actions={<Badge tone="ok">● Online</Badge>}
      nav={[{ icon: "phone", label: "Dialer", active: true }, { icon: "users", label: "Contacts" }, { icon: "list", label: "Campaigns" }, { icon: "clock", label: "Call log" }, { icon: "cog", label: "Settings" }]}
    >
      <div className="grid h-full grid-cols-[1fr_300px_300px] gap-4">
        <R id="pipeline" className="rounded-xl">
          <Card title="Pipeline" className="h-full" right={<Muted className="text-[12px]">sorted by next action</Muted>}>
            {[
              ["Omar Khalid", "🇦🇪 Dubai", "Calling", "brand"],
              ["Sara Malik", "🇬🇧 London", "Follow-up Thu", "warn"],
              ["Jon Peters", "🇨🇦 Toronto", "Meeting booked", "ok"],
              ["Lena Braun", "🇩🇪 Berlin", "New", "muted"],
              ["Aiko Tanaka", "🇸🇬 Singapore", "New", "muted"],
              ["Rami Haddad", "🇸🇦 Riyadh", "No answer ×2", "bad"],
              ["Nadia Aziz", "🇶🇦 Doha", "Interested", "ok"],
            ].map(([n, c, s, t]) => (
              <div key={n} className="flex items-center gap-3 border-t py-2.5 first:border-0" style={{ borderColor: "var(--line)" }}>
                <span className="grid size-8 place-items-center rounded-full bg-white/10 text-[11px] font-semibold">
                  {n.split(" ").map((x) => x[0]).join("")}
                </span>
                <div className="flex-1">
                  <p className="font-medium">{n}</p>
                  <Muted className="text-[11.5px]">{c}</Muted>
                </div>
                <Badge tone={t as "ok"}>{s}</Badge>
              </div>
            ))}
          </Card>
        </R>
        <div className="flex flex-col gap-4">
          <R id="call" className="rounded-xl">
            <Card>
              <div className="text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full text-[16px] font-semibold text-white" style={{ background: "var(--b)" }}>OK</span>
                <p className="mt-2 text-[15px] font-semibold">Omar Khalid</p>
                <Muted className="text-[12px]">+971 50 ••• 4821 · via browser</Muted>
                <p className="mt-1 font-mono text-[20px]" style={{ color: "var(--b)" }}>02:14</p>
                <svg viewBox="0 0 200 30" className="mx-auto mt-1 h-7 w-48">
                  {Array.from({ length: 40 }).map((_, i) => {
                    const hh = 4 + Math.abs(Math.sin(i * 1.7)) * 22;
                    return <rect key={i} x={i * 5} y={15 - hh / 2} width="3" height={hh} rx="1.5" fill="var(--b)" opacity={0.4 + (i % 3) * 0.2} />;
                  })}
                </svg>
                <div className="mt-3 flex justify-center gap-3">
                  {["🎙", "⏸", "⌨︎"].map((x) => (
                    <span key={x} className="grid size-10 place-items-center rounded-full bg-white/10">{x}</span>
                  ))}
                  <span className="grid size-10 place-items-center rounded-full bg-red-500 text-white">✕</span>
                </div>
              </div>
            </Card>
          </R>
          <R id="dialer" className="flex-1 rounded-xl">
            <Card className="h-full">
              <div className="mb-3 rounded-lg bg-white/5 px-3 py-2 text-center font-mono text-[15px]">+971 50 •••</div>
              <div className="grid grid-cols-3 gap-2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((k) => (
                  <span key={k} className="grid h-9 place-items-center rounded-lg bg-white/5 text-[15px]">{k}</span>
                ))}
              </div>
              <div className="mt-3 grid h-9 place-items-center rounded-lg font-semibold text-white" style={{ background: "#16a34a" }}>Call via browser</div>
            </Card>
          </R>
        </div>
        <R id="log" className="rounded-xl">
          <Card title="Recent calls" className="h-full" right={<Muted className="text-[11.5px]">logged by webhook</Muted>}>
            {[
              ["Jon Peters", "08:12", "Meeting booked", "ok"],
              ["Nadia Aziz", "05:40", "Interested", "ok"],
              ["Rami Haddad", "00:00", "No answer", "bad"],
              ["Sara Malik", "03:05", "Call back Thu", "warn"],
              ["Ali Raza", "01:22", "Not a fit", "muted"],
            ].map(([n, d, o, t]) => (
              <div key={n} className="border-t py-2.5 first:border-0" style={{ borderColor: "var(--line)" }}>
                <div className="flex justify-between">
                  <span className="font-medium">{n}</span>
                  <Muted className="font-mono text-[12px]">{d}</Muted>
                </div>
                <Badge tone={t as "ok"}>{o}</Badge>
              </div>
            ))}
            <div className="mt-3 rounded-lg bg-white/5 p-3">
              <Muted className="text-[11.5px]">This month</Muted>
              <p className="text-[20px] font-semibold">212 calls · 9 meetings</p>
            </div>
          </Card>
        </R>
      </div>
    </Shell>
  );
}

/* ---------------- Archive ---------------- */

function ArchiveScreen() {
  return (
    <Shell
      brand="#2563eb"
      name="Archive Console"
      logo="A"
      title="Search records"
      sub="Signed in as finance-readonly"
      nav={[{ icon: "search", label: "Search", active: true }, { icon: "db", label: "Collections" }, { icon: "list", label: "Migrations" }, { icon: "shield", label: "Policies" }, { icon: "clock", label: "Audit log" }, { icon: "cog", label: "Admin" }]}
    >
      <div className="grid h-full grid-cols-[1fr_320px] gap-4">
        <div className="flex min-h-0 flex-col gap-4">
          <R id="search" className="rounded-xl">
            <Card>
              <div className="flex h-11 items-center gap-2 rounded-lg border px-3 text-[14px]" style={{ borderColor: "var(--line)" }}>
                <Icon n="search" size={16} /> invoices 2019 EMEA
                <span className="ml-auto flex gap-1.5">
                  <Badge tone="muted">Finance</Badge>
                  <Badge tone="muted">2019</Badge>
                  <Badge tone="muted">EMEA</Badge>
                </span>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-[12px]"><Icon n="lock" size={13} /><Muted>Role: finance-readonly · 3 collections visible · exports logged</Muted></p>
            </Card>
          </R>
          <R id="table" className="flex-1 rounded-xl">
            <Card title="2,418 records" className="h-full" right={<Btn>Export CSV</Btn>}>
              <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr] border-b pb-2 text-[11.5px] font-medium" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
                <span>Record</span><span>Source system</span><span>Archived</span><span>Retention</span><span>Integrity</span>
              </div>
              {[
                ["INV-19-00412", "ERP (EMEA)", "2023-04-11", "until 2026-12", "ok"],
                ["INV-19-00413", "ERP (EMEA)", "2023-04-11", "until 2026-12", "ok"],
                ["CN-19-00088", "AR ledger", "2023-04-12", "until 2026-12", "ok"],
                ["INV-19-00415", "ERP (EMEA)", "2023-04-12", "Legal hold", "ok"],
                ["INV-19-00419", "File share", "2023-04-13", "until 2026-12", "ok"],
                ["INV-19-00422", "File share", "2023-04-13", "until 2026-12", "verifying"],
                ["INV-19-00430", "ERP (EMEA)", "2023-04-14", "until 2026-12", "ok"],
              ].map((r) => (
                <div key={r[0]} className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr] items-center border-b py-2.5 last:border-0" style={{ borderColor: "var(--line)" }}>
                  <span className="font-mono text-[12.5px] font-medium">{r[0]}</span>
                  <Muted>{r[1]}</Muted>
                  <Muted>{r[2]}</Muted>
                  <span>{r[3] === "Legal hold" ? <Badge tone="warn">Legal hold</Badge> : <Muted>{r[3]}</Muted>}</span>
                  <span>{r[4] === "ok" ? <Badge tone="ok">✓ sha-256 match</Badge> : <Badge tone="muted">verifying…</Badge>}</span>
                </div>
              ))}
            </Card>
          </R>
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          <R id="migration" className="rounded-xl">
            <Card title="Migration · batch 14 of 20">
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[70%] rounded-full" style={{ background: "var(--b)" }} />
              </div>
              <div className="mt-2 flex justify-between text-[12px]">
                <Muted>1.24M records verified</Muted>
                <span className="font-medium text-green-600">0 mismatches</span>
              </div>
            </Card>
          </R>
          <R id="policy" className="rounded-xl">
            <Card title="Retention policy">
              {[["Finance · invoices", "7 years"], ["HR · personnel", "10 years"], ["Legal · contracts", "Until expiry + 6y"]].map(([a, b]) => (
                <div key={a} className="flex justify-between border-t py-2 first:border-0" style={{ borderColor: "var(--line)" }}>
                  <span>{a}</span>
                  <Muted>{b}</Muted>
                </div>
              ))}
              <p className="mt-2"><Badge tone="warn">3 records on legal hold</Badge></p>
            </Card>
          </R>
          <R id="audit" className="flex-1 rounded-xl">
            <Card title="Audit log" className="h-full">
              {[
                ["10:42", "a.khan viewed INV-19-00412"],
                ["10:40", "finance-ro exported 120 rows"],
                ["09:15", "policy 'Finance 7y' applied to batch 14"],
                ["09:02", "legal hold set on INV-19-00415"],
              ].map(([t, e]) => (
                <div key={t} className="flex gap-3 border-t py-2 text-[12px] first:border-0" style={{ borderColor: "var(--line)" }}>
                  <Muted className="font-mono">{t}</Muted>
                  <span>{e}</span>
                </div>
              ))}
            </Card>
          </R>
        </div>
      </div>
    </Shell>
  );
}

/* ---------------- Hospitality ---------------- */

function HospitalityScreen() {
  const demand = [52, 58, 64, 88, 94, 71, 55, 50, 60, 66, 82, 97, 90, 62, 48, 54, 63, 75, 92, 86, 66, 57, 61, 70, 91, 98, 89, 68];
  return (
    <Shell
      brand="#d97706"
      name="RateStudio"
      logo="R"
      title="Deluxe King · November"
      sub="AI pricing on · last updated 06:00"
      actions={<><Btn>Overrides</Btn><Btn primary>Publish rates</Btn></>}
      nav={[{ icon: "cal", label: "Rates", active: true }, { icon: "chart", label: "Forecast" }, { icon: "users", label: "Guests" }, { icon: "cam", label: "Front desk" }, { icon: "file", label: "Reports" }]}
    >
      <div className="grid h-full grid-cols-[1fr_320px] gap-4">
        <div className="flex min-h-0 flex-col gap-4">
          <R id="kpis" className="rounded-xl">
            <div className="grid grid-cols-4 gap-3">
              {[["Occupancy (fcst)", "86%"], ["ADR", "$142"], ["RevPAR", "$122"], ["Pickup (7d)", "+38"]].map(([k, v]) => (
                <Card key={k}>
                  <Muted className="text-[12px]">{k}</Muted>
                  <p className="mt-1 text-[24px] font-semibold tracking-tight">{v}</p>
                </Card>
              ))}
            </div>
          </R>
          <R id="calendar" className="rounded-xl">
            <Card title="Suggested nightly rate" right={<Muted className="text-[12px]">darker = higher demand</Muted>}>
              <div className="grid grid-cols-7 gap-1.5">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <span key={d} className="text-center text-[11px]" style={{ color: "var(--muted)" }}>{d}</span>
                ))}
                {demand.map((d, i) => (
                  <div key={i} className="rounded-md px-2 py-1.5" style={{ background: `color-mix(in oklab, var(--b) ${Math.round((d - 40) * 1.2)}%, #fff)`, color: d > 80 ? "#fff" : "#0f172a" }}>
                    <p className="text-[10px] opacity-70">{i + 1}</p>
                    <p className="text-[13px] font-semibold">${Math.round(90 + d * 0.65)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </R>
          <R id="forecast" className="flex-1 rounded-xl">
            <Card title="Occupancy forecast · next 14 nights" className="h-full">
              <LineChart values={[64, 70, 88, 94, 72, 58, 61, 66, 82, 96, 90, 64, 52, 60]} h={120} />
            </Card>
          </R>
        </div>
        <div className="flex min-h-0 flex-col gap-4">
          <R id="recs" className="rounded-xl">
            <Card title="Guest #4821 · arriving today">
              {[["Spa package", 0.82], ["Late checkout", 0.69], ["Airport pickup", 0.56]].map(([r, s]) => (
                <div key={r as string} className="flex items-center gap-3 border-t py-2 first:border-0" style={{ borderColor: "var(--line)" }}>
                  <span className="flex-1">{r as string}</span>
                  <div className="h-1.5 w-20 rounded-full bg-slate-100">
                    <div className="h-1.5 rounded-full" style={{ width: `${(s as number) * 100}%`, background: "var(--b)" }} />
                  </div>
                  <Muted className="w-8 text-right font-mono text-[12px]">{(s as number).toFixed(2)}</Muted>
                </div>
              ))}
            </Card>
          </R>
          <R id="camera" className="flex-1 rounded-xl">
            <Card title="Lobby · camera 2" className="h-full" right={<Badge tone="bad">● live</Badge>}>
              <div className="relative h-[220px] overflow-hidden rounded-lg bg-slate-800">
                <svg viewBox="0 0 280 220" className="h-full w-full">
                  <rect width="280" height="220" fill="#1e293b" />
                  <rect y="160" width="280" height="60" fill="#334155" />
                  <g fill="#64748b">
                    <circle cx="90" cy="92" r="16" /><rect x="68" y="112" width="44" height="100" rx="18" />
                    <circle cx="190" cy="104" r="13" /><rect x="172" y="120" width="36" height="92" rx="15" />
                  </g>
                  <rect x="60" y="70" width="60" height="146" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                  <rect x="60" y="54" width="74" height="16" fill="#f59e0b" />
                  <text x="64" y="66" fontSize="11" fill="#111">guest 0.97</text>
                  <rect x="164" y="86" width="52" height="128" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                </svg>
              </div>
              <p className="mt-2 text-[12px]"><Muted>2 guests detected · front desk notified</Muted></p>
            </Card>
          </R>
        </div>
      </div>
    </Shell>
  );
}

const SCREENS = { finbot: FinBotScreen, workforce: WorkforceScreen, health: HealthScreen, relay: RelayScreen, archive: ArchiveScreen, hospitality: HospitalityScreen };
export const URLS: Record<Project["mockup"], string> = {
  finbot: "app.finbot.ai/reviews/q3-2025-10q",
  workforce: "acme.workforceiq.app/overview/weekly",
  health: "assistant.clinic/ask",
  relay: "relay.app/dialer",
  archive: "archive.internal/search?q=invoices",
  hospitality: "ratestudio.app/rates/deluxe-king",
};

/** The product screen, scaled to fit its box on both desktop and mobile */
export function ProductScreen({ project, region, step }: { project: Project; region: string | null; step: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);

  useEffect(() => {
    const el = box.current;
    if (!el) return;

    const fit = () => {
      const w = el.clientWidth || window.innerWidth || 360;
      const h = el.clientHeight || 320;
      const scaleW = w / 1280;
      const scaleH = h > 80 ? h / 800 : scaleW;
      const s = Math.max(0.18, Math.min(scaleW, scaleH));
      setScale(s);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  const Screen = SCREENS[project.mockup];
  return (
    <div ref={box} className="relative h-full w-full min-h-[280px] sm:min-h-[360px] overflow-hidden bg-[#f6f7f9]">
      <div
        className="absolute left-1/2 top-0 origin-top"
        style={{
          width: 1280,
          height: 800,
          transform: `translateX(-50%) scale(${scale})`,
          willChange: "transform",
        }}
      >
        <Active.Provider value={{ region, step }}>
          <Screen />
        </Active.Provider>
      </div>
    </div>
  );
}
