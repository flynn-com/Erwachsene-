"use client";

import { Category } from "@/lib/mock-data/types";

type CourseFilterBarProps = {
  categories: Category[];
  activeCategory: string | null;
  onlyBrandCooperations: boolean;
  onCategoryChange: (category: string | null) => void;
  onBrandToggle: (value: boolean) => void;
};

export function CourseFilterBar({
  categories,
  activeCategory,
  onlyBrandCooperations,
  onCategoryChange,
  onBrandToggle,
}: CourseFilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-[var(--crafty-ink)] text-white"
              : "bg-[var(--crafty-surface)] text-[var(--crafty-ink)] border border-[var(--crafty-border)] hover:border-[var(--crafty-ink)]"
          }`}
        >
          Alle Kategorien
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-[var(--crafty-ink)] text-white"
                : "bg-[var(--crafty-surface)] text-[var(--crafty-ink)] border border-[var(--crafty-border)] hover:border-[var(--crafty-ink)]"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <label className="flex w-fit items-center gap-2 text-sm font-medium text-[var(--crafty-ink)]">
        <input
          type="checkbox"
          checked={onlyBrandCooperations}
          onChange={(e) => onBrandToggle(e.target.checked)}
          className="h-4 w-4 rounded border-[var(--crafty-border)] accent-[var(--crafty-accent-dark)]"
        />
        Nur Markenkooperationen anzeigen
      </label>
    </div>
  );
}
