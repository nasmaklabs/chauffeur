"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import BookingWidget from "@/components/booking/BookingWidget";
import VehicleCard from "@/components/fleet/VehicleCard";
import { VEHICLES } from "@/lib/constants/vehicles";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg.webp"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30 z-10" />
        </div>

        <div className="container mx-auto px-4 relative z-20 grid lg:grid-cols-[1fr_1.3fr] xl:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <div className="text-white space-y-6">
            <h1 className="font-display text-5xl lg:text-6xl font-semibold leading-[1.08]">
              Chauffeur journeys,{" "}
              <span style={{ color: "var(--primary-bright)" }}>
                priced up front.
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-xl leading-relaxed">
              Airport transfers, business travel and special occasions, 24 hours
              a day. Professional, vetted drivers and flight monitoring on every
              airport pickup.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/#book">
                <Button
                  type="primary"
                  size="large"
                  className="bg-primary text-secondary hover:bg-yellow-400 h-14 px-8 text-lg font-bold border-none"
                >
                  Book Your Ride
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="large"
                  ghost
                  className="h-14 px-8 text-lg font-bold border-2 hover:text-primary hover:border-primary"
                >
                  View Services
                </Button>
              </Link>
            </div>
          </div>

          <div id="book" className="lg:pl-12 scroll-mt-24">
            <BookingWidget className="shadow-2xl" />
          </div>
        </div>
      </section>

      <Section id="services" background="white">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              What we do
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-secondary leading-tight">
              Airport runs, boardroom mornings and big nights out.
            </h2>
          </div>
          <Link
            href="/services"
            className="text-secondary! font-semibold underline underline-offset-8 decoration-primary hover:text-primary! shrink-0"
          >
            All services
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <ServicePhotoCard
            className="lg:col-span-7 min-h-[420px] lg:min-h-[560px]"
            index="01"
            title="Airport transfers"
            text="Flight monitoring, meet and greet, and 60 minutes of free waiting."
            image="/images/airport.webp"
            alt="Chauffeur opening the car door for passengers outside an airport"
            href="/services#airport"
          />
          <div className="lg:col-span-5 grid gap-6">
            <ServicePhotoCard
              className="min-h-[300px]"
              index="02"
              title="Corporate travel"
              text="Priority booking, monthly invoicing and complete discretion."
              image="/images/corporate.webp"
              alt="Chauffeur standing beside an executive car outside an office building"
              href="/services#corporate"
            />
            <ServicePhotoCard
              className="min-h-[300px]"
              index="03"
              title="Events and occasions"
              text="Door to door for matches, concerts, proms and group nights out."
              image="/images/events.webp"
              alt="Group arriving at an evening event by chauffeur car"
              href="/services#events"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 mt-10">
          <ServiceRow
            index="04"
            title="Hourly hire"
            text="A car and driver by the hour, with a three hour minimum."
          />
          <ServiceRow
            index="05"
            title="City tours"
            text="A car and driver for the day, on an itinerary you choose."
          />
        </div>
      </Section>

      <Section id="fleet" background="gray">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-secondary mb-4">
              The fleet
            </h2>
            <p className="text-gray-600 text-lg">
              From saloons to eight-seat minibuses, every journey comes with a
              professional driver. Wheelchair accessible vehicles available.
            </p>
          </div>
          <Link href="/fleet">
            <Button className="flex items-center gap-2 h-12 px-6 font-semibold">
              View All Vehicles <ArrowRightOutlined />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VEHICLES.slice(0, 3).map((vehicle, idx) => (
            <VehicleCard
              key={vehicle.id}
              name={vehicle.name}
              image={
                vehicle.id === "comfort"
                  ? idx % 2 === 0
                    ? "/images/comfort.webp"
                    : "/images/exacutive.webp"
                  : vehicle.image
              }
              passengers={vehicle.passengers}
              luggage={vehicle.luggage}
              price={`£${vehicle.baseFare}+`}
              features={vehicle.features}
              description={vehicle.description}
              capacity={vehicle.capacity}
            />
          ))}
        </div>
      </Section>

      <Section id="why-us" background="white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden hidden lg:block">
            <Image
              src="/images/why-choose-us.webp"
              alt="Uniformed AA Chauffeurs driver beside an executive saloon"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Why AA Chauffeurs
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-secondary leading-tight mb-10">
              What you can count on.
            </h2>

            <dl className="border-t border-gray-200">
              {[
                {
                  figure: "24/7",
                  title: "Always available",
                  text: "Bookings taken and journeys run every day of the year, including nights and holidays.",
                },
                {
                  figure: "60 min",
                  title: "Free airport waiting",
                  text: "We monitor your flight and wait up to an hour at no extra charge.",
                },
                {
                  figure: "Fixed",
                  title: "Price shown first",
                  text: "You see the price for your route before you confirm. Extra stops, tolls and holiday surcharges are listed up front.",
                },
              ].map((item) => (
                <div
                  key={item.figure}
                  className="grid sm:grid-cols-[9rem_1fr] gap-2 sm:gap-8 py-7 border-b border-gray-200"
                >
                  <dt className="font-display text-4xl font-semibold text-primary">
                    {item.figure}
                  </dt>
                  <dd>
                    <p className="text-lg font-semibold text-secondary mb-1">
                      {item.title}
                    </p>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <section className="py-24 bg-secondary text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <div
              className="w-16 h-px mb-8"
              style={{ background: "var(--primary-bright)" }}
            />
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
              Book your next journey.
            </h2>
            <p className="text-lg text-gray-300">
              See your price first. Pay the driver when you arrive.
            </p>
          </div>
          <Link href="/#book" className="shrink-0">
            <Button
              type="primary"
              size="large"
              className="bg-primary text-secondary hover:bg-yellow-400 h-14 px-10 text-lg font-bold border-none w-full sm:w-auto"
            >
              Get a quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function ServicePhotoCard({
  className = "",
  index,
  title,
  text,
  image,
  alt,
  href,
}: {
  className?: string;
  index: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-lg bg-secondary ${className}`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
        <span className="text-sm tracking-widest text-white/70">{index}</span>
        <h3 className="font-display text-2xl md:text-4xl font-semibold mt-1 mb-2">
          {title}
        </h3>
        <p className="text-white/85 max-w-md leading-relaxed">{text}</p>
      </div>
    </Link>
  );
}

function ServiceRow({
  index,
  title,
  text,
}: {
  index: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href="/services"
      className="group flex items-baseline gap-6 py-6 border-t border-gray-200"
    >
      <span className="text-sm tracking-widest text-gray-400">{index}</span>
      <div className="flex-1">
        <h3 className="font-display text-2xl font-semibold text-secondary group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mt-1">{text}</p>
      </div>
      <ArrowRightOutlined className="text-gray-400! group-hover:text-primary! group-hover:translate-x-1 transition-all" />
    </Link>
  );
}
