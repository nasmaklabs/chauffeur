'use client';

import React, { useEffect } from 'react';
import { Steps, Button, App } from 'antd';
import { CarOutlined, UserOutlined, CreditCardOutlined, CheckCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Section from '@/components/ui/Section';
import { bookingStore, useBookingStore } from '@/lib/store/bookingStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import TripDetailsStep from '@/components/booking/steps/TripDetailsStep';
import VehicleSelectionStep from '@/components/booking/steps/VehicleSelectionStep';
import PassengerDetailsStep from '@/components/booking/steps/PassengerDetailsStep';
import PaymentStep from '@/components/booking/steps/PaymentStep';

export default function BookingPage() {
    const { message } = App.useApp();
    const router = useRouter();
    const currentStep = useBookingStore(state => state.currentStep);
    const tripDetails = useBookingStore(state => state.tripDetails);
    const selectedVehicle = useBookingStore(state => state.selectedVehicle);
    const setStep = (step: number) => bookingStore.set('currentStep', step);

    // Check if booking has basic trip details, if not redirect to home
    const hasBasicDetails = tripDetails.pickupLocation && tripDetails.date && tripDetails.time;

    useEffect(() => {
        if (!hasBasicDetails) {
            message.info('Please fill in your trip details to continue booking');
            router.push('/');
        }
    }, [hasBasicDetails, router, message]);

    const canProceedToNextStep = () => {
        switch (currentStep) {
            case 0: // Trip Details
                return tripDetails.pickupLocation && 
                       (tripDetails.type === 'hourly' || tripDetails.dropoffLocation) &&
                       tripDetails.date && 
                       tripDetails.time;
            case 1: // Vehicle Selection
                if (!selectedVehicle) {
                    message.warning('Please select a vehicle to continue');
                    return false;
                }
                return true;
            case 2: // Passenger Details
                return true; // Add validation if needed
            default:
                return true;
        }
    };

    const next = () => {
        if (canProceedToNextStep()) {
            setStep(currentStep + 1);
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Direct step advance without validation (for auto-navigation)
    const advanceStep = () => {
        setStep(currentStep + 1);
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prev = () => {
        setStep(currentStep - 1);
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const steps = [
        {
            title: 'Trip Details',
            icon: <EnvironmentOutlined />,
            content: <TripDetailsStep />,
        },
        {
            title: 'Select Vehicle',
            icon: <CarOutlined />,
            content: <VehicleSelectionStep onNext={advanceStep} />,
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

    // Don't render booking page if no basic details
    if (!hasBasicDetails) {
        return (
            <Section className="min-h-screen bg-surface flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirecting to homepage...</p>
                </div>
            </Section>
        );
    }

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
                    {currentStep > 0 && currentStep < steps.length - 1 && (
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
                        <Button size="large" onClick={prev} className="h-12 px-8">
                            Previous
                        </Button>
                    )}
                </div>
            </div>
        </Section>
    );
}
