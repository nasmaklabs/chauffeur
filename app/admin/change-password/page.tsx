'use client';

import React from 'react';
import { Form, App } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import Section from '@/components/ui/Section';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { trpc } from '@/lib/trpc/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ChangePasswordPage() {
    const { message } = App.useApp();
    const { data: session } = useSession();
    const router = useRouter();
    const [form] = Form.useForm();

    const changePassword = trpc.user.changePassword.useMutation({
        onSuccess: () => {
            message.success('Password changed successfully!');
            form.resetFields();
            setTimeout(() => {
                router.push('/admin');
            }, 1500);
        },
        onError: (error) => {
            message.error(error.message || 'Failed to change password');
        },
    });

    const handleSubmit = (values: any) => {
        if (!session?.user?.email) {
            message.error('Session not found. Please login again.');
            return;
        }

        if (values.newPassword !== values.confirmPassword) {
            message.error('New passwords do not match');
            return;
        }

        changePassword.mutate({
            email: session.user.email,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
        });
    };

    return (
        <Section className="min-h-screen bg-surface">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link href="/admin" className="text-primary hover:underline mb-2 block">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-secondary">Change Password</h1>
                    <p className="text-gray-600 mt-2">Update your account password</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    {session?.user?.email && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-gray-600">
                                <strong>Account:</strong> {session.user.email}
                            </p>
                        </div>
                    )}

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        size="large"
                        requiredMark={false}
                    >
                        <Form.Item
                            label="Current Password"
                            name="currentPassword"
                            rules={[
                                { required: true, message: 'Please enter your current password' },
                                { min: 6, message: 'Password must be at least 6 characters' },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-gray-400" />}
                                placeholder="Enter current password"
                                autoComplete="current-password"
                            />
                        </Form.Item>

                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            rules={[
                                { required: true, message: 'Please enter new password' },
                                { min: 6, message: 'Password must be at least 6 characters' },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-gray-400" />}
                                placeholder="Enter new password"
                                autoComplete="new-password"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Confirm New Password"
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: 'Please confirm new password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-gray-400" />}
                                placeholder="Confirm new password"
                                autoComplete="new-password"
                            />
                        </Form.Item>

                        <Form.Item className="mb-0 mt-8">
                            <div className="flex gap-4">
                                <Link href="/admin" className="flex-1">
                                    <Button block size="large" className="h-12">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    size="large"
                                    loading={changePassword.isPending}
                                    className="bg-action h-12 flex-1"
                                >
                                    {changePassword.isPending ? 'Changing Password...' : 'Change Password'}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>

                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">Security Tips:</h4>
                        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                            <li>Use at least 6 characters (longer is better)</li>
                            <li>Include numbers and special characters</li>
                            <li>Don't reuse passwords from other accounts</li>
                            <li>Change your password regularly</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Section>
    );
}

