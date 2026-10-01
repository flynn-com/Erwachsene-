import { courses, categories, brandPartners, businessOffers } from "@/lib/mock-data";
import { CourseCard } from "@/components/course/CourseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  { title: "Exklusiv für euer Team", text: "Raum, Kursleitung und Material gehören an dem Tag nur euch." },
  { title: "Ein Angebot, eine Rechnung", text: "Rechnung direkt auf das Unternehmen – inklusive Extras wie Catering." },
  { title: "Antwort in 24 Stunden", text: "Anfrage in zwei Minuten stellen, verbindliches Angebot am nächsten Tag." },
];

export default function BusinessPage() {
  const offerCourses = businessOffers.flatMap((offer) => {
    const course = courses.find((c) => c.slug === offer.courseSlug);
    return course ? [course] : [];
  });

  return (
    <div>
      <section className="bg-[var(--crafty-petrol)] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--crafty-accent-light)]">Für Firmen & HR</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-black leading-[0.95] tracking-tighter sm:text-7xl">
            Business-Trips, die euer Team nicht vergisst.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            Teamevents, Incentives oder Weiterbildung: Bucht ausgewählte Atelierhaus-Kurse exklusiv für eure
            Mitarbeitenden – von 4 bis 30 Personen.
          </p>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-white/10 sm:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-[var(--crafty-petrol)] p-6 sm:p-8">
                <h2 className="text-xl font-extrabold tracking-tight">{benefit.title}</h2>
                <p className="mt-2 text-sm text-white/65">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Für Teams buchbar"
          title="Diese Kurse gibt es als Business-Trip"
          description="Kurs auswählen und auf der Kursseite direkt die Anfrage für euer Team stellen."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offerCourses.map((course) => (
            <CourseCard
              key={course.slug}
              course={course}
              category={categories.find((c) => c.id === course.category)}
              brand={brandPartners.find((b) => b.id === course.brandPartnerId)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
