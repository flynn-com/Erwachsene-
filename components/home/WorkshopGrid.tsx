import Link from "next/link";
import { Category, CategoryId } from "@/lib/mock-data/types";

const categoryIcons: Record<CategoryId, string> = {
  zeichnen: "✏️",
  malen: "🎨",
  toepfern: "🏺",
  sticken: "🧵",
  steinhauen: "🪨",
  "rage-room": "💥",
  lasertag: "🔫",
  yoga: "🧘",
  pilates: "🤸",
  kochen: "🍳",
  beauty: "🧴",
};

type WorkshopGridProps = {
  categories: Category[];
  courseCounts: Record<string, number>;
};

export function WorkshopGrid({ categories, courseCounts }: WorkshopGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/kurse?kategorie=${category.id}`}
          className="group rounded-[24px] border border-black/5 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <span className="text-2xl" aria-hidden>
            {categoryIcons[category.id]}
          </span>
          <h3 className="mt-3 font-bold text-[var(--crafty-ink)]">{category.name}</h3>
          <p className="mt-1 text-sm text-[var(--crafty-muted)]">{category.description}</p>
          <span className="mt-3 inline-block text-sm font-semibold text-[var(--crafty-accent-dark)] group-hover:underline">
            {courseCounts[category.id] ?? 0} {(courseCounts[category.id] ?? 0) === 1 ? "Kurs" : "Kurse"} ansehen →
          </span>
        </Link>
      ))}
    </div>
  );
}
