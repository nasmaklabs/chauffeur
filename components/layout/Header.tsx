'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Drawer } from 'antd';
import { MenuOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button } from '@/components/ui/Button';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        { key: 'home', label: <Link href="/">Home</Link> },
        { key: 'services', label: <Link href="/services">Services</Link> },
        { key: 'fleet', label: <Link href="/fleet">Fleet</Link> },
        { key: 'about', label: <Link href="/about">About</Link> },
        { key: 'contact', label: <Link href="/contact">Contact</Link> },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-secondary font-bold text-xl">
                        T
                    </div>
                    <span className="text-xl font-bold text-secondary tracking-tight">
                        LUXE<span className="text-primary">RIDE</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <Menu
                        mode="horizontal"
                        items={menuItems}
                        className="border-none bg-transparent min-w-[400px] justify-center"
                        style={{ border: 'none' }}
                        disabledOverflow
                    />
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-2 text-secondary font-medium">
                        <PhoneOutlined className="text-primary" />
                        <span>+1 (555) 123-4567</span>
                    </div>
                    <Link href="/booking">
                        <Button type="primary" className="bg-action hover:bg-blue-700 h-10 px-6 font-semibold">
                            Book Now
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-2xl text-secondary"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <MenuOutlined />
                </button>

                {/* Mobile Drawer */}
                <Drawer
                    title="Menu"
                    placement="right"
                    onClose={() => setMobileMenuOpen(false)}
                    open={mobileMenuOpen}
                >
                    <Menu
                        mode="vertical"
                        items={menuItems}
                        className="border-none"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="mt-8 flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-secondary font-medium">
                            <PhoneOutlined className="text-primary" />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                            <Button type="primary" block className="bg-action h-10 font-semibold">
                                Book Now
                            </Button>
                        </Link>
                    </div>
                </Drawer>
            </div>
        </header>
    );
};

export default Header;
