"use client";

import { useState } from "react";
import { BusinessOffer, Course } from "@/lib/mock-data/types";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

const extras = [
  { id: "catering", label: "Catering (Fingerfood & Snacks)", pricePerPerson: 18 },
  { id: "getraenke", label: "Getränkepaket", pricePerPerson: 12 },
  { id: "exklusiv", label: "Exklusive Raumnutzung", flatPrice: 250 },
  { id: "fotograf", label: "Fotograf:in für Teamfotos", flatPrice: 290 },
] as const;

const timeOptions = ["Vormittag", "Nachmittag", "Abend"];

type FormState = {
  company: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
  groupSize: number;
  preferredDate: string;
  alternativeDate: string;
  timeOfDay: string;
  extras: string[];
  invoiceToCompany: boolean;
  message: string;
};

const inputClass =
  "rounded-xl border border-[var(--crafty-border)] bg-white px-4 py-3 text-sm text-[var(--crafty-ink)] outline-none transition-colors focus:border-[var(--crafty-ink)]";
const labelClass = "flex flex-col gap-1.5 text-sm font-semibold text-[var(--crafty-ink)]";

function estimateTotal(offer: BusinessOffer, groupSize: number, selectedExtras: string[]): number {
  let total = offer.pricePerPerson * groupSize;
  for (const extra of extras) {
    if (!selectedExtras.includes(extra.id)) continue;
    total += "pricePerPerson" in extra ? extra.pricePerPerson * groupSize : extra.flatPrice;
  }
  return total;
}

