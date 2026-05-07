import type { Milestone } from "@/lib/types";

export function RevenueCurve({ milestones, goal = 1_000_000, horizonMonths = 48 }: {
  milestones: Milestone[];
  goal?: number;
  horizonMonths?: number;
}) {
  const W = 1200, H = 220, P = 36;
  const sorted = [...milestones].sort((a, b) => a.month - b.month);
  const points = [{ month: 0, value: 0 }, ...sorted.map(m => ({ month: m.month, value: m.target_amount }))];
  const maxV = Math.max(goal * 1.05, ...points.map(p => p.value));

  const xs = (m: number) => P + (m / horizonMonths) * (W - 2 * P);
  const ys = (v: number) => H - P - (v / maxV) * (H - 2 * P);

  let d = `M ${xs(points[0].month)} ${ys(points[0].value)}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i];
    const cx = (xs(a.month) + xs(b.month)) / 2;
    d += ` C ${cx} ${ys(a.value)}, ${cx} ${ys(b.value)}, ${xs(b.month)} ${ys(b.value)}`;
  }
  const area = `${d} L ${xs(horizonMonths)} ${H - P} L ${xs(0)} ${H - P} Z`;

  const yTicks = [0, 250000, 500000, 750000, 1000000];
  const xTicks = [0, 6, 12, 18, 24, 30, 36, 42, 48];

  return (
    <div className="card p-4 sm:p-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        <defs>
          <linearGradient id="rg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#004225" stopOpacity="0.20" />
            <stop offset="100%" stopColor="#004225" stopOpacity="0" />
          </linearGradient>
        </defs>
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={P} x2={W - P} y1={ys(v)} y2={ys(v)} stroke="rgba(0, 66, 37, 0.10)" strokeDasharray="3 4" />
            <text x={P - 8} y={ys(v) + 4} textAnchor="end" fontSize="11" fill="#8B8474" className="num">${formatK(v)}</text>
          </g>
        ))}
        {xTicks.map((m) => (
          <g key={m}>
            <line x1={xs(m)} x2={xs(m)} y1={P} y2={H - P} stroke="rgba(0, 66, 37, 0.06)" strokeDasharray="3 4" />
            <text x={xs(m)} y={H - P + 16} textAnchor="middle" fontSize="11" fill="#8B8474" className="num">M{m}</text>
          </g>
        ))}
        <path d={area} fill="url(#rg)" />
        <path d={d} fill="none" stroke="#004225" strokeWidth="2.5" />
        {sorted.map((m) => (
          <circle key={m.id} cx={xs(m.month)} cy={ys(m.target_amount)} r="4.5" fill="#B8763D" stroke="#FFFAF0" strokeWidth="2" />
        ))}
        <line x1={P} x2={W - P} y1={ys(goal)} y2={ys(goal)} stroke="#B8763D" strokeDasharray="6 6" />
        <text x={W - P} y={ys(goal) - 8} textAnchor="end" fontSize="11" fontWeight={700} fill="#A0613A" className="num">$1M target</text>
      </svg>
    </div>
  );
}

function formatK(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${Math.round(v / 1000)}K`;
  return String(v);
}
