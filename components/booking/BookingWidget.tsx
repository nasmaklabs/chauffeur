'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, DatePicker, TimePicker, Form } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined, CarOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import LocationAutocomplete from './LocationAutocomplete';
import { useRouter } from 'next/navigation';
import { bookingStore } from '@/lib/store/bookingStore';
import dayjs from 'dayjs';

const TRIP_TYPES = {
    ONE_WAY: 'one-way',
    ROUND_TRIP: 'round-trip',
    HOURLY: 'hourly',
} as const;

type TripType = typeof TRIP_TYPES[keyof typeof TRIP_TYPES];

const TRIP_TYPE_OPTIONS = [
    { label: 'One Way', key: TRIP_TYPES.ONE_WAY },
    { label: 'Round Trip', key: TRIP_TYPES.ROUND_TRIP },
    { label: 'Hourly', key: TRIP_TYPES.HOURLY },
];

const DURATION_OPTIONS = [
    { value: '3', label: '3 Hours' },
    { value: '4', label: '4 Hours' },
    { value: '8', label: '8 Hours' },
    { value: '12', label: '12 Hours' },
] as const;

const VEHICLE_OPTIONS = [
    { value: 'sedan', label: 'Executive Sedan' },
    { value: 'luxury', label: 'Luxury Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'van', label: 'Luxury Van' },
] as const;

const TIME_FORMAT = 'HH:mm';

const CONTAINER_CLASSES = 'bg-white rounded-xl shadow-xl p-6 md:p-8 w-full max-w-full lg:max-w-[750px] xl:max-w-[650px]';
const FORM_GRID_CLASSES = 'grid grid-cols-1 md:grid-cols-2 gap-4';
const FULL_WIDTH_COLUMN_CLASSES = 'md:col-span-2';
const DATE_TIME_GRID_CLASSES = 'md:col-span-2 grid grid-cols-2 gap-4';
const FORM_ITEM_CLASSES = 'mb-4';

interface BookingWidgetProps {
    className?: string;
    onSubmit?: (formData: unknown) => void;
}

interface Coordinates {
    lat: number;
    lng: number;
}

const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
    if (typeof window !== 'undefined' && window.google?.maps?.geometry) {
        const point1 = new window.google.maps.LatLng(coord1.lat, coord1.lng);
        const point2 = new window.google.maps.LatLng(coord2.lat, coord2.lng);
        const distanceInMeters = window.google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
        return distanceInMeters / 1000; // Convert to kilometers
    }
    return 0;
};

