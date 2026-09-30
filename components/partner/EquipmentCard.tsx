import { EquipmentItem } from "@/lib/mock-data/types";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

export function EquipmentCard({ item }: { item: EquipmentItem }) {
  const isAvailable = item.available > 0;

  return (
    <div className="flex flex-col gap-3 rounded-[28px] border border-black/5 bg-white shadow-sm p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-[var(--crafty-ink)]">{item.name}</h3>
        <span
          className="whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{
            color: isAvailable ? "var(--status-good)" : "var(--crafty-muted)",
            backgroundColor: isAvailable ? "color-mix(in srgb, var(--status-good) 12%, transparent)" : "var(--crafty-bg)",
          }}
        >
          {isAvailable ? `${item.available}/${item.total} verfügbar` : "ausgebucht"}
        </span>
      </div>
      <p className="text-sm text-[var(--crafty-muted)]">{item.description}</p>
      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="font-semibold text-[var(--crafty-ink)]">{formatPrice(item.pricePerMonth)} / Monat</span>
        <Button variant={isAvailable ? "secondary" : "ghost"} disabled={!isAvailable}>
          Jetzt mieten
        </Button>
      </div>
    </div>
  );
}
