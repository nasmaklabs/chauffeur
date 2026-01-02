"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/Button";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { key: "home", label: <Link href="/">Home</Link> },
    { key: "services", label: <Link href="/services">Services</Link> },
    { key: "fleet", label: <Link href="/fleet">Fleet</Link> },
    { key: "about", label: <Link href="/about">About</Link> },
    { key: "contact", label: <Link href="/contact">Contact</Link> },
    { key: "track", label: <Link href="/track-booking">Track Booking</Link> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="w-full pl-0 pr-4 md:pr-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center shrink-0 pl-4">
          <Image
            src="/images/logo.png"
            alt="AA Comfort"
            width={336}
            height={100}
            style={{
              width: "12rem",
              height: "auto",
              minHeight: "45px",
              paddingLeft: "1rem",
            }}
            priority
          />
        </Link>

        <nav className="hidden nav-desktop-show">
          <Menu
            mode="horizontal"
            items={menuItems}
            className="border-none bg-transparent min-w-[400px] justify-center"
            style={{ border: "none" }}
            disabledOverflow
          />
        </nav>

        <div className="hidden nav-desktop-flex items-center gap-4">
          <Link href="/booking">
            <Button
              type="primary"
              className="bg-action hover:bg-blue-700 h-10 px-6 font-semibold"
            >
              Book Now
            </Button>
          </Link>
        </div>

        <button
          className="block nav-mobile-hide text-2xl text-secondary"
          onClick={() => setMobileMenuOpen(true)}
        >
          <MenuOutlined />
        </button>

        <Drawer
          title={
            <Image
              src="/images/logo.png"
              alt="AA Comfort"
              width={200}
              height={60}
              className="w-36 h-auto"
            />
          }
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
            <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
              <Button
                type="primary"
                block
                className="bg-action h-10 font-semibold"
              >
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
