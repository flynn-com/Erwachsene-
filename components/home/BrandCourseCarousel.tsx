"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { BrandPartner, Course } from "@/lib/mock-data/types";

type BrandCourse = {
  course: Course;
  brand: BrandPartner;
  categoryName: string;
};

function ArrowButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Vorherige Kurse" : "Nächste Kurse"}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--crafty-ink)]/15 bg-white text-lg text-[var(--crafty-ink)] transition-colors hover:bg-[var(--crafty-ink)] hover:text-white"
    >
      {direction === "left" ? "←" : "→"}
    </button>
  );
}

export function BrandCourseCarousel({ items, allCoursesCount }: { items: BrandCourse[]; allCoursesCount: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          href="/kurse"
          className="text-sm font-bold text-[var(--crafty-accent-dark)] underline-offset-4 hover:underline"
        >
          Alle {allCoursesCount} Kurse ansehen →
        </Link>
        <div className="hidden gap-3 sm:flex">
          <ArrowButton direction="left" onClick={() => scroll(-1)} />
          <ArrowButton direction="right" onClick={() => scroll(1)} />
        </div>
      </div>

      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {items.map(({ course, brand, categoryName }) => (
          <Link
            key={course.slug}
            href={`/kurse/${course.slug}`}
            className="group relative aspect-[3/4] w-[78%] shrink-0 snap-start overflow-hidden rounded-[32px] bg-[var(--crafty-ink)] sm:w-[44%] lg:w-[31%]"
          >
            {course.imageSrc && (
              <Image
                src={course.imageSrc}
                alt={course.title}
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 44vw, 78vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <div className="absolute left-5 top-5 flex h-10 items-center rounded-full bg-white px-4 shadow-sm">
              {brand.logoSrc ? (
                <Image
                  src={brand.logoSrc}
                  alt={brand.name}
                  width={110}
                  height={24}
                  className="h-5 w-auto max-w-[110px] object-contain"
                />
              ) : (
                <span className="text-xs font-bold uppercase tracking-wide text-[var(--crafty-ink)]">{brand.name}</span>
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/70">{categoryName}</p>
              <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight">{course.title}</h3>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold">
                <span>
                  {course.price} € · {course.durationMinutes} Min.
                </span>
                <span className="rounded-full bg-white px-4 py-2 text-[var(--crafty-ink)] transition-transform group-hover:translate-x-1">
                  Buchen →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
