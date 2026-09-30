export type CategoryId =
  | "zeichnen"
  | "malen"
  | "toepfern"
  | "sticken"
  | "steinhauen"
  | "rage-room"
  | "lasertag"
  | "yoga"
  | "pilates"
  | "kochen";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface BrandPartner {
  id: string;
  name: string;
  blurb: string;
  accentColor: string;
  logoSrc?: string;
}

export type CourseLevel = "Einsteiger" | "Fortgeschritten" | "Alle Level";

export interface Course {
  slug: string;
  title: string;
  category: CategoryId;
  shortDescription: string;
  description: string;
  durationMinutes: number;
  price: number;
  room: string;
  brandPartnerId?: string;
  imageSrc?: string;
  level: CourseLevel;
  maxParticipants: number;
}

export interface TimeSlot {
  id: string;
  courseSlug: string;
  start: string;
  freeSpots: number;
  totalSpots: number;
}

export interface FranchiseLocation {
  id: string;
  name: string;
  city: string;
  isFlagship: boolean;
  openedYear: number;
}

export interface KpiWeek {
  weekLabel: string;
  bookings: number;
  utilization: number;
  revenue: number;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: CategoryId;
  pricePerMonth: number;
  available: number;
  total: number;
  description: string;
}

export interface TrendSignal {
  id: string;
  scope: "lokal" | "global";
  title: string;
  momentum: number;
  suggestedCategory?: CategoryId;
  suggestedBrandPartner?: string;
  rationale: string;
}
