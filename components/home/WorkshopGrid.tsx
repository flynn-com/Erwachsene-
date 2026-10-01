import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/mock-data/types";

type WorkshopGridProps = {
  categories: Category[];
  courseCounts: Record<string, number>;
  categoryImages: Record<string, string | undefined>;
};

export function WorkshopGrid({ categories, courseCounts, categoryImages }: WorkshopGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {categories.map((category, i) => {
        const count = courseCounts[category.id] ?? 0;
        const image = categoryImages[category.id];
        const isWide = i === 0;
        return (
          <Link
            key={category.id}
            href={`/kurse?kategorie=${category.id}`}
            className={`group relative isolate flex min-h-48 flex-col justify-end overflow-hidden rounded-[28px] bg-[var(--crafty-ink)] p-5 text-white sm:min-h-60 ${
              isWide ? "col-span-2" : ""
            }`}
          >
            {image && (
              <Image
                src={image}
                alt=""
                fill
                sizes={isWide ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[var(--crafty-ink)]">
              {count} {count === 1 ? "Kurs" : "Kurse"}
            </span>
            <h3
              className={`font-black leading-none tracking-tighter ${isWide ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}
            >
              {category.name}
            </h3>
            <p className="mt-2 text-sm text-white/75">{category.description}</p>
          </Link>
        );
      })}
    </div>
  );
}
