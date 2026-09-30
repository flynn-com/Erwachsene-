"use client";

import { useState } from "react";
import { Course, TimeSlot } from "@/lib/mock-data/types";
import { StepSlotSelect } from "@/components/booking/steps/StepSlotSelect";
import { StepDetails } from "@/components/booking/steps/StepDetails";
import { StepSummary } from "@/components/booking/steps/StepSummary";
import { StepConfirmation } from "@/components/booking/steps/StepConfirmation";

type BookingStepperProps = {
  course: Course;
  slots: TimeSlot[];
};

export type ParticipantDetails = {
  name: string;
  email: string;
  participants: number;
};

const steps = ["Termin", "Angaben", "Übersicht", "Bestätigung"];

export function BookingStepper({ course, slots }: BookingStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [details, setDetails] = useState<ParticipantDetails>({ name: "", email: "", participants: 1 });
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  function goNext() {
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function goBack() {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }

  function handleConfirm() {
    const ref = `CRAFTY-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setBookingRef(ref);
    goNext();
  }

  return (
    <div className="rounded-2xl border border-[var(--crafty-border)] bg-[var(--crafty-surface)] p-6">
      <ol className="mb-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--crafty-muted)]">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                i <= currentStep ? "bg-[var(--crafty-ink)] text-white" : "bg-[var(--crafty-bg)] text-[var(--crafty-muted)]"
              }`}
            >
              {i + 1}
            </span>
            <span className={i === currentStep ? "text-[var(--crafty-ink)]" : ""}>{step}</span>
            {i < steps.length - 1 && <span className="mx-1 text-[var(--crafty-border)]">—</span>}
          </li>
        ))}
      </ol>

      {currentStep === 0 && (
        <StepSlotSelect
          slots={slots}
          selectedSlot={selectedSlot}
          onSelect={setSelectedSlot}
          onNext={goNext}
        />
      )}

      {currentStep === 1 && (
        <StepDetails details={details} onChange={setDetails} onNext={goNext} onBack={goBack} />
      )}

      {currentStep === 2 && selectedSlot && (
        <StepSummary
          course={course}
          slot={selectedSlot}
          details={details}
          onConfirm={handleConfirm}
          onBack={goBack}
        />
      )}

      {currentStep === 3 && bookingRef && selectedSlot && (
        <StepConfirmation course={course} slot={selectedSlot} bookingRef={bookingRef} />
      )}
    </div>
  );
}
