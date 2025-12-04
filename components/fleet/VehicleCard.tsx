import React from 'react';
import Image from 'next/image';
import { UserOutlined, ShoppingOutlined, WifiOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface VehicleProps {
    name: string;
    image: string;
    passengers: number;
    luggage: number;
    price?: string;
    features?: string[];
}

const VehicleCard: React.FC<VehicleProps> = ({ name, image, passengers, luggage, price, features }) => {
    return (
        <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-none h-full flex flex-col">
            <div className="relative h-48 w-full bg-gray-50">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain p-4"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-secondary mb-2">{name}</h3>

                <div className="flex gap-4 text-gray-500 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                        <UserOutlined /> <span>{passengers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ShoppingOutlined /> <span>{luggage}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <WifiOutlined /> <span>WiFi</span>
                    </div>
                </div>

                {features && (
                    <ul className="text-sm text-gray-500 mb-6 space-y-1">
                        {features.slice(0, 3).map((feature, idx) => (
                            <li key={idx}>• {feature}</li>
                        ))}
                    </ul>
                )}

                <div className="mt-auto flex items-center justify-between">
                    {price && (
                        <div>
                            <span className="text-xs text-gray-400 block">From</span>
                            <span className="text-xl font-bold text-primary">{price}</span>
                        </div>
                    )}
                    <Button type="primary" className="bg-secondary hover:bg-black border-none">
                        Book Now
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default VehicleCard;
