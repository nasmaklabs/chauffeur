'use client';

import React from 'react';
import { Form, DatePicker, TimePicker, Radio } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { bookingStore, useBookingStore } from '@/lib/store/bookingStore';

const TripDetailsStep = () => {
    const tripDetails = useBookingStore(state => state.tripDetails);
    const setTripDetails = (details: typeof tripDetails) => bookingStore.set('tripDetails', details);

    // In a real app, we would use Form.useForm() and sync with store on change
    // For this demo, we'll just show the layout

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Trip Details</h2>

            <Form layout="vertical" size="large" initialValues={tripDetails}>
                <Form.Item label="Journey Type" className="mb-6">
                    <Radio.Group
                        value={tripDetails.type}
                        onChange={e => setTripDetails({ ...tripDetails, type: e.target.value })}
                        buttonStyle="solid"
                        className="w-full grid grid-cols-3 text-center"
                    >
                        <Radio.Button value="one-way" className="text-center">One Way</Radio.Button>
                        <Radio.Button value="round-trip" className="text-center">Round Trip</Radio.Button>
                        <Radio.Button value="hourly" className="text-center">Hourly</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item label="Pickup Location" required>
                        <Input
                            prefix={<EnvironmentOutlined className="text-primary" />}
                            placeholder="Enter pickup location"
                            value={tripDetails.pickupLocation}
                            onChange={e => setTripDetails({ ...tripDetails, pickupLocation: e.target.value })}
                        />
                    </Form.Item>

                    {tripDetails.type !== 'hourly' && (
                        <Form.Item label="Drop-off Location" required>
                            <Input
                                prefix={<EnvironmentOutlined className="text-primary" />}
                                placeholder="Enter drop-off location"
                                value={tripDetails.dropoffLocation}
                                onChange={e => setTripDetails({ ...tripDetails, dropoffLocation: e.target.value })}
                            />
                        </Form.Item>
                    )}

                    {tripDetails.type === 'hourly' && (
                        <Form.Item label="Duration" required>
                            <Select placeholder="Select Duration">
                                <Select.Option value="3">3 Hours</Select.Option>
                                <Select.Option value="4">4 Hours</Select.Option>
                                <Select.Option value="8">8 Hours</Select.Option>
                                <Select.Option value="12">12 Hours</Select.Option>
                            </Select>
                        </Form.Item>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Date" required>
                            <DatePicker
                                className="w-full"
                                suffixIcon={<CalendarOutlined className="text-primary" />}
                            />
                        </Form.Item>
                        <Form.Item label="Time" required>
                            <TimePicker
                                className="w-full"
                                suffixIcon={<ClockCircleOutlined className="text-primary" />}
                                format="HH:mm"
                            />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Passengers">
                            <Select defaultValue={1}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                    <Select.Option key={n} value={n}>{n} Passengers</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Luggage">
                            <Select defaultValue={1}>
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                    <Select.Option key={n} value={n}>{n} Bags</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default TripDetailsStep;
