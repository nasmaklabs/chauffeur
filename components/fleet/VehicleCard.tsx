import React from 'react';
import Image from 'next/image';
import { UserOutlined, ShoppingOutlined, WifiOutlined, CheckCircleFilled } from '@ant-design/icons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface VehicleProps {
    name: string;
    image: string;
    passengers: number;
    luggage: number;
    price?: string;
    features?: string[];
    selectionMode?: boolean;
    isSelected?: boolean;
    priceBreakdown?: {
        baseFare: number;
        distanceCharge: number;
        total: number;
    };
    isSuitable?: boolean;
    badge?: 'recommended' | 'popular' | null;
}

const VehicleCard: React.FC<VehicleProps> = ({ 
    name, 
    image, 
    passengers, 
    luggage, 
    price, 
    features,
    selectionMode = false,
    isSelected = false,
    priceBreakdown,
    isSuitable = true,
    badge = null
}) => {
    return (
        <Card className={`overflow-hidden transition-all duration-300 border-none h-full flex flex-col relative
            ${!isSuitable ? 'opacity-50' : 'hover:shadow-2xl'}
            ${isSelected ? 'ring-2 ring-primary shadow-xl' : ''}
        `}>
            {badge && (
                <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white
                    ${badge === 'recommended' ? 'bg-green-500' : 'bg-blue-500'}
                `}>
                    {badge === 'recommended' ? '✓ Recommended' : '★ Popular'}
                </div>
            )}
            
            {isSelected && (
                <div className="absolute top-4 left-4 z-10 bg-primary text-secondary rounded-full p-2">
                    <CheckCircleFilled className="text-xl" />
                </div>
            )}

            {!isSuitable && (
                <div className="absolute inset-0 bg-black bg-opacity-40 z-10 flex items-center justify-center">
                    <div className="bg-white rounded-lg px-4 py-2 text-sm font-semibold text-gray-700">
                        Capacity Insufficient
                    </div>
                </div>
            )}

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
                    <ul className="text-sm text-gray-500 mb-4 space-y-1">
                        {features.slice(0, 3).map((feature, idx) => (
                            <li key={idx}>• {feature}</li>
                        ))}
                    </ul>
                )}

                <div className="mt-auto">
                    {priceBreakdown ? (
                        <div className="mb-4">
                            <div className="text-xs text-gray-400 space-y-1 mb-2">
                                <div className="flex justify-between">
                                    <span>Base fare:</span>
                                    <span>£{priceBreakdown.baseFare.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Distance charge:</span>
                                    <span>£{priceBreakdown.distanceCharge.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-1 flex justify-between font-semibold text-sm text-gray-700">
                                    <span>Total:</span>
                                    <span>£{priceBreakdown.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ) : price && (
                        <div className="mb-4">
                            <span className="text-xs text-gray-400 block">From</span>
                            <span className="text-xl font-bold text-primary">{price}</span>
                        </div>
                    )}

                    {!selectionMode && (
                        <Button type="primary" className="bg-secondary hover:bg-black border-none w-full">
                            Book Now
                        </Button>
                    )}

                    {selectionMode && isSuitable && (
                        <div className={`text-center py-2 px-4 rounded-lg font-semibold transition-colors
                            ${isSelected ? 'bg-primary text-secondary' : 'bg-gray-100 text-gray-600'}
                        `}>
                            {isSelected ? 'Selected' : 'Select Vehicle'}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default VehicleCard;
