'use client';

import React, { useState } from 'react';
import { Radio, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Section from '@/components/ui/Section';
import VehicleCard from '@/components/fleet/VehicleCard';
import { Button } from '@/components/ui/Button';

const FleetPage = () => {
    const [category, setCategory] = useState('all');

    const vehicles = [
        { id: '1', name: 'Mercedes-Benz S-Class', category: 'luxury', image: '/placeholder-car.png', passengers: 3, luggage: 2, price: '$120', features: ['First Class Comfort', 'Free WiFi', 'Nappa Leather'] },
        { id: '2', name: 'BMW 7 Series', category: 'luxury', image: '/placeholder-car.png', passengers: 3, luggage: 2, price: '$110', features: ['Executive Seating', 'Climate Control', 'Privacy Glass'] },
        { id: '3', name: 'Mercedes-Benz E-Class', category: 'sedan', image: '/placeholder-car.png', passengers: 3, luggage: 2, price: '$80', features: ['Leather Seats', 'Climate Control', 'WiFi'] },
        { id: '4', name: 'Mercedes-Benz V-Class', category: 'van', image: '/placeholder-car.png', passengers: 7, luggage: 7, price: '$150', features: ['Conference Seating', 'Extra Luggage Space', 'Electric Doors'] },
        { id: '5', name: 'Range Rover Autobiography', category: 'suv', image: '/placeholder-car.png', passengers: 4, luggage: 4, price: '$160', features: ['Panoramic Roof', 'Massage Seats', 'Rear Entertainment'] },
        { id: '6', name: 'Rolls Royce Phantom', category: 'luxury', image: '/placeholder-car.png', passengers: 3, luggage: 2, price: '$300', features: ['Starlight Headliner', 'Champagne Fridge', 'Ultimate Luxury'] },
    ];

    const filteredVehicles = category === 'all'
        ? vehicles
        : vehicles.filter(v => v.category === category);

    return (
        <div className="min-h-screen bg-surface">
            {/* Hero */}
            <div className="bg-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Premium Fleet</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Experience the epitome of luxury and comfort with our meticulously maintained collection of vehicles.
                    </p>
                </div>
            </div>

            <Section>
                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <Radio.Group
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        buttonStyle="solid"
                        size="large"
                    >
                        <Radio.Button value="all">All Vehicles</Radio.Button>
                        <Radio.Button value="sedan">Sedans</Radio.Button>
                        <Radio.Button value="luxury">Luxury</Radio.Button>
                        <Radio.Button value="suv">SUVs</Radio.Button>
                        <Radio.Button value="van">Vans</Radio.Button>
                    </Radio.Group>

                    <div className="w-full md:w-auto">
                        <Input
                            placeholder="Search vehicles..."
                            prefix={<SearchOutlined className="text-gray-400" />}
                            className="w-full md:w-64"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredVehicles.map(vehicle => (
                        <div key={vehicle.id} className="h-full">
                            <VehicleCard
                                name={vehicle.name}
                                image={vehicle.image}
                                passengers={vehicle.passengers}
                                luggage={vehicle.luggage}
                                price={vehicle.price}
                                features={vehicle.features}
                            />
                        </div>
                    ))}
                </div>

                {filteredVehicles.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No vehicles found matching your criteria.
                    </div>
                )}
            </Section>
        </div>
    );
};

export default FleetPage;
