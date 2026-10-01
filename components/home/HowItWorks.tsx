const steps = [
  { number: "01", title: "Anmelden", description: "Mit einem Klick anmelden — kein langes Formular." },
  { number: "02", title: "Kurs wählen", description: "Nach Kategorie oder Markenkooperation filtern und den passenden Kurs finden." },
  { number: "03", title: "Termin buchen", description: "Freien Termin wählen und in wenigen Schritten reservieren." },
  { number: "04", title: "Hingehen", description: "Vorbeikommen, mitmachen, mit eigenen Händen etwas schaffen." },
];

export function HowItWorks() {
  return (
    <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {steps.map((step) => (
        <li key={step.number} className="border-t-2 border-[var(--crafty-ink)] pt-5">
          <span className="block text-6xl font-black leading-none tracking-tighter text-[var(--crafty-accent-dark)]">
            {step.number}
          </span>
          <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-[var(--crafty-ink)]">{step.title}</h3>
          <p className="mt-2 text-[var(--crafty-muted)]">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
