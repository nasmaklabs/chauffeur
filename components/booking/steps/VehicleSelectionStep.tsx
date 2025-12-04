'use client';

import React from 'react';
import { Radio } from 'antd';
import VehicleCard from '@/components/fleet/VehicleCard';
import { bookingStore, useBookingStore } from '@/lib/store/bookingStore';

const VehicleSelectionStep = () => {
    const selectedVehicle = useBookingStore(state => state.selectedVehicle);
    const setSelectedVehicle = (vehicleId: string) => bookingStore.set('selectedVehicle', vehicleId);

    const vehicles = [
        { id: 'sedan', name: 'Executive Sedan', image: '/placeholder-car.png', passengers: 3, luggage: 2, price: '$80' },
        { id: 'luxury', name: 'Luxury Sedan', image: '/placeholder-car.png', passengers: 3, luggage: 2, price: '$120' },
        { id: 'suv', name: 'Luxury SUV', image: '/placeholder-car.png', passengers: 4, luggage: 4, price: '$150' },
        { id: 'van', name: 'Luxury Van', image: '/placeholder-car.png', passengers: 7, luggage: 7, price: '$180' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-secondary">Select Your Vehicle</h2>

            <div className="grid md:grid-cols-2 gap-6">
                {vehicles.map(vehicle => (
                    <div
                        key={vehicle.id}
                        className={`cursor-pointer transition-all ring-2 rounded-xl ${selectedVehicle === vehicle.id ? 'ring-primary shadow-xl scale-[1.02]' : 'ring-transparent hover:ring-gray-200'}`}
                        onClick={() => setSelectedVehicle(vehicle.id)}
                    >
                        <VehicleCard
                            name={vehicle.name}
                            image={vehicle.image}
                            passengers={vehicle.passengers}
                            luggage={vehicle.luggage}
                            price={vehicle.price}
                            features={['Free WiFi', 'Bottled Water', 'Leather Seats']}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehicleSelectionStep;
