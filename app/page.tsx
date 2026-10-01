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
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { NextUpCard } from "@/components/home/NextUpCard";
import { BrandCourseCarousel } from "@/components/home/BrandCourseCarousel";
import { WorkshopGrid } from "@/components/home/WorkshopGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InstructorGrid } from "@/components/home/InstructorGrid";
import { FaqAccordion } from "@/components/home/FaqAccordion";

export default function HomePage() {
  const brandCourses = courses.flatMap((course) => {
    const brand = brandPartners.find((b) => b.id === course.brandPartnerId);
    if (!brand) return [];
    const categoryName = categories.find((c) => c.id === course.category)?.name ?? course.category;
    return [{ course, brand, categoryName }];
  });

  const upcoming = [...timeSlots]
    .filter((slot) => slot.freeSpots > 0)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 4)
    .map((slot) => {
      const course = courses.find((c) => c.slug === slot.courseSlug)!;
      const categoryName = categories.find((c) => c.id === course.category)?.name ?? course.category;
      const brandName = brandPartners.find((b) => b.id === course.brandPartnerId)?.name;
      return { slot, course, categoryId: course.category, categoryName, brandName };
    });

  const courseCounts = courses.reduce<Record<string, number>>((acc, course) => {
    acc[course.category] = (acc[course.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <section className="relative isolate flex min-h-[66vh] items-end overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pb-16">
        <Image
          src="/hero-atelierhaus.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/10"
        />

        <div className="mx-auto w-full max-w-6xl text-white">
          <Image
            src="/atelierhaus-logo.png"
            alt="Atelierhaus"
            width={674}
            height={73}
            priority
            className="h-auto w-full max-w-md invert"
          />
          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
            Ein Haus voller Ideen.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80 sm:text-xl">
            Zeichnen, Töpfern, Floristik, Weintasting und mehr – mit Marken wie Mercedes-Benz, RIMOWA und
            lululemon. Alles in einer Halle in München.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#markenkurse" variant="secondary">
              Markenkurse entdecken
            </Button>
            <Button href="/kurse" variant="ghost-invert">
              Alle Kurse ansehen
            </Button>
          </div>
        </div>
      </section>

      <section id="markenkurse" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-8 pt-16 sm:px-6 sm:pt-20">
        <SectionHeading
          eyebrow="Kurse mit Marke"
          title="Kreativ mit den Marken, die du liebst"
          description="Echte Markenkooperationen: Material, Produkte und Profis direkt von den Marken."
        />
        <div className="mt-8">
          <BrandCourseCarousel items={brandCourses} allCoursesCount={courses.length} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <NextUpCard items={upcoming} />
      </section>

      <section className="border-y border-[var(--crafty-border)] bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 sm:px-6">
          <div className="rounded-[28px] bg-[var(--pastel-sage)]/40 p-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--crafty-ink)]">Alles unter einem Dach</h2>
            <p className="mt-3 text-[var(--crafty-muted)]">
              Statt zehn verschiedene Studios in der ganzen Stadt abzuklappern, findest du bei
              Atelierhaus alle Kursarten in einer Halle mit mehreren Räumen – ein Ort, viele
              Möglichkeiten.
            </p>
          </div>
          <div className="rounded-[28px] bg-[var(--pastel-blush)]/40 p-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--crafty-ink)]">Kurse mit echten Marken</h2>
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
          <h2 className="text-4xl font-black tracking-tighter sm:text-6xl">Dein nächster freier Abend gehört dem Atelierhaus.</h2>
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
