const steps = [
  { number: 1, title: "Anmelden", description: "Mit einem Klick anmelden — kein langes Formular." },
  { number: 2, title: "Kurs wählen", description: "Nach Kategorie oder Markenkooperation filtern und den passenden Kurs finden." },
  { number: 3, title: "Termin buchen", description: "Freien Termin wählen und in wenigen Schritten reservieren." },
  { number: 4, title: "Hingehen", description: "Vorbeikommen, mitmachen, mit eigenen Händen etwas schaffen." },
];

export function HowItWorks() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <div key={step.number} className="rounded-[24px] border border-black/5 bg-white p-6 shadow-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--crafty-accent)] text-sm font-bold text-[var(--crafty-accent-dark)]">
            {step.number}
          </span>
          <h3 className="mt-4 font-bold text-[var(--crafty-ink)]">{step.title}</h3>
          <p className="mt-2 text-sm text-[var(--crafty-muted)]">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
