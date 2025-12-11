"use client";

import React from "react";
import Image from "next/image";
import { CheckCircleFilled } from "@ant-design/icons";
import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const ServicesPage = () => {
  const services = [
    {
      id: "airport",
      title: "Airport Transfers",
      description:
        "Start your journey in comfort and style. We provide reliable airport transfer services to and from all major airports. Our flight monitoring system ensures we are always there when you land, regardless of delays.",
      features: [
        "Flight Monitoring",
        "Meet & Greet Service",
        "60 Mins Free Waiting Time",
        "Help with Luggage",
      ],
      image: "/images/airport.png",
      reverse: false,
    },
    {
      id: "corporate",
      title: "Corporate Travel",
      description:
        "Efficiency and professionalism for your business needs. Whether it is a roadshow, a client meeting, or a corporate event, our chauffeurs provide a seamless travel experience so you can focus on business.",
      features: [
        "Priority Booking",
        "Monthly Invoicing",
        "Confidentiality Guaranteed",
        "Wi-Fi Enabled Vehicles",
      ],
      image: "/images/corporate.png",
      reverse: true,
    },
    {
      id: "wedding",
      title: "Wedding Chauffeur",
      description:
        "Make your special day unforgettable with our luxury wedding car hire service. We offer a range of premium vehicles to suit your style, complete with ribbons and a professional chauffeur.",
      features: [
        "Decorated Vehicles",
        "Uniformed Chauffeurs",
        "Champagne Service",
        "Red Carpet Arrival",
      ],
      image: "/images/weddings.png",
      reverse: false,
    },
    {
      id: "events",
      title: "Events & Occasions",
      description:
        "Arrive in style at sporting events, concerts, proms, or special celebrations. Our chauffeur service adds a touch of luxury to any occasion, ensuring you enjoy your day to the fullest.",
      features: [
        "Door-to-Door Service",
        "Group Transport Options",
        "Flexible Hourly Hire",
        "VIP Treatment",
      ],
      image: "/images/events.png",
      reverse: true,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Premium Services
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tailored luxury transport solutions for every occasion. Experience
            the difference with AA Comfort.
          </p>
        </div>
      </div>

      {/* Service Sections */}
      {services.map((service, index) => (
        <Section
          key={service.id}
          id={service.id}
          background={index % 2 === 0 ? "white" : "gray"}
        >
          <div
            className={`flex flex-col lg:flex-row gap-12 items-center ${
              service.reverse ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1 relative h-[400px] w-full rounded-2xl overflow-hidden bg-gray-200">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              {/* <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-xl">
                {service.title} Image Placeholder
              </div> */}
            </div>

            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                {service.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {service.description}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-700 font-medium"
                  >
                    <CheckCircleFilled className="text-primary text-xl" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link href="/booking">
                  <Button
                    type="primary"
                    size="large"
                    className="bg-action h-12 px-8 font-bold"
                  >
                    Book This Service
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* CTA */}
      <Section background="dark" className="text-center">
        <h2 className="text-3xl font-bold mb-6">Need a Custom Solution?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          We offer bespoke transport packages for large events, tours, and
          specific requirements. Contact our team to discuss your needs.
        </p>
        <Link href="/contact">
          <Button
            size="large"
            ghost
            className="h-12 px-8 font-bold border-2 hover:text-primary hover:border-primary"
          >
            Contact Us
          </Button>
        </Link>
      </Section>
    </div>
  );
};

export default ServicesPage;
