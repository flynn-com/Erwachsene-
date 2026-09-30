type KpiStatTileProps = {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  sparklinePoints?: number[];
};

export function KpiStatTile({ label, value, delta, deltaPositive, sparklinePoints }: KpiStatTileProps) {
  return (
    <div className="rounded-2xl border border-[var(--crafty-border)] bg-[var(--chart-surface)] p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--chart-muted)]">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="text-3xl font-bold tabular-nums text-[var(--chart-text-primary)]">{value}</p>
        {sparklinePoints && <Sparkline points={sparklinePoints} />}
      </div>
      {delta && (
        <p
          className="mt-2 text-xs font-semibold"
          style={{ color: deltaPositive ? "var(--status-good)" : "var(--chart-text-secondary)" }}
        >
          {delta}
        </p>
      )}
    </div>
  );
}

function Sparkline({ points }: { points: number[] }) {
  const width = 88;
  const height = 32;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden className="shrink-0">
      <path d={path} fill="none" stroke="var(--series-1)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
