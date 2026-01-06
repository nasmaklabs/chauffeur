export type VehicleFareRule = {
  minFareForFirstN: number; // minimum fare that covers first N miles
  firstNMiles: number; // N miles covered by minFareForFirstN
  perMileAfterFirstN: number; // per-mile rate after first N miles
  meetAndGreetCharge: number; // flat meet & greet fee for this vehicle class
  waitingRatePerMinute?: number; // optional waiting rate per minute after free window
  hourlyRate?: {
    minimumHours: number; // minimum hours required for flat rate
    flatRate: number; // flat rate for minimum hours
    perHourAfterMinimum: number; // per hour rate after minimum hours
  };
};

export const DEFAULT_WAITING_RATE_PER_MINUTE = 0.5; // ASSUMPTION: £0.50 per minute after free 60 minutes

export const FARE_RULES: Record<string, VehicleFareRule> = {
  saloon: {
    minFareForFirstN: 30,
    firstNMiles: 6,
    perMileAfterFirstN: 1.6,
    meetAndGreetCharge: 15,
    waitingRatePerMinute: DEFAULT_WAITING_RATE_PER_MINUTE,
    hourlyRate: {
      minimumHours: 3,
      flatRate: 100,
      perHourAfterMinimum: 30,
    },
  },
  comfort: {
    // 'Executive' equivalent
    minFareForFirstN: 35,
    firstNMiles: 6,
    perMileAfterFirstN: 2.8,
    meetAndGreetCharge: 15,
    waitingRatePerMinute: DEFAULT_WAITING_RATE_PER_MINUTE,
    hourlyRate: {
      minimumHours: 3,
      flatRate: 125,
      perHourAfterMinimum: 40,
    },
  },
  mpv6: {
    minFareForFirstN: 35,
    firstNMiles: 6,
    perMileAfterFirstN: 2.8,
    meetAndGreetCharge: 15,
    waitingRatePerMinute: DEFAULT_WAITING_RATE_PER_MINUTE,
    hourlyRate: {
      minimumHours: 3,
      flatRate: 125,
      perHourAfterMinimum: 40,
    },
  },
  wheelchair: {
    minFareForFirstN: 35,
    firstNMiles: 6,
    perMileAfterFirstN: 2.8,
    meetAndGreetCharge: 15,
    waitingRatePerMinute: DEFAULT_WAITING_RATE_PER_MINUTE,
    hourlyRate: {
      minimumHours: 3,
      flatRate: 125,
      perHourAfterMinimum: 40,
    },
  },
  caddy: {
    minFareForFirstN: 35,
    firstNMiles: 6,
    perMileAfterFirstN: 2.8,
    meetAndGreetCharge: 15,
    waitingRatePerMinute: DEFAULT_WAITING_RATE_PER_MINUTE,
    hourlyRate: {
      minimumHours: 3,
      flatRate: 125,
      perHourAfterMinimum: 40,
    },
  },
  mpv7: {
    minFareForFirstN: 50,
    firstNMiles: 6,
    perMileAfterFirstN: 3.5,
    meetAndGreetCharge: 20,
    waitingRatePerMinute: DEFAULT_WAITING_RATE_PER_MINUTE,
    hourlyRate: {
      minimumHours: 3,
      flatRate: 150,
      perHourAfterMinimum: 50,
    },
  },
};

export const AIRPORT_CHARGE_PER_LEG = 7; // £7 for airport pickup OR dropoff (per leg)
export const MEET_AND_GREET_FREE_WAIT_MINUTES = 60; // first 60 minutes waiting included

// Note on assumptions:
// 1) Waiting rate is set to a default of £0.50/minute for all vehicle classes. This
//    value was not specified in the requirements so it's configurable here.
// 2) Airport charge applies per leg. If both pickup and dropoff are airports, it is
//    applied twice.
