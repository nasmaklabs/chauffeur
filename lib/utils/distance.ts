import { Coordinates } from '@/lib/store/bookingStore';

export const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
    if (typeof window !== 'undefined' && window.google?.maps?.geometry) {
        const point1 = new window.google.maps.LatLng(coord1.lat, coord1.lng);
        const point2 = new window.google.maps.LatLng(coord2.lat, coord2.lng);
        const distanceInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
        return distanceInMeters / 1000;
    }
    return 0;
};

export const formatDistance = (distance: number): string => {
    return distance < 1 
        ? `${(distance * 1000).toFixed(0)} meters` 
        : `${distance.toFixed(2)} km`;
};

