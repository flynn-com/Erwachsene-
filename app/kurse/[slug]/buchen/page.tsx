import { notFound } from "next/navigation";
import { courses, getSlotsForCourse } from "@/lib/mock-data";
import { BookingStepper } from "@/components/booking/BookingStepper";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function BookingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const slots = getSlotsForCourse(course.slug);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold text-[var(--crafty-accent-dark)]">Buchung</p>
      <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--crafty-ink)]">{course.title}</h1>
      <div className="mt-8">
        <BookingStepper course={course} slots={slots} />
      </div>
    </div>
  );
}
