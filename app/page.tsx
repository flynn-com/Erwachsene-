import Link from "next/link";
import { courses, categories, brandPartners } from "@/lib/mock-data";
import { CourseCard } from "@/components/course/CourseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const featuredCourses = courses.filter((c) => c.brandPartnerId).slice(0, 3);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <div className="max-w-3xl">
          <p className="mb-4 inline-block rounded-full bg-[var(--crafty-accent)]/40 px-4 py-1.5 text-sm font-semibold text-[var(--crafty-accent-dark)]">
            Neu in München
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--crafty-ink)] sm:text-6xl">
            Kreativität unter einem Dach.
          </h1>
          <p className="mt-6 text-lg text-[var(--crafty-muted)]">
            CRAFTY bündelt Zeichnen, Malen, Töpfern, Sticken, Steinhauen, Rage Room, Lasertag, Yoga,
            Pilates und Kochkurse in einer Halle mit vielen Räumen – viele davon in Kooperation mit
            Marken wie Faber-Castell, RIMOWA, lululemon und Hilti.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/kurse">Kurse entdecken</Button>
            <Button href="/standort" variant="ghost">
              Standort München ansehen
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--crafty-border)] bg-[var(--crafty-surface)] py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--crafty-ink)]">Alles unter einem Dach</h2>
            <p className="mt-3 text-[var(--crafty-muted)]">
              Statt zehn verschiedene Studios in der ganzen Stadt abzuklappern, findest du bei CRAFTY
              alle Kursarten in einer Halle mit mehreren Räumen – ein Ort, viele Möglichkeiten.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--crafty-ink)]">Kurse mit echten Marken</h2>
            <p className="mt-3 text-[var(--crafty-muted)]">
              Male deinen eigenen RIMOWA-Koffer, sticke mit lululemon oder bearbeite Stein mit
              Profi-Werkzeug von Hilti – unsere Markenkooperationen machen Kurse zu Erlebnissen.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Markenkooperationen" title="Unsere Partner" />
        <div className="mt-8 flex flex-wrap gap-3">
          {brandPartners.map((brand) => (
            <span
              key={brand.id}
              className="rounded-full border border-[var(--crafty-border)] px-4 py-2 text-sm font-semibold"
              style={{ color: brand.accentColor }}
            >
              {brand.name}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Beliebt" title="Kurse mit Markenkooperation" />
          <Link href="/kurse" className="hidden text-sm font-semibold text-[var(--crafty-accent-dark)] sm:block">
            Alle Kurse ansehen →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.slug}
              course={course}
              category={categories.find((c) => c.id === course.category)}
              brand={brandPartners.find((b) => b.id === course.brandPartnerId)}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-[var(--crafty-ink)] px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">Bald auch in deiner Stadt</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Wir starten in München – und wachsen als Franchise weiter. Betreiber erhalten Zugriff auf
            Standort-Daten, einen Equipment-Marktplatz und unseren Trend-Radar.
          </p>
          <Button href="/partner" variant="secondary" className="mt-6">
            Partner-Bereich ansehen
          </Button>
        </div>
      </section>
    </div>
  );
}
