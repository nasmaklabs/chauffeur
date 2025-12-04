'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { LogoutOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { signOut, useSession } from 'next-auth/react';
import { App } from 'antd';

export default function AdminHeader() {
    const { message } = App.useApp();
    const { data: session } = useSession();

    const handleLogout = async () => {
        try {
            await signOut({ redirect: true, callbackUrl: '/admin/login' });
            message.success('Logged out successfully');
        } catch (error) {
            console.error('Logout error:', error);
            message.error('Failed to logout');
        }
    };

    if (!session) return null;

    return (
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-xl font-bold text-white">T</span>
                        </div>
                        <span className="text-xl font-bold text-secondary">LuxeRide Admin</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/admin/change-password">
                        <Button size="large" icon={<LockOutlined />}>
                            Change Password
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                        <UserOutlined className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{session.user?.email}</span>
                    </div>
                    <Button
                        danger
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        size="large"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}