export function BusinessRequestForm({ course, offer }: { course: Course; offer: BusinessOffer }) {
  const [form, setForm] = useState<FormState>({
    company: "",
    contactName: "",
    role: "",
    email: "",
    phone: "",
    groupSize: offer.minGroup,
    preferredDate: "",
    alternativeDate: "",
    timeOfDay: "Nachmittag",
    extras: [],
    invoiceToCompany: true,
    message: "",
  });
  const [requestId, setRequestId] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleExtra = (id: string) =>
    update("extras", form.extras.includes(id) ? form.extras.filter((e) => e !== id) : [...form.extras, id]);

  const groupSizeValid = form.groupSize >= offer.minGroup && form.groupSize <= offer.maxGroup;
  const isValid =
    form.company.trim().length > 1 &&
    form.contactName.trim().length > 1 &&
    form.email.includes("@") &&
    groupSizeValid &&
    form.preferredDate !== "";

  const total = estimateTotal(offer, groupSizeValid ? form.groupSize : offer.minGroup, form.extras);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setRequestId(`BT-${Date.now().toString().slice(-6)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (requestId) {
    return (
      <div className="rounded-[32px] bg-white p-8 sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--crafty-accent)] text-2xl" aria-hidden>
          ✓
        </span>
        <h2 className="mt-6 text-3xl font-black tracking-tighter text-[var(--crafty-ink)] sm:text-4xl">
          Danke, {form.contactName.split(" ")[0]}! Eure Anfrage ist da.
        </h2>
        <p className="mt-3 text-[var(--crafty-muted)]">
          Wir melden uns innerhalb von 24 Stunden bei {form.email} mit einem verbindlichen Angebot für {form.company}.
        </p>
        <dl className="mt-8 grid gap-4 rounded-[24px] bg-[var(--crafty-bg)] p-6 sm:grid-cols-2">
          <Summary label="Anfrage-Nr." value={requestId} />
          <Summary label="Kurs" value={course.title} />
          <Summary label="Teamgröße" value={`${form.groupSize} Personen`} />
          <Summary
            label="Wunschtermin"
            value={`${new Date(form.preferredDate).toLocaleDateString("de-DE")} · ${form.timeOfDay}`}
          />
          <Summary label="Geschätzter Preis" value={`ca. ${formatPrice(total)} zzgl. MwSt.`} />
          <Summary label="Rechnung" value={form.invoiceToCompany ? `An ${form.company}` : "Privat"} />
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/business">Weitere Team-Kurse ansehen</Button>
          <Button href="/" variant="ghost">
            Zur Startseite
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div className="flex flex-col gap-8">
        <fieldset className="rounded-[28px] bg-white p-6 sm:p-8">
          <legend className="sr-only">Unternehmen</legend>
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--crafty-ink)]">Euer Unternehmen</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className={`${labelClass} sm:col-span-2`}>
              Firma *
              <input
                className={inputClass}
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="Muster GmbH"
                required
              />
            </label>
            <label className={labelClass}>
              Ansprechpartner:in *
              <input
                className={inputClass}
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                placeholder="Vor- und Nachname"
                required
              />
            </label>
            <label className={labelClass}>
              Position
              <input
                className={inputClass}
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
                placeholder="z. B. HR / People & Culture"
              />
            </label>
            <label className={labelClass}>
              E-Mail *
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="name@firma.de"
                required
              />
            </label>
            <label className={labelClass}>
              Telefon
              <input
                type="tel"
                className={inputClass}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+49 …"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="rounded-[28px] bg-white p-6 sm:p-8">
          <legend className="sr-only">Team und Termin</legend>
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--crafty-ink)]">Team & Termin</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className={`${labelClass} sm:col-span-2`}>
              Anzahl Mitarbeitende * ({offer.minGroup}–{offer.maxGroup} Personen)
              <input
                type="number"
                min={offer.minGroup}
                max={offer.maxGroup}
                className={inputClass}
                value={form.groupSize}
                onChange={(e) => update("groupSize", Number(e.target.value))}
                required
              />
              {!groupSizeValid && (
                <span className="text-xs font-medium text-red-700">
                  Bitte zwischen {offer.minGroup} und {offer.maxGroup} Personen angeben.
                </span>
              )}
            </label>
            <label className={labelClass}>
              Wunschtermin *
              <input
                type="date"
                className={inputClass}
                value={form.preferredDate}
                onChange={(e) => update("preferredDate", e.target.value)}
                required
              />
            </label>
            <label className={labelClass}>
              Alternativtermin
              <input
                type="date"
                className={inputClass}
                value={form.alternativeDate}
                onChange={(e) => update("alternativeDate", e.target.value)}
              />
            </label>
          </div>
          <div className="mt-5">
            <p className="text-sm font-semibold text-[var(--crafty-ink)]">Tageszeit</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {timeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => update("timeOfDay", option)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    form.timeOfDay === option
                      ? "bg-[var(--crafty-ink)] text-white"
                      : "border border-[var(--crafty-border)] bg-white text-[var(--crafty-ink)] hover:border-[var(--crafty-ink)]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-[28px] bg-white p-6 sm:p-8">
          <legend className="sr-only">Extras</legend>
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--crafty-ink)]">Extras</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {extras.map((extra) => (
              <label
                key={extra.id}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm transition-colors ${
                  form.extras.includes(extra.id)
                    ? "border-[var(--crafty-ink)] bg-[var(--crafty-bg)]"
                    : "border-[var(--crafty-border)] hover:border-[var(--crafty-ink)]/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.extras.includes(extra.id)}
                  onChange={() => toggleExtra(extra.id)}
                  className="mt-0.5 h-4 w-4 accent-[var(--crafty-accent-dark)]"
                />
                <span>
                  <span className="block font-semibold text-[var(--crafty-ink)]">{extra.label}</span>
                  <span className="text-[var(--crafty-muted)]">
                    {"pricePerPerson" in extra
                      ? `+ ${formatPrice(extra.pricePerPerson)} pro Person`
                      : `+ ${formatPrice(extra.flatPrice)} pauschal`}
                  </span>
                </span>
              </label>
            ))}
          </div>
          <label className="mt-5 flex items-center gap-3 text-sm font-semibold text-[var(--crafty-ink)]">
            <input
              type="checkbox"
              checked={form.invoiceToCompany}
              onChange={(e) => update("invoiceToCompany", e.target.checked)}
              className="h-4 w-4 accent-[var(--crafty-accent-dark)]"
            />
            Rechnung auf das Unternehmen ausstellen
          </label>
          <label className={`${labelClass} mt-5`}>
            Nachricht
            <textarea
              rows={4}
              className={inputClass}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Anlass, besondere Wünsche, Allergien, Barrierefreiheit …"
            />
          </label>
        </fieldset>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[28px] bg-[var(--crafty-ink)] p-6 text-white sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/60">Deine Anfrage</p>
          <h3 className="mt-2 text-xl font-extrabold leading-tight tracking-tight">{course.title}</h3>
          <ul className="mt-5 space-y-2 text-sm text-white/80">
            {offer.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span aria-hidden>✓</span>
                {highlight}
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-white/15 pt-5 text-sm">
            <div className="flex justify-between text-white/70">
              <span>
                {groupSizeValid ? form.groupSize : offer.minGroup} × {formatPrice(offer.pricePerPerson)}
              </span>
              <span>{formatPrice((groupSizeValid ? form.groupSize : offer.minGroup) * offer.pricePerPerson)}</span>
            </div>
            {form.extras.length > 0 && (
              <div className="mt-1 flex justify-between text-white/70">
                <span>Extras</span>
                <span>
                  {formatPrice(total - (groupSizeValid ? form.groupSize : offer.minGroup) * offer.pricePerPerson)}
                </span>
              </div>
            )}
            <div className="mt-4 flex items-end justify-between">
              <span className="text-white/70">Geschätzt</span>
              <span className="text-4xl font-black tracking-tighter">{formatPrice(total)}</span>
            </div>
            <p className="mt-1 text-right text-xs text-white/50">zzgl. MwSt. · unverbindlich</p>
          </div>
          <Button type="submit" variant="secondary" disabled={!isValid} className="mt-6 w-full">
            Business-Trip anfragen
          </Button>
          {!isValid && (
            <p className="mt-3 text-center text-xs text-white/50">Bitte Pflichtfelder (*) ausfüllen.</p>
          )}
        </div>
      </aside>
    </form>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--crafty-muted)]">{label}</dt>
      <dd className="mt-1 font-semibold text-[var(--crafty-ink)]">{value}</dd>
    </div>
  );
}
