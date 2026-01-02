"use client";

import React, { useState } from "react";
import { Table, Select, Input, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Section from "@/components/ui/Section";
import { trpc } from "@/lib/trpc/client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const statusColors: Record<string, string> = {
  pending: "gold",
  confirmed: "blue",
  completed: "green",
  cancelled: "red",
};

export default function AdminBookingsPage() {
  const [statusFilter, setStatusFilter] = useState<
    "pending" | "confirmed" | "completed" | "cancelled" | "all"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, refetch } = trpc.booking.list.useQuery({
    status: statusFilter,
    limit: 50,
  });

  const updateStatus = trpc.booking.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const bookings = data?.bookings || [];

  const filteredBookings = bookings.filter((booking) => {
    const search = searchTerm.toLowerCase();
    return (
      booking.bookingReference.toLowerCase().includes(search) ||
      booking.email?.toLowerCase().includes(search) ||
      booking.firstName?.toLowerCase().includes(search) ||
      booking.lastName?.toLowerCase().includes(search)
    );
  });

  const columns = [
    {
      title: "Reference",
      dataIndex: "bookingReference",
      key: "bookingReference",
      render: (ref: string, record: any) => (
        <Link
          href={`/admin/bookings/${record.id}`}
          className="text-primary font-semibold hover:underline"
        >
          {ref}
        </Link>
      ),
    },
    {
      title: "Passenger",
      key: "passenger",
      render: (_: any, record: any) => (
        <div>
          <div className="font-semibold">
            {record.firstName} {record.lastName}
          </div>
          <div className="text-xs text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Trip",
      key: "trip",
      render: (_: any, record: any) => (
        <div className="text-sm">
          <div className="text-gray-600 truncate max-w-xs">
            {record.pickupLocation}
          </div>
          {record.dropoffLocation && (
            <div className="text-gray-500 text-xs truncate max-w-xs">
              → {record.dropoffLocation}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Date & Time",
      key: "datetime",
      render: (_: any, record: any) => (
        <div className="text-sm">
          <div>{record.date}</div>
          <div className="text-gray-500 text-xs">{record.time}</div>
        </div>
      ),
    },
    {
      title: "Vehicle",
      dataIndex: "selectedVehicle",
      key: "selectedVehicle",
      render: (vehicle: string) => (vehicle ? vehicle.toUpperCase() : "-"),
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => (price ? `£${price.toFixed(2)}` : "-"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Select
          value={status as "pending" | "confirmed" | "completed" | "cancelled"}
          onChange={(
            newStatus: "pending" | "confirmed" | "completed" | "cancelled"
          ) => updateStatus.mutate({ id: record.id, status: newStatus })}
          size="small"
          className="w-32"
          disabled={updateStatus.isPending}
        >
          <Select.Option value="pending">
            <Tag color={statusColors.pending}>Pending</Tag>
          </Select.Option>
          <Select.Option value="confirmed">
            <Tag color={statusColors.confirmed}>Confirmed</Tag>
          </Select.Option>
          <Select.Option value="completed">
            <Tag color={statusColors.completed}>Completed</Tag>
          </Select.Option>
          <Select.Option value="cancelled">
            <Tag color={statusColors.cancelled}>Cancelled</Tag>
          </Select.Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Link href={`/admin/bookings/${record.id}`}>
          <Button size="small">View</Button>
        </Link>
      ),
    },
  ];

  return (
    <Section className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-secondary">All Bookings</h1>
          <Link href="/admin">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search
              </label>
              <Input
                placeholder="Search by reference, name, or email"
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="large"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Status
              </label>
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                className="w-full"
                size="large"
              >
                <Select.Option value="all">All Bookings</Select.Option>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="confirmed">Confirmed</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
                <Select.Option value="cancelled">Cancelled</Select.Option>
              </Select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Table
            dataSource={filteredBookings}
            columns={columns}
            rowKey="id"
            loading={isLoading}
            pagination={{
              pageSize: 20,
              showSizeChanger: false,
              showTotal: (total) => `Total ${total} bookings`,
            }}
          />
        </div>
      </div>
    </Section>
  );
}
