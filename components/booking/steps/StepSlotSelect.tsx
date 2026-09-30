import { TimeSlot } from "@/lib/mock-data/types";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/format";

type StepSlotSelectProps = {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelect: (slot: TimeSlot) => void;
  onNext: () => void;
};

export function StepSlotSelect({ slots, selectedSlot, onSelect, onNext }: StepSlotSelectProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-[var(--crafty-ink)]">Wähle deinen Termin</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {slots.map((slot) => {
          const isFull = slot.freeSpots === 0;
          const isSelected = selectedSlot?.id === slot.id;
          return (
            <button
              key={slot.id}
              disabled={isFull}
              onClick={() => onSelect(slot)}
              className={`rounded-xl border p-4 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                isSelected
                  ? "border-[var(--crafty-ink)] bg-[var(--crafty-ink)] text-white"
                  : "border-[var(--crafty-border)] hover:border-[var(--crafty-ink)]"
              }`}
            >
              <div className="font-semibold capitalize">{formatDateTime(slot.start)}</div>
              <div className={`text-sm ${isSelected ? "text-white/80" : "text-[var(--crafty-muted)]"}`}>
                {isFull ? "Ausgebucht" : `${slot.freeSpots} von ${slot.totalSpots} Plätzen frei`}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={onNext} disabled={!selectedSlot}>
          Weiter
        </Button>
      </div>
    </div>
  );
}
