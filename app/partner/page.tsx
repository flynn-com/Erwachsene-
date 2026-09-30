"use client";

import { useState } from "react";
import { locations, kpisByLocation } from "@/lib/mock-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LocationSelector } from "@/components/partner/LocationSelector";
import { KpiStatTile } from "@/components/partner/KpiStatTile";
import { KpiChart } from "@/components/partner/KpiChart";
import { formatPrice, formatCompactNumber } from "@/lib/format";

export default function PartnerDashboardPage() {
  const [locationId, setLocationId] = useState(locations[0].id);
  const kpis = kpisByLocation[locationId];
  const latest = kpis[kpis.length - 1];
  const previous = kpis[kpis.length - 2];

  const bookingsDelta = (((latest.bookings - previous.bookings) / previous.bookings) * 100).toFixed(0);
  const revenueDelta = (((latest.revenue - previous.revenue) / previous.revenue) * 100).toFixed(0);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Partner-Dashboard" title="Standort-Kennzahlen" />
        <LocationSelector locations={locations} value={locationId} onChange={setLocationId} />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiStatTile
          label="Buchungen (Woche)"
          value={formatCompactNumber(latest.bookings)}
          delta={`${Number(bookingsDelta) >= 0 ? "+" : ""}${bookingsDelta}% ggü. Vorwoche`}
          deltaPositive={Number(bookingsDelta) >= 0}
          sparklinePoints={kpis.map((k) => k.bookings)}
        />
        <KpiStatTile
          label="Auslastung"
          value={`${latest.utilization}%`}
          sparklinePoints={kpis.map((k) => k.utilization)}
        />
        <KpiStatTile
          label="Umsatz (Woche)"
          value={formatPrice(latest.revenue)}
          delta={`${Number(revenueDelta) >= 0 ? "+" : ""}${revenueDelta}% ggü. Vorwoche`}
          deltaPositive={Number(revenueDelta) >= 0}
          sparklinePoints={kpis.map((k) => k.revenue)}
        />
        <KpiStatTile label="Ø Bewertung" value="4.7 / 5" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <KpiChart title="Buchungen pro Woche" data={kpis} metric="bookings" formatValue={(v) => `${v}`} />
        <KpiChart title="Umsatz pro Woche" data={kpis} metric="revenue" formatValue={(v) => formatPrice(v)} />
      </div>
    </div>
  );
}
