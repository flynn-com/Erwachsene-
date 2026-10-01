import Image from "next/image";

const impressions = [
  {
    src: "/einblicke/bildhauer-atelier.jpg",
    alt: "Bildhauer modellieren lebensgroße Tonfiguren im Atelier",
    label: "Werkhalle",
    caption: "Großformatig arbeiten: Modellieren und Bildhauerei mit viel Platz und Tageslicht.",
  },
  {
    src: "/einblicke/schmuck-workshop.jpg",
    alt: "Gruppe gestaltet Schmuck mit Perlen und Zangen an einem langen Tisch",
    label: "Ateliers",
    caption: "Gemeinsam am langen Tisch: Material liegt bereit, du bringst nur Neugier mit.",
  },
  {
    src: "/einblicke/talk-runde.jpg",
    alt: "Gesprächsrunde mit Gästen in einem hellen Raum",
    label: "Events",
    caption: "Talks mit Markenpartnern und Kreativen – bei einem Drink in entspannter Runde.",
  },
];

export function ImpressionGallery() {
  return (
    <div className="grid gap-6 sm:grid-cols-3 sm:gap-5">
      {impressions.map((item, i) => (
        <figure key={item.src} className={i === 1 ? "sm:mt-16" : ""}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] sm:aspect-[4/5] bg-[var(--crafty-ink)]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <figcaption className="mt-4 px-1">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--crafty-accent-dark)]">
              {item.label}
            </span>
            <p className="mt-1 text-[var(--crafty-muted)]">{item.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
