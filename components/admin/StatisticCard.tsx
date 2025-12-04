import React from 'react';
import { Card } from '@/components/ui/Card';

interface StatisticCardProps {
    label: string;
    value: number;
    icon: React.ReactNode;
    valueColor: string;
    iconBgColor: string;
    iconColor: string;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
    label,
    value,
    icon,
    valueColor,
    iconBgColor,
    iconColor,
}) => {
    return (
        <Card className="border-none shadow-lg">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm mb-1">{label}</p>
                    <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
                </div>
                <div className={`w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center`}>
                    <span className={`text-2xl ${iconColor}`}>
                        {icon}
                    </span>
                </div>
            </div>
        </Card>
    );
};