const BookingWidget: React.FC<BookingWidgetProps> = ({ className = '', onSubmit }) => {
    const [activeTripType, setActiveTripType] = useState<TripType>(TRIP_TYPES.ONE_WAY);
    const [form] = Form.useForm();
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [pickupCoordinates, setPickupCoordinates] = useState<Coordinates | null>(null);
    const [dropoffCoordinates, setDropoffCoordinates] = useState<Coordinates | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (pickupCoordinates && dropoffCoordinates) {
            const calculatedDistance = calculateDistance(pickupCoordinates, dropoffCoordinates);
            setDistance(calculatedDistance);
        } else {
            setDistance(null);
        }
    }, [pickupCoordinates, dropoffCoordinates]);

    const handlePickupChange = (address: string, coordinates: Coordinates | null) => {
        setPickupLocation(address);
        setPickupCoordinates(coordinates);
        form.setFieldsValue({ pickupLocation: address });
    };

    const handleDropoffChange = (address: string, coordinates: Coordinates | null) => {
        setDropoffLocation(address);
        setDropoffCoordinates(coordinates);
        form.setFieldsValue({ dropoffLocation: address });
    };

    const handleSubmit = (values: any) => {
        const formData = {
            ...values,
            pickupLocation,
            dropoffLocation,
            pickupCoordinates,
            dropoffCoordinates,
            distance,
        };

        // Map trip type to booking store format
        const tripTypeMap = {
            [TRIP_TYPES.ONE_WAY]: 'one-way' as const,
            [TRIP_TYPES.ROUND_TRIP]: 'round-trip' as const,
            [TRIP_TYPES.HOURLY]: 'hourly' as const,
        };

        // Update booking store with form data
        bookingStore.set('tripDetails', {
            type: tripTypeMap[activeTripType],
            pickupLocation,
            dropoffLocation,
            pickupCoordinates,
            dropoffCoordinates,
            distance,
            date: values.date ? values.date.format('YYYY-MM-DD') : '',
            time: values.time ? values.time.format('HH:mm') : '',
            returnDate: values.returnDate ? values.returnDate.format('YYYY-MM-DD') : undefined,
            returnTime: values.returnTime ? values.returnTime.format('HH:mm') : undefined,
            duration: values.duration,
            vehicleType: values.vehicleType,
            passengers: 1,
            luggage: 1,
        });

        // Reset to first step
        bookingStore.set('currentStep', 0);

        // Call onSubmit callback if provided
        onSubmit?.(formData);

        // Navigate to booking page
        router.push('/booking');
    };

    const isRoundTrip = activeTripType === TRIP_TYPES.ROUND_TRIP;
    const isHourly = activeTripType === TRIP_TYPES.HOURLY;
    const showDropoffLocation = !isHourly;

    return (
        <div className={`${CONTAINER_CLASSES} ${className}`}>
            <h2 className="text-2xl font-bold mb-6 text-secondary">Book Your Ride</h2>

            <Tabs
                activeKey={activeTripType}
                onChange={(key) => setActiveTripType(key as TripType)}
                className="mb-6"
                items={TRIP_TYPE_OPTIONS}
            />

            <Form layout="vertical" size="large" form={form} onFinish={handleSubmit}>
                <div className={FORM_GRID_CLASSES}>
                    <Form.Item 
                        className={FORM_ITEM_CLASSES} 
                        name="pickupLocation"
                        rules={[
                            { required: true, message: 'Please enter pickup location' },
                            { 
                                validator: (_, value) => {
                                    if (value && !pickupCoordinates) {
                                        return Promise.reject(new Error('Please select a valid location from suggestions'));
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <LocationAutocomplete
                            placeholder="Pickup Location"
                            value={pickupLocation}
                            onChange={handlePickupChange}
                        />
                    </Form.Item>

                    {showDropoffLocation && (
                        <Form.Item 
                            className={FORM_ITEM_CLASSES} 
                            name="dropoffLocation"
                            rules={[
                                { required: true, message: 'Please enter drop-off location' },
                                { 
                                    validator: (_, value) => {
                                        if (value && !dropoffCoordinates) {
                                            return Promise.reject(new Error('Please select a valid location from suggestions'));
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <LocationAutocomplete
                                placeholder="Drop-off Location"
                                value={dropoffLocation}
                                onChange={handleDropoffChange}
                            />
                        </Form.Item>
                    )}

                    {showDropoffLocation && distance !== null && (
                        <div className="md:col-span-2 -mt-2 mb-2">
                            <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center gap-2">
                                <EnvironmentOutlined className="text-primary" />
                                <span>
                                    Distance: <strong>{distance.toFixed(2)} km</strong>
                                    {distance < 1 && ` (${(distance * 1000).toFixed(0)} meters)`}
                                </span>
                            </div>
                        </div>
                    )}

                    {isHourly && (
                        <Form.Item 
                            className={FORM_ITEM_CLASSES} 
                            name="duration"
                            rules={[{ required: true, message: 'Please select duration' }]}
                        >
                            <Select placeholder="Duration" suffixIcon={<ClockCircleOutlined />}>
                                {DURATION_OPTIONS.map(({ value, label }) => (
                                    <Select.Option key={value} value={value}>
                                        {label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}

                    <div className={DATE_TIME_GRID_CLASSES}>
                        <Form.Item 
                            className={FORM_ITEM_CLASSES} 
                            name="date"
                            rules={[{ required: true, message: 'Please select date' }]}
                        >
                            <DatePicker
                                className="w-full"
                                placeholder="Date"
                                suffixIcon={<CalendarOutlined className="text-primary" />}
                                disabledDate={(current) => current && current < dayjs().startOf('day')}
                            />
                        </Form.Item>
                        <Form.Item 
                            className={FORM_ITEM_CLASSES} 
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
                                placeholder="Time"
                                suffixIcon={<ClockCircleOutlined className="text-primary" />}
                                format={TIME_FORMAT}
                            />
                        </Form.Item>
                    </div>

                    {isRoundTrip && (
                        <div className={DATE_TIME_GRID_CLASSES}>
                            <Form.Item 
                                className={FORM_ITEM_CLASSES} 
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
                                    placeholder="Return Date"
                                    suffixIcon={<CalendarOutlined className="text-primary" />}
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
                                className={FORM_ITEM_CLASSES} 
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
                                    placeholder="Return Time"
                                    suffixIcon={<ClockCircleOutlined className="text-primary" />}
                                    format={TIME_FORMAT}
                                />
                            </Form.Item>
                        </div>
                    )}

                    <Form.Item 
                        className={`${FORM_ITEM_CLASSES} ${FULL_WIDTH_COLUMN_CLASSES}`} 
                        name="vehicleType"
                        rules={[{ required: true, message: 'Please select vehicle type' }]}
                    >
                        <Select
                            placeholder="Select Vehicle Type"
                            suffixIcon={<CarOutlined className="text-primary" />}
                        >
                            {VEHICLE_OPTIONS.map(({ value, label }) => (
                                <Select.Option key={value} value={value}>
                                    {label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                <Button
                    type="primary"
                    block
                    size="large"
                    className="bg-action h-12 text-lg font-bold mt-2"
                    htmlType="submit"
                >
                    Get Quote & Book
                </Button>
            </Form>
        </div>
    );
};

export default BookingWidget;
