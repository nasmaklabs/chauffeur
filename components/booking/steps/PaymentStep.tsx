'use client';

import React from 'react';
import { Form, Radio, Checkbox, Divider } from 'antd';
import { CreditCardOutlined, BankOutlined } from '@ant-design/icons';
import { Input } from '@/components/ui/Input';

const PaymentStep = () => {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-secondary">Payment Method</h2>

                    <Radio.Group className="w-full flex flex-col gap-4" defaultValue="card">
                        <div className="border p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:border-primary">
                            <Radio value="card">Credit / Debit Card</Radio>
                            <CreditCardOutlined className="ml-auto text-xl text-gray-400" />
                        </div>
                        <div className="border p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:border-primary">
                            <Radio value="paypal">PayPal</Radio>
                            <BankOutlined className="ml-auto text-xl text-gray-400" />
                        </div>
                    </Radio.Group>

                    <Divider />

                    <Form layout="vertical" size="large">
                        <Form.Item label="Card Number" required>
                            <Input placeholder="0000 0000 0000 0000" prefix={<CreditCardOutlined />} />
                        </Form.Item>
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item label="Expiry Date" required>
                                <Input placeholder="MM/YY" />
                            </Form.Item>
                            <Form.Item label="CVC" required>
                                <Input placeholder="123" />
                            </Form.Item>
                        </div>
                        <Form.Item label="Cardholder Name" required>
                            <Input placeholder="Name on card" />
                        </Form.Item>
                    </Form>
                </div>
            </div>

            <div className="md:col-span-1">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-24">
                    <h3 className="text-xl font-bold mb-4">Booking Summary</h3>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Vehicle Fare</span>
                            <span className="font-semibold">$120.00</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Taxes & Fees</span>
                            <span className="font-semibold">$12.00</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Extras</span>
                            <span className="font-semibold">$0.00</span>
                        </div>
                        <Divider className="my-2" />
                        <div className="flex justify-between text-lg font-bold text-secondary">
                            <span>Total</span>
                            <span className="text-primary">$132.00</span>
                        </div>
                    </div>

                    <Checkbox className="mb-4 text-sm text-gray-500">
                        I agree to the Terms and Conditions and Privacy Policy.
                    </Checkbox>
                </div>
            </div>
        </div>
    );
};

export default PaymentStep;
