export const TRIP_TYPES = {
  ONE_WAY: "one-way",
  ROUND_TRIP: "round-trip",
  HOURLY: "hourly",
} as const;

export type TripType = (typeof TRIP_TYPES)[keyof typeof TRIP_TYPES];

export const TRIP_TYPE_OPTIONS = [
  { label: "One Way", key: TRIP_TYPES.ONE_WAY },
  { label: "Round Trip", key: TRIP_TYPES.ROUND_TRIP },
  { label: "Hourly", key: TRIP_TYPES.HOURLY },
];

export const DURATION_OPTIONS = [
  { value: "3", label: "3 Hours" },
  { value: "4", label: "4 Hours" },
  { value: "5", label: "5 Hours" },
  { value: "6", label: "6 Hours" },
  { value: "7", label: "7 Hours" },
  { value: "8", label: "8 Hours" },
  { value: "9", label: "9 Hours" },
  { value: "10", label: "10 Hours" },
  { value: "11", label: "11 Hours" },
  { value: "12", label: "12 Hours" },
  { value: "13", label: "13 Hours" },
  { value: "14", label: "14 Hours" },
  { value: "15", label: "15 Hours" },
  { value: "16", label: "16 Hours" },
  { value: "17", label: "17 Hours" },
  { value: "18", label: "18 Hours" },
  { value: "19", label: "19 Hours" },
  { value: "20", label: "20 Hours" },
  { value: "21", label: "21 Hours" },
  { value: "22", label: "22 Hours" },
  { value: "23", label: "23 Hours" },
  { value: "24", label: "24 Hours" },
] as const;

export const TIME_FORMAT = "HH:mm";
export const DATE_FORMAT = "YYYY-MM-DD";
