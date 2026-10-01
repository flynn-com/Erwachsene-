import { Instructor } from "@/lib/mock-data/types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const avatarPastels = ["var(--pastel-sage)", "var(--pastel-blush)", "var(--pastel-sky)", "var(--pastel-butter)"];

export function InstructorGrid({ instructors }: { instructors: Instructor[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {instructors.map((instructor, i) => (
        <div key={instructor.id} className="flex flex-col rounded-[28px] bg-white p-3">
          <div
            className="flex aspect-square items-center justify-center rounded-[22px] text-6xl font-black tracking-tighter text-[var(--crafty-ink)]/80"
            style={{ backgroundColor: avatarPastels[i % avatarPastels.length] }}
            aria-hidden
          >
            {getInitials(instructor.name)}
          </div>
          <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--crafty-accent-dark)]">
              {instructor.specialty}
            </p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--crafty-ink)]">{instructor.name}</h3>
            <p className="mt-2 flex-1 text-sm text-[var(--crafty-muted)]">{instructor.bio}</p>
            <p className="mt-4 text-sm font-bold text-[var(--crafty-ink)]">{instructor.yearsExperience} Jahre Erfahrung</p>
          </div>
        </div>
      ))}
    </div>
  );
}
