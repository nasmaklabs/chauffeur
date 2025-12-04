'use client';

import React from 'react';
import Section from '@/components/ui/Section';
import { trpc } from '@/lib/trpc/client';
import { Card } from '@/components/ui/Card';
import { CheckCircleOutlined, ClockCircleOutlined, CarOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

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

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="border-none shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Total Bookings</p>
                                <p className="text-3xl font-bold text-secondary">{stats?.total || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <CarOutlined className="text-2xl text-blue-600" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Pending</p>
                                <p className="text-3xl font-bold text-yellow-600">{stats?.pending || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <ClockCircleOutlined className="text-2xl text-yellow-600" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Confirmed</p>
                                <p className="text-3xl font-bold text-green-600">{stats?.confirmed || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircleOutlined className="text-2xl text-green-600" />
                            </div>
                        </div>
                    </Card>

                    <Card className="border-none shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm mb-1">Completed</p>
                                <p className="text-3xl font-bold text-primary">{stats?.completed || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <CheckCircleOutlined className="text-2xl text-primary" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
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

