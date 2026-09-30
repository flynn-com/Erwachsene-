import { Course, TimeSlot } from "@/lib/mock-data/types";
import { ParticipantDetails } from "@/components/booking/BookingStepper";
import { Button } from "@/components/ui/Button";
import { formatDateTime, formatPrice } from "@/lib/format";

type StepSummaryProps = {
  course: Course;
  slot: TimeSlot;
  details: ParticipantDetails;
  onConfirm: () => void;
  onBack: () => void;
};

export function StepSummary({ course, slot, details, onConfirm, onBack }: StepSummaryProps) {
  const total = course.price * details.participants;

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[var(--crafty-ink)]">Zusammenfassung</h3>
      <dl className="grid gap-3 text-sm">
        <Row label="Kurs" value={course.title} />
        <Row label="Termin" value={formatDateTime(slot.start)} />
        <Row label="Raum" value={course.room} />
        <Row label="Name" value={details.name} />
        <Row label="E-Mail" value={details.email} />
        <Row label="Teilnehmende" value={String(details.participants)} />
        <Row label="Gesamtpreis" value={formatPrice(total)} emphasize />
      </dl>

      <p className="mt-4 text-xs text-[var(--crafty-muted)]">
        Dies ist ein Prototyp — es findet keine echte Zahlung statt. Mit „Jetzt verbindlich buchen&quot;
        simulierst du den Abschluss der Buchung.
      </p>

      <div className="mt-6 flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Zurück
        </Button>
        <Button onClick={onConfirm}>Jetzt verbindlich buchen</Button>
      </div>
    </div>
  );
}

function Row({ label, value, emphasize }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--crafty-border)] pb-2">
      <dt className="text-[var(--crafty-muted)]">{label}</dt>
      <dd className={emphasize ? "text-base font-bold text-[var(--crafty-ink)]" : "font-medium text-[var(--crafty-ink)]"}>
        {value}
      </dd>
    </div>
  );
}
