"use client";

import { useState } from "react";
import type { Milestone, LocalizedPhase } from "@/lib/types";

const TOTAL_MONTHS = 48;

type Labels = {
  revenue: string;
  jump: string;
  targetPrefix: string;
};

export function Gantt({ phases, milestones, labels }: { phases: LocalizedPhase[]; milestones: Milestone[]; labels: Labels }) {
  const sortedPhases = [...phases].sort((a, b) => a.position - b.position);
  const [hoverPhase, setHoverPhase] = useState<LocalizedPhase | null>(null);
  const [hoverMs, setHoverMs] = useState<Milestone | null>(null);

  function jumpTo(slug: string) {
    if (typeof document === "undefined") return;
    const el = document.getElementById(`phase-${slug}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("ring-2", "ring-amber-500");
    window.setTimeout(() => el.classList.remove("ring-2", "ring-amber-500"), 1400);
  }

  return (
    <div className="card p-4 sm:p-6 overflow-x-auto relative">
      <div className="min-w-[900px]">
        <div className="grid grid-cols-[180px_1fr] items-end pb-2 border-b border-forest/10">
          <div />
          <div className="grid grid-cols-48 gap-0">
            {Array.from({ length: TOTAL_MONTHS }, (_, i) => i + 1).map((m) => (
              <div key={m} className={"text-[10px] text-center " + (m % 3 === 1 ? "muted num" : "dim")}>
                {m % 3 === 1 ? `M${m}` : ""}
              </div>
            ))}
          </div>
        </div>

        {sortedPhases.map((p) => {
          const left = ((p.start_month - 1) / TOTAL_MONTHS) * 100;
          const width = ((p.end_month - (p.start_month - 1)) / TOTAL_MONTHS) * 100;
          const isHover = hoverPhase?.id === p.id;
          return (
            <div key={p.id} className="grid grid-cols-[180px_1fr] items-center h-12 border-b border-dashed border-forest/10">
              <div className="flex items-center gap-2 pr-2">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />
                <span className="text-[12px] text-ink"><span className="num font-semibold">{p.short_name}</span> · {p.name}</span>
              </div>
              <div className="relative h-12">
                <BgGrid />
                <button
                  type="button"
                  onClick={() => jumpTo(p.slug)}
                  onMouseEnter={() => setHoverPhase(p)}
                  onMouseLeave={() => setHoverPhase((cur) => (cur?.id === p.id ? null : cur))}
                  onFocus={() => setHoverPhase(p)}
                  onBlur={() => setHoverPhase((cur) => (cur?.id === p.id ? null : cur))}
                  aria-label={`${p.short_name} ${p.name}`}
                  className={
                    "absolute top-2 h-8 rounded-md flex items-center justify-center px-2 text-[11px] font-semibold transition cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-paper " +
                    (isHover ? "scale-y-110 shadow-md" : "shadow-sm hover:scale-y-110 hover:shadow-md")
                  }
                  style={{ left: `${left}%`, width: `${width}%`, background: p.color, color: contrastInk(p.color) }}
                >
                  <span className="num tracking-wide">{p.short_name}</span>
                </button>
              </div>
            </div>
          );
        })}

        <div className="grid grid-cols-[180px_1fr] items-center h-12">
          <div className="flex items-center gap-2 pr-2">
            <span className="text-[12px] text-amber-700 font-semibold">{labels.revenue}</span>
          </div>
          <div className="relative h-12">
            <BgGrid />
            {milestones.map((m) => {
              const left = ((m.month - 0.5) / TOTAL_MONTHS) * 100;
              return (
                <button
                  key={m.id}
                  type="button"
                  onMouseEnter={() => setHoverMs(m)}
                  onMouseLeave={() => setHoverMs((cur) => (cur?.id === m.id ? null : cur))}
                  onFocus={() => setHoverMs(m)}
                  onBlur={() => setHoverMs((cur) => (cur?.id === m.id ? null : cur))}
                  aria-label={`Milestone M${m.month} ${m.label}`}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 group/ms outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
                  style={{ left: `${left}%` }}
                >
                  <span className="block w-3 h-3 rotate-45 bg-amber-500 border-2 border-cream shadow-[0_0_0_2px_rgba(184,118,61,0.7)] transition group-hover/ms:scale-125" />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-amber-700 num whitespace-nowrap">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {hoverPhase && (
        <div role="tooltip" className="absolute z-30 left-4 right-4 sm:right-auto sm:max-w-md bottom-4 sm:bottom-6 pointer-events-none animate-[fadein_120ms_ease-out]">
          <div className="card p-4 shadow-2xl border-2" style={{ borderColor: hoverPhase.color }}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold rounded-full px-2 py-0.5 num" style={{ background: hoverPhase.color, color: contrastInk(hoverPhase.color) }}>{hoverPhase.short_name}</span>
              <h4 className="h-serif text-base">{hoverPhase.name}</h4>
              <span className="ml-auto text-[11px] muted num">M{hoverPhase.start_month}-{hoverPhase.end_month}</span>
            </div>
            {hoverPhase.description && <p className="text-xs text-ink-dim leading-relaxed mb-2">{hoverPhase.description}</p>}
            {hoverPhase.target_amount != null && hoverPhase.target_amount > 0 && (
              <div className="inline-flex items-center gap-1 text-[11px] text-forest num bg-forest-100 border border-forest-200 px-2 py-0.5 rounded-full">
                {labels.targetPrefix}: ${hoverPhase.target_amount.toLocaleString()}
              </div>
            )}
            <div className="text-[10px] dim mt-2 italic">{labels.jump}</div>
          </div>
        </div>
      )}

      {hoverMs && (
        <div role="tooltip" className="absolute z-30 left-4 right-4 sm:right-auto sm:max-w-xs bottom-4 sm:bottom-6 pointer-events-none animate-[fadein_120ms_ease-out]">
          <div className="card p-3 shadow-2xl border-2 border-amber-500">
            <div className="flex items-center gap-2 mb-1">
              <span className="block w-2.5 h-2.5 rotate-45 bg-amber-500" />
              <h4 className="h-serif text-sm">Milestone M{hoverMs.month}</h4>
              <span className="ml-auto text-[11px] num text-amber-700 font-semibold">{hoverMs.label}</span>
            </div>
            <p className="text-xs text-ink-dim">{labels.targetPrefix}: <span className="num text-forest font-semibold">${hoverMs.target_amount.toLocaleString()}</span></p>
            {hoverMs.notes && <p className="text-xs muted mt-1">{hoverMs.notes}</p>}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function BgGrid() {
  return (
    <div className="absolute inset-0 grid grid-cols-48 pointer-events-none">
      {Array.from({ length: TOTAL_MONTHS }, (_, i) => (
        <div key={i} className={i % 3 === 0 ? "border-l border-dashed border-forest/[0.10]" : "border-l border-dashed border-forest/[0.05]"} />
      ))}
    </div>
  );
}

function contrastInk(hex: string) {
  const c = hex.replace("#", "");
  if (c.length !== 6) return "#1F2017";
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return ((0.299 * r + 0.587 * g + 0.114 * b) / 255) > 0.62 ? "#1F2017" : "#FFFAF0";
}
