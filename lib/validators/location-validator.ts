import { Coordinates } from '@/lib/store/bookingStore';

export const validateLocationWithCoordinates = (
    location: string, 
    coordinates: Coordinates | null | undefined
): Promise<void> => {
    if (location && !coordinates) {
        return Promise.reject(new Error('Please select a valid location from suggestions'));
    }
    return Promise.resolve();
};

