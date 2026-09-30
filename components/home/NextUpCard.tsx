import Link from "next/link";
import { Course, TimeSlot } from "@/lib/mock-data/types";
import { formatDateTime } from "@/lib/format";

type UpcomingItem = {
  slot: TimeSlot;
  course: Course;
  categoryName: string;
};

export function NextUpCard({ items }: { items: UpcomingItem[] }) {
  return (
    <div className="w-full rounded-[28px] bg-[var(--crafty-accent-dark)] p-6 text-white sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Als Nächstes im Haus</p>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map(({ slot, course, categoryName }) => (
          <li key={slot.id}>
            <Link
              href={`/kurse/${course.slug}`}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/15"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--pastel-butter)]">
                  {categoryName}
                </p>
                <p className="mt-1 font-semibold leading-snug">{course.title}</p>
                <p className="mt-1 text-sm capitalize text-white/70">{formatDateTime(slot.start)}</p>
              </div>
              <div className="shrink-0 text-right text-sm text-white/80">
                <p>{slot.freeSpots} frei</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
