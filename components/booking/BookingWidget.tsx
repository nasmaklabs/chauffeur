'use client';

import React, { useState } from 'react';
import { Tabs, DatePicker, TimePicker, Form } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined, CarOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';



interface BookingWidgetProps {
    compact?: boolean;
    className?: string;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ compact = false, className }) => {
    const [activeTab, setActiveTab] = useState('one-way');

    const items = [
        { label: 'One Way', key: 'one-way' },
        { label: 'Round Trip', key: 'round-trip' },
        { label: 'Hourly', key: 'hourly' },
    ];

    return (
        <div className={`bg-white rounded-xl shadow-xl p-6 md:p-8 ${className}`}>
            <h2 className="text-2xl font-bold mb-6 text-secondary">Book Your Ride</h2>

            <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-6" items={items} />

            <Form layout="vertical" size="large">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item className="mb-4">
                        <Input
                            prefix={<EnvironmentOutlined className="text-primary" />}
                            placeholder="Pickup Location"
                        />
                    </Form.Item>

                    {activeTab !== 'hourly' && (
                        <Form.Item className="mb-4">
                            <Input
                                prefix={<EnvironmentOutlined className="text-primary" />}
                                placeholder="Drop-off Location"
                            />
                        </Form.Item>
                    )}

                    {activeTab === 'hourly' && (
                        <Form.Item className="mb-4">
                            <Select placeholder="Duration" suffixIcon={<ClockCircleOutlined />}>
                                <Select.Option value="3">3 Hours</Select.Option>
                                <Select.Option value="4">4 Hours</Select.Option>
                                <Select.Option value="8">8 Hours</Select.Option>
                                <Select.Option value="12">12 Hours</Select.Option>
                            </Select>
                        </Form.Item>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item className="mb-4">
                            <DatePicker
                                className="w-full"
                                placeholder="Date"
                                suffixIcon={<CalendarOutlined className="text-primary" />}
                            />
                        </Form.Item>
                        <Form.Item className="mb-4">
                            <TimePicker
                                className="w-full"
                                placeholder="Time"
                                suffixIcon={<ClockCircleOutlined className="text-primary" />}
                                format="HH:mm"
                            />
                        </Form.Item>
                    </div>

                    {activeTab === 'round-trip' && (
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item className="mb-4">
                                <DatePicker
                                    className="w-full"
                                    placeholder="Return Date"
                                    suffixIcon={<CalendarOutlined className="text-primary" />}
                                />
                            </Form.Item>
                            <Form.Item className="mb-4">
                                <TimePicker
                                    className="w-full"
                                    placeholder="Return Time"
                                    suffixIcon={<ClockCircleOutlined className="text-primary" />}
                                    format="HH:mm"
                                />
                            </Form.Item>
                        </div>
                    )}

                    <Form.Item className="mb-4 md:col-span-2">
                        <Select
                            placeholder="Select Vehicle Type"
                            suffixIcon={<CarOutlined className="text-primary" />}
                        >
                            <Select.Option value="sedan">Executive Sedan</Select.Option>
                            <Select.Option value="luxury">Luxury Sedan</Select.Option>
                            <Select.Option value="suv">SUV</Select.Option>
                            <Select.Option value="van">Luxury Van</Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                <Button type="primary" block size="large" className="bg-action h-12 text-lg font-bold mt-2">
                    Get Quote & Book
                </Button>
            </Form>
        </div>
    );
};

export default BookingWidget;
