'use client';

import React from 'react';
import { Steps, Button, message } from 'antd';
import { CarOutlined, UserOutlined, CreditCardOutlined, CheckCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Section from '@/components/ui/Section';
import { bookingStore, useBookingStore } from '@/lib/store/bookingStore';

import TripDetailsStep from '@/components/booking/steps/TripDetailsStep';
import VehicleSelectionStep from '@/components/booking/steps/VehicleSelectionStep';
import PassengerDetailsStep from '@/components/booking/steps/PassengerDetailsStep';
import PaymentStep from '@/components/booking/steps/PaymentStep';

export default function BookingPage() {
    const currentStep = useBookingStore(state => state.currentStep);
    const setStep = (step: number) => bookingStore.set('currentStep', step);

    const steps = [
        {
            title: 'Trip Details',
            icon: <EnvironmentOutlined />,
            content: <TripDetailsStep />,
        },
        {
            title: 'Select Vehicle',
            icon: <CarOutlined />,
            content: <VehicleSelectionStep />,
        },
        {
            title: 'Passenger Info',
            icon: <UserOutlined />,
            content: <PassengerDetailsStep />,
        },
        {
            title: 'Payment',
            icon: <CreditCardOutlined />,
            content: <PaymentStep />,
        },
    ];

    const next = () => {
        setStep(currentStep + 1);
    };

    const prev = () => {
        setStep(currentStep - 1);
    };

    return (
        <Section className="min-h-screen bg-surface">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-secondary mb-8 text-center">Book Your Journey</h1>

                <div className="mb-12">
                    <Steps current={currentStep} items={steps.map(s => ({ title: s.title, icon: s.icon }))} />
                </div>

                <div className="mb-8">
                    {steps[currentStep].content}
                </div>

                <div className="flex justify-between mt-8">
                    {currentStep > 0 && (
                        <Button size="large" onClick={prev} className="h-12 px-8">
                            Previous
                        </Button>
                    )}
                    {currentStep < steps.length - 1 && (
                        <Button type="primary" size="large" onClick={next} className="bg-action h-12 px-8 ml-auto">
                            Next Step
                        </Button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <Button type="primary" size="large" className="bg-success h-12 px-8 ml-auto" onClick={() => message.success('Booking Confirmed!')}>
                            Confirm Booking
                        </Button>
                    )}
                </div>
            </div>
        </Section>
    );
}
