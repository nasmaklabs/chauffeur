"use client";

import React, { useState } from "react";
import { Form } from "antd";
import { Input } from "@/components/ui/Input";
import { bookingStore, useBookingStore } from "@/lib/store/bookingStore";

// UK phone number validation
const validateUKPhoneNumber = (phone: string): boolean => {
  if (!phone) return true; // Optional field
  const ukPhoneRegex = /^(?:\+44|0)(?:\d\s?){9,10}$/;
  return ukPhoneRegex.test(phone.replace(/\s/g, ""));
};

const formatUKPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");
  return cleaned;
};

const PassengerDetailsStep = () => {
  const passengerDetails = useBookingStore((state) => state.passengerDetails);
  const [phoneError, setPhoneError] = useState<string>("");

  const setPassengerDetails = (details: typeof passengerDetails) =>
    bookingStore.set("passengerDetails", details);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatUKPhoneNumber(e.target.value);
    setPassengerDetails({
      ...passengerDetails,
      phoneNumber: value,
    });

    if (value && !validateUKPhoneNumber(value)) {
      setPhoneError(
        "Please enter a valid phone number (e.g., 07123 456789 or +44 7123 456789)"
      );
    } else {
      setPhoneError("");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-secondary">
        Passenger Details
      </h2>

      <Form layout="vertical" size="large">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item label="First Name" required>
            <Input
              placeholder="First Name"
              value={passengerDetails.firstName}
              onChange={(e) =>
                setPassengerDetails({
                  ...passengerDetails,
                  firstName: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Last Name" required>
            <Input
              placeholder="Last Name"
              value={passengerDetails.lastName}
              onChange={(e) =>
                setPassengerDetails({
                  ...passengerDetails,
                  lastName: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Email Address" required>
            <Input
              type="email"
              placeholder="Email Address"
              value={passengerDetails.email}
              onChange={(e) =>
                setPassengerDetails({
                  ...passengerDetails,
                  email: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="Phone Number (Optional)"
            validateStatus={phoneError ? "error" : ""}
            help={phoneError || "07123 456789 or +44 7123 456789"}
          >
            <Input
              type="tel"
              placeholder="e.g., 07123 456789"
              value={passengerDetails.phoneNumber || ""}
              onChange={handlePhoneChange}
            />
          </Form.Item>
          <Form.Item label="Flight Number (Optional)">
            <Input
              placeholder="e.g. BA123"
              value={passengerDetails.flightNumber}
              onChange={(e) =>
                setPassengerDetails({
                  ...passengerDetails,
                  flightNumber: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Special Requests / Notes">
            <Input.TextArea
              rows={4}
              placeholder="Any special requirements?"
              value={passengerDetails.notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPassengerDetails({
                  ...passengerDetails,
                  notes: e.target.value,
                })
              }
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default PassengerDetailsStep;
