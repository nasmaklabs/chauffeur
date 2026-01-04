"use client";

import React, { useState } from "react";
import { Radio, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Section from "@/components/ui/Section";
import VehicleCard from "@/components/fleet/VehicleCard";
import { VEHICLES } from "@/lib/constants/vehicles";

const FleetPage = () => {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Map vehicle IDs to categories for filtering (supports multiple categories per vehicle)
  const vehicleCategories: Record<string, string[]> = {
    saloon: ["saloon"],
    comfort: ["comfort"],
    mpv6: ["mpv", "wheelchair"],
    mpv7: ["mpv", "wheelchair"],
    caddy: ["wheelchair"],
  };

  // Create fleet display data from VEHICLES constant
  const vehicles = VEHICLES.map((vehicle, idx) => ({
    id: vehicle.id,
    name: vehicle.name,
    categories: vehicleCategories[vehicle.id] || ["other"],
    // Alternate comfort images deterministically based on index
    image:
      vehicle.id === "comfort"
        ? idx % 2 === 0
          ? "/images/comfort.png"
          : "/images/exacutive.png"
        : vehicle.image,
    passengers: vehicle.passengers,
    luggage: vehicle.luggage,
    price: `£${vehicle.baseFare}+`,
    features: vehicle.features,
    description: vehicle.description,
  }));

  const filteredVehicles = vehicles.filter((v) => {
    const matchesCategory =
      category === "all" || v.categories.includes(category);
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <div className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Fleet</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose from our range of comfortable and reliable vehicles to suit
            your journey needs.
          </p>
        </div>
      </div>

      <Section>
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <Radio.Group
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            buttonStyle="solid"
            size="large"
          >
            <Radio.Button value="all">All Vehicles</Radio.Button>
            <Radio.Button value="saloon">Saloon</Radio.Button>
            <Radio.Button value="comfort">Comfort</Radio.Button>
            <Radio.Button value="mpv">MPV</Radio.Button>
            <Radio.Button value="wheelchair">Wheelchair</Radio.Button>
          </Radio.Group>

          <div className="w-full md:w-auto">
            <Input
              placeholder="Search vehicles..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle.id} className="h-full">
              <VehicleCard
                name={vehicle.name}
                image={vehicle.image}
                passengers={vehicle.passengers}
                luggage={vehicle.luggage}
                price={vehicle.price}
                features={vehicle.features}
                description={vehicle.description}
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
