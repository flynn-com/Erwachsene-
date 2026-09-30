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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {instructors.map((instructor, i) => (
        <div key={instructor.id} className="rounded-[24px] border border-black/5 bg-white p-6 shadow-sm">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-[var(--crafty-ink)]"
            style={{ backgroundColor: avatarPastels[i % avatarPastels.length] }}
            aria-hidden
          >
            {getInitials(instructor.name)}
          </span>
          <h3 className="mt-4 font-bold text-[var(--crafty-ink)]">{instructor.name}</h3>
          <p className="text-sm font-medium text-[var(--crafty-accent-dark)]">{instructor.specialty}</p>
          <p className="mt-2 text-sm text-[var(--crafty-muted)]">{instructor.bio}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[var(--crafty-muted)]">
            {instructor.yearsExperience} Jahre Erfahrung
          </p>
        </div>
      ))}
    </div>
  );
}
