import Link from "next/link";
import { courses, categories, brandPartners } from "@/lib/mock-data";
import { CourseCard } from "@/components/course/CourseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const featuredCourses = courses.filter((c) => c.brandPartnerId).slice(0, 3);

  return (
    <div>
      <section className="mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-20 text-center sm:px-6 sm:pt-28">
        <p className="mb-6 inline-block rounded-full bg-[var(--crafty-accent)] px-4 py-1.5 text-sm font-semibold text-[var(--crafty-accent-dark)]">
          Neu in München
        </p>
        <h1 className="text-6xl font-extrabold tracking-tight text-[var(--crafty-ink)] sm:text-8xl">
          Atelierhaus
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--crafty-muted)]">
          Kreativität unter einem Dach — Zeichnen, Malen, Töpfern, Sticken, Steinhauen, Rage Room,
          Lasertag, Yoga, Pilates und Kochkurse, viele davon in Kooperation mit Marken wie
          Faber-Castell, RIMOWA, lululemon und Hilti.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href="/kurse">Kurse entdecken</Button>
          <Button href="/standort" variant="ghost">
            Standort München ansehen
          </Button>
        </div>
      </section>

      <section className="border-y border-[var(--crafty-border)] bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6">
          <div className="rounded-[28px] bg-[var(--pastel-sage)]/40 p-8">
            <h2 className="text-2xl font-bold text-[var(--crafty-ink)]">Alles unter einem Dach</h2>
            <p className="mt-3 text-[var(--crafty-muted)]">
              Statt zehn verschiedene Studios in der ganzen Stadt abzuklappern, findest du bei
              Atelierhaus alle Kursarten in einer Halle mit mehreren Räumen – ein Ort, viele
              Möglichkeiten.
            </p>
          </div>
          <div className="rounded-[28px] bg-[var(--pastel-blush)]/40 p-8">
            <h2 className="text-2xl font-bold text-[var(--crafty-ink)]">Kurse mit echten Marken</h2>
            <p className="mt-3 text-[var(--crafty-muted)]">
              Male deinen eigenen RIMOWA-Koffer, sticke mit lululemon oder bearbeite Stein mit
              Profi-Werkzeug von Hilti – unsere Markenkooperationen machen Kurse zu Erlebnissen.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Markenkooperationen" title="Unsere Partner" align="center" />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {brandPartners.map((brand) => (
            <span
              key={brand.id}
              className="rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-semibold shadow-sm"
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
        <div className="rounded-[28px] bg-[var(--crafty-accent-dark)] px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">Bald auch in deiner Stadt</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
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
