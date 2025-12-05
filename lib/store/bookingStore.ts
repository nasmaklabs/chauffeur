import { createStore } from 'zustand-x';

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface BookingState {
    currentStep: number;
    tripDetails: {
        type: 'one-way' | 'round-trip' | 'hourly';
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
        phone: string;
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
        type: 'one-way',
        pickupLocation: '',
        dropoffLocation: '',
        date: '',
        time: '',
        passengers: 1,
        luggage: 1,
    },
    selectedVehicle: null,
    passengerDetails: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    },
    extras: {
        childSeat: false,
        meetAndGreet: false,
        champagne: false,
    },
};

export const bookingStore = createStore<BookingState>(initialState, {
    name: 'booking',
    devtools: { enabled: true },
    persist: {
        enabled: true,
        name: 'aacomfort-booking',
    },
});

// Reset function to clear the entire state
export const resetBookingStore = () => {
    bookingStore.set('currentStep', initialState.currentStep);
    bookingStore.set('tripDetails', initialState.tripDetails);
    bookingStore.set('selectedVehicle', initialState.selectedVehicle);
    bookingStore.set('passengerDetails', initialState.passengerDetails);
    bookingStore.set('extras', initialState.extras);
};

export const useBookingStore = bookingStore.useStore;
export const useBookingTrackedStore = bookingStore.useTrackedStore;
