'use client';

import React, { useState } from 'react';
import { Table, Modal, Form, App } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import Section from '@/components/ui/Section';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function AdminUsersPage() {
    const { message, modal } = App.useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    
    const { data: users, isLoading, refetch, error } = trpc.user.list.useQuery();
    
    const createUser = trpc.user.create.useMutation({
        onSuccess: () => {
            message.success('User created successfully');
            setIsModalOpen(false);
            form.resetFields();
            refetch();
        },
        onError: (error) => {
            message.error(error.message || 'Failed to create user');
        },
    });

    const deleteUser = trpc.user.delete.useMutation({
        onSuccess: () => {
            message.success('User deleted successfully');
            refetch();
        },
        onError: (error) => {
            message.error(error.message || 'Failed to delete user');
        },
    });

    const handleCreateUser = async (values: any) => {
        createUser.mutate(values);
    };

    const handleDeleteUser = (id: string, name: string) => {
        modal.confirm({
            title: 'Delete User',
            content: `Are you sure you want to delete "${name}"? This action cannot be undone.`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: () => deleteUser.mutate({ id }),
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {role}
                </span>
            ),
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: any) => (
                <Button
                    danger
                    size="small"
                    onClick={() => handleDeleteUser(record.id, record.name)}
                    loading={deleteUser.isPending}
                >
                    Delete
                </Button>
            ),
        },
    ];
    
    if (error) {
        return (
            <Section className="min-h-screen bg-surface">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-red-800 font-semibold mb-2">Error Loading Users</h3>
                        <p className="text-red-600">{error.message}</p>
                        <Link href="/admin">
                            <Button className="mt-4">Back to Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </Section>
        );
    }

    return (
        <Section className="min-h-screen bg-surface">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-secondary">User Management</h1>
                        <p className="text-gray-600 mt-2">Manage admin users and their access</p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            type="primary"
                            icon={<UserAddOutlined />}
                            size="large"
                            className="bg-action"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Add New User
                        </Button>
                        <Link href="/admin">
                            <Button size="large">Back to Dashboard</Button>
                        </Link>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <Table
                        dataSource={users || []}
                        columns={columns}
                        rowKey="id"
                        loading={isLoading}
                        pagination={{
                            pageSize: 20,
                            showSizeChanger: false,
                        }}
                    />
                </div>

                {/* Add User Modal */}
                <Modal
                    title="Add New User"
                    open={isModalOpen}
                    onCancel={() => {
                        setIsModalOpen(false);
                        form.resetFields();
                    }}
                    footer={null}
                    width={500}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleCreateUser}
                        size="large"
                        className="mt-6"
                    >
                        <Form.Item
                            label="Full Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter the user\'s name' }]}
                        >
                            <Input placeholder="John Doe" />
                        </Form.Item>

                        <Form.Item
                            label="Email Address"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter email' },
                                { type: 'email', message: 'Please enter a valid email' },
                            ]}
                        >
                            <Input placeholder="john@example.com" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please enter password' },
                                { min: 6, message: 'Password must be at least 6 characters' },
                            ]}
                        >
                            <Input.Password placeholder="Minimum 6 characters" />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="role"
                            initialValue="admin"
                            rules={[{ required: true, message: 'Please select a role' }]}
                        >
                            <Input disabled value="admin" />
                        </Form.Item>

                        <Form.Item className="mb-0 mt-6 flex justify-end gap-2">
                            <Button
                                onClick={() => {
                                    setIsModalOpen(false);
                                    form.resetFields();
                                }}
                                className="mr-2"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={createUser.isPending}
                                className="bg-action"
                            >
                                Create User
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </Section>
    );
}

