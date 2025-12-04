'use client';

import React from 'react';
import Section from '@/components/ui/Section';
import BookingWidget from '@/components/booking/BookingWidget';

const CalculatorPage = () => {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <div className="bg-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Fare Calculator</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Get an instant quote for your journey. Transparent pricing with no hidden fees.
                    </p>
                </div>
            </div>

            <Section>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8 md:p-12 bg-gray-50 border-b border-gray-100 text-center">
                            <h2 className="text-2xl font-bold text-secondary mb-2">Calculate Your Fare</h2>
                            <p className="text-gray-500">Enter your trip details below to see estimated prices for different vehicle types.</p>
                        </div>

                        <div className="p-0">
                            {/* Reusing BookingWidget but potentially could pass a prop to make it 'calculator mode' if needed. 
                   For now, the standard widget serves the purpose of getting a quote. */}
                            <BookingWidget className="shadow-none border-none rounded-none" />
                        </div>
                    </div>

                    <div className="mt-12 text-center text-gray-500 text-sm">
                        <p>* Prices are estimates only and may vary based on time of day, traffic conditions, and special requests.</p>
                        <p>* Final price will be confirmed upon booking.</p>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default CalculatorPage;
