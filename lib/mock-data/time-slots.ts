import { TimeSlot } from "./types";
import { courses } from "./courses";

function buildSlotsForCourse(courseSlug: string, maxParticipants: number): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const dayOffsets = [1, 2, 4, 6, 9];
  const hours = [10, 14, 17, 19];

  dayOffsets.forEach((dayOffset, i) => {
    const hour = hours[i % hours.length];
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    date.setHours(hour, 0, 0, 0);

    const pseudoRandom = (dayOffset * 7 + hour * 3) % maxParticipants;
    const freeSpots = Math.max(0, maxParticipants - pseudoRandom - 1);

    slots.push({
      id: `${courseSlug}-${dayOffset}-${hour}`,
      courseSlug,
      start: date.toISOString(),
      freeSpots,
      totalSpots: maxParticipants,
    });
  });

  return slots;
}

export const timeSlots: TimeSlot[] = courses.flatMap((course) =>
  buildSlotsForCourse(course.slug, course.maxParticipants)
);

export function getSlotsForCourse(courseSlug: string): TimeSlot[] {
  return timeSlots.filter((slot) => slot.courseSlug === courseSlug);
}
