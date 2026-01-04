import { createStore } from "zustand-x";
import {
  getVehicleById,
  calculateVehiclePrice,
} from "@/lib/services/vehicle-service";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface BookingState {
  currentStep: number;
  tripDetails: {
    type: "one-way" | "round-trip" | "hourly";
    pickupLocation: string;
    dropoffLocation: string;
    pickupCoordinates?: Coordinates | null;
    dropoffCoordinates?: Coordinates | null;
    distance?: number | null;
    date: string;
    time: string;
    returnDate?: string;
    returnTime?: string;
    duration?: string;
    passengers: number;
    luggage: number;
    vehicleType?: string;
  };
  selectedVehicle: string | null;
  passengerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    flightNumber?: string;
    notes?: string;
  };
  extras: {
    childSeat: boolean;
    meetAndGreet: boolean;
    champagne: boolean;
  };
}

const initialState: BookingState = {
  currentStep: 0,
  tripDetails: {
    type: "one-way",
    pickupLocation: "",
    dropoffLocation: "",
    date: "",
    time: "",
    passengers: 1,
    luggage: 1,
  },
  selectedVehicle: null,
  passengerDetails: {
    firstName: "",
    lastName: "",
    email: "",
  },
  extras: {
    childSeat: false,
    meetAndGreet: false,
    champagne: false,
  },
};

export const bookingStore = createStore<BookingState>(initialState, {
  name: "booking",
  devtools: { enabled: true },
  persist: {
    enabled: true,
    name: "aacomfort-booking",
  },
});

// Reset function to clear the entire state
export const resetBookingStore = () => {
  bookingStore.set("currentStep", initialState.currentStep);
  bookingStore.set("tripDetails", initialState.tripDetails);
  bookingStore.set("selectedVehicle", initialState.selectedVehicle);
  bookingStore.set("passengerDetails", initialState.passengerDetails);
  bookingStore.set("extras", initialState.extras);
};

export const useBookingStore = bookingStore.useStore;
export const useBookingTrackedStore = bookingStore.useTrackedStore;

// Helper: compute fare for provided trip details and extras.
// This function delegates to the vehicle pricing logic in services so UI can
// show a price breakdown before booking.

export const calculateFareForTrip = (opts: {
  vehicleId: string | undefined | null;
  distanceMiles: number | undefined | null;
  meetAndGreet?: boolean;
  pickupIsAirport?: boolean;
  dropoffIsAirport?: boolean;
  waitingMinutes?: number;
}) => {
  const vehicleId = opts.vehicleId || null;
  const distance = Math.max(0, opts.distanceMiles || 0);
  if (!vehicleId) {
    return null;
  }

  const vehicle = getVehicleById(vehicleId);
  if (!vehicle) return null;

  const pricing = calculateVehiclePrice(vehicle, distance, {
    meetAndGreet: opts.meetAndGreet,
    pickupIsAirport: opts.pickupIsAirport,
    dropoffIsAirport: opts.dropoffIsAirport,
    waitingMinutes: opts.waitingMinutes,
  });

  return pricing;
};
