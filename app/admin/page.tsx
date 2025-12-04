'use client';

import React from 'react';
import Section from '@/components/ui/Section';
import { trpc } from '@/lib/trpc/client';
import { CheckCircleOutlined, ClockCircleOutlined, CarOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { StatisticCard } from '@/components/admin/StatisticCard';

export default function AdminDashboard() {
    const { data: stats, isLoading } = trpc.booking.stats.useQuery();

    if (isLoading) {
        return (
            <Section className="min-h-screen bg-surface">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-secondary mb-8">Admin Dashboard</h1>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </Section>
        );
    }

    return (
        <Section className="min-h-screen bg-surface">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-secondary">Admin Dashboard</h1>
                    <Link href="/admin/bookings">
                        <Button type="primary" size="large" className="bg-action">
                            View All Bookings
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatisticCard
                        label="Total Bookings"
                        value={stats?.total || 0}
                        icon={<CarOutlined />}
                        valueColor="text-secondary"
                        iconBgColor="bg-blue-100"
                        iconColor="text-blue-600"
                    />
                    <StatisticCard
                        label="Pending"
                        value={stats?.pending || 0}
                        icon={<ClockCircleOutlined />}
                        valueColor="text-yellow-600"
                        iconBgColor="bg-yellow-100"
                        iconColor="text-yellow-600"
                    />
                    <StatisticCard
                        label="Confirmed"
                        value={stats?.confirmed || 0}
                        icon={<CheckCircleOutlined />}
                        valueColor="text-green-600"
                        iconBgColor="bg-green-100"
                        iconColor="text-green-600"
                    />
                    <StatisticCard
                        label="Completed"
                        value={stats?.completed || 0}
                        icon={<CheckCircleOutlined />}
                        valueColor="text-primary"
                        iconBgColor="bg-primary/10"
                        iconColor="text-primary"
                    />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-xl font-bold text-secondary mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <Link href="/admin/bookings">
                            <Button block size="large" className="h-12">
                                View All Bookings
                            </Button>
                        </Link>
                        <Link href="/admin/bookings?status=pending">
                            <Button block size="large" className="h-12">
                                Pending Bookings
                            </Button>
                        </Link>
                        <Link href="/admin/users">
                            <Button block size="large" className="h-12">
                                Manage Users
                            </Button>
                        </Link>
                        <Link href="/admin/change-password">
                            <Button block size="large" className="h-12">
                                Change Password
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button block size="large" className="h-12">
                                Back to Website
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Section>
    );
}

