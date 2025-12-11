export interface Vehicle {
  id: string;
  name: string;
  description: string;
  image: string;
  passengers: number;
  luggage: number;
  baseFare: number;
  perMileRate: number;
  features: string[];
}

export const VEHICLES: Vehicle[] = [
  {
    id: "saloon",
    name: "Saloon",
    description: "Standard saloon car for everyday comfortable travel",
    image: "/images/saloon.png",
    passengers: 4,
    luggage: 2,
    baseFare: 20,
    perMileRate: 1.2,
    features: [
      "Air Conditioning",
      "Comfortable Seats",
      "Bluetooth Audio",
      "USB Charging",
    ],
  },
  {
    id: "comfort",
    name: "Comfort",
    description: "Enhanced comfort for a relaxed journey",
    image: "/images/comfort.png",
    passengers: 4,
    luggage: 2,
    baseFare: 25,
    perMileRate: 1.5,
    features: [
      "Premium Seats",
      "Climate Control",
      "Free WiFi",
      "Bottled Water",
    ],
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium executive vehicles for business travel",
    image: "/images/exacutive.png",
    passengers: 4,
    luggage: 3,
    baseFare: 40,
    perMileRate: 2.0,
    features: [
      "Leather Seats",
      "Privacy Glass",
      "Premium WiFi",
      "Complimentary Refreshments",
    ],
  },
  {
    id: "mpv6",
    name: "MPV 6",
    description: "Multi-purpose vehicle for groups up to 6 passengers",
    image: "/images/mpv6.png",
    passengers: 6,
    luggage: 4,
    baseFare: 45,
    perMileRate: 2.2,
    features: [
      "Spacious Interior",
      "Extra Luggage Space",
      "Climate Control",
      "Sliding Doors",
    ],
  },
  {
    id: "mpv7",
    name: "MPV 7 (Mini Bus 8 Seater)",
    description: "Wheelchair-accessible minibus for larger groups",
    image: "/images/minbus.png",
    passengers: 8,
    luggage: 6,
    baseFare: 60,
    perMileRate: 2.5,
    features: [
      "Wheelchair Accessible",
      "Extra Luggage Space",
      "Climate Control",
      "Easy Access Doors",
    ],
  },
];

export const VEHICLE_OPTIONS = [
  { value: "saloon", label: "Saloon" },
  { value: "comfort", label: "Comfort" },
  { value: "executive", label: "Executive" },
  { value: "mpv6", label: "MPV 6" },
  { value: "mpv7", label: "MPV 7 (Mini Bus 8 Seater)" },
] as const;

export type VehicleId = "saloon" | "comfort" | "executive" | "mpv6" | "mpv7";
