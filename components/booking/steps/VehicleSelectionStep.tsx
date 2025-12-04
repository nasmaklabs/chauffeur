'use client';

import React, { useMemo } from 'react';
import VehicleCard from '@/components/fleet/VehicleCard';
import { bookingStore, useBookingStore } from '@/lib/store/bookingStore';

interface VehicleSelectionStepProps {
    onNext?: () => void;
}

interface Vehicle {
    id: string;
    name: string;
    description: string;
    image: string;
    passengers: number;
    luggage: number;
    baseFare: number;
    perKmRate: number;
    features: string[];
}

const VehicleSelectionStep: React.FC<VehicleSelectionStepProps> = ({ onNext }) => {
    const selectedVehicle = useBookingStore(state => state.selectedVehicle);
    const tripDetails = useBookingStore(state => state.tripDetails);
    
    const handleVehicleSelect = (vehicleId: string | null) => {
        if (vehicleId) {
            // Set the selected vehicle
            bookingStore.set('selectedVehicle', vehicleId);
            
            // Also update vehicleType in tripDetails to match selected vehicle
            bookingStore.set('tripDetails', {
                ...tripDetails,
                vehicleType: vehicleId,
            });
            
            // Automatically proceed to next step after a short delay
            if (onNext) {
                setTimeout(() => {
                    onNext();
                }, 600);
            }
        }
    };

    const vehicles: Vehicle[] = [
        { 
            id: 'sedan', 
            name: 'Executive Sedan', 
            description: 'Perfect for business trips and airport transfers',
            image: '/placeholder-car.png', 
            passengers: 3, 
            luggage: 2, 
            baseFare: 25,
            perKmRate: 1.5,
            features: ['Free WiFi', 'Bottled Water', 'Leather Seats', 'Climate Control']
        },
        { 
            id: 'luxury', 
            name: 'Luxury Sedan', 
            description: 'Premium comfort for special occasions',
            image: '/placeholder-car.png', 
            passengers: 3, 
            luggage: 2, 
            baseFare: 40,
            perKmRate: 2.0,
            features: ['Premium WiFi', 'Champagne Service', 'Nappa Leather', 'Privacy Glass']
        },
        { 
            id: 'suv', 
            name: 'Luxury SUV', 
            description: 'Spacious and comfortable for families',
            image: '/placeholder-car.png', 
            passengers: 5, 
            luggage: 4, 
            baseFare: 45,
            perKmRate: 2.2,
            features: ['Free WiFi', 'Extra Luggage Space', 'Panoramic Roof', 'Premium Sound']
        },
        { 
            id: 'van', 
            name: 'Luxury Van', 
            description: 'Ideal for groups and extra luggage',
            image: '/placeholder-car.png', 
            passengers: 7, 
            luggage: 7, 
            baseFare: 60,
            perKmRate: 2.5,
            features: ['Conference Seating', 'Electric Doors', 'Tables', 'Extra Luggage Space']
        },
    ];

    // Calculate pricing and suitability
    const vehiclesWithPricing = useMemo(() => {
        const distance = tripDetails.distance || 0;
        const requiredPassengers = tripDetails.passengers || 1;
        const requiredLuggage = tripDetails.luggage || 0;

        return vehicles.map(vehicle => {
            const isSuitable = vehicle.passengers >= requiredPassengers && vehicle.luggage >= requiredLuggage;
            const distanceCharge = distance * vehicle.perKmRate;
            const total = vehicle.baseFare + distanceCharge;

            // Determine badge
            let badge: 'recommended' | 'popular' | null = null;
            if (isSuitable) {
                // Recommend the most economical suitable vehicle
                if (vehicle.id === 'sedan' && requiredPassengers <= 3 && requiredLuggage <= 2) {
                    badge = 'recommended';
                } else if (vehicle.id === 'suv' && requiredPassengers > 3 && requiredPassengers <= 5) {
                    badge = 'recommended';
                } else if (vehicle.id === 'van' && requiredPassengers > 5) {
                    badge = 'recommended';
                }
                // Mark luxury sedan as popular
                if (vehicle.id === 'luxury') {
                    badge = 'popular';
                }
            }

            return {
                ...vehicle,
                isSuitable,
                priceBreakdown: {
                    baseFare: vehicle.baseFare,
                    distanceCharge,
                    total,
                },
                badge,
            };
        });
    }, [tripDetails.distance, tripDetails.passengers, tripDetails.luggage]);

    // Sort: suitable first, then by price
    const sortedVehicles = useMemo(() => {
        return [...vehiclesWithPricing].sort((a, b) => {
            if (a.isSuitable && !b.isSuitable) return -1;
            if (!a.isSuitable && b.isSuitable) return 1;
            return a.priceBreakdown.total - b.priceBreakdown.total;
        });
    }, [vehiclesWithPricing]);

    const distance = tripDetails.distance || 0;

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-secondary mb-2">Select Your Vehicle</h2>
                <p className="text-gray-500 mb-4">
                    Trip requirements: {tripDetails.passengers || 1} passenger(s), {tripDetails.luggage || 0} bag(s)
                    {distance > 0 && ` • Distance: ${distance.toFixed(2)} km`}
                </p>
                {distance === 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                        💡 Prices shown are base fares. Complete trip details to see accurate pricing.
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {sortedVehicles.map(vehicle => (
                    <div
                        key={vehicle.id}
                        className={`cursor-pointer transition-all rounded-xl
                            ${vehicle.isSuitable ? 'hover:scale-[1.01]' : 'cursor-not-allowed'}
                        `}
                        onClick={() => vehicle.isSuitable && handleVehicleSelect(vehicle.id)}
                    >
                        <VehicleCard
                            name={vehicle.name}
                            image={vehicle.image}
                            passengers={vehicle.passengers}
                            luggage={vehicle.luggage}
                            features={vehicle.features}
                            selectionMode={true}
                            isSelected={selectedVehicle === vehicle.id}
                            priceBreakdown={distance > 0 ? vehicle.priceBreakdown : undefined}
                            price={distance === 0 ? `£${vehicle.baseFare}+` : undefined}
                            isSuitable={vehicle.isSuitable}
                            badge={vehicle.badge}
                        />
                    </div>
                ))}
            </div>

            {selectedVehicle && !onNext && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <p className="text-green-800 font-semibold">
                        ✓ Vehicle selected! Continue to the next step.
                    </p>
                </div>
            )}
        </div>
    );
};

export default VehicleSelectionStep;
