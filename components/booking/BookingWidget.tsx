'use client';

import React, { useState, useEffect } from 'react';
import { Tabs, DatePicker, TimePicker, Form } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined, CarOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import LocationAutocomplete from './LocationAutocomplete';
import { useRouter } from 'next/navigation';
import { bookingStore, Coordinates } from '@/lib/store/bookingStore';
import dayjs from 'dayjs';
import { calculateDistance, formatDistance } from '@/lib/utils/distance';
import { 
    TRIP_TYPES, 
    TRIP_TYPE_OPTIONS, 
    DURATION_OPTIONS, 
    TIME_FORMAT,
    DATE_FORMAT,
    type TripType 
} from '@/lib/constants/booking';
import { VEHICLE_OPTIONS } from '@/lib/constants/vehicles';
import { validateLocationWithCoordinates } from '@/lib/validators/location-validator';
import { validateTimeNotInPast, validateReturnDate, validateReturnTime } from '@/lib/validators/date-time-validator';

const CONTAINER_CLASSES = 'bg-white rounded-xl shadow-xl p-6 md:p-8 w-full max-w-full lg:max-w-[750px] xl:max-w-[650px]';
const FORM_GRID_CLASSES = 'grid grid-cols-1 md:grid-cols-2 gap-4';
const FULL_WIDTH_COLUMN_CLASSES = 'md:col-span-2';
const DATE_TIME_GRID_CLASSES = 'md:col-span-2 grid grid-cols-2 gap-4';
const FORM_ITEM_CLASSES = 'mb-4';

interface BookingWidgetProps {
    className?: string;
    onSubmit?: (formData: unknown) => void;
}

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
            setDistance(calculateDistance(pickupCoordinates, dropoffCoordinates));
        } else {
            setDistance(null);
        }
    }, [pickupCoordinates, dropoffCoordinates]);

    useEffect(() => {
        if (pickupCoordinates && pickupLocation) form.validateFields(['pickupLocation']);
    }, [pickupCoordinates, pickupLocation, form]);

    useEffect(() => {
        if (dropoffCoordinates && dropoffLocation) form.validateFields(['dropoffLocation']);
    }, [dropoffCoordinates, dropoffLocation, form]);

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

        bookingStore.set('tripDetails', {
            type: activeTripType,
            pickupLocation,
            dropoffLocation,
            pickupCoordinates,
            dropoffCoordinates,
            distance,
            date: values.date ? values.date.format(DATE_FORMAT) : '',
            time: values.time ? values.time.format(TIME_FORMAT) : '',
            returnDate: values.returnDate ? values.returnDate.format(DATE_FORMAT) : undefined,
            returnTime: values.returnTime ? values.returnTime.format(TIME_FORMAT) : undefined,
            duration: values.duration,
            vehicleType: values.vehicleType,
            passengers: 1,
            luggage: 1,
        });

        if (values.vehicleType) bookingStore.set('selectedVehicle', values.vehicleType);
        bookingStore.set('currentStep', 0);
        onSubmit?.(formData);
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
                            { validator: () => validateLocationWithCoordinates(pickupLocation, pickupCoordinates) }
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
                                { validator: () => validateLocationWithCoordinates(dropoffLocation, dropoffCoordinates) }
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
                                    Distance: <strong>{formatDistance(distance)}</strong>
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
                                        return validateTimeNotInPast(getFieldValue('date'), value);
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
                                            return validateReturnDate(value, getFieldValue('date'));
                                        },
                                    }),
                                ]}
                            >
                                <DatePicker
                                    className="w-full"
                                    placeholder="Return Date"
                                    suffixIcon={<CalendarOutlined className="text-primary" />}
                                    disabledDate={(current) => {
                                        if (!current) return false;
                                        const pickupDate = form.getFieldValue('date');
                                        const isPastDate = current < dayjs().startOf('day');
                                        const isBeforePickup = pickupDate && current.isBefore(pickupDate, 'day');
                                        return isPastDate || isBeforePickup;
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
