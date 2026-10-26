"use client";

import type { Project } from "@/data/site";

// Concept screens: what each product's interface could look like.
// Built from theme tokens so they restyle with the site.

const Pill = ({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "accent-2" | "accent-3" | "accent-4" | "muted" }) => (
  <span
    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9.5px] font-medium"
    style={{
      background: tone === "muted" ? "color-mix(in oklab, var(--fg) 8%, transparent)" : `color-mix(in oklab, var(--${tone}) 18%, transparent)`,
      color: tone === "muted" ? "var(--muted)" : `var(--${tone})`,
    }}
  >
    {children}
  </span>
);
const Box = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border border-border bg-surface p-2.5 ${className}`}>{children}</div>
);
const Label = ({ children }: { children: React.ReactNode }) => <p className="mb-1.5 font-mono text-[8.5px] uppercase tracking-widest text-subtle">{children}</p>;
const Bars = ({ values, tone = "accent" }: { values: number[]; tone?: string }) => (
  <div className="flex h-14 items-end gap-1">
    {values.map((v, i) => (
      <span key={i} className="flex-1 rounded-t-sm" style={{ height: `${v}%`, background: i === values.length - 1 ? `var(--${tone})` : `color-mix(in oklab, var(--${tone}) 35%, transparent)` }} />
    ))}
  </div>
);

function FinBot() {
  return (
    <div className="grid h-full grid-cols-[110px_1fr_130px] gap-2 p-2 text-[10px]">
      <div className="space-y-1">
        <Label>Reviews</Label>
        {[
          ["Q3 10-Q filing", "accent"],
          ["Loan book audit", "accent-2"],
          ["AML batch #42", "accent"],
          ["Basel III pack", "muted"],
        ].map(([t, c], i) => (
          <div key={t} className={`flex items-center gap-1.5 rounded-md px-1.5 py-1 ${i === 0 ? "bg-elevated text-fg" : "text-muted"}`}>
            <span className="size-1.5 rounded-full" style={{ background: c === "muted" ? "var(--subtle)" : `var(--${c})` }} />
            {t}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="display text-[15px]">Q3 10-Q review</p>
          <Pill>● 3 agents running</Pill>
        </div>
        {[
          ["Capital adequacy ratio", "14.2% ≥ 10.5%", "pass"],
          ["Liquidity coverage", "118% ≥ 100%", "pass"],
          ["Related-party disclosure", "Note 14 missing", "flag"],
        ].map(([k, v, s]) => (
          <Box key={k} className="flex items-center justify-between !py-1.5">
            <div>
              <p className="text-fg">{k}</p>
              <p className="font-mono text-[9px] text-subtle">{v}</p>
            </div>
            <Pill tone={s === "pass" ? "accent" : "accent-2"}>{s === "pass" ? "✓ pass" : "⚠ flagged"}</Pill>
          </Box>
        ))}
        <Box>
          <Label>Ratios vs. last 6 quarters · mcp:viz</Label>
          <Bars values={[52, 60, 48, 66, 70, 74]} />
        </Box>
      </div>
      <div>
        <Label>Trace</Label>
        <ol className="space-y-1.5 border-l border-border pl-2 font-mono text-[9px]">
          {["router → compliance", "doc_agent.extract", "mcp:db.query 120ms", "mcp:calc.ratio", "guardrails ✓", "report_agent.write", "langfuse ✓ 0.94"].map((s, i) => (
            <li key={s} className={i === 6 ? "text-accent" : "text-muted"}>
              {s}
            </li>
          ))}
        </ol>
        <button type="button" tabIndex={-1} className="mt-3 w-full rounded-md bg-accent py-1.5 text-[10px] font-semibold text-on-accent">
          Export report
        </button>
      </div>
    </div>
  );
}

function Health() {
  return (
    <div className="grid h-full grid-cols-[1fr_150px] gap-2 p-2 text-[10.5px]">
      <div className="flex flex-col gap-2">
        <div className="ml-auto max-w-[80%] rounded-xl rounded-br-sm bg-accent px-3 py-2 text-on-accent">
          Max daily acetaminophen dose for an adult with chronic liver disease?
        </div>
        <div className="max-w-[90%] rounded-xl rounded-bl-sm border border-border bg-surface px-3 py-2 leading-relaxed">
          Guidance in the indexed protocols recommends a reduced ceiling of <b>2 g/day</b> for patients with chronic liver disease
          <sup className="mx-0.5 rounded bg-accent/20 px-1 text-accent">1</sup>, and avoiding use with regular alcohol intake
          <sup className="mx-0.5 rounded bg-accent/20 px-1 text-accent">2</sup>.
          <div className="mt-2 flex gap-1">
            <Pill>grounded ✓</Pill>
            <Pill tone="muted">2 sources</Pill>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-subtle">
          Ask about a protocol…<span className="ml-auto grid size-5 place-items-center rounded-full bg-accent text-on-accent">↑</span>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Sources</Label>
        {[
          ["Hepatic dosing protocol", "p. 12", 92],
          ["Analgesic formulary 2024", "p. 47", 81],
          ["OTC safety leaflet", "p. 2", 44],
        ].map(([t, p, s], i) => (
          <Box key={t as string} className={i === 2 ? "opacity-50" : ""}>
            <p className="font-medium">
              <span className="text-accent">[{i + 1}]</span> {t}
            </p>
            <p className="font-mono text-[9px] text-subtle">{p} · rerank {s as number}%</p>
            <div className="mt-1 h-1 rounded bg-border">
              <div className="h-1 rounded bg-accent" style={{ width: `${s}%` }} />
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
}

function Hospitality() {
  const demand = [3, 4, 5, 9, 9, 6, 4, 3, 4, 6, 8, 10, 7, 4, 2, 3, 5, 7, 9, 8, 5, 4, 5, 6, 9, 10, 8, 6];
  return (
    <div className="grid h-full grid-cols-[1fr_140px] gap-2 p-2 text-[10px]">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="display text-[15px]">Rate studio · Deluxe King</p>
          <Pill>AI pricing on</Pill>
        </div>
        <Box>
          <Label>Next 4 weeks · suggested nightly rate</Label>
          <div className="grid grid-cols-7 gap-1">
            {demand.map((d, i) => (
              <div key={i} className="rounded px-1 py-1 text-center font-mono text-[8.5px]" style={{ background: `color-mix(in oklab, var(--accent) ${d * 9}%, var(--surface))`, color: d > 7 ? "var(--on-accent)" : "var(--fg)" }}>
                ${96 + d * 8}
              </div>
            ))}
          </div>
        </Box>
        <div className="grid grid-cols-2 gap-2">
          <Box>
            <Label>Occupancy forecast</Label>
            <p className="display text-xl">86%</p>
            <Bars values={[40, 55, 62, 70, 78, 86]} tone="accent-3" />
          </Box>
          <Box>
            <Label>For guest #4821</Label>
            {["Spa package", "Late checkout", "Airport pickup"].map((r, i) => (
              <div key={r} className="flex justify-between py-0.5">
                <span>{r}</span>
                <span className="font-mono text-subtle">{(0.82 - i * 0.13).toFixed(2)}</span>
              </div>
            ))}
          </Box>
        </div>
      </div>
      <Box className="relative overflow-hidden !p-0">
        <p className="absolute left-2 top-2 z-10 font-mono text-[8.5px] text-muted">CAM_02 · LOBBY</p>
        <div className="h-full bg-[radial-gradient(ellipse_at_50%_100%,color-mix(in_oklab,var(--fg)_12%,transparent),transparent_70%)]">
          <svg viewBox="0 0 140 220" className="h-full w-full">
            <g fill="color-mix(in oklab, var(--fg) 20%, transparent)">
              <circle cx="50" cy="105" r="13" /><rect x="32" y="122" width="36" height="98" rx="14" />
              <circle cx="102" cy="120" r="10" /><rect x="88" y="133" width="28" height="87" rx="11" />
            </g>
            <rect x="26" y="86" width="48" height="134" fill="none" stroke="var(--accent)" strokeWidth="2" />
            <rect x="26" y="74" width="46" height="12" fill="var(--accent)" />
            <text x="29" y="83" fontSize="8" fill="var(--on-accent)" fontFamily="var(--font-label)">guest .97</text>
            <rect x="84" y="104" width="38" height="116" fill="none" stroke="var(--accent-3)" strokeWidth="2" />
          </svg>
        </div>
        <p className="absolute inset-x-2 bottom-2 rounded bg-bg/80 px-2 py-1 text-center text-[9px]">2 guests · check-in desk notified</p>
      </Box>
    </div>
  );
}

function Archive() {
  return (
    <div className="grid h-full grid-cols-[1fr_130px] gap-2 p-2 text-[10px]">
      <div className="space-y-2">
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5">
          <span className="text-subtle">⌕</span> invoices 2019 EMEA
          <span className="ml-auto flex gap-1">
            <Pill tone="muted">Finance</Pill>
            <Pill tone="muted">Retain 7y</Pill>
          </span>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="grid grid-cols-[1.2fr_1fr_0.9fr_0.7fr] bg-elevated px-2 py-1.5 font-mono text-[8.5px] uppercase tracking-wider text-subtle">
            <span>Record</span><span>Source</span><span>Retention</span><span>Check</span>
          </div>
          {[
            ["INV-19-00412", "SAP ECC", "2026-12", "✓"],
            ["INV-19-00413", "SAP ECC", "2026-12", "✓"],
            ["CN-19-00088", "Oracle AR", "2026-12", "✓"],
            ["INV-19-00415", "SAP ECC", "Legal hold", "✓"],
            ["INV-19-00419", "Legacy FTP", "2026-12", "…"],
          ].map((r, i) => (
            <div key={r[0]} className={`grid grid-cols-[1.2fr_1fr_0.9fr_0.7fr] px-2 py-1.5 ${i % 2 ? "bg-surface" : ""}`}>
              <span className="font-mono">{r[0]}</span>
              <span className="text-muted">{r[1]}</span>
              <span className={r[2] === "Legal hold" ? "text-accent-2" : "text-muted"}>{r[2]}</span>
              <span className={r[3] === "✓" ? "text-accent" : "text-subtle"}>{r[3] === "✓" ? "✓ sha256" : "verifying"}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Box>
          <Label>Migration</Label>
          <p className="font-medium">Batch 14 of 20</p>
          <div className="mt-1.5 h-1.5 rounded bg-border">
            <div className="h-1.5 w-[70%] rounded bg-accent" />
          </div>
          <p className="mt-1 font-mono text-[8.5px] text-subtle">0 checksum mismatches</p>
        </Box>
        <Box>
          <Label>Audit log</Label>
          {["a.khan viewed INV-19-00412", "policy: 7y applied", "export by finance-ro", "legal hold set"].map((l) => (
            <p key={l} className="truncate border-b border-border py-1 text-[9px] text-muted last:border-0">
              {l}
            </p>
          ))}
        </Box>
      </div>
    </div>
  );
}

function Relay() {
  return (
    <div className="grid h-full grid-cols-[120px_1fr_120px] gap-2 p-2 text-[10px]">
      <div className="space-y-1">
        <Label>Outreach list</Label>
        {[
          ["Sara M.", "🇬🇧", "Follow-up", "accent-2"],
          ["Omar K.", "🇦🇪", "Calling", "accent"],
          ["Lena B.", "🇩🇪", "New", "muted"],
          ["Jon P.", "🇨🇦", "Booked", "accent-3"],
          ["Aiko T.", "🇸🇬", "New", "muted"],
        ].map(([n, f, s, c]) => (
          <div key={n} className={`flex items-center justify-between rounded-md px-1.5 py-1 ${s === "Calling" ? "bg-elevated" : ""}`}>
            <span>
              {f} {n}
            </span>
            <Pill tone={c as "accent"}>{s}</Pill>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center rounded-xl border border-border bg-surface p-3">
        <span className="grid size-11 place-items-center rounded-full bg-accent font-semibold text-on-accent">OK</span>
        <p className="mt-1.5 font-medium">Omar K. · Dubai</p>
        <p className="font-mono text-[9.5px] text-accent">● 02:14 · via browser</p>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((k) => (
            <span key={k} className="grid size-6 place-items-center rounded-full bg-elevated font-mono text-[10px]">
              {k}
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <span className="grid size-7 place-items-center rounded-full bg-elevated">🎙</span>
          <span className="grid size-7 place-items-center rounded-full bg-elevated">⏸</span>
          <span className="grid size-7 place-items-center rounded-full bg-[#e5484d] text-white">✕</span>
        </div>
      </div>
      <div className="space-y-2">
        <Box>
          <Label>Notes</Label>
          <p className="text-muted">Interested in Q1 pilot. Send deck + pricing.</p>
        </Box>
        <Box>
          <Label>Outcome</Label>
          <div className="flex flex-wrap gap-1">
            <Pill>Interested</Pill>
            <Pill tone="muted">Callback</Pill>
            <Pill tone="muted">No answer</Pill>
          </div>
        </Box>
        <Box>
          <Label>This month</Label>
          <p className="display text-lg">212 calls</p>
          <p className="font-mono text-[9px] text-subtle">logged by webhook</p>
        </Box>
      </div>
    </div>
  );
}

function Workforce() {
  return (
    <div className="space-y-2 p-2 text-[10px]">
      <div className="flex items-center justify-between">
        <span className="rounded-md border border-border bg-surface px-2 py-1">Acme Logistics ▾</span>
        <span className="flex gap-1">
          <Pill tone="muted">Daily</Pill>
          <Pill>Weekly</Pill>
          <Pill tone="muted">Monthly</Pill>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Attendance", "94.1%", "+1.2"],
          ["Overtime hrs", "312", "+18%"],
          ["Absence rate", "3.2%", "−0.4"],
        ].map(([k, v, d]) => (
          <Box key={k}>
            <Label>{k}</Label>
            <p className="display text-lg leading-none">{v}</p>
            <p className={`mt-0.5 font-mono text-[9px] ${d.startsWith("+1") || d.startsWith("−") ? "text-accent" : "text-accent-2"}`}>{d} vs last wk</p>
          </Box>
        ))}
      </div>
      <div className="grid grid-cols-[1.3fr_1fr] gap-2">
        <Box>
          <Label>Overtime by site</Label>
          <Bars values={[30, 42, 38, 55, 48, 62, 88]} tone="accent-2" />
          <div className="mt-1 flex justify-between font-mono text-[8px] text-subtle">
            <span>Mon</span><span>Sun</span>
          </div>
        </Box>
        <Box className="border-accent/40">
          <Label>✦ AI insight</Label>
          <p className="leading-snug">
            Overtime rose <b>18%</b>, almost all from night shifts at the Lahore warehouse. Two open roles there would cover it.
          </p>
        </Box>
      </div>
      <div className="flex items-center justify-between rounded-md border border-dashed border-border-strong px-2.5 py-1.5 text-muted">
        <span>Next: Weekly ops report → 14 managers</span>
        <span className="font-mono text-[9px]">Mon 08:00</span>
      </div>
    </div>
  );
}

const SCREENS = { finbot: FinBot, health: Health, hospitality: Hospitality, archive: Archive, relay: Relay, workforce: Workforce };
const URLS = {
  finbot: "finbot.app/reviews/q3-10q",
  health: "assistant.clinic/chat",
  hospitality: "rates.hotel/studio",
  archive: "archive.internal/search",
  relay: "relay.app/dialer",
  workforce: "insights.app/acme/weekly",
};

export default function Mockup({ project }: { project: Project }) {
  const Screen = SCREENS[project.mockup];
  return (
    <div>
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto rounded-md bg-elevated px-3 py-0.5 font-mono text-[10px] text-muted">{URLS[project.mockup]}</span>
      </div>
      <div className="h-[316px] overflow-hidden bg-bg">
        <Screen />
      </div>
      <p className="border-t border-border px-4 py-3 font-mono text-[11px] text-subtle">Interface concept · illustrative data</p>
    </div>
  );
}
