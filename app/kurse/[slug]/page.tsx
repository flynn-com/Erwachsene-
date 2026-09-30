import { notFound } from "next/navigation";
import { courses, categories, brandPartners } from "@/lib/mock-data";
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

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <PlaceholderImage seed={course.slug} label={category?.name ?? course.category} className="h-56 w-full rounded-2xl" />

      <div className="mt-8">
        {brand && <BrandCooperationBadge brand={brand} />}
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--crafty-ink)] sm:text-4xl">
          {course.title}
        </h1>
        <p className="mt-4 text-base text-[var(--crafty-muted)]">{course.description}</p>

        <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-[var(--crafty-border)] bg-[var(--crafty-surface)] p-6 sm:grid-cols-4">
          <Detail label="Preis" value={formatPrice(course.price)} />
          <Detail label="Dauer" value={`${course.durationMinutes} Min`} />
          <Detail label="Level" value={course.level} />
          <Detail label="Raum" value={course.room} />
        </dl>

        <div className="mt-8">
          <Button href={`/kurse/${course.slug}/buchen`}>Jetzt buchen</Button>
        </div>
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
