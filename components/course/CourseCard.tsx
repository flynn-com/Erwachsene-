import Link from "next/link";
import { Course, BrandPartner, Category } from "@/lib/mock-data/types";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { BrandCooperationBadge } from "@/components/course/BrandCooperationBadge";
import { formatPrice } from "@/lib/format";

type CourseCardProps = {
  course: Course;
  category?: Category;
  brand?: BrandPartner;
};

export function CourseCard({ course, category, brand }: CourseCardProps) {
  return (
    <Link
      href={`/kurse/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--crafty-border)] bg-[var(--crafty-surface)] transition-shadow hover:shadow-lg"
    >
      <PlaceholderImage seed={course.slug} label={category?.name ?? course.category} className="h-36 w-full" />
      <div className="flex flex-1 flex-col gap-2 p-5">
        {brand && <BrandCooperationBadge brand={brand} />}
        <h3 className="text-lg font-bold text-[var(--crafty-ink)] group-hover:underline">{course.title}</h3>
        <p className="line-clamp-2 text-sm text-[var(--crafty-muted)]">{course.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-3 text-sm">
          <span className="font-semibold text-[var(--crafty-ink)]">{formatPrice(course.price)}</span>
          <span className="text-[var(--crafty-muted)]">{course.durationMinutes} Min · {course.level}</span>
        </div>
      </div>
    </Link>
  );
}
