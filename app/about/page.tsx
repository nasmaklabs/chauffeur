"use client";

import React from "react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import { CheckCircleFilled } from "@ant-design/icons";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About AA Comfort
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Setting the standard for luxury chauffeur services since 2010.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-secondary">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded with a vision to provide more than just transportation, AA
              Comfort has grown to become the premier chauffeur service in the
              region. We believe that the journey is just as important as the
              destination.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our commitment to excellence is reflected in our meticulously
              maintained fleet of luxury vehicles and our team of professional,
              highly trained chauffeurs. We cater to a diverse clientele, from
              corporate executives and celebrities to families and tourists,
              ensuring every ride is a seamless and enjoyable experience.
            </p>
          </div>

          <div className="relative h-[500px] bg-gray-200 rounded-2xl overflow-hidden">
            <Image
              src="/images/story.png"
              alt="Our Fleet"
              fill
              className="object-cover"
            />
            {/* <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold text-xl">
                            About Us Image Placeholder
                        </div> */}
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-500">
            We are driven by a set of core values that define who we are and how
            we serve our clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Safety First",
              desc: "Your safety is our top priority. Our vehicles are regularly inspected and our drivers are rigorously trained.",
            },
            {
              title: "Reliability",
              desc: "We understand the importance of punctuality. You can count on us to be there on time, every time.",
            },
            {
              title: "Excellence",
              desc: "We strive for perfection in every aspect of our service, from the cleanliness of our cars to the courtesy of our chauffeurs.",
            },
          ].map((value, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl mb-6">
                <CheckCircleFilled />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">
                {value.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default AboutPage;
