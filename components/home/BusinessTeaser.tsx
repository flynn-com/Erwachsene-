import Link from "next/link";
import Image from "next/image";
import { BusinessOffer, Course } from "@/lib/mock-data/types";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

const benefits = ["Exklusiv für euer Team", "Rechnung auf das Unternehmen", "Angebot innerhalb von 24 Stunden"];

export function BusinessTeaser({ items }: { items: { course: Course; offer: BusinessOffer }[] }) {
  return (
    <div className="grid overflow-hidden rounded-[36px] bg-[var(--crafty-petrol)] text-white lg:grid-cols-[1fr_1.15fr]">
      <div className="flex flex-col justify-center p-8 sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--crafty-accent-light)]">Für Firmen & HR</p>
        <h2 className="mt-3 text-4xl font-black leading-[1.02] tracking-tighter sm:text-5xl lg:text-6xl">
          Business-Trips für euer Team.
        </h2>
        <p className="mt-5 text-lg text-white/70">
          Teamevent, Incentive oder Weiterbildung: Bucht ausgewählte Kurse exklusiv für eure Mitarbeitenden – von 4
          bis 30 Personen.
        </p>
        <ul className="mt-6 space-y-2 text-white/85">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex gap-2">
              <span aria-hidden className="text-[var(--crafty-accent-light)]">
                ✓
              </span>
              {benefit}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="/business" variant="secondary">
            Alle Team-Kurse ansehen →
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-3 sm:gap-4 sm:p-4">
        {items.map(({ course, offer }, i) => (
          <Link
            key={course.slug}
            href={`/kurse/${course.slug}/business`}
            className={`group relative isolate flex min-h-52 flex-col justify-end overflow-hidden rounded-[28px] p-5 ${
              i === 0 ? "col-span-2 min-h-64" : ""
            }`}
          >
            {course.imageSrc && (
              <Image
                src={course.imageSrc}
                alt={course.title}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 300px, 50vw"}
                className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[var(--crafty-ink)]">
              {offer.minGroup}–{offer.maxGroup} Personen
            </span>
            <h3 className={`font-extrabold leading-tight tracking-tight ${i === 0 ? "text-2xl sm:text-3xl" : "text-lg"}`}>
              {course.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-white/75">
              ab {formatPrice(offer.pricePerPerson)} p. P. · Anfragen →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
