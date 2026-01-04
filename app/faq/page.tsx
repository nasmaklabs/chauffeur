"use client";

import React, { useState } from "react";
import { Collapse } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Section from "@/components/ui/Section";
import { BRAND } from "@/lib/constants/brand";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQPage = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  const faqs: FAQItem[] = [
    {
      question: "Are you a licensed company?",
      answer:
        "Yes. AA Comfort is fully licensed by the Council to operate chauffeur and private hire services.",
    },
    {
      question: "Is your service available day and night?",
      answer: "Yes. We operate 24 hours a day, 7 days a week, all year round.",
    },
    {
      question: "Are your prices fixed?",
      answer:
        "Yes. Our prices are fixed for pre-booked transfers. However, if there are any additional drop-offs, pickups, or diversions, there will be additional charges.",
    },
    {
      question: "Who will drive the vehicle?",
      answer:
        "AA Comfort does not typically hire out vehicles for self-drive. All journeys are driven by our professional, fully vetted chauffeurs.",
    },
    {
      question: "Can I smoke in the car?",
      answer:
        "No. We operate a strict no-smoking policy in all our vehicles to ensure a pleasant experience for all passengers.",
    },
    {
      question: "Are there any extra charges for Christmas or New Year?",
      answer:
        "Yes. An additional surcharge of 50% on the standard prices will be applied on the following dates: 25th December, 26th December, 31st December, and 1st January.",
    },
    {
      question: "How do I find my driver at the airport?",
      answer:
        "Our driver will wait in the arrivals hall with a name card displaying your name, usually near the airport information desk.",
    },
    {
      question: "Will I be sharing the vehicle with anyone else?",
      answer:
        "No. We do not operate a shared taxi service. Your booking is private and exclusive to you.",
    },
    {
      question: "Is gratuity included in the price?",
      answer:
        "No. Gratuities are not included in the fare and are left to the passenger's discretion.",
    },
    {
      question: "How can I cancel my booking?",
      answer: `To cancel your booking, please send an email to ${BRAND.email.support} and include your booking reference number. Once we receive your email, we'll process the cancellation and confirm it with you.`,
    },
  ];

  const handleChange = (keys: string | string[]) => {
    setActiveKeys(Array.isArray(keys) ? keys : [keys]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our services, pricing, and
            policies.
          </p>
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto">
          <Collapse
            accordion
            activeKey={activeKeys}
            onChange={handleChange}
            expandIcon={({ isActive }) =>
              isActive ? (
                <MinusOutlined className="text-primary text-lg" />
              ) : (
                <PlusOutlined className="text-primary text-lg" />
              )
            }
            expandIconPlacement="end"
            className="bg-transparent border-0"
            items={faqs.map((faq, index) => ({
              key: String(index),
              label: (
                <span className="text-lg font-semibold text-secondary">
                  {faq.question}
                </span>
              ),
              children: (
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              ),
              className:
                "bg-white mb-4 rounded-xl border border-gray-100 shadow-sm overflow-hidden",
            }))}
          />
        </div>
      </Section>

      {/* Contact CTA */}
      <Section background="gray">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-500 mb-8">
            Can&apos;t find what you&apos;re looking for? Our team is here to
            help.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-secondary font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </Section>
    </div>
  );
};

export default FAQPage;
