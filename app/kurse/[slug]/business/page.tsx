import { notFound } from "next/navigation";
import Link from "next/link";
import { courses, businessOffers, getBusinessOffer } from "@/lib/mock-data";
import { BusinessRequestForm } from "@/components/business/BusinessRequestForm";

export function generateStaticParams() {
  return businessOffers.map((offer) => ({ slug: offer.courseSlug }));
}

export default async function BusinessRequestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  const offer = getBusinessOffer(slug);
  if (!course || !offer) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href={`/kurse/${course.slug}`} className="text-sm font-bold text-[var(--crafty-accent-dark)] hover:underline">
        ← Zurück zum Kurs
      </Link>
      <p className="mt-6 text-sm font-bold uppercase tracking-[0.15em] text-[var(--crafty-accent-dark)]">
        Business-Trip anfragen
      </p>
      <h1 className="mt-2 max-w-3xl text-4xl font-black leading-[1.05] tracking-tighter text-[var(--crafty-ink)] sm:text-5xl lg:text-6xl">
        {course.title} für euer Team
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-[var(--crafty-muted)]">
        Für {offer.minGroup}–{offer.maxGroup} Mitarbeitende, exklusiv für euer Unternehmen. Schickt uns eure Wünsche –
        ihr bekommt innerhalb von 24 Stunden ein verbindliches Angebot.
      </p>
      <div className="mt-10">
        <BusinessRequestForm course={course} offer={offer} />
      </div>
    </div>
  );
}
