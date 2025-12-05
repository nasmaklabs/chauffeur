'use client';

import React, { useEffect } from 'react';
import { CheckCircleFilled, EnvironmentOutlined, CalendarOutlined, UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { trpc } from '@/lib/trpc/client';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { resetBookingStore } from '@/lib/store/bookingStore';

export default function BookingConfirmationPage() {
    const params = useParams();
    const router = useRouter();
    const reference = params?.reference as string;
    
    const { data: booking, isLoading, error } = trpc.booking.getByReference.useQuery(
        { reference },
        { enabled: !!reference }
    );

    // Clear booking state when confirmation page loads successfully
    useEffect(() => {
        if (booking) {
            resetBookingStore();
        }
    }, [booking]);

    if (isLoading) {
        return (
            <Section className="min-h-screen bg-surface flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading booking details...</p>
                </div>
            </Section>
        );
    }

    if (error || !booking) {
        return (
            <Section className="min-h-screen bg-surface flex items-center justify-center">
                <div className="max-w-md text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h1 className="text-2xl font-bold text-secondary mb-4">Booking Not Found</h1>
                    <p className="text-gray-600 mb-6">
                        We couldn't find a booking with reference: <strong>{reference}</strong>
                    </p>
                    <Link href="/">
                        <Button type="primary" size="large" className="bg-action">
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </Section>
        );
    }

    return (
        <Section className="min-h-screen bg-surface py-12">
            <div className="max-w-3xl mx-auto">
                {/* Success Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center">
                    <CheckCircleFilled className="text-6xl text-green-500 mb-4" />
                    <h1 className="text-3xl font-bold text-secondary mb-2">Booking Confirmed!</h1>
                    <p className="text-gray-600 mb-6">
                        Thank you for choosing AA Comfort. Your booking has been confirmed.
                    </p>
                    
                    <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 inline-block">
                        <p className="text-sm text-gray-600 mb-1">Your Booking Reference</p>
                        <p className="text-2xl font-bold text-primary tracking-wider">{booking.bookingReference}</p>
                    </div>
                </div>

                {/* Booking Details */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                    <h2 className="text-xl font-bold text-secondary mb-6">Booking Details</h2>
                    
                    <div className="space-y-6">
                        {/* Trip Information */}
                        <div>
                            <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                                <EnvironmentOutlined className="text-primary" />
                                Trip Information
                            </h3>
                            <div className="pl-6 space-y-2 text-gray-600">
                                <p><strong>Type:</strong> {booking.tripType.replace('-', ' ').toUpperCase()}</p>
                                <p><strong>Pickup:</strong> {booking.pickupLocation}</p>
                                {booking.dropoffLocation && <p><strong>Drop-off:</strong> {booking.dropoffLocation}</p>}
                                {booking.distance && <p><strong>Distance:</strong> {booking.distance.toFixed(2)} km</p>}
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div>
                            <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                                <CalendarOutlined className="text-primary" />
                                Schedule
                            </h3>
                            <div className="pl-6 space-y-2 text-gray-600">
                                <p><strong>Date:</strong> {booking.date}</p>
                                <p><strong>Time:</strong> {booking.time}</p>
                                {booking.returnDate && (
                                    <>
                                        <p><strong>Return Date:</strong> {booking.returnDate}</p>
                                        <p><strong>Return Time:</strong> {booking.returnTime}</p>
                                    </>
                                )}
                                {booking.duration && <p><strong>Duration:</strong> {booking.duration} hours</p>}
                            </div>
                        </div>

                        {/* Passenger Details */}
                        <div>
                            <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                                <UserOutlined className="text-primary" />
                                Passenger Information
                            </h3>
                            <div className="pl-6 space-y-2 text-gray-600">
                                <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
                                <p className="flex items-center gap-2">
                                    <MailOutlined /> {booking.email}
                                </p>
                                <p className="flex items-center gap-2">
                                    <PhoneOutlined /> {booking.phone}
                                </p>
                                {booking.flightNumber && <p><strong>Flight:</strong> {booking.flightNumber}</p>}
                                <p><strong>Passengers:</strong> {booking.passengers}</p>
                                <p><strong>Luggage:</strong> {booking.luggage} bag(s)</p>
                            </div>
                        </div>

                        {/* Pricing */}
                        {booking.totalPrice && (
                            <div>
                                <h3 className="font-semibold text-secondary mb-3">Pricing Breakdown</h3>
                                <div className="pl-6 space-y-2 text-gray-600">
                                    {booking.baseFare && <p><strong>Base Fare:</strong> £{booking.baseFare.toFixed(2)}</p>}
                                    {booking.distanceCharge && <p><strong>Distance Charge:</strong> £{booking.distanceCharge.toFixed(2)}</p>}
                                    <div className="border-t pt-2 mt-2">
                                        <p className="text-lg"><strong>Total:</strong> <span className="text-primary font-bold">£{booking.totalPrice.toFixed(2)}</span></p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Confirmation Email Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-secondary mb-2">What's Next?</h3>
                    <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                        <li>A confirmation email will be sent to <strong>{booking.email}</strong></li>
                        <li>Our team will contact you 24 hours before your journey</li>
                        <li>Driver details will be shared 1 hour before pickup</li>
                        <li>Payment will be collected at the end of your journey</li>
                        <li><strong>Important:</strong> Save your booking reference <span className="font-mono bg-white px-2 py-1 rounded">{booking.bookingReference}</span> to track your booking anytime</li>
                    </ul>
                </div>

                {/* Track Booking Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
                    <h3 className="font-semibold text-secondary mb-2">📍 Track Your Booking Anytime</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        You can view your booking details anytime using your booking reference number
                    </p>
                    <Link href="/track-booking">
                        <Button size="large" className="bg-green-600 text-white hover:bg-green-700 h-10 px-6">
                            Go to Track Booking Page
                        </Button>
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                    <Link href="/">
                        <Button size="large" className="h-12 px-8">
                            Back to Home
                        </Button>
                    </Link>
                    <Button 
                        size="large" 
                        type="primary" 
                        className="bg-action h-12 px-8"
                        onClick={() => window.print()}
                    >
                        Print Confirmation
                    </Button>
                </div>
            </div>
        </Section>
    );
}

