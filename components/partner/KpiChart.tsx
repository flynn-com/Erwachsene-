"use client";

import { useId, useState } from "react";
import { KpiWeek } from "@/lib/mock-data/types";

type KpiChartProps = {
  title: string;
  data: KpiWeek[];
  metric: "bookings" | "utilization" | "revenue";
  formatValue: (value: number) => string;
};

const width = 560;
const height = 220;
const padding = { top: 16, right: 16, bottom: 28, left: 16 };

export function KpiChart({ title, data, metric, formatValue }: KpiChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const titleId = useId();

  const values = data.map((d) => d[metric]);
  const max = Math.max(...values);
  const min = Math.min(0, ...values);
  const range = max - min || 1;

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  function xFor(i: number) {
    return padding.left + (i / (data.length - 1)) * innerWidth;
  }
  function yFor(v: number) {
    return padding.top + innerHeight - ((v - min) / range) * innerHeight;
  }

  const path = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${xFor(i).toFixed(1)},${yFor(d[metric]).toFixed(1)}`)
    .join(" ");

  const hovered = hoverIndex !== null ? data[hoverIndex] : null;

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * width;
    const ratio = Math.min(1, Math.max(0, (relativeX - padding.left) / innerWidth));
    const index = Math.round(ratio * (data.length - 1));
    setHoverIndex(index);
  }

  return (
    <div className="rounded-[28px] border border-black/5 bg-[var(--chart-surface)] shadow-sm p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 id={titleId} className="text-sm font-semibold text-[var(--chart-text-primary)]">
          {title}
        </h3>
        <button
          onClick={() => setShowTable((s) => !s)}
          className="text-xs font-medium text-[var(--chart-text-secondary)] underline decoration-dotted"
        >
          {showTable ? "Als Chart anzeigen" : "Als Tabelle anzeigen"}
        </button>
      </div>

      {showTable ? (
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[var(--chart-grid)] text-[var(--chart-muted)]">
              <th className="py-1 pr-2 font-medium">Woche</th>
              <th className="py-1 font-medium">Wert</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.weekLabel} className="border-b border-[var(--chart-grid)] last:border-0">
                <td className="py-1 pr-2 text-[var(--chart-text-secondary)]">{d.weekLabel}</td>
                <td className="py-1 tabular-nums text-[var(--chart-text-primary)]">{formatValue(d[metric])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <svg
          role="img"
          aria-labelledby={titleId}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
        >
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="var(--chart-baseline)"
            strokeWidth={1}
          />

          <path d={path} fill="none" stroke="var(--series-1)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

          {hoverIndex !== null && (
            <line
              x1={xFor(hoverIndex)}
              x2={xFor(hoverIndex)}
              y1={padding.top}
              y2={height - padding.bottom}
              stroke="var(--chart-grid)"
              strokeWidth={1}
            />
          )}

          {data.map((d, i) => (
            <circle
              key={d.weekLabel}
              cx={xFor(i)}
              cy={yFor(d[metric])}
              r={hoverIndex === i ? 4 : 2.5}
              fill="var(--series-1)"
              stroke="var(--chart-surface)"
              strokeWidth={1.5}
            />
          ))}

          <text
            x={xFor(data.length - 1)}
            y={yFor(data[data.length - 1][metric]) - 10}
            textAnchor="end"
            className="fill-[var(--chart-text-primary)] text-[11px] font-semibold"
          >
            {formatValue(data[data.length - 1][metric])}
          </text>
        </svg>
      )}

      {hovered && !showTable && (
        <div className="mt-2 flex items-center justify-between rounded-lg bg-[var(--crafty-bg)] px-3 py-2 text-xs">
          <span className="text-[var(--chart-text-secondary)]">{hovered.weekLabel}</span>
          <span className="font-semibold tabular-nums text-[var(--chart-text-primary)]">
            {formatValue(hovered[metric])}
          </span>
        </div>
      )}
    </div>
  );
}
