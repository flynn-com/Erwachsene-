import { KpiWeek } from "./types";

const weekLabels = ["KW 1", "KW 2", "KW 3", "KW 4", "KW 5", "KW 6", "KW 7", "KW 8"];

export const kpisByLocation: Record<string, KpiWeek[]> = {
  muenchen: [
    { weekLabel: weekLabels[0], bookings: 142, utilization: 61, revenue: 6120 },
    { weekLabel: weekLabels[1], bookings: 158, utilization: 66, revenue: 6840 },
    { weekLabel: weekLabels[2], bookings: 171, utilization: 71, revenue: 7430 },
    { weekLabel: weekLabels[3], bookings: 165, utilization: 69, revenue: 7180 },
    { weekLabel: weekLabels[4], bookings: 189, utilization: 78, revenue: 8260 },
    { weekLabel: weekLabels[5], bookings: 204, utilization: 83, revenue: 9010 },
    { weekLabel: weekLabels[6], bookings: 198, utilization: 81, revenue: 8720 },
    { weekLabel: weekLabels[7], bookings: 221, utilization: 88, revenue: 9740 },
  ],
  hamburg: [
    { weekLabel: weekLabels[0], bookings: 58, utilization: 34, revenue: 2340 },
    { weekLabel: weekLabels[1], bookings: 66, utilization: 38, revenue: 2680 },
    { weekLabel: weekLabels[2], bookings: 71, utilization: 41, revenue: 2890 },
    { weekLabel: weekLabels[3], bookings: 77, utilization: 44, revenue: 3120 },
    { weekLabel: weekLabels[4], bookings: 84, utilization: 48, revenue: 3410 },
    { weekLabel: weekLabels[5], bookings: 92, utilization: 52, revenue: 3760 },
    { weekLabel: weekLabels[6], bookings: 89, utilization: 51, revenue: 3630 },
    { weekLabel: weekLabels[7], bookings: 97, utilization: 55, revenue: 3980 },
  ],
  koeln: [
    { weekLabel: weekLabels[0], bookings: 12, utilization: 14, revenue: 480 },
    { weekLabel: weekLabels[1], bookings: 18, utilization: 19, revenue: 720 },
    { weekLabel: weekLabels[2], bookings: 24, utilization: 24, revenue: 960 },
    { weekLabel: weekLabels[3], bookings: 27, utilization: 27, revenue: 1080 },
    { weekLabel: weekLabels[4], bookings: 33, utilization: 31, revenue: 1320 },
    { weekLabel: weekLabels[5], bookings: 39, utilization: 35, revenue: 1560 },
    { weekLabel: weekLabels[6], bookings: 41, utilization: 37, revenue: 1640 },
    { weekLabel: weekLabels[7], bookings: 47, utilization: 41, revenue: 1880 },
  ],
};
