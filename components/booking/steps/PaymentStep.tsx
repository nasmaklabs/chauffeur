"use client";

import React, { useMemo } from "react";
import { Checkbox, Divider } from "antd";
import {
  useBookingStore,
  calculateFareForTrip,
} from "@/lib/store/bookingStore";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

// Pricing is computed centrally via `calculateFareForTrip` so both vehicle
// selection and payment pages show the same numbers. Taxes are applied on
// the subtotal returned by the fare calculator.

const PaymentStep = () => {
  const router = useRouter();
  const tripDetails = useBookingStore((state) => state.tripDetails);
  const selectedVehicle = useBookingStore((state) => state.selectedVehicle);
  const passengerDetails = useBookingStore((state) => state.passengerDetails);
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  const createBooking = trpc.booking.create.useMutation({
    onSuccess: (data) => {
      router.push(`/booking/confirmation/${data.booking.bookingReference}`);
    },
    onError: (error) => {
      console.error("Booking error:", error);
    },
  });

  // Calculate pricing using the shared helper. We infer airport legs from
  // the pickup/dropoff location strings by checking for the word 'airport'.
  const pricing = useMemo(() => {
    if (!selectedVehicle) return null;

    const distance = tripDetails.distance || 0;

    const pickupIsAirport = !!tripDetails.pickupLocation
      ? tripDetails.pickupLocation.toLowerCase().includes("airport")
      : false;
    const dropoffIsAirport = !!tripDetails.dropoffLocation
      ? tripDetails.dropoffLocation.toLowerCase().includes("airport")
      : false;

    const fare = calculateFareForTrip({
      vehicleId: selectedVehicle,
      distanceMiles: distance,
      meetAndGreet: useBookingStore.getState().extras.meetAndGreet,
      pickupIsAirport,
      dropoffIsAirport,
      // waitingMinutes not captured in UI currently
    });

    if (!fare) return null;

    // Subtotal (no tax applied here — taxes temporarily disabled per request)
    const subtotal =
      fare.baseFare +
      fare.distanceCharge +
      fare.meetAndGreetCharge +
      fare.airportCharge +
      fare.waitingCharge;
    // const taxes = parseFloat((subtotal * 0.1).toFixed(2)); // 10% tax (disabled)
    const total = parseFloat(subtotal.toFixed(2));

    return {
      ...fare,
      subtotal,
      // taxes,
      total,
    };
  }, [
    selectedVehicle,
    tripDetails.distance,
    tripDetails.pickupLocation,
    tripDetails.dropoffLocation,
  ]);

  const handleConfirmBooking = () => {
    if (!acceptedTerms) {
      return;
    }

    if (
      !passengerDetails.firstName ||
      !passengerDetails.lastName ||
      !passengerDetails.email ||
      false
    ) {
      return;
    }

    createBooking.mutate({
      tripType: tripDetails.type,
      pickupLocation: tripDetails.pickupLocation,
      dropoffLocation: tripDetails.dropoffLocation || undefined,
      pickupCoordinates: tripDetails.pickupCoordinates || undefined,
      dropoffCoordinates: tripDetails.dropoffCoordinates || undefined,
      distance: tripDetails.distance || undefined,
      date: tripDetails.date,
      time: tripDetails.time,
      returnDate: tripDetails.returnDate,
      returnTime: tripDetails.returnTime,
      duration: tripDetails.duration,
      vehicleType: tripDetails.vehicleType,
      selectedVehicle: selectedVehicle || undefined,
      passengers: tripDetails.passengers,
      luggage: tripDetails.luggage,
      firstName: passengerDetails.firstName,
      lastName: passengerDetails.lastName,
      email: passengerDetails.email,
      flightNumber: passengerDetails.flightNumber,
      notes: passengerDetails.notes,
      baseFare: pricing?.baseFare,
      distanceCharge: pricing?.distanceCharge,
      totalPrice: pricing?.total,
    });
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-secondary">
            Confirm Booking
          </h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              <strong>Payment on Arrival:</strong> You will pay the driver when
              your journey is completed.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-secondary mb-2">
                Trip Details
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>From:</strong> {tripDetails.pickupLocation}
                </p>
                {tripDetails.dropoffLocation && (
                  <p>
                    <strong>To:</strong> {tripDetails.dropoffLocation}
                  </p>
                )}
                <p>
                  <strong>Date:</strong> {tripDetails.date} at{" "}
                  {tripDetails.time}
                </p>
                {tripDetails.distance && (
                  <p>
                    <strong>Distance:</strong> {tripDetails.distance.toFixed(2)}{" "}
                    miles
                  </p>
                )}
              </div>
            </div>

            <Divider className="my-4" />

            <div>
              <h3 className="font-semibold text-secondary mb-2">
                Passenger Information
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Name:</strong> {passengerDetails.firstName}{" "}
                  {passengerDetails.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {passengerDetails.email}
                </p>
                {/* phone removed */}
                {passengerDetails.flightNumber && (
                  <p>
                    <strong>Flight:</strong> {passengerDetails.flightNumber}
                  </p>
                )}
              </div>
            </div>

            <Divider className="my-4" />

            <Checkbox
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="text-sm text-gray-600"
            >
              I agree to the Terms and Conditions and Privacy Policy.
            </Checkbox>

            <Button
              type="primary"
              size="large"
              block
              className="bg-success h-12 font-bold mt-4"
              onClick={handleConfirmBooking}
              disabled={!acceptedTerms || createBooking.isPending}
              loading={createBooking.isPending}
            >
              {createBooking.isPending ? "Processing..." : "Confirm Booking"}
            </Button>

            {createBooking.isError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                Failed to create booking. Please try again.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="md:col-span-1">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-24">
          <h3 className="text-xl font-bold mb-4">Booking Summary</h3>

          {pricing ? (
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Base Fare</span>
                <span className="font-semibold">
                  £{pricing.baseFare.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Distance Charge</span>
                <span className="font-semibold">
                  £{pricing.distanceCharge.toFixed(2)}
                </span>
              </div>
              {pricing.airportCharge > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Airport Charge</span>
                  <span className="font-semibold">
                    £{pricing.airportCharge.toFixed(2)}
                  </span>
                </div>
              )}
              {/* Taxes & Fees (10%) - temporarily disabled per request
              <div className="flex justify-between text-gray-600">
                <span>Taxes & Fees (10%)</span>
                <span className="font-semibold">
                  £{pricing.taxes.toFixed(2)}
                </span>
              </div>
              */}
              <Divider className="my-2" />
              <div className="flex justify-between text-lg font-bold text-secondary">
                <span>Total</span>
                <span className="text-primary">
                  £{pricing.total.toFixed(2)}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 mb-6">
              Please complete previous steps to see pricing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
