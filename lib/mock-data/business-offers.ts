import { BusinessOffer } from "./types";

export const businessOffers: BusinessOffer[] = [
  {
    courseSlug: "mercedes-design-sketching",
    minGroup: 8,
    maxGroup: 24,
    highlights: ["Designer aus dem Mercedes-Benz Studio", "Ausstellung der Team-Entwürfe", "Getränke und Snacks inklusive"],
  },
  {
    courseSlug: "koffer-kunst-rimowa",
    minGroup: 6,
    maxGroup: 16,
    highlights: ["Jede:r gestaltet einen eigenen RIMOWA-Koffer", "Ideal als Incentive", "Koffer zum Mitnehmen"],
  },
  {
    courseSlug: "sternekueche-zuhause",
    minGroup: 8,
    maxGroup: 20,
    highlights: ["Gemeinsames Mehrgang-Menü", "Weinbegleitung buchbar", "Showküche exklusiv für euer Team"],
  },
  {
    courseSlug: "weintasting-vom-fass",
    minGroup: 10,
    maxGroup: 30,
    highlights: ["Sommelier-geführte Verkostung", "Brot- und Käseplatte inklusive", "Perfekt als Afterwork"],
  },
  {
    courseSlug: "rage-room",
    minGroup: 4,
    maxGroup: 12,
    highlights: ["Stressabbau im Team", "Schutzausrüstung inklusive", "Lounge für danach"],
  },
  {
    courseSlug: "blumenwerkstatt-tischdeko",
    minGroup: 6,
    maxGroup: 16,
    highlights: ["Saisonblumen und Gefäße inklusive", "Arrangements zum Mitnehmen", "Entspannter Team-Nachmittag"],
  },
  {
    courseSlug: "keramik-handaufbau",
    minGroup: 6,
    maxGroup: 14,
    highlights: ["Jede:r formt ein eigenes Stück", "Brand und Versand inklusive", "Keine Vorkenntnisse nötig"],
  },
  {
    courseSlug: "steinhauen-grundlagen",
    minGroup: 4,
    maxGroup: 10,
    highlights: ["Profi-Werkzeug von Hilti", "Sicherheitseinweisung inklusive", "Teambuilding mit Hammer und Meißel"],
  },
];

export function getBusinessOffer(courseSlug: string): BusinessOffer | undefined {
  return businessOffers.find((offer) => offer.courseSlug === courseSlug);
}
