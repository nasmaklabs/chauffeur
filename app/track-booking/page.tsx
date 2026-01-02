"use client";

import React, { useState } from "react";
import { Form, App } from "antd";
import {
  SearchOutlined,
  CheckCircleFilled,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  MailOutlined,
  CarOutlined,
} from "@ant-design/icons";
import Section from "@/components/ui/Section";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { trpc } from "@/lib/trpc/client";
import { getVehicleName } from "@/lib/services/vehicle-service";

export default function TrackBookingPage() {
  const { message } = App.useApp();
  const [bookingReference, setBookingReference] = useState("");
  const [searchedReference, setSearchedReference] = useState("");
  const [form] = Form.useForm();

  const {
    data: booking,
    isLoading,
    error,
    refetch,
  } = trpc.booking.getByReference.useQuery(
    { reference: searchedReference },
    { enabled: !!searchedReference }
  );

  const handleSearch = (values: { reference: string }) => {
    const ref = values.reference.trim().toUpperCase();
    if (!ref) {
      message.error("Please enter a booking reference");
      return;
    }
    setSearchedReference(ref);
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    confirmed: "bg-blue-100 text-blue-800 border-blue-300",
    completed: "bg-green-100 text-green-800 border-green-300",
    cancelled: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <Section className="min-h-screen bg-surface py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            Track Your Booking
          </h1>
          <p className="text-gray-600 text-lg">
            Enter your booking reference number to view your booking details
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSearch}
            size="large"
          >
            <Form.Item
              label="Booking Reference Number"
              name="reference"
              rules={[
                {
                  required: true,
                  message: "Please enter your booking reference",
                },
                { min: 5, message: "Booking reference is too short" },
              ]}
            >
              <Input
                prefix={<SearchOutlined className="text-primary" />}
                placeholder="e.g., LUX-MIRTT09S-6FX7"
                value={bookingReference}
                onChange={(e) =>
                  setBookingReference(e.target.value.toUpperCase())
                }
                onPressEnter={() => form.submit()}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              className="bg-action h-12 text-lg font-bold"
              loading={isLoading}
              icon={<SearchOutlined />}
            >
              Track Booking
            </Button>
          </Form>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for your booking...</p>
          </div>
        )}

        {/* Error State - Booking Not Found */}
        {error && searchedReference && !isLoading && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Booking Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find a booking with reference:{" "}
              <strong>{searchedReference}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Please check your booking reference and try again. Your booking
              reference was sent to your email when you made the reservation.
            </p>
            <Button
              size="large"
              onClick={() => {
                setSearchedReference("");
                form.resetFields();
              }}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Success State - Booking Found */}
        {booking && !isLoading && (
          <div className="space-y-6">
            {/* Status Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <CheckCircleFilled className="text-5xl text-green-500 mb-3" />
              <h2 className="text-2xl font-bold text-secondary mb-2">
                Booking Found!
              </h2>
              <div className="inline-block bg-primary/10 border-2 border-primary rounded-lg px-6 py-3 mb-4">
                <p className="text-sm text-gray-600 mb-1">Booking Reference</p>
                <p className="text-2xl font-bold text-primary tracking-wider">
                  {booking.bookingReference}
                </p>
              </div>
              <div
                className={`inline-block px-6 py-2 rounded-full border font-semibold ${
                  statusColors[booking.status]
                }`}
              >
                {booking.status.toUpperCase()}
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-secondary mb-6">
                Booking Details
              </h3>

              <div className="space-y-6">
                {/* Trip Information */}
                <div>
                  <h4 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                    <EnvironmentOutlined className="text-primary" />
                    Trip Information
                  </h4>
                  <div className="pl-6 space-y-2 text-gray-600">
                    <p>
                      <strong>Type:</strong>{" "}
                      {booking.tripType.replace("-", " ").toUpperCase()}
                    </p>
                    <p>
                      <strong>Pickup:</strong> {booking.pickupLocation}
                    </p>
                    {booking.dropoffLocation && (
                      <p>
                        <strong>Drop-off:</strong> {booking.dropoffLocation}
                      </p>
                    )}
                    {booking.distance && (
                      <p>
                        <strong>Distance:</strong> {booking.distance.toFixed(2)}{" "}
                        miles
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6"></div>

                {/* Schedule */}
                <div>
                  <h4 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                    <CalendarOutlined className="text-primary" />
                    Schedule
                  </h4>
                  <div className="pl-6 space-y-2 text-gray-600">
                    <p>
                      <strong>Date:</strong> {booking.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {booking.time}
                    </p>
                    {booking.returnDate && (
                      <>
                        <p>
                          <strong>Return Date:</strong> {booking.returnDate}
                        </p>
                        <p>
                          <strong>Return Time:</strong> {booking.returnTime}
                        </p>
                      </>
                    )}
                    {booking.duration && (
                      <p>
                        <strong>Duration:</strong> {booking.duration} hours
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6"></div>

                {/* Passenger Details */}
                <div>
                  <h4 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                    <UserOutlined className="text-primary" />
                    Passenger Information
                  </h4>
                  <div className="pl-6 space-y-2 text-gray-600">
                    <p>
                      <strong>Name:</strong> {booking.firstName}{" "}
                      {booking.lastName}
                    </p>
                    <p className="flex items-center gap-2">
                      <MailOutlined /> {booking.email}
                    </p>
                    {/* phone removed */}
                    {booking.flightNumber && (
                      <p>
                        <strong>Flight:</strong> {booking.flightNumber}
                      </p>
                    )}
                    <p>
                      <strong>Passengers:</strong> {booking.passengers}
                    </p>
                    <p>
                      <strong>Luggage:</strong> {booking.luggage} bag(s)
                    </p>
                    {booking.notes && (
                      <div className="mt-3">
                        <p>
                          <strong>Special Notes:</strong>
                        </p>
                        <p className="mt-1 p-3 bg-gray-50 rounded border">
                          {booking.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6"></div>

                {/* Vehicle & Pricing */}
                <div>
                  <h4 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                    <CarOutlined className="text-primary" />
                    Vehicle & Pricing
                  </h4>
                  <div className="pl-6 space-y-2 text-gray-600">
                    <p>
                      <strong>Vehicle:</strong>{" "}
                      {getVehicleName(booking.selectedVehicle) ||
                        "To be assigned"}
                    </p>
                    {booking.totalPrice && (
                      <div className="mt-4">
                        {booking.baseFare && (
                          <p>
                            <strong>Base Fare:</strong> £
                            {booking.baseFare.toFixed(2)}
                          </p>
                        )}
                        {booking.distanceCharge && (
                          <p>
                            <strong>Distance Charge:</strong> £
                            {booking.distanceCharge.toFixed(2)}
                          </p>
                        )}
                        <div className="border-t mt-2 pt-2">
                          <p className="text-lg">
                            <strong>Total:</strong>{" "}
                            <span className="text-primary font-bold">
                              £{booking.totalPrice.toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-secondary mb-3">
                Important Information
              </h4>
              <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                <li>
                  Please be ready 10 minutes before your scheduled pickup time
                </li>
                <li>
                  Driver details will be sent 1 hour before pickup via email and
                  SMS
                </li>
                <li>
                  For any changes or cancellations, please contact us at least
                  24 hours in advance
                </li>
                <li>Payment will be collected at the end of your journey</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Button
                size="large"
                onClick={() => {
                  setSearchedReference("");
                  form.resetFields();
                }}
                className="h-12 px-8"
              >
                Search Another Booking
              </Button>
              <Button
                size="large"
                type="primary"
                className="bg-action h-12 px-8"
                onClick={() => window.print()}
              >
                Print Details
              </Button>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
