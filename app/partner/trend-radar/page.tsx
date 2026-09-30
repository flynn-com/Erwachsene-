import { trendSignals } from "@/lib/mock-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrendSignalCard } from "@/components/partner/TrendSignalCard";

export default function TrendRadarPage() {
  const local = trendSignals.filter((s) => s.scope === "lokal");
  const global = trendSignals.filter((s) => s.scope === "global");

  return (
    <div>
      <SectionHeading
        eyebrow="Trend-Radar"
        title="Frühzeitig erkennen, was als Nächstes kommt"
        description="Simulierte lokale und globale Trendsignale mit Vorschlägen für neue Kurse und Markenpartner."
      />

      <div className="mt-10">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--crafty-muted)]">
          Lokale Signale
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {local.map((signal) => (
            <TrendSignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--crafty-muted)]">
          Globale Signale
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {global.map((signal) => (
            <TrendSignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </div>
    </div>
  );
}
