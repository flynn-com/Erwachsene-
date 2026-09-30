import Link from "next/link";
import Image from "next/image";
import { Course, BrandPartner, Category } from "@/lib/mock-data/types";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

type CourseCardProps = {
  course: Course;
  category?: Category;
  brand?: BrandPartner;
};

function splitTitle(title: string): { prefix: string | null; rest: string } {
  const colonIndex = title.indexOf(":");
  if (colonIndex === -1) return { prefix: null, rest: title };
  return {
    prefix: title.slice(0, colonIndex + 1),
    rest: title.slice(colonIndex + 1).trim(),
  };
}

export function CourseCard({ course, category, brand }: CourseCardProps) {
  const { prefix, rest } = splitTitle(course.title);

  return (
    <Link
      href={`/kurse/${course.slug}`}
      className="group relative flex flex-col rounded-[28px] border border-black/5 bg-white p-3 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-[var(--crafty-bg)]">
        {course.imageSrc ? (
          <Image
            src={course.imageSrc}
            alt={course.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <PlaceholderImage seed={course.slug} label={category?.name ?? course.category} className="h-full w-full" />
        )}
      </div>

      <div className="flex flex-col items-center gap-3 px-3 pb-8 pt-5 text-center">
        {brand?.logoSrc ? (
          <Image
            src={brand.logoSrc}
            alt={brand.name}
            width={140}
            height={28}
            className="h-7 w-auto max-w-[140px] object-contain"
          />
        ) : brand ? (
          <span className="text-xs font-bold uppercase tracking-wide text-[var(--crafty-muted)]">{brand.name}</span>
        ) : null}

        <h3 className="text-base uppercase leading-snug tracking-tight text-[var(--crafty-ink)]">
          {prefix && <span className="font-medium">{prefix} </span>}
          <span className="font-extrabold">{rest}</span>
        </h3>

        <p className="text-lg font-bold text-[var(--crafty-ink)]">{course.price} EURO</p>
      </div>

      <p className="absolute bottom-3 right-4 text-xs font-medium text-[var(--crafty-muted)]">
        {course.durationMinutes} MIN.
      </p>
    </Link>
  );
}
