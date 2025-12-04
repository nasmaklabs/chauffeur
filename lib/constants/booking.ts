export const TRIP_TYPES = {
    ONE_WAY: 'one-way',
    ROUND_TRIP: 'round-trip',
    HOURLY: 'hourly',
} as const;

export type TripType = typeof TRIP_TYPES[keyof typeof TRIP_TYPES];

export const TRIP_TYPE_OPTIONS = [
    { label: 'One Way', key: TRIP_TYPES.ONE_WAY },
    { label: 'Round Trip', key: TRIP_TYPES.ROUND_TRIP },
    { label: 'Hourly', key: TRIP_TYPES.HOURLY },
];

export const DURATION_OPTIONS = [
    { value: '3', label: '3 Hours' },
    { value: '4', label: '4 Hours' },
    { value: '8', label: '8 Hours' },
    { value: '12', label: '12 Hours' },
] as const;

export const TIME_FORMAT = 'HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';

