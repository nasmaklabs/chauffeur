'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  GlobalOutlined,
  DollarOutlined,
  CarOutlined,
  CoffeeOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import { Button } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import BookingWidget from '@/components/booking/BookingWidget';
import ServiceCard from '@/components/services/ServiceCard';
import VehicleCard from '@/components/fleet/VehicleCard';
import TestimonialCard from '@/components/ui/TestimonialCard';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
          <div className="w-full h-full bg-gray-900 relative" />
        </div>

        <div className="container mx-auto px-4 relative z-20 grid lg:grid-cols-[1fr_1.3fr] xl:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <div className="text-white space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Premium <span className="text-primary">Chauffeur</span> Service
            </h1>
            <p className="text-xl text-gray-200 max-w-xl leading-relaxed">
              Experience the ultimate in luxury travel. Professional chauffeurs, premium fleet, and exceptional service for every journey.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/services">
                <Button size="large" ghost className="h-14 px-8 text-lg font-bold border-2 hover:text-primary hover:border-primary">
                  View Services
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:pl-12">
            <BookingWidget className="shadow-2xl" />
          </div>
        </div>
      </section>

      <Section id="services" background="white">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">World-Class Services</h2>
          <p className="text-gray-500 text-lg">
            Whether for business or leisure, we provide a comprehensive range of luxury transport solutions tailored to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Airport Transfers"
            description="Reliable and comfortable transfers to and from all major airports. Flight monitoring included."
            icon={<GlobalOutlined />}
            link="/services#airport"
          />
          <ServiceCard
            title="Corporate Travel"
            description="Professional transport for business meetings, roadshows, and corporate events."
            icon={<SafetyCertificateOutlined />}
            link="/services#corporate"
          />
          <ServiceCard
            title="Wedding Chauffeur"
            description="Make your special day perfect with our luxury wedding car hire service."
            icon={<CarOutlined />}
            link="/services#wedding"
          />
          <ServiceCard
            title="Events & Occasions"
            description="Arrive in style at sporting events, concerts, proms, and special celebrations."
            icon={<CoffeeOutlined />}
            link="/services#events"
          />
          <ServiceCard
            title="City Tours"
            description="Explore the city with our knowledgeable chauffeurs and customized itineraries."
            icon={<EnvironmentOutlined />}
            link="/services#tours"
          />
          <ServiceCard
            title="Hourly Hire"
            description="Flexible chauffeur service by the hour for maximum convenience and freedom."
            icon={<ClockCircleOutlined />}
            link="/services#hourly"
          />
        </div>
      </Section>

      <Section id="fleet" background="gray">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Luxury Fleet</h2>
            <p className="text-gray-500 text-lg">
              Choose from our exclusive collection of premium vehicles, maintained to the highest standards of safety and comfort.
            </p>
          </div>
          <Link href="/fleet">
            <Button className="flex items-center gap-2 h-12 px-6 font-semibold">
              View All Vehicles <ArrowRightOutlined />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <VehicleCard
            name="Mercedes-Benz S-Class"
            image="/placeholder-car.png"
            passengers={3}
            luggage={2}
            price="$120"
            features={['First Class Comfort', 'Free WiFi', 'Bottled Water', 'Nappa Leather']}
          />
          <VehicleCard
            name="BMW 7 Series"
            image="/placeholder-car.png"
            passengers={3}
            luggage={2}
            price="$110"
            features={['Executive Seating', 'Climate Control', 'Privacy Glass', 'Harman Kardon Sound']}
          />
          <VehicleCard
            name="Mercedes-Benz V-Class"
            image="/placeholder-car.png"
            passengers={7}
            luggage={7}
            price="$150"
            features={['Conference Seating', 'Extra Luggage Space', 'Electric Doors', 'Tables']}
          />
        </div>
      </Section>

      <Section id="why-us" background="white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gray-100 hidden lg:block">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
              Placeholder Image: Professional Chauffeur
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Why Choose AA Comfort?</h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl flex-shrink-0">
                  <SafetyCertificateOutlined />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Professional Chauffeurs</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Our drivers are licensed, vetted, and trained to provide the highest level of service and discretion.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl flex-shrink-0">
                  <ClockCircleOutlined />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Punctuality Guaranteed</h3>
                  <p className="text-gray-500 leading-relaxed">
                    We track flights and traffic in real-time to ensure we are always there when you need us.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl flex-shrink-0">
                  <DollarOutlined />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2">Fixed Transparent Pricing</h3>
                  <p className="text-gray-500 leading-relaxed">
                    No hidden fees or surge pricing. The price you see is the price you pay, all inclusive.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-100">
              <div>
                <div className="text-4xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-gray-500 font-medium">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-1">15k+</div>
                <div className="text-sm text-gray-500 font-medium">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-gray-500 font-medium">Luxury Vehicles</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="testimonials" background="gray">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Client Testimonials</h2>
          <p className="text-gray-500 text-lg">
            Don't just take our word for it. Here is what our valued clients have to say about their experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Sarah Johnson"
            role="CEO, TechStart"
            rating={5}
            text="Absolutely impeccable service. The driver was early, the car was pristine, and the ride was smooth. Highly recommended for business travel."
          />
          <TestimonialCard
            name="Michael Chen"
            role="Frequent Traveler"
            rating={5}
            text="I use AA Comfort for all my airport transfers. Their flight tracking is a lifesaver, and I never have to worry about being late."
          />
          <TestimonialCard
            name="Emma Thompson"
            rating={5}
            text="Booked a vintage Rolls Royce for my wedding. It was the highlight of the day! The chauffeur was so professional and kind."
          />
        </div>
      </Section>

      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pattern-grid-lg opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience Luxury?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Book your ride today and enjoy the ultimate in comfort, style, and reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button type="primary" size="large" className="bg-primary text-secondary hover:bg-yellow-400 h-14 px-10 text-lg font-bold border-none w-full sm:w-auto">
                Book Online Now
              </Button>
            </Link>
            <a href="tel:+15551234567">
              <Button size="large" ghost className="h-14 px-10 text-lg font-bold border-2 w-full sm:w-auto hover:text-primary hover:border-primary">
                Call +1 (555) 123-4567
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function EnvironmentOutlined(props: any) {
  return <span role="img" aria-label="environment" className="anticon anticon-environment" {...props}>
    <svg viewBox="64 64 896 896" focusable="false" data-icon="environment" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372z" opacity="0"></path><path d="M512 232c-123.7 0-224 100.3-224 224 0 123.7 100.3 224 224 224s224-100.3 224-224c0-123.7-100.3-224-224-224zm0 392c-92.8 0-168-75.2-168-168s75.2-168 168-168 168 75.2 168 168-75.2 168-168 168z"></path></svg>
  </span>
}
