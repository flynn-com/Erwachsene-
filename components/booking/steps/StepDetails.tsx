import { ParticipantDetails } from "@/components/booking/BookingStepper";
import { Button } from "@/components/ui/Button";

type StepDetailsProps = {
  details: ParticipantDetails;
  onChange: (details: ParticipantDetails) => void;
  onNext: () => void;
  onBack: () => void;
};

export function StepDetails({ details, onChange, onNext, onBack }: StepDetailsProps) {
  const isValid = details.name.trim().length > 1 && details.email.includes("@");

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[var(--crafty-ink)]">Deine Angaben</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-[var(--crafty-ink)]">
          Name
          <input
            type="text"
            value={details.name}
            onChange={(e) => onChange({ ...details, name: e.target.value })}
            className="rounded-lg border border-[var(--crafty-border)] bg-[var(--crafty-surface)] px-3 py-2 text-sm"
            placeholder="Vor- und Nachname"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-[var(--crafty-ink)]">
          E-Mail
          <input
            type="email"
            value={details.email}
            onChange={(e) => onChange({ ...details, email: e.target.value })}
            className="rounded-lg border border-[var(--crafty-border)] bg-[var(--crafty-surface)] px-3 py-2 text-sm"
            placeholder="du@beispiel.de"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium text-[var(--crafty-ink)]">
          Teilnehmende
          <input
            type="number"
            min={1}
            max={8}
            value={details.participants}
            onChange={(e) => onChange({ ...details, participants: Number(e.target.value) })}
            className="rounded-lg border border-[var(--crafty-border)] bg-[var(--crafty-surface)] px-3 py-2 text-sm"
          />
        </label>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Zurück
        </Button>
        <Button onClick={onNext} disabled={!isValid}>
          Weiter
        </Button>
      </div>
    </div>
  );
}
