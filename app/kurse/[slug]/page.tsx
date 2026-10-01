import { notFound } from "next/navigation";
import Image from "next/image";
import { courses, categories, brandPartners, getBusinessOffer } from "@/lib/mock-data";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { BrandCooperationBadge } from "@/components/course/BrandCooperationBadge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const category = categories.find((c) => c.id === course.category);
  const brand = brandPartners.find((b) => b.id === course.brandPartnerId);
  const businessOffer = getBusinessOffer(course.slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="relative h-56 w-full overflow-hidden rounded-[28px] bg-[var(--crafty-bg)]">
        {course.imageSrc ? (
          <Image
            src={course.imageSrc}
            alt={course.title}
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover"
          />
        ) : (
          <PlaceholderImage seed={course.slug} label={category?.name ?? course.category} className="h-full w-full" />
        )}
      </div>

      <div className="mt-8">
        {brand && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-16 items-center rounded-2xl border border-black/5 bg-white px-5 shadow-sm">
              {brand.logoSrc ? (
                <Image
                  src={brand.logoSrc}
                  alt={brand.name}
                  width={160}
                  height={40}
                  className="h-9 w-auto max-w-[160px] object-contain"
                />
              ) : (
                <span className="text-sm font-bold text-[var(--crafty-ink)]">{brand.name}</span>
              )}
            </div>
            <BrandCooperationBadge brand={brand} />
          </div>
        )}
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--crafty-ink)] sm:text-4xl">
          {course.title}
        </h1>
        <p className="mt-4 text-base text-[var(--crafty-muted)]">{course.description}</p>

        <dl className="mt-8 grid grid-cols-2 gap-4 rounded-[28px] border border-black/5 bg-white shadow-sm p-6 sm:grid-cols-4">
          <Detail label="Preis" value={formatPrice(course.price)} />
          <Detail label="Dauer" value={`${course.durationMinutes} Min`} />
          <Detail label="Level" value={course.level} />
          <Detail label="Raum" value={course.room} />
        </dl>

        <div className="mt-8">
          <Button href={`/kurse/${course.slug}/buchen`}>Jetzt buchen</Button>
        </div>

        {businessOffer && (
          <section className="mt-12 overflow-hidden rounded-[32px] bg-[var(--crafty-ink)] p-6 text-white sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--crafty-accent-light)]">Für Firmen & HR</p>
            <h2 className="mt-2 text-3xl font-black tracking-tighter sm:text-4xl">Business-Trip für dein Team</h2>
            <p className="mt-3 max-w-xl text-white/70">
              Diesen Kurs gibt es exklusiv für eure Mitarbeitenden – mit eigenem Termin, Rechnung auf das Unternehmen
              und optionalem Catering.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <ul className="space-y-2 text-sm text-white/80">
                {businessOffer.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span aria-hidden>✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="sm:text-right">
                <p className="text-sm text-white/60">
                  {businessOffer.minGroup}–{businessOffer.maxGroup} Personen · gleicher Preis wie im Kurs
                </p>
                <p className="text-4xl font-black tracking-tighter">
                  {formatPrice(course.price)}
                  <span className="text-base font-semibold text-white/60"> p. P.</span>
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Button href={`/kurse/${course.slug}/business`} variant="secondary">
                Als Business-Trip anfragen →
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--crafty-muted)]">{label}</dt>
      <dd className="mt-1 font-semibold text-[var(--crafty-ink)]">{value}</dd>
    </div>
  );
}
