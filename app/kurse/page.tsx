"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { courses, categories, brandPartners, getBusinessOffer } from "@/lib/mock-data";
import { CourseCard } from "@/components/course/CourseCard";
import { CourseFilterBar } from "@/components/course/CourseFilterBar";
import { SectionHeading } from "@/components/ui/SectionHeading";

function KursePageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategorie");
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [onlyBrandCooperations, setOnlyBrandCooperations] = useState(false);
  const [onlyBusiness, setOnlyBusiness] = useState(searchParams.get("business") === "1");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (activeCategory && course.category !== activeCategory) return false;
      if (onlyBrandCooperations && !course.brandPartnerId) return false;
      if (onlyBusiness && !getBusinessOffer(course.slug)) return false;
      return true;
    });
  }, [activeCategory, onlyBrandCooperations, onlyBusiness]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading eyebrow="Kurskatalog" title="Alle Kurse bei Atelierhaus" description="Finde deinen Kurs — filterbar nach Kategorie und Markenkooperation." />

      <div className="mt-8">
        <CourseFilterBar
          categories={categories}
          activeCategory={activeCategory}
          onlyBrandCooperations={onlyBrandCooperations}
          onCategoryChange={setActiveCategory}
          onBrandToggle={setOnlyBrandCooperations}
          onlyBusiness={onlyBusiness}
          onBusinessToggle={setOnlyBusiness}
        />
      </div>

      {filteredCourses.length === 0 ? (
        <p className="mt-12 text-sm text-[var(--crafty-muted)]">Keine Kurse gefunden. Passe deine Filter an.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.slug}
              course={course}
              category={categories.find((c) => c.id === course.category)}
              brand={brandPartners.find((b) => b.id === course.brandPartnerId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function KursePage() {
  return (
    <Suspense>
      <KursePageContent />
    </Suspense>
  );
}
