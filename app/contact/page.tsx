'use client';

import React from 'react';
import { Form, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Section from '@/components/ui/Section';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const ContactPage = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
        message.success('Message sent successfully!');
    };

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <div className="bg-secondary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We are here to help. Reach out to us for bookings, inquiries, or support.
                    </p>
                </div>
            </div>

            <Section>
                <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl font-bold text-secondary mb-8">Get in Touch</h2>

                        <div className="space-y-8 mb-12">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl flex-shrink-0">
                                    <PhoneOutlined />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary mb-1">Phone</h3>
                                    <p className="text-gray-500">+1 (555) 123-4567</p>
                                    <p className="text-gray-500 text-sm">Available 24/7</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl flex-shrink-0">
                                    <MailOutlined />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary mb-1">Email</h3>
                                    <p className="text-gray-500">bookings@luxeride.com</p>
                                    <p className="text-gray-500">support@luxeride.com</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl flex-shrink-0">
                                    <EnvironmentOutlined />
                                </div>
                                <div>
                                    <h3 className="font-bold text-secondary mb-1">Office</h3>
                                    <p className="text-gray-500">123 Luxury Lane, Suite 100</p>
                                    <p className="text-gray-500">Beverly Hills, CA 90210</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 font-bold">
                            Google Maps Integration
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-bold text-secondary mb-6">Send us a Message</h3>
                        <Form layout="vertical" size="large" onFinish={onFinish}>
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your first name!' }]}>
                                    <Input placeholder="First Name" />
                                </Form.Item>
                                <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your last name!' }]}>
                                    <Input placeholder="Last Name" />
                                </Form.Item>
                            </div>
                            <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                                <Input placeholder="Email Address" />
                            </Form.Item>
                            <Form.Item name="subject">
                                <Input placeholder="Subject" />
                            </Form.Item>
                            <Form.Item name="message" rules={[{ required: true, message: 'Please input your message!' }]}>
                                <Input.TextArea rows={6} placeholder="How can we help you?" />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" block size="large" className="bg-action h-12 font-bold">
                                Send Message
                            </Button>
                        </Form>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default ContactPage;
