import React from "react";
import Image from "next/image";
import {
  UserOutlined,
  ShoppingOutlined,
  WifiOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { Button } from "@/components/ui/Button";

interface VehicleProps {
  name: string;
  image: string;
  passengers: number;
  luggage: number;
  price?: string;
  features?: string[];
  description?: string;
  selectionMode?: boolean;
  isSelected?: boolean;
  priceBreakdown?: {
    baseFare: number;
    distanceCharge: number;
    airportCharge?: number;
    total: number;
  };
  isSuitable?: boolean;
  badge?: "recommended" | "popular" | null;
}

const VehicleCard: React.FC<VehicleProps> = ({
  name,
  image,
  passengers,
  luggage,
  price,
  features,
  description,
  selectionMode = false,
  isSelected = false,
  priceBreakdown,
  isSuitable = true,
  badge = null,
}) => {
  return (
    <div
      className={`bg-white rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col relative shadow-md
        ${!isSuitable ? "opacity-50" : "hover:shadow-xl"}
        ${isSelected ? "ring-2 ring-primary shadow-xl" : ""}
      `}
    >
      {/* Badge */}
      {badge && (
        <div
          className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold text-white
            ${badge === "recommended" ? "bg-green-500" : "bg-blue-500"}
          `}
        >
          {badge === "recommended" ? "✓ Recommended" : "★ Popular"}
        </div>
      )}

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-3 left-3 z-10 bg-primary text-secondary rounded-full p-2">
          <CheckCircleFilled className="text-xl" />
        </div>
      )}

      {/* Capacity insufficient overlay */}
      {!isSuitable && (
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
          <div className="bg-white rounded-lg px-4 py-2 text-sm font-semibold text-gray-700">
            Capacity Insufficient
          </div>
        </div>
      )}

      {/* Image - Fixed aspect ratio */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-secondary mb-2">{name}</h3>
        {description && (
          <p className="text-sm text-gray-600 mb-2">{description}</p>
        )}
        <div className="flex gap-4 text-gray-500 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <UserOutlined /> <span>{passengers}</span>
          </div>
          <div className="flex items-center gap-1">
            <ShoppingOutlined /> <span>{luggage}</span>
          </div>
          <div className="flex items-center gap-1">
            <WifiOutlined /> <span>WiFi</span>
          </div>
          {features?.includes("Wheelchair Accessible") && (
            <div
              className="flex items-center gap-1"
              title="Wheelchair accessible"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="18px"
                height="18px"
                fill="currentColor"
                className="text-gray-500"
                aria-hidden="true"
              >
                <path d="m443.4,324.1v-149.5c0-11.3-9.1-20.4-20.4-20.4h-82.9v-40.5c0-11.3-9.1-20.4-20.4-20.4h-116c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h95.5v20.1h-135v-95.1c0-11.3-9.1-20.4-20.4-20.4h-112.3c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h91.9v168.5c-48.6,13.3-84.4,57.8-84.4,110.5 0,63.1 51.3,114.5 114.5,114.5 49,0 90.9-30.9 107.2-74.3h90.6c0.9,40.6 34.1,73.3 74.9,73.3 41.3,0 75-33.6 75-75-0.1-35.4-24.8-65.1-57.8-72.9zm-40.9,1.8c-16.9,5.6-31.1,17.1-40.2,31.9h-94.4c-0.3-59.2-45.8-107.8-103.6-113.3v-49.5h238.3v130.9zm-249.1,106.2c-40.6,0-73.6-33-73.6-73.6 0-40.6 33-73.6 73.6-73.6 40.6,0 73.6,33 73.6,73.6 0,40.6-33.1,73.6-73.6,73.6zm272.7-1c-18.8,0-34.1-15.3-34.1-34.1 0-18.8 15.3-34.1 34.1-34.1 18.8,0 34.1,15.3 34.1,34.1 0,18.8-15.3,34.1-34.1,34.1z" />
                <path d="m276.4,290h21.2v21.2c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-21.2h21.2c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-21.2v-21.2c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v21.2h-21.2c-11.3,0-20.4,9.1-20.4,20.4 2.84217e-14,11.2 9.1,20.4 20.4,20.4z" />
              </svg>
              <span>Wheelchair</span>
            </div>
          )}
        </div>

        {features && (
          <ul className="text-sm text-gray-500 mb-3 space-y-1">
            {features.slice(0, 3).map((feature, idx) => (
              <li key={idx}>• {feature}</li>
            ))}
          </ul>
        )}

        <div className="mt-auto">
          {priceBreakdown ? (
            <div className="mb-3">
              <div className="text-xs text-gray-400 space-y-1 mb-2">
                <div className="flex justify-between">
                  <span>Base fare:</span>
                  <span>£{priceBreakdown.baseFare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance charge:</span>
                  <span>£{priceBreakdown.distanceCharge.toFixed(2)}</span>
                </div>
                {priceBreakdown.airportCharge !== undefined &&
                  priceBreakdown.airportCharge > 0 && (
                    <div className="flex justify-between">
                      <span>Airport charge:</span>
                      <span>£{priceBreakdown.airportCharge.toFixed(2)}</span>
                    </div>
                  )}
                <div className="border-t pt-1 flex justify-between font-semibold text-sm text-gray-700">
                  <span>Total:</span>
                  <span>£{priceBreakdown.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            price && (
              <div className="mb-3">
                <span className="text-xs text-gray-400 block">From</span>
                <span className="text-xl font-bold text-primary">{price}</span>
              </div>
            )
          )}

          {!selectionMode && (
            <Button
              type="primary"
              className="bg-secondary hover:bg-black border-none w-full"
            >
              Book Now
            </Button>
          )}

          {selectionMode && isSuitable && (
            <div
              className={`text-center py-2.5 px-4 rounded-lg font-semibold transition-colors
                ${
                  isSelected
                    ? "bg-primary text-secondary"
                    : "bg-gray-100 text-gray-600"
                }
              `}
            >
              {isSelected ? "Selected" : "Select Vehicle"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
