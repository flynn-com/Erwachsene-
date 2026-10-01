import Link from "next/link";
import { Course, TimeSlot, CategoryId } from "@/lib/mock-data/types";
import { formatDateShort } from "@/lib/format";

type UpcomingItem = {
  slot: TimeSlot;
  course: Course;
  categoryId: CategoryId;
  categoryName: string;
  brandName?: string;
};

const categoryTagColors: Record<CategoryId, string> = {
  zeichnen: "var(--pastel-terracotta-dark)",
  malen: "var(--pastel-terracotta-dark)",
  toepfern: "var(--pastel-butter-dark)",
  sticken: "var(--pastel-blush-dark)",
  steinhauen: "var(--crafty-muted)",
  "rage-room": "var(--pastel-blush-dark)",
  yoga: "var(--pastel-sage-dark)",
  kochen: "var(--pastel-terracotta-dark)",
  beauty: "var(--pastel-lavender-dark)",
  floristik: "var(--pastel-sage-dark)",
  wein: "var(--pastel-blush-dark)",
};

function splitTitle(title: string): { prefix: string; rest: string | null } {
  const colonIndex = title.indexOf(":");
  if (colonIndex === -1) return { prefix: title, rest: null };
  return {
    prefix: title.slice(0, colonIndex + 1),
    rest: title.slice(colonIndex + 1).trim(),
  };
}

export function NextUpCard({ items }: { items: UpcomingItem[] }) {
  return (
    <div className="w-full rounded-[28px] bg-[var(--crafty-accent-dark)] p-6 sm:p-8">
      <h2 className="text-center text-3xl font-black tracking-tighter text-white sm:text-4xl">Nächste Termine in München</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map(({ slot, course, categoryId, categoryName, brandName }) => {
          const { prefix, rest } = splitTitle(course.title);
          return (
            <Link
              key={slot.id}
              href={`/kurse/${course.slug}`}
              className="flex flex-col justify-between gap-4 rounded-[20px] bg-[var(--crafty-bg)] p-5 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: categoryTagColors[categoryId] }}
                >
                  {categoryName}
                </span>
                {brandName && (
                  <span className="text-xs font-bold uppercase tracking-wide text-[var(--crafty-muted)]">
                    {brandName}
                  </span>
                )}
              </div>

              <p className="text-base leading-snug text-[var(--crafty-ink)]">
                <span className="font-bold underline decoration-2 underline-offset-2">{prefix}</span>
                {rest && <span className="font-medium"> {rest}</span>}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-[var(--crafty-muted)]">{formatDateShort(slot.start)}</span>
                <span className="font-bold text-[var(--crafty-accent-dark)]">{slot.freeSpots} frei</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
