import { VEHICLES, Vehicle } from "@/lib/constants/vehicles";
import {
  FARE_RULES,
  AIRPORT_CHARGE_PER_LEG,
  MEET_AND_GREET_FREE_WAIT_MINUTES,
  VehicleFareRule,
} from "@/lib/constants/fares";

export interface PricingResult {
  baseFare: number; // the minimum fare that covers the first N miles
  distanceCharge: number; // extra distance charge beyond the firstN
  meetAndGreetCharge: number;
  airportCharge: number;
  waitingCharge: number;
  total: number;
  breakdown: {
    minFareForFirstN: number;
    firstNMiles: number;
    perMileAfterFirstN: number;
  };
}

type CalculateOptions = {
  meetAndGreet?: boolean;
  pickupIsAirport?: boolean;
  dropoffIsAirport?: boolean;
  waitingMinutes?: number; // total waiting minutes (first MEET_AND_GREET_FREE_WAIT_MINUTES free when meet & greet?)
};

const getFareRuleForVehicle = (vehicle: Vehicle): VehicleFareRule => {
  const rule = FARE_RULES[vehicle.id];
  if (!rule) {
    // fallback: use vehicle base fare and perMileRate for backwards compatibility
    return {
      minFareForFirstN: vehicle.baseFare || 0,
      firstNMiles: 0,
      perMileAfterFirstN: vehicle.perMileRate || 0,
      meetAndGreetCharge: 0,
      waitingRatePerMinute: 0,
    } as VehicleFareRule;
  }
  return rule;
};

export const calculateVehiclePrice = (
  vehicle: Vehicle,
  distance: number,
  options: CalculateOptions = {}
): PricingResult => {
  const rule = getFareRuleForVehicle(vehicle);

  const extraMiles = Math.max(0, distance - rule.firstNMiles);

  // base fare covers firstN miles
  const baseFare = rule.minFareForFirstN;
  const distanceCharge = parseFloat(
    (extraMiles * rule.perMileAfterFirstN).toFixed(2)
  );

  const meetAndGreetCharge = options.meetAndGreet
    ? rule.meetAndGreetCharge || 0
    : 0;

  const airportCharge =
    (options.pickupIsAirport ? 1 : 0) * AIRPORT_CHARGE_PER_LEG +
    (options.dropoffIsAirport ? 1 : 0) * AIRPORT_CHARGE_PER_LEG;

  const waitingMinutes = Math.max(0, options.waitingMinutes || 0);
  // Free waiting window
  const chargeableWaitingMinutes = Math.max(
    0,
    waitingMinutes - MEET_AND_GREET_FREE_WAIT_MINUTES
  );
  const waitingCharge = parseFloat(
    ((rule.waitingRatePerMinute || 0) * chargeableWaitingMinutes).toFixed(2)
  );

  const total = parseFloat(
    (
      baseFare +
      distanceCharge +
      meetAndGreetCharge +
      airportCharge +
      waitingCharge
    ).toFixed(2)
  );

  return {
    baseFare,
    distanceCharge,
    meetAndGreetCharge,
    airportCharge,
    waitingCharge,
    total,
    breakdown: {
      minFareForFirstN: rule.minFareForFirstN,
      firstNMiles: rule.firstNMiles,
      perMileAfterFirstN: rule.perMileAfterFirstN,
    },
  };
};

export const isVehicleSuitable = (
  vehicle: Vehicle,
  passengers: number,
  luggage: number
): boolean => {
  return vehicle.passengers >= passengers && vehicle.luggage >= luggage;
};

export const getRecommendedBadge = (
  vehicle: Vehicle,
  isSuitable: boolean,
  passengers: number
): "recommended" | "popular" | null => {
  if (!isSuitable) return null;
  // Recommend based on passenger count
  if (vehicle.id === "saloon" && passengers <= 3) return "recommended";
  if (vehicle.id === "comfort" && passengers <= 4) return "recommended";
  if (vehicle.id === "mpv6" && passengers > 4 && passengers <= 6)
    return "recommended";
  if (vehicle.id === "mpv7" && passengers > 6) return "recommended";

  return null;
};

export const getVehicles = () => VEHICLES;

export const getVehicleById = (id: string): Vehicle | undefined => {
  return VEHICLES.find((v) => v.id === id);
};

export const getVehicleName = (id: string | null | undefined): string => {
  if (!id) return "Not Selected";
  const vehicle = VEHICLES.find((v) => v.id === id);
  return vehicle?.name || id.toUpperCase();
};
