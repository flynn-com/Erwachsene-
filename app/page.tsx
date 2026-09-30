import Link from "next/link";
import Image from "next/image";
import {
  courses,
  categories,
  brandPartners,
  timeSlots,
  instructors,
  faqItems,
} from "@/lib/mock-data";
import { CourseCard } from "@/components/course/CourseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { NextUpCard } from "@/components/home/NextUpCard";
import { WorkshopGrid } from "@/components/home/WorkshopGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InstructorGrid } from "@/components/home/InstructorGrid";
import { FaqAccordion } from "@/components/home/FaqAccordion";

export default function HomePage() {
  const featuredCourses = courses.filter((c) => c.brandPartnerId).slice(0, 3);

  const upcoming = [...timeSlots]
    .filter((slot) => slot.freeSpots > 0)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 3)
    .map((slot) => {
      const course = courses.find((c) => c.slug === slot.courseSlug)!;
      const categoryName = categories.find((c) => c.id === course.category)?.name ?? course.category;
      return { slot, course, categoryName };
    });

  const courseCounts = courses.reduce<Record<string, number>>((acc, course) => {
    acc[course.category] = (acc[course.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-4 inline-block rounded-full bg-[var(--crafty-accent)] px-4 py-1.5 text-sm font-semibold text-[var(--crafty-accent-dark)]">
            Kreativkurse für Erwachsene · München
          </p>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-[var(--crafty-ink)] sm:text-6xl">
            Ein Haus voller Werkstätten.
            <br />
            <span className="text-[var(--crafty-accent-dark)]">Jede Woche etwas Neues.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--crafty-muted)]">
            Zeichnen, Malen, Töpfern, Sticken, Steinhauen, Rage Room, Lasertag, Yoga, Pilates und
            Kochkurse unter einem Dach — viele davon in Kooperation mit Marken wie Faber-Castell,
            RIMOWA, lululemon und Hilti.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/kurse">Kurse entdecken</Button>
            <Button href="/standort" variant="ghost">
              Standort München ansehen
            </Button>
          </div>
        </div>

        <NextUpCard items={upcoming} />
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
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {brandPartners.map((brand) =>
            brand.logoSrc ? (
              <div
                key={brand.id}
                className="flex h-20 w-40 items-center justify-center rounded-[24px] border border-black/5 bg-white p-5 shadow-sm"
              >
                <Image
                  src={brand.logoSrc}
                  alt={brand.name}
                  width={140}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div
                key={brand.id}
                className="flex h-20 w-40 items-center justify-center rounded-[24px] border border-black/5 bg-white p-5 shadow-sm"
              >
                <span className="text-sm font-semibold" style={{ color: brand.accentColor }}>
                  {brand.name}
                </span>
              </div>
            )
          )}
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

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Werkstätten"
            title="Was möchtest du als Nächstes können?"
            description="Elf Werkstätten unter einem Dach — wähl deine Kategorie und leg direkt los."
          />
          <div className="mt-8">
            <WorkshopGrid categories={categories} courseCounts={courseCounts} />
          </div>
        </div>
      </section>

      <section id="so-laeufts" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="So läuft's" title="Vom Sofa auf den Werkbank-Stuhl in vier Schritten" />
        <div className="mt-8">
          <HowItWorks />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Wer dich anleitet" title="Echte Künstler:innen, persönlich geprüft" />
          <div className="mt-8">
            <InstructorGrid instructors={instructors} />
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Gut zu wissen" title="Häufige Fragen" align="center" />
        <div className="mt-8">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-[28px] bg-[var(--crafty-accent-dark)] px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">Dein nächster freier Abend gehört dem Atelierhaus.</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Wir starten in München – und wachsen als Franchise weiter. Betreiber erhalten Zugriff auf
            Standort-Daten, einen Equipment-Marktplatz und unseren Trend-Radar.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/kurse" variant="secondary">
              Kurse entdecken
            </Button>
            <Button href="/partner" variant="ghost-invert">
              Partner-Bereich ansehen
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
