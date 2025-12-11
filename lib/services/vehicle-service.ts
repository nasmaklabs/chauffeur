import { VEHICLES, Vehicle } from "@/lib/constants/vehicles";

interface PricingResult {
  baseFare: number;
  distanceCharge: number;
  total: number;
}

export const calculateVehiclePrice = (
  vehicle: Vehicle,
  distance: number
): PricingResult => {
  const distanceCharge = distance * vehicle.perKmRate;
  const total = vehicle.baseFare + distanceCharge;

  return {
    baseFare: vehicle.baseFare,
    distanceCharge,
    total,
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

  // Executive is popular choice for business travelers
  if (vehicle.id === "executive") return "popular";

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
