'use client';

import React, { useState, useEffect } from 'react';
import { Form, DatePicker, TimePicker, Radio } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Select } from '@/components/ui/Select';
import { bookingStore, useBookingStore, Coordinates } from '@/lib/store/bookingStore';
import LocationAutocomplete from '@/components/booking/LocationAutocomplete';
import dayjs from 'dayjs';
import { calculateDistance, formatDistance } from '@/lib/utils/distance';
import { DURATION_OPTIONS, TIME_FORMAT } from '@/lib/constants/booking';
import { validateLocationWithCoordinates } from '@/lib/validators/location-validator';
import { 
    validateTimeNotInPast, 
    validateReturnDate, 
    validateReturnTime 
} from '@/lib/validators/date-time-validator';

const TripDetailsStep = () => {
    const tripDetails = useBookingStore(state => state.tripDetails);
    const setTripDetails = (details: typeof tripDetails) => bookingStore.set('tripDetails', details);
    const [distance, setDistance] = useState<number | null>(tripDetails.distance || null);
    const [form] = Form.useForm();

    useEffect(() => {
        if (tripDetails.pickupCoordinates && tripDetails.dropoffCoordinates) {
            const calculatedDistance = calculateDistance(tripDetails.pickupCoordinates, tripDetails.dropoffCoordinates);
            setDistance(calculatedDistance);
            setTripDetails({ ...tripDetails, distance: calculatedDistance });
        } else {
            setDistance(null);
        }
    }, [tripDetails.pickupCoordinates, tripDetails.dropoffCoordinates]);

    const handlePickupChange = (address: string, coordinates: Coordinates | null) => {
        setTripDetails({ ...tripDetails, pickupLocation: address, pickupCoordinates: coordinates });
    };

    const handleDropoffChange = (address: string, coordinates: Coordinates | null) => {
        setTripDetails({ ...tripDetails, dropoffLocation: address, dropoffCoordinates: coordinates });
    };

    const formInitialValues = {
        ...tripDetails,
        date: tripDetails.date ? dayjs(tripDetails.date) : undefined,
        time: tripDetails.time ? dayjs(tripDetails.time, 'HH:mm') : undefined,
        returnDate: tripDetails.returnDate ? dayjs(tripDetails.returnDate) : undefined,
        returnTime: tripDetails.returnTime ? dayjs(tripDetails.returnTime, 'HH:mm') : undefined,
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-secondary">Trip Details</h2>

            <Form layout="vertical" size="large" form={form} initialValues={formInitialValues}>
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
                    <Form.Item 
                        label="Pickup Location" 
                        required
                        rules={[
                            { required: true, message: 'Please enter pickup location' },
                            { validator: () => validateLocationWithCoordinates(tripDetails.pickupLocation, tripDetails.pickupCoordinates) }
                        ]}
                    >
                        <LocationAutocomplete
                            placeholder="Enter pickup location"
                            value={tripDetails.pickupLocation}
                            onChange={handlePickupChange}
                        />
                    </Form.Item>

                    {tripDetails.type !== 'hourly' && (
                        <Form.Item 
                            label="Drop-off Location" 
                            required
                            rules={[
                                { required: true, message: 'Please enter drop-off location' },
                                { validator: () => validateLocationWithCoordinates(tripDetails.dropoffLocation, tripDetails.dropoffCoordinates) }
                            ]}
                        >
                            <LocationAutocomplete
                                placeholder="Enter drop-off location"
                                value={tripDetails.dropoffLocation}
                                onChange={handleDropoffChange}
                            />
                        </Form.Item>
                    )}

                    {tripDetails.type === 'hourly' && (
                        <Form.Item 
                            label="Duration" 
                            required
                            rules={[{ required: true, message: 'Please select duration' }]}
                        >
                            <Select 
                                placeholder="Select Duration"
                                value={tripDetails.duration}
                                onChange={value => setTripDetails({ ...tripDetails, duration: value })}
                            >
                                {DURATION_OPTIONS.map(({ value, label }) => (
                                    <Select.Option key={value} value={value}>{label}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}

                    {tripDetails.type !== 'hourly' && distance !== null && (
                        <div className="md:col-span-2">
                            <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-center gap-2">
                                <EnvironmentOutlined className="text-primary text-lg" />
                                <span>
                                    Distance: <strong>{formatDistance(distance)}</strong>
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item 
                            label="Date" 
                            required 
                            name="date"
                            rules={[{ required: true, message: 'Please select date' }]}
                        >
                            <DatePicker
                                className="w-full"
                                suffixIcon={<CalendarOutlined className="text-primary" />}
                                onChange={value => {
                                    setTripDetails({ ...tripDetails, date: value ? value.format('YYYY-MM-DD') : '' });
                                    form.validateFields(['time']); // Revalidate time when date changes
                                }}
                                disabledDate={(current) => current && current < dayjs().startOf('day')}
                            />
                        </Form.Item>
                        <Form.Item 
                            label="Time" 
                            required 
                            name="time"
                            rules={[
                                { required: true, message: 'Please select time' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        return validateTimeNotInPast(getFieldValue('date'), value);
                                    },
                                }),
                            ]}
                        >
                            <TimePicker
                                className="w-full"
                                suffixIcon={<ClockCircleOutlined className="text-primary" />}
                                format={TIME_FORMAT}
                                onChange={value => setTripDetails({ ...tripDetails, time: value ? value.format(TIME_FORMAT) : '' })}
                            />
                        </Form.Item>
                    </div>

                    {tripDetails.type === 'round-trip' && (
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item 
                                label="Return Date" 
                                required 
                                name="returnDate"
                                rules={[
                                    { required: true, message: 'Please select return date' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            return validateReturnDate(value, getFieldValue('date'));
                                        },
                                    }),
                                ]}
                            >
                                <DatePicker
                                    className="w-full"
                                    suffixIcon={<CalendarOutlined className="text-primary" />}
                                    onChange={value => {
                                        setTripDetails({ ...tripDetails, returnDate: value ? value.format('YYYY-MM-DD') : undefined });
                                        form.validateFields(['returnTime']); // Revalidate return time when return date changes
                                    }}
                                    disabledDate={(current) => {
                                        const pickupDate = form.getFieldValue('date');
                                        if (!current) return false;
                                        // Disable past dates and dates before pickup
                                        if (current < dayjs().startOf('day')) return true;
                                        if (pickupDate && current.isBefore(pickupDate, 'day')) return true;
                                        return false;
                                    }}
                                />
                            </Form.Item>
                            <Form.Item 
                                label="Return Time" 
                                required 
                                name="returnTime"
                                rules={[
                                    { required: true, message: 'Please select return time' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            return validateReturnTime(
                                                getFieldValue('returnDate'),
                                                value,
                                                getFieldValue('date'),
                                                getFieldValue('time')
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <TimePicker
                                    className="w-full"
                                    suffixIcon={<ClockCircleOutlined className="text-primary" />}
                                    format={TIME_FORMAT}
                                    onChange={value => setTripDetails({ ...tripDetails, returnTime: value ? value.format(TIME_FORMAT) : undefined })}
                                />
                            </Form.Item>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item 
                            label="Passengers"
                            rules={[{ required: true, message: 'Please select number of passengers' }]}
                        >
                            <Select 
                                value={tripDetails.passengers}
                                onChange={value => setTripDetails({ ...tripDetails, passengers: value })}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                    <Select.Option key={n} value={n}>{n} Passengers</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item 
                            label="Luggage"
                            rules={[{ required: true, message: 'Please select number of bags' }]}
                        >
                            <Select 
                                value={tripDetails.luggage}
                                onChange={value => setTripDetails({ ...tripDetails, luggage: value })}
                            >
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
