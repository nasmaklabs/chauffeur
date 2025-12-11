"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Tag, Divider, Select, App } from "antd";
import {
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CarOutlined,
} from "@ant-design/icons";
import Section from "@/components/ui/Section";
import { trpc } from "@/lib/trpc/client";
import { getVehicleName } from "@/lib/services/vehicle-service";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const statusColors: Record<string, string> = {
  pending: "gold",
  confirmed: "blue",
  completed: "green",
  cancelled: "red",
};

export default function BookingDetailsPage() {
  const { message } = App.useApp();
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const {
    data: booking,
    isLoading,
    error,
    refetch,
  } = trpc.booking.getById.useQuery({ id }, { enabled: !!id });

  const updateStatus = trpc.booking.updateStatus.useMutation({
    onSuccess: () => {
      message.success("Booking status updated");
      refetch();
    },
    onError: () => {
      message.error("Failed to update status");
    },
  });

  const deleteBooking = trpc.booking.delete.useMutation({
    onSuccess: () => {
      message.success("Booking deleted");
      router.push("/admin/bookings");
    },
    onError: () => {
      message.error("Failed to delete booking");
    },
  });

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
          <h1 className="text-2xl font-bold text-secondary mb-4">
            Booking Not Found
          </h1>
          <Link href="/admin/bookings">
            <Button type="primary" size="large" className="bg-action">
              Back to Bookings
            </Button>
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link
              href="/admin/bookings"
              className="text-primary hover:underline mb-2 block"
            >
              ← Back to Bookings
            </Link>
            <h1 className="text-3xl font-bold text-secondary">
              Booking Details
            </h1>
          </div>
          <Tag
            color={statusColors[booking.status]}
            className="text-lg px-4 py-2"
          >
            {booking.status.toUpperCase()}
          </Tag>
        </div>

        {/* Main Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
              <p className="text-2xl font-bold text-primary">
                {booking.bookingReference}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Created</p>
              <p className="text-sm font-semibold">
                {new Date(booking.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <Divider />

          {/* Trip Information */}
          <div className="mb-6">
            <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
              <EnvironmentOutlined className="text-primary" />
              Trip Information
            </h3>
            <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Trip Type</p>
                <p className="font-semibold">
                  {booking.tripType.replace("-", " ").toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Distance</p>
                <p className="font-semibold">
                  {booking.distance
                    ? `${booking.distance.toFixed(2)} miles`
                    : "N/A"}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-500">Pickup Location</p>
                <p className="font-semibold">{booking.pickupLocation}</p>
              </div>
              {booking.dropoffLocation && (
                <div className="md:col-span-2">
                  <p className="text-gray-500">Drop-off Location</p>
                  <p className="font-semibold">{booking.dropoffLocation}</p>
                </div>
              )}
            </div>
          </div>

          <Divider />

          {/* Schedule */}
          <div className="mb-6">
            <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
              <CalendarOutlined className="text-primary" />
              Schedule
            </h3>
            <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Pickup Date</p>
                <p className="font-semibold">{booking.date}</p>
              </div>
              <div>
                <p className="text-gray-500">Pickup Time</p>
                <p className="font-semibold">{booking.time}</p>
              </div>
              {booking.returnDate && (
                <>
                  <div>
                    <p className="text-gray-500">Return Date</p>
                    <p className="font-semibold">{booking.returnDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Return Time</p>
                    <p className="font-semibold">{booking.returnTime}</p>
                  </div>
                </>
              )}
              {booking.duration && (
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-semibold">{booking.duration} hours</p>
                </div>
              )}
            </div>
          </div>

          <Divider />

          {/* Passenger Details */}
          <div className="mb-6">
            <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
              <UserOutlined className="text-primary" />
              Passenger Details
            </h3>
            <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p className="font-semibold">
                  {booking.firstName} {booking.lastName}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-semibold flex items-center gap-1">
                  <PhoneOutlined /> {booking.phone}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-semibold flex items-center gap-1">
                  <MailOutlined /> {booking.email}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Passengers</p>
                <p className="font-semibold">
                  {booking.passengers} passenger(s)
                </p>
              </div>
              <div>
                <p className="text-gray-500">Luggage</p>
                <p className="font-semibold">{booking.luggage} bag(s)</p>
              </div>
              {booking.flightNumber && (
                <div>
                  <p className="text-gray-500">Flight Number</p>
                  <p className="font-semibold">{booking.flightNumber}</p>
                </div>
              )}
              {booking.notes && (
                <div className="md:col-span-2">
                  <p className="text-gray-500">Special Notes</p>
                  <p className="font-semibold">{booking.notes}</p>
                </div>
              )}
            </div>
          </div>

          <Divider />

          {/* Vehicle & Pricing */}
          <div className="mb-6">
            <h3 className="font-semibold text-secondary mb-3 flex items-center gap-2">
              <CarOutlined className="text-primary" />
              Vehicle & Pricing
            </h3>
            <div className="pl-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Vehicle Type</p>
                <p className="font-semibold">
                  {getVehicleName(booking.selectedVehicle)}
                </p>
              </div>
              {booking.baseFare && (
                <div>
                  <p className="text-gray-500">Base Fare</p>
                  <p className="font-semibold">
                    £{booking.baseFare.toFixed(2)}
                  </p>
                </div>
              )}
              {booking.distanceCharge && (
                <div>
                  <p className="text-gray-500">Distance Charge</p>
                  <p className="font-semibold">
                    £{booking.distanceCharge.toFixed(2)}
                  </p>
                </div>
              )}
              {booking.totalPrice && (
                <div>
                  <p className="text-gray-500">Total Price</p>
                  <p className="font-semibold text-lg text-primary">
                    £{booking.totalPrice.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-secondary mb-4">Actions</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Update Status
              </label>
              <Select
                value={
                  booking.status as
                    | "pending"
                    | "confirmed"
                    | "completed"
                    | "cancelled"
                }
                onChange={(
                  newStatus: "pending" | "confirmed" | "completed" | "cancelled"
                ) => updateStatus.mutate({ id: booking.id, status: newStatus })}
                className="w-full"
                size="large"
                disabled={updateStatus.isPending}
              >
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="confirmed">Confirmed</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
                <Select.Option value="cancelled">Cancelled</Select.Option>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                danger
                size="large"
                onClick={() => {
                  if (
                    confirm("Are you sure you want to delete this booking?")
                  ) {
                    deleteBooking.mutate({ id: booking.id });
                  }
                }}
                loading={deleteBooking.isPending}
              >
                Delete Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
