import { Coordinates } from "@/lib/store/bookingStore";

// Straight-line fallback used only if the Directions API call fails.
const straightLineDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  if (typeof window !== "undefined" && window.google?.maps?.geometry) {
    const point1 = new window.google.maps.LatLng(coord1.lat, coord1.lng);
    const point2 = new window.google.maps.LatLng(coord2.lat, coord2.lng);
    return (
      window.google.maps.geometry.spherical.computeDistanceBetween(point1, point2) /
      1609.344
    );
  }
  return 0;
};

// Returns the actual road driving distance in miles using the Directions API.
// Falls back to straight-line distance if the API call fails.
export const calculateDistance = (
  coord1: Coordinates,
  coord2: Coordinates
): Promise<number> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.google?.maps?.DirectionsService) {
      resolve(straightLineDistance(coord1, coord2));
      return;
    }

    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: new window.google.maps.LatLng(coord1.lat, coord1.lng),
        destination: new window.google.maps.LatLng(coord2.lat, coord2.lng),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result?.routes?.[0]?.legs?.[0]?.distance?.value) {
          resolve(result.routes[0].legs[0].distance.value / 1609.344);
        } else {
          resolve(straightLineDistance(coord1, coord2));
        }
      }
    );
  });
};

export const formatDistance = (distance: number): string => {
  return distance < 0.1
    ? `${(distance * 5280).toFixed(0)} feet`
    : `${distance.toFixed(2)} miles`;
};
