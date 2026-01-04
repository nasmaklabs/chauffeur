"use client";

import React, { useMemo } from "react";
import VehicleCard from "@/components/fleet/VehicleCard";
import { bookingStore, useBookingStore } from "@/lib/store/bookingStore";
import {
  getVehicles,
  calculateVehiclePrice,
  isVehicleSuitable,
  getRecommendedBadge,
} from "@/lib/services/vehicle-service";

interface VehicleSelectionStepProps {
  onNext?: () => void;
}

const VehicleSelectionStep: React.FC<VehicleSelectionStepProps> = ({
  onNext,
}) => {
  const selectedVehicle = useBookingStore((state) => state.selectedVehicle);
  const tripDetails = useBookingStore((state) => state.tripDetails);
  const extras = useBookingStore((state) => state.extras);

  const handleVehicleSelect = (vehicleId: string | null) => {
    if (vehicleId) {
      bookingStore.set("selectedVehicle", vehicleId);
      bookingStore.set("tripDetails", {
        ...tripDetails,
        vehicleType: vehicleId,
      });

      if (onNext) {
        setTimeout(() => {
          onNext();
        }, 600);
      }
    }
  };

  const vehiclesWithPricing = useMemo(() => {
    const vehicles = getVehicles();
    const distance = tripDetails.distance || 0;
    const requiredPassengers = tripDetails.passengers || 1;
    const requiredLuggage = tripDetails.luggage || 0;

    // Detect if pickup or dropoff is an airport
    const pickupIsAirport = tripDetails.pickupLocation
      ? tripDetails.pickupLocation.toLowerCase().includes("airport")
      : false;
    const dropoffIsAirport = tripDetails.dropoffLocation
      ? tripDetails.dropoffLocation.toLowerCase().includes("airport")
      : false;

    return vehicles.map((vehicle, idx) => {
      const suitable = isVehicleSuitable(
        vehicle,
        requiredPassengers,
        requiredLuggage
      );
      const priceBreakdown = calculateVehiclePrice(vehicle, distance, {
        meetAndGreet: extras.meetAndGreet,
        pickupIsAirport,
        dropoffIsAirport,
      });
      const badge = getRecommendedBadge(vehicle, suitable, requiredPassengers);

      return {
        ...vehicle,
        // Alternate comfort images between comfort and executive to reflect BMW/Mercedes
        image:
          vehicle.id === "comfort"
            ? idx % 2 === 0
              ? "/images/comfort.png"
              : "/images/exacutive.png"
            : vehicle.image,
        isSuitable: suitable,
        priceBreakdown,
        badge,
      };
    });
  }, [
    tripDetails.distance,
    tripDetails.passengers,
    tripDetails.luggage,
    tripDetails.pickupLocation,
    tripDetails.dropoffLocation,
    extras.meetAndGreet,
  ]);

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
        <h2 className="text-2xl font-bold text-secondary mb-2">
          Select Your Vehicle
        </h2>
        <p className="text-gray-500 mb-4">
          Trip requirements: {tripDetails.passengers || 1} passenger(s),{" "}
          {tripDetails.luggage || 0} bag(s)
          {distance > 0 && ` • Distance: ${distance.toFixed(2)} miles`}
        </p>
        {distance === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
            💡 Prices shown are base fares. Complete trip details to see
            accurate pricing.
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sortedVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`cursor-pointer transition-all rounded-xl
                            ${
                              vehicle.isSuitable
                                ? "hover:scale-[1.01]"
                                : "cursor-not-allowed"
                            }
                        `}
            onClick={() =>
              vehicle.isSuitable && handleVehicleSelect(vehicle.id)
            }
          >
            <VehicleCard
              name={vehicle.name}
              image={vehicle.image}
              passengers={vehicle.passengers}
              luggage={vehicle.luggage}
              description={vehicle.description}
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
