'use client';

import React, { useState } from 'react';
import { Tabs, DatePicker, TimePicker, Form } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, ClockCircleOutlined, CarOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

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

interface DateTimePickerProps {
    datePlaceholder?: string;
    timePlaceholder?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
    datePlaceholder = 'Date',
    timePlaceholder = 'Time',
}) => (
    <>
        <Form.Item className={FORM_ITEM_CLASSES}>
            <DatePicker
                className="w-full"
                placeholder={datePlaceholder}
                suffixIcon={<CalendarOutlined className="text-primary" />}
            />
        </Form.Item>
        <Form.Item className={FORM_ITEM_CLASSES}>
            <TimePicker
                className="w-full"
                placeholder={timePlaceholder}
                suffixIcon={<ClockCircleOutlined className="text-primary" />}
                format={TIME_FORMAT}
            />
        </Form.Item>
    </>
);

const LocationInput: React.FC<{ placeholder: string }> = ({ placeholder }) => (
    <Form.Item className={FORM_ITEM_CLASSES}>
        <Input
            prefix={<EnvironmentOutlined className="text-primary" />}
            placeholder={placeholder}
        />
    </Form.Item>
);

const DurationSelect: React.FC = () => (
    <Form.Item className={FORM_ITEM_CLASSES}>
        <Select placeholder="Duration" suffixIcon={<ClockCircleOutlined />}>
            {DURATION_OPTIONS.map(({ value, label }) => (
                <Select.Option key={value} value={value}>
                    {label}
                </Select.Option>
            ))}
        </Select>
    </Form.Item>
);

const VehicleSelect: React.FC = () => (
    <Form.Item className={`${FORM_ITEM_CLASSES} ${FULL_WIDTH_COLUMN_CLASSES}`}>
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
);

const BookingWidget: React.FC<BookingWidgetProps> = ({ className = '', onSubmit }) => {
    const [activeTripType, setActiveTripType] = useState<TripType>(TRIP_TYPES.ONE_WAY);
    const [form] = Form.useForm();

    const handleSubmit = (values: unknown) => {
        onSubmit?.(values);
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
                    <LocationInput placeholder="Pickup Location" />

                    {showDropoffLocation && (
                        <LocationInput placeholder="Drop-off Location" />
                    )}

                    {isHourly && <DurationSelect />}

                    <div className={DATE_TIME_GRID_CLASSES}>
                        <DateTimePicker
                            datePlaceholder="Date"
                            timePlaceholder="Time"
                        />
                    </div>

                    {isRoundTrip && (
                        <div className={DATE_TIME_GRID_CLASSES}>
                            <DateTimePicker
                                datePlaceholder="Return Date"
                                timePlaceholder="Return Time"
                            />
                        </div>
                    )}

                    <VehicleSelect />
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
