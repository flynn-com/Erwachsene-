import { categories } from "@/lib/mock-data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";

const rooms = [
  { name: "Atelier 1 & 2", use: "Zeichnen, Malen, Markenkooperationen" },
  { name: "Werkraum Keramik", use: "Töpfern an der Scheibe und im Handaufbau" },
  { name: "Atelier 3", use: "Sticken und Textilarbeit" },
  { name: "Werkhalle", use: "Steinhauen mit Profi-Werkzeug" },
  { name: "Rage Room", use: "Schallgedämmt, mit Schutzausrüstung" },
  { name: "Lasertag-Arena", use: "Parcours für bis zu 20 Spieler:innen" },
  { name: "Bewegungsraum", use: "Yoga und Pilates" },
  { name: "Showküche", use: "Kochkurse mit Sterneköchen" },
  { name: "Blumenwerkstatt", use: "Sträuße binden und Floristik" },
];

export default function StandortPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="Standort"
        title="Atelierhaus München"
        description="Eine Halle, neun Räume, zwölf Kursarten. Mitten in München gelegen — der erste Atelierhaus-Standort und die Blaupause für unser Franchise-Konzept."
      />

      <Image
        src="/hero-atelierhaus.jpg"
        alt="Backsteinhalle des Atelierhaus München mit großen Rundbogenfenstern"
        width={1500}
        height={837}
        priority
        sizes="(min-width: 1024px) 976px, 100vw"
        className="mt-8 h-auto w-full rounded-[28px] object-cover"
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {rooms.map((room) => (
          <div key={room.name} className="rounded-[22px] border border-black/5 bg-white shadow-sm p-5">
            <h3 className="font-bold text-[var(--crafty-ink)]">{room.name}</h3>
            <p className="mt-1 text-sm text-[var(--crafty-muted)]">{room.use}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[28px] border border-black/5 bg-white shadow-sm p-6">
        <h3 className="font-bold text-[var(--crafty-ink)]">Adresse (Platzhalter)</h3>
        <p className="mt-2 text-sm text-[var(--crafty-muted)]">
          Kreativstraße 12, 80331 München — geöffnet täglich von 9:00 bis 22:00 Uhr.
        </p>
      </div>

      <div className="mt-10">
        <h3 className="mb-4 font-bold text-[var(--crafty-ink)]">Kursarten am Standort</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category.id}
              className="rounded-full border border-black/5 bg-white px-4 py-2 text-sm font-medium text-[var(--crafty-ink)] shadow-sm"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
