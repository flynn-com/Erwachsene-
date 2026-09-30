import { Course, TimeSlot } from "@/lib/mock-data/types";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/format";

type StepConfirmationProps = {
  course: Course;
  slot: TimeSlot;
  bookingRef: string;
};

export function StepConfirmation({ course, slot, bookingRef }: StepConfirmationProps) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--status-good)]/15 text-2xl text-[var(--status-good)]">
        ✓
      </div>
      <h3 className="text-lg font-bold text-[var(--crafty-ink)]">Buchung bestätigt!</h3>
      <p className="mt-2 text-sm text-[var(--crafty-muted)]">
        Deine Buchung für <strong>{course.title}</strong> am {formatDateTime(slot.start)} ist fixiert.
      </p>
      <p className="mt-1 text-xs text-[var(--crafty-muted)]">Buchungsnummer: {bookingRef}</p>

      <div className="mt-6 flex justify-center gap-3">
        <Button href="/kurse" variant="ghost">
          Weitere Kurse entdecken
        </Button>
        <Button href="/">Zur Startseite</Button>
      </div>
    </div>
  );
}
