import { VEHICLES, Vehicle } from '@/lib/constants/vehicles';

interface PricingResult {
    baseFare: number;
    distanceCharge: number;
    total: number;
}

export const calculateVehiclePrice = (vehicle: Vehicle, distance: number): PricingResult => {
    const distanceCharge = distance * vehicle.perKmRate;
    const total = vehicle.baseFare + distanceCharge;
    
    return {
        baseFare: vehicle.baseFare,
        distanceCharge,
        total,
    };
};

export const isVehicleSuitable = (vehicle: Vehicle, passengers: number, luggage: number): boolean => {
    return vehicle.passengers >= passengers && vehicle.luggage >= luggage;
};

export const getRecommendedBadge = (
    vehicle: Vehicle, 
    isSuitable: boolean, 
    passengers: number
): 'recommended' | 'popular' | null => {
    if (!isSuitable) return null;
    
    if (vehicle.id === 'luxury') return 'popular';
    
    if (vehicle.id === 'sedan' && passengers <= 3) return 'recommended';
    if (vehicle.id === 'suv' && passengers > 3 && passengers <= 5) return 'recommended';
    if (vehicle.id === 'van' && passengers > 5) return 'recommended';
    
    return null;
};

export const getVehicles = () => VEHICLES;

export const getVehicleById = (id: string): Vehicle | undefined => {
    return VEHICLES.find(v => v.id === id);
};

