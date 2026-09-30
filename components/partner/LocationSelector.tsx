"use client";

import { FranchiseLocation } from "@/lib/mock-data/types";

type LocationSelectorProps = {
  locations: FranchiseLocation[];
  value: string;
  onChange: (id: string) => void;
};

export function LocationSelector({ locations, value, onChange }: LocationSelectorProps) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-[var(--crafty-ink)]">
      Standort
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-[var(--crafty-border)] bg-[var(--crafty-surface)] px-3 py-2 text-sm"
      >
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
    </label>
  );
}
