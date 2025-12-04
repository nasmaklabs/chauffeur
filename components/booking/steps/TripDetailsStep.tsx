'use client';

import React, { useState, useEffect } from 'react';
import { Form, DatePicker, TimePicker, Radio } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { bookingStore, useBookingStore, Coordinates } from '@/lib/store/bookingStore';
import LocationAutocomplete from '@/components/booking/LocationAutocomplete';
import dayjs from 'dayjs';

const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
    if (typeof window !== 'undefined' && window.google?.maps?.geometry) {
        const point1 = new window.google.maps.LatLng(coord1.lat, coord1.lng);
        const point2 = new window.google.maps.LatLng(coord2.lat, coord2.lng);
        const distanceInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
        return distanceInMeters / 1000; // Convert to kilometers
    }
    return 0;
};

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

    // Convert string dates back to dayjs objects for the form
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
                            { 
                                validator: () => {
                                    if (tripDetails.pickupLocation && !tripDetails.pickupCoordinates) {
                                        return Promise.reject(new Error('Please select a valid location from suggestions'));
                                    }
                                    return Promise.resolve();
                                }
                            }
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
                                { 
                                    validator: () => {
                                        if (tripDetails.dropoffLocation && !tripDetails.dropoffCoordinates) {
                                            return Promise.reject(new Error('Please select a valid location from suggestions'));
                                        }
                                        return Promise.resolve();
                                    }
                                }
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
                                <Select.Option value="3">3 Hours</Select.Option>
                                <Select.Option value="4">4 Hours</Select.Option>
                                <Select.Option value="8">8 Hours</Select.Option>
                                <Select.Option value="12">12 Hours</Select.Option>
                            </Select>
                        </Form.Item>
                    )}

                    {tripDetails.type !== 'hourly' && distance !== null && (
                        <div className="md:col-span-2">
                            <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-center gap-2">
                                <EnvironmentOutlined className="text-primary text-lg" />
                                <span>
                                    Distance: <strong>{distance.toFixed(2)} km</strong>
                                    {distance < 1 && ` (${(distance * 1000).toFixed(0)} meters)`}
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
                                        if (!value) return Promise.resolve();
                                        const selectedDate = getFieldValue('date');
                                        if (!selectedDate) return Promise.resolve();
                                        
                                        // Check if selected date is today
                                        if (selectedDate.isSame(dayjs(), 'day')) {
                                            const selectedDateTime = selectedDate.hour(value.hour()).minute(value.minute());
                                            if (selectedDateTime.isBefore(dayjs())) {
                                                return Promise.reject(new Error('Time cannot be in the past'));
                                            }
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <TimePicker
                                className="w-full"
                                suffixIcon={<ClockCircleOutlined className="text-primary" />}
                                format="HH:mm"
                                onChange={value => setTripDetails({ ...tripDetails, time: value ? value.format('HH:mm') : '' })}
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
                                            const pickupDate = getFieldValue('date');
                                            if (!value || !pickupDate) return Promise.resolve();
                                            
                                            if (value.isBefore(pickupDate, 'day')) {
                                                return Promise.reject(new Error('Return date cannot be before pickup date'));
                                            }
                                            return Promise.resolve();
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
                                            if (!value) return Promise.resolve();
                                            
                                            const returnDate = getFieldValue('returnDate');
                                            const pickupDate = getFieldValue('date');
                                            const pickupTime = getFieldValue('time');
                                            
                                            if (!returnDate || !pickupDate || !pickupTime) return Promise.resolve();
                                            
                                            // If return date is same as pickup date, return time must be after pickup time
                                            if (returnDate.isSame(pickupDate, 'day')) {
                                                const pickupDateTime = pickupDate.hour(pickupTime.hour()).minute(pickupTime.minute());
                                                const returnDateTime = returnDate.hour(value.hour()).minute(value.minute());
                                                
                                                if (returnDateTime.isBefore(pickupDateTime) || returnDateTime.isSame(pickupDateTime)) {
                                                    return Promise.reject(new Error('Return time must be after pickup time'));
                                                }
                                            }
                                            
                                            // If return date is today, check it's not in the past
                                            if (returnDate.isSame(dayjs(), 'day')) {
                                                const returnDateTime = returnDate.hour(value.hour()).minute(value.minute());
                                                if (returnDateTime.isBefore(dayjs())) {
                                                    return Promise.reject(new Error('Return time cannot be in the past'));
                                                }
                                            }
                                            
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <TimePicker
                                    className="w-full"
                                    suffixIcon={<ClockCircleOutlined className="text-primary" />}
                                    format="HH:mm"
                                    onChange={value => setTripDetails({ ...tripDetails, returnTime: value ? value.format('HH:mm') : undefined })}
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
