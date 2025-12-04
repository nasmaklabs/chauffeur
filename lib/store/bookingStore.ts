import { createStore } from 'zustand-x';

export interface BookingState {
    currentStep: number;
    tripDetails: {
        type: 'one-way' | 'round-trip' | 'hourly';
        pickupLocation: string;
        dropoffLocation: string;
        date: string;
        time: string;
        returnDate?: string;
        returnTime?: string;
        duration?: string;
        passengers: number;
        luggage: number;
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
});

export const useBookingStore = bookingStore.useStore;
export const useBookingTrackedStore = bookingStore.useTrackedStore;
