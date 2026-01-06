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
    luggage: 4,
    baseFare: 30,
    perMileRate: 1.6,
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
    description:
      "Enhanced comfort with premium amenities. A BMW or Mercedes will be provided — one of the cars shown in the pictures will be supplied for your journey.",
    image: "/images/comfort.png",
    passengers: 4,
    luggage: 4,
    baseFare: 35,
    perMileRate: 2.8,
    features: [
      "Premium Seats",
      "Climate Control",
      "Free WiFi",
      "Bottled Water",
    ],
  },
  {
    id: "wheelchair",
    name: "Wheelchair Accessible Vehicle",
    description:
      "Wheelchair-accessible vehicle with ramp access. Accommodates 1 wheelchair + 3 passengers, or 4 standard seats when wheelchair space is not needed.",
    image: "/images/wheelchair.png",
    passengers: 4,
    luggage: 4,
    baseFare: 35,
    perMileRate: 2.8,
    features: [
      "1 Wheelchair Space",
      "Ramp Access",
      "Climate Control",
      "Secure Wheelchair Lock",
    ],
  },
  {
    id: "mpv6",
    name: "MPV 6",
    description:
      "Multi-purpose vehicle for groups up to 6 passengers. Wheelchair accessible with space for up to 2 wheelchairs.",
    image: "/images/mpv6.png",
    passengers: 6,
    luggage: 6,
    baseFare: 35,
    perMileRate: 2.8,
    features: [
      "2 Wheelchair Spaces",
      "Spacious Interior",
      "Extra Luggage Space",
      "Climate Control",
      "Sliding Doors",
    ],
  },
  {
    id: "mpv7",
    name: "MPV 7 (Mini Bus 8 Seater)",
    description:
      "Large minibus for groups up to 8 passengers. Wheelchair accessible with space for up to 2 wheelchairs.",
    image: "/images/mpv7.png",
    passengers: 8,
    luggage: 8,
    baseFare: 50,
    perMileRate: 3.5,
    features: [
      "2 Wheelchair Spaces",
      "Spacious Interior",
      "Extra Luggage Space",
      "Climate Control",
      "Easy Access Doors",
    ],
  },
];

export const VEHICLE_OPTIONS = [
  { value: "saloon", label: "Saloon" },
  { value: "comfort", label: "Comfort" },
  { value: "wheelchair", label: "Wheelchair Accessible Vehicle" },
  { value: "mpv6", label: "MPV 6" },
  { value: "mpv7", label: "MPV 7 (Mini Bus 8 Seater)" },
] as const;

export type VehicleId = "saloon" | "comfort" | "wheelchair" | "mpv6" | "mpv7";
