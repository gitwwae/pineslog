import type { Phase, Milestone } from "@/lib/types";

const TOTAL_MONTHS = 48;

export function Gantt({ phases, milestones }: { phases: Phase[]; milestones: Milestone[] }) {
  const sortedPhases = [...phases].sort((a, b) => a.position - b.position);
  return (
    <div className="card p-4 sm:p-6 overflow-x-auto">
      <div className="min-w-[900px]">
        {/* Months axis */}
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

        {/* Rows */}
        {sortedPhases.map((p) => {
          const left = ((p.start_month - 1) / TOTAL_MONTHS) * 100;
          const width = ((p.end_month - (p.start_month - 1)) / TOTAL_MONTHS) * 100;
          return (
            <div key={p.id} className="grid grid-cols-[180px_1fr] items-center h-12 border-b border-dashed border-forest/10">
              <div className="flex items-center gap-2 pr-2">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: p.color }} />
                <span className="text-[12px] text-ink"><span className="num font-semibold">{p.short_name}</span> · {p.name}</span>
              </div>
              <div className="relative h-12">
                <BgGrid />
                <div
                  title={p.description ?? p.name}
                  className="absolute top-2 h-8 rounded-md flex items-center px-3 text-[11px] font-semibold truncate shadow-sm"
                  style={{ left: `${left}%`, width: `${width}%`, background: p.color, color: contrastInk(p.color) }}
                >
                  {p.description ?? p.name}
                </div>
              </div>
            </div>
          );
        })}

        {/* Milestones row */}
        <div className="grid grid-cols-[180px_1fr] items-center h-12">
          <div className="flex items-center gap-2 pr-2">
            <span className="text-[12px] text-amber-700 font-semibold">◆ Revenue cumulato</span>
          </div>
          <div className="relative h-12">
            <BgGrid />
            {milestones.map((m) => {
              const left = ((m.month - 0.5) / TOTAL_MONTHS) * 100;
              return (
                <div key={m.id} className="absolute top-1/2" style={{ left: `${left}%`, transform: "translate(-50%,-50%)" }}>
                  <span className="block w-3 h-3 rotate-45 bg-amber-500 border-2 border-cream shadow-[0_0_0_2px_rgba(184,118,61,0.7)]" />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-amber-700 num whitespace-nowrap">{m.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
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

// pick dark or light text based on bg luminance
function contrastInk(hex: string) {
  const c = hex.replace("#", "");
  if (c.length !== 6) return "#1F2017";
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.62 ? "#1F2017" : "#FFFAF0";
}
