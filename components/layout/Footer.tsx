import React from "react";
import Link from "next/link";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import { ADDRESS } from "@/lib/constants/address";
import { BRAND } from "@/lib/constants/brand";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-secondary font-bold text-lg">
                AA
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-primary">Comfort</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Premium chauffeur services for discerning clients. Experience
              luxury, comfort, and reliability with our professional fleet.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition-colors text-xl"
              >
                <FacebookFilled />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition-colors text-xl"
              >
                <TwitterSquareFilled />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition-colors text-xl"
              >
                <InstagramFilled />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition-colors text-xl"
              >
                <LinkedinFilled />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Our Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Corporate Travel
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Event Transport
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  City Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Hourly Hire
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/fleet"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Book Now
                </Link>
              </li>
              <li>
                <Link
                  href="/track-booking"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Track Booking
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="text-primary font-bold">📍</span>
                <span>{ADDRESS}</span>
              </li>
              {/* phone removed */}
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-primary font-bold">✉️</span>
                <span>
                  <a
                    href={`mailto:${BRAND.email.bookings}`}
                    className="hover:underline"
                  >
                    {BRAND.email.bookings}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-primary font-bold">🕒</span>
                <span>24/7 Service Available</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} AA Comfort. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
