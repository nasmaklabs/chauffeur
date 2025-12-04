export interface Vehicle {
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

export const VEHICLES: Vehicle[] = [
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

export const VEHICLE_OPTIONS = [
    { value: 'sedan', label: 'Executive Sedan' },
    { value: 'luxury', label: 'Luxury Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'van', label: 'Luxury Van' },
] as const;

