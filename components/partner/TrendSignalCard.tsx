import { TrendSignal } from "@/lib/mock-data/types";
import { categories } from "@/lib/mock-data/categories";
import { brandPartners } from "@/lib/mock-data/brand-partners";

export function TrendSignalCard({ signal }: { signal: TrendSignal }) {
  const scopeColor = signal.scope === "lokal" ? "var(--series-1)" : "var(--series-3)";
  const categoryName = categories.find((c) => c.id === signal.suggestedCategory)?.name;
  const brandName = brandPartners.find((b) => b.id === signal.suggestedBrandPartner)?.name;

  return (
    <div className="rounded-2xl border border-[var(--crafty-border)] bg-[var(--chart-surface)] p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span
          className="rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide"
          style={{ color: scopeColor, backgroundColor: `color-mix(in srgb, ${scopeColor} 12%, transparent)` }}
        >
          {signal.scope}
        </span>
        <MomentumBar momentum={signal.momentum} />
      </div>

      <h3 className="font-bold text-[var(--chart-text-primary)]">{signal.title}</h3>
      <p className="mt-2 text-sm text-[var(--chart-text-secondary)]">{signal.rationale}</p>

      {(categoryName || brandName) && (
        <p className="mt-3 text-xs font-semibold text-[var(--chart-text-primary)]">
          Vorschlag: {categoryName}
          {categoryName && brandName && " · "}
          {brandName}
        </p>
      )}
    </div>
  );
}

function MomentumBar({ momentum }: { momentum: number }) {
  return (
    <div className="flex items-center gap-2" title={`Momentum: ${momentum}/100`}>
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--chart-grid)]">
        <div className="h-full rounded-full bg-[var(--series-2)]" style={{ width: `${momentum}%` }} />
      </div>
      <span className="text-xs font-semibold tabular-nums text-[var(--chart-text-secondary)]">{momentum}</span>
    </div>
  );
}
