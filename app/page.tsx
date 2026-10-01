import Image from "next/image";
import {
  courses,
  categories,
  brandPartners,
  timeSlots,
  instructors,
  faqItems,
  businessOffers,
} from "@/lib/mock-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { NextUpCard } from "@/components/home/NextUpCard";
import { BrandCourseCarousel } from "@/components/home/BrandCourseCarousel";
import { WorkshopGrid } from "@/components/home/WorkshopGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InstructorGrid } from "@/components/home/InstructorGrid";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { ImpressionGallery } from "@/components/home/ImpressionGallery";
import { PartnerMarquee } from "@/components/home/PartnerMarquee";
import { BusinessTeaser } from "@/components/home/BusinessTeaser";

export default function HomePage() {
  const brandCourses = courses.flatMap((course) => {
    const brand = brandPartners.find((b) => b.id === course.brandPartnerId);
    if (!brand) return [];
    const categoryName = categories.find((c) => c.id === course.category)?.name ?? course.category;
    return [{ course, brand, categoryName }];
  });

  const businessTeaserItems = ["mercedes-design-sketching", "sternekueche-zuhause", "weintasting-vom-fass"].flatMap(
    (slug) => {
      const course = courses.find((c) => c.slug === slug);
      const offer = businessOffers.find((o) => o.courseSlug === slug);
      return course && offer ? [{ course, offer }] : [];
    }
  );

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

  const categoryImageOverrides: Partial<Record<string, string>> = {
    toepfern: "/course-images/keramik-handaufbau.jpg",
  };
  const categoryImages = Object.fromEntries(
    categories.map((category) => [
      category.id,
      categoryImageOverrides[category.id] ??
        courses.find((course) => course.category === category.id && course.imageSrc)?.imageSrc,
    ])
  );


  return (
    <div>
      <section className="relative isolate flex min-h-[66vh] items-end overflow-hidden px-4 pb-14 pt-28 sm:px-6 sm:pb-16">
        <Image
          src="/hero-innen.jpg"
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
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/25 to-transparent"
        />

        <div className="mx-auto w-full max-w-6xl text-white">
          <Image
            src="/atelierhaus-wordmark-bold.png"
            alt="Atelierhaus"
            width={843}
            height={90}
            priority
            className="h-auto w-full max-w-xs invert sm:max-w-md"
          />
          <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
            Ein Haus voller Ideen.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80 sm:text-xl">
            Zeichnen, Töpfern, Floristik, Weintasting und mehr – mit Marken wie Mercedes-Benz, RIMOWA und
            lululemon. Alles in einer Halle in München.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#markenkurse" variant="secondary">
              Kreativ mit Brands
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

      <section className="bg-[var(--crafty-petrol)] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-[var(--crafty-accent-light)]">
                Warum Atelierhaus
              </p>
              <h2 className="text-4xl font-black leading-[1.05] tracking-tighter sm:text-5xl lg:text-6xl">
                Alles unter einem Dach. Mit echten Marken.
              </h2>
            </div>
            <p className="text-lg text-white/70">
              Statt zehn verschiedene Studios in der ganzen Stadt abzuklappern, findest du bei Atelierhaus alle
              Kursarten in einer Halle. Und mit Partnern wie Mercedes-Benz, RIMOWA, lululemon oder Hilti werden
              Kurse zu Erlebnissen.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--crafty-border)] bg-white py-12 sm:py-14">
        <p className="text-center text-sm font-bold uppercase tracking-[0.15em] text-[var(--crafty-muted)]">
          Unsere Partner
        </p>
        <div className="mt-8">
          <PartnerMarquee brands={brandPartners} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading
          eyebrow="Werkstätten"
          title="Was möchtest du als Nächstes können?"
          description={`${categories.length} Kursarten unter einem Dach — wähl deine Kategorie und leg direkt los.`}
        />
        <div className="mt-12">
          <WorkshopGrid categories={categories} courseCounts={courseCounts} categoryImages={categoryImages} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <SectionHeading
          eyebrow="Einblicke"
          title="So sieht es in unseren Kursen aus"
          description="Echte Werkstätten, lange Tische und viel Raum zum Ausprobieren."
        />
        <div className="mt-12">
          <ImpressionGallery />
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          <BusinessTeaser items={businessTeaserItems} />
        </div>
      </section>

      <section id="so-laeufts" className="bg-white py-20 sm:py-28 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="So läuft's" title="Vom Sofa an die Werkbank in vier Schritten" />
          <div className="mt-14">
            <HowItWorks />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading eyebrow="Wer dich anleitet" title="Echte Künstler:innen, persönlich geprüft" />
        <div className="mt-12">
          <InstructorGrid instructors={instructors} />
        </div>
      </section>

      <section id="faq" className="bg-white py-20 sm:py-28 scroll-mt-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              eyebrow="Gut zu wissen"
              title="Häufige Fragen"
              description="Noch etwas unklar? Hier findest du die wichtigsten Antworten."
            />
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-[var(--crafty-petrol)] px-6 py-20 text-center text-white sm:px-12 sm:py-28">
          <Image
            src="/standort-fassade.jpg"
            alt=""
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="-z-20 object-cover opacity-40"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--crafty-petrol)] via-[var(--crafty-petrol)]/80 to-[var(--crafty-petrol)]/40" />
          <h2 className="mx-auto max-w-4xl text-4xl font-black leading-[1.02] tracking-tighter sm:text-6xl lg:text-7xl">
            Dein nächster freier Abend gehört dem Atelierhaus.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
            Wir starten in München – und wachsen als Franchise weiter. Betreiber erhalten Zugriff auf
            Standort-Daten, einen Equipment-Marktplatz und unseren Trend-Radar.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/kurse" variant="light">
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
